<template>
  <div class="coupon">
    <div class="coupon-card">
      <p style="font-size:14px;">输入优惠码</p>
      <input type="number" class="coupon-input" v-model="coupon"/>
    </div>
    <button class="coupon-button" @click="couponRedemption">确认</button>
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  data() {
    return {
      coupon: ""
    };
  },

  mounted: function() {
    wx.setNavigationBarTitle({
      title: "团购兑换"
    });
  },

  onShow() {},

  methods: {
    couponRedemption() {
      wx.showLoading({
        title: "加载中"
      });
      this.$wxhttp
        .post({
          url: "/customer/groupon",
          data: {
            code: this.coupon
          }
        })
        .then(res => {
          wx.hideLoading();
          console.log(res);
          if (res.data.code == 0) {
            wx.showToast({
              title: "兑换成功",
              icon: "success",
              duration: 2000
            });
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000
            });
          }
          console.log(`后台交互拿回数据:`, res);
        })
        .catch(err => {
          console.log(`自动请求api失败 err:`, err);
        });
    }
  }
};
</script>

<style scoped>
.coupon-card {
  width: 84%;
  margin: 20px 4%;
  border-radius: 6pt;
  background-color: white;
  padding: 10px 4%;
  text-align: center;
  box-shadow: 0 0 10px rgba(68, 100, 74, 0.08);
  text-align: left;
}
.coupon-input {
  height: 40px;
  border: none;
  margin-top: 4px;
  border-bottom: 1px solid #a8a8a8;
  font-size: 24px;
  padding: 2px 12px;
}
.coupon-button {
  display: block;
  margin: auto;
  text-align: center;
  width: 220px;
  height: 48px;
  color: #ffffff;
  background-color: #44644a;
  box-shadow: 0 0 10px rgba(68, 100, 74, 0.08);
  border-radius: 24px;
  line-height: 48px;
  margin-top: 16.5px;
  font-size: 16px;
}
</style>