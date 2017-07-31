<template>
<div class="main bgContent">
    <div class="black">
        <div class="ui container">
            <a style="color:#fff" href="javascript:;">&lt;返回</a>
        </div>
    </div>
    <div class="ui container" style="overflow:hidden;">
        <div class="ui grid padded">
            <div class="ten wide column">
                <h1 class="ui header" style="color:#fff">Rancher v1.2技术分享季中国区巡演测长度测长度季中国区巡演测长度测长度</h1>
                <p style="color:#fff">
                    <i class="iconfont icon-fuzhidaima">&#xe656;</i>
                    <span class="section">2017年10月12日（周六）9:00 - 2017年10月12日（周六）9:00</span>
                </p>
                <p style="color:#fff">
                    <i class="iconfont icon-fuzhidaima">&#xe638;</i>
                    <span class="section">{{info.detailedAddress}}</span>
                </p>
            </div>
            <div class="six wide column">
                <div class="ticlabel" style="float:right"><img src="../assets/images/order/mp.png" alt=""></div>
            </div>
        </div>
        <div class="ui divider hidden"></div>
        <div class="ui container">
            <div style="float:left;width:65%">
                <div class="listBox" v-for="n in orderNum">
                    <div class="addUserNews">
                        <div class="ui ticketTitle"><i class="iconfont icon-fuzhidaima iconSize" style="float:initial">&#xe623;</i>早票&nbsp;&nbsp;&nbsp;&nbsp;<span>第1张参会信息 </span></div>
                        <div class="ui divider hidden"></div>
                        <form class="ui form userFormData" action="/">
                            <div v-for="item in forData">
                                <div class="field"  v-if="item.fieldType == 'text'">
                                    <label>{{item.displayName}}<span class="red" v-if="item.isRequired">*</span></label>
                                    <input type="text" :name="item.itemName" v-model="itemName" placeholder="First Name">
                                </div>

                                <div class="field" v-if="item.fieldType=='testarea'">
                                    <label>{{item.displayName}}<span class="red" v-if="item.isRequired">*</span></label>
                                    <textarea :name="item.itemName" v-model="itemName" ></textarea>
                                </div>
                                
                                <div class="field" v-if="item.fieldType == 'checkbox'">
                                    <label for="">{{item.displayName}}<span class="red">*</span></label>
                                    <div class="ui checkbox" v-for="cn in item.itemValues">
                                        <input type="checkbox" :value="cn.value" tabindex="0" class="hidden">
                                        <label>{{cn.value}}</label>
                                    </div>
                                </div>

                                <div class="field" v-if="item.fieldType == 'radio'">
                                    <label for="">{{item.displayName}}<span class="red" v-if="item.isRequired">*</span></label>
                                    <div class="ui radio checkbox" v-for="cn in item.itemValues">
                                        <input type="radio" :value="cn.value" :name="item.itemName" tabindex="0" class="hidden">
                                        <label>{{cn.value}}</label>
                                    </div>
                                </div>

                                <div class="field" v-if="item.fieldType=='select'">
                                    <label>{{item.displayName}}</label>
                                    <div class="ui selection dropdown">
                                        <input type="hidden" name="gender">
                                        <i class="dropdown icon"></i>
                                        <div class="default text">Gender</div>
                                        <div class="menu">
                                            <div v-for="se in item.itemValues" class="item" data-value="1">{{se.value}}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="field" v-if="item.fieldType=='dropbox'">
                                    <label>{{item.displayName}}</label>
                                    <div class="ui selection dropdown">
                                        <input type="hidden" name="gender">
                                        <i class="dropdown icon"></i>
                                        <div class="default text">Gender</div>
                                        <div class="menu">
                                            <div v-for="se in item.itemValues" class="item" data-value="1">{{se.value}}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div class="ui divider hidden"></div>
                </div>

                <div class="ui divider hidden"></div>
                <div class="addUserNews">
                    <div class="ui ticketTitle"><i class="iconfont icon-fuzhidaima iconSize">&#xe646;</i>购票者信息</div>
                    <div class="ui divider hidden"></div>
                    <form class="ui form">
                        <div class="field">
                            <label>订单发送给</label>
                            <input type="text" name="first-name" placeholder="First Name">
                        </div>
                        <div class="field">
                            <label>姓名<span class="red">*</span></label>
                            <input type="text" name="last-name" placeholder="Last Name">
                        </div>
                        <div class="field">
                            <label>邮箱<span class="red">*</span></label>
                            <input type="text" name="last-name" placeholder="Last Name">
                        </div>
                        <div class="field">
                            <div class="ui checkbox">
                                <input type="checkbox" tabindex="0" class="hidden">
                                <label>电子票发送给每个参会者</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ui divider hidden"></div>
                <div class="invoice"  v-if="isInvoice">
                    <div class="head" style="overflow:hidden">
                        <div class="ui ticketTitle" style="float:left;"><i class="iconfont icon-fuzhidaima iconSize">&#xe684;</i>订单者发票（需加0.3%的税点）</div>
                        <!--<div class="inline field" style="float:right;">
                            <div class="ui toggle checkbox">
                                <input type="checkbox" tabindex="0" class="hidden">
                                <label></label>
                            </div>
                        </div>-->
                    </div>
                    <div class="ui divider hidden"></div>
                    <div class="content">
                        <form class="ui form" action="javascript:;">
                            <div class="field">
                                <label>发票类型</label>
                                <button class="ui primary basic button">普通发票</button>
                                <button class="ui secondary basic button">增值税专用发票</button>
                                <button class="ui secondary basic button">通用机打发票</button>
                            </div>
                            <div class="field">
                                <label>发票抬头<span>*</span></label>
                                <input type="text" name="first-name" placeholder="First Name">
                            </div>
                            <div class="field">
                                <label>服务项目<span>*</span></label>
                                <select class="ui dropdown">
                                    <option value="">Gender</option>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>
                            <div class="field">
                                <label>领取方式<span>*</span></label>
                                <button class="ui primary basic button">快递领取 ￥20</button>
                                <button class="ui secondary basic button">现场领取</button>
                            </div>
                            <div class="field">
                                <label>收件人<span>*</span></label>
                                <input type="text" name="first-name" placeholder="First Name">
                            </div>
                            <div class="field">
                                <label>联系方式<span>*</span></label>
                                <input type="text" name="first-name" placeholder="First Name">
                            </div>
                            <div class="field">
                                <label>收件人地址<span>*</span></label>
                                <input type="text" name="first-name" placeholder="First Name">
                            </div>
                            <div class="field">
                                <label>备注</label>   
                                <textarea rows="2"></textarea>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="ui divider hidden"></div>
                <div class="rule">
                    <div class="ui ticketTitle"><i class="iconfont icon-fuzhidaima iconSize">&#xe683;</i>购票须知</div>
                    <div class="ui divider hidden"></div>
                    <div class="ui list">
                        <div class="item"><span>1、团购票购买后，不可退票</span></div>
                        <div class="item"><span>2、退票会产生退票费</span></div>
                        <div class="item"><span>3、请正确填写发票的邮寄地址</span></div>
                        <div class="item"><span>4、此活动不支持退票</span></div>
                    </div>
                </div>
            </div>
            <div style="float:right; width:33%">
                <div class="order_details">
                    <div class="ui ticketTitle"><i class="iconfont icon-fuzhidaima iconSize">&#xe60b;</i>订单总计</div>
                    <div class="ui celled divided list">
                        <div class="item" v-for="n in orderList">
                            <h4 class="title">{{n.name}}</h4>
                            <div class="tcontent">
                                <span style="float:left;">数量：</span>
                                <span style="float:left;">{{n.num}}张</span>
                                <span style="float:right">￥{{n.price}}</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="text-justify">
                                <h4 class="title">发票税点费</h4>
                                <span class="tMoney">￥15.00</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="text-justify">
                                <h4 class="title">发票快递费</h4>
                                <span class="tMoney">￥15.00</span>
                            </div>
                        </div>
                    </div>
                    <!--<div class="ToChoose"><a @click="againTicket" href="javascript:;">重新选票</a></div>-->
                    <div class="operation">
                        <button style="float:left;" @click="Cocode" class="ui positive basic button">我有优惠码</button>
                        <span style="float:right;">￥15.00</span>
                    </div>
                </div>
                <!--<div class="Payment">
                    <div class="text-justify">
                        <div>支付方式：</div>
                        <div @click="selectPay"><i class="add to calendar icon"></i>微信支付方式<i class="terminal icon"></i></div>
                    </div>
                </div> -->
                <div class="submitBtn">
                     <button class="fluid ui button blue" @click="okPay">确认支付</button>
                     <a href="javascript:;">已报名，查看电子票</a>
                </div>
            </div>
        </div>
    </div>
    <div class="ui divider hidden"></div>
    <div class="problem">
        <div class="ui container">
            <div class="ui grid">
                <div class="eleven wide column">
                    <h1>报名遇到问题</h1>
                    <div class="ui list">
                        <div class="item">
                            1、如果您购买收费票需开具发票，请提前联系活动主办方确认；
                        </div>
                        <div class="item">
                           2、如果您购买的是审核票，主办方审核通过后，会将电子票发送到您的邮箱中，若未收到请检查垃圾邮箱；
                        </div>
                        <div class="item">
                           3、报名后成功后修改参会人信息，可在购票人邮件中或者我的电子票页面中修改；
                        </div>
                        <div class="item">
                           4、如果您参加的是收费活动，退票说明可在门票详情中查看。
                        </div>
                    </div>
                </div>
                <div class="five wide column">
                    <div class="pro_icon"><img src="../assets/images/problem_icon.png" alt=""></div>
                </div>
            </div>
        </div>
    </div>

    <!--优惠码-->
    <div class="ui small test modal" style="width:500px;">
        <i class="close icon"></i>
        <div class="header">输入优惠码</div>
        <div class="content">
            <div class="ui form">
                <div class="inline fields">
                    <div class="two wide field"></div>
                    <div class="eleven wide field">
                        <input type="text" placeholder="输入优惠码">
                    </div>
                </div>
                <div class="inline fields">
                    <div class="two wide field"></div>
                    <div class="eight wide field">
                        <input type="text" placeholder="输入验证码">
                    </div>
                    <div class="three wide field">
                        <img src="" @click="" alt="验证码图片">
                    </div>
                </div>
            </div>
        </div>
        <div class="actions">
            <div class="ui blue button">提交</div>
            <div class="ui negative button">取消</div>
        </div>
    </div>
   
