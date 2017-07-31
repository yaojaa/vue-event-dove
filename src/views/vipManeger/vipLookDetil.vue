<template>
<div id="container">
   <div class="manage-main">
          <div class="ui container">
              <div class="sub-title text-justify">
                  <h2 class="fwn"><span class="text-muted f16">会员首页</span>/会员详情</h2>
                  <router-link to="/vipManeger/id/vipEvent"><span class="comeBack"><i class="reply icon"></i>返回</span></router-link>
              </div>
              <div class="white-wrap p-xl">
                <div class="ui link items">
                    <div class="item infomation">
                      <div class="ui tiny image photo">
                         <span class="name">海明</span>
                      </div>
                      <div class="middle aligned content">
                        <div class="header">张海明</div>
                        <div class="description">
                          <p><span>邮箱 : haiming@176.com</span><span>到期时间 :2018-02-21</span></p>
                        </div>
                      </div>
                      <div class="buttons">
                         <button class="ui teal button" @click="xuqi">会员续期</button>
                         <button class="ui blue button" @click="renew">发送续费提醒</button>
                      </div>
                    </div>
                </div>
                <div class="ui vipDetil">
                  <h2><span class="tubiao"></span>会员详情</h2>
                  <form class="ui form">
                    <div class="field">
                      <label>姓名</label>
                      <input type="text" name="first-name" placeholder="First Name">
                    </div>
                    <div class="field">
                      <label>加入到我们您希望可以?</label>
                      <input type="text" name="last-name" placeholder="Last Name">
                    </div>
                    <div class="field">
                      <label>您的个人信息简介?</label>
                      <input type="text" name="last-name" placeholder="Last Name">
                    </div>
                    <button class="ui blue button" type="submit">提交</button>
                  </form>
                </div>
                <div class="ui vipDetil">
                  <h2><span class="tubiao"></span>会员动态</h2>
                  <div class="ui grid">
                    <div class="five wide column">
                       <p><i class="empty star icon"></i>报名活动</p>
                       <p>12次</p>
                    </div>
                    <div class="five wide column">
                       <p><i class="checked calendar icon"></i>活动签到</p>
                       <p>12次</p>
                    </div>
                    <div class="five wide column">
                       <p><i class="file text outline icon"></i>消费</p>
                       <p>￥12000</p>
                    </div>
                  </div>
                </div>
                <div class="ui grid vipActive">
                   <span class="one wide column"><span class="cblmenu"></span></span>
                   <div  class="fourteen wide column ui four items">
                      <div class="item">
                        <div class="middle aligned content">
                          <a class="header">2016.10.10 12:00 </a>
                          <div class="description">
                              <p>报名成功了<a>第十届互联网大会</a></p>
                          </div>
                        </div>
                      </div>
                      <div class="item">
                        <div class="middle aligned content">
                          <a class="header">2016.10.10 12:00 </a>
                          <div class="description">
                              <p>报名成功了<a>第十届互联网大会</a></p>
                          </div>
                        </div>
                      </div>
                      <div class="item">
                        <div class="middle aligned content">
                          <a class="header">2016.10.10 12:00 </a>
                          <div class="description">
                              <p>报名成功了<a>第十届互联网大会</a></p>
                          </div>
                        </div>
                      </div>
                      <div class="item more">
                        <a>查看更多</a> 
                      </div>                         
                   </div>
                </div>
              </div>
          </div>
   </div>
   <div class="ui mini modal xufei">
        <i class="close icon"></i>
        <div class="header">
          发送续费提醒
        </div>
        <div class="image content">
          <div class="image">
               <i class="alarm outline icon"></i>
          </div>
          <div class="description">
           此会员会费即将到期,是否发送续费提醒？
          </div>
        </div>
        <div class="actions">
          <div class="ui primary positive icon button ">
            是
          </div>
          <div class="ui black deny button">
            否
          </div>
  
       </div>
   </div>
   <div class="ui mini modal xuqi">
        <i class="close icon"></i>
        <div class="header">
          会员续期
        </div>
        <div class="image content">
          <div class="description">
             <p><span>到期时间:</span><span>2018-09-30</span></p>
             <p><span>延长时间至:</span><span><input></span></p>
          </div>
        </div>
        <div class="actions">
          <div class="ui primary positive icon button ">
            确定
          </div>
          <div class="ui black deny button">
            取消
          </div>
  
       </div>
   </div>
