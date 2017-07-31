<template>
    <div class="login-wrap transition visible recover">
        <div class="por animated-box">
            <router-link to="/" class="login-logo"></router-link>
            <div class="ui column centered grid">
                <div class="thirteen wide column">
                    <h3 class="text-info">邮箱验证</h3>
                    <div class="ui icon message" :class="state">
                        <i class="icon" :class="icon"></i>
                        <div class="content">
                            <div class="header">
                                {{title}}
                            </div>
                            <p>{{msg}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui small basic test modal" id="errorLayer">
            <div class="ui icon header"><i class="idea icon"></i>你输入的链接有误，<span id="time-number">{{time}}</span>秒后将跳转到首页</div>
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
import {
    API_URL
} from '../../config'

let param = getJsonFromUrl(location.href)
export default {
    name: 'headers',
    verify: true,
    data() {
        return {
            time: '5',
            icon: 'spinner loading',
            title: '验证中',
            msg: '请稍候，您的邮箱正在激活中...',
            state: '',
            token: param.token,
        }
    },
    mounted() {
        let _this = this
        if (!param.token) {
            $('#errorLayer').modal({
                closable: false,
                onShow: function() {
                    _this.countDown()
                }
            }).modal('show')
        }
        this.validate()
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
        validate() {
            $.ajax({
                type: "GET",
                url: API_URL + '/user/activate',
                data: {
                    "token": this.token
                },
                success: (data) => {
                    this.state = 'success'
                    this.icon = 'check circle'
                    this.title = '验证通过'
                    this.msg = '恭喜您，邮箱验证成功，3秒后将跳转至登录页'
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 3000)
                },
                error: (err) => {
                    this.state = 'error'
                    this.icon = 'remove circle'
                    this.title = '验证失败'
                    this.msg = '很遗憾，验证未通过，链接已超时,请重新申请！'
                }
            })
        }
    }
}
</script>
<style>
</style>
