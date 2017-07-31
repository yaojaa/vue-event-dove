<template>
    <div class="login-wrap transition visible recover">
        <div class="por animated-box">
            <router-link to="/" class="login-logo"></router-link>
            <div class="ui column centered grid">
                <div class="thirteen wide column">
                    <h3 class="text-info">重置密码</h3>
                    <div class="ui hidden divider"></div>
                    <div class="ui form f15">
                        <div class="field">
                            <div class="ui left icon input">
                                <input type="password" addEvent="input" v-model="password" v-vali="rules" filed="password" :message="JSON.stringify({'passwordstrength':'密码大于6位小于32位'})">
                                <i class="lock icon"></i>
                            </div>
                            <div class="input-block">
                                <div class="ui mini label" :class="{'yellow':$verify.$info['password']>=1}">
                                    弱
                                </div>
                                <div class="ui mini label" :class="{'orange':$verify.$info['password']>=2}">
                                    中
                                </div>
                                <div class="ui mini label" :class="{'green':$verify.$info['password']==3}">
                                    高
                                </div>
                            </div>
                            <div class="ui top pointing red basic label" v-show="$verify.$errors['password']&&$verify.$errors['password']!=''">{{$verify.$errors['password']}}</div>
                        </div>
                        <div class="ui hidden divider"></div>
                        <div class="text-left">
                            <button class="ui button blue" @click="reset" :disabled="state">重置</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui small basic test modal" id="errorLayer">
            <div class="ui icon header"><i class="idea icon"></i>你输入的链接已过期，<span id="time-number">{{time}}</span>秒后将跳转到首页</div>
            <div class="actions">
                <a href="/" class="ui green inverted ok button"><i class="checkmark icon"></i> 返回首页 </a>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getJsonFromUrl
} from '../../utils/index'
import Auth from '../../auth/index'
import {
    API_URL
} from '../../config'

export default {
    name: 'headers',
    verify: true,
    data() {
        return {
            time: '5',
            state: false,
            param: getJsonFromUrl(),
            password: '',
            rules: {
                passwordstrength: true
            }
        }
    },
    mounted() {
        let _this = this
        if ($.isEmptyObject(this.param)||Auth.isTokenTimerover(this.param)) {
            $('#errorLayer').modal({
                closable: false,
                onShow: function() {
                    _this.countDown()
                }
            }).modal('show')
        }

    },
    methods: {
        countDown() {
            let time = setInterval(() => {
                this.time--
                    if (this.time == 0) {
                        this.$router.push('/')
                        clearInterval(time)
                    }
            }, 1000)
        },
        reset(event) {
            this.$verify.check().then(() => {
                var Aparam = $.extend({}, {
                    'password': this.password
                }, this.param)
                this.state = true;
                let url = Aparam.phone ? API_URL + '/user/updatePwdByPhone' : API_URL + 'user/updatePwd'
                $.ajax({
                    type: "post",
                    url: url,
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(Aparam),
                    success: (data) => {
                        this.$message.success('恭喜您，密码重置成功，3秒后将跳转至登录页')
                        setTimeout(() => {
                            this.$router.push('/login')
                        }, 3000)
                    },
                    error: (err) => {
                        // let error = JSON.parse(err.responseText)
                        // this.$message.error(error.responseText)
                        this.state = false
                        this.$message.error('很遗憾，验证未通过，链接已超时,请重新申请！')
                    }
                })

            }).catch(e => {
                // console.log(e);
            })
        }
    }
}
</script>
<style>
</style>
