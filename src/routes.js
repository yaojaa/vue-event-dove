const logout = {
    template: '<h1 align="center">Bye Bye 不送</h1>',
    mounted: function() {
        // store.commit('LOGOUT');
    }
}
import LoginView from './components/Login.vue'
import aboutUs from './components/about_us.vue'

import eventPage from './views/eventsList.vue'

import homeView from './views/homeView.vue'
import evtView from './components/evtView.vue'
import regView from './components/regView.vue'
import downAppView from './components/downAppView.vue'
import createEvent from './views/createEvent.vue'
import findPwdView from './components/findPwd.vue'
import activateAccount from './components/activateAccount.vue'
import ticket from './views/ticket.vue'
// import ticketOne from './components/ticket_one.vue'
import site from './views/siteActivity.vue'
import userCenter from './components/userCenter.vue'
import myActivities from './views/myActivities.vue'
// import invoiceView from './views/invoiceAttr.vue'
// import invoicelistView from './views/invoiceList.vue'

import qq from './components/callback_login.vue'

// 活动首页
// import meeting from './views/eventHome.vue'
import meetingMobile from './views/eventMobile.vue'
import meetingTicket from './views/eventTicket.vue'
import meetingSuccess from './views/eventSuccess.vue'
import electronicTicket from './views/electronicTicket.vue'
import AllelectronicTicket from './views/allElectronicTicket.vue'
/***活动管理***/
import activityManageView from './views/maneger/activityManage.vue'
// 活动管理>基本管理
import dashboardView from './views/maneger/dashboard.vue'
import activitySettingsView from './views/maneger/activitySettings.vue'
// 活动管理>人员与订单
import orderListView from './views/maneger/orderList.vue'
import participantsView from './views/maneger/participants.vue'
import addParticipantsView from './views/maneger/addParticipants.vue'
import invoiceManagementView from './views/maneger/invoiceManagement.vue'
import invoiceDetailsView from './views/maneger/invoiceDetails.vue'
// 活动管理>市场推广
import discountCodeView from './views/maneger/discountCode.vue'
import webEmbeddingView from './views/maneger/webEmbedding.vue'
import socialSharingView from './views/maneger/socialSharing.vue'
import paidPromoteView from './views/maneger/paidPromote.vue'
import extendedTrackingView from './views/maneger/extendedTracking.vue'
import weChatInvitationView from './views/maneger/weChatInvitation.vue'

// 活动管理>活动现场
import personalityBadgeView from './views/maneger/personalityBadge.vue'
import liveInteractionView from './views/maneger/liveInteraction.vue'
import shareLiveView from './views/maneger/shareLive.vue'

// 报名表单查看
import customerFormView from './components/form_editor/view.vue'
// 活动详情页面
import ticketSelected from './components/ticket_selected.vue'

//会员管理
import vipManeger from './views/vipManeger/vipIndex.vue'
import vipDetil from './views/vipManeger/vipDetil.vue'
import vipLookDetil from './views/vipManeger/vipLookDetil.vue'
// import vipInvite from './views/vipManeger/vipInvite.vue'
import vipNew from './views/vipManeger/vipNew.vue'

// 群发
const mailView = resolve => {
    require.ensure([], () => {
        resolve(require('./views/maneger/mail.vue'))
    }, 'mailView')
}
const smsView = resolve => {
    require.ensure([], () => {
        resolve(require('./views/maneger/sms.vue'))
    }, 'smsView')
}

// 我的钱包
import myWalletView from "./views/myWallet.vue"
import cashListView from "./views/cashList.vue"
import cashView from "./views/cash.vue"
import cashSuccessView from "./views/cashSuccess.vue"
import bankCardAddView from "./views/bankCardAdd.vue"
import bankCardPersonalView from "./views/bankCardPersonal.vue"
import bankCardEnterpriseView from "./views/bankCardEnterprise.vue"
import bankCardSuccessView from "./views/bankCardSuccess.vue"
import rechargeView from "./views/recharge.vue"
import rechargePayView from "./views/rechargePay.vue"

// 支付选择界面
import paySelecte from "./views/paySelecte.vue"
import paySelecteOld from "./views/paySelecte_back.vue"
import paySuccess from "./views/paySuccess.vue"

