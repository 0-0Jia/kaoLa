<template>
    <div>
        <!-- 座位信息表 -->
        <seat-msg 
            father="timeOrder"
            :roomType="room.roomType+room.roomId" 
            :sitId="seat.sitId"
            :price="seat.money"
        ></seat-msg>
        <!-- 时间日期选择器 -->
        <time-choose 
            :isChoose="isChoose" 
            :timeList="timeList"
            :startDay="startDay"
            :endDay="endDay"
            @sendChoosedTime="getChooseTime"
            @refreshTimeList="refreshTimeList"
        >
        </time-choose>
        <!-- 提交按钮 -->
        <submit 
            :type="type" 
            @orderRightNow="goPay" 
            :ableToClick="ableToClick" 
            :money="money"
        ></submit>
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
        submit,
    },
    data() {
        return {
            type: "order",
            timeList: [],
            startDay: "",
            endDay: "",
            seat: {},
            choosedTime: "",
            currentDate: "",
            ableToClick: false,
            room: {},
            money: 0,
            storeName: ""
        }
    },
    methods: {
        goPay() {
            const time = this.currentDate + " " + this.choosedTime;
            const seat = this.seat;
            const room = this.room;
            const money = this.money;
            const currentDate = this.currentDate;
            const choosedTime = this.choosedTime;
            const storeName = this.storeName;
            wx.showLoading({
                title: "加载中"
            });
            mpvue.navigateTo({
                url: "/pages/packageA/orderSubmission/main",
                success: function(res) {
                    wx.hideLoading();
                    res.eventChannel.emit('acceptPayMsg', {
                        sitId: seat.sitId,
                        time: time,
                        room: room
                    });
                    res.eventChannel.emit('acceptBasicMsg', {
                        money: money,
                        date: currentDate,
                        choosedTime: choosedTime,
                        storeName: storeName,
                        price: seat.money
                    });
                }
            })
        },
        getSeatMsg() {
            const eventChannel = this.$mp.page.getOpenerEventChannel();
            eventChannel.on('acceptSeatId', data => {
                this.seat = data.seat;
                // console.log(this.seat);
                //设置时间段
                this.timeList = data.seat.curDate[0].sitDate;
                //设置时间选择器的起止时间
                this.startDay = data.seat.curDate[0].value;
                if(data.seat.curDate.length > 1) {
                    this.endDay = data.seat.curDate[data.seat.curDate.length-1].value;
                } else this.endDay = this.startDay;
            });
            eventChannel.on('acceptRoomList', data => {
                this.room = data.room;
                // console.log(this.room);
            });
            eventChannel.on('acceptStoreName', data => {
                this.storeName = data.storeName;
            })
        },
        //获得选择的时间段
        getChooseTime(data) {
            this.choosedTime = data.choosedTime.join(',');
            this.money = (data.choosedTime.length * this.seat.money).toFixed(2);
            //判断当前按钮是否为亮
            this.ableToClick = data.able;
            // console.log(this.ableToClick);
        },
        //刷新时间表
        refreshTimeList(date) {
            // 判断是哪一天去更新时间表
            for(let i = 0; i < this.seat.curDate.length; i++){
                if(this.seat.curDate[i].value == date) {
                    this.timeList = this.seat.curDate[i].sitDate;
                    this.currentDate = date;
                }
            }
        }
    },
    mounted() {
        this.getSeatMsg();
        console.log(this.seat.curDate);
        console.log(this.seat.curDate[0]);
        this.currentDate = this.seat.curDate[0].value;
        wx.setNavigationBarTitle({
            title: "预约时间"
        });
    }
}
</script>

<style scoped>

</style>