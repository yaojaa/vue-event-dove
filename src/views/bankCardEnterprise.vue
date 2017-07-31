<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn"><span class="text-muted f16">我的钱包</span>/添加企业账户</h2>
                    <a href="#" class="ui basic button blue mini" @click="$router.go(-1)">返回</a>
                </div>
                <div class="white-wrap p-lg">
                    <div class="sub-item-title">
                        <div class="text-justify">
                            <div class="tit">
                                <em style="position:inherit">1</em>
                                <h3>请填写企业的基本信息</h3>
                            </div>
                        </div>
                    </div>
                    <div class="ui divider"></div>
                    <div class="ui form">
                        <div class="two fields">
                            <div class="field required">
                                <label>企业名称</label>
                                <input type="text" placeholder="请输入企业名称" v-vali="JSON.stringify({required: true})" filed="businessAccount.companyName" v-model="businessAccount.companyName">
                                <div v-if="$verify.$errors['businessAccount.companyName']" class="ui red basic pointing label">
                                    {{$verify.$errors['businessAccount.companyName']}}
                                </div>
                            </div>
                            <div class="field required">
                                <label>企业法人身份证</label>
                                <input type="text" placeholder="请输入企业法人身份证号码" v-vali="JSON.stringify({required: true, isIdCard: true})" filed="businessAccount.representativeId" v-model="businessAccount.representativeId">
                                <div v-if="$verify.$errors['businessAccount.representativeId']" class="ui red basic pointing label">
                                    {{$verify.$errors['businessAccount.representativeId']}}
                                </div>
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field required">
                                <label>企业法人姓名</label>
                                <input type="text" placeholder="请输入企业法人姓名" v-vali="JSON.stringify({required: true})" filed="businessAccount.representativeName" v-model="businessAccount.representativeName">
                                <div v-if="$verify.$errors['businessAccount.representativeName']" class="ui red basic pointing label">
                                    {{$verify.$errors['businessAccount.representativeName']}}
                                </div>
                            </div>
                            <div class="field required">
                                <label>联系方式</label>
                                <input type="text" placeholder="请输入联系方式" v-vali="JSON.stringify({required: true, isMobile: true})" filed="businessAccount.contact" v-model="businessAccount.contact">
                                <div v-if="$verify.$errors['businessAccount.contact']" class="ui red basic pointing label">
                                    {{$verify.$errors['businessAccount.contact']}}
                                </div>
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field required">
                                <label>图形验证码</label>
                                <div class="two fields">
                                    <div class="field">
                                        <input type="text" v-model="inputCaptcha" v-vali="JSON.stringify({required: true})" maxlength="4" filed="inputCaptcha" placeholder="输入4位验证码">
                                        <div v-if="$verify.$errors['inputCaptcha']" class="ui red basic pointing label">
                                            {{$verify.$errors['inputCaptcha']}}
                                        </div>
                                    </div>
                                    <div class="five wide field SVG_CAPTCHA" @click="getCaptcha">
                                    </div>
                                </div>
                            </div>
                            <div class="field required">
                                <label>短信验证码</label>
                                <div class="two fields">
                                    <div class="field">
                                        <input type="text" placeholder="请输入验证码" v-vali="JSON.stringify({required: true})" filed="verificationCode" v-model="verificationCode" @blur="checkVerificationCode">
                                        <div v-if="$verify.$errors['verificationCode']" class="ui red basic pointing label">
                                            {{$verify.$errors['verificationCode']}}
                                        </div>
                                    </div>
                                    <div class="field">
                                        <button class="ui button basic fluid" @click="sendSimCode">发送验证码</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field required">
                            <label>上传营业执照</label>
                            <div class="inline fields">
                                <div class="field">
                                    <div class="ui small image centered">
                                        <img :src="businessAccount.licenseImageUrl">
                                    </div>
                                </div>
                                <div class="field">
                                    <p class="text-muted fwn f14">社会团体上传登记证书，企业上传营业执照 若办理过三证合一的企业，请上传最新的营业执照 格式要求：原件照片、扫描件或复印件加盖企业公章后的扫描件支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。</p>
                                    <div class="ui divider hidden"></div>
                                    <div class="upload_box mt-lg">
                                        <a class="ui button teal">立即上传</a>
                                        <input class="ui button teal" type="file" @change="uploadImg">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ui divider hidden"></div>
                    <div class="sub-item-title">
                        <div class="text-justify">
                            <div class="tit">
                                <em style="position:inherit">2</em>
                                <h3>填写银行账号</h3>
                            </div>
                        </div>
                    </div>
                    <div class="ui divider"></div>
                    <div class="ui form">
                        <div class="two fields">
                            <div class="field required">
                                <label>选择银行</label>
                                <div class="ui selection dropdown">
                                    <input name="gender" type="hidden" value="default">
                                    <i class="dropdown icon"></i>
                                    <div class="text" :class="{'default':!businessAccount.bankName}">{{businessAccount.bankName || '请选择开户银行'}}</div>
                                    <div class="menu">
                                        <div class="item" :data-value="item.key" v-for="item in bankList">{{item.val}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="field required">
                                <label>开户银行所在城市</label>
                                <div class="two column fields">
                                    <div class="field">
                                        <input type="text" placeholder="请输入省份" v-vali="JSON.stringify({required: true})" filed="businessAccount.bankProvince" v-model="businessAccount.bankProvince">
                                        <div v-if="$verify.$errors['businessAccount.bankProvince']" class="ui red basic pointing label">
                                            {{$verify.$errors['businessAccount.bankProvince']}}
                                        </div>
                                    </div>
                                    <div class="field">
                                        <input type="text" placeholder="请输入城市" v-vali="JSON.stringify({required: true})" filed="businessAccount.bankCity" v-model="businessAccount.bankCity">
                                        <div v-if="$verify.$errors['businessAccount.bankCity']" class="ui red basic pointing label">
                                            {{$verify.$errors['businessAccount.bankCity']}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field required">
                                <label>开户银行支行名称</label>
                                <input type="text" placeholder="请输入开户银行支行名称" v-vali="JSON.stringify({required: true})" filed="businessAccount.bankBranch" v-model="businessAccount.bankBranch">
                                <div v-if="$verify.$errors['businessAccount.bankBranch']" class="ui red basic pointing label">
                                    {{$verify.$errors['businessAccount.bankBranch']}}
                                </div>
                            </div>
                            <div class="field required">
                                <label>银行卡号</label>
                                <input type="text" placeholder="请输入银行卡号" v-vali="JSON.stringify({required: true})" filed="businessAccount.bankAccount" v-model="businessAccount.bankAccount">
                                <div v-if="$verify.$errors['businessAccount.bankAccount']" class="ui red basic pointing label">
                                    {{$verify.$errors['businessAccount.bankAccount']}}
                                </div>
                                <div class="mt-xs f12 text-muted">此银行卡的开户名必须为企业的法人</div>
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
    API_URL,
    IMG_SERVER
} from '../config'
import Auth from '../auth'
import header from '../components/header'
import footer from '../components/footer'

/**60s*/
var timers = function(el) {
    var time = 60;
    var interval = setInterval(function() {
        time--
        el.innerHTML = time

        if (time <= 0) {
            clearInterval(interval)
            el.innerHTML = '发送验证码'
            el.disabled = false
        }
    }, 1000)
}

export default {
    verify: true,
    data() {
        return {
            businessAccount: {
                bankName: '',
                licenseImageUrl: '/images/yyz.jpg',
                bankCity: '',
                contact: '',
                bankProvince: '',
                bankBranch: '',
                companyName: '',
                representativeName: '',
                representativeId: '',
                bankAccount: ''
            },
            inputCaptcha: '',
            captcha: '',
            sessionId: '',
            captchaToken: '',
            simToken: '',
            verificationCode: '',
            updateToken: null,
            bankList: []
        }
    },
    mounted() {
        if (this.$route.query.accountId) {
            this.mywallet();
        }
        let _this = this;
        $('.dropdown').dropdown({
            onChange: function(value, text, $selectedItem) {
                _this.businessAccount.bankName = value;
            }
        })
        Auth.getCaptcha(this);
        this.getBankList();
        this.getUploadToken();
    },
    methods: {
        // 我的钱包信息
        mywallet() {
            let _this = this;
            jQuery.ajax({
                    url: API_URL + "wallet/getWalletDetail",
                    type: "GET"
                })
                .done((data, textStatus, jqXHR) => {
                    let arr = data.businessAccount;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].accountId === _this.$route.query.accountId) {
                            _this.businessAccount = arr[i];
                            return;
                        }
                    }
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    _this.$message(JSON.parse(jqXHR.responseText).responseText);
                });
        },
        // 更新图片验证码
        getCaptcha() {
            Auth.getCaptcha(this)
        },
        // 发送短息验证码
        sendSimCode(e) {
            let _this = this;
            let data = {
                captcha: this.inputCaptcha,
                phone: this.businessAccount.contact,
                token: this.captchaToken,
                sessionId: this.sessionId
            }
            Auth.getMobileCaptcha(this, data).then(response => {
                e.target.innerHTML = '短信已发送'
                e.target.disabled = true
                timers(e.target)
            }).catch(e => {
                _this.$message(JSON.parse(e.responseText).responseText);
                this.error = e
            })
        },
        // 检查验证码是否正确
        checkVerificationCode() {
            let _this = this;
            let data = {
                phone: this.businessAccount.contact,
                verificationCode: this.verificationCode,
                token: this.simToken,
            }
            jQuery.ajax({
                    url: API_URL + "user/checkVerificationCode",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(data)
                })
                .done(function(data, textStatus, jqXHR) {
                    _this.$message('短信验证码验证成功');
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    _this.$message(JSON.parse(jqXHR.responseText).responseText);
                });
        },
        // 获取上传图片token
        getUploadToken() {
            $.ajax({
                url: "/uptoken",
                success: (res) => {
                    this.updateToken = res.uptoken;
                }
            })
        },
        // 上传图片
        uploadImg(e) {
            let _url = "http://up.qiniu.com";
            let _token = '';
            let _file = e.target.files[0];
            let _this = this;
            let _formData = new FormData();
            _formData.append('token', _this.updateToken);
            _formData.append('file', _file);
            let _xhr = new XMLHttpRequest();
            _xhr.open('POST', _url, true);
            // 上传开始
            _xhr.upload.onloadstart = function() {
                    $(e.target).closest('.upload_box').find('a').text('上传中');
                }
                // ajax服务器返回处理
            _xhr.onreadystatechange = function(response) {
                if (_xhr.readyState == 4 && _xhr.status == 200 && _xhr.responseText != "") {
                    let _blkRet = JSON.parse(_xhr.responseText);
                    let _img = $(e.target).closest('.two.fields').find('img');
                    _this.businessAccount.licenseImageUrl = IMG_SERVER + _blkRet.key
                    $(e.target).closest('.upload_box').find('a').text('上传完成');
                } else if (_xhr.status != 200 && _xhr.responseText) {
                    _this.$message('上传失败');
                }
            };
            //请求失败
            _xhr.onerror = function() {
                _this.$message('请求上传失败');
            };
            _xhr.send(_formData);
        },
        // 提交企业账户添加信息
        async submitAccount() {
            try {
                await this.$verify.check().then()
            } catch (e) {
                return false
            }
            let _this = this;
            let businessAccountUrl = 'wallet/addBusinessAccount';
            if (_this.$route.query.accountId) {
                businessAccountUrl = 'wallet/updateBusinessAccountById';
            }
            jQuery.ajax({
                    url: API_URL + businessAccountUrl,
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(_this.businessAccount)
                })
                .done(function(data, textStatus, jqXHR) {
                    _this.$router.replace({
                        path: '/bankCardSuccess',
                        query: {
                            type: '对公账户',
                            bankName: _this.businessAccount.bankName,
                            bankAccount: _this.businessAccount.bankAccount
                        }
                    });
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    _this.$message(JSON.parse(jqXHR.responseText).responseText);
                });
        },
        // 获取银行列表
        getBankList() {
            $.ajax({
                url: API_URL + "wallet/getBankList",
                type: "get"
            })
            .done((data, textStatus, jqXHR) => {
                this.bankList = data;
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                this.$message(JSON.parse(jqXHR.responseText).responseText);
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
.upload_box {
    display: inline-block;
    position: relative;
    z-index: 10
}

.upload_box input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    filter: opacity(0);
    cursor: pointer;
}
</style>
