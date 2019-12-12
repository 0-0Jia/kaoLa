<template>
  <div class="login">
    <div :class="{ displayNone: login }">
      <!-- <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">获取用户信息</button> -->
      <img class="logo" src="/static/images/logo.png" />
      <p class="title">需要您的授权</p>
      <p class="discription">
        为了提供更好的服务，
        <br />请允许稍后的微信授权
      </p>
      <button class="green" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">我知道了</button>
      <!-- <button class="green" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号码</button> -->
      <popup ref="popup" @loginrequest="loginrequest"></popup>
    </div>
  </div>
</template>

<script>
import popup from "../components/popup/popup.vue";
export default {
  components: { popup },
  data() {
    return {
      code: "",
      user: [],
      telMessage: "",
      login: false
    };
  },
  onLoad() {

  },

  beforeCreate: function() {
    console.log("onshow");
    this.judgeSession = () => {
      let that = this;
      wx.checkSession({
        //检测当前用户的session_key是否过期
        success: function(res) {
          //session_key 未过期，并且在本生命周期一直有效
          console.log("授权未过期", res);
          that.$wxhttp
            .get({
              url: "/customer/user"
            })
            .then(res => {
              console.log("user:", res);
              if (res.code == 0) {
                // 成功
                that.login = true;
                wx.switchTab({
                  url: "/pages/index/main"
                });
              } else {
                // 失败
                that.login = false;
              }
            })
            .catch(err => {
              console.log(`自动请求api失败 err:`, err);
            });
        },
        fail: function() {
          //session_key 已经失效，需要重新执行登录流程
          console.log("授权过期");
          that.login = false;
        }
      });
    };
  },
  onShow() {
    this.judgeSession();
  },

  methods: {
    setting() {
      const that = this;
      wx.login({
        //用户登录
        success(res) {
          if (res.code) {
            // 发起网络请求
            console.log("res.code+" + res.code);
            that.code = res.code;
            wx.getSetting({
              //查看用户是否授权
              success(res) {
                if (res.authSetting["scope.userInfo"]) {
                  //用户已经授权
                  wx.getUserInfo({
                    //获取用户信息
                    success: res => {
                      console.log(res, "用户信息");
                      wx.setStorageSync("userInfo", res.userInfo);
                      that.user = res;
                      console.log(that.user);
                      that.$refs.popup.flag = false;
                    }
                  });
                }
              }
            });
          }
        }
      });
    },
    //引导用户授权
    bindGetUserInfo(e) {
      const that = this;
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData) {
        //用户按了允许授权按钮
        that.s1 = true;
        that.setting();
        console.log("用户按了允许授权按钮");
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    },
    loginrequest(e) {
      console.log("aaa");
      let that = this;
      let data = {
        code: that.code,
        rawData: JSON.parse(that.user.rawData),
        signature: that.user.signature,
        encryptedData: e.mp.detail.encryptedData,
        iv: e.mp.detail.iv
      };
      console.log(data, "传过去的数据");
      that.$wxhttp
        .post({
          url: "/customer/login",
          data: data
        })
        .then(res => {
          console.log("登录成功数据:", res);
          // 获取到后台重写的session数据，可以通过vuex做本地保存

          wx.setStorageSync("sessionid", res.header["Set-Cookie"]);

          // 测试跳转
          wx.switchTab({
            url: "/pages/index/main"
          });
        })
        .catch(err => {
          console.log(`自动请求api失败 err:`, err);
        });
    }
  }
};
</script>

<style>
.login {
  color: rgb(66, 66, 66);
  text-align: center;
}
.displayNone {
  display: none;
}
.logo {
  width: 200px;
  height: 200px;
  display: block;
  margin: 0 auto;
  margin-top: 64px;
  margin-bottom: 20px;
  border-radius: 50%;
}
.title {
  width: 80%;
  margin: 15px auto;
  margin-top: 8px;
  font-size: 20px;
}
.discription {
  width: 80%;
  margin: 10px auto;
  font-size: 16px;
}
.green {
  display: block;
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