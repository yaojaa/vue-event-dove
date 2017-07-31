<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn"><span class="text-muted f16">门票及订单</span>/订单详情</h2>
                    <router-link :to="{name:'myorder'}" class="ui basic button blue mini">返回</router-link>
                </div>
                <div class="white-wrap p-lg">
                    <h4 class="ui dividing header">订单基本信息</h4>
                    <div class="ui three column doubling stackable grid">
                        <div class="column">
                            <div class="ui relaxed list">
                                <div class="item"><span class="text-info">订单编号：</span>{{details.orderNumber}}</div>
                                <div class="item"><span class="text-info">交易时间：</span>{{details.cTime}}</div>
                                <div class="item"><span class="text-info">订单状态：</span>{{status[details.status]}}</div>
                                <div class="item"><span class="text-info">支付金额：</span>{{details.paymentPriceUnitSign+details.totalPrice}}(实际支付金额)</div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui relaxed list">
                                <div class="item"><span class="text-info">购票人：</span>{{details.buyer.name}}</div>
                                <div class="item"><span class="text-info">手机号：</span>{{details.buyer.phone}}</div>
                                <div class="item"><span class="text-info">邮件：</span>{{details.buyer.email}}</div>
                            </div>
                        </div>
                        <div class="middle aligned center aligned column">
                            <div class="mb-xs" v-if="isShowBtn(details.status,0)">
                                <router-link :to="{name:'paySelecte',params:{id:orderId,eventId:details.eventId}}" class="ui button mini blue w-100" :class="{'disabled':isShowBtn(details.status,1)}">去支付</router-link>
                            </div>
                            <div class="mb-xs cancelbtn" v-if="isShowBtn(details.status,2)"><a href="#" class="ui button mini red w-100" @click="cancelOrder">取消订单</a></div>
                            <div class="mb-xs" v-if="isShowBtn(details.status,3)"><a href="#" class="ui button mini teal w-100" @click="downloadEticket(details.orderNumber)">下载电子票</a></div>
                        </div>
                    </div>
                    <h4 class="ui dividing header">活动信息</h4>
                    <div class="ui relaxed list">
                        <div class="item"><span class="text-info">会议名称：</span>{{details.eventInfo.title}}</div>
                        <div class="item"><span class="text-info">活动时间：</span>{{details.eventInfo.startTime | timer }} 至 {{details.eventInfo.endTime | timer }}</div>
                        <div class="item"><span class="text-info">地点：</span>{{details.eventInfo.detailedAddress?details.eventInfo.detailedAddress:'线上活动'}}</div>
                        <div class="item"><span class="text-info">主办方：</span>{{details.eventInfo.organizers | organizers }}</div>
                    </div>
                    <h4 class="ui dividing header">门票信息</h4>
                    <div class="create-border mb-sm">
                        <table class="ui padded table tablet stackable f15">
                            <thead>
                                <tr>
                                    <th>参会人</th>
                                    <th>邮箱</th>
                                    <th>手机号</th>
                                    <th>门票</th>
                                    <th v-if="isShowBtn(details.status,4)">状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="ticket in details.orderDetails">
                                    <tr v-for="buyer in ticket.buyInfos">
                                        <td>{{buyer.collectInfo.name}}</td>
                                        <td>{{buyer.collectInfo.email}}</td>
                                        <td>{{buyer.collectInfo.mobile}}</td>
                                        <td>{{ticket.ticketName}}</td>
                                        <td v-if="isShowBtn(details.status,4)">
                                            <div class="ui horizontal label red">{{status[details.status]}}</div>
                                        </td>
                                        <td>
                                            <router-link :to="{name:'participantInfo',params:{id:details.eventId+'_'+details.orderNumber+'_'+buyer.attendeeId}}" class="mr-md ticket-details">修改信息</router-link>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <footers></footers>
        <div class="ui small basic test modal confirm-layer">
            <div class="ui icon header"><i class="idea icon"></i> 您确定要删除吗？ </div>
            <div class="actions">
                <div class="ui green ok inverted button"><i class="checkmark icon"></i> 确定 </div>
                <div class="ui red basic cancel inverted button"><i class="remove icon"></i> 取消 </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../config'
import moment from 'moment'
import header from '../components/header'
import footer from '../components/footer'
import {
    formatTime,
    loadJs
} from '../utils/index'

function fnError(err) {
    let error = JSON.parse(err.responseText);
    this.$message.error(error.responseText||'网络异常')
}
export default {
    name: 'orderDetails',
    data() {
        return {
            orderId: this.$route.params.id,
            details: {},
            status: {
                Refunded: "全额退款", //没按钮
                audited: "已审核", //去支付  审核
                cancel: "订单取消", //没按钮
                hang: "订单挂起", //没按钮
                none: "未付款", //支付、取消
                paid: "完成付款", //下载
                partPaid: "部分付款", //下载
                partRefund: "部分退款", //下载
                pending: "待审核", //没按钮支付dis  审核
                reject: "已拒绝", //没按钮 审核
                timeOut: "付款超时" //没按钮
            }
        }
    },
    created() {
        if (this.$route.params.id === '') return false
        $.ajax({
            url: API_URL + '/order/getOrderById',
            type: 'get',
            async: false,
            data: {
                orderId: this.$route.params.id
            },
            success: (data) => {
                formatTime(data)
                console.log(data)
                this.details = data
            },
            error: (err) => {
                let error = JSON.parse(err.responseText)
                this.$message.error(error.responseText)
            }
        })
    },
    mounted() {

    },
    filters: {
        timer(val) {
            return moment(val).locale('zh-cn').format('YYYY-MM-DD dddd HH:MM')
        },
        organizers(val) {
            let arr = []
            $.each(val, function(i, o) {
                arr.push(o.name)
            });
            return arr.toString()
        }
    },
    methods: {
        downloadEticket(orderNumber) {
            let url = API_URL + '/attendee/downloadAllEticket?orderNumber=' + orderNumber
            loadJs('/js/jquery.fileDownload.js', () => {

                jQuery.ajax({
                        url: url,
                        type: "GET",
                    })
                    .done((data) => {
                        $.fileDownload(url)
                    })
                    .fail((err) => {
                        fnError.call(this, err)
                    })

            })

        },
        cancelOrder() {
            $('.confirm-layer.modal').modal('attach events','.cancelbtn').modal({
                onApprove: (el) => {
                    $.post(API_URL + '/order/cancelOrder', {
                        orderId: this.orderId
                    }, () => {
                        this.$message.success('订单取消成功')
                        window.location.reload()
                    }).error((err) => {
                        fnError.call(this, err)

                    })
                    return true;
                }
            })
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
        }
    },
    components: {
        headers: header,
        footers: footer,
    }
}
</script>
<style scoped>
.ui.relaxed.list:not(.horizontal)>.item:not(:last-child) {
    padding-bottom: .7em;
}

.ui.relaxed.list:not(.horizontal)>.item:not(:first-child) {
    padding-top: .7em;
}
</style>
