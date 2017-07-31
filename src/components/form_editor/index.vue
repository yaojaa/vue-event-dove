<template>
    <article class="ui doubling stackable grid form-edit-wrap">
        <div class="twelve wide column">
            <div class="ui segment fe-main" id="form-main">
                <div class="right close ui rail">
                    <div class="ui sticky form-side transition visible">
                        <aside class="fe-aside">
                            <ul class="fields-bar__list" @mouseover="highcolor=true" @mouseout="highcolor=false" v-sortable="{group: {name: 'advanced',pull:'clone',put: false},onChoose:onChoose,sort:false}">
                                <p>表单控件</p>
                                <li v-for="el in formElments" :data-type="el.type">
                                    <i :class=" 'icon '+ el.icon" :style="el.size?'font-size:'+el.size:''"></i>
                                    <span>{{el.label}} </span>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
                <ul class="form-elements">
                    <li v-for="(el,index) in defaultDragElments" :key="el.itemName">
                        <h3>
                     <span class="requiredIcon" v-show="el.rules.required">＊</span> 
                     <!-- <span>{{el.displayName}}</span> -->
                     <input type="text" name="" v-model="el.displayName" readonly="">
                    </h3>
                        <!--文本框、姓名-->
                        <div class="field-preview" v-if="el.fieldType=='text'">
                            <div class="ui left icon input" v-show="el.attr.isMultiline == false||el.attr.isMultiline==undefined">
                                <input type="text" placeholder="" readonly="true">
                                <i class="write icon"></i>
                            </div>
                            <div v-show="el.attr.isMultiline==true" class="field">
                                <textarea rows="3" readonly="true"></textarea>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul id="form-elements" class="form-elements" :class="{highcolor:highcolor&&dragElments.length==0}" v-sortable="{animation: 500,handle: '.my-handle',group: {name: 'advanced',pull: true,put: true},onUpdate:update,onEnd:onEnd,onAdd:onAdd}">
                    <!-- <p class="dragtext" v-if="dragElments.length==0">拖拽到这里添加</p> -->
                    <li v-for="(el,index) in dragElments" :key="el.itemName" @click.stop="focus(index)" :class="{ 'block_active': index === active }">
                        <div class="dragbar">
                            <span class="my-handle">:::::::: </span>
                        </div>
                        <h3>
                         <span class="requiredIcon" v-show="el.rules.required">＊</span> 
                         <input type="text" name="" v-model="el.displayName">  
                         <span v-if="el.rules.isNumber" class="isNumberIcon">123</span>
                        </h3>
                        <input type="text" name="" class="input-prompt" placeholder="提示信息（可选）" v-model="el.description" v-if="el.isDisplayDescription==true">
                        <!--文本框、姓名-->
                        <div class="field-preview" v-if="el.fieldType=='text'">
                            <div class="ui left icon input" v-show="el.attr.isMultiline == false||el.attr.isMultiline==undefined">
                                <input type="text" placeholder="" readonly="true">
                                <i class="write icon"></i>
                            </div>
                            <div v-show="el.attr.isMultiline==true" class="field">
                                <textarea rows="3" readonly="true" class="textareastyle"></textarea>
                            </div>
                        </div>
                        <!--单选-->
                        <div class="field-preview" v-if="el.fieldType=='radio' ">
                            <ul>
                                <li v-for="(item,childIndex) in el.itemValues" class="radio_item">
                                    <input type="radio" readonly="readonly" disabled="true">
                                    <input type="text" @change="updateItem(childIndex,el.itemValues)" name="" v-model="item.option" class="radio_text">
                                    <a class="rm" v-if="el.itemValues.length>1" @click="rmItem(index,childIndex)"><i class=" minus circle icon"></i></a>
                                </li>
                            </ul>
                            <div class="toolbar"><a href="javascript:void(0)" @click="addRadioItem(index)">添加新选项</a>
                                <!-- | 
          <a>添加其他</a> --></div>
                        </div>
                        <!--多选-->
                        <div class="field-preview" v-if="el.fieldType=='checkbox'">
                            <ul>
                                <li v-for="(item,childIndex) in el.itemValues" class="radio_item">
                                    <input type="checkbox" disabled="true">
                                    <input type="text" @change="updateItem(childIndex,el.itemValues)" name="" v-model="item.option" class="radio_text">
                                    <a class="rm" v-if="el.itemValues.length>1" @click="rmItem(index,childIndex)"><i class=" minus circle icon"></i></a>
                                </li>
                            </ul>
                            <div class="toolbar"><a href="javascript:void(0)" @click="addRadioItem(index)">添加新选项</a>
                                <!-- | 
          <a>添加其他</a> --></div>
                        </div>
                        <!--下拉框-->
                        <div class="field-preview" v-if="el.fieldType=='select'">
                            <div v-show="active!=index">
                                <div class="ui right icon input">
                                    <input type="text" placeholder="请选择" readonly="true"><i class="dropdown icon"></i>
                                </div>
                            </div>
                            <div v-show="active==index">
                                <span v-for="(item,childIndex) in el.itemValues">
                <input type="text" name="" @change="updateItem(childIndex,el.itemValues)" v-model="item.option" class="radio_text">
                      <a class="rm" v-if="el.itemValues.length>1" @click="rmItem(index,childIndex)"><i class=" minus circle icon"></i></a>
              </span>
                                <div class="toolbar"><a href="javascript:void(0)" @click="addRadioItem(index)">添加新选项</a>
                                    <!-- | 
            <a>添加其他</a> --></div>
                            </div>
                        </div>
                        <!--日期时间-->
                        <div class="field-preview" v-if="el.fieldType=='date_picker'">
                            <div class="ui left icon input">
                                <input type="text" :placeholder="new Date().format(el.attr.haveTime?'yyyy-MM-dd hh:mm':'yyyy-MM-dd')" readonly="true">
                                <i class="time icon"></i>
                            </div>
                        </div>
                        <!--附件-->
                        <div class="field-preview" v-if="el.fieldType=='attachment'">
                            <label class="field-files"><span class="icon">+</span> <span class="text">请选择文件上传，单个文件5M以内。</span></label>
                        </div>
                        <!--城市-->
                        <div class="field-preview" v-if="el.fieldType=='city'">
                            <div class="ui right icon input">
                                <input type="text" placeholder="选择省份" readonly="true"><i class="dropdown icon"></i>
                            </div>
                            <div class="ui right icon input">
                                <input type="text" placeholder="选择城市" readonly="true"><i class="dropdown icon"></i>
                            </div>
                            <div class="ui left icon input">
                                <input type="text" placeholder="详细地址" readonly="true"><i class="write icon"></i>
                            </div>
                        </div>
                        <!--tool bar-->
                        <div class="field-operation  clearfix toolbar">
                            <div class="operation-setting pull-left">
                                <div class="acition-item" v-if="typeof el.rules.required !== 'undefined'">
                                    <div class="checkbox">
                                        <label>
                                            <input v-if="el.fieldType!='city'" type="checkbox" tabindex="0" class="hidden" v-model="el.rules.required">
                                            <input v-if="el.fieldType=='city'" type="checkbox" cdi="111" tabindex="0" class="hidden" @change="el.rules.required=el.rules.required?false:3"> 必填</label>
                                    </div>
                                </div>
                                <div class="acition-item" v-if="typeof el.attr.isNumber !== 'undefined'">
                                    <div class="  checkbox">
                                        <label>
                                            <input type="checkbox" tabindex="0" class="hidden" v-model="el.rules.isNumber" v-on:change="el.rules.maxLength=el.rules.minLength=el.rules.maxSize=el.rules.minSize=''"> 数字</label>
                                    </div>
                                </div>
                                <div class="acition-item" v-if="typeof el.attr.isMultiline !== 'undefined'">
                                    <div class="  checkbox">
                                        <label>
                                            <input type="checkbox" tabindex="0" class="hidden" v-model="el.attr.isMultiline"> 多行</label>
                                    </div>
                                </div>
                                <div class="acition-item" v-if="typeof el.attr.haveTime !== 'undefined'">
                                    <div class="  checkbox">
                                        <label>
                                            <input type="checkbox" tabindex="0" class="hidden" v-model="el.attr.haveTime"> 添加时分</label>
                                    </div>
                                </div>
                                <div class="acition-item div-morebox" @click="setmore=true">
                                    <div data-tooltip="更多设置"><i class="icon setting"></i></div>
                                    <div class="div-top" v-if="setmore==true">
                                        <!-- 提示信息 -->
                                        <div v-if="typeof el.isDisplayDescription !== 'undefined'" class="checkbox">
                                            <label>
                                                <input type="checkbox" tabindex="0" class="hidden" v-model="el.isDisplayDescription"> 添加提示信息</label>
                                        </div>
                                        <!-- 文件限制 -->
                                        <div v-if="typeof el.attr.fileRestriction !== 'undefined'" class="checkbox">
                                            <label>文件个数</label>
                                            <span><input type="number" v-model="el.attr.fileLength" @input="setFilelength(el)" placeholder="1-10个"></span>
                                            <div>文件类型
                                                <div class="checkbox">
                                                    <select v-model="el.attr.fileType" @change="filetypechange(el)">
                                                        <option value="">不限制</option>
                                                        <option v-for="(filetype ,i) in allFileType" :value="i">{{filetype}}</option>
                                                    </select>
                                                    <textarea name="" id="" cols="30" rows="3" placeholder="请输入文件后缀名,多个文件类型用','分隔，如‘.txt,.zip’" v-model="el.attr.custom" v-if="el.attr.fileType=='other'"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 字数限制 -->
                                        <div v-if="typeof el.attr.wordRestriction !== 'undefined'" class="checkbox">
                                            <label>{{el.rules.isNumber?'数值':'字数'}}限制</label>
                                            <span v-if="el.rules.isNumber">
                              <input type="number" class="inlineshotinput"  placeholder="不限" v-model="el.rules.minSize" v-on:blur="resetrules(el.rules)"> - <input type="number" class="inlineshotinput"  placeholder="不限"  v-model="el.rules.maxSize" v-on:blur="resetrules(el.rules)">
                            </span>
                                            <span v-if="!el.rules.isNumber">
                              <input type="number" class="inlineshotinput"  placeholder="不限" v-model="el.rules.minLength" v-on:blur="resetrules(el.rules)"> - <input type="number" class="inlineshotinput"  placeholder="不限"  v-model="el.rules.maxLength" v-on:blur="resetrules(el.rules)">
                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="operation-actions pull-right">
                                <div class="acition-item ">
                                    <div data-tooltip="删除" class="pull-right"><i class="trash icon " @click="removeItem(index)"></i> </div>
                                </div>
                                <!-- <div class="acition-item"><a data-tipsy="复制" class="mui-tipsy--n"><i class="mdo-ico ico-copy"></i>复制</a></div>
 --></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <div class="four wide column computer only tablet only">
            <aside class="fe-aside">
                <ul class="fields-bar__list" @mouseover="highcolor=true" @mouseout="highcolor=false" v-sortable="{group: {name: 'advanced',pull:'clone',put: false},onChoose:onChoose,sort:false}">
                    <p>表单控件</p>
                    <li v-for="el in formElments" :data-type="el.type">
                        <i :class=" 'icon '+ el.icon" :style="el.size?'font-size:'+el.size:''"></i>
                        <span>{{el.label}} </span>
                    </li>
                </ul>
            </aside>
        </div> -->
    </article>
