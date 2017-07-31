<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn"><span class="text-muted f16">我的钱包</span>/可提现明细</h2>
                    <a href="#" class="ui basic button blue mini" @click="$router.go(-1)">返回</a>
                </div>
                <div class="white-wrap p-lg">
                    <div class="create-border">
                        <table class="ui padded table tablet stackable">
                            <thead>
                                <tr>
                                    <th>类型</th>
                                    <th>线上收款总额</th>
                                    <th>系统手续费</th>
                                    <th>退票金额</th>
                                    <th>可提现金额</th>
                                    <th>已提现金额</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody v-if="hasContent === 'hasContent'" >
                                <tr v-if="item.eventStatus === 'finished'||item.eventStatus === 'published'" v-for="item in cashlist">
                                    <td>{{item.refName}}<br><span class="f12 text-muted">{{item.eventStartTime | filterTime}} ~ {{item.eventEndTime | filterTime}}</span><span class="text-green f12 ml-xs" v-if="item.eventStatus === 'finished'">已结束</span><span class="text-yellow f12 ml-xs" v-if="item.eventStatus === 'published'">进行中</span></td>
                                    <td>{{item.paymentPriceUnitSign}}{{item.eventTotalAmount | filterToFixed(2)}}</td>
                                    <td class="text-muted">{{item.paymentPriceUnitSign}}{{item.sysTotalAmount | filterToFixed(2)}}</td>
                                    <td class="text-muted">{{item.paymentPriceUnitSign}}{{Math.abs(item.refundTicketAmount) | filterToFixed(2)}}</td>
                                    <td class="text-teal">{{item.paymentPriceUnitSign}}{{item.availableCashTotalAmount | filterToFixed(2)}}</td>
                                    <td class="text-info">{{item.paymentPriceUnitSign}}{{Math.abs(item.alreadyCashTotalAmount) | filterToFixed(2)}}</td>
                                    <td><a class="mini ui button pink" :class="{'disabled': !item.availableCashTotalAmount >= 5000 || item.eventStatus === 'published'}" @click="hasRealNameAuthentication(item)">提现</a></td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-if="hasContent === 'hasContent'" class="mt-lg mb-lg text-muted ml-sm">提示：活动结束后可全额提现至自己的银行账户，若活动尚未结束必须可提现金额满¥5000及以上才可提现,美元收款的金额已分润到您的绑定贝宝账户中。<br>如有疑问，请联系会鸽：010-61138799-8042</div>
                        <div v-if="hasContent === 'noContent'" class="text-center mt-lg mb-lg"><img class="ui image medium centered" src="/images/no_centent.png" alt="暂无可提现明细"><p>暂无可提现明细</p></div>
                        <!-- loading -->
                        <div class="loadingWrapper" v-if="hasContent === 'isLoading'">
                            <div class="ui active inverted dimmer">
                                <div class="ui text loader">加载中</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div class="ui mini modal" id="authenticationLayer">
             <i class="close icon"></i>
            <div class="header">
                    实名认证
            </div>
            <div class="content">
                <div class="ui form">
                    <div class="field">
                        <label for="">姓名</label>
                        <input type="text" v-model="authentication.name" v-vali="JSON.stringify({required: true})" filed="authentication.name" placeholder="输入姓名">
                        <div v-if="$verify.$errors['authentication.name']" class="ui red basic pointing label">
                            {{$verify.$errors['authentication.name']}}
                        </div>
                     </div>
                     <div class="field">
                             <label for="">身份证号</label>
                             <input type="text" placeholder="输入身份证号" v-vali="JSON.stringify({required: true,isIdCard: true})" filed="authentication.idCard" v-model="authentication.idCard" >
                             <div v-if="$verify.$errors['authentication.idCard']" class="ui red basic pointing label">
                                {{$verify.$errors['authentication.idCard']}}
                            </div>
                     </div>
                </div>
                 <div class="ui two column vertically padded grid">
                     <div class="column">
                         <div class="ui medium image id-box">
                            <div class="ui dimmer transition visible active">
                                <div class="content">
                                    <div class="center">
                                        <div class="upload_box">
                                            <a href="#" class="text-white"><i class="upload huge icon"></i></a>
                                            <input type="file" name="frontIdCard" @change="uploadImg">
                                        </div>
                                        <p class="mt-md">上传身份证正面</p>
                                    </div>
                                </div>
                            </div>
                            <img :src="authentication.identityCardFront" authentication="identityCardFront" class="ui medium image">
                         </div>
                     </div>
                     <div class="column">
                         <div class="ui medium image id-box">
                            <div class="ui dimmer transition visible active">
                                <div class="content">
                                    <div class="center">
                                        <div class="upload_box">
                                            <a href="#" class="text-white"><i class="upload huge icon"></i></a>
                                            <input type="file" name="backIdCard" @change="uploadImg">
                                        </div>
                                        <p class="mt-md">上传身份证背面</p>
                                    </div>
                                </div>
                            </div>
                            <img :src="authentication.identityCardVerso" authentication="identityCardVerso" class="ui medium image">
                         </div>
                     </div>
                 </div>
                 <p class="space-md text-info">身份证照片要求：拍摄时确保身份证<span class="text-yellow">边框完整，字体清晰，亮度均匀</span></p>
                 <div class="ui horizontal divider">拍摄示例</div>
                 <div class="ui four column grid">
                     <div class="column"><img src="/images/id_03.png" class="ui small image"></div>
                     <div class="column"><img src="/images/id_04.png" class="ui small image"></div>
                     <div class="column"><img src="/images/id_05.png" class="ui small image"></div>
                     <div class="column"><img src="/images/id_06.png" class="ui small image"></div>
                 </div>
            </div>

            <div class="actions text-center">
                    <div class="ui ok button blue" @click="authenticationFun">提交</div>
                    <div class="ui ok button cancel">取消</div>
            </div>
        </div>
        <div class="ui warning mini modal" id="authenticationWarning">
            <i class="close icon"></i>
            <div class="header">
                实名认证
            </div>
            <div class="content">
                <div class="ui items p-md">
                    <div class="item">
                        <i class="info circle huge yellow icon"></i>
                        <div class="content">
                            <div class="header">您的身份正处于审核状态，审核通过后才能提现金额！</div>
                            <div class="meta">
                                <p>请耐心等待会鸽工作人员审核，审核周期1-3个工昨日！</p>
                            </div>
                            <div class="description mt-md">
                                <p>如有疑问请及时联系我们：010-61138799-8042</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui danger mini modal" id="authenticationDanger">
            <i class="close icon"></i>
            <div class="header">
                实名认证
            </div>
            <div class="content">
                <div class="ui items p-md">
                    <div class="item">
                        <i class="remove circle huge red icon"></i>
                        <div class="content">
                            <div class="header">对不起，您的身份审核未通过，暂且还不能提现金额！</div>
                            <div class="meta">
                                <p>原因：{{$route.query.note}}</p>
                            </div>
                            <div class="description mt-md">
                                <p>如有疑问请及时联系我们：010-61138799-8042</p>
                            </div>
                            <div class="mt-md"><a href="#" class="ui button blue authentication-btn">重新提交审核</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footers></footers>
    </div>
