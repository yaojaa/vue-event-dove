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
                    <div class="text-muted">
                        <i class="iconfont icon-imgtime icon text-teal"></i>
                        <span class="text-yellow">{{CountDown}}</span>
                    </div>
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
                        <a class="item active" data-tab="first" @click="getType('onlinePayment')">
                            <span><i class="icon-zhifu iconfont icon"></i>线上支付</span>
                        </a>
                        <a class="item" data-tab="second" v-show="info.offlinePayment && info.offlinePayment!=''" @click="getType('offlinePayment')"><span><i class="icon-xianxia iconfont icon"></i>线下支付</span></a>
                    </div>
                    <div class="ui active tab" data-tab="first">
                        <div class="ui five column doubling grid bank-main computer only tablet only">
                            <div class="column" v-for="(pay,index) in info.onlinePayment">
                                <div class="bank-box" @click="selecedPay(index,pay.name)" :class="[payMethodIndex==index?'checked':'']">
                                    <span class="bank-logo" :class="'bank-'+pay.name"></span>
                                    <i class="iconfont icon-mark-right-top corner"></i>
                                </div>
                            </div>
                        </div>
                        <div class="ui computer only tablet only grid">
                            <div class="column">
                                <div class="sixteen wide column">
                                    <div class="text-right" id="submit">
                                        <button class="ui button blue large payment-btn" v-show='btnTure' @click="nowPay">立即支付</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- 移动支付 -->
                        <div class="ui two column doubling grid bank-main mobile only space-xs">
                            <div class="column" v-for="(pay,index) in info.onlinePayment">
                                <div class="bank-box" @click="mobileSelectePay(pay.name)" :class="[payMethodIndex==index?'checked':'']">
                                    <span class="bank-logo" :class="'bank-'+pay.name"></span>
                                    <i class="iconfont icon-mark-right-top corner"></i>
                                </div>
                            </div>
                        </div>



                    </div>
                    <div class="ui  tab" data-tab="second" v-show="info.offlinePayment && info.offlinePayment!=''">
                        <div class="ui form">
                            <div class="inline fields">
                                <div class="field" v-for="type in info.offlinePayment">
                                    <div class="ui radio checkbox">
                                        <input type="radio" name="fruit" v-model="onsiteType" :value="type.name" tabindex="0" class="hidden">
                                        <label>{{type.str}}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="ui icon yellow message" v-show="onsiteType == 'transfer'">
                                <i class="info circle icon"></i>
                                <div class="content">
                                    <div class="header">提示</div>
                                    <p>采用线下付款方式，您的位子不会被锁定。组织者收到您的付款之后，如仍有余位，电子票才会通过电子邮件发送给您。请您确认选择线下付款！</p>
                                </div>
                            </div>
                            <div class="ui icon message" v-show="onsiteType == 'transfer'">
                                <i class="iconfont icon-yinhanghuikuan icon teal"></i>
                                <div class="content">
                                    <div class="ui list" v-for="bankmsg in bankDetail">
                                        <div class="item">账号名称：<strong>{{bankmsg.representativeName || bankmsg.ownerName}}</strong></div>
                                        <div class="item">开户银行：<strong>{{bankmsg.bankBranch}}</strong></div>
                                        <div class="item">银行帐号：<strong>{{bankmsg.bankAccount}}</strong></div>
                                    </div>
                                </div>
                            </div>
                            <div class="ui icon yellow message" v-show="onsiteType == 'onsite'">
                                <i class="info circle icon"></i>
                                <div class="content">
                                    <div class="header">提示</div>
                                    <p>采用现场缴费付款方式，您的位子不会被锁定。请您确认选择现场缴费！</p>
                                </div>
                            </div>
                            <button class="ui button blue large payment-btn" @click="lineDown">提交</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footers></footers>
        <div class="ui mini modal" id="wx-pay">
            <i class="close icon"></i>
            <div class="header">
                微信支付{{download}}
            </div>
            <div class="content text-center">
                <p class="text-muted" v-show="!download">距离二维码过期还剩<span class="text-red">{{erwmSurplusTime}}</span>秒，过期后请刷新页面重新获取二维码。</p>
                <p class="text-red" v-show="download">二维码已过期，<a href="javascript:;" @click="wechatAjax('down')">刷新</a>重新获取二维码。</p>
                <div class="eleven wide field">
                    <svg v-html="erwmImg" width="148" height="148" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>
                </div>
                <p class="space-sm">请使用微信<span class="text-blue">扫一扫</span>扫描二维码支付</p>
            </div>
        </div>
        <div class="ui small basic text-center modal" id="overtime">
            <div class="ui icon header">
                <i class="wait icon"></i> 超时提示
            </div>
            <div class="content">
                <p>您以超过时限，您的订单已取消。对您带来的不便，我们深表歉意！</p>
            </div>
            <div class="actions text-center">
                <div class="ui green ok inverted button">
                    <i class="checkmark icon"></i> 确定
                </div>
            </div>
        </div>
        <div class="ui small basic text-center modal" id="statusBtn">
            <div class="ui icon header">
                <i class="idea icon"></i> 提示
            </div>
            <div class="content">
                <p>请在新打开的页面完成支付，支付完成前请不要关闭窗口。</p>
            </div>
            <div class="actions text-center">
                <div class="ui green inverted button" @click="paySuccess">
                    <i class="checkmark icon"></i> 已完成支付
                </div>
                <div class="ui red basic cancel inverted button" @click="payFail">
                    <i class="remove icon"></i> 充值遇到问题？
                </div>
            </div>
        </div>
        <div class="ui small basic test modal confirm-layer">
            <div class="ui icon header"><i class="idea icon"></i> 订单超时，请到活动详情界面重新下单！ </div>
            <div class="actions">
                <div class="ui green inverted button" @click="changeHref()"><i class="checkmark icon"></i> 确定 </div>
            </div>
        </div>
    </div>
