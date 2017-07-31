<template>
	<div>
		<!-- 未实名认证 -->
		<div class="ui mini modal" id="authenticationLayer">
			<i class="close icon"></i>
			<div class="header">
					实名认证
			</div>
			<div class="content">
				<div class="ui form">
					<div class="field">
						<label for="">姓名</label>
						<input type="text" v-model="authentication.name" v-vali="JSON.stringify({required: true})" filed="authentication.name" placeholder="输入姓名">
						<div v-if="$verify.$errors['authentication.name']" class="ui red basic pointing label">
							{{$verify.$errors['authentication.name']}}
						</div>
					 </div>
					 <div class="field">
							 <label for="">身份证号</label>
							 <input type="text" placeholder="输入身份证号" v-vali="JSON.stringify({required: true,isIdCard: true})" filed="authentication.idCard" v-model="authentication.idCard" >
							 <div v-if="$verify.$errors['authentication.idCard']" class="ui red basic pointing label">
								{{$verify.$errors['authentication.idCard']}}
							</div>
					 </div>
				</div>
				 <div class="ui two column vertically padded grid">
					 <div class="column">
						 <div class="ui medium image id-box">
							<div class="ui dimmer">
								<div class="content">
									<div class="center">
										<div class="upload_box">
											<a href="#" class="text-white"><i class="upload huge icon"></i></a>
											<input type="file" name="frontIdCard" @change="uploadImg">
										</div>
										<p class="mt-md">上传身份证正面</p>
									</div>
								</div>
							</div>
							<img :src="authentication.identityCardFront" authentication="identityCardFront" class="ui medium image">
						 </div>
					 </div>
					 <div class="column">
						 <div class="ui medium image id-box">
							<div class="ui dimmer">
								<div class="content">
									<div class="center">
										<div class="upload_box">
											<a href="#" class="text-white"><i class="upload huge icon"></i></a>
											<input type="file" name="backIdCard" @change="uploadImg">
										</div>
										<p class="mt-md">上传身份证背面</p>
									</div>
								</div>
							</div>
							<img :src="authentication.identityCardVerso" authentication="identityCardVerso" class="ui medium image">
						 </div>
					 </div>
				 </div>
				 <p class="space-md text-info">身份证照片要求：拍摄时确保身份证<span class="text-yellow">边框完整，字体清晰，亮度均匀</span></p>
				 <div class="ui horizontal divider">拍摄示例</div>
				 <div class="ui four column grid">
					 <div class="column"><img src="/images/id_03.png" class="ui small image"></div>
					 <div class="column"><img src="/images/id_04.png" class="ui small image"></div>
					 <div class="column"><img src="/images/id_05.png" class="ui small image"></div>
					 <div class="column"><img src="/images/id_06.png" class="ui small image"></div>
				 </div>
			</div>
			<div class="actions text-center">
				<div class="ui button blue" @click="authenticationFun">提交</div>
				<div class="ui ok button cancel">取消</div>
			</div>
		</div>
		<!-- 实名认证成功 -->
		<div class="ui success mini modal" id="authenticationSuccess">
	        <i class="close icon"></i>
	        <div class="header">
	            实名认证
	        </div>
	        <div class="content">
	            <div class="ui items p-md">
	                <div class="item">
	                    <i class="check circle huge teal icon"></i>
	                    <div class="content">
	                        <div class="header">恭喜您实名认证成功</div>
	                        <div class="meta">
	                            <p>{{accountInfo.realNameAuthentication?accountInfo.realNameAuthentication.name:''}}</p>
	                        </div>
	                        <div class="description mt-md">
	                            <p>{{filterIdNumber}}</p>
	                        </div>

	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
		<!-- 实名认证中 -->
	    <div class="ui warning mini modal" id="authenticationWarning">
	        <i class="close icon"></i>
	        <div class="header">
	            实名认证
	        </div>
	        <div class="content">
	            <div class="ui items p-md">
	                <div class="item">
	                    <i class="info circle huge yellow icon"></i>
	                    <div class="content">
	                        <div class="header">实名认证正在审核中...</div>
	                        <div class="meta">
	                            <p>请耐心等待会鸽工作人员审核，审核周期1-3个工昨日！</p>
	                        </div>
	                        <div class="description mt-md">
	                            <p>如有疑问请及时联系我们：010-61138799-8042</p>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	    <!-- 实名认证失败 -->
	    <div class="ui danger mini modal" id="authenticationDanger">
	        <i class="close icon"></i>
	        <div class="header">
	            实名认证
	        </div>
	        <div class="content">
	            <div class="ui items p-md">
	                <div class="item">
	                    <i class="remove circle huge red icon"></i>
	                    <div class="content">
	                        <div class="header">对不起，您的身份未通过审核！</div>
	                        <div class="meta">
	                            <p>原因：{{accountInfo.realNameAuthentication?accountInfo.realNameAuthentication.note:''}}</p>
	                        </div>
	                        <div class="description mt-md">
	                            <p>如有疑问请及时联系我们：010-61138799-8042</p>
	                        </div>
	                        <div class="mt-md"><a @click="review" class="ui button blue authentication-btn">重新提交审核</a></div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</template>
