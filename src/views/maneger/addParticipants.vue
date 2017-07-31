<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">参会人员</span>/添加参会人员</h2>
                <router-link to="./participants"><i class="reply icon"></i>返回</router-link>
            </div>
            <div class="block-tab">
                <div class="ui two item secondary menu f16">
                    <a class="item active" data-tab="first"><span><i class="add icon"></i>添加人员</span></a>
                    <a class="item" data-tab="second"><span><i class="file text icon"></i>导入参会者</span></a>
                </div>
                <div class="ui active tab" data-tab="first">
                    <div class="ui form">
                        <div class="fields inline">
                            <div class="two wide field">
                                <label>选择门票：</label>
                            </div>
                            <div class="fourteen wide field p-n">
                                <select name="skills" multiple="" class="ui fluid dropdown ticketSelect w-full">
                                    <option value="">请选择门票</option>
                                    <option :value="t.name+'/'+t.str" v-for="t in info.ticketList">{{t.str}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="fields inline">
                            <div class="two wide field">
                                <label>选择支付方式：</label>
                            </div>
                            <div class="fourteen wide field p-n">
                                <select class="ui search dropdown paySelect  w-full">
                                    <option value="">请选择支付方式</option>
                                    <option :value="pay.name" v-for="pay in info.adminPaymentMethodList">{{pay.str}}</option>
                                </select>
                            </div> 
                        </div>
                        <div class="fields">
                            <div class="two wide field">
                                <label>参会者信息:</label>
                            </div>
                            <div class="fourteen wide  field">
                                <div class="field required">
                                    <formView ref="formview" :formData="formItems" :itemIndex="0"></formView>
                                </div>
                            </div>
                        </div>
                        <div class="fields"></div>
                        <div class="text-center">
                            <button type="submit" class="ui button blue" @click="createAddUser">确认</button>
                        </div>
                    </div>
                </div>
                <div class="ui tab" data-tab="second">
                    <!-- <div class="ui form">
                        <div class="fields inline">
                            <div class="two wide field">
                                <label>选择门票：</label>
                            </div>
                            <div class="fourteen wide field p-n">
                                <div class="ui fluid multiple search selection dropdown multiselects w-full">
                                    <input name="tags" type="hidden">
                                    <i class="dropdown icon"></i>
                                    <div class="default text">全部门票</div>
                                    <div class="menu">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="fields inline">
                            <div class="two wide field">
                                <label>人员信息：</label>
                            </div>
                            <div class="fourteen wide field p-n">
                                <div class="ui right labeled left icon input">
                                    <i class="upload icon"></i>
                                    <input type="text" placeholder="上传文件">
                                    <a class="ui tag label teal">选择文件</a>
                                </div>
                            </div>
                        </div>
                        <div class="fields inline">
                            <div class="two wide field">
                                <label></label>
                            </div>
                            <div class="fourteen wide field p-n">
                                <div class="ui orange icon message">
                                    <i class="info circle icon"></i>
                                    <div class="content">
                                        提示：只允许上传CSV、EXCEL文件，并且文件中的字段名称和注册表单的字段名称一致才能准确导入！
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="ui button blue">确认</button>
                        </div>
                    </div> -->
                    <div style="text-align:center">
                        <img src="/images/no_open.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
import formView from '../../components/form_editor/view.vue' //表单设计器
export default {
    // name: '',
    data() {
        return {
            msg: 'Welcome to Event Dove',
            eventId:'',
            info:{
                ticketList:[],
                adminPaymentMethodList:[]
            },
            formItems:{'elments':''},
            orderListJson:{},
            createArgu:{
                "order": [],
                "paymentMethod": "",
                "eventId": this.$route.params.id,
                "buyer": {
                    "name": "",
                    "email": "",
                    "mobile": ""
                },
                "platform": "admin"
            }
        }
    },
    mounted: function() {
        $('#footer').show();
        $('.menu .item').tab()

        $('.multiselects.ui.dropdown').on('click', function() {
            $('.restore.example .ui.dropdown').dropdown('restore defaults');
        })
        var _this=this;
        $('.ui.fluid.dropdown.ticketSelect').dropdown({
            onChange:function(value){
                _this.createArgu.order=[];
                _this.addTicket(value)
            }
        });
        $('.ui.search.dropdown.paySelect').dropdown({
            onChange:function(value,$item){
                _this.createArgu.paymentMethod=value;
            }
        })
        this.eventId=this.$route.params.id;
        this.getTicket()
        // this.formItems.elments = this.info.collectItems
        
    },
    methods:{
        addTicket(obj){
            for(var i=0; i<obj.length; i++){
                var arr=obj[i].split('/');
                this.createArgu.order.push({
                    'total':1,
                    'ticketId':arr[0],
                    'ticketName':arr[1]
                })
            }
        },
        
        getTicket(){ //获取门票  支付方式
            var _this=this;
            jQuery.ajax({
                url: API_URL+"/order/prepareAdminAddAttendee",
                type: "GET",
                data: {
                    "eventId": _this.eventId,
                },
            })
            .done(function(data, textStatus, jqXHR) {
                _this.info=data;
                _this.createArgu.paymentMethod=data.adminPaymentMethodList[0].name;
                $('.ui.search.dropdown.paySelect').dropdown('set value', data.adminPaymentMethodList[0].name).dropdown('set text', data.adminPaymentMethodList[0].str);
                _this.formItems.elments=data.collectItems;
            })
        },
        checkArgu(){

            if(this.createArgu.order.length==0){
                this.$message.warning('请选择门票');
                return false;
            }
            if(this.createArgu.paymentMethod == ''){
                this.$message.warning('请选择支付方式');
                return false;
            }
            // var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            // var mobileReg=/^1[34578]\d{9}$/;
            // if(this.createArgu.buyer.name ==''){
            //     this.$message.warning('请输入姓名');
            //     return false;
            // }

            // if(this.createArgu.buyer.mobile==''){
            //     this.$message.warning('请输入手机号');
            //     return false;
            // }else if(!mobileReg.test(this.createArgu.buyer.mobile)){
            //     this.$message.warning('手机号格式不正确，请重新输入');
            //     return false;
            // }

            // if(this.createArgu.buyer.email==''){
            //     this.$message.warning('请输入邮箱');
            //     return false;
            // }else if(!emailReg.test(this.createArgu.buyer.email)){
            //     this.$message.warning('邮箱格式不正确，请重新输入');
            //     return false;
            // }
            return true;
        },
        formSubmit(){
            return new Promise((reslove, reject) => {
                // var dataArr=[]
                this.$refs.formview.submit().then((res) => {
                    // dataArr.push(res[1]);
                    reslove(res[1]);
                }, (index) => {
                    // console.log(index, '这个没有通过验证')
                    return false;
                }).catch((e) => {
                    console.log(e)
                })
            })
        },
        changeData(obj){
            for(let i=0; i<obj.length; i++){
                this.createArgu.buyer[obj[i].itemName]=obj[i].value;
            }
        },
        async createAddUser(){
            if(!this.checkArgu()){
                return false;
            }
            try{
                const a = await this.formSubmit();
                this.changeData(a);

                var _this=this;
                jQuery.ajax({
                    url: API_URL+"order/create",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(_this.createArgu),
                })
                .done(function(data, textStatus, jqXHR) {
                    _this.$message.success('添加成功');
                    var vm=_this;
                    setTimeout(function(){
                        vm.$router.go(0)
                    },3000)
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    _this.$message.warning(JSON.parse(jqXHR.responseText).responseText);
                })

            }catch(e){

            }
        }
    },
    components: {
        formView: formView,
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
