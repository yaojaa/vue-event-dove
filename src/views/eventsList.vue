<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="searchbanner">
                <div class="ui container searchcontext">
                    <h1 class="ui header inverted space-sm">发现活动</h1>
                    <div class="ui large form">
                        <div class="fields">
                            <div class="thirteen wide field por">
                                <input type="text" class="no" v-model="searchText" @keyup="keyworlds()" placeholder="输入活动名、主办方或举办地关键字搜索" id="seachText">
                                <transition name="fade">
                                    <div class="ui middle aligned selection animated list targetList" id="searchList" v-show="searchKeywordList.length>0">
                                        <div class="item" v-for="key in searchKeywordList">
                                            <a :href="'/site/'+key.id" class="grey-link f14">{{key.title}}</a>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                            <div class="three wide field">
                                <div class="ui animated fade button blue large fluid boxShadow"
                                 @click="query('searchText',searchText)">
                                    <div class="visible content">搜索</div>
                                    <div class="hidden content">    
                                        搜索<i class="chevron circle right icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="fields"></div>
                    </div>
                    <div class="ui ten column doubling middle aligned vertically padded computer only tablet only grid" id="searchitem">
                        <div class="row type">
                            <div class="column text-white">
                                分类
                            </div>
                            <div class="column">
                                <label class="ui label fluid disinfo" :class="[query_str.category==''?'active':'']" @click="query('category','')">全部</label>
                            </div>
                            <div class="column" v-for="(type,index) in condition.category">
                                <label :class="[query_str.category==type.value?'active':'']" @click="query('category',type.value)" class="ui label fluid disinfo" :date-type="type.value">{{type.name}}</label>
                            </div>
                        </div>
                        <div class="row time">
                            <div class="column text-white">
                                时间
                            </div>
                            <div class="column" v-for="(time,index) in condition.date" v-if="index==0">
                                <label @click="setTime(index,'all')" class="ui label fluid disinfo" :class="[saveTimeKey=='all'?'active':'']">{{time.name}}</label>
                            </div>
                            <div class="column" v-else>
                                <label :data="time.value" :class="[saveTimeKey==time.en?'active':'']" @click="setTime(index,time.en)" class="ui label fluid disinfo">{{time.name}}</label>
                            </div>
                            <div class="column" style="width: 40% !important">
                               <div class="searchDate">
                                    <date-picker :date="customStartTime" v-on:input="customStartTime = arguments[0]" :option="option"></date-picker>
                                    <span class="text-white">-</span>
                                    <date-picker :date="customEndTime" v-on:input="customEndTime = arguments[0]" :option="option"></date-picker>
                                </div>
                            </div>
                            <input id="data" hidden>
                        </div>
                        <div class="row city">
                            <div class="column text-white">热门城市</div>
                            <div class="column">
                                <label class="ui label fluid disinfo" :class="[query_str.city==''?'active':'']" @click="query('city','')">全部</label>
                            </div>
                            <div class="column" v-for="(city ,index) in condition.city">
                                <label :class="[query_str.city==city.objectId?'active':'']" :data="city.value" @click="query('city',city.objectId)" class="ui label fluid disinfo">{{city.objectId}}</label>
                            </div>
                            <input id="city" hidden>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui hidden divider"></div>
            <div class="ui container">
                <div class="white-wrap p-xs text-justify filter">
                    <div class="ui text menu m-n">
                        <a class="item ml-xs" :class="[sortKey=='id'?'active':'']" @click="sort('comprehensive')" data-id="id">综合排序</a>
                        <a class="item" :class="[sortKey=='pubTime'?'active':'']" @click="sort('latestRelease')">最新发布</a>
                        <a class="item" :class="[sortKey=='browseCount'?'active':'']" @click="sort('hotClicks')">热门点击</a>
                    </div>
                    <!-- <div class="right">
                        <i class="grid layout icon" v-bind:class="{blue:!putFrom}" v-on:click="toggle(false)"></i><i class="content icon" v-bind:class="{blue:putFrom}" @click="toggle(true)"></i>
                    </div> -->
                </div>
                <h4 class="ui header"><span class="text-blue">{{info.total}}</span>条结果</h4>
                <div class="por">
                    <div v-bind:class="{ putFrom: putFrom }" class="ui three doubling stackable cards default hot-activity">
                        <div class="card hot-card " v-for="(item,index) in info.items" @mouseenter="onMouseOver(index)" @mouseleave="onMouseLeave()">
                            <router-link class="image" :to="{path:'/site/'+item.id}"><img v-lazy="item.thumbnail+'?imageMogr2/auto-orient/thumbnail/!720x360r/gravity/Center/crop/720x360/blur/1x0/quality/75|imageslim' " alt="" class="lazy-img-fadein"></router-link>
                            <div class="ui label hot-tag"><span>{{item.categoriesStr}}</span></div>
                            <div class="content">
                                <h3 class="ui header fwn">
                                    <router-link :to="{path:'/site/'+item.id}" class="grey-link mb-xs text-hide f16">{{item.title}}</router-link>
                                </h3>
                                <div class="ui relaxed list text-muted">
                                    <div class="item">
                                        <div class="text-hide"><span>{{item.startTime | stime('ymd')}}</span>
                                            <span class="ml-md">{{item.startTime | stime('week')}}</span>
                                            <span class="ml-xs mr-xs">|</span>
                                            <span>{{item.city}}</span>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="text-hide text-info">主办方：<span v-for="img in item.organizers">{{img.name}}</span></div>
                                    </div>
                                </div>
                                <div class="footerBox text-muted">
                                    <!-- <span><i class="user icon"></i> {{item.userBrowseCount}}人</span> -->
                                    <span><i class="unhide icon"></i> {{item.browseCount}}人</span>
                                    <!--<span v-if="mosueOver==index" class="hot-share hand-type transition shareBtn">
                                    <i class="fitted share icon mr-n"></i> 分享</span>-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--noData-->
                    <div class="text-center" id="noData" v-show="isEmpty">
                        <img class="ui image small centered"  src="/images/freeData.png" alt="没有找到相关内容">
                        <p class="mt-sm">对不起，我们没有找到相关活动</p>
                    </div>

                    <div class="ui basic segment loadOffset" id="loadOffset" v-show="isLoading">
                        <div class="ui active inverted dimmer">
                            <div class="ui large text loader">Loading</div>
                        </div>
                        <div class="loadIcon">正在紧急加载中请稍后.......</div>
                    </div>
                </div>
                <page v-show="info.items.length>0" ref="page" @gotoPage="setPath"></page>
            </div>
        </div>
        <footers></footers>
    </div>
