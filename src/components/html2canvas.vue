<template>
    <div>
        <div @click="getFeedbackPage" class="sidebar-float" id="feedbackBtn">
            <div class="ui button" data-tooltip="问题反馈" data-position="left center">
                <i class=" big inbox icon"></i>
            </div>
        </div>
        <div class="ui small modal" v-ui="'#feedbackBtn'">
            <div class="header bg-gray text-default ">
                反馈信息
            </div>
            <i class="close icon text-blue"></i>
            <div class="ui  segment basic form mt-n">
                <div class="ui segment">
                    <div class="tow fields">
                        <label for="feedbackType">选择您的反馈类型：</label>
                        <div class="field">
                            <div class="ui radio checkbox">
                                <input type="radio" name="type" value="problem" v-model="formData.type">
                                <label>问题反馈</label>
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui radio checkbox">
                                <input type="radio" name="type" value="suggestion" v-model="formData.type">
                                <label>功能建议</label>
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui radio checkbox">
                                <input type="radio" name="type" value="demand" v-model="formData.type">
                                <label>需求建议</label>
                            </div>
                        </div>
                        <div class="field">
                            <div class="ui radio checkbox">
                                <input type="radio" name="type" value="other" v-model="formData.type">
                                <label>其他</label>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui toggle checkbox" id="uploadSnap">
                            <input type="checkbox" name="privacy" v-model="formData.upImg">
                            <label>上传屏幕截图</label>
                        </div>
                    </div>
                    <div class="field">
                        <label>内容</label>
                        <textarea style="height:120px" v-model="formData.content" v-vali="JSON.stringify({required:true,minLength:10,maxLength:560})" filed="formData.content"></textarea>
                        <div v-if="$verify.$errors['formData.content']" class="ui red basic  pointing label">
                            {{$verify.$errors['formData.content']}}
                        </div>
                    </div>
                </div>
                <div class="ui segment snapshoot-content">
                    <div class="ui active dimmer" id="snapshoot-dimmer">
                        <div class="ui indeterminate text loader">正在载入截图</div>
                    </div>
                    <canvas width="100%" height="450" class="snapshoot">
                        <h3>您的浏览器不支持屏幕截图功能。</h3>>
                    </canvas>
                </div>
                <div class="ui modal" id='pop-up'>
                    <i class="close icon"></i>
                    <div class="header bg-gray">
                    </div>
                    <div class="content">
                        <img src="/images/icon_31.png">
                        <div class="content-description">
                            感谢您的耐心与建议，您的反馈我们已经收到，我们的工作人员会在最短内时间处理。
                        </div>
                    </div>
                    <div class="actions">
                        <div @click="cleanModal" class="ui button">确定</div>
                    </div>
                </div>
                <div class="field"></div>
                <div @click="submitFeedback" style="margin-right:0;display:block" class="ui submit button">提交</div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    loadJs
} from '../utils'
import {
    API_URL
} from '../config'
export default {
    name: 'htmltoCanvas',
    verify: true,
    data() {
        return {
            msg: 'Welcome to Event Dove',
            formData: {
                upImg: true,
                src: '',
                content: '',
                type: 'problem'

            }
        }
    },
    mounted() {
        loadJs('/js/html2canvas.js', () => {
            $('.ui.radio.checkbox').checkbox();
            $('.ui.toggle.checkbox').checkbox();
        })
    },
    methods: {
        cleanModal() {
            $(".ui.modal").modal('hide');
        },
        async submitFeedback() {
            try {
                await this.$verify.check().then()
            } catch (e) {
                return false
            }
            var self = this;
            var formData = JSON.parse(JSON.stringify(this.formData));
            delete formData.src;
            delete formData.upImg;
            var values = Object.values(formData);
            var status = true;
            values.map((value) => {
                if (value == '')
                    status = false
            })
            if (!status) {
                return self.$message.error("您有未填写的表单项！");
            }
            var snapshoot = document.querySelector(".snapshoot");
            if (snapshoot != null) {
                if (this.formData.upImg == false) {
                    this.formData.src = '';
                } else {
                    this.formData.src = snapshoot.toDataURL();
                }
            } else {
                this.formData.src = '';
            }
            jQuery.ajax({
                url: API_URL + "help/feedback",
                type: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                contentType: "application/json",
                data: JSON.stringify(this.formData),
                success: function (data, req, xhr) {

                    if (xhr.status == 200) {
                        //提交成功
                        $('#pop-up').modal('show');
                    }
                },
                error(err) {
                    self.$message.error("服务器连接错误！")
                }
            })
        },
        getFeedbackPage() {
            this.formData.content = '';
            supportCanvas();
            if (isIE()) {
                $(".ui.segment.snapshoot-content").remove();
                $("#uploadSnap").remove();
                this.formData.upImg = false;
                return
            }

            reloadDom(function () {
                takeScreenshot(function (canvas, moveToTop) {
                    //移除加载遮罩
                    $("#snapshoot-dimmer").removeClass("active").addClass("disabled");
                    var paint = document.getElementsByClassName("snapshoot")[0];
                    var ptx = paint.getContext('2d');
                    paintReminder(function () {
                        var theDom = document.getElementsByClassName("snapshoot-content")[0];
                        var domInHTML = theDom.innerHTML;
                        theDom.innerHTML = "";
                        theDom.innerHTML = domInHTML
                        var paint = document.getElementsByClassName("snapshoot")[0];
                        var ptx = paint.getContext('2d');
                        //快速重新绘制背景
                        ptx.clearRect(0, 0, 9999999, 999999)
                        var c = new Image();
                        c.src = canvas;
                        c.onload = function () //确保图片已经加载完毕
                        {
                            ptx.scale(0.35, 0.45);
                            ptx.drawImage(c, 0, -moveToTop);
                            painting(paint, ptx);
                        }
                    });


                    function paintReminder(callback) {
                        //开始一个新的绘制路径
                        ptx.lineWidth = 4;
                        ptx.beginPath();
                        //设置弧线的颜色为蓝色
                        ptx.strokeStyle = "red";
                        var circle = {
                            x: parseInt(((paint.width)) / 2),    //圆心的x轴坐标值
                            y: parseInt(((paint.height)) / 2),    //圆心的y轴坐标值
                            r: paint.height / 3   //圆的半径
                        };

                        paintArc(function () {
                            callback()
                        });
                        function paintArc(callback) {
                            var radian = 0.01;
                            var sradian = 0
                            var interval = setInterval(function () {
                                radian = radian + 0.01;
                                //绘制弧线
                                ptx.arc(circle.x, circle.y, circle.r, sradian * Math.PI, radian * Math.PI, false);
                                sradian = radian;
                                ptx.stroke();
                                if (radian >= 2) {
                                    clearInterval(interval);
                                    callback()
                                }
                            }, 4)
                        }

                    }
                    function painting(paint, ptx) {
                        paint.onmousedown = function (event) {
                            var scaleX = 0.35;
                            var scaleY = 0.45;
                            ptx.save();
                            var absoluteX = $(".snapshoot").offset().left;
                            var absoluteY = $(".snapshoot").offset().top - $(document).scrollTop();
                            var event = event || window.event;
                            ptx.moveTo(parseInt((event.clientX - absoluteX) / scaleX), parseInt((event.clientY - absoluteY) / scaleY))
                            paint.onmousemove = function (event) {
                                var event = event || window.event;
                                ptx.lineTo(parseInt((event.clientX - absoluteX) / scaleX), parseInt((event.clientY - absoluteY) / scaleY));
                                ptx.strokeStyle = "#FF0000";
                                ptx.lineWidth = '6px';
                                ptx.stroke();
                            }
                            paint.onmouseup = function () {
                                paint.onmousemove = null;
                            }
                            paint.onmouseout = function () {
                                paint.onmousemove = null;
                            }
                            ptx.restore();
                        }
                    }
                });
            });

            function reloadDom(callback) {
                var theDom = document.getElementsByClassName("snapshoot-content")[0];
                var domInHTML = theDom.innerHTML;
                theDom.innerHTML = "";
                theDom.innerHTML = domInHTML
                callback();
            }
            function isIE() {
                if (!!window.ActiveXObject || "ActiveXObject" in window)
                    return true;
                else
                    return false;
            }
            function supportCanvas() {
                 var snapshoot = document.querySelector(".snapshoot");
                if (!snapshoot || !snapshoot.getContext) {
                    return;
                }
            }

            function takeScreenshot(callback) {
                var vbody = $(document.body);
                //删除滚动多图样式
                vbody.find("div.swiper-slide *").not(".swiper-slide.swiper-slide-active,.swiper-slide.swiper-slide-prev").each(function () {
                    $(this).remove();
                });
                var docHeight = document.body.scrollHeight;
                var scrollHeight = $(document).scrollTop();
                var element = document.elementFromPoint(scrollHeight, 0);
                var clientHeight = document.documentElement.clientHeight;
                // 卷曲占比
                var scrollViewScale = scrollHeight / docHeight;
                // 客户端可见区占比
                var clientHeightScale = clientHeight / docHeight;
                var snapshoot = document.getElementsByClassName("snapshoot")[0];
                var ctx = snapshoot.getContext("2d");
                // 不允许跨域
                html2canvas(vbody, {
                    allowTaint: false,
                    useCORS: true
                }).then(function (canvas) {
                    // 宽高占比
                    var viewidth = canvas.width * 0.35
                    var viewheight = canvas.height * clientHeightScale * 0.44
                    var moveToTop = canvas.height * scrollViewScale * 1;
                    document.querySelector(".snapshoot").setAttribute("width", viewidth)
                    document.querySelector(".snapshoot").setAttribute("height", viewheight)
                    var img = new Image();
                    img.src = canvas.toDataURL();
                    ctx.save();
                    img.onload = function () //确保图片已经加载完毕
                    {
                        ctx.scale(0.35, 0.45);
                        ctx.drawImage(img, 0, -moveToTop);
                        ctx.restore()
                        callback(canvas.toDataURL(), moveToTop);
                    }
                });
            }
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
