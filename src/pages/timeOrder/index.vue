<template>
    <div>
        <div class="seat">
            <img src="/static/images/seatBg.png" class="seatBg"/>
            <div class="msg">
                <div class="badge">
                    <span class="type">格间区</span>
                    <span class="name">一号桌</span>
                </div>
                <div class="price">￥9.6/小时</div>
            </div>
        </div>
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
                    <div class="time" v-for="(time, index) in timeList" :key="index">{{time}}</div>
                </div>
            </div>
        </div>
        <div class="pay">
            <div class="money">需支付：<span class="num">￥0.00</span></div>
            <div class="order">立即预约</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: "",
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
            ]
        }
    },
    methods: {
        bindDateChange(e) {
            console.log('picker发送选择改变，携带值为',  e.mp.detail.value);
            this.date = e.mp.detail.value;
        },
        getCurrentDate() {
            const current = new Date();
            let day = ((current.getDay()<10)?"0":"") + current.getDay();
            let month = (((current.getMonth()+1)<10)?"0":"") + (current.getMonth()+1);
            let year = current.getFullYear();
            this.currentDate = year + "-" + month + "-" + day;
            this.date = this.currentDate;
        }
    },
    created() {
        this.getCurrentDate();
    }
}
</script>

<style scoped>
.seat{
    position: relative;
    height: 64px;
    width: 343px;
    margin: auto;
    margin-top: 16px;
    left: 0;
    right: 0;
    box-shadow: 0 2px 12px rgba(68, 100, 74, 0.08);
    background-color: white;
    margin-bottom: 16px;
}
.seatBg{
    display: block;
    position: absolute;
    left: 0;
    width: 160px;
    height: 64px;
}
.msg{
    position: absolute;
    right: 16px;
    margin-top: 9px;
}
.badge{
    color: #2B2B2B;
    font-size: 12px;
    margin-bottom: 8px;
}
.type{
    margin-right: 9px;
}
.price{
    color: #44644A;
    font-size: 16px;
    font-weight: bold;
}
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
.pay{
    width: 100%;
    height: 48px;
    position: absolute;
    bottom: 0;
    background-color: white;
}
.money{
    height: 48px;
    line-height: 48px;
    font-size: 12px;
    color: #2E2E2E;
    padding-left: 16px;
}
.num{
    color: #44644A;
    font-size: 18px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
}
.order{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 90px;
    height: 48px;
    line-height: 48px;
    background-color: #707070;
    color: white;
    font-size: 12px;
    text-align: center;
}
</style>