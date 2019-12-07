<template>
    <div class="payChoice" @click="choosePayMethod">
        <div :class="[(payMethods==value)?'greenBg':'' ,'choosed']">
            <img :class="(payMethods==value)?'':'disvisable'" src="/static/images/choosed.png"/>
        </div>
        <div class="choice">{{choice}}</div>
    </div>
</template>

<script>
export default {
    name: "payChoice",
    props: {
        choice: String,
        payMethods: String,
        value: String
    },
    methods: {
        choosePayMethod() {
            this.$emit('choosePayMethod', this.value);
        }
    }
}
</script>

<style scoped>
.payChoice{
    display: inline-block;
}
.choice{
    display: inline-block;
    height: 18px;
    vertical-align: top;
}
.choosed{
    display: inline-block;
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    border: 0.6px solid black;
    margin-right: 8px;
    box-sizing: border-box;
}
.choosed>img{
    width: 70%;
    height: 70%;
    position: absolute;
    right: 0;
    display: block;
    left: 0;
    bottom: 0;
    top: 0;
    margin: auto;
}
.disvisable{
    visibility: hidden;
}
.greenBg{
    background-color: #44644A;
}
</style>