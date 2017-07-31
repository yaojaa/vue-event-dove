<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn">门票及订单</h2>
                </div>
                <div class="block-tab">
                    <div class="ui four item secondary left menu f16">
                        <a class="item active" data-tab="first"><span><i class="ticket icon"></i>我的门票</span></a>
                        <a class="item" data-tab="second"><span><i class="file text icon"></i>我的订单</span></a>
                    </div>
                    <div class="ui active tab" data-tab="first">
                        <!-- loading -->
                        <div class="loadingWrapper" v-if="hasContent === 'isLoading'">
                            <div class="ui active inverted dimmer">
                                <div class="ui text loader">加载中</div>
                            </div>
                        </div>
                        <p v-if="hasContent === 'noContent'" class="text-center"><img class="ui image medium centered" src="/images/no_centent.png" alt="没有找到相关内容"></p>
                        <!-- <div class="ui horizontal divider" v-if="notEndOrder.length>0">待参加活动的门票</div> -->
                        <div class="ui divided relaxed items" v-show="hasContent === 'hasContent'">
                            <div v-for="(order,orderIndex) in ticketList" class="item">
                                    <router-link :to="{name:'site',params:{id:order.right.id}}" class="ui small image">
                                        <img :src="order.right.thumbnail+'?imageMogr2/auto-orient/thumbnail/!720x360r/gravity/Center/crop/720x360/blur/1x0/quality/75|imageslim'">
                                    </router-link>
                                    <div class="content">
                                        <router-link :to="{name:'site',params:{id:order.right.id}}" class="header fwn black-link mt-n">{{order.right.title}}</router-link>
                                        <span v-if="order.isOver" class="ui little label red">已结束</span>
                                        <div class="meta space-xs lh-mini"><span class="cinema"><i class="wait icon"></i>{{order.right.startTime}}　|　<i class="map signs icon"></i>{{order.right.detailedAddress}}</span></div>
                                        <div class="description">
                                            <div class="ui horizontal list">
                                                <div class="item text-info">参会者:</div>
                                                <div class="item">{{order.ticket.collectInfo.name}}</div>
                                            </div>
                                        </div>
                                        <div class="description">
                                            <a href="javascript:void(0)" class="mr-lg e-ticket-btn" @click="getQrCode(order.ticket.attendeeId,order.left.orderNumber,order.ticket)">查看门票</a>
                                            <a v-if="!order.isOver" class="mr-lg mob-ticket-btn" @click="downloadEticket(order.ticket.attendeeId,order.left.orderNumber)">下载电子票</a>
                                            <a href="javascript:void(0)" class="mr-lg call-btn" @click="layerInfo(order)">联系主办方</a>
                                            <router-link :to="{name:'participantInfo',params:{id:order.ticket.codeObj.eventId+'_'+order.ticket.codeObj.orderNumber+'_'+order.ticket.attendeeId}}" class="mr-lg">参会人信息</router-link>
                                        </div>
                                    </div>
                            </div>
                            <pageView ref="pageView" @gotoPage="paging"></pageView>
                        </div>
                        <!-- <div class="ui horizontal divider" v-if="isEndOrder.length>0">已结束活动的门票</div>
                        <div class="ui divided relaxed items" v-if="isEndOrder.length>0">
                            <template v-for="(order,orderIndex) in isEndOrder">
                                <div class="item" v-for="(ticket,ticketIndex) in order.left.attendees">
                                    <router-link :to="{name:'site',params:{id:order.right.id}}" class="ui tiny image" :style="'background:url('+order.right.bannerUrl+');background-size:cover'"></router-link>
                                    <div class="content">
                                        <router-link :to="{name:'site',params:{id:order.right.id}}" class="header fwn black-link">{{order.right.title}}</router-link>
                                        <div class="meta space-sm"><span class="cinema"><i class="wait icon"></i>{{order.right.startTime}}　|　<i class="map signs icon"></i>{{order.right.detailedAddress}}</span></div>
                                        <div class="description">
                                            <div class="ui horizontal list">
                                                <div class="item text-info">参会者:</div>
                                                <div class="item">{{ticket.collectInfo.name}}</div>
                                            </div>
                                        </div>
                                        <div class="description">
                                            <a href="javascript:void(0)" class="mr-lg e-ticket-btn" @click="getQrCode(ticket.attendeeId,order.left.orderNumber,ticket)">查看门票</a>
                                            <a href="#" class="mr-lg call-btn" @click="layerInfo(order)">联系主办方</a>
                                            <router-link to="/participantInfo" class="mr-lg">参会人信息</router-link>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div> -->
                    </div>
                    <div class="ui tab" data-tab="second">
                        <p v-if="hasContent === 'noContent'" class="text-center"><img class="ui image medium centered" src="/images/no_centent.png" alt="没有找到相关内容"></p>
                        <div class="ui divided relaxed items" v-show="hasContent === 'hasContent'">
                            <div class="item" v-for="(order,orderIndex) in myorderList">
                                <router-link :to="{name:'site',params:{id:order.right.id}}" class="ui small image">
                                    <img :src="order.right.thumbnail+'?imageMogr2/auto-orient/thumbnail/!720x360r/gravity/Center/crop/720x360/blur/1x0/quality/75|imageslim'">
                                </router-link>
                                <div class="content">
                                    <router-link :to="{name:'site',params:{id:order.right.id}}" class="header fwn black-link mt-n">{{order.right.title}}</router-link>
                                    <span class="ui little label" :class="statusColor(order.left.status)">{{status[order.left.status]}}</span>
                                    <div class="meta space-xs lh-mini"><span class="cinema"><i class="wait icon"></i>{{order.right.startTime}}　|　<i class="map signs icon"></i>{{order.right.detailedAddress}}</span></div>
                                    <div class="description">订单号：{{order.left.orderNumber}}</div>
                                </div>
                                <div class="right">
                                    <router-link :to="{name:'orderDetails',params:{id:order.left.id}}" class="mini ui button blue">订单详情</router-link>
                                </div>
                            </div>
                            <pageView ref="pageView2" @gotoPage="paging2"></pageView>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <snap></snap>
        <footers></footers>
        <div class="ui mini modal" id="e-ticket">
            <i class="close icon"></i>
            <div class="header">
                查看电子票
            </div>
            <div class="content text-center">
                <img :src="qrCodeUrl" alt="" class="ui medium bordered image centered">
                <p class="space-sm">微信<span class="text-blue">扫一扫</span>获取电子票</p>
                <a class="ui button teal e-ticket-btn" @click="downloadEticket(attendeeId,orderNumber)"><i class="download icon"></i> 下载电子票</a>
            </div>
        </div>
        <div class="ui mini modal" id="tel">
            <div class="header">
                联系主办方
            </div>
            <div class="content" v-if="layerorder.right">
                <div class="ui divided items items-md">
                    <div class="item">
                        <div class="content">
                            <div class="description big space-xs">
                                <i class="mail icon text-muted"></i><a :href="'mailto:'+layerorder.right.contact.email">{{layerorder.right.contact.email}}</a>
                            </div>
                            <div class="description big">
                                <i class="call icon text-muted"></i><a>{{layerorder.right.contact.mobile}}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../config'
