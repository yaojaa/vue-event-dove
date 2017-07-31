<template>  
    <div class="user-bg">
        <div class="login-wrap transition visible recover">
            <div class="por animated-box">
                <router-link to="/" class="login-logo"></router-link>
                <div class="ui column centered doubling stackable grid">
                    <div class="thirteen wide column">
                        <div class="ui  pointing secondary menu item two">
                            <a class="active item" @click="active=true" data-tab="first"><h3 class="fwn">手机找回</h3></a>
                            <a class="item" @click="active=false" data-tab="second"><h3 class="fwn">邮箱找回</h3></a>
                        </div>
                        <div class="ui error message" v-show="error.length > 0">
                            <p>{{error}}</p>
                        </div>
                        <div class="ui tab active" data-tab="first">
                            <form class="ui form f15" v-if="active">
                                <div class="fields" :class="{ error: $verify.$errors['regByMobilefields.phone.value'] }">
                                    <div class="four wide mob-hide field">
                                        <select class="ui compact selection dropdown" v-ui>
                                            <option value="">+86</option>
                                        </select>
                                    </div>
                                    <div class="twelve wide field">
                                        <div class="ui left  input">
                                            <input type="tel" maxlength="11"  name="phone" 
                                                    v-model="regByMobilefields.phone.value" v-vali="regByMobilefields.phone.rules" :message="JSON.stringify(regByMobilefields.phone.messages)" filed="regByMobilefields.phone.value"  placeholder="输入手机号">
                                        </div>
                                        <div v-if="$verify.$errors['regByMobilefields.phone.value']" class="ui pointing red basic label">
                                            <div> {{$verify.$errors['regByMobilefields.phone.value']}} </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mob-two fields" :class="{ error: $verify.$errors['regByMobilefields.captcha.value'] }">
                                    <div class="ten wide field">
                                        <div class="ui left icon input">
                                            <input type="tel" maxlength="4" name="captcha" 
                                                    v-model="regByMobilefields.captcha.value" v-vali="regByMobilefields.captcha.rules" :message="JSON.stringify(regByMobilefields.captcha.messages)" filed="regByMobilefields.captcha.value" placeholder="验证码">
                                            <i class="icon checkmark green" v-show="isCorrect"></i>
                                            <i class="privacy icon" v-show="!isCorrect"></i>
                                        </div>
                                        <div v-if="$verify.$errors['regByMobilefields.captcha.value']" class="ui pointing red basic label">
                                            <div> {{$verify.$errors['regByMobilefields.captcha.value']}} </div>
                                        </div>
                                    </div>
                                    <div class="eight wide field SVG_CAPTCHA" @click="getCaptcha">
                                    </div>
                                </div>
                                <div class="mob-two fields">
                                    <div class="ten wide field" :class="{ error: $verify.$errors['regByMobilefields.verificationCode.value'] }">
                                        <div class="ui left icon input">
                                            <input type="tel" maxlength="6" name="verificationCode" 
                                                    v-model="regByMobilefields.verificationCode.value" v-vali="regByMobilefields.verificationCode.rules" :message="JSON.stringify(regByMobilefields.verificationCode.messages)" filed="regByMobilefields.verificationCode.value" placeholder="输入6位短信验证码">
                                            <i class="comment outline icon"></i>
                                        </div>
                                        <div v-if="$verify.$errors['regByMobilefields.verificationCode.value']" class="ui pointing red basic label">
                                            <div> {{$verify.$errors['regByMobilefields.verificationCode.value']}} </div>
                                        </div>
                                    </div>
                                    <div class="six wide field">
                                        <button type="button" class="ui blue button fluid f15" @click="sendSimCode" :disabled="$verify.$errors['regByMobilefields.captcha.value']!=''||$verify.$errors['regByMobilefields.phone.value']!=''||regByMobilefields.captcha.value==''||regByMobilefields.phone.value==''||timering||!isCorrect">发送验证码</button>
                                    </div>
                                </div>
                                <div class="ui animated fade button blue fluid large" @click="mobileReg">
                                    <div class="visible content">下一步</div>
                                    <div class="hidden content">
                                        下一步<i class="chevron circle right icon"></i>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="ui tab" data-tab="second">
                            <form class="ui form f15" v-if="!active">
                                <div class="field" :class="{ error: $verify.$errors['regByEmailfields.email.value'] }">
                                    <div class="ui left icon input">
                                        <input type="email" name="email" 
                                                    v-model="regByEmailfields.email.value" v-vali="regByEmailfields.email.rules" :message="JSON.stringify(regByEmailfields.email.messages)" filed="regByEmailfields.email.value" placeholder="请输入您的邮箱">
                                        <i class="mail icon"></i>
                                    </div>
                                    <!--错误提示-->
                                    <div v-if="$verify.$errors['regByEmailfields.email.value']" class="ui pointing red basic label">
                                        <div> {{$verify.$errors['regByEmailfields.email.value']}} </div>
                                    </div>
                                    <!--错误提示-->
                                </div>
                                <div class="mob-two fields" :class="{ error: $verify.$errors['regByEmailfields.captcha.value'] }">
                                    <div class="ten wide field">
                                        <div class="ui left icon input">
                                            <input type="tel" maxlength="4" name="captcha" 
                                                    v-model="regByEmailfields.captcha.value" v-vali="regByEmailfields.captcha.rules" :message="JSON.stringify(regByEmailfields.captcha.messages)" filed="regByEmailfields.captcha.value" placeholder="验证码">
                                            <i class="icon checkmark green" v-show="isCorrect"></i>
                                            <i class="privacy icon" v-show="!isCorrect"></i>
                                        </div>
                                        <div v-if="$verify.$errors['regByEmailfields.captcha.value']" class="ui pointing red basic label">
                                            <div> {{$verify.$errors['regByEmailfields.captcha.value']}} </div>
                                        </div>
                                    </div>
                                    <div class="eight wide field SVG_CAPTCHA" @click="getCaptcha">
                                    </div>
                                </div>
                                <div class="ui animated fade button blue fluid large" @click="emailReg">
                                    <div class="visible content">下一步</div>
                                    <div class="hidden content">
                                        下一步<i class="chevron circle right icon"></i>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Auth from '../auth'
