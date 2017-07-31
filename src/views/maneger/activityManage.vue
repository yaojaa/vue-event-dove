<template>
    <div class="event-view">
        <headers>
            <!-- <template slot="left-nav">
               <router-link class="item noLine f16" to="/event">{{ $t("header.find") }}</router-link>
            </template> -->
        </headers>
        <div class="event-main manage-wrap">
            <div class="manage-sidebar">
                <div class="ui huge vertical menu">
                    <div class="item">
                        <div class="header"><i class="setting icon"></i>基本管理</div>
                        <div class="menu">
                            <router-link class="item" :class="{'active':$route.name=='dashboard'}" :to="{name:'dashboard',params:{id:id}}">活动统计</router-link>
                            <router-link class="item" :class="{'active':$route.name=='activitySettings'}" :to="{name:'activitySettings',params:{id:id}}">活动设置</router-link>
                        </div>
                    </div>
                    <!-- <div class="item" v-if="publishedornot==1"> -->
                    <div class="item">
                        <div class="header"><i class="user icon"></i>人员与订单
                        </div>
                        <div class="menu">
                            <router-link class="item" :class="{'active':$route.name=='order'}" :to="{name:'order',params:{id:id}}">活动订单</router-link>
                            <router-link class="item" :class="{'active':$route.name=='participants'}" :to="{name:'participants',params:{id:id}}">参会人员</router-link>
                            <router-link class="item" :class="{'active':$route.name=='invoiceManagement'}" :to="{name:'invoiceManagement',params:{id:id}}">发票管理</router-link>
                        </div>
                    </div>
                    <div class="item">
                        <div class="header"><i class="users icon"></i>群发服务
                        </div>
                        <div class="menu">
                            <router-link class="item" :class="{'active':$route.name=='email'}" :to="{name:'email',params:{id:id,label:'label1',page:'1'}}">发邮件</router-link>
                            <router-link class="item" :class="{'active':$route.name=='sms'}" :to="{name:'sms',params:{id:id,label:'label1',page:'1'}}">发短信</router-link>
                        </div>
                    </div>
                    <div class="item">
                        <div class="header"><i class="volume up icon"></i>市场推广
                        </div>
                        <div class="menu">
                            <router-link class="item" :class="{'active':$route.name=='discountCode'}" :to="{name:'discountCode',params:{id:id}}">优惠码</router-link>
                            <router-link class="item" :class="{'active':$route.name=='webEmbedding'}" :to="{name:'webEmbedding',params:{id:id}}">网站嵌入</router-link>
                            <router-link class="item" :class="{'active':$route.name=='socialSharing'}" :to="{name:'socialSharing',params:{id:id}}">社交分享</router-link>
                            <router-link class="item" :class="{'active':$route.name=='weChatInvitation'}" :to="{name:'weChatInvitation',params:{id:id}}">参会邀请函</router-link>
                            <!-- <router-link class="item" :to="{name:'paidPromote'}">付费推广</router-link>
                            <router-link class="item" :to="{name:'extendedTracking'}">推广跟踪</router-link> -->
                        </div>
                    </div>
                    <div class="item">
                        <div class="header"><i class="building icon"></i>活动现场
                        </div>
                        <div class="menu">
                            <!-- <router-link class="item" :to="{name:'personalityBadge'}">个性胸卡</router-link> -->
                            <router-link class="item" :class="{'active':$route.name=='liveInteraction'}" :to="{name:'liveInteraction',params:{id:id}}">现场互动</router-link>
                            <!-- <router-link class="item" :to="{name:'shareLive'}">分享与直播</router-link> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="manage-content">
                <!--公共头部-->
                <div class="ui  padded middle aligned stackable doubling  two column grid bg-white" v-show="!isEmpty">
                    <div class="column">
                        <div class="ui divided items items-md">
                            <div class="item">
                                <a class="ui tiny image">
                                    <img :src="eventInfo.thumbnail+'?imageMogr2/auto-orient/thumbnail/!720x360r/gravity/Center/crop/720x360/blur/1x0/quality/75|imageslim'">
                                </a>
                                <div class="content">
                                    <div class="header fwn m-n block">{{eventInfo.title}}
                                        <div v-if="getstatus()" :class="'ui horizontal label ml-sm poa '+getstatus()[1]">{{getstatus()[0]}}</div>
                                    </div>
                                    <div class="meta f13">
                                        <div class="ui transparent disabled input mr-md">
                                            {{eventInfo.domainName?eventInfo.domainName+'.eventdove.com':'自定义域名'}}
                                            <!-- <input type="text" value=""> -->
                                        </div>
                                        <router-link :to="{name:'activitySettings',params:{id:id}}" class="ui mr-md"><i class="write icon"></i></router-link>
                                        <!-- <a href="#" class="ui mr-md"><i class="download icon"></i> 下载活动二维码</a> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column right aligned">
                        <div class="ui horizontal list">
                            <div class="item">
                                <div class="content">管理者：</div>
                            </div>
                            <div class="item">
                                <img class="ui avatar image admin-avatar" :src="userData.avatar?userData.avatar+'?imageView2/1/w/200/h/200/format/jpg/q/75|imageslim':'/images/pp02.png'" :data-content="userData.nickname||userData.username" data-variation="inverted">
                            </div>
                        </div>
                        <a v-show="publishedornot!==-1" class="ui toggle button basic ml-lg cancel-release" :class="publishedornot?'':'active'">{{publishedornot?'取消发布':'发布'}}</a>
                        <router-link class="ui button blue" v-if="eventInfo.status!='finished'" :to="{name:'edit',params:{id:5,eventId:$route.params.id}}">编辑活动</router-link>
                        <router-link class="ui button pink" :to="{name:'site',params:{id:$route.params.id}}">查看网站</router-link>
                        <!-- <a href="#" class="ui button basic">添加子站</a> -->
                    </div>
                </div>
                <!--公共头部-->
                <!-- view -->
                <router-view @domainChange="eventInfo.domainName=arguments[0]" v-if="!isEmpty" :eventInfo="eventInfo"></router-view>
            </div>
            <div class="ui small basic test modal cancel-release-layer">
                <div class="ui icon header"><i class="idea icon"></i> 您确定要{{publishedornot==1?'取消':''}}发布吗？ </div>
                <div class="actions">
                    <div class="ui green inverted button" @click="setEventStatus"><i class="checkmark icon"></i> 确定 </div>
                    <div class="ui red basic cancel inverted button"><i class="remove icon"></i> 取消 </div>
                </div>
            </div>
        </div>
        <!-- <footers></footers> -->
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
import header from '../../components/header_simple'
import footer from '../../components/footer'
export default {
    name: '',
    data() {
        return {
            msg: 'Welcome to Event Dove',
            id: this.$route.params.id,
            eventInfo: {},
            now: 0,
            userData: {}
        }
    },
    created() {
        $.get('/now', (data) => {
            this.now = new Date(data).getTime()
        });
        this.userData = this.$store.state.user;
        $.get(API_URL + '/event/get', {
            id: this.id
        }, (data) => {
            this.eventInfo = data;
        }).error((err) => {
            console.error(err);
        })
    },
    computed: {
        isEmpty() {
            return $.isEmptyObject(this.eventInfo)
        },
        publishedornot() {
            // 发布1 未发布0 其他-1
            let status = {
                'published': 1,
                'unpublished': 0,
                'canceled': 0
            }
            let statusact = typeof status[this.eventInfo.status] == 'number' ? status[this.eventInfo.status] : -1
            return statusact;
        },
    },
    mounted: function() {
        $('#footer').show()
        $('.menu .item').tab()
        $('.admin-avatar')
            .popup({
                position: 'bottom center'
            })
        $('.cancel-release-layer.modal').modal('attach events', '.cancel-release')
    },
    methods: {
        getstatus() {
            let substatus = {
                'nobegin': ['即将开始', 'teal'],
                'ing': ['进行中', 'yellow'],
                'unpublished': ['未发布', 'grey'],
                'canceled': ['已取消', 'grey'],
                'finished': ['已结束', 'blank']
            }
            if (this.eventInfo.status !== 'published') {
                return substatus[this.eventInfo.status]
            }
            let alltime = new Date(this.eventInfo.endTime).getTime() - new Date(this.eventInfo.startTime).getTime()
            let overtime = this.now - new Date(this.eventInfo.startTime).getTime()
            if (overtime < 0) {
                return substatus.nobegin
            }
            if (alltime - overtime > 0) {
                return substatus.ing
            }
        },
        setEventStatus() {
            if (this.eventInfo.status !== 'unpublished' && this.eventInfo.status !== 'published' && this.eventInfo.status !== 'canceled') return false;
            let url = this.eventInfo.status == 'unpublished' || this.eventInfo.status == 'canceled' ?
                API_URL + '/event/update' :
                API_URL + '/event/cancelEvent';
            let data = this.eventInfo.status == 'unpublished' || this.eventInfo.status == 'canceled' ?
                JSON.stringify({
                    id: this.id,
                    status: 'published',
                    pubTime: new Date()
                }) :
                JSON.stringify({
                    eventId: this.id
                });
            $.ajax({
                url: url,
                type: 'post',
                data: data,
                success: (data) => {
                    $('.cancel-release-layer.modal').modal('hide')
                    if (data.errorCode == 0) {
                        // this.$message.error(data.responseText.responseText);
                        this.eventInfo.status = 'canceled';
                        return false;
                    }
                    this.eventInfo.status = 'published';
                }
            })
        }
    },
    components: {
        headers: header,
        footers: footer,
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