</template>
<script>
import {
    API_URL,IMG_SERVER
} from '../config'
import moment from 'moment'
import header from '../components/header'
import footer from '../components/footer'
export default {
    verify:true,
    data() {
        return {
            // hasContent：加载数据状态，{isLoading: 加载中，nothing: 暂无内容}
            hasContent: 'isLoading',
            cashlist: [],
            authentication: {
                name: '',
                idCard: '',
                identityCardFront: '/images/id_07.jpg',
                identityCardVerso: '/images/id_08.jpg'
            },
            updateToken: null,
            hasRNA: this.$route.query.status
        }
    },
    computed: {
        // 是否上传身份证照片
        hasUploadIdCard () {
            if(this.authentication.identityCardFront !== '/images/id_07.jpg' && this.authentication.identityCardVerso !== '/images/id_08.jpg'){
                return true;
            }else{
                return false;
            }
        }
    },
    filters: {
        // 格式化后台返回的时间
        filterTime(date) {
            let _filterDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
            return _filterDate.slice(0,_filterDate.length-3);
        },
        // 保留小数位
        filterToFixed(data, n) {
            return data.toFixed(n);
        }
    },
    mounted() {
        this.availableCashList();

        // 实名验证
        $('#authenticationLayer').modal({
            onShow: () => {
                this.getUploadToken();
            },
            onApprove: (el) => {
                return false;
            },
            onHide: () => {
                this.authentication.name = null;
                this.authentication.idCard = null;
                this.authentication.identityCardFront = '/images/id_07.jpg';
                this.authentication.identityCardVerso = '/images/id_08.jpg';
                return true;
            }
        }).modal('attach events', '.authentication-btn');
    },
    methods: {
        //可提现明细
        availableCashList () {
            $.get(API_URL + "/transaction/getAvailableCashList",{
                "page": 1,
                "limit": 9999,
                "total": -1
            },(data,status,xhr)=>{
                if (status === 'success') {
                    this.cashlist = data.items;
                    if (this.cashlist.length) {
                        this.hasContent = 'hasContent'
                    } else {
                        this.hasContent = 'noContent';
                    }
                } else {
                    this.$message(JSON.parse(jqXHR.responseText).responseText);
                }
            });
        },
        // 判断是否已经实名认证
        hasRealNameAuthentication (item) {
            if (this.hasRNA === 'auditThrough') {
                this.$router.push({
                    path: '/cash',
                    query:{
                        cashInfo:JSON.stringify(item)
                    }
                });
            } else if (this.hasRNA === 'auditing') {
                $('#authenticationWarning').modal('show');
            } else if (this.hasRNA === 'auditFailure') {
                $('#authenticationDanger').modal('show');
            } else if (this.hasRNA === 'inexistence') {
                // 实名验证
                $('#authenticationLayer').modal({
                    onShow: () => {
                        this.getUploadToken();
                    },
                    onApprove: (el) => {
                        return false;
                    },
                    onHide: () => {
                        this.authentication.name = null;
                        this.authentication.idCard = null;
                        this.authentication.identityCardFront = '/images/id_07.jpg';
                        this.authentication.identityCardVerso = '/images/id_08.jpg';
                        return true;
                    }
                }).modal('show');
            }
        },
        // 获取上传图片token
        getUploadToken () {
            $.ajax({
                url: "/uptoken",
                success: (res) => {
                    this.updateToken = res.uptoken;
                }
            })
        },
        // 上传图片
        uploadImg (e) {
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
            _xhr.upload.onloadstart = function () {
                $(e.target).closest('.center').find('p').text('上传中');
            }
            // ajax服务器返回处理
            _xhr.onreadystatechange = function(response) {
                if (_xhr.readyState == 4 && _xhr.status == 200 && _xhr.responseText != "") {
                    let _blkRet = JSON.parse(_xhr.responseText);
                    let _img = $(e.target).closest('.image').find('img');
                    console.log(_this,_this.authentication,_img)
                    _this.authentication[_img.attr('authentication')] = IMG_SERVER + _blkRet.key
                    _img.removeClass('hide');
                    $(e.target).closest('.center').find('p').text('上传完成');
                } else if (_xhr.status != 200 && _xhr.responseText) {
                    _this.$message('上传失败');
                }
            };
            //请求失败
            _xhr.onerror = function () {
                _this.$message('请求上传失败');
            };
            _xhr.send(_formData);
        },
        // 实名认证
        async authenticationFun () {
            try {
                await this.$verify.check().then()
            } catch (e) {
                return false
            }
            if(!this.hasUploadIdCard){
                this.$message('请上传身份证照片！');
                return;
            }
            let _this = this;
            jQuery.ajax({
                url: API_URL + "/user/realNameAuthentication",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "identityCardFront": _this.authentication.identityCardFront,
                    "identityCardVerso": _this.authentication.identityCardVerso,
                    "name": _this.authentication.name,
                    "idType": "identityCard",
                    "idNumber": _this.authentication.idCard
                })
            })
            .done(function(data, textStatus, jqXHR) {
                _this.hasRNA = data.status; 
                $('#authenticationLayer').modal('hide');
                _this.$message('实名认证已提交，请等待审核结果');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                _this.$message(JSON.parse(jqXHR.responseText).responseText);
            });
        }
    },
    components: {
        headers: header,
        footers: footer
    }
}
</script>
<style scoped>
    .ui.id-box .ui.dimmer{
        background-color: rgba(0,0,0,.2);
     }

    .upload_box{
        display: inline-block;
        position: relative;
        z-index: 10
    }

    .upload_box input{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        opacity: 0;
        filter: opacity(0);
        cursor: pointer;
    }

    .show{
        display: block !important;
    }

    .loadingWrapper{
        position: relative;
        height: 225px;
    }
</style>