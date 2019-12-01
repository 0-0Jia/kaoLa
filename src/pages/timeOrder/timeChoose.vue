<template>
    <div class="chooseToOrder">
        <picker mode="date" :value="date" :start="currentDate" @change="bindDateChange">
            <div class="picker">
                <span>预约日期</span>
                <div class="dateValue">
                    <span>{{date}}</span>   
                    <img class="arrow" src="/static/images/arrow.png" />
                </div>
            </div>
        </picker>
        <div class="bar"></div>
        <div class="orderTime">
            <div class="title">预约时间</div>
            <div class="timeTable">
                <div 
                    :class="[{'greenbutton': isChoose[index]}, 'time']" 
                    v-for="(time, index) in timeList" 
                    :key="index" 
                    @click="chooseTime(index)"
                >
                    {{time}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "timeChoose",
    data() {
        return {
            date: "",
            tdate: "",
            currentDate: "",
            timeList: [
                "8:00-9:00",
                "9:00-10:00",
                "10:00-11:00",
                "11:00-12:00",
                "12:00-13:00",
                "13:00-14:00",
                "14:00-15:00",
                "15:00-16:00",
                "16:00-17:00",
                "17:00-18:00",
                "18:00-19:00",
                "19:00-20:00",
                "20:00-21:00",
                "21:00-22:00",
                "22:00-23:00",
            ],
            isChoose: [
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                true
            ]
        }
    },
    methods: {
        chooseTime(index) {
            this.isChoose[index] = !this.isChoose[index];
            console.log(this.isChoose[index]);
            this.date = "0";
            this.date = this.tdate;
        },
        bindDateChange(e) {
            this.date = e.mp.detail.value;
            this.tdate = this.date;
        },
        getCurrentDate() {
            const current = new Date();
            let day = ((current.getDate()<10)?"0":"") + current.getDate();
            let month = (((current.getMonth()+1)<10)?"0":"") + (current.getMonth()+1);
            let year = current.getFullYear();
            this.currentDate = year + "-" + month + "-" + day;
            this.date = this.currentDate;
            this.tdate = this.currentDate;
        }
    },
    created() {
        this.getCurrentDate();
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
</style>