</template>
<script>
import formElments from './form_elments'
import {
    baseType,
    genID,
    format

} from './elments_type'
import {
    API_URL
} from '../../config'
Date.prototype.format = format

var eltype = null //当前插入的元素类型
function removeNode(node) {
    node.parentNode.removeChild(node)
}

export default {
    name: 'formEditor',
    data() {
        return {
            highcolor: false,
            formElments: formElments,
            active: -1,
            setmore: false,
            isRequiredLength: 2,
            allFileType: {
                word: '文档类',
                image: '图片类',
                video: '视频',
                audio: '音频',
                zip: '压缩',
                other: '自定义'
            },
            defaultDragElments: [],
            dragElments: []
        }
    },
    mounted() {
        $(document).on('click', this.cancelSelect);
        $(window).scroll(function() {
            if ($(window).scrollTop() > $('#form-main').offset().top) {
                $('.ui.sticky.form-side').addClass('fixed top')
            } else {
                $('.ui.sticky.form-side').removeClass('fixed top')
            }
        });
    },
    computes: {},
    methods: {
        setElements(def, oth) { //def默认数据，oth其他数据
            this.defaultDragElments = [].concat(def);
            this.dragElments = [].concat(oth);
        },
        setFilelength(el) {
            let val = parseInt(el.attr.fileLength);
            switch (true) {
                case val < 1:
                    val = 1;
                    break;
                case val > 10:
                    val = 10;
                    break;
            }
            el.attr.fileLength = val;
        },
        resetrules(rules) {
            rules.minSize = parseInt(rules.minSize);
            rules.maxSize = parseInt(rules.maxSize);
            rules.minLength = parseInt(rules.minLength);
            rules.maxLength = parseInt(rules.maxLength);
            if (rules.isNumber) {
                !rules.minSize ? rules.minSize = 0 : ''
                rules.maxSize < rules.minSize ? rules.maxSize = '' : ''
            } else {
                !rules.minLength ? rules.minLength = 0 : ''
                rules.maxLength < rules.minLength ? rules.maxLength = '' : ''
            }
        },
        cancelSelect() {
            this.active = -1;
            this.closeTop();
        },
        closeTop() {
            this.selectshow = true;
            this.setmore = false;
        },
        addRadioItem(index) {
            let len = this.dragElments[index].itemValues.length + 1
            let itemData = {
                option: "选项 " + len,
                value: genID(),
                isOther: false
            }
            this.dragElments[index].itemValues.push(itemData)
        },
        rmItem(index, childIndex) {
            this.dragElments[index].itemValues.splice(childIndex, 1)
        },
        updateItem(index,items){
            if($.trim(items[index].option)===''){
                items[index].option = '选项 '+(index+1)
            }
            $.each(items,function(i,o){
                console.log(i!==index,$.trim(o.option)===$.trim(items[index].option))
                if(i!==index&&$.trim(o.option)===$.trim(items[index].option)){
                    items[index].option += '-0'+index
                    return false;
                }
            });
        },
        focus(index) {
            if (index !== this.active) {
                this.setmore = false;
            }
            this.active = index
        },
        // save() {
        //     $.ajax({
        //         type: "POST",
        //         url: '/formEditor',
        //         data: JSON.stringify({
        //             title: '报名表单',
        //             elments: this.dragElments
        //         }),
        //         dataType: "json",
        //         contentType: "application/json", //发送信息至服务器时内容编码类型。             
        //         success: (data) => {
        //             console.log(data)
        //         },
        //         error: function(err) {

        //         }
        //     })


        // },
        removeItem(index) {
            this.dragElments.splice(index, 1) // 删除
        },
        //插入元素时
        onAdd(evt) {
            let eltype = evt.item.getAttribute('data-type')
            removeNode(evt.item)

            let _id = genID() //生成唯一ID

            let elData
            //checkbox and radio type add _id  in items[0] property
            elData = $.extend(true, {}, baseType[eltype], {
                itemName: _id
            })
            if (this.setmore != false) {
                this.setmore = false;
            }
            this.dragElments.splice(evt.newIndex, 0, elData)
            if (evt.newIndex <= this.active) {
                this.active++
            }
        },
        update(evt) {
            var o = evt.oldIndex,
                n = evt.newIndex
            var currentItemdata = this.dragElments.slice(o, o + 1)[0]
            this.dragElments.splice(o, 1) // 删除旧的位置
            this.dragElments.splice(n, 0, currentItemdata)
        },
        onChoose(evt) {
            eltype = evt.item.getAttribute('data-type')

        },
        onEnd(evt) {
            this.active = evt.newIndex
        },
        filetypechange: function(evt) {
            // console.log(evt.rules.fileType)
        },
        upload: function(option) {
                option.data.collectItems = this.defaultDragElments.concat(this.dragElments)
                jQuery.post(option.url, JSON.stringify(option.data), option.success).error(option.error)
        }
    },
    beforeDestroy(){
        $(window).unbind('scroll')
    }
}
</script>
<style scoped>
ul,
li {
    list-style: none;
    margin: 0;
    padding: 0
}

