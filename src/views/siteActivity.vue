<template>
    <div class="event-wrap">
        <headerSimple>
            <template slot="left-nav">
                <a class="item noLine logo auto" v-for="(organizers,index) in info.organizers" :href="organizers.website?'http://'+organizers.website:'javascript:void(0)'" target="_blank" v-if="organizers.logo!=='/images/no_logo.jpg'&&organizers.logo" :title="organizers.name"><img :src="organizers.logo+'?imageMogr2/auto-orient/thumbnail/x100/blur/1x0/quality/75|imageslim'" :alt="organizers.name"></a>
            </template>
            <div class="center menu" slot="title">
                <a class="item noLine f16" v-for="(detailTitle,index) in info.content" v-if="detailTitle.content " v-scroll-to="'#anchor'+index">{{detailTitle.label}}</a>
                <a class="item noLine f16" v-scroll-to="'#anchor-ticket'">活动门票</a>
                <a class="item noLine f16" v-scroll-to="'#anchor-add'" >时间及地点</a>
            </div>
        </headerSimple>
        <div class="event-main">
            <div class="sidbarWarper">
                <designPanel v-if="isAuthor&&!!info.bannerUrl" :pageData="info" @uploaded="loadImgSet">
                </designPanel>
                <div class="pusher">
                    <div class="eventBg" :style="'background-image:url('+info.bannerUrl+'?imageMogr2/auto-orient/thumbnail/100x/blur/50x5/quality/75|imageslim)'">
                        <div class="ui container">
                            <div class="event-banner">
                                <template v-if="isAuthor">
                                    <div class="sponsor-btns">
                                        <div class="ui buttons mini">
                                            <button class="ui open button red ">
                                                设计
                                            </button>
                                            <router-link :to="'/editEvent/5/'+id" class="ui open button pink ">
                                                编辑
                                            </router-link>
                                            <router-link :to="'/activityManage/'+id+'/activitySettings'" class="ui button purple">
                                                管理
                                            </router-link>
                                        </div>
                                    </div>
                                </template>
                                <div class="ui dimmer" :class="{'active':bannerIsLoading}">
                                    <div class="ui text loader">加载中</div>
                                </div>
                                <div class="ui computer only tablet only grid">
                                    <div class="column"><div class="ui fluid image"><img v-lazy="info.bannerUrl" class="lazy-img-fadein"></div></div>
                                </div>
                                <div class="ui mobile only grid mt-n">
                                    <div class="column"><img :src="info.mobileBannerUrl" alt="" class="ui fluid image"></div>
                                </div>
                            </div>
                            <div class="white-wrap event-header">
                                <div class="area">
                                    <h2 class="ui header">{{info.title}}</h2>
                                    <div class="ui horizontal list text-muted">
                                        <div class="item"><i class="wait icon"></i>{{info.startTime | escapeTime}}</div>
                                        <div class="item">|</div>
                                        <div class="item">{{info.browseCount}}次浏览</div>
                                        <!-- <div class="item">450人已参加</div>  计算 tickets==>soldOut -->
                                        <div class="item">类型：
                                            <span class="ui mini labels">
                                            <span class="ui red label" v-for="c in info.categoriesStrArr">{{c}}</span>
                                            </span>
                                            <!-- <span class="ui blue label hot-tag">IT</span>
                          <span class="ui teal label hot-tag">其它</span> -->
                                        </div>
                                    </div>
                                </div>
                                <div class="ui divider"></div>
                                <div class="area">
                                    <div class="ui stackable grid">
                                        <div class="equal row">
                                            <div class="twelve wide middle aligned column"><span>活动主办方：</span>
                                                <span class="ui mini labels">
                                                <a class="ui label" target="_blank" v-for="com in info.organizers"  :href="com.website?'http://'+com.website:'javascript:void(0)'">{{com.name}}</a>
                                                </span>
                                            </div>
                                            <!-- <div class="four wide right aligned computer only column text-muted">
                                                <span class="text-blue f18">¥起</span><br>团购优惠
                                            </div> -->
                                            <div class="four wide right aligned computer only tablet only column">
                                                <a class="ui button blue large fluid" v-scroll-to="'#anchor-ticket'">
                                                    {{btnText}}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui container">
                        <div class="white-wrap event-body por" id="event-body">
                            <div class="right ui event-fiexd rail">
                                <div class="ui sticky event-side">
                                    <div class="fixedBtn">
