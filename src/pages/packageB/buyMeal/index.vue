<template>
    <div>
        <div :class="{hidden: !hasDialog}">
            <a-dialog @close="closeDialog" :dialog="dialog"></a-dialog>
        </div>
        <div class="seat blueBg">
            <img src="/static/images/cardBg.png" class="seatBg"/>
            <div class="msg">
                <div class="badge">{{mealMsg.name}}</div>
                <div class="price">￥{{mealMsg.money}}</div>
            </div>
        </div>
        <div class="detail">
            <msg-row name="费用总计" :value="'￥' + mealMsg.money"></msg-row>
            <pay-methods 
                :payMethods="payMethods" 
                @choosePayMethod="choosePayMethod"
                :choiceList="choiceList"
            >
            </pay-methods>
            <!-- <div class="tip">注：32积分兑换一张体验卡</div> -->
        </div>
        <submit 
            type="pay" 
            @submit="submit" 
            ableToClick
            :money="mealMsg.money"
        ></submit>
    </div>
</template>

<script>
import msgRow from "../../components/msgRow"
import payMethods from "../../components/payMethods"
import submit from "../../components/submit"
import aDialog from "../../components/aDialog"
export default {
    components: {
        msgRow,
        payMethods,
        submit,
        aDialog
    },
    data() {
        return {
            payMethods: "restmoney",
            choiceList: [{
                name: "余额支付",
                value: "restmoney"
            }, {
                name: "微信支付",
                value: "wx"
            }],
            hasDialog: false,
            dialog: {
                title: "积分",
                detail: "32分",
                button: "确认兑换"
            },
            mealMsg: {}
        }
    },
    methods: {
        choosePayMethod(value) {
            this.payMethods = value;
        },
        closeDialog() {
            console.log("事件传递到了父组件");
            this.hasDialog = false;
        },
        submit() {
            const mealMsg = this.mealMsg;
            if(this.payMethods == "restmoney") {    //余额支付则弹出窗口
                this.$wxhttp.post({
                    url: '/customer/meal',
                    data: {
                        type: 1,
                        meal: {
                            mealId: mealMsg.mealId // 套餐唯一ID
                        }
                    }
                })
                .then(res => {
                    console.log(res);
                })
            } else if(this.payMethods == "wx") {    //微信支付则调用支付接口

            }
            //  else if(this.payMethods == "point") {  //套餐支付
            //     console.log("事件传递到了父组件");
            //     this.hasDialog = true;
            // }
        },
        getMealMsg() {
            const eventChannel = this.$mp.page.getOpenerEventChannel();
            eventChannel.on('acceptMealMsg', data => {
                this.mealMsg = data.mealMsg;
                console.log(this.mealMsg);
            })
        }
    },
    mounted() {
        this.getMealMsg();
    }
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
    border-radius: 6px;
    color: white;
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
    margin-bottom: 9px;
    height: 46px;
    width: 200px;
}
.badge{
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
}
.price{
    font-size: 18px;
    position: absolute;
    bottom: 0;
    right: 0;
}
.pickBg{
    background-image: linear-gradient(to left, #E4E4A5, #E4E4D2);
}
.yellowBg{
    background-image: linear-gradient(to left, #F8A3A3, #F8D0D0);
}
.blueBg{
    background-image: linear-gradient(to left, #50A5EF, #A3CBEF);
}
.detail{
    width: 375px;
    background-color: white;
    padding-bottom: 16px;
}
/* .tip{
    font-size: 9px;
    color: #A8A8A8;
    margin-left: 16px;
    margin-top: 8px;
} */
.hidden{
    visibility: hidden;
}
</style>