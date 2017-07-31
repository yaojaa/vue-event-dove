<template>
    <div class="event-center" style="background-color:#fff">
        <div class="ui vertically divided  doubling stackable vertically padded middle aligned grid event-ticket">
            <div class="equal row" v-for="(ticket, tIndex) in info.tickets">
                <div class="eight wide column information">
                    <h4 class="ui header">
                      {{ticket.name}}
                      <span class="icon-box">
                        <!-- <i class="icon iconfont icon-5 text-blue"></i> -->
                    </span>
                    <span class="icon-box" v-if="ticket.needAudit" data-inverted="" data-tooltip="此门票需要主办方审核通过后才能获取到电子票" data-position="right center">
                        <i class="icon iconfont icon-shen text-teal inline-block f16"></i>
                    </span>
                </h4>
                    <p class="text-info">
                        <span class="date">截止日期：{{ticket.endSalesTime | escapeTime}}</span>
                        <a class="more" href="javascript:;" v-if="ticket.describe" @click="noteFn(tIndex)">
                        查看说明
                    </a>
                    </p>
                    <p class="f12 text-muted" v-show="ticket.describe && ticket.isNote" style="display:block">
                        门票说明：{{ticket.describe}}</p>
                </div>
                <div class="five wide column isfree">
                    <span v-if="ticket.isOverdue">{{info.paymentPriceUnitSign}}{{ticket.copyPrice}}(早鸟票)</span>
                    <span v-else style="font-size:18px;">{{info.paymentPriceUnitSign}}{{ticket.copyPrice}}</span>
                    <br>
                    <div v-if="ticket.groupPurchaseTicketSetting">
                        <div v-if="ticket.groupPurchaseTicketSetting.preferentialType=='rate'">
                            <div class="price-info text-red f12">购买{{ticket.groupPurchaseTicketSetting.minGroupCount}}张及以上，每张折扣{{ticket.groupPurchaseTicketSetting.value}}%</div>
                        </div>
                        <div v-if="ticket.groupPurchaseTicketSetting.preferentialType=='fixed'">
                            <div class="price-info text-red f12">购买{{ticket.groupPurchaseTicketSetting.minGroupCount}}张及以上，每张可优惠{{ticket.groupPurchaseTicketSetting.value}}元</div>
                        </div>
                    </div>
                </div>
                <div class="three wide right aligned column count">
                    <div class="spinner" v-if="!ticket.statusText">
                        <button type="button" class="decrease remove" @click="ticketReduce(tIndex)">
                            <i class="minus square outline icon"></i>
                        </button>
                        <input type="text" class="spinner spinner-input value" maxlength="3" readonly v-model="ticket.votesNum" name="">
                        <button type="button" class="increase add" :disabled="ticket.ticketAdd" @click="ticketAdd(tIndex)">
                            <i class="plus square outline icon"></i>
                        </button>
                    </div>
                    <div class="text-right" v-else>
                        <label class="ui red basic label mini">{{ticket.statusText}}</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui two column vertically padded computer only tablet only grid">
            <div class="row">
                <div class="middle aligned column">
                    <span class="text-muted">累计：</span>
                    <span style="font-size:18px">{{info.paymentPriceUnitSign}}{{allMoney}}</span>
                </div>
                <div class="column right aligned">
                    <!-- <div class="ui button blue large"  >点击购票</div> -->
                    <!-- <router-link class="ui button blue large" :to="'/ticket/' + this.id" :class="[minTicketsNum>0?'':'disabled']"  target="__blank" :class="[minTicketsNum>0?'':'disabled']"  @click="formPage()">点击购票</router-link> -->
                    <a data-v-082e1ee9=""  :class="[minTicketsNum>0?'':'disabled']" class="ui button blue large" @click="formPage()" target="__blank">点击购票</a>
                </div>
            </div>
        </div>
        <div class="ui two column mobile only padded grid white-wrap event-footer">
            <div class="row">
                <div class="middle aligned column">
                    <span class="text-muted">累计：</span>
                    <span style="font-size:18px">{{info.paymentPriceUnitSign}}{{allMoney}}</span>
                </div>
                <div class="column right aligned">
                    <a data-v-082e1ee9="" :href="'/ticket/'+id" :class="[minTicketsNum>0?'':'disabled']" class="ui button blue large" @click="formPage()" target="__blank">点击购票</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
