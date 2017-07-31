<template>
    <div class="ui borderless primary  menu mt-lg" v-if="allPage>1">
        <a class="icon item" :class="{'disabled':currentPage == 1 }" @click="(1 != currentPage)?currentPage-- && goto(currentPage):''">
            <i class="angle left icon"></i>
        </a>
        <a class="item" v-for="index in pages" @click="goto(index)" :class="{'active':currentPage == index}" :key="index">
                    {{index}}
                  </a>
        <a class="icon item" :class="{'disabled':allPage == currentPage }" @click="(allPage != currentPage)?currentPage++ && goto(currentPage++):''">
            <i class="angle right icon"></i>
        </a>
    </div>
</template>
<script>
export default {
    name: 'page',
    data() {
        return {
            currentPage: 1,
            showItem: 5,
            allPage: 1
        }
    },
    created() {
        // this._data = this.pageData
    },
    watch:{
        currentPage(val){
            this.$emit('gotoPage',val)
        },
    },
    computed: {
        pages () {
            var pag = [];
            if (this.allPage < this.showItem) { //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                var i = Math.min(this.showItem, this.allPage);
                while (i) {
                    pag.unshift(i--);
                }
            } else { //当前页数大于显示页数了
                var middle = this.currentPage - Math.floor(this.showItem / 2), //从哪里开始
                    i = this.showItem;
                if (middle > (this.allPage - this.showItem)) {
                    middle = (this.allPage - this.showItem) + 1
                }
                if(middle<=0){
                    middle = 1
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
            return pag
        }
    },
    methods: {
        goto (index){
            if (index == this.currentPage) return;
            this.currentPage = index;
            //这里可以发送ajax请求
            
        },
        setpageData(val){
            this.currentPage = val.currentPage
            this.showItem = val.showItem || 5
            this.allPage = val.allPage
        }
    }
}
</script>
