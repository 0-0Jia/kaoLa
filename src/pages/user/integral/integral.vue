<template>
  <div class="integral">
    <div class="integral-card">
      <p style="font-size:14px;">亲爱的{{name}}，你共有积分</p>
      <p class="integral-now">{{integral}}分</p>
    </div>
    <button class="punch-button" @click="jumpPunch">打卡签到</button>
    <p class="introduction">打卡签到可赚取更多积分</p>
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  data() {
    return {
      name: '',
      integral: ""
    };
  },
  onLoad: function(options) {
    this.name = options.name;
    this.integral = options.integral;
  },
  mounted: function() {
    wx.setNavigationBarTitle({
      title: "积分"
    });
  },

  methods: {
    jumpPunch() {
      wx.showLoading({
        title: "加载中"
      })
      wx.navigateTo({
        url: "/pages/user/punch/main",
        success() {
          wx.hideLoading();
        }
      });
    }
  }
};
</script>

<style scoped>
.integral-card {
  width: 84%;
  margin: 20px 4%;
  border-radius: 6pt;
  background-color: white;
  padding: 10px 4%;
  text-align: center;
  box-shadow: 0 0 10px rgba(68, 100, 74, 0.08);
}
.integral-now {
  font-weight: 600;
  font-size: 32px;
}
.punch-button {
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
.introduction {
  font-size: 14px;
  color: #a8a8a8;
  margin: 10px auto;
  text-align: center;
}
</style>