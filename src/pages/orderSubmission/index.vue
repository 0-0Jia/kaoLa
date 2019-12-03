<template>
    <div>
        <div :class="{hidden: !hasDialog}">
            <a-dialog @close="closeDialog"></a-dialog>
        </div>
        <seat-msg></seat-msg>
        <div class="msg">
            <msg-row name="预约日期" value="2019-12-01"></msg-row>
            <msg-row name="已选时间" value="12：00-13：00"></msg-row>
            <msg-row name="所在门店" value="考拉自习室"></msg-row> 
            <msg-row name="费用总计" value="￥28.00"></msg-row>
            <pay-methods :payMethods="payMethods" @choosePayMethod="choosePayMethod"></pay-methods>
            <div class="chooseMeal" v-show="payMethods=='meal'" @click="goChooseMeal">
                <div class="title">选择套餐</div>
                <span class="meal">wu</span>
                <img class="arrow" src="/static/images/arrow.png"/>
            </div>
        </div>
        <submit :type="type" @submit="submit"></submit>
    </div>
</template>

<script>
import seatMsg from "../components/seatMsg"
import msgRow from "./msgRow"
import payMethods from "./payMethods"
import submit from "../components/submit"
import aDialog from "./aDialog"
export default {
    components: {
        seatMsg,
        msgRow,
        payMethods,
        submit,
        aDialog
    },
    data() {
        return {
            type: "pay",
            payMethods: "wx",
            hasDialog: false
        }
    },
    methods: {
        choosePayMethod(value) {
            this.payMethods = value;
        },
        goChooseMeal() {
            wx.navigateTo({
                url: "/pages/chooseMeal/main"
            })
        },
        closeDialog() {
            console.log("事件传递到了父组件");
            this.hasDialog = false;
        },
        submit() {
            if(this.payMethods == "restmoney") {    //余额支付则弹出窗口
            console.log("事件传递到了父组件");
                this.hasDialog = true;
            } else if(this.payMethods == "wx") {    //微信支付则调用支付接口

            } else if(this.payMethods == "meal") {  //套餐支付
                
            }
        }
    }
}
</script>

<style scoped>
.msg{
    width: 375px;
    padding-bottom: 16px;
    background-color: white;
}
.chooseMeal{
    width: 343px;
    height: 26px;
    right: 0;
    left: 0;
    margin: auto;
    margin-top: 20px;
    position: relative;
    color: #2E2E2E;
    background-color: white;
}
.title{
    display: inline-block;
    line-height: 22px;
    font-size: 12px;
}
.meal{
    display: inline-block;
    line-height: 22px;
    position: absolute;
    font-size: 12px;
    color: #A8A8A8;
    right: 11px;
}
.arrow{
    width: 7.13px;
    height: 12.97px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    margin-left: 10.5px;
}
.hidden{
    visibility: hidden;
}
</style>