<router-link to="/">
<button data-tooltip="返回主页" data-inverted="" class="ui button circular icon  large home-btn"><i class="home icon "></i></button>
</router-link>
                                        <button class="ui button circular icon blue large call-btn" @click="contactUser">
                                            <i class="call icon "></i>
                                        </button>
                                        <button class="ui button circular icon teal large share-btn" @click="shardFn">
                                            <i class="share icon "></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-for="(detail,index) in info.content" v-if="detail.content" :id="'anchor'+index">
                                <div class="event-title">
                                    <div class="title-line f18">{{detail.label}}</div>
                                </div>
                                <div class="event-center">
                                    <div class="event-text" v-html="detail.content"></div>
                                </div>
                            </div>
                            <div class="ui computer only tablet only grid">
                                <div class="column">
                                    <div class="event-title" id="anchor-ticket" v-if="info.tickets.length>0 && isTickets">
                                        <div class="title-line f18">活动门票</div>
                                    </div>
                                    <ticket-selected :event-id="id" v-if="info.tickets.length>0 && isTickets"></ticket-selected>
                                </div>
                            </div>
                            <div class="event-title">
                                <div class="title-line f18">时间及地点</div>
                            </div>
                            <div class="event-center" v-if="!info.onlineAddress">
                                <div id="mapContainer" style="height:300px">
                                    地图加载中...
                                </div>
                            </div>
                            <div class="event-center" style="padding-top:0;" id="anchor-add">
                                <div class="ui vertically divided  doubling stackable padded middle aligned grid">
                                    <div class="row">
                                        <div class="column mb-n">地点：{{info.detailedAddress}}</div>
                                    </div>
                                    <div class="row">
                                        <div class="ten wide middle aligned column">
                                            <h4>活动时间</h4>
                                            <div class="text-info">{{info.startTime | escapeTime}} — {{info.endTime |escapeTime}}</div>
                                        </div>
                                        <div class="six wide right column">
                                            <h2 class="ui header">
                                                <i class="wait icon green"></i>
                                                <div class="content" v-if="nowTime">
                                                    <span class="TIME-span"></span>
                                                    <div class="sub header">倒计时</div>
                                                </div>
                                                <div class="content f16" v-else>活动已过期</div>
                                           </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui mobile only padded grid white-wrap event-footer">
            <router-link :to="'/ticketSelected/'+info.id" class="ui button blue large fluid">我要参加</router-link>
        </div>
        <div class="ui mini modal shard" id="shard">
            <div class="header">
                分享给你的朋友
            </div>
            <div class="content">
                <div class="ui centered medium image">
                    <svg v-html="shardErwm" width="164" height="164" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>
                </div>
                <p class="text-center space-sm">微信、微博或QQ扫描分享给朋友</p>
            </div>
        </div>
        <div class="ui mini modal contact" id="tel">
            <div class="header">
                如有疑问，请联系我们
            </div>
            <div class="content">
                <div class="ui divided items items-md">
                    <div class="item">
                        <!-- <div class="ui tiny image">
                            <img :src="info.bannerUrl">    个人识别号
                        </div> -->
                        <div class="content">
                            <!-- <div class="header fwn">{{info.title}}</div> -->
                            <div class="description space-xs">
                                <p><i class="call icon text-muted"></i>{{info.contact.mobile}}</p>
                                <p><i class="mail icon text-muted"></i><a :href="'mailto:'+info.contact.email" class="grey-link">{{info.contact.email}}</a></p>
                            </div>
                        </div>
                        <!-- <div class="ui tiny image">
                            <img src="/images/event_dove_code.jpg">
                        </div> -->
                    </div>
                    <!-- <div class="item">
                        <div class="ui tiny image">
                            <img src="/images/pp02.png">
                        </div>
                        <div class="content">
                            <div class="header fwn">湖南自媒体联盟</div>
                            <div class="description space-xs">
                                <i class="call icon text-muted"></i><a href="mailto:admin@eventown.com">admin@eventown.com</a>
                            </div>
                            <div class="description">
                                <i class="mail icon text-muted"></i><a>13888888888</a>
                            </div>
                        </div>
                        <div class="ui tiny image">
                            <img src="/images/event_dove_code.jpg">
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <footers></footers>
        <div class="ui mobile only padded grid">
            <div class="column">&nbsp;</div>
        </div>
    </div>
</template>
<script>
import footer from '../components/footerEvent'
import {
    API_URL
} from '../config'
import {
    mapState
} from 'vuex'
import moment from 'moment'
import AMapAPILoader from '../utils/lazy-amap-api-loader'
import headerSimple from '../components/header_simple'
import ticketSelected from '../components/ticket_selected'
import {
    loadImg
} from '../utils'