</template>
<script>
// 获取当前时间
function nowTime(n) {
    var seMin = new Date().getTime();
    if (n && typeof n == 'number') {
        seMin += n * 24 * 60 * 60 * 1000;
    }
    var t = new Date(seMin);
    var y = t.getFullYear();
    var m = t.getMonth() + 1;
    var d = t.getDate();
    return y + '-' + m + '-' + d;
};
// 获取本月的第一天与最后一天
function getFirstAndFirstLastMonthDay(isFirst) {
    var t = new Date();
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
    var day = new Date(year, month, 0);
    if(isFirst){
        return year + '-' + month + '-1'; //获取当月第一天日期  
    }else{
        return year + '-' + month + '-' + day.getDate(); //获取当月最后一天日期    
    }
}
// 解析url
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串 
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};
import header from '../components/header'
import footer from '../components/footer'
import {
    API_URL
} from '../config'
import moment from 'moment'
import myDatepicker from '../components/vue-datepicker'
import page from '../components/page'
//var query_str=;
export default {
    name: 'event',
    data() {
        return {
            info: {
                items: [],
            },
            isData: true,
            timeType:'all',
            pageCount: [],
            nowPage: 1,
            putFrom: false,
            selected: 1,
            mosueOver: -1,
            timer: null,
            isLoading: true,
            isEmpty: false,
            condition: {
                city: [],
                date: [{
                    'start': '',
                    'end': '',
                    'name': '全部',
                    'en': 'all'
                }, {
                    'start': moment().add(1, 'days').format('YYYY-MM-DD'),
                    'end': moment().add(2, 'days').format('YYYY-MM-DD'),
                    'name': '明天',
                    'en': "tomorrow"
                }, {
                    'start': moment().weekday(6).format("YYYY-MM-DD"),
                    'end': moment().weekday(7).format("YYYY-MM-DD"),
                    'name': '周末',
                    'en': 'weekend'
                }, {
                    'start': moment().format('YYYY-MM-DD'),
                    'end': moment().add(7, 'days').format('YYYY-MM-DD'),
                    'name': '未来一周',
                    'en': 'week'
                }, {
                    'start': getFirstAndFirstLastMonthDay(true),
                    'end': getFirstAndFirstLastMonthDay(false),
                    'name': '本月',
                    'en': 'month'
                }, ],
                category: [],
            },
            saveTimeKey: 'all',
            query_str: {
                city: '',
                startDate: '',
                endDate: '',
                category: '',
                searchText: '',
                page: 1,
                limit: 15,
                total: -1,
                orderBy: 'id',
            },
            sortKey: 'id',
            loading: false,
            error: null,
            customStartTime:'',
            startTime: '',
            customEndTime:'',
            endTime: '',
            searchText: GetRequest()['searchText'],
            time: '',
            now: '',
            page: 1,
            //日历   
            option: {
                type: 'day',
                week: ['一', '二', '三', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: 'YYYY-MM-DD',
                placeholder: '请输入日期',
                inputStyle: {
                    'border': 'none'
                },
                color: {
                    header: '#ccc',
                    headerText: '#f00'
                },
                buttons: {
                    ok: '确定',
                    cancel: '取消'
                },
                overlayOpacity: 0.5, // 0.5 as default
                dismissible: true, // as true as default
            },
            timeoption: {
                type: 'min',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: 'YYYY-MM-DD HH:mm'
            },
            multiOption: {
                type: 'multi-day',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: "YYYY-MM-DD HH:mm"
            },
            limit: [
                {
                    type: 'weekday',
                    available: [1, 2, 3, 4, 5]
                }, 
                {
                    type: 'fromto',
                    from: '2016-02-01',
                    to: '2016-02-20'
                }
            ],
            searchKeywordList: [],
            empty: false,
            startData: true
        }
    },
    watch: {
        // startTime(value) {
        //     var end = new Date(this.endTime).getTime();
        //     var start = new Date(value).getTime();
        //     if (this.endTime != '') {
        //         if (end > start) {
        //             this.setPath();
        //         }
        //     }
        // },
        // endTime(value) {
        //     var start = new Date(this.startTime).getTime();
        //     var end = new Date(value).getTime();
            
        // },
        customStartTime(value) {
            this.startTime=value;
            this.saveTimeKey='custom';
        },
        customEndTime(value) {
            this.endTime=value;
            this.saveTimeKey='custom';
            if (this.startTime != '') {
                if (this.endTime > this.startTime) {
                    this.setPath();
                }else{
                    this.$message.warning('开始时间不能大于结束时间')
                }
            }else{
                this.$message.warning('请选择开始时间')
            }
        }
    },

    mounted: function() {
        var _this = this;
        // document.title="发现活动_会鸽"？
        if (this.$route.params){
            this.coverArgu(this.$route.params)
        }
        this.error = this.post = null
        this.loading = true;
        // this.setPath();
        this.search()

        $(document).on('keyup.searchEvent',function(e){
            if(e.keyCode==13){
                _this.query('searchText',_this.searchText);
                $('#searchList').hide();
            }
        })
        
        $(document).on('click.hideList',function() {
            $('#searchList').hide();
        })
        
        jQuery.ajax({
            url: API_URL + "/recommend/index",
            type: "GET",    
            success: function(data, req, xhr) {
                if (xhr.status == 200) {
                    _this.condition.city = data.cityList;
                    _this.condition.category = data.categoryList
                }
            }
        })
    },
    methods: {
        coverArgu(obj) { //覆盖默认数据
            console.log(obj,'======')
            for (let attr in obj) {
                if (attr == 'searchText') {
                    if (obj[attr].substring(2) == 'undefined') {
                        this.searchText = '';
                    } else {
                        this.searchText = obj[attr].substring(2)
                    }
                }
                if (attr == 'time') {
                    if(obj[attr] == 'custom'){
                        this.saveTimeKey='all';
                        return false;
                    }
                    this.saveTimeKey = obj[attr];
                    for (let i = 0; i < this.condition.date.length; i++) {
                        if (this.condition.date[i].en == obj[attr]) {
                            this.query_str.startDate = this.condition.date[i].start;
                            this.startTime=this.condition.date[i].start;
                            this.query_str.endDate = this.condition.date[i].end
                            this.endTime=this.condition.date[i].end;
                        }
                    }
                    continue;
                }
                this.query_str[attr] = obj[attr].substring(2);
            }
        },
        keyworlds() {
            var _this = this;
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = setTimeout(function() {
                if (_this.searchText != '' && _this.searchText.length >= 2) {
                    $.get(API_URL + '/event/lenovoDiscover', {
                        'searchText': _this.searchText
                    }, (data, status, xhr) => {
                        if (xhr.status == 200) {
                            _this.searchKeywordList = data;
                        }
                    })
                }
            }, 300)
        },
        toggle(value) {
            this.putFrom = value;
        },
        onMouseOver(index) {
            this.mosueOver = index;
        },
        onMouseLeave(index) {
            this.mosueOver = index;
        },

        setTime(index, value) {
            this.timeType=index;
            this.saveTimeKey = value;
            this.startTime = this.condition.date[index]['start'];
            this.endTime = this.condition.date[index]['end'];
            this.setPath()
        },
        query(key, value) {
            // $('#loadOffset').css('display', 'block');
            this.isLoading=true;
            this.query_str.page = 1;
            this.setPath('', key, value);
        },
        sort(value) {
            this.sortKey = value;
            this.setPath('', 'orderBy', value);
        },
        setPath(page, key, value) {
            // 设置路径
            this.query_str.page = page || this.query_str.page;
            var _this = this;
            if (key) {
                this.query_str[key] = value;
            }
            this.$refs.page.setpageData({
                currentPage: this.query_str.page,
                allPage: this.info.totalPage
            })
            this.isEmpty=false;
            this.searchKeywordList = [];
            this.query_str['startDate'] = this.startTime;
            this.query_str['endDate'] = this.endTime;
            this.query_str['searchText'] = this.searchText;
            var urlStr = '';
            for (let attr in this.query_str) {
                if (attr == 'startDate' || attr == 'endDate') {
                    continue;
                }
                urlStr += '/' + attr.substring(0, 2) + this.query_str[attr];
            }
            urlStr += '/' + this.saveTimeKey;
            this.$router.replace('/event' + urlStr)

            if (this.isData) {
                setTimeout(function() {
                    _this.search();
                }, 300)
                this.isData = false;
            }
        },
        // 获取列表数据接口
        search(value) {
            //区别是筛选还是下拉加载
            // 下拉加载不需要清空数组
            var _this = this;

            this.info.items = [];
            for (let attr in this.query_str) {
                if (this.query_str[attr] == -1) {
                    this.query_str[attr] = '';
                }
            }
            $.get(API_URL + '/event/discover', this.query_str, (data, status, xhr) => {
                if (xhr.status == 200) {
                    
                    this.$refs.page.setpageData({
                        currentPage: this.query_str.page,
                        allPage: data.totalPage
                    })
                    this.isLoading = false;
                    this.pageCount = [];
                    var n = Math.ceil(data.total / 15);
                    for (var i = 0; i < n; i++) {
                        this.pageCount.push(i + 1);
                    }
                    if(data.items.length==0){
                        this.isEmpty=true;
                    }else{
                        this.isEmpty=false;
                    }
                    this.info = data;
                    this.isData = true;
                };
            })
        },
    },

    filters: {
        bgurl: function(url) {
            return "background:url(" + url + ")";
        },
        url: function(url) {
            return "/site/" + url;
        },
        // typeInfo: function(type) {
        //     return ['IT/互联网', '医药/生物', '讲座/沙龙', 'IT/互联网', '艺术/音乐', '宴会', '商务/金融', '其他'][type]
        // },
        stime: function(time, type) {
            var date = new Date(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var week = date.getDay();
            week = '日一二三四五六'.split('')[week]
            if (type == "ymd") {
                return year + "年" + month + "月" + day + "日";
            } else if (type == "week") {
                return "周" + week;
            }
        },
    },
    components: {
        'date-picker': myDatepicker,
        headers: header,
        footers: footer,
        page: page
    },
    beforeDestroy(){
        $(document).off('keyup.searchEvent').off('click.hideList')
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #noData img {
        width: 165px;
    }

    .searchbanner {
        background-image: url('/images/acitivebanner.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        overflow: hidden;
        padding-bottom: 1em;
    }

    .ui.label.disinfo {
        text-align: center;
        background: #fff;
        padding-top: .8em;
        padding-bottom: .8em;
        border-radius: 1.4em;
        cursor: pointer;
    }

    .ui.label.disinfo.active {
        background: #09f;
        color: #fff;
    }

    .cov-vue-date.w-full {
        width: auto !important;
        min-width: 130px;
    }

    .targetList {
        width: calc(100% - 1em)!important;
        top: 34px;
        left: .5em;
    }

    .filter .ui.menu>.item.active {
        color: #09f;
    }

    .loadOffset {
        min-height: 200px;
    }
    #seachText {
        border: 1px solid #fff !important;
    }
    .loadIcon{
        position: absolute;
        bottom: 0px;
        left: 50%;
        margin-left: -67px;
    }
</style>
