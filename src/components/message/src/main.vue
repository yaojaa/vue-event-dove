<style>
.el-message{
  box-shadow:0 2px 4px rgba(0,0,0,.22),0 0 6px rgba(0,0,0,.04);
  min-width:300px;
  padding:10px 12px;
  box-sizing:border-box;
  border-radius:2px;
  position:fixed;
  left:50%;
  top:60px;
  transform:translateX(-50%);
  background-color:#fff;
  transition:opacity .3s,transform .4s;
  overflow:hidden;
  border-radius:4px;
}

.el-message .el-message__icon.info{color:#2db7f5}
.el-message .el-message__icon.warning{color:#fac450}
.el-message .el-message__icon.success{color:#87d068}
.el-message .el-message__icon.error{color:#f60}

.el-message__group{margin-left:38px;
    position:relative;
  height:20px
}
  .el-message__group p{
    font-size:14px;
    line-height:20px;
  margin:0 34px 0 0;
  white-space:nowrap;
  color:#8391a5;
  text-align:justify;
  display:inline-block;
  vertical-align:middle}
  .el-message__group.is-with-icon{
    margin-left:0
    }
 .el-message__icon{vertical-align:middle;
    margin-right:8px}
 .el-message__closeBtn{top:3px;
    right:0;
  position:absolute;
  cursor:pointer;
  color:#bfcbd9;
  font-size:14px}
  .el-message__closeBtn:hover{color:#97a8be}
  .el-message-fade-enter,.el-message-fade-leave-active{
    opacity:0;
    transform:translate(-50%,-100%)
  }

</style>

<template>
  <transition name="el-message-fade">
    <div
      class="el-message"
      :class="customClass"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
     <div class="el-message__group is-with-icon">
        <i class="el-message__icon icon" :class="[iconMap[type],type]"></i>
        <p>{{ message }}</p>
        <i v-if="showClose" class="el-message__closeBtn el-icon-close icon remove" @click="close"></i>
      </div>
    </div>
  </transition>
</template>
<script >
  export default {
    data() {
      return {
        visible: false,
        message: '',
        duration: 3000,
        type: 'info',
        customClass: '',
        onClose: null,
        showClose: false,
        closed: false,
        timer: null,
        //http://www.semantic-ui.cn/elements/icon.html
        iconMap: {
        'success':'check circle',
        'error'  :'remove circle',
        'warning' : 'warning sign',
        'info' : 'Info Circle'
      }
      };

    },
    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
          this.$el.addEventListener('transitionend', this.destroyElement);
        }
      }
    },

    methods: {
      destroyElement() {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
      }
    },

    mounted() {
      this.startTimer();
    }
  };
</script>
