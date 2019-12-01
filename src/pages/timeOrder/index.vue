<template>
    <div>
        <!-- 座位信息表 -->
        <seat-msg></seat-msg>
        <!-- 时间日期选择器 -->
        <time-choose :isChoose="isChoose"></time-choose>
        <!-- 提交按钮 -->
        <submit :type="type"></submit>
    </div>
</template>

<script>
import seatMsg from "../components/seatMsg.vue"
import submit from "../components/submit.vue"
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
    }
}
</script>

<style scoped>

</style>