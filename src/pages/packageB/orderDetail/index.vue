<template>
    <div>
        <seat-msg 
            :roomType="preservation.roomType" 
            :sitId="preservation.sitId" 
            father="orderDetail"
        ></seat-msg>
        <div class="msg">
            <msg-row name="预约日期" :value="date"></msg-row>
            <msg-row name="所在门店" :value="storeName"></msg-row> 
            <div class="msg-row">
                <div class="row">
                    <span>已选时间</span>
                    <div class="rowValue">{{time}}</div>
                </div>
            </div>
        </div>
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
    data() {
        return {
            preservation: {},
            date: '',
            time: '',
            storeName: ''
        }
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
        },
        getPreservation() {
            const eventChannel = this.$mp.page.getOpenerEventChannel();
            eventChannel.on('acceptPreservation', data => {
                console.log(data);
                this.preservation = data.preservation;
                console.log(this.preservation);
                this.date = this.preservation.preservationDate.split(' ')[0];
                this.time = this.preservation.preservationDate.split(' ')[1];
                this.storeName = this.preservation.storeName;
            })
        }
    },
    mounted() {
        this.getPreservation();
        wx.setNavigationBarTitle({
            title: "预约详情"
        });
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
.msg-row{
    width: 343px;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 12px;
    color: #2E2E2E;
    background-color: white;
}
.row{
    width: 100%;
    margin-top: 10px;
    padding-bottom: 10px; 
    display: flex;
    justify-content: space-between;
}
.row>div{
    display: inline-block;
}
.rowValue{
    width: 209px;
    text-align: right;
    word-break: break-all;
}
</style>