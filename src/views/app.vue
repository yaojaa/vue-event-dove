<template>
<div class="event-view">
    <headers></headers>
    <div class="event-main">
        <div class="bg-white">
            <div class="top">
                <div class="w750">
                    <img class="app_ny" src="/images/app_ny.png" alt="">
                    <div class="fr">
                        <img class=" m-t80" src="/images/QR.png" alt="">
                        <a href="https://itunes.apple.com/cn/app/hui-ge/id768575726?ls=1&mt=8" class="_btn i">
                            App Store下载
                        </a>
                        <a href="https://eventdove.com/resource/apk/eventdove.apk" class="_btn a">
                            Android 下载
                        </a>
                    </div>
                </div>
            </div>
            <div class="banner w750">
                <div class="fl">
                    <img src="/images/fontText.png" alt="">
                    <p class="fs17 text-gray">我是<b class="text-blue">参会者</b>，休闲娱乐，结实朋友，干货分享， 精彩生活从此开始！ </p>
                    <img class="m-l70" src="/images/collaborative.png" alt="">
                </div>
                <div class="fr">
                    <img src="/images/phone.png" alt="">
                    <p class="text-gray">手机端(参会者)</p>
                </div>
            </div>
            <div class="foot">
                <div class="w1150">
                    <img width="45%" class="fl" src="/images/SpeedSign.png" alt="">
                    <div class="fr">
                        <img src="/images/SignFont.png" alt="">
                        <p class="text-white">我是<b class="text-white">主办方</b>，iPad智能签到，快捷高效， 摆脱手动签到;签到同时，1秒打印胸卡； 现场多创意互动，嗨翻天！ </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footers></footers>
</div>

</template>
<script>
import {
    API_URL
} from '../../config'
import header from '../components/header'
import footer from '../components/footer'
export default {
    data() {
            return {

            }
        },
        mounted() {
           
        },
        methods: {
            //续费
            renew: function() {

            }
        },
        components: {
            headers: header,
            footers: footer,
        }
}
</script>
<style scoped>
         .fl{
      float: left;
    }
    .fr{
      float: right;
    }
    .m-t80{
        margin-top: 80px;
        margin-bottom: 35px;
    }
    .m-l70{
        margin-left: 70px;
    }
    .fs17{font-size: 17px;}
     .w750{
        width: 750px;
        margin: 0 auto;
     }
     .top{
        width: 100%;
        height: 460px;
        background:url(/images/top.png) no-repeat center center;
     }
     .app_ny{
        margin-top: 215px;
        transition:margin 600ms;
        -moz-transition:margin 600ms; 
        -webkit-transition:margin 600ms; 
        -o-transition:margin 600ms;
     }
     .app_ny:hover{
        margin-top: 205px;
     }
    ._btn{
        padding-left: 25px;
        display: block;
        color: #0099FF;
        background: #fff;
        height: 40px;
        width: 145px;
        border-radius: 4px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        margin-top: 20px;
    }
    ._btn.i{
        background: url(/images/ios_logo.png) no-repeat 10px #fff;
    }
    ._btn.a{
        background: url(/images/Android_logo.png) no-repeat 10px #fff;
    }
    .banner>.fl{
        margin-top: 105px;
        width: 50%;
    }
    .banner{overflow: hidden;}
    .banner .fl p{
        line-height: 30px;
        margin-top: 30px;
        margin-bottom: 40px;
    }
    .banner .fr p{
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        margin: 10px 0;
    }
    .foot{
        padding-top: 50px;
        width: 100%;
        height: 460px;
        background:url(/images/foot.png) no-repeat center center;
    }
    .w1150{
        width: 1000px;
        margin: 0 auto;
    }
    .w1150 .fr{
        margin-top: 95px;
        margin-right: 40px;
    }
    .foot .fr p{
        text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
        margin-top: 40px;
        width: 340px;
        color: #fff;
        line-height: 30px;
        font-size: 18px;
    }
</style>
