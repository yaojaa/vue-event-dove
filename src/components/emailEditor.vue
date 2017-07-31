<template>
<div id="editorBox">
                <div class="fluidTabsCon" >
                   <div class="fluidTabsCon editorContent" >
                        <htmlEditor  v-model="content"  @on-result-change="onResultChange"></htmlEditor>
                  </div>
                </div>
                <div class="ui hidden divider"></div>
</div>
</template>
<script>
import htmlEditor from './html-editor'
export default {
  name: 'editor',
  data () {
    return {
      content:""
    }
  },
  methods:{
     onResultChange(val){
      this.menus= val;
      this.$emit('on-content-change',this.menus)
     }
  },
  components:{
    htmlEditor 
  }
}
</script>
<style scoped>
#editorBox .labelInput{
  padding: 0;
  border: 0;
  cursor: pointer;
}
#editorBox .active .labelInput{
  background:#0099ff;
  color: #fff
}
.editorContent.active{
  display: block;
}
</style>