</div>
</template>
<script>
    import { API_URL } from '../config'
    export default {
        name: 'ticket',
        data() {
            return {
                username: '3333',
                emaile: '',
                isInvoice:false,
                orderNum:5,
                info:this.$store.getters.opticker,
                startTime:'',
                forData2:[
                    {
                        "displayName": "姓名1",
                        "displayOrder": 0,
                        "fieldType": "text",
                        "isDeleted": false,
                        "isRequired": true,
                        "isUnique": false,
                        "itemId": "6228809539345584128",
                        "itemName": "username1",
                        "itemValues": [
                            {
                                "isDefault": false,
                                "option": "选项1",
                                "value": "选项1的值"
                            },
                            {
                                "isDefault": true,
                                "option": "选项2",
                                "value": "选项2的值"
                            },
                            {
                                "isDefault": false,
                                "option": "选项3",
                                "value": "选项3的值"
                            }
                        ],
                        "maxFileSize": 100,
                        "regexp": "[\\\\S]{1,128}"
                    },
                    {
                        "displayName": "姓名2",
                        "displayOrder": 0,
                        "fieldType": "text",
                        "isDeleted": false,
                        "isRequired": false,
                        "isUnique": false,
                        "itemId": "6228809539345584128",
                        "itemName": "username2",
                        "itemValues": [
                            {
                                "isDefault": false,
                                "option": "选项1",
                                "value": "选项1的值"
                            },
                            {
                                "isDefault": true,
                                "option": "选项2",
                                "value": "选项2的值"
                            },
                            {
                                "isDefault": false,
                                "option": "选项3",
                                "value": "选项3的值"
                            }
                        ],
                        "maxFileSize": 100,
                        "regexp": "[\\\\S]{1,128}"
                    },
                    {
                        "displayName": "姓名3",
                        "displayOrder": 12,
                        "fieldType": "text",
                        "isDeleted": false,
                        "isRequired": true,
                        "isUnique": true,
                        "itemId": "6228812596716376064",
                        "itemName": "username12",
                        "itemValues": [
                            {
                                "isDefault": false,
                                "option": "选项1",
                                "value": "选项1的值"
                            },
                            {
                                "isDefault": true,
                                "option": "选项2",
                                "value": "选项2的值"
                            },
                            {
                                "isDefault": false,
                                "option": "选项3",
                                "value": "选项3的值"
                            }
                        ],
                        "maxFileSize": 100,
                        "regexp": "[\\\\S]{1,128}"
                    }
                ],
                orderList:[
                    {
                        name:'早鸟',
                        price:'50',
                        num:'2'
                    },

                    {
                        name:'早鸟',
                        price:'50',
                        num:'2',
                    },
                    {
                        name:'早鸟',
                        price:'50',
                        num:'2'
                    },
                    {
                        name:'早鸟',
                        price:'50',
                        num:'2'
                    },
                    {
                        name:'早鸟',
                        price:'50',
                        num:'2'
                    },
                ]
            }
        },
        mounted() {
            console.log(JSON.parse(JSON.stringify(this.$store.getters.opticker)))
            document.title = "购票流程"
            $('.ui.checkbox').checkbox();
            $('select.dropdown').dropdown();
            $.get('/formField/getFormFieldListByEventId/',{'id':'12321432'},function(data){
                // console.log(data)
                // console.log(data)
            })
        },
        methods: {
            submitForm() {
                jQuery.post(API_URL + '/ddd', data, (res) => {
                    console.log(this.username);
                })
            },
            Cocode:function(){
                 $('.small.test.modal').modal('show');
            },
            okPay:function(){
                $('.userFormData').each(function(){
                    //每个form提取出来的数据
                    console.log($(this).serialize())
                })
            }
        }
    }

