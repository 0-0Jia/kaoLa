<template>
    <div class="payMethods">
        <p class="payTitle">支付方式</p>
        <div class="methods">
            <div class="marginRight">
                <pay-choice @choosePayMethod="choosePayMethod" choice="余额支付" :payMethods="payMethods" value="restmoney"></pay-choice>
            </div>
            <div class="marginRight">
                <pay-choice @choosePayMethod="choosePayMethod" choice="微信支付" :payMethods="payMethods" value="wx"></pay-choice>
            </div>
            <pay-choice @choosePayMethod="choosePayMethod" choice="套餐支付" :payMethods="payMethods" value="meal"></pay-choice>
        </div>    
    </div>
</template>

<script>
import payChoice from "./payChoice"
export default {
    name: "payMethods",
    components: {
        payChoice
    },
    props: {
        payMethods: String
    },
    methods: {
        choosePayMethod(value) {
            this.$emit('choosePayMethod', value);
        }
    }
}
</script>

<style scoped>
.payMethods{
    background-color: white;
    margin-left: 16px;
    font-size: 12px;
}
.payTitle{
    margin-top: 16px;
}
.methods{
    margin-top: 8px;
}
.marginRight{
    margin-right: 54px;
    display: inline-block;
}
</style>