<template>
    <div class="ui container">
        <div class="sub-title text-justify">
            <h2 class="fwn">会员管理</h2>
            <button class="ui blue button mini basic">新建</button>
        </div>
        <div class="white-wrap p-lg">
            <div class="ui divided items items-md">
                <div class="item">
                    <div class="ui tiny image">
                        <img src="/images/pp01.png">
                    </div>
                    <div class="content">
                        <div class="header fwn">DIA VIP会员</div>
                        <div class="meta space-sm">
                            <span class="cinema">我填写会员简介</span>
                        </div>
                        <div class="description text-muted">
                            <span class="mr-md">2900会员</span><span class="mr-md">会员活动：20</span>
                        </div>
                    </div>
                    <div class="right">
                        <a class="ui blue button mini">会员</a>
                        <a class="ui blue button mini">设置</a>
                    </div>
                </div>
                <div class="item">
                    <div class="ui tiny image">
                        <img src="/images/pp02.png">
                    </div>
                    <div class="content">
                        <div class="header fwn">DIA VIP会员</div>
                        <div class="meta space-sm">
                            <span class="cinema">我填写会员简介</span>
                        </div>
                        <div class="description text-muted">
                            <span class="mr-md">2900会员</span><span class="mr-md">会员活动：20</span>
                        </div>
                    </div>
                    <div class="right">
                        <a class="ui blue button mini">会员</a>
                        <a class="ui blue button mini">设置</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="sub-title text-justify">
            <h2 class="fwn">我加入的会员</h2>
        </div>
        <div class="white-wrap p-lg">
            <div class="ui divided items items-md">
                <div class="item">
                    <div class="ui tiny image">
                        <img src="/images/pp03.png">
                    </div>
                    <div class="content">
                        <div class="header fwn">DIA VIP会员</div>
                        <div class="meta space-sm">
                            <span class="cinema">我填写会员简介</span>
                        </div>
                        <div class="description text-muted">
                            <span class="mr-md">2900会员</span><span class="mr-md">会员活动：20</span>
                        </div>
                    </div>
                    <div class="right text-right">
                        <div class="btn-group"><a class="ui blue button mini">查看</a>
                            <a class="ui yellow button mini">续费</a></div>
                        <p class="text-muted mt-sm">会员到期时间：2017／12／22</p>
                    </div>
                </div>
            </div>
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
