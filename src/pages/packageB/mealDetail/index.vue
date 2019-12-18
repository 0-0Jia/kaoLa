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
      <msg-row name="套餐时效" :value="mealMsg.mealDays+'天'"></msg-row>
      <msg-row name="剩余次数" :value="mealMsg.usedTimes+'次'" v-if="mealMsg.display==1"></msg-row>
      <msg-row name="套餐描述" :value="mealMsg.mealDesc" nobar></msg-row>
    </div>
    <div class="button" @click="goStore">去使用</div>
  </div>
</template>

<script>
import msgRow from "../../components/msgRow";
import payMethods from "../../components/payMethods";
import submit from "../../components/submit";
import aDialog from "../../components/aDialog";
export default {
  components: {
    msgRow
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
      mealMsg: {}
    };
  },
  methods: {
    getMealMsg() {
      const eventChannel = this.$mp.page.getOpenerEventChannel();
      eventChannel.on("getMealMsg", data => {
        this.mealMsg = data.mealMsg;
        console.log(this.mealMsg);
      });
    },
    goStore() {
      wx.navigateTo({
        url: "/pages/packageA/storeChoose/main"
      })
    }
  },
  mounted() {
    this.getMealMsg();
    wx.setNavigationBarTitle({
      title: "套餐详情"
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
.button {
  display: block;
  position: relative;
  right: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: 220px;
  height: 48px;
  color: #ffffff;
  background-color: #44644a;
  border-radius: 24px;
  line-height: 48px;
  margin-top: 300px;
  font-size: 16px;
}
</style>