<template>
    <div class="user-bg">
        <div class="login-wrap transition visible">
            <div class="por animated-box">
                <router-link to="/" class="login-logo"></router-link>
                <div class="ui grid doubling stackable grid  horizontally">
                    <div class="nine wide column">
                        <div class="ui column centered doubling stackable grid">
                            <div class="twelve wide column">
                                <div class="ui  pointing secondary menu item two">
                                    <a class="active item" @click="active=true" data-tab="first"><h3 class="fwn">登录</h3></a>
                                    <a class="item" @click="active=false" data-tab="second"><h3 class="fwn">手机动态码登录</h3></a>
                                </div>
                                <div class="ui error message" v-show="error.length > 0">
                                    <p>{{error}}</p>
                                </div>
                                <div class="ui tab active" data-tab="first" @keyup.enter="loginByPwdSubmit">
                                    <form class="ui form f15" v-if="active" v-bind:class="{'loading': loading}">
                                        <div class="field" :class="{ error: $verify.$errors['loginByPwdfields.username.value'] }">
                                            <div class="ui left icon input">
                                                <input type="text" name="username" 
                                                v-model="loginByPwdfields.username.value" v-vali="loginByPwdfields.username.rules" :message="JSON.stringify(loginByPwdfields.username.messages)" filed="loginByPwdfields.username.value" 
                                                placeholder="手机号／邮箱">
                                                <i class="user icon"></i>
                                            </div>
                                            <div v-if="$verify.$errors['loginByPwdfields.username.value']" class="ui pointing red basic label">
                                                <div> {{$verify.$errors['loginByPwdfields.username.value']}} </div>
                                            </div>
                                        </div>
                                        <div class="field" :class="{ error: $verify.$errors['loginByPwdfields.password.value'] }">
                                            <div class="ui left icon input">
                                                <input type="password" maxlength="32"  name="password" 
                                                v-model="loginByPwdfields.password.value" v-vali="loginByPwdfields.password.rules" :message="JSON.stringify(loginByPwdfields.password.messages)" filed="loginByPwdfields.password.value"  placeholder="输入6～32位密码">
                                                <i class="lock icon"></i>
                                            </div>
                                            <div v-if="$verify.$errors['loginByPwdfields.password.value']" class="ui pointing red basic label">
                                                <div> {{$verify.$errors['loginByPwdfields.password.value']}} </div>
                                            </div>
                                        </div>
                                        <div class="mob-two fields" :class="{ error: $verify.$errors['loginByPwdfields.captcha.value']}">
                                            <div class="eight wide field">
                                                <div class="ui left icon input">
                                                    <input type="text" maxlength="4" name="captcha" 
                                                v-model="loginByPwdfields.captcha.value" v-vali="loginByPwdfields.captcha.rules" :message="JSON.stringify(loginByPwdfields.captcha.messages)" filed="loginByPwdfields.captcha.value"  placeholder="验证码">
                                                    <i class="icon checkmark green" v-show="isCorrect"></i>
                                                    <i class="privacy icon" v-show="!isCorrect"></i>
                                                </div>
                                                <div v-if="$verify.$errors['loginByPwdfields.captcha.value']" class="ui pointing red basic label">
                                                    <div> {{$verify.$errors['loginByPwdfields.captcha.value']}} </div>
                                                </div>
                                            </div>
                                            <div class="eight wide field SVG_CAPTCHA" @click="getCaptcha">
                                            </div>
                                        </div>
                                        <!-- <div class="field">
                                        <div class="ui checkbox checked">
                                            <input type="checkbox">
                                            <label class="text-muted">7天内免费登录</label>
                                        </div>
                                    </div> -->
                                        <button type="button" class="ui button blue fluid large" @click="loginByPwdSubmit">
                                            登 录
                                        </button>
                                        <div class="ui vertically padded grid mt-n">
                                            <div class="left aligned eight wide column ">
                                                <router-link to="/findPwd">忘记密码？</router-link>
                                            </div>
                                            <div class="right aligned eight wide column text-info ">没有账号？
                                                <router-link to="/reg">注册</router-link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="ui tab" data-tab="second" @keyup.enter="loginByMobileSubmit">
                                    <form class="ui form f15" v-if="!active" v-bind:class="{'loading': loading}">
                                        <div class="fields" :class="{error: $verify.$errors['loginByMobilefields.phone.value'] }">
                                            <div class="four wide field mob-hide">
                                                <select class="ui compact selection dropdown" v-ui>
                                                    <option value="">+86</option>
                                                </select>
                                            </div>
                                            <div class="twelve wide field" :class="{error: !loginByMobilefields.phone.valid && loginByMobilefields.phone.dirty }">
                                                <div class="ui left icon input">
                                                    <input type="tel" name="phone" 
                                                v-model="loginByMobilefields.phone.value" v-vali="loginByMobilefields.phone.rules" :message="JSON.stringify(loginByMobilefields.phone.messages)" filed="loginByMobilefields.phone.value" placeholder="输入手机号">
                                                    <i class="icon mobile"></i>
                                                </div>
                                                <div v-if="$verify.$errors['loginByMobilefields.phone.value']" class="ui pointing red basic label">
                                                    <div> {{$verify.$errors['loginByMobilefields.phone.value']}} </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mob-two fields">
                                            <div class="eight wide field" :class="{error: $verify.$errors['loginByMobilefields.captcha.value']}">
                                                <div class="ui left icon input">
                                                    <input type="text" maxlength="4" name="captcha"  placeholder="验证码"
                                                v-model="loginByMobilefields.captcha.value" v-vali="loginByMobilefields.captcha.rules" :message="JSON.stringify(loginByMobilefields.captcha.messages)" filed="loginByMobilefields.captcha.value" >
                                                    <i class="icon checkmark green" v-show="isCorrect"></i>
                                                    <i class="privacy icon" v-show="!isCorrect"></i>
                                                </div>
                                                <div v-if="$verify.$errors['loginByMobilefields.captcha.value']" class="ui pointing red basic label">
                                                    <div> {{$verify.$errors['loginByMobilefields.captcha.value']}} </div>
                                                </div>
                                            </div>
                                            <div class="eight wide field SVG_CAPTCHA" @click="getCaptcha">
                                            </div>
                                            <!-- <div v-if="loginByMobilefields.captcha.dirty && !loginByMobilefields.captcha.valid">
                                            <div v-for="error in loginByMobilefields.captcha.errors"> {{error.message}} </div>
                                        </div> -->
                                        </div>
                                        <div class="mob-two fields">
                                            <div class="eight wide field" :class="{error: $verify.$errors['loginByMobilefields.verificationCode.value'] }">
                                                <div class="ui left icon input">
                                                    <input type="text" maxlength="6" name="verificationCode" 
                                                v-model="loginByMobilefields.verificationCode.value" v-vali="loginByMobilefields.verificationCode.rules" :message="JSON.stringify(loginByMobilefields.verificationCode.messages)" filed="loginByMobilefields.verificationCode.value"  placeholder="短信验证码">
                                                    <i class="comment outline icon"></i>
                                                </div>
                                                <div v-if="$verify.$errors['loginByMobilefields.verificationCode.value']" class="ui pointing red basic label">
                                                    <div> {{$verify.$errors['loginByMobilefields.verificationCode.value']}} </div>
                                                </div>
                                            </div>
                                            <div class="eight wide field">
                                                <button type="button" class="ui blue button fluid f15" @click="sendSimCode" :disabled="$verify.$errors['loginByMobilefields.captcha.value']!=''||$verify.$errors['loginByMobilefields.phone.value']!=''||loginByMobilefields.captcha.value==''||loginByMobilefields.phone.value==''||timering||!isCorrect">获取验证码 </button>
                                            </div>
                                        </div>
                                        <!--       <div class="field">
                                        <div class="ui checkbox checked">
                                            <input type="checkbox">
                                            <label class="text-muted">7天内免费登录</label>
                                        </div>
                                    </div> -->
                                        <button type="button" class="ui button blue fluid large" @click="loginByMobileSubmit">
                                            登 录
                                        </button>
                                        <div class="ui vertically padded grid mt-n">
                                            <div class="left aligned eight wide column ">
                                                <router-link to="/findPwd">忘记密码？</router-link>
                                            </div>
                                            <div class="right aligned eight wide column text-info ">没有账号？
                                                <router-link to="/reg">注册</router-link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui vertical divider text-muted or">Or</div>
                    <div class="seven wide middle aligned  column">
                        <div class="ui column centered doubling stackable computer only tablet only grid">
                            <third-party-login></third-party-login>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Auth from '../auth'
