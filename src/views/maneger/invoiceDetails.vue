<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">发票管理</span>/发票详情</h2>
                <router-link to="./invoiceManagement"><i class="reply icon"></i>返回</router-link>
            </div>
            <div class="white-wrap p-xl">
                <div class="ui vertically divided grid">
                    <div class="row">
                    <div class="two wide column text-muted">订单号： </div>
                    <div class="six wide column text-blue">{{info.orderNumber|delEmpty}}</div>
                    <div class="two wide column text-muted">门票支付总金额: </div>
                    <div class="six wide column text-yellow">¥{{info.totalAmountOfTicketPayment|delEmpty}}</div>
                    <div class="two wide column text-muted">开票类型： </div>
                    <div class="six wide column">{{info.orderInvoiceTypeStr|delEmpty}}</div>
                    <div class="two wide column text-muted">开票状态： </div>
                    <div class="six wide column">{{info.orderInvoiceStatusStr}}</div>
                    <div class="two wide column text-muted">服务项目： </div>
                    <div class="six wide column">{{info.invoiceSetting.serviceItems|delEmpty}}</div>
                    <!-- info.invoiceSetting.deliverMethod -->
                    <div class="two wide column text-muted">领取方式： </div>
                    <div class="six wide column">{{info.deliverMethodStr|delEmpty}}</div>
                    <!--<div class="two wide column text-muted">备注信息： </div>
                    <div class="six wide column">{{}}</div>-->
                    </div>
                </div>
                <div class="ui divider hidden"></div>
                <div class="ui padded grid">
                    <div class="column bg-gray"><strong>开票信息</strong></div>
                </div>
                <div class="ui horizontally padded grid">
                    <div class="ui padded  vertically divided text-list grid">
                        <div class="row" v-for="item in info.invoice">
                            <div class="sixteen wide column">
                                <div class="text-justify">
                                    <div class="left">
                                        <label class="ui label teal mr-md box-radius">1</label>
                                        <strong class="f16">{{item.receiver}}</strong>
                                    </div>
                                    <!--<a href="#"><i  class="write icon"></i> 修改信息</a>-->
                                </div>
                            </div>
                            <div class="two wide column text-muted">开票金额： </div>
                            <div class="six wide column text-yellow">¥{{item.invoiceAmount}}</div>
                            <div class="two wide column text-muted">购买门票： </div>
                            <div class="six wide column">{{item.ticketName|delEmpty}}</div>
                            <div class="two wide column text-muted">公司抬头： </div>
                            <div class="six wide column">{{item.title|delEmpty}}</div>
                            <div class="two wide column text-muted">手机号： </div>
                            <div class="six wide column">{{item.contact|delEmpty}}</div>
                            <div class="two wide column text-muted">邮寄地址： </div>
                            <div class="six wide column">{{item.address|delEmpty}}</div>
                            <div class="two wide column text-muted">纳税人识别号： </div>
                            <div class="six wide column">{{item.taxRegistrationCertificateNumber|delEmpty}}</div>

                            <div class="two wide column text-muted" v-if="info.invoiceSetting.deliverMethod=='special'">公司注册地址： </div>
                            <div class="six wide column"v-if="info.invoiceSetting.deliverMethod=='special'">{{item.companyRegisteredAddress|delEmpty}}</div>
                            <div class="two wide column text-muted"v-if="info.invoiceSetting.deliverMethod=='special'">公司财务电话： </div>
                            <div class="six wide column"v-if="info.invoiceSetting.deliverMethod=='special'">{{item.companyFinancialTelephone|delEmpty}}</div>
                            <div class="two wide column text-muted"v-if="info.invoiceSetting.deliverMethod=='special'">公司开户行： </div>
                            <div class="six wide column"v-if="info.invoiceSetting.deliverMethod=='special'">{{item.companyAccountName|delEmpty}}</div>
                            <div class="two wide column text-muted"v-if="info.invoiceSetting.deliverMethod=='special'">银行账号： </div>
                            <div class="six wide column"v-if="info.invoiceSetting.deliverMethod=='special'">{{item.companyAccount|delEmpty}}</div>
                            <div class="sixteen wide column">
                                <div class="ui form">
                                    <div class="fields inline">
                                        <div class="field">
                                            <label for="" class="f14 fwn text-muted">发票号：</label>
                                            <input type="text" v-model="item.invoiceNumber" placeholder="请添写发票号">
                                        </div>
                                        <div class="field">
                                            <label for="" class="f14 fwn text-muted">快递信息：</label>
                                            <select class="ui dropdown" v-model="item.deliverInformation.deliverName">
                                                <option value="EMS">EMS</option>
                                                <option value="申通快递">申通快递</option>
                                                <option value="顺丰速运">顺丰速运</option>
                                                <option value="圆通速递">圆通速递</option>
                                                <option value="韵达速递">韵达速递</option>
                                                <option value="中通快递">中通快递</option>
                                                <option value="天天快递">天天快递</option>
                                                <option value="百世快递">百世快递</option>
                                                <option value="宅急送">宅急送</option>
                                                <option value="全峰快递">全峰快递</option>
                                                <option value="德邦">德邦</option>
                                                <option value="包裹信件">包裹信件</option>
                                                <option value="中铁物流">中铁物流</option>
                                                <option value="其它">其它</option>}
                                            </select>
                                        </div>
                                        <div class="field">
                                            <input type="text" v-model="item.deliverInformation.deliverNumber" :value="item.deliverInformation.deliverNumber" placeholder="请输入快递单号">
                                        </div>
                                        <div class="field">
