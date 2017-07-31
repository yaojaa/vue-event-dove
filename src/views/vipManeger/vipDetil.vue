<template>
<div id="container">
    <div class="pusher">
       <div class="banner"></div>
       <div class="ui items container">
          <div class="ui grid item bannerText">
                  <div class="image">
                      <img src="/images/vipImg.png">
                  </div>
                  <div class="middle aligned content">
                      <a class="header">DIA MEMBER</a>
                      <div class="description">
                              <p>我填写会员简介</p>
                              <p><span>2990会员</span><span>会员活动:20</span></p>
                      </div>
                  </div>
                  <div class="setBut">
                        <button class="ui inverted grey basic button">会员设置</button>
                  </div>
          </div>
          <div class="content">
            <div class="ui secondary pointing menu">
                <a class="item active"  @click='tabToggle(tab1Text);'><strong>会员管理</strong></a>
                <a class="item"  @click='tabToggle(tab2Text);'><strong>会员活动</strong></a>
            </div>
            <div class="tab">
               <component :is='currentView' keep-alive></component>
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
import vipManaer from '../vipManeger/vipManaer.vue'
import vipActive from '../vipManeger/vipActive.vue'
export default {
  data () {
    return {
          tab1Text:'vipManaer',
          tab2Text:'vipActive',
          currentView:'vipManaer'
    }
  },
  mounted () {
     $('.ui.checkbox').checkbox();
  },
  methods: {
     tabToggle:function(tabText,event){
        this.currentView=tabText;
        if(tabText=="vipManaer"){
          $(".secondary a").removeClass("active").eq(0).addClass("active");
        }else{
          $(".secondary a").removeClass("active").eq(1).addClass("active");
        }
     }
  },
  components:{
      vipManaer,
      vipActive
  }
}
</script>
<style scoped>
.chevron{
  color:#a8aaac
}
.pagination{
  text-align:center;
  margin-top:40px
}
.pagination a.item{
  width:20px;
  height:20px;
  display:inline-block;
  text-align:center;
  margin:0 8px;
  padding-right: 3px;
}
.vipManaer .item.active{
  background:#04a8ff;
  color:#ffffff;
  border-radius:15px
}
.term{
  padding: 0 30px 20px;
}
.term .checkbox{
  margin-right:20px
}
.term button{
  border-radius:50px;
  height:25px;
  padding: 0em 1.5em;
}
.ui.form .field label{
  font-size:14px !important;
  color:#9b9da0
}
strong{
  font-size:16px
}
.banner{
  background:url(/images/vipBaner.png);
  height:360px;
  background-size:100% 100%;
  position:absolute;
  top:55px;
  width:100%
}
.vipManaer .items.container{
  position:relative;
  top:65px;
  margin:0 auto;
  color:white
} 
.bannerText .header{
  color:#f7f2f2 !important
}
.bannerText .description{
  color:#f7f2f2 !important
}
.bannerText .extra{
  color:#f7f2f2 !important
}
.bannerText .item .image img{
  width:140px!important
}
.bannerText .setBut{
  width:20%
}
.item .description p span{
  margin-right:20px
}
.content{
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(137, 157, 197, 0.1);
    padding: 1.5em 2.5em;
    margin-top:123px;
    background:white;
}
.ui.secondary.pointing.menu{
  border-bottom:none!important
}
.ui.secondary.pointing.menu .active.item:hover, .ui.secondary.pointing.menu .active.item{
  border-bottom: 3px solid;
}
table tr td{
  min-height:100px
}
.ui.table td{
  height: 90px;
}
</style>