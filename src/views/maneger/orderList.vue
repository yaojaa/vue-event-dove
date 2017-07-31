<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">人员与订单</span>/活动订单</h2>
                <a href="#" class="ui basic button blue mini" @click="createExcel">导出Excel</a>
            </div>
            <div class="white-wrap p-xl">
                <div class="ui form">
                    <div class="ui fluid left icon input field mt-n">
                        <input type="text" v-model="argu.search" placeholder="可按订单号、购票人、邮箱、手机号搜索">
                        <i class="search icon"></i>
                    </div>
                    <div class="inline fields mb-n">
                        <div class="field">
                            <label>订单状态：</label>
                            <select class="ui search dropdown orderSelect">
                                <option value="-1">全部</option>
                                <option :value="status.name" v-for="status in info.orderStatusList">{{status.str}}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label>支付方式：</label>
                            <select class="ui search dropdown paySelect">
                                <option value="-1">全部</option>
                                <option :value="pay.name" v-for="pay in info.paymentMethodList">{{pay.str}}</option>
                            </select>
                        </div>
                        <button class="ui blue button" @click="search">搜索</button>
                    </div>
                </div>
            </div>
            <div class="ui divider hidden"></div>
            <div class="white-wrap p-xl por">
                <h4 class="ui header"><span class="text-blue">{{info.total}}</span> 条订单</h4>
                <table class="ui padded default table">
                    <thead>
                        <tr>
                            <th>订单号/时间</th>
                            <th>购票人信息</th>
                            <th>优惠码</th>
                            <th>参会人数</th>
                            <th>订单状态</th>
                            <th>支付方式</th>
                            <th>实付金额</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in info.items" v-show="info.items.length!=0">
                            <td>
                                <a href="javascript:;" @click="orderDetail(item.id)">{{item.orderNumber}}</a>
                                <br>{{item.cTime | time}}
                            </td>
                            <td>{{item.buyer.name}}<br>{{item.buyer.email}}</td>
                            <td>{{item.discount?item.discount.discountCode:'-'}}</td>
                            <td>{{item.attendees.length}}</td>
                            <td class="text-orange">{{item.status | status(info.orderStatusList)}}</td>
                            <td>{{item.paymentMethod | payM(info.paymentMethodList)}}</td>
                            <td>￥{{item.totalPrice}}</td>
                            <td>
                                <a href="javascript:;" v-if="item.status=='pending'" @click="AuditThrough('audited',item.id)" :ref='item.id' class="mr-md adopt">审核通过</a>
                                <a href="javascript:;" v-if="item.status=='pending'" @click="AuditThrough('reject',item.id)" class="mr-md refuse">审核拒绝</a>
                                <a href="javascript:;" @click="orderDetail(item.id)" class="mr-md order-details">详情</a>
                            </td>
                        </tr>
                        <!-- <tr v-show="info.items.length==0">
                            <td colspan="8" rowspan="8" headers="" style="text-align:center; font-size:18px;">
                                <p style="height:50px;"></p>
                                <img src="../../assets/images/freeData.png" width='150' alt="">
                                <p>暂无数据....</p>
                            </td>
                        </tr> -->
                    </tbody>
                </table>
                <div class="ui active inverted dimmer" v-show="loadingValue">
                    <div class="ui large text loader">Loading</div>
                </div>
                <img src="/images/no_centent.png" alt="暂无数据...." class="ui image medium centered"  v-if="info.items.length==0">
                <page ref="page" @gotoPage="getData"></page>
            </div>
        </div>
        <!-- 订单详情 -->
        <div class="ui admission-ticket modal">
            <i class="close icon"></i>
            <div class="header">
                订单详情
            </div>
            <div class="content" id="detailsPrint">
                <div class="ui three column grid">
                    <div class="column">
                        <div class="ui relaxed list">
                            <div class="item">
                                <div class="header">购票人：{{details.name}}</div>
                            </div>
                            <div class="item">手机号：{{details.mobile}}</div>
                            <div class="item">日期：{{details.cTime |time}}</div>
                            <div class="item">购票邮件：{{details.email}}</div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="ui relaxed list">
                            <div class="item">订单号：{{details.orderNumber}}</div>
                            <div class="item">订单状态：{{orderStat |status(orderStatusArr)}}</div>
                            <div class="item">支付方式: {{payMethods | payM(payMethodsArr)}}</div>
                            <div class="item">是否优惠：无优惠</div>
                            <div class="item">购买渠道：{{details.purchasePlatform}}</div>
                        </div>
                    </div>
                    
                    <div class="middle aligned center aligned column">
                        <div class="f24">
                            <i class="check circle outline icon text-teal"></i><span class="f20">{{orderStat |status(orderStatusArr)}}</span>
                        </div>
                        <div class="sub header">订单金额：
                            <span class="text-orange">{{details.paymentPriceUnitSign}}{{details.totalPrice}}</span>
                        </div>
                    </div>
                </div>
                <div class="ui form">
                    <div class="field" style="margin-top:1em">
                        <label>订单备注</label>
                        <textarea rows="1" v-on:blur="note(details.id,details.orderNote)" v-model="details.orderNote" placeholder="输入订单备注"></textarea>
                    </div>
                </div>
                <h4 class="ui dividing header">购买信息</h4>
                <div class="list" style="max-height:270px; overflow-y:auto; overflow-x:hidden;">
                    <div class="create-border mb-sm" v-for="item in details.orderDetails">
                        <div class="bg-gray ui four column padded grid">
                            <div class="column">
                                <i class="ticket icon blue"></i>
                                <strong class="mr-lg">{{item.ticketName}}</strong>{{item.ticketCount}}张
                            </div>
                            <div class="column">单价：{{details.paymentPriceUnitSign}}{{item.defaultPrice}}</div>
                            <div class="column">折扣：{{details.paymentPriceUnitSign}}{{item.discountPrice}}</div>
                            <div class="column">共计：{{details.paymentPriceUnitSign}}{{item.ticketTotalPrice}}</div>
                        </div>
                        <table class="ui padded table tablet stackable f15">
                            <tbody>
                                <tr v-for="list in item.buyInfos">
                                    <td>{{list.collectInfo.name}}</td>
                                    <td>{{list.collectInfo.email}}</td>
                                    <td>{{list.isETicketSent | ticketSent}}</td>
                                    <!-- <td>{{list.isNeedAudit | audit(details.status)}}</td>   -->
                                    <td>
                                        <a href="javascript:;" v-if="details.status=='partPaid' && list.payStatus =='paid' ">已确认收款</a>
                                        <a href="javascript:;" v-if="list.payStatus =='paid'">退款</a>
                                        <a href="javascript:;" v-if="list.attendeeStatus=='refunded'">退款成功</a>
                                        <a href="javascript:;"  v-if="details.status=='partPaid' && list.payStatus =='none' " @click="onlyPay(list.attendeeId)">确认收款</a>
                                        <a href="javascript:;" @click="detailContent(details.orderNumber,list.attendeeId)" class="mr-md ticket-details">详情</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="actions text-center">
                <div v-if="comStats==='first'">
                    <!-- 待审核      -->
                    <a class="ui blue button ok" @click="AuditThrough('audited',details.id)">审核通过</a>
                    <a class="ui blue button ok" @click="AuditThrough('reject',details.id)">审核拒绝</a>
                    <a class="ui basic button" @click="print"><i class="print icon"></i>打印订单</a>
                </div>
                <div v-if="comStats == 'onlyprint'">
                    <!-- 已审核待付款  已拒绝   未付款  付款超时 订单挂起  订单取消 全部退款-->
                    <a class="ui basic button" @click="print"><i class="print icon"></i>打印订单</a>
                </div>
                <!-- 未付款，且线下支付，且一个也没支付的时候 -->
                <div v-if="comStats==='part'">
                    <a class="ui blue button ok" @click="paymentOk">确认收款</a>
                    <a class="ui blue button ok" @click="cancelOrder">取消订单</a>
                    <a class="ui basic button" @click="print"><i class="print icon"></i>打印订单</a>
                </div>

                <div v-if="comStats==='other'">
                    <!-- 部分退款   完成付款   -->
                    <a class="ui blue button ok" @click="againSend">重发电子票</a>
                    <a class="ui blue button ok" @click="download">下载电子票</a>
                    <a class="ui basic button" @click="print"><i class="print icon"></i>打印订单</a>
                </div>
            </div>
        </div>
        <!-- 查看能会者 -->
        <div class="ui ticket-details-layer small  modal">
            <i class="close icon"></i>
            <div class="header">
                <a class="back-admission-ticket" style="color:#fff"><i class="reply icon"></i>查看订单详情</a>
            </div>
            <div class="content">
                <div class="default-panel bg-gray mb-md">
                    <div class="left"><i class="circular inverted teal user icon big"></i></div>
                    <div class="content">
                        <div class="text-justify mb-sm">
                            <h3 class="mb-n">{{attendee.name}}</h3>
                            <span class="text-muted">订单状态：{{attendee.status | status(orderStatusArr)}}</span>
                        </div>

                        <p v-if="attendee.status=='paid'"
                            <a class="ui blue button mini" @click="sendTicket(attendee.attendeeId,attendee.orderNumber)">重发电子票</a>
                            <a class="ui teal button mini">下载电子票</a>
                            <a class="ui yellow button mini">下载邀请函</a>
                            <a class="ui  button mini return-ticket">退票</a>
                        </p>
                    </div>
                </div>
                <div class="default-panel bg-gray mb-md">
                    <div class="left"><i class="circular inverted blue ticket icon big"></i></div>
                    <div class="content">
                        <div class="text-justify mb-sm">
                            <h3 class="mb-n">{{attendee.ticketName}}</h3>
                            <span class="text-muted">审核状态：{{attendee.isNeedAudit | audit(attendee.status)}}</span>
                        </div>
                        <div class="ui three column grid text-muted">
                            <div class="column">数量：1</div>
                            <div class="column">票价：¥{{attendee.actualTicketPrice}}</div>
                            <div class="column right aligned">合计：¥{{attendee.actualTicketPrice}}</div>
                        </div>
                    </div>
                </div>
                <div class="text-justify">
                    <h3 class="fwn mb-n">参会者信息</h3>
                    <a href="javascript:;" @click="changetAtendeeNews"><i class="write icon"></i>修改参会者信息222</a>
                </div> 
                <div class="ui vertically padded grid" v-show="!changeNews">
                    <div class="row mini" v-for="n in attendee.collectInfoDetails">
                        <div class="two wide column text-muted">{{n.str}}：</div>
                        <div class="fourteen wide column">
                            <div class="ui transparent input w-full">
                                {{n.value}}==
                            </div>
                        </div>  
                    </div>
                </div>
                <div class="ui vertically padded grid" v-show="changeNews">
                    <div class="row mini" v-for="n in attendee.collectInfoDetails">
                        <div class="two wide column text-muted">{{n.str}}：</div>
                        <div class="fourteen wide column">
                            <div class="ui transparent input w-full">
                                <input type="text" v-model="n.value" :value="n.value">
                            </div>
                        </div>  
                    </div>
                </div>
                <div class="ui form">
                    <div class="field">
                        <label class="fwn text-muted">备注：</label>
                        <textarea rows="1" v-model="attendee.notes" :value="attendee.notes" placeholder=""></textarea>
                    </div>
                </div>  
                <div class="actions text-center" style="margin-top:10px;">  
                    <a class="ui blue button ok" @click="saveEdit(attendee.orderNumber, attendee.attendeeId, attendee.notes)">保存</a>
                </div>
            </div>
            

            <div class="actions text-center" v-if="orderStatusValue=='paid'">
                <a v-show="!saveCheckInValue" class="ui blue button ok" @click="sign(attendee.attendeeId,attendee.orderNumber,true)">签到</a>
                <a v-show="saveCheckInValue" class="ui blue button ok" @click="sign(attendee.attendeeId,attendee.orderNumber,false)">取消签到</a>
            </div>
        </div>
        <!-- 退票通知 -->
        <div class="ui return-ticket-layer small  modal">
            <i class="close icon"></i>
            <div class="header">
                退票通知
            </div>
            <div class="content">
                <div class="default-panel">
                    <div class="left top f20">
                        <i class="info circle icon huge yellow"></i>
                    </div>
                    <div class="center">
                        <h3 class="ui header">您确定要退票吗？</h3>
                        <div class="ui relaxed list text-muted">
                            <div class="item">门票价格：1000元</div>
                            <div class="item">退票费：当前时间按5%核计，计为19.5元</div>
                            <div class="item">手续费：27元（服务费12元+支付通道费15元）</div>
                            <div class="item">共计退款：<span class="text-orange">980.50</span>元</div>
                        </div>
                        <div class="actions">
                            <a class="ui blue button ok ml-n">暂不退票</a>
                            <a class="ui yellow button ok">仍要退票</a>
                        </div>
                    </div>
                </div>
                <div class="ui orange message ">
                    <div class="content">
                        <div class="ui  relaxed list">
                            <div class="item">1.退票费按如下规则核收：距活动开始时间10天以内收取5%退票费，一个月以内收取2%手续费，一个月以上全额退款。</div>
                            <div class="item">2.应退款项按银行规定时限退还至所使用的网上支付工具账户，请注意查询，如有疑问请致电自选025-87775086 人工客服查询；</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 审核 弹出 -->
        <div class="ui small basic test modal confirm-layer">
            <div class="ui icon header"><i class="idea icon"></i> {{tips}} </div>
            <div class="actions">
                <div class="ui green ok inverted button"><i class="checkmark icon"></i> 确定 </div>
                <div class="ui red basic cancel inverted button"><i class="remove icon"></i> 取消 </div>
            </div>
        </div>
    </div>