<script>
	import {API_URL,IMG_SERVER} from '../config'
	export default {
		verify:true,
		props: ['accountInfo'],
		data () {
			return {
				updateToken: '',
				authentication: {
	            	name: '',
					idCard: '',
					identityCardFront: '/images/id_07.jpg',
					identityCardVerso: '/images/id_08.jpg'
	            }
			}
		},
		computed: {
			// 格式化身份证号
	        filterIdNumber () {
	        	if (this.accountInfo.realNameAuthentication && this.accountInfo.realNameAuthentication.idNumber) {
		        	return this.accountInfo.realNameAuthentication.idNumber.substring(0,3) + '************' + this.accountInfo.realNameAuthentication.idNumber.slice(-3);
	        	}else{
	        		return '';
	        	}
	        },
			// 是否上传身份证照片
	        hasUploadIdCard () {
	        	if(this.authentication.identityCardFront !== '/images/id_07.jpg' && this.authentication.identityCardVerso !== '/images/id_08.jpg'){
	        		return true;
	        	}else{
	        		return false;
	        	}
	        }
		},
		mounted () {
			let id = '';
			if (!this.accountInfo.realNameAuthentication || !this.accountInfo.realNameAuthentication.status) {
				id = 'authenticationLayer'; 
			} else if (this.accountInfo.realNameAuthentication.status === 'auditThrough') {
				id = 'authenticationSuccess';
			} else if (this.accountInfo.realNameAuthentication.status === 'auditing') {
				id = 'authenticationWarning';
			} else if (this.accountInfo.realNameAuthentication.status === 'auditFailure') {
				id = 'authenticationDanger';
			}

			$('.ui.id-box .dimmer').dimmer({
          opacity: '0.2',
          closable: false
      }).dimmer('show')
			
			$('#'+id).modal({
				onHide: () => {
					this.$emit('updateLayerFlag', '');
				},
				onHidden: () => {
					$('#'+id).remove();
				}
			}).modal('show');

			this.getUploadToken();
		},
		methods: {
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
	        	let _url = "http://up.qiniu.com";
	        	let _token = '';
	        	let _file = e.target.files[0];
	            let _this = this;
	            let _formData = new FormData();
	            _formData.append('token', _this.updateToken);
	        	_formData.append('file', _file);
			    let _xhr = new XMLHttpRequest();
	            _xhr.open('POST', _url, true);
	            // 上传开始
	            _xhr.upload.onloadstart = function () {
	            	$(e.target).closest('.center').find('p').text('上传中');
	            }
	            // ajax服务器返回处理
	            _xhr.onreadystatechange = function(response) {
	                if (_xhr.readyState == 4 && _xhr.status == 200 && _xhr.responseText != "") {
	                    let _blkRet = JSON.parse(_xhr.responseText);
	                    let _img = $(e.target).closest('.image').find('img');
						_this.authentication[_img.attr('authentication')] = IMG_SERVER + _blkRet.key
	                    _img.removeClass('hide');
	                    $(e.target).closest('.center').find('p').text('上传完成');
	                } else if (_xhr.status != 200 && _xhr.responseText) {
	                    _this.$message('上传失败');
	                }
	            };
	            //请求失败
	            _xhr.onerror = function () {
	            	_this.$message('请求上传失败');
	            };
	            _xhr.send(_formData);
	        },
			async authenticationFun () {
				try {
	                await this.$verify.check().then()
	            } catch (e) {
	                return false
	            }
				if(!this.hasUploadIdCard){
	        		this.$message('请上传身份证照片！');
	        		return;
	        	}
	        	$.ajax({
				    url: API_URL + "/user/realNameAuthentication",
				    type: "POST",
				    contentType: "application/json",
				    data: JSON.stringify({
				        "identityCardFront": this.authentication.identityCardFront,
				        "identityCardVerso": this.authentication.identityCardVerso,
				        "name": this.authentication.name,
				        "idType": "identityCard",
				        "idNumber": this.authentication.idCard
				    })
				})
				.done((data, textStatus, jqXHR) => {
					$('#authenticationLayer').modal('hide');
				    this.$message('实名认证已提交，请等待审核结果');
				    this.accountInfo.realNameAuthentication.status = 'auditing';
				})
				.fail((jqXHR, textStatus, errorThrown) => {
				    this.$message(JSON.parse(jqXHR.responseText).responseText);
				});
			},
			// 重新审核
			review() {
				$('#authenticationLayer').modal({
				onHide: () => {
					this.$emit('updateLayerFlag', '');
				},
				onHidden: () => {
					$('#authenticationLayer').remove();
				}
			}).modal('show');
			}
		}
	}
</script>

<style scoped>
	.upload_box {
    display: inline-block;
    position: relative;
    z-index: 10
}

.upload_box input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    filter: opacity(0);
    cursor: pointer;
}
</style>