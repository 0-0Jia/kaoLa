<template>
    <div class="chooseToOrder">
        <picker
            :value="index" 
            :range="dateList"
            @change="bindPickerChange"
        >
            <div class="picker">
                <span>预约日期</span>
                <div class="dateValue">
                    <span>{{dateList[index]}}</span>   
                    <img class="arrow" src="/static/images/arrow.png" />
                </div>
            </div>
        </picker>
        <div class="bar"></div>
        <div class="orderTime">
            <div class="title">预约时间</div>
            <div class="timeTable">
                <div 
                    :class="[{'greenbutton': isChoose[index]}, {'unable': timeList[index].preserved!=0}, 'time']" 
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
        dateList: Array
    },
    data() {
        return {
            isChoose: [],
            choosedTime: [],
            able: false,
            index: 0,       //选择的时间的下标
            tindex: 0
        }
    },
    methods: {
        chooseTime(index) {
            if(this.timeList[index].preserved == 0) {
                this.isChoose[index] = !this.isChoose[index];
                // this.index = 0;
                // this.index = this.tindex;
                //将选择的时间段传到父组件
                this.choosedTime = [];
                this.isChoose.forEach((flag, i) => {
                    if(flag) {
                        this.choosedTime.push(this.timeList[i].value);
                    }
                });
                //如果有选择时间，则支付按钮点亮
                this.able = false;
                if(this.choosedTime.length>0) {
                    this.able = true;
                }
                this.$emit("sendChoosedTime", {choosedTime:this.choosedTime, able:this.able});
            }
        },
        bindPickerChange(e) {
            //获取当前时间下标
            this.index = e.mp.detail.value;
            console.log(this.index);
            if(this.index!=this.tindex) {
                //如果重新选择的时间和当前时间不一样。则刷新时间段的选择
                this.choosedTime = [];
                this.isChoose = [];
                this.able = false;
                this.$emit("sendChoosedTime", {choosedTime:this.choosedTime, able:this.able});
            }
            this.tindex = this.index;
            this.$emit("refreshTimeList", this.index);
        }
    },
    onShow() {
        this.index = 0;
        this.tindex = 0;
        this.$emit("refreshTimeList", this.index);
        this.choosedTime = [];
        this.isChoose = [];
        this.able = false;
        this.$emit("sendChoosedTime", {choosedTime:this.choosedTime, able:this.able});
    },
    created() {
        this.index = 0;
    },
    onUnload() {
        this.index = 0;
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
</style>