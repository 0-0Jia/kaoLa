<template>
  <div class="user">
    <view class="userInfo">
      <view class="avatar" style="background-image:url(../../../static/tabs/photo.png);"></view>
      <p class="user-name">大大大大饼</p>
      <p class="user-phone">12345678900</p>
      <div class="integral-balance-card">
        <div class="integral" @click="jumpIntegral">
          <p style="font-size:16px;">32分</p>
          <p style="font-size:14px;">积分</p>
        </div>
        <div class="line"></div>
        <div class="balance" @click="jumpBalance">
          <p style="font-size:16px;">￥0.00</p>
          <p style="font-size:14px;">余额</p>
        </div>
      </div>
    </view>
    <view class="user-operation">
      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell weui-cell_access" @click="jumpPunch">
          <view class="weui-cell__bd" style="font-size:16px">打卡签到</view>
          <view class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0"></view>
        </view>
      </view>
      <view class="weui-cells weui-cells_after-title" @click="jumpCoupon">
        <view class="weui-cell weui-cell_access">
          <view class="weui-cell__bd" style="font-size:16px">兑换优惠码</view>
          <view class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0"></view>
        </view>
      </view>
      <view class="weui-cells weui-cells_after-title" @click="jumpOrderRecord">
        <view class="weui-cell weui-cell_access">
          <view class="weui-cell__bd" style="font-size:16px">订单记录</view>
          <view class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0"></view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import "../../../static/colorui/main.css";
import "../../../static/colorui/icon.css";
import "../../../static/weui/weui.css";
// import $ from "jquery";

export default {
  config: {
    usingComponents: {
      "wxc-avatar": "@minui/wxc-avatar"
    }
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: "个人中心"
    });
  },

  methods: {
    jumpIntegral() {
      wx.navigateTo({
        url: "/pages/user/integral/main"
      });
    },
    jumpBalance() {
      wx.navigateTo({
        url: "/pages/user/balance/main"
      });
    },
    jumpPunch() {
      wx.navigateTo({
        url: "/pages/user/punch/main"
      });
    },
    jumpCoupon() {
      wx.navigateTo({
        url: "/pages/user/couponRedemption/main"
      });
    },
    jumpOrderRecord() {
      wx.navigateTo({
        url: "/pages/user/orderRecord/main"
      });
    }
  }
};
</script>

<style scoped>
.userInfo {
  margin: 0 auto;
  color: white;
  font-size: 16px;
  text-align: center;
}
.avatar {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin: 15px auto;
  margin-bottom: 10px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
}
.user-name {
  color: #44644a;
  font-size: 16px;
  margin: 0 auto;
}
.user-phone {
  color: black;
  font-size: 14px;
  margin: 5px auto;
  margin-bottom: 12px;
}
.integral-balance-card {
  margin: 0 auto;
  width: 66%;
  background-color: #44644a;
  border-radius: 6pt;
  position: absolute;
  top: 165px;
  left: 17%;
  z-index: 10;
}
.line {
  display: inline-block;
  height: 30px;
  width: 1px;
  background-color: #a8a8a8;
}
.integral {
  display: inline-block;
  padding: 10px 20px;
}
.balance {
  display: inline-block;
  padding: 10px 20px;
}
.user-operation {
  padding-top: 36px;
  background: white;
  margin-top: 42px;
}
</style>