<template>
  <div class="search">
  <ul class="view-category-list">
        <li>
            <div>时 间：</div>
            <ul id="filterByDate">
                <li data-value=""><a href="#" onclick="javascript:search1(1, 'filterByDate', this);">全部</a></li>
                <li data-value="t2"><a href="#" onclick="javascript:search1(1, 'filterByDate', this);">今天</a></li>
                <li data-value="t3" class="active"><a href="#" onclick="javascript:search1(1, 'filterByDate', this);">明天</a></li>
                <li data-value="t1"><a href="#" onclick="javascript:search1(1, 'filterByDate', this);">本周</a></li>
                <li data-value="t4"><a href="#" onclick="javascript:search1(1, 'filterByDate', this);">本周末</a></li>
                <li data-value="t5"><a href="#" onclick="javascript:search1(1, 'filterByDate', this);">本月</a></li>
                <li data-value="ts"><button class="btn btn-link" id="view-category-date">指定日期</button></li>
            </ul>
        </li>
        <li>
            <div>兴 趣：</div>
            <ul id="filterByTag">
                <li data-value="" class="active"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">全部</a></li>
                <li data-value="创业"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">创业</a></li>
                <li data-value="公益"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">公益</a></li>
                <li data-value="亲子"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">亲子</a></li>
                <li data-value="科技"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">科技</a></li>
                <li data-value="运动"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">运动</a></li>
                <li data-value="互联网"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">互联网</a></li>
                <li data-value="音乐"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">音乐</a></li>
                <li data-value="交友"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">交友</a></li>
                <li data-value="教育"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">教育</a></li>
                <li data-value="校园"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">校园</a></li>
                <li data-value="电影"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">电影</a></li>
                <li data-value="IT"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">IT</a></li>
                <li data-value="健康"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">健康</a></li>
                <li data-value="职场"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">职场</a></li>
                <li data-value="文艺"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">文艺</a></li>
                <li data-value="投资"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">投资</a></li>
                <li data-value="户外"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">户外</a></li>
                <li data-value="心理"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">心理</a></li>
                <li data-value="金融"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">金融</a></li>
                <li data-value="手工"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">手工</a></li>
                <li data-value="营销"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">营销</a></li>
                <li data-value="旅行"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">旅行</a></li>
                <li data-value="读书"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">读书</a></li>
                <li data-value="电商"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">电商</a></li>
                <li data-value="时尚"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">时尚</a></li>
                <li data-value="设计"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">设计</a></li>
                <li data-value="游戏"><a href="#" onclick="javascript:search1(1, 'filterByTag', this);">游戏</a></li>
            </ul>
        </li>
        <li>
            <div>城 市：</div>
            <ul id="filterByCity">
                <li data-value="全部"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">全部</a></li>
                <li data-value="北京" class="active"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">北京</a></li>
                <li data-value="上海"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">上海</a></li>
                <li data-value="广州"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">广州</a></li>
                <li data-value="深圳"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">深圳</a></li>
                <li data-value="杭州"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">杭州</a></li>

                <li data-value="成都"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">成都</a></li>
                <li data-value="南京"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">南京</a></li>
                <li data-value="苏州"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">苏州</a></li>
                <li data-value="武汉"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">武汉</a></li>
                <li data-value="天津"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">天津</a></li>

                <li data-value="重庆"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">重庆</a></li>
                <li data-value="西安"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">西安</a></li>
                <li data-value="厦门"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">厦门</a></li>
                <li data-value="宁波"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">宁波</a></li>
                <li data-value="郑州"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">郑州</a></li>

                <li data-value="青岛"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">青岛</a></li>
                <li data-value="东莞"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">东莞</a></li>
                <li data-value="佛山"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">佛山</a></li>
                <li data-value="长沙"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">长沙</a></li>
                <li data-value="石家庄"><a href="#" onclick="javascript:search1(1, 'filterByCity', this);">石家庄</a></li>
            </ul>
        </li>
    </ul>
    <h1><img src="http://www.eventdove.com/img/refactor2/image/search_event_top.png"></h1>
   
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      msg: 'Welcome to Event Dove'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
  background: url('http://www.eventdove.com/img/refactor2/image/search_event_top_bg05.jpg');
}
.view-category-list {
    font-size: 14px;
    margin-bottom: 16px;
    padding: 20px 20px 1px;
    color: #7d7d7d;
    background: #f6f6f6;
    height:100px
}
.view-category-list>li {
    margin-bottom: 16px;
    padding-left: 50px;
        list-style:none

}
.view-category-list>li li {
    float: left;
    margin-right: 10px;
    list-style:none
}

.view-category-list>li>div {
    float: left;
    margin-left: -50px;
    padding-top: 1px;
    color: #b1b0b0;
    clear:both
}

</style>
