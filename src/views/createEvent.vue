<template>
    <div id="event">
        <headerSimple>
            <template slot="left-nav">
                <span class="item f16 noLine">{{isEdit?'编辑':'创建'}}活动</span>
            </template>
            <div class="center menu" slot="title">
                <template v-if="isEdit&&step<5">
                    <a @click="setStep(index+1)" class="item noLine f16" :class="{'active':step==index+1}" v-for="(stepName,index) in stepNames">
                        {{stepName}}
                    </a>
                </template>
                <template v-if="isEdit&&step>6">
                    <a @click="setStep(7)" class="item noLine f16" :class="{'active':step==7}">
                        门票设定
                    </a>
                    <a @click="setStep(8)" class="item noLine f16" :class="{'active':step==8}">
                        报名表单
                    </a>
                </template>
            </div>
        </headerSimple>
        <div class="event-main pusher">
            <!-- <button @click="resetData">初始化数据</button>
            <button @click="deleteID">删除本地ID</button> -->
            <div class="ui tiny blue progress active" data-percent="2" v-if="status=='unpublished'">
                <div class="loading-primary" :style="'left:'+ percent+'%'"></div>
                <div class="bar" :style="'transition-duration: 300ms; width:'+ percent+'%'"></div>
            </div>
            <div class="ui divider hidden" v-if="status!='unpublished'"></div>
            
            <div class="ui container por">
                <!--类别选择-->
                <transition name="slide-fade">
                    <div class="create-wrap" v-if="step==1">
                        <div class="ui small container">
                            <h2 class="ui header">
                                <i class="icon-manage_fill iconfont icon"></i>
                                <div class="content">您打算发布什么类型的活动？<div class="sub header">步骤一：从基本信息开始</div></div>
                            </h2>
                            <div class="create-box p-lg white-wrap">
                                <div class="ui four cards default primary link">
                                    <div class="card home-sorts" v-for="(cate,i ) in categoriesArr " @click="setCatego(cate,categories.indexOf(cate.value)>-1)">
                                        <div class="image">
                                            <img :src="cate.img">
                                            <i v-show="categories.indexOf(cate.value)>-1" class="check circle icon big inverted"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="create-footer space-md text-right">
                                <button type="button" class="ui button blue big right" @click="validateForm(2)">下一步</button>
                            </div>
                        </div>
                    </div>
                </transition>
                <!--类别选择-->
                <!--标题-->
                <transition name="slide-fade">
                    <div class="create-wrap" v-if="step==2">
                        <h2 class="ui header">
                            <i class="file text outline icon"></i>
                            <div class="content">给您的活动取一个响亮的标题？<div class="sub header">步骤一：从基本信息开始</div></div>
                        </h2>
                        <div class="create-box p-lg white-wrap">
                            <div class="ui form big">
                                <div class="required field">
                                    <label>活动名称</label>
                                    <input @keyup.enter="validateForm(3)" type="text" v-focus v-vali="JSON.stringify({required:true,minLength:5,maxLength:100})" filed="title" name="" @input="trim" :value="title.substring(0,100)" placeholder="例如：中国互联网大会，最少5字，最多100个字">
                                    <div class="ui top pointing red basic label " v-show="$verify.$errors['title']&&$verify.$errors['title']!=''">{{$verify.$errors['title']}} </div>
                                </div>
                            </div>
                        </div>
                        <div class="create-footer space-md text-justify">
                            <button class="ui button big" @click="setStep(1)"><i class="angle left icon"></i>返回</button>
                            <button type="button" class="ui button blue big" @click="validateForm(3)">下一步</button>
                        </div>
                    </div>
                </transition>
                <!--标题-->
                <!--活动时间-->
                <transition name="slide-fade">
                    <div class="create-wrap" v-show="step==3">
                        <h2 class="ui header">
                            <i class="icon-shijian-time iconfont icon"></i>
                            <div class="content">设置时间以及要举办的地点<div class="sub header">步骤一：从基本信息开始</div></div>
                        </h2>
                        <div class="create-box p-lg white-wrap">
                            <div class="ui form big">
                                <div class="required field">
                                    <label>活动起止时间</label>
                                    <div class="two fields">
                                        <div class="field">
                                            <date-picker :date="startTime" :limit="limit" placeholder="活动开始时间" v-on:input="setEndTime(arguments[0],'startTime')" :option="option"></date-picker>
                                        </div>
                                        <div class="field">
                                            <date-picker :date="endTime" :limit="limit" placeholder="活动结束时间" v-on:input="setEndTime(arguments[0],'endTime')" :option="option"></date-picker>
                                        </div>
                                    </div>
                                </div>
                                <div class="required  field">
                                    <label>活动地点</label>
                                    <div class="two fields">
                                        <div class="field">
                                            <div class="ui icon input" data-tooltip="输入地标关键字检索" data-position="top right">
                                                <input type="text" placeholder="输入地标关键字检索" id="keyword" name="keyword" @input="onlineAddress?onlineAddress=false:''">
                                                <i class="marker icon"></i>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui icon input" data-tooltip="活动的详细地址" data-position="top left">
                                                <input type="" name="" data-tooltip="Add users to your feed" data-position="top left" id="detailedAddress" placeholder="详细地址" v-model="detailedAddress" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-link">
                                    <div class="field">
                                        <div class="ui checkbox" v-ui>
                                            <input type="checkbox" @change="setOnlie()" class="hidden" v-model="onlineAddress" tabindex="0">
                                            <label>线上活动</label>
                                        </div>
                                    </div>
                                </div>
                                <div id="mapContainer" style="height:300px" v-show="!onlineAddress">
                                    地图加载中...
                                </div>
                            </div>
                        </div>
                        <div class="create-footer space-md text-justify">
                            <button class="ui  button big" @click="setStep(2)"><i class="angle left icon"></i>返回</button>
                            <button type="button" class="ui button blue big" @click="validateForm(4)">下一步</button>
                        </div>
                    </div>
                </transition>
                <!--活动时间-->
                <!-- 活动主办方 -->
                <transition name="slide-fade">
                    <div class="create-wrap" v-show="step==4">
                        <h2 class="ui header">
                            <i class="icon-zhuanye- iconfont icon"></i>
                            <div class="content">这次活动的主办方是谁？<div class="sub header">步骤一：从基本信息开始</div></div>
                        </h2>
                        <div class="create-box p-lg white-wrap">
                            <div class="ui form big">
                                <div class="ui attached segment big" v-for="(el,index) in orianizerArr">
                                    <div class="ui checkbox" v-ui>
                                        <input type="checkbox" :name="index" tabindex="0" :value="el" :id="index" v-model="organizers">
                                        <label><i :style="'background:url('+el.logo+');background-size:100% 100%;'" class="icon"></i>{{el.name}}{{el.website?'('+el.website+')':''}}</label>
                                    </div>
                                </div>
                                <div class="ui bottom attached button big" id="add-sponsor"><i class="icon-bigtianjia iconfont icon button"></i>添加主办方</div>
                                <div class="ui hidden divider"></div>
                                <div class="field required">
                                    <label>本次活动的联系方式</label>
                                    <div class="two fields">
                                        <div class="field">
                                            <div class="ui left icon input">
                                                <input type="text" placeholder="联系电话" v-model="contact.mobile">
                                                <i class="call icon"></i>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui left icon input">
                                                <input type="text" placeholder="电子邮箱" v-model="contact.email">
                                                <i class="mail icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 主办方弹层 -->
                            <div class="ui sponsor mini modal" v-ui="'#add-sponsor'">
                                <i class="close icon"></i>
                                <div class="header">
                                    添加主办方
                                </div>
                                <div class="content">
                                    <div class="ui form">
                                        <div class="required field">
                                            <label>主办方名称</label>
                                            <input type="text" name="" v-model="ori_name" placeholder="请输入主办方名称">
                                        </div>
                                        <div class="field">
                                            <label>主办方logo</label>
                                            <div class="ui grid">
                                                <!-- /images/no_logo.jpg -->
                                                <div class="four wide column"><img :src="ori_img " alt="" class="ui image small"></div>
                                                <div class="twelve wide column">
                                                    <div class="text-muted f13 mb-sm">扩展名为jpg、jpeg、gif、png或bmp的图片</div>
                                                    <dropzone-upfile :button="{'class':'ui button blue mini','text':'上传图片','id':'ori_img_upbtn'}" @uploaded="ori_img=arguments[0]">
                                                    </dropzone-upfile>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=" field">
                                            <label>网址：</label>
                                            <div class="ui left labeled input"><div class="ui basic label">http://</div> <input type="text" placeholder="例：www.eventdove.com"  v-model="ori_website"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="actions text-center">
                                    <button class="ui blue button ok" @click="addOrianizer" :disabled="!ori_name">
                                        确定
                                    </button>
                                </div>
                            </div>
                            <!-- 主办方弹层 -->
                        </div>
                        <div class="create-footer space-md text-justify">
                            <button class="ui  button big" @click="setStep(3)"><i class="angle left icon"></i>返回</button>
                            <button type="button" class="ui button blue big" @click="validateForm(5)" :disabled="this.organizers.length == 0 || !this.contact.mobile ||  !this.contact.email ">下一步</button>
                        </div>
                    </div>
                </transition>
                <!-- 活动主办方 -->
                <!--发布属于您的活动-->
                <transition name="slide-fade">
                    <div class="create-box p-lg white-wrap" v-show="step==5">
                        <div class="publish_success" v-if="!isCanEdit">
                            <div class="ui grid padded">
                                <div class="two wide column">
                                    <img src="/images/right.png" alt="" class="ui image tiny">
                                </div>
                                <div class="fourteen wide column">
                                    <h2 class="ui header">太棒了，您的活动已{{updateorcreate}}成功！</h2>
                                    <div class="ui divider hidden"></div>
                                    <p class="f16"><a :href="'/site/'+id" target="_blank">{{title}}</a></p>
                                    <p>时间：{{startTime}} － {{endTime}}</p>
                                    <p>地点：{{ detailedAddress }}</p>
                                    <!-- <div class="ui divider hidden"></div>
                                    <p class="text-blue">您的活动信息完善了percent%</p>
                                    <div class="ui tiny blue progress active" data-percent="percent" style="margin-bottom: 1em;">
                                        <div class="bar" :style="'transition-duration: 300ms; width:'+ percent+'%'" v-if="status!='published'"></div>
                                    </div> -->
                                    <div class="ui divider hidden"></div>
                                    <div class="space-md">
                                        <a :href="'/site/'+id" target="_blank" class="ui button blue">点击预览</a>
                                        <a :href="'/activityManage/'+id+'/dashboard'" target="_blank" class="ui button blue basic">管理活动</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="isCanEdit">
                            <div class="ui icon yellow message" v-show="!isEdit">
                                <i class="check circle icon"></i>
                                <div class="content">
                                    <div class="header">
                                        太棒了，您的活动基本信息已录入
                                    </div>
                                    <p>提示：活动信息未完善，用户看不到您的活动！</p>
                                </div>
                            </div>
                            <div class="ui one column grid activity-steps">
                                <div class="column">
                                    <div class="ui big fluid vertical steps">
                                        <div class="completed step">
                                            <i class="truck icon"></i>
                                            <div class="content">
                                                <div class="title">一、从基本信息开始</div>
                                                <div class="description">活动类型、名称、时间和地点以及主办方信息</div>
                                            </div>
                                            <button type="button" class="ui teal button" @click="setStep(1)">编辑</button>
                                        </div>
                                        <div class="completed step" v-if="htmlEditorHasModify()">
                                            <i v-bind:class="[htmlEditorHasModify() ? 'truck' : 'edit', 'icon']"></i>
                                            <div class="content">
                                                <div class="title">二、活动描述信息</div>
                                                <div class="description">活动信息、演讲嘉宾和活动日程等等</div>
                                            </div>
                                            <button type="button" class="ui teal button" @click="setStep(6)" v-if="htmlEditorHasModify()"> 编辑</button>
                                            <button type="button" class="ui blue button" @click="setStep(6)" v-else> 继续 </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2 class="ui header" v-if="percent !== 100 ">接下来请完善活动信息:</h2>
                            <div class="ui hidden divider"></div>
                            <div class="ui one column grid activity-steps">
                                <div class="column">
                                    <div class="ui big fluid vertical steps">
                                        <div class="active step" v-if="!htmlEditorHasModify()">
                                            <i v-bind:class="[htmlEditorHasModify() ? 'truck' : 'edit', 'icon']"></i>
                                            <div class="content">
                                                <div class="title">二、活动描述信息</div>
                                                <div class="description">活动信息、演讲嘉宾和活动日程等等</div>
                                            </div>
                                            <button type="button" class="ui teal button" @click="setStep(6)" v-if="htmlEditorHasModify()"> 编辑</button>
                                            <button type="button" class="ui blue button" @click="setStep(6)" v-else> 继续 </button>
                                        </div>
                                        <div class="active step">
                                            <i class="edit icon"></i>
                                            <div class="content">
                                                <div class="title">三、门票设置 报名表单设计（选填）</div>
                                                <div class="description">编辑门票信息价格、币种等等，默认门票免费</div>
                                            </div>
                                            <button type="button" class="ui teal button" @click="setStep(7)">编辑 </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ui hidden divider"></div>
                            <div class="text-center">
                                <button type="button" class="ui button blue big" @click="publish" :disabled="percent!=100 && status !='published'" v-if="status!='published'">发布活动</button>
                                <router-link v-if="id" :to="{name:'site',params:{id:id}}" type="button" class="ui button orange big">预览活动</router-link>
                            </div>
                        </div>
                    </div>
                </transition>
                <!--发布属于您的活动-->
                <!--编辑器区-->
                <transition name="slide-fade">
                    <div class="create-wrap" v-show="step==6">
                        <h2 class="ui header">
                            <i class="icon-renwuguanli- iconfont icon"></i>
                            <div class="content">请填写您会议的介绍信息<div class="sub header">步骤二：活动描述信息</div></div>
                        </h2>
                        <div class="create-box p-lg white-wrap">
                            <editor @on-content-change="contentChange" :menus="content" ref="editor">
                            </editor>
                        </div>
                        <div class="create-footer space-md text-justify">
                            <button class="ui  button big" @click="setStep(5)"><i class="angle left icon"></i>返回</button>
                            <button type="button" class="ui button blue big" @click="updateHtml" :disabled="this.content.length == 0 " :class="[this.btnLoading? 'loading':'' ]">保存</button>
                        </div>
                    </div>
                </transition>
                <!--编辑器区-->
                <!--门票设置-->
                <transition name="slide-fade">
                    <div class="create-wrap" v-show="step==7">
                        <h2 class="ui header">
                            <i class="icon-beizhujingqumenpiao iconfont icon"></i>
                            <div class="content">添加几张报名的门票?<div class="sub header">步骤三：门票设置 报名表单设计</div></div>
                        </h2>
                        <div class="create-box p-lg white-wrap">
                            <div class="ui form big">
                                <div class="field">
                                    <label>按什么币种收费</label>
                                    <div class="inline fields">
                                        <div class="field">
                                            <div class="ui radio checkbox" v-ui>
                                                <input type="radio" value="yuan" @change="getPaypals" v-model="paymentPriceUnit" class="hidden" tabindex="0">
                                                <label>人民币收款</label>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="ui radio checkbox" v-ui>
                                                <input type="radio" value="dollar" @change="getPaypals" class="hidden" v-model="paymentPriceUnit" tabindex="0">
                                                <label>美元收款</label>
                                            </div>
                                        </div>
                                        <div class="field" v-if="paymentPriceUnit=='dollar'">
                                            <select v-model="paymentAccountIds" v-ui class="ui dropdown mini paymentIds" v-if="paypals.length>0">
                                                <option :value="paypal.accountId" v-for="paypal in paypals">{{paypal.account}}</option>
                                            </select>
                                            <router-link target="_blank" :to="{path:'/wallet',query:{createPaypal:'paypalLayerView'}}" v-show="paypals.length==0" class="button ui red mini">添加贝宝账号</router-link>
                                        </div>
                                    </div>
                                </div>
                                <div class="ui divider"></div>
                                <div v-for="(tk,index) in tickets">
                                    <div class="three fields">
                                        <div class="field required">
                                            <label>门票名称</label>
                                            <input type="text" name="" v-vali="JSON.stringify({required:true})" :filed="'tickets.'+index+'.name'" v-model="tk.name" placeholder="请输入门票名称">
                                            <div class="ui top pointing red basic label " v-show="$verify.$errors['tickets.'+index+'.name']&&$verify.$errors['tickets.'+index+'.name']!=''">{{$verify.$errors['tickets.'+index+'.name']}} </div>
                                        </div>
                                        <div class="field required">
                                            <label>可售数量</label>
                                            <input type="text" name="" v-vali="JSON.stringify({required:true,isPositiveInteger:true})" :filed="'tickets.'+index+'.totalCount'" placeholder="0" v-model.number="tk.totalCount">
                                            <div class="ui top pointing red basic label " v-show="$verify.$errors['tickets.'+index+'.totalCount']&&$verify.$errors['tickets.'+index+'.totalCount']!=''">{{$verify.$errors['tickets.'+index+'.totalCount']}} </div>
                                        </div>
                                        <div class="field required">
                                            <label>设定价格</label>
                                            <div class="ui left icon input">
                                                <input type="number" v-vali="JSON.stringify({required:true,minSize:0})" :filed="'tickets.'+index+'.defaultPrice'" placeholder="价格" v-model="tk.defaultPrice" step="0.01">
                                                <i :class="[paymentPriceUnit =='dollar' ? 'dollar icon':'yen icon']"></i>
                                            </div>
                                            <div class="ui top pointing red basic label " v-show="$verify.$errors['tickets.'+index+'.defaultPrice']&&$verify.$errors['tickets[index].tickets.'+index+'.defaultPrice']!=''">{{$verify.$errors['tickets.'+index+'.defaultPrice']}} </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="three fields">
                                            <div class="field">
                                                <div class="ui toggle checkbox" v-ui>
                                                    <input type="checkbox" id="checkbox" v-model="tk.needAudit">
                                                    <label>是否需要审核</label>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <a href="#" class="menpiao f15" @click="advSetting(index)">门票高级设置</a>
                                            </div>
                                            <div class="field">
                                                <i class="add circle icon text-blue hand-type large" @click="addTkt()"></i>
                                                <i class="minus circle icon hand-type large" @click="rmTkt(index)"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui hidden divider">
                                    </div>
                                    <!--门票高级设置 start -->
                                    <div :id="'advSet'+index" class="ui long small  modal">
                                        <i class="close icon" @click="ticketMoreSetting(index)"></i>
                                        <div class="header">
                                            门票设置
                                        </div>
                                        <div class="content">
                                            <div class="ui form f15" style="max-height: 400px;overflow-y:auto; overflow-x: hidden;">
                                                <div class="three fields" style="margin-top:1em">
                                                    <div class="field">
                                                        <label>最小购票数</label>
                                                        <input v-model="tk.minCount" type="number" placeholder="输入数量">
                                                    </div>
                                                    <div class="field">
                                                        <label>最大购票数</label>
                                                        <input v-model="tk.maxCount" type="number" placeholder="输入数量">
                                                    </div>
                                                </div>
                                                <div class="field">
                                                    <label>门票说明</label>
                                                    <textarea v-model="tk.describe" rows="3" placeholder="请输入门票简介或说明事项"></textarea>
                                                </div>
                                                <div class="field">
                                                    <div class="ui toggle  checkbox" v-ui>
                                                        <input type="checkbox" v-model="tk.needSalesTime">
                                                        <label>设置售票时间</label>
                                                    </div>
                                                </div>
                                                <div v-if="tk.needSalesTime">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td class="ten wide">
                                                                    <div class="two fields">
                                                                        <div class="field">
                                                                            <div class="ui icon input">
                                                                                <date-picker :date="tk.startSalesTime" placeholder="售票开始时间" :ref="'datepicker'+index+'0'" :addevent="'input##datepicker'+index+'0'" v-vali="JSON.stringify({required:true,maxDate:endTime})" :filed="'tickets.'+index+'.startSalesTime'" v-on:input="setTicketTime(arguments[0],tk,0,'tickets.'+index+'.startSalesTime')" :option="option"></date-picker>
                                                                                <div class="ui left pointing red basic label " v-show="$verify.$errors['tickets.'+index+'.startSalesTime']&&$verify.$errors['tickets.'+index+'.startSalesTime']!=''">{{$verify.$errors['tickets.'+index+'.startSalesTime']}} </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="field">
                                                                            <div class="ui icon input">
                                                                                <date-picker :date="tk.endSalesTime" placeholder="售票结束时间" :ref="'datepicker'+index+'1'" :addevent="'input##datepicker'+index+'1'" v-vali="JSON.stringify({required:true,maxDate:endTime})" :filed="'tickets.'+index+'.endSalesTime'" v-on:input="setTicketTime(arguments[0],tk,1,'tickets.'+index+'.endSalesTime')" :option="option"></date-picker>
                                                                                <div class="ui left pointing red basic label " v-show="$verify.$errors['tickets.'+index+'.endSalesTime']&&$verify.$errors['tickets.'+index+'.endSalesTime']!=''">{{$verify.$errors['tickets.'+index+'.endSalesTime']}} </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <br>
                                                </div>
                                                <!--早鸟票-->
                                                <div class="field">
                                                    <div class="ui toggle checkbox" v-ui>
                                                        <input type="checkbox" v-model="tk.needEarlyBird">
                                                        <label>设置早鸟票价格</label>
                                                    </div>
                                                </div>
                                                <div class="two fields" v-if="tk.needEarlyBird">
                                                    <div class="field">
                                                        <label>早鸟票截止时间</label>
                                                        <div style="width:300px">
                                                            <date-picker :date="tk.earlyBirdTicketSetting.endTime" placeholder="早鸟票截止时间" :ref="'datepicker'+index+'2'" :addevent="'input##datepicker'+index+'2'" v-vali="JSON.stringify({required:true,maxDate:endTime})" :filed="'tickets.'+index+'.earlyBirdTicketSetting.endTime'" v-on:input="tk.earlyBirdTicketSetting.endTime = arguments[0]" :option="option"></date-picker>
                                                            <div class="ui top pointing red basic label " v-show="$verify.$errors['tickets.'+index+'.earlyBirdTicketSetting.endTime']&&$verify.$errors['tickets.'+index+'.earlyBirdTicketSetting.endTime']!=''">{{$verify.$errors['tickets.'+index+'.earlyBirdTicketSetting.endTime']}} </div>
                                                        </div>
                                                    </div>
                                                    <div class="field">
                                                        <label>早鸟票价格:</label>
                                                        <input v-model.number="tk.earlyBirdTicketSetting.price" v-vali="JSON.stringify({required:true})" :filed="'tickets.'+index+'.earlyBirdTicketSetting.price'" type="number" placeholder="早鸟票价格">
                                                        <div class="ui top pointing red basic label " v-show="$verify.$errors['tickets.'+index+'.earlyBirdTicketSetting.price']&&$verify.$errors['tickets.'+index+'.earlyBirdTicketSetting.price']!=''">{{$verify.$errors['tickets.'+index+'.earlyBirdTicketSetting.price']}} </div>
                                                    </div>
                                                </div>
                                                <!--     <div class="fields-label" style="margin-top:1em">
                        <strong>团购票设置&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                <div class="ui checkbox">
                       <input type="checkbox" name="example" tabindex="0" v-model="tk.isAllowGroupPurchase" class="hidden">
                                    <label class="f12">添加团购票设置</label>
                                </div>
                            </div>  -->
                            <div class="field">
                                <div class="ui toggle  checkbox" v-ui>
                                    <input type="checkbox" name="" v-model="tk.isAllowGroupPurchase">
                                    <label>团购票设置 </label>
                                </div>
                            </div>
                            <div class="create-border" style="padding:1em;" v-if="tk.isAllowGroupPurchase">
                                <div class="field">
                                    <label class="fwn">当购买门票数量大于或者等于</label>
                                    <div class=" fields">
                                        <div class="field">
                                            <input v-vali="JSON.stringify({required:true})" :filed="'tickets.'+index+'.groupPurchaseTicketSetting.minGroupCount'" type="number" placeholder="输入数量" v-model.number="tk.groupPurchaseTicketSetting.minGroupCount">
                                            <div class="ui top pointing red basic label " v-show="$verify.$errors['tickets.'+index+'.groupPurchaseTicketSetting.minGroupCount']&&$verify.$errors['tickets.'+index+'.groupPurchaseTicketSetting.minGroupCount']!=''">{{$verify.$errors['tickets.'+index+'.groupPurchaseTicketSetting.minGroupCount']}} </div>
                                        </div>
                                        <div class="field">
                                            <select class="ui dropdown" v-ui v-model="tk.groupPurchaseTicketSetting.preferentialType">
                                                <option value="fixed">优惠金额</option>
                                                <option value="rate">优惠折扣</option>
                                            </select>
                                        </div>
                                        <div class="field">
                                            <input v-vali="JSON.stringify({required:true})" :filed="'tickets.'+index+'.groupPurchaseTicketSetting.value'" type="number" placeholder="" v-model="tk.groupPurchaseTicketSetting.value">
                                            <div class="ui top pointing red basic label " v-show="$verify.$errors['tickets.'+index+'.groupPurchaseTicketSetting.value']&&$verify.$errors['tickets.'+index+'.groupPurchaseTicketSetting.value']!=''">{{$verify.$errors['tickets.'+index+'.groupPurchaseTicketSetting.value']}} </div>
                                        </div>
                                        <div class="field">
                                            <span v-if="tk.groupPurchaseTicketSetting.preferentialType == 'rate' ">% （实际票价 = 原票价 * （1 - 优惠折扣%））</span>
                                            <span v-if="tk.groupPurchaseTicketSetting.preferentialType == 'fixed' ">元 实际票价 = 原票价 - 优惠金额</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="ui checkbox" v-ui>
                                    <input type="checkbox" name="example" tabindex="0" class="hidden" v-model="tk.groupPurchaseTicketSetting.isAllowDiscount">
                                    <label class="f12">可以在满减的基础上使用优惠码</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="actions text-center">
                        <button class="ui button cancel" @click="ticketMoreSetting(index)">
                            取消
                        </button>
                        <button class="ui blue button ok" @click="ticketMoreSetting(index)">
                            确定
                        </button>
                    </div>
                </div>
                <!--门票高级设置 end-->
            </div>
        </div>
    </div>
    <div class="create-footer space-md text-justify">
        <button class="ui  button big" @click="setStep(5)"><i class="angle left icon"></i>返回</button>
        <button type="button" class="ui button blue big " :class="[this.btnLoading? 'loading':'' ]" @click="validateForm(7)">下一步</button>
    </div>
