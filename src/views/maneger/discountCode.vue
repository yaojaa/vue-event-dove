<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">市场推广</span>/优惠码</h2>
            </div>
            <div class="white-wrap p-xl">
                <div class="default-panel p-n mb-lg">
                    <div class="left"><img src="/images/yhm.png" alt=""></div>
                    <div class="content">
                        <p class="text-info">使用优惠码，可以针对特定的用户给予优惠，优惠码是一种有效的促销手段。</p><a href="#" class="ui button blue mini mr-md add-code" @click="edit()">添加优惠码</a><a href="###" data-variation="inverted" class="tip-code">如何使用？</a></div>
                </div>
                <div class="ui two column horizontally padded grid" v-show="countItems.length>0">
                    <div class="column">
                        <div class="ui checkbox mr-sm" v-ui>
                            <input type="checkbox" v-model="allcheckboxstatus" @change="arguments[0].target.checked? deleteIds=allCheckValue:deleteIds=[]">
                            <label>全选</label>
                        </div>
                        <a href="javascript:void(0)" @click="deleteIds.length>0?jQuery('.confirm-layer').modal('show'):$message.info('请选择要删除的优惠码')">批量删除</a>
                    </div>
                    <div class="column text-right">
                        <a href="#"><i class="upload icon"></i>导出</a>
                    </div>
                </div>
                <table class="ui padded default table" v-show="countItems.length>0">
                    <thead>
                        <tr>
                            <th>优惠码</th>
                            <th>可使用次数</th>
                            <th>已使用次数</th>
                            <th>适用门票</th>
                            <th>优惠力度</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in countItems">
                            <td>
                                <div class="ui checkbox" v-ui>
                                    <input type="checkbox" v-model="deleteIds" :value="item.id" name="countCheck">
                                    <label>{{item.discountCode}}</label>
                                </div>
                            </td>
                            <td>{{item.maxUseCount=='-1'?'无限':item.maxUseCount}}次</td>
                            <td>{{item.totalUsedCount}}次</td>
                            <td v-show="item.applyToTickets.length==tickets.length">所有门票</td>
                            <td v-show="item.applyToTickets.length!=tickets.length">
                                <span v-for="id in item.applyToTickets" v-html="ticketNameObj[id]+'</br>'"></span>
                            </td>
                            <td v-show="item.discountType=='fixed'">减{{item.discountTypeValue}}元</td>
                            <td v-show="item.discountType=='rate'">{{item.discountTypeValue==100?'免费':item.discountTypeValue+'%'}}</td>
                            <td>
                                <a href="javascript:void(0)" class="mr-md delete-a" @click="setDeleteIds(item.id)">删除</a>
                                <a href="javascript:void(0)" class="mr-md" @click="edit(item)">修改</a>
                                <!-- <a href="javascript:void(0)" class="mr-md">社交分享</a> -->
                                <router-link  :to="{name:'email',params:{id:$route.params.id,label:'label1!'+item.id,page:1}}">邮件分享</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <page ref="page" @gotoPage="setData"></page>
            </div>
        </div>
        <div class="ui small modal add-code-layer">
            <i class="close icon"></i>
            <div class="header">
                添加优惠码
            </div>
            <!-- 由于初始化的时候没有高度，添加的默认高度，让工具自动计算位置 -->
            <div class="content" v-if="!addLayer" style="min-height:480px"></div>
            <count-setting ref="countsetting" :tickets="tickets" :countData="defaultData" v-if="addLayer"></count-setting>
            <div class="actions text-center">
                <a class="ui blue button ml-n" @click="fnsave">保存</a>
                <a class="ui button cancel">取消</a>
            </div>
        </div>
        <div class="ui tip-code-info popup right transition hidden">
            <div class="ui list" style="width: 400px;">
                <div class="item header">如何使用优惠码？</div>
                <div class="item">1、提供优惠码以邮件的形式发送给特殊的用户或群体。</div>
                <div class="item">2、设置特定的票种可以使用优惠码。</div>
                <div class="item">3、设置特定的时间的报名可以打折。</div>
            </div>
        </div>
        <div class="ui small basic test modal confirm-layer" v-if="countItems.length>0" v-ui="'.delete-a'">
            <div class="ui icon header"><i class="idea icon"></i> 您确定要删除吗？ </div>
            <div class="actions">
                <div class="ui green inverted button" @click.once="remove"><i class="checkmark icon"></i> 确定 </div>
                <div class="ui red basic cancel inverted button"><i class="remove icon"></i> 取消 </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
