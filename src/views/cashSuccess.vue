<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn"><span class="text-muted f16">我的钱包</span>/提现</h2>
                </div>
                <div class="white-wrap p-lg">
                    <div class="ui items">
                        <div class="item">
                            <div class="ui tiny image">
                                <img src="/images/succes-01.png" alt="">
                            </div>
                            <div class="content">
                                <div class="header">提现申请已提交成功</div>
                                <div class="meta">
                                    <span>提示：提现到账时间预计在2-7个工作日内到账，如有疑问请联系我们：400-779-6266.</span>
                                </div>
                                <div class="description space-md">
                                    <p>如需会鸽开具系统手续费发票事项，请联系我们400-779-6266</p>
                                </div>
                                <router-link class="ui button blue basic" :to="{path: '/wallet'}" replace>返回我的钱包</router-link>
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
import {
    API_URL
} from '../../config'
import header from '../components/header'
import footer from '../components/footer'
export default {
    data() {
            return {

            }
        },
        mounted() {

        },
        methods: {
            //续费
            renew: function() {

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
