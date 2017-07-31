<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">市场推广</span>/社交分享</h2>
            </div>
            <div class="white-wrap p-xl">
                <div class="ui  grid form">
                    <div class="nine wide column">
                        <h3 class="ui header">把您的活动分享至各大设计网站，也能很好的宣传您的活动哟！</h3>
                        <div class="ui divider hidden"></div>
                        <div class="mt-lg mb-lg" id="baiduShareButtons">
                            <div class="bdsharebuttonbox" data-tag="share_1">
                                <a href="javascript:void(0)" class="iconfont icon_qq " data-cmd="sqq"></a>
                                <a href="javascript:void(0)" class="iconfont icon_qqkongjian " data-cmd="qzone"></a>
                                <a href="javascript:void(0)" class="iconfont icon_weibo " data-cmd="tsina"></a>
                                <a href="javascript:void(0)" class="iconfont icon_linkedin" data-cmd="linkedin"></a>
                                <a href="javascript:void(0)" class="iconfont icon_facebook" data-cmd="fbook"></a>
                                <a href="javascript:void(0)" class="iconfont icon_twitter" data-cmd="twi"></a>
                                <a href="javascript:void(0)" class="iconfont icon_more" data-cmd="more"></a>
                            </div>
                        </div>
                        <div class="ui divider hidden"></div>
                        <div class="fields">
                            <div class="ten wide field">
                                <input type="text" id="foo" :value="'http://'+eventUrl">
                            </div>
                            <div class="six wide field">
                                <a data-clipboard-target="#foo" @click="$message.success('复制成功')" href="#" class="ui button  basic blue clipboard-btn">复制链接</a>
                            </div>
                        </div>
                    </div>
                    <!-- 这期不上微信分享 -->
                    <!-- <div class="seven wide column">
                        <div class="ui compact segment" style="margin: 0 auto">
                            <img src="http://www.eventdove.com/img/refactor2/image/quickmark1.png" class="ui small image">
                        </div>
                        <div class="ui text-info text-center mt-sm"><i class="wechat icon green"></i> 微信扫描分享给好友或朋友圈</div>
                    </div> -->
                </div>
                <div class="ui divider hidden"></div>
                <div class="ui items">
                    <div class="item">
                        <div class="ui image small"> <img :src="image+'?imageView2/1/w/200/h/200/format/jpg/q/75|imageslim'">
                            <div class="text-center mt-sm">
                                <dropzone-upfile :button="{'class':'ui button blue mini','text':'上传图片','id':'ori_img_upbtn'}" @uploaded="changeShare">
                                </dropzone-upfile>
                            </div>
                        </div>
                        <div class="ui form content">
                            <div class="field">
                                <input type="text" name="" v-model="title" @change="changeShare">
                            </div>
                            <div class="field">
                                <textarea v-model="content" @change="changeShare"></textarea>
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
import {
    loadJs
} from '../../utils'
import dropzoneUpfile from '../../components/dropzone-upfile'
window._bd_share_config = {}

function removeShare() {
    $('body').find('.bdselect_share_box,.bdselect_share_bg,.sr-bdimgshare').remove();
    delete window._bd_share_main;
    
    $('script').each(function(i, o) {
        $(this).attr('src') == baiduShareJS ? $(this).remove() : ''
    })
    $('[rel="stylesheet"]').each(function(i, o) {
        $(this).attr('href').indexOf(baiduShareJS.split('/js/')[0]) > -1 ? $(this).remove() : ''
        $(this).attr('href').indexOf('/css/shareIcon.css') > -1 ? $(this).remove() : ''
    });
}
var baiduShareJS = 'http://bdimg.share.baidu.com/static/api/js/share.js'

export default {
    name: '',
    data() {
        return {
            eventUrl: window.location.host + '/site/' + this.$route.params.id,
            title: this.eventInfo.title,
            content: $('<div>' + this.eventInfo.content[0].content + '</div>').text(),
            image: this.eventInfo.bannerUrl,
            htmlButtons: ''
        }
    },
    props: ['eventInfo'],
    created() {},
    mounted: function() {
        loadJs('/js/clipboard.min.js', () => {
            new Clipboard('.clipboard-btn');
        });
        console.log()
        this.htmlButtons = $('#baiduShareButtons').html();
        this.changeShare();
    },
    methods: {
        changeShare(src) {
            if (typeof src == 'string') {
                this.image = src
            }
            _bd_share_config = {
                common: {
                    bdText: this.title,
                    bdDesc: this.content,
                    bdUrl: this.eventUrl,
                    bdPic: this.image
                },

                share: [{
                    "bdSize": 32,
                    'bdCustomStyle': '/css/shareIcon.css'
                }]
            }
            // console.log(_bd_share_config.common);
            this.reloadShareJs();
        },
        reloadShareJs() {
            $('#baiduShareButtons').html(this.htmlButtons);

            removeShare();
            loadJs(baiduShareJS);
        }
    },
    beforeDestroy() {
        removeShare();
    },
    components: {
        dropzoneUpfile
    }
}
</script>
<style scoped>
@font-face {
    font-family: 'iconfont';
    /* project id 351895 */
    src: url('//at.alicdn.com/t/font_bhytdpoe0t138fr.eot');
    src: url('//at.alicdn.com/t/font_bhytdpoe0t138fr.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_bhytdpoe0t138fr.woff') format('woff'), url('//at.alicdn.com/t/font_bhytdpoe0t138fr.ttf') format('truetype'), url('//at.alicdn.com/t/font_bhytdpoe0t138fr.svg#iconfont') format('svg');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border-radius: 50%;
    border: 1px solid #ccc;
    padding: 10px;
    cursor: pointer;
}

.icon_qq:before {
    content: "\e607";
    color: #09f
}

.icon_qqkongjian:before {
    content: "\e63d";
    color: #ff8831
}

.icon_weibo:before {
    content: "\e606";
    color: #00cfb3
}

.icon_linkedin:before {
    content: "\e724";
    color: #09f
}

.icon_facebook:before {
    content: "\e600";
    color: #ff8831
}

.icon_twitter:before {
    content: "\e638";
    color: #00cfb3
}

.icon_more:before {
    content: "\e698";
    color: #00cfb3;
    font-size: 16px
}
</style>