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
      code: ''
    };
  },
  mounted() {},
  methods: {
    goOrder() {
      wx.showLoading({
          title: '加载中',
      })
      wx.navigateTo({
        url: "/pages/packageA/storeChoose/main",
        success() {
          wx.hideLoading();
        }
      });
    },
    scanCode() {
      // 智能门锁

      // this.$wxhttp
      //   .post({
      //     url: "/customer/opendoor",
      //     data: {
      //       code: this.code
      //     }
      //   })
      //   .then(res => {
      //     console.log(`后台交互拿回数据:`, res);
      //     wx.config({
      //       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //       appId: "", // 必填，公众号的唯一标识
      //       timestamp: "", // 必填，生成签名的时间戳
      //       nonceStr: "", // 必填，生成签名的随机串
      //       signature: "", // 必填，签名
      //       jsApiList: ["openLocation"] // 必填，需要使用的JS接口列表 这里填写需要用到的微信api openlocation为使用微信内置地图查看位置接口
      //     });
      //     wx.ready(function() {
      //       wx.checkJsApi({
      //         jsApiList: ["checkJsApi", "openLocation"],
      //         success: function(res) {
      //           wx.scanQRCode({
      //             needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      //             scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
      //             success: res => {
      //               console.log(res, "扫码结果");
      //               // 后续操作
      //             }
      //           });
      //         }
      //       });
      //     });
      //     wx.error(function(res) {
      //       console.log(res);
      //     });
      //   })
      //   .catch(err => {
      //     console.log(`自动请求api失败 err:`, err);
      //   });
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
  margin-top: 64px;
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
  margin-top: 16.5px;
  font-size: 16px;
}
</style>