<template>
    <div class="placeOrder">
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
        <div class="seat">
            <seat 
                v-for="(seat, index) in seatList" 
                :seat="seat" 
                :key="index"
                @chooseTime="goChooseTime"
            >
            </seat>
        </div>
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
            seatMsgList: [{
                name: "一号桌",
                price: "￥9.6/小时",
                status: true
            }, {
                name: "二号桌",
                price: "￥9.6/小时",
                status: false
            }],
            roomTypeList: [],   //房间类型列表
            currentTypeIndex: 0,    //目前被选中的房间类型
            storeId: 0,     //当前门店Id
            roomList: [],    //房间列表
            seatList: []
        }
    },
    methods: {
        // 跳转到时间预约页面
        goChooseTime() {
            wx.navigateTo({
                url: "/pages/packageA/timeOrder/main"
            })
        },
        //从上个页面获取数据
        getRoomList() {
            const eventChannel = this.$mp.page.getOpenerEventChannel();
            eventChannel.on('acceptStoreId', data => {
                const url = `/customer/room/${data.data}`;
                this.storeId = data.data;
                console.log(url);
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
                    this.getSeatList();
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
        getSeatList() {
            console.log(this.roomList[this.currentTypeIndex]);
            const url = `/customer/sits/${this.storeId}/${this.roomList[this.currentTypeIndex].roomId}`;
            console.log(url);
            this.$wxhttp.get({
                url: url
            })
            .then(res => {
                this.seatList = [];
                console.log(res.data);
                this.seatList = res.data.sitList;
                console.log(this.seatList);
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
</style>