<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">活动通知</span>/微信邀请函</h2>
                <!-- <button @click="addTpl">添加模版</button> -->
                <router-link class="ui blue mini" :to="{name:'createTemplate',params:{id:$route.params.id}}">添加模板</router-link>
            </div>
            <div class="white-wrap p-xl">
                <h3 class="ui header  fwn">使用微信定向邀请，给被邀请人不一样的参会体验！</h3>
                <div class="ui middle aligned vertically padded grid">
                    <div class="six wide   column">
                        <div class="pro" style="postion:relative">
                    <img style="    position: absolute;width: 80%;margin: 19% 6% 0;" :src="imgurl">
                            <img src="http://pic.eventdove.com/FiySBGXzCWjkJhlhrVFfdeTl7MYp" alt="" class="w-full">
                        </div>
                    </div>
                    <div class="ten wide column">
                        <h3 class="ui horizontal header divider text-blue">
                            <i class="dashboard icon"></i>
                            选择模版
                          </h3>
                          <ul id="slider_list" class="ui vertically padded three column grid">
                          <li class="column" :templateId="index" v-for="(el ,index) in tplList" @click="setOne(index,el.url)">
                          <img  class="w-full" :id="el.id" :src="el.url">
                         </li>
                          </ul>
                    </div>              
                </div>
                <div class="ui divider hidden"></div> 
                <div class="ui form">
                    <h4 class="ui header fwn text-info">输入您想要邀请的人的姓名、邮箱或手机号，以","分隔（按下回车查找匹配的参会者）</h4>
                    <div class="fields">
                        <div class="thirteen wide field">
                            <input type="text">
                        </div>
                        <div class="three wide field">
                            <button class="ui button blue" @click="downLoadInvit">下载邀请函</button>
                        </div>
                    </div>
                    <div class="field mt-sm">
                        <div class="ui toggle checkbox">
                            <input type="checkbox" name="public" v-model="autoSend">
                            <label class="text-muted">自动发送邀请函</label>
                        </div>
                    </div>
                    <p class="text-muted f13">开启后参会者使用微信扫描二维码获取电子票会同时获得邀请函</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
// import {loadJs} from '../../utils/index.js'

function maker(){
  
}

export default {
    data() {
            return {
                tplList:[],
                imgurl: '',
                tplId: '',
                autoSend:true
            }
        },
        mounted: function() {

            document.title = '活动邀请函-Eventdove（会鸽）让活动更精彩'

            $.get(API_URL+'event/pictures?type=wx_invate&page=1&limit=6',(data)=>{
                this.tplList = data.items
            })
        },
        watch: {
            autoSend: function (val) {
                let eventId = this.$route.params.id;
                $.post (API_URL+'invitation/updateAutosend', JSON.stringify({eventId:''+ eventId,autoSend:val}), (data)=>{
                    val ? this.$message.success('自动发送邀请函打开') : this.$message.success('自动发送邀请函关闭')
                })
            },
          },
        methods:{
            downLoadInvit(){
            let genData={
                "templateId":'2',
                "eventId":"6291940451603845120",
                "attendees":{attendeeId: 927168, name: "张三"}
                    
            }

            $.post ('http://localhost:9000/invitation/generateWXInvitations', JSON.stringify(genData), (data)=>{
                this.$message.success('downLoadInvit')
            })

            },
            addTpl(){
                var data={
                                "address": {
                                "align":  "center" ,
                                "color":  "" ,
                                "font":  "20px 黑体" ,
                                "x": 360 ,
                                "y": 500
                                } ,
                                "date": {
                                "align":  "center" ,
                                "color":  "" ,
                                "font":  "20px 黑体" ,
                                "x": 360 ,
                                "y": 460
                                } ,
                                "guest": {
                                "align":  "center" ,
                                "color":  "" ,
                                "font":  "20px 黑体" ,
                                "x": 360 ,
                                "y": 800
                                } ,
                                "height": 1280 ,
                                "id":  "4" ,
                                "name":  "default_template_1" ,
                                "path":  "1.jpg" ,
                                "qrCode": {
                                "color": {
                                "dark":  "#000000" ,
                                "light":  "#FFFFFF"
                                } ,
                                "height": 240 ,
                                "width": 240 ,
                                "x": 240 ,
                                "y": 880
                                } ,
                                "title": {
                                "align":  "center" ,
                                "color":  "" ,
                                "font":  "50px 黑体" ,
                                "x": 360 ,
                                "y": 360
                                } ,
                                "userId":  "system" ,
                                "width": 720
                                }

            $.post ('http://localhost:9000/invitation/insertWxTemplate', JSON.stringify({tplJson:data}), (data)=>{
                this.$message.success('插入成功')
            })

            },
         setOne( id,imgurl){
            console.log(this.$route)
            let eventId = this.$route.params.id
            this.imgurl = imgurl

            $.post (API_URL+'invitation/updateTemplate', JSON.stringify({eventId:''+ eventId,templateId:''+id}), (data)=>{
                this.$message.success('设置成功！')
            })

         },
         autoSend(id){
             
         }
        },
        components: {

        }
}
</script>
<style scoped>
</style>
