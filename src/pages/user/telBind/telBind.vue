<template>
  <div class="tel-bind">
    <div class="bind-card">
      <p style="font-size:14px;">绑定手机号：</p>
      <input type="text" class="bind-input" v-model.lazy="tel" />
    </div>
    <button class="bind-button" @click="bindRedemption">确认</button>
    <button class="wxbind" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定微信手机号</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel: "",
      telMessage: null
    };
  },

  onShow(){
      this.tel = "";
      this.telMessage = null;
  },

  mounted: function() {
    wx.setNavigationBarTitle({
      title: "绑定手机登录"
    });
  },

  methods: {
    getPhoneNumber(e) {
      this.telMessage = e;
      console.log(e, "获取用户手机信息");
      this.flag = true;
      this.bindRedemption();
    },
    bindRedemption() {
      let tel = this.tel;
      let telMessage = this.telMessage;
      let encryptedData, iv;
      console.log(tel);
      console.log(telMessage);
      if (telMessage) {
        tel = "";
        encryptedData = telMessage.mp.detail.encryptedData;
        iv = telMessage.mp.detail.iv;
      } else {
        let mobileReg = /^1[3456789]\d{9}$/;
        let isMobile = mobileReg.exec(tel);
        if (!isMobile) {
          wx.showToast({
            title: "请输入正确的手机号码！",
            icon: "none",
            duration: 2000
          });
          return false;
        }
        telMessage = "";
        encryptedData = "";
        iv = "";
      }
      wx.showLoading({
        title: "加载中"
      });
      this.$wxhttp
        .post({
          url: "/customer/user/phone",
          data: {
            encryptedData: encryptedData,
            iv: iv,
            tel: tel
          }
        })
        .then(res => {
          wx.hideLoading();
          if (res.msg == "success") {

            wx.showToast({
              title: "绑定成功",
              icon: "success",
              duration: 2000
            });
                          console.log("again")
            wx.switchTab({
              url: "/pages/userIndex/main"
            });
          } else {
            this.telMessage = null;
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 2000
            });
          }
          console.log(`后台交互拿回数据:`, res);
        })
        .catch(err => {
          console.log(`自动请求api失败 err:`, err);
        });
    }
  }
};
</script>

<style scoped>
button::after {
  border: none;
}
.bind-card {
  width: 84%;
  margin: 20px 4%;
  border-radius: 6pt;
  background-color: white;
  padding: 10px 4%;
  text-align: center;
  box-shadow: 0 0 10px rgba(68, 100, 74, 0.08);
  text-align: left;
}
.bind-input {
  height: 40px;
  border: none;
  margin-top: 4px;
  border-bottom: 1px solid #a8a8a8;
  font-size: 24px;
  padding: 2px 12px;
}
.bind-button {
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
.wxbind {
  background: none;
  border: none;
  outline: none;
  font-size: 14px;
  color: #a8a8a8;
  margin: 10px auto;
  text-align: center;
}
</style>