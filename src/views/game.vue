<template>
    <div>
        <p class="text-center mt-lg ui" v-if="res!=''">{{res}}</p>
        <div class="checker" :style="'width:'+30*checker+'px'">
            <div @click="addOne(point,index)" v-for="(point,index) in allPoint" class="point" :class="ponitCoontent(point)||(active==1?'baizi':'heizi')">
                <span></span>
            </div>
        </div>
        <div class="ui five column padded grid bg-gray center">
            <button class="button black ui column" @click="init">重新开始</button>
            <button class="button gray ui column" @click="revoke" :disabled="(!press.length)||res!==''">撤销</button>
        </div>
        <div class="ui checkbox baifang" v-ui>
            <input type="radio" :value="baiValue" v-model="active">
            <label>白方</label>
        </div>
        <div class="ui checkbox heifang" v-ui>
            <input type="radio" :value="heiValue" v-model="active">
            <label>黑方</label>
        </div>
    </div>
</template>
<script>
    import Auth from '../auth'
    const checker = 20;
    const lineSize = 5;
    export default {
        name: 'game',
        data() {
            return {
                checker: checker,
                lineSize: lineSize,
                allPoint: new Array(checker * checker),
                baiValue: 1,
                heiValue: -1,
                default: 0,
                active: 1,
                res: '',
                press: []
            }
        },
        created() {
            this.init();
        },
        mounted() {},
        computed: {},
        methods: {
            init() {
                $.each(this.allPoint, (i, o) => {
                    let obj = {
                        'V': this.default
                    };
                    this.allPoint[i] = obj;
                });
                this.active = 1;
                this.res = '';
                this.press = [];
            },
            revoke() {
                let last = this.press.pop();
                this.allPoint[last] = 0;
            },
            isSuccess() {
                let res = 0;
                $.each(this.lines, (i, o) => {

                    let size = 0,
                    prev = 0;
                    $.each(o, (ii, oo) => {
                        let value = this.allPoint[oo].V;
                        if (prev == value) {
                            size += value;
                        } else {
                            size = value;
                        }

                        prev = value
                        // console.log(size,value,ii,oo)
                        if (Math.abs(size) == lineSize) {
                            return false
                        }
                    })
                    if (Math.abs(size) == lineSize) {
                        res = size;
                        return false
                    }
                })
                return res;
            },
            ponitCoontent(pointV) {
                let status = {
                    '-1': 'hei',
                    '0': '',
                    '1': 'bai'
                }
                return status[pointV.V]
            },
            addOne(pointV, index) {
                if (pointV.V == 0 && this.res == '') {
                    this.press.push(index);
                    pointV.V = this.active;
                    this.active = -this.active;
                    this.setLines(index);
                    let text = {
                        '-5': '黑方胜利',
                        '0': '',
                        '5': '白方胜利'
                    }
                    // console.log(text[this.isSuccess()])
                    this.res = text[this.isSuccess()]
                }
            },
            setLines(index) {
                this.lines = new Array(4);

                function min(space) {
                    let pd = space == checker + 1 ? 0 : checker - 1;
                    for (var i = index; i % checker != pd && i - space >= 0; i -= space) {
                    // console.log(i)
                }
                return i;
            }

            function max(space) {
                let pd = space == checker - 1 ? 0 : checker - 1;
                for (var i = index; i % checker != pd && i + space < checker * checker; i += space) {}
                    return i;
            }
            let arr = [
                // 横线
                [1, index - index % checker, index - index % checker + checker - 1],
                // 竖线
                [checker, index % checker, checker * checker - 1 - (checker - index % checker - 1)],
                // 反斜线\
                [checker + 1, min(checker + 1), max(checker + 1)],
                // 正斜线/
                [checker - 1, min(checker - 1), max(checker - 1)]
                ]
                $.each(this.lines, (i, o) => {

                    this.lines[i] = [];
                    for (let minvalue = arr[i][1]; minvalue <= arr[i][2]; minvalue += arr[i][0]) {
                        this.lines[i].push(minvalue);
                    }

                });
            }
        }
    }
</script>
<style scoped>
    .checker {
        margin: 20px auto;
        box-shadow: 1px 1px 10px #333
    }

    .checker:after {
        content: '';
        clear: both;
        display: block;
        height: 0;
    }

    .point {
        width: 30px;
        height: 30px;
        background: #fff;
        float: left;
        position: relative;
    }
    .point:after,.point:before{
        height:30px;
        width:1px;
        background:#eee;
        content:'';
        display:block;
        left:15px;
        top:0;
        position: absolute;
        z-index: 1
    }
    .point:before{width:30px;height: 1px;top:15px;left:0;}

    .point.baizi:hover span,.point.heizi:hover span{
        display:block;
        opacity:.5;
    }
    .baizi:hover span{background:#fff;}
    .heizi:hover span{background:#000;}
    .baifang {
        position: absolute;
        left: 20px;
        top: 20px;
    }

    .heifang {
        position: absolute;
        right: 20px;
        top: 20px;
    }

    .point span {
        width: 20px;
        height: 20px;
        margin: 5px;
        border-radius: 50%;
        box-shadow: 1px 1px 3px #333;
        display: none;
        position: relative;
        z-index: 2
    }

    .point.bai span {
        background: #fff;
        display: block;
    }

    .point.hei span {
        background: #333;
        display: block;
    }
</style>
