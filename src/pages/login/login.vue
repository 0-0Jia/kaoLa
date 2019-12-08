<template>
  <div class="login">
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">获取用户信息</button>
    <!-- <button @click="requestCode">获取code请求后台</button> -->
    <!-- <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick">点击授权</button> -->
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
    // requestCode() {
    //   let that = this;
    //   wx.login({
    //     success(res) {
    //       if (res.code) {
    //         that.code = res.code;
    //         console.log(res.code);

    //         // 这里可以把code传给后台，后台用此获取openid及session_key
    //         that.$wxhttp
    //           .post({
    //             url: "/customer/login",
    //             data: {
    //               code: that.code
    //             }
    //           })
    //           .then(res => {
    //             console.log(res);
    //           });

    //         // 测试跳转
    //         wx.switchTab({
    //           url: "/pages/index/main"
    //         });
    //       }
    //     }
    //   });
    // },
    // getUserInfoClick() {
    //   // console.log('click事件首先触发')
    // },
    // bindGetUserInfo(e) {
    //   // console.log('回调事件后触发')
    //   let that = this;
    //   if (e.mp.detail.userInfo) {
    //     console.log("用户按了允许授权按钮");
    //     that.$http
    //       .post({
    //         url: "/customer/login",
    //         data: {
    //           code: that.code
    //         }
    //       })
    //       .then(res => {
    //         console.log(`后台交互拿回数据:`, res);
    //         // 获取到后台重写的session数据，可以通过vuex做本地保存
    //       })
    //       .catch(err => {
    //         console.log(`api请求出错:`, err);
    //       });
    //   } else {
    //     //用户按了拒绝按钮
    //     console.log("用户按了拒绝按钮");
    //   }
    // }

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
                      let { encryptedData, userInfo, iv } = res;
                      console.log({ encryptedData, userInfo, iv })
                      console.log(that.code)
                      that.$wxhttp
                        .post({
                          url: "/customer/login",
                          data: {
                            code: that.code,
                            encryptedData,
                            iv
                          }
                        })
                        .then(res => {
                          console.log(`后台交互拿回数据:`, res);
                          // 获取到后台重写的session数据，可以通过vuex做本地保存
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