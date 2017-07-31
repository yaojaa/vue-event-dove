<template>
    <div class="event-view">
        <headerSimple>
            <template slot="left-nav">
                <span class="item f16 noLine">收银台</span>
            </template>
        </headerSimple>
        <div class="event-main pusher">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn">{{chargeName}}充值</h2>
                <a class="ui basic button blue mini" @click="$router.go(-1)">返回</a>
            </div>
            <div class="white-wrap p-lg">
                <div class="ui message">
                    <div class="header f14">
                        温馨提示：
                    </div>
                    <ul class="list" v-if="chargeType === 'sms'">
                        <li>购买短信不开具发票，并且不可退款；</li>
                        <li>由于短信运行商控制严格，为了防止短信发送失败，短信只接受固定格式。</li>
                    </ul>
                    <ul class="list" v-if="chargeType === 'email'">
                        <li>购买邮件不开具发票，并且不可退款；</li>
                    </ul>
                </div>
                <div class="ui divider hidden"></div>
                <div class="ui grid">
                    <div class="row">
                        <div class="two wide column middle aligned">当前{{chargeName}}剩余：</div>
                        <div class="thirteen wide column">
                            <span class="f20 text-yellow number">{{chargeType === 'sms' ? wallet.balanceSMS : wallet.balanceEmail}}</span>条
                        </div>
                    </div>
                    <div class="row">
                        <div class="two wide column middle aligned">选择充值条数：</div>
                        <div class="thirteen wide column">
                            <button class="ui button basic" :class="{'blue': rechargeNumber === '1000'}" @click="rechargeNumber = '1000'">1000条</button>
                            <button class="ui button basic" :class="{'blue': rechargeNumber === '5000'}" @click="rechargeNumber = '5000'">5000条</button>
                            <button class="ui button basic" :class="{'blue': rechargeNumber === '10000'}" @click="rechargeNumber = '10000'">10000条</button>
                            <div class="ui right labeled focus input ">
                                <input type="text" placeholder="自字义条数" v-model="rechargeNumber">
                                <div class="ui basic label fwn">
                                    条
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="two wide column middle aligned">支付金额：</div>
                        <div class="thirteen wide column">
                            <span class="f24 text-red number"><small>￥</small>{{totalPrice}}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="two wide column middle aligned"></div>
                        <div class="thirteen wide column">
                            <button class="ui button blue large payment-btn" :class="{'disabled': !isClick}" @click="addOrder">立即支付</button>
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
import {API_URL} from '../config'
import headerSimple from '../components/header_simple'
import footer from '../components/footerPay'
export default {
    data() {
        return {
            wallet: {},
            chargeType: this.$route.query.type,
            rechargeNumber: '',
            MIN_RECHARGE_NUMBER: 1
        }
    },
    mounted() {
        this.mywallet();
    },
    computed: {
        chargeName () {
            switch (this.chargeType) {
                case 'sms':
                    return '短信';
                case 'email':
                    return '邮件';
            }
        },
        singlePrice () {
            switch (this.chargeType) {
                case 'sms':
                    return 0.1;
                case 'email':
                    return 0.01;
            }
        },
        totalPrice () {
            return (this.rechargeNumber * this.singlePrice).toFixed(2);
        },
        isClick () {
            return this.rechargeNumber?true:false;
        }
    },
    methods: {
        /**
         * [mywallet 我的钱包信息]
         * @return {[type]} [description]
         */
        mywallet() {
            $.ajax({
                url: API_URL + "/wallet/getWalletDetail",
                type: "GET"
            })
            .done((data, textStatus, jqXHR) => {
                this.wallet = data;
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        },
        /**
         * [addOrder 创建短信充值订单]
         */
        addOrder () {
            if (this.rechargeNumber < this.MIN_RECHARGE_NUMBER) {
                this.$message(`购买数量不能小于${this.MIN_RECHARGE_NUMBER}`);
                return;
            }

            let url = '';
            if (this.chargeType === 'sms') {
                url = '/notice/addSmsOrder';
            } else {
                url = '/notice/addEmailOrder';
            }
            $.ajax({
                url: API_URL + url, 
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "rechargeNumber": this.rechargeNumber,
                    "totalPrice": this.totalPrice
                })
            })
            .done((data, textStatus, jqXHR) => {
                this.$router.push({path:'/rechargePay/'+data.id,query:{type: this.chargeType}})
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        }

    },
    components: {
        headerSimple,
        footers: footer,
    }
}
</script>
<style scoped>
</style>