import {
    loadJs
} from '../utils/index.js'
export default {
    name: 'login',
    verify:true,
    data() {
        return {
            timering:false,
            active:true,
            isCorrect: false,
            loading: '',
            error: '',
            loginByPwd: '',
            loginByMobile: '',
            captcha: '',
            sessionId: '',
            captchaToken: '',
            simToken: ' ',
            keepLogin: false,
            loginByPwdfields: {
                username: {
                    rules: {
                        required: true,
                        ismobileOrEmail: val => {
                            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val) || /^1[3|4|5|7|8][0-9]{9}$/.test(val)
                        },
                        isPexisted: (val) => {
                            return !Auth.isPhone(val)||!Auth.isphoneExist(val)
                        },
                        isEexisted: (val) => {
                            return !Auth.isEmail(val)||!Auth.isemailExist(val)
                        }
                    },
                    value: '',
                    messages: {
                        required:'用户名不能为空',
                        ismobileOrEmail: '必须是邮箱或者手机号',
                        isPexisted: '该手机号未注册',
                        isEexisted: '该邮箱未注册',
                    }
                },
                password: {
                    rules: {
                        required: true,
                        minLength: 6,
                        maxLength: 32
                    },
                    value: '',
                    messages: {
                        required: '密码不能为空',
                        minLength: '请正确填写密码',
                        maxLength: '请正确填写密码'
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
            loginByMobilefields: {
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
    beforeRouteEnter(to, from, next) {
        next(vm => {
            //如果登录
            if (localStorage.getItem('user')) {
                vm.$router.replace({
                    path: '/'
                })
            }
        })
    },
    mounted() {
        // this.$validate('loginByPwd', this.loginByPwdfields)
        // this.$validate('loginByMobile', this.loginByMobilefields)
        let _this = this;
        $('.login-wrap .menu .item').tab({
            onLoad: function() {
                _this.clear()
                $(this).find('form').transition('horizontal flip in')
            }
        })
        $('.animated-box').transition('horizontal flip in')
        Auth.getCaptcha(this)
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        $('#nologntips').addClass('hidden')
        next()
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
    methods: {
        clear() {
            this.error = '';
            this.loginByPwdfields.username.value = '';
            this.loginByPwdfields.password.value = '';
            this.loginByPwdfields.captcha.value = '';
            this.loginByMobilefields.verificationCode.value = '';
            this.loginByMobilefields.phone.value = '';
            this.loginByMobilefields.captcha.value = '';
            this.$verify.clear();
            Auth.getCaptcha(this);
        },
        getCaptcha: function() {
            Auth.getCaptcha(this)
            this.loginByPwdfields.captcha.value = '';
            this.loginByMobilefields.captcha.value = '';
        },
        sendSimCode: function(e) {
            let data = {
                captcha: this.loginByMobilefields.captcha.value,
                phone: this.loginByMobilefields.phone.value,
                token: this.captchaToken,
                sessionId: this.sessionId
            }
            Auth.getMobileCaptcha(this, data).then(response => {
                e.target.innerHTML = '短信已发送'
                this.timering = true
                Auth.timer(this, e.target)
            }).catch(e => {
                console.log(e);
                this.error = JSON.parse(e.responseText).responseText
            })
        },
        loginByPwdSubmit(e) {
            this.loading = true
            let _this = this;
            this.$verify.check().then(function(values) {
                let postData = Object.assign(values, {
                    token: _this.captchaToken,
                    sessionId: _this.sessionId
                })
                Auth.login(_this, postData, _this.$route.query.redirect || '/')
            }).catch(function(e) {
                _this.loading = false
            })
        },
        loginByMobileSubmit() {
            this.$verify.check().then((values) => {
                let postData = Object.assign(values, {
                    token: this.simToken,
                    username: values.phone
                })
                Auth.login(this, postData, _this.$route.query.redirect || '/')
            }).catch(function(e) {
                console.error(e,'验证不通过')
            })
        }
    },
    components: {
        thirdPartyLogin: function(resolve) {
            require(['./third-party-login/index.vue'], resolve)
        }
    }
}
</script>
<style scoped>
@import "../assets/css/login.css"
</style>
