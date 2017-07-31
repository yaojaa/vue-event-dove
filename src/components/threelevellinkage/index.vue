<template>
    <div class="two fields">
        <div class="field">
            <select class="ui dropdown select-div" @change="fnSetNextList(datalist)" v-model="provincename" v-if="parseInt(selectlength)>=1">
                <option v-for="(data,k) in datalist" :value="data.name=='省'?'':data.name">{{data.name}}</option>
            </select>
        </div>
        <div class="field">
            <select class="ui dropdown select-div " @change="fnSetNextList(citys)" v-model="cityname" v-if="parseInt(selectlength)>=2">
                <option v-for="(city,k) in citys" :value="city.name=='市'?'':city.name">{{city.name}}</option>
            </select>
        </div>
        <div class="field">
            <select class="ui dropdown select-div " @change="fnSetNextList()" v-model="districtname" v-if="parseInt(selectlength)==3">
                <option v-for="(district,k) in districts" :value="district.name=='区'?'':district.name">{{district.name}}</option>
            </select>
        </div>
    </div>
</template>
<script>
import data from './data'
export default {
    name: 'threelevelinkage',
    data() {
        return {
            datalist: data,
            provincename: '',
            cityname: '',
            citys: [{
                name: '市'
            }],
            districtname: '',
            districts: [{
                name: '区'
            }],
            districtname: '',
            value: ''
        }
    },
    props: {
        'selectlength': {
            type: Number,
            default: 2
        },
        'defaultValue': {
            type: [Object, String],
            default: ''
        }
    },
    mounted() {
        $('.ui.dropdown.select-div').dropdown();
    },
    created() {
        if (!this.defaultValue) return;
        let arr = this.defaultValue;
        if (typeof this.defaultValue === 'string') arr = this.defaultValue.split(',');

        arr[0] ? (this.provincename = arr[0]) && this.fnSetNextList(this.datalist, true) : '';
        arr[1] ? (this.cityname = arr[1]) && this.fnSetNextList(this.citys, true) : '';
        arr[2] ? (this.districtname = arr[2]) : '';
    },
    methods: {
        fnSetNextList(list, cantEmit) {
            if (list) {
                $.each(list, (i, o) => {
                    if (typeof o.city !== 'undefined') {
                        if (this.provincename == o.name) {
                            this.citys = o.city;
                            this.citys.unshift({
                                name: '市'
                            })
                            this.cityname = ""
                            this.districtname = ""
                            this.provincename = o.name;
                            this.$forceUpdate()
                            return false;
                        }
                    } else if (typeof o.district !== 'undefined') {
                        if (this.cityname == o.name) {
                            this.districts = o.district;
                            this.citys.unshift({
                                name: '区'
                            })
                            this.districtname = ""
                            this.cityname = o.name;
                            this.$forceUpdate()
                            return false;
                        }
                    }
                })
                this.value = this.selectlength == 2 ? this.provincename + ',' + this.cityname : this.provincename + ',' + this.cityname + ',' + this.districtname
            }
            if (!cantEmit)
                this.$emit('linkagechange', this.value);
            console.log(this.value)
        },
        fnSetCity() {

        }
    }
}
</script>