function loadAmap(context) {
    //加载高德地图
    let lazyAMapApiLoaderInstance = new AMapAPILoader()
    lazyAMapApiLoaderInstance.load().then(() => {
        const alat = [context.lat, context.lng];
        var windowsArr = [];
        var marker = [];
        var map = new AMap.Map("mapContainer", {
            resizeEnable: true,
            center: alat, //地图中心点 
            zoom: 11, //地图显示的缩放级别
            keyboardEnable: false
        });
        map.plugin(["AMap.ToolBar"], function() {
            map.addControl(new AMap.ToolBar());
        });
        var infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -20)
        });
        marker = new AMap.Marker({
            position: alat,
            map: map
        });
        marker.content = context.detailedAddress;
        //给Marker绑定单击事件
        marker.on('click', markerClick);
        marker.emit('click', {
            target: marker
        });
        map.setFitView();

        function markerClick(e) {
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
        }
        infoWindow.open(map, alat);
    }).catch(e => {
        console.log(e);
    })
}
// 时间补零操作
function addNum(value) {
    if (value < 10) {
        return '0' + value;
    } else {
        return value;
    }
}

function getNowTime() { //获取当前时间
    return new Date().getTime();
}
//是否是作者
function checkIsAuthor(eventUid, userId) {
    return eventUid === userId
}
export default {
    name: 'home',
    data() {
        return {
            bannerIsLoading: false,
            isAuthor: false,
            info: {
                tickets: [],
                contact: {
                    email: '',
                    mobile: ''
                }
            },
            id: '',
            statusName: '',
            DownTimeTimer: null,
            coutprice: 0,
            loading: false,
            error: null,
            minimum: 0,
            btnText: '我要参加',
            tickts: [],
            nowTime: true,
            anchor: 0,
            allprice: 0,
            shardErwm: '',
            priceChange: true,
            allMoney: 0,
            isTickets: false,
            priceTimer: null,
            minTicketsNum: 0,
            sumAllPriceArgu: {
                "discount": {
                    "discountCode": ""
                },
                "order": [],
                "userId": '',
                "eventId": ''
            },
            location: {
                lat: '',
                lng: '',
                detailedAddress: '',
            },
            statusKey: {
                'unpublished': '活动未发布',
                'published': '我要参加',
                'auditRejected': '审核未通过',
                'hangUp': '活动挂起',
                'canceled': '取消发布',
                'finished': '活动已结束'
            }
        }
    },
    created() {
        var id = this.$route.params.id;
        this.id = id;
    },
    mounted: function() {

        $.get(API_URL + '/event/get', {
            id: this.id
        }, (data) => {
            if (checkIsAuthor(data.userId, this.$store.state.user.id)) {
                this.isAuthor = true
            }
            var time = new Date(data.endTime).getTime();
            if (getNowTime() > time) {
                this.nowTime = false;
            }
            document.title = data.title + '_会鸽'
            data.CountDown = '';
            this.info = data;
            $.each(this.info.organizers, (i, o) => {
                if (o.logo != '/images/no_logo.jpg' && o.logo) {
                    this.$emit('hideLogo')
                    return false
                }
            })
            if (data.lng) {
                this.location.upDown = false;
                this.location.lat = data.lng;
                this.location.lng = data.lat;
                this.location.detailedAddress = data.detailedAddress;
                // this.ticketStatus(data.status);
                loadAmap({
                    lat: data.lng,
                    lng: data.lat,
                    detailedAddress: '',
                });
            } else {
                this.location.upDown = true;
            }
            this.ticketStatus(data.status); //移到此处是因为线上活动
            this.$nextTick(function() {
                $('.ui.sticky.event-side').sticky({
                    offset: 80,
                    context: '#event-body'
                })
            })
        })
        this.GetRTime()
        if(this.DownTimeTimer){
            clearInterval(this.DownTimeTimer)
        }
        this.DownTimeTimer = setInterval(this.GetRTime, 1000);
    },
    filters: {
        // 格式化后台返回的时间
        escapeTime(value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
    },
    beforDestroy(){
        clearInterval(this.DownTimeTimer)
    },
    methods: {

        shardFn() { //分享
            var url = window.location.href;
            $.get(API_URL + '/attendee/generateQRcode', {
                'text': encodeURIComponent(url)
            }, (data) => {
                this.shardErwm = jQuery(data.documentElement).html();;
            })
            $('.ui.mini.modal.shard').modal('show');
        },
        contactUser() { //联系我们
            $('.ui.mini.modal.contact').modal('show');
        },
        // 活动状态
        ticketStatus(value) {
            this.btnText = this.statusKey[value];
            if (value == 'published') {
                this.isTickets = true;
            }
        },
        loadImgSet(src) {
            this.bannerIsLoading = true;
            loadImg(src, (res) => {
                this.bannerIsLoading = false;
                this.info.bannerUrl = src;
            })
        },
        GetRTime() {
            // 倒计时
            var EndTime = new Date(this.info.startTime);
            var NowTime = new Date();
            var t = EndTime.getTime() - NowTime.getTime();
            var d = 0;
            var h = 0;
            var m = 0;
            var s = 0;
            var html = ''
            if (t >= 0) {
                d = Math.floor(t / 1000 / 60 / 60 / 24);
                h = Math.floor(t / 1000 / 60 / 60 % 24);
                m = Math.floor(t / 1000 / 60 % 60);
                s = Math.floor(t / 1000 % 60);
            }
            if (t <= 0) {
                html = "活动正在进行中"
                clearInterval(this.DownTimeTimer);
            } else {
                html = d + "天" + addNum(h) + "时" + addNum(m) + "分" + addNum(s) + "秒";
            }
            $('.TIME-span').html(html)
        },
    },
    components: {
        footers: footer,
        headerSimple: headerSimple,
        ticketSelected: ticketSelected,
        designPanel: function(resolve) {
            require(['../components/design_panel.vue'], resolve)
        }
    }
}
</script>
<style scoped>
.eventBg {
    width: 100%;
    overflow: hidden;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100% calc(100% - 113px);
}

.sidbarWarper.pushable {
    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
}

.sponsor-btns {
    position: absolute;
    right: 1em;
    top: 2em;
    z-index: 9;
}

.event-wrap {
    /*padding-top:56px;*/
}

.event-header {
    padding: 2em 0;
    margin-bottom: 2em;
}

.event-header>.area {
    padding: 0 2em;
}

.event-header>.label {
    position: absolute;
    left: calc(100% + 1rem) !important;
}

.event-banner {
    position: relative;
    margin-top: 2em;
}

.event-banner>img {
    width: 100%;
    vertical-align: top;
}

.event-center {
    padding: 2em;
}


/*.fixedBtn {
    width: 42px;
    position: fixed;
    z-index: 89;
    bottom: 100px;
    right: 50%;
    margin-right: -630px;
    display: block;
}*/

.fixedBtn .button {
    margin-bottom: 1em;
}

.event-title {
    padding: 1em 0;
    text-align: center;
}

.event-ticket {
    border: 1px solid #dce0ed;
    border-width: 1px 0;
}

.ui.image img,
.ui.image svg {
    margin: 0 auto;
}

.event-ticket>.active {
    background: #f2faff
}

.event-body .easy-pointing {
    margin-top: -1em;
}

.event-ticket .icon-box {
    display: inline-block;
    vertical-align: middle;
}

.event-ticket .icon-box .iconfont {
    font-size: 1.6em;
    margin: 0;
    padding: 0;
}

.event-ticket .date {
    display: inline-block;
    min-width: 200px;
}

.title-line {
    position: relative;
    display: inline-block;
    padding: 1em 0;
}

.title-line:after {
    position: absolute;
    width: 60%;
    left: 20%;
    bottom: 0;
    border-bottom: 3px solid #09f;
    content: '';
    display: block;
    height: 0;
    clear: both;
}

.event-ticket .active {}

.event-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    /*border-top: 1px solid #dce0ed;*/
    z-index: 999;
}

