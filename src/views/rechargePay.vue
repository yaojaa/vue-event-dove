<template>
    <div class="event-wrap">
        <headerSimple>
            <template slot="left-nav">
                <span class="item f16 noLine">收银台</span>
            </template>
        </headerSimple>
        <div class="event-main pusher">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn">确认支付</h2>
            </div>
            <div class="white-wrap p-lg">
                <div class="ui doubling stackable grid">
                    <div class="twelve wide column">
                        <div class="ui list">
                            <div class="item">收款方 ：{{info.payee}}</div>
                            <div class="item">付款用途：{{info.paymentPurposes}}</div>
                            <div class="item">订单号：{{info.orderNumber}}</div>
                        </div>
                    </div>
                    <div class="four wide  middle aligned text-right column">
                        <span class="f24 text-red"><small>{{info.paymentPriceUnitSign}}</small>{{info.totalPrice}}</span>
                    </div>
                </div>
            </div>
            <div class="ui divider hidden"></div>
            <div class="block-tab">
                <div class="ui four item secondary left menu f16">
                    <a class="item active" data-tab="first">
                        <span><i class="icon-zhifu iconfont icon"></i>线上支付</span>
                    </a>
                </div>
                <div class="ui active tab" data-tab="first">
                    <div class="ui five column grid">
                        <div class="column" v-for="itemm in info.onlinePayment">
                            <div class="bank-box" @click="payMethod = itemm.name" :class="{'checked': payMethod === itemm.name}">
                                <span class="bank-logo" :class="'bank-'+itemm.name">支付宝</span>
                                <i class="iconfont icon-mark-right-top corner"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mt-lg text-right" v-show="payMethod === 'alipay'" id="alipayForm"></div>
                    <div class="mt-lg text-right" v-show="payMethod === 'wechat'">
                        <button class="ui button blue large payment-btn" @click="nowPay">立即支付</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <footers></footers>
        <!-- 微信支付二维码 -->
        <div class="ui mini modal" id="wx-pay">
            <i class="close icon"></i>
            <div class="header">
                微信支付
            </div>
            <div class="content text-center">
                <p class="text-muted" v-show="!download">距离二维码过期还剩<span class="text-red">{{erwmSurplusTime}}</span>秒，过期后请刷新页面重新获取二维码。</p>
                <p class="text-red" v-show="download">二维码已过期，<a href="javascript:;" @click="createUnifiedOrder">刷新</a>重新获取二维码。</p>
                <div class="eleven wide field">
                    <svg v-html="erwmImg" width="200" height="180" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>
                </div>
                <p class="space-sm">请使用微信<span class="text-blue">扫一扫</span>扫描二维码支付</p>
            </div>
        </div>
        <!-- 支付状态提醒 -->
        <div class="ui small basic text-center modal" id="statusBtn">
            <div class="ui icon header">
                <i class="idea icon"></i>
                提示
            </div>
            <div class="content">
                <p>请在新打开的页面完成支付，支付完成前请不要关闭窗口。</p>
            </div>
            <div class="actions text-center">
                <div class="ui green inverted button" @click="getSmsEmailOrderPayResult">
                  <i class="checkmark icon"></i>
                  已完成支付
                </div>
                <div class="ui red basic cancel inverted button">
                  <i class="remove icon"></i>
                  充值遇到问题？
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import {API_URL} from '../config'
import moment from 'moment'
import headerSimple from '../components/header_simple'
import footer from '../components/footerPay'
export default {
    data() {
        return {
            orderId: this.$route.params.id,
            info:{},
            payMethod: '',
            erwmImg:'',
            erwmAllTime:5,
            erwmSurplusTime:0,
            download:false,
            timer:null,
        }
    },
    watch: {
        payMethod (val, oldVal) {
            if (val === 'alipay') {
                this.paySmsEmailOrder();
            }
        }
    },
    mounted() {
        this.preparePaySmsEmailOrder();
    },
    methods: {
        // 将毫秒数转换为：0天0时5分54秒
        conversMillisecondToTime (sec) {
            let t = sec, d = 0, h = 0, m = 0, s = 0;
            if (t >= 0) {
               d = Math.floor(t / 1000 / 60 / 60 / 24);
               h = Math.floor(t / 1000 / 60 / 60 % 24);
               m = Math.floor(t / 1000 / 60 % 60);
               s = Math.floor(t / 1000 % 60);
            }
            if (t <= 0) {
               this.time = '活动正在进行中';
            } else {
               this.time = d + "天" + h + "时" + m + "分" + s + "秒";
            }
        },
        // 倒计时
        countDown () {
            let timerForOrder = setInterval(() => {
                let overtime = this.createOrderTime + (30 * 60 * 1000) - new Date().getTime();
                if (overtime > 0) {
                    this.conversMillisecondToTime(overtime);
                } else {
                    
                    clearInterval(timerForOrder);
                }
            }, 1000);
        },
        // 准备短信邮件订单的支付
        preparePaySmsEmailOrder () {
            jQuery.ajax({
                url: API_URL + "/notice/preparePaySmsEmailOrder",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "orderId": this.orderId
                })
            })
            .done((data, textStatus, jqXHR) => {
                this.info=data;
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message({
                    message:JSON.parse(jqXHR.responseText).responseText,
                    type: 'warning'
                })
            });
        },
        // 微信二维码更新倒计时
        dTime(){
            this.erwmSurplusTime=this.erwmAllTime*60;
            this.download=false;
            this.timer=setInterval(()=>{
                if(this.erwmSurplusTime==0){
                    clearInterval(this.timer);
                    this.download=true;
                }else{
                    this.erwmSurplusTime--;
                }
            },1000)
        },
        // 生成微信二维码
        createUnifiedOrder(){
            // 微信
            jQuery.ajax({
                url: API_URL + "/wxpay/native/createUnifiedOrder",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "orderNumber": this.info.orderNumber,
                    "productName": this.info.paymentPurposes
                })
            })
            .done((data, textStatus, jqXHR) => {
                this.erwmImg=jQuery(data.documentElement).html();
                let timerForResult = setInterval(() => {
                    this.getSmsEmailOrderPayResult();
                }, 1000);
                $('#wx-pay').modal({
                    onShow: () => {
                        this.dTime();
                    },
                    onHide: () => {
                        clearInterval(this.timer);
                        clearInterval(timerForResult);
                        this.timer = null;
                    }
                }).modal('show');
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message({
                    message:JSON.parse(jqXHR.responseText).responseText,
                    type: 'warning'
                })
            });
        },
        // 支付宝支付
        paySmsEmailOrder(){
            jQuery.ajax({
                url: API_URL + "/notice/paySmsEmailOrder",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "orderNumber": this.info.orderNumber,
                    "productName": this.info.paymentPurposes,
                    "paymentMethod": this.payMethod
                })
            })
            .done((data, textStatus, jqXHR) => {
                let form = $(data);
                let sub = form.attr({'target':'__blank'}).find('[type=submit]').val('立即支付').addClass('ui button blue large payment-btn');
                $('#alipayForm').empty().append(form)
                sub.click(() => {
                    $('#statusBtn').modal({
                        closable: false,
                        onHidden: () => {
                            this.$router.replace({path:'/recharge',query:{type: this.$route.query.type}});
                        }
                    }).modal('show');
                })
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message({
                    message:JSON.parse(jqXHR.responseText).responseText,
                    type: 'warning'
                })
            });
        },
        // 根据订单号查询支付结果
        getSmsEmailOrderPayResult () {
            jQuery.ajax({
                url: API_URL + "/notice/getSmsEmailOrderPayResult",
                type: "GET",
                data: {
                    "orderNumber": this.info.orderNumber,
                }
            })
            .done((data, textStatus, jqXHR) => {
                if (data.isPaySuccess) {
                    if (this.payMethod === 'alipay') {
                        $('#statusBtn').modal('hide');
                    } else if (this.payMethod === 'wechat') {
                        $('#wx-pay').modal('hide');
                    }
                    this.$router.replace({path:'/paySuccess',query:{type:data.type,rechargeNumber:data.rechargeNumber,orderNumber: data.orderNumber}});
                } else {
                    if (this.payMethod === 'alipay') {
                        this.$message({
                            message:'您还未完成支付！',
                            type: 'warning'
                        })
                    }
                }
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message({
                    message:JSON.parse(jqXHR.responseText).responseText,
                    type: 'warning'
                })
            });
        },
        // 支付
        nowPay(){
            // 按条件选择支付方式
            switch (this.payMethod) {
                case '':
                    this.$message({
                        message:'请选择支付方式',
                        type: 'warning'
                    });
                    break;
                case 'wechat':
                    this.createUnifiedOrder();
                    break;
            }
        }
    },
    components: {
        headerSimple,
        footers: footer,
    }
}
</script>
<style scoped>
    @import "../assets/css/bankList.css";
    @media only screen and (max-width: 767px) {
        .p-lg{
            padding: 1em !important;
        }
        .ui.divider{
            margin: .5rem 0;
        }
        .ui.menu.four.item .item{
            width: 50%;
        }
        .block-tab .ui.tab{
            padding: 1em;
        }
    }
</style>
