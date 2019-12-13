<template>
    <div class="store">
        <img src="/static/images/logo.png" class="logo" />
        <div class="message">
            <div class="basicMsg">
                <div class="name">{{message.storeName}}</div>
                <div class="address">{{message.storeAddress}}</div>
                <div class="workTime">营业时间：8:00-23:00</div>
            </div>
            <!-- <div class="seatCount">
                <span class="restSeat">空位数：{{message.freeSeats}}</span>
                <span class="totalSeat">座位数：{{message.totalSeats}}</span>
            </div> -->
        </div>
        <div class="handle">
            <div class="order" @click="goDetail()">预约</div>
            <!-- <div class="goStore">去门店</div> -->
        </div>
        <!-- <img class="phone" src="/static/images/phone.png"/> -->
    </div>
</template>

<script>
export default {
    name: "store",
    props: {
        message: Object
    },
    methods: {
        goDetail() {
            // 将本页面的storeId传递到子组件去跳转页面以拿到该店的座位信息
            this.$emit("goDetail", this.message);
        }
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
    background-color: white;
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.address{
    margin-top: 4px;
    height: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}
.address, .workTime{
    color: #2B2B2B;
    font-size: 10px;
}
.seatCount{
    color: #A8A8A8;
    font-size: 10px;
    margin-top: 8px;
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
.phone{
    position: absolute;
    display: block;
    width: 22px;
    height: 22px;
    top: 12px;
    right: 12px;
}
</style>