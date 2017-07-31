<template>
<div class="event-view">
    <headers></headers>
    <div class="event-main">
        <div class="text-center ">
            <div class="inline-block menu-more text-hide error-main" style="margin-top: 5em;max-width:700px;">
                <b class="f16 poa" style="top: 18%;right: 15%;">你访问的页面找不到了</b>
                <img width="100%" src="/images/D404.png" alt="">
                <img class="poa cloud" style="top:10%; left: 40%;" src="/images/cloud_max.png" alt="">
                <img class="poa cloud" style="top:30%; left: 20%;" src="/images/cloud_left.png" alt="">
                <img class="poa cloud" style="top:45%; left: 75%; " src="/images/cloud_right.png" alt="">
            </div>
            <p><router-link to="/" class="medium ui button blue ml-xl fwn">返回首页</router-link></p>
           <!--  <router-link to="" class="fixedBtn text-white f18">
                <i class="talk icon f24"></i>联系我们
            </router-link> -->
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
    .fixedBtn{
        position: fixed;
        right: 0;
        top: 15em;
        width: 35px;
        padding: .5em 0;
        background: #09f;
        text-align: center;
    }
    .cloud{
        z-index: -1;
        animation:cloud 15s infinite linear;
        -moz-animation:cloud 15s infinite linear; /* Firefox */
        -webkit-animation:cloud 15s infinite linear; /* Safari and Chrome */
        -o-animation:cloud 15s infinite linear;
    }
    .event-view {
        height: 100%;
    }
    .event-main{
        min-height:450px;
        height: calc(100% - 330px)
    }
    @keyframes cloud{
        0% {
            transform: translate(-400px, 0px);   
        }
        100%{
            transform: translate(430px, 0px);  
        }
    }
    @-moz-keyframes myfirst{
        0% {
            transform: translate(-400px, 0px);   
        }
        100%{
            transform: translate(430px, 0px);  
        }
    }
    @-webkit-keyframes myfirst{
        0% {
            transform: translate(-400px, 0px);   
        }
        100%{
            transform: translate(430px, 0px);  
        }
    }
    @-o-keyframes myfirst{
        0% {
            transform: translate(-400px, 0px);   
        }
        100%{
            transform: translate(430px, 0px);  
        }
    }
</style>
