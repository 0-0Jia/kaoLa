<template>
  <div class="login">
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">获取用户信息</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: ""
    };
  },

  mounted: function() {
    // this.requestCode();
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
                      console.log(that.code);
                      that.$wxhttp
                        .post({
                          url: "/customer/login",
                          data: {
                            code: that.code
                          }
                        })
                        .then(res => {
                          console.log(`后台交互拿回数据:`, res);
                          // 获取到后台重写的session数据，可以通过vuex做本地保存

                          wx.setStorageSync(
                            "sessionid",
                            res.header["Set-Cookie"]
                          );
                          console.log(res.header["Set-Cookie"].split(";")[0]);

                          // 测试跳转
                          wx.switchTab({
                            url: "/pages/index/main"
                          });
                        })
                        .catch(err => {
                          console.log(`自动请求api失败 err:`, err);
                        });
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
    }
  }
};
</script>

<style>
</style>