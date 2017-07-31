<template>
<div class="event-view">
    <headers></headers>
    <div class="event-main">
        <div class="ui container">
            <div class="sub-title text-justify"><h2 class="fwn">我的钱包</h2></div>
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

</style>
