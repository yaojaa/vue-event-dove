<template>
    <div class="ui container footerBar" id="footer">
        <div class="ui divider"></div>
        <div class="ui doubling stackable  grid">
         <div class="six wide column"><router-link to="/"><img src="/images/logo.png" class="ui image inline-block" width="110"></router-link><div class="mt-xs text-muted f12">本活动使用会鸽进行售票</div></div>
           <div class="ten wide text-right column computer only tablet only"><div class="mb-sm"><div class="ui horizontal default list"><router-link to="/createEvent/1/0" class="item">创建活动</router-link><router-link to="/about" class="item">关于会鸽</router-link><router-link to="/privacy" class="item">隐私声明</router-link><router-link="/faqs" class="item">常见问题</router-link></div></div><div class="text-info">Copyright©2017 EventDove.com版权所有  |  苏ICP备 10211262号  苏ICP证 B1-20150298号</div></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'footers',
  data () {
    return {
      msg: 'Welcome to Event Dove'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media only screen and (max-width: 767px) {
  .footerBar,.footerBar .text-right{
    text-align: center !important;
  }
}
</style>
