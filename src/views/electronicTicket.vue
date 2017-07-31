<template>
<div class="electronicTicket-wrapper">
    <div class="event-wrap">
        <div class="ui small container">
            <div class="white-wrap p-lg">
                <div class="ui divided items mb-sm">
                    <div class="item">
                       <div class="left"><img src="/images/elt.png"  width="18" height="18"></div>
                        <div class="middle aligned content"><router-link :to="{path: '/site/' + orderInfo.eventId}" class="grey-link text-hide">{{eventInfo.title}}</router-link></div>
                        <div class="right"><i class="angle right icon"></i></div>
                    </div>
                    <div class="item">
                        <div class="left"><img src="/images/date.png"  width="18"></div>
                        <div class="middle aligned content">{{eventInfo.startTime | filterTime | filterTimeLength(1)}} ~ {{eventInfo.endTime | filterTime | filterTimeLength(2)}}</div>
                    </div>
                    <div class="item" @click.stop.prevent="openMap">
                        <div class="left"><img src="/images/map.png"  width="18"></div>
                        <div class="middle aligned content">{{eventInfo.detailedAddress || '线上活动'}}</div>
                    </div>
                </div>
                <div class="dashed"></div>
                <div class="ui basic text-center segment">
                <h4>{{attendeeInfo.codeObj.ticketName}}</h4>
                <svg width="148" height="148" v-html="qrCode" xmlns="http://www.w3.org/2000/svg" class="ui centered image"></svg>
                <p class="mb-xs">{{attendeeInfo.attendeeId}}</p>
                <p>{{attendeeInfo.collectInfo.name}}<!-- <router-link :to="{path: '/participantInfo/' + orderInfo.eventId + '_' + orderNumber + '_' + attendeeId}" class="ml-xs"><i class="write icon"></i>修改信息</router-link> --></p>
                <p v-if="isPC"><a href="javascript:;" @click="getQrCode">发送到手机</a></p>
                </div>
                <!-- <div class="dashed"></div>
                <div class="ui basic text-center segment">
                <h4>中国互联网大会免费票</h4>
                <img src="/images/wx-code.jpg" alt="" class="ui centered image">
                <p class="mb-xs">014586</p>
                <p>李小明<a href="#" class="ml-xs"><i class="write icon"></i>修改信息</a></p>
                </div> -->
                <div class="dashed"></div>
                <p class="text-muted mt-sm"><i class="info circle icon"></i>此二维码用于活动现场签到时使用</p>
            </div>
            <div class="ui basic segment text-center text-white">
                本活动使用会鸽活动管理系统
            </div>
        </div>
    </div>
    <transition name="fade">
        <div class="map-wrapper" v-show="mapContainer">
            <i class="icon close" @click="mapContainer = !mapContainer"></i>
            <div id="mapContainer"></div>
        </div>
    </transition>
    <div class="ui mini modal" id="e-ticket2">
        <i class="close icon"></i>
        <div class="header">
            查看电子票
        </div>
        <div class="content text-center">
            <img :src="qrCodeUrl" alt="" class="ui medium bordered image centered">
            <p class="space-sm">微信<span class="text-blue">扫一扫</span>获取电子票</p>
        </div>
    </div>
</div>
</template>
<script>
import {API_URL} from '../config'
import moment from 'moment'
import AMapAPILoader from '../utils/lazy-amap-api-loader'

