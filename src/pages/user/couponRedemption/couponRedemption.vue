<template>
  <div class="coupon">
    <div class="coupon-card">
      <p style="font-size:14px;">输入优惠码</p>
      <input type="text" class="coupon-input" />
    </div>
    <button class="coupon-button" @click="couponRedemption">确认</button>
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  mounted: function() {
    wx.setNavigationBarTitle({
      title: "兑换优惠码"
    });
  },

  methods: {
    couponRedemption() {}
  }
};
</script>

<style scoped>
.coupon-card {
  width: 90%;
  margin: 20px auto;
  border-radius: 6pt;
  background-color: white;
  padding: 15px 7%;
  text-align: left;
  box-shadow: 0 0 10px rgba(68, 100, 74, 0.08);
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