import { API_URL } from '../config'
const LOGIN_URL = API_URL + '/user/login'
const SIGNUP_URL = API_URL + '/user/register'
const EXIST_URL = [API_URL + '/user/isPhoneExist', API_URL + '/user/isEmailExist']
const CHECK_SMSCODE_URL = API_URL + '/user/checkVerificationCode'
const CHECK_CAPTCHA_URL = API_URL + 'user/checkCaptcha'
const SEND_EMAIL_URL = [API_URL + '/user/sendFindPwdEmail',API_URL + '/user/sendActivateEmail']
const VERIFY_RESET_PWD_TOKEN = API_URL + '/user/verifyResetPwdToken'
const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
const phone_regex = /^1[3|4|5|7|8][0-9]{9}$/i
const successFn = function(context, redirect) {
    return function(data) {
        if (typeof redirect === 'string') {
            context.$router.replace({ path: redirect })
        }

        if (typeof redirect === 'function') {
            redirect.call(this, data)
        }
        return true;
    }
}
export default {
    timer: function(context, el) {
        var time = 60;
        var interval = setInterval(function() {
            time--
            el.innerHTML = time;
            if (time <= 0) {
                clearInterval(interval)
                context.getCaptcha();
                el.innerHTML = '发送验证码'
                context.timering = false
            }
        }, 1000)
    },
    getCaptcha: function(context, selector) {
        context.isCorrect = false;
        // 请求验证码后增加定时器，目前是500s后刷新
        if(window.captchaTimer){
            clearTimeout(window.captchaTimer)
        }
        window.captchaTimer = setTimeout(()=>{
            this.getCaptcha.apply(this,arguments);
        },5e5)
        $(selector || '.SVG_CAPTCHA').css({'height':'54px','text-align':'center','line-height':'54px'}).html('加载中...');
        jQuery.get(API_URL + '/user/captcha'+'?'+new Date().getTime(), function(data, status, xhr) {
            $(selector || '.SVG_CAPTCHA').html(data.documentElement)
            context.captcha = data.documentElement;
            context.captchaToken = xhr.getResponseHeader("token")
            context.sessionId = xhr.getResponseHeader('sessionId')
        })
    },
    getMobileCaptcha: function(context, data) {

        return new Promise(function(resolve, reject) {
            jQuery.ajax({
                url: API_URL + '/user/sendVerificationCode',
                data: JSON.stringify(data),
                type: 'POST',
                dataType: "json",
                contentType: "application/json",
                success: function(value) {
                    context.simToken = value.token
                    resolve(value)
                },
                error: function(error) {
                    reject(error);
                }
            })
        })

    },
    user: {
        authenticated: false
    },
    login(context, creds, redirect) {
        $.ajax({
            type: "POST",
            url: LOGIN_URL,
            data: JSON.stringify(creds),
            dataType: "json",
            contentType: "application/json", //发送信息至服务器时内容编码类型。             
            success: (data) => {
                context.$store.dispatch('USER_SIGNIN', data)
                context.$message('恭喜您,登录成功！将为您自动跳转...')
                if (redirect) {
                    setTimeout(function() {
                        window.location.href = redirect
                    }, 2e3)
                }
            },
            error: (err)=> {
                context.error = err.responseJSON.responseText
                if (err.responseJSON.responseText == '请检查邮箱来激活账户') {
                    context.$router.push({
                        name: 'activateAccount',
                        params: {
                            id: creds.username.replace('.', '&'),
                            status: 1
                        }
                    });
                    // 再次发送激活邮件
                    this.sendemail(context,$.extend(creds,{indexUrl:1}));
                }
                context.loading = false
            }
        })
    },
    signup(context, creds, redirect) {
        let url = SIGNUP_URL
        $.ajax({
            type: "POST",
            async: false,
            url: url,
            data: JSON.stringify(creds),
            dataType: "json",
            contentType: "application/json", //发送信息至服务器时内容编码类型。             
            success: (data) => {
                // 注册成功直接登录
                if(redirect=='/'){
                    context.$store.dispatch('USER_SIGNIN', data)
                    context.$message('恭喜您,注册成功！将为您自动跳转...')
                    if (redirect) {
                        setTimeout(function() {
                            window.location.href = redirect
                        }, 2e3)
                    }
                }else{
                    successFn(context, redirect)(data);
                }
            },
            error: function(err) {
                context.error = err.responseJSON.responseText;
                context.loading = false;
            }
        })

    },
    // 验证短信验证码
    valismscode(context, creds, redirect) {
        $.ajax({
            type: "POST",
            url: CHECK_SMSCODE_URL,
            data: JSON.stringify(creds),
            dataType: "json",
            contentType: "application/json", //发送信息至服务器时内容编码类型。             
            success: successFn(context, redirect),
            error: function(err) {
                context.error = err.responseJSON.responseText
                context.loading = false
            }
        })
    },
    //验证图片验证码
    valicaptchacode(context, creds, redirect) {
        let res
        $.ajax({
            type: "POST",
            async: false,
            url: CHECK_CAPTCHA_URL,
            data: JSON.stringify(creds),
            dataType: "json",
            contentType: "application/json", //发送信息至服务器时内容编码类型。             
            success: (data) => {
                res = successFn(context, redirect)(data);
            },
            error: function(err) {
                context.loading = false
                res = false;
            }
        })
        return res
    },
    // 发送改密码和激活邮件
    sendemail(context, creds, redirect) {
        $.ajax({
            type: "POST",
            url: SEND_EMAIL_URL[creds.indexUrl],
            data: JSON.stringify(creds),
            dataType: "json",
            contentType: "application/json", //发送信息至服务器时内容编码类型。             
            success: successFn(context, redirect),
            error: function(err) {
                context.error = err.responseJSON.responseText
                context.loading = false
            }
        })
    },
    isTokenTimerover(data) {
        console.log(data)
        let res = false;
        $.ajax({
            url: VERIFY_RESET_PWD_TOKEN,
            data: data,
            async: false,
            dataType: 'json',
            contentType: "application/json", //发送信息至服务器时内容编码类型。   
            error:()=>{
                res = true;
            }
        })
        return res
    },
    isExist(value) {
        let url = this.isEmail(value) ? EXIST_URL[1] : EXIST_URL[0]
        let data = this.isEmail(value) ? { email: value } : { phone: value }
        let res
        $.ajax({
            url: url,
            data: data,
            async: false,
            dataType: 'json',
            contentType: "application/json", //发送信息至服务器时内容编码类型。   
            success: (data) => {
                res = !(data.isPhoneExist || data.isEmailExist)
            }
        })
        return res
    },
    isphoneExist: function(val) {
        if (this.isPhone(val)) {
            let res = this.isExist(val)
            return res
        } else {
            return true
        }
    },
    isemailExist: function(val) {
        if (this.isEmail(val)) {
            let res = this.isExist(val)
            return res
        } else {
            return true
        }
    },
    isCaptcha: function(val, context) {
        context.isCorrect = false;
        if (val.length == 4) {
            let obj = Object.assign({
                captcha: val
            }, {
                token: context.captchaToken,
                sessionId: context.sessionId
            })
            let res = this.valicaptchacode(context, obj)
            res ? context.isCorrect = true : '';
            return res
        } else {
            return true
        }
    },

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('user');
        this.user.authenticated = this.$store.authenticated = false
    },

    checkAuth(context, redirect) {
        var jwt = localStorage.getItem('id_token')
        if (jwt) {
            this.user.authenticated = true
            this.store.authenticated = true
        } else {
            this.user.authenticated = false
            this.store.authenticated = false
                //router.go(redirect);           
        }
    },

    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }
    },

    getAuthUser() {
        return JSON.parse(localStorage.getItem('user'));
    },
    isPhone(s) {
        return phone_regex.test(s);
    },
    isEmail(s) {
        return email_regex.test(s);
    }
}
