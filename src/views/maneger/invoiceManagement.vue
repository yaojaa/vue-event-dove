<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16" @click="createExcel">人员与订单</span>/发票管理</h2>
                <div class="button-group">
                    <a href="#" class="ui basic button blue mini" @click="createExcel">导出Excel</a>
                </div>
            </div>
            <div class="white-wrap p-xl">
                <div class="ui form">
                    <div class="fields inline mb-n">
                        <div class="ten wide field">
                            <div class="ui left icon input">
                                <input type="text" v-model="searchText" placeholder="可按订单号、发票号、参会人、邮箱搜索">
                                <i class="search icon"></i>
                            </div>
                        </div>
                        <div class="field">
                            <label>开票状态：</label>
                            <select class="ui search dropdown signSelected">
                                <option value="">请选择</option>
                                <option :value="status.name" v-for="status in info.invoiceStatusList">{{status.str}}</option>
                            </select>
                        </div>
                        <button class="ui full blue button" @click="getStatus('','')">搜索</button>
                    </div>
                </div>
            </div>
            <div class="ui divider hidden"></div>
            <div class="white-wrap p-xl por">
                <h4 class="ui header"><span class="text-blue">{{info.total}}</span> 条发票</h4>
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
                        <tr v-for="item in info.items" v-show="info.items.length!=0">
                            <td>{{item.orderNumber}}</td>
                            <td>{{item.buyer.name}}</td>
                            <td>{{item.buyer.email}}</td>
                            <td>开票状态没有</td>
                            <td>{{item.invoiceStatusStr}}</td>
                            <td>暂无发票金额，发票符号</td>
                            <td><a href="javascript:;" @click="details(item.orderNumber)">开票</a></td>
                            <!--<td><router-link class="mr-md" to="./invoiceDetails">开票</router-link></td>-->
                        </tr>
                        <!-- <tr>
                         <td colspan="8" rowspan="8" headers="" style="text-align:center; font-size:18px;">
                            <p style="height:50px;"></p>
                            <img src="../../assets/images/freeData.png" width='150' alt="">
                            <p></p>
                        </td>
                    </tr> -->
                    </tbody>
                </table>
                <div class="ui active inverted dimmer" v-show="loadingValue">
                    <div class="ui large text loader">Loading</div>
                </div>
                <img src="/images/no_centent.png" alt="暂无数据...." class="ui image medium centered"  v-if="info.items.length==0">
                <!-- 翻页区 -->
                <page ref="page" @gotoPage="getData"></page>
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
import page from '../../components/page'
export default {
    // name: '',
    data() {
            return {
                list: null,
                msg: 'Welcome to Event Dove',
                info: {
                    items: []
                },
                loadingValue: false,
                searchText: '',
                argu: {
                    eventId: "",
                    page: "1",
                    limit: "20",
                    // "orderBy": "orderNumber",
                    total: "-1",
                    search: "",
                    invoiceStatus: "",
                },
            }
        },
        watch: {
            searchText: function(value) {
                this.argu.search = value.trim();
            }
        },
        mounted: function() {
            var _this = this;
            this.idToken = JSON.parse(localStorage.getItem('user'));
            this.argu.eventId = this.$route.params.id;
            this.getData();
            $('select.dropdown').dropdown();
            $('#footer').show()
            $('.menu .item').tab()
            $('.admin-avatar').popup({
                position: 'bottom center'
            })
            $('.ui.search.dropdown.signSelected').dropdown({
                onChange: function(value, text, $item) {
                    _this.getStatus('invoiceStatus', value)
                }
            })
        },
        components: {
            page
        },
        methods: {
            createExcel() { //请求生成excel
                var _this = this;
                if (this.info.items.length == 0) {
                    this.$message.warning('暂无数据，不可导出');
                    return false;
                }
                jQuery.ajax({
                    url: API_URL + "/export/invoices",
                    type: "GET",
                    data: {
                        "eventId": _this.$route.params.id,
                    },
                    success: function(data) {
                        if (xhr.status == 200) {
                            if (data.filePath != '') {
                                _this.exTimer = setInterval(function() {
                                    _this.createExcelTow(data.filePath);
                                }, 500)
                            }
                        }
                    }
                })
            },
            createExcelTow(value) {
                jQuery.ajax({
                    url: API_URL + "/file/itexist",
                    type: "GET",
                    data: {
                        "filePath": value,
                    },
                    success: function(data, txt, xhr) {
                        if (xhr.status == 200) {
                            if (data.isWriteComplete) {
                                clearInterval(_this.exTimer)
                                _this.createExcelDown(value);
                            }
                        }
                    },
                    error: function() {}
                })
            },
            createExcelDown(path) {
                window.open(API_URL + "/attendee/downloadFile?filePath=" + path)
            },
            getStatus(key, value) {
                if (key != '') {
                    this.argu[key] = value;
                }
                this.getData();
            },
            getData(index) {
                this.loadingValue = true;
                this.argu.page = index || this.argu.page;
                this.argu.search = this.argu.search.trim();
                $.get(API_URL + "/invoice/getInvoiceList", this.argu, (data) => {
                    this.loadingValue = false;
                    this.info = data;
                    this.$refs.page.setpageData({
                        currentPage: this.argu.page,
                        allPage: data.totalPage
                    })
                })
            },
            details(orderNum) {
                this.$router.push({
                    path: 'invoiceDetails',
                    query: {
                        'orderNumber': orderNum
                    }
                })
            }
        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loadOffset {
    position: absolute;
    border: none;
    background: none;
    left: 50%;
    border-show: none;
    margin-left: -28px;
    top: 150px
}
</style>
