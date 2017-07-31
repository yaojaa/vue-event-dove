<template>
    <div>
        <div :class="button.class" style="position:relative" :id="button.id" v-html="button.text">
            <div class="comp-div"></div>
        </div>
    </div>
</template>
<script>
var addtext = function(text, type, com) {
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
import {
    getUptoken,
    loadJs
} from '../utils'
import {
    IMG_SERVER,
    upload
} from '../config'
export default {
    name: 'dropzoneUpfile',
    data() {
        return {
            uploadUrl: upload.uploadURL,
            token: '',
        }
    },
    props: {
        button: {
            type: Object,
            required: true
        },
        filesize: {
            type: Number,
            default: 1
        },
        filetype: {
            type: String,
            default: '.jpg,.jpeg,.png,.gif'
        }
    },
    mounted() {
        // 请求token
        this.uptoken = getUptoken()
        let this_ = this
        var option = {
            url: this.uploadUrl,
            maxFiles: null,
            maxFilesize: this.filesize,
            acceptedFiles: this.filetype,
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
            try {
                new Dropzone("#" + this.button.id, option).on('success', function(file) {
                    this_.imgsrc = IMG_SERVER + JSON.parse(file.xhr.response).key;
                    this_.$emit('uploaded', this_.imgsrc);
                });
            } catch (err) {
                console.log(err)
            }

        })
    },
    created() {},
    beforeDestroy() {
        $('.dz-hidden-input').remove();
    },
    methods: {

    }
}
</script>
<style scoped>
.comp-div {
    position: absolute;
    height: 100%;
    transition: all .2s linear;
    width: 0;
    background: #fff;
    left: 0;
    top: 0;
    opacity: .8;
    text-align: center;
    line-height: 36px;
}
</style>
