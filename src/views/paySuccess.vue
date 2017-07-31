<template>
    <div class="event-wrap">
        <headerSimple>
            <template slot="left-nav">
                <span class="item f16 noLine">收银台</span>
            </template>
        </headerSimple>
        <div class="event-main pusher">
        <div class="ui container">
            <div class="ui doubling stackable vertically padded grid">
                <div class="column">
                    <div class="white-wrap p-lg" v-if="$route.query.type === 'sms'">
                        <div class="ui items">
                            <div class="item">
                                <div class="ui mob-img tiny image">
                                   <img src="/images/succes-01.png" alt="">
                                </div>
                                <div class="content">
                                    <div class="header">充值成功！</div>
                                    <div class="meta">
                                        <span>您已成功充值{{$route.query.rechargeNumber}}条短信，当前短信余额{{wallet.balanceSMS}}条。</span>
                                    </div>
                                    <div class="description space-md">
                                        <p>订单号：{{$route.query.orderNumber}}</p>
                                    </div>
                                    <router-link class="ui button blue" to="/myEvent">我的活动</router-link><router-link class="ui button blue basic" to="/">返回首页</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui divider hidden"></div>
                    <div class="white-wrap p-lg" v-if="$route.query.type === 'email'">
                        <div class="ui items">
                            <div class="item">
                                <div class="ui mob-img tiny image">
                                   <img src="/images/succes-01.png" alt="">
                                </div>
                                <div class="content">
                                    <div class="header">充值成功！</div>
                                    <div class="meta">
                                        <span>您已成功充值{{$route.query.rechargeNumber}}条邮件，当前邮件余额{{wallet.balanceEmail}}条。</span>
                                    </div>
                                    <div class="description space-md">
                                        <p>订单号：{{$route.query.orderNumber}}</p>
                                    </div>
                                    <router-link class="ui button blue" to="/myEvent">我的活动</router-link><router-link class="ui button blue basic" to="/">返回首页</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="ui divider hidden"></div>
                    <div class="white-wrap p-lg">
                        <div class="ui items">
                            <div class="item">
                                <div class="ui mob-img tiny image">
                                   <img src="/images/succes-01.png" alt="">
                                </div>
                                <div class="content">
                                    <div class="header">支付成功，您已成功开通会鸽专业版！</div>
                                    <div class="meta">
                                        <span>您以成功将【第十届中国互联网安全大会】升级为会鸽专业版活动，更多VIP功能等你来使用！</span>
                                    </div>
                                    <div class="description space-md">
                                        <p>订单号：214985583</p>
                                    </div>
                                    <a class="ui button blue" >我的活动</a><a class="ui button blue basic" >返回首页</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui divider hidden"></div>
                    <div class="white-wrap p-lg">
                        <div class="ui items">
                            <div class="item">
                                <div class="ui mob-img tiny image">
                                   <img src="/images/succes-01.png" alt="">
                                </div>
                                <div class="content">
                                    <div class="header">支付成功，您已成功开通会鸽至尊版！</div>
                                    <div class="meta">
                                        <span>您的账号已升级为至尊版，到期时间为：2019-09-02, 更多VIP功能等你来使用！</span>
                                    </div>
                                    <div class="description space-md">
                                        <p>订单号：214985583</p>
                                    </div>
                                    <a class="ui button blue" >我的活动</a><a class="ui button blue basic" >返回首页</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui divider hidden"></div> -->
                </div>
            </div>
        </div>
    </div>
        <footers></footers>
    </div>
</template>
<script>
import {
    API_URL
} from '../config'
import headerSimple from '../components/header_simple'
import footer from '../components/footerPay'
export default {
    data() {
        return {
            wallet:{}
        }
    },
    mounted() {
        this.mywallet();
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
        }
    },
    components: {
        headerSimple,
        footers: footer,
    }
}
</script>
<style scoped>
    @media only screen and (max-width: 767px) {

        .p-lg{
            padding: 1em !important;
        }
        .ui.divider{
            margin: .5rem 0;
        }

    }

</style>
