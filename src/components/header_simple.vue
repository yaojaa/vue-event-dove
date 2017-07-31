<template>
    <div id="header">
        <div class="ui top fixed  menu headBar">
            <div class="left menu">
                 <router-link class="item noLine logo" v-if="logo" to="/"><img src="/images/logo.png" alt="会鸽"></router-link>
                 <slot name="left-nav"></slot>
            </div>
            <slot name="title"></slot>
            <div class="right menu">
                <slot name="right-nav"></slot>
                <template v-if="!userStatus.id">
                    <router-link class="item" to="/reg">{{ $t("user.singup") }}</router-link>
                    <router-link class="item" :to="{path:'/login',query:{redirect:$route.fullPath}}">{{ $t("user.login") }} </router-link>
                    <div class="ui item dropdown nav-dropdown">
                        <i class="grid layout icon"></i>
                        <div class="main-nav menu">
                            <div class="ui three default cards link">
                                <a class="card" href="###">
                                    <div class="image">
                                        <img src="/images/app.png" alt="">
                                    </div>
                                    <div class="content">会鸽APP</div>
                                </a>
                            </div>
                            <div class="ui horizontal divider text-muted fwn">其他服务</div>
                            <div class="ui three default cards link">
                                <a class="card" href="http://www.eventown.com/rfp/create" target="_blank">
                                    <div class="image">
                                        <img src="/images/cd.png" alt="">
                                    </div>
                                    <div class="content">找场地</div>
                                </a>
                                <a class="card" href="http://hotel.eventown.com/" target="_blank">
                                    <div class="image">
                                        <img src="/images/jd.png" alt="">
                                    </div>
                                    <div class="content">特价酒店</div>
                                </a>
                                <a class="card" href="http://www.eventown.com/room/search/" target="_blank">
                                    <div class="image">
                                        <img src="/images/tf.png" alt="">
                                    </div>
                                    <div class="content">团房</div>
                                </a>
                            </div>
                            <div class="item"></div>
                        </div>
                    </div>
                </template>
                <div class="ui dropdown item nav-dropdown" v-show="userStatus.id">
                    <router-link to="/account"><img :src="userStatus.avatar+'?imageView2/1/w/200/h/200/format/jpg/q/75|imageslim'" class="ui circular image mini avatar"></router-link><i class="dropdown icon"></i>
                    <div class="main-nav menu">
                        <div class="ui three default cards link">
                            <router-link class="card" to="/myEvent">
                                <div class="image">
                                    <img src="/images/hd.png" alt="">
                                </div>
                                <div class="content">我的活动</div>
                            </router-link>
                            <router-link class="card" :to="{name:'myorder'}">
                                <div class="image">
                                    <img src="/images/piao.png" alt="">
                                </div>
                                <div class="content">门票订单</div>
                            </router-link>
                            <router-link class="card" to="/account">
                                <div class="image">
                                    <img src="/images/zh.png" alt="">
                                </div>
                                <div class="content">我的账号</div>
                            </router-link>
                            <router-link class="card" to="/wallet">
                                <div class="image">
                                    <img src="/images/qb.png" alt="">
                                </div>
                                <div class="content">我的钱包</div>
                            </router-link>
                            <router-link class="card" to="/count">
                                <div class="image">
                                    <img src="/images/sj.png" alt="">
                                </div>
                                <div class="content">数据总览</div>
                            </router-link>
                            <router-link class="card" to="/app">
                                <div class="image">
                                    <img src="/images/app.png" alt="">
                                </div>
                                <div class="content">下载APP</div>
                            </router-link>
                        </div>
                        <div class="ui horizontal divider text-muted fwn">其他服务</div>
                        <div class="ui three default cards link">
                            <a class="card" href="http://www.eventown.com/rfp/create" target="_blank">
                                <div class="image">
                                    <img src="/images/cd.png" alt="">
                                </div>
                                <div class="content">找场地</div>
                            </a>
                            <a class="card" href="http://hotel.eventown.com/" target="_blank">
                                <div class="image">
                                    <img src="/images/jd.png" alt="">
                                </div>
                                <div class="content">特价酒店</div>
                            </a>
                            <a class="card" href="http://www.eventown.com/room/search/" target="_blank">
                                <div class="image">
                                    <img src="/images/tf.png" alt="">
                                </div>
                                <div class="content">团房</div>
                            </a>
                        </div>
                        <div style="margin:30px -30px -30px">
                            <button class="fluid ui button signOut" @click="logout">退出登录</button>
                        </div>
                        <div class="item"></div>
                    </div>
                </div>
            </div>
            <div class="right menu mobile-nav">
                <template v-if="!userStatus.id">
                    <div class="item noLine">
                        <router-link to="/reg" class="grey-link">{{ $t("user.singup") }}</router-link><span class="ml-xs mr-xs text-info">|</span>
                        <router-link :to="{path:'/login',query:{redirect:$route.fullPath}}" class="grey-link">{{ $t("user.login") }} </router-link>
                    </div>
                    <router-link to="/createEvent/1/0" class="item text-blue"><i class="icon iconfont icon-tianjia"></i>创建活动</router-link>
                </template>
                <div class="ui dropdown item mob-nav-dropdown" v-show="userStatus.id">您好，
                    <a href="javascript:void(0)"><img :src="userStatus.avatar+'?imageView2/1/w/200/h/200/format/jpg/q/75|imageslim'" class="ui circular image mini avatar"></a><i class="dropdown icon"></i>
                    <div class="main-nav menu">
                        <div class="ui three default cards link">
                            <router-link class="card" to="/createEvent/1/0">
                                <div class="image">
                                    <img src="/images/hd.png" alt="">
                                </div>
                                <div class="content">创建活动</div>
                            </router-link>
                            <router-link class="card" :to="{name:'myorder'}">
                                <div class="image">
                                    <img src="/images/piao.png" alt="">
                                </div>
                                <div class="content">门票订单</div>
                            </router-link>
                            <router-link class="card" to="/account">
                                <div class="image">
                                    <img src="/images/zh.png" alt="">
                                </div>
                                <div class="content">我的账号</div>
                            </router-link>
                        </div>
                        <div class="ui horizontal divider text-muted fwn">其他服务</div>
                        <div class="ui three default cards link">
                            <a class="card" href="http://www.eventown.com/rfp/create" target="_blank">
                                <div class="image">
                                    <img src="/images/cd.png" alt="">
                                </div>
                                <div class="content">找场地</div>
                            </a>
                            <a class="card" href="http://hotel.eventown.com/" target="_blank">
                                <div class="image">
                                    <img src="/images/jd.png" alt="">
                                </div>
                                <div class="content">特价酒店</div>
                            </a>
                            <a class="card" href="http://www.eventown.com/room/search/" target="_blank">
                                <div class="image">
                                    <img src="/images/tf.png" alt="">
                                </div>
                                <div class="content">团房</div>
                            </a>
                        </div>
                        <div style="margin:30px -30px -30px">
                            <button class="fluid ui button signOut" @click="logout">退出登录</button>
                        </div>
                        <div class="item"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {
    mapGetters
} from 'vuex'
export default {
    name: 'headerSimple',
    data() {
        return {
            logo:true,
        }
    },
    computed: {
        ...mapGetters(['userStatus'])
    },
    methods: {
        logout() {
            this.$store.dispatch('USER_SIGNOUT')
            this.$router.replace({
                path: '/login'
            })
        },
        setLanguage(l) {
            Vue.config.lang = l
            localStorage.setItem('lang', l)
            this.$i18n.locale = l
        }
    },
    mounted() {
        $('.ui.nav-dropdown.dropdown').dropdown({
            on: 'hover'
        })
        $('.ui.mob-nav-dropdown.dropdown').dropdown({
            on: 'click'
        })
        this.$parent.$on('hideLogo',()=>{
            this.logo = false
        })
    }

}
</script>
<style>
</style>
