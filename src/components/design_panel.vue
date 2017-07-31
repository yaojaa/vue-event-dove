<template>
    <div class="ui left designBar sidebar fixed">
        <div class="ui basic segment">
            <h4 class="ui grey inverted header mt-sm"><i class="icon-magic iconfont icon f16"></i><div class="content">宣传封面</div></h4>
            <div class="designImg">
                <img v-if="eventData.thumbnail" :src="eventData.thumbnail+'?imageMogr2/auto-orient/thumbnail/!720x360r/gravity/Center/crop/720x360/blur/1x0/quality/75|imageslim'" alt="" class="ui medium image">
                <div class="ui dimmer">
                    <div class="content">
                        <div class="center">
                            <button class="ui button mini blue" style="position:relative" id="thumbnail"><i class="upload  icon"></i>上传封面</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="space-sm f12 text-muted">
                一张漂亮的封面图片可以提高浏览者视觉体验，同时可以宣传活动内容。建议上传尺寸720px*360px的.png、.jpg、.gif图片，图片小于1M。
            </div>
            <div class="text-green"><span class="thumbnail"><i class="help circle icon"></i>使用示例</span></div>
            <div class="ui thumbnail-popup popup right transition hidden">
                <h4 class="mb-xs">效果展示</h4>
                <p class="text-info f12">此封面生效在发现活动及首页推广</p>
                <div class="hot-activity">
                    <div class="ui default card hot-card" style="width:200px;">
                        <div class="image"><img :src="eventData.thumbnail+'?imageMogr2/auto-orient/thumbnail/!720x360r/gravity/Center/crop/720x360/blur/1x0/quality/75|imageslim'"></div>
                        <div class="content">
                            <div class="card-box">
                                <div class="card-text f16 p-n">宣传封面示例活动</div>
                            </div>
                            <div class="info-box">
                                <p class="text-muted date"><span><i class="wait icon"></i>20xx年x月x日</span></p>
                                <div class="text-muted">
                                    <div class="text-hide"><i class="marker icon"></i>北京朝阳区XXX</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="comp-div"></div>
            <h4 class="ui grey inverted header"><i class="icon-yishu iconfont icon f16"></i><div class="content">活动Banner图</div></h4>
            <div class="design-tab">
                <div class="ui mini two buttons">
                    <a class="active item ui grey inverted  button" data-tab="pc-banner"><i class="desktop icon"></i>网页端</a>
                    <a class="item ui grey inverted button" data-tab="mob-banner"><i class="tablet icon"></i>移动端</a>
                </div>
                <div class="ui active tab" data-tab="pc-banner">
                    <div class="designImg mt-md">
                        <img v-if="eventData.bannerUrl" :src="eventData.bannerUrl" alt="" class="ui medium image">
                        <div class="ui dimmer">
                            <div class="content">
                                <div class="center">
                                    <button class="ui button mini blue" style="position:relative" id="bannerUrl"><i class="upload  icon"></i>上传网页端banner</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="space-sm f12 text-muted">
                        图片高度不限，网页端宽度推荐1920px
                    </div>
                </div>
                <div class="ui tab" data-tab="mob-banner">
                    <div class="designImg mt-md">
                        <img v-if="eventData.mobileBannerUrl" :src="eventData.mobileBannerUrl" alt="" class="ui medium image">
                        <div class="ui dimmer">
                            <div class="content">
                                <div class="center">
                                    <button class="ui button mini blue" style="position:relative" id="mobileBannerUrl"><i class="upload  icon"></i>上传移动端banner</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="space-sm f12 text-muted">
                        图片高度不限，移动端推荐640px
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    API_URL,
    upload,
    IMG_SERVER
} from '../config'
import {
    loadJs,
    getUptoken
} from '../utils'
import dropzoneUpfile from './dropzone-upfile'
let addtext = function(text, type, com) {
    if (typeof text == 'object') {
        var thistext = text.splice(0, 1)
    } else {
        var thistext = text
    }
    let types = {
        'success': {
            color: 'green'
        },
        'error': {
            color: 'red'
        }
    }
    let comp = $(this.element).find('.comp-div').css({
        'width': com + '%'
    }).css(types[type])
    if (com == 100) {
        setTimeout(() => {
            comp.text(thistext)
        }, 200)
    }
    setTimeout(() => {
        comp.css({
            width: 0
        }).text('');

        if (typeof text == 'object' && text.length > 0) {
            addtext.call(this, text, type, com)
        }
    }, 2000)
}
export default {
    name: 'designPanel',
    data() {
        return {
            msg: 'Welcome to Event Dove',
            uploadUrl: upload.uploadURL,
            token: '',
            filesize: 1,
            eventData: {
                thumbnail: '/images/no_up_banner.png',
                bannerUrl: '/images/no_up_banner.png',
                mobileBannerUrl: '/images/no_up_banner.png'
            }
        }
    },
    props: ['pageData'],
    created() {
        this.eventData = $.extend(this.eventData, this.pageData);
    },
    mounted() {
        $('.thumbnail').popup({
            popup: $('.thumbnail-popup'),
            on: 'hover',
            hoverable: true,
            position: 'bottom left',
        });
        $('.design-tab .item').tab()
        $('.designImg')
            .dimmer({
                opacity: 0.5,
                on: 'hover'
            })
        //$.fn.sidebar.settings.context = '.sidbarWarper'

        $('.designBar').sidebar({
            transition: 'push',
            // dimPage: false,
            // closable: false,
            scrollLock: false,
            context:'.sidbarWarper'
        }).sidebar('attach events', '.open.button', 'toggle');
        // 请求token
        this.uptoken = getUptoken()
        console.log(this.uptoken)
        let this_ = this
        var option = {
            url: this.uploadUrl,
            maxFiles: null,
            maxFilesize: this.filesize,
            acceptedFiles: ".jpg,.jpeg,.png,.gif",
            sending: (file, xhr, formData) => {
                formData.append('token', this.uptoken);
            },
            addedfile: function(file) {
                // 取消默认方法
                if (file.size > this_.filesize * 1024 * 1024) {
                    addtext.call(this, ['文件太大', '请上传' + this_.filesize + 'M', '以内的文件'], 'error', 100)
                }
            },
            init: function() {
                this.on("uploadprogress", function(file, com, size) {
                    addtext.call(this, '上传成功', 'success', com)
                });
            }
        }
        loadJs('/js/dropzone.js', () => {
            new Dropzone("#thumbnail", option).on('success', function(file) {
                this_.imgsrc = IMG_SERVER + JSON.parse(file.xhr.response).key;
                this_.upload(this_.imgsrc, this.element.id);
            });
            new Dropzone("#bannerUrl", option).on('success', function(file) {
                this_.imgsrc = IMG_SERVER + JSON.parse(file.xhr.response).key;
                this_.upload(this_.imgsrc, this.element.id);
            });;
            new Dropzone("#mobileBannerUrl", option).on('success', function(file) {
                this_.imgsrc = IMG_SERVER + JSON.parse(file.xhr.response).key;
                this_.upload(this_.imgsrc, this.element.id);
            });;

        })

    },
    methods: {
        upload(src, button_id) {
            let data = {
                id: this.$route.params.id
            }
            data[button_id] = src;
            $.ajax({
                type: 'post',
                url: API_URL + '/event/update',
                data: JSON.stringify(data),
                success: (data) => {
                    this.$message.success('保存成功')
                    if (button_id == 'bannerUrl') {
                        this.$emit('uploaded', src)
                    }
                    this.eventData[button_id] = src
                    console.log(this.eventData, src)
                }
            })
        }
    }
}
</script>
<style scoped>
.designImg {
    position: relative;
}

.designBar {
    background: #000;
    box-shadow: none !important;
}
</style>
