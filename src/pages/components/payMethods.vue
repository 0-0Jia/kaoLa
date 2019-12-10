<template>
    <div class="payMethods">
        <p class="payTitle">支付方式</p>
        <div class="methods">
            <div class="marginRight">
                <pay-choice 
                    @choosePayMethod="choosePayMethod" 
                    :choice="choiceList[0].name" 
                    :payMethods="payMethods" 
                    :value="choiceList[0].value"
                ></pay-choice>
            </div>
            <div class="marginRight">
                <pay-choice 
                    @choosePayMethod="choosePayMethod" 
                    :choice="choiceList[1].name" 
                    :payMethods="payMethods" 
                    :value="choiceList[1].value"
                ></pay-choice>
            </div>
            <!-- <pay-choice 
                @choosePayMethod="choosePayMethod" 
                :choice="choiceList[2].name" 
                :payMethods="payMethods" 
                :value="choiceList[2].value"
            ></pay-choice> -->
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
        payMethods: String,
        choiceList: Array
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