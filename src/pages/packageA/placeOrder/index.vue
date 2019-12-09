<template>
    <div>
        <div class="placeOrder" v-if="roomTypeList.length > 0">
            <div class="nav">
                <div 
                    v-for="(type, index) in roomTypeList" 
                    class="gridArea"
                    :key="index"
                    @click="changeRoomType(index)"
                >
                    <span :class="(index == currentTypeIndex)?'greenFont':''">{{type}}</span>
                    <div v-if="index == currentTypeIndex" class="greenBar"></div>
                </div>
            </div>
            <div class="seat" v-if="seatList.length>0">
                <seat 
                    v-for="(seat, index) in seatList" 
                    :seat="seat"
                    :key="index"
                    @chooseTime="goChooseTime"
                >
                </seat>
            </div>
            <div class="else" v-else>暂无座位</div>
        </div>
        <div class="else" v-else>暂无房间</div>
    </div>
</template>

<script>
import seat from "./seat"
export default {
    components: {
        seat
    },
    data(){
        return {
            roomTypeList: [],   //房间类型列表
            currentTypeIndex: 0,    //目前被选中的房间类型
            storeId: 0,     //当前门店Id
            roomList: [],    //房间列表
            seatList: [],    //座位列表
            room: {},
            storeName: ""
        }
    },
    methods: {
        // 跳转到时间预约页面
        goChooseTime(seat) {
            const room = this.roomList[this.currentTypeIndex];
            const storeName = this.storeName;
            console.log(room);
            mpvue.navigateTo({
                url: `/pages/packageA/timeOrder/main`,
                success: function(res) {
                    res.eventChannel.emit('acceptSeatId', {seat});
                    res.eventChannel.emit('acceptRoomList', {room: room});
                    res.eventChannel.emit('acceptStoreName', {storeName: storeName});
                }
            })
        },
        //从上个页面获取数据
        getRoomList() {
            const eventChannel = this.$mp.page.getOpenerEventChannel();
            eventChannel.on('acceptStore', data => {
                console.log(data.data);
                const url = `/customer/room/${data.data.storeId}`;
                this.storeId = data.data.storeId;
                this.storeName = data.data.storeName;
                this.$wxhttp.get({
                    url: url
                })
                .then(res => {
                    // 将得到的房间列表存起来
                    this.roomList = res.data.roomList;
                    // 更新房间类型数组
                    this.roomTypeList = [];
                    res.data.roomList.forEach(room => {
                        this.roomTypeList.push(room.roomType);
                    })
                    //获取座位表
                    if(this.roomTypeList.length > 0) {
                        this.getSeatList();
                    }
                })
                .catch(err => {
                    console.log("error! ", err);
                })
            })
        },
        // 切换房间类型
        changeRoomType(index) {
            //切换房间类型下标
            this.currentTypeIndex = index;
            //重新请求一次座位信息
            this.getSeatList();
        },
        // 请求某个房间的座位信息
        // 这个函数又臭又长 可是我没办法 时间来不及了555
        getSeatList() {
            // /.${this.roomList[this.currentTypeIndex].roomType}
            console.log(this.roomList[this.currentTypeIndex]);
            const url = `/customer/sits/${this.storeId}/${this.roomList[this.currentTypeIndex].roomId}`;
            console.log(url);
            this.$wxhttp.get({
                url: url
            })
            .then(res => {
                this.seatList = [];
                const sitList = res.data.sitList;
                if(sitList.length > 0) {
                    let tempseat = {};
                    tempseat.curDate = [];
                    //用一个临时变量存储日期再存进数组
                    let tempCurDate = {};
                    tempCurDate.value = sitList[0].curDate;
                    tempCurDate.sitDate = [];
                    tempCurDate.sitDate.push(sitList[0].sitDate);
                    tempseat.curDate.push(tempCurDate);

                    tempseat.sitId = sitList[0].sitId;
                    tempseat.money = sitList[0].money;
                    tempseat.preserved  = sitList[0].preserved;
                    this.seatList.push(tempseat);
                    sitList.forEach(sit => {
                        for(let i = 0; i < this.seatList.length; i++){
                            const seat = this.seatList[i];
                            if(seat.sitId == sit.sitId) {
                                if(seat.curDate[0]&&seat.curDate[0].value == sit.curDate) {
                                    // 如果日期已经在座位里，只需把时间段加到该日期里
                                    this.seatList[i].curDate[0].sitDate.push(sit.sitDate);
                                    break;
                                }
                                if(seat.curDate[1]&&seat.curDate[1].value == sit.curDate) {
                                    this.seatList[i].curDate[1].sitDate.push(sit.sitDate);
                                    break;
                                }
                                // 如果日期还不存在于座位里，则新建一个日期存放时间段
                                let tempCurDate = {};
                                tempCurDate.value = sit.curDate;
                                tempCurDate.sitDate = [];
                                tempCurDate.sitDate.push(sit.sitDate);
                                seat.curDate.push(tempCurDate);
                                break;  
                            }
                            // 如果数组中还没有该sitId，则将基本信息都加进去
                            seat.curDate = [];
                            let tempCurDate = {};
                            tempCurDate.value = sit.curDate;
                            tempCurDate.sitDate = [];
                            tempCurDate.sitDate.push(sit.sitDate);
                            seat.curDate.push(tempCurDate);
                            this.seatList[i].sitId = sit.sitId;
                            this.seatList[i].money = sit.money;
                            this.seatList[i].preserved  = sit.preserved;
                        }
                    });
                }
            })
            .catch(err => {
                console.log("error! " ,err);
            })
        }
    },
    mounted() {
        this.getRoomList();
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
.seat{
    margin: auto 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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