// 我的账号
import myAccountView from "./views/myAccount.vue"
import personalDataView from "./views/personalData.vue"

// 我的门票
import myTicketView from "./views/myTicket.vue"
import participantInfoView from "./views/participantInfo.vue"
import orderDetailsView from "./views/orderDetails.vue"

// 我的门票
import countView from "./views/count.vue"

// 下载APP
import appView from "./views/app.vue"

//关于会鸽
import aboutView from "./views/about.vue"

//功能介绍
import fnIntView from "./views/fnInt.vue"

//404页面
import fourView from "./views/404.vue"

//隐私声明
import privacyView from "./views/privacy.vue"
//收费页
import feesView from "./views/fees.vue"
//常见问题
import faqsView from "./views/faqs.vue"
// const Foo = resolve => require(['./Foo.vue'], resolve)

const createEventView = resolve => {
    require.ensure([], () => {
        resolve(require('./views/createEvent.vue'))
    }, 'createEventView')
}


//重置密码页

import mailActivation from './views/user/mail_activation.vue'
import resetPwd from './views/user/reset_pwd.vue'

import test from './views/test.vue'
import game from './views/game.vue'
import createTemplate from './components/template_tool'
import wxpayView from './views/wxpay.vue'


// 定义路由
export const routes = [

    {
        path: '/game/:id',
        name: 'game',
        component: game
    }, {
        // path: '/wx-pay/(\\?)?',
        path: '/wx/pay',
        name: 'wxpayView',
        component: wxpayView
    },
    {
        path: '/test/:id',
        name: 'test',
        component: test
    }, {
        path: '/user/reset_pwd',
        name: 'resetPwd',
        component: resetPwd,
        meta: {
            title: '重置密码'
        },
    }, {
        path: '/user/mail_activation',
        name: 'mailActivation',
        component: mailActivation
    }, {
        path: '/createEvent/:id(\\d+)/:eventId',
        name: 'create',
        component: createEventView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '创建活动'
        },
    }, {
        path: '/editEvent/:id(\\d+)/:eventId',
        name: 'edit',
        component: createEventView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '编辑活动'
        }
    }, {
        path: '/logout',
        component: logout
    }, {
        path: '/Login',
        component: LoginView,
        meta: { title: '登录' }
    }, {
        path: '/about_us',
        component: aboutUs,
        meta: { title: '关于我们' }
    },

    {
        path: '/ticketSelected/:id',
        component: ticketSelected
    }, {
        path: '/event',
        name: 'event',
        component: eventPage,
        meta: { title: '发现活动' }
    }, {
        path: '/event/:city/:category/:searchText/:page/:limit/:total/:orderBy/:time',
        name: 'event2',
        component: eventPage,
        meta: { title: '发现活动' }
    }, {
        path: '/reg',
        component: regView,
        meta: { title: '注册' }
    },
    // { path: '/ticket', component: ticket },
    // { path: '/ticket_one', component: ticketOne },
    //购票表单
    {
        path: '/ticket/:eventId',
        component: ticket,
        name: 'ticket',
        meta: { title: '' }
    },

    {
        path: '/user',
        component: userCenter,
        meta: { title: '' }
    }, {
        path: '/paySelecte/:id(\\d+)/:eventId',
        component: paySelecte,
        name: 'paySelecte',
        meta: { title: '' }
    }, {
        path: '/paySelecteOld/:id(\\d+)',
        component: paySelecteOld,
        meta: { title: '' }
    }, {
        path: '/paySuccess*',
        component: paySuccess,
        meta: { title: '支付成功' }
    }, {
        path: '/customer_form',
        component: customerFormView,
        meta: { title: '' }
    },

    /**我的活动**/
    {
        path: '/myEvent',
        name: 'myActivities',
        component: myActivities,
        meta: {
            requireAuth: true,
            title: '我的活动' // 添加该字段，表示进入这个路由是需要登录的
        }
    }, {
        path: '/site/:id',
        name: 'site',
        component: site
    }, {
        path: '/meetingMobile/:id',
        name: 'meetingMobile',
        component: meetingMobile
    }, {
        path: '/meetingTicket/:id',
        name: 'meetingTicket',
        component: meetingTicket
    }, {
        path: '/meetingSuccess/:id/:eventId',
        name: 'meetingSuccess',
        component: meetingSuccess
    }, {
        path: '/electronicTicket/:id/:orderNumber',
        name: 'electronicTicket',
        component: electronicTicket
    }, {
        path: '/AllelectronicTicket/:orderNumber',
        name: 'AllelectronicTicket',
        component: AllelectronicTicket
    }, {
        path: '/activateAccount/:id/:status',
        name: 'activateAccount',
        component: activateAccount
    }, {
        path: '/',
        name: 'home',
        component: homeView
    },

    {
        path: '/findPwd',
        component: findPwdView,
        meta: { title: '找回密码' }
    },

    {
        path: '/downApp',
        component: downAppView
    }, {
        path: '/eventView/:id',
        name: 'eventView',
        component: evtView,
    },
    // { path: '/invoice', component: invoiceView },
    // { path: '/invoiceList', component: invoicelistView },
    {
        path: '/account',
        name: 'myAccount',
        component: myAccountView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '账号管理'
        }
    }, {
        path: '/personalData/:id',
        name: 'personalData',
        component: personalDataView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '编辑资料 - 账号管理'
        }
    }, {
        path: '/order',
        name: 'myorder',
        component: myTicketView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '门票及订单'
        }
    }, {
        path: '/participantInfo/:id',
        name: 'participantInfo',
        component: participantInfoView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '参会人信息 - 门票及订单'
        }
    }, {
        path: '/orderDetails/:id',
        name: 'orderDetails',
        component: orderDetailsView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '订单详情 - 门票及订单'
        }
    }, {
        path: '/count',
        name: 'count',
        component: countView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '数据总览'
        }
    }, {
        path: '/app',
        name: 'app',
        component: appView,
        meta: { title: '下载APP' }
    }, {
        path: '/about',
        name: 'about',
        component: aboutView,
        meta: { title: '关于会鸽' }
    }, {
        path: '/fnInt',
        name: 'fnInt',
        component: fnIntView,
        meta: { title: '功能介绍' }
    }, {
        path: '/404',
        name: '404',
        component: fourView,
        meta: { title: '404' }
    }, {
        path: '/privacy',
        name: 'privacy',
        component: privacyView,
        meta: { title: '隐私声明' }
    }, {
        path: '/fees',
        name: 'fees',
        component: feesView,
        meta: { title: '账号升级' }
    }, {
        path: '/faqs',
        name: 'faqs',
        component: faqsView,
        meta: { title: '常见问题' }
    }, {
        path: '/recharge',
        name: 'recharge',
        component: rechargeView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '收银台'
        }
    }, {
        path: '/rechargePay/:id(\\d+)',
        name: 'rechargePay',
        component: rechargePayView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '确认支付'
        }
    },
    // 我的钱包
    {
        path: '/wallet',
        name: 'myWallet',
        component: myWalletView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '我的钱包'
        }
    }, {
        path: '/cashList',
        name: 'cashList',
        component: cashListView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '可提现明细 - 我的钱包'
        }
    }, {
        path: '/cash',
        name: 'cash',
        component: cashView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '提现 - 我的钱包'
        }
    }, {
        path: '/cashSuccess',
        name: 'cashSuccess',
        component: cashSuccessView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '提现成功 - 我的钱包'
        }
    }, {
        path: '/bankCardAdd',
        name: 'bankCardAdd',
        component: bankCardAddView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '添加账户 - 我的钱包'
        }
    }, {
        path: '/bankCardPersonal',
        name: 'bankCardPersonal',
        component: bankCardPersonalView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '添加个人账户 - 我的钱包'
        }
    }, {
        path: '/bankCardEnterprise',
        name: 'bankCardEnterprise',
        component: bankCardEnterpriseView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '添加企业账户 - 我的钱包'
        }
    }, {
        path: '/bankCardSuccess',
        name: 'bankCardSuccess',
        component: bankCardSuccessView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '绑定成功 - 我的钱包'
        }
    },

    /*****活动管理*****/
    {
        name: 'activityManage',
        path: '/activityManage/:id',
        component: activityManageView,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            requireEvtAdmin: true
        },
        children: [
            // 基本管理
            {
                // 当 /activityManage/:id/statistics 匹配成功，
                name: 'dashboard', //活动统计
                path: 'dashboard', //活动统计
                component: dashboardView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '活动统计 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/details 匹配成功
                name: 'activitySettings', //活动设置
                path: 'activitySettings', //活动设置
                component: activitySettingsView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '活动设置 - 活动管理'
                }
            },
            // 人员与订单
            {
                // 当 /activityManage/:id/order 匹配成功，
                name: 'order', //订单管理
                path: 'order', //订单管理
                component: orderListView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '订单管理 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/participants 匹配成功
                name: 'participants', //参会人员
                path: 'participants', //参会人员
                component: participantsView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '参会人员 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/addParticipants 匹配成功
                name: 'addParticipants', //添加参会人员
                path: 'addParticipants', //添加参会人员
                component: addParticipantsView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '添加参会人员 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/details 匹配成功
                name: 'invoiceManagement', //发票管理
                path: 'invoiceManagement', //发票管理
                component: invoiceManagementView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '发票管理 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/details 匹配成功
                name: 'invoiceDetails*', //发票详情
                path: 'invoiceDetails*', //发票详情
                component: invoiceDetailsView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '发票详情 - 活动管理'
                }
            },

            // 市场推广
            {
                // 当 /activityManage/:id/discountCode 匹配成功，
                name: 'discountCode', //优惠码
                path: 'discountCode', //优惠码
                component: discountCodeView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '优惠码 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/webEmbedding 匹配成功
                name: 'webEmbedding', //网站嵌入
                path: 'webEmbedding', //网站嵌入
                component: webEmbeddingView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '网站嵌入 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/socialSharing 匹配成功，
                name: 'socialSharing', //社交分享
                path: 'socialSharing', //社交分享
                component: socialSharingView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '社交分享 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/paidPromote 匹配成功
                name: 'paidPromote', //付费推广
                path: 'paidPromote', //付费推广
                component: paidPromoteView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '付费推广 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/extendedTracking 匹配成功，
                name: 'extendedTracking', //推广跟踪
                path: 'extendedTracking', //推广跟踪
                component: extendedTrackingView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '推广跟踪 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/weChatInvitation 匹配成功，
                name: 'weChatInvitation', //微信邀请函
                path: 'weChatInvitation', //微信邀请函
                component: weChatInvitationView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '参会邀请函 - 活动管理'
                }
            },
            // 添加模板

            {
                path: 'createTemplate',
                name: 'createTemplate',
                component: createTemplate,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '参会邀请函 - 活动管理'
                }
            }, 

            // 活动现场
            {
                // 当 /activityManage/:id/personalityBadge 匹配成功，
                name: 'personalityBadge', //个性胸卡
                path: 'personalityBadge', //个性胸卡
                component: personalityBadgeView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '个性胸卡 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/liveInteraction 匹配成功
                name: 'liveInteraction', //现场互动
                path: 'liveInteraction', //现场互动
                component: liveInteractionView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '现场互动 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/shareLive 匹配成功，
                name: 'shareLive', //分享与直播
                path: 'shareLive', //分享与直播
                component: shareLiveView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '分享与直播 - 活动管理'
                }
            },

            // 群发
            {
                // 当 /activityManage/:id/mail/label/page 匹配成功，
                path: 'email/:label/:page', //邮箱
                name: 'email',
                component: mailView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '发邮件 - 活动管理'
                }
            }, {
                // 当 /activityManage/:id/sms/label/page 匹配成功，
                path: 'sms/:label/:page', //短信
                name: 'sms',
                component: smsView,
                meta: {
                    requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    requireEvtAdmin: true,
                    title: '发短信 - 活动管理'
                }
            }
        ]
    },
    /*****活动管理End *****/
    /*****会员管理首页*****/
    {
        path: '/vipManeger/:id',
        component: vipManeger,
    },
    //会员管理会员管理/活动
    {
        path: '/vipManeger/:id/vipEvent',
        component: vipDetil,
    },
    //会员管理会员详情
    {
        path: '/vipManeger/:id/vipLookDetil',
        component: vipLookDetil,
    },
    //邀请会员
    // {
    //     path: '/vipManeger/:id/vipInvite',
    //     component: vipInvite,
    // },
    //新建会员
    {
        path: '/vipManeger/:id/vipNew',
        component: vipNew,
    }, {
        path: '/qq',
        component: qq,
    }, {
        path: '*',
        component: fourView
    }
]
