<template>
    <div class="recordCard">
        <div class="msg">
            <div class="status">已支付</div>
            <p class="object">交易对象</p>
            <p class="method">交易方式</p>
            <p class="money">交易金额</p>
            <p class="date">有效日期</p>
        </div>
        <div class="time">11月16日9：00</div>
        <div class="button">退款</div>
    </div>
</template>

<script>
export default {
    name: "recordCard"
}
</script>

<style scoped>
.recordCard{
    width: 375px;
    height: 128px;
    margin-bottom: 8px;
    background-color: white;
    position: relative;
}
.msg{
    width: 220px;
    height: 96px;
    font-size: 12px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 16px;
    margin: auto;
}
.status{
    margin-bottom: 6px;
    color: #44644A;
}
.msg>p{
    margin-top: 4px;
}
.time{
    width: 90px;
    font-size: 12px;
    position: absolute;
    top: 16px;
    right: 16px;
    text-align: right;
}
.button{
    width: 78px;
    height: 32px;
    color: white;
    border-radius: 24px;
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    position: absolute;
    bottom: 16px;
    right: 16px;
    background-color: #44644A;
}
</style>