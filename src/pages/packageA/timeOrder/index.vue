<template>
    <div>
        <!-- 座位信息表 -->
        <seat-msg 
            father="timeOrder"
            :roomType="room.roomType+room.roomId" 
            :sitId="seat.sitId"
            :price="seat.money"
        ></seat-msg>
        <!-- 时间普通选择器 -->
        <time-choose 
            :isChoose="isChoose" 
            :timeList="timeList"
            :dateList="dateList"
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
            seat: {},
            choosedTime: "",
            currentDate: "",
            ableToClick: false,
            room: {},
            money: 0,
            storeName: "",
            initDate: "",
            dateList: []
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
                //设置时间段
                this.timeList = data.seat.curDate[0].sitDate;
                //将座位里的时间都push进dateList日期表
                this.dateList = [];
                for(let i = 0; i  < data.seat.curDate.length; i++) {
                    this.dateList.push(data.seat.curDate[i].value);
                }
                console.log(this.dateList);
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
        this.currentDate = this.seat.curDate[0].value;
        if(this.dateList.length > 0) {
            this.initDate = this.dateList[0];
        }
        wx.setNavigationBarTitle({
            title: "预约时间"
        });
    }
}
</script>

<style scoped>

</style>