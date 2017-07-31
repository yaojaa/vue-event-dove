<template>
    <div>
        <ui class="ui three column padded grid bg-gray" v-if="sendDetails.category=='email'">
            <div class="column"><span class="text-muted">发件人：</span>{{sendDetails.fromName}}</div>
            <div class="column"><span class="text-muted">发件人邮箱：</span>{{sendDetails.from}}</div>
            <div class="column"><a href="javascript:void(0)" class="edit-sender" @click="">编辑发件人</a></div>
        </ui>
        <div class="ui divider hidden" v-if="sendDetails.category=='email'"></div>
        <div class="ui form">
            <div class="required field" v-if="!sendDetails.isFromOrder">
                <label for="">发送形式</label>
                <div class="fields inline">
                    <div class="field">
                        <div class="ui radio checkbox" v-ui>
                            <input @change="contentCannotHaveLabel = sendDetails.dynamicdata.noticement" type="radio" name="item1" value="promotion" v-model="sendDetails.type">
                            <label>活动推广</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui radio checkbox" v-ui>
                            <input @change="contentCannotHaveLabel = sendDetails.dynamicdata.promotion" type="radio" name="item1" value="noticement" v-model="sendDetails.type">
                            <label>活动通知</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="required field">
                <label for="">{{sendDetails.category=='email'?'邮件标题':'短信标题'}}</label>
                <input type="text" v-vali="JSON.stringify({required:true})" :filed="'sendDetails.title'" v-model="sendDetails.title" placeholder="例：会唐商旅供应商大会">
                <div class="ui pointing red basic label" v-show="$verify.$errors['sendDetails.title']!=''">{{$verify.$errors['sendDetails.title']}} </div>
            </div>
            <div class="required field">
                <label for="">收件人</label>
                <div v-if="sendDetails.type=='noticement'">
                    <select class="ui dropdown fluid" v-model="findTypeValue" @change="selectchange" v-vali="JSON.stringify({required:true})" filed="findTypeValue">
                        <option value="">请选择</option>
                        <option :value="index" v-for="(type,index) in sendDetails.findType">{{type}}</option>
                    </select>
                    <div class="ui pointing red basic label" v-show="$verify.$errors['findTypeValue']&&$verify.$errors['findTypeValue']!=''">{{$verify.$errors['findTypeValue']}} </div>
                </div>
                <div v-if="sendDetails.type=='promotion'">
                    <div class="mb-sm">
                        <div class="ui label basic blue mini horizontal" @click="removeAddressee(i)" v-for="(addresseeone,i) in arrReceiver">{{addresseeone}} <i class="delete icon"></i></div>
                    </div>
                    <div class="ui input">
                        <input type="text" @keyup.enter="addAddressee" :placeholder="'输入'+(sendDetails.category=='sms'?'手机':'邮箱')+'号，并以“Enter“结束'" v-vali="JSON.stringify({required:true})" :filed="'sendDetails.receivers'">
                    </div>
                    <div class="ui pointing red basic label" v-show="$verify.$errors['sendDetails.receivers']&&$verify.$errors['sendDetails.receivers']!=''">{{$verify.$errors['sendDetails.receivers']}} </div>
                </div>
            </div>
            <div class="required field">
                <label for="" class="mt-n">{{sendDetails.category=='email'?'邮件':'短信'}}内容</label>
                <div class="mb-xs" v-if="sendDetails.dynamicdata[sendDetails.type].length">
                    <a class="ui tag label teal mr-sm" v-for="dynamic in sendDetails.dynamicdata[sendDetails.type]" @click="appendIn" v-if="nohaveLabel.indexOf(dynamic)==-1">{{dynamic}}</a>
                </div>
                <html-editor v-if="randered" ref="htmleditor" :isNoMenu="sendDetails.category=='sms'" :editorOption="sendDetails.category=='sms'?undefined:htmleditorOption" :index="0" v-vali="JSON.stringify({required:true})" :filed="'sendDetails.content'" :value="sendDetails.content" @on-result-change="onResultChange" addEvent="on-result-change##htmleditor"></html-editor>
                <div class="ui pointing red basic label" v-show="$verify.$errors['sendDetails.content']&&$verify.$errors['sendDetails.content']!=''">{{$verify.$errors['sendDetails.content']}} </div>
                <p v-if="wordReminder" style="color:orange;border:1px solid #efefef;padding:5px;margin-top:5px;border-radius:5px">{{wordReminder}}</p>
            </div>
            <div class="field">
                <label for="" class="mt-n">发送时间</label>
                <div class="fields inline" style="height:40px">
                    <div class="field">
                        <div class="ui radio checkbox" v-ui>
                            <input type="radio" name="tiem0" value="imediately" v-model="sendDetails.sendType">
                            <label>立即发送</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui radio checkbox" v-ui>
                            <input type="radio" name="tiem0" value="timed" v-model="sendDetails.sendType">
                            <label>定时发送</label>
                        </div>
                    </div>
                    <div class="field" v-if="sendDetails.sendType=='timed'">
                        <date-picker ref="datepicker" addEvent="input##datepicker" :date="sendDetails.sendTime" :option="option" v-on:input="datevali(arguments[0])" :limit="limit" v-vali="JSON.stringify({required:true})" :filed="'sendDetails.sendTime'"></date-picker>
                        <div class="ui left pointing red basic label " v-if="sendDetails.sendType=='timed'" v-show="$verify.$errors['sendDetails.sendTime']&&$verify.$errors['sendDetails.sendTime']!=''">{{$verify.$errors['sendDetails.sendTime']}} </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-lg">
                <input class="ui button yellow" type="button" @click="save(true)" :disabled="loading" value="存为草稿">
                <input class="ui button blue" type="button" @click="save" :disabled="loading" value="发送">
                <!-- <button class="ui button blank" @click="clean">清空</button> -->
            </div>
        </div>
        <div class="ui small modal edit-sender-layer">
            <i class="close icon"></i>
            <div class="header">
                编辑发件人
            </div>
            <div class="content">
                <div class="ui form">
                    <div class="required field">
                        <label for="">发件人：</label>
                        <input type="text" name="fromName" v-model="senderfields.fromName.value" v-vali="senderfields.fromName.rules" filed="senderfields.fromName.value" placeholder="会鸽">
                        <div v-if="$verify.$errors['senderfields.fromName.value']" class="ui pointing red basic label">
                            <div> {{$verify.$errors['senderfields.fromName.value']}} </div>
                        </div>
                    </div>
                    <div class="required field">
                        <label for="">发件人邮箱：</label>
                        <input type="email" name="from" addEvent="input" v-model="senderfields.from.value" v-vali="senderfields.from.rules" filed="senderfields.from.value" placeholder="support@eventdove.com">
                        <div v-if="$verify.$errors['senderfields.from.value']" class="ui pointing red basic label">
                            <div> {{$verify.$errors['senderfields.from.value']}} </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="actions text-center">
                <button class="ui blue button ml-n ok" @click="senderSave">确定</button>
                <a class="ui button cancel">取消</a>
            </div>
            <!-- :disabled="senderfields.fromName.value==''||senderfields.from.value==''||$verify.$errors['senderfields.fromName.value']!=''||$verify.$errors['senderfields.from.value']!=''" -->
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
import htmlEditor from '../html-editor'
import myDatepicker from '../vue-datepicker'
import {
    dataFilter
} from '../../utils/index'
export default {
    name: 'sendDetail',
    verify: true,
    data() {
        return {
            nohaveLabel: [],
            contentCannotHaveLabel: [],
            loading: false,
            randered: false,
            htmleditorOption: {
                fnReturnVal: 'html',
                height: '500px',
                showWechat: false,
                menus: null
            },
            sendVali: true,
            copyDefault: {},
            sendersave: true,
            arrReceiver: [],
            findTypeNames: {
                'attendee': '所有参会人',
                'paid': '所有购票者',
                'timeOut': '超时未支付者',
                'onsite': '线下未支付人员',
                'pending': '未审核人员',
                'reject': '审核拒绝人员'
            },
            findTypeValue: '',
            senderfields: {
                fromName: {
                    rules: {
                        required: true,
                        minLength: 2,
                        maxLength: 20
                    },
                    value: ''
                },
                from: {
                    rules: {
                        required: true,
                        isEmail: true
                    },
                    value: '',
                    nameInMessage: '发件人邮箱'
                }
            },
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
                from: new Date().getTime() - 24 * 60 * 60 * 1000
            }]
        }
    },
    props: ['sendDetails'],
    computed: {},
    created() {
        this.setData()
        $('.edit-sender-layer.modal').remove()
    },
    mounted() {
        this.sendDetails.category == 'email' ?
            $('.edit-sender-layer.modal').modal('attach events', '.edit-sender').modal({
                onApprove: (el) => {
                    return this.sendersave
                }
            }) : ''
        setTimeout(() => {
            this.randered = true;

            this.$nextTick(() => {
                this.$refs.htmleditor.setContent(this.sendDetails.content)
            })
        }, 0)
    },
    components: {
        'html-editor': htmlEditor,
        'date-picker': myDatepicker
    },
    computed: {
        wordReminder(){
            if(!this.sendDetails.wordLength)return '';
            let labelLength = {
                '#活动链接#':21,
                '#姓名#':3,
                '#邮箱#':20,
                '#签到码#':6,
                '#电子票#':21,
            };
            let string = this.sendDetails.content;
            $.each(labelLength,(i,o)=>{
                let reg = new RegExp(i,'g');
                let space = new Array(o+1).toString();
                string = string.replace(reg,space)
            });
            if(this.sendDetails.wordLength&&string.length>this.sendDetails.wordLength)
            return '超过'+this.sendDetails.wordLength+'字，将按两条发送';
        }
    },
    watch:{
        contentCannotHaveLabel(value){
            $.each(value,(i,o)=>{
                console.log()
                let regexp = '\#'+o+'\#';
                this.sendDetails.content = this.sendDetails.content.replace(new RegExp(regexp,'g'),'');
            })
            this.$refs.htmleditor.setContent(this.sendDetails.content);
        }
    },
    methods: {
        setData(data) {
            if (data) {
                this.sendDetails = data
            }
            let receivers = ''
            if (this.sendDetails.receivers != '') {
                if (this.sendDetails.type == 'noticement') {
                    this.findTypeValue = this.sendDetails.receivers
                    if (this.findTypeValue != 'attendee') {
                        this.nohaveLabel = ['签到码', '电子票'];
                    }
                } else {
                    this.arrReceiver = this.sendDetails.receivers.split(',')
                    if (this.sendDetails.receivers.indexOf('|')) {
                        this.arrReceiver = this.sendDetails.receivers.split('|');
                        this.arrReceiver.forEach((o, i) => {
                            o = o.replace(/\*/, '.');
                            this.arrReceiver.splice(i, 1, o);
                        })
                    }
                }
            }
            receivers = this.arrReceiver.toString()
            this.sendDetails.receivers = receivers
            if (Object.prototype.toString.call(this.sendDetails.findType).indexOf('Array') > -1) {
                let findType = {};
                $.each(this.sendDetails.findType, (i, o) => {
                    $.each(o, (ii, oo) => {
                        findType[ii] = this.findTypeNames[ii] + '　　' + oo
                    })
                });
                this.sendDetails.findType = findType;
            }
        },
        onResultChange(index, val) {
            this.sendDetails.content = val;
        },
        datevali(val) {
            this.sendDetails.sendTime = val;
        },
        selectchange(event) {
            let text = $(event.target).find('[value="' + this.findTypeValue + '"]').text();
            let val = parseInt(text.split('　　')[1]);
            let type = text.split('　　')[0];
            setTimeout(() => {
                    this.sendVali = this.$verify.vali(event.target.getAttribute('filed'), val, {
                        minSize: 1
                    });
                    if (this.sendVali && type != '所有参会人') {
                        this.nohaveLabel = ['签到码', '电子票'];
                    } else {
                        this.nohaveLabel = [];
                    }
                    this.contentCannotHaveLabel = this.nohaveLabel.concat(this.sendDetails.dynamicdata.promotion)
                }, 0)
                // this.findTypeValue
        },
        senderSave() {
            let sender = this.$verify.filter('senderfields');
            sender.check().then((value) => {
                this.sendDetails = $.extend(true, {}, this.sendDetails, value);
                sender.setValue().clear();
                this.sendersave = true
            }, () => {
                this.sendersave = false
            }).catch(e => {
                console.log(e)
            })
        },
        addAddressee(event) {
            let el = event.target
            let value = el.value
            let rules = this.sendDetails.category == 'sms' ? {
                isMobile: true
            } : {
                isEmail: true
            }
            let result = this.$verify.vali(el.getAttribute('filed'), value, $.extend({
                isRepeat: this.arrReceiver
            }, rules))
            if (result) {
                if (this.sendDetails.receivers !== '' && this.sendDetails.receivers.indexOf(',') == -1) {
                    let isRight = this.$verify.vali(null, this.sendDetails.receivers, rules);
                    !isRight ? this.sendDetails.receivers = '' : '';
                }
                this.sendDetails.receivers += this.sendDetails.receivers.length > 0 ? ',' + value : value
                this.arrReceiver = this.sendDetails.receivers.split(',');
                el.value = '';
            }
        },
        removeAddressee(index) {
            this.arrReceiver.splice(index, 1);
            this.sendDetails.receivers = this.arrReceiver.toString()
        },
        appendIn(event) {
            this.$refs.htmleditor.append(event, '#' + $(event.target).text() + '#');
        },
        saveBefore(isNosend) {
            if (this.sendDetails.type == 'noticement') {
                this.sendDetails.receivers = this.findTypeValue
            }
            this.sendDetails.isDraft = isNosend == true ? true : false
            if (this.sendDetails.sendType == 'imediately') {
                this.sendDetails.sendTime = null;
            }
            let newdata = dataFilter(this.sendDetails)
            newdata.content = $.trim(newdata.content).replace(/\s+#活动链接#/g, '#活动链接#')
            return newdata
        },
        clean() {
            this.sendDetails.receivers = ''
            this.sendDetails.title = ''
            this.sendDetails.content = ''
            this.sendDetails.sendTime = null
            this.sendDetails.id ? delete this.sendDetails.id : '';
            this.sendDetails.isFromOrder ? delete this.sendDetails.isFromOrder : '';
            this.arrReceiver = []
            this.$refs.htmleditor ? this.$refs.htmleditor.clear() : ''
        },
        save(isNosend) {
            this.loading = true;
            if (!this.sendVali) {
                setTimeout(() => {
                    this.$verify.$errors.findTypeValue = '收件人个数不小于1'
                }, 0)
                return false
            };
            this.$verify.filter('sendDetails').check().then(() => {
                let newdata = this.saveBefore(isNosend)
                let url = API_URL + '/notice/saveRecord'
                if (typeof this.sendDetails.id == 'string' && this.sendDetails.id != '') {
                    newdata.recordId = this.sendDetails.id;
                    url = API_URL + '/notice/updateRecord'
                }
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(newdata),
                    dataType: "json",
                    contentType: "application/json", //发送信息至服务器时内容编码类型。             
                    success: (data) => {
                        if (!this.sendDetails.isDraft) {
                            this.$message.success('发送成功');
                            this.clean();
                            this.$emit('success');
                        } else {
                            this.$message.success('保存成功')
                        }
                        this.$nextTick(() => {
                            this.loading = false;
                        })
                    },
                    error: (err) => {
                        this.loading = false;
                        let error = JSON.parse(err.responseText)
                        this.$message.error(error.responseText)
                    }
                })

            }, (e) => {
                this.loading = false;
                // console.log(e, '验证失败');
            }).catch((e) => {
                this.loading = false;
                console.log(e)
            })
        }
    }
}
</script>
<style scoped>
</style>
