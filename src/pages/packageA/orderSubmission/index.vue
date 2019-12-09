<template>
    <div>
        <div :class="{hidden: !hasDialog}">
            <a-dialog @close="closeDialog" :dialog="dialog"></a-dialog>
        </div>
        <seat-msg father="orderSubmission"></seat-msg>
        <div class="msg">
            <msg-row name="预约日期" :value="basicmsg.date"></msg-row>
            <msg-row name="已选时间" :value="basicmsg.choosedTime"></msg-row>
            <msg-row name="所在门店" :value="basicmsg.storeName"></msg-row> 
            <msg-row name="费用总计" :value="'￥' + basicmsg.money"></msg-row>
            <pay-methods 
                :payMethods="payMethods" 
                @choosePayMethod="choosePayMethod"
                :choiceList="choiceList"
            >
            </pay-methods>
            <div class="chooseMeal" v-show="payMethods=='meal'" @click="goChooseMeal">
                <div class="title">选择套餐</div>
                <span class="meal">wu</span>
                <img class="arrow" src="/static/images/arrow.png"/>
            </div>
        </div>
        <submit 
            :type="type" 
            @submit="submit"
            ableToClick 
            :money="basicmsg.money"
        ></submit>
    </div>
</template>

<script>
import seatMsg from "../../components/seatMsg"
import msgRow from "../../components/msgRow"
import payMethods from "../../components/payMethods"
import submit from "../../components/submit"
import aDialog from "../../components/aDialog"
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
            hasDialog: false,
            choiceList: [{
                name: "余额支付",
                value: "restmoney"
            }, {
                name: "微信支付",
                value: "wx"
            }, {
                name: "套餐支付",
                value: "meal"
            }],
            dialog: {
                title: "余额",
                detail: "￥0.00",
                button: "确认支付"
            },
            msg: {},
            basicmsg: {}
        }
    },
    methods: {
        choosePayMethod(value) {
            this.payMethods = value;
        },
        goChooseMeal() {
            wx.navigateTo({
                url: "/pages/packageA/chooseMeal/main"
            })
        },
        closeDialog() {
            console.log("事件传递到了父组件");
            this.hasDialog = false;
        },
        submit() {
            if(this.payMethods == "restmoney") {    //余额支付则弹出窗口
                this.hasDialog = true;
            } else if(this.payMethods == "wx") {    //微信支付则调用支付接口
                this.msg.payType = 1;
                this.$wxhttp.post({
                    url: '/customer/sits',
                    data: {
                        msg: this.msg
                    }
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            } else if(this.payMethods == "meal") {  //套餐支付
                
            }
        },
        getPayMsg() {
            const eventChannel = this.$mp.page.getOpenerEventChannel();
            eventChannel.on('acceptPayMsg', data => {
                this.msg = data;
            });
            eventChannel.on('acceptBasicMsg', data => {
                this.basicmsg = data;
                this.dialog.detail = '￥' + this.basicmsg.money;
                console.log(this.basicmsg);
            })
            console.log(this.msg);
        }
    },
    mounted() {
        this.getPayMsg();
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