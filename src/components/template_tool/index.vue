<template>
    <div>
        <div class="ui dimmer"  :class="{'active':!loaded}">
            <div class="ui text loader">加载中</div>
        </div>
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">活动通知</span>/添加模板</h2>
            </div>
            <div class="white-wrap p-xl">
                <h3 class="ui header  fwn">使用微信定向邀请，给被邀请人不一样的参会体验！</h3>
                <div class="ui aligned vertically padded grid">
                    <div class="wide" style="width:370px;height: 740px;padding:78px 25px 98px;background:url(/images/phone_mask.png)">
                        <div :style="'background-image:url('+elements.bgimg+');'" class="bgfull">
                            <canvas id="c" width="320" height="564"></canvas>
                        </div>
                    </div>
                    <div class="ten wide column">
                        <h3 class="ui horizontal header divider text-blue">
                            <i class="dashboard icon"></i>
                            选择模版
                        </h3>
                        <h4>背景<span style="font-weight:500;color:#ccc">（宽度为750px，高度为1334px的.png、.jpg图片，小于2M）</span></h4>
                        <dropzone-upfile :button="{'class':'ui button blue mini','text':'上传图片','id':'ori_img_upbtn'}" @uploaded="elements.bgimg = arguments[0]">
                        </dropzone-upfile>
                        <h4>选择文件<span style="font-weight:500;color:#ccc"> 上传图片 内容（点击勾选添加到左侧界面中，点击删除，将从左侧界面中移除） </span></h4>
                        <div class="ui checkbox" @change="setElement(element,arguments[0])" v-ui v-if="key!=='bgimg'" v-for="(element,key,index) in elements">
                            <input type="checkbox" :value="key" v-model="checkedArr" name="elementname">
                            <label>{{element.name}}</label>
                        </div>
                        <hr>
                        <div v-show="edit">
                            文字颜色<input class="ui input" type="color" @change="setAttr(arguments[0],'fill')" v-model="select.fill">
                            <br><br><br>
                            文字大小<input class="ui input" type="number" @change="setAttr(arguments[0],'fontSize')" v-model="select.fontSize">
                            <br><br><br>
                            对齐方式
                            <a href="javascript:void(0)" @click="setAttr({left:0})" title="左对齐"><i class="pointer align left icon"></i></a>
                            <a href="javascript:void(0)" @click="setAttr({left:(320-select.width)/2})" title="居中"><i class="pointer align center icon"></i></a>
                            <a href="javascript:void(0)" @click="setAttr({left:320-select.width})" title="右对齐"><i class="pointer align right icon"></i></a>
                        </div>
                        <hr>
                        <div class="ui">
                            <button class="ui blue button mini" @click="save">保存模板</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Fabric from './add_fabric'
import dropzoneUpfile from '../dropzone-upfile'
export default {
    name: 'templateCreate',
    data() {
        return {
            edit:false,
            loaded:false,
            select:{},
            elements: {
                "guest": {
                    "color": "#00f",
                    "fontSize": 20,
                    "left": 100,
                    "top": 400,
                    "name": '参会人姓名',
                    "text": '某某某',
                    "isShow": false
                },
                "address": {
                    "fill": "#f00",
                    "fontSize": 20,
                    "left": 10,
                    "top": 500,
                    "name": '地点',
                    "text": '活动的详细地址',
                    "isShow": false
                },

                "date": {
                    "fill": "blue",
                    "fontSize": 20,
                    "left": 40,
                    "top": 200,
                    "name": '时间',
                    "text": '2017-01-01 上午10:00',
                    "isShow": false
                },
                "bgimg": '/images/bj.png',
                "qrCode": {
                    "src": '/images/event_dove_code.jpg',
                    "height": 240,
                    "width": 240,
                    "left": 30,
                    "top": 200,
                    "name": '报名二维码',
                    "isShow": false
                },
                "title": {
                    "fill": "green",
                    "fontSize": 30,
                    "left": 120,
                    "top": 360,
                    "name": '活动名称',
                    "text": '互联网大会',
                    "isShow": false
                }
            },
            checkedArr: []
        }
    },
    mounted:function() {
        this.fabric = new Fabric('c',(Edit,select)=>{
            if(typeof Edit==='boolean'){
                this.edit = Edit;
                this.select = select || {};
                return false
            }
            var fabric = Edit;
            this.loaded = true;
            this.elements = JSON.parse(localStorage.getItem('template_model')) || this.elements;
            $.each(this.elements, (i, o) => {
                if(i!=='bgimg'&&o.isShow){
                    o.index = -1;
                    this.checkedArr.push(i);
                    fabric.setElement(o);
                }
            });
        });
        console.log(this.fabric);
    },
    computed: {},
    methods: {
        save() {
            var json = this.fabric._canvas.toJSON().objects;
            $.each(this.elements, (i, o) => {
                if (o.index!==undefined && o.index !== -1) {
                    o.left = json[o.index].left;
                    o.top = json[o.index].top;
                    o.width = json[o.index].width;
                    o.height = json[o.index].height;
                    o.fontSize = json[o.index].fontSize;
                    o.fill = json[o.index].fill;
                    // o.originX = json[o.index].originX
                }
            });
            localStorage.setItem('template_model', JSON.stringify(this.elements));
            this.$message.success('保存成功')
        },
        setElement(option, ev) {
            if(ev){
                option.isShow = ev.target.checked;
            }
            this.fabric.setElement(option);
        },
        setBg(src) {
            this.elements.bgimg.src = src;
        },
        setAttr(ev,attr){
            if(attr){
                var opt = new Object()
                opt[attr] = ev.target.value;
            }else{
                var opt = ev;
            }
            this.select.set(opt);
            this.fabric._canvas.renderAll()
        }
    },
    components: {
        dropzoneUpfile
    }
}
</script>
<style scoped>
.bgfull {
    background-size: 100% 100%
}
</style>