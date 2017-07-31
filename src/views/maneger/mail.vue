<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn">邮箱</h2>
                <div class="text-muted">您的邮箱余额：<span class="f24 text-default">{{balanceEmail?balanceEmail:'0'}}</span>条
                    <router-link class="ui button red ml-md" :to="{path: '/recharge',query: {type: 'email'}}">充值</router-link>
                </div>
            </div>
            <div class="block-tab">
                <div class="ui three item secondary menu f16">
                    <router-link :to="{name:'email',params:{id:id,label:'label1',page:'1'}}" class="item" :class="{active:label=='label1'}" data-tab="first"><span><i class="edit icon"></i>编辑邮件</span></router-link>
                    <router-link :to="{name:'email',params:{id:id,label:'label2',page:'1'}}" class="item" :class="{active:label=='label2'}" data-tab="second"><span><i class="send outline icon"></i>已发送</span></router-link>
                    <router-link :to="{name:'email',params:{id:id,label:'label3',page:'1'}}" class="item" :class="{active:label=='label3'}" data-tab="third"><span><i class="disk outline icon"></i>草稿箱</span></router-link>
                </div>
                <div class="ui labelstyle" v-if="label=='label1'">
                    <send-details :sendDetails="sendDetails" ref="senddetails" @success="setBalance"></send-details>
                </div>
                <div class="ui labelstyle" v-show="label=='label2'">
                    <view-list :propsData="sendedData" ref="label2" @success="setBalance"></view-list>
                </div>
                <div class="ui labelstyle" v-show="label=='label3'">
                    <view-list :propsData="draftData" ref="label3"></view-list>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
import senddetails from '../../components/send_details'
import viewlist from '../../components/send_details/view_list'
import {
    html_model2
} from '../../components/send_details/mail_model'
import {
    formatTime
} from '../../utils/index'
import _ from 'underscore'
export default {
    name: 'mailPage',
    data() {
        return {
            balanceEmail: null,
            id: this.$route.params.id,
            page: this.$route.params.page,
            label: '',
            sendedId: this.$route.params.label.split('$').length > 1 ? this.$route.params.label.split('$')[1] : '',
            countcodeId: this.$route.params.label.split('!').length > 1 ? this.$route.params.label.split('!')[1] : '',
            sendDetails: {
                category: 'email',
                dynamicdata: {
                    noticement: ['姓名', '签到码', '电子票'],
                    promotion: ['活动链接']
                },
                fromName: '会鸽',
                from: 'support@eventdove.com',
                type: 'promotion',
                title: '',
                receivers: this.$route.params.label.split('~').length > 1 ? this.$route.params.label.split('~')[1] : '',
                content: '',
                sendTime: null,
                sendType: 'imediately',
                findType: [],
                eventId: this.$route.params.id,
                userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '',
                isDraft: false
            },
            sendedData: {
                eventId: this.$route.params.id,
                category: 'email',
                isDraft: false,
                page: this.$route.params.page,
                limit: 10
            },
            draftData: {
                eventId: this.$route.params.id,
                category: 'email',
                isDraft: true,
                page: this.$route.params.page,
                limit: 10
            }
        }
    },
    created() {
        this.edit()
        this.setBalance()
    },
    mounted() {
        this.label = this.getlabel()
    },
    components: {
        'send-details': senddetails,
        'view-list': viewlist
    },
    methods: {
        getlabel() {
            let label
            switch (true) {
                case this.$route.params.label.split('$').length > 1:
                    label = this.$route.params.label.split('$')[0];
                    break;
                case this.$route.params.label.split('!').length > 1:
                    label = this.$route.params.label.split('!')[0];
                    break;
                case this.$route.params.label.split('~').length > 1:
                    this.sendDetails.isFromOrder = true;
                    label = this.$route.params.label.split('~')[0];
                    break;
                default:
                    label = this.$route.params.label
            }
            return label
        },
        setBalance() {
            $.ajax({
                url: API_URL + '/wallet/getWalletDetail',
                data: {
                    eventId: this.$route.params.id
                },
                success: (data) => {
                    this.balanceEmail = data.balanceEmail + data.eventEmailBalance;
                }
            })
        },
        setPage() {
            this.id = this.$route.params.id;
            this.page = this.sendedData.page = this.draftData.page = this.$route.params.page;
            this.label = this.getlabel();
            this.sendedId = this.$route.params.label.split('$').length > 1 ? this.$route.params.label.split('$')[1] : '';
            this.countCodeId = this.$route.params.label.split('!').length > 1 ? this.$route.params.label.split('!')[1] : '';
            let data = this.label == 'label2' ? this.sendedData : this.draftData;
            this.$refs[this.label] ? this.$refs[this.label].setData(data) : ''
            if (this.sendedId !== '') {
                this.edit()
            } else {
                this.label == 'label1' ? this.$nextTick(() => {
                    this.$refs.senddetails.clean()
                }) : ''
            }
        },
        oneApi() {
            var data = {
                eventId: this.id,
                recordType: 'mail'
            }
            $.ajax({
                type: "get",
                async: false,
                url: API_URL + '/event/getTypeCount',
                data: data,
                dataType: "json",
                contentType: "application/json", //发送信息至服务器时内容编码类型。             
                success: (data) => {
                    this.sendDetails.findType = data;
                },
                error: function(err) {

                }
            })

        },
        edit() {
            // 邮件编辑
            if (this.sendedId != '') {
                $.ajax({
                    type: "get",
                    url: API_URL + '/notice/getRecord',
                    async: false,
                    data: {
                        recordId: this.sendedId
                    },
                    dataType: "json",
                    contentType: "application/json", //发送信息至服务器时内容编码类型。             
                    success: (data) => {
                        // console.log(data)
                        this.sendDetails = $.extend(true, {}, this.sendDetails, formatTime(data,'YYYY-MM-DD HH:mm:ss'))
                    },
                    error: function(err) {

                    }
                })
            }
            // 优惠码邮件
            if (this.countcodeId != '') {
                let urls = [
                    API_URL + '/discount/get?did=' + this.countcodeId,
                    API_URL + '/event/get?id=' + this.id,
                ]
                let res = []
                $.each(urls, (i, o) => {
                    $.ajax({
                        type: "get",
                        url: o,
                        async: false,
                        dataType: "json",
                        contentType: "application/json", //发送信息至服务器时内容编码类型。             
                        success: (data) => {
                            res.push(formatTime(data))
                        },
                        error: function(err) {
                            console.error(err, '优惠码信息请求失败')
                        }
                    })
                })
                res.push('http://' + location.host);
                let templateFn = _.template(html_model2);
                let tickets = {};
                $.each(res[1].tickets, (i, o) => {
                    tickets[o.ticketId] = o.name
                })
                res.push(tickets)
                let emailtext = templateFn(res)
                this.sendDetails.content = emailtext

            }

            this.oneApi()
            this.$refs.senddetails ? this.$refs.senddetails.setData(this.sendDetails) : ''
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'setPage'
    }
}
</script>
<style scoped>
.block-tab .ui.labelstyle {
    background: #fff;
    padding: 30px;
}
</style>