</div>
</transition>
<!--报名表单-->
<transition name="slide-fade">
    <div class="create-wrap" v-show="step==8">
        <h2 class="ui header">
            <i class="icon-wenben-copy iconfont icon"></i>
            <div class="content">定制您的报名表单<div class="sub header">步骤二：门票设置 报名表单设计</div></div>
        </h2>
        <div class="create-box p-lg white-wrap">
            <form-editor ref="formeditor"></form-editor>
        </div>
        <div class="create-footer space-md text-justify">
            <button class="ui  button big" @click="setStep(7)"><i class="angle left icon"></i>返回</button>
            <button type="button" class="ui button blue big" @click="saveFormField(5)">下一步</button>
        </div>
    </div>
</transition>
<!--报名表单-->
</div>
</div>
<html2canvas></html2canvas>
</div>
</template>
<script>
    import editor from '../components/editor'
    import {
        API_URL
    } from '../config'
    import {
        mapGetters
    } from 'vuex'
    import myDatepicker from '../components/vue-datepicker'
import formEditor from '../components/form_editor' //表单设计器
import headerSimple from '../components/header_simple' //表单设计器

import AMapAPILoader from '../utils/lazy-amap-api-loader'
import moment from 'moment'
import {
    dataFilter,
    formatTime,
    loadJs
} from '../utils/index'
import dropzoneUpfile from '../components/dropzone-upfile'

