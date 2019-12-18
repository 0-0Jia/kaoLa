<template>
    <div>
        <swiper autoplay>
            <swiper-item v-for="(img, index) in imgList" :key="index">
                <img :src="img">
            </swiper-item>
        </swiper>
        <div class="msg">
            <msg-row name="所在门店" :value="store.storeName"></msg-row>
            <div v-if="roomList.length>0">
                <div class="seatTypeChoose">
                    <div class="left">
                        <div class="title">座位类型</div>
                        <div class="tip" @click="showTip">说明</div>
                        <div class="type">
                            <div 
                                :class="[(index==roomIndex)?'chooseRoomType':'','button']" 
                                v-for="(type, index) in roomTypeList"
                                :key="index"
                                @click="chooseRoom(index)"
                            >
                                {{type}}
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="price" v-if="seatList.length>0">￥{{seatList[seatIndex].money}}元/小时</div>
                        <div class="showPic" @click="getSeatImg">
                            <img class="seatIcon" src="/static/images/seat.png">
                            <span>座位排布</span>
                        </div>
                    </div>
                    <div class="bar"></div>
                </div>
                <div v-if="seatList.length>0">
                    <div class="picker">
                        <div class="chooseSeat" @click="goChooseSeat">
                            <span>预约座位</span>
                            <div class="seatValue">
                                <span class="choosedSeat" v-if="seatList.length>0">{{seatList[seatIndex].sitId}}号位</span>
                                <span class="choosedSeat" v-else>无</span>
                                <img class="arrow" src="/static/images/arrow.png" />
                            </div>
                        </div>
                        <div class="bar"></div>
                    </div>               
                    <div class="relavite">
                        <time-choose
                            :isChoose="isChoose" 
                            :timeList="timeList"
                            :dateList="dateList"
                            :dateIndex="dateIndex"                           
                            @refreshTimeList="refreshTimeList"
                            @update="upDate"
                            @updateChoosedTime="updateChoosedTime"
                        ></time-choose>
                        <div class="bar"></div>
                    </div>
                    <pay-methods
                        :payMethods="payMethods"
                        @choosePayMethod="choosePayMethod"
                        :choiceList="choiceList"
                    ></pay-methods>
                    <div class="chooseMeal" v-show="payMethods=='meal'" @click="goChooseMeal">
                        <div class="mealtitle">选择套餐</div>
                        <span class="meal">{{mealName}}</span>
                        <img class="arrow" src="/static/images/arrow.png" />
                    </div>
                </div>
                <div class="else" v-else>暂无座位</div>
            </div>
            <div v-else class="else">暂无房间</div>
        </div>
        <submit :type="type" @submit="submit" :ableToClick="ableToClick" :money="payMoney"></submit>
    </div>
</template>

