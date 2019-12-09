<template>
  <div class="container">
    <div class="nav">
      <div @click="order()" class="gridArea">
        <span :class="{greenFont: mode=='myOrder'}">我的预约</span>
        <div class="greenBar" v-show="mode=='myOrder'"></div>
      </div>
      <div @click="meal()">
        <span :class="{greenFont: mode=='myMeal'}">我的套餐</span>
        <div class="greenBar" v-show="mode=='myMeal'"></div>
      </div>
    </div>
    <div class="myOrder" v-show="mode=='myOrder'">
      <order-card effect></order-card>
      <order-card></order-card>
    </div>
    <!-- 由于这里使用v-show的话给盒子加上的display:none的属性会和原本的flex属性值冲突，
    无法不显示，所以这里改了另一种写法-->
    <div v-show="mode=='myMeal'">
      <div class="mealShop">套餐商城</div>
      <div class="myMeal">
        <card v-for="(cardMsg, index) in cardMsgList" :key="index" :cardMsg="cardMsg"></card>
      </div>
    </div>
  </div>
</template>

<script>
import card from "../components/card";
import orderCard from "../orderIndex/orderCard";
export default {
  components: {
    orderCard,
    card
  },
  data() {
    return {
      cardMsgList: [
        {
          title: "日卡",
          detail: "双人位",
          timeLimit: "无期限"
        },
        {
          title: "月卡",
          detail: "8:00-12:00全早",
          timeLimit: "剩余1天",
          type: "monthly"
        },
        {
          title: "体验卡",
          detail: null,
          timeLimit: "无期限",
          type: "try"
        }
      ],
      mode: "myOrder"
    };
  },
  methods: {
    meal() {
      this.mode = "myMeal";
      console.log(this.mode);
    },
    order() {
      this.mode = "myOrder";
      console.log(this.mode);
    }
  },

  mounted: function() {
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code);
          // 这里可以把code传给后台，后台用此获取openid及session_key
        }
      }
    });
  }
};
</script>

<style scoped>
.nav {
  height: 48px;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
  padding-left: 18px;
  background-color: white;
}
.nav > div {
  display: inline-block;
  color: #2e2e2e;
  font-size: 16px;
  height: 100%;
  line-height: 48px;
  position: relative;
}
.greenBar {
  position: absolute;
  width: 31.5px;
  height: 4px;
  right: 0;
  left: 0;
  margin: auto;
  bottom: 0;
  background-color: #44644a;
}
.greenFont {
  color: #44644a;
}
.gridArea {
  margin-right: 36px;
}
.myMeal {
  display: flex;
  position: relative;
  margin-left: 16px;
  margin-right: 16px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.hidden {
  display: none !important;
}
.mealShop {
  width: 78px;
  height: 32px;
  background-color: #44644a;
  color: white;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 14px;
  margin-bottom: 12px;
  border-radius: 24px;
  text-align: center;
  line-height: 32px;
  font-size: 12px;
}
</style>