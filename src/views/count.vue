<template>
<div class="event-view">
    <headers></headers>
    <div class="event-main">
        <div class="ui container">
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
            <div class="ui bottom attached active tab segment p-lg" data-tab="first">
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
                <div class="ui borderless primary  menu space-md">
                    <a class="icon item">
                        <i class="angle left icon"></i>
                    </a>
                    <a class="active item">1</a>
                    <div class="disabled item">
                        ...
                    </div>
                    <a class="item">10</a>
                    <a class="item">11</a>
                    <a class="item">12</a>
                    <a class="icon item">
                        <i class="angle right icon"></i>
                    </a>
                </div>
            </div>
            <div class="ui bottom attached tab segment p-lg" data-tab="second">
                第二
            </div>
            <div class="ui bottom attached tab segment p-lg" data-tab="third">
                第三
            </div>
            <div class="ui bottom attached tab segment p-lg" data-tab="fourth">
                第四
            </div>
        </div>
    </div>
    <footers></footers>
</div>

</template>
<script>
import {
    API_URL
} from '../../config'
import header from '../components/header'
import footer from '../components/footer'
export default {
    data() {
            return {

            }
        },
        mounted() {

        },
        methods: {
            //续费
            renew: function() {

            }
        },
        components: {
            headers: header,
            footers: footer,
        }
}
</script>
<style scoped>

</style>
