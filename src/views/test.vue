<template>
    <div>
        <input type="number" v-model="tickets[0].minCount" name="">
    </div>
</template>
<script>
import Auth from '../auth' //添加门票的模版
let ticketTemplate = {
    "name": "",
    "describe": "",
    "needAudit": false,
    "needEarlyBird": false,
    "needSalesTime": false,
    "defaultPrice": '',
    "startSalesTime": null, //"Value for [tickets][0][startSalesTime] must be a date or a valid string or null.
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
export default {
    name: 'test',
    data() {
        return {
            "tickets": [$.extend(true, {
                name: '免费票',
                defaultPrice: 0,
                totalCount: 100000000
            }, ticketTemplate)],
            checkbox: true,
            radiovalue: '',
            radioArr: ['11111', '22222', '33333333'],
            checkvalue: [],
            checkArr: ['1-----', '2-----', '3-----'],
            selectvalue: '凄凄切切群',
            selectArr: ['凄凄切切群', 'ssssss', 'dddddddd'],
            captcha: '',
            value: null
        }
    },
    created() {
        console.log(this.tickets)
    },
    mounted() {
        console.log(this.value)
    },
    methods: {
        getCaptcha() {
            Auth.getCaptcha(this, '#svg')
        }
    }
}
</script>
