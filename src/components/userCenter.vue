<template>
    <div class="pusher">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn">我的活动</h2>
                <a href="#">全部活动</a>
            </div>
            <div class="white-wrap u-card-wrap">
                <div class="u-card-main">
                    <div class="ui items u-card-items  f12" style="width:2000px;">
                        <div class="item">
                            <div class="ui little image"><img src="/images/pp03.png"></div>
                            <div class="middle aligned content"><a class="header fwn">北京摄影展</a>
                                <div class="meta"><span class="text-teal">进行中</span> ｜ 主办方：橙子科技</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui little image"><img src="/images/pp03.png"></div>
                            <div class="middle aligned content"><a class="header fwn">北京摄影展</a>
                                <div class="meta"><span class="text-orange">即将开始</span> ｜ 主办方：橙子科技</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui little image"><img src="/images/pp03.png"></div>
                            <div class="middle aligned content"><a class="header fwn">北京摄影展</a>
                                <div class="meta"><span class="text-orange">即将开始</span> ｜ 主办方：橙子科技</div>
                            </div>
                        </div>
                    </div>
                </div>
                <i class="chevron left icon"></i>
                <i class="chevron right icon"></i>
            </div>
            <div class="sub-title text-justify">
                <h2 class="fwn">我的群组</h2>
                <span><a href="#">全部群组</a>&nbsp;&nbsp;<a class="ui button small blue">创建群组</a></span>
            </div>
            <div class="white-wrap u-card-wrap">
                <div class="u-card-main">
                    <div class="ui items u-card-items  f12" style="width:2000px;">
                        <div class="item">
                            <div class="ui little image"><img src="/images/pp01.png"></div>
                            <div class="middle aligned content"><a class="header fwn">DIA Member</a>
                                <div class="meta">会员：2839&nbsp;&nbsp;活动：12</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui little image"><img src="/images/pp01.png"></div>
                            <div class="middle aligned content"><a class="header fwn">DIA Member</a>
                                <div class="meta">会员：2839&nbsp;&nbsp;活动：12</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui little image"><img src="/images/pp01.png"></div>
                            <div class="middle aligned content"><a class="header fwn">DIA Member</a>
                                <div class="meta">会员：2839&nbsp;&nbsp;活动：12</div>
                            </div>
                        </div>
                    </div>
                </div>
                <i class="chevron left icon"></i>
                <i class="chevron right icon"></i>
            </div>
            <div class="sub-title text-justify">
                <h2 class="fwn">数据总览</h2>
            </div>
            <div class="ui four item top attached tabular menu">
                <a class="active item" data-tab="first">
                    <div class="u-tab-tit">
                        <div class="fwn text-muted">活动总数</div>
                        <h1 class="ui header">200</h1></div>
                </a>
                <a class="item" data-tab="second">
                    <div class="u-tab-tit">
                        <div class="fwn text-muted">参会人员</div>
                        <h1 class="ui header">29113</h1></div>
                </a>
                <a class="item" data-tab="third">
                    <div class="u-tab-tit">
                        <div class="fwn text-muted">总收入</div>
                        <h1 class="ui header">¥1244.00 <br>$1244.00</h1></div>
                </a>
                <a class="item" data-tab="fourth">
                    <div class="u-tab-tit">
                        <div class="fwn text-muted">活动访问量</div>
                        <h1 class="ui header">29113</h1></div>
                </a>
            </div>
            <div class="ui bottom attached active tab segment p40" data-tab="first">
                <div class="ui form">
                    <div class="inline fields">
                        <div class="field">
                            <label class="fwn text-muted">按年份:</label>
                            <select class="ui dropdown">
                                <option value="">全部年份</option>
                                <option value="1">2017</option>
                                <option value="0">2016</option>
                            </select>
                        </div>
                        <div class="field">
                            <label class="fwn text-muted">按季度:</label>
                            <select class="ui dropdown">
                                <option value="">全部季度</option>
                                <option value="1">一季度</option>
                                <option value="0">二季度</option>
                                <option value="1">三季度</option>
                                <option value="0">四季度</option>
                            </select>
                        </div>
                        <div class="field">
                            <label class="fwn text-muted">自定义时间:</label>
                            <input type="text" placeholder="">
                        </div>
                    </div>
                </div>
                <img src="/images/test01.jpg">
                <div class="text-justify">
                    <div class="ui form">
                        <div class="inline fields">
                            <div class="field">
                            <div class="ui icon input">
                                <input type="text" placeholder="开始时间">
                                <i class="calendar icon"></i>
                            </div>
                        </div>
                        <div class="field">
                            -
                        </div>
                            <div class="field">
                            <div class="ui icon input">
                                <input type="text" placeholder="结束时间">
                                <i class="calendar icon"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                    <a href="#">下载表格</a></div>
                <table class="ui padded very basic striped table">
                    <thead>
                        <tr>
                            <th>开始时间</th>
                            <th>活动名称</th>
                            <th>分类</th>
                            <th>活动地区</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2011.1.3</td>
                            <td>第十届互联网大会</td>
                            <td>IT/互联网</td>
                            <td>江苏省南京市</td>
                        </tr>
                        <tr>
                            <td>2011.1.3</td>
                            <td>第十届互联网大会</td>
                            <td>IT/互联网</td>
                            <td>江苏省南京市</td>
                        </tr>
                        <tr>
                            <td>2011.1.3</td>
                            <td>第十届互联网大会</td>
                            <td>IT/互联网</td>
                            <td>江苏省南京市</td>
                        </tr>
                        <tr>
                            <td>2011.1.3</td>
                            <td>第十届互联网大会</td>
                            <td>IT/互联网</td>
                            <td>江苏省南京市</td>
                        </tr>
                        <tr>
                            <td>2011.1.3</td>
                            <td>第十届互联网大会</td>
                            <td>IT/互联网</td>
                            <td>江苏省南京市</td>
                        </tr>
                        <tr>
                            <td>2011.1.3</td>
                            <td>第十届互联网大会</td>
                            <td>IT/互联网</td>
                            <td>江苏省南京市</td>
                        </tr>
                        <tr>
                            <td>2011.1.3</td>
                            <td>第十届互联网大会</td>
                            <td>IT/互联网</td>
                            <td>江苏省南京市</td>
                        </tr>
                    </tbody>
                </table>