#form-elements {
    min-height: 300px;
    border: 1px solid #fff;
    transition: border, transform, box-shadow .3s ease-in;
    position: relative;
}

#form-elements .dragtext {
    display: inline-block;
    width: 100%;
    height: 0px;
    text-align: center;
    background: transparent;
    border: none;
    position: absolute;
    top: 40px;
}

#form-elements.highcolor {
    border-color: #09f;
    background: #fefefe;
    box-shadow: 0 3px 30px #09f;
    transform: translate(-0, -3px);
    background: url('/images/foreditorimage.jpg') center no-repeat;
}

#form-elements.highcolor .dragtext {
    color: #09f;
}

h3 {
    margin: 0;
}

li.radio_item {
    line-height: 1.9
}

li.radio_item a.rm {
    display: none
}

li.radio_item:hover a.rm {
    display: inline-block;
}

.form-edit-wrap {}

.form-edit-wrap:after {
    content: ' ';
    clear: both;
    height: 0;
    display: block;
}

.fe-main {}

.dragbar {
    text-align: center;
    height: 20px;
}

.dragbar .my-handle {
    cursor: move;
}

.form-elements>li {

    border: 2px dashed #fff;
    background: #fff;
    margin: 10px 0
}

.form-elements>li:not(.block_active):hover {

    border: 2px dashed #09f;
    background: #ecf5fb
}

