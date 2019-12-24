<template>
    <div class="chooseToOrder">
        <picker
            :value="dateIndex" 
            :range="dateList"
            @change="bindPickerChange"
        >
            <div class="picker">
                <span>预约日期</span>
                <div class="dateValue">
                    <span>{{dateList[dateIndex]}}</span>   
                    <img class="arrow" src="/static/images/arrow.png" />
                </div>
            </div>
        </picker>
        <div class="bar"></div>
        <div class="orderTime">
            <div class="title">预约时间</div>
            <div class="chooseAll" @click="clickChooseAll">
                <div :class="[chooseAll?'greenBg':'' ,'choosed']">
                    <img :class="chooseAll?'':'disvisable'" src="/static/images/choosed.png"/>
                </div>
                <div class="choice">全选</div>
            </div>
            <div class="timeTable">
                <div 
                    :class="[isChoose[index]?'greenbutton':'', {'unable': timeList[index].preserved!=0}, 'time']" 
                    v-for="(time, index) in timeList" 
                    :key="index" 
                    @click="chooseTime(index)"
                >
                    {{time.value}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "timeChoose",
    props: {
        timeList: Array,
        dateList: Array,
        dateIndex: Number,
        isChoose: Array,
        chooseAll: Boolean
    },
    data() {
        return {
            tindex: 0
        }
    },
    methods: {
        chooseTime(index) {
            this.tindex = this.dateIndex;
            this.$forceUpdate();
            this.$emit("updateChoosedTime", index);
        },
        bindPickerChange(e) {
            //获取当前时间下标
            if(e.mp.detail.value!=this.tindex) {
                this.$emit('update', e.mp.detail.value)
                this.tindex = this.dateIndex;
            }
        },
        clickChooseAll() {
            console.log("全选按钮被点击")
            this.$emit('clickChooseAll')
        }
    },
    onShow() {
        this.tindex = this.dateIndex;
    },
    created() {
        this.$emit('update', 0);
        this.tindex = this.dateIndex;
    },
    onUnload() {
        this.$emit('update', 0);
        this.tindex = this.dateIndex;
    }
}
</script>

<style scoped>
.chooseToOrder{
    background-color: white;
}
.chooseToOrder>div{
    width: 343px;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
}
picker{
    width: 343px;
    height: 44px;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 12px;
    color: #2E2E2E;
}
.picker{
    width: 100%;
    height: 12px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto; 
}
.picker>div{
    display: inline-block;
}
.dateValue{
    position: absolute;
    right: 18.5px;
}
.arrow{
    width: 7.13px;
    height: 12.97px;
    position: absolute;
    top: 0;
    bottom: 0;
    line-height: 12px;
    margin: auto;
    margin-left: 10.5px;
}
.bar{
    height: 0.5px;
    top: 0.5px;
    background-color: #A8A8A8;
}
.timeTable{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 8px;
    grid-column-gap: 8px;
    padding-bottom: 16px;
}
.title{
    color: #2E2E2E;
    font-size: 12px;
    margin-bottom: 8px;
    margin-top: 16px;
}
.time{
    width: 78px;
    height: 32px;
    display: inline-block;
    border: 2px solid #44644A;
    border-radius: 24px;
    line-height: 32px;
    font-size: 10px;
    text-align: center;
    color: #44644A;
    box-sizing: border-box;
}
.greenbutton{
    background-color: #44644a;
    color: white;
}
.unable{
    color: #A8A8A8 !important;
    border-color: #A8A8A8 !important;
}
.chooseAll{
    width: 60px;
    position: absolute;
    top: 0;
    right: 0;
    height: 18px;
}
.choice{
    display: inline-block;
    height: 18px;
    vertical-align: top;
    color: #2E2E2E;
    font-size: 12px;
    line-height: 18px;
    position: absolute;
    left: 20px;
    top: 0;
}
.choosed{
    display: inline-block;
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    border: 0.6px solid black;
    margin-right: 8px;
    box-sizing: border-box;
    top: 0;
    left: 0;
}
.choosed>img{
    width: 70%;
    height: 70%;
    position: absolute;
    right: 0;
    display: block;
    left: 0;
    bottom: 0;
    top: 0;
    margin: auto;
}
.disvisable{
    visibility: hidden;
}
.greenBg{
    background-color: #44644A;
}
</style>