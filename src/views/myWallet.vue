<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn">我的钱包</h2>
                </div>
                <div class="white-wrap p-lg">
                    <div class="ui three column middle centered doubling stackable grid">
                        <div class="equal row">
                            <div class="column">
                                <p class="text-info">钱包余额</p>
                                <div class="f24 number"><small class="f16">¥</small>{{walletInfo.balanceRMB | filterToFixed(2)}}</div>
                                <!-- <div class="f16 number mt-xs"><small class="f14">$</small>{{walletInfo.balanceDollar}}</div> -->
                            </div>
                            <!--  <div class="column">
                                <p class="text-info">可提现金额</p>
                                <div class="f24 number text-yellow"><small class="f16">¥</small>14214.00</div>
                                <div class="f16 number text-yellow mt-xs"><small class="f14">$</small>10022.00</div>
                            </div> -->
                            <div class="left aligned middle aligned column">
                                <p class="text-info f15"><i class="protect icon green"></i>安全中心保护账户资产安全</p>
                                <p class="text-muted" v-if="accountInfo.realNameAuthentication && accountInfo.realNameAuthentication.status === 'auditThrough'">已实名认证</p>
                                <p class="text-muted" v-if="!accountInfo.realNameAuthentication">未认证</p>
                                <p class="text-muted" v-if="accountInfo.realNameAuthentication && accountInfo.realNameAuthentication.status === 'auditing'">审核中</p>
                                <p class="text-muted" v-if="accountInfo.realNameAuthentication && accountInfo.realNameAuthentication.status === 'auditFailure'">审核失败</p>
                            </div>
                            <div class="right aligned middle aligned column">
                                <router-link class="ui button blue waterRipple" :to="{path: '/cashList',query:{status: accountInfo.realNameAuthentication?accountInfo.realNameAuthentication.status:'inexistence',note: accountInfo.realNameAuthentication?accountInfo.realNameAuthentication.note:''}}">提现</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui divider hidden"></div>
                <div class="block-tab">
                    <div class="ui four item secondary left menu f16 " id="card">
                        <a class="item active" data-tab="first"><span><i class="spy icon"></i>个人账户</span></a>
                        <a class="item" data-tab="second"><span><i class="building icon"></i>企业账户</span></a>
                        <a class="item" data-tab="third"><span><i class="paypal icon"></i>paypal账户</span></a>
                        <div class="item">
                            <div class="text-right w-full">
                                <router-link :to="{path: '/bankCardAdd'}" class="ui button teal mini basic">添加银行账户</router-link><a class="ui button blue mini basic" @click="paypalLayer = 'paypalLayerView'">添加贝宝账户</a></div>
                        </div>
                    </div>
                    <div class="ui active tab" data-tab="first">
                        <div class="ui four column doubling stackable grid" v-if="walletInfo.personalAccount&&walletInfo.personalAccount.length > 0">
                            <div class="column" v-for="(item,$index) in walletInfo.personalAccount" v-if="item.status !== 'deleted'">
                                <div class="bankCard p-lg text-white" :class="'bg'+(($index+1)%4 || 4)">
                                    <div class="ui relaxed list">
                                        <div class="item">{{item.ownerName}}</div>
                                        <div class="item">**** **** **** {{item.bankAccount.slice(-4)}}</div>
                                        <div class="item f16">{{item.bankName}}</div>
                                    </div>
                                    <div class="modify">
                                        <router-link :to="{path:'/bankCardPersonal',query:{accountId:item.accountId}}">修改</router-link> | <a href="javascript:;" @click="deleteLayer('personal', item.accountId)">删除</a></div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center space-md" v-if="walletInfo.personalAccount.length === 0">
                            <router-link :to="{path:'/bankCardPersonal'}" class="big ui button teal"><i class="plus icon"></i>添加个人账户</router-link>
                        </div>
                    </div>
                    <div class="ui tab" data-tab="second">
                        <div class="ui four column doubling stackable grid" v-if="walletInfo.businessAccount.length > 0">
                            <div class="column" v-for="(item,$index) in walletInfo.businessAccount" v-if="item.status !== 'deleted'">
                                <div class="bankCard p-lg text-white" :class="'bg'+(($index+1)%4 || 4)">
                                    <div class="ui relaxed list">
                                        <div class="item">{{item.companyName}}</div>
                                        <div class="item">**** **** **** {{item.bankAccount.slice(-4)}}</div>
                                        <div class="item f16">{{item.bankName}}</div>
                                    </div>
                                    <div class="modify">
                                        <router-link :to="{path:'/bankCardEnterprise',query:{accountId:item.accountId}}">修改</router-link> | <a href="javascript:;" @click="deleteLayer('business', item.accountId)">删除</a></div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center space-md" v-if="walletInfo.businessAccount.length === 0">
                            <router-link :to="{path:'/bankCardEnterprise'}" class="big ui button teal"><i class="plus icon"></i>添加企业账户</router-link>
                        </div>
                    </div>
                    <div class="ui tab" data-tab="third">
                        <div class="ui four column doubling stackable grid" v-if="walletInfo.paypalAccount.length > 0">
                            <div class="column" v-for="(item,$index) in walletInfo.paypalAccount" v-if="item.status !== 'deleted'">
                                <div class="bankCard bg5 p-lg text-white">
                                    <div class="ui relaxed list">
                                        <div class="item lh-default">
                                            <div class="space-lg f18 text-hide">{{item.account}}</div>
                                        </div>
                                    </div>
                                    <div class="modify"><a href="javascript:;" @click="modifyPaypal(item)">修改</a> | <a href="javascript:;" @click="deleteLayer('paypal', item.accountId)">删除</a></div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center space-md" v-if="walletInfo.paypalAccount.length === 0">
                            <a class="big ui button teal" @click="paypalLayer = 'paypalLayerView'"><i class="plus icon"></i>添加贝宝账户</a>
                        </div>
                    </div>
                </div>
                <div class="ui divider hidden"></div>
                <div class="block-tab">
                    <div class="ui two item secondary left menu f16" id="record">
                        <a class="item active" data-tab="transaction"><span><i class="icon-zhifu iconfont icon"></i>交易记录</span></a>
                        <a class="item" data-tab="withdrawals"><span><i class="icon-qianbao1 iconfont icon"></i>提现记录</span></a>
                    </div>
                    <div class="ui active tab" data-tab="transaction">
                        <div class="ui form">
                            <div class="inline fields">
                                <!-- <div class="field">
                                    <div class="ui left icon input">
                                        <input type="text" placeholder="输入活动名称" v-model="transaction.activityName" @change="getTransactionRecord(1)"> <i class="search icon"></i></div>
                                </div> -->
                                <div class="field">
                                    <label for="">交易时间</label>
                                </div>
                                <div class="field">
                                    <datePickerView :date="transaction.startTime"  placeholder="开始时间" v-on:input="setEndTime(arguments[0],'transaction','startTime')" :option="option"></datePickerView>
                                </div>
                                <div class="field">
                                    -
                                </div>
                                <div class="field">
                                    <datePickerView :date="transaction.endTime"  placeholder="结束时间" v-on:input="setEndTime(arguments[0],'transaction','endTime')" :option="option"></datePickerView>
                                </div>
                                <!-- <div class="field">
                                    <select class="ui dropdown"  v-model="transaction.transactionStatus" @change="getTransactionRecord(1)">
                                        <option value="0">全部状态</option>
                                        <option value="1">交易成功</option>
                                        <option value="2">交易中</option>
                                        <option value="3">交易失败</option>
                                    </select>
                                </div> -->
                            </div>
                        </div>
                        <div class="create-border">
                            <table class="ui padded table tablet stackable">
                                <thead>
                                    <tr>
                                        <th>类型</th>
                                        <th>订单号/交易时间</th>
                                        <th>交易方</th>
                                        <th>支付金额</th>
                                        <th>手续费</th>
                                        <!-- <th>实收金额</th> -->
                                        <!-- <th>状态</th> -->
                                    </tr>
                                </thead>
                                <tbody class="f12">
                                    <tr v-if="transactionRecords.length !== 0" v-for="item in transactionRecords">
                                        <td>{{item.eventName}}
                                            <br>
                                            <label class="ui label little green basic">{{item.type | filterType}}</label>
                                            <!-- <label class="ui label little green">参会报名费</label> -->
                                        </td>
                                        <td><a>{{item.orderId}}</a>
                                            <br>{{item.cTime | filterTime}}</td>
                                        <td>{{item.transactionName}}</td>
                                        <td class="f14">￥{{item.amount}}</td>
                                        <td class="f14">￥{{item.eventdoveNetIncome}}</td>
                                        <!-- <td class="f14">+￥5200.00</td> -->
                                        <!-- <td>交易成功</td> -->
                                    </tr>
                                </tbody>
                            </table>
                            <div v-if="transactionRecords.length === 0" class="text-center mt-lg mb-lg">
                            <img class="ui image medium centered" src="/images/no_centent.png" alt="没有找到相关内容"><p>暂无交易记录</p></div>
                        </div>
                        <div class="ui borderless primary  menu mt-md">
                            <pageView ref="pageView" @gotoPage="getTransactionRecord"></pageView>
                        </div>
                    </div>
                    <div class="ui  tab" data-tab="withdrawals">
                        <div class="ui form">
                            <div class="inline fields">
                                <div class="field">
                                    <label for="">交易时间</label>
                                </div>
                                <div class="field">
                                    <datePickerView :date="withdraw.startTime"  placeholder="开始时间" v-on:input="setEndTime(arguments[0],'withdraw','startTime')" :option="option"></datePickerView>
                                </div>
                                <div class="field">
                                    -
                                </div>
                                <div class="field">
                                    <datePickerView :date="withdraw.endTime"  placeholder="结束时间" v-on:input="setEndTime(arguments[0],'withdraw','endTime')" :option="option"></datePickerView>
                                </div>
                                <!-- <div class="field">
                                    <select class="ui dropdown">
                                        <option value="0">全部状态</option>
                                        <option value="1">交易成功</option>
                                        <option value="2">交易中</option>
                                        <option value="3">交易失败</option>
                                    </select>
                                </div> -->
                            </div>
                        </div>
                        <div class="create-border">
                            <table class="ui padded table tablet stackable">
                                <thead>
                                    <tr>
                                        <th>流水号</th>
                                        <th>时间</th>
                                        <th>金额来源</th>
                                        <th>提现金额</th>
                                        <th>提现卡</th>
                                        <th>状态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="cashRegister.length !== 0" v-for="item in cashRegister">
                                        <td>{{item.withdrawNo}}</td>
                                        <td>{{item.utime | filterTime}}</td>
                                        <td>{{item.refName}}（{{item.withdrawType === 'MEMBER'?'会员订单':'门票订单'}})</td>
                                        <td class="text-teal">{{item.currency}}{{item.withdrawAmount}}</td>
                                        <td>（{{item.accountType==='personal'?'个人':'对公'}}）{{item.bankAccount.substring(0,4)}} **** **** {{item.bankAccount.slice(-4)}}</td>
                                        <td>{{item.status | filterStatus}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-if="cashRegister.length === 0" class="text-center mt-lg mb-lg"><img class="ui image medium centered" src="/images/no_centent.png" alt="没有找到相关内容"><p>暂无提现记录</p></div>
                        </div>
                        <div class="ui borderless primary  menu mt-md">
                            <pageView ref="pageView2" @gotoPage="getWithdraw"></pageView>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <snap></snap>
        <footers></footers>
        <div class="ui small basic test modal cancel-release-layer">
            <div class="ui icon header"><i class="idea icon"></i> 您确定要删除该账户吗？ </div>
            <div class="actions">
                <div class="ui green ok inverted button"><i class="checkmark icon"></i> 确定 </div>
                <div class="ui red basic cancel inverted button"><i class="remove icon"></i> 取消 </div>
            </div>
        </div>
        <myComponent :is="paypalLayer" @updateLayerFlag="paypalLayer = '',paypalAccount = {}" :item="paypalAccount" @getWallet="mywallet"></myComponent>
    </div>
</template>
<script>
import {
    API_URL
} from '../config'
import moment from 'moment'
import myDatepicker from '../components/vue-datepicker'
import header from '../components/header'
import footer from '../components/footer'
import page from '../components/page'
import paypalLayer from './paypalLayer'
export default {
    verify: true,
    data() {
        return {
            accountInfo: {},
            walletInfo: {
                personalAccount: [],
                businessAccount: [],
                paypalAccount: []
            },
            transactionRecords: [],
            cashRegister: [],
            transaction: {
                startTime: '',
                endTime: ''
            },
            withdraw: {
                startTime: '',
                endTime: ''
            },
            //日历控件
            option: {
                type: 'day',
                format: 'YYYY-MM-DD',
                language: 'zhCn',
                inputStyle: {},
                color: {
                    header: '#ccc',
                    headerText: '#f00'
                },
                overlayOpacity: 0.5, // 0.5 as default
                dismissible: true // as true as default
            },
            allPage1: 1,
            allPage2: 1,
            paypalLayer: this.$route.query.createPaypal || '',
            paypalAccount: {}
        }
    },
    filters: {
        // 过滤交易类型
        filterType(type) {
            switch (type) {
                case 'MEMBER':
                    return '会员充值订单';
                case 'TICKET':
                    return '门票订单';
                case 'SMS':
                    return '短信充值订单';
                case 'EMAIL':
                    return '邮件充值订单';
                case 'UNKNOWN':
                    return '未知类型订单';
                case 'REFUND_TICKET':
                    return '退票费用类型';
                case 'WITHDRAWALS':
                    return '提现类型';
                case 'SEND_SMS':
                    return '短信扣费类型';
                case 'SEND_EMAIL':
                    return '邮件扣费类型';
                case 'EVENT_SEND_EMAIL':
                    return '活动邮件扣费类型';
                case 'REFUND_SMS':
                    return '短信退费类型';
            }
        },
        // 格式化后台返回的时间
        filterTime(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
        // 提现状态
        filterStatus(status) {
            switch (status) {
                case 'submitApplication':
                    return '提交提现申请';
                case 'success':
                    return '提现成功';
                case 'fail':
                    return '提现失败';
            }
        },
        // 保留小数位
        filterToFixed (val,n) {
            if (val) {
                return val.toFixed(n);
            } else {
                return 0;
            }
        }
    },
    mounted() {
        //$('.ui.dropdown').dropdown();
        $('#card .item').tab({
            onLoad: function() {
                $(this).find('.ui.four.column').transition('fade left in')
            }
        });
        $('#record .item').tab({
            onLoad: function() {
                $(this).find('.create-border').transition('slide down in')
            }
        });

        this.myaccount();
        this.mywallet();

        this.getTransactionRecord(1);
        this.getWithdraw(1);
    },
    watch: {
        allPage1(o, n) {
            this.$refs.pageView.setpageData({
                currentPage: 1,
                showItem: 5,
                allPage: o
            });
        },
        allPage2(o, n) {
            this.$refs.pageView2.setpageData({
                currentPage: 1,
                showItem: 5,
                allPage: o
            });
        }
    },
    methods: {
        // 我的账号信息
        myaccount() {
            $.ajax({
                url: API_URL + "/user/detail",
                type: "GET"
            })
            .done((data, textStatus, jqXHR) => {
                this.accountInfo = data;
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        },
        // 我的钱包信息
        mywallet() {
            $.ajax({
                url: API_URL + "/wallet/getWalletDetail",
                type: "GET"
            })
            .done((data, textStatus, jqXHR) => {
                this.walletInfo = $.extend(true,{},this.walletInfo ,data);
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                if (JSON.parse(jqXHR.responseText).errorCode === 1) {
                    this.paypalLayer = 'paypalLayerView';
                } else {
                    this.$message(JSON.parse(jqXHR.responseText).responseText);
                }
            });
        },
        // 获取交易记录
        getTransactionRecord(curPage) {
            $.ajax({
                url: API_URL + "/transaction/getTransactionRecordList",
                type: "GET",
                data: {
                    "page": curPage,
                    "limit": "20",
                    "total": "-1",
                    "endDate": this.transaction.endTime,
                    "orderNumber": '',
                    "startDate": this.transaction.startTime
                }
            })
            .done((data, textStatus, jqXHR) => {
                this.transactionRecords = data.items;
                this.allPage1 = data.totalPage;
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        },
        // 获取提现记录
        getWithdraw(curPage) {
            $.ajax({
                url: API_URL + "/transaction/getWithdrawList",
                type: "GET",
                data: {
                    "page": curPage,
                    "limit": "20",
                    "total": "-1",
                    "endDate": this.withdraw.endTime,
                    "withdrawNo": "TX201704276763824849",
                    "startDate": this.withdraw.startTime
                }
            })
            .done((data, textStatus, jqXHR) => {
                this.cashRegister = data.items;
                this.allPage2 = data.totalPage;
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        },
        setEndTime(arg, key, key2) {
            this[key][key2] = arg;
            (parseInt(new Date(this[key].endTime).getTime()) - parseInt(new Date(this[key].startTime).getTime()) <= 0) ?
            this.$message.error('开始时间不能大于结束时间'): '';
            if (key === 'transaction') {
                this.getTransactionRecord(1);
            } else if (key === 'withdraw') {
                this.getWithdraw(1);
            }
        },
        // 删除个人账户
        del(obj, accountId) {
            let url = '';
            if (obj === 'personal') {
                url = '/wallet/deletePersonalAccountById';
            } else if (obj === 'business') {
                url = '/wallet/deleteBusinessAccountById';
            } else if (obj === 'paypal') {
                url = '/wallet/deletePaypalAccountById';
            }
            jQuery.ajax({
                url: API_URL + url,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "accountId": accountId
                })
            })
            .done((data, textStatus, jqXHR) => {
                this.$message('删除成功');
                this.mywallet();
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        },
        // 调用删除弹窗
        deleteLayer(obj, accountId) {
            let _this = this;
            $('.cancel-release-layer.modal').modal({
                onApprove: function() {
                    _this.del(obj, accountId);
                    return true;
                }
            }).modal('show');
        },
        // 修改贝宝账户
        modifyPaypal(item) {
            this.paypalLayer = 'paypalLayerView';
            this.paypalAccount = item;
        }
    },
    components: {
        headers: header,
        footers: footer,
        pageView: page,
        datePickerView: myDatepicker,
        paypalLayerView: paypalLayer,
         snap: function(resolve) {
            //异步组件写法
            require(['../components/html2canvas'], resolve)
        }
    }
}
</script>
<style scoped>
.card-wrap {
    position: relative;
}

.card-main {
    overflow: hidden;
}

.card-wrap .chevron.icon {
    font-size: 24px;
    font-weight: normal;
    cursor: pointer;
    top: 45px;
    color: #949699;
}

.card-wrap .chevron.icon:hover {
    color: #0099ff;
}

.card-wrap .chevron.left.icon {
    position: absolute;
    left: 5px;
}

.card-wrap .chevron.right.icon {
    position: absolute;
    right: 5px;
}

.card-items>.item {
    width: 240px;
    height: 144px;
    float: left;
    margin: 0 20px 0 0;
}

.bankCard {
    border-radius: 5px;
    background-image: url(/images/qb-bg1.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    min-height: 150px;
}

.modify {
    position: absolute;
    right: 1em;
    bottom: 1em;
    display: none;
}

.bankCard:hover .modify {
    display: block;
}

.bankCard a {
    color: #fff;
}

.bankCard a:hover {
    opacity: 0.8;
}

.bankCard.bg1 {
    background-image: url(/images/qb-bg1.png)
}

.bankCard.bg2 {
    background-image: url(/images/qb-bg2.png)
}

.bankCard.bg3 {
    background-image: url(/images/qb-bg3.png)
}

.bankCard.bg4 {
    background-image: url(/images/qb-bg4.png)
}

.bankCard.bg5 {
    background-image: url(/images/qb-bg5.jpg)
}
</style>
