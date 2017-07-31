<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn">我的账号</h2></div>
                <div class="white-wrap p-lg">
                    <div class="ui items">
                        <div class="item">
                            <div class="left">
                                <div class="ui circular tiny image"><img :src="accountInfo.profile.avatar"></div>
                            </div>
                            <div class="content">
                                <div class="header text-justify"><span>{{accountInfo.nickname}}</span>
                                    <router-link :to="{path:'/personalData/'+accountInfo.id}" class="f14 fwn"><i class="write icon"></i>编辑资料</router-link>
                                </div>
                                <div class="description space-sm">
                                    <div class="ui horizontal list">
                                        <div class="item" v-if="accountInfo.phone"><i class="fax icon"></i>&nbsp;{{accountInfo.phone}}</div>
                                        <div class="item" v-if="accountInfo.email"><i class="mail icon"></i>&nbsp;{{accountInfo.email}}</div>
                                    </div>
                                </div>
                                <div class="meta" v-if="accountInfo.userPackage.packageName === '至尊版'">
                                    <p>{{accountInfo.userPackage.packageName}}到期时间：{{uTime.utime.split(' ')[0]}}
                                        <label class="ui horizontal label yellow"><i class="icon-vip1 iconfont icon"></i> 至尊版</label>
                                    </p>
                                </div>
                                <div class="meta" v-if="accountInfo.userPackage.packageName === '普通版'">
                                    <p>
                                        <label class="ui horizontal label">普通版</label>
                                        <router-link to="/fees">升级到至尊版</router-link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui doubling stackable vertically grid">
                    <div class="eleven wide column">
                        <div class="ui divider hidden"></div>
                        <div class="sub-blue-title f16 mb-sm text-justify">
                            <div class="left">
                                <i class="iconfont icon-qianbao icon"></i>
                                <div class="content">我的钱包</div>
                            </div>
                            <router-link :to="{path: '/wallet'}" class="f14 mob-hide">钱包管理</router-link>
                        </div>
                        <div class="white-wrap p-lg">
                            <div class="ui three column  doubling stackable grid">
                                <div class="column">
                                    <p class="f13 fwn text-info">钱包余额</p>
                                    <div class="f24 number"><small class="f16">¥</small>{{walletInfo.balanceRMB | filterToFixed(2)}}</div>
                                    <!-- <h3 class="m-n">美元账户：${{walletInfo.balanceDollar}}</h3> -->
                                </div>
                                <!-- <div class="column"><h1 class="text-yellow"><small class="f16">¥</small>4214.00<p class="f13 fwn text-info">可提现金额</p></h1></div> -->
                                <div class="middle aligned column"><p class="text-info"><i class="protect icon green"></i>安全中心保护账户资产安全</p></div>
                                <div class="right aligned middle aligned column">
                                    <router-link class="ui button blue waterRipple" :to="{path: '/cashList',query:{status: accountInfo.realNameAuthentication?accountInfo.realNameAuthentication.status:'inexistence',note: accountInfo.realNameAuthentication?accountInfo.realNameAuthentication.note:''}}">提现</router-link>
                                </div>
                            </div>                            
                        </div>
                        <!--                         <div class="ui divider hidden"></div>
												<div class="sub-blue-title f16 mb-sm">
														<i class="iconfont icon-users icon"></i>
														<div class="content">多用户授权</div>
												</div>
												<div class="white-wrap p-lg">
												</div> -->
                        <div class="ui divider hidden"></div>
                        <div class="sub-blue-title f16 mb-sm">
                            <i class="iconfont icon-youxiang icon"></i>
                            <div class="content">邮件偏好设置</div>
                        </div>
                        <div class="white-wrap p-lg">
                            <div class="ui message">
                                <div class="header">邮件通知</div>
                                提示：不勾选的选项将不发送邮件（我创建的活动）
                            </div>
                            <div class="ui form">
                                <div class="grouped fields">
                                    <div class="field">
                                        <div class="ui checkbox">
                                            <input type="checkbox" name="" @change="updatePreferenceSetting()" v-model="emailSetting.isNeedAttendeeNotice">
                                            <label>参会者购票通知邮件</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui checkbox">
                                            <input type="checkbox" name="" @change="updatePreferenceSetting()" v-model="emailSetting.isNeedRefundTicketNotice">
                                            <label>退票通知邮件</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui checkbox">
                                            <input type="checkbox" name="" @change="updatePreferenceSetting()" v-model="emailSetting.isNeedAuditedTicketNotice">
                                            <label>参会者购买付费审核门票的通知邮件</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="five wide column">
                        <div class="ui divider hidden"></div>
                        <div class="sub-blue-title f16 mb-sm">
                            <i class="iconfont icon-068zhanghuanquan icon"></i>
                            <div class="content">账户安全</div>
                        </div>
                        <div class="white-wrap p-lg">
                            <div class="ui relaxed middle aligned selection animated list f15 account-lists">
                                <div class="item" @click="layerFlag = 'checkMobile'">
                                    <div class="text-justify"><a class="grey-link mobile-btn">手机验证</a>
                                        <div class="right"><span class="text-teal" v-if="accountInfo.phone">已验证</span><i class="angle right icon f20"></i></div>
                                    </div>
                                </div>
                                <div class="item" @click="layerFlag = 'emailCheck'">
                                    <div class="text-justify"><a class="grey-link email-btn">邮箱验证</a>
                                        <div class="right"><span class="text-teal" v-if="accountInfo.email">已验证</span><i class="angle right icon f20"></i></div>
                                    </div>
                                </div>
                                <!-- <div class="item"><div class="text-justify"><a href="#" class="grey-link binding-btn">账号绑定</a><div class="right"><span class="text-teal">已绑定</span><i class="angle right icon f20"></i></div></div></div> -->
                                <div class="item hide" :class="{'show':accountInfo.realNameAuthentication && accountInfo.realNameAuthentication.status === 'auditThrough'}" @click="layerFlag = 'authentication'">
                                    <div class="text-justify"><a class="grey-link authentication-btn">实名认证</a>
                                        <div class="right"><span class="text-teal">已认证</span><i class="angle right icon f20"></i></div>
                                    </div>
                                </div>
                                <div class="item hide" :class="{'show':!this.accountInfo.realNameAuthentication || !accountInfo.realNameAuthentication.status}" @click="layerFlag = 'authentication'">
                                    <div class="text-justify"><a class="grey-link authentication-btn2">实名认证</a>
                                        <div class="right"><span>未认证</span><i class="angle right icon f20"></i></div>
                                    </div>
                                </div>
                                <div class="item hide" :class="{'show':accountInfo.realNameAuthentication && accountInfo.realNameAuthentication.status === 'auditing'}" @click="layerFlag = 'authentication'">
                                    <div class="text-justify"><a class="grey-link authentication-btn3">实名认证</a>
                                        <div class="right"><span class="text-red">审核中</span><i class="angle right icon f20"></i></div>
                                    </div>
                                </div>
                                <div class="item hide" :class="{'show':accountInfo.realNameAuthentication && accountInfo.realNameAuthentication.status === 'auditFailure'}" @click="layerFlag = 'authentication'">
                                    <div class="text-justify"><a class="grey-link authentication-btn4">实名认证</a>
                                        <div class="right"><span class="text-red">审核失败</span><i class="angle right icon f20"></i></div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="text-justify" @click="accountInfo.phone || accountInfo.email ? layerFlag = 'resetPwd' : $message('请先进行手机号验证或者邮箱邮箱！')"><a class="grey-link resetPwd-btn">重置密码</a>
                                        <div class="right"><i class="angle right icon f20"></i></div>
                                    </div>
                                </div>
                                <div class="item" @click="layerFlag = 'atmPassword'">
                                    <div class="text-justify"><a class="grey-link atmPassword-btn">取款密码</a>
                                        <div class="right"><i class="angle right icon f20"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <myComponent :is="layerFlag" @updateLayerFlag="updateLayerFlag" :accountInfo="accountInfo"></myComponent>
        <snap></snap>
        <footers></footers>
    </div>
