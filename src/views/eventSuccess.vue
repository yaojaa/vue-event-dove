<template>
    <div class="event-wrap">
        <div class="ui computer only tablet only  grid">
            <div class="column">
                <div class="event-banner-bg" :style="'background-image:url('+info.bannerUrl+'?imageMogr2/auto-orient/thumbnail/100x/blur/50x5/quality/75|imageslim)'">
                    <div class="back-line">
                        <div class="ui container">
                            <div class="ui computer only tablet only vertically padded grid">
                                <div class="column">
                                    <router-link :to="'/site/'+eventId" class="text-white title-shadow"><i class="angle left icon"></i> 返回活动网站</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui  container">
                        <div class="ui doubling stackable vertically padded middle aligned grid event-banner">
                            <div class="equal row">
                                <div class="ten wide column title-shadow">
                                    <h2 class="ui header text-white">{{info.title}}</h2>
                                    <p><i class="wait icon "></i> {{info.startTime |escapeTime}} — {{info.endTime |escapeTime}}</p>
                                    <p><i class="marker icon"></i> {{info.detailedAddress}}</p>
                                </div>
                                <div class="six wide column">
                                    <div class="ui medium image pic-box"><img :src="info.bannerUrl+'?imageMogr2/auto-orient/thumbnail/600x/blur/1x0/quality/75|imageslim'" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui container">
            <div class="ui doubling stackable vertically padded grid">
                <div class="eleven wide column">
                    <div class="white-wrap p-lg">
                        <div class="ui items">
                            <div class="item">
                                <div class="ui tiny mob-img image" v-show="orderStatus=='successfulRegistrationPage' || orderStatusCopy =='paid'">
                                    <!-- successfulRegistrationPage -->
                                    <img src="/images/succes-01.png" alt="">
                                </div>
                                <div class="ui tiny mob-img image" v-show="!orderStatus && orderStatusCopy !='paid'">
                                    <img src="/images/succes-02.jpg" alt="">
                                </div>
                                <div class="ui tiny mob-img image" v-show="orderStatus=='toBeTransferPage'">
                                    <!-- toBeTransferPage -->
                                    <img src="/images/succes-03.jpg" alt="">
                                </div>
                                <div class="ui tiny mob-img image" v-show="orderStatus=='toBeOnsitePage'">
                                    <!-- toBeOnsitePage -->
                                    <img src="/images/succes-01.png" alt="">
                                </div>
                                <div class="content">
                                    <div v-show="orderStatus=='successfulRegistrationPage' || orderStatusCopy =='paid'">
                                        <div class="header">恭喜您报名成功，期待参与！</div>
                                        <div class="meta">
                                            <span>电子票和订单详情已发至您的邮箱，请注意查收。</span>
                                        </div>
                                    </div>
                                    <div v-show="!orderStatus && orderStatusCopy !='paid'">
                                        <div class="header">报名成功，请等待主办方审核！</div>
                                        <div class="meta">
                                            <span>主办方审核通过您的报名信息后会将门票发送至您的邮箱。</span>
                                        </div>
                                    </div>
                                    <div v-show="orderStatus=='toBeTransferPage'">
                                        <div class="header">报名成功，请在30分钟内完成银行转账支付！</div>
                                        <div class="meta">
                                            <span>主办方在确认收到款项之后，核实后会通过邮件发送给参会者本人电子门票，届时请注意查收。</span>
                                        </div>
                                    </div>
                                    <div v-show="orderStatus=='toBeOnsitePage'">
                                        <div class="header">报名成功，期待参与！</div>
                                        <div class="meta">
                                            <span>由于您选择了现场缴费，请您注意活动时间，提前到达活动现场，完成缴费。</span>
                                        </div>
                                    </div>
                                    <div class="description space-md">
                                        <p>订单号：{{info.orderNumber}}</p>
                                        <p>收件人：{{info.buyer.name}}</p>
                                        <p>邮箱地址：{{info.buyer.email}}</p>
                                        <p>订购时间：{{info.cTime | escapeTime}}</p>
                                    </div>
                                    
                                    <div class="ui yellow message" v-show="orderStatus != 'toBeOnsitePage'">
                                        <div class="content">
                                            如果长时间没有收到邮件，确认一下垃圾箱里有没有，没有请将 orders@eventdove.com 加入邮箱联系人，点击重新发送。
                                        </div>
                                    </div>
                                    <a target="_blank" class="ui button blue large fluid e-ticket-btn" @click="myorderList" v-show="orderStatus=='successfulRegistrationPage' || orderStatusCopy =='paid'">查看电子票</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="five wide computer only tablet only column">
                    <div class="white-wrap p-lg">
                        <a href="https://itunes.apple.com/us/app/hui-ge/id768575726?ls=1&mt=8"  target="_blank"><img src="/images/ad-app.jpg" class="w-full"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui mini modal" id="e-ticket">
            <i class="close icon"></i>
            <div class="header">
                查看电子票
            </div>
            <div class="content text-center">
                <!-- <svg v-html="OrderErwm" width="164" height="164" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg> -->
                <img :src="OrderErwm" class="ui medium bordered image centered" alt="">
                <p class="space-sm">微信<span class="text-blue">扫一扫</span>获取电子票</p>
                <a class="ui button teal e-ticket-btn" @click="download"><i class="download icon"></i> 下载电子票</a>
            </div>
        </div>
        <footers></footers>
    </div>
