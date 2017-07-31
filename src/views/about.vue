<template>
<div class="event-view">
    <headers></headers>
    <div class="event-main">
        <div class="w1100">
            <div class="w900 fr">
                <div class="inner">
                    <div class="tit">
                        「 会鸽 让活动更精彩 」
                    </div>
                    <p class="text-gray fs14">
                        会鸽，一个集活动报名、支付、签到、胸卡、现场互动、数据采集等功能的智能活动平台。<br>
                        会鸽适用于每一个人，无论是活动组织者还是参与者。您不组织活动，也可以用会鸽赚钱，体验社交营销的魅力。
                    </p>
                </div>
                <div class="bimg">
                    <img  src="/images/pic1.png" alt="">
                    <span>01</span>
                </div>
            </div>
            <div class="w900 fl">
                <div class="bimg">
                    <img src="/images/pic2.png" alt="">
                    <span>02</span>
                </div>
                <div class="inner" style="width: 700px">
                    <div class="tit">
                        「 特色服务 」
                    </div>
                    <div class="_list">
                        <dl>
                            <dt>
                                <img src="/images/icon1.png" alt="">
                            </dt>
                            <dd class="txt-center fs18 m-b20"><b>活动百宝箱</b></dd>
                            <dd class="text-gray fs14">     场地、餐饮、胸牌打印、签到设备、现场互动等，所有办活动所需要的资源尽在会鸽。会鸽，让活动更精彩！
                            </dd>
                        </dl>
                        <dl class="m-l-r">
                            <dt>
                                <img src="/images/icon2.png" alt="">
                            </dt>
                            <dd class="txt-center fs18 m-b20"><b>VIP主办方</b></dd>
                            <dd class="text-gray fs14">享受专属VIP功能，快速导入数据、实时观测现场人数、实时提款、现场特色互动等服务。
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <img src="/images/icon3.png" alt="">
                            </dt>
                            <dd class="txt-center fs18 m-b20"><b>活动现场Hi翻天</b></dd>
                            <dd class="text-gray fs14">多样化的互动游戏，让您的活动嗨翻天；另可定制专属于您的互动游戏，让您的活动与众不同！
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="w900 fr m-b50">
                <div class="inner" style="width: 700px">
                    <div class="tit">
                        「 产品功能 」
                    </div>
                    <div class="_list">
                        <ul>
                            <li>
                                <img class="m-b20" src="/images/icon_1.png" alt="">
                                <p>轻松发布活动</p>
                            </li>
                            <li>
                                <img class="m-b20" src="/images/icon_2.png" alt="">
                                <p>在线活动</p>
                            </li>
                            <li>
                                <img class="m-b20" src="/images/icon_3.png" alt="">
                                <p>自定义表单</p>
                            </li>
                            <li>
                                <img class="m-b20" src="/images/iocn_4.png" alt="">
                                <p>PC / 移动推广</p>
                            </li>
                            <li>
                                <img class="m-b20" src="/images/icon_5.png" alt="">
                                <p>酒店预订分房</p>
                            </li>
                            <li>
                                <img class="m-b20" src="/images/icon_6.png" alt="">
                                <p>智能签到</p>
                            </li>
                            <li>
                                <img class="m-b20" src="/images/icon_7.png" alt="">
                                <p>环保胸卡</p>
                            </li>
                            <li>
                                <img class="m-b20" src="/images/icon_8.png" alt="">
                                <p>实时提现</p>
                            </li>
                            <li>
                                <img class="m-b20" src="/images/icon_9.png" alt="">
                                <p>快速分享活动</p>
                            </li>
                            <li>
                                <img class="m-b20" src="/images/icon_10.png" alt="">
                                <p>现场互动</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="bimg">
                    <img src="/images/pic3.png" alt="">
                    <span>03</span>
                </div>
            </div>
            <div class="_foot">
                <h3>我在服务现场</h3>
                <ul>
                    <li><img src="/images/service1.png" alt=""></li>
                    <li><img src="/images/service2.png" alt=""></li>
                    <li><img src="/images/service3.png" alt=""></li>
                    <li><img src="/images/service4.png" alt=""></li>
                    <li class="m-none"><img src="/images/service5.png" alt=""></li>
                </ul>
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
    .text-gray{
        color: #77787A;
    }
     .fl{
      float: left;
    }
    .fr{
      float: right;
    }
    .fs14{
        font-size: 14px;
    }
    .fs18{
        font-size: 18px;
    }
    .txt-center{
        text-align: center;
    }
    .m-b20{
        margin-bottom: 20px;
    }
    .m-b50{
        margin-bottom: 50px;
    }
    .m-none{
        margin: 0 !important;
    }
    .m-l-r{
        margin-right: 35px;
        margin-left: 35px;
    }
    .w1100{
        width: 1100px;
        margin: 0 auto;
        overflow: hidden;
    }
    .w900{
        width: 900px;
        height: 400px;
        margin-top: 40px;
        font-size: 0;
    }
    .tl{
        display: inline-block;
        width: 12px ;
        height: 20px;
        border-top:5px solid #0099FF;
        border-left: 5px solid #0099FF; 
        vertical-align: text-top;
        margin-right: 5px;
    }
    .br{
        display: inline-block;
        width: 12px ;
        height: 20px;
        border-bottom:5px solid #0099FF;
        border-right: 5px solid #0099FF; 
        vertical-align: text-bottom;
        margin-left: 5px;
    }
    .tit{
        font-size: 24px;
        color: #0099FF;
        text-align: center;
        margin-bottom: 50px;
        font-weight: 600;
    }
    .tit span{
        font-size: 18px;
        color: #0099FF;
        font-weight: 600;
    }
    .inner{
        padding:40px;
        display: inline-block;
        width: 350px;
        height: 100%;
        background: #fff;
    }
    .inner>p{
        line-height: 25px;
    }
    .bimg{
        display: inline-block;
        height: 100%;
        vertical-align: bottom; 
        overflow: hidden;
        position: relative;
    }
     .bimg img{  
        cursor: pointer;  
        transition: all 0.6s; 
        -ms-transform:all 0.6s;
        -moz-transform:all 0.6s;
        -webkit-transform:all 0.6s;
        -o-transform:all 0.6s;  
    }  
    .w900:hover .bimg img{  
        transform: scale(1.1);
        -ms-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -o-transform: scale(1.1);  
    }


    .bimg>span{
        position: absolute;
        bottom: 20px;
        right: 20px;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    }
    ._list dl{
        display: inline-block;
        width: 180px;
    }
    ._list dt{
        width: 80px;
        height: 80px;
        margin: 0 auto 30px;
        text-align: center;
        line-height: 80px;
        background: #F4F5F8;
        border-radius: 50%;
    }
    ._list dt>img{
        vertical-align: middle;
    }
    ._list dd{
        margin-left: 0;
    }
    ._list dd.text-gray{
        line-height: 25px;
    }
    ._list ul{
        padding: 0;
    }
    ._list li{
        font-size: 16px;
        display: inline-block;
        text-align: center;
        width: 120px;
        margin-bottom: 50px;
        height: 80px;
    }
    ._foot{
        clear: both;
    }
    ._foot>h3{
        padding-left: 10px;
        border-left: 4px solid #0099FF;
        font-size: 22px;
        color: #3F464B;
        margin-bottom: 40px;
    }
    ._foot ul{
        display: flex;
        font-size: 0;
        padding: 0;
    }
    ._foot li{
        display: inline-block;
        margin-right: 10px;
    }
</style>
