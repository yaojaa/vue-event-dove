<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn">我的活动</h2>
                </div>
                <div class="block-tab">
                    <div class="ui four item secondary menu f16">
                        <a class="item" :class="{'active' : status === 'published'}" data-tab="first" @click="showEvtlist('published')"><span><i class="send outline icon"></i>进行中</span></a>
                        <a class="item" :class="{'active' : status === 'unpublished'}" data-tab="second" @click="showEvtlist('unpublished')"><span><i class="file text icon"></i>未发布</span></a>
                        <a class="item" :class="{'active' : status === 'finished'}" data-tab="third" @click="showEvtlist('finished')"><span><i class="file text icon"></i>已结束</span></a>
                        <a class="item" :class="{'active' : status === 'auditRejected'}" data-tab="fourth" @click="showEvtlist('auditRejected')"><span><i class="file text icon"></i>未通过</span></a>
                    </div>
                    <div class="ui active tab">
                        <div class="ui relaxed divided items" v-if="hasContent === 'hasContent'">
                            <div class="item" v-for="(activity,$index) in activitylist">
                                <router-link :to="{path:'/site/'+activity.id}" class="ui small image">
                                    <img :src="activity.thumbnail+'?imageMogr2/auto-orient/thumbnail/!150x98r/gravity/Center/crop/150x98/blur/1x0/quality/75|imageslim'">
                                </router-link>
                                <div class="content">
                                    <router-link :to="{path:'/site/'+activity.id}" class="header fwn black-link mt-n" target="_blank">{{activity.title}}</router-link>
                                    <span class="ui  teal horizontal little label" v-if="activity.subStatus === 'beginInAMinute'">即将开始</span>
                                    <span class="ui  yellow horizontal little label" v-if="activity.subStatus === 'inProgress'">进行中</span>
                                    <span class="ui  green horizontal little label" v-if="activity.subStatus === 'finished'">已结束</span>
                                    <div v-if="status === 'unpublished'" class="meta space-xs lh-mini">
                                        <span class="cinema"><i class="wait icon"></i>{{activity.startTime | filterTime}} - {{activity.endTime | filterTime}}&#12288;|&#12288;<i class="map signs icon"></i>{{activity.detailedAddress}}</span>
                                    </div>
                                    <div v-else class="meta space-xs lh-mini">
                                        <span class="cinema"><i class="wait icon"></i>{{activity.startTime | filterTime}}&#12288;|&#12288;<i class="map signs icon"></i>{{activity.detailedAddress}}</span>
                                    </div>
                                    <div class="description">
                                        <router-link v-if="status === 'published'" :to="{name:'dashboard',params:{id:activity.id}}" class="mr-lg">管理</router-link>
                                        <router-link v-if="status === 'published' && activity.subStatus === 'inProgress'" class="mr-lg" :to="{path:'./activityManage/'+activity.id+'/order'}">人员与订单</router-link>
                                        <router-link :to="{name:'email',params:{id:activity.id,label:'label1',page:1}}" v-if="status === 'published'" class="mr-lg">群发服务</router-link>
                                        <!-- <a v-if="status === 'published' && activity.subStatus === 'beginInAMinute'" href="#" class="mr-lg">市场推广</a> -->
                                        <router-link v-if="status === 'finished' || status === 'auditRejected'" :to="{name:'dashboard',params:{id:activity.id}}" class="mr-lg">查看</router-link>
                                        <router-link :to="{name:'edit',params:{id:5,eventId:activity.id}}" v-if="(status === 'published' && activity.subStatus === 'beginInAMinute') || (status === 'auditRejected' && activity.status === 'auditRejected')" class="mr-lg" target="_blank">编辑活动</router-link>
                                        <router-link v-if="status === 'published' && activity.subStatus === 'beginInAMinute'" class="mr-lg" :to="{path:'./site/'+activity.id}" target="_blank">查看网站</router-link>
                                        <a v-if="status === 'published' || status === 'finished'" class="mr-lg" @click="copyActivity(activity.id)">复制活动</a>
                                        <a v-if="status === 'unpublished' || (status === 'auditRejected' && activity.status === 'auditRejected')" @click="deleteLayer(activity.id)" class="mr-lg">删除活动</a>
                                    </div>
                                </div>
                                <div v-if="status === 'published' || status === 'finished'" class="right">
                                    <radialIndicatorView :totalAttendeesCount="activity.totalAttendeesCount" :checkedInRate="activity.checkedInRate" :_index="$index"></radialIndicatorView>
                                </div>
                                <div v-if="status === 'unpublished'" class="right">
                                    <router-link :to="{name:'edit',params:{id:5,eventId:activity.id}}" class="mini ui button blue">完善信息，去发布</router-link>
                                </div>
                                <div v-if="status === 'auditRejected'" class="right">
                                    <span class="ui red basic label" v-text="activity.status === 'auditRejected'?'审核未通过':'活动挂起'"></span>
                                    <p class="space-sm">原因：{{activity.auditNotes}}</p>
                                </div>
                            </div>
                        </div>
                        <pageView v-show="hasContent === 'hasContent'" ref="pageView" @gotoPage="getActivits"></pageView>
                        <!-- loading -->
                        <div class="loadingWrapper" v-if="hasContent === 'isLoading'">
                            <div class="ui active inverted dimmer">
                                <div class="ui text loader">加载中</div>
                            </div>
                        </div>
                        <!-- noContent -->
                        <div class="text-center" v-if="hasContent === 'noContent'"><img class="ui image medium centered" src="/images/no_centent.png" alt="没有找到相关内容"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui small basic test modal cancel-release-layer">
            <div class="ui icon header"><i class="idea icon"></i> 您确定要删除该活动吗？ </div>
            <div class="actions">
                <div class="ui green ok inverted button"><i class="checkmark icon"></i> 确定 </div>
                <div class="ui red basic cancel inverted button"><i class="remove icon"></i> 取消 </div>
            </div>
        </div>
        <snap></snap>
        <footers></footers>
    </div>