</template>
<script>
import {
    API_URL
} from '../config'
import moment from 'moment'
import footer from '../components/footerEvent'
export default {
    data() {
            return {
                info: {
                    buyer: {
                        name: '',
                        email: ''
                    }
                },
                orderNumber: '',
                orderStatus: '',
                orderStatusCopy:'',
                eventId:'',
                OrderErwm:'/images/city_normal.jpg'
            }
        },
        mounted() {
            this.orderNumber = this.$route.params.id;
            this.eventId=this.$route.params.eventId;
            var _this = this;
            var img = $('#pic').attr('src');
            jQuery.ajax({
                url: API_URL + "/order/getTicketOrderPayResult",
                type: "GET",
                data: {
                    "orderNumber": _this.orderNumber,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                success: function(data, req, xhr) {
                    if (xhr.status == 200) {
                        _this.info = data;
                        _this.orderStatus = data.ticketOrderPayResultPage;
                        _this.orderStatusCopy=data.orderStatus;
                    }
                }
            })
        },
        filters: {
            // 格式化后台返回的时间
            escapeTime(value) {
                return moment(value).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        methods: {
            //续费
            renew: function() {},
            download:function(){
                var _this=this;
                jQuery.ajax({
                    url: API_URL+"/attendee/downloadAllEticket",
                    type: "GET",
                    data: {
                        "orderNumber": _this.orderNumber,
                    },
                    success:function(){
                        window.open(API_URL+'/attendee/downloadAllEticket?orderNumber='+_this.orderNumberSave)
                    },
                    error:function(err){
                        _this.$message.warning(JSON.parse(err.responseText).responseText)
                    }
                })
            },
            // 跳转界面
            myorderList(){
                $('#e-ticket').modal('show')
                // if(this.OrderErwm!=''){return false;}
                var _this=this;
                $.ajax({
                    url: API_URL+'/wx/qrCode/order',
                    type: "post",
                    data: JSON.stringify({
                        orderNumber: _this.orderNumber,
                    }),success:function(data){
                        _this.OrderErwm=data.qrCode;
                    }
                })
            }
        },
        components: {
            footers: footer
        }
}
</script>
<style scoped>
.event-banner-bg {
    color: #fff;
    margin-bottom: 1em;
    width: 100%;
    overflow: hidden;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.title-shadow {
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5)
}

.event-banner {
    min-height: 200px;
}

.pic-box {
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.back-line {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

@media only screen and (max-width: 767px) {
    .event-banner-bg {
        margin-bottom: 0em;
    }
    .event-banner {
        min-height: auto;
    }
    .p-lg {
        padding: 1em !important;
    }
    .ui.divider {
        margin: .5rem 0;
    }
}
</style>
