<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">支付</span></h2>
            </div>
            <div class="white-wrap p-xl">
                <div class="ui list">
                    <div class="item">收款方：{{info.payee}}</div>
                    <div class="item">付款用途：{{info.paymentPurposes}}</div>
                    <div class="item">订单号：{{info.orderNumber}}</div>
                </div>
            </div>
            <div class="ui hidden divider"></div>
            <div class="block-tab">
                <div class="ui five left item secondary menu f16">
                    <a class="item active" data-tab="first" type="onlinePayment" @click="getType('onlinePayment')"><span><i class="edit icon"></i>线上支付</span></a>
                    <a class="item" data-tab="second" type="offlinePayment" @click="getType('offlinePayment')"><span><i class="send outline icon"></i>线下支付</span></a>
                </div>
                <div class="ui active tab" data-tab="first">
                    <div class="ui grid">
                        <div class="three wide column" v-for="line in info.onlinePayment">
                            <div class="ui middle aligned four column centered grid">
                                <div class="row">
                                    <div class="center aligned  five wide column">
                                        <input type="radio" name="paytype" :payType="line.name" @click="payMethod(line.name)">
                                    </div>
                                    <div class="eleven wide column"><img :src="line.img" alt=""></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui divider"></div>
                    <button class="ui primary button" @click="nowPay">立即支付 </button>
                </div>
                <div class="ui tab" data-tab="second">
                    <div class="ui form">
                        <div class="inline fields">
                            <div class="field">
                                <div class="ui radio checkbox" v-for="off in info.offlinePayment">
                                    <input type="radio" name="fruit" @click="selecedPay(off.name)" tabindex="0" class="hidden">
                                    <label>{{off.str}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
     <div class="ui small test modal" style="width:350px;">
        <i class="close icon"></i>
        <div class="header">微信支付</div>
        <div class="content">
            <div class="ui form">
                <div class="inline fields">
                    <div class="two wide field"></div>
                    <div class="eleven wide field">
                        <svg v-html="erwmImg" width="200" height="180" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="actions">
            <div class="ui blue button" @click="payOver">已支付完成</div>
            <div class="ui negative button">取消</div>
        </div>
    </div>
</div>

</template>
<script>
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串 
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};
import {
    API_URL
} from '../config'
export default {
    // deliverMethod  邮寄方式
    name: 'ticket',
    data() {
        return {
            eventId:'',
            info:{},
            payType:'onlinePayment',//支付方式
            method:'',//用什么来支付
            setData:{
                orderNumber: '',
                productName: ''
            },
            erwmImg:'',
        }
    },

    mounted() {
        this.eventId=this.$route.params.id;
        var _this=this;
        $.ajax({
            url: API_URL+"/order/preparePay",
            type: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            contentType: "application/json",
            data: JSON.stringify({
                "orderId": this.eventId
            }),
            success:function(data){
               _this.info=data;
               _this.setData.orderNumber=data.orderNumber
               _this.setData.productName=data.paymentPurposes
            }
        })
    
        $('.menu .item').tab();
    },
    methods: {
        selecedPay(){

        },
        payMethod(value){
            this.method=value;
        },
        getType(value){
            // 记录选项卡选择
            this.setData.payType=value;
        },
        nowPay(){
            // 选择微信的弹出框
            var _this=this;
            console.log(this.method)
            if(this.method==''){alert('请选择支付方式'); return false;}
            if(this.method=='wechat'){
                $('.small.test.modal').modal('show');
                $.ajax({
                    url: API_URL+"/wxpay/native/createUnifiedOrder",
                    type: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    data: JSON.stringify({
                        "orderNumber": "DD201703209001179628",
                        "productName": _this.setData.productName
                    }),
                    success(data){
                        _this.erwmImg=jQuery(data.documentElement).html();
                    }
                })
            }else{
                console.log('不是微信支付')
            }
        },
        payOver(){

        }
    }
}
</script>
<style scoped>
    .ui.radio input{float:left;}
    .ui.radio label{width:200px;}
    .ui.radio label img{width:100%;}
</style>