</script>
<style>
    body{background:#f8f8fa;}.white{background:#fff;}
    .bgContent{background:url('../assets/images/order/bg.png') no-repeat top center;}
    .ticketTitle{font-size:16px; color:#6f7072}
    .black{border-bottom:1px solid #a84956; line-height: 60px;}
    .addUserNews,.invoice,.rule,.order_details{background:#fff; padding:23px 30px;}
    .red{color:#f00;}
    .rule .item span{line-height:2em; font-size:13px; color:#fcb34c}
    .tcontent{color:#999999; font-size:12px;}
    .order_details .title{margin-bottom:7px; margin-top:15px;}
    .ToChoose{text-align:right;}
    .tMoney{float:right; line-height: 50px; font-size:12px; color:#999;}
    .operation{overflow:hidden; margin-top:15px;}
    .operation span{ line-height: 35px; font-weight: bold; color:#00cfb3; font-size:18px;}
    .Payment{background: #fff; padding:15px 30px;}
    .submitBtn{padding:15px 0}
    .submitBtn a{color:#00cfb3; font-size:12px; margin-top:10px; display: block; }
    .iconSize{font-size:22px; margin-right:5px; float:left; color:#9fd6f9;}
    .problem{background: #fff; padding:30px; line-height: 40px;}
    .problem div{line-height:40px!important;}
    .pro_icon{width:147px; height:147px; float:right;}
    .pro_icon img{width: 100%; height:100%; margin-top:25px;}
</style>