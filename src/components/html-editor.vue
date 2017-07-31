<template>
    <div>
        <textarea v-bind:value="value" style="height:500px"></textarea>
    </div>
</template>
<script>
var wangEditor = require('../../public/weditor/js/wangEditor.js')
require('../../public/weditor/js/wx_aticle_plugin.js')
import {
    debounce,
    getUptoken
} from '../utils'
export default {
    name: 'htmlEditor',
    props: {
        'value': String,
        'index': String,
        'isNoMenu': null,
        'editorOption': null
    },
    data() {
        return {
            option: {
                fnReturnVal: 'html',
                height: '500px',
                showWechat: true,
                menus: null
            }
        }
    },
    created() {
        this.setOption(this.isNoMenu || this.editorOption)
    },
    mounted() {
        this.create()
    },
    watch: {
        value(val) { //向父组件发送消息
            console.log(val);
            this.$emit("on-result-change", this.index, val); //③组件内对myResult变更后向外部发送事件通知
        },
        isNoMenu(val) {
            this.setOption(val);
            this.create()
        }
    },
    methods: {
        setOption(val) {
            if (typeof val === 'boolean') {
                val ? this.option = {
                    fnReturnVal: 'formatText',
                    height: '0',
                    showWechat: false,
                    menus: []
                } : ''
            } else if (typeof val === 'object') {
                this.option = val
            }
        },
        //设置编辑器内容
        setContent(val) {
            this.editor.$txt.html(val)
        },
        create() {
            let textarea = $(this.$el).find('textarea');
            textarea.css('height', this.option.height)
            this.editor = new wangEditor(textarea)
                //     // 上传图片（举例）
            this.editor.config.uploadImgUrl = 'http://upload.qiniu.com'
                //     //获取七牛上传token
                //     // 配置自定义参数（举例）
            if (this.option.menus !== null) {

                this.editor.config.menus = []
            } else {
                this.uptoken = getUptoken();
                this.editor.config.uploadParams = {
                    'token': this.uptoken
                }
            }
            this.editor.create()
            if (!this.option.showWechat) {
                let wechat = $(this.editor.$editorContainer[0]).find('.WECHAT_BUTTON')
                if (wechat.length > 0) {
                    wechat.remove();
                }
            }
            this.editor.$txt.html(this.value)
            this.editor.DropPanel
            this.editor.onchange = debounce(() => {
                let html = this.editor.$txt[this.option.fnReturnVal]()
                this.value = html
            }, 500)

        },
        append(e, dom) {
            if(/msie/.test(navigator.userAgent.toLowerCase())){
                this.editor.$txt.append(dom);
            }else{
                this.editor.command(e, 'insertHtml', dom);
            }
            this.value = this.editor.$txt[this.option.fnReturnVal]()
        },
        clear() {
            this.editor.clear();
        }
    }
}
</script>
<style scoped>
</style>
