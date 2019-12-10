<template>
    <div>
        <div class="nav">
            <div @click="all()" class="gridArea">
                <span :class="{greenFont: mode=='all'}">全部</span>
                <div class="greenBar" v-show="mode=='all'"></div>
            </div>
            <div @click="payed()" class="gridArea">
                <span :class="{greenFont: mode=='payed'}">已支付</span>
                <div class="greenBar" v-show="mode=='payed'"></div>
            </div>
            <div @click="refunding()" class="gridArea">
                <span :class="{greenFont: mode=='refunding'}">正在申请退款</span>
                <div class="greenBar" v-show="mode=='refunding'"></div>
            </div>
            <div @click="refunded()">
                <span :class="{greenFont: mode=='refunded'}">已退款</span>
                <div class="greenBar" v-show="mode=='refunded'"></div>
            </div>
        </div>
        <record-card 
            v-for="(order, index) in orderList" 
            :key="index"
            :order="order"
            :button="button"
        ></record-card>
    </div>
</template>

<script>
import recordCard from "./recordCard"
export default {
    components: {
        recordCard
    },
    data() {
        return {
            mode: "all",
            orderList: [],
            doneList: [],
            refundingList: [],
            refundedList: [],
            button: '全部'
        }
    },
    methods: {
        all() {
            this.mode = "all";
            this.button = "全部"
        },
        payed() {
            this.mode = "payed";
            this.button = "已支付"
        },
        refunding() {
            this.mode = "refunding";
            this.button = "正在退款"
        },
        refunded() {
            this.mode = "refunded";
            this.button = "已退款" 
        }
    },
    mounted() {
        this.$wxhttp.get({
            url: '/customer/order'
        })
        .then(res => {
            console.log(res);
            this.orderList = res.data.orderList;
            this.orderList.forEach(order => {
                if(order.orderStatus == "已支付") {
                    this.doneList.push(order);
                }
                if(order.orderStatus == "正在退款") {
                    this.refundingList.push(order);
                }
                if(order.orderStatus == "同意退款") {
                    this.refundedList.push(order);
                }
            })
            console.log(this.orderList);
            console.log(this.doneList);
            console.log(this.refundingList);
            console.log(this.refundedList);
        })
        .catch(err => {
            console.log(err);
        })
    }
}
</script>

<style scoped>
.nav{
    height: 48px;
    width: 100%;
    margin-top: 8px;
    margin-bottom: 16px;
    padding-left: 18px;
    background-color: white;
}
.nav>div{
    display: inline-block;
    color: #2E2E2E;
    font-size: 16px;
    height: 100%;
    line-height: 48px;
    position: relative;
}
.greenBar{
    position: absolute;
    width: 31.5px;
    height: 4px;
    right: 0;
    left: 0;
    margin: auto;
    bottom: 0;
    background-color: #44644A;
}
.greenFont{
    color: #44644A;
}
.gridArea{
    margin-right: 36px;
}
</style>