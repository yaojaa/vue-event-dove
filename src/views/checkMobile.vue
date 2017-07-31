<template>
	<div>
		<div class="ui mini modal" id="checkMobile">
			<i class="close icon"></i>
			<div class="header">
				手机验证
			</div>
			<div class="content">
				<p class="text-info mb-md" v-if="accountInfo.phone">当前已验证的手机号：{{accountInfo.phone}}</p>
				<div class="ui horizontal divider" v-if="accountInfo.phone">修改手机号</div>
				<div class="ui form">
						<!-- <div class="field">
							<label for="">当前账号密码</label>
							<input type="password" v-model="mobileLayer.password" v-vali="JSON.stringify({required: true,minLength: 6,maxLength: 32})" filed="mobileLayer.password" placeholder="输入6～32位密码">
							<div v-if="$verify.$errors['mobileLayer.password']" class="ui red basic pointing label">
								{{$verify.$errors['mobileLayer.password']}}
							</div>
						 </div> -->
						 <div class="field">
								 <label for="">新的手机号码</label>
								 <input type="text" placeholder="输入新的手机号码" v-vali="JSON.stringify({required: true,isMobile: true})" filed="mobileLayer.phone" v-model="mobileLayer.phone" >
								 <div v-if="$verify.$errors['mobileLayer.phone']" class="ui red basic pointing label">
									{{$verify.$errors['mobileLayer.phone']}}
								</div>
						 </div>
						 <div class="field">
					 		<label for="">图形验证码</label>
          					<div class="mob-two fields">
								<div class="eleven wide field">
									<input type="text" v-model="mobileLayer.captcha" v-vali="JSON.stringify({required: true})" maxlength="4" filed="mobileLayer.captcha" placeholder="输入4位验证码">
									<div v-if="$verify.$errors['mobileLayer.captcha']" class="ui red basic pointing label">
										{{$verify.$errors['mobileLayer.captcha']}}
									</div>
								</div>
								<div class="five wide field SVG_CAPTCHA" @click="getCaptcha">
								</div>
							</div>
						 </div>
						 <div class="field">
							 <label for="">短信验证码</label>
							 <div class="mob-two fields">
									 <div class="eleven wide field">
											 <input type="text" v-model="mobileLayer.verificationCode" v-vali="JSON.stringify({required: true,isNumber: true})" maxlength="6" filed="mobileLayer.verificationCode" placeholder="输入6位短信验证码">
											 <div v-if="$verify.$errors['mobileLayer.verificationCode']" class="ui red basic pointing label">
												{{$verify.$errors['mobileLayer.verificationCode']}}
											</div>
									 </div>
									 <div class="five wide field">
											 <button class="ui button blue fluid basic" type="button" :disabled="($verify.$errors['mobileLayer.phone']||$verify.$errors['mobileLayer.captcha'])?true:false" @click="sendSimCode">发送验证</button>
									 </div>
							 </div>
					  </div>
				 </div>
			</div>
			<div class="actions text-center">
				<div class="ui button blue" @click="updatePhone">确定</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {API_URL} from '../config'
	import Auth from '../auth'

	/**60s*/
	var timers = function(el) {
	    var time = 60;
	    var interval = setInterval(function() {
	        time--
	        el.innerHTML = time

	        if (time <= 0) {
	            clearInterval(interval)
	            el.innerHTML = '发送验证码'
	            el.disabled = false
	        }
	    }, 1000)
	}

	export default {
		verify:true,
		props: ['accountInfo'],
		data () {
			return {
				captcha: '',
				simToken: '',
				sessionId: '',
            	captchaToken: '',
				mobileLayer: {
	            	// password: '',
	            	phone: '',
	            	captcha: '',
	            	verificationCode: ''
	            }
			}
		},
		mounted () {
			// 手机验证
			$('#checkMobile').modal({
				onHide: (el) => {
					this.$emit('updateLayerFlag', '');
				},
				onHidden: () => {
					$('#checkMobile').remove();
				}
			}).modal('show');

			this.getCaptcha();
		},
		methods: {
			// 更新图片验证码
			getCaptcha () {
				Auth.getCaptcha(this)
			},
			// 手机验证发送短息验证码
			sendSimCode (e) {
				let _this = this;
	            let data = {
	                captcha: this.mobileLayer.captcha,
	                phone: this.mobileLayer.phone,
	                token: this.captchaToken,
	                sessionId: this.sessionId
	            }
	            Auth.getMobileCaptcha(_this,data).then(response => {
	                e.target.innerHTML = '短信已发送'
	                e.target.disabled = true
	                timers(e.target)
	            }).catch(e => {
	            	_this.$message(JSON.parse(e.responseText).responseText);
	                this.error = e
	            })
	        },
	        // 检查验证码是否正确
	        checkVerificationCode () {
	            let _this = this;
	            let data = {
	                phone: this.mobileLayer.phone,
	                verificationCode: this.mobileLayer.verificationCode,
	                token: this.simToken,
	            }
	            jQuery.ajax({
	                url: API_URL + "user/checkVerificationCode",
	                type: "POST",
	                contentType: "application/json",
	                data: JSON.stringify(data)
	            })
	            .done(function(data, textStatus, jqXHR) {
									jQuery.ajax({
									    url: API_URL + "user/updatePhone",
									    type: "POST",
									    contentType: "application/json",
									    data: JSON.stringify({
									        // "password": _this.mobileLayer.password,
									        "phone": _this.mobileLayer.phone,
									        "verificationCode": _this.mobileLayer.verificationCode,
									        "token": _this.simToken
									    })
									})
									.done(function(data, textStatus, jqXHR) {
									    _this.$message('手机号修改成功');
										$('#checkMobile').modal('hide');
									})
									.fail(function(jqXHR, textStatus, errorThrown) {
									    _this.$message(JSON.parse(jqXHR.responseText).responseText);
									});
	            })
	            .fail(function(jqXHR, textStatus, errorThrown) {
	                _this.$message(JSON.parse(jqXHR.responseText).responseText);
	            });
	        },
			// 修改手机号码
			async updatePhone () {
				try {
	                await this.$verify.check().then()
	            } catch (e) {
	                return false
	            }
				this.checkVerificationCode();
			}
		}
	}
</script>