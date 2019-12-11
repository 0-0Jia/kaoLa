<template>
  <div class="container">
    <div class="nav">
      <div @click="order()" class="gridArea">
        <span :class="{greenFont: mode=='myOrder'}">我的预约</span>
        <div class="greenBar" v-show="mode=='myOrder'"></div>
      </div>
      <div @click="meal()">
        <span :class="{greenFont: mode=='myMeal'}">我的套餐</span>
        <div class="greenBar" v-show="mode=='myMeal'"></div>
      </div>
    </div>
    <div class="myOrder" v-show="mode=='myOrder'" v-if="preservationList.length > 0">
      <order-card 
        v-for="(preservation, index) in preservationList"
        :preservation="preservation"
        :key="index"
        @goOrderDetail="goOrderDetail"
        @openDoor="openDoor"
      ></order-card>
    </div>
    <div v-show="mode=='myOrder'" v-else class="else">暂无预约</div>
    <div v-show="mode=='myMeal'">
      <div class="mealShop" @click="goShop">套餐商城</div>
      <div class="myMeal" v-if="userMealList.length > 0">
        <card 
          v-for="(cardMsg, index) in userMealList" 
          :key="index" 
          :cardMsg="cardMsg"
        ></card>
      </div>
      <div v-else class="else">无已购买套餐</div>
    </div>
  </div>
</template>

<script>
import card from "../components/card"
import orderCard from "./orderCard"
export default {
  components: {
    orderCard,
    card
  },
  data() {
    return {
      mode: "myOrder",
      preservationList: [],
      userMealList: []
    };
  },
  methods: {
    meal() {
      this.mode = "myMeal";
      wx.showLoading({
          title: '加载中',
      })
      this.$wxhttp.get({
        url: '/customer/user/meal'
      })
      .then(res => {
        console.log(res);
        wx.hideLoading();
        if(res.code!=0){
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        } else if(res.code==0) {
          this.userMealList = res.data.mealList;
          console.log(this.userMealList);
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
      })
    },
    order() {
      this.mode = "myOrder";
      wx.showLoading({
          title: '加载中',
      })
      this.getOrderList();
      console.log(this.mode);
    },
    getOrderList() {
      this.$wxhttp.get({
        url: '/customer/preservation'
      })
      .then(res => {
        wx.hideLoading();
        if(res.code!=0){
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        } else if(res.code==0){
          this.preservationList = res.data.preservationList;
        }
      })
      .catch(err => {
        console.log('error! ', err);
        wx.hideLoading();
        wx.showToast({
          title: "加载失败",
          icon: 'none',
          duration: 2000
        })
      })
    },
    goOrderDetail(preservation) {
      wx.showLoading({
          title: '加载中',
      })
      mpvue.navigateTo({
        url: '/pages/packageB/orderDetail/main',
        success: function(res) {
          wx.hideLoading();
          res.eventChannel.emit('acceptPreservation', {preservation: preservation});
        }
      })
    },
    goShop() {
      wx.showLoading({
          title: '加载中',
      })
      mpvue.navigateTo({
        url: '/pages/packageB/mealShop/main',
        success() {
          wx.hideLoading();
        }
      })
    },
    openDoor(preservation) {
      wx.showLoading({
          title: '加载中',
      })
      this.$wxhttp.post({
        url: '/customer/opendoor',
        data: {
          storeId: preservation.storeId,
          preservationId: preservation.preservationId 
        }
      })
      .then(res => {
        console.log(res);
        wx.hideLoading();
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      })
      .catch(err => {
        console.log(err)
        wx.hideLoading();
        wx.showToast({
          title: "加载失败",
          icon: 'none',
          duration: 2000
        })
      })
    }
  },
  mounted: function() {
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code);
          // 这里可以把code传给后台，后台用此获取openid及session_key
        }
      }
    });
    this.getOrderList();
    wx.setNavigationBarTitle({
      title: "我的订单"
    });
  }
};
</script>

<style scoped>
.nav {
  height: 48px;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
  padding-left: 18px;
  background-color: white;
}
.nav > div {
  display: inline-block;
  color: #2e2e2e;
  font-size: 16px;
  height: 100%;
  line-height: 48px;
  position: relative;
}
.greenBar {
  position: absolute;
  width: 31.5px;
  height: 4px;
  right: 0;
  left: 0;
  margin: auto;
  bottom: 0;
  background-color: #44644a;
}
.greenFont {
  color: #44644a;
}
.gridArea {
  margin-right: 36px;
}
.myMeal {
  display: flex;
  position: relative;
  margin-left: 16px;
  margin-right: 16px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.hidden {
  display: none !important;
}
.mealShop {
  width: 78px;
  height: 32px;
  background-color: #44644a;
  color: white;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 14px;
  margin-bottom: 12px;
  border-radius: 24px;
  text-align: center;
  line-height: 32px;
  font-size: 12px;
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