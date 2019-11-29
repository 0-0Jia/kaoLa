<template>
    <div class="seat" :seatMsg="seatMsg">
        <img class="seatBg" src="/static/images/seatBg.png"/>
        <div class="name">{{seatMsg.name}}</div>
        <div class="price">{{seatMsg.price}}</div>
        <div :class="[{'redFont': !seatMsg.status}, 'status']">{{status}}</div>
    </div>
</template>

<script>
export default {
    name: "seat",
    props: {
        seatMsg: Object
    },
    data() {
        return {
            status: this.seatMsg.status?"可预约":"已满"
        }
    }
}
</script>

<style scoped>
.seat{
    width: 160px;
    height: 92px;
    display: inline-block;
    position: relative;
    border-radius: 6px;
    box-shadow: 0px 2px 12px rgba(68, 100, 74, 0.08);
    margin-bottom: 16px;
    background-color: white;
}
.seatBg{
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
}
.name{
    color: #44644A;
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    top: 16px;
    right: 16px;
}
.price, .status{
    color: #2B2B2B;
    font-size: 10px;
    position: absolute;
    bottom: 9.5px;
}
.price{
    left: 12px;
}
.status{
    right: 16px;
}
.redFont{
    color: #F32727;
}
</style>