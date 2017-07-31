<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">市场推广</span>/网站嵌入</h2>
            </div>
            <div class="white-wrap p-xl">
                <div class="ui form">
                    <h3 class="ui header">嵌入门票模块<div class="sub header text-muted mt-sm">复制下面的门票代码，并粘贴在网页上使用</div></h3>
                    <div class="field">
                        <textarea rows="3" id="foo1" :value="value1">{{value1}}</textarea>
                    </div>
                    <div class="text-justify mt-sm">
                        <div class="ui checkbox"></div>
                        <button data-clipboard-target="#foo1" class="clipboard-btn ui button blue" @click="$message.success('复制成功')">复制代码</button>
                    </div>
                    <h3 class="ui header">复制活动链接<div class="sub header text-muted mt-sm">复制下面的活动链接，并粘贴在网页上使用</div></h3>
                    <div class="field">
                        <input type="text" :value="value2" id="foo2" />
                    </div>
                    <div class="text-justify mt-sm">
                        <div class="ui checkbox"></div>
                        <button data-clipboard-target="#foo2" class="clipboard-btn ui button blue" @click="$message.success('复制成功')">复制代码</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    loadJs
} from '../../utils'
export default {
    name: 'webEmbedding',
    data() {
        return {
            eventId: this.$route.params.id
        }
    },
    mounted: function() {
        this.eventId = this.$route.params.id;

        loadJs('/js/clipboard.min.js', () => {
            new Clipboard('.clipboard-btn');
        })
    },
    computed: {
        value1() {
            return '<div><iframe id="mgframe" height="331px" width="100%" src="http://'+location.host+'/ticketSelected/' + this.eventId +'" frameborder="0" scrolling="no"></iframe></div>';
        },
        value2() {
            return 'http://'+location.host+'/site/' + this.eventId;
        }
    },
    methods: {
    },
    components: {
    }
}
</script>
<style>
</style>
