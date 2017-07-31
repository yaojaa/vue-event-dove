<template>
  <div class="prg-cont-wrap">
    <div class="prg-cont rad-prg" :id="tIndex"></div>
    <span class="rate">签到率</span>
    <div class="sale">已签/未签 ：{{obj[tIndex].signInCount}}/{{obj[tIndex].noSignInCount}}</div>
    <div class="sale">{{obj[tIndex].group.name}}</div>
  </div>
</template>
<script scoped>
  import './radialIndicator.js'
  export default {
    props: ['obj','tIndex','radius'],
    data() {
      return {
      };
    },
    mounted() {
      radialIndicator.defaults.radius =this.radius;
      radialIndicator.defaults.barColor = "#99CC33"; 
      let _this = this; 
      $('#'+_this.tIndex).radialIndicator({
          fontSize: 14,
          fontWeight: 100,
          barColor: '#87CEEB',
          barWidth: 3,
          initValue: 40,
          roundCorner : true,
          percentage: true,
          fontColor: '#999'
      });
      var radialObj = $('#'+_this.tIndex).data('radialIndicator');
      radialObj.animate(this.obj[this.tIndex].checkedInRate*100);
    }
  };
</script>
<style scoped>

  .prg-cont-wrap{
    position: relative;
    width:100px;
    text-align: center;
  }
  .prg-cont-wrap > .rate{
    position: absolute;
    top: 44%;
    left: 0;
    right: 0;
    font-size: 12px;
    color:#999;
  }

  .prg-cont-wrap > .sale{
    font-size: 12px;
    color:#333;
  }
</style>