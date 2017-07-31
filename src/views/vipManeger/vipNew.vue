<template>
    <div class="ui container">
        <div class="sub-title text-justify">
            <h2 class="fwn"><a href="#" class="text-muted f16">会员</a>/新建会员</h2>
        </div>
        <div class="ui accordion">
            <div class="white-wrap p-lg">
                <div class="active title f16"><i class="dropdown icon"></i> 基本信息设置</div>
                <div class="active content mt-sm">
                    <div class="ui grid">
                        <div class="row">
                            <div class="three wide column">
                                <div class="ui small image">
                                    <img src="/images/pp01.png">
                                    <div class="mt-sm text-center"><a href="###">上传会员徽标</a></div>
                                </div>
                            </div>
                            <div class="thirteen wide column">
                                <div class="ui grid form">
                                    <div class="row">
                                        <div class="two wide middle aligned column">会员类型<span class="text-red">*</span></div>
                                        <div class="fourteen wide column">
                                            <div class="field">
                                                <input type="text" placeholder="输入名称">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="two wide middle aligned column">域名<span class="text-red">*</span></div>
                                        <div class="fourteen wide column">
                                            <div class="field">
                                                <div class="ui right labeled input">
                                                    <div class="ui basic label">http://</div>
                                                    <input type="text" value="2017gmgct">
                                                    <div class="ui basic label">.eventdove.com</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="two wide top aligned column">简介</div>
                                        <div class="fourteen wide column">
                                            <div class="field">
                                                <textarea rows="2" placeholder="简单介绍您的会员"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="white-wrap p-lg">
                <div class="title f16"><i class="dropdown icon"></i> 会费设置 </div>
                <div class="content">
                    <div class="ui form mt-sm">
                        <div class="ui grid">
                            <div class="row">
                                <div class="two wide column">是否收费：</div>
                                <div class="fourteen wide column">
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" checked>
                                        <label class="text-muted">收费</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="two wide column">收费币种：</div>
                                <div class="fourteen wide column">
                                    <div class="inline fields mb-n">
                                        <div class="field">
                                            <div class="ui radio checkbox">
                                                <input type="radio" name="fruit" checked="">
                                                <label>人民币（¥）</label>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui radio checkbox">
                                                <input type="radio" name="fruit">
                                                <label>美元（$）</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="two wide column middle aligned">会员费：</div>
                                <div class="fourteen wide column">
                                    <div class="inline fields mb-n">
                                        <div class="field">
                                            <select class="ui dropdown">
                                                <option value="1">不收费</option>
                                                <option value="2">按月收费(从缴费起之日算31天)</option>
                                                <option value="3">按季度收费(从缴费起之日算92天)</option>
                                                <option value="4">按年收费(从缴费起之日算366天)</option>
                                                <option value="5">按自然年(到本年度12月31日止)</option>
                                            </select>
                                        </div>
                                        <div class="field">
                                            <div class="ui right labeled input">
                                                <input type="text" placeholder="请输入快递费用" value="0">
                                                <div class="ui basic label">/月</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="two wide column">费用说明：</div>
                                <div class="fourteen wide column">
                                    <textarea rows="3" placeholder="会员缴费时会看到此段说明，您可以将缴费后的会员权益等说明写在这里"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="white-wrap p-lg">
                <div class="title f16"><i class="dropdown icon"></i> 会员信息采集 </div>
                <div class="content">
                    <table class="ui huge padded unstackable table  mt-sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th width="15%">添加</th>
                                <th width="15%">必填</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>姓名</td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" checked="" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>邮箱</td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" checked="" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>手机号</td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" checked="" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>部门</td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" checked="" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>职位</td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" checked="" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>公司/机构</td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" checked="" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>所属行业</td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" checked="" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>所在城市</td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="ui toggle checkbox">
                                        <input type="checkbox" name="public" checked="" class="hidden" tabindex="0">
                                        <label></label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="text-center mt-lg">
            <button class="ui button blue">保存</button>
        </div>
    </div>
</template>
<script>
import {
    API_URL
} from '../../config'
export default {
    data() {
            return {

            }
        },
        mounted() {
            $(function() {
                $('.ui.accordion').accordion()
                $('.ui.checkbox').checkbox()
                $('select.dropdown').dropdown()
                    //$('.ui.modal').modal('show')  
            })
        },
        methods: {
            //续费
            renew: function() {

            }
        },
        components: {

        }
}
</script>
<style scoped>
</style>
