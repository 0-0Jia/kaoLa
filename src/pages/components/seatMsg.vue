<template>
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
</template>

<script>
export default {
    name: "seatMsg"
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
</style>