/****加载高德地图 *****/
function loadAmap(context) {



    var point = context.lat ? [context.lng, context.lat] : [116.397428, 39.90923],
    pointName = context.detailedAddress ? context.detailedAddress : ''
    let lazyAMapApiLoaderInstance = new AMapAPILoader()
    lazyAMapApiLoaderInstance.load().then(() => {
        var setAddress = (res) => {
            context.lat = res.position.lat;
            context.lng = res.position.lng;
            context.detailedAddress = res.address;
            $('#detailedAddress').select();
        }
        var map = new AMap.Map("mapContainer", {
            resizeEnable: true,
            center: point, //地图中心点
            zoom: 13, //地图显示的缩放级别
            keyboardEnable: false
        });
        map.isSetPoint = !!pointName;

        AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
            var autoOptions = {
                input: "keyword" //使用联想输入的input的id
            }
            var autocomplete = new AMap.Autocomplete(autoOptions);

            var placeSearch = new AMap.PlaceSearch({
                map: map,
                pageSize: 3,
                extensions: 'all',
                showCover: false
            })
            AMap.event.addListener(autocomplete, "select", function(e) {
                placeSearch.search(e.poi.name, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        context.country = '中国'
                        context.city = result.poiList.pois[0].cityname
                        context.province = result.poiList.pois[0].pname
                        context.zipCode = result.poiList.pois[0].adcode
                        context.lat = result.poiList.pois[0].location.lat
                        context.lng = result.poiList.pois[0].location.lng
                        context.detailedAddress = e.poi.district + e.poi.address
                        lazyAMapApiLoaderInstance.dragMap(map, setAddress);
                    } else {
                        context.$message.error('地址未找到或者不够精准 请重新搜索')
                    }
                })
            })
            map.isSetPoint?lazyAMapApiLoaderInstance.dragMap(map, setAddress):''
        })
    }).catch(function(e) {
        console.log(e)
    })
}
/****加载高德地图 *****/