<div class="ui basic pagination menu">
  <a class="icon item">
    <i class="left arrow icon"></i>
  </a>
  <a class="active item">
    1
  </a>
  <div class="disabled item">
    ...
  </div>
  <a class="item">
    10
  </a>
  <a class="item">
    11
  </a>
  <a class="item">
    12
  </a>
  <a class="icon item">
    <i class="right arrow icon"></i>
  </a>
</div>
            </div>
            <div class="ui bottom attached tab segment p40" data-tab="second">
                第二
            </div>
            <div class="ui bottom attached tab segment p40" data-tab="third">
                第三
            </div>
            <div class="ui bottom attached tab segment p40" data-tab="fourth">
                第四
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../config'
export default {
    // name: '',
    data() {
            return {
                msg: 'Welcome to Event Dove'
            }
        },
        mounted: function() {
            $('#footer').show();
            $('.menu .item').tab()
        },
        components: {

        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ui.little.image {
    width: 50px;
    height: 50px;
}

.ui.container {
    max-width: 960px !important;
}

.u-card-wrap {
    padding: 20px 40px;
    position: relative;
}

.u-card-main {
    overflow: hidden;
}

.u-card-wrap .chevron.icon {
    font-size: 24px;
    font-weight: normal;
    cursor: pointer;
    top: 45px;
    color: #949699;
}

.u-card-wrap .chevron.icon:hover {
    color: #0099ff;
}

.u-card-wrap .chevron.left.icon {
    position: absolute;
    left: 5px;
}

.u-card-wrap .chevron.right.icon {
    position: absolute;
    right: 5px;
}

.ui.items.u-card-items>.item {
    border: 1px solid #e5e8ec;
    width: 280px;
    float: left;
    margin: 0 20px 0 0;
    padding: 10px;
}

.ui.items.u-card-items>.item:hover {
    border-color: #00cfb3;
}

.u-tab-tit {
    align-self: flex-start;
}

.p40 {
    padding: 40px !important;
}
</style>
