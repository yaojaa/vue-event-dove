<template>
    <div class="event-view">
        <headers></headers>
        <div class="event-main">
            <div class="ui container">
                <div class="sub-title text-justify">
                    <h2 class="fwn"><span class="text-muted f16">门票及订单</span>/参会人信息</h2>
                    <router-link :to="{name:'myorder'}" class="ui basic button blue mini">返回</router-link>
                </div>
                <div class="white-wrap p-lg">
                    <div class="ui centered two column doubling stackable grid">
                        <div class="column">
                            <formView ref="formview" :formData="formData"></formView>
                            <div class="text-center mt-md">
                                <button class="ui button blue" @click="update">修改信息</button>
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
} from '../config'
import header from '../components/header'
import footer from '../components/footer'
import formView from '../components/form_editor/view.vue' //表单设计器
export default {
    name: 'participantInfo',
    data() {
        return {
            eventId: '',
            orderNumber: '',
            attendeeId: '',
            formData: {}
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            //如果未登录
            if (!localStorage.getItem('user')) {
                vm.$router.replace({
                    path: '/login'
                })
            }
        })

    },
    created() {
        if (this.$route.params.id === '') return false
        let arrInfo = this.$route.params.id.split('_')
        this.eventId = arrInfo[0]
        this.orderNumber = arrInfo[1]
        this.attendeeId = arrInfo[2]
        this.$store.getters.userStatus
        $.ajax({
            url: API_URL + '/formField/getFormFieldListByEventId',
            data: {
                eventId: this.eventId
            },
            async: false,
            success: (data) => {
                this.formData.elments = $.extend(true, [], data)
            },
            error: () => {

            }
        })
        $.ajax({
            url: API_URL + '/attendee/getAttendee',
            data: {
                orderNumber: this.orderNumber,
                attendeeId: this.attendeeId
            },
            async: false,
            success: (data) => {
                $.each(this.formData.elments, function(i, o) {
                    o.value = data.attendeeInfo.collectInfo[o.itemName]
                })
            },
            error: () => {

            }
        })
    },
    mounted() {

    },
    methods: {
        async update() {
            let res
            try {
                res = await this.$refs.formview.submit()
            } catch (e) {
                res = e
            }
            if (typeof res === 'object') {
                let data = {
                    orderNumber: this.orderNumber,
                    attendeeId: this.attendeeId,
                    collectInfo: {}
                }
                $.each(res[1], (i, o) => {
                    data.collectInfo[o.itemName] = o.value
                })
                $.post(API_URL + '/attendee/updateAttendee', JSON.stringify(data), (data) => {
                    this.$message.success('修改成功')
                }).error((err) => {
                    this.$message.error(err)
                });
            }
        },
        //续费
        renew: function() {}
    },
    components: {
        headers: header,
        footers: footer,
        formView
    }
}
</script>
<style scoped>
</style>
