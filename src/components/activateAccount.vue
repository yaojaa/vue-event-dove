<template>

    <div class="login-wrap transition visible recover">
        <div class="por animated-box">
            <h2 align="center">
            欢迎加入会鸽，请打开邮箱{{text}}
            </h2>
            <div class="ui column centered grid">
                <div class="thirteen wide column">
                    <div class="ui hidden divider"></div>
                    <div>
                     <a :href="userEmail" class="ui animated fade button blue fluid large" target="_blank">前往邮箱</a>
                  <br>
                  <br>

                     <router-link to="/login" v-if="fromReg">我已经{{text}}，返回登录</router-link>

                  <br>
                                    <br>

                  没有收到{{text}}邮件？<a href="javascript:void(0)" @click="resend">重新发送</a>

                    </div>
                  
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Auth from '../auth'

export default {
  data () {
    return {
      email:this.$route.params.id.replace('&','.'),
      fromReg:!!parseInt(this.$route.params.status),
      indexUrl:parseInt(this.$route.params.status)
    }
  },
  computed: {
    userEmail:function() {
    return 'http://mail.' +this.$route.params.id.split('@')[1].replace('&','.')
    },
    text(){
      return this.fromReg?'激活':'重置密码'
    }
  },
  methods: {
    resend(){
      Auth.sendemail(this,{email:this.email,indexUrl:this.indexUrl},()=>{
        this.$message.success('发送成功')
      })
    }
  },
  mounted () {
    document.title = this.fromReg?'邮箱激活':'重置密码'
  }
}
</script>
<style >
</style>