<script>
import msgRow from "../../components/msgRow";
import timeChoose from "./timeChoose";
import payMethods from "../../components/payMethods";
import submit from "../../components/submit";
export default {
    components: {
        msgRow,
        timeChoose,
        payMethods,
        submit
    },
    data() {
        return {
            store: {},
            getRoomListUrl: "",
            roomList: {},           //获取到的所有的房间
            roomIndex: 0,       //当前选择的房间的下标
            roomTypeList: [],       //房间类型的列表
            seatList: [],           //获取到的对应房间的座位列表
            seatIndex: 0,           //当前选择的座位
            curDateIndex: 0,        //当前选择的时间
            timeList: [],
            dateList: [],
            money: 0,
            ableToClick: false,
            choosedTime: [],
            imgList: [],             //轮播图列表
            type: "pay",
            payMethods: "wx",
            choiceList: [
                {
                name: "微信支付",
                value: "wx"
                },
                {
                name: "套餐支付",
                value: "meal"
                },
                {
                name: "余额支付",
                value: "restmoney"
                }
            ],
            choosedMeal: {},
            payMsg: {},
            payMoney: 0,
            dateIndex: 0,
            choosedTimeStr: "",
            isChoose: [],
            mealName: ""
        }
    },
    methods: {
        //获取上个页面传递过来的门店消息
        getStoreMsg() {
            wx.showLoading({
                title: "加载中"
            });
            const eventChannel = this.$mp.page.getOpenerEventChannel();
            eventChannel.on("acceptStore", data => {
                console.log(data.data);
                this.store = data.data;
                this.getRoomListUrl = `/customer/room/${this.store.storeId}`;
                this.getRoomList(this.getRoomListUrl);
                //获取轮播图
                this.getImgList();
            });
        },
        //获取房间列表
        getRoomList(url) {
            this.$wxhttp.get({
                url: url
            })
            .then(res => {
                // 将得到的房间列表存起来
                wx.hideLoading();
                console.log(res.data);
                if (res.code != 0) {
                    wx.showToast({
                        title: res.msg,
                        icon: "none",
                        duration: 2000
                    });
                } else if (res.code == 0) {
                    this.roomList = res.data.roomList;
                    // 更新房间类型数组
                    this.roomTypeList = [];
                    this.roomList.forEach(room => {
                        this.roomTypeList.push(room.roomType);
                    });
                    //获取座位表
                    if (this.roomTypeList.length > 0) {
                        this.getSeatList();

                    }
                }
            })
            .catch(err => {
                console.log("error! ", err);
                wx.hideLoading();
                wx.showToast({
                    title: "房间列表获取失败",
                    icon: "none",
                    duration: 2000
                });
            });
        },
        //获取座位列表
        getSeatList() {
            wx.showLoading({
                title: "加载中"
            });
            console.log(this.roomList[this.roomIndex]);
            const url = `/customer/sits/${this.store.storeId}/${
                this.roomList[this.roomIndex].roomId
            }/${this.roomList[this.roomIndex].roomType}`;
            console.log(url);
            this.$wxhttp.get({
                url: url
            })
            .then(res => {
                wx.hideLoading();
                if (res.code != 0) {
                    wx.showToast({
                        title: res.msg,
                        icon: "none",
                        duration: 2000
                    });
                } else if (res.code == 0) {
                    this.seatList = [];
                    const sitList = res.data.sitList;
                    if (sitList.length > 0) {
                        let tempseat = {};
                        tempseat.curDate = [];
                        //用一个临时变量存储日期再存进数组
                        let tempCurDate = {};
                        tempCurDate.value = sitList[0].curDate;
                        //用一个临时变量（对象）存放时间段，属性value是时间段，preserved表示是否被预定
                        let tempSitDate = {};
                        tempSitDate.value = sitList[0].sitDate;
                        tempSitDate.preserved = sitList[0].preserved;
                        //将该时间段对象存入该日期对象的时间段数组中
                        tempCurDate.sitDate = [];
                        tempCurDate.sitDate.push(tempSitDate);
                        //将该日期对象存入该作为对象的日期数组中
                        tempseat.curDate.push(tempCurDate);
                        tempseat.sitId = sitList[0].sitId;
                        tempseat.money = sitList[0].money;
                        //将该座位对象作为第一个作为存进座位列表中
                        this.seatList.push(tempseat);
                        console.log(this.seatList, "0");
                        //遍历获取到的座位列表的从第二个开始的每一个座位，第一个已经在上面处理过了
                        for(let k = 1; k < sitList.length; k++) {
                            let sit = sitList[k];
                            //将每一个座位与seatList中的每一个对象进行比较
                            two:
                            for(let i = 0; i < this.seatList.length; i++) {
                                const seat = this.seatList[i];
                                //如果这个座位已经在seatList中存在
                                if(seat.sitId == sit.sitId) {
                                    //遍历座位中的每一个日期
                                    for(let n=0; n < seat.curDate.length; n++){
                                        //如果这个日期已经在座位中存在
                                        //将该时间段加入这个日期
                                        //然后停止遍历，重新看下一个sit
                                        if(seat.curDate[n].value == sit.curDate) {
                                            tempSitDate = {};
                                            tempSitDate.value = sit.sitDate;
                                            tempSitDate.preserved = sit.preserved;
                                            seat.curDate[n].sitDate.push(tempSitDate);
                                            break two;
                                        }
                                    }
                                    //如果该日期还不存在与座位中
                                    //则将该座位存进座位中
                                    //然后停止便利，看下一个sit
                                    tempCurDate = {};
                                    tempCurDate.value = sit.curDate;
                                    tempCurDate.sitDate = [];
                                    tempSitDate = {};
                                    tempSitDate.value = sit.sitDate;
                                    tempSitDate.preserved = sit.preserved;
                                    tempCurDate.sitDate.push(tempSitDate);
                                    seat.curDate.push(tempCurDate);
                                    break two;
                                }
                                //如果遍历到最后一个座位还没有找到一样的，说明seatList中没有这个座位
                                //新建一个
                                if(i == this.seatList.length-1  && seat.sitId != sit.sitId){
                                    let tseat = {};
                                    //补充基本信息
                                    tseat.sitId = sit.sitId;
                                    tseat.money = sit.money;
                                    tseat.curDate = [];
                                    //新建一个日期
                                    tempCurDate = {};
                                    tempCurDate.value = sit.curDate;
                                    tempCurDate.sitDate = [];
                                    //新建一个时间段
                                    tempSitDate = {};
                                    tempSitDate.value = sit.sitDate;
                                    tempSitDate.preserved = sit.preserved;
                                    //把时间段存入日期
                                    tempCurDate.sitDate.push(tempSitDate);
                                    //把日期存入座位
                                    tseat.curDate.push(tempCurDate);
                                    this.seatList.push(tseat);
                                    //停止遍历
                                    break two;
                                }
                            }
                        }
                    }
                    console.log(this.seatList, "done");
                    this.setDateList();
                }
            })
            .catch(err => {
                console.log("error! ", err);
                //如果座位列表获取失败，则显示加载失败
                wx.hideLoading();
                wx.showToast({
                    title: "座位列表获取失败",
                    icon: "none",
                    duration: 2000
                });
            });
        },
        //点击按钮选择房间
        chooseRoom(index) {
            this.roomIndex = index;
            this.getSeatList();
            this.timeList = [];
        },
        //点击跳转到座位选择
        goChooseSeat() {
            let that = this;
            wx.showLoading({
                title: "加载中"
            });
            mpvue.navigateTo({
                url: "/pages/packageA/chooseSeat/main",
                success(res) {
                    wx.hideLoading();
                    res.eventChannel.emit("acceptSeatList", { seatList: that.seatList });
                    res.eventChannel.on("sendChooseSeat", data => {
                        that.setSeatIndex(data.index);
                        that.resetCurDateIndex();
                        that.upDate(0);
                    });
                }
            })
        },
        //设置当前日期为第一天
        resetCurDateIndex() {
            this.curDateIndex = 0;
        },
        //设置当前选择的座位
        setSeatIndex(index) {
            this.seatIndex = index;
            this.setDateList();
        },
        //设置当前可选的日期
        setDateList() {
            this.dateList = [];
            if(this.seatList.length>0){
                for(let i = 0; i < this.seatList[this.seatIndex].curDate.length; i++) {
                    this.dateList.push(this.seatList[this.seatIndex].curDate[i].value);
                }
                console.log(this.dateList);
                this.setTimeList();
            }
        },
        //设置当前的时间表
        setTimeList() {
            if(this.seatList.length>0 && this.seatList[this.seatIndex].curDate.length>0) {
                console.log(this.curDateIndex)
                console.log(this.seatList[this.seatIndex].curDate[this.curDateIndex])
                this.timeList = this.seatList[this.seatIndex].curDate[this.curDateIndex].sitDate;
            } 
        },
        //刷新时间表
        refreshTimeList(index) {
            this.curDateIndex = index;
            console.log("curdateindex: ", this.curDateIndex);
            this.setTimeList();
        },
        //获取轮播的图片
        getImgList() {
            let baseUrl = `https://qgrobot.oss-cn-shenzhen.aliyuncs.com`;
            this.imgList = [];
            for(let i=1; i<4; i++) {
                let imgUrl = `${baseUrl}/${this.store.storeId}_dist_${i}.png`;
                this.imgList.push(imgUrl);
            }
        },
        //获取座位分布图
        getSeatImg() {
            let baseUrl = `https://qgrobot.oss-cn-shenzhen.aliyuncs.com`;
            wx.previewImage({
                urls: [`${baseUrl}/${this.store.storeId}_sit.png`] // 需要预览的图片http链接列表
            })
        },
        //选择支付方式
        choosePayMethod(value) {
            this.payMethods = value;
            if(value == "wx" || value == "restmoney") this.payMoney = this.money;
            if(value == "meal") this.payMoney = 0;
        },
        //跳转到套餐选择页面
        goChooseMeal() {
            let that = this;
            let temp = this.choosedMeal;
            wx.showLoading({
                title: "加载中"
            });
            wx.navigateTo({
                url: "/pages/packageA/chooseMeal/main",
                success(res) {
                    wx.hideLoading();
                    res.eventChannel.on("acceptChoosedMeal", data => {
                        that.setPayMsg(data.meal);
                    });
                }
            });
        },
        //根据所选套餐设置支付接口的参数
        setPayMsg(meal) {
            this.choosedMeal = meal;
            this.mealName = this.choosedMeal.name;
            this.payMsg.payType = 3;
            this.payMsg.meal = {};
            this.payMsg.meal.mealId = this.choosedMeal.mealId;
            this.payMoney = 0;
            console.log(this.payMsg);
        },
        //支付
        submit() {
            //设置支付的参数
            this.payMsg.sitId = this.seatList[this.seatIndex].sitId;
            this.payMsg.time = this.seatList[this.seatIndex].curDate[this.curDateIndex].value + " " + this.choosedTimeStr;
            this.payMsg.room = this.roomList[this.roomIndex];
            // this.payMsg.money = this.payMoney;
            if (this.payMethods == "wx") {
                this.payMsg.payType = 1;
                this.payMsg.mealId = null;
                //微信支付则调用支付接口
                this.$wxhttp
                .post({
                    url: "/customer/sits",
                    data: this.payMsg
                })
                .then(res => {
                    console.log(`微信支付:`, res);
                    if (res.msg == "success") {
                        console.log(`微信支付here`);
                        this.doWxPay(res.data.wxPayMap);
                    } else {
                        wx.showToast({
                            title: res.msg,
                            icon: "none",
                            duration: 2000
                        });
                    }
                })
                .catch(err => {
                    console.log(`err:`, err);
                });
            } else if (this.payMethods == "meal") {
                //套餐支付
                this.payMsg.payType = 3;
                this.payMsg.mealId = this.choosedMeal.mealId;
                wx.showLoading({
                    title: "加载中"
                });
                this.$wxhttp
                .post({
                    url: "/customer/sits",
                    data: this.payMsg
                })
                .then(res => {
                    wx.hideLoading();
                    console.log(res);
                    wx.showToast({
                        title: res.msg,
                        duration: 2000,
                        icon: "none"
                    });
                    if (res.code == 0) {
                    wx.switchTab({
                        url: '/pages/index/main'
                    })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            } else if(this.payMethods == "restmoney") {
                //余额支付
                this.payMsg.payType = 4;
                this.payMsg.mealId = null;
                wx.showLoading({
                    title: '加载中'
                })
                this.$wxhttp
                .post({
                    url: "/customer/sits",
                    data: this.payMsg
                })
                .then(res => {
                    console.log(res);
                    wx.hideLoading();
                    if(res.code!=0) {
                        wx.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    } else if(res.code==0){
                        wx.showToast({
                            title: "支付成功",
                            icon: 'none',
                            duration: 2000
                        });
                        wx.switchTab({
                            url: "/pages/index/main"
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    wx.hideLoading();
                    wx.showToast({
                        title: "加载失败",
                        icon: 'none',
                        duration: 2000
                    })
                });
            }
        },
        //更新所选的时间
        upDate(index) {
            this.dateIndex = index;
            this.isChoose = [];
            this.choosedTime = [];
            this.ableToClick = false;
            this.payMoney = this.money = 0;
            console.log("update");
            this.refreshTimeList(index);
        },
        //更新选择的时间段
        updateChoosedTime(index) {
            if(this.timeList[index].preserved == 0) {
                this.isChoose[index] = !this.isChoose[index];
                console.log(this.isChoose);
                //将选择的时间段传到父组件
                this.choosedTime = [];
                this.isChoose.forEach((flag, i) => {
                    if(flag) {
                        this.choosedTime.push(this.timeList[i].value);
                    }
                });
                //如果有选择时间，则支付按钮点亮
                this.ableToClick = false;
                if(this.choosedTime.length>0) {
                    this.ableToClick = true;
                }
                //更新钱的数量
                this.money = (this.choosedTime.length * this.seatList[this.seatIndex].money).toFixed(2);
                this.payMoney = this.money;
                this.choosedTimeStr = this.choosedTime.join(',');
            }
        },
        //微信支付
        doWxPay(param) {
            //小程序发起微信支付
            wx.requestPayment({
                timeStamp: param.timeStamp + "", //记住，这边的timeStamp一定要是字符串类型的，不然会报错
                nonceStr: param.nonceStr,
                package: param.package,
                signType: "MD5",
                paySign: param.paySign,
                appId: param.appId,
                success: function(event) {
                    // success
                    console.log(event);
                    wx.showToast({
                        title: "支付成功",
                        icon: "none",
                        duration: 2000
                    });
                    wx.switchTab({
                        url: "/pages/index/main"
                    });
                },
                fail: function(error) {
                    // fail
                    console.log("支付失败");
                    wx.showToast({
                        title: "支付失败",
                        icon: "none",
                        duration: 2000
                    });
                },
                complete: function() {
                    // complete
                    console.log("pay complete");
                }
            });        
        },
        //显示座位说明
        showTip() {
            wx.showModal({
                title: '座位类型说明',
                content: '哈哈哈哈哈哈哈哈哈哈哈哈',
                showCancel: false
            })
        }
    }, 
    mounted() {
        this.getStoreMsg();
    }
}
</script>

<style scoped>
.msg {
  margin-top: 8px;
  width: 375px;
  padding-bottom: 64px;
  background-color: white;
}
.seatTypeChoose{
    width: 343px;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    padding-bottom: 12px;
    min-height: 35px;
}
.left{
    width: 260px;
    margin-top: 16px;
}
.title{
    color: #2E2E2E;
    font-size: 12px;
    display: inline-block;
    margin-right: 10px;
}
.type{
    width: 100%;
    margin-top: 8px;
    padding-left: 3.5px;
}
.tip{
    width: 45px;
    height: 24px;
    border: 2px solid #44644A;
    border-radius: 24px;
    box-sizing: border-box;
    color: #44644A;
    font-size: 10px;
    text-align: center;
    line-height: 24px;
    display: inline-block;
    margin-right: 16px;
}
.button{
    width: 58.5px;
    height: 24px;
    border: 2px solid #44644A;
    border-radius: 24px;
    box-sizing: border-box;
    color: #44644A;
    font-size: 10px;
    text-align: center;
    line-height: 24px;
    display: inline-block;
    margin-right: 16px;
}
.right{
    width: 115px;
    position: absolute;
    right: 0;
    top: 0;
}
.price{
    color: #44644A;
    font-weight: bold;
    font-size: 16px;
    text-align: right;
}
.showPic{
    width: 100%;
    text-align: right;
}
.seatIcon{
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 4px;
    vertical-align: middle;
}
.showPic>span{
    font-size: 12px;
    color: #2E2E2E;
}
.picker{
    width: 343px;
    height: 44px;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 12px;
    color: #2E2E2E;
}
.chooseSeat{
    width: 100%;
    height: 12px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto; 
}
.chooseSeat>div{
    display: inline-block;
}
.seatValue{
    position: absolute;
    right: 18.5px;
}
.arrow{
    width: 7.13px;
    height: 12.97px;
    position: absolute;
    top: 0;
    bottom: 0;
    line-height: 12px;
    margin: auto;
    margin-left: 10.5px;
}
.bar{
    position: absolute;
    z-index: 2;
    bottom: 0;
    width: 100%;
    height: 0.5px;
    background-color: #A8A8A8;
}
.relavite{
    position: relative;
}
.relavite>.bar{
    bottom: 1px !important;
    width: 343px;
    height: 0.5px;
    left: 0;
    right: 0;
    margin: auto;
}
.chooseRoomType{
    background-color: #44644A;
    color: white;
}
.else{
    color: #44644A;
    opacity: 0.5;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    position: relative;
    top: 50px;
}
.chooseMeal {
  width: 343px;
  height: 26px;
  right: 0;
  left: 0;
  margin: auto;
  margin-top: 20px;
  position: relative;
  color: #2e2e2e;
  background-color: white;
}
.mealtitle {
  display: inline-block;
  line-height: 22px;
  font-size: 12px;
}
.meal {
  display: inline-block;
  line-height: 22px;
  position: absolute;
  font-size: 12px;
  color: #a8a8a8;
  right: 11px;
}
.chooseMeal>.arrow {
  width: 7.13px;
  height: 12.97px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  margin-left: 10.5px;
}
</style>