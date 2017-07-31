<template>
	<div>
		<div class="ui mini modal" id="atmPassword">
			<i class="close icon"></i>
			<div class="header">
					设置取款密码
			</div>
			<div class="content">
				<div class="ui form">
					<div class="field">
						<label for="">手机号码</label>
						<input type="text" placeholder="输入手机号码" v-model="atmPasswordModel.phone" v-vali="JSON.stringify({required:true,isMobile:true})" filed="atmPasswordModel.phone">
						<div v-if="$verify.$errors['atmPasswordModel.phone']" class="ui red basic pointing label">
							{{$verify.$errors['atmPasswordModel.phone']}}
						</div>
					</div>
					 <div class="field">
				 		<label for="">图形验证码</label>
  							<div class="mob-two fields">
								 <div class="eleven wide field">
										 <input type="text" v-model="atmPasswordModel.captcha" v-vali="JSON.stringify({required: true,minLength:4})" maxlength="4" filed="atmPasswordModel.captcha" placeholder="输入4位验证码">
										 <div v-if="$verify.$errors['atmPasswordModel.captcha']" class="ui red basic pointing label">
											{{$verify.$errors['atmPasswordModel.captcha']}}
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
								<input type="text" v-model="atmPasswordModel.verificationCode" v-vali="JSON.stringify({required: true,isNumber: true,minLength:6})" maxlength="6" filed="atmPasswordModel.verificationCode" placeholder="输入6位短信验证码">
								<div v-if="$verify.$errors['atmPasswordModel.verificationCode']" class="ui red basic pointing label">
									{{$verify.$errors['atmPasswordModel.verificationCode']}}
								</div>
							</div>
							<div class="five wide field">
								<button class="ui button blue fluid basic" type="button" :disabled="($verify.$errors['atmPasswordModel.phone']||$verify.$errors['atmPasswordModel.captcha'])?true:false" @click="sendSimCode">发送验证</button>
							</div>
						</div>
					</div>
					<div class="field">
						<label for="">新取款密码</label>
						<div class="six mob-six fields" @keydown.8="backInput">
	              <div class="field n-mb">
	                  <input type="password" maxlength="1" class="text-center" v-model="pwd[0]">
	              </div>
	              <div class="field n-mb">
	                  <input type="password" maxlength="1" class="text-center" v-model="pwd[1]">
	              </div>
	              <div class="field n-mb">
	                  <input type="password" maxlength="1" class="text-center" v-model="pwd[2]">
	              </div>
	              <div class="field n-mb">
	                  <input type="password" maxlength="1" class="text-center" v-model="pwd[3]">
	              </div>
	              <div class="field n-mb">
	                  <input type="password" maxlength="1" class="text-center" v-model="pwd[4]">
	              </div>
	              <div class="field n-mb">
	                  <input type="password" maxlength="1" class="text-center" v-model="pwd[5]">
	              </div>
	          </div>
						<input type="hidden" v-model="atmPasswordModel.atmPassword" v-vali="JSON.stringify({required: true, minLength:6})" filed="atmPasswordModel.atmPassword" placeholder="输入6位数字取款密码">
				  		<div v-if="$verify.$errors['atmPasswordModel.atmPassword']" class="ui red basic pointing label">
							{{$verify.$errors['atmPasswordModel.atmPassword']}}
						</div>
					</div>
				</div>
			</div>
			<div class="actions text-center">
				<div class="ui button blue" @click="atmPassword">确定</div>
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
				sessionId: '',
      	captchaToken: '',
      	simToken: '',
				atmPasswordModel: {
        	phone: '',
        	captcha: '',
        	verificationCode: '',
        	atmPassword: ''
        },
        pwd: ['','','','','','']
			}
		},
		watch: {
        // 贝宝账户密码
        pwd() {
            let str = '',flag = false;
            this.pwd.forEach((k, v) => {
                if (!flag) {
                    if(k.length === 0){
                        $('[type=password]').eq(v).focus();
                        flag = true;
                    }
                }
                str += k;
            });
            this.atmPasswordModel.atmPassword = str;
        }
    },
		mounted () {
			// 取款密码
			$('#atmPassword').modal({
				onHide: () => {
					this.$emit('updateLayerFlag', '');
				},
				onHidden: () => {
					$('#atmPassword').remove();
				}
			}).modal('show');

			this.getCaptcha();
		},
		methods: {
			// 更新图片验证码
			getCaptcha () {
				Auth.getCaptcha(this)
			},
			// 发送短息验证码
			sendSimCode (e) {
					let _this = this;
	        let data = {
	            captcha: this.atmPasswordModel.captcha,
	            phone: this.atmPasswordModel.phone,
	            token: this.captchaToken,
	            sessionId: this.sessionId
	        }
	        Auth.getMobileCaptcha(this, data).then(response => {
	            e.target.innerHTML = '短信已发送'
	            e.target.disabled = true
	            timers(e.target)
	        }).catch(e => {
	        	_this.$message(JSON.parse(e.responseText).responseText);
	        })
      },
      // 检查验证码是否正确
      checkVerificationCode () {
          let _this = this;
          let data = {
              phone: this.atmPasswordModel.phone,
              verificationCode: this.atmPasswordModel.verificationCode,
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
							    url: API_URL + "user/setManagepwd",
							    type: "POST",
							    contentType: "application/json",
							    data: JSON.stringify({
							    		"phone": _this.atmPasswordModel.phone,
							        "managepwd": _this.atmPasswordModel.atmPassword
							    })
							})
							.done(function(data, textStatus, jqXHR) {
								_this.$message('取款密码设置成功');
							    $('#atmPassword').modal('hide');
							})
							.fail(function(jqXHR, textStatus, errorThrown) {
							    _this.$message(JSON.parse(jqXHR.responseText).responseText);
							});
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
              _this.$message(JSON.parse(jqXHR.responseText).responseText);
          });
      },
			//同步重置密码
			async atmPassword () {
				try {
            await this.$verify.check().then();
        } catch (e) {
            return false
        }
				this.checkVerificationCode();
			},
			// 返回上一个输入框
      backInput (e) {
          if ($(e.target).val().length > 0) {
              $(e.target).focus();
          } else {
              $(e.target).closest('.field').prev('.field').find('[type=password]').focus();
          }   
      }
		}
	}
</script>