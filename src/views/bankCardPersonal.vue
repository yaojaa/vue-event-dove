<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn"><span class="text-muted f16">我的钱包</span>/添加个人账户</h2>
                    <a href="#" class="ui basic button blue mini" @click="$router.go(-1)">返回</a>
                </div>
                <div class="white-wrap p-lg">
                    <div class="ui form">
                        <div class="two fields">
                            <div class="field required">
                                <label>开户名称</label>
                                <input type="text" placeholder="请输入开户名称" v-vali="JSON.stringify({required: true})" filed="personalAccount.ownerName" v-model="personalAccount.ownerName" >
                                <div v-if="$verify.$errors['personalAccount.ownerName']" class="ui red basic pointing label">
                                    {{$verify.$errors['personalAccount.ownerName']}}
                                </div>
                            </div>
                            <div class="field required">
                                <label>身份证号码</label>
                                <input type="text" placeholder="请输入身份证号码" v-vali="JSON.stringify({required: true, isIdCard: true})" filed="personalAccount.ownerIdNumber" v-model="personalAccount.ownerIdNumber" >
                                <div v-if="$verify.$errors['personalAccount.ownerIdNumber']" class="ui red basic pointing label">
                                    {{$verify.$errors['personalAccount.ownerIdNumber']}}
                                </div>
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field required">
                                <label>开户银行</label>
                                <div class="ui selection dropdown">
                                  <input name="gender" type="hidden" value="default">
                                  <i class="dropdown icon"></i>
                                  <div class="text" :class="{'default':!personalAccount.bankName}">{{personalAccount.bankName || '请选择开户银行'}}</div>
                                  <div class="menu">
                                      <div class="item" :data-value="item.key" v-for="item in bankList">{{item.val}}</div>
                                  </div>
                                 </div>
                            </div>
                            <div class="field required">
                                <label>开户银行账号</label>
                                <input type="text" placeholder="请输入开户银行账号" v-vali="JSON.stringify({required: true})" filed="personalAccount.bankAccount" v-model="personalAccount.bankAccount" >
                                <div v-if="$verify.$errors['personalAccount.bankAccount']" class="ui red basic pointing label">
                                    {{$verify.$errors['personalAccount.bankAccount']}}
                                </div>
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field required">
                                <label>开户行省市</label>
                                <div class="two column fields">
                                    <div class="field">
                                        <input type="text" placeholder="请输入省份" v-vali="JSON.stringify({required: true})" filed="personalAccount.bankProvince" v-model="personalAccount.bankProvince" >
                                        <div v-if="$verify.$errors['personalAccount.bankProvince']" class="ui red basic pointing label">
                                            {{$verify.$errors['personalAccount.bankProvince']}}
                                        </div>
                                    </div>
                                    <div class="field">
                                        <input type="text" placeholder="请输入城市" v-vali="JSON.stringify({required: true})" filed="personalAccount.bankCity" v-model="personalAccount.bankCity" >
                                        <div v-if="$verify.$errors['personalAccount.bankCity']" class="ui red basic pointing label">
                                            {{$verify.$errors['personalAccount.bankCity']}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="field required">
                                <label>开户支行信息</label>
                                <input type="text" placeholder="请输入开户支行名称" v-vali="JSON.stringify({required: true})" filed="personalAccount.bankBranch" v-model="personalAccount.bankBranch" >
                                <div v-if="$verify.$errors['personalAccount.bankBranch']" class="ui red basic pointing label">
                                    {{$verify.$errors['personalAccount.bankBranch']}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-lg text-center">
                        <button class="ui button blue large" @click="submitAccount">提交</button>
                    </div>
                </div>
            </div>
        </div>
        <footers></footers>
    </div>
</template>
<script>
import {
    API_URL
} from '../config'
import header from '../components/header'
import footer from '../components/footer'
export default {
    verify:true,
    data() {
        return {
            bankList: [],
            personalAccount: {
                bankName: '',
                bankCity: '',
                bankBranch: '',
                bankProvince: '',
                ownerName: '',
                ownerIdNumber: '',
                bankAccount: ''
            }
        }
    },
    mounted() {
        if (this.$route.query.accountId) {
            this.mywallet();
        }
        let _this = this;
        $('.dropdown').dropdown({
            onChange: function(value, text, $selectedItem) {
              _this.personalAccount.bankName = value;
            }
        })
        this.getBankList();
    },
    methods: {
        // 我的钱包信息
        mywallet() {
            let _this = this;
            jQuery.ajax({
                url: API_URL + "/wallet/getWalletDetail",
                type: "GET"
            })
            .done((data, textStatus, jqXHR) => {
                let arr = data.personalAccount;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].accountId === _this.$route.query.accountId) {
                        _this.personalAccount = arr[i];
                        return;
                    }
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                _this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        },
        // 获取银行列表
        getBankList () {
            let _this = this;
            jQuery.ajax({
                url: API_URL + "/wallet/getBankList",
                type: "get"
            })
            .done(function(data, textStatus, jqXHR) {
                _this.bankList = data;
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                _this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        },
        // 提交个人账户添加信息
        async submitAccount () {
            try {
                await this.$verify.check().then()
            } catch (e) {
                return false
            }
            let _this = this;
            let personalAccountUrl = '/wallet/addPersonalAccount';
            if (_this.$route.query.accountId) {
                personalAccountUrl = '/wallet/updatePersonalAccountById';
            }
            jQuery.ajax({
                url: API_URL + personalAccountUrl,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(_this.personalAccount)
            })
            .done(function(data, textStatus, jqXHR) {
                _this.$router.replace({
                    path: '/bankCardSuccess',
                    query: {
                        type: '个人账户',
                        bankName: _this.personalAccount.bankName,
                        bankAccount: _this.personalAccount.bankAccount
                    }
                });
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                _this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        }
    },
    components: {
        headers: header,
        footers: footer,
    }
}
</script>
<style scoped>
</style>
