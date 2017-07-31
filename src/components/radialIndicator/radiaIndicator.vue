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

<template>
  <div class="prg-cont-wrap">
    <div class="prg-cont rad-prg" :id="_index"></div>
    <span class="rate">签到率</span>
    <div class="sale">已报名人数：{{totalAttendeesCount}}</div>
  </div>
</template>

<script scoped>
  import './radialIndicator.js'
  export default {
    props: {
      totalAttendeesCount: {
        type: Number,
        default () {
          return 0
        }
      },
      checkedInRate: {
        type: Number,
        default () {
          return 0
        }
      },
      _index: {
        type: Number,
        default () {
          return 0
        }
      }
    },
    data() {
      return {
      };
    },
    mounted() {
      radialIndicator.defaults.radius = 34;
      radialIndicator.defaults.barColor = "#99CC33"; 
      let _this = this; 
      $('#'+_this._index).radialIndicator({
          fontSize: 14,
          fontWeight: 100,
          barColor: '#87CEEB',
          barWidth: 3,
          initValue: 40,
          roundCorner : true,
          percentage: true,
          fontColor: '#999'
      });

      var radialObj = $('#'+_this._index).data('radialIndicator');
      //now you can use instance to call different method on the radial progress.
      //like
      radialObj.animate(this.checkedInRate);
    }
  };
</script>
