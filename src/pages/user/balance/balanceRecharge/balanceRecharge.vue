<template>
  <div class="balance-recharge">
    <div class="recharge-card">
      <span class="money">￥</span>
      <input type="text" class="recharge-input" />
    </div>
    <button class="recharge-button" @click="rechargeConfirm">确认</button>
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
    rechaegeConfirm() {}
  }
};
</script>

<style scoped>
.recharge-card {
  width: 90%;
  margin: 20px auto;
  border-radius: 6pt;
  background-color: white;
  padding: 15px 7%;
  text-align: left;
  box-shadow: 0 0 10px rgba(68, 100, 74, 0.08);
  text-align: left;
}
.money {
    font-weight: 600;
    font-size: 30px;
}
.recharge-input {
  height: 40px;
  border: none;
  margin-top: 4px;
  margin-left: 5px;
  border-bottom: 1px solid #a8a8a8;
  font-size: 24px;
  padding: 2px 12px;
}
.recharge-button {
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