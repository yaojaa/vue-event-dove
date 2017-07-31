<template>
		<div class="event-view">
				<headers></headers>
				<div class="event-main">
						<div class="ui container">
								<div class="sub-title text-justify"><h2 class="fwn"><span class="text-muted f16">我的账号</span>/编辑资料</h2> <router-link class="ui basic button blue mini" to="/account">返回</router-link></div>
								<div class="white-wrap p-lg">
									 <div class="ui doubling stackable grid">
										 <div class="ten wide  column">
											 <div class="ui items">
													<div class="item">
															<div class="ui small image">
																 <img :src="accountInfo.profile.avatar" alt="">
																 <div class="text-center mt-sm"><p class="text-blue">更改头像<input class="upload" type="file" @change="uploadImg"></p></div>
															</div>
															<div class="content">
																 <div class="ui form">
																	<div class="field">
																		 <label for="">帐号</label>
																		 <input type="text" v-model="accountInfo.username" disabled>
																	 </div>
																	 <!-- <div class="field">
																		 <label for="">用户名</label>
																		 <input type="text">
																	 </div> -->
																	 <div class="field">
																		 <label for="">姓名</label>
																		 <input type="text" v-model="accountInfo.nickname" v-vali="JSON.stringify({required: true})" filed="accountInfo.nickname" placeholder="请输入姓名">
																			<div v-if="$verify.$errors['accountInfo.nickname']" class="ui red basic pointing label">
																				{{$verify.$errors['accountInfo.nickname']}}
																			</div>
																	 </div>
																	 <div class="field">
																		 <label for="">性别</label>
																		 <div class="ui selection dropdown">
										                                  <input name="gender" type="hidden" value="default">
										                                  <i class="dropdown icon"></i>
										                                  <div class="text" :class="{'default':!accountInfo.profile.gender}">{{accountInfo.profile.gender==='man'?'男':'女' || '请选择性别'}}</div>
										                                  <div class="menu">
										                                      <div class="item" data-value="man">男</div>
										                                      <div class="item" data-value="woman">女</div>
										                                  </div>
										                                 </div>
																	 </div>
																	 <div class="field">
																		 <label for="">公司</label>
																		 <input type="text" v-model="accountInfo.profile.company">
																	 </div>
																	 <div class="field">
																		 <label for="">职位</label>
																		 <input type="text" v-model="accountInfo.profile.position">
																	 </div>
																	 <div class="space-md">
 																		 <button class="ui button blue" v-isAjaxOver="isAjaxOver" @click="updateAccount">保存</button>
																	 </div>
																 </div>
															</div>
													</div>
											 </div>
											 
										 </div>
									 </div>
								</div>

						</div>
				</div>
				<footers></footers>
		</div>
</template>
<script>
import {
		API_URL,IMG_SERVER
} from '../config'
import header from '../components/header'
import footer from '../components/footer'
export default {
	verify:true,
	data() {
		return {
			id: this.$route.params.id,
			accountInfo: {
				username: '',
				nickname: '',
				profile: {
					avatar: '/images/head.jpg',
					gender: '',
					company: '',
					position: ''
				},
			},
			updateToken: '',
			isAjaxOver: true
		}
	},
	mounted() {
		$('.dropdown').dropdown({
        onChange: (value, text, $selectedItem) => {
          this.accountInfo.profile.gender = value;
        }
    })
		this.myaccount();
		this.getUploadToken();
	},
	methods: {
		// 我的账号信息
		myaccount () {
			$.ajax({
				url: API_URL + "user/detail",
				type: "GET"
			})
			.done((data, textStatus, jqXHR) => {
				this.accountInfo.username = data.username;
				this.accountInfo.nickname = data.nickname;
				if (data.profile) {
					this.accountInfo.profile.avatar = data.profile.avatar;
					this.accountInfo.profile.gender = data.profile.gender;
					this.accountInfo.profile.company = data.profile.company;
					this.accountInfo.profile.position = data.profile.position;
				}
			})
			.fail((jqXHR, textStatus, errorThrown) => {
				this.$message(JSON.parse(jqXHR.responseText).responseText);
			});
		},
		// 获取上传图片token
    getUploadToken () {
        $.ajax({
            url: "/uptoken",
            success: (res) => {
                this.updateToken = res.uptoken;
            }
        })
    },
    // 上传图片
    uploadImg (e) {
        const _url = "http://up.qiniu.com";
        let _token = '';
        let _file = e.target.files[0];
        let _formData = new FormData();
        _formData.append('token', this.updateToken);
        _formData.append('file', _file);
        let _xhr = new XMLHttpRequest();
        _xhr.open('POST', _url, true);
        // 上传开始
        _xhr.upload.onloadstart = function () {
            $(e.target).closest('.upload_box').find('a').text('上传中');
        }
        // ajax服务器返回处理
        _xhr.onreadystatechange = (response) => {
            if (_xhr.readyState == 4 && _xhr.status == 200 && _xhr.responseText != "") {
                let _blkRet = JSON.parse(_xhr.responseText);
                this.accountInfo.profile.avatar = IMG_SERVER + _blkRet.key
            } else if (_xhr.status != 200 && _xhr.responseText) {
                this.$message('上传失败');
            }
        };
        //请求失败
        _xhr.onerror =  () => {
            this.$message('请求上传失败');
        };
        _xhr.send(_formData);
    },
		// 编辑资料
		async updateAccount ($event) {
			try {
          await this.$verify.check().then()
      } catch (e) {
          return false
      }
			if (!this.accountInfo.profile.gender) {
				this.$message({
					message:'请选择性别',
					type:'warning'
				});
				return;
			}
			this.isAjaxOver = false;
			$.ajax({
				url: API_URL + "user/update",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(this.accountInfo)
			})
			.done((data, textStatus, jqXHR) => {
				this.$store.dispatch('USER_SIGNIN', data)
				this.$message('编辑资料成功');
				this.isAjaxOver = true;
				this.$router.replace('/account');
			})
			.fail((jqXHR, textStatus, errorThrown) => {
				this.$message(JSON.parse(jqXHR.responseText).responseText);
			});
		}
	},
	components: {
		headers: header,
		footers: footer,
	}
}
</script>
<style scoped>
	.mt-sm p{
		position: relative;
		overflow: hidden;
		cursor: pointer;
	}
	.mt-sm .upload{
		position: absolute;
		top:0;
		left: 0;
		opacity: 0;
		filter: opacity(0);
		cursor: pointer;
		width:100%;
	}
</style>