.form-elements .sortable-ghost {
    border: 3px dotted #ddd;
    border-left: none;
    border-right: none;
    opacity: .7
}

.form-elements .block_active {
    padding-bottom: 0;
    margin-bottom: 10px;
    z-index: 20;
    background-color: #fff;
    border: 1px solid #09f;
    border-top-width: 3px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .2), inset 0 3px 0 0 #09f;
}

.form-elements .toolbar {
    display: none;
}

.form-elements .block_active .toolbar {
    display: block;
}

.form-elements .toolbar label {
    margin-right: 10px;
}

.form-elements h3 {
    position: relative;
}

.form-elements h3 input {
    font-weight: bold;
    font-size: 16px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    outline: none;
    margin-left: 15px;
    padding: 5px 10px;
}

.form-elements h3 input:focus,
.form-elements .input-prompt:focus,
.form-elements .input-prompt:hover {
    border-color: #ccc;
}

.form-elements .input-prompt {
    font-size: 14px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    outline: none;
    margin-left: 15px;
    padding: 5px 10px;
    width: 90%;
}

.form-elements .requiredIcon {
    color: #e85764;
    position: absolute;
    font-weight: normal;
    left: 5px;
    font-size: 12px;
    font-weight: normal;
    top: 4px
}

.form-elements .isNumberIcon {
    color: #c00;
    font-size: 10px;
    text-decoration: underline;
}