import countSetting from '../../components/count_setting'
import page from '../../components/page'
export default {
    name: 'discountCode',
    data() {
        return {
            jQuery:$,
            defaultData: {
                eventId: this.$route.params.id,
                // generationMode: 'random', // 折扣码生成方式 random manualInput
                // discountCodeCount:'',
                // discountCode: '', // 优惠码
                // discountType: 'fixed', // 优惠方式 fixed(优惠金额),rate(优惠折扣率),free(免费)
                // discountTypeValue: '', // 优惠方式的值
                // applyToAllTickets: false, // 优惠范围,是否所有门票都能使用优惠码
                // applyToTickets: '', // 优惠范围,即哪些票可以使用此优惠码
                // maxUseCount: -1, // 最多使用次数,-1为无限制次数
                // discountExpiryDate: 'any', // 优惠码有效期 any(任意时间都可以使用),custom(自定义有效期时间范围)
                // startTime: '', // 优惠码有效期开始时间
                // endTime: '', // 优惠码有效期结束时间
                // isDeleted: false, // 优惠码是否已删除
            },
            countItems: [],
            ticketNameObj: {},
            tickets: [],
            addLayer: false,
            page: 1,
            deleteIds: [],
            allCheckValue:[],
            allcheckboxstatus:false
        }
    },
    created() {
        $.ajax({
            url: API_URL + '/event/tickets',
            data: {
                eventId: this.$route.params.id
            },
            success: (data) => {
                this.tickets = data
                $.each(data, (i, o) => {
                    this.ticketNameObj[o.ticketId] = o.name
                })
            }
        })
    },
    mounted: function() {
        $('.add-code-layer.modal').modal({
            'onShow': () => {
                this.addLayer = true;
            },
            'onHide': () => {
                this.addLayer = false;
            }
        })
        this.setData()

        $('.tip-code')
            .popup({
                popup: $('.tip-code-info')
            })
    },
    methods: {
        async fnsave() {
            let res = true
            try {
                res = await this.$refs.countsetting.submit().then()
            } catch (e) {
                res = false
            }
            if (res) {
                $('.add-code-layer.modal').modal('hide')
                    // 保存成功,重现请求列表
                this.setData()
            }
        },
        setData(page) {
            this.page = page || this.page
            $.ajax({
                url: API_URL + '/event/discounts',
                async: false,
                data: {
                    "eventId": this.$route.params.id,
                    "page": this.page,
                    "limit": "10"//一页的条数
                },
                success: (data) => {
                    this.countItems = data.items
                    if(data.items.length==0)return ;
                    this.$refs.page.setpageData({
                        currentPage: data.page,
                        allPage: data.totalPage
                    })
                    this.allCheckValue = [];
                    $.each(this.countItems,(i,o)=>{
                        this.allCheckValue.push(o.id)
                    })
                },
                error: (err) => {
                    let error = JSON.parse(err.responseText);
                    this.$message.error(error.responseText);

                }
            })
        },
        edit(count) {
            count = count || {}
            this.defaultData = $.extend(true, {
                eventId: this.$route.params.id
            }, count)
            $('.add-code-layer.modal').modal('show');
            this.$nextTick(()=>{
                this.$refs.countsetting.setData(this.defaultData)
            })
        },
        setDeleteIds(id) {
            if (typeof id=='string'&&id!='') {
                this.deleteIds = [id]
            }
        },
        remove() {
            if (this.deleteIds && this.deleteIds.length == 0) {
                this.$message.error('没有要删除的优惠码');
                return false
            }
            $.ajax({
                url: API_URL + '/discount/delete',
                data: JSON.stringify({
                    discountIds: this.deleteIds
                }),
                type: 'post',
                success: (data) => {
                    this.$message.success('删除成功');
                    $('.confirm-layer').modal('hide');
                    //如果当前页数据全部删除则页数减一
                    if ((this.countItems.length == this.deleteIds.length)&&this.page>1 ){
                        this.page--
                    }
                    this.deleteIds = [];
                    this.setData();
                    this.allcheckboxstatus = false;
                },
                error: (err) => {
                    let error = JSON.parse(err.responseText);
                    this.$message.error(error.responseText);
                }
            })
        }
    },
    components: {
        'count-setting': countSetting,
        page
    }
}
</script>
<style scoped>
</style>
