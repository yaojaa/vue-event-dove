<template>
    <div>
        <table class="ui padded default table" v-if="viewlist.length>0">
            <thead>
                <tr v-if="!viewlistData.isDraft">
                    <th v-html="categoryName+'标题'"></th>
                    <th>发送时间</th>
                    <th>发送状态</th>
                    <th>收信人数/已发送人数</th>
                    <th>操作</th>
                </tr>
                <tr v-if="viewlistData.isDraft">
                    <th v-html="categoryName+'标题'"></th>
                    <th>收件人数</th>
                    <th>创建时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in viewlist" v-if="!viewlistData.isDraft">
                    <td><a href="javascript:void(0)" class="mail-details notDraft" @click="active=index">{{item.title}}</a></td>
                    <td>{{item.sendTime}}</td>
                    <td>
                        <div :class="'ui horizontal label '+status[item.sendStatus][1]">{{status[item.sendStatus][0]}}</div>
                    </td>
                    <td>{{item.receiverTotal}}/{{item.sendSuccessCount}}</td>
                    <td>
                        <router-link :to="{name:viewlistData.category,params:{id:viewlistData.eventId,label:'label1$'+item.id,page:'1'}}" class="mr-md" v-if="item.sendStatus=='toBeSent'">再次编辑</router-link>
                        <a href="javascript:void(0)" class="mr-md popup" v-if="item.sendStatus=='sendFail'" v-ui="'.pop'+index+''+viewlistData.isDraft">查看原因</a>
                        <div v-if="item.sendStatus=='sendFail'&&item.describe" :class="'ui tip-code-info popup left  transition hidden pop'+index+''+viewlistData.isDraft" >
                             {{item.describe}}
                        </div>

                        <a href="javascript:void(0)" @click="deleteSend(item.id,true)" :class="'mr-md del-mail'+index+''+viewlistData.isDraft" v-if="item.sendStatus=='toBeSent'">删除</a>
                        <div class="ui small basic test modal confirm-layer" v-ui="'.del-mail'+index+''+viewlistData.isDraft" v-if="item.sendStatus=='toBeSent'">
                            <div class="ui icon header"><i class="idea icon"></i> 您确定要删除吗？ </div>
                            <div class="actions">
                                <div class="ui green ok inverted button"><i class="checkmark icon"></i> 确定 </div>
                                <div class="ui red basic cancel inverted button"><i class="remove icon"></i> 取消 </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr v-for="(item,index) in viewlist" v-if="viewlistData.isDraft">
                    <td><a href="javascript:void(0)" class="mail-details isDraft" @click="active=index">{{item.title}}</a></td>
                    <td>{{item.receiverTotal}}</td>
                    <td>{{item.ctime}}</td>
                    <td>
                        <router-link :to="{name:viewlistData.category,params:{id:viewlistData.eventId,label:'label1$'+item.id,page:'1'}}" class="mr-md">编辑</router-link>

                        <a href="javascript:void(0)" @click="deleteSend(item.id)" :class="'mr-md del-mail'+index+''+viewlistData.isDraft" v-if="item.sendStatus=='toBeSent'">删除</a>
                        <div class="ui small basic test modal confirm-layer" v-ui="'.del-mail'+index+''+viewlistData.isDraft" v-if="item.sendStatus=='toBeSent'">
                            <div class="ui icon header"><i class="idea icon"></i> 您确定要删除吗？ </div>
                            <div class="actions">
                                <div class="ui green ok inverted button"><i class="checkmark icon"></i> 确定 </div>
                                <div class="ui red basic cancel inverted button"><i class="remove icon"></i> 取消 </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="viewlist.length==0">
            <!-- {{categoryName}}列表为空 -->
            <img src="/images/no_centent.png" :alt="categoryName+'列表为空'" class="ui image medium centered">
        </div>
        <page @gotoPage="gotoPage" ref="page"></page>
        <div class="ui small modal mail-details-layer" :class="viewlistData.isDraft?'isDraft':'notDraft'" v-if="viewlist[active]">
            <i class="close icon"></i>
            <div class="header">
                {{viewlist[active].title}}
            </div>
            <div class="content" v-html="viewlist[active].content">
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
import page from '../page'
import {
    formatTime
} from '../../utils/index'
export default {
    name: 'viewlist',
    data() {
        return {
            viewlist: [],
            active: 0,
            status: {
                'sending': ['正在发送', 'orange'],
                'sendSuccess': ['发送成功', 'green'],
                'toBeSent': ['等待发送', 'blue'],
                'sendFail': ['发送失败', 'red']
            },
            pageData: {
                allPage: null,
                currentPage: 1,
                showItem: 5
            },
            viewlistData:{}
        }
    },
    computed: {
        categoryName() {
            return this.viewlistData.category == 'email' ? '邮件' : '短信'
        }
    },
    props: ['propsData'],
    created() {
        this.viewlistData = this.propsData
        if ((this.viewlistData.isDraft == true && this.$route.params.label == 'label3') || (this.viewlistData.isDraft == false && this.$route.params.label == 'label2')) {
            this.setData()
        }
    },
    mounted() {},
    components: {
        page
    },
    filters: {},
    methods: {
        setData(obj) {
            if (typeof obj === 'object') {
                this.viewlistData = $.extend({}, this.viewlistData, obj)
            }
            $.ajax({
                type: "get",
                url: API_URL + '/notice/getRecords',
                data: this.viewlistData,
                dataType: "json",
                contentType: "application/json", //发送信息至服务器时内容编码类型。             
                success: (data) => {
                    formatTime(data, 'YYYY-MM-DD HH:mm:ss')
                    this.viewlist = data.items;
                    if(data.items.length==0)return;
                    this.active = 0
                    this.pageData.allPage = parseInt((data.count-1) / this.viewlistData.limit) + 1;
                    this.pageData.currentPage = parseInt(this.viewlistData.page);
                    setTimeout(() => {
                        this.$refs.page.setpageData(this.pageData);
                        $('.mail-details-layer.modal.isDraft').modal('attach events', '.mail-details.isDraft')
                        $('.mail-details-layer.modal.notDraft').modal('attach events', '.mail-details.notDraft')
                    }, 0)
                },
                error: (err)=> {

                }
            })

        },
        deleteSend(id,isNosend) {
            $('.confirm-layer.modal').modal({
                onApprove: (el) => {
                    $.ajax({
                        url: API_URL + '/notice/delRecord',
                        type: 'post',
                        data: JSON.stringify({
                            recordId: id
                        }),
                        dataType: "json",
                        contentType: "application/json", //发送信息至服务器时内容编码类型。  
                        success: (data) => {
                            isNosend?this.$emit('success'):'';
                            this.$message.success('删除成功')
                            this.viewlist.length==1?this.pageData.currentPage--:''
                            this.setData()
                        },
                        error: (err) => {
                            let error = JSON.parse(err.responseText)
                            this.$message.error(error.responseText)
                        }
                    })
                    return true;
                }
            })
        },
        gotoPage(page) {
            this.$router.push({
                name: this.viewlistData.category,
                params: {
                    id: this.$route.params.id,
                    page: page,
                    label: this.$route.params.label
                }
            })
        }
    }
}
</script>
<style scoped>
</style>