var format = 'YYYY-MM-DD HH:mm'


//添加门票的模版
let ticketTemplate = {
    "name": "",
    "describe": "",
    "needAudit": false,
    "needEarlyBird": false,
    "needSalesTime": false,
    "defaultPrice": '',
    "startSalesTime": new Date(), //"Value for [tickets][0][startSalesTime] must be a date or a valid string or null.
    "endSalesTime": null,
    "totalCount": '',
    "minCount": null,
    "maxCount": null,
    "isServiceFeeInclude": true,
    "ticketServiceFee": null,
    "isMemberOnlyTicket": true,
    "applyToMemberships": [],
    "isAllowGroupPurchase": false,
    "earlyBirdTicketSetting": {
        "endTime": null,
        "price": null
    },
    "groupPurchaseTicketSetting": {
        "minGroupCount": null,
        "preferentialType": "fixed",
        "value": null,
        "isAllowDiscount": true
    },
    serviceFee: 0,
    status: "normal"
}
const categoriesLength = 3;
export default {
    name: 'createEvent',
    verify: true,
    directives: {
        focus: {
            inserted: function(el) {
                // 聚焦元素
                el.focus()
            }　　　　
        }　　
    },


    data() {
        return {
            '$':$,
            'paymentAccountIds': '',
            'paypals': [],
            'uptoken': '',
            'stepNames': ['活动类型', '活动名称', '时间及地点', '主办方'],
            'isEdit': this.$route.name == 'edit',
            'ticketIsValied': true,
            'firstContentLength': 20,
            'btnLoading': false,
            'id': parseInt(this.$route.params.eventId) ? this.$route.params.eventId : 0 || '', //活动ID    
            'categoriesArr': [], //分类
            'step': 1, //步骤
            "title": "",
            "logoUrl": "",
            "bannerArr": [],
            "bannerUrl": "", //images/banner/+fl+.jpg 
            "mobileBannerUrl": "",
            "thumbnail": "",
            "startTime": '',
            "endTime": '',
            "categories": [],
            "content": [{
                label: '活动介绍',
                content: ''
            }, {
                label: '活动日程',
                content: ''
            }, {
                label: '活动嘉宾',
                content: ''
            }, ],
            "contact": {
                mobile: this.$store.state.user.phone||'',
                email: this.$store.state.user.email||''
            },
            "isPublic": true,
            "status": 'unpublished',
            "country": "北京",
            "province": "北京",
            "city": "北京",
            "zipCode": "100010",
            "detailedAddress": "",
            "lng": null,
            "lat": null,
            "onlineAddress": false,
            "geohash": "wxaddjd",
            "paymentAccountId": "123456789",
            "paymentAccountType": "online",
            "paymentPriceUnit": "yuan",
            "basePrice": 100.05,
            "maxFee": 500.21,
            "formCollectionItemModel": "ticketBuyers",
            "tickets": [$.extend(true, {}, ticketTemplate, {
                name: '免费票',
                defaultPrice: 0,
                totalCount: 100000000
            })],
            'orianizerArr': [], //主办方list
            'organizers': [], //活动添加的主办方
            'purchaseMode': 'buyerMode',
            //添加主办方字段
            "ori_name": "",
            "ori_img": "/images/no_logo.jpg",
            "ori_website": "",

            //表单收集项
            "formFiled": [],
            //日历控件
            option: {
                type: 'min',
                format: 'YYYY-MM-DD HH:mm',
                language: 'zhCn',
                inputStyle: {
                    'width': '400px'
                },
                color: {
                    header: '#ccc',
                    headerText: '#f00'
                },
                overlayOpacity: 0.5, // 0.5 as default
                dismissible: true // as true as default
            },
            limit: [{
                type: 'fromto',
                from: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm')
            }],
            defaultElements: [{
                itemName: 'name',
                isRequired: true,
                description: '',
                isDisplayDescription: false,
                displayName: "姓名",
                fieldType: "text",
                rules: {
                    required: true,
                    minLength: 2,
                    maxLength: 100
                },
                attr: {

                },
                itemValues: ['collectItems'],
                value: ''
            }, {
                itemName: 'mobile',
                isRequired: true,
                description: '',
                isDisplayDescription: false,
                displayName: "手机",
                fieldType: "text",
                rules: {
                    required: true,
                    isMobile: true
                },
                attr: {

                },
                itemValues: [],
                value: ''
            }, {
                itemName: 'email',
                isRequired: true,
                description: '',
                isDisplayDescription: false,
                displayName: "邮箱",
                fieldType: "text",
                rules: {
                    required: true,
                    isEmail: true
                },
                attr: {

                },
                itemValues: [],
                value: ''
            }],
            collectItems: []
        }

    },
    created() {
        let res = this.getForThisData();
        if(!res) return false;
        this.getPaypals();
        this.isEdit && this.$message('开始编辑活动')
    },
    beforeRouteLeave(to, from, next) {
        window.onbeforeunload = null
        $('#creatBtn').show();
        next()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'jumpTo'
    },
    computed: {
        isCanEdit() {
            return this.status == 'unpublished' || this.isEdit;
        },
        updateorcreate() {
            return this.$route.name == 'edit' ? '更新' : '发布'
        },
        percent() {
            let done = {}, //临时数组，已经完成填写的push到数组
                arr = 'categories,title,startTime,endTime,organizers,detailedAddress,content,contact.mobile,contact.email'.split(',') //所有数组
                arr.forEach((item) => {
                    if (item.indexOf('.') > -1) {
                        let item1 = item.split('.')[0],
                        item2 = item.split('.')[1]
                        this[item1][item2].length > 0 ? done[item2] = true : done[item2] = false

                    } else {
                    //content 类型特殊不能以length来判断是否为空
                    if (item === 'content') {
                        this[item][0].content.length > this.firstContentLength ? done[item] = true : done[item] = false
                    } else {
                        this[item].length > 0 ? done[item] = true : done[item] = false
                    }
                }

            })
                let i = 0
                for (var k in done) {
                    if (done[k]) {
                        i++
                    }
                }
                return parseInt(i / arr.length * 100)
            },
            ...mapGetters({
                userStatus: 'userStatus'
            })
        },
        mounted() {
            let def = [],
            oth = [];
            if (!this.id) {
                this.setStep(1);
                this.collectItems = $.extend(true, [], this.defaultElements);
                def = this.collectItems

            } else {
                if (this.collectItems && this.collectItems.length > 0) {
                    def = this.collectItems.slice(0, this.defaultElements.length);
                    oth = this.collectItems.slice(this.defaultElements.length, this.collectItems.length);
                }
            }
            this.$refs.formeditor.setElements(def, oth);
            EvtBus.$on('oldContent', function(data) {
                console.log('oldContent', data)
            })
            $('#creatBtn').hide()
            this.jumpTo()


            $.get(API_URL + '/event/getEventCategories', (res) => {
                this.categoriesArr = res
            })



            window.onbeforeunload = function() {
                if (this.id) {
                    return '活动尚未保存'
                }
            }
        },
        methods: {
            trim(ev){
                this.title = $.trim(ev.target.value)
            },
        // 至少20个字，或者一个图片
        htmlEditorHasModify() {
            let JQcont = $('<div>' + this.content[0].content + '</div>')
            return JQcont.text().length > this.firstContentLength || JQcont.find('img').length > 0 || JQcont.find('iframe').length > 0
        },
        getForThisData() {
            if (this.id) {
                let res = true;
                $.ajax({
                    url: API_URL + '/event/get',
                    data: {
                        id: this.id
                    },
                    async: false,
                    success: (data) => {
                        console.log(data)
                        if(data.status=='finished'){
                            this.$message('活动已结束,不能进行编辑');
                            res = false;
                            setTimeout(()=>{
                            this.$router.push({
                                path: '/'
                            })},2e3)
                            return false
                        }
                        formatTime(data)
                        //处理时间格式

                        //处理主办方
                        this.orianizerArr = data.organizers

                        // 处理门票
                        $.each(data.tickets, (i, o) => {
                            if (o.earlyBirdTicketSetting && o.earlyBirdTicketSetting.endTime != '') {
                                o.needEarlyBird = true
                            }
                            data.tickets[i] = $.extend(true, {}, ticketTemplate, o)
                        })
                        $.extend(true, this, data)
                        this.tickets = [].concat(data.tickets)
                    }
                });
                return res;
            }
        },
        getPaypals() {
            if (this.paymentPriceUnit == 'dollar') {
                $.get(API_URL + '/wallet/getWalletDetail', (data) => {
                    let account = data.paypalAccount && data.paypalAccount.filter((item) => {
                        return item.status !== 'deleted';
                    })
                    if (account && account.length) {

                        this.paypals = $.extend([], this.paypals, account);
                        this.paymentAccountIds = this.paymentAccountIds.toString() || this.paypals[0].accountId;
                    } else {
                        this.paymentAccountIds = '';
                    }
                })
            } else if (this.paymentPriceUnit == 'yuan' && this.paymentAccountIds) {
                this.paymentAccountIds = ''
            }
        },
        jumpTo() {
            var currentId = this.$route.params.id || 1;
            this.step = currentId;
            this.loadComponents(currentId + '')
        },
        loadComponents(id) {
            switch (id) {
                //选择分类
                case 1:
                break;
                    //活动名称
                    case 2:
                    break;
                    //时间地点
                    case '3':
                    loadAmap(this)
                    break;
                    case '4':
                    this.getOrianizerData()
                    this.getOrianizer()
                    case '8':
                    this.getFormField()
                    default:

                }
            },
            async validateForm(index) {
                try {
                    await this.$verify.check().then()
                } catch (e) {
                    return false
                }
            //每一步的验证
            var validate = {
                '2': function() {
                    if (this.categories.length < 1) {
                        this.$message({
                            message: '请选择一个活动分类',
                            type: 'warning'
                        })
                        return -1
                    }
                },
                '3': function() {
                },
                '4': function() {
                    if (!this.startTime || !this.endTime) {
                        this.$message.error('请填写活动日期')
                        return -1
                    }

                    if (parseInt(new Date(this.endTime).getTime()) - parseInt(new Date(this.startTime).getTime()) <= 0) {
                        this.$message.error('活动结束日期不能小于开始日期')
                        return -1
                    }

                    if (!this.detailedAddress) {
                        this.$message.error('请填写活动地址')
                        return -1
                    }

                    if (!this.lng && !this.onlineAddress) {
                        this.$message.error('请确认输入的地址有效')
                        return -1
                    }

                },
                //点主办方的下一步
                '5': function() {
                    if (!this.contact.mobile ) {
                        this.$message.error('请填写电话号码或者手机号')
                        return -1
                    }

                    if (!this.contact.email || !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.contact.email)) {
                        this.$message.error('请填写正确的邮箱地址')
                        return -1
                    }
                    return {
                        eventType: 'createEvent',
                        fn: this.createEvent()
                    }
                },
                '7': this.saveTkts
            }

            if (typeof validate[index] === 'undefined') {
                return
            }

            var validateResult = validate[index].bind(this)()
            if (validateResult !== -1 && $.type(validateResult) !== 'object') {
                this.setStep(index)
            } else if ($.type(validateResult) == 'object') {
                //活动创建成功
                validateResult.fn
                .done((res) => {
                    this.id = res.id;
                        // this.getForThisData();
                        this.setStep(index)
                    })
                .fail((status) => {
                    this.$message.error($.parseJSON(status.responseText).responseText)
                })
            }
        },
        //is online 
        setOnlie() {
            if (this.onlineAddress) {
                this.detailedAddress = '线上活动';
                $('#keyword').val('')
                this.lat = null;
                this.lng = null;
            } else {
                this.detailedAddress = '';
                this.loadComponents('3');
            }
        },
        submitEvtForm() {
            this.isLoading = true;
        },
        contentChange(val) {
            this.content = val
        },
        setCatego(cate, ischecked) {
            if (ischecked) {
                this.categories.splice(this.categories.indexOf(cate.value), 1)
                this.bannerArr.splice(this.bannerArr.indexOf(cate.originName), 1)
            } else {
                this.categories.length < categoriesLength ?
                this.categories.push(cate.value) & this.bannerArr.push(cate.originName) :
                this.$message.error('最多选择' + categoriesLength + '个类型')
            }
            if (this.bannerArr.length) {
                var currentCat = 'category_' + this.bannerArr[0]
                //随机取一张图片
                $.get(API_URL + '/event/pictures', {
                    type: currentCat,
                    page: 1,
                    limit: 20
                }, (res) => {
                    let numb = Math.floor(Math.random() * res.items.length);
                    this.bannerUrl = res.items[numb].url;
                    this.mobileBannerUrl = res.items[numb].url
                    console.log('设置this.thumbnail', this.thumbnail)
                    this.thumbnail = res.items[numb].url
                })
            }

        },
        setStep(index) {
            this.$router.push({
                name: this.$route.name,
                params: {
                    id: index,
                    eventId: this.$route.params.eventId
                }
            })
        },
        saveFormField(index) {
            let updateData = {
                id: this.id,
                collectItems: this.defaultElements
            }
            if (!updateData.collectItems.length) {
                return this.$message.error('没有表单采集项，不能提交！')
            }
            let option = {
                url: API_URL + '/event/update',
                data: updateData,
                success: (res) => {
                    this.setStep(5)
                },
                error: () => {
                    this.$message.error('保存失败，请重试')
                }
            }
            this.$refs.formeditor.upload(option)
        },
        updatebefore() {

            this.id == '' ? this.collectItems = this.defaultElements : '';
            let newdata = dataFilter(this.$data);
            $.each(newdata.tickets, function(i, o) {
                o.minCount==''?delete o.minCount:'';
                o.maxCount==''?delete o.maxCount:'';
                o.startSalesTime = o.startSalesTime || newdata.ctime;
                o.endSalesTime = o.endSalesTime || newdata.endTime;
                !o.needEarlyBird ? delete o.earlyBirdTicketSetting : '';
                !o.isAllowGroupPurchase ? delete o.groupPurchaseTicketSetting : ''
            })
            newdata.paymentAccountIds = newdata.paymentAccountIds ? newdata.paymentAccountIds.split(',') : []
            return newdata

        },
        createEventAfter(data) {
            this.collectItems = $.extend(true, [], data.collectItems)
            let def = this.collectItems.slice(0, this.defaultElements.length);
            let oth = this.collectItems.slice(this.defaultElements.length, this.collectItems.length);
            this.$refs.formeditor.setElements(def, oth);
        },
        createEvent() {
            let newdata = this.updatebefore(this.$data)
            console.log(newdata)
            //this.id 存在 则为编辑活动
            if (this.id) {
                return jQuery.post(API_URL + '/event/update', JSON.stringify(newdata))
            } else {
                return jQuery.post(API_URL + '/event/create', JSON.stringify(newdata), this.createEventAfter)
            }
        },
        getOrianizer() {
            // jQuery('.modal').modal()
            // jQuery('.sponsor.modal').modal('attach events', '#add-sponsor')
            // jQuery('.ui.checkbox').checkbox()
        },
        getFormField() {
            jQuery.get(API_URL + '/fieldType/getFieldTypeByIsCustomizableField/1', (res, status, xhr) => {
                this.formFiled = res
            })
        },
        getOrianizerData() {
            $.get(API_URL + '/user/getOrganizersByUserId', (res, status, xhr) => {
                this.orianizerArr = res
            }).error(() => {
                this.$message.error('登录信息已过期，请退出重新登录')
            })
        },
        //添加主办方
        addOrianizer() {
            var data = {
                "name": this.ori_name,
                "logo": this.ori_img,
                "website": this.ori_website
            }
            loadJs('/js/underscore-min.js', () => {
                let ishave = false;
                this.orianizerArr.forEach((o, i) => {
                    if (_.isEqual(data, o)) {
                        ishave = true;
                        return this.$message.error('请不要重复添加');
                    };
                });
                if (ishave) return;
                this.orianizerArr.push(data)
                this.organizers.push(data)
                this.ori_name = '';
                this.ori_img = '/images/no_logo.jpg';
                this.ori_website = '';
            })
        },
        //发布活动
        publish() {

            jQuery.post(API_URL + '/event/update', JSON.stringify({
                id: this.id,
                status: 'published',
                publish: true,
                pubTime: new Date()
            }), (res) => {
                this.isEdit = false;
                this.$message('活动发布成功！')
                this.status = 'published';
            }).error((res, status, xhr) => {
                this.$message.error('登录信息已过期，请退出重新登录')
            })

        },
        //增加一张门票设置
        addTkt() {
            this.tickets.push($.extend(true, {}, ticketTemplate))
        },
        rmTkt(index) {
            if (this.tickets.length === 1) {
                return this.$message.info('请至少保留一张门票')
            }
            this.tickets.splice(index, 1)
        },
        //编辑器提交
        updateHtml() {　 //updateHTML 
            setTimeout(() => {
                if (!this.htmlEditorHasModify()) {
                    this.$message.error(this.content[0].label + '不少于' + this.firstContentLength + '个字');
                    this.$refs.editor.swichTab(0);
                    return false;
                }
                let updateData = {
                    id: this.id,
                    content: this.content
                }
                jQuery.post(API_URL + '/event/update', JSON.stringify(updateData), (res) => {
                    this.setStep(5)
                }).error(function(err) {
                    this.$message.error(err)
                })
            }, 200)
        },
        async ticketMoreSetting(index,fn) {
            try {
                await this.$verify.check().then()
                this.ticketIsValied = true;
                typeof fn=='function'?fn():''
            } catch (e) {
                this.ticketIsValied = false
            }
            if(!fn)
            $('#advSet' + index).modal('hide');
        },
        setTicketTime(val, saletime, isend, field) {
            let rules = {},
            err = '开始时间不能早于结束时间'
            if (isend) {
                rules = {
                    minDate: saletime.startSalesTime
                }
                err = '结束时间不能早于开始时间'
            } else {
                rules = {
                    maxDate: saletime.endSalesTime
                }
            }
            let res = this.$verify.vali(field, val, rules)
            if (!res) {
                val = null
                setTimeout(() => {
                    this.$verify.$errors[field] = err
                }, 0)
            }
            if (isend) {
                saletime.endSalesTime = val
            } else {
                saletime.startSalesTime = val
            }
        },
        //保存门票信息
        saveTkts() {
            if (this.paymentPriceUnit == 'dollar' && this.paymentAccountIds == '') {
                this.$message.error('请添加贝宝账号');
                return -1;
            }
            this.btnLoading = true
            let newdata = this.updatebefore(this.$data);
            let updateData = {
                id: this.id,
                tickets: newdata.tickets,
                paymentPriceUnit: newdata.paymentPriceUnit,
                paymentAccountIds: newdata.paymentAccountIds
            }
            jQuery.post(API_URL + '/event/update', JSON.stringify(updateData), (res) => {
                this.btnLoading = false
                this.setStep(8)
            }).error((err, status, xhr) => {
                err.status == '401' ? this.$message.error('登录信息已过期，请退出重新登录') : this.$message.error($.parseJSON(err.responseText).responseText)
                this.btnLoading = false
            })
        },
        //高级设置
        advSetting(index) {
            let this_ = this
            this.ticketMoreSetting(index,()=>{
                $('#advSet' + index).modal('setting', 'closable', false).modal('show').modal({
                    onHide: () => {
                        console.log(this.ticketIsValied)
                        return this.ticketIsValied
                    }
                });
            })
        },
        setEndTime(arg, key) {
            this[key] = arg;
            (parseInt(new Date(this.endTime).getTime()) - parseInt(new Date(this.startTime).getTime()) <= 0) ?
            this.$message.error('开始时间不能大于结束时间'): '';
            (this.endTime == '' || (parseInt(new Date(this.endTime).getTime()) - parseInt(new Date(this.startTime).getTime()) <= 0)) ?
            this.endTime = moment(this.startTime).add(3, 'day').format('YYYY-MM-DD HH:mm'): ''

        }
    },
    components: {
        editor,
        headerSimple,
        'date-picker': myDatepicker,
        'form-editor': formEditor,
        'dropzone-upfile': dropzoneUpfile,
        'html2canvas':function(resolve) {
            //异步组件写法
            require(['../components/html2canvas'], resolve)
        }
    }
}
</script>
<style>
    @import "../assets/css/create_activity.css";
    @media only screen and (max-width: 767px) {
        .ui.big.form,
        .ui.big.button {
            font-size: 1em;
        }
        h2.ui.header {
            font-size: 1.1em;
        }
        h2.ui.header .sub.header {
            font-size: .8em!important;
        }
        .home-sorts .image .check {
            font-size: 1.5em !important;
        }
    }
</style>