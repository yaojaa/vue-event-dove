<template>
    <div class="manage-main">
        <div class="ui container">
            <div class="sub-title text-justify">
                <h2 class="fwn"><span class="text-muted f16">活动通知</span>/邮件通知</h2>
                <span>
                    <router-link  to="./drafts" class="mr-md">草稿箱</router-link>
                    <a href="#">邮件发送记录</a>
                </span>
            </div>
            <div class="white-wrap p-xl">
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
        mounted: function() {

        },
        components: {

        }
}
</script>
<style scoped>
</style>