.event-footer .button {
    border-radius: 0;
    width: 100%;
    margin: 0;
}
.ui.rail.event-fiexd{
    width: 45px;
    padding: 0;
}
.ui.sticky.event-side{
    width: 45px !important;
}
.fixedBtn {
    width: 45px;
}
@media only screen and (min-width: 1200px) {
    .event-banner .ui.image {
        min-height: 328px;
    }
    .lazy-img-fadein[lazy=error]{
        max-height: 328px;
     }
    .lazy-img-fadein[lazy=loading] {
        position: absolute;
        margin: 0;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
}
@media only screen and (max-width: 767px) {
    .eventBg {
        background-size: 100% calc(100% - 68px);
    }
    .event-header {
        margin-bottom: 1em;
    }
    .event-wrap>.ui.container {
        margin: 0 !important;
    }
    .event-header .area>.ui.grid {
        margin-left: -1em !important;
        margin-right: -1em !important;
    }
    .event-banner {
        margin-top: 0em;
    }
    .event-body {
        margin-bottom: 40px;
        overflow: hidden;
    }
    .event-center {
        padding: 1em 0em;
    }
    .event-text {
        margin: 0 1em;
    }
    .event-title {
        padding-top: 0;
    }
    .event-header>.area {
        padding: 0 1em;
    }
    .event-header {
        padding: 1em 0;
    }
    .sponsor-btns {
        display: none;
    }
    .footerBar {
        margin-bottom: 3em !important;
    }
    #header {
        display: none;
    }
    #header+.event-main {
        padding-top: 0;
    }
}
</style>
