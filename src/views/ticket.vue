<template>
    <div class="event-wrap">
        <div class="ui computer only tablet only  grid">
            <div class="column">
                <div class="event-banner-bg" :style="'background-image:url('+info.bannerUrl+'?imageMogr2/auto-orient/thumbnail/100x/blur/50x5/quality/75|imageslim)'">
                    <div class="back-line">
                        <div class="ui container">
                            <div class="ui computer only tablet only   padded grid">
                                <div class="column">
                                    <router-link class="text-white title-shadow" :to="'/site/'+info.id"><i class="angle left icon"></i> 返回活动网站 </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui  container">
                        <div class="ui doubling stackable padded middle aligned grid event-banner">
                            <div class="equal row">
                                <div class="ten wide column title-shadow">
                                    <h2 class="ui header text-white">{{info.title}}</h2>
                                    <p><i class="wait icon"></i> {{info.startTime | escapeTime}}-{{info.endTime | escapeTime}}</p>
                                    <p><i class="marker icon"></i> {{info.detailedAddress}}</p>
                                </div>
                                <div class="six wide column">
                                    <div class="ui medium image pic-box">
                                        <img :src="info.bannerUrl+'?imageMogr2/auto-orient/thumbnail/600x/blur/1x0/quality/75|imageslim'" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui container">
            <div class="ui doubling stackable padded grid">
                <div class="eleven wide column" id="ticket-main">
                    <div class="right five ui rail">
                        <div class="ui sticky ticket-side">
                            <div class="sub-blue-title f16 mb-sm" style="margin-top:1em;">
                                <i class="iconfont icon-kxborder-copy icon"></i>
                                <div class="content">
                                    订单总计
                                </div>
                            </div>
                            <div class="white-wrap p-lg">
                                <div class="ui divided list">
                                    <div class="item" v-for="tic in orderStatistic.tickets" v-if="tic.ticketCount">
                                        <div class="space-xs">
                                            <h4>{{tic.ticketName}}</h4>
                                            <p class="text-justify text-muted"><span>数量：{{tic.ticketCount}}张</span><span>{{orderStatistic.paymentPriceUnitSign}}{{tic.actualTicketPrice}}</span></p>
                                        </div>
                                    </div>
                                    <div class="item" v-if="isNeedInvoice && invoiceSetting.deliverMethod=='express'">
                                        <div class="space-xs">
                                            <h4>快递费：</h4>
                                            <p class="text-justify text-muted">
                                                <span>数量：{{invoiceNum}}份</span>
                                                <span>{{invoicePrice}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="space-xs text-right">
                                            <router-link :to="'/site/'+info.id">重新选票</router-link>
                                        </div>
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
                                <div class="ui toggle fitted checkbox mr-n">
                                    <input type="checkbox" @click="myCodeFn">
                                    <label></label>
                                </div>
                            </div>
                            <div class="white-wrap p-lg" v-show="myCode">
                                <div class="ui form">
                                    <div class="field">
                                        <input type="text" placeholder="请输优惠码" v-model="discount.discountCode">
                                    </div>
                                    <div class="field text-justify">
                                        <div class="text-muted">
                                            <!-- 金额抵用<span class="text-red">￥0.00</span> -->
                                        </div>
                                        <a href="javascript:;" class="ui button teal mini" @click="myCodeSubmit">确认</a>
                                    </div>
                                </div>
                            </div>
                            <div class="space-md text-right">总计：
                                <span class="text-red f20">
                                {{orderStatistic.paymentPriceUnitSign}}
                               {{orderStatistic.totalPrice}}
                                </span>
                            </div>
                            <button class="ui button blue fluid" @click="okPay()">
                                确认支付
                            </button>
                        </div>
                    </div>
                    <div v-for="(formItem,index) in formItems" v-if="info.isCollectAttendees">
                        <div class="sub-blue-title f16 mb-sm">
                            <i class="iconfont icon-zhanghuguanli icon"></i>
                            <div class="content">
                                {{nameArr[index].ticketName}}
                                <small class="text-muted ml-sm">第{{index+1}}张参会信息</small>
                            </div>
                        </div>
                        <div class="white-wrap p-lg">
                            <div class="listBox">
                                <formView ref="formview" :formData="formItem" :itemIndex="index"></formView>
                            </div>
                        </div>
                        <div class="ui divider hidden"></div>
                    </div>
                    <div class="sub-blue-title f16 mb-sm" v-show="ticketLength>1 || !info.isCollectAttendees">
                        <i class="iconfont icon-lianxirenselected icon"></i>
                        <div class="content">
                            购票者信息
                            <!-- <small class="text-muted ml-sm">购票订单邮件将会发送给购票者</small> -->
                        </div>
                    </div>
                    <div class="white-wrap p-lg" v-show="ticketLength>1 || !info.isCollectAttendees">
                        <div class="ui form">
                            <div class="field" v-if="info.isCollectAttendees">
                                <label for="">订单发送给</label>
                                <select class="ui dropdown userOrder" v-ui>
                                    <option value="">可选参会者</option>
                                    <option :value="index+1" v-for="(chUser,index) in nameArr">{{chUser.name}} | 第{{index+1}}参会者信息</option>
                                </select>
                            </div>
                            <form class="buyerNews">
                                <div class="field required">
                                    <label for="">姓名</label>
                                    <input type="text" name="name" v-model="buyer.name" :value="buyer.name">
                                </div>
                                <div class="field required">
                                    <label for="">手机号</label>
                                    <input type="text" name="mobile" v-model="buyer.mobile" :value="buyer.mobile">
                                </div>
                                <div class="field required">
                                    <label for="">邮箱</label>
                                    <input type="email" name="email" v-model="buyer.email" :value="buyer.email">
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="ui divider hidden"></div>
                    <!-- 发票设置 -->
                    <div v-if="isProvideInvoice">
                        <div class="sub-blue-title f16 mb-sm text-justify">
                            <div class="title">
                                <i class="iconfont icon-c-invoice icon"></i>
                                <div class="content">
                                    订单发票
                                </div>
                            </div>
                            <div class="ui toggle fitted checkbox mr-n">
                                <input @click="isNeedInvoicefn()" type="checkbox">
                                <label></label>
                            </div>
                        </div>
                        <div class="white-wrap p-lg" v-show="isNeedInvoice">
                            <div class="ui form">
                                <div class="field">
                                    <label for="">发票类型</label>
                                    <select class="ui dropdown selectedTypeInvo" :value="invoiceSetting.type">
                                        <option :value="type.name" v-for="type in info.invoiceSetting.type">{{type.str}}</option>
                                    </select>
                                </div>
                                <div class="field">
                                    <label for="">服务项目</label>
                                    <select class="ui dropdown serviceItemsType">
                                        <option v-for="tInvo in info.invoiceSetting.serviceItems">{{tInvo}}</option>
                                    </select>
                                </div>
                                <div class="inline fields" v-show="invoiceSetting.type=='normal'">
                                    <label for="fruit">个人/公司：</label>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input id="isInvo" type="radio" v-model="invoiceSetting.receiveType" value="personal" name="inveo3" class="hidden">
                                            <label for="isInvo">个人</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input id="isInvo2" type="radio" v-model="invoiceSetting.receiveType" value="company" name="inveo3" class="hidden">
                                            <label for="isInvo2">公司</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="inline fields" v-if="invoiceSetting.isSplitable">
                                    <label for="fruit">拆分发票：</label>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input id="isInvo" type="radio" value="only" v-model="isSplitTicket" name="inveo" class="hidden">
                                            <label for="isInvo">开一张发票</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input id="isInvo2" type="radio" value="more" v-model="isSplitTicket" name="inveo" class="hidden">
                                            <label for="isInvo2">按参会人数开发票</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="baseNews" v-show="isSplitTicket=='only'">
                                    <form class="ui form invoiceOnly">
                                        <div>
                                            <div class="field required">
                                                <label for="">发票抬头</label>
                                                <input type="text" name="title" v-model="invoiceOnlyData.title" placeholder="请输入发票抬头">
                                            </div>
                                            <div class="field required" v-show="info.isCollectAttendees">
                                                <label for="">请选择收件人</label>
                                                <select class="ui search dropdown userSelected">
                                                    <option value="">选择收件人</option>
                                                    <option :value="uindex+1" v-for="(chUser,uindex) in nameArr">{{chUser.ticketName}} | 第{{uindex+1}}参会者信息</option>
                                                </select>
                                            </div>
                                            <div class="field required" v-if='invoiceOnlyData.receiver || !info.isCollectAttendees'>
                                                <label>收件人</label>
                                                <input type="text" name="receiver" v-model="invoiceOnlyData.receiver" placeholder="请输入收件人姓名" :value="invoiceOnlyData.receiver">
                                            </div>
                                            <div class="field required" v-if='invoiceOnlyData.contact ||!info.isCollectAttendees'>
                                                <label for="">联系方式</label>
                                                <input type="text" name="contact" v-model="invoiceOnlyData.contact" placeholder="请输入联系人方式" :value="invoiceOnlyData.contact">
                                            </div>
                                            <div class="field required">
                                                <label for="">收件人地址</label>
                                                <input type="text" name="address" v-model="invoiceOnlyData.address" placeholder="收件人地址">
                                            </div>
                                            <div class="field required" v-show="invoiceSetting.receiveType=='company' || invoiceSetting.type=='special'">
                                                <label for="">纳税人识别号</label>
                                                <input type="text" name="taxRegistrationCertificateNumber" v-model="invoiceOnlyData.taxRegistrationCertificateNumber" placeholder="请输入纳税人识别号">
                                            </div>
                                            <div class="add" v-show="invoiceSetting.type=='special'">
                                                <div class="field required">
                                                    <label for="">公司注册地址<span>*</span></label>
                                                    <input type="text" name="companyRegisteredAddress" v-model="invoiceOnlyData.companyRegisteredAddress" placeholder="公司注册地址">
                                                </div>
                                                <div class="field required">
                                                    <label for="">公司开户行（详细到支行)<span>*</span></label>
                                                    <input type="text" name="companyAccountName" v-model="invoiceOnlyData.companyAccountName" placeholder="公司开户行（详细到支行)">
                                                </div>
                                                <div class="field required">
                                                    <label for="">公司财务电话<span>*</span></label>
                                                    <input type="text" name="companyFinancialTelephone" v-model="invoiceOnlyData.companyFinancialTelephone" placeholder="公司财务电话">
                                                </div>
                                                <div class="field required">
                                                    <label for="">银行账号<span>*</span></label>
                                                    <input type="text" name="companyAccount" v-model="invoiceOnlyData.companyAccount" placeholder="银行账号">
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="baseNews" v-show="isSplitTicket=='more'">
                                    <div v-for="(more,index) in invoiceMoreData">
                                        <form class="ui form invoiceMore">
                                            <h4 class="ui dividing header">第{{index+1}}位参会人开票信息</h4>
                                            <div class="field required">
                                                <label for="">发票抬头</label>
                                                <input type="text" :name="'title'+index" v-model="more.title" placeholder="请输入发票抬头">
                                            </div>
                                            <div class="field required"  v-if="info.isCollectAttendees">
                                                <label for="">请选择收件人</label>
                                                <div class="ui search dropdown selection moreUserSelected" @click="userMy(index)">
                                                    <i class="dropdown icon"></i>
                                                    <div class="default text">{{more.defaultValue}}{{more.selected}}</div>
                                                    <div class="menu" tabindex="" :class="[more.selected?'isBlock':'']">
                                                        <div class="item" @click="moreUserSelected(index,mindex)" v-for="(moreUser,mindex) in nameArr">{{moreUser.ticketName}} | 第{{mindex+1}}参会者信息</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="field required" v-show="more.receiver || !info.isCollectAttendees">
                                                <label for="">收件人</label>
                                                <input type="text" :name="'receiver'+index" v-model="more.receiver" placeholder="请输入收件人姓名" :value="more.receiver">
                                            </div>
                                            <div class="field required" v-show="more.contact || !info.isCollectAttendees">
                                                <label for="">联系方式</label>
                                                <input type="text" :name="'contact'+index" v-model="more.contact" placeholder="请输入联系方式" :value="more.contact">
                                            </div>
                                            <div class="field required">
                                                <label for="">收件人地址</label>
                                                <input type="text" :name="'address'+index" v-model="more.address" :value="more.address" placeholder="收件人地址">
                                            </div>
                                            <div class="field required" v-show="invoiceSetting.receiveType=='company'||invoiceSetting.type=='special'">
                                                <label for="">纳税人识别号</label>
                                                <input type="text" name="'taxRegistrationCertificateNumber'+index" v-model="more.taxRegistrationCertificateNumber" placeholder="请输入纳税人识别号">
                                            </div>
                                            <div class="add" v-show="invoiceSetting.type=='special'">
                                                <div class="field required">
                                                    <label for="">公司注册地址<span>*</span></label>
                                                    <input type="text" name="'companyRegisteredAddress'+index" v-model="more.companyRegisteredAddress" placeholder="公司注册地址">
                                                </div>
                                                <div class="field required">
                                                    <label for="">公司开户行（详细到支行)<span>*</span></label>
                                                    <input type="text" name="'companyAccountName'+index" v-model="more.companyAccountName" placeholder="公司开户行（详细到支行)">
                                                </div>
                                                <div class="field required">
                                                    <label for="">公司财务电话<span>*</span></label>
                                                    <input type="text" name="'companyFinancialTelephone'+index" v-model="more.companyFinancialTelephone" placeholder="公司财务电话">
                                                </div>
                                                <div class="field required">
                                                    <label for="">银行账号<span>*</span></label>
                                                    <input type="text" name="'companyAccount'+index" v-model="more.companyAccount" placeholder="银行账号">
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 购票需知 -->
                    <div class="ui computer only tablet only  grid">
                        <div class="row">
                            <div class="column">
                                <div class="ui divider hidden"></div>
                                <div class="sub-blue-title f16 mb-sm">
                                    <i class="iconfont icon-tougaoxuzhi icon"></i>
                                    <div class="content">购票须知</div>
                                </div>
                                <div class="white-wrap p-lg">
                                    <div class="ui list text-yellow">
                                        <div class="item" v-if="groupTicket"><span style="color:#f00; margin-right:10px;">*</span>团购票购买后，不可退票</div>
                                        <div class="item" v-if="refund"><span style="color:#f00; margin-right:10px;">*</span>退票会产生退票费</div>
                                        <div class="item" v-if="info.isProvideInvoice!='undefined' && info.isProvideInvoice"><span style="color:#f00; margin-right:10px;">*</span>请正确填写发票的邮寄地址</div>
                                        <div class="item" v-if="!refund"><span style="color:#f00; margin-right:10px;">*</span>此活动不支持退票</div>
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
                                        <div class="item">Q、报名成功后，没有收到通知怎么办？</div>
                                        <div class="item text-muted">A、<span class="f12">报名成功后，系统会以短信或邮件的方式发送电子票。如没有收到，可在垃圾邮件中进行查找，短信未收到与会鸽客服联系！</span></div>
                                        <div class="item">Q、购买的门票如何开取发票？</div>
                                        <div class="item text-muted">A、<span class="f12">若该收费活动支持开票，报名时可填写。如无发票项可选。则需要与主办方进行确认！</span></div>
                                        <div class="item">Q、报名不成功或缴费不成功怎么办？</div>
                                        <div class="item text-muted">A、<span class="f12">可联系会鸽客服，了解您具体操作后，给予进一步的解决方案。</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="five wide column mobile only">
                    <div class="sub-blue-title f16 mb-sm">
                        <i class="iconfont icon-tougaoxuzhi icon"></i>
                        <div class="content">购票须知</div>
                    </div>
                    <div class="white-wrap p-lg">
                        <div class="ui list text-yellow">
                            <div class="item" v-if="groupTicket"><span style="color:#f00; margin-right:10px;">*</span>团购票购买后，不可退票</div>
                            <div class="item" v-if="refund"><span style="color:#f00; margin-right:10px;">*</span>退票会产生退票费</div>
                            <div class="item" v-if="info.isProvideInvoice!='undefined' && info.isProvideInvoice"><span style="color:#f00; margin-right:10px;">*</span>请正确填写发票的邮寄地址</div>
                            <div class="item" v-if="!refund"><span style="color:#f00; margin-right:10px;">*</span>此活动不支持退票</div>
                        </div>
                    </div>
                    <div class="ui divider hidden"></div>
                    <div class="sub-blue-title f16 mb-sm">
                        <i class="iconfont icon-kxborder-copy icon"></i>
                        <div class="content">
                            订单总计
                        </div>
                    </div>
                    <div class="white-wrap p-lg">
                        <div class="ui divided list">
                            <div class="item" v-for="tic in orderStatistic.tickets" v-if="tic.ticketCount">
                                <div class="space-xs">
                                    <h4>{{tic.ticketName}}</h4>
                                    <p class="text-justify text-muted"><span>数量：{{tic.ticketCount}}张</span><span>{{orderStatistic.paymentPriceUnitSign}}{{tic.actualTicketPrice}}</span></p>
                                </div>
                            </div>
                            <div class="item" v-if="isNeedInvoice && invoiceSetting.deliverMethod=='express'">
                                <div class="space-xs">
                                    <h4>快递费：</h4>
                                    <p class="text-justify text-muted">
                                        <span>数量：{{invoiceNum}}份</span>
                                        <span>{{invoicePrice}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="item">
                                <div class="space-xs text-right">
                                    <router-link :to="'/site/'+info.id">重新选票</router-link>
                                </div>
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
                        <div class="ui toggle fitted checkbox mr-n">
                            <input type="checkbox" @click="myCodeFn">
                            <label></label>
                        </div>
                    </div>
                    <div class="white-wrap p-lg" v-show="myCode">
                        <div class="ui form">
                            <div class="field">
                                <input type="text" placeholder="请输优惠码" v-model="discount.discountCode">
                            </div>
                            <div class="field text-justify">
                                <div class="text-muted">
                                    <!-- 金额抵用<span class="text-red">￥0.00</span> -->
                                </div>
                                <a href="javascript:;" class="ui button teal mini" @click="myCodeSubmit">确认</a>
                            </div>
                        </div>
                    </div>
                    <div class="space-md text-right">总计：
                        <span class="text-red f20">
                                {{orderStatistic.paymentPriceUnitSign}}
                               {{orderStatistic.totalPrice}}
                                </span>
                    </div>
                    <button class="ui button blue fluid" @click="okPay()">
                        确认支付
                    </button>
                </div>
            </div>
            <footers></footers>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../config'
import footer from '../components/footerEvent'
import moment from 'moment'
import {
    mapState
} from 'vuex'
import formView from '../components/form_editor/view.vue' //表单设计器
export default {
    // deliverMethod  邮寄方式
    name: 'ticket',
    components: {
        formView: formView,
        footers: footer
    },
    data() {
        return {
            // info:this.$store.getters.opticker,
            info: {
                "invoiceSetting": {
                    "deliverFee": 0,
                    "deliverMethod": [],
                    "serviceItems": [
                        "会议费",
                        "餐费",
                        "住宿"
                    ],
                    "taxPoint": '',
                    "type": []
                },
            },
            groupTicket: false,
            refund: false,
            // create argu
            userId: '',
            order: [],
            platform: "web", //死值
            buyer: { //购票者信息
                email: "",
                name: "",
                mobile: ''
            },
            discount: { //优惠码
                "discountCode": ""
            },
            invoice: [], //发票信息
            eventId: '', //活动id
            isNeedInvoice: false, //是否需要发票
            invoiceSetting: {
                //发票设置
                deliverMethod: "onsite", // 领取方式
                serviceItems: "会议费", //服务费
                type: "normal", //发票类型
                isSplitable: 'false', //是否拆分
                taxPointPrice: 0, //税点费
                receiveType: 'personal',
            },
            // create argu end
            //优惠码
            isSplitTicket: 'only',
            isBuyerNews: true, //是否显示购票者
            invoiceNum: 0, //发票数量
            invoicePrice: 0, //发票费用
            discountCode: "",
            myCode: false,
            isProvideInvoice: true,
            deliverAllPrice: 0,
            ticketCount: 1, //发票张数
            splitCount: 0,
            // deliverPrice:this.$store.getters.opticker.invoiceSetting.deliverFee,
            deliverPrice: '',
            allPrice: 0,
            orderStatistic: {},
            startTime: moment(this.$store.getters.opticker.ctime).format('YYYY-MM-DD hh:mm:ss'),
            endTime: moment(this.$store.getters.opticker.endTime).format('YYYY-MM-DD hh:mm:ss'),
            formItems: [],
            ticketLength: 0, //票的总张数
            nameArr: [],
            saveKey: true,
            saveTotalPrice: 0,
            changeTotalPrice: 0,

            invoiceOnlyData: {
                contact: "",
                address: "",
                title: "",
                receiver: "",
                taxRegistrationCertificateNumber: "",
                companyRegisteredAddress: "",
                companyFinancialTelephone: "",
                companyAccountName: "",
                companyAccount: ""
            },
            invoiceSaveUserNews: [],
            invoiceMoreData: [],
            isFreeTicket: 0,
            argu: { //请求总价参数
                "discount": {
                    "discountCode": ""
                },
                "order": [],
                "userId": '',
                "eventId": ''
            },
            needAuditArr: [],
        }
    },
    watch: {
        isSplitTicket() {
            this.MinusInovicePrice();
        }
    },
    filters: {
        // 格式化后台返回的时间
        escapeTime(value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
    },
    mounted() {
        var _this = this,
            userNews;
        // RGBaster.colors(img, {
        //     exclude: ['rgb(255,255,255)', 'rgb(0,0,0)'],
        //     success: function(payload) {
        //         $('.event-banner-bg').css("background-color", payload.dominant);
        //     }
        // }); 

        var myNews = this.$store.state
        var invoiceSettingName = '';
        $.get(API_URL + '/event/get', {
            id: this.$route.params.eventId
        }, (data) => {

            // data.tickets = JSON.parse(localStorage.getItem('tickets'));
            this.info = data;

            var ticketLocal = JSON.parse(localStorage.getItem('tickets'))
            for (let t = 0; t < ticketLocal.length; t++) { //合并票参数
                this.$set(this.info.tickets[t], 'votesNum', ticketLocal[t].votesNum)
            }

            this.argu.eventId = this.eventId = this.info.id; //活动id
            this.isProvideInvoice = this.info.isProvideInvoice; //是否提供发票
            this.invoiceSetting.isSplitable = this.info.invoiceSetting.isSplitable; //是否可拆分发票
            if (localStorage.getItem('user')) {
                userNews = JSON.parse(localStorage.getItem('user'));
            }
            document.title = data.title + '_会鸽';
            this.argu.userId = this.userId = userNews ? userNews.id : '';
            if (this.info.isProvideInvoice) {
                this.invoiceSetting.deliverMethod = this.info.invoiceSetting.deliverMethod[0].name;
            }
            if (this.info.tickets.length == 1) {
                this.isBuyerNews = false;
            }
            // 判断退票，是否产生退票费
            if (this.info.refundSettings) {
                if (this.info.refundSettings != 'undefined' && this.info.refundSettings != '' && this.info.refundSettings.length > 0) {
                    this.refund = true;
                }
            }
            if (this.info.invoiceSetting && this.info.invoiceSetting.type.length > 0) {
                this.invoiceSetting.type = this.info.invoiceSetting.type[0].name;
                invoiceSettingName = this.info.invoiceSetting.type[0].str
            }

            var This = this;
            $('.selectedTypeInvo').dropdown({
                value: 'normal',
                selected: 'normal',
                activate: 'normal',
                onChange: function(value, text, $selectedItem) {
                    This.selectType(value)
                }
            }).dropdown('set value', this.invoiceSetting.type).dropdown('set text', invoiceSettingName);

            // 提取每种票的标题与总票数和
            for (var i = 0; i < this.info.tickets.length; i++) {
                this.ticketLength += this.info.tickets[i].votesNum;
                // 判断是否是团购票
                if (this.info.tickets[i].isAllowGroupPurchase != 'undefined' && this.info.tickets[i].isAllowGroupPurchase) {
                    if (this.info.tickets[i].groupPurchaseTicketSetting !== 'undefined' && this.info.tickets[i].groupPurchaseTicketSetting != '') {
                        this.groupTicket = true;
                    }
                }

                if (this.info.tickets[i].votesNum > 0) {
                    this.order.push({
                        'ticketName': this.info.tickets[i].name,
                        'ticketId': this.info.tickets[i].ticketId,
                        'total': this.info.tickets[i].votesNum,
                        'attendees': []
                    })
                    this.argu.order.push({
                        "ticketId": this.info.tickets[i].ticketId,
                        "ticketName": this.info.tickets[i].name,
                        "total": this.info.tickets[i].votesNum
                    })
                    // 是否有早鸟票(已无用，后台已设置)
                    if (this.info.tickets[i].earlyBirdTicketSetting && this.info.tickets[i].earlyBirdTicketSetting.endTime) {
                        // 早鸟票是否过期
                        /*
                            是否有早鸟票，早鸟票是否过期，
                            如果没有早鸟票，则走正常票价
                         */
                        var startSalesTime = '';
                        if (this.info.tickets[i].earlyBirdTicketSetting.startTime) {
                            startSalesTime = this.info.tickets[i].earlyBirdTicketSetting.startTime;
                        } else {
                            startSalesTime = this.info.tickets[i].startSalesTime;
                        }
                        var birdEndTime = this.info.tickets[i].earlyBirdTicketSetting.endTime;
                        this.isFreeTicket += parseInt(this.info.tickets[i].earlyBirdTicketSetting.price);
                    } else {
                        this.isFreeTicket += parseInt(this.info.tickets[i].defaultPrice);
                    }
                    // 判断是否是免费票结束

                    // if (this.info.tickets[i].votesNum > 0) {
                    this.needAuditArr.push(this.info.tickets[i].needAudit);
                    // }
                    for (var t = 0; t < this.info.tickets[i].votesNum; t++) {
                        this.nameArr.push({
                            'ticketName': this.info.tickets[i].name,
                            'ticketId': this.info.tickets[i].ticketId,
                            'total': this.info.tickets[i].votesNum,
                            'attendees': []
                        });
                        this.invoiceMoreData.push({
                            contact: "",
                            address: "",
                            title: "",
                            receiver: "",
                            taxRegistrationCertificateNumber: "",
                            companyRegisteredAddress: "",
                            companyFinancialTelephone: "",
                            companyAccountName: "",
                            companyAccount: "",
                            selected: false,
                            defaultValue: '请选择收件人'
                        })
                    }
                }
                // console.log(this.isFreeTicket)
            }

            // 请求总价的接口
            var _this = this;
            this.getTotalPrice(this.argu)
            var tickets = this.info.tickets,
                allPrice = 0,
                count = 0;
            // 请求活动表单

            if (this.ticketLength == 1) {
                for (let n = 0; n < this.info.collectItems.length; n++) {
                    var coll = this.info.collectItems[n];
                    if (coll.itemName == 'name') {
                        coll.value = myNews.user['nickname'];
                    } else if (coll.itemName == 'mobile') {
                        coll.value = myNews.user['phone'];
                    } else {
                        coll.value = myNews.user[coll.itemName]
                    }
                }
            }
            if (!this.info.isCollectAttendees) {
                this.buyer.name = myNews.user.username;
                this.buyer.email = myNews.user.email;
                this.buyer.mobile = myNews.user.phone;
            }

            for (let i = 0; i < this.ticketLength; i++) {
                this.formItems.push($.extend(true, {}, {
                    'elments': this.info.collectItems
                }));
            }
        })

        // 购票者信息
        $('.userOrder').dropdown({
            onChange: function(value, text, $selectedItem) {
                _this.getUserNews('buyer', value);
            }
        })

        // 单张发票收件人
        $('.userSelected').dropdown({
            onChange: function(value, text, $selectedItem) {
                // _this.getUserNews(_this.invoiceOnlyData,value)
                _this.getUserNews(_this.invoiceOnlyData, value)
            }
        });

        // 服务类型
        $('.serviceItemsType').dropdown({
            onChange: function(value, text, $selectedItem) {
                _this.serviceItems(text);
            }
        })

        $('.ui.checkbox').checkbox()
        this.$nextTick(function() {
            $(window).scroll(function() {
                if ($(window).scrollTop() > $('#ticket-main').offset().top) {
                    $('.ui.sticky.ticket-side').sticky({ context: '#ticket-main' })
                }
            });
        })
    },

    methods: {
        userMy(index) {
            this.invoiceMoreData[index].selected = !this.invoiceMoreData[index].selected;
        },
        moreUserSelected(pIndex, index) {
            this.getUserNews(this.invoiceMoreData[pIndex], index + 1);
        },
        // 判断早鸟票是否过期
        isOverdue(startTime, endTime) {
            var nowDateNum = new Date().getTime();
            var s = new Date(moment(startTime).format('YYYY-MM-DD HH:mm:ss')).getTime();
            var e = new Date(moment(endTime).format('YYYY-MM-DD HH:mm:ss')).getTime();
            return nowDateNum > s && nowDateNum < e;
        },
        // 控制优惠码是否显示
        myCodeFn() {
            this.myCode = !this.myCode;
            if (!this.myCode) {
                if (this.discount.discountCode != '') {
                    this.argu.discount.discountCode = '';
                    this.getTotalPrice(this.argu);
                }
            }
        },
        // 确认优惠码
        myCodeSubmit() {
            if (this.discount.discountCode != '') {
                this.argu.discount.discountCode = this.discount.discountCode;
                this.getTotalPrice(this.argu);
            }
        },
        // 获取总价
        getTotalPrice(argu) {
            var _this = this;
            jQuery.ajax({
                url: API_URL + "/order/prepareCreateOrder",
                type: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                contentType: "application/json",
                data: JSON.stringify(argu),
                success: function(data, res, xhr) {
                    if (xhr.status == 200) {
                        if (_this.saveKey) {
                            _this.saveTotalPrice = data.totalPrice;
                        } else {
                            if (_this.saveTotalPrice == data.totalPrice) { //通过价格来判断是否有效
                                if(_this.myCode){
                                    _this.$message.warning('优惠码无效')
                                }
                            }
                        }
                        _this.saveKey = false;
                        _this.changeTotalPrice = data.totalPrice;

                        //   isProvideInvoice  活动是否提供发票
                        //   isNeedInvoice  购买 者是否需要开发票

                        if (_this.isProvideInvoice && _this.isNeedInvoice && _this.info.invoiceSetting.deliverMethod[0].name == "express") {
                            if (_this.isSplitTicket == 'only') {
                                data.totalPrice += parseInt(_this.info.invoiceSetting.deliverFee);
                            } else if (_this.isSplitTicket == 'more') {
                                data.totalPrice += parseInt(_this.info.invoiceSetting.deliverFee) * _this.ticketLength;
                            }
                        }
                        _this.orderStatistic = data;
                    }
                }
            })
        },
        // 用户信息验证
        getUserNews(changeobj, index) {
            $.each(this.$refs.formview, (i, o) => {
                o.submit().then((res) => {
                    if (i == index - 1) {
                        if (changeobj == 'buyer') {
                            this.userNews(res[1]);
                        } else {
                            this.changeNewsMore(changeobj, res[1]);
                        }
                    }
                }, (index) => {
                    console.log(index, '这个没有通过验证')
                    $('.userOrder').dropdown('set value','').dropdown('set text','可选参会者');
                    $('.userSelected').dropdown('set value','').dropdown('set text','选择收件人')
                }).catch((e) => {
                    console.log(e)
                })
            })
        },
        // 发票选择收件人
        changeNewsMore(changeObj, data) {
            for (var i = 0; i < data.length; i++) {
                switch (data[i].itemName) {
                    case 'name':
                        this.$set(changeObj, 'receiver', data[i].value)
                        break;
                    case 'mobile':
                        this.$set(changeObj, 'contact', data[i].value)
                }
            }
        },

        // 请选择购票者的信息
        userNews(obj) {
            for (var i = 0; i < obj.length; i++) {
                switch (obj[i].itemName) {
                    case 'name':
                        this.buyer.name = obj[i].value;
                        break;
                    case 'email':
                        this.buyer.email = obj[i].value;
                        break;
                    case 'mobile':
                        this.buyer.mobile = obj[i].value;
                }
            }
        },

        // 是否需要发票
        isNeedInvoicefn() {
            this.isNeedInvoice = !this.isNeedInvoice;
            if (this.isNeedInvoice) {
                this.invoiceNum = 1;
                this.invoicePrice = this.info.invoiceSetting.deliverFee;
                this.orderStatistic.totalPrice += parseInt(this.invoicePrice);
            } else {
                this.invoiceNum = 0;
                this.invoicePrice = 0;
                this.orderStatistic.totalPrice -= parseInt(this.info.invoiceSetting.deliverFee);
            }
        },
        // 发票类型
        selectType(value) {
            this.invoiceSetting.type = value;
        },
        // 计算总钱数
        MinusInovicePrice() {
            if (this.invoiceSetting.deliverMethod == "express") {
                // 快递费计算
                if (this.isSplitTicket == 'more') {
                    this.invoiceNum = this.ticketLength;
                    this.invoicePrice = this.ticketLength * this.info.invoiceSetting.deliverFee;
                    this.orderStatistic.totalPrice = this.changeTotalPrice + this.info.invoiceSetting.deliverFee * this.nameArr.length;
                } else if (this.isSplitTicket == 'only') {
                    this.invoiceNum = 1;
                    this.invoicePrice = this.info.invoiceSetting.deliverFee;
                    this.orderStatistic.totalPrice = this.changeTotalPrice + parseInt(this.info.invoiceSetting.deliverFee);
                }
            } else if (this.invoiceSetting.deliverMethod == "onsite") {
                // 回归原价
                this.orderStatistic.totalPrice = this.changeTotalPrice;
            }
        },

        // 服务项目 
        serviceItems(value) {
            this.invoiceSetting.serviceItems = value;
            this.MinusInovicePrice()
        },
        // 验证参会者信息
        getParticipantInformation() {
            return new Promise((reslove, reject) => {
                var dataArr = [];
                $.each(this.$refs.formview, (i, o) => {
                    o.submit().then((res) => {
                        dataArr.push(res)
                        if (dataArr.length === this.nameArr.length) {
                            reslove(dataArr);
                        }
                    }, (index) => {
                        reject(index)
                    }).catch((e) => {
                        console.log(e)
                    })
                })
            })
        },

        // 处理参会信息  相同id的放在同一个数组里面
        handleNews(obj) {
            for (var i = 0; i < obj.length; i++) {
                var items = obj[i][obj[i].length - 1];
                var ng = {}
                for (var n = 0; n < items.length; n++) {
                    ng[items[n]['itemName']] = items[n]['value'];
                }
                this.nameArr[i].attendees.push(ng);
            }
            for (var a = 0; a < this.nameArr.length; a++) {
                for (var o = 0; o < this.order.length; o++) {
                    if (this.nameArr[a].ticketId == this.order[o].ticketId) {
                        for (var c = 0; c < this.nameArr[a].attendees.length; c++) {
                            this.order[o].attendees.push(this.nameArr[a].attendees[c]);
                        }
                    }
                }
            }
        },

        async okPay() {
            try {
                if(this.info.isCollectAttendees){
                    const a = await this.getParticipantInformation()
                    this.handleNews(a);
                }
                
                if (this.isSplitTicket == 'more') {
                    this.invoice = this.invoiceMoreData
                } else {
                    this.invoice.push(this.invoiceOnlyData);
                }
                console.log(222)
                if (this.ticketLength == 1) {
                    // this.buyer=this.order[0].attendees[0];
                    for (var attr in this.order[0].attendees[0]) {
                        switch (attr) {
                            case 'name':
                                this.buyer.name = this.order[0].attendees[0][attr];
                                break;
                            case 'email':
                                this.buyer.email = this.order[0].attendees[0][attr];
                                break;
                            case 'mobile':
                                this.buyer.mobile = this.order[0].attendees[0][attr];
                        }
                    }
                } else {
                    if (!this.buyer.name && !this.buyer.mobile && !this.buyer.email) {
                        this.$message.warning('请填写购票者信息')
                        return false;
                    }
                }
                jQuery.ajax({
                    url: API_URL + "/order/create",
                    type: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    contentType: "application/json",
                    data: JSON.stringify(this.$data),
                    success: function(data, req, xhr) {
                        if (xhr.status == 200) {

                            //   status   
                            //      pending    需要审核 
                            //      none  需要支付
                            //      paid   免费票  
                            //   
                            if (data.status == 'pending') {
                                _this.$router.push({
                                    path: '/meetingSuccess/' + data.orderNumber + '/' + _this.argu.eventId
                                })
                            } else {
                                if (data.status == 'none') {
                                    _this.$router.push({
                                        path: '/paySelecte/' + data.id + '/' + data.eventId
                                    })
                                } else if (data.status == 'paid') {
                                    _this.$router.push({
                                        path: '/meetingSuccess/' + data.orderNumber + '/' + _this.argu.eventId
                                    })
                                }
                            }
                        }
                    },
                    error(err) {
                        var errTxt = JSON.parse(err.responseText);
                        _this.$message({
                            message: errTxt.responseText,
                            type: 'error'
                        })
                    }
                })
            } catch (e) {

            }
            var _this = this;
        }
    },
    beforeDestroy() {
        $(window).unbind('scroll')
    }
}
</script>
<style scoped>
.isBlock {
    display: block!important;
}

.event-banner-bg {
    color: #fff;
    margin-bottom: 1em;
    width: 100%;
    overflow: hidden;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.event-banner {
    min-height: 200px;
}

.title-shadow {
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5)
}

.pic-box {
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.back-line {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.ticket-side {
    width: 320px;
}

@media only screen and (max-width: 767px) {
    .event-banner-bg {
        margin-bottom: 0em;
    }
    .event-banner {
        min-height: auto;
    }
    .p-lg {
        padding: 1em !important;
    }
    .ui.divider {
        margin: .5rem 0;
    }
    #ticket-main {
        overflow: hidden;
    }
    /*.ui.five.rail {
            display: none;
        }*/
}

.white {
    background: #fff;
}

.bgContent {
    background: url('../assets/images/order/bg.png') no-repeat top center;
}

.ticketTitle {
    font-size: 16px;
    color: #6f7072
}

.black {
    border-bottom: 1px solid #a84956;
    line-height: 60px;
}

.addUserNews,
.invoice,
.rule,
.order_details {
    background: #fff;
    padding: 23px 30px;
}

.red {
    color: #f00;
}

.rule .item span {
    line-height: 2em;
    font-size: 13px;
    color: #fcb34c
}

.tcontent {
    color: #999999;
    font-size: 12px;
}

.order_details .title {
    margin-bottom: 7px;
    margin-top: 15px;
}

.ToChoose {
    text-align: right;
}

.tMoney {
    float: right;
    margin-top: 10px;
    font-size: 12px;
    color: #999;
}

.operation {
    overflow: hidden;
    margin-top: 15px;
}

.operation span {
    line-height: 35px;
    font-weight: bold;
    color: #00cfb3;
    font-size: 18px;
}

.Payment {
    background: #fff;
    padding: 15px 30px;
}

.submitBtn {
    padding: 15px 0
}

.submitBtn a {
    color: #00cfb3;
    font-size: 12px;
    margin-top: 10px;
    display: block;
}

.iconSize {
    font-size: 22px;
    margin-right: 5px;
    float: left;
    color: #9fd6f9;
}

.problem {
    background: #fff;
    padding: 30px;
    line-height: 40px;
}

.problem div {
    line-height: 40px!important;
}

.pro_icon {
    width: 147px;
    height: 147px;
    float: right;
}

.pro_icon img {
    width: 100%;
    height: 100%;
    margin-top: 25px;
}

.ui.checkbox {
    margin-right: 20px;
}

.ui.dividing.header {
    color: blue;
    margin-top: 1.5em;
    margin-bottom: 0px;
    border: none;
}
</style>