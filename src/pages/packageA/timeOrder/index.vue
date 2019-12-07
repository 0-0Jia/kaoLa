<template>
    <div>
        <!-- 座位信息表 -->
        <seat-msg father="timeOrder"></seat-msg>
        <!-- 时间日期选择器 -->
        <time-choose :isChoose="isChoose"></time-choose>
        <!-- 提交按钮 -->
        <submit :type="type" @orderRightNow="goPay"></submit>
    </div>
</template>

<script>
import seatMsg from "../../components/seatMsg.vue"
import submit from "../../components/submit.vue"
import timeChoose from "./timeChoose"
export default {
    components:{
        seatMsg,
        timeChoose,
        submit
    },
    data() {
        return {
            type: "order"
        }
    },
    methods: {
        goPay() {
            console.log("现在跳转到支付页面");
            wx.navigateTo({
                url: "/pages/packageA/orderSubmission/main"
            })
        }
    }
}
</script>

<style scoped>

</style>