</template>
<script>
import {
    formatTime
} from '../utils/index.js';
import Auth from '../auth'
import {
    API_URL,
    IMG_SERVER
} from '../config'
import header from '../components/header'
import footer from '../components/footer'
import resetPwd from './resetPwd'
import atmPassword from './atmPassword'
import checkMobile from './checkMobile'
import emailCheck from './emailCheck'
import authentication from './authentication'

/**60s*/
var timers = function(el) {
    var time = 60;
    var interval = setInterval(function() {
        time--
        el.innerHTML = time

        if (time <= 0) {
            clearInterval(interval)
            el.innerHTML = '发送验证码'
            el.disabled = false
        }
    }, 1000)
}

export default {
    verify: true,
    data() {
        return {
            accountInfo: {
                realNameAuthentication: {
                    name: '',
                    idNumber: '',
                    note: '',
                    status: ''
                },
                userPackage: {
                    packageName: ''
                },
                profile: {
                    avatar: '/images/head.jpg'
                }
            },
            walletInfo: {},
            updateToken: null,
            emailSetting: {
                isNeedAttendeeNotice: true, // 是否需要参会者购票通知邮件
                isNeedRefundTicketNotice: true, // 是否需要退票通知邮件
                isNeedAuditedTicketNotice: true // 是否需要参会者购买付费审核门票的通知邮件
            },
            layerFlag: this.$route.query.layerFlag || ''
        }
    },
    computed: {
        // 格式化到期时间
        uTime: function() {
            return formatTime(this.accountInfo)
        }
    },
    filters: {
        // 保留小数位
        filterToFixed (val,n) {
            if (val) {
                return val.toFixed(n);
            } else {
                return 0;
            }
        }
    },
    created() {
        this.myaccount();
        this.mywallet();
        $('.ui.checkbox').checkbox()
    },
    methods: {
        // 更新弹窗状态
        updateLayerFlag(val) {
            this.layerFlag = val;
        },
        // 我的账号信息
        myaccount() {
            let _this = this;
            jQuery.ajax({
                url: API_URL + "/user/detail",
                type: "GET"
            })
            .done((data, textStatus, jqXHR) => {
                Object.assign(this.accountInfo ,data);
                Object.assign(this.emailSetting ,data.emailSetting);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                _this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        },
        // 我的钱包信息
        mywallet() {
            let _this = this;
            jQuery.ajax({
                    url: API_URL + "/wallet/getWalletDetail",
                    type: "GET"
                })
                .done((data, textStatus, jqXHR) => {
                    this.walletInfo = $.extend(true,{},this.walletInfo ,data);
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    console.log(JSON.parse(jqXHR.responseText).responseText);
                });
        },
        // 邮件偏好设置
        updatePreferenceSetting() {
            let _this = this;
            jQuery.ajax({
                    url: API_URL + "/user/update",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        emailSetting: _this.emailSetting
                    })
                })
                .done(function(data, textStatus, jqXHR) {
                    // todo
                    console.log('邮件偏好设置成功')
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    _this.$message(JSON.parse(jqXHR.responseText).responseText);
                });
        }
    },
    components: {
        headers: header,
        footers: footer,
        resetPwd,
        atmPassword,
        checkMobile,
        emailCheck,
        authentication,
        snap: function(resolve) {
            //异步组件写法
            require(['../components/html2canvas'], resolve)
        }
    }
}
</script>
<style scoped>
.ui.id-box .ui.dimmer {
    background-color: rgba(0, 0, 0, .2);
}

.account-lists.ui.relaxed.list:not(.horizontal)>.item:not(:last-child) {
    padding-bottom: 1em;
}

.account-lists.ui.relaxed.list:not(.horizontal)>.item:not(:first-child) {
    padding-top: 1em;
}

.account-lists.ui.selection.list>.item {
    padding-top: 1em;
    padding-bottom: 1em;
}

.account-lists {
    margin-top: -.5em !important;
    margin-bottom: -.5em !important;
}

@media only screen and (max-width: 767px) {
    .p-lg {
        padding: 1em !important;
    }
    .ui.divider {
        margin: .5rem 0;
    }
}

.show {
    display: block !important;
}
</style>
