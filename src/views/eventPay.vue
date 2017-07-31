<template>
    <div class="event-wrap">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn">确认支付</h2>
                <div class="text-muted"><i class="iconfont icon-imgtime icon text-teal"></i>等待付款：<span class="text-yellow">剩余23时56分</span></div>
            </div>
            <div class="white-wrap p-lg">
                <div class="ui doubling stackable grid">
                    <div class="twelve wide column">
                        <div class="ui list">
                            <div class="item">收款方 ：会鸽(海震科技)</div>
                            <div class="item">付款用途：【we are 伐木累】 【群组充值】</div>
                            <div class="item">订单号：201612150001744200</div>
                        </div>
                    </div>
                    <div class="four wide  middle aligned text-right column">
                        <span class="f24 text-red"><small>￥</small>450.00</span>
                    </div>
                </div>
            </div>
            <div class="ui divider hidden"></div>
            <div class="block-tab">
                <div class="ui four item secondary left menu f16">
                    <a class="item active" data-tab="first"><span><i class="icon-zhifu iconfont icon"></i>线上支付</span></a>
                    <a class="item" data-tab="second"><span><i class="icon-xianxia iconfont icon"></i>线下支付</span></a>
                </div>
                <div class="ui active tab" data-tab="first">
                    <div class="ui five column doubling grid bank-main">
                        <div class="row">
                            <div class="column">
                                <div class="bank-box  checked"><span class="bank-logo" id="bank-alipay">支付宝</span><i class="iconfont icon-mark-right-top corner"></i></div>
                            </div>
                            <div class="column">
                                <div class="bank-box"><span class="bank-logo" id="bank-wx">微信</span><i class="iconfont icon-mark-right-top corner"></i></div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-icbc">工商银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-ccb">建设银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-cmb">招商银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-abc">农业银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-bcom">交通银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-gdb">广发银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-boc">中国银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-cmbc">中国民生银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-hxb">华夏银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-cib">兴业银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-ceb">中国光大银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-post">邮政储蓄</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-citic">中信银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-shb">上海银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-spdb">浦发银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-bob">北京银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-cbhb">渤海银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-pab">平安银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                        <div class="column">
                            <div class="bank-box"><span class="bank-logo" id="bank-njcb">南京银行</span><i class="iconfont icon-mark-right-top corner"></i></div>
                        </div>
                    </div>
                </div>
                <div class="ui  tab" data-tab="second">
                    <div class="ui form">
                        <div class="inline fields">
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="fruit" checked="" tabindex="0" class="hidden">
                                    <label>线下转账</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="fruit" tabindex="0" class="hidden">
                                    <label>现场缴费</label>
                                </div>
                            </div>
                        </div>
                        <div class="ui icon yellow message">
                            <i class="info circle icon"></i>
                            <div class="content">
                            <div class="header">提示</div>
                            <p>采用线下付款方式，您的位子不会被锁定。组织者收到您的付款之后，如仍有余位，电子票才会通过电子邮件发送给您。请您确认选择线下付款！</p>
                            </div>
                        </div>
                        <div class="ui icon message">
                            <i class="iconfont icon-yinhanghuikuan icon teal"></i>
                            <div class="content">
                                <div class="ui list">
                                    <div class="item">汇款账户 1</div>
                                    <div class="item">账号名称：<strong>李辉</strong></div>
                                    <div class="item">开户银行：<strong>中国银行</strong></div>
                                    <div class="item">银行帐号：<strong>3406211111</strong></div>
                                    <div class="item text-muted">注:汇款完毕后，请将汇款凭证发送至传真：11</div>
                                </div>
                            </div>
                        </div>
                        <div class="ui icon yellow message">
                            <i class="info circle icon"></i>
                            <div class="content">
                            <div class="header">提示</div>
                            <p>采用现场缴费付款方式，您的位子不会被锁定。请您确认选择现场缴费！</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="space-lg text-right">
                <button class="ui button blue large payment-btn">立即支付</button>
            </div>
        </div>
        <footers></footers>
        <div class="ui mini modal" id="wx-pay">
             <i class="close icon"></i>
            <div class="header">
                微信支付
            </div>
            <div class="content text-center">
                <p class="text-muted">距离二维码过期还剩<span class="text-red">42</span>秒，过期后请刷新页面重新获取二维码。</p>
                <p class="text-red">二维码已过期，<a href="">刷新</a>重新获取二维码。</p>
                <img src="/images/wx-code.jpg" alt="" class="ui medium bordered image centered">
                <p class="space-sm">请使用微信<span class="text-blue">扫一扫</span>扫描二维码支付</p>
            </div>
        </div>
        <div class="ui small basic text-center modal" id="overtime">
          <div class="ui icon header">
            <i class="wait icon"></i>
            超时提示
          </div>
          <div class="content">
            <p>您以超过时限，您的订单已取消。对您带来的不便，我们深表歉意！</p>
          </div>
          <div class="actions text-center">
            <div class="ui green ok inverted button">
              <i class="checkmark icon"></i>
              确定
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
import footer from '../components/footerPay'
export default {
    data() {
            return {

            }
        },
        mounted() {
            $('.menu .item').tab()
            $('#overtime').modal('attach events', '.payment-btn')
            $('#wx-pay').modal()
        },
        methods: {
            //续费
            renew: function() {

            }
        },
        components: {
            footers: footer,
        }
}
</script>
<style scoped>
    @import "../assets/css/bankList.css";
    .ui.grid.bank-main>.column:not(.row),.ui.grid.bank-main>.row{
        padding-top: .5rem !important;
        padding-bottom: .5rem !important;
    }
    @media only screen and (max-width: 767px) {
        .p-lg{
            padding: 1em !important;
        }
        .ui.divider{
            margin: .5rem 0;
        }
        .ui.menu.four.item .item{
            width: 50%;
        }
        .block-tab .ui.tab{
            padding: 1em;
        }
    }
</style>
