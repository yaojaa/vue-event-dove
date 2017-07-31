<template>
    <div>
        <div class="wx-code-w">
            <div class="ui horizontal divider text-info fwn mb-xs">合作账号登录</div>
        </div>
        <div class="login-iframe">
            <div class="por" id="login_container">
                <div class="ui active inverted dimmer">
                  <div class="ui text loader">加载中</div>
                </div>
            </div>
        </div>
        <div class="text-info"><i class="wechat icon green"></i> 微信扫一扫登录</div>
        <div class="ui four column center aligned padded grid login-icon-wrap">
            <div class="column">
                <!--<a :href="'https://graph.qq.com/oauth/show?which=Login&display=pc&client_id=101408486&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fdev.www.eventdove.com%2Fqq&state='+qqkey"><i class="circular qq icon blue large"></i></a>-->
                <a :href="'https://graph.qq.com/oauth/show?which=Login&display=pc&client_id=101408486&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fqa.www.eventdove.com%2Fqq&state=qq' + redirectUrl"><i class="circular qq icon blue large"></i></a>
            </div>
            <div class="column">
                <a :href="'https://api.weibo.com/2/oauth2/authorize?client_id=3449170722&response_type=code&redirect_uri=http://qa.www.eventdove.com/qq&state=sina' + redirectUrl">
                    <i class="circular weibo icon orange large"></i>
                </a>
            </div>
            <!--   <div class="column">
                    <i class="circular linkedin icon teal large"></i>
                </div> -->
        </div>
    </div>
</template>
<script>
import {
    loadJs,
    getJsonFromUrl
} from '../../utils/'
//import {
//    encryptDes
//} from '../../utils/des.js'
export default {
    name: 'thirdPartyLogin',
    data() {
        return {
            redirectUrl: ''
//            qqkey: '',
//            sinakey: ''
        }
    },
//    mounted() {
//        this.qqkey = encryptDes('qq');
//        this.sinakey = encryptDes('sina');
//    },
    created() {
        this.redirectUrl = this.$route.query.redirect ? '*****' + this.$route.query.redirect : '';
        //微信
        loadJs('http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js')
            .then(function() {
                new WxLogin({
                    id: "login_container",
                    appid: "wx624f0b4dd7b7e36c",
                    scope: "snsapi_login",
                    redirect_uri: 'http://qa.www.eventdove.com/qq',
                    style: "white",
                    state: 'wx'
                })
            })
    }
}
</script>
<style>
.login-iframe {
    width: 300px;
    height: 240px;
    margin: 0 auto;
    overflow: hidden;
}

#login_container {
    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    -ms-transform: scale(0.8);
    -o-transform: scale(0.8);
    transform: scale(0.8);
}

.wx-code-w {
    width: 226px;
    margin: 0 auto;
}

.impowerBox .qrcode {
    width: 200px !important;
}

#login_container {
    margin-top: -77px;
    min-height: 140%;
}
</style>
