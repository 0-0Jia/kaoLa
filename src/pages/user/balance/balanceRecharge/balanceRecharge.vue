<template>
  <div class="balance-recharge">
    <div class="recharge-card">
      <span class="money">￥</span>
      <input type="text" class="recharge-input" v-model.lazy="money" placeholder="充值范围为0-300" />
    </div>
    <button class="recharge-button" @click="rechargeConfirm">确认</button>
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  data() {
    return {
      money: ""
    };
  },

  mounted: function() {
    wx.setNavigationBarTitle({
      title: "余额充值"
    });
  },

  methods: {
    rechargeConfirm() {
      let that = this;
      console.log(this.money);
      that.$wxhttp
        .post({
          url: "/customer/money",
          data: {
            money: that.money
          }
        })
        .then(res => {
          console.log(`后台交互拿回数据:`, res);
          if (res.data.msg == "success") {
            this.doWxPay(res.data.data.wxPayMap);
          } else {
            wx.showToast({
              title: res.msg,
              duration: 2000
            });
          }
        })
        .catch(err => {
          console.log(`err:`, err);
        });
    },

    doWxPay(param) {
      //小程序发起微信支付
      wx.requestPayment({
        timeStamp: param.timeStamp+"", //记住，这边的timeStamp一定要是字符串类型的，不然会报错
        nonceStr: param.nonceStr,
        package: param.package,
        signType: "MD5",
        paySign: param.sign,
        success: function(event) {
          // success
          console.log(event);
          wx.showToast({
            title: "支付成功",
            icon: "success",
            duration: 2000
          });
        },
        fail: function(error) {
          // fail
          console.log("支付失败");
          console.log(error);
        },
        complete: function() {
          // complete
          console.log("pay complete");
        }
      });
    }
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
  display: inline-block;
  width: 85%;
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