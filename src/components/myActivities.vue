<template>
    <div class="pusher">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn">我的活动</h2>
            </div>
            <div class="block-tab">
                <div class="ui three item secondary menu f16">
                    <a class="item active" data-tab="first"><span><i class="ticket icon"></i>进行中</span></a>
                    <a class="item" data-tab="second"><span><i class="send outline icon"></i>未发布</span></a>
                    <a class="item" data-tab="third"><span><i class="circle thin icon"></i>已结束</span></a>
                </div>
                <div class="ui active tab" data-tab="first">
                    <div class="ui divided items items-md">
                        <div class="item">
                            <a class="ui tiny image">
                                <img src="/images/pp01.png">
                            </a>
                            <div class="content">
                                <a class="header fwn">2015第十届TFC全球移动游戏大会</a>
                                <div class="meta space-sm">
                                    <span class="cinema">2016年12月23日 8:00&nbsp;&nbsp;|&nbsp;&nbsp;北京市</span>
                                </div>
                                <div class="description">
                                    <a href="#">管理</a><a href="#">市场推广</a><a href="#">编辑活动</a><a href="#">查看网站</a><a href="#">复制活动</a>
                                </div>
                            </div>
                            <div class="right">环形图</div>
                        </div>
                        <div class="item">
                            <a class="ui tiny image">
                                <img src="/images/pp01.png">
                            </a>
                            <div class="content">
                                <a class="header fwn">2015第十届TFC全球移动游戏大会</a>
                                <div class="meta space-sm">
                                    <span class="cinema">2016年12月23日 8:00&nbsp;&nbsp;|&nbsp;&nbsp;北京市</span>
                                </div>
                                <div class="description">
                                    <a href="#">管理</a><a href="#">市场推广</a><a href="#">编辑活动</a><a href="#">查看网站</a><a href="#">复制活动</a>
                                </div>
                            </div>
                            <div class="right">环形图</div>
                        </div>
                    </div>
                </div>
                <div class="ui  tab" data-tab="second">
                    <div class="ui divided items items-md">
                        <div class="item">
                            <a class="ui tiny image">
                                <img src="/images/pp02.png">
                            </a>
                            <div class="content">
                                <a class="header fwn">2015第十届TFC全球移动游戏大会</a>
                                <div class="meta space-sm">
                                    <span class="cinema">时间：2017年4月6日 8:00 - 2017年4月6日 17:00&nbsp;&nbsp;|&nbsp;&nbsp;北京市国家会议中心</span>
                                </div>
                                <div class="description text-justify">
                                    <div class="ui tiny teal progress active mb-n " data-percent="2" style="width: 75%;">
                                        <div class="bar" style="'transition-duration: 300ms; width: 40%;"></div>
                                    </div>
                                    <div class="text-muted">
                                        已完成40%活动信息
                                    </div>
                                </div>
                            </div>
                            <div class="right"><a class="ui button blue">完善信息，去发布</a></div>
                        </div>
                        <div class="item">
                            <a class="ui tiny image">
                                <img src="/images/pp02.png">
                            </a>
                            <div class="content">
                                <a class="header fwn">2015第十届TFC全球移动游戏大会</a>
                                <div class="meta space-sm">
                                    <span class="cinema">时间：2017年4月6日 8:00 - 2017年4月6日 17:00&nbsp;&nbsp;|&nbsp;&nbsp;北京市国家会议中心</span>
                                </div>
                                <div class="description text-justify">
                                    <div class="ui tiny teal progress active mb-n " data-percent="2" style="width: 75%;">
                                        <div class="bar" style="'transition-duration: 300ms; width: 20%;"></div>
                                    </div>
                                    <div class="text-muted">
                                        已完成20%活动信息
                                    </div>
                                </div>
                            </div>
                            <div class="right"><a class="ui button blue">完善信息，去发布</a></div>
                        </div>
                    </div>
                </div>
                <div class="ui tab" data-tab="third">
                    <div class="ui divided items items-md">
                        <div class="item">
                            <a class="ui tiny image">
                                <img src="/images/pp03.png">
                            </a>
                            <div class="content">
                                <a class="header fwn">2015第十届TFC全球移动游戏大会</a>
                                <div class="meta space-sm">
                                    <span class="cinema">2016年12月23日 8:00&nbsp;&nbsp;|&nbsp;&nbsp;北京市</span>
                                </div>
                                <div class="description">
                                    <a href="#">管理</a><a href="#">参会人员</a><a href="#">复制活动</a>
                                </div>
                            </div>
                            <div class="right">环形图</div>
                        </div>
                        <div class="item">
                            <a class="ui tiny image">
                                <img src="/images/pp03.png">
                            </a>
                            <div class="content">
                                <a class="header fwn">2015第十届TFC全球移动游戏大会</a>
                                <div class="meta space-sm">
                                    <span class="cinema">2016年12月23日 8:00&nbsp;&nbsp;|&nbsp;&nbsp;北京市</span>
                                </div>
                                <div class="description">
                                    <a href="#">管理</a><a href="#">参会人员</a><a href="#">复制活动</a>
                                </div>
                            </div>
                            <div class="right">环形图</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../config'
export default {
    // name: '',
    data() {
            return {
                msg: 'Welcome to Event Dove'
            }
        },
        mounted: function() {
            $('#footer').show();
            $('.menu .item').tab()
        },
        components: {

        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ui.divided.items.items-md>.item {
    padding: 1.5em 0;
}

.description>a {
    margin-right: 2em;
}
</style>
