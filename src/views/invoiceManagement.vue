<template>
    <div class="pusher">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">发票管理</h2>
                <a href="#" class="ui basic button blue mini">导出Excel</a>
            </div>
            <div class="white-wrap p-xl">
                <div class="ui form">
                    <div class="ui fluid left icon input">
                        <input type="text" placeholder="可按订单号、发票号、参会人、邮箱搜索">
                        <i class="search icon"></i>
                    </div>
                    <div class="ui divider hidden"></div>
                    <div class="inline fields">
                        <div class="field">
                            <label class="fwn text-muted">开票状态：</label>
                            <select class="ui  dropdown">
                                <option value="全部">全部</option>
                                <option value="待审核">已开发票</option>
                                <option value="已审核">未开发票</option>
                            </select>
                        </div>
                        <button class="ui blue button">搜索</button>
                    </div>
                </div>
            </div>
            <div class="ui divider hidden"></div>
            <div class="white-wrap p-xl">
                <h4 class="ui header"><span class="text-blue">230</span> 条订单</h4>
                <table class="ui padded default table">
                    <thead>
                        <tr>
                            <th>订单号</th>
                            <th>购票人</th>
                            <th>邮箱</th>
                            <th>领取方式</th>
                            <th>开票状态</th>
                            <th>开票总额</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="#">201606010001470737</a></td>
                            <td>张三</td>
                            <td>89435413@qq.com</td>
                            <td>2</td>
                            <td>已开发票</td>
                            <td>￥200.00</td>
                            <td><a href="#" class="mr-md">开票</a><a href="#" class="mr-md">详情</a></td>
                        </tr>
                       <tr>
                            <td><a href="#">201606010001470737</a></td>
                            <td>张三</td>
                            <td>89435413@qq.com</td>
                            <td>2</td>
                            <td>已开发票</td>
                            <td>￥200.00</td>
                            <td><a href="#" class="mr-md">开票</a><a href="#" class="mr-md">详情</a></td>
                        </tr>
                        <tr>
                            <td><a href="#">201606010001470737</a></td>
                            <td>张三</td>
                            <td>89435413@qq.com</td>
                            <td>2</td>
                            <td>已开发票</td>
                            <td>￥200.00</td>
                            <td><a href="#" class="mr-md">开票</a><a href="#" class="mr-md">详情</a></td>
                        </tr>
                        <tr>
                            <td><a href="#">201606010001470737</a></td>
                            <td>张三</td>
                            <td>89435413@qq.com</td>
                            <td>2</td>
                            <td>已开发票</td>
                            <td>￥200.00</td>
                            <td><a href="#" class="mr-md">开票</a><a href="#" class="mr-md">详情</a></td>
                        </tr>
                        <tr>
                            <td><a href="#">201606010001470737</a></td>
                            <td>张三</td>
                            <td>89435413@qq.com</td>
                            <td>2</td>
                            <td>已开发票</td>
                            <td>￥200.00</td>
                            <td><a href="#" class="mr-md">开票</a><a href="#" class="mr-md">详情</a></td>
                        </tr>
                        <tr>
                            <td><a href="#">201606010001470737</a></td>
                            <td>张三</td>
                            <td>89435413@qq.com</td>
                            <td>2</td>
                            <td>已开发票</td>
                            <td>￥200.00</td>
                            <td><a href="#" class="mr-md">开票</a><a href="#" class="mr-md">详情</a></td>
                        </tr>
                        <tr>
                            <td><a href="#">201606010001470737</a></td>
                            <td>张三</td>
                            <td>89435413@qq.com</td>
                            <td>2</td>
                            <td>已开发票</td>
                            <td>￥200.00</td>
                            <td><a href="#" class="mr-md">开票</a><a href="#" class="mr-md">详情</a></td>
                        </tr>
                        <tr>
                            <td><a href="#">201606010001470737</a></td>
                            <td>张三</td>
                            <td>89435413@qq.com</td>
                            <td>2</td>
                            <td>已开发票</td>
                            <td>￥200.00</td>
                            <td><a href="#" class="mr-md">开票</a><a href="#" class="mr-md">详情</a></td>
                        </tr>
                        <tr>
                            <td><a href="#">201606010001470737</a></td>
                            <td>张三</td>
                            <td>89435413@qq.com</td>
                            <td>2</td>
                            <td>已开发票</td>
                            <td>￥200.00</td>
                            <td><a href="#" class="mr-md">开票</a><a href="#" class="mr-md">详情</a></td>
                        </tr>
                    </tbody>
                </table>
                <div class="ui borderless primary  menu ">
                    <a class="icon item">
                        <i class="angle left icon"></i>
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
                        <i class="angle right icon"></i>
                    </a>
                </div>
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
                list:null,
                msg: 'Welcome to Event Dove'
            }
        },
        mounted: function() {
            $.get('/order/getOrderByEventIdAndPageIndex',{eventId:'6242243374942916608',limit:'15',page:'1',orderBy:'',total:'-1'},(data)=>{
                 this.list=data;
            });

            $('#footer').show()
            $('.menu .item').tab()
            $('.admin-avatar').popup({
                position   : 'bottom center'
            })
        },
        components: {

        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
