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
        <div v-show="mode=='all'">
            <div v-if="orderList.length > 0">
                <record-card 
                    v-for="(order, index) in orderList" 
                    :key="index"
                    :order="order"
                    :button="buttonList[index]"
                    :ifAble="ifAbleList[index]"
                    @handleClick="handleButtonClick"
                ></record-card>
            </div>
            <div class="else" v-else>无订单记录</div>
        </div>
        <div v-show="mode=='payed'">
            <div v-if="doneList.length > 0">
                <record-card 
                    v-for="(order, index) in doneList" 
                    :key="index"
                    :order="order"
                    :button="button"
                    :ifAble="ifAble"
                    @handleClick="handleButtonClick"
                ></record-card>
            </div>
            <div class="else" v-else>无已支付订单</div>
        </div>
        <div v-show="mode=='refunding'">
            <div v-if="refundingList.length > 0">
                <record-card 
                    v-for="(order, index) in refundingList" 
                    :key="index"
                    :order="order"
                    :button="button"
                    :ifAble="ifAble"
                    @handleClick="handleButtonClick"
                ></record-card>
            </div>
            <div class="else" v-else>无正在退款套餐</div>
        </div>
        <div v-show="mode=='refunded'">
            <div v-if="refundedList.length > 0">
                <record-card 
                    v-for="(order, index) in refundedList" 
                    :key="index"
                    :order="order"
                    :button="button"
                    :ifAble="ifAble"
                    @handleClick="handleButtonClick"
                ></record-card>
            </div>
            <div v-else class="else">无已退款订单</div>
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
            this.getOrderList();
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
            wx.showLoading({
                title: '加载中',
            })
            this.$wxhttp.Delete({
                url: `/customer/order/${order.orderId}`
            })
            .then(res => {
                wx.hideLoading();
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                })
                this.getOrderList();
            })
            .catch(err => {
                console.log(err);
                wx.hideLoading();
                wx.showToast({
                    title: "加载失败",
                    icon: 'none',
                    duration: 2000
                })
            })
        },
        getOrderList() {
            wx.showLoading({
                title: '加载中',
            })
            this.$wxhttp.get({
                url: '/customer/order'
            })
            .then(res => {
                console.log(res);
                wx.hideLoading();
                if(res.code!=0){
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 2000
                    })
                } else if(res.code==0){
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
                }
            })
            .catch(err => {
                console.log(err);
                wx.hideLoading();
                wx.showToast({
                    title: "加载失败",
                    icon: 'none',
                    duration: 2000
                })
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
.else{
    color: #44644A;
    opacity: 0.5;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    position: relative;
    top: 200px;
}
</style>