<template>
  <div>
    <img class="logo" src="/static/images/logo.png" />
    <button class="green" @click="goOrder()">点击预约</button>
    <!-- <button class="green" @click="scanCode()">扫码开锁</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello",
      code: ""
    };
  },
  mounted() {},
  methods: {
    goOrder() {
      wx.showLoading({
        title: "加载中"
      });
      wx.navigateTo({
        url: "/pages/packageA/storeChoose/main",
        success() {
          wx.hideLoading();
        }
      });
    }
  }
};
</script>

<style scoped>
.message {
  color: red;
  padding: 10px;
  text-align: center;
}
.logo {
  width: 220px;
  height: 220px;
  display: block;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 80px;
  margin-bottom: 32px;
}
.green {
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
  margin-top: 50px;
  font-size: 16px;
}
</style>