</template>
<script>
function addStr(value) {
    return value < 10 ? '0' + value : value;
}

import {
    API_URL
} from '../config'
import moment from 'moment'
import headerSimple from '../components/header_simple'
import footer from '../components/footerPay'
export default {
    data() {
        return {
            info: {},
            CountDown: '',
                payType: 'onlinePayment', //支付方式
                payMethodIndex: -1,
                method: '', //用什么来支付
                setData: {
                    orderNumber: '',
                    productName: ''
                },
                bankDetail: [],
                erwmImg: '',
                erwmAllTime: 5,
                erwmSurplusTime: 0,
                download: false,
                onsiteType: 'transfer',
                getErwm: null,

                btnTure: true,
                timeNum: 0,
                timer: null,
                eventId: '',
                isAjax: true,
                dTimer: null,
                getResults: null,
                wxUrl:'',
                orderId:'',
            }
    },
    mounted() {

            $('.menu .item').tab()
            this.orderId = this.$route.params.id;
            this.eventId = this.$route.params.eventId;
            var _this = this;

            $.ajax({
                url: API_URL + "/order/preparePay",
                type: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                contentType: "application/json",
                data: JSON.stringify({
                    "orderId": this.orderId
                }),
                success: function(data, res, xhr) {
                    if (xhr.status == 200) {
                        _this.info = data;
                        _this.timeNum = new Date(data.cTime).getTime() + 30 * 60 * 1000;
                        _this.timer = setInterval(function() {
                            _this.GetRTime(_this.timeNum)
                        }, 1000);
                        _this.setData.orderNumber = data.orderNumber;
                        _this.setData.productName = data.paymentPurposes;
                        if (data.offlinePayment && data.offlinePayment.length > 0) {
                            for (var i = 0; i < data.offlinePayment.length; i++) {
                                if (data.offlinePayment[i].name == 'transfer' && data.offlinePayment[i].paymentAccountInfoArr && data.offlinePayment[i].paymentAccountInfoArr.length > 0) {
                                    _this.bankDetail = data.offlinePayment[i].paymentAccountInfoArr
                                }
                            }
                        }
                    }
                },
                error: function(error) {
                    _this.$message({
                        message: JSON.parse(error.responseText).responseText,
                        type: 'warning'
                    })
                }
            })
    },
    methods: {
        // 微信支付获取url
        mobileSelectePay(type){
           if(type == 'alipay'){return false;}
            $.ajax({
                url:API_URL+'wx/oauth',
                type:'get',
                data:{'url':'/wx/pay/','state':this.setData.orderNumber+'*'+this.info.eventId,},
                success:function(data){
                    this.wxUrl=data.authurl;
                    // window.open(data.authurl)
                    location.href=data.authurl;
                },
                error:function(){
                    alert(4);
                }
            })
        },
        
        GetRTime(value) { //订单倒计时
            var now = new Date().getTime();
            var t = value - now;
            var m = 0;
            var s = 0;
            if (t >= 0) {
                m = Math.floor(t / 1000 / 60 % 60);
                s = Math.floor(t / 1000 % 60);
            }
            if (t <= 0) {
                this.CountDown = "订单超时";
                this.isAjax = false;
                $('.basic.test.modal').modal('show')
                clearInterval(this.timer);
            } else {
                this.CountDown = '剩余：' + addStr(m) + "分" + addStr(s) + "秒";
            }
        },
        // 超时跳转
        changeHref() {
            $('.basic.test.modal').modal('hide');
            this.$router.push({
                'path': '/site/' + this.info.eventId
            })
        },
            // 选择支付银行
            selecedPay(index, value) {
                this.payMethodIndex = index
                this.method = value;
                if (this.method == 'alipay') {
                    if (this.isAjax) {
                        this.btnTure = false;
                        this.alipayAjax();
                    }
                } else {
                    this.btnTure = true;
                    if ($('#alipaysubmit').length > 0) {
                        $('#alipaysubmit').remove();
                    }
                }
                // this.setData.productName = value;
            },

            // 选择支付的方式
            getType(value) {
                // 记录选项卡选择
                this.setData.payType = value;
            },
            dTime() { //微信二维码倒计时
                this.erwmSurplusTime = this.erwmAllTime * 60;
                this.download = false;
                this.dTimer = setInterval(() => {
                    if (this.erwmSurplusTime == 0) {
                        clearInterval(this.dTimer);
                        clearInterval(this.getResults)
                        this.download = true;
                    } else {
                        this.erwmSurplusTime--;
                    }
                }, 1000)
            },
            wechatAjax(key) {
                // 微信

                if (!this.isAjax) {
                    return false;
                }
                var _this = this;
                clearInterval(this.getErwm);
                this.getErwm = setTimeout(function() {
                    $.ajax({
                        url: API_URL + "/wxpay/native/createUnifiedOrder",
                        type: "POST",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        data: JSON.stringify({
                            "orderNumber": _this.setData.orderNumber,
                            "productName": _this.setData.productName
                        }),
                        success(data) {
                            _this.erwmImg = jQuery(data.documentElement).html();
                            _this.download = false;
                            _this.dTime();
                            _this.getResults = setInterval(function() {
                                _this.getOVer()
                            }, 1000)
                            if (key == 'down') {
                                return false;
                            }
                            $('#wx-pay').modal({
                                onShow: function() {

                                },
                                onHide: function() {
                                    clearInterval(_this.dTimer);
                                    clearInterval(_this.getResults)
                                }
                            }).modal('show');


                        },
                        error: function(err) {
                            _this.$message.warning(JSON.parse(err.responseText).responseText)
                        }
                    })
                }, 300)
            },
            getOVer() {
                var _this = this;
                jQuery.ajax({
                    url: API_URL + "/order/getTicketOrderPayResult",
                    type: "GET",
                    data: {
                        "orderNumber": _this.setData.orderNumber,
                    },
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    success: function(data) {
                        if (data.isPaySuccess) {
                            clearInterval(_this.timer);
                            if (data.paymentMethod == 'wechat') {
                                $('#wx-pay').modal('hide');
                                clearInterval(_this.getResults);
                                _this.$router.push({
                                    path: '/meetingSuccess/' + _this.setData.orderNumber + '/' + _this.eventId
                                })
                            } else if (data.paymentMethod == 'alipay') {
                                _this.$router.push({
                                    path:'/site/'+ _this.eventId
                                });
                            }
                        } else {
                            if (_this.method === 'alipay') {
                                _this.$message({
                                    message: '您还未完成支付！',
                                    type: 'warning'
                                })
                            }
                        }
                    },
                    error: function(err) {
                        console.log(err);
                    }
                })
            },
            paySuccess() { // 支付宝成功按钮
                $('#statusBtn').modal('hide');
                this.getOVer();
            },
            payFail() { //支付宝失败按钮
                $('#statusBtn').modal('hide');
            },
            alipayAjax() {
                // 支付宝支付
                var _this = this;
                jQuery.ajax({
                    url: API_URL + "/order/payTicketOrder",
                    type: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    contentType: "application/json",
                    data: JSON.stringify({
                        "orderNumber": _this.setData.orderNumber,
                        "productName": _this.setData.productName,
                        "paymentMethod": _this.method
                    }),
                    success(data) {
                        $('#submit').append(data);
                        $('#alipaysubmit').attr({
                            'target': '__blank'
                        }).find('[type=submit]').val('立即支付').addClass('ui button blue large payment-btn');
                        $('#alipaysubmit').click(function() {
                            $(this).submit();
                            _this.clickfn();
                        })

                    }
                })
            },
            clickfn() {
                $('#statusBtn').modal({
                    'closable': false
                }).modal('show');
                // _this.getOVer();
            },
            nowPay() {
                // 选择微信的弹出框
                if (!this.isAjax) {
                    return false
                }
                if (this.method == '') {
                    alert('请选择支付方式');
                    return false;
                }
                if (this.method == 'wechat') {
                    this.wechatAjax()
                }
            },
            lineDown() {
                // onsiteType   线下支付方式
                var _this = this;
                $.ajax({
                    url: API_URL + "order/updatePaymentMethod",
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    data: JSON.stringify({
                        "orderId": _this.orderId,
                        "paymentMethod": _this.onsiteType,
                    }),
                })
                .done(function(data, textStatus, jqXHR) {
                        // console.log("HTTP Request Succeeded: " + jqXHR.status);
                        // console.log(data);
                        // _this.$message.warning('提交成功')
                        _this.$router.push({
                            path: '/meetingSuccess/' + _this.setData.orderNumber + '/' + _this.eventId
                        })
                    })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.log("HTTP Request Failed");
                })

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
.ui.grid.bank-main>.column:not(.row),
.ui.grid.bank-main>.row {
    padding-top: .5rem !important;
    padding-bottom: .5rem !important;
}

@media only screen and (max-width: 767px) {
    .p-lg {
        padding: 1em !important;
    }
    .ui.divider {
        margin: .5rem 0;
    }
    .ui.menu.four.item .item {
        width: 50%;
    }
    .block-tab .ui.tab {
        padding: 1em;
    }
}
</style>
