<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">参会人员</span>/退票设置</h2>
            </div>
            <div class="white-wrap p-xl">
                <div class="ui form">
                    <div class="ui  grid">
                        <div class="fourteen wide column ">
                            <div class="mb-sm">
                                <div class="ui padded grid bg-gray">
                                    <div class="three wide middle aligned right aligned column">
                                        距活动开始剩余：
                                    </div>
                                    <div class="five wide column bottom aligned">
                                        <div class="ui fluid right labeled input">
                                            <input type="text" placeholder="例如：3">
                                            <div class="ui basic label">天</div>
                                        </div>
                                    </div>
                                    <div class="three wide middle aligned right aligned column">
                                        应扣退票费：
                                    </div>
                                    <div class="five wide column bottom aligned">
                                        <div class="ui fluid right labeled input">
                                            <input type="text" placeholder="例如：10">
                                            <div class="ui basic label">%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="two wide bottom aligned column">
                            <div class="mb-lg">
                                <i class="add circle icon blue large"></i>
                                <i class="minus circle icon large"></i>
                            </div>
                        </div>
                        <div class="row">
                            <div class="wide column text-orange">提示：退票金额是去除会鸽手续费及支付通道费后剩余的总金额</div>
                        </div>
                    </div>
                    <div class="text-center mt-lg">
                        <button type="submit" class="ui button blue">保存</button>
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
export default {
    // name: '',
    data() {
            return {
                msg: 'Welcome to Event Dove'
            }
        },
        mounted: function() {
            $('#footer').show();
            $('.menu .item').tab()
            $('.multiselects.ui.dropdown').dropdown({
                allowAdditions: true
            })
        },
        components: {

        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
