<template>
    <div class="content">
        <div class="ui form">
            <div class="ui grid">
                <div class="row" v-if="isAdd">
                    <div class="three wide middle aligned column">生成方式：</div>
                    <div class="thirteen wide column">
                        <div class="inline fields mb-n">
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input v-model="EmitData.generationMode" type="radio" name="fruit" value="random">
                                    <label>随机生成</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input v-model="EmitData.generationMode" type="radio" name="fruit" value="manualInput">
                                    <label>输入优惠码</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="three wide middle aligned column">{{EmitData.generationMode=='random'?'生成数量':'输入优惠码'}}：</div>
                    <div class="thirteen wide column">
                        <div class="fields inline mb-n">

                            <div class="field" v-show="EmitData.generationMode=='random'">
                                <div class="ui right labeled input" v-if="EmitData.generationMode=='random'">
                                    <input type="number" placeholder="请输入数量" v-model="EmitData.discountCodeCount" v-vali="JSON.stringify({required:true,minSize:1,maxSize:100})" filed="EmitData.discountCodeCount">
                                    <div class="ui basic label">
                                        张
                                    </div>
                                </div>
                                <div class="ui left pointing red basic label" v-show="$verify.$errors['EmitData.discountCodeCount']&&$verify.$errors['EmitData.discountCodeCount']!=''">{{$verify.$errors['EmitData.discountCodeCount']}}</div>
                            </div>

                            <div class="field" v-show="EmitData.generationMode=='manualInput'">
                                <input  v-if="EmitData.generationMode=='manualInput'" type="text" v-model="EmitData.discountCode" placeholder="请输入优惠码" v-vali="JSON.stringify({required:true,maxLength:20})" filed="EmitData.discountCode">
                                <div class="ui left pointing red basic label" v-show="$verify.$errors['EmitData.discountCode']&&$verify.$errors['EmitData.discountCode']!=''">{{$verify.$errors['EmitData.discountCode']}}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="three wide middle aligned column">优惠方式：</div>
                    <div class="thirteen wide column">
                        <div class="inline fields mb-n">
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input v-model="EmitData.discountType" type="radio" name="fruit2" value="fixed">
                                    <label>优惠金额</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input v-model="EmitData.discountType" type="radio" name="fruit2" value="rate">
                                    <label>优惠折扣</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="three wide middle aligned column">优惠力度：</div>
                    <div class="thirteen wide column">
                        <div class="inline fields mb-n">
                            <div class="field" v-show="EmitData.discountType=='fixed'">
                                <div class="ui right labeled input" v-if="EmitData.discountType=='fixed'">
                                    <input type="text" placeholder="请输入优惠金额" v-model="discountTypePrice" v-vali="JSON.stringify({required:true,minSize:0})" filed="discountTypePrice">
                                    <div class="ui basic label">
                                        &yen;
                                    </div>
                                </div>
                                <div class="ui left pointing red basic label" v-show="$verify.$errors['discountTypePrice']&&$verify.$errors['discountTypePrice']!=''">{{$verify.$errors['discountTypePrice']}}</div>
                            </div>
                            <div class="field" v-show="EmitData.discountType=='rate'">
                                <div class="ui right labeled input" v-if="EmitData.discountType=='rate'">
                                    <input type="text" placeholder="请输入优惠折扣" v-model="discountTypePercen" v-vali="JSON.stringify({required:true,maxSize:100,minSize:0})" filed="discountTypePercen">
                                    <div class="ui basic label">
                                        %
                                    </div>
                                </div>
                                <div class="ui left pointing red basic label" v-show="$verify.$errors['discountTypePercen']&&$verify.$errors['discountTypePercen']!=''">{{$verify.$errors['discountTypePercen']}}</div>
                            </div>
                            <!-- <div class="field">
                                        <label class="text-info fwn">优惠后门票价格：<span class="text-yellow">¥10</span></label>
                                    </div> -->
                            <div class="field" v-if="EmitData.discountType=='rate'">
                                <label class="text-muted fwn">提示：100%为免费门票</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="three wide middle aligned column">优惠范围：</div>
                    <div class="thirteen wide column" v-if="">
                        <drop-down :defaultValue="EmitData.applyToTickets" :arrdata="tickets?tickets:[]" ref="dropdown" addEvent="change##dropdown" v-on:change="settickets" v-vali="JSON.stringify({required:true})" filed="EmitData.applyToTickets" :dataName="{defaultName:'请选择门票',textName:'name',valueName:'ticketId'}"></drop-down>
                        <div class="ui top pointing red basic label" v-show="$verify.$errors['EmitData.applyToTickets']&&$verify.$errors['EmitData.applyToTickets']!=''">{{$verify.$errors['EmitData.applyToTickets']}}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="three wide column middle aligned">使用次数：</div>
                    <div class="thirteen wide column">
                        <div class="inline fields mb-n">
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="fruit0" v-model="EmitData.maxUseCount" value="-1">
                                    <label>无限制次数</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="fruit0" v-model="EmitData.maxUseCount" value="">
                                    <label>使用</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui right labeled input" v-if="EmitData.maxUseCount==''">
                                    <input type="number" placeholder="请输入次数" v-model="maxUseCount" v-vali="JSON.stringify({required:true,minSize:1})" filed="maxUseCount">
                                    <div class="ui basic label">次</div>
                                </div>
                                <div class="ui right labeled input" v-if="EmitData.maxUseCount=='-1'">
                                    <input type="number" placeholder="请输入次数" readonly="true" @click="EmitData.maxUseCount=''">
                                    <div class="ui basic label">次</div>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui left pointing red basic label" v-show="$verify.$errors['maxUseCount']&&$verify.$errors['maxUseCount']!=''">{{$verify.$errors['maxUseCount']}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="three wide column">优惠码有效期:</div>
                    <div class="thirteen wide column">
                        <div class="field mb-n">
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="yxq" v-model="EmitData.discountExpiryDate" value="any">
                                    <label>任意时间都可以使用</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="yxq" v-model="EmitData.discountExpiryDate" value="custom">
                                    <label>自定义有效期时间范围</label>
                                </div>
                            </div>
                            <div class="inline fields" v-if="EmitData.discountExpiryDate=='custom'">
                                <div class="field">
                                    <date-picker ref="datepicker" addEvent="input##datepicker" :date="EmitData.startTime" :option="option" v-on:input="datevali(arguments[0],true)" :limit="limit" v-vali="JSON.stringify({required:true})" :filed="'EmitData.startTime'"></date-picker>
                                </div>
                                <div class="field">
                                    <div class="ui left pointing red basic label " v-if="EmitData.discountExpiryDate=='custom'" v-show="$verify.$errors['EmitData.startTime']&&$verify.$errors['EmitData.startTime']!=''">{{$verify.$errors['EmitData.startTime']}} </div>
                                </div>
                                <div class="field">-</div>
                                <div class="field">
                                    <date-picker ref="datepicker" addEvent="input##datepicker" :date="EmitData.endTime" :option="option" v-on:input="datevali(arguments[0],false)" :limit="limit" v-vali="JSON.stringify({required:true})" :filed="'EmitData.endTime'"></date-picker>
                                </div>
                                <div class="field">
                                    <div class="ui left pointing red basic label " v-if="EmitData.discountExpiryDate=='custom'" v-show="$verify.$errors['EmitData.endTime']&&$verify.$errors['EmitData.endTime']!=''">{{$verify.$errors['EmitData.endTime']}} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
