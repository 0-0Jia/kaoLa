<template>
  <div class="login">
    <!-- <button @click="requestCode">获取code</button> -->
    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick">点击授权</button>
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
    this.requestCode();
  },

  methods: {
    requestCode() {
      let that = this;
      wx.login({
        success(res) {
          if (res.code) {
            that.code = res.code;
            console.log(res.code);

            // // 这里可以把code传给后台，后台用此获取openid及session_key
            // that.$wxhttp
            //   .post({
            //     url: "/customer/login",
            //     data: {
            //       user: {
            //         code: res.code
            //       }
            //     }
            //   })
            //   .then(res => {
            //     console.log(res);
            //   });

            // 测试跳转
            wx.switchTab({
              url: "/pages/index/main"
            });
          }
        }
      });
    },
    getUserInfoClick() {
      // console.log('click事件首先触发')
    },
    bindGetUserInfo(e) {
      // console.log('回调事件后触发')
      let that = this;
      if (e.mp.detail.userInfo) {
        console.log("用户按了允许授权按钮");
        that.$http
          .post({
            url: "/customer/login",
            data: {
              user: {
                code: that.code
              }
            }
          })
          .then(res => {
            console.log(`后台交互拿回数据:`, res);
            // 获取到后台重写的session数据，可以通过vuex做本地保存
          })
          .catch(err => {
            console.log(`api请求出错:`, err);
          });
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