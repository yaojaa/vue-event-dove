<template>
    <div>
        <div class="ui mini modal" id="paypal-layer">
            <i class="close icon"></i>
            <div class="header">
                {{paypalAccountId?'修改':'添加'}}PayPal账户
            </div>
            <div class="content">
                <div class="ui form">
                    <div class="field">
                        <label for="">贝宝账户:</label>
                        <input type="text" placeholder="请输入贝宝账户邮箱" v-vali="JSON.stringify({required: true,isEmail:true})" filed="paypalAccount" v-model="paypalAccount">
                        <div v-if="$verify.$errors['paypalAccount']" class="ui red basic pointing label">
                            {{$verify.$errors['paypalAccount']}}
                        </div>
                    </div>
                    <div class="field text-right actions">
                        <a class="cancel" href="https://www.paypal-biz.com/sem/brandV5.html?kw=BaiduBrandzoneTital&mpch=ads&mplx=27736-206046-50088-2" target="_blank">我还没有贝宝账户？</a>&nbsp;
                    </div>
                    <div class="field">
                        <label for="">钱包取款密码:</label>
                        <div class="six fields" @keydown.8="backInput">
                            <div class="field n-mb">
                                <input type="password" maxlength="1" class="text-center" v-model="pwd[0]">
                            </div>
                            <div class="field n-mb">
                                <input type="password" maxlength="1" class="text-center" v-model="pwd[1]">
                            </div>
                            <div class="field n-mb">
                                <input type="password" maxlength="1" class="text-center" v-model="pwd[2]">
                            </div>
                            <div class="field n-mb">
                                <input type="password" maxlength="1" class="text-center" v-model="pwd[3]">
                            </div>
                            <div class="field n-mb">
                                <input type="password" maxlength="1" class="text-center" v-model="pwd[4]">
                            </div>
                            <div class="field n-mb">
                                <input type="password" maxlength="1" class="text-center" v-model="pwd[5]">
                            </div>
                        </div>
                        <input type="hidden" v-vali="JSON.stringify({required: true,isNumber:true,minLength: 6})" filed="paypalAccountPwd" v-model="paypalAccountPwd">
                        <div v-if="$verify.$errors['paypalAccountPwd']" class="ui red basic pointing label">
                            {{$verify.$errors['paypalAccountPwd']}}
                        </div>
                    </div>
                    <div class="field text-right actions">
                        <router-link class="cancel" :to="{path:'/account',query:{layerFlag:'atmPassword'}}">去设置支付密码</router-link>
                    </div>
                </div>
            </div>
            <div class="actions text-center">
                <div class="ui button blue" @click="addPaypal">确定</div>
                <div class="ui ok button cancel">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    API_URL
} from '../config'

export default {
    verify:true,
    props: ['item'],
    data () {
        return {
            ERROR_LOGIN_FAILURE: 1,
            paypalAccountId: '',
            paypalAccount: '',
            pwd: ['','','','','','']
        }
    },
    computed: {
        // 贝宝账户密码
        paypalAccountPwd() {
            let str = '',flag = false;
            this.pwd.forEach((k, v) => {
                if (!flag) {
                    if(k.length === 0){
                        $('[type=password]').eq(v).focus();
                        flag = true;
                    }
                }
                str += k;
            });
            return str;
        }
    },
    mounted () {
        if (this.item) {
            this.paypalAccountId = this.item.accountId;
            this.paypalAccount = this.item.account;
        }
        // 贝宝账户弹窗
        $('#paypal-layer').modal({
            onHide: (el) => {
                this.$emit('updateLayerFlag', '');
            },
            onHidden: () => {
                $('#paypal-layer').remove();
            }
        }).modal('show');
    },
    methods: {
        // 返回上一个输入框
        backInput (e) {
            if ($(e.target).val().length > 0) {
                $(e.target).focus();
            } else {
                $(e.target).closest('.field').prev('.field').find('[type=password]').focus();
            }   
        },
        // 添加贝宝账户
        async addPaypal() {
            try {
                await this.$verify.check().then()
            } catch (e) {
                return false
            }
            let _this = this,
                url = '/wallet/addPaypalAccount';
            let data = {
                account: this.paypalAccount,
                password: this.paypalAccountPwd
            }
            let msg = '添加贝宝账户成功';
            if (this.paypalAccountId) {
                data.accountId = this.paypalAccountId;
                url = '/wallet/updatePaypalAccount';
                msg = '修改贝宝账户成功';
            }
            jQuery.ajax({
                url: API_URL + url,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(data)
            })
            .done((data, textStatus, jqXHR) => {
                $('#paypal-layer').modal('hide');
                this.$message(msg);
                this.$emit('getWallet', '');
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        }
    }
}
</script>

<style scoped>
    .n-mb{
        margin-bottom:0 !important;
    }
</style>