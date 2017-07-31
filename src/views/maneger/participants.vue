<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">人员与订单</span>/参会人员</h2>
                <div class="button-group">
                     <router-link class="ui basic button teal mini" to="./addParticipants">添加参会人员</router-link>
                     <a href="#" class="ui basic button blue mini" @click="createExcel">导出Excel</a>
                </div>
            </div>

            <div class="white-wrap p-xl">
                <div class="ui form">
                    <div class="ui fluid left icon input mt-n field">
                        <input type="text" v-model="argu.search" :value="argu.search" placeholder="可按订单号、购票人、邮箱、优惠码搜索">
                        <i class="search icon"></i>
                    </div>
                    <div class="inline fields mb-n">
                        <div class="field">
                            <label>签到状态：</label>
                            <select class="ui search dropdown signSelected">
                                <option value="">请选择</option>
                                <option :value="status.name" v-for="status in info.signStatusList">{{status.str}}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label>门票名称：</label>
                            <select class="ui search dropdown ticketSelected">
                                <option value="">请选择</option>
                                <option :value="ticket.name" v-for="ticket in info.ticketList">{{ticket.str}}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label>退票状态：</label>
                            <select class="ui search dropdown attendeeStatus">
                                <option value="">请选择</option>
                                <option :value="ticketStatus.name" v-for="ticketStatus in info.attendeeStatusList">{{ticketStatus.str}}</option>
                            </select>
                        </div>
                        <button class="ui blue button" @click="searchUser">搜索</button>
                    </div>
                </div>
            </div>
            <div class="ui divider hidden"></div>
            <div class="white-wrap p-xl por">
                <div class="ui horizontally padded grid">
                    <div class="wide column">
                        <div class="ui checkbox mr-sm">
                            <input type="checkbox" v-model="selectedAll" name="">
                            <label>全选</label>
                        </div>
                        <a href="javascript:;" @click="sendEmail" class="ui blue label router-link-exact-active router-link-active">发送邮件</a>
                        <a href="javascript:;" @click="sendMessages" class="ui teal label router-link-exact-active router-link-active">发送短信</a>
                        <a class="ui pink label" @click="alignSend(info.items[0].codeObj.orderNumber)">重发电子票</a>
                        <!--<a class="ui purple label remarks-ticket">添加备注</a>-->
                        <h4 class="ui header" style="float:right;margin:0px;"><span class="text-blue">{{info.total}}</span> 位参会人</h4>
                    </div>
                </div>
                <table class="ui padded default table">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>邮箱</th>
                            <th>手机号</th>
                            <th>门票类型</th>
                            <th>购买渠道</th>
                            <th>签到状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in info.items" v-show="info.items.length>0">
                            <td>
                                <div class="ui checkbox checked">
                                    <input type="checkbox" name="" :value="item.attendeeId" :email="item.collectInfo.email" ref="item.attendeeId" v-model="selectedArr" :phone="item.collectInfo.mobile" >
                                    <label>{{item.collectInfo.name}}</label>
                                </div>
                            </td>
                            <td>{{item.collectInfo.email}}</td>
                            <td>{{item.collectInfo.mobile}}</td>
                            <td>{{item.currentTicketInfo.name}}</td>
                            <td>{{item.purchasePlatform | channel}}</td>
                            <td>{{item.isCheckedIn | signStatus(info.signStatusList)}}</td>
                            <td>
                                <a href="javascript:;" class="mr-md order-details" @click="getDetail(item.codeObj.orderNumber,item.attendeeId)">详情</a>
                                <a href="javascript:;" class="mr-md remarks-ticket" @click="listNote(item.codeObj.orderNumber,item.attendeeId,item.notes)">备注</a>
                            </td>
                        </tr>
                        <!-- <tr v-show="info.items.length==0">
                            <td colspan="6" rowspan="" headers="" style="text-align:center;">
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
        <div class="ui ticket-details-layer small  modal">
            <i class="close icon"></i>
            <div class="header">订单详情</div>
            <div class="content">
                <div class="default-panel bg-gray mb-md">
                    <div class="left"><i class="circular inverted teal user icon big"></i></div>
                    <div class="content">
                        <div class="text-justify mb-sm">
                            <h3 class="mb-n">{{detail.attendeeInfo.collectInfo.name}}</h3>
                            <span class="text-muted">订单状态：{{detail.orderInfo.statusStr}}</span>
                        </div>
                        <p v-if="detail.attendeeInfo.payStatus=='paid'">
                        <!-- <p> -->
                            <a class="ui blue button mini" @click="againSend">重发电子票</a>
                            <a class="ui teal button mini" @click="download">下载电子票</a>
                            <a class="ui yellow button mini">下载邀请函</a>
                            <!-- <a class="ui  button mini return-ticket">退票</a> -->
                        </p>
                    </div>
                </div>
                <div class="default-panel bg-gray mb-md">
                    <div class="left"><i class="circular inverted blue ticket icon big"></i></div>
                    <div class="content">
                        <div class="text-justify mb-sm">
                            <h3 class="mb-n">{{detail.ticketInfo.name}}</h3>
                            <!-- <span class="text-muted">审核状态：无需审核</span> -->
                        </div>
                        <div class="ui three column grid text-muted">
                            <div class="column">数量：1</div>
                            <div class="column">票价：{{detail.attendeeInfo.actualTicketPrice}}</div>
                            <div class="column right aligned">合计：¥{{detail.attendeeInfo.actualTicketPrice}}</div>
                        </div>
                    </div>
                </div>
                <div class="text-justify">
                    <h3 class="fwn mb-n">参会者信息</h3>
                    <a href="javascript:;" @click="changeNewsfn"><i class="write icon"></i>修改参会者信息</a>
                </div>

                <div class="ui vertically padded grid" v-show="changeNews">
                    <div class="row mini" v-for="news in detail.attendeeInfo.collectInfoDetails">
                        <div class="two wide column text-muted">{{news.str}}：</div>
                        <div class="fourteen wide column">
                            <div class="ui transparent input w-full">
                                {{news.value}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ui vertically padded grid" v-show="!changeNews">
                    <div class="row mini" v-for="news in detail.attendeeInfo.collectInfoDetails">
                        <div class="two wide column text-muted">{{news.str}}：</div>
                        <div class="fourteen wide column">
                            <div class="ui transparent input w-full">
                                <input type="text" v-model="news.value">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui form">
                    <div class="field">
                        <label class="fwn text-muted">备注：</label>
                    <textarea rows="1" placeholder=""  v-model="detail.attendeeInfo.notes" :value="detail.attendeeInfo.notes"></textarea>
                    </div>
                </div>
            </div>
            <div class="actions text-center">
                <a class="ui blue button ok" @click="saveEdit(detail.attendeeInfo.notes)">保存</a>
                <a class="ui blue button ok" v-if="!detail.attendeeInfo.isCheckedIn && orderStatusValue=='paid'" @click="sign(detail.orderInfo.orderNumber,detail.attendeeInfo.attendeeId,true)">签到</a>
                <a class="ui blue button ok" v-if="detail.attendeeInfo.isCheckedIn && orderStatusValue=='paid'" @click="sign(detail.orderInfo.orderNumber,detail.attendeeInfo.attendeeId,false)">取消签到</a>
            </div>
        </div>
        <div class="ui return-ticket-layer small  modal">
            <i class="close icon"></i>
            <div class="header">退票通知</div>
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
        <div class="ui remarks-ticket-layer small  modal">
            <i class="close icon"></i>
            <div class="header">
                添加备注
            </div>
            <div class="content">
                <div class="ui form">
                    <div class="field">
                        <label>备注：</label>
                        <textarea rows="3" v-model="listNoteTxt" placeholder=""></textarea>
                    </div>
                </div>
            </div>
            <div class="actions text-center">
                <a class="ui blue button ok">确定</a>
                <a class="ui button cancel">取消</a>
            </div>
        </div>
    </div>
</template>
<script>
import {API_URL} from '../../config'
import page from '../../components/page'

export default {
    // name: '',
    data() {
        return {
            msg: 'Welcome to Event Dove',
            argu:{
                eventId: "",  // 活动id
                page: "1",
                limit: "15",
                total: "-1",
                search: "", //输入框的值
                signStatus: "", //签到状态
                ticketId: "",  //票类型
                attendeeStatus: "", //退票状态
            },
            loadingValue:false,
            listNoteTxt:'',
            info:{
                items:[]
            },
            detail:{
                attendeeInfo: {
                    actualTicketPrice: '',
                    attendeeId: '',
                    attendeeStatus: '',
                    barcode: '',
                    checkedInTime: '',
                    checkedInType: '',
                    codeObj: {
                        attendeeId: '',
                        eventId: '',
                        orderNumber: '',
                        ticketId: '',
                        ticketName: ''
                    },
                    collectInfo: {
                        checkbox1: '',
                        email: '',
                        name: '',
                        radio1: '',
                    },
                    currentTicketInfo: {
                        defaultPrice: '',
                        describe: '',
                        endSalesTime: '',
                        groupPurchaseTicketSetting: {
                            isAllowDiscount: '',
                            minGroupCount: '',
                            preferentialType: '',
                            value: ''
                        },
                        isAllowGroupPurchase:'',
                        isMemberOnlyTicket: '',
                        isRefundable: '',
                        isServiceFeeInclude: '',
                        maxCount: '',
                        minCount:'',
                        name: '',
                        needAudit: '',
                        startSalesTime: '',
                        status: '',
                        ticketId: '',
                        ticketServiceFee:'',
                        totalCount: ''
                    },
                    isCheckedIn: '',
                    isETicketSent: '',
                    isNeedAudit: '',
                    notes: '',
                    notesTimestamp:'',
                    qrCodeContent: '',
                    collectInfoDetails: [
                    ]
                },
                ticketInfo: {
                    defaultPrice: '',
                    describe: '',
                    endSalesTime:'',
                    groupPurchaseTicketSetting: {
                        isAllowDiscount: '',
                        minGroupCount: '',
                        preferentialType: '',
                        value: ''
                    },
                    isAllowGroupPurchase: '',
                    isMemberOnlyTicket: '',
                    isRefundable: '',
                    isServiceFeeInclude: '',
                    maxCount: '',
                    minCount: '',
                    name: '',
                    needAudit: '',
                    startSalesTime: '',
                    status: '',
                    ticketId: '',
                    ticketServiceFee:'',
                    totalCount: ''
                },
                orderInfo: {
                    buyer: {
                        checkbox1:'',
                        email:'',
                        name: '',
                        radio1:''
                    },
                    cTime: '',
                    currencyType: '',
                    discount: {
                        discountCode:'',
                        discountId: ''
                    },
                    eventId: '',
                    id: '',
                    invoice: [
                    
                    ],
                    orderDetails: [
                    
                    ],
                    orderNumber: '',
                    originalPriceTotal: '',
                    paymentMethod: '',
                    purchasePlatform: '',
                    serviceFee: '',
                    status: '',
                    thirdPartyCharge: '',
                    totalPrice: '',
                    uTime: '',
                    userId: ''
                }
            },
            selectedArr:[],
            selectedAll:false,
            idToken:'',
            orderStatusValue:'',
            excelTimer:null,
            emailArr:[],
            phoneArr:[],
            changeNews:true
        }
    },

    mounted(){
        var _this=this;
        $('#footer').show()
        $('.menu .item').tab()
        $('.admin-avatar').popup({position: 'bottom center'})
        this.argu.eventId=this.$route.params.id;
        this.idToken=JSON.parse(localStorage.getItem('user'));
        this.getData();
        $('.ui.search.dropdown.signSelected').dropdown({
            onChange:function(value,text,$item){
                _this.getStatus('signStatus',value)
            }
        })
        $('.ui.search.dropdown.ticketSelected').dropdown({
            onChange:function(value,text,$item){
                _this.getStatus('ticketId',value)
            }
        })
        $('.ui.search.dropdown.attendeeStatus').dropdown({
            onChange:function(value,text,$item){
                _this.getStatus('attendeeStatus',value)
            }
        })
    },
    filters:{
        signStatus(val,arr){
            var value='';
            if(val){
                value="signIn"
            }else{
                value="notSign"
            }
            for(var i=0; i<arr.length; i++){
                if(arr[i].name==value){
                    return arr[i].str;
                    break;
                }
            }
        },
        channel(val){
            if(val==''){
                return '无'
            }else{
                return val;
            }
        }
    },
    watch:{
        selectedArr:{ //如果选中长度与 列表长度相同，则全选勾选    
            handler:function(val,oldVal){
                // if(this.selectedArr.length==this.info.items.length){
                //     this.selectedAll=true;
                // }else{
                //     this.selectedAll=false;
                // }
                this.checkboxBtn();
            },
            deep:true
        },
        selectedAll:function(value){
            this.seletedAllfn();
        }
    },
    components: {
        page
    },
    methods:{
        getData(value){// 查询活动下所有参会人员 
            this.argu.page=value || this.argu.page;
            this.loadingValue=true;
            $.get(API_URL+"/attendee/getAttendeesByEventIdAndPageIndex",this.argu,(data)=>{
                this.loadingValue=false;
                this.info=data;
                if(this.$refs.page.setpageData){
                    this.$refs.page.setpageData({
                        currentPage: this.argu.page,
                        allPage:data.totalPage
                    })
                }
            })
        },
        againSend(){
            // 详情重新发送电子票
            var _this=this;
            var attendeeIdsArr=[];

            attendeeIdsArr.push(this.detail.attendeeInfo.attendeeId)
            jQuery.ajax({
                url: API_URL+"/attendee/reSendEticket",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "attendeeIds":attendeeIdsArr,
                    "orderNumber": _this.detail.orderInfo.orderNumber
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
                    "orderNumber": _this.detail.orderInfo.orderNumber,
                },
                success:function(){
                    window.open(API_URL+'/attendee/downloadAllEticket?orderNumber='+_this.orderNumberSave)
                },
                error:function(err){
                    _this.$message.warning(JSON.parse(err.responseText).responseText)
                }
            })
        },
        checkboxBtn(attendeeId,email,phone){
            // console.log(this.selectedArr,'====')
            // var index=this.selectedArr.indexOf(attendeeId);
            // console.log(index,'===========index')
            // if(index==-1){
            //     // this.selectedArr.push(attendeeId);
                

                // this.emailArr.push(email);
                // this.phoneArr.push(phone)
            // }else{
            //     // this.selectedArr.splice(index,1);
            //     console.log(4444)
            //     this.emailArr.splice(index,1);
            //     this.phoneArr.splice(index,1)
            // }
            // 
            this.emailArr=[];
            this.phoneArr=[];
            for(var s=0; s<this.selectedArr.length; s++){
                for(let i=0; i<this.info.items.length; i++){
                    if(this.info.items[i].attendeeId==this.selectedArr[s]){
                        this.emailArr.push(this.info.items[i].collectInfo.email);
                        this.phoneArr.push(this.info.items[i].collectInfo.mobile)
                    }
                }
            }
            // console.log(this.phoneArr,'==========')
            if(this.selectedArr.length == this.info.items.length){
                this.selectedAll=true;
            }else{
                this.selectedAll=false;
            }

        },
        sendEmail(){
            if(this.emailArr.length>0){
                var emailStr=this.emailArr.join('|');
                emailStr='label1~'+emailStr.replace(/\./g,'*');
                this.$router.push({name:'email',params:{id:this.argu.eventId,label:emailStr,page:1}});
            }else{
                this.$message.warning('请选择参会人员');
            }
        },
        sendMessages(){
            if(this.phoneArr.length>0){
                var phoneStr='label1~'+this.phoneArr.join('|');
                this.$router.push({name:'sms',params:{id:this.argu.eventId,label:phoneStr,page:1}})
            }else{
                this.$message.warning('请选择能会人员')
            }
        },
        // 创建execl
        createExcel(){
            var _this=this;
            if(this.info.items.length==0){
                this.$message.warning('暂无数据，不可导出');
                return false;
            }
            jQuery.ajax({
                url: API_URL+"/attendee/prepareExportAttendees",
                type: "GET",
                data: {
                    "eventId": _this.argu.eventId,
                },
                success:function(data){
                    if(data.filePath){
                        _this.excelTimer=setInterval(function(){
                            _this.createOver(data.filePath);
                        },500)
                    }
                },
                error:function(err){
                    _this.$message.warning(JSON.parse(err.responseText).responseText)
                }
            })
        },
        createOver(value){
            var _this=this;
            jQuery.ajax({
                url: API_URL+"/attendee/waitForWirtenCompleted",
                type: "GET",
                data: {
                    "filePath": value,
                },
                success:function(data){
                    clearInterval(_this.excelTimer);
                    if(data.isWriteComplete){
                        _this.excelDownload(value);
                    }
                },
                error:function(err){
                    this.$message.waring(err)
                }
            })
        },
        excelDownload(path){
            window.open(API_URL+'/attendee/downloadFile?filePath='+path)
        },
        sign(orNum,aId,boolean){
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
                    attendeeId: aId,
                    checkedStatus:boolean,
                    checkedInType: "admin"
                }),
                success:function(data,text,xhr){
                    $('.ticket-details-layer.modal').modal('hide');
                    setTimeout(function(){
                        _this.$router.go(0);
                    },300)
                },
                error:function(){
                    _this.$message.warning('签到失败')
                }
            })
        },
        
        seletedAllfn(){
            // this.selectedAll=!this.selectedAll;
            this.selectedArr=[];
            this.emailArr=[];
            this.phoneArr=[];
            if(this.selectedAll){
                var arr=this.info.items;
                for(var i=0; i<arr.length; i++){
                    this.selectedArr.push(arr[i].attendeeId);
                    this.emailArr.push(arr[i].collectInfo.email);
                    this.phoneArr.push(arr[i].collectInfo.mobile)
                }
            }else{
                this.selectedArr=[];
            }
        },
        searchUser(){
            this.getData(); 
        },
        getStatus(key,val){
            this.argu[key]=val;
            this.getData();
        },
        getDetail(orderN,attendId){
            var _this=this;
            $.get(API_URL+'/attendee/getAttendee',{orderNumber:orderN,attendeeId:attendId},(data)=>{
                $('.ticket-details-layer.modal').modal('show');
                this.orderStatusValue=data.attendeeInfo.payStatus;
                _this.detail=data;
            })
        },
        
        listNote(orderN,attId,notes){ //列表备注按钮
            var _this=this;
            this.listNoteTxt=notes;
            $('.remarks-ticket-layer.modal').modal({
                closable  : false,
                onDeny    : function(){},
                onApprove : function() {
                    _this.getNote(orderN,attId,_this.listNoteTxt);
                    setTimeout(function(){
                        _this.$router.go(0)
                    },500)
                }
            }).modal('show');
        },
        alignSend(ordeN){// 重新发送电子票
            var _this=this;
            if(this.selectedArr.length==0){
                this.$message.warning('请选择参会人员')
                return false;
            }
            $.ajax({
                url: API_URL+"/attendee/reSendEticket",
                type: "POST",
                headers: {
                    "Authorization": "Bearer "+_this.idToken.id_token,
                    "Content-Type": "application/json; charset=utf-8",
                },
                contentType: "application/json",
                data: JSON.stringify({
                    attendeeIds: _this.selectedArr,
                    orderNumber: ordeN
                }),
                success:function(data){
                    if(data.errorCode!==0){
                        alert(data.responseText);
                    }
                },
                error:function(err){
                    _this.$message.warning(JSON.parse(err.responseText).responseText)
                }
            })
        },
        getNote(orderN,attId,value){
            var _this=this;
            if(value == '') {return false;}
            jQuery.ajax({
                url: API_URL+"/attendee/addAttendeeNotes",
                type: "POST",
                headers: {
                    "Authorization": "Bearer "+_this.idToken.id_token,
                    "Content-Type": "application/json; charset=utf-8",
                },
                contentType: "application/json",
                data: JSON.stringify({
                    "orderNumber": orderN,
                    "attendeeId": attId,
                    "notes": value
                }),
                success:function(){
                    return true;
                }
            })
        },
        saveEdit(value){
            var data={
                orderNumber:this.detail.orderInfo.orderNumber,
                attendeeId:this.detail.attendeeInfo.attendeeId,
                collectInfo:{}
            };
            for(var i=0; i<this.detail.attendeeInfo.collectInfoDetails.length; i++){
                var item=this.detail.attendeeInfo.collectInfoDetails[i];
                data.collectInfo[item.name]=item.value;
            }
            var _this=this;
            $.post(API_URL+'attendee/updateAttendee',JSON.stringify(data),(data)=>{
                this.$message.success('保存参会者信息成功')
            });
            this.getNote(this.detail.orderInfo.orderNumber,this.detail.attendeeInfo.attendeeId,value);
            _this.$router.go(0);
        },
        changeNewsfn(){  //修改参会者信息
            this.changeNews=!this.changeNews;
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #loadOffset{position:absolute; border:none; background:none; left:50%; border-show:none; margin-left:-28px; top:180px}
</style>
