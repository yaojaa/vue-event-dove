<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">基本管理</span>/活动设置</h2>
            </div>
            <div class="block-tab">
                <div class="ui four item secondary menu f16">
                    <a class="item" :class="[saveTabs=='base'?'active':'']" @click="tabs('base')">
                        <span><i class="setting icon"></i>基本设置</span>
                    </a>
                    <a class="item" :class="[saveTabs=='payment'?'active':'']" @click="tabs('payment')">
                        <span><i class="icon-xianxia iconfont icon"></i>收款设置</span>
                    </a>
                    <a class="item" :class="[saveTabs=='backTickets'?'active':'']" @click="tabs('backTickets')">
                        <span><i class="ticket icon"></i>退票设置</span>
                    </a>
                    <a class="item":class="[saveTabs=='invoice'?'active':'']" @click="tabs('invoice')">
                        <span><i class="print icon"></i>发票设置</span>
                    </a>
                </div>
                <div class="ui tab" :class="[saveTabs=='base'?'active':'']">
                    <div class="ui form">
                        <div class="ui grid">
                            <div class="row">
                                <div class="three wide column right aligned middle aligned">售票模式：</div>
                                <div class="thirteen wide column">
                                    <div class="ui toggle checkbox confirm-sms" >
                                        <input type="checkbox" value="true" v-model="basicSettings.isCollectAttendees">
                                        <label></label>
                                    </div>
                                    <div class="text-muted ml-lg inline-block">（收集每一位参会人信息）<span class="text-info">关闭后为购票者模式</span></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="three wide column right aligned middle aligned">自定义活动网址：</div>
                                <div class="thirteen wide column">
                                    <div class="ui right labeled input">
                                        <div class="ui basic label">http://</div>
                                        <input type="text" placeholder="例：2017gmgct" v-model="basicSettings.customHref">
                                        <div class="ui basic label">.eventdove.com</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="three wide column right aligned">开启短信通知：</div>
                                <div class="thirteen wide column">
                                    <div class="ui toggle checkbox confirm-sms">
                                        <input type="checkbox" value="true" v-model="basicSettings.smsNotice" >
                                        <label></label>
                                    </div>
                                    <div class="text-muted ml-lg inline-block">开启通知后，活动验证码会以短信形式发送给参会者！</div>
                                    <a href="#" class="" @click="showTips()">自定义设置短信内容</a>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-lg">
                            <button class="ui primary button" @click="baseSettingSubmit">保存</button>
                        </div>
                    </div>
                </div>
                <div class="ui tab" :class="[saveTabs=='payment'?'active':'']">
                    <div class="ui form">
                        <div class="ui  grid">
                            <div class="row">
                                <div class="three wide column right aligned ">收款方式：</div>
                                <div class="thirteen wide column">
                                    <div class="inline fields mb-n">
                                        <div class="field">
                                            <div class="ui radio checkbox">
                                                <input type="radio" name="paymentType" checked="">
                                                <label>会鸽钱包代收</label>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui radio checkbox">
                                                <input type="radio" name="paymentType" disabled="disabled">
                                                <label>收自己账户（该功能暂未开放，敬请期待！）</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui message yellow" v-show="info.paymentPriceUnit=='yuan'">
                                        <p>当前活动收款方式为人民币（¥）收款，活动结束后可全额提现至自己的银行账户，若活动尚未结束必须可提现金额满¥5000及以上才可提现。</p>
                                    </div>
                                    <div class="ui message yellow" v-show="info.paymentPriceUnit=='dollar'">
                                        <p>
                                            当前活动收款方式为美元（$）收款，活动结束后可全额提现至自己的银行账户，若活动尚未结束必须可提现金额满$740及以上才可提现。
                                        </p>
                                        <ul class="list">
                                            <li>收款手续费：收款金额的4.4%+0.3美元；</li>
                                            <li>提现手续费：提现金额的1.2%。</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="three wide column right aligned middle aligned">是否支持线下收款:</div>
                                <div class="thirteen wide column">
                                    <div class="ui toggle checkbox confirm-sms">
                                        <input type="checkbox" value="paymen" v-model="paymentSettings.isDownPayment">
                                        <label>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-show="paymentSettings.isDownPayment">
                                <div class="three wide column right aligned middle aligned">选择收款账户：</div>
                                <div class="thirteen wide column">
                                    <select class="ui search dropdown payAccount">
                                        <option value="">请选择收款账户</option>
                                        <option :value="bank.accountId" v-if="bank.status=='normal'" v-for="(bank,index) in bankList">{{bank.bankAccount}}</option>
                                    </select>
                                    <a href="/bankCardAdd" target="__blank" class="ui button blue basic">添加账户</a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="three wide column right aligned middle aligned">是否支持现场收款：</div>
                                <div class="thirteen wide column">
                                    <div class="ui toggle checkbox confirm-sms">
                                        <input type="checkbox" value="scene" v-model="paymentSettings.scenePayment">
                                        <label>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-lg">
                            <button type="submit" @click="paymentSettingsSubmit" class="ui button blue">保存</button>
                        </div>
                    </div>
                </div>
                <div class="ui tab" :class="[saveTabs=='backTickets'?'active':'']">
                    <div class="ui form">
                        <div class="ui grid" v-for="(retreat,index) in backTickets">
                            <div class="fourteen wide column ">
                                <div class="mb-sm">
                                    <div class="ui padded grid bg-gray">
                                        <div class="three wide middle aligned right aligned column">
                                            距活动开始剩余：
                                        </div>
                                        <div class="five wide column bottom aligned">
                                            <div class="ui fluid right labeled input">
                                                <input type="text" v-model="retreat.daysBeforeStart" placeholder="例如：3">
                                                <div class="ui basic label">天</div>
                                            </div>
                                        </div>
                                        <div class="three wide middle aligned right aligned column">
                                            应扣退票费：{{backTickets.length}}
                                        </div>
                                        <div class="five wide column bottom aligned">
                                            <div class="ui fluid right labeled input">
                                                <input type="text" v-model="retreat.refundRate" placeholder="例如：10">
                                                <div class="ui basic label">%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="two wide bottom aligned column">
                                <div class="mb-lg">
                                    <i class="add circle icon blue large" style="cursor:pointer" @click="addItmes(index)"></i>
                                    <i v-if="backTickets.length!=1" style="cursor:pointer" @click="delItmes(index)" class="minus circle icon large"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="wide column text-orange">提示：退票金额 = 订单支付金额 - 退票费- 支付通道费 ；退票费 = （订单支付金额-支付通道费）* N %</div>
                        </div>
                        <div class="text-center mt-lg">
                            <button type="submit" class="ui button blue" @click="backTicketsSubmit">保存</button>
                        </div>
                    </div>
                </div>
                <div class="ui tab" :class="[saveTabs=='invoice'?'active':'']">
                    <div class="ui form">
                        <div class="ui grid">
                            <div class="row">
                                <div class="three wide column right aligned">是否开具发票：</div>
                                <div class="thirteen wide column">
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" value="true" v-model="isProvideInvoice">
                                        <label class="text-muted"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ui grid" v-show="isProvideInvoice">
                            <div class="row">
                                <div class="three wide column right aligned">发票类型：</div>
                                <div class="thirteen wide column">
                                    <div class="inline fields mb-n">
                                        <div class="field" v-for="invo in invoiceSettingData.invoiceTypeList">
                                            <div class="ui checkbox">
                                                <input type="checkbox" :id="invo.name" :value="invo.name" v-model="invoiceSetting.type">
                                                <label :for="invo.name" style="cursor:pointer">{{invo.str}}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="three wide column right aligned">服务项目：</div>
                                <div class="thirteen wide column">
                                    <div class="mb-sm">
                                        <div v-for="(service,index) in invoiceSetting.serviceItems" class="ui label basic blue mini horizontal">{{service}}
                                            <i class="delete icon" @click="serviceDel(index)"></i>
                                        </div>
                                    </div>
                                    <div class="fields">
                                        <div class="ten wide field">
                                            <input type="text" placeholder="" v-model="serviceType" @keyup.13="serviceAdd">
                                        </div>
                                        <div class="two wide field">
                                            <button class="ui primary button" @click.stop="serviceAdd">添加</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="three wide column right aligned middle aligned">领取方式：</div>
                                <div class="thirteen wide column">
                                    <div class="inline fields mb-n">
                                        <div class="field" v-for="delive in invoiceSettingData.deliverMethodList">
                                            <div class="ui radio checkbox">
                                                <input type="radio" :id="delive.name" :value="delive.name" v-model="deliverMethodCopy" >
                                                <label :for="delive.name" style="cursor:pointer">{{delive.str}}</label>
                                            </div>
                                        </div>
                                        <div class="field" v-if="invoiceSetting.deliverMethod=='express'">
                                            <div class="ui right labeled input">
                                                <input type="text" v-model="invoiceSetting.deliverFee" placeholder="请输入快递费用">
                                                <div class="ui basic label">￥</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="three wide column right aligned">拆分发票：</div>
                                <div class="thirteen wide column">
                                    <div class="inline fields">
                                        <div class="field">
                                            <div class="ui radio checkbox">
                                                <input type="radio" id="noSplit" value="0" v-model="isSplitableStr" name="fruit">
                                                <label for="noSplit" style="cursor:pointer">不可拆分</label>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui radio checkbox">
                                                <input type="radio" id="split" value="1" v-model="isSplitableStr" name="fruit">
                                                <label for="split" style="cursor:pointer">可拆分开票</label>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="text-orange">提示：拆分开票是指将订单支付总金额根据每个参会者对应购票价分开开票</p>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-lg">
                            <button type="submit" class="ui button blue" @click="invoiceSettingfn">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui small standard test modal messageNews confirm-sms-layer">
            <i class="close icon"></i>
            <div class="header">
                自定义设置短信内容
            </div>
            <div class="ui form content">
                <div class="target" style="padding-bottom:20px;">
                    <button class="ui primary button mini" @click="addStr('#姓名#')">姓名</button>
                    <button class="ui primary button mini" @click="addStr('#签到码#')">签到码</button>
                    <button class="ui primary button mini" @click="addStr('#电子票#')">电子票</button>
                    <button class="ui primary button mini" @click="addStr('#活动链接#')">活动链接</button>
                </div>
                <div class="field">
                <textarea name="" class="templateTxt" v-model="basicSettings.customSmsContent" :value="112312331321"></textarea>
                </div>
            </div>
            <div class="actions">
                <div class="ui button" @click="delStr()">取消</div>
                <div class="ui button blue" @click="hideTips()">确定</div>
            </div>
        </div>
