<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn"><span class="text-muted f16">我的钱包</span>/添加账户</h2>
                    <a href="#" class="ui basic button blue mini" @click="$router.go(-1)">返回</a>
                </div>

                <div class="ui two column doubling stackable grid">
                    <div class="equal row">
                        <div class="column">
                            <div class="white-wrap p-lg">
                                <h2 class="ui header">
                                  <i class="circular users icon blue"></i>
                                  <div class="content">
                                    企业账号
                                    <div class="sub header mt-sm f14">对公银行卡号</div>
                                  </div>
                                </h2>
                                <div class="ui divider"></div>
                                <div class="text-info space-lg">
                                    <p>1.针对于已具备登记证书的主办方/营业执照的企业。</p>
                                    <p>2.收入结算时间为T+1</p>
                                </div>
                                <div class="ui divider hidden"></div>
                                <router-link to="/bankCardEnterprise" class="ui animated fade button blue basic fluid large">
                                    <div class="visible content">选择并继续</div>
                                    <div class="hidden content">
                                        去添加对公银行卡 <i class="chevron circle right icon"></i>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <div class="column">
                            <div class="white-wrap p-lg">
                                <h2 class="ui header">
                              <i class="circular user icon teal"></i>
                              <div class="content">
                                个人账号
                                <div class="sub header mt-sm f14">个人银行卡号</div>
                              </div>
                            </h2>
                                <div class="ui divider"></div>
                                <div class="text-info space-lg">
                                    <p>1.针对于未曾在相关部门登记在案的主办方，可以人名义 认证。
                                    </p>
                                    <p>2.收入结算时间为每周二。</p>
                                </div>
                                <div class="ui divider hidden"></div>
                                <router-link to="/bankCardPersonal" class="ui animated fade button teal basic fluid large">
                                    <div class="visible content">选择并继续</div>
                                    <div class="hidden content">
                                        去添加个人银行卡 <i class="chevron circle right icon"></i>
                                    </div>
                                </router-link>
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
import header from '../components/header'
import footer from '../components/footer'
export default {
    components: {
        headers: header,
        footers: footer,
    }
}
</script>
