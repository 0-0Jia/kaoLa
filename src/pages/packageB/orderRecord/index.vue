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
        <record-card></record-card>
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
            mode: "all"
        }
    },
    methods: {
        all() {
            this.mode = "all";
        },
        payed() {
            this.mode = "payed";
        },
        refunding() {
            this.mode = "refunding";
        },
        refunded() {
            this.mode = "refunded"; 
        }
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