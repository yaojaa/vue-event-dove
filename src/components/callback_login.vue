<template>
    <div>
    <h1 align="center">恭喜您，登录成功！跳转中...</h1>
    </div>
     
</template>

<script>
import {loadJs,getJsonFromUrl} from '../utils/';
import {decryptDes} from '../utils/des.js';
import {API_URL} from '../config.js'
export default {
  name: 'qq',
  data () {
    return {
      msg: 'Welcome to Event Dove'
    }
  },
  mounted(){
    let _this = this;
    var url = window.location.href
    var currentUrl = ''
    var redirectUrl = ''
    if (url.indexOf('*****') > 0) {
        currentUrl = url.split('*****')[0];
        redirectUrl = url.split('*****')[1];
    }
    var from = getJsonFromUrl(currentUrl || url);
//    var stateStr = decryptDes(from.state);
//    var state = stateStr.split('_')[1];
    var state =  from.state;
    // 校验state值并判断结果
    if(state === 'sina'){ //微博
        $.post(API_URL+'/user/oauthLogin',{'code':from.code,'oauthType':'sina'},function(data){
            _this.$store.dispatch('USER_SIGNIN', data)
            _this.$router.push(decodeURIComponent(redirectUrl) || '/')
        })
    }else if(state === 'wx'){ //微信
        $.post(API_URL+'/user/oauthLogin',{'code':from.code,'oauthType':'wx'},function(data){
            _this.$store.dispatch('USER_SIGNIN', data)
            _this.$router.push(decodeURIComponent(redirectUrl) || '/')
        })
    }else if(state === 'qq'){ //QQ
        loadJs('http://qzonestyle.gtimg.cn/qzone/openapi/qc-1.0.1.js',{'chartset':'utf-8'}).then(()=>{
            QC.Login.getMe(function(openId,accessToken){
                $.post(API_URL+'/user/oauthLogin',{'oauthExpires':from.expires_in,'oauthAccesToken':accessToken,'openid':openId,'oauthType':'qq'},function(data){
                    _this.$store.dispatch('USER_SIGNIN', data)
                    _this.$router.push(decodeURIComponent(redirectUrl) || '/')
                })
          })
        })
    }
   }
}
</script>

<style scoped>
</style>
