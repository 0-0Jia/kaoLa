<template>
    <div>
        <seat-msg></seat-msg>
        <div class="msg">
            <msg-row name="预约日期" value="2019-12-01"></msg-row>
            <msg-row name="已选事件" value="12：00-13：00"></msg-row>            
        </div>
        <submit :type="type"></submit>
    </div>
</template>

<script>
import seatMsg from "../components/seatMsg"
import msgRow from "./msgRow"
import submit from "../components/submit"
export default {
    components: {
        seatMsg,
        msgRow,
        submit
    },
    data() {
        return {
            type: "pay"
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
</style>