import header from '../components/header'
import footer from '../components/footer'
import page from '../components/page'
import {
    dataFilter,
    formatTime,
    loadJs
} from '../utils/index'
export default {
    name: 'myticket',
    data() {
        return {
            // hasContent：加载数据状态，{isLoading: 加载中，nothing: 暂无内容}
            hasContent: 'isLoading',
            API_URL: API_URL,
            myorders: [],
            notEndOrder: [],
            isEndOrder: [],
            layerorder: {},
            status: {},
            orderNumber: '',
            attendeeId: '',
            qrCodeUrl: '/images/city_normal.jpg',
            myTickets:[],
            allPage1: 1,
            allPage2: 1,
            ticketList: [],
            myorderList: []
        }
    },
    watch: {
        // allPage1(o, n) {
        //     if (!o) {
        //         return;
        //     }
        //     this.$refs.pageView.setpageData({
        //         currentPage: 1,
        //         showItem: 5,
        //         allPage: o
        //     });
        // },
        // allPage2(o, n) {
        //     if (!o) {
        //         return;
        //     }
        //     this.$refs.pageView2.setpageData({
        //         currentPage: 1,
        //         showItem: 5,
        //         allPage: o
        //     });
        // }
    },
    created() {
        this.$store.getters.userStatus
        let data = {
            // page: 1,
            limit: 10000,
            userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '',
        }
        new Promise((resolve,reject) => {
            $.ajax({
                type: "get",
                url: API_URL + 'order/getOrderByUserIdAndPageIndex',
                // url: '/js/aaa.json',
                data: data,
                success: (data) => {
                    if (!data) return
                    formatTime(data);
                    this.myorders = data.items
                    this.allPage2 = Math.ceil(this.myorders.length/10);
                    this.paging2(1);
                    $.each(data.orderStatusList, (i, o) => {
                            this.status[o.name] = o.str
                        })
                        // 未结束
                    this.notEndOrder = $.extend(true, [], data.items)
                    for (let i = this.notEndOrder.length - 1; i >= 0; i--) {
                        let o = this.notEndOrder[i]
                        new Date(o.right.endTime).getTime() < new Date().getTime() || !this.isShowBtn(o.left.status, 3) ?
                            this.notEndOrder.splice(i, 1) : 
                            this.notEndOrder[i].isOver = false;
                    }
                    this.notEndOrder.sort(function(p, n) {
                            p = new Date(p.right.startTime).getTime()
                            n = new Date(n.right.startTime).getTime()
                            if (p > n)
                                return 1;
                            if (p == n)
                                return 0;
                            if (p < n)
                                return -1;
                        })
                        // 已结束
                    this.isEndOrder = $.extend(true, [], data.items)
                    for (let i = this.isEndOrder.length - 1; i >= 0; i--) {
                        let o = this.isEndOrder[i]
                        new Date(o.right.endTime).getTime() > new Date().getTime() || !this.isShowBtn(o.left.status, 3) ?
                            this.isEndOrder.splice(i, 1) : 
                            this.isEndOrder[i].isOver = true;
                    }
                    this.isEndOrder.sort(function(p, n) {
                        p = new Date(p.right.endTime).getTime()
                        n = new Date(n.right.endTime).getTime()
                        if (p > n)
                            return -1;
                        if (p == n)
                            return 0;
                        if (p < n)
                            return 1;
                    })
                    let allOrder = [].concat(this.notEndOrder,this.isEndOrder);
                    $.each(allOrder,(i,o)=>{

                        $.each(o.left.attendees,(ii,oo)=>{
                            let obj = {"left":o.left,"right":o.right,'isOver':o.isOver};
                            obj.ticket = oo
                            this.myTickets.push(obj)
                        })

                    })
                    this.allPage1 = Math.ceil(this.myTickets.length/10);
                    this.paging(1);
                    resolve(this.allPage1,this.allPage2)
                    if (this.myTickets.length) {
                        this.hasContent = 'hasContent'
                    } else {
                        this.hasContent = 'noContent';                 
                    }
                },
                error: (err) => {
                    let error = JSON.parse(err.responseText)
                    this.$message.error(error.responseText)
                }
            })
        }).then((p1,p2) => {
            this.$refs.pageView.setpageData({
                currentPage: 1,
                showItem: 5,
                allPage: p1
            });
            this.$refs.pageView2.setpageData({
                currentPage: 1,
                showItem: 5,
                allPage: p2
            });
        })
    },
    mounted() {
        $('.ui.active.tab .item').transition('hide').transition({
            animation: 'fade up',
            duration: 500,
            interval: 100
        });
        $('.menu .item').tab({
            onLoad: function() {
                $(this).find('.items>.item').transition('hide').transition({
                    animation: 'fade up',
                    duration: 500,
                    interval: 100
                });
            },
            onVisible: _index => {
                if (_index === 'first') {
                    if (this.myTickets.length) {
                        this.hasContent = 'hasContent'
                    } else {
                        this.hasContent = 'noContent';                 
                    }
                } else if (_index === 'second') {
                    if (this.myorders.length) {
                        this.hasContent = 'hasContent'
                    } else {
                        this.hasContent = 'noContent';                 
                    }
                }
            }
        })
    },
    filters: {},
    methods: {
        // 分页
        paging(curPage) {
            if (this.myTickets.length > (curPage-1)*10 && (this.myTickets.length-(curPage-1)*10) < 10) {
                this.ticketList = this.myTickets.slice((curPage-1)*10)
            } else {
                this.ticketList = this.myTickets.slice((curPage-1)*10,curPage*10)
            }
        },
        paging2(curPage) {
            if (this.myorders.length > (curPage-1)*10 && (this.myorders.length-(curPage-1)*10) < 10) {
                this.myorderList = this.myorders.slice((curPage-1)*10)
            } else {
                this.myorderList = this.myorders.slice((curPage-1)*10,curPage*10)
            }
        },
        layerInfo(order) {
            $('#tel').modal('show')
            this.layerorder = order
        },
        statusColor(status) {
            let colors = {
                Refunded: "red", //没按钮
                audited: "green", //去支付  审核
                cancel: "blank", //没按钮
                hang: "green", //没按钮
                none: "black", //支付、取消
                paid: "green", //下载
                partPaid: "green", //下载
                partRefund: "green", //下载
                pending: "red", //没按钮支付dis  审核
                reject: "red", //没按钮 审核
                timeOut: "yellow" //没按钮
            }
            return colors[status]
        },
        isShowBtn(status, index) {
            let arr = [
                ['audited', 'none', 'pending'], //支付可点
                ['pending'], //支付不可点
                ['none'], //取消
                ['paid', 'partPaid', 'partRefund'], //下载
                ['audited', 'pending', 'reject'] //审核状态
            ]
            return arr[index].indexOf(status) > -1
        },
        downloadEticket(attendeeId, orderNumber) {
            let url = API_URL + 'attendee/downloadEticket?attendeeId=' + attendeeId + '&orderNumber=' + orderNumber
            loadJs('/js/jquery.fileDownload.js', () => {
                jQuery.ajax({
                        url: url,
                        type: "GET",
                    })
                    .done(() => {
                        $.fileDownload(url)

                    })
                    .fail((err) => {
                        let error = JSON.parse(err.responseText)
                        this.$message.error(error.responseText)
                    })

            })

        },
        // 查看二维码
        getQrCode (attendeeId, orderNumber,ticket) {
            this.attendeeId = attendeeId;
            this.orderNumber = orderNumber;
            if(ticket.qrCodeTicket){
                this.qrCodeUrl = ticket.qrCodeTicket;
                $('#e-ticket').modal('show');
                return;
            }
            $.ajax({
                url: API_URL + 'wx/qrCode/ticket',
                type: "post",
                data: JSON.stringify({
                    orderNumber: this.orderNumber,
                    attendeeId: this.attendeeId
                })
            })
            .done((data) => {
                this.qrCodeUrl = data.qrCode;
                ticket.qrCodeTicket = data.qrCode;
                $('#e-ticket').modal('show');
            })
            .fail((err) => {
                let error = JSON.parse(err.responseText)
                this.$message.error(error.responseText) 
            })
        }
    },
    components: {
        headers: header,
        footers: footer,
        pageView: page,
        snap: function(resolve) {
            //异步组件写法
            require(['../components/html2canvas'], resolve)
        }
    }
}
</script>
<style scoped>
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

.loadingWrapper{
    position: relative;
    height: 225px;
}
</style>
