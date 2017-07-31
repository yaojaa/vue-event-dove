<template>
  <div class="vipManaer">
      <div class="ui grid filed form">
          <div class="inline five wide field">
            <label>搜索会员:</label>
            <input type="text" placeholder="输入姓名邮箱搜索">
          </div>
          <div class="inline six wide field">
            <label>距离会员到期剩余:</label>
            <select class="ui dropdown">
              <option value="全部">全部</option> 
              <option value="待审核">已开发票</option>
              <option value="已审核">未开发票</option>
            </select>
          </div> 
          <div class="inline two wide field">
              <button data-v-073a1f3e="" class="ui blue button">搜索</button>
          </div>                        
      </div>
      <div class="term">
        <div class="ui checkbox checked">
            <input type="checkbox" tabindex="0" class="hidden">
            <label>全选</label>
        </div>
        <button class="ui primary button">发短信</button>
        <button class="ui primary button">发邮件</button>
        <button class="ui primary button">移除会员</button>
        <router-link to="/vipManeger/id/vipInvite"><button class="ui primary button vipcomeon">邀请会员</button></router-link>
      </div>
      <div>
        <table class="ui fixed table">
          <thead>
            <tr><th>姓名</th>
            <th>邮箱</th>
            <th>加入时间</th>
            <th>会员期限</th>
            <th>操作</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>                      
                <div class="ui checkbox checked">
                    <input type="checkbox" tabindex="0" class="hidden">
                    <label>吴小雨</label>
                </div>
              </td>
              <td>Approved</td>
              <td>2014.02.23</td>
              <td>J永久</td>
              <td><a><router-link to="/vipManeger/id/vipLookDetil">查看详情</router-link></a></td>
            </tr>
            <tr>
              <td>                      
                <div class="ui checkbox checked">
                    <input type="checkbox" tabindex="0" class="hidden">
                    <label>吴小雨</label>
                </div>
              </td>
              <td>Approved</td>
              <td>2014.02.23</td>
              <td>J永久</td>
              <td>创建者</td>
            </tr>
             <tr>
              <td>                      
                <div class="ui checkbox checked">
                    <input type="checkbox" tabindex="0" class="hidden">
                    <label>吴小雨</label>
                </div>
              </td>
              <td>Approved</td>
              <td>2014.02.23</td>
              <td>J永久</td>
              <td><a><router-link to="/vipManeger/id/vipLookDetil">查看详情</router-link></a></td>
            </tr>
          </tbody>
        </table>
        <div class="pagination menu">
          <a class="item"><i class="left chevron  icon"></i></a>
          <a class="item active">
            1
          </a>
          <a class="item">
            2
          </a>
          <a class="item">
            3
          </a>
          <a class="item"><i class="right chevron  icon"></i></a>
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

  },
  components:{

  }
}
</script>
<style scoped>
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
  margin: 20px 35px;
}
.vipActive .items{
  margin-left:45px
}
.vipActive .item{
  margin-bottom:30px
}
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
  box-shadow:0 3px 5px 0 rgba(34,36,38,.15) !important;
}
.ui.form .field label{
  font-size:14px !important;
  color:#9b9da0
}
strong{
  font-size:16px
}
.vipManaer .ui.grid{
  margin:1em
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
.bannerText .item .header{
  color:#f7f2f2 !important
}
.bannerText .item .description{
  color:#f7f2f2 !important
}
.bannerText .item .extra{
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
table tr td a{
  cursor: pointer;
}
.ui.table td{
  height: 90px;
}
.vipcomeon{
   border-radius:3px !important;
   height:35px !important;
   padding:0 !important;
   width:80px;
   float:right;
   background:#00cfb3 !important;
   color:#ffffff
}
.vipcomeon:hover{
  background:#18b31f !important
}
</style>