</div>
</template>
<script>
    function isArray(o){
        return Object.prototype.toString.call(o)=='[object Array]';
    }
    import {API_URL} from '../../config'
    export default {
        data() {
            return {
                info:{},
                bankList:[],
                customNewsInput:'',
                basicSettings: {
                    customHref: '', //活动网址
                    smsNotice: false,
                    isCollectAttendees: true,
                    customSmsContent:''
                },
                paymentSettings: {
                    id:[],
                    paymentPriceUnit:'',
                    isDownPayment: false,
                    accountPayment: [],
                    scenePayment: false,
                },
                backTickets: [
                    
                ],
                serviceType:"",
                isProvideInvoice: false,
                deliverMethodCopy:'onsite',
                isSplitableStr:0,
                invoiceSetting: {
                    type: [],// 发票类型
                    serviceItems : [],// 服务项目
                    taxPoint : 0,// 税点设置,不需要税点请填写0,如需要收取税点设置为对应的值
                    deliverMethod: ['onsite'],// 发票领取方式,onsite现场领取,express快递领取
                    deliverFee   :0,// 快递费,包邮请设置为0
                    isSplitable  : 0,// 是否能拆分发票,拆分开票是指将订单支付总金额根据每个参会者对应购买价分开开票
                },
                invoiceSettingData:{},
                eventId:'',
                saveTabs:'base',
                isGetWalletDetail:false,
            }
        },
        watch:{
            deliverMethodCopy(value){
                this.invoiceSetting.deliverMethod=[];
                this.invoiceSetting.deliverMethod.push(value);
            },
        },
        mounted: function() {
            this.eventId=this.$route.params;
            var _this=this;
            $('.ui.search.dropdown.payAccount').dropdown({
                onChange:function(value,text,$item){
                    _this.payId(value);
                }
            })

            $.get(API_URL + '/event/get', {'id':this.eventId.id}, (data) => {
                this.info=data;
                if(typeof data.smsNotice == 'undefined'){
                    this.basicSettings.smsNotice=false;
                }else{
                    this.basicSettings.smsNotice=data.smsNotice;
                }
                if(typeof data.isCollectAttendees == 'undefined'){
                    this.basicSettings.isCollectAttendees=false;
                }else{
                    this.basicSettings.isCollectAttendees=data.isCollectAttendees;
                }
                this.basicSettings.customSmsContent=data.customSmsContent;
                this.paymentSettings.paymentPriceUnit=data.paymentPriceUnit;
                // console.log(data.paymentMethod,'========')

                this.paymentSettings.scenePayment=data.paymentMethod.indexOf('onsite')!=-1?true:false;
                this.paymentSettings.isDownPayment=data.paymentMethod.indexOf("transfer")!=-1?true:false;
                this.isProvideInvoice=data.isProvideInvoice; //是否开具发票
                if(data.domainName){
                    this.basicSettings.customHref=data.domainName;
                }
                if(data.isSelfRefundable && data.refundSettings && data.refundSettings.length>0){
                    this.backTickets=data.refundSettings;
                }else{
                    this.backTickets.push({daysBeforeStart:'',refundRate:''})
                }
                // console.log(this.backTickets)
                if(!this.isProvideInvoice){
                    this.invoiceSetting.serviceItems=['会议费','咨询费','培训费','服务费'];
                    this.invoiceSetting.type=[];
                }else{
                    // 服务项目
                    for(let s=0; s<data.invoiceSetting.serviceItems.length; s++){
                        this.invoiceSetting.serviceItems.push(data.invoiceSetting.serviceItems[s]);
                    }
                }

                if(data.invoiceSetting){
                    this.invoiceSettingData=data.invoiceSetting;
                    // this.invoiceSetting.deliverMethod=[];
                    // 领取方式
                    if(data.invoiceSetting.deliverFee && this.isProvideInvoice){
                        this.invoiceSetting.deliverFee=data.invoiceSetting.deliverFee;
                    }
                    if(this.isProvideInvoice){
                        for(let i=0; i<data.invoiceSetting.deliverMethod.length; i++){
                            this.deliverMethodCopy=data.invoiceSetting.deliverMethod[i].name
                        }
                        // 是否可拆分
                        if(data.invoiceSetting.isSplitable){
                            this.isSplitableStr=1;
                        }else{
                            this.isSplitableStr=0;
                        }
                        // 发票类型
                        for(let t=0; t<data.invoiceSetting.type.length; t++){
                            this.invoiceSetting.type.push(data.invoiceSetting.type[t].name);
                        }
                    }
                }
            })
            var _this=this;
        },
        methods: {
            getWalletDetailFn(){
                var _this=this;
                $.ajax({
                    url:API_URL+"wallet/getWalletDetail",
                    async:false,
                    success:function(data,req,xhr){
                        if(xhr.status==200){
                            if(data.businessAccount ){
                                if(data.businessAccount.length>0){
                                    for(let i=0; i<data.businessAccount.length; i++){
                                        _this.bankList.push(data.businessAccount[i]);
                                    }
                                }
                            }
                            if(data.personalAccount){
                                if(data.personalAccount.length>0){
                                    for(let i=0; i<data.personalAccount.length; i++){
                                        _this.bankList.push(data.personalAccount[i]);
                                    }
                                }
                            }
                        }
                        for(let i=0; i<_this.bankList.length; i++){
                            if(_this.bankList[i].accountId == _this.info.paymentAccountIds[0]){
                                $('.ui.search.dropdown.payAccount').dropdown('set value', _this.info.paymentAccountIds[0]).dropdown('set text', _this.bankList[i].bankAccount);
                            }
                        }
                        
                    },

                    error:function(err){
                        _this.$message.warning(JSON.parse(err.responseText).responseText)
                    }
                })
            },
            tabs(value){  //tabs点击事件
                this.saveTabs=value
                if(this.saveTabs=='payment' && !this.isGetWalletDetail){
                    this.getWalletDetailFn();
                }
            },
            showTips(){ //显示弹出框
                $('.standard.test.modal').modal('show');
            },
            hideTips(){ //隐藏弹出框
                $('.standard.test.modal').modal('hide');
            },
            addStr(value){ //模板内容
                this.basicSettings.customSmsContent+=value;
            },
            delStr(){
                this.paymentSettings.customSmsContent='';
                this.hideTips();
            },
            payId(value){
                this.paymentSettings.id=[];
                this.paymentSettings.id.push(value);
            },
            isOnsite(){
                if(this.deliverMethodCopy=='onsite'){
                    this.invoiceSetting.deliverFee=0;
                }
            },
            submitUpdate(){
                // 更新短信  信息状态
                this.basicSettings.id=this.eventId.id;
                $.post(API_URL+'/event/update',JSON.stringify(this.basicSettings),(data,req,xhr)=>{
                    // console.log(data);
                    if(xhr.status==200){
                        this.$message.success('保存成功')
                    }
                })
            },
            submitHref(){
                // 更新网址
                var _this=this;
                $.ajax({
                    url: API_URL+"/event/updateDomainName",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        eventId: _this.eventId.id,
                        domainName: _this.basicSettings.customHref
                    }),
                    success:function(data,req,xhr){
                        if(xhr.status==200){
                            console.log(data)
                            _this.$message.success('保存成功');
                            _this.$emit('domainChange',data.domainName)
                        }
                    },
                    error:function(err){
                        _this.$message.warning(err.responseText)
                    }
                })
            },
            baseSettingSubmit() {
                // 基本设置提交
                var _this=this;
                // 提交状态
                this.submitUpdate()
                // 子站网址
                if(this.basicSettings.customHref){
                    this.submitHref();
                }
            },
            // 以上是基本设置

            paymentSettingsSubmit() { //收款
                var _this=this;
                $.ajax({
                    url: API_URL+'/event/update',
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        'id':_this.eventId.id,
                        'paymentPriceUnit':_this.paymentSettings.paymentPriceUnit,
                        'paymentAccountIds':_this.paymentSettings.id,
                        'onsite':_this.paymentSettings.scenePayment,
                        'transfer':_this.paymentSettings.isDownPayment
                    }),
                    success:function(data,textStatus,xhr){
                        if(xhr.status==200){
                            _this.$message.success('保存成功');
                        }
                    },
                    error:function(err){
                        _this.$message.success(erri.responseText);
                    }
                })
            },
            // 以上是收款设置
            addItmes(index) {
                var data={daysBeforeStart:'',refundRate:''};
                if(this.backTickets.length==1){
                    this.backTickets.push(data);
                }else{
                    this.backTickets.splice(index, 0, data);
                }
            },
            delItmes(index) {
                this.backTickets.splice(index, 1);
            },
            backTicketsSubmit() {
                var _this=this;

                if(this.backTickets.length==1){
                    if(this.backTickets[0].refundRate=='' || this.backTickets[0].daysBeforeStart == ''){
                        this.backTickets=[];
                    }
                }

                $.ajax({
                    url:API_URL+'/event/update',
                    type: "POST",
                    contentType: "application/json",
                    data:JSON.stringify({
                        isSelfRefundable:true,
                        refundSettings:this.backTickets,
                        id:this.eventId.id
                    }),
                    success:function(data,req,xhr){
                        if(xhr.status==200){
                            _this.$message.success('保存成功');
                        }
                        if(_this.backTickets.length==0){
                            _this.backTickets.push({daysBeforeStart:'',refundRate:''})
                        }
                    },
                    error:function(err){
                        _this.$message.success(err.responseText);
                    }
                })
            },
             // 以上是退票设置
            serviceAdd() {
                // 添加服务项目
                this.invoiceSetting.serviceItems.push(
                    this.serviceType
                    )
                this.serviceType = '';
            },
            serviceDel(index){
                // 删除服务项目
                this.invoiceSetting.serviceItems.splice(index, 1);
            },
            //  发票设置提交
            invoiceSettingfn() {
                var _this=this;
                if(!this.isProvideInvoice){
                    this.invoiceSetting= {
                        type: [],// 发票类型
                        serviceItems : [],// 服务项目
                        taxPoint : 0,// 税点设置,不需要税点请填写0,如需要收取税点设置为对应的值
                        deliverMethod: ['onsite'],// 发票领取方式,onsite现场领取,express快递领取
                        deliverFee   :0,// 快递费,包邮请设置为0
                        isSplitable  : false,// 是否能拆分发票,拆分开票是指将订单支付总金额根据每个参会者对应购买价分开开票
                    }
                }else{
                    if(this.isSplitableStr==1){
                        this.invoiceSetting.isSplitable=true
                    }else{
                        this.invoiceSetting.isSplitable=false
                    }
                    this.isOnsite();
                    if(this.invoiceSetting.serviceItems.length==0){
                        this.$message.warning('服务项目不能为空！');
                        return false;
                    }
                    if(this.invoiceSetting.type.length==0){
                        this.$message.warning('请选择发票类型');
                        return false;
                    }
                }
                console.log(this.info.isCollectAttendees)
                if(!this.info.isCollectAttendees){
                    if(this.invoiceSetting.isSplitable){
                        this.$message.warning('活动为购票者模式，发票不可拆分');
                        this.invoiceSetting.isSplitable=false;
                        this.isSplitableStr=0;
                        return false;
                    }
                }

                jQuery.ajax({
                    url: API_URL+"/invoice/updateInvoiceSetting",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        "eventId": this.eventId.id,
                        "isProvideInvoice": _this.isProvideInvoice,
                        "invoiceSetting": _this.invoiceSetting
                    }),
                    success:function(data,req,xhr){
                        if(xhr.status==200){
                            _this.$message.success('保存成功');
                        }
                    },
                    error:function(err){
                        _this.$message.success(err.responseText);
                    }
                })
            }
        }
    }
