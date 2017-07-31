<template>
<div class="event-view">
    <headers></headers>
    <div class="event-main">
        <div class="bg-white visual-area">
            <div class="text-center text-white Ptop">会鸽，让活动更精彩 !</div>
            <div class="w690 footerBar">
                <p class="text-blue f16 mb-xs"><b>保护隐私原则</b></p>
                <span class="f14 text-muted">会鸽承若将使用最先进的技术对您所提供的资料、您举办的活动的参与者信息进行严格的管理及保护。会鸽将采取合理的措施和合理的安全手段存储保护好这些资料与信息，以防止丢失、被盗用或被窜改。在未得到您的许可之前，会鸽不会把您的任何个人信息提供给无关的第三方（包括公司或个人）。
                </span>
            </div>
            <div class="w690 mt-lg">
                <p class="text-blue f16 mb-xs"><b>免责条款</b></p>
                <span class="f14 text-muted"> 在如下情况下，本站将不对您的隐私泄露承担责任：</span>
                <ul class="f14 text-muted m-auto" style="padding-left: 15px;">
                    <li class="mt-sm">您同意让第三方共享资料；</li>
                    <li class="mt-sm">您同意公开您的个人资料，享受为您提供的产品和服务；</li>
                    <li class="mt-sm">本站需要听从法庭传票、法律命令或遵循法律程序；</li>
                    <li class="mt-sm">因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用。</li>
                </ul>
            </div>
            <div class="w690 mt-lg">
                <p class="text-blue f16 mb-xs"><b>隐私政策的修订</b></p>
                <span class="f14 text-muted">会鸽时常会对隐私政策进行修改。如果在使用用户个人信息政策方面有修改时，我们会在网页中显著的位置发布相关规定以便及时通知用户。
                </span>
            </div>
            <div class="w690 mt-lg" style="margin-bottom:7em;">
                <p class="text-blue f16 mb-xs"><b>联系会鸽</b></p>
                <span class="f14 text-muted">会鸽将始终致力于在充分保护您隐私的前提下，为您提供最优秀的服务。如果您对此隐私政策有任何疑问或建议，请通过以下方式联系我们：privacy@eventdove.com。
                </span>
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
   .Ptop{
        text-shadow: 2px 2px 5px rgba(0,0,0,0.8);
        line-height: 125px;
        height: 125px;
        background: url(/images/Group.png) no-repeat center center;
        background-size: cover;
        font-size: 30px;
    }
    .w690{
        margin-left: auto;
        margin-right: auto;
        max-width: 690px;
    }
    .w690 span{line-height: 1.9em;}
</style>