import myDatepicker from '../vue-datepicker'
import moment from 'moment'
import dropDown from '../dropdown'
import {
    dataFilter
} from '../../utils'
export default {
    name: 'countSetting',
    verify: true,
    data() {
        return {
            defaultData: {
                // eventId: this.$route.params.id,
                generationMode: 'random', // 折扣码生成方式 random manualInput
                discountCodeCount: '',
                discountCode: '', // 优惠码
                discountType: 'fixed', // 优惠方式 fixed(优惠金额),rate(优惠折扣率),free(免费)
                discountTypeValue: '', // 优惠方式的值
                applyToAllTickets: false, // 优惠范围,是否所有门票都能使用优惠码
                applyToTickets: '', // 优惠范围,即哪些票可以使用此优惠码
                maxUseCount: -1, // 最多使用次数,-1为无限制次数
                discountExpiryDate: 'any', // 优惠码有效期 any(任意时间都可以使用),custom(自定义有效期时间范围)
                startTime: null, // 优惠码有效期开始时间
                endTime: null, // 优惠码有效期结束时间
                // isDeleted: false, // 优惠码是否已删除
            },
            isAdd: true,
            discountTypePrice: '',
            discountTypePercen: '',
            maxUseCount: '',
            //日历控件
            option: {
                type: 'min',
                format: 'YYYY-MM-DD HH:mm:ss',
                language: 'zhCn',
                inputStyle: {},
                color: {
                    header: '#ccc',
                    headerText: '#f00'
                },
                overlayOpacity: 0.5, // 0.5 as default
                dismissible: true // as true as default
            },
            limit: [{
                type: 'fromto',
                from: new Date()
            }],
            EmitData: {}
        }
    },
    components: {
        'date-picker': myDatepicker,
        'drop-down': dropDown
    },
    props: ['countData', 'tickets'],
    created() {
        this.defaultData.eventId = this.countData.eventId;
        this.EmitData = $.extend(true, {}, this.defaultData, this.countData);
    },
    mounted() {
        $('.ui.radio.checkbox').checkbox()
    },
    methods: {
        setData(countData) {
            this.EmitData = $.extend(true, {}, this.defaultData, countData)
            if(!countData.id)return;
            this.EmitData.generationMode = 'manualInput';
            this.EmitData.applyToTickets = this.EmitData.applyToTickets.toString();
            this.EmitData.discountType == 'fixed' ? this.discountTypePrice = this.EmitData.discountTypeValue : this.discountTypePercen = this.EmitData.discountTypeValue;
            this.EmitData.discountTypeValue = '';
            if (this.EmitData.maxUseCount != '-1') {
                this.maxUseCount = this.EmitData.maxUseCount;
                this.EmitData.maxUseCount = '';
            }
            this.isAdd = false;
            this.$refs.dropdown.init(this.EmitData.applyToTickets);
        },
        submitBefore(data) {
            let newdata = dataFilter(data);
            newdata.discountTypeValue = newdata.discountType == 'fixed' ? this.discountTypePrice : this.discountTypePercen;
            newdata.maxUseCount == '' ? newdata.maxUseCount = this.maxUseCount : '';
            newdata.applyToTickets = newdata.applyToTickets.split(',');
            return newdata
        },
        submit() {
            return new Promise((resolve, reject) => {
                this.$verify.check().then(() => {
                    let data = this.submitBefore(this.EmitData)
                    let url = data.id&&data.id!=''?API_URL+'/discount/update':API_URL+'/discount/add'
                    $.ajax({
                        type: 'post',
                        url: url ,
                        data: JSON.stringify(data),
                        success: (data) => {
                            this.$message.success('保存成功')
                            resolve(true)

                        },
                        error: (err) => {
                            let error = JSON.parse(err.responseText);
                            this.$message.error(error.responseText);

                            reject(false)
                        }
                    })
                }, (e) => {
                    reject(false)
                })
            })
        },
        settickets(value) {
            this.EmitData.applyToTickets = value
        },
        datevali(val, isStart) {
            isStart ? this.EmitData.startTime = val : this.EmitData.endTime = val;
            if(this.EmitData.endTime!=null)
            (parseInt(new Date(this.EmitData.endTime).getTime()) - parseInt(new Date(this.EmitData.startTime).getTime()) <= 0) ?
            this.$message.error('开始时间不能大于结束时间'): '';
            (this.EmitData.endTime == '' || (parseInt(new Date(this.EmitData.endTime).getTime()) - parseInt(new Date(this.EmitData.startTime).getTime()) <= 0)) ?
            this.EmitData.endTime = moment(this.EmitData.startTime).add(7, 'day').format('YYYY-MM-DD HH:mm:ss'): ''
        }
    }
}
</script>
