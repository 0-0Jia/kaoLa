<template>
  <div class="user">
    <view class="userInfo">
      <view class="avatar" style="background-image:url(../../../static/tabs/photo.png);"></view>
      <p class="user-name">{{userData.name? userData.name : "用户名"}}</p>
      <p class="user-phone">{{userData.tel? userData.tel : "123456789"}}</p>
      <div class="integral-balance-card">
        <div class="integral" @click="jumpIntegral">
          <p style="font-size:16px;">{{userData.score? userData.score : '0'}}分</p>
          <p style="font-size:14px;">积分</p>
        </div>
        <div class="line"></div>
        <div class="balance" @click="jumpBalance">
          <p style="font-size:16px;">￥{{userData.rareMoney? userData.rareMoney : '0.00'}}</p>
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
export default {
  data() {
    return {
      userData: []
    };
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: "个人中心"
    });

    this.getData();
  },

  methods: {
    jumpIntegral() {
      wx.navigateTo({
        url:
          "/pages/user/integral/main" +
          "?integral=" +
          (this.userData.score ? this.userData.score : "0")
      });
    },
    jumpBalance() {
      wx.navigateTo({
        url:
          "/pages/user/balance/main" +
          "?balance=" +
          (this.userData.rareMoney ? this.userData.rareMoney : "0.00")
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
    },
    getData() {
      this.$wxhttp
        .get({
          url: "/customer/user",
          headers: {
            "content-type": "application/json", // 默认值
            "cookie": wx.getStorageSync("sessionid").split(";")[0]
          }
        })
        .then(res => {
          console.log(`后台交互拿回数据:`, res.data);
          this.userData = res.data;
        })
        .catch(err => {
          console.log(`自动请求api失败 err:`, err);
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