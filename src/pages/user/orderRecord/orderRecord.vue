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
        <div v-if="mode=='all'">
            <record-card 
                v-for="(order, index) in orderList" 
                :key="index"
                :order="order"
                :button="buttonList[index]"
                :ifAble="ifAbleList[index]"
                @handleClick="handleButtonClick"
            ></record-card>
        </div>
        <div v-if="mode=='payed'">
            <record-card 
                v-for="(order, index) in doneList" 
                :key="index"
                :order="order"
                :button="button"
                :ifAble="ifAble"
                @handleClick="handleButtonClick"
            ></record-card>
        </div>
        <div v-if="mode=='refunding'">
            <record-card 
                v-for="(order, index) in refundingList" 
                :key="index"
                :order="order"
                :button="button"
                :ifAble="ifAble"
                @handleClick="handleButtonClick"
            ></record-card>
        </div>
        <div v-if="mode=='refunded'">
            <record-card 
                v-for="(order, index) in refundedList" 
                :key="index"
                :order="order"
                :button="button"
                :ifAble="ifAble"
                @handleClick="handleButtonClick"
            ></record-card>
        </div>
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
            totalList: [],
            doneList: [],
            refundingList: [],
            refundedList: [],
            button: '全部',
            buttonList: [],
            ifAble: false,
            ifAbleList: []
        }
    },
    methods: {
        all() {
            this.mode = "all";
            this.button = "全部";
            this.orderList = this.totalList;
        },
        payed() {
            this.mode = "payed";
            this.button = "退款";
            this.ifAble = true;
            this.orderList = this.doneList;
        },
        refunding() {
            this.mode = "refunding";
            this.button = "正在退款";
            this.ifAble = false;
            this.orderList = this.refundingList;
        },
        refunded() {
            this.mode = "refunded";
            this.button = "已退款";
            this.ifAble = false; 
            this.orderList = this.refundedList;
        },
        handleButtonClick(order) {
            this.$wxhttp.Delete({
                url: `/customer/order/${order.orderId}`
            })
            .then(res => {
                console.log(res);
                this.getOrderList();
            })
            .catch(err => {
                console.log(err);
            })
        },
        getOrderList() {
            this.$wxhttp.get({
                url: '/customer/order'
            })
            .then(res => {
                console.log(res);
                this.totalList = res.data.orderList;
                for(let i = 0; i<this.totalList.length; i++) {
                    if(this.totalList[i].orderStatus == "已支付") {
                        this.doneList.push(this.totalList[i]);
                        this.buttonList[i] = "退款";
                        this.ifAbleList[i] = true;
                    }
                    if(this.totalList[i].orderStatus == "正在退款") {
                        this.refundingList.push(this.totalList[i]);
                        this.buttonList[i] = "退款中";
                        this.ifAbleList[i] = false;
                    }
                    if(this.totalList[i].orderStatus == "同意退款") {
                        this.refundedList.push(this.totalList[i]);
                        this.buttonList[i] = "已退款";
                        this.ifAbleList[i] = false;
                    }
                    if(this.totalList[i].orderStatus == "未支付") {
                        this.buttonList[i] = "未支付";
                        this.ifAbleList[i] = false;
                    }
                }
                this.orderList = this.totalList;
                console.log(this.orderList);
                console.log(this.doneList);
                console.log(this.refundingList);
                console.log(this.refundedList);
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.getOrderList();
        wx.setNavigationBarTitle({
            title: "订单记录"
        });
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