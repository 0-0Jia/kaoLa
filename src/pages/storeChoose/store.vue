<template>
    <div class="store">
        <img src="/static/images/logo.png" class="logo" />
        <div class="message">
            <div class="basicMsg">
                <div class="name">{{message.name}}</div>
                <div class="address">{{message.address}}</div>
                <div class="workTime">营业时间：{{message.workTime}}</div>
            </div>
            <div class="seatCount">
                <span class="restSeat">空位数：{{message.restSeat}}</span>
                <span class="totalSeat">座位数：{{message.totalSeat}}</span>
            </div>
        </div>
        <div class="handle">
            <div class="order">预约</div>
            <div class="goStore">去门店</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "store",
    props: {
        message: Object
    }
}
</script>

<style scoped>
.store{
    height: 170px;
    width: 343px;
    position: relative;
    box-shadow: 0px 2px 12px rgba(68, 100, 74, 0.08);
    border-radius: 6px;
    left: 0;
    right: 0;
    margin: auto;
    margin-top: 16px;
}
.logo{
    width: 100px;
    height: 100px;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    margin-left: 18px;
    border: 0.5px solid #44644A; 
    border-radius: 6px;
}
.message{
    position: absolute;
    left: 136px;
    top: 18px;
    width: 164px;;
}
.name{
    color: #44644A;
    font-size: 16px;
    font-weight: bold;
}
.address{
    margin-top: 8PX;
}
.address, .workTime{
    color: #2B2B2B;
    font-size: 10px;
}
.seatCount{
    color: #A8A8A8;
    font-size: 10px;
    margin-top: 16px;
}
.restSeat{
    margin-right: 12px;
}
.handle{
    margin-top: 20px;
    position: absolute;
    right: 12px;
    bottom: 12px;
}
.handle>div{
    display: inline-block;
    width: 78px;
    height: 32px;
    line-height: 32px;
    border-radius: 24px;
    background-color: #44644A;
    color: white;
    font-size: 12px;
    text-align: center;
}
.order{
    margin-right: 8px;
}
</style>