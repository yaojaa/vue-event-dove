<template>
    <div class="ui container footerBar" id="footer">
        <div class="ui stackable grid">
            <div class="three wide computer only tablet only column ">
                <div class="ui vertical menu">
                    <div class="item">
                        <h4>快速操作</h4>
                        <div class="menu">
                            <router-link to="/createEvent/1/0" class="item">创建活动</router-link>
                            <router-link to="/event" class="item">发现活动</router-link>
                            <a href="http://www.eventown.com/rfp/create" class="item" target="_blank">发布场地询单</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="three wide computer only tablet only column ">
                <div class="ui vertical menu">
                    <div class="item">
                        <h4>了解我们</h4>
                        <div class="menu">
                            <router-link to="/about" class="item">关于会鸽</router-link>
                            <router-link to="/privacy" class="item">隐私声明</router-link>
                            <router-link to="/faqs" class="item">常见问题</router-link> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="three wide computer only tablet only column ">
                <div class="ui vertical menu">
                    <div class="item">
                        <h4>更多</h4>
                        <div class="menu">
                            <router-link to="/app" class="item">下载APP</router-link>
                            <a class="item" href="http://www.eventown.com" target="_blank">会唐网</a>
                            <a class="item" href="http://open.eventdove.com" target="_blank">会鸽开放平台</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="four wide  column ">
                <div class="ui vertical menu">
                    <div class="item">
                        <h4>联系我们</h4>
                        <div class="menu">
                            <div class="item">
                                <i class="marker icon"></i>北京市朝阳区泰禾文化大厦4F</div>
                            <!-- <a class="item" href="mailto:support@eventdove.com"> -->
                            <a class="item" href="mailto:eventdove@eventown.com">
                                <i class="mail icon"></i>eventdove@eventown.com</a>
                            <div class="item">
                                <i class="call icon"></i>010-61138799-8042</div>
                            <div class="item">
                                <i class="qq icon"></i>2850609143／2850609149</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="three wide column computer only tablet only">
                <img src="/images/wx-code.jpg" class="ui centered image small">
                <p class="text-muted text-center">服务号：Evendove_T</p>
            </div>
        </div>
        <div class="ui divider"></div>
        <div class="ui grid vertically stackable padded">
            <div class="right floated twelve wide column f12 text-muted">Copyright©2017 EventDove.com版权所有 | 苏ICP备 10211262号 苏ICP证 B1-20150298号</div>
            <div class="left floated right aligned four wide column computer only tablet only">
                <a href="http://weibo.com/eventdove" target="_blank">
                    <i class="weibo icon"></i>
                </a>
                <a href="http://t.qq.com/eventdove" target="_blank">
                    <i class="tencent weibo icon"></i>
                </a>
                <a href="http://blog.eventdove.com" target="_blank">
                    <i class="icon-svg40 icon iconfont"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { loadJs } from '../utils'

export default {
    name: 'footers',
    data() {
        return {
            msg: 'Welcome to Event Dove'
        }
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