export default {
    data() {
        return {
            ERROR_LOGIN_FAILURE: 1,
            mapContainer: false,
            attendeeId: this.$route.params.id,
            orderNumber: this.$route.params.orderNumber,
            attendeeInfo: {
                codeObj: {},
                collectInfo: {}
            },
            eventInfo: {},
            orderInfo: {},
            qrCode: '',
            qrCodeUrl:'/images/type_normal.jpg'
        }
    },
    computed: {
        // 判断是否为pc端
        isPC () {  
            const userAgentInfo = navigator.userAgent;  
            const Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
            let flag = true;  
            for (var v = 0; v < Agents.length; v++) {  
               if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
            }  
            return flag;  
        }
    },
    filters: {
        // 格式化后台返回的时间
        filterTime(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
        // 返回星期
        filterDay(date) {
            let dayArr = ['日','一','二','三','四','五','六'];
            let index = new Date(date).getDay();
            return dayArr[index];
        },
        // 返回特定长度的时间
        filterTimeLength(date,opt) {
            switch (opt) {
                case 1:
                    return date.substring(0, 16)
                    break;
                case 2:
                    return date.substring(5, 16)
                    break;
            }
        }
    },
    mounted() {
        this.getAttendee();
        this.generateQRcode();
    },
    methods: {  
        //获取参会人员信息
        getAttendee () {
            $.ajax({
                url: API_URL + "/attendee/getAttendee",
                type: "GET",
                data: {
                    attendeeId: this.attendeeId,
                    orderNumber: this.orderNumber
                }
            })
            .done((data, textStatus, jqXHR) => {
                this.attendeeInfo = data.attendeeInfo;
                this.orderInfo = data.orderInfo;
                this.eventInfo = data.eventInfo;
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                if (JSON.parse(jqXHR.responseText).errorCode === this.ERROR_LOGIN_FAILURE) {
                    this.$message('登录失效，请重新登录！');
                } else {
                    this.$message(JSON.parse(jqXHR.responseText).responseText);
                }
            });
        },
        // 生成QRcode
        generateQRcode () {
            let _param = {
                aId:this.attendeeId,
                oNu:this.orderNumber
            }
            $.ajax({
                url: API_URL + "attendee/generateQRcode",
                type: "get",
                data: {
                    text:JSON.stringify(_param)
                }
            })
            .done((data, textStatus, jqXHR) => {
                this.qrCode = $(data.documentElement).html();
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                if (JSON.parse(jqXHR.responseText).errorCode === this.ERROR_LOGIN_FAILURE) {
                    this.$message('登录失效，请重新登录！');
                } else {
                    this.$message(JSON.parse(jqXHR.responseText).responseText);
                }
            });
        },
        // 打开高德地图
        openMap () {
            this.mapContainer = true;
            let lazyAMapApiLoaderInstance = new AMapAPILoader();
            lazyAMapApiLoaderInstance.load().then(() => {
                // 地图
                var map = new AMap.Map('mapContainer', {
                    resizeEnable: true,
                    zoom: 13
                });    

                // 清除地图覆盖物
                map.clearMap();  
                
                // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
                new AMap.Marker({
                    map: map,
                    position: [this.eventInfo.lng, this.eventInfo.lat]
                });

                // 添加事件监听, 使地图自适应显示到合适的范围
                map.setFitView();
            }).catch(e => {
                console.log(e);
            })
        },
        // 查看二维码
        getQrCode () {
            $.ajax({
                url: API_URL + '/wx/qrCode/ticket',
                type: "post",
                data: JSON.stringify({
                    orderNumber: this.orderInfo.orderNumber,
                    attendeeId: this.attendeeInfo.attendeeId
                })
            })
            .done((data) => {
                this.qrCodeUrl = data.qrCode;
                $('#e-ticket2').modal('show');
            })
            .fail((err) => {
                let error = JSON.parse(err.responseText)
                this.$message.error(error.responseText) 
            })
        }
    }
}
</script>
<style scoped>
.electronicTicket-wrapper{
    overflow:hidden;
    width:100%;
    height:100%;
}

.event-wrap{
    height: 100%;
    background: #09f;
    overflow-y: auto;
    padding: 1em 0;
}
.dashed{
    border:1px dashed #ccc;
    position: relative;
    margin: 0 -2.142em;
}
.dashed:after,.dashed:before{
    display: block;
    content: ' ';
    width: 1em;
    height: 1em;
    border-radius: 1em;
    background: #09f;
    position: absolute;
    top:-.5em;
}
.dashed:after{
    left:-.5em;
}
.dashed:before{
    right:-.5em;
}
@media only screen and (max-width: 767px) {
    .ui.items>.item>.left {
         margin-right: .5em;
    }
    .ui.items>.item {
        -ms-flex-direction: row;
        flex-direction: row; 
    }
    .p-lg{
        padding: 1em !important;
    }
    .ui.divider{
        margin: .5rem 0;
    }
    .dashed{
        margin: 0 -1em;
    }
}

.map-wrapper{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    overflow: hidden;
    transform: translate3d(0,0,0);
    opacity: 1;
    transition: all .4s
}

.map-wrapper .close{
    position: absolute;
    top:15px;
    right:15px;
    font-size: 24px;
    color:#666;
    z-index: 10;
}

#mapContainer{
    width: 100%;
    height: 100%;
}

.fade-enter,.fade-leave-active{
    transform: translate3d(100%,0,0);
    opacity: 0
}
</style>
