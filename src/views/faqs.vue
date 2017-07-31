<template>
<div class="event-view">
    <headers></headers>
    <div class="event-main">
        <div class="ui inverted vertical masthead center aligned segment blue p-xl">
            <p class="mb-n" style="font-size: 28px;">——  &nbsp;常见问题&nbsp;  ——</p>
            <p class="f16">Frequently Asked Questions</p>   
        </div>
        <div class="ui container m-xl">
            <div class="block-tab">
                <div class="ui four item secondary left menu f16">
                    <a class="item active" data-tab="first">
                        <span>
                            <i class="unmute icon"></i>主办方常见问题
                        </span>
                    </a>
                    <a class="item" data-tab="second">
                        <span>
                            <i class="users icon"></i>参会者常见问题
                        </span>
                    </a>
                </div>
                <div class="ui tab active" data-tab="first">
                    <div class="ui divided items p-md">
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">活动发布需要会鸽审核吗？</div>
                                <div class="description text-muted mt-md">活动发布成功后，会鸽工作人员会实时审核活动的内容，如果活动内容涉及作假诈骗，会鸽会下架您的活动。</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">收费活动，会鸽可以代收款并开发票吗？</div>
                                <div class="description text-muted mt-md">活动收入款会打款到您钱包账户中，您可绑定银行账户，提现到银行卡。会鸽可以提供活动收入款的发票。</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">活动如何传播？</div>
                                <div class="description text-muted mt-md">将链接或者二维码放置微信公众号自定义菜单，微信推文、微信群、QQ群、朋友圈、官网、海报等一切你可以想到的渠道传播……</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">参会者如何报名参加？</div>
                                <div class="description text-muted mt-md">参会者可通过手机端/PC端无需下载、无需登录即可打开活动、点击报名并完成支付。</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">我们活动报名已经截止了，只需要签到如何操作？</div>
                                <div class="description text-muted mt-md">会鸽活动管理支持第三方数据导入，需满足以下条件：一、导入数据中参会者姓名、邮箱、手机号为必填项；二：开通至尊版。数据导入后台后，可以利用APP进行现场签到，具体可联系我们：010-61138799-8042.</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">如何将在会鸽上创建的活动嵌入我们官网？</div>
                                <div class="description text-muted mt-md">1.登录账号进入，2.选择已创建的活动，点击管理，3.进入管理后台，左边菜单栏市场推广选择：网站嵌入，点击复制链接，第二步，进入自己官网后台，将刚才复制的链接直接黏贴到官网后台对应位置即可。</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">如何做活动数据复盘？</div>
                                <div class="description text-muted mt-md">活动结束，可根据后台数据研究沉淀的参会者信息（表单信息），查看客户参与所有活动的记录（用户轨迹），把握参会者兴趣走向（用户标签变化），筛选重新分组，为下次精准推送活动做足准备。</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn"> “活动管理” 中群发服务的 “发短信” 和 “发邮件” 怎么用？</div>
                                <div class="description text-muted mt-md ">
                                    <div>1.活动推广时，可使用短信或邮件进行推广您的活动，选择以往的参会者或倒入的联系人后，便可发送您的活动邀请函；</div>
                                    <p>2.活动通知时，可使用短信或邮件给不同状态的购票人或参会者发送相关通知事项，选择好收件人类型后，便可与您的参会者零距离沟通。</p>
                                    <div class="text-orange">提示：参会者报名成功，系统会自动通知参会者，此短信免费，如需另外短信通知用户，需跟运营商购买，0.1元一条</div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">群发短信部分成员收不到？</div>
                                <div class="description text-muted mt-md">
                                    <div>受国家管制政策影响，短信群发功能只能发送正规的通知信息，暂停发送带有营销广告性质类型的内容，这也是为了避免用户被无效信息骚扰。部分报名者之前退订过运营商提供的其他信息服务，被自动添加到了“防垃圾信息保护名单”所以被拒，遇到这种情况可以直接向我们反馈，我们会联系运营商帮你解决这个问题。</div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">短信内容中的前缀【会鸽】可以修改吗？</div>
                                <div class="description text-muted mt-md">
                                    <div>【会鸽】是系统自带，暂时不支持自定义修改。</div>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">会鸽平台是怎么保护用户数据安全的？</div>
                                <div class="description text-muted mt-md">
                                    <div>1.用户数据安全一直都是会鸽关注的重点，也是我们为参会者提供所有服务的基础。</div>
                                    <div>2.我们先后服务过政府机构、数百家高校团委、数千家商协会组织，有着多年的诚信档案，从未出现过数据泄露或其他相关问题。</div>
                                    <div>3.在产品系统上，我们使用了多重安全机制，防止SQL注入、跨站脚本等各种形式的网络攻击，而且每天都会自动备份三次，就算有突发情况，也会将用户损失降低到最低限度。</div>
                                </div>
                            </div>
                        </div>
                         <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">为什么支付时显示的不是主办方的名称？付款后的款项在在哪？</div>
                                <div class="description text-muted mt-md">
                                    为保证消费者权益，用户购票所付票款将先打到会鸽网公司的银行帐号。会鸽网将替主办方代收票款。
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">如何进行款项的提取？</div>
                                <div class="description text-muted mt-md">
                                    待主办方活动举办成功后，通过主办方活动管理中心-钱包管理点击申请提款按钮，我们将在3-7个工作日内将门票收入汇给主办方指定帐号。
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">如何在首页上发布自己的活动？</div>
                                <div class="description text-muted mt-md">
                                    您的任何推广宣传的需求都可以随时联系我们 &nbsp; 13810164107
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="middle aligned content">
                                <div class="text-center text-muted mt-xl">
                                    <p>如果您需要技术支持，请联系我们</p>
                                    <p>电话: 010-61138799-8042</p>
                                    <img width="5%" src="/images/issueDove.png" alt="">
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="ui tab" data-tab="second">
                    <div class="ui divided items p-md">
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">请问审核门票的电子票何时能收到？</div>
                                <div class="description text-muted mt-md">会鸽第三方活动技术支持，若您报名选择了审核票，需要主审核通过后才会给参会者发送电子票，一般1-2个工作日，如有疑问，可以直接进入主办方活动网站，您可直接与主办方取得联系。</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">因一些原因不能参会，需要退票如何操作？</div>
                                <div class="description text-muted mt-md">会鸽是第三发服务平台，退票事宜请联系主办方，您可以直接进入主办方活动网站，点击右下角有主办方具体联系方式。购票时是否产生手续费，若产生手续费需问主办方。</div>
                            </div>
                        </div>
                        <!-- <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">活动发票什么时候开？</div>
                                <div class="description text-muted mt-md">会鸽是第三发服务平台，退票事宜请联系主办方，您可以直接进入主办方活动网站，点击右下角有主办方具体联系方式。</div>
                            </div>
                        </div> -->
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">报名的信息是否可以修改？</div>
                                <div class="description text-muted mt-md">
                                    <div>报名信息可以修改，有以下几种修改方式：</div>
                                    <div>1.您可登录会鸽进入“门票及订单”，可在门票或订单中修改参会者信息；</div>
                                    <div>2.您可进入报名成功邮件中点击“修改信息”；</div>
                                    <div>3.您可在短信中点击电子票链接后，点击“修改信息”；</div>
                                    <div>4.关注会鸽微信服务号，进入点击底部导航“个人中心”选择“我的账号”-“我的电子票”，电子票详情中点击“修改信息”。</div>
                                </div>
                            </div>
                        </div>
                       
                        <!-- <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">报名成功后未收到成功提示？</div>
                                <div class="description text-muted mt-md">
                                    <p>短信未收到：您之前可能退订过会鸽提供的其他信息服务，被自动添加到了“防垃圾信息保护名单”所以被拒，遇到这种情况可以直接查看您的垃圾短信里去查找</p>
                                    <p>邮箱未收到：如果长时间没有收到邮件，确认一下垃圾箱里有没有，没有请将 support@eventdove.com 加入邮箱联系人，点击重新发送。</p>
                                </div>
                            </div>
                        </div> -->
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">报名成功后，没有收到通知怎么办？</div>
                                <div class="description text-muted mt-md">
                                    报名成功后，系统会以短信或邮件的方式发送电子票。如没有收到，可在垃圾邮件中进行查找，短信未收到与会鸽客服联系！
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">购买的门票如何开取发票？</div>
                                <div class="description text-muted mt-md">
                                    您购买的门票需开发票，若报名没有发票项可选，则需要与主办方进行确认！
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ui mini image">
                                <img src="/images/faqs.png" alt="">
                            </div>
                            <div class="middle aligned content p-sm">
                                <div class="header fwn">报名不成功或缴费不成功怎么办？</div>
                                <div class="description text-muted mt-md">
                                    可联系会鸽客服，了解您具体操作后，给予进一步的解决方案。
                                </div>
                            </div>
                        </div>
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
    API_URL
} from '../../config'
import header from '../components/header'
import footer from '../components/footer'
export default {
    data() {
            return {

            }
        },
        mounted() {
            $('.menu .item')
              .tab()
            ;
        },
        methods: {
            //续费
            renew: function() {

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
