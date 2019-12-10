<template>
    <div class="seat" :seat="seat" @click="goChooseTime">
        <img class="seatBg" src="/static/images/seatBg.png"/>
        <div class="name">{{sitId}}</div>
        <div class="price">{{money}}元/小时</div>
        <div :class="[{'redFont': (!ifPreserved)}, 'status']">{{status}}</div>
    </div>
</template>

<script>
export default {
    name: "seat",
    props: {
        seat: Object,
        ifPreserved: Boolean
    },
    methods: {
        goChooseTime() {
            console.log("点击了子组件");
            this.$emit("chooseTime", this.seat);
        }
    },
    computed: {
        status() {
            if(this.seat) return (this.ifPreserved)?"可预约":"已满";
            else return '';
        },
        sitId() {
            if(this.seat) return this.seat.sitId;
            else return '';
        },
        money() {
            if(this.seat) return this.seat.money;
            else return '';
        },
        preserved() {
            if(this.seat) return this.seat.preserved;
            else return '';
        }
    },
    mounted() {
        console.log(this.seat);
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