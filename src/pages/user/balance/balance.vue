<template>
  <div class="login">
    <div class="balance">
      <div class="balance-card">
        <p style="font-size:14px;">亲爱的{{name}}，你共有余额</p>
        <p class="balance-now">￥{{balance}}</p>
      </div>
      <button class="recharge-button" @click="jumpRecharge">充值</button>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  data() {
    return {
      name: '',
      balance: "0.00"
    };
  },
  onLoad: function(options){
    this.name = options.name;
    this.balance = options.balance;
  },

  mounted: function() {
    wx.setNavigationBarTitle({
      title: "余额"
    });
  },

  methods: {
    jumpRecharge() {
      wx.navigateTo({
        url: "/pages/user/balance/balanceRecharge/main"
      });
    }
  }
};
</script>

<style scoped>
.balance-card {
  width: 90%;
  margin: 20px auto;
  border-radius: 6pt;
  background-color: white;
  padding: 10px 0;
  text-align: center;
  box-shadow: 0 0 10px rgba(68, 100, 74, 0.08);
}
.balance-now {
  font-weight: 600;
  font-size: 32px;
}
.recharge-button {
  display: block;
  margin: auto;
  text-align: center;
  width: 220px;
  height: 48px;
  color: #ffffff;
  background-color: #44644a;
  border-radius: 24px;
  line-height: 48px;
  margin-top: 16.5px;
  font-size: 16px;
}
</style>