</script>
<style scoped>
/*    .ui.small.modal.messageNews{background:#fff; padding:10px;}
    .ui.small.modal.messageNews>.header{    display: block;
        font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
        background: #FFF;
        margin: 0;
        padding: 1rem 1rem;
        box-shadow: none;
        color: rgba(0,0,0,.85);
        border-bottom: 1px solid rgba(34,36,38,.15);
    }
    .ui.small.modal.messageNews>.close{color:#333;}
    .ui.modal.modal.messageNews>.content{padding:1em;}
    .ui.small.modal.messageNews .templateTxt{
        margin: 0;
        -webkit-appearance: none;
        width:100%;
        height:100px;
        tap-highlight-color: rgba(255,255,255,0);
        padding: .78571429em 1em;
        background: #FFF;
        border: 1px solid rgba(34,36,38,.15);
        outline: 0;
        color: rgba(0,0,0,.87);
        border-radius: .28571429rem;
        box-shadow: 0 0 0 0 transparent inset;
        -webkit-transition: color .1s ease,border-color .1s ease;
        transition: color .1s ease,border-color .1s ease;
        font-size: 1em;
        line-height: 1.2857;
        resize: vertical;
    }
    .ui.activeMenu {
        margin:0px;
        padding:0px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin: 1rem 0;
        font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
        background: #FFF;
        font-weight: 400;
        border: 1px solid #dde0ec;
        box-shadow: 0 1px 2px 0 #dde0ec;
        border-radius: .28571429rem;
        min-height: 2.85714286em;
    }
    .ui.secondary.item.activeMenu {
        margin-left: 0;
        margin-right: 0;
    }

    .ui.secondary.activeMenu {
        background: 0 0;
        margin-left: -.35714286em;
        margin-right: -.35714286em;
        border-radius: 0;
        border: none;
        box-shadow: none;
    }
    .ui.menu:first-child {
        margin-top: 0;
    }
    .ui.item.activeMenu{
        width: 100%;
        padding-left: 0!important;
        padding-right: 0!important;
        margin-left: 0!important;
        margin-right: 0!important;
        text-align: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        border-radius: 0;
        border: none;
        box-shadow: none;
        display: flex;
        margin: 1rem 0;
        font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
        background: 0 0;
        margin-left: -.35714286em;
        margin-right: -.35714286em;
        border-radius: 0;
        border: none;
        box-shadow: none;
    }

    .ui.item.activeMenu, .ui.item.activeMenu .item {
        width: 100%;
        padding-left: 0!important;
        padding-right: 0!important;
        margin-left: 0!important;
        margin-right: 0!important;
        text-align: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .ui.secondary.activeMenu .item{
        -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
        box-shadow: none;
        border: none;
        padding: .78571429em .92857143em;
        margin: 0 .35714286em;
        background: 0 0;
        -webkit-transition: color .1s ease;
        transition: color .1s ease;
        border-radius: .28571429rem;
    }
    .block-tab .ui.item.activeMenu .item {
        padding: 0 !important;
    }
    .ui.activeMenu.four.item .item {
        width: 25%;
    }
    .ui.item.activeMenu, .ui.item.activeMenu .item {
        width: 100%;
        padding-left: 0!important;
        padding-right: 0!important;
        margin-left: 0!important;
        margin-right: 0!important;
        text-align: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }
    .ui.secondary.menu .activeMenu {
        -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
        box-shadow: none;
        border: none;
        padding: .78571429em .92857143em;
        margin: 0 .35714286em;
        background: 0 0;
        -webkit-transition: color .1s ease;
        transition: color .1s ease;
        border-radius: .28571429rem;
    }
    .ui.activeMenu:not(.vertical) .item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .ui.activeMenu .item {
        position: relative;
        vertical-align: middle;
        line-height: 1;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background: 0 0;
        padding: .92857143em 1.14285714em;
        text-transform: none;
        color: rgba(0,0,0,.87);
        font-weight: 400;
        -webkit-transition: background .1s ease,box-shadow .1s ease,color .1s ease;
        transition: background .1s ease,box-shadow .1s ease,color .1s ease;
    }
    .block-tab .ui.item.activeMenu .item>span {
        display: inline-block;
        width: 100%;
        background: rgba(255, 255, 255, 0.5);
        margin: 0 .5em;
        padding: 1.6em 0;
        border-bottom: .5em solid #f4f5f8;
        border-radius: 5px 5px 0 0;
    }

    .block-tab .ui.secondary.activeMenu .active.item, 
    .block-tab .ui.secondary.activeMenu .item:hover {
        background: none;
    }
    .block-tab .ui.item.activeMenu .item {
        padding: 0 !important;
    }
    .ui.activeMenu.four.item .item {
        width: 25%;
    }
    .ui.secondary.activeMenu .active.item {
        box-shadow: none;
        background: rgba(0,0,0,.05);
        color: rgba(0,0,0,.95);
        border-radius: .28571429rem;
    }
    .block-tab .ui.secondary.activeMenu .active.item>span {
        background: #fff;
        border-bottom: .5em solid #fff;
        color: #09f;
    }
    .block-tab .ui.item.activeMenu .item:first-child>span {
        margin-left: 0;
    }
    .block-tab .ui.item.activeMenu .item>span {
        display: inline-block;
        width: 100%;
        background: rgba(255, 255, 255, 0.5);
        margin: 0 .5em;
        padding: 1.6em 0;
        border-bottom: .5em solid #f4f5f8;
        border-radius: 5px 5px 0 0;
    }
    .block-tab .ui.item {
        margin-bottom: 0;
        min-height: 0;
    }*/
</style>
