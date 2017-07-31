<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn"><span class="text-muted f16">我的钱包</span>/提现</h2>
                    <a href="#" class="ui basic button blue mini" @click="$router.go(-1)">返回</a>
                </div>
                <div class="white-wrap p-lg">
                    <div class="ui grid">
                        <div class="equal row">
                            <div class="two wide middle aligned column">本次提现金额:</div>
                            <div class="thirteen wide column"><span class="f24 text-red"><small>￥</small>{{cashInfo.availableCashTotalAmount | filterToFixed(2)}}</span>元</div>
                        </div>
                        <div class="equal row">
                            <div class="two wide column">选择提现银行卡:</div>
                            <div class="thirteen wide column">
                                <h4 v-show="walletInfo.personalAccount.length">个人账户</h4>
                                <div class="ui four column grid" v-show="walletInfo.personalAccount.length">
                                    <div class="column" v-for="(item,$index) in walletInfo.personalAccount">
                                        <div class="pay-box" @click="selectAccount('personal',$index,item)" :class="{'checked':checked==='personal'+$index}">
                                            <div class="ui middle aligned list">
                                                <div class="item">
                                                    <!-- <img class="ui avatar image" src="/images/CMB.png"> -->
                                                    <div class="content">
                                                        <div class="header">{{item.bankName}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="f16">{{item.bankAccount | filterAccount}}</div class="f16">
                                            <i class="iconfont icon-mark-right-top corner"></i>
                                        </div>
                                    </div>
                                </div>
                                <h4 v-show="walletInfo.businessAccount.length">企业账户</h4>
                                <div class="ui four column grid" v-show="walletInfo.businessAccount.length">
                                    <div class="column" v-for="(item,$index) in walletInfo.businessAccount">
                                        <div class="pay-box" @click="selectAccount('business',$index,item)" :class="{'checked':checked==='business'+$index}">
                                            <div class="ui middle aligned list">
                                                <div class="item">
                                                    <!-- <img class="ui avatar image" src="/images/CMB.png"> -->
                                                    <div class="content">
                                                        <div class="header">{{item.bankName}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="f16">{{item.bankAccount | filterAccount}}</div class="f16">
                                            <i class="iconfont icon-mark-right-top corner"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-muted mt-sm">提示：提现到账时间预计在2-7个工作日内到账，如有疑问请联系我们：400-779-6266</div>
                            </div>
                        </div>
                        <div class="equal row">
                            <div class="two wide middle aligned column">提现密码: </div>
                            <div class="thirteen wide column ui form">
                                <div class="inline field">
                                    <input type="password" placeholder="输入提现密码" v-model="cashOpt.password" v-vali="JSON.stringify({required:true})" filed="cashOpt.password">
                                    <div v-if="$verify.$errors['cashOpt.password']" class="ui red basic label">
                                        {{$verify.$errors['cashOpt.password']}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="equal row">
                            <div class="two wide column"></div>
                            <div class="thirteen wide column">
                                <button class="ui button blue large" @click="cash">提交</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footers></footers>
    </div>
</template>
<script>
import Auth from '../auth'
import {
    API_URL
} from '../config'
import header from '../components/header'
import footer from '../components/footer'
export default {
    verify:true,
    data() {
        return {
            cashInfo: JSON.parse(this.$route.query.cashInfo),
            walletInfo: {
                personalAccount: [],
                businessAccount: []
            },
            checked: '',
            cashOpt: {}
        }
    },
    mounted() {
        this.mywallet();
    },
    filters: {
        filterAccount (acc) {
            return acc.substring(0,4)+'********'+acc.slice(-4);
        },
        // 保留小数位
        filterToFixed(data, n) {
            return data.toFixed(n);
        }
    },
    methods: {
        // 选择账号
        selectAccount (type,acc,item) {
            this.checked = type+acc;

            this.cashOpt.bankAccount = item.bankAccount;
            this.cashOpt.accountId = item.accountId;
            this.cashOpt.accountType = type;

            this.cashOpt.transactionRecords = this.cashInfo.transactionRecords;
            this.cashOpt.refId = this.cashInfo.refId;
            this.cashOpt.transactionType = this.cashInfo.transactionType;
            this.cashOpt.refName = this.cashInfo.refName;
            this.cashOpt.currency = this.cashInfo.currency;
            this.cashOpt.walletId = this.walletInfo.id;
            this.cashOpt.withdrawAmount = JSON.stringify(this.cashInfo.availableCashTotalAmount);
        },
        // 我的钱包信息
        mywallet () {
            $.ajax({
                url: API_URL + "wallet/getWalletDetail",
                type: "GET"
            })
            .done((data, textStatus, jqXHR) => {
                Object.assign(this.walletInfo, data);
                console.log(this.walletInfo)
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        },
        // 提现
        async cash () {
            try {
                await this.$verify.check().then()
            } catch (e) {
                return false
            }
            if (!this.cashOpt.refId) {
                this.$message('请选择提现账户！');
                return;
            }
            $.ajax({
                url: API_URL + "transaction/submitCashApplication",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(this.cashOpt)
            })
            .done((data, textStatus, jqXHR) => {
                this.$router.push({path:'/cashSuccess'});
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        }
    },
    components: {
        headers: header,
        footers: footer,
    }
}
</script>
<style scoped>
</style>