function getNowTime() {
    return new Date().getTime();
}
import moment from 'moment'
import {
    API_URL
} from '../config'
export default {
    name: 'ticket',
    props: ['eventId', 'overdue'],
    data() {
        return {
            isAuthor: false,
            info: {
                tickets: [],
            },
            DownTimeTimer: null,
            coutprice: 0,
            loading: false,
            error: null,
            id: '',
            minimum: 0,
            tickts: [],
            nowTime: true,
            anchor: 0,
            allprice: 0,
            priceChange: true,
            allMoney: 0,
            priceTimer: null,
            minTicketsNum: 0,
            sumAllPriceArgu: {
                "discount": {
                    "discountCode": ""
                },
                "order": [],
                "userId": '',
                "eventId": ''
            },
            location: {
                lat: '',
                lng: '',
                detailedAddress: '',
            }
        }
    },
    mounted: function() {
        // 获取当前页面需要的数据
        this.id = this.$route.params.id;

        // this.id = id;
        $.get(API_URL + '/event/get', {
            id: this.id
        }, (data) => {
            data.CountDown = '';
            this.info = data;
            for (var i = 0; i < data.tickets.length; i++) {
                this.sumAllPriceArgu.order.push({
                    "total": 0,
                    "ticketId": data.tickets[i].ticketId,
                    "ticketName": data.tickets[i].name
                })

                this.$set(this.info.tickets[i], 'statusText', '')
                this.$set(this.info.tickets[i], 'isNote', false)
                var time = new Date(data.endTime).getTime();
                if (getNowTime() > time) {
                    this.nowTime = false;
                }
                // 判断售票区间，余票
                this.ticketTimeStatus(data.tickets[i]);

                this.info.tickets[i].votesNum = 0;
                this.info.tickets[i].bigNum = false;

                // 判断是否有早鸟票
                if (!data.tickets[i].earlyBirdTicketSetting) {
                    this.info.tickets[i].isOverdue = false; //早鸟票是否过期
                } else {
                    if (!data.tickets[i].earlyBirdTicketSetting.endTime) {
                        this.info.tickets[i].isOverdue = false;
                    } else {
                        // console.log(data.tickets[i].earlyBirdTicketSetting.startTime,'====',data.tickets[i].earlyBirdTicketSetting.endTime)
                        if (data.tickets[i].earlyBirdTicketSetting.startTime) {
                            this.info.tickets[i].isOverdue = this.isOverdue(data.tickets[i].earlyBirdTicketSetting.startTime, data.tickets[i].earlyBirdTicketSetting.endTime);
                        } else {
                            this.info.tickets[i].isOverdue = this.isOverdue(data.tickets[i].startSalesTime, data.tickets[i].earlyBirdTicketSetting.endTime);
                        }
                    }
                }
                // 根据是否有早鸟票，来复制价格
                if (this.info.tickets[i].isOverdue) {
                    this.info.tickets[i].copyPrice = this.info.tickets[i].earlyBirdTicketSetting.price;
                } else {
                    this.info.tickets[i].copyPrice = this.info.tickets[i].defaultPrice;
                }
            }
            this.sumAllPriceArgu.eventId = data.id;
        })

    },

    filters: {
        // 格式化后台返回的时间
        escapeTime(value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
    },

    methods: {
        // 判断早鸟票是否过期
        isOverdue(startTime, endTime) {
            var nowDateNum = new Date().getTime();
            var s = new Date(moment(startTime).format('YYYY-MM-DD HH:mm:ss')).getTime();
            var e = new Date(moment(endTime).format('YYYY-MM-DD HH:mm:ss')).getTime();
            return nowDateNum > s && nowDateNum < e;
        },
        // 判断票的购买时段
        ticketTimeStatus(obj) {
            // data.tickets[i].statusText,
            // data.tickets[i].numberOfTicketsRemaining,
            // data.tickets[i].startSalesTime,
            // data.tickets[i].endSalesTime
            var now = new Date().getTime();

            var sT = new Date(obj.startSalesTime).getTime();
            var eT = new Date(obj.endSalesTime).getTime();

            if (obj.numberOfTicketsRemaining == 0) {
                obj.statusText = '票已售完';
                return false;
            }
            if (now < sT) {
                // 售票未开始
                obj.statusText = '未开始售票';
                return false;
            } else if (now > sT && now < eT) {
                obj.statusText = '';
                return false;
            } else if (now > eT) {
                // 售票结束
                obj.statusText = '售票已结束';
                return false;
            }
        },
        anchorFn(index) {
            this.anchor = index;
        },
        // 查看说明
        noteFn(index) {
            this.info.tickets[index].isNote = !this.info.tickets[index].isNote;
        },
        // 提示票的区间
        formPage() {
            console.log(222)
            console.log(this.info.collectItems,'==')
            if (this.info.collectItems.length == 0) {
                this.$message.warning('当前活动没有采集项，请编辑活动添加');
                return false;
            }
            var _this = this;
            console.log(this.info.tickets,'------')
            for (var i = 0, n = this.info.tickets.length; i < n; i++) {
                var v = this.info.tickets[i];
                if (v.votesNum > 0) {
                    if (v.votesNum > v.maxCount || v.votesNum < v.minCount) {
                        var str = v.name + '票，';
                        if (v.maxCount) {
                            str += '最多能买' + v.maxCount
                        }
                        if (v.minCount) {
                            str += '最少能买' + v.minCount
                        }
                        _this.$message({
                            message: str,
                            type: 'warning'
                        })
                        return false;
                    }
                }
            }
            // this.$store.commit('increment',this.info);
            localStorage.setItem('tickets', JSON.stringify(this.info.tickets));
            window.open('/ticket/'+this.id)
            // console.log(JSON.parse(JSON.stringify(this.info.tickets)))
            // this.$router.push({
            //     path: 
            // })
        },
        // 获取总价
        allPrice() {
            var _this = this;
            if (this.priceTimer) {
                clearInterval(this.priceTimer);
            }
            this.pariceTimer = setTimeout(function() {
                jQuery.ajax({
                    url: API_URL + "/order/prepareCreateOrder",
                    type: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    contentType: "application/json",
                    data: JSON.stringify(_this.sumAllPriceArgu),
                    success: function(data, res, xhr) {
                        if (xhr.status == 200) {
                            _this.allMoney = data.totalPrice;
                        }
                    }
                })
            }, 300)
        },
        sumAllPriceNum() {
            // 如果每种票都为0 则 点击购票按扭禁用
            var _this = this;
            this.minTicketsNum = 0;
            $.each(this.info.tickets, function(i, v) {
                _this.minTicketsNum += v.votesNum;
            })
        },
        // 加号事件
        ticketAdd(index) {
            if (!this.nowTime) {
                this.$message.error('活动已过期');
                return false;
            }
            if (this.info.tickets[index].bigNum) {
                return false;
            }
            this.info.tickets[index].isNote = true;
            this.info.tickets[index].votesNum = parseInt(this.info.tickets[index].votesNum)
            var numberOfTicketsRemaining = this.info.tickets[index].numberOfTicketsRemaining;
            if (this.info.tickets[index].votesNum >= numberOfTicketsRemaining) {
                this.info.tickets[index].votesNum = numberOfTicketsRemaining
            } else {
                if (this.info.tickets[index].votesNum >= this.info.tickets[index].maxCount) {
                    this.$message({
                        message: this.info.tickets[index].name + '票，最多能买' + this.info.tickets[index].maxCount + '张',
                        type: 'warning'
                    })
                    this.info.tickets[index].bigNum = true;
                }
                this.info.tickets[index].votesNum += 1;
                this.sumAllPriceArgu.order[index].total += 1;

                this.allPrice(index); //获取总价
            }

            this.implement(this.info.tickets[index]); //计算单价
            this.sumAllPriceNum() //点击购票按钮是否禁用
        },
        //减号事件
        ticketReduce(index) {
            if (!this.nowTime) {
                this.$message.error('活动已过期');
                return false;
            }
            this.info.tickets[index].bigNum = false;

            this.info.tickets[index].votesNum = parseInt(this.info.tickets[index].votesNum)
            if (this.info.tickets[index].votesNum <= 0) {
                this.info.tickets[index].votesNum = 0
            } else {
                this.info.tickets[index].votesNum -= 1;
                this.sumAllPriceArgu.order[index].total -= 1;
                if (this.info.tickets[index].votesNum < this.info.tickets[index].minCount) {
                    this.$message({
                        message: this.info.tickets[index].name + '票，最少能买' + this.info.tickets[index].minCount,
                        type: 'warning'
                    })

                }
                this.allPrice(index);
            }
            this.implement(this.info.tickets[index]);
            this.sumAllPriceNum();
        },

        // 不同情况执行不同的条件（团购，早鸟）
        implement(obj) {
            var earlyTicket = '';
            if (this.hasEarlyBirdTicket(obj)) {
                if (this.hasGroup(obj)) {
                    earlyTicket = obj.groupPurchaseTicketSetting;
                }
                obj.copyPrice = this.sumPrice(obj, earlyTicket, obj.votesNum, obj.earlyBirdTicketSetting.price);

            } else {
                if (this.hasGroup(obj)) {
                    earlyTicket = obj.groupPurchaseTicketSetting;
                }
                obj.copyPrice = this.sumPrice(obj, earlyTicket, obj.votesNum, obj.defaultPrice);
            }
        },
        hasEarlyBirdTicket(data) {
            // early  早鸟票对象
            // 判断是否有早鸟票
            // isOverDue 是否过期
            if (data.earlyBirdTicketSetting) {
                return typeof data.earlyBirdTicketSetting.endTime !== 'undefined' && data.isOverdue
            } else {
                return false;
            }
        },
        hasGroup(data) {
            // 判断是否有团购设置
            return data.groupPurchaseTicketSetting ? data.groupPurchaseTicketSetting : false;
        },

        // 优惠价格计算(单价)
        sumPrice(ticket, type, num, defaultPrice) {
            // ticket  票对象
            // type 优惠json对象
            // num 当前票数
            // defaultPrice默认价格
            if (type) {
                if (type.preferentialType == 'fixed') {
                    // 满减
                    if (num >= type.minGroupCount) {
                        if (defaultPrice - type.value < 0) {
                            return 0;
                        } else {
                            return defaultPrice -= type.value;
                        }
                    } else {
                        return defaultPrice;
                    }

                } else if (type.preferentialType == 'rate') {
                    // 按比例
                    if (num >= type.minGroupCount) {
                        return defaultPrice *= (100 - type.value / 100 * 100) / 100;
                    } else {
                        return defaultPrice;
                    }
                }
            } else {
                return defaultPrice;
            }
        }
    },

}
</script>
<style scoped>
.event-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    /*border-top: 1px solid #dce0ed;*/
    z-index: 999;
}

@media only screen and (max-width: 767px) {
    .ui.stackable.grid.event-ticket{
        margin-bottom: 5em !important;
    }
    .ui.stackable.grid>.row>.wide.column.isfree,
    .ui.stackable.grid>.row>.wide.column.count {
        width: 50% !important;
    }
}
</style>
