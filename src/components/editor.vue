<template>
    <div id="editorBox" v-if="modalShow">
        <div class="fluidTabs">
            <div v-for="(item, index) in menus" :class="[{ active: (index == currIndex) }, 'tabItem']" @click="swichTab(index)">
                <input type="text" class="labelInput" v-model="item.label" :value="item.label">
                <i class="icon-iconfontguanbi icon iconfont closeBtn large" @click.stop="rmMenu(index)"></i>
            </div>
            <div class="tabItem text-blue noLine" data-tooltip="点击增加一个类别" @click="addMenu"><i class="icon-bigtianjia iconfont icon button"></i></div>
        </div>
        <div :id="'editorContent'+index" :class="[{ active: (index == currIndex) }, 'fluidTabsCon', 'editorContent']" v-for="(content, index) in menus">
            <htmlEditor :index="index" :value="content.content" @on-result-change="onResultChange"></htmlEditor>
        </div>
    </div>
</template>
<script>
import htmlEditor from './html-editor'
export default {
    name: 'editor',
    props: ['menus'],
    data() {
        return {
            currIndex: 0,
            modalShow: true
        }
    },
    mounted() {
        // console.log($('body'))
        // $('.editorContent').each(function(k,v){
        //     var editor = new wangEditor($(v).attr('id'));
        //     editor.create();
        // })

    },
    watch: {
        menus: {　　　　　　　　　 //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
            　　　　　　　　　　
            handler(curVal, oldVal) {
                this.$emit("contentChange", this.index, curVal); //③组件内对myResult变更后向外部发送事件通知
                　　　　　　　　　　
            },
            deep: true
        }

    },
    methods: {

        addMenu: function() {
            if (this.menus.length >= 6) {
                return
            }
            this.menus.push({
                label: '自定义菜单',
                content: '自定义内容'
            })
            this.currIndex = this.menus.length - 1

            this.$emit('on-content-change', this.menus)

        },
        rmMenu: function(index) {
            if (this.menus.length <= 1) {
                return
            }
            this.menus.splice(index, 1)

            this.$emit('on-content-change', this.menus)
            this.currIndex = 0

        },
        swichTab: function(index) {
            this.currIndex = index
        },

        onResultChange(index, val) {
            this.menus[index].content = val;
            this.$emit('on-content-change', this.menus) 
        }
    },
    components: {
        htmlEditor
    }
}
</script>
<style scoped>
#editorBox .labelInput {
    padding: 0;
    border: 0;
    cursor: pointer;
    text-align: center;
    min-width: auto !important;
    width: 100% !important;
    outline:none;
}

#editorBox .active .labelInput {
    background: #0099ff;
    color: #fff;
}

.editorContent {
    display: none;
}

.editorContent.active {
    display: block;
}
</style>
