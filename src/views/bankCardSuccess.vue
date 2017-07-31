<template>
<div class="event-view">
    <headers></headers>
    <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn"><span class="text-muted f16">我的钱包</span>/添加账户结果</h2>
                </div>
                <div class="white-wrap p-lg">
                    <div class="ui items">
                        <div class="item">
                            <div class="ui tiny image">
                                <img src="/images/succes-01.png" alt="">
                            </div>
                            <div class="content">
                                <div class="header">银行卡绑定成功</div>
                                <div class="meta space-md">
                                    <p>账户类型：{{$route.query.type}}</p>
                                    <p>银行：{{$route.query.bankName}}</p>
                                    <p>银行卡号：{{$route.query.bankAccount}}</p>
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
