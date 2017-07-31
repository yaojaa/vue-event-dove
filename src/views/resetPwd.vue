<template>
	<div>
		<div class="ui mini modal" id="resetPwd">
			<i class="close icon"></i>
			<div class="header">
					重置密码
			</div>
			<div class="content">
			 	<div class="ui form"> 
					 <div class="field">
							 <label for="">旧密码</label>
							 <input type="password" placeholder="输入当前密码" v-model="oldpwd" v-vali="JSON.stringify({required:true,minLength:6,maxLength:32})" filed="oldpwd">
							 <div class="input-block">提示：若为第三方登录，初始密码为123456</div>
							 <div v-if="$verify.$errors['oldpwd']" class="ui red basic pointing label">
									{{$verify.$errors['oldpwd']}}
							 </div>
					 </div>
					 <div class="field mb-n">
							 <label for="">新密码</label>
							 <input type="password" eventName="input" v-model="newpwd" placeholder="输入6～32位密码" v-vali="JSON.stringify({required:true,minLength:6,maxLength:32,passwordstrength:true})" filed="newpwd">
							 <div v-if="$verify.$errors['newpwd']" class="ui red basic pointing label">
									{{$verify.$errors['newpwd']}}
								</div>
					 </div>
					 <div class="field">
						 <div class="input-block">
								<div class="ui mini label" :class="{'yellow':$verify.$info['newpwd']>=1}">
									弱
								</div>
								<div class="ui mini label" :class="{'orange':$verify.$info['newpwd']>=2}">
									中
								</div>
								<div class="ui mini label" :class="{'green':$verify.$info['newpwd']==3}">
									高
								</div>
						 </div>
					 </div>
					 <div class="field">
						<label for="">确认新密码</label>
						<input type="password" v-model="newpwd2" placeholder="请再次填写密码" v-vali="JSON.stringify({required:true,minLength:6,maxLength:32})" filed="newpwd2">
						<div v-if="$verify.$errors['newpwd2']" class="ui red basic pointing label">
							{{$verify.$errors['newpwd2']}}
						</div>
						<div v-if="!$verify.$errors['newpwd2'] && (newpwd != newpwd2)" class="ui red basic pointing label">
							两次密码输入不一致
						</div>
					 </div>
				 </div>
			</div>
			<div class="actions text-center">
					<div class="ui button blue" @click="resetPwd">确定</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {API_URL} from '../config'
	export default {
		verify:true,
		data () {
			return {
				oldpwd:'',
				newpwd:'',
				newpwd2:''
			}
		},
		mounted () {
			// 重置密码
			$('#resetPwd').modal({
				onHide: (el) => {
					this.$emit('updateLayerFlag', '');
				},
				onHidden: () => {
					$('#resetPwd').remove();
				}
			}).modal('show');
		},
		methods: {
			//同步重置密码
			async resetPwd () {
				try {
	                await this.$verify.check().then()
	            } catch (e) {
	                return false
	            }
				let _this = this;
				$.ajax({
					url: API_URL+"user/directUpdatePwd",
					async:false,
					type: "POST",
					contentType: "application/json",
					data: JSON.stringify({
						"originPwd": _this.oldpwd,
						"password": _this.newpwd
					})
				}).done((data, textStatus, jqXHR) => {
					_this.$message('密码修改成功，请重新登录')
					$('#resetPwd').modal('hide');
					_this.$store.dispatch('USER_SIGNOUT')
					_this.$router.replace({
						path: '/login'
					})
				})
				.fail((jqXHR, textStatus, errorThrown) => {
					_this.$message(JSON.parse(jqXHR.responseText).responseText);
				});
			}
		}
	}
</script>