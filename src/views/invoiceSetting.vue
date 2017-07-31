<template>
    <div class="pusher">
       
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">发票设置</span></h2>
            </div>
            <div class="white-wrap p-xl">
                <div class="ui form">
                    <div class="ui grid">
                        <div class="three wide column left floated">是否开启发票设置</div>
                        <div class="one wide column right floated">
                            <div class="field">
                                <div class="ui toggle checkbox">
                                    <input type="checkbox" name="gift" tabindex="0" class="hidden">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui grid">
                        <div class="two wide column">发票类型：</div>
                        <div class="twelve wide column">
                            <div class="inline fields">
                                <div class="fourteen wide field">
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" name="fruit" checked="">
                                            <label>普通发票</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" name="fruit">
                                            <label>增值税专用发票</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" name="fruit">
                                            <label>普通机打发票</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="two wide column">234234</div>
                    </div>
                    <div class="ui grid">
                        <div class="two wide column">服务项目</div>
                        <div class="twelve wide column"><input type="text" placeholder="12 Wide"></div>
                        <div class="two wide column"><div class="ui primary button">关注</div></div>
                    </div>
                    <div class="ui grid">
                        <div class="two wide column">税点设置</div>
                        <div class="twelve wide column">
                            <div class="inline fields">
                                <div class="field">
                                    <div class="ui radio checkbox">
                                        <input type="radio" name="fruit" checked="">
                                        <label>不需要</label>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="ui radio checkbox">
                                        <input type="radio" name="fruit">
                                        <label>需要收取税点费</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="two wide column"></div>
                    </div>
                    <div class="ui grid">
                        <div class="two wide column">领取方式</div>
                        <div class="twelve wide column">
                            <div class="inline fields">
                                <div class="field">
                                    <div class="ui radio checkbox">
                                        <input type="radio" name="fruit" checked="">
                                        <label>可现场领取</label>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="ui radio checkbox">
                                        <input type="radio" name="fruit">
                                        <label>快递寄送</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="two wide column"></div>
                    </div>
                    <div class="ui grid">
                        <div class="two wide column">拆分发票</div>
                        <div class="twelve wide column">
                            <div class="inline fields">
                                <div class="field">
                                    <div class="ui radio checkbox">
                                        <input type="radio" name="fruit" checked="">
                                        <label>不可拆分</label>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="ui radio checkbox">
                                        <input type="radio" name="fruit">
                                        <label>可拆分开票</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="two wide column"></div>
                    </div>
                    <div class="ui grid">
                        <div class="two wide column"></div>
                        <div class="twelve wide column">
                            <p>提示：拆分开票是指将订单支付总金额根据每个参会者对应购憭价分开开票</p>
                        </div>
                        <div class="two wide column"></div>
                    </div>
                    <div class="ui grid">
                        <div class="four column centered row">
                            <div class="ui primary button">关注</div>
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
} from '../config'
export default {
    // name: '',
    data() {
            return {
                msg: 'Welcome to Event Dove'
            }
        },
        mounted: function() {
            $('.ui.checkbox').checkbox();
            $('#footer').show()
            $('.menu .item').tab()
            $('.admin-avatar')
              .popup({
                position   : 'bottom center'
            })
        },
        components: {

        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
