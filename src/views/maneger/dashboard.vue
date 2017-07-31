<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">基本管理</span>/活动统计</h2>
            </div>
            <div class="block-tab">
                <div class="ui item secondary menu four f16">
                    <a class="item" style="cursor:pointer;" :class="[saveTabs=='all'?'active':'']" @click="tabs('all')">
                        <span><i class="setting icon"></i>数据总览</span>
                    </a>
                    <a class="item" style="cursor:pointer;" :class="[saveTabs=='register'?'active':'']"  @click="tabs('register')">
                        <span><i class="ticket icon"></i>报名统计</span>
                    </a>
                    <a class="item" style="cursor:pointer;" :class="[saveTabs=='sign'?'active':'']" @click="tabs('sign')">
                        <span><i class="print icon"></i>签到统计</span>
                    </a>
                    <a class="item" style="cursor:pointer;" :class="[saveTabs=='participants'?'active':'']" @click="tabs('participants')">
                        <span><i class="print icon"></i>参会者信息统计</span>
                    </a>
                </div>
                
                <div class="ui tab" :class="[saveTabs=='all'?'active':'']">
                    <div class="ui six column divided center aligned  vertically padded grid">
                        <div class="column">
                            <div class="ui tiny statistic red">
                                <div class="label mb-sm">浏览次数</div>
                                <div class="value">{{info.generalView.browseCount}}</div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui tiny statistic orange">
                                <div class="label mb-sm">浏览用户数</div>
                                <div class="value">
                                    {{info.generalView.userBrowseCount}}
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui tiny statistic yellow">
                                <div class="label mb-sm">总订单数量</div>
                                <div class="value">
                                    {{info.generalView.orderCount}}
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui tiny statistic olive">
                                <div class="label mb-sm">报名人数</div>
                                <div class="value">
                                    {{info.generalView.attendeeCount}}
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui tiny statistic green">
                                <div class="label mb-sm">报名转化率</div>
                                <div class="value">
                                    {{attendeeRate}}
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui tiny statistic teal">
                                <div class="label mb-sm">签到人数</div>
                                <div class="value">
                                    {{info.generalView.checkedInCount}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui divider hidden"></div>
                    <div class="space"></div>
                    <div class="sub-title text-justify">
                        <h2 class="fwn">收款统计（{{info.collectionStatistics.paymentPriceUnitSign}}）</h2>
                        <div class="button-group">
                            <router-link to="/wallet" class="ui button yellow mini basic">钱包提现</router-link>
                        </div>
                    </div>
                    <div>活动总收入（{{info.collectionStatistics.paymentPriceUnitSign}}){{info.collectionStatistics.eventRevenue | twoNum}}</div>
                    <div class="ui five column divided center aligned  vertically padded grid">
                        <div class="column">
                            <div class="ui tiny statistic">
                                <div class="label mb-sm">线上收款总额（{{info.collectionStatistics.paymentPriceUnitSign}}）</div>
                                <div class="value">{{info.collectionStatistics.onlineRevenue |twoNum}}</div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui tiny statistic">
                                <div class="label mb-sm">线下收款总额（{{info.collectionStatistics.paymentPriceUnitSign}}）</div>
                                <div class="value">{{info.collectionStatistics.offLineRevenue |twoNum}}</div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui tiny statistic">
                                <div class="label mb-sm">支付通道费用（{{info.collectionStatistics.paymentPriceUnitSign}}）</div>
                                <div class="value">
                                    {{info.collectionStatistics.channelRevenue |twoNum}}
                                </div>
                            </div>
                        </div>
                        
                        <div class="column">
                            <div class="ui tiny statistic">
                                <div class="label mb-sm">可提现总额（{{info.collectionStatistics.paymentPriceUnitSign}}）</div>
                                <div class="value">
                                    {{info.collectionStatistics.availableCash |twoNum}}
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui tiny statistic">
                                <div class="label mb-sm">净收入总额（{{info.collectionStatistics.paymentPriceUnitSign}}）</div>
                                <div class="value">
                                    {{info.collectionStatistics.netIncome |twoNum}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui tab" :class="[saveTabs=='register'?'active':'']"  style="width:100%">
                    <div id="registrationStatistics" style="width: 1000px;height:400px;"></div>
                    <div id="ticketStatistics" style="width: 1000px;height:400px; margin-top:20px"></div>
                </div>
                <div class="ui tab" :class="[saveTabs=='sign'?'active':'']">
                    <div class="ui four column divided center aligned  vertically padded grid">
                        <div class="column">
                            <div class="ui tiny statistic red">
                                <div class="label mb-sm">报名总人数</div>
                                <div class="value">{{attendance.attendeeCount}}</div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui tiny statistic orange">
                                <div class="label mb-sm">已签到人数</div>
                                <div class="value">
                                    {{attendance.checkedInCount}}
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui tiny statistic yellow">
                                <div class="label mb-sm">未签到</div>
                                <div class="value">
                                    {{attendance.noSignInCount}}
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui tiny statistic olive">
                                <div class="label mb-sm">签到率</div>
                                <div class="value">
                                    {{attendance.checkedInRate|twoFixed}}%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui four column divided center aligned  vertically padded grid">
                        <div class="column" v-for="(round,index) in attendance.ticketSaleList">
                            <childStatisticView :obj="attendance.ticketSaleList" :tIndex="index" :radius="50"></childStatisticView>
                        </div>
                    </div>
                </div>
                <div class="ui tab" :class="[saveTabs=='participants'?'active':'']" data-tab="fourth">
                    <div class="ui form">
                        <div class="inline fields mb-n">
                            <div class="field">
                                <label>筛选条件：</label>
                                 <select class="ui search dropdown signSelected">
                                    <option :value="s.value" v-for="s in screenArr">{{s.name}}</option>
                                </select>
                            </div>
                            <!-- <div class="field">
                                <label>选择问题：</label>
                                <div class="ui selection dropdown">
                                    <input type="hidden" name="gender" value="-1">
                                    <i class="dropdown icon"></i>
                                    <div class="default text">请选择问题</div> 
                                    <div class="menu">
                                        <div class="item" @click="changeProblem(p.itemName)" :value="p.itemName" v-for="(p,index) in problemList">{{p.displayName}}</div>
                                    </div>
                                </div>
                            </div> -->
                            <button class="ui blue button" @click="submitCollect">提交</button>
                        </div>
                    </div>
                    <div v-show="information.length>0" style="margin-top:20px;" v-for="(k,index) in information">
                        <div class="ui grid">
                            <div class="ten wide column">
                                <button type="button" value="bar" class="ui red basic button mini" @click="changeEchartsType('bar',index,k.key,'chartBox')">柱形图</button>
                                <button type="button" value="line" class="ui teal basic button mini" @click="changeEchartsType('line',index,k.key,'chartBox')">线形图</button>
                                <button type="button" value="line" class="ui primary basic button mini" @click="changeEchartsType('pie',index,k.key,'pieBox')">饼形图</button>
                                
                                <div :id="'chartBox'+index" v-show="k.charType != 'pie'" style="width:500px; height:300px"></div>
                                <div :id="'pieBox'+index" v-show="k.charType =='pie'" style="width:500px; height:300px">123131</div>
                            </div>
                            <div class="six wide column">
                                <!-- <h4 style='font-weight:bolder; font-size:18px;'>{{k.key}}</h4> -->
                                <div v-for="d in k.data">
                                    <h5 style="margin:15px 0 5px; padding:0px; font-weight:bolder">{{d[k.key]}}</h5>
                                    <p>数据：{{d.reduction}}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div v-show="information.length<=0" class="freeData" style="text-align:center;padding-top:20px; font-size:12px;">
                        <div style="width:237px; margin:30px auto 0;">
                            <img src="../../assets/images/freeData.png" width='50%' alt="">
                        </div>
                        <p v-show="isData.value=='one'">暂无数据</p>
                        <p v-show="isData.value=='noData'">所选问题当前暂无数据</p>
                        <p v-show="isData.value=='other'">当前活动报名表单没有可以用来统计的字段。如需统计在编辑活动时，添加报名表单项。<br>例：单选、多选、下拉框等字段。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {API_URL} from '../../config'
import {loadJs} from '../../utils/'
import childStatistic from '../../components/radialIndicator/childStatistic.vue'
// import echarts from 'echarts'
export default {
    data() {
        return {
            eventId:{},
            info:{
                generalView:{},
                collectionStatistics:{}
            },
            attendeeRate:0,
            ticketsData:{},
            attendance:{},
            problemList:{},
            getDataArgu:{
                "eventId": "",
                "itemName": "",
                "isCheckedIn": false
            },
            information:[],
            saveTitle:'',
            saveTabs:'all',
            isData:{value:'one'},
            echartsType:'bar',
            saveTab:[],
            screenArr:[
                {'value':'-1','name':'全部'},
                {'value':1,'name':'已签到'},
                {'value':0,'name':'未签到'}
            ],
            saveProblem:[],
            count:0,
            allData:{
                xData:[],
                seriesData:[],
                pieData:[]
            }
        }
    },
    mounted:function() {
        this.eventId=this.$route.params;
        var _this=this;
        this.getDataArgu.eventId=this.eventId.id;
        this.tabs('all')
        // 加载图标插件
        // loadJs('/js/echarts.min.js',{'chartset':'utf-8'}).then(()=>{
        //     this.registration();
        //     this.ticketFn(this.changeData(this.ticketsData));
        // })
        loadJs('/js/echarts.min.js',{'chartset':'utf-8'})
    },
    
    methods:{
        getParticipantsData(){//参会者采集项
            var _this=this;
            jQuery.ajax({  
                url: API_URL+"formField/getFormFieldListByEventId",
                type: "GET",
                data: {
                    "eventId": _this.eventId.id,
                },
                success:function(data){
                    _this.problemList=data;
                    var count=0;
                    for(var i=0; i<_this.problemList.length; i++){
                        var pType=_this.problemList[i].fieldType;
                        var itemName=_this.problemList[i].itemName;
                        if( pType =='radio' || pType == 'select' || pType =='checkbox' || pType == 'number'){
                            _this.getDataArgu.itemName=itemName;
                            _this.saveProblem.push(_this.problemList[i]);
                            _this.submitProblem(pType,count,itemName);
                            count++;
                        }
                    }
                },
            })
        },
        submitCollect(){
            this.information=[];
            for(var i=0; i<this.saveProblem.length; i++){
                var pType=this.saveProblem[i].fieldType;
                var itemName=this.saveProblem[i].itemName;
                this.getDataArgu.itemName=itemName;
                this.submitProblem(pType,i,itemName);
            }
        },
        submitProblem(pType,index,nkey){  //参会者信息 根据问题获取数据
            var _this=this;
            this.domKey=null;this.pieDom=null;
            jQuery.ajax({
                url: API_URL+"/event/attendeesInformationStatistics",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(_this.getDataArgu),
                success:function(data){
                    if(data.length != 0){
                        _this.information.push({'data':data,'charType':'bar','key':nkey});
                    }
                },
            }).done(function(){
                setTimeout(function(){
                    _this.createLineBar('chartBox'+index,index,nkey)
                },800)
            })
        },
        // 线形    柱形图
        createLineBar(id,index,key){
            var domKey=echarts.init(document.getElementById(id));
            var option={
                title: {
                    text: key
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: []
            }
            
            domKey.setOption(option);
            this.barData('bar',index,key,domKey);
        }, 
        // 图表样式变化事件   ===   参会者统计
        changeEchartsType(value,index,key,id){
            var elem=echarts.init(document.getElementById(id+index));
            if(value=='pie'){
                // this.echartsType=value;
                this.information[index].charType=value;
                this.createPie(value,index,key,elem);
            }else{
                this.echartsType=value;
                this.barData(value,index,key,elem);
            }
        },
        
        // 跟据图表类型，处理数据
        barData(echartsType,index,key,elem){
            this.allData.xData[index]=[];
            this.allData.seriesData[index]=[];
            this.allData.pieData[index]=[];

            for(let i=0; i<this.information[index].data.length; i++){
                var item=this.information[index].data[i];
                this.allData.xData[index].push(item[key]);

                this.allData.seriesData[index].push(item.reduction);
                this.allData.pieData[index].push({
                    name:item[key],
                    value:item.reduction
                })
            }
            var opt={
                xAxis:{
                    data:this.allData.xData[index]
                },
                series:{
                    type:echartsType,
                    data:this.allData.seriesData[index]
                }
            }
            var pieOpt={
                series:{
                    type:echartsType,
                    data:this.allData.pieData[index]
                }
            }
            if(echartsType=='pie'){
                elem.setOption(pieOpt);
            }else{
                elem.setOption(opt)
            }
        },

        // 签到状态
        changeStatus(value){
            console.log(value)
            if(value==='0'){
                this.getDataArgu.isCheckedIn=false;
            }else if(value==='1'){
                this.getDataArgu.isCheckedIn=true;
            }else{
                this.getDataArgu.isCheckedIn='';
            }
        },
        
        // 饼图生成
        createPie(vtype,index,key,elem){
            var option={
                title: {
                    text: this.saveTitle
                },
                series: []
            }
            elem.setOption(option)
            this.barData(vtype,index,key,elem);
        },
        
        // 选项卡点击事件
        tabs(value){
            var _this=this;
            this.saveTabs=value;
            if(this.saveTab.indexOf(value)!=-1){return false;} //防止重复请求接口
            this.saveTab.push(value);
            if(value == 'all'){
                this.getAll();
            }else if(value == 'register'){
                this.getRegisterData();
            }else if(value == 'sign'){
                this.getSignData();
            }else if(value == 'participants'){
                this.getParticipantsData();
            }
            $('.signSelected').dropdown({
                onChange:function(value,test,$elem){
                    _this.changeStatus(value)
                }
            });
        },
        getAll(){//获取 数据总揽数据
            var _this=this;
            jQuery.ajax({ 
                url: API_URL+"event/collectionStatistics",
                type: "GET",
                data: {
                    "eventId": _this.eventId.id,
                },
                success:function(data,req,xhr){
                    if(xhr.status==200){
                        _this.info=data;

                        var rate=parseInt(data.generalView.attendeeCount)/parseInt(data.generalView.userBrowseCount);
                        if(isNaN(rate)){
                            _this.attendeeRate=0+'%';
                        }else if(rate == 'Infinity'){
                            _this.attendeeRate=100+'%';
                        }else{
                            _this.attendeeRate=Math.round(rate*100)/100+'%';
                        }
                    }
                },
                error:(err)=>{
                  //  this.$message.warning(err.responseText.responseText)
                }
            })
        },
        getRegisterData(){//获取 报名统计数据
            var _this=this;
            jQuery.ajax({ 
                url: API_URL+"/event/registrationStatistics",
                type: "GET",
                data: {
                    "eventId":_this.eventId.id,
                },
                success:function(data,text,xhr){
                    if(xhr.status==200){
                        // 报名统计，数据案例
                        _this.registration(data.registrationStatistics); //报名人趋势
                        _this.ticketFn(_this.changeTicketsData(data.ticketStatistics));
                    }
                },
                error:function(err){
                    console.log(err);
                },
            })
        },
        // 报名人数趋势图表生成  ====   报名统计
        registration(obj){
            var data={
                time:[],
                count:[]
            }
            for(var i=0; i<obj.length; i++){
                var s=obj[i].time.join('-');
                data.time.push(s);
                data.count.push(obj[i].total)
            }
            var registrationEcharts=echarts.init(document.getElementById('registrationStatistics'));
            registrationEcharts.setOption({
                title: {
                    text: '报名人数趋势'
                },
                tooltip: {},
                xAxis: {
                    data: data.time
                },
                yAxis: {},
                series: [{
                    name: '',
                    type: 'line',
                    data: data.count
                }]
            })
        },
        // 修改数据结构
        changeTicketsData(obj){
            var nameArr=[]
            for(let t=0; t<obj.length; t++){
                for(let r=0;r<obj[t].reduction.length; r++){
                    nameArr.push(obj[t].reduction[r].name);
                }
            }
            var data={
                nameArr:["早鸟票a","早鸟票b"],
                xData:[],
                series:[]
            }

            for(let n=0; n<nameArr.length; n++){
                data.series.push({
                    name:nameArr[n],
                    type:'line',
                    data:[]
                })
            }

            for(let i=0; i<obj.length; i++){
                var strTime=obj[i].time.join('-');
                data.xData.push(strTime);
                for(let n=0; n<obj[i].reduction.length; n++){
                    var index=nameArr.indexOf(obj[i].reduction[n].name);
                    if(index!=-1){
                        data.series[index].data.push(obj[i].reduction[n].total)
                    }
                }
            }
            return data;
        },
        
        getSignData(){//签到统计数据
            var _this=this;
            jQuery.ajax({
                url: API_URL+"/event/attendeesStatistics",
                type: "GET",
                data: {
                    "eventId":_this.eventId.id,
                },
                success:function(data,text,xhr){
                    if(xhr.status==200){
                        _this.attendance=data;
                    }
                },
                error:function(err){
                }
            })
        },
        
        //    === 报名统计  门票销售情况
        ticketFn(obj){
            var ticketsEcharts=echarts.init(document.getElementById('ticketStatistics'));
            ticketsEcharts.setOption({
                title: {
                    text: '门票销售情况'
                },
                legend:{
                    left:'bottom',
                    data:obj.nameArr
                },
                dataZoom: [
                    {   // 这个dataZoom组件，默认控制x轴。
                        type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                        start: 10,      // 左边在 10% 的位置。
                        end: 60         // 右边在 60% 的位置。
                    }
                ],
                tooltip: {},
                xAxis: {
                    data: obj.xData
                },
                yAxis: {},
                series:obj.series
            })
        },


















        
    },
    filters:{
        twoNum(value){
            var num=Math.round(value*100).toFixed(2);
            return num/100>0?num/100:0;
        },
        twoFixed(value){
            value = Math.round(value*100);
            return value;
        }
    },
    components: {
        childStatisticView:childStatistic
    }
}
</script>
<style scoped>
</style>