</template>
<script>
import {
    formatTime,
    pulseAnimate,
    imgLazyload
} from '../utils/index.js';
import {API_URL} from '../config'
import moment from 'moment'
import header from '../components/header'
import footer from '../components/footer'
import radialIndicator from '../components/radialIndicator/radiaIndicator.vue'
import page from '../components/page'
export default {
    // name: '',
    data() {
        return {
            // hasContent：加载数据状态，{isLoading: 加载中，nothing: 暂无内容}
            hasContent: 'isLoading',
            msg: 'Welcome to Event Dove',
            status: 'published',
            activitylist: [],
            allPage: 1
        }
    },
    filters: {
        // 格式化后台返回的时间
        filterTime(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    watch: {
        allPage(o, n) {
            this.$refs.pageView.setpageData({
                currentPage: 1,
                showItem: 5,
                allPage: o
            });
        }
    },
    mounted: function() {
        $('#footer').show();
        $('.menu .item').tab();
        this.getActivits(1);
    },
    methods: {
        // 用于展示tab
        showEvtlist(s) {
            this.activitylist = [];
            this.status = s;
            this.getActivits(1);
        },
        // 获取活动列表
        getActivits(curPage) {
            this.hasContent = 'isLoading';
            $.ajax({
                url: API_URL + "/event/getEventsByUserIdAndPageIndex?"+new Date().getTime(),
                type: "GET",
                data: {
                    "page": curPage,
                    "limit": "10",
                    "orderBy": "ctime",
                    "total": "-1",
                    "eventStatus": this.status,
                }
            })
            .done((data, textStatus, jqXHR) => {
                this.activitylist = data.items;
                this.allPage = data.totalPage;
                this.$nextTick(function() {
                    $('.items .item').transition('hide').transition({
                        animation: 'fade up',
                        duration  : 500,
                        interval: 100
                    });
                })
                if (this.activitylist.length) {
                    this.hasContent = 'hasContent'
                } else {
                    this.hasContent = 'noContent';
                }
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                if (JSON.parse(jqXHR.responseText).errorCode === 1) {
                    this.$message('登录失效，请重新登录！');
                } else {
                    this.$message({
                        message: JSON.parse(jqXHR.responseText).responseText,
                        type: 'warning'
                    });
                }
            });
        },
        // 复制活动
        copyActivity (id) {
            new Promise(function(resolve, reject) {
                $.ajax({
                    url: API_URL + "/event/get",
                    type: "get",
                    data: {id:id}
                })
                .done((data, textStatus, jqXHR) => {
                    resolve(data);
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    reject(jqXHR);
                });
            }).then((value) => {
                let act = {};
                act = $.extend( act, value );
                act.title = act.title + '_COPY' + JSON.stringify(new Date().getTime()).slice(-6);
                act.status = 'unpublished';
                delete act.id;
                act.invoiceSetting.type.forEach((v, k) => {
                    act.invoiceSetting.type[k] = v.name;
                });
                act.invoiceSetting.deliverMethod.forEach((v, k) => {
                    act.invoiceSetting.deliverMethod[k] = v.name;
                });
                $.ajax({
                    url: API_URL + "/event/create",
                    type: "POST",
                    data: JSON.stringify(act)
                })
                .done((data, textStatus, jqXHR) => {
                    this.$message('活动复制成功，请修改活动时间！');
                    this.status = 'unpublished';
                    this.showEvtlist('unpublished');
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    if (JSON.parse(jqXHR.responseText).errorCode === 1) {
                        this.$message('登录失效，请重新登录！');
                    } else {
                        this.$message('复制活动失败');
                    }
                });
            }, (jqXHR) => {
                if (JSON.parse(jqXHR.responseText).errorCode === 1) {
                    this.$message('登录失效，请重新登录！');
                } else {
                    this.$message('获取活动详情失败！');
                }
            });
        },
        // 删除活动
        delActivity (id) {
            $.ajax({
                url: API_URL + "/event/deleteEvent",
                type: "POST",
                data: JSON.stringify({
                    eventId: id
                })
            })
            .done((data, textStatus, jqXHR) => {
                this.$message('活动删除成功');
                this.showEvtlist(this.status);
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                if (JSON.parse(jqXHR.responseText).errorCode === 1) {
                    this.$message('登录失效，请重新登录！');
                } else {
                    this.$message({
                        message:JSON.parse(jqXHR.responseText).responseText,
                        type: 'warning'
                    })
                }
            });
        },
        // 调用删除弹窗
        deleteLayer (id) {
            $('.cancel-release-layer.modal').modal({
                onApprove : () => {
                  this.delActivity(id);
                }
            }).modal('show');
        }
    },
    components: {
        headers: header,
        footers: footer,
        radialIndicatorView: radialIndicator,
        pageView: page,
        snap: function(resolve) {
            //异步组件写法
            require(['../components/html2canvas'], resolve)
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .loadingWrapper{
        position: relative;
        height: 225px;
    }
</style>