</div>
</template>
<script>
import {
    API_URL
} from '../../config'
import myDatepicker from '../../components/vue-datepicker'
import moment from 'moment'
export default {
  data () {
    return {
       //日历控件
      Time:"",
      option: {
        type: 'min',
        format: 'YYYY-MM-DD HH:mm',
        language: 'zhCn',
        inputStyle: {
          // 'display': 'inline-block',
          // 'padding': '5px 10px',
          // 'line-height': '30px',
          // 'font-size': '16px',
          // 'border': '2px solid #fff',
          // 'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          // 'border-radius': '2px',
          // 'color': '#5F5F5F',
          // 'width': '300px'
          // 'display': 'inline-block',
          // 'padding': '6px',
          // 'line-height': '22px',
          // 'font-size': '16px',
          // 'border': '2px solid #fff',
          // 'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          // 'border-radius': '2px',
          // 'color': '#5F5F5F'
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
  mounted () {

  },
  methods: {
     renew:function(){
        $('.ui.xufei').modal('show');   
     },
     xuqi:function(){
        $('.ui.xuqi').modal('show');   
     }
  },
  components:{
    'date-picker': myDatepicker
  }
}
</script>
<style scoped>
  .xuqi .description span{
   margin-left:30px
  }
  .xuqi .description p span:nth-child(1){
    color:#a2a4a7
  }
  i.alarm{
    color:#FFC107;
    font-size:2em !important;
  }
  .vipDetil .grid>div{
    height:90px;
    background:#f4f5f8;
    margin:0.8em;
    text-align:center
  }
  .vipDetil .grid>div>p:nth-child(1){
    color:#aaacaf;
    font-size:16px
  }
  .vipDetil label{
    color:#949699!important
  }
  .tubiao{
    background:#0099ff;
    height:20px;
    width:6px;
    display:inline-block;
    margin-right:10px
  }
  .vipDetil{
    margin-top:40px
  }
  .photo{
    margin-right:20px !important
  }
  .name{
    font-size:25px;
    background:#00cfb3;
    min-width:80px;
    color:#ffffff;
    border-radius:40px;
    min-height:80px;
    display:block;
    text-align:center;
    line-height:80px;

  } 
  .infomation .header{
    font-size:20px!important
  }
  .infomation .description span{
    margin-right:20px;
    color:#949699
  }
  .comeBack{
    cursor: pointer;
  }
  .btntitle{
  position:absolute;
  top:10px;
  right:10px;
  padding:5px 10px;
  color:#fff;
  border-radius:18px;
  width:80px;
  text-align:center
}
.activing{
  background:#00cfb3;
}
.activAction{
  background:#04a8ff;
}
.activend{
  background:#949699;
}
.vipActive .item .image{
  overflow:hidden;
  width:225px !important;
  height:110px !important;
}
.vipActive .description{
  color:#949699 !important
}
.vipActive .price{
  color:#edaa3c !important
}
.vipManaer{
  overflow:hidden
}
.vipActive .cblmenu{
  background:url(/images/vipactive.png);
  display: block;
  height: 100%;
  width: 24px;
  margin: 20px 0px;
}
.vipActive .items{
  margin-left:-5px
}
.vipActive .item{
  height:131px
}
.item.more{
  height:auto !important
}
.chevron{
  color:#a8aaac
}
.vipActive .image{
  position:relative
}
.vipActive .one{
  margin-left:0px;
  overflow:hidden
}
</style>