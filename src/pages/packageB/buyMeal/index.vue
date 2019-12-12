<template>
  <div>
    <div :class="{hidden: !hasDialog}">
      <a-dialog @close="closeDialog" :dialog="dialog"></a-dialog>
    </div>
    <div class="seat blueBg">
      <img src="/static/images/cardBg.png" class="seatBg" />
      <div class="msg">
        <div class="badge">{{mealMsg.name}}</div>
        <div class="price">￥{{mealMsg.money}}</div>
      </div>
    </div>
    <div class="detail">
      <msg-row name="费用总计" :value="'￥' + mealMsg.money"></msg-row>
      <pay-methods
        :payMethods="payMethods"
        @choosePayMethod="choosePayMethod"
        :choiceList="choiceList"
      ></pay-methods>
      <!-- <div class="tip">注：32积分兑换一张体验卡</div> -->
    </div>
    <submit type="pay" @submit="submit" ableToClick :money="mealMsg.money"></submit>
  </div>
</template>

<script>
import msgRow from "../../components/msgRow";
import payMethods from "../../components/payMethods";
import submit from "../../components/submit";
import aDialog from "../../components/aDialog";
export default {
  components: {
    msgRow,
    payMethods,
    submit,
    aDialog
  },
  data() {
    return {
      payMethods: "restmoney",
      choiceList: [
        {
          name: "余额支付",
          value: "restmoney"
        },
        {
          name: "微信支付",
          value: "wx"
        }
      ],
      hasDialog: false,
      dialog: {
        title: "积分",
        detail: "32分",
        button: "确认兑换"
      },
      mealMsg: {}
    };
  },
  methods: {
    choosePayMethod(value) {
      this.payMethods = value;
    },
    closeDialog() {
      console.log("事件传递到了父组件");
      this.hasDialog = false;
    },
    submit() {
      const mealMsg = this.mealMsg;
      if (this.payMethods == "restmoney") {
        //余额支付则弹出窗口
        wx.showLoading({
            title: '加载中'
        })
        this.$wxhttp
          .post({
            url: "/customer/meal",
            data: {
              payType: 4,
              meal: {
                mealId: mealMsg.mealId // 套餐唯一ID
              }
            }
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
                url: "pages/orderIndex/main"
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
      } else if (this.payMethods == "wx") {
        //微信支付则调用支付接口
        this.$wxhttp
          .post({
            url: "/customer/meal",
            data: {
              payType: 1,
              meal: {
                mealId: mealMsg.mealId // 套餐唯一ID
              }
            }
          })
          .then(res => {
            console.log(`微信支付:`, res);
            if (res.msg == "success") {
            console.log(`微信支付here`);
              this.doWxPay(res.data.wxPayMap);
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
      }
      //  else if(this.payMethods == "point") {  //套餐支付
      //     console.log("事件传递到了父组件");
      //     this.hasDialog = true;
      // }
    },
    getMealMsg() {
      const eventChannel = this.$mp.page.getOpenerEventChannel();
      eventChannel.on("acceptMealMsg", data => {
        this.mealMsg = data.mealMsg;
        console.log(this.mealMsg);
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
  },
  mounted() {
    this.getMealMsg();
    wx.setNavigationBarTitle({
      title: "购买套餐"
    });
  }
};
</script>

<style scoped>
.seat {
  position: relative;
  height: 64px;
  width: 343px;
  margin: auto;
  margin-top: 16px;
  left: 0;
  right: 0;
  box-shadow: 0 2px 12px rgba(68, 100, 74, 0.08);
  background-color: white;
  margin-bottom: 16px;
  border-radius: 6px;
  color: white;
}
.seatBg {
  display: block;
  position: absolute;
  left: 0;
  width: 160px;
  height: 64px;
}
.msg {
  position: absolute;
  right: 16px;
  margin-top: 9px;
  margin-bottom: 9px;
  height: 46px;
  width: 200px;
}
.badge {
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 0;
}
.price {
  font-size: 18px;
  position: absolute;
  bottom: 0;
  right: 0;
}
.pickBg {
  background-image: linear-gradient(to left, #e4e4a5, #e4e4d2);
}
.yellowBg {
  background-image: linear-gradient(to left, #f8a3a3, #f8d0d0);
}
.blueBg {
  background-image: linear-gradient(to left, #50a5ef, #a3cbef);
}
.detail {
  width: 375px;
  background-color: white;
  padding-bottom: 16px;
}
/* .tip{
    font-size: 9px;
    color: #A8A8A8;
    margin-left: 16px;
    margin-top: 8px;
} */
.hidden {
  visibility: hidden;
}
</style>