</template>
<script>
import {API_URL} from '../../config'
import moment from 'moment'
import page from '../../components/page'
export default {
    // name: '',
    data() {
        return {
            msg: '活动订单页面',
            info:{
                items:[]
            },
            tips:'',
            argu:{
                eventId: "",
                page:"1",
                limit:"15",
                total:"-1",
                search:"",
                orderStatus:"",
                paymentMethod:"",
            },
            orderStatusValue:'',
            loadingValue:false,
            idToken:'',
            details:{},
            orderStatusArr:[],
            payMethodsArr:[],
            orderStat:'',
            payMethods:'',
            attendee:{},
            saveCheckInValue:false,
            eventId:'',
            orderNumberSave:'',
            attendeeIdsArr:[],
            timer:null,
            chnageNews:false,
            exTimer:null,
            comStats:null,
            changeNews:false,
        }
    },
    
    mounted: function() {
        $('.admission-ticket.modal').modal('attach events', '.back-admission-ticket');
        // $('.return-ticket-layer.modal').modal('attach events', '.return-')
        // $('.examine-ticket-layer.modal').modal('attach events', '.examine-ticket')
        var _this=this;
        this.argu.eventId=this.$route.params.id;
        this.getData();
        this.idToken=JSON.parse(localStorage.getItem('user'));
        $('.ui.search.dropdown.orderSelect').dropdown({
            onChange: function(value, text, $selectedItem){
                value = value==-1? '' :value;
                _this.getStatus(value)
            }
        })
        $('.ui.search.dropdown.paySelect').dropdown({
            onChange:function(value,text,$selectedItem){
                value=value == -1?'':value;
                _this.getPayMthods(value)
            }
        })
    },

    methods:{
        print(){
            // 打印订单
            window.print();  
        },
        onlyPay(attendeeId){ //单个支付
            var _this=this;
            jQuery.ajax({
                url: API_URL+"order/confirmAttendee",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "orderId": _this.details.id,
                    "attendeeId":attendeeId
                })
            })
            .done(function(data, textStatus, jqXHR) {
                _this.$message.success('支付成功');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                _this.$message.success('支付失败');
            })
            
        },
        paymentOk(){ //确认订单支付
            var _this=this;
            jQuery.ajax({
                url: API_URL+"/order/confirmOfflineOrder",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "orderId":_this.details.id
                })
            })
            .done(function(data, textStatus, jqXHR) {
                _this.$message.success('支付成功');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                _this.$message.success('支付失败');
            })
        },
        resubmit(){
            // 重新提交
        },
        cancelOrder(){
            // 取消订单
            
            jQuery.ajax({
                url: API_URL+"/order/cancelOrder",
                type: "POST",
                
                contentType: "application/x-www-form-urlencoded",
                data: {
                    "orderId": _this.argu.eventId,
                },
            })
            .done(function(data, textStatus, jqXHR) {
                console.log("HTTP Request Succeeded: " + jqXHR.status);
                console.log(data);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log("HTTP Request Failed");
            })
            .always(function() {
                /* ... */
            });
        },
        createExcel(){
            var _this=this;
            if(this.info.items.length==0){
                this.$message.warning('暂无数据，不可导出');
                return false;
            }
            jQuery.ajax({
                url: API_URL+"/order/prepareExportOrders",
                type: "GET",
                data: {
                    "eventId": _this.argu.eventId,
                },
                success:function(data,rext,xhr){
                    if(xhr.status==200){
                        if(data.filePath!=''){
                            _this.exTimer=setInterval(function(){
                                _this.createExcelTow(data.filePath);
                            },500)
                        }
                    }
                },
                error:function(err){
                    this.$message.waring(err.responseText.responseText)
                }
            })
            
        },
        createExcelTow(value){
            var _this=this;
            jQuery.ajax({
                url: API_URL+"/attendee/waitForWirtenCompleted",
                type: "GET",
                data: {
                    "filePath":value,
                },
                success:function(data,txt,xhr){
                    if(xhr.status==200){
                        if(data.isWriteComplete){
                            clearInterval(_this.exTimer)
                            _this.createExcelDown(value);
                        }
                    }
                },
                error:function(){}
            })
        },
        createExcelDown(path){

            window.open(API_URL+"/attendee/downloadFile?filePath="+path)
        },
        againSend(){
            // 详情重新发送电子票
            var _this=this;
            jQuery.ajax({
                url: API_URL+"/attendee/reSendEticket",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "attendeeIds": _this.attendeeIdsArr,
                    "orderNumber": _this.orderNumberSave
                }),
                success:function(data){
                    // _this.$message.success(JSON.parse(err.responseText).responseText)
                },
                error:function(err){
                    _this.$message.warning(JSON.parse(err.responseText).responseText)
                }
            })
        },
        download(){
            // 下载电子票
            var _this=this;
            jQuery.ajax({
                url: API_URL+"/attendee/downloadAllEticket",
                type: "GET",
                data: {
                    "orderNumber": _this.orderNumberSave,
                },
                success:function(){
                    window.open(API_URL+'/attendee/downloadAllEticket?orderNumber='+_this.orderNumberSave)
                },
                error:function(err){
                    _this.$message.warning(JSON.parse(err.responseText).responseText)
                }
            })
        },
        getStatus(status){
            // 获取订单状态
            this.argu.orderStatus=status;
            this.getData();
        },
        getPayMthods(pay){
            // 获取支付方式
             this.argu.paymentMethod=pay;
             this.getData();
        },
        search(){
            var _this=this;
            clearInterval(this.timer);
            this.tiemr=setTimeout(function(){
                _this.getData();
            },300)
        },
        sign(aId,orNum,boolean){
            //参会者详情签到 
            var _this=this;
            jQuery.ajax({
                url: API_URL+"/attendee/checkedIn",
                type: "POST",
                headers: {
                    "Authorization": "Bearer "+_this.idToken.id_token,
                    "Content-Type": "application/json; charset=utf-8",
                },
                contentType: "application/json",
                data: JSON.stringify({
                    orderNumber: orNum,
                    checkedStatus:boolean,
                    attendeeId: aId,
                    checkedInType: "admin"
                }),
                success:function(data){
                    console.log(data);
                },
                error:function(err){
                    _this.$message.warning(JSON.parse(err.responseText).responseText)
                }
            })
        },
        sendTicket(aId,orNum){
            // 参会者详情的发送电子票
            var _this=this;
            $.ajax({
                url: API_URL+"/attendee/reSendEticket",
                type: "POST",
                headers: {
                    "Authorization": "Bearer "+_this.idToken.id_token,
                    "Content-Type": "application/json; charset=utf-8",
                },
                contentType: "application/json",
                data: JSON.stringify({
                    orderNumber: orNum,
                    attendeeId:aId
                }),
                success:function(data){
                    console.log(data);
                }
            })
        },
        getData(index){
            this.argu.page=index||this.argu.page;
            this.loadingValue=true;
            var _this=this;
            $.get(API_URL+'/order/getOrderByEventIdAndPageIndex',this.argu,(data)=>{
                this.info=data;
                this.loadingValue=false;
                this.$refs.page.setpageData({
                    currentPage: this.argu.page,
                    allPage:data.totalPage
                })
                if(data.paymentMethodList){
                    this.payMethodsArr=data.paymentMethodList;
                }
                if(data.orderStatusList){
                    this.orderStatusArr=data.orderStatusList;
                }
            })
        },
        AuditThrough(type,orderId){
            if(type == 'audited'){
                this.tips="您确定要审核通过吗？"
            }else{
                this.tips="您确定要拒绝吗？"
            }
            var _this=this;
            $('.confirm-layer.modal') .modal({
                closable  : false,
                onDeny    : function(){},
                onApprove : function() {
                    // 确认
                    $.ajax({
                        url: API_URL+"/order/auditOrder",
                        type: "POST",
                        headers: {
                            "Authorization": "Bearer "+_this.idToken.id_token,
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        contentType: "application/json",
                        data: JSON.stringify({
                            "orderId": orderId,
                            "orderStatus": type
                        }),
                        success(data, XMLHttpRequest, textStatus){
                            if(textStatus.status == 200){
                                if(type=='audited'){
                                    _this.$message({
                                        message: '审核成功',
                                        type: 'success'
                                    })
                                    // $(_this.$refs[orderId]).html('审核通过')
                                }else{
                                    _this.$message({
                                        message: '拒绝成功',
                                        type: 'success'
                                    })
                                }
                                _this.getData();
                                setInterval(function(){
                                   _this.$router.go(0)
                                },2000)
                                return false;
                            }else{
                                if(type == 'audited'){
                                    _this.$message({
                                        message: '审核失败',
                                        type: 'waring'
                                    })
                                }else{
                                     _this.$message({
                                        message: '抱绝失败',
                                        type: 'waring'
                                    })
                                }
                            }
                        }
                    })
                }
            }).modal('show');
            return false;
        },
        // 订单详情
        orderDetail(id){
            $('.admission-ticket.modal').modal('show');
            // 订单详情
            $.get(API_URL+'order/getOrderById',{orderId:id},(data)=>{
                this.details=data;
                this.orderNumberSave=data.orderNumber
                this.details.name=data.buyer.name;
                this.details.email=data.buyer.email;
                this.details.mobile=data.buyer.mobile;
                this.orderStat=data.status;
                this.orderNumberSave=data.orderNumber;
                this.payMethods=data.paymentMethod
                this.selectedBtn(data.status,data.attendees,data.paymentMethod)
                for(let i=0; i<data.attendees.length; i++){
                    this.attendeeIdsArr.push(data.attendees[i].attendeeId);
                }
            })
        },
        selectedBtn(orderStat,buyerlist,online){
                var saveBoolearn=[];
                let Status = {
                    "pending":'first',      // 待审核
                    "audited":'onlyprint',      // 已审核、待收款
                    "reject":'onlyprint',       // 审核拒绝
                    "none":'onlyprint',         // 未支付
                    "timeOut":'onlyprint',      // 超时未支付
                    "hang":'onlyprint',         // 支付挂起
                    "cancel":'onlyprint',       // 取消订单
                    "Refunded":'onlyprint',      // 已退款
                    "partPaid":'other',     // 部分支付

                    "paid":'other',         // 已支付
                    "partRefund":'other',   // 部分退款
                }
                if(orderStat =='none'){
                    if(online =='transfer' || online =='onsite'){
                        for(let i=0; i<buyerlist.length; i++){
                            if(buyerlist[i].payStatus=='none'){
                                saveBoolearn.push('none');
                            }
                        }
                    }
                }
                if(saveBoolearn.indexOf('none')!=-1){
                    this.comStats='part';
                    return false;
                }
                this.comStats=Status[orderStat];
        },
        note(nid,value){
            var _this=this;
            if(value == '' || typeof value=='undefined'){
                return false;
            }
            $.ajax({
                url: API_URL+"/order/updateOrderNote",
                type: "POST",
                headers: {
                    "Authorization": "Bearer "+_this.idToken.id_token,
                    "Content-Type": "application/json; charset=utf-8",
                },
                contentType: "application/json",
                data: JSON.stringify({
                    orderId:nid,
                    orderNote:value
                }),
            })
        },
        detailContent(ordernum,attendId){
            // 订单详情
            $('.ticket-details-layer.modal').modal('show');
            $.get(API_URL+'/attendee/getAttendee',{orderNumber: ordernum, attendeeId: attendId},(data)=>{
                this.attendee=data;
                // isCheckedIn   是否签到
                this.attendee.collectInfoDetails=data.attendeeInfo.collectInfoDetails
                this.attendee.name=data.attendeeInfo.collectInfo.name;
                this.attendee.orderNumber=data.orderInfo.orderNumber;
                this.attendee.attendeeId=data.attendeeInfo.attendeeId;
                this.attendee.status=data.orderInfo.status;
                this.attendee.isNeedAudit=data.attendeeInfo.isNeedAudit
                this.attendee.email=data.attendeeInfo.collectInfo.email;
                this.attendee.ticketName=data.attendeeInfo.codeObj.ticketName;
                this.attendee.actualTicketPrice=data.attendeeInfo.actualTicketPrice;
                this.saveCheckInValue=data.attendeeInfo.isCheckedIn;
                this.orderStatusValue=data.attendeeInfo.payStatus
            })
        },
        changetAtendeeNews(){
            this.changeNews=!this.changeNews;
        },
        saveEdit(orderN,attId,value){
            var data={
                orderNumber:orderN,
                attendeeId:attId,
                collectInfo:{}
            };
            for(let i=0; i<this.attendee.collectInfoDetails.length; i++){
                var item=this.attendee.collectInfoDetails[i];
                data.collectInfo[item.name]=item.value;

            }
            $.post(API_URL+'attendee/updateAttendee',JSON.stringify(data),(data)=>{
                this.$message.success('保存参会者信息成功')
            });
            this.userNote(orderN,attId,value)
        },
        userNote(orderN,attId,value){
            // 添加备注给参会者 
            var _this=this;
            if(value==''){return false;}
            $.ajax({
                url: API_URL+"/attendee/addAttendeeNotes",
                type: "POST",
                headers: {
                    "Authorization": "Bearer "+_this.idToken.id_token,
                    "Content-Type": "application/json; charset=utf-8",
                },
                data: JSON.stringify({
                    orderNumber: orderN,
                    attendeeId: attId,
                    notes: value
                })
            })
        }
    },
    computed:{
        
    },
    filters: {
        time(value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss')
        },
        status(value,arr){
            for(var i=0; i<arr.length; i++){
                if(arr[i].name==value){
                    return arr[i].str;
                    break;
                }
            }
        },
        payM(value,arr){
            if(value=='none'){
                return '无';
            }
            if(arr.length){
                for(var i=0; i<arr.length; i++){
                    if(arr[i].name==value){
                        return arr[i].str;
                        break;
                    }
                }  
            }
        },
        audit(value,status){
            if(value && status=='pending'){
                return '需要审核'
            }else if(value && status!='pending'){
                return '已审核'
            }else if(!value){
                return '不需要审核'
            }
        },
        ticketSent(value){
            if(value){
                return '已发电子票'
            }else{
                return '未发电子票'
            }
        }
    },
    components:{
        page
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #loadOffset{position:absolute; border:none; background:none; left:50%; border-show:none; margin-left:-28px; top:150px}
</style>
