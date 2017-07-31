<template>
    <div class="user-bg">
        <div class="login-wrap transition visible">
            <div class="por animated-box">
                <a href="/" class="login-logo"></a>
                <div class="ui grid doubling stackable grid  horizontally">
                    <div class="nine wide column">
                        <div class="ui column centered doubling stackable grid">
                            <div class="twelve wide column">
                                <div class="ui  pointing secondary menu item two">
                                    <a class="active item" data-tab="first" @click="active=true"><h3 class="fwn">手机注册</h3></a>
                                    <a class="item" data-tab="second" @click="active=false"><h3 class="fwn">邮箱注册</h3></a>
                                </div>
                                <div class="ui error message" v-show="error.length > 0">
                                    <p>{{error}}</p>
                                </div>
                                <div class="ui tab active" data-tab="first" @keyup.enter="mobileReg">
                                    <form class="ui form f15" v-if="active">
                                        <div class="fields" :class="{ error: $verify.$errors['regByMobilefields.phone.value'] }">
                                            <div class="four wide mob-hide field">
                                                <select class="ui compact selection dropdown" v-ui>
                                                    <option value="86">+86</option>
                                                </select>
                                            </div>
                                            <div class="twelve wide field">
                                                <div class="ui left  input">
                                                    <input type="tel" name="phone" v-model="regByMobilefields.phone.value" v-vali="regByMobilefields.phone.rules" placeholder="输入手机号" :message="JSON.stringify(regByMobilefields.phone.messages)" filed="regByMobilefields.phone.value">
                                                </div>
                                                <div v-if="$verify.$errors['regByMobilefields.phone.value']" class="ui pointing red basic label">
                                                    <div> {{$verify.$errors['regByMobilefields.phone.value']}} </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mob-two fields" :class="{ error:$verify.$errors['regByMobilefields.captcha.value']}">
                                            <div class="eight wide field">
                                                <div class="ui left icon input">
                                                    <input type="text" maxlength="4" name="captcha" v-model="regByMobilefields.captcha.value" v-vali="regByMobilefields.captcha.rules" :message="JSON.stringify(regByMobilefields.captcha.messages)" filed="regByMobilefields.captcha.value" placeholder="验证码">
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
                                            <div class="eight wide field" :class="{ error: $verify.$errors['regByMobilefields.verificationCode.value']}">
                                                <div class="ui left icon input">
                                                    <input type="text" maxlength="6" name="verificationCode" v-model="regByMobilefields.verificationCode.value" v-vali="regByMobilefields.verificationCode.rules" :message="JSON.stringify(regByMobilefields.verificationCode.messages)" filed="regByMobilefields.verificationCode.value" placeholder="输入6位短信验证码" autocomplete="new-password">
                                                    <i class="comment outline icon"></i>
                                                </div>
                                                <div v-if="$verify.$errors['regByMobilefields.verificationCode.value']" class="ui pointing red basic label">
                                                    <div> {{$verify.$errors['regByMobilefields.verificationCode.value']}} </div>
                                                </div>
                                            </div>
                                            <div class="eight wide field">
                                                <button type="button" class="ui blue button fluid f15" @click="sendSimCode" :disabled="$verify.$errors['regByMobilefields.captcha.value']!=''||$verify.$errors['regByMobilefields.phone.value']!=''||regByMobilefields.captcha.value==''||regByMobilefields.phone.value==''||timering||!isCorrect">发送验证码</button>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui left icon input">
                                                <input addEvent="input" type="password" maxlength="32" name="password" v-model="regByMobilefields.password.value" v-vali="regByMobilefields.password.rules" :message="JSON.stringify(regByMobilefields.password.messages)" filed="regByMobilefields.password.value" placeholder="输入6～32位密码" autocomplete="new-password">
                                                <i class="lock icon"></i>
                                            </div>
                                            <div class="input-block">
                                                <div class="ui mini label" :class="{'yellow':$verify.$info['regByMobilefields.password.value']>=1}">
                                                    弱
                                                </div>
                                                <div class="ui mini label" :class="{'orange':$verify.$info['regByMobilefields.password.value']>=2}">
                                                    中
                                                </div>
                                                <div class="ui mini label" :class="{'green':$verify.$info['regByMobilefields.password.value']==3}">
                                                    高
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ui animated fade button blue fluid large" @click="mobileReg">
                                            <div class="visible content">确定</div>
                                            <div class="hidden content">
                                                确定<i class="chevron circle right icon"></i>
                                            </div>
                                        </div>
                                        <div class="ui grid mt-n">
                                            <div class="left aligned eight wide column ">
                                                <a href="#"></a>
                                            </div>
                                            <div class="right aligned eight wide column text-info ">有账号去？
                                                <router-link class="item" to="/login">登录 </router-link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="ui tab " data-tab="second" @keyup.enter="emailReg">
                                    <form class="ui form f15" v-if="!active">
                                        <div class="field" :class="{ error: $verify.$errors['emailRegFileds.email.value'] }">
                                            <div class="ui left icon input">
                                                <input type="email" name="email" v-model="emailRegFileds.email.value" v-vali="emailRegFileds.email.rules" :message="JSON.stringify(emailRegFileds.email.messages)" filed="emailRegFileds.email.value" placeholder="请输入您的邮箱" autocomplete="new-password">
                                                <i class="mail icon"></i>
                                            </div>
                                            <!--错误提示-->
                                            <div v-if="$verify.$errors['emailRegFileds.email.value']" class="ui pointing red basic label">
                                                <div> {{$verify.$errors['emailRegFileds.email.value']}} </div>
                                            </div>
                                            <!--错误提示-->
                                        </div>
                                        <div class="field">
                                            <div class="ui left icon input">
                                                <input type="password" maxlength="32" name="password" v-model="emailRegFileds.password.value" v-vali="emailRegFileds.password.rules" :message="JSON.stringify(emailRegFileds.password.messages)" filed="emailRegFileds.password.value" placeholder="输入6～32位密码" addEvent="input" autocomplete="new-password">
                                                <i class="lock icon"></i>
                                            </div>
                                            <div class="input-block">
                                                <div class="ui mini label" :class="{'yellow':$verify.$info['emailRegFileds.password.value']>=1}">
                                                    弱
                                                </div>
                                                <div class="ui mini label" :class="{'orange':$verify.$info['emailRegFileds.password.value']>=2}">
                                                    中
                                                </div>
                                                <div class="ui mini label" :class="{'green':$verify.$info['emailRegFileds.password.value']==3}">
                                                    高
                                                </div>
                                            </div>
                                        </div>
                                        <div @click="emailReg" class="ui animated fade button blue fluid large">
                                            <div class="visible content">确定</div>
                                            <div class="hidden content">
                                                确定<i class="chevron circle right icon"></i>
                                            </div>
                                        </div>
                                        <div class="ui grid mt-n">
                                            <div class="left aligned eight wide column ">
                                                <a href="#"></a>
                                            </div>
                                            <div class="right aligned eight wide column text-info ">有账号去？
                                                <router-link class="item" to="/login">登录 </router-link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui vertical divider text-muted or">Or</div>
                    <div class="seven wide middle aligned column">
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
    mapGetters
} from 'vuex'
export default {
    name: 'reg',
    verify: true,
    data() {
        return {
            timering:false,
            active: true,
            isCorrect: false,
            emailvalidation: '',
            mobilevalidation: '',
            captcha: '', //图片验证码
            captchaToken: '',
            error: '',
            simToken: '',
            emailRegFileds: {
                email: {
                    rules: {
                        required: true,
                        isEmail: true,
                        isexisted: function(val) {
                            return Auth.isemailExist(val);
                        }
                    },
                    value: '',
                    messages: {
                        required: '邮箱不能为空',
                        isEmail: '邮箱格式不正确',
                        isexisted: '该邮箱已注册'
                    }
                },
                password: {
                    rules: {
                        passwordstrength: true
                    },
                    value: '',
                    messages: {
                        passwordstrength:'密码大于6位小于32位'
                    }
                }
            },
            regByMobilefields: {
                phone: {
                    rules: {
                        required: true,
                        isMobile: true,
                        isexisted: function(val) {
                            return Auth.isphoneExist(val);
                        }
                    },
                    value: '',
                    messages: {
                        required: '手机号不能为空',
                        isMobile: '手机号格式不正确',
                        isexisted: '该手机号已注册'
                    }
                },
                password: {
                    rules: {
                        passwordstrength: true
                    },
                    value: '',
                    messages: {
                        passwordstrength:'密码大于6位小于32位'
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
        console.log(this.$verify.$errors)
        var _this = this
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
            this.emailRegFileds.email.value = '';
            this.emailRegFileds.password.value = '';
            this.regByMobilefields.captcha.value = '';
            this.regByMobilefields.verificationCode.value = '';
            this.regByMobilefields.phone.value = '';
            this.regByMobilefields.password.value = '';
            this.$verify.clear();
            Auth.getCaptcha(this)
        },
        getCaptcha: function() {
            Auth.getCaptcha(this)
            this.regByMobilefields.captcha.value = '';
        },
        sendSimCode: function(e) {
            let data = {
                captcha: this.regByMobilefields.captcha.value,
                phone: this.regByMobilefields.phone.value,
                token: this.captchaToken,
                sessionId: this.sessionId
            }
            Auth.getMobileCaptcha(this, data).then(response => {
                e.target.innerHTML = '短信已发送';
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
                Auth.signup(this, response, () => {
                    this.$router.push({
                        name: 'activateAccount',
                        params: {
                            id: response.email.replace('.', '&'),
                            status: 1
                        }
                    })
                })
            }).catch(e => {
                console.error(e, '验证不通过')
            })
        },
        mobileReg(e) {
            this.$verify.check().then(values => {
                Object.assign(values, {
                    token: this.simToken
                })
                Auth.signup(this, values, '/')
            }).catch(e => {
                console.error(e, '验证不通过')
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
</style>
