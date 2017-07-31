<template>
    <article class="form-view-wrap">
        <!-- <div class="app-formview__bg" style="background: url(https://drscdn.500px.org/photo/211024327/q%3D80_m%3D2000/137e250d5e410b49e57903207f444650) center top / cover no-repeat;"></div> -->
        <!-- <div class="form-banner" data-type="form-banner">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493811584118&di=7319f61caf9d54d0227dc6a58c16c6ec&imgtype=0&src=http%3A%2F%2Fimg.90sheji.com%2Fdianpu_cover%2F11%2F14%2F64%2F55%2F98Ebannerjdf_1200.jpg" alt="表单头图" width="100%">
        </div> -->
        <!-- <h2 algin="center">{{formData.title}}</h2> -->
        <div class="formElementsContainer">
            <form novalidate class="ui form">
                <div v-for="(el,index) in formData.elments" class="field" v-if="el.rules">
                    <label>{{el.displayName}} <span class="text-red" v-if="el.rules.required!=false">*</span><span class=" text-muted f12 fwn ml-sm">{{el | promptInfo }}</span></label>
                    <p v-if="el.description" class="text-muted f12">{{el.description}}</p>
                    <!-- input textarea -->
                    <template v-if="el.fieldType == 'text' ">
                        <template v-if="!el.attr.isMultiline">
                            <input type="text" v-model="el.value" :filed="'formData.elments.'+index+'.value'" :id="el._id" :index="index" v-vali="JSON.stringify(el.rules)" />
                        </template>
                        <template v-if="el.attr.isMultiline">
                            <textarea rows="2" v-model="el.value" :filed="'formData.elments.'+index+'.value'" :id="el._id" :index="index" v-vali="JSON.stringify(el.rules)"> </textarea>
                        </template>
                    </template>
                    <!-- 单选 -->
                    <template v-if="el.fieldType =='radio'">
                        <div class="field" v-for="(item,k) in el.itemValues">
                            <div class="ui radio checkbox">
                                <input type="radio" :filed="'formData.elments.'+index+'.value'" v-model="el.value" :value="item.option" :name="'radio'+[index]" v-vali="JSON.stringify(el.rules)" />
                                <label>{{item.option}}</label>
                            </div>
                        </div>
                    </template>
                    <!-- 多选 -->
                    <template v-if="el.fieldType =='checkbox'">
                        <div class="field" v-for="(item,k) in el.itemValues">
                            <div class="ui checkbox">
                                <input type="checkbox" v-model="el.value" :value="item.option" :name="'checkbox'+index+'_'+itemIndex" v-vali="JSON.stringify(el.rules)" :filed="'formData.elments.'+index+'.value'" />
                                <label>{{item.option}}</label>
                            </div>
                        </div>
                    </template>
                    <!-- 下拉 -->
                    <template v-if="el.fieldType =='select'">
                        <select class="ui dropdown select-div" :filed="'formData.elments.'+index+'.value'" v-if="el.fieldType =='select'" v-model="el.value" v-vali="JSON.stringify(el.rules)" name="请选择">
                            <option value="">请选择</option>
                            <option v-for="(item,k) in el.itemValues" :value="item.option">{{item.option}}</option>
                        </select>
                    </template>
                    <!-- 日期时间 -->
                    <template v-if="el.fieldType =='date_picker'">
                        <date-picker :date="el.value?el.value:(new Date().format(el.attr.haveTime?'yyyy-MM-dd hh:mm':'yyyy-MM-dd'))" v-on:input="datevali(arguments[0],el)" :option="el.attr.haveTime?timeoption:option" ref="datepicker"></date-picker>
                    </template>
                    <!-- 附件 -->
                    <div v-if="el.fieldType=='attachment'" class="fileuploaddiv">
                        <dropzone :id="'myVueDropzone_'+index+'_'+itemIndex" :url="fileUploadUrl" v-on:vdropzone-success="validatefile(arguments[0],el,index,0)" :maxFileSizeInMB="fileSize" :maxNumberOfFiles="el.attr.fileLength?el.attr.fileLength:10" :acceptedFileTypes="setfiletypes(el.attr.fileType,el.attr.custom)" v-on:vdropzone-sending="sending" :language="dropzoneoption" useFontAwesome="false" autoProcessQueue="true" v-on:vdropzone-removed-file="validatefile(arguments[0],el,index,1)" :filed="'formData.elments.'+index+'.value'" v-vali="JSON.stringify(el.rules)">
                        </dropzone>
                    </div>
                    <template v-if="el.fieldType=='city'">
                        <threelevellinkage v-if="changeReload" :defaultValue="[el.value[0],el.value[1]]" :filed="'formData.elments.'+index+'.value'" v-vali="JSON.stringify(el.rules)" v-on:linkagechange="linkagechange(arguments[0],el,index)">
                        </threelevellinkage>
                        <input type="text" v-model="citysCopy[index].address" placeholder="详细地址" style="margin-top:.5em" @input="addresschange(el,index)" />
                    </template>
                    <div class="ui pointing red basic label" v-if="$verify.$errors['formData.elments.'+index+'.value']">{{$verify.$errors['formData.elments.'+index+'.value']}} </div>
                </div>
            </form>
        </div>
    </article>
