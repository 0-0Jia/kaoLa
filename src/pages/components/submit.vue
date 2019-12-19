<template>
    <div class="submit">
        <div class="money">需支付：<span class="num">￥{{money}}</span></div>
        <div :class="[{able: ableToClick}, 'button']" @click="handleClick">{{buttonText}}</div>
    </div>
</template>

<script>
export default {
    name: "submit",
    props: {
        type: String,
        ableToClick: Boolean,
        money: Number
    },
    data() {
        return {
            buttonText: ""
        }
    },
    methods: {
        payOrSubmit() {
            if(this.type == "pay") this.buttonText = "支付";
            else this.buttonText = "立即预约";
        },
        handleClick() {
            if(this.ableToClick){
                if(this.type == "pay") {
                    console.log("你点击了支付按钮");
                    this.$emit("submit");
                } else {
                    console.log("你点击了立即预约按钮");
                    this.$emit("orderRightNow");
                }
            }
        }
    },
    created() {
        this.payOrSubmit();
    }
}
</script>

<style scoped>
.submit{
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    background-color: white;
    z-index: 3;
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
.button{
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
.able{
    background-color: #44644A;
}
</style>