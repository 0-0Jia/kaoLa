<template>
    <div>
        <seat-msg father="orderDetail"></seat-msg>
        <div class="msg">
            <msg-row name="预约日期" value="2019-12-01"></msg-row>
            <msg-row name="已选时间" value="12：00-13：00"></msg-row>
            <msg-row name="所在门店" value="考拉自习室"></msg-row> 
            <msg-row name="费用总计" value="￥28.00" nobar></msg-row>
        </div>
        <div class="refund" @click="showModal()">退款</div>
    </div>
</template>

<script>
import msgRow from "../../components/msgRow"
import seatMsg from "../../components/seatMsg"
export default {
    components: {
        msgRow,
        seatMsg
    },
    methods: {
        showModal() {
            wx.showModal({
                content: "是否确定要退款？",
                confirmColor: "#44644A",
                success (res) {
                    if (res.confirm) {
                    console.log('用户点击确定')
                    } else if (res.cancel) {
                    console.log('用户点击取消')
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
.msg{
    width: 375px;
    background-color: white;
}
.refund{
    background-color: #44644A;
    width: 220px;
    height: 48px;
    border-radius: 24px;
    color: white;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    margin-top: 248px;
}
</style>