<button class="ui button blue" @click="invoiceSubmit(item.invoiceId, info.orderNumber, item.deliverInformation.deliverName, item.invoiceNumber, item.deliverInformation.deliverNumber)">提交</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui small modal edit-sender-layer">
            <i class="close icon"></i>
            <div class="header">修改快递信息</div>
            <div class="content">
                <div class="ui form">
                    <div class="required field">
                        <label for="">发件人：</label>
                        <input type="text" value="张三">
                    </div>
                    <div class="required field">
                        <label for="">发件人邮箱：</label>
                        <input type="email" value="support@eventdove.com">
                    </div>
                </div>
            </div>
            <div class="actions text-center">
                <a class="ui blue button ok ml-n">确定</a>
                <a class="ui button cancel">取消</a>
            </div>
        </div>
    </div>
</template>
<script>
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串 
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};
import {API_URL} from '../../config'

export default {
    data() {
        return {
            info:{
                isNeedInvoice: '',
                totalAmountOfTicketPayment: '',
                orderNumber: "",
                buyer: {
                    checkbox1: "",
                    email: "",
                    name: "",
                    radio1: ""
                },
                invoiceSetting: {
                    deliverFee:'' ,
                    deliverMethod: "",
                    isSplitable: '',
                    serviceItems: "",
                    taxPoint: '',
                    type: ""
                },
                invoice: []
            },
            idToken:'',
            orderNum:GetRequest()
        }
    },
    mounted(){
        this.idToken=JSON.parse(localStorage.getItem('user'));
        this.getData();
    },
    filter:{
        delEmpty:function(value){
            if(value == '' || value=='undefined'){
                return '暂无'
            }
        }
    },
    components: {
    },
    methods:{
        getData(){
            var _this=this;
            $.get( API_URL+"/invoice/getInvoiceDetail",{'orderNumber':_this.orderNum.orderNumber},(data)=>{
                _this.info=data;
                // console.log(JSON.parse(JSON.stringify(data)))
            })
        },
        invoiceSubmit(invoiceId,orderNumber,deliverName,invoiceNumber,deliverNumber){
            var _this=this;
            jQuery.ajax({
                url: API_URL+"/invoice/updateInvoice",
                type: "POST",
                headers: {
                    "Authorization": "Bearer "+_this.idToken.id_token,
                    "Content-Type": "application/json; charset=utf-8",
                },
                data: JSON.stringify({
                    "deliverInformation": {
                        "deliverNumber": deliverNumber,
                        "deliverName": deliverName
                    },
                    "invoiceId": invoiceId, //
                    "invoiceNumber": invoiceNumber,//发票号  
                    "orderNumber": orderNumber
                }),
                success:function(data){
                    if(data){
                        _this.$message.success('提交成功')
                    }
                }
            })
        }
    }
}
</script>
<style scoped>
</style>