</template>
<script>
import formElments from './form_elments'
import {
    baseType,
    format
} from './elments_type'
import {
    getUptoken
} from '../../utils'
import myDatepicker from '../vue-datepicker'
import {
    upload,
    IMG_SERVER
} from '../../config.js'
import threelevellinkage from '../threelevellinkage'
Date.prototype.format = format
const FILESIZE = 5
export default {
    name: 'formView',
    verify: true,
    components: {
        'date-picker': myDatepicker,
        'Dropzone': function(resolve) {
            require(['vue2-dropzone'], resolve)
        },
        threelevellinkage
    },
    data() {
        return {
            changeReload: true,
            save: false,
            page: 1,
            fileSize: FILESIZE,
            citysCopy: {},
            fileUploadUrl: upload.uploadURL,
            dropzoneoption: {
                dictDefaultMessage: "点击或拖拽上传文件<br>单文件大小" + FILESIZE + "M以内",
                dictFallbackMessage: "您的浏览器不支持拖拽上传文件",
                dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
                dictFileTooBig: "文件太大({{filesize}}兆). 最大: {{maxFilesize}}兆.",
                dictInvalidFileType: "上传的文件格式有误",
                dictResponseError: "服务器异常，错误代码{{statusCode}}",
                dictCancelUpload: "取消上传",
                dictCancelUploadConfirmation: "确定要取消上传吗？",
                dictRemoveFile: "移除文件",
                dictRemoveFileConfirmation: null,
                dictMaxFilesExceeded: "您已经不能再上传更多的文件了"
            },
            //日历
            option: {
                type: 'day',
                week: ['一', '二', '三', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: 'YYYY-MM-DD',
                placeholder: '请输入日期',
                inputStyle: {
                    'border': 'none'
                },
                color: {
                    header: '#ccc',
                    headerText: '#f00'
                },
                buttons: {
                    ok: '确定',
                    cancel: '取消'
                },
                overlayOpacity: 0.5, // 0.5 as default
                dismissible: true, // as true as default
            },
            timeoption: {
                type: 'min',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: 'YYYY-MM-DD HH:mm'
            },
            multiOption: {
                type: 'multi-day',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: "YYYY-MM-DD HH:mm"
            },
            limit: [{
                    type: 'weekday',
                    available: [1, 2, 3, 4, 5]
                }, {
                    type: 'fromto',
                    from: '2016-02-01',
                    to: '2016-02-20'
                }]
                //日历控件
        }
    },
    created() {
        if (!this.formData.elments || this.formData.elments.length == 0) return;
        this.formData.elments.filter((item) => {
            return item.fieldType == 'checkbox' || item.fieldType == 'city'
        }).forEach((o, i) => {

            o.value = o.value ? o.value.split(',') : [];
        });
        this.formData.elments.forEach((o, i) => {
            if (o.fieldType == 'city') {
                if (o.value.length > 0) {
                    let after = o.value.splice(3, o.value.length - 3);
                    o.value[2] = o.value[2] + ',' + after.toString();
                    this.citysCopy[i] = {
                        city: o.value[1],
                        province: o.value[0],
                        address: o.value[2]
                    }
                } else {
                    this.citysCopy[i] = {
                        city: '',
                        province: '',
                        address: ''
                    }

                }
            }
        })

    },
    props: {
        'formData': {
            type: Object,
            required: true
        },
        'itemIndex': {
            type: Number,
            default: 0
        }
    },
    filters: {
        promptInfo(el) {
            if (['name', 'mobile', 'email'].indexOf(el.itemName) > -1) return
            if (['radio', 'checkbox', 'select', 'city', 'date_picker'].indexOf(el.fieldType) > -1) return
            let setfiletypes = function(val, custom) {
                let aTypes = {
                    'image': 'image/*,.pdf,.psd',
                    'word': '.txt,.doc',
                    'video': '.mp4,.avi,.rm',
                    'audio': '.mp3,.wav,.wma,.rm',
                    'zip': '.zip,.rar',
                    'other': custom
                }
                return aTypes[val] || val;
            }
            let fnRules = {
                    'minLength': function() {
                        if (el.rules.maxLength > 0) {
                            return el.rules.minLength + '到' + el.rules.maxLength + '个字符'
                        } else {
                            return '最少' + el.rules.minLength + '个字符'
                        }
                    },
                    'maxLength': function() {
                        if (el.rules.minLength > 0) {
                            return el.rules.minLength + '到' + el.rules.maxLength + '个字符'
                        } else {
                            return '最多' + el.rules.maxLength + '个字符'
                        }
                    },
                    'minSize': function() {
                        if (el.rules.maxSize > 0) {
                            return el.rules.minSize + '到' + el.rules.maxSize + '的数字'
                        } else {
                            return '最小' + el.rules.minSize + '的数字'
                        }
                    },
                    'maxSize': function() {
                        if (el.rules.minSize > 0) {
                            return el.rules.minSize + '到' + el.rules.maxSize + '个数字'
                        } else {
                            return '最大' + el.rules.maxSize + '的数字'
                        }
                    },
                    'fileLength': () => {
                        let txt = '';
                        if (el.attr.fileLength) {
                            txt = '最多可上传' + el.attr.fileLength + '个文件'
                        }
                        if (el.attr.fileType) {
                            txt += '，文件格式"' + setfiletypes(el.attr.fileType, el.attr.custom).replace('image/*,', '图片类以及') + '"'
                        }
                        return txt
                    },
                    'fileType': () => {
                        let txt = '';
                        if (el.attr.fileLength) {
                            txt = '最多可上传' + el.attr.fileLength + '个文件'
                        } else {
                            txt = '最多10个文件'
                        }
                        if (el.attr.fileType) {
                            txt += '，文件格式"' + setfiletypes(el.attr.fileType, el.attr.custom).replace('image/*,', '图片类以及') + '"'
                        }
                        return txt
                    }
                },
                res = '';
            $.each($.extend(false, el.rules, el.attr), function(i, o) {
                if (fnRules[i] && o) {
                    res = fnRules[i]()
                }
            })
            return res == '' ? '' : '(' + res + ')'
        }
    },
    mounted() {
        let this_ = this;
        $('.ui.dropdown.select-div').dropdown();
        $('.cov-datepicker').css({
            'border': '1px solid #dde0ec'
        });
        $('.ui.checkbox').checkbox();
        if ($('.fileuploaddiv').length > 0) {
            this_.token = getUptoken();
        }

    },
    methods: {
        submit() {
            this.save = true
            return new Promise((reslove, reject) => {
                this.$verify.check().then(() => {
                    this.formData.elments.forEach((o, i) => {
                        if (typeof o.value == 'object') {
                            o.value = o.value.toString()
                        };
                    })
                    reslove([this.itemIndex, this.formData.elments])
                }, () => {
                    reject(this.itemIndex)
                }).catch(e => {
                    console.log(e);
                })
            })
        },
        linkagechange(value, el, index) {
            let citys = this.citysCopy[index];
            // 重新渲染城市组件
            if (value.split(',')[1] == '') {
                this.changeReload = false;
                this.$nextTick(() => {
                    this.changeReload = true;
                })

            }
            el.value = [citys.province, citys.city, citys.address] = [value.split(',')[0], value.split(',')[1], citys.address];
            this.$verify.vali('formData.elments.' + index + '.value', el.value, el.rules)
            this.$forceUpdate()

        },
        addresschange(el, index) {
            let citys = this.citysCopy[index];
            [citys.province, citys.city] = el.value
            el.value = [citys.province, citys.city, citys.address]
            this.$verify.vali('formData.elments.' + index + '.value', el.value, el.rules)
            this.$forceUpdate()
        },
        validatefile: function(file, el, index, status) { //status 
            if (!file.accepted) return false
            let filesrc = IMG_SERVER + JSON.parse(file.xhr.response).hash;
            if (status) {
                // 删除
                if (el.value.length > 0) {
                    let valueArr = el.value.split(',');
                    if (valueArr.indexOf(filesrc) > -1) {
                        valueArr.splice(valueArr.indexOf(filesrc), 1)
                    }
                    el.value = valueArr.toString();
                }
            } else {
                // 添加
                el.value += el.value.length == 0 ? filesrc : ',' + filesrc;
            }
            this.$verify.vali('formData.elments.' + index + '.value', el.value, el.rules)
            this.$forceUpdate()
        },
        setfiletypes: function(val, custom) {
            let aTypes = {
                'image': 'image/*,.pdf,.psd',
                'word': '.txt,.doc',
                'video': '.mp4,.avi,.rm',
                'audio': '.mp3,.wav,.wma,.rm',
                'zip': '.zip,.rar',
                'other': custom
            }
            return aTypes[val] || val;
        },
        sending(file, xhr, formData) {
            formData.append('token', this.token);
        },
        datevali(val, el) {
            el.value = val;
        }
    }
}
</script>
<style scoped>
.ui.form .dropzone .dz-preview .dz-error-message {
    top: 90px;
}
</style>
