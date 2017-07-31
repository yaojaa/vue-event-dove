<template>
<div> </div>
</template>
<script>

export default {
  name: 'dragable',
  props: {
     list: {
        type: Array,
        required: false,
        default: null
      }
  },
  data () {
    return {
      myValue : this.value    
      }
  },
  mounted () {
  },
  watch: {
   myValue(val){ //向父组件发送消息
      this.$emit("on-result-change",this.index,val);//③组件内对myResult变更后向外部发送事件通知
   }
}
}
</script>
<style scoped>
</style>