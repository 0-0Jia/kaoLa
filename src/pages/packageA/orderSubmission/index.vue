<template>
  <div>
    <div :class="{hidden: !hasDialog}">
      <a-dialog @close="closeDialog" :dialog="dialog"></a-dialog>
    </div>
    <seat-msg 
      father="orderSubmission" 
      :roomType="roomType" 
      :sitId="sitId"
      :price="basicmsg.price"
    ></seat-msg>
    <div class="msg">
      <msg-row name="预约日期" :value="basicmsg.date"></msg-row>
      <msg-row name="已选时间" :value="basicmsg.choosedTime"></msg-row>
      <msg-row name="所在门店" :value="basicmsg.storeName"></msg-row>
      <msg-row name="费用总计" :value="'￥' + basicmsg.money"></msg-row>
      <pay-methods
        :payMethods="payMethods"
        @choosePayMethod="choosePayMethod"
        :choiceList="choiceList"
      ></pay-methods>
      <div class="chooseMeal" v-show="payMethods=='meal'" @click="goChooseMeal">
        <div class="title">选择套餐</div>
        <span class="meal">{{mealName}}</span>
        <img class="arrow" src="/static/images/arrow.png" />
      </div>
    </div>
    <submit :type="type" @submit="submit" ableToClick :money="money"></submit>
  </div>
</template>

<script>
import seatMsg from "../../components/seatMsg";
import msgRow from "../../components/msgRow";
import payMethods from "../../components/payMethods";
import submit from "../../components/submit";
import aDialog from "../../components/aDialog";
export default {
  components: {
    seatMsg,
    msgRow,
    payMethods,
    submit,
    aDialog
  },
  data() {
    return {
      type: "pay",
      payMethods: "wx",
      hasDialog: false,
      choiceList: [
        {
          name: "微信支付",
          value: "wx"
        },
        {
          name: "套餐支付",
          value: "meal"
        }
      ],
      dialog: {
        title: "余额",
        detail: "￥0.00",
        button: "确认支付"
      },
      msg: {},
      basicmsg: {},
      roomType: "",
      sitId: "",
      choosedMeal: {},
      mealName: "",
      money: 0
    };
  },
  methods: {
    choosePayMethod(value) {
      this.payMethods = value;
      if(value == "wx") this.money = this.basicmsg.money;
      if(value == "meal") this.money = 0;
    },
    goChooseMeal() {
      let temp = this.choosedMeal;
      let passValue = this.passValue;
      wx.navigateTo({
        url: "/pages/packageA/chooseMeal/main",
        success(res) {
          res.eventChannel.on('acceptChoosedMeal', data => {
            temp = data.meal;
            passValue(temp);
          })
        }
      });
    },
    passValue(temp) {
      this.choosedMeal = temp;
      this.mealName = this.choosedMeal.name;
      this.msg.payType = 3;
      this.msg.meal = {};
      this.msg.meal.mealId = this.choosedMeal.mealId;
      this.money = 0;
      console.log(this.msg);
    },
    closeDialog() {
      console.log("事件传递到了父组件");
      this.hasDialog = false;
    },
    submit() {
      if (this.payMethods == "wx") {
        //微信支付则调用支付接口
        //微信支付则调用支付接口
        this.msg.payType = 1;
        this.msg.mealId = null;
        //微信支付则调用支付接口
        this.$wxhttp
          .post({
            url: "/customer/sits",
            data: this.msg
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
      } else if (this.payMethods == "meal") {
        //套餐支付
          this.msg.payType = 3;
          this.msg.mealId = this.choosedMeal.mealId;
          this.$wxhttp.post({
            url: '/customer/sits',
            data: this.msg
          })
          .then(res => {
            console.log(res);
            wx.showToast({
              title: res.msg,
              duration: 2000,
              icon: "none"
            })
            if(res.code == 0) {
              wx.switchTab({
                url: '/index/main'
              })
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    getPayMsg() {
      const eventChannel = this.$mp.page.getOpenerEventChannel();
      eventChannel.on("acceptPayMsg", data => {
        this.msg = data;
        this.roomType = data.room.roomType;
        this.sitId = data.sitId;
      });
      eventChannel.on("acceptBasicMsg", data => {
        this.basicmsg = data;
        this.dialog.detail = "￥" + this.basicmsg.money;
        this.money = this.basicmsg.money;
        console.log(this.basicmsg);
        console.log(this.basicmsg.price);

      });
      console.log(this.msg);
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
            icon: "success",
            duration: 2000
          });
          if(res.code == 0) {
              wx.switchTab({
                url: '/index/main'
              })
            }
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
  },
  mounted() {
    this.getPayMsg();
    wx.setNavigationBarTitle({
      title: "提交预约"
    });
  }
};
</script>

<style scoped>
.msg {
  width: 375px;
  padding-bottom: 16px;
  background-color: white;
}
.chooseMeal {
  width: 343px;
  height: 26px;
  right: 0;
  left: 0;
  margin: auto;
  margin-top: 20px;
  position: relative;
  color: #2e2e2e;
  background-color: white;
}
.title {
  display: inline-block;
  line-height: 22px;
  font-size: 12px;
}
.meal {
  display: inline-block;
  line-height: 22px;
  position: absolute;
  font-size: 12px;
  color: #a8a8a8;
  right: 11px;
}
.arrow {
  width: 7.13px;
  height: 12.97px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  margin-left: 10.5px;
}
.hidden {
  visibility: hidden;
}
</style>