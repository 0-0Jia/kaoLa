<template>
    <div class="orderCard">
        <img src="/static/images/logo.png" class="logo" />
        <div class="msg">
            <p class="title">考拉自习室</p>
            <p class="detail">格间区 一号桌</p>
            <p class="date">2019-11-16</p>
            <p class="time">8:00-9:00, 9:00-10:00, 17:00-18:00</p>
        </div>
        <div class="button">
            <div :class="[{'greenBorder': effect}, 'effect']">{{effectText}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "orderCard",
    props: {
        effect: Boolean
    },
    created() {

    },
    computed: {
        effectText() {
            return this.effect?"有效":"失效"
        }
    }
}
</script>

<style scoped>
.orderCard{
    height: 136px;
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
    width: 72px;
    height: 72px;
    display: block;
    position: absolute;
    top: 18px;
    left: 18px;
    border: 0.5px solid #44644A; 
    border-radius: 6px;
}
.msg{
    width: 123px;
    position: absolute;
    left: 108px;
    top: 18px;
    font-size: 12px;
}
.detail, .date, .time{
    margin-top: 7px;
}
.button{
    width: 78px;
    height: 108px;
    position: absolute;
    right: 12px;
    top: 16px;
}
.effect{
    width: 48px;
    height: 24px;
    border: 2px solid #A8A8A8;
    border-radius: 24px;
    color: #A8A8A8;
    font-size: 9px;
    text-align: center;
    line-height: 24px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
}
.refund{
    width: 78px;
    height: 32px;
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #44644A;
    color: white;
    border-radius: 24px;
    font-size: 12px;
    text-align: center;
    line-height: 32px;
}
.greenBorder{
    color: #44644A;
    border-color: #44644A;
}
</style>