<template>
    <div class="event-wrap white-wrap">
        <div class="ui  container">
            <div class="ui vertically divided  doubling stackable vertically padded middle aligned grid event-ticket">
                <div class="equal row">
                    <div class="eight wide column information">
                        <h4 class="ui header">早鸟票</h4>
                        <p class="text-info"><span class="date">截止日期：2017年1月11日</span><a class="more" href="#">查看说明</a></p>
                        <p class="f12 text-muted">门票说明：享受VIP一切权益并包含自助午餐</p>
                    </div>
                    <div class="five wide column isfree">免费
                        <br>
                    </div>
                    <div class="three wide column count">
                        <div class="spinner">
                            <button type="button" class="decrease remove" disabled="disabled"><i class="minus square outline icon"></i></button>
                            <input type="text" class="spinner spinner-input value" maxlength="3" name="" value="0">
                            <button type="button" class="increase add"><i class="plus square outline icon"></i></button>
                        </div>
                    </div>
                </div>
                <div class="equal row active">
                    <div class="eight wide column information">
                        <h4 class="ui header">早鸟票</h4>
                        <p class="text-info"><span class="date">截止日期：2017年1月11日</span><a class="more" href="#">查看说明</a></p>
                        <p class="f12 text-muted hide">门票说明：享受VIP一切权益并包含自助午餐</p>
                    </div>
                    <div class="five wide column isfree">￥1200.00
                        <br>
                        <div class="price-info text-red f12">购买5张及以上，赠送1张</div>
                        <div class="price-info text-red f12">购买5张及以上，每张可优惠￥12元</div>
                    </div>
                    <div class="three wide column count">
                        <div class="spinner">
                            <button type="button" class="decrease remove"><i class="minus square outline icon"></i></button>
                            <input type="text" class="spinner spinner-input value" maxlength="3" name="" value="5">
                            <button type="button" class="increase add"><i class="plus square outline icon"></i></button>
                        </div>
                        <p class="text-red f12">最多可买5张</p>
                    </div>
                </div>
                <div class="equal row">
                    <div class="eight wide column information">
                        <h4 class="ui header">早鸟票</h4>
                        <p class="text-info"><span class="date">截止日期：2017年1月11日</span><a class="more" href="#">查看说明</a></p>
                        <p class="f12 text-muted hide">门票说明：享受VIP一切权益并包含自助午餐</p>
                    </div>
                    <div class="five wide column isfree">￥1200.00
                        <br>
                        <div class="price-info text-red f12">购买5张及以上，赠送1张</div>
                        <div class="price-info text-red f12">购买5张及以上，每张可优惠￥12元</div>
                    </div>
                    <div class="three wide column count">
                        <label class="ui label mini">已卖完</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui tablet mobile only padded grid white-wrap event-footer">
            <div class="ui button blue large fluid">立即购票</div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
export default {
    data() {
            return {

            }
        },
        mounted() {
            $(function() {
                // $('#header').hide()
            })
        },
        methods: {
            //续费
            renew: function() {

            }
        },
        components: {

        }
}
</script>
<style scoped>
/*.event-wrap>.ui.container{
        margin: 0 !important;
}*/

.event-wrap {
    margin-bottom: 30px;
}

.event-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #dce0ed;
}

.event-footer .button {
    border-radius: 0;
    width: 100%;
    margin: 0;
}

@media only screen and (max-width: 767px) {}
</style>
