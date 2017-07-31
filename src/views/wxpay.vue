<template>
    <div class="aaa">

         <!-- <div class="ui form">
            <div class="grouped fields">
              
                <div class="field">
                    <div class="ui input">
                        <input type="input" name="" placeholder="订单号"  v-model="orderNumber">
                    </div>
                </div>
               
            </div>
        </div>

        
        <button class="ui button blue fluid" @click="getPayInfo()">
            获取支付参数
        </button>

        <br/>
        <br/>
        <br/>

        <button class="ui button blue fluid" @click="weixinPay()">
            点击支付
        </button> -->

    </div>
</template>
<script>
function getUrl(){
    var url=location.href;
    var urlArr=url.split('?');
    var json={}
    if(urlArr[1] != ''){
        var itemArr=urlArr[1].split('&');
        for(let i=0; i<itemArr.length; i++){
            var item=itemArr[i].split('=');
            if(item[0]=='state'){
                var idAll=decodeURIComponent(item[1]);
                var allId=idAll.split('*');
                json['orderN']=allId[0];
                json['eventId']=allId[1];
            }else{
                json[item[0]]=item[1];
            }
            
        }
    }
    return json;
}

import {
    API_URL
} from '../config'


export default {
    name: 'wxpay',
    data() {
        return {
            orderNumber:'',
            openId:'',
            payInfo:{appId:'',nonceStr:'',packageValue:'',paySign:'',signType:'',timeStamp:''},
            arguUrl:{}
        }
    },
    watch: {
       
    },
    created() {
        
    },   
    mounted() {
        this.arguUrl=getUrl();
        this.getOpenId();
    },
   
    filters: {},
    methods: {
        getOpenId(){
            $.get(API_URL+'/wx/oauth',{'code':this.arguUrl.code},(data)=>{
                this.openId=data.data.openid;
                this.getPayInfo()
            })
        },
        getPayInfo(){
            $.post(API_URL + '/wxpay/jsapi/createUnifiedOrder', {
                orderNumber: this.arguUrl.orderN,
                openid:this.openId,
            }, (data) => {
                this.payInfo.appId=data.appId;
                this.payInfo.nonceStr=data.nonceStr;
                this.payInfo.packageValue=data.package;
                this.payInfo.timeStamp=data.timeStamp;
                this.payInfo.paySign=data.paySign;
                this.payInfo.signType=data.signType;
                this.weixinPay();
            });
        },

        weixinPay(){            
            
            const data = this.payInfo;
            const vm= this;
            if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
              if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
              }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
                document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(data));
              }
            }else{
              vm.onBridgeReady(data);
            }
        },
        onBridgeReady:function(data){
            const  vm = this;
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',{
                "appId":data.appId,     //公众号名称，由商户传入
                "timeStamp":data.timeStamp, //时间戳，自1970年以来的秒数
                "nonceStr":data.nonceStr, //随机串
                "package":data.packageValue,
                "signType":data.signType, //微信签名方式：
                "paySign":data.paySign //微信签名
              },
              function(res){
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    vm.$router.push({path: '/meetingSuccess/' + vm.arguUrl.orderN + '/' + vm.arguUrl.eventId});
                }else if(res.err_msg == "get_brand_wcpay_request:cancel"){  
                    history.back(-1);
                }else{
                    vm.$message.warning("支付失败,请跳转页面"+res.err_msg);
                    setTimeout(function(){
                        vm.$router.push({path: '/site/' + vm.arguUrl.eventId});
                    },1000)
                  
                }
              }
            );
        }
       
    },
    components: {
       
    }
}
</script>
<style scoped>
@media only screen and (max-width: 767px) {
    .aaa{margin:100px 30px;}
}
</style>
