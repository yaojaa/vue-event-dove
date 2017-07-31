<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">市场推广</span>/邮件推广</h2>
            </div>
            <div class="white-wrap p-xl">
                <div class="ui container">
                    <div class="sub-title text-justify">
                        <h2 class="fwn"><span class="text-muted f16">市场推广</span>/邮件推广</h2>
                        <span class="fwn-right"><a href="#" class="ui blue mini">草稿箱</a><a href="#" class="ui blue mini">邮件推广记录</a></span>
                    </div>
                    <div class="white-wrap p-xl">
                        <div class="ui divided items">
                          <div class="ui grid">
                              <div class="ui two wide column doubling stackable tiny image mail-img">
                                   <img src="/images/manageemail.png">
                              </div>
                              <div class="ui eight wide column doubling stackable send-message">
                                  <div>
                                    <span class="leftFont">发件人:</span>
                                    <span class="send_right">会鸽</span>
                                  </div>
                                  <div class="meta">
                                    <span class="cinema leftFont">发件人邮箱:</span>
                                    <span class="cinema send_right">15dfas46186@qq.com</span>
                                  </div>
                                  <div>
                                     <a class="ui mini blue">编辑发件人</a> 
                                  </div>
                              </div>
                              <div class="ui six wide column doubling stackable number-message">
                                 <p>您的邮箱余额:<font>500</font>条 <a class="medium ui button blue">充值</a></p>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div class="ui divider hidden"></div>
                    <div class="ui form white-wrap p-xl">
                        <div class="field">
                                <label>标题</label>
                                <input type="text" name="message-title">
                        </div>
                        <div class="fields">
                            <div class="thirteen  wide field">
                              <label>收件人</label>
                              <input type="text" name="message-man" maxlength="28" placeholder="输入邮件地址，并以“Enter”结束">
                            </div>
                            <div class="three wide field">
                              <label>&nbsp;&nbsp;</label>
                              <div class="two fields">
                                    <div class="sixteen wide field">
                                        <div class="field" id="linkman">
                                          <select class="ui fluid search dropdown" name="card[expire-month]" >
                                            <option value="">常用联系人</option>
                                            <option value="1">海栋</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                          </select>
                                        </div>
                                    </div>
                              </div>
                            </div>
                        </div>
                        <p class="warning">共23人</p>
                        <div class="field">
                              <label>通知内容</label>
                              <emailEditor></emailEditor>
                        </div>
                        <div class="field">
                              <label>发送时间</label>
                              <div class="ui radio checkbox">
                                  <input type="radio" name="fruit" tabindex="0" class="hidden">
                                  <label>立即发送</label>
                              </div>
                              <div class="ui radio checkbox">
                                  <input type="radio" name="fruit" tabindex="0" class="hidden">
                                  <label>定时发送</label>
                              </div>
                              <date-picker :date="Time" :limit="limit" placeholder="活动开始时间" v-on:input="Time = arguments[0]" :option="option" ></date-picker>
                        </div>
                        <div class="field send">
                           <button class="ui blue button">发送</button>
                           <button class="ui yellow button">存为草稿</button>
                        </div>
                    </div>
                </div>              
            </div>
        </div>
    </div>
</template>
<script>
import {API_URL} from '../../config'
import emailEditor from '../../components/emailEditor'
import myDatepicker from '../../components/vue-datepicker'
import moment from 'moment'
export default {
  name: 'acitiveManage',
  data () {
    return {
       //日历控件
      Time:"",
      option: {
        type: 'min',
        format: 'YYYY-MM-DD HH:mm',
        language: 'zhCn',
        inputStyle: {

        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      limit: [{
        type:'fromto',
        from:moment()
      }]
      //日历控件
    }
  },
  mounted: function() {
   $('.ui.checkbox').checkbox();
   $('.ui.radio.checkbox').checkbox();
  },
  components:{
    emailEditor,
    'date-picker': myDatepicker
  }
}
</script>
<style scoped>
.fwn-right a{margin-left:10px}
.send_right{
    font-size:18px;
    color:#3f464b;
    font-weight:400
}
.send-message>div{
    margin-bottom:25px!important;
}
.number-message{
    margin: 40px 0;
    font-size:18px;
    color:#3f464b
}
.number-message font{
    font-size:28px !important;  
    margin:10px; 
    font-weight:700
}
.number-message a{
    margin-left:10px
}
.defaulttext{
 color:#0099ff 
}
::selection{
    background:#09f;
    color:white;
}
.warning{
    margin:0 0 20px!important;
    color:#ff8831;
}
.ui.radio.checkbox{
    margin-right:30px
}
.send{
    text-align:right
}
#linkman{
    border:1px solid #0099ff!important;
    border-radius: .28571429rem;
    color:#0099ff
}
.ui.selection.dropdown{
    border:1px solid #0099ff!important;
}
.leftFont{
    color:#a9abad
}
.ui.form .field label{
    font-size:18px;
    color:#3f464b;
    font-weight:400  
}
.mail-img img{
    margin:0 auto
}
</style>
