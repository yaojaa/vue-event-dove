<template>
<div class="event-wrap">
    <div class="ui computer only tablet only  grid">
        <div class="column">
            <div class="event-banner-bg">
                <div class="back-line">
                    <div class="ui container">
                        <div class="ui computer only tablet only vertically padded grid">
                            <div class="column"><a href="" class="text-white"><i class="angle left icon"></i> 返回</a></div>
                        </div>
                    </div>
                </div>
                <div class="ui  container">
                    <div class="ui doubling stackable vertically padded middle aligned grid event-banner">
                        <div class="equal row">
                            <div class="ten wide column">
                                <h2 class="ui header text-white">Rancher V1.2技术分享季中国区巡演测长度测长度测长度测长度测长度</h2>
                                <p><i class="wait icon "></i> 2017年10月12日（周六）9:00 — 2017年10月13日（周日）19:00</p>
                                <p><i class="marker icon"></i> 北京市朝阳区国际会议中心</p>
                            </div>
                            <div class="six wide column">
                                <div class="ui medium image pic-box"><img src="/images/banner02.jpg" id="pic"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ui container">
        <div class="ui doubling stackable vertically padded grid">
            <div class="eleven wide column">
                <div class="sub-blue-title f16 mb-sm">
                    <i class="iconfont icon-zhanghuguanli icon"></i>
                    <div class="content">早鸟票<small class="text-muted ml-sm">第1张参会信息</small></div>
                </div>
                <div class="white-wrap p-lg">
                </div>
                <div class="ui divider hidden"></div>
                <div class="sub-blue-title f16 mb-sm">
                    <i class="iconfont icon-lianxirenselected icon"></i>
                    <div class="content">
                        购票者信息<small class="text-muted ml-sm">购票订单邮件将会发送给购票者</small>
                    </div>
                </div>
                <div class="white-wrap p-lg">
                    <div class="ui form">
                        <div class="field">
                            <label for="">订单发送给</label>
                            <select class="ui dropdown">
                                <option value="">可选参会者</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                            </select>
                        </div>
                        <div class="field required">
                            <label for="">姓名</label>
                            <input type="text">
                        </div>
                        <div class="field required">
                            <label for="">邮箱</label>
                            <input type="email">
                        </div>
                    </div>
                </div>
                <div class="ui divider hidden"></div>
                <div class="sub-blue-title f16 mb-sm text-justify">
                    <div class="title">
                        <i class="iconfont icon-c-invoice icon"></i>
                        <div class="content">
                            订单发票
                        </div>
                    </div>
                    <div class="ui toggle checkbox">
                        <input type="checkbox">
                        <label>不需要</label>
                    </div>
                </div>
                <div class="white-wrap p-lg">
                    <div class="ui form">
                        <div class="field">
                            <label for="">发票类型</label>
                            <select class="ui dropdown">
                                <option value="0">普通发票</option>
                                <option value="1">增值税专用发票</option>
                                <option value="2">通用机打发票</option>
                            </select>
                        </div>
                        <div class="field required">
                            <label for="">发票抬头</label>
                            <input type="text">
                        </div>
                        <div class="field">
                            <label for="">服务项目</label>
                            <select class="ui dropdown">
                                <option value="0">信息服务费</option>
                                <option value="1">参会费</option>
                            </select>
                        </div>
                        <div class="inline fields">
                            <label for="fruit">领取方式：</label>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="fruit" checked="" tabindex="0" class="hidden">
                                    <label>快递领取 <span class="text-yellow">￥20</span></label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="fruit" tabindex="0" class="hidden">
                                    <label>现场领取</label>
                                </div>
                            </div>
                        </div>
                        <div class="field required">
                            <label for="">收件人</label>
                            <input type="text">
                        </div>
                        <div class="field required">
                            <label for="">联系方式</label>
                            <input type="text">
                        </div>
                        <div class="field required">
                            <label for="">收件人地址</label>
                            <input type="text">
                        </div>
                        <div class="field">
                            <label for="">备注</label>
                            <textarea name="" rows="2"></textarea>
                        </div>
                    </div>
                </div>
                <div class="ui grid">
                    <div class="row">
                        <div class="computer only tablet only column">
                            <div class="ui divider hidden"></div>
                            <div class="sub-blue-title f16 mb-sm">
                                <i class="iconfont icon-tougaoxuzhi icon"></i>
                                <div class="content">
                                    购票须知
                                </div>
                            </div>
                            <div class="white-wrap p-lg">
                                <div class="ui list text-yellow">
                                    <div class="item">1.团购票购买后，不可退票</div>
                                    <div class="item">2.退票会产生退票费</div>
                                    <div class="item">3.请正确填写发票的邮寄地址</div>
                                    <div class="item">4.此活动不支持退票</div>
                                </div>
                            </div>
                            <div class="ui divider hidden"></div>
                            <div class="sub-blue-title f16 mb-sm">
                                <i class="iconfont icon-wenti icon"></i>
                                <div class="content">
                                    报名遇到问题
                                </div>
                            </div>
                            <div class="white-wrap p-lg">
                                <div class="ui list">
                                    <div class="item">1.如果您购买收费票需开具发票，请提前联系活动主办方确认；</div>
                                    <div class="item">2.如果您购买的是审核票，主办方审核通过后，会将电子票发送到您的邮箱中，若未收到请检查垃圾邮箱；</div>
                                    <div class="item">3.报名后成功后修改参会人信息，可在购票人邮件中或者我的电子票页面中修改；</div>
                                    <div class="item">4.如果您参加的是收费活动，退票说明可在门票详情中查看。</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="five wide column">
                <div class="sub-blue-title f16 mb-sm">
                    <i class="iconfont icon-kxborder-copy icon"></i>
                    <div class="content">
                        订单总计
                    </div>
                </div>
                <div class="white-wrap p-lg">
                    <div class="ui divided list">
                        <div class="item">
                            <div class="space-xs">
                                <h4>早鸟票</h4>
                                <p class="text-justify text-muted"><span>数量：5张</span><span>￥1500.00</span></p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="space-xs">
                                <h4>早鸟票</h4>
                                <p class="text-justify text-muted"><span>数量：5张</span><span>￥1500.00</span></p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="space-xs">
                                <p class="text-justify text-muted"><span>发票快递费</span><span>￥15</span></p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="space-xs text-right"><a href="#">重新选票</a></div>
                        </div>
                    </div>
                </div>
                <div class="ui divider hidden"></div>
                <div class="sub-blue-title text-justify f16 mb-sm">
                    <div class="title">
                        <i class="iconfont icon-youhui icon"></i>
                        <div class="content">
                            优惠码
                        </div>
                    </div>
                    <div class="ui toggle checkbox">
                        <input type="checkbox">
                        <label>不需要</label>
                    </div>
                </div>
                <div class="white-wrap p-lg">
                    <div class="ui form">
                        <div class="field">
                            <input type="text" placeholder="请输优惠码">
                        </div>
                        <div class="field text-justify">
                            <div class="text-muted">金额抵用<span class="text-red">￥0.00</span></div><a href="" class="ui button teal mini">确认</a></div>
                    </div>
                </div>
                <div class="space-md text-right">总计：<span class="text-red f20">￥0.00</span></div>
                <a href="" class="ui button blue fluid">确认支付</a>
                <div class="ui grid">
                    <div class="row">
                        <div class="mobile only column">
                            <div class="ui divider hidden"></div>
                            <div class="sub-blue-title f16 mb-sm">
                                <i class="iconfont icon-tougaoxuzhi icon"></i>
                                <div class="content">
                                    购票须知
                                </div>
                            </div>
                            <div class="white-wrap p-lg">
                                <div class="ui list text-yellow">
                                    <div class="item">1.团购票购买后，不可退票</div>
                                    <div class="item">2.退票会产生退票费</div>
                                    <div class="item">3.请正确填写发票的邮寄地址</div>
                                    <div class="item">4.此活动不支持退票</div>
                                </div>
                            </div>
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
import '../assets/js/rgbaster.js'
import footer from '../components/footerEvent'
export default {
    data() {
            return {

            }
        },
        mounted() {

            var img = $('#pic').attr('src');
            RGBaster.colors(img, {
                exclude: ['rgb(255,255,255)', 'rgb(0,0,0)'],
                success: function(payload) {
                    // payload.dominant是主色，RGB形式表示
                    // payload.secondary是次色，RGB形式表示
                    // payload.palette是调色板，含多个主要颜色，数组
                    $('.event-banner-bg').css("background-color", payload.dominant);
                }
            });
            $('.ui.dropdown').dropdown()
            $('.ui.checkbox').checkbox()
        },
        methods: {
            //续费
            renew: function() {

            }
        },
        components: {
            footers: footer
        }
}
</script>
<style scoped>
.event-banner-bg {
    color: #fff;
    margin-bottom: 1em;
}

.event-banner {
    min-height: 300px;
}

.pic-box {
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.back-line {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
@media only screen and (max-width: 767px) {
    .event-banner-bg {
        margin-bottom: 0em;
    }
    .event-banner {
        min-height: auto;
    }
    .p-lg{
        padding: 1em !important;
    }
    .ui.divider{
        margin: .5rem 0;
    }
}
</style>