.radio_text {
    border: none;
    outline: none;
    background-color: transparent
}

.radio_text:focus,
.radio_text:hover {
    border-bottom: 1px solid #ddd
}

.field-operation {
    margin-top: 10px;
    height: 40px;
    padding: 8px 20px;
    background-color: #f0f0f0;
    color: #333;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    line-height: 24px
}

.acition-item {
    display: inline-block;
}

.field-preview {
    padding: 10px 15px
}

.field-preview .textareastyle {
    width: 666px;
    height: 100px;
    resize: none;
    outline: none;
    border: 1px solid #dde0ec;
    transition: box-shadow .1s ease, border-color .1s ease;
}

.field-preview .textareastyle:focus {
    border-color: #c1d9fb;
    background: #FFF;
    color: rgba(0, 0, 0, .8);
    box-shadow: none;
}

.field-files {
    /*border: 1px dashed #999;
    font-size: .8em;
    line-height: 1.2142em;
    padding: .67861429em 1em .67861429em 2.5em;
    border-radius: .28571429rem;
    color: #bbb;
    position: relative;*/
}

.field-files .icon {
    font-size: 2em;
    font-weight: 700;
    color: #333;
    position: absolute;
    left: .3em;
    top: .3em;
}

.div-morebox .div-top {
    position: absolute;
    background: #fff;
    padding: .5em;
    border: 1px solid #ddd;
    border-radius: .28571429rem;
    z-index: 3;
    min-width: 180px;
    box-shadow: 5px 5px 10px #ccc;
    text-align: left;
}

.div-morebox {
    position: relative;
}

.div-morebox .icon.setting {
    margin-left: 6px
}

.div-morebox label {
    width: 100%;
    display: block;
}

.div-morebox .inlineshotinput {
    width: 60px;
    outline: none;
}

.div-morebox .div-top .checkbox {
    margin: 10px
}

.fe-aside {
    /*    position: fixed;
    width: 200px;
    top: 173px;
    left: calc(50% + 300px);
    border-bottom: 1px solid #ddd;*/
}

.fe-aside .fields-bar__list li {
    background: #fff;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 10%;
    cursor: pointer;
    border: 1px solid #ddd;
    border-top: 0;
    border-bottom: 0;
}

.fe-aside .fields-bar__list p {
    text-align: center;
    background: #09f;
    color: #fff;
    height: 40px;
    line-height: 40px;
    margin: 0;
}

.fe-aside .fields-bar__list li:hover {
    background: #f3f3f3;
    color: #09f;
}

.fe-aside .fields-bar__list li i.icon {
    width: 18px;
}

.form-side {
    width: 250px;
}

.fe-aside {
    border-bottom: 1px solid #ddd;
}

.form-side.fixed.top .fe-aside {
    margin-top: 60px;
}

@media only screen and (max-width: 767px) {
    #form-main{
        overflow: hidden;
    }
    .ui.close.right.rail {
        margin-left: 5em !important;
    }
}
</style>