import {
    mapGetters
} from 'vuex'
import {
    debounce
} from '../utils'
export default {
    name: 'findPwd',
    verify:true,
    data() {
        return {
            timering:false,
            active:true,
            isCorrect: false,
            captcha: '', //图片验证码
            captchaToken: '',
            error: '',
            simToken: '',
            regByEmailfields: {
                email: {
                    rules: {
                        required: true,
                        isEmail: true,
                        isexisted: function(val) {
                            return !Auth.isemailExist(val);
                        }
                    },
                    value: '',
                    messages: {
                        required: '邮箱不能为空',
                        isEmail: '邮箱格式不正确',
                        isexisted: '该邮箱未注册'
                    }
                },
                captcha: {
                    rules: {
                        required: true,
                        minLength: 4,
                        valicaptcha: (val) => {
                            return Auth.isCaptcha(val, this)
                        }
                    },
                    value: '',
                    messages: {
                        required: '验证码不能为空',
                        minLength: '请正确填写验证码',
                        valicaptcha: '验证码错误'
                    }
                }
            },
            regByMobilefields: {
                phone: {
                    rules: {
                        required: true,
                        isMobile: true,
                        isexisted: function(val) {
                            return !Auth.isphoneExist(val);
                        }
                    },
                    value: '',
                    messages: {
                        required: '手机号不能为空',
                        isMobile: '手机号格式不正确',
                        isexisted: '该手机号未注册'
                    }
                },
                captcha: {
                    rules: {
                        required: true,
                        minLength: 4,
                        valicaptcha: (val) => {
                            return Auth.isCaptcha(val, this)
                        }
                    },
                    value: '',
                    messages: {
                        required: '验证码不能为空',
                        minLength: '请正确填写验证码',
                        valicaptcha: '验证码错误'
                    }
                },
                verificationCode: {
                    nameInMessage: '短信验证码',
                    rules: {
                        required: true,
                        minLength: 6
                    },
                    value: '',
                    messages: {
                        required: '短信验证码不能为空',
                        minLength: '请正确输入短信验证码'
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            userStatus: 'userStatus'
        })
    },
    watch:{
        error(value){
            if(value!=''){
                let timer = setTimeout(()=>{
                    this.error = '';
                },2000)
            }
        }
    },
    mounted() {
        Auth.getCaptcha(this)
            //已登录跳转到首页
        if (this.userStatus.id) {
            this.$router.replace({
                path: '/'
            })
        }

        // this.$validate('emailRegvalidation', this.regByEmailfields)
        var _this = this
        document.title = '找回密码'
        $('.animated-box').transition('horizontal flip in')
        $('.login-wrap .menu .item').tab({
            onLoad: function() {
                _this.clear()
                $(this).find('form').transition('fade up in')
            }
        })
    },
    methods: {
        clear() {
            this.error = '';
            this.regByMobilefields.captcha.value = '';
            this.regByMobilefields.phone.value = ''
            this.regByMobilefields.verificationCode.value = ''
            this.regByEmailfields.email.value = '';
            this.regByEmailfields.captcha.value = '';
            this.$verify.clear();
            this.getCaptcha();
        },
        getCaptcha: function() {
            Auth.getCaptcha(this)
            this.regByMobilefields.captcha.value = '';
            this.regByEmailfields.captcha.value = '';
        },
        sendSimCode: function(e) {
            this.error = ''

            let data = {
                captcha: this.regByMobilefields.captcha.value,
                phone: this.regByMobilefields.phone.value,
                token: this.captchaToken,
                sessionId: this.sessionId
            }
            Auth.getMobileCaptcha(this, data).then(response => {
                e.target.innerHTML = '短信已发送'
                this.timering = true;
                this.simToken = response.token;
                Auth.timer(this, e.target)
            }).catch(e => {
                this.error = JSON.parse(e.responseText).responseText
            })
        },
        emailReg(e) {
            var _this = this;
            // console.log(this.validation.check())
            this.$verify.check().then(response => {
                Object.assign(response, {
                    token: this.captchaToken,
                    sessionId: this.sessionId
                })
                Auth.valicaptchacode(this, response, () => {
                    response.indexUrl = 0;
                    Auth.sendemail(this, response, () => {
                        this.$router.push({
                            name: 'activateAccount',
                            params: {
                                id: response.email.replace('.', '&'),
                                status: 0
                            }
                        })
                    })
                })


            }).catch(e => {
                console.error('验证未通过')
            })
        },
        mobileReg(e) {
            this.$verify.check().then(values => {
                Object.assign(values, {
                    token: this.simToken
                })
                Auth.valismscode(this, values, (data) => {
                    this.$router.push({
                        path: '/user/reset_pwd?token=' + this.simToken + '&phone=' + values.phone + '&verificationCode=' + values.verificationCode
                    })
                })
            }).catch(e => {
                console.error('验证未通过')
            })
        }
    }
}
</script>
<style scoped>
@import "../assets/css/login.css";
</style>
