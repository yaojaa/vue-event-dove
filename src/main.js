import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import AMap from 'vue-amap';
import VueRouter from 'vue-router';
import { API_URL } from './config'
import Sortable from './components/v-sortable/index.js'
import VueLazyload from 'vue-lazyload'

// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = true

Vue.use(VueRouter)
Vue.use(Sortable)

// Vue.use(VueLazyload)
    // or with options
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '/images/none.png',
    loading: '/images/three-dots.svg',
    attempt: 1
})


// 滚动监听
var VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo)

// You can also pass in the default options
Vue.use(VueScrollTo, {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: 0,
    cancelable: true,
    onDone: false,
    onCancel: false
})

// 动画
//require('vue2-animate/dist/vue2-animate.min.css')
/****自定义验证指令插件****/
import hValidator from './components/v-vali/index.js'

Vue.use(hValidator)


/****ui指令插件****/
import semanticUi from './components/v-ui/index.js'

Vue.use(semanticUi)
    // 日期插件


/********国际化******/
//http://kazupon.github.io/vue-i18n/formatting.html
import VueI18n from 'vue-i18n'
import locales from './language'

/********全局事件******/
window.EvtBus = new Vue()

Vue.use(VueI18n)

/***设置语言****/
const lang = window.localStorage.getItem('lang') || 'zhCn'
const i18n = new VueI18n({
    locale: lang, // 语言标识
    messages: require('./language').lang //语言包
})


import VueDataValidator from './components/vendor/vue-data-validator'
Vue.use(VueDataValidator.validator, VueDataValidator.options)

/*******store*****/
Vue.use(Vuex)

import store from './store'
/*******router*****/
import { routes } from './routes'


//内部组件
import plugins from './plugins'
Vue.use(plugins)

/*****/
// try {
//   window.console&&window.console.log&&console.log("一张网页，要经历怎样的过程，才能抵达用户面前？\n一位新人，要经历怎样的成长，才能站在技术之巅？\n探寻这里的秘密；\n体验这里的挑战；\n成为这里的主人；\n加入会鸽，你，可以影响世界。\n")
//   console.log("请将简历发送至 %c eventdove@eventown.com（ 邮件标题请以“姓名-应聘XX职位-来自console”命名）","color:red")
// }
// catch(e){}

//设置AJAX的全局默认选项
$.ajaxSetup({
    headers: { // 默认添加请求头  
        "locale": window.localStorage.getItem('lang')
    },
    complete: function(jqXHR, textStatus, errorMsg) { // 出错时默认的处理函数
        // jqXHR 是经过jQuery封装的XMLHttpRequest对象
        // textStatus 可能为： null、"timeout"、"error"、"abort"或"parsererror"
        // errorMsg 可能为： "Not Found"、"Internal Server Error"等
        // 提示形如：发送AJAX请求到"/index.html"时出错[404]：Not Found
        if (jqXHR.status == 403 && jqXHR.responseJSON.errorCode == 9) {
            alert('您没有权限访问此页面！');
            router.push('/404')
        }
    },
    cache:false
})   

// console.log('ajax 全局错误！')

/*****/

/**环境监测**/
window.ENV = (function() {
    let url = location.href;
    if (url.indexOf('dev.www')) {
        return 'DEV'
    } else if (url.indexOf('qa.www')) {
        return 'QA'
    } else {
        return 'WWW'
    }
})()

// console.info('当前环境:',ENV)

/***检测登录状态****/
var localUser = localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : '';

// console.log('localUser', localUser, localUser.id_token)
if (localUser && localUser.id_token) {
    store.dispatch('USER_SIGNIN', localUser)

    jQuery.ajaxSetup({
        headers: { // 默认添加请求头  
            "Author": "eventdove-yaojia",
            "Authorization": 'Bearer ' + localUser.id_token,
            "content-Type": "application/json; charset=utf-8"
        }
    })
    var t = Math.random() * 10000
    jQuery.ajax({
            url: API_URL + '/user/checkLoginStatus?t=' + t,
            type: "GET",
            headers: {
                "Authorization": 'Bearer' + ' ' + localUser.id_token,
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            store.dispatch('USER_SIGNOUT')
        })

}

const router = new VueRouter({
    mode: 'history',

    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        console.log('savedPosition', savedPosition)
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes
})

router.beforeEach((to, from, next) => {
    let title = 'Eventdove（会鸽）让活动更精彩';
    title = to.meta&&to.meta.title?to.meta.title+' - '+title:title;
    document.title = title;
    // to 和 from 都是 路由信息对象
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (store.getters.id) { // 通过vuex state获取当前的token是否存在
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next()
    }

})

router.afterEach((to, from, next) => {
    if ((to.name != from.name) && $('.modals.page').length) {
        $('.modals.page').remove()
        $('body').removeClass('dimmable').removeClass('dimmed')
    }
})

/* 添加全局属性，为了判断按钮的点击状态 */
//为每个实例添加$isLoading属性
// let element = null;
Vue.use((Vue, options) => {
    function changeBtnStatus (el, binding) {
        if (!binding.value) {
            el.className =  `${el.className} disabled`
            el.innerHTML = '请稍后...'
        } else {
            el.className =  el.className.replace(' disabled','');
            el.innerText = '保存'
        }
    }
    Vue.directive('isAjaxOver', {
        update: (el, binding, vnode) => {
            changeBtnStatus(el, binding)
        }
    })
});   
/*********************/

/* eslint-disable no-new */
const app = new Vue({
    el: '#app',
    router: router,
    i18n,
    template: '<App/>',
    components: { App },
    store: store,
    render: h => h(App)
})
