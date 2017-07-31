<template>
  <div class="ui grid vipActive">
     <span class="one wide column"><span class="cblmenu"></span></span>
     <div  class="fourteen wide column ui four items">
        <div class="item">
          <div class="image">
             <img src="/images/vipActivebaner.png">
             <div class="btntitle activing">进行中</div>
          </div>
          <div class="middle aligned content">
            <a class="header">中国网红500强企业赶紧来</a>
            <div class="description">
                <p>时间 : 2016.10.10 12:00 ~ 2016.10.11 12:00</p>
                <p>地址 : 上海市商业文化大厦</p>
            </div>
            <div class="extra price">会员价 : <i>￥140</i></div>
          </div>
        </div>
        <div class="item">
          <div class="image">
             <img src="/images/vipActivebaner.png">
             <div class="btntitle activAction">即将开始</div>
          </div>
          <div class="middle aligned content">
            <a class="header">中国网红500强企业赶紧来</a>
            <div class="description">
                <p>时间 : 2016.10.10 12:00 ~ 2016.10.11 12:00</p>
                <p>地址 : 上海市商业文化大厦</p>
            </div>
            <div class="extra price">会员价 : <i>￥140</i></div>
          </div>
        </div>
        <div class="item">
          <div class="image">
             <img src="/images/vipActivebaner.png">
             <div class="btntitle activend">已结束</div>
          </div>
          <div class="middle aligned content">
            <a class="header">中国网红500强企业赶紧来</a>
            <div class="description">
                <p>时间 : 2016.10.10 12:00 ~ 2016.10.11 12:00</p>
                <p>地址 : 上海市商业文化大厦</p>
            </div>
            <div class="extra price">会员价 : <i>￥140</i></div>
          </div>
        </div>
        <div class="item">
          <a>查看更多</a> 
        </div>                         
     </div>
  </div>
</template>
<script>
import {
    API_URL
} from '../../config'
export default {
  data () {
    return {
     
    }
  },
  mounted () {
     $('.ui.checkbox').checkbox();
  },
  methods: {
      tabswith:function(){
      
      }
  },
  components:{

  }
}
</script>
<style scoped>
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
  margin-bottom:34px
}
.chevron{
  color:#a8aaac
}
.vipActive .image{
  position:relative
}
.vipActive .one{
  margin-left:35px;
  overflow:hidden
}
</style>