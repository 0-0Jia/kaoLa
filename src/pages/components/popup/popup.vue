<template>
  <view class="wx-popup" :hidden="flag">
    <view class="popup-container">
      <view class="wx-popup-title">提示</view>
      <view class="wx-popup-con">
        考拉自习室申请获取你的手机号，
        <br />方便为你更好的服务
      </view>
      <view class="wx-popup-btn">
        <button
          class="sure"
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
        >我知道了</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      flag: true,
      telMessage: ""
    };
  },
  onShow() {},
  methods: {  
      getPhoneNumber(e) {
        this.telMessage = e;
        console.log(e);
        this.$emit("loginrequest", e);
      },
  },
  mounted() {}
};
</script>

<style scoped>
.wx-popup {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
}
.popup-container {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80%;
  max-width: 600rpx;
  border-radius: 10rpx;
  box-sizing: bordre-box;
  transform: translate(-50%, -50%);
  overflow: hidden;
  background: #fff;
}
.wx-popup-title {
  width: 100%;
  padding: 20rpx;
  text-align: center;
  font-size: 40rpx;
  border-bottom: 5px solid #44644a;
}
.wx-popup-con {
  margin: 30rpx 20rpx;
  text-align: center;
}
.wx-popup-btn {
  display: flex;
  justify-content: space-around;
}
.wx-popup-btn text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 88rpx;
  border-radius: 88rpx;
}
.sure {
  width: 100%;
  padding: 5px 0;
  border: none;
  outline: none;
  border-radius: 0;
  background-color: #44644a;
  color: white;
}
</style>
