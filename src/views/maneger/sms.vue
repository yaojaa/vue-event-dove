<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn">短信</h2>
                <div class="text-muted">您的短信余额：<span class="f24 text-default">{{balanceSMS?balanceSMS:'0'}}</span>条
                    <router-link class="ui button red ml-md" :to="{path: '/recharge',query: {type: 'sms'}}">充值</router-link>
                </div>
            </div>
            <div class="block-tab">
                <div class="ui three item secondary menu f16">
                    <router-link :to="{name:'sms',params:{id:id,label:'label1',page:'1'}}" class="item" :class="{active:label=='label1'}" data-tab="first"><span><i class="edit icon"></i>编辑短信</span></router-link>
                    <router-link :to="{name:'sms',params:{id:id,label:'label2',page:'1'}}" class="item" :class="{active:label=='label2'}" data-tab="second"><span><i class="send outline icon"></i>已发送</span></router-link>
                    <router-link :to="{name:'sms',params:{id:id,label:'label3',page:'1'}}" class="item" :class="{active:label=='label3'}" data-tab="third"><span><i class="disk outline icon"></i>草稿箱</span></router-link>
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
} from '../../config'
import senddetails from '../../components/send_details'
import viewlist from '../../components/send_details/view_list'
import {
    formatTime
} from '../../utils/index'
export default {
    name: 'smsPage',
    data() {
        return {
            balanceSMS: null,
            id: this.$route.params.id,
            page: this.$route.params.page,
            label: '',
            sendedId: this.$route.params.label.split('$').length > 1 ? this.$route.params.label.split('$')[1] : '',
            sendDetails: {
                wordLength:66,
                category: 'sms',
                dynamicdata: {
                    noticement: ['姓名', '邮箱', '签到码', '电子票'],
                    promotion: ['活动链接']
                },
                fromName: '',
                from: '',
                eventId: this.$route.params.id,
                userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : '',
                type: 'promotion',
                title: '',
                receivers: '',
                receivers: this.$route.params.label.split('~').length > 1 ? this.$route.params.label.split('~')[1] : '',
                content: '',
                sendTime: null,
                sendType: 'imediately',
                isDraft: false
            },
            sendedData: {
                eventId: this.$route.params.id,
                category: 'sms',
                isDraft: false,
                page: this.$route.params.page,
                limit: 10
            },
            draftData: {
                eventId: this.$route.params.id,
                category: 'sms',
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
                    label = this.$route.params.label.split('~')[0];
                    this.sendDetails.isFromOrder = true;
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
                    this.balanceSMS = data.balanceSMS
                }
            })
        },
        setPage() {
            this.id = this.$route.params.id
            this.page = this.sendedData.page = this.draftData.page = this.$route.params.page
            this.label = this.getlabel();
            this.sendedId = this.$route.params.label.split('$').length > 1 ? this.$route.params.label.split('$')[1] : ''
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
                recordType: 'sms'
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
