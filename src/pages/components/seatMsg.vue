<template>
    <div class="seat">
        <img src="/static/images/seatBg.png" class="seatBg"/>
        <div class="msg">
            <div class="badge">
                <span class="type">{{roomType}}</span>
                <span class="name">{{sitId}}号座位</span>
            </div>
            <div class="price" v-if="(father=='orderSubmission' || father=='timeOrder')">{{price}}元/小时</div>
            <!-- <div class="effect" v-if="(father=='orderDetail')">有效</div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "seatMsg",
    props: {
        father: String,
        roomType: String,
        sitId: Number,
        price: Number
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
}
.type{
    margin-right: 9px;
}
.price{
    color: #44644A;
    font-size: 16px;
    font-weight: bold;
    margin-top: 8px;
    text-align: right;
}
.effect{
    width: 48px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 9px;
    border: 2px solid #44644A;
    border-radius: 24px;
    margin-top: 4.5px;
    margin-left: 29.5px;
}
</style>