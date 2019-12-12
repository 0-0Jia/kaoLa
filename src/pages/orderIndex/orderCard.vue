<template>
    <div class="orderCard" @click="handleClick">
        <img src="/static/images/logo.png" class="logo" />
        <div class="msg">
            <p class="title">{{preservation.sitId}}号座位</p>
            <p class="detail">房间：{{preservation.roomType}} {{preservation.roomId}}</p>
            <p class="date">日期：{{date}}</p>
            <p class="time">{{time}}</p>
        </div>
        <div class="button" @click.stop="openDoor">
            <div class="greenBorder effect">开门</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "orderCard",
    props: {
        preservation: Object,
    },
    computed: {
        date() {
            return this.preservation.preservationDate.split(' ')[0];
        },
        time() {
            return this.preservation.preservationDate.split(' ')[1];
        }
    },
    methods: {
        handleClick() {
            this.$emit('goOrderDetail', this.preservation);
        },
        openDoor() {
            this.$emit('openDoor', this.preservation);
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
.time{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>