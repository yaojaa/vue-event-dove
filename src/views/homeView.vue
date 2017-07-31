<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <swiper :options="swiperOption">
                <swiper-slide v-for="img in banner" :cId="img.object.id" :style="{backgroundImage:'url('+img.banner+')'}">
                    <a class="swipeLink" :href="'/site/'+img.object.id" target="_blank" style='z-index:9999'></a>
                </swiper-slide>
                <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                <div class="swiper-scrollbar" slot="scrollbar"></div>
            </swiper>
            <div class="ui container">
                <div class="ui grid">
                    <div class="column" style="z-index: 10">
                        <div class="searchBar">
                            <h2 class="myActivity textShadow">智能活动管理系统，让生活更加美好</h2>
                            <div class="ui centered doubling stackable padded grid search-form">
                                <div class="nine wide column ">
                                    <div class="ui fluid large input">
                                        <input type="text" placeholder="寻找热门活动" v-model="searchText" @keyup="keyworlds()" id="searchText">
                                    </div>
                                    <transition name="fade">
                                        <div class="ui middle aligned selection animated list targetList white-wrap" id="searchList" v-show="searchKeywordList.length>0">
                                            <template v-for="key in searchKeywordList">
                                                <router-link :to="'/site/'+key.id" class="item grey-link f14">
                                                    {{key.title}}
                                                </router-link>
                                            </template>
                                        </div>
                                    </transition>
                                </div>
                                <div class="three wide column">
                                    <div class="ui animated fade button blue large fluid boxShadow" id="search">
                                        <div class="visible content">搜索</div>
                                        <div class="hidden content">
                                            搜索<i class="chevron circle right icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sub-title text-justify">
                    <h2 class="text-info fwn">热门活动</h2>
                    <router-link to="/event">更多</router-link>
                </div>
                <div class="ui three doubling stackable cards default hot-activity home-hot-activity">
                    <div class="card hot-card" v-for="card in hotEventList">
                        <router-link class="image" :to="{path:'/site/'+card.object.id}"><img v-lazy="card.thumbnail+'?imageMogr2/auto-orient/thumbnail/!720x360r/gravity/Center/crop/720x360/blur/1x0/quality/75|imageslim' " alt="" class="lazy-img-fadein"></router-link>
                        <div class="ui label hot-tag">{{card.object.categoriesStr}}</div>
                        <div class="content">
                            <!-- <div class="card-box">
                                <div class="card-img">
                                    <img v-if="card.banner" v-bind:src="card.banner">
                                    <img v-else v-bind:src="card.object.bannerUrl">
                                </div>
                                <router-link v-bind:cid="card.object.id" class="card-text f16 text-default hand-type" to="/site/6229220064365776896">{{card.object.name}}</router-link>
                            </div> -->
                            <h3 class="ui header dividing fwn"><router-link v-bind:cid="card.object.id" class="grey-link mb-xs text-hide f16" to="/site/6229220064365776896">{{card.object.name}}</router-link></h3>
                            <div class="ui relaxed list text-muted">
                                <div class="item"><span class="text-hide"><i class="wait icon"></i>{{card.object.startTime | timeFormate}}</span></div>
                                <div class="item"><span class="text-hide"><i class="marker icon"></i>{{card.object.detailedAddress}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sub-title text-justify">
                    <h2 class="text-info fwn">热门地区</h2>
                    <router-link to="/event">更多</router-link>
                </div>
                <div class="ui five primary cards default link">
                    <router-link :to="'/event/ci'+city.objectId+'/ca/se/pa1/li15/to/orid/all'" class="card hot-area" v-for="city in cityList" :cId="city.id" :ctype="city.objectType">
                        <div class="image">
                            <img v-lazy="city.banner" class="lazy-img-fadein" />
                        </div>
                        <div class="ui shape">
                            <div class="sides">
                                <div class="active side">
                                    <h2>{{city.objectId}}</h2></div>
                                <div class="side">
                                    <h2></h2></div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="sub-title hide">
                    <h2 class="text-info fwn">热门群组</h2>
                </div>
                <div class="ui three doubling cards default link hide">
                    <div class="card" v-for="grop in groupList">
                        <div class="content">
                            <div class="ui divided items">
                                <div class="item">
                                    <div class="ui tiny image">
                                        <img :src="grop.banner">
                                    </div>
                                    <div class="content">
                                        <a class="header fwn" :cid="grop.id">{{grop.objectId}}<i class="icon-vip1 icon iconfont blue"></i></a>
                                        <div class="meta">
                                            <span class="cinema">活动：56&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <span class="cinema">会员：163</span>
                                        </div>
                                        <div class="description">
                                            <p></p>
                                        </div>
                                        <div>
                                            <a class="ui label mini blue">我要成为会员</a>
                                            <a class="ui label mini blue basic">分享</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ui divider"></div>
                            <p class="text-muted">
                                MadNet不同于传统创业孵化与加速器是一个以社会企业法理运作的创业社区专注于云计算、大数据和智能终端整合相关的创新...
                            </p>
                        </div>
                    </div>
                </div>
                <div class="sub-title text-justify">
                    <h2 class="text-info fwn">热门分类</h2>
                    <router-link to="/event">更多</router-link>
                </div>
                <div class="ui five primary cards default link">
                    <router-link :to="'/event/ci/ca'+cate.value+'/se/pa1/li15/to/orid/all'" class="card home-sorts" v-for="cate in categoryList ">
                        <div class="image">
                            <img v-lazy="cate.img" class="lazy-img-fadein" />
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="ui divider hidden"></div>
            <div class="home-introduce-wrap mt-lg">
                <div class="ui container">
                    <h1 class="fwn space-md f26">一站式数字化全流程会议管理平台</h1>
                    <div class="round-tab">
                        <div class="ui three item menu f16">
                            <a class="item active" data-tab="front">会前</a>
                            <a class="item" data-tab="center">会中</a>
                            <a class="item" data-tab="behind">会后</a>
                        </div>
                        <div class="ui active tab basic segment" data-tab="front">
                            <div class="ui padded four column doubling grid">
                                <div class="column">
                                    <h3 class="ui icon inverted header mt-md">
                                      <div class="info-icon"><img src="/images/icon_31.png"></div>
                                      <div class="content mt-md">创建会议<div class="sub header mt-sm lh-default">5步完成创建，拖拉拽轻松搞定！中英文双语平台，丰富个性的网站模版，再也不用为创建活动烦恼！</div>
                                      </div>
                                    </h3>
                                </div>
                                <div class="column">
                                    <h3 class="ui icon inverted header mt-md">
                                      <div class="info-icon"><img src="/images/icon_32.png"></div>
                                      <div class="content mt-md">多渠道推广<div class="sub header mt-sm lh-default">EDM定向推广<br>微博微信社交网络整合营销</div>
                                      </div>
                                    </h3>
                                </div>
                                <div class="column">
                                    <h3 class="ui icon inverted header mt-md">
                                      <div class="info-icon"><img src="/images/icon_33.png"></div>
                                      <div class="content mt-md">注册报名<div class="sub header mt-sm lh-default">支持网站、微站、微信、邀请函报名，支持微信、支付宝、PayPal付款，丰富国际活动 支持美元在线付款</div>
                                      </div>
                                    </h3>
                                </div>
                                <div class="column">
                                    <h3 class="ui icon inverted header mt-md">
                                      <div class="info-icon"><img src="/images/icon_34.png"></div>
                                      <div class="content mt-md">参会人管理<div class="sub header mt-sm lh-default">嘉宾参会人员一键导入，微信、短信、邮件发送通知，实时报名数据在线可查</div>
                                      </div>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="ui tab basic segment" data-tab="center">
                            <div class="ui padded three column doubling grid">
                                <div class="column">
                                    <h3 class="ui icon inverted header mt-md">
                                      <div class="info-icon"><img src="/images/icon_35.png"></div>
                                      <div class="content mt-md">轻松管理参会者<div class="sub header mt-sm lh-default">极速电子签到、实时统计人员数据；随时随地发送短信邮件至参会者</div>
                                      </div>
                                    </h3>
                                </div>
                                <div class="column">
                                    <h3 class="ui icon inverted header mt-md">
                                      <div class="info-icon"><img src="/images/icon_36.png"></div>
                                      <div class="content mt-md">分房分车<div class="sub header mt-sm lh-default">系统自动根据不同需求，分房分车，解决一切突发事件；您可自行添加酒店信息，在活动网站添加预定售卖</div>
                                      </div>
                                    </h3>
                                </div>
                                <div class="column">
                                    <h3 class="ui icon inverted header mt-md">
                                      <div class="info-icon"><img src="/images/icon_37.png"></div>
                                      <div class="content mt-md">会鸽互娱<div class="sub header mt-sm lh-default">现场抽奖、摇一摇、天降红包雨、投票、3Dlogo墙、签约上墙等一系列趣味十足的互动游戏，嗨爆活动现场</div>
                                      </div>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="ui tab basic segment" data-tab="behind">
                            <h3 class="ui icon inverted header">
                              <img src="/images/hotme-count.png" class="ui image big centered">
                              <div class="content">多维度数据报表<div class="sub header mt-sm lh-default">从参会者信息、注册率、签到率、活动收款等维度，分析整场活动数据，让您最快速掌握活动情况</div>
                              </div>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui divider hidden"></div>
            <div class="sub-title text-center mt-lg">
                <h2 class="text-info fwn">大家都在用会鸽</h2></div>
            <div class="ui container">
                <div class="ui grid logo-links">
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_ibm.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_google.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_siemens.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_alibaba.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_tencent.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_bd.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_njdx.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_ctrip.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_asia.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_wx.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_ms.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_tr.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_360.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_gmgc.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_tai.jpg" alt="" class="ui image big"></div>
                    <div class="four wide mobile two wide computer column"><img src="/images/logo_unity.jpg" alt="" class="ui image big"></div>
                </div>
            </div>
            <div class="create-activity-bar" style="background-image: url(/images/banner.png)">
                <div class="ui container">
                    <div class="ui three column padded stackable grid">
                        <div class="column">
                            <div class="ui inverted small orange statistic">
                                <div class="value">
                                    1,539,201 <small class="f14 text-white">场</small>
                                </div>
                                <div class="label">活动在运营</div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui inverted small orange statistic">
                                <div class="value">
                                    13,048,932 <small class="f14 text-white">位</small>
                                </div>
                                <div class="label">商务人士参会</div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui inverted small orange statistic">
                                <div class="value">
                                    93,940 <small class="f14 text-white">家</small>
                                </div>
                                <div class="label">主办方在使用</div>
                            </div>
                        </div>
                    </div>
                    <h3 class="f26 fwn template-info">现在开始创建您的活动，多种模版选择，支持多平台浏览。</h3>
                    <router-link to="/createEvent/1/0">
                        <div class="ui animated fade button blue huge">
                            <div class="visible content">创建活动</div>
                            <div class="hidden content">
                                创建活动<i class="chevron circle right icon"></i>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <snap></snap>
        <footers></footers>
    </div>
</template>
<script>
import {
    API_URL
} from '../config'
import {
    mapState
} from 'vuex'

import header from '../components/header'
import footer from '../components/footer'
import {
    loadJs,
    pulseAnimate,
} from '../utils'

import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'

export default {
    name: 'home',
    data() {
        return {
            msg: 'Welcome to Event Dove',
            events: [],
            banner: [],
            searchText: '',
            hotEventList: [],
            groupList: [],
            cityList: [],
            searchKeywordList: [],
            categoryList: [], //分类
            swiperOption: {
                // 如果你后续需要找到当前实例化后的swiper对象以对其进行一些操作的话，可以自定义配置一个名字
                name: 'currentSwiper',
                // 所有配置均为可选（同Swiper配置）
                autoplay: 5000,
                grabCursor: false,
                setWrapperSize: false,
                autoHeight: false,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                scrollbar: '.swiper-scrollbar',
                mousewheelControl: false,
                observeParents: true,
                effect: 'flip'
            }
        }
    },
    computed: mapState({
        // 箭头函数可使代码更简练
        isNewUser: state => state.isNewUser
    }),
    beforeDestroy() {
        window.onresize = null;
        console.log('window.onresize=null')
    },
    mounted: function() {
        $(document).on('click.homeSearch', function() {
            $('#searchList').hide();
        })
        $(document).on('keyup.honesearch', function(e) {
            if (e.keyCode == 13) {
                var val = $('#searchText').val();
                if (val == '') {
                    return false;
                }
                window.location.href = "/event/ci/ca/se" + val + "/pa1/li15/to/orid/all";
            }
        })
        $('#search').on('click.homeSearch', function(e) {
            var val = $('#searchText').val();
            // if(val == ''){
            //     return false;
            // }
            window.location.href = "/event/ci/ca/se" + val + "/pa1/li15/to/orid/all";
        })

        $('.round-tab .menu .item').tab({
            onLoad: function() {
                let tab = $(this).attr('data-tab')
                if (tab == 'front') {
                    $('.home-introduce-wrap').css({
                        backgroundColor: '#4eadf8'
                    })
                } else if (tab == 'center') {
                    $('.home-introduce-wrap').css({
                        backgroundColor: '#4d62f6'
                    })
                } else if (tab == 'behind') {
                    $('.home-introduce-wrap').css({
                        backgroundColor: '#f2a55b'
                    })
                }
                $(this).find('.ui.inverted.header').transition('hide').transition({
                    animation: 'fade up',
                    duration: 500,
                    interval: 100
                });
            }
        });


        $('.hot-card').hover(function() {
            $(this).find('.hot-share').transition('drop');
        })
        $('.hot-area').hover(function() {
            $(this).find('.shape').shape('flip down');
        })
        $('#newGuild').modal()
        if (this.isNewUser) {
            this.$store.state.isNewUser = false
        }
        var _this = this;
        jQuery.get(API_URL + '/recommend/index', {}, function(data) {
            data.categoryList.splice(4, 3)
            _this.banner = data.bannerEventList.length > 0 ? data.bannerEventList : [];
            _this.categoryList = data.categoryList.length > 0 ? data.categoryList : [];
            _this.cityList = data.cityList.length > 0 ? data.cityList : [];
            _this.groupList = data.groupList.length > 0 ? data.groupList : [];
            _this.hotEventList = data.hotEventList.length > 0 ? data.hotEventList : [];
            _this.$nextTick(function() {
                pulseAnimate('.home-hot-activity .hot-card')
            })
        })

        // console.log(loadJs)
        // loadJs('http://v2.uyan.cc/code/uyan.js',function(){
        //     console.log('success!!!')
        // })
    },
    filters: {
        timeFormate: function(value) {
            var t = new Date(value);
            var y = t.getFullYear();
            var m = t.getMonth() + 1;
            var d = t.getDate();
            return y + '年' + m + '月' + d + '日';
        }
    },
    methods: {
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
    },
    components: {
        swiper,
        swiperSlide,
        headers: header,
        footers: footer,
        snap: function(resolve) {
            //异步组件写法
            require(['../components/html2canvas'], resolve)
        },
        swiper,
        swiperSlide
    },
    beforeDestroy() {
        $(document).off('click.homeSearch').off('keyup.honesearch')
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swipeLink {
    width: 100%;
    height: 360px;
    display: block;
    cursor: pointer
}

@media only screen and (min-width: 1200px) {
    .home-sorts>.image,
    .hot-area>.image {
        min-height: 260px;
    }
}
 .swiper-wrapper .swiper-slide {
        height: 320px;
        background-position: center;
    }
@media only screen and (max-width: 767px) {
    .swiper-wrapper .swiper-slide {
        height: 160px;
        background-size: cover;
        background-position: center;
    }
    .swiper-wrapper .swiper-slide .swipeLink {
        height: 160px;
    }
    .swiper-container .swiper-button-white {
        display: none!important;
    }
    .myActivity {
        font-size: 1.3em;
    }
    .sub-title {
        margin: 1em 0 1em;
    }
    .ui.divider {
        margin: .5rem 0;
    }
    .hot-area:last-child,
    .hot-area:nth-last-child(2),
    .home-sorts:last-child,
    .home-sorts:nth-last-child(2) {
        display: none;
    }
    .template-info {
        font-size: 18px !important;
        margin: 0!important;
    }
    .create-activity-bar {
        margin: 3em 0 1em;
    }
    /*.home-introduce-wrap {
            display: none;
        }*/
}

@import "../assets/css/home.css";
</style>
