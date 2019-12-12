<template>
  <div class="balance-recharge">
    <div class="balance-recharge-card">
      <span class="money">￥</span>
      <input type="text" class="recharge-input" v-model.lazy="money" placeholder="充值范围为0-300(整数)" />
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
  onUnload: function() {
    wx.navigateBack({
      delta: 2 // 回退前 delta(默认为1) 页面
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
    }
  }
};
</script>

<style scoped>
.balance-recharge-card {
  width: 84%;
  margin: 20px 4%;
  border-radius: 6pt;
  background-color: white;
  padding: 10px 4%;
  text-align: center;
  box-shadow: 0 0 10px rgba(68, 100, 74, 0.08);
  text-align: left;
}
.money {
  font-weight: 600;
  font-size: 30px;
}
.recharge-input {
  display: inline-block;
  width: 80%;
  height: 40px;
  border: none;
  margin-bottom: -6px;
  margin-left: 5px;
  border-bottom: 1px solid #a8a8a8;
  font-size: 24px;
  padding: 0 12px;
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