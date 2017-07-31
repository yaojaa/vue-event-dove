<template>
    <div class="sub-title text-justify">
            <h2 class="text-info fwn">热门活动</h2>
            <a href="#">更多</a>
    </div>
    <div class="ui three doubling stackable cards default link hot-activity" id="activity">
                <div class="card hot-card">
                    <div class="image" style="background-image: url(images/banner01.jpg)">
                    </div>
                    <div class="ui red label hot-tag">互联网</div>
                    <div class="content">
                        <div class="card-box">
                            <div class="card-img"><img src="images/pic.jpg"></div>
                            <div class="card-text f16">中国网红产业峰会暨中国500强网红颁奖盛典</div>
                        </div>
                        <div class="info-box">
                            <p class="text-justify text-muted date"><span><i class="wait icon"></i>2016年10月01日</span>
                                <span class="hot-share hand-type transition hidden"><i class="fitted share icon mr-n"></i> 分享</span>
                            </p>
                            <div class="text-muted">
                                <div class="text-hide"><i class="marker icon"></i>北京市朝阳区国际会议中心天辰东路7号</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card hot-card">
                    <div class="image" style="background-image: url(images/banner02.jpg)">
                    </div>
                    <div class="ui teal label hot-tag">互联网</div>
                    <div class="content">
                        <div class="card-box">
                            <div class="card-img"><img src="images/pic.jpg"></div>
                            <div class="card-text f16">中国网红产业峰会暨中国500强网红颁奖盛典</div>
                        </div>
                        <div class="info-box">
                            <p class="text-justify text-muted date"><span><i class="wait icon"></i>2016年10月01日</span>
                                <span class="hot-share hand-type transition hidden"><i class="fitted share icon mr-n"></i> 分享</span>
                            </p>
                            <div class="text-muted">
                                <div class="text-hide"><i class="marker icon"></i>北京市朝阳区国际会议中心天辰东路7号</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card hot-card">
                    <div class="image" style="background-image: url(images/banner03.jpg)">
                    </div>
                    <div class="ui orange label hot-tag">互联网</div>
                    <div class="content">
                        <div class="card-box">
                            <div class="card-img"><img src="images/pic.jpg"></div>
                            <div class="card-text f16">中国网红产业峰会暨中国500强网红颁奖盛典</div>
                        </div>
                        <div class="info-box">
                            <p class="text-justify text-muted date"><span><i class="wait icon"></i>2016年10月01日</span>
                                <span class="hot-share hand-type transition hidden"><i class="fitted share icon mr-n"></i> 分享</span>
                            </p>
                            <div class="text-muted">
                                <div class="text-hide"><i class="marker icon"></i>北京市朝阳区国际会议中心天辰东路7号</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card hot-card">
                    <div class="image" style="background-image: url(images/banner02.jpg)">
                    </div>
                    <div class="ui yellow label hot-tag">互联网</div>
                    <div class="content">
                        <div class="card-box">
                            <div class="card-img"><img src="images/pic.jpg"></div>
                            <div class="card-text f16">中国网红产业峰会暨中国500强网红颁奖盛典</div>
                        </div>
                        <div class="info-box">
                            <p class="text-justify text-muted date"><span><i class="wait icon"></i>2016年10月01日</span>
                                <span class="hot-share hand-type transition hidden"><i class="fitted share icon mr-n"></i> 分享</span>
                            </p>
                            <div class="text-muted">
                                <div class="text-hide"><i class="marker icon"></i>北京市朝阳区国际会议中心天辰东路7号</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card hot-card">
                    <div class="image" style="background-image: url(images/banner01.jpg)">
                    </div>
                    <div class="ui olive label hot-tag">互联网</div>
                    <div class="content">
                        <div class="card-box">
                            <div class="card-img"><img src="images/pic.jpg"></div>
                            <div class="card-text f16">中国网红产业峰会暨中国500强网红颁奖盛典</div>
                        </div>
                        <div class="info-box">
                            <p class="text-justify text-muted date"><span><i class="wait icon"></i>2016年10月01日</span>
                                <span class="hot-share hand-type transition hidden"><i class="fitted share icon mr-n"></i> 分享</span>
                            </p>
                            <div class="text-muted">
                                <div class="text-hide"><i class="marker icon"></i>北京市朝阳区国际会议中心天辰东路7号</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card hot-card">
                    <div class="image" style="background-image: url(images/banner03.jpg)">
                    </div>
                    <div class="ui green label hot-tag">互联网</div>
                    <div class="content">
                        <div class="card-box">
                            <div class="card-img"><img src="images/pic.jpg"></div>
                            <div class="card-text f16">中国网红产业峰会暨中国500强网红颁奖盛典</div>
                        </div>
                        <div class="info-box">
                            <p class="text-justify text-muted date"><span><i class="wait icon"></i>2016年10月01日</span>
                                <span class="hot-share hand-type transition hidden"><i class="fitted share icon mr-n"></i> 分享</span>
                            </p>
                            <div class="text-muted">
                                <div class="text-hide"><i class="marker icon"></i>北京市朝阳区国际会议中心天辰东路7号</div>
                            </div>
                        </div>
                    </div>
                </div>
</template>

<script>
import { mapState } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'activity',
  data () {
    return {
      msg: 'Welcome to Event Dove',
      events: [],
      swiperOption: {
        // 如果你后续需要找到当前实例化后的swiper对象以对其进行一些操作的话，可以自定义配置一个名字
        name: 'currentSwiper',
        // 所有配置均为可选（同Swiper配置）
        autoplay: 3000,
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: false,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        observeParents: true,
        effect: 'fade',
        // if you need use plugins in the swiper, you can config in here like this
        debugger: true
        // swiper callbacks
        // onTransitionStart: function(swiper){
        //   console.log(swiper)
        // }
        // more Swiper config ...
        // ...
      }
    }
  },
  computed:  mapState({
    // 箭头函数可使代码更简练
    isNewUser: state => state.isNewUser
  }),
  mounted: function () {
     $('.dropdown').dropdown();
    $('.hot-activity .hot-card')
        .transition({
            animation: 'pulse',
            duration: 800,
            interval: 200
        });
    $('.hot-card').hover(function() {
        $(this).find('.hot-share').transition('fly right');
    }, function() {
        $(this).find('.hot-share').transition('fly left');
    })
    $('.hot-area').hover(function() {
            $(this).find('.shape').shape('flip down');
        }, function() {
            $(this).find('.shape').shape('flip up');
        })
        // $('.dimmer').dimmer('show')
    $('.home-sorts').dimmer({
        on: 'hover',
        opacity: '0.3',
        transition: 'fade up'
    });


    
    $('.ui.dropdown').dropdown({
      on: 'hover'
    })
          console.log($.fn.modal)
      $('#newGuild').modal()

    console.log(this.isNewUser)
    if(this.isNewUser){
      console.log($('#newGuild'))
      this.$store.state.isNewUser = false
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  >
.swiper-slide {
    background-position: center;
    background-size: cover;
    height:360px
  }
.swiper-container{
  height: 360px;
  width:100%;
}
 @import "../assets/css/home.css"

</style>
