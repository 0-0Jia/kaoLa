<template>
  <div class="user">
    <view class="userInfo">
      <!-- <div
        class="avatar"
        :style=" 
     {backgroundImage:'url('+userPhoto+')'}"
        @click="changeAvatar"
      ></div> -->
      <div
        class="avatar"
        :style=" 
     {backgroundImage:'url('+userPhoto+')'}"
      ></div>
      <p class="user-name">{{userData.name? userData.name : name}}</p>
      <p class="user-phone">{{userData.tel? userData.tel : "123456789"}}</p>
      <div class="integral-balance-card">
        <div class="integral" @click="jumpIntegral">
          <p style="font-size:16px;">{{userData.score? userData.score : '0'}}分</p>
          <p style="font-size:14px;">积分</p>
        </div>
        <div class="line"></div>
        <div class="balance" @click="jumpBalance">
          <p style="font-size:16px;">￥{{userData.rareMoney? userData.rareMoney : '0.00'}}</p>
          <p style="font-size:14px;">余额</p>
        </div>
      </div>
    </view>
    <view class="user-operation">
      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell weui-cell_access" @click="jumpPunch">
          <view class="weui-cell__bd" style="font-size:16px">打卡签到</view>
          <view class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0"></view>
        </view>
      </view>
      <view class="weui-cells weui-cells_after-title" @click="jumpCoupon">
        <view class="weui-cell weui-cell_access">
          <view class="weui-cell__bd" style="font-size:16px">兑换优惠码</view>
          <view class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0"></view>
        </view>
      </view>
      <view class="weui-cells weui-cells_after-title" @click="jumpOrderRecord">
        <view class="weui-cell weui-cell_access">
          <view class="weui-cell__bd" style="font-size:16px">订单记录</view>
          <view class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0"></view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: [],
      userPhoto: wx.getStorageSync("userInfo").avatarUrl,
      name: wx.getStorageSync("userInfo").nickName
    };
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: "个人中心"
    });

    this.getData();
  },

  methods: {
    jumpIntegral() {
      wx.navigateTo({
        url:
          "/pages/user/integral/main" +
          "?integral=" +
          (this.userData.score ? this.userData.score : "0") +
          "&name=" +
          (this.userData.name ? this.userData.name : "用户")
      });
    },
    jumpBalance() {
      wx.navigateTo({
        url:
          "/pages/user/balance/main" +
          "?balance=" +
          (this.userData.rareMoney ? this.userData.rareMoney : "0.00") +
          "&name=" +
          (this.userData.name ? this.userData.name : "用户")
      });
    },
    jumpPunch() {
      wx.navigateTo({
        url: "/pages/user/punch/main"
      });
    },
    jumpCoupon() {
      wx.navigateTo({
        url: "/pages/user/couponRedemption/main"
      });
    },
    jumpOrderRecord() {
      wx.navigateTo({
        url: "/pages/user/orderRecord/main"
      });
    },
    getData() {
      this.$wxhttp
        .get({
          url: "/customer/user"
        })
        .then(res => {
          console.log(`后台交互拿回数据:`, res);
          this.userData = res.data.user;
          console.log(this.userData.url);
          // this.userPhoto =
          //   "https://qgailab.com:12410/portrait/" + this.userData.url;
        })
        .catch(err => {
          console.log(`自动请求api失败 err:`, err);
        });
    },
    //点击图片选择手机相册或者电脑本地图片
    changeAvatar: function(e) {
      var that = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          //这里是上传操作

          that.$wxhttp
            .post({
              url: "/customer/portrait", //真正修改操作,填写你们修改的API,
              data:
                "\r\n--XXX" +
                "\r\nContent-Disposition: form-data; file=" +
                tempFilePaths[0] +
                "\r\n" +
                "\r\nvalue1" +
                "\r\n--XXX" +
                '\r\nContent-Disposition: form-data; name="field2"' +
                "\r\n" +
                "\r\nvalue2" +
                "\r\n--XXX--",
              header: {
                "Content-Type": "multipart/form-data; boundary=XXX", //记得设置
                cookie: wx.getStorageSync("sessionid").split(";")[0]
              }
            })
            .then(res => {
              console.log(`后台数据:`, res);
              if (res.msg == "操作成功") {
                that.userPhoto = tempFilePaths[0];
                wx.showToast({
                  title: "成功",
                  icon: "success",
                  duration: 2000
                });
              } else {
                wx.showToast({
                  title: res.msg,
                  duration: 2000
                });
              }
            })
            .catch(err => {
              console.log(`err:`, err);
            });

          // wx.uploadFile({
          //   url: "https://qgailab.com:12410/kaola-customer" + "/customer/portrait", //里面填写你的上传图片服务器API接口的路径
          //   filePath: tempFilePaths[0], //要上传文件资源的路径 String类型
          //   name: "avatar", //按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
          //   header: {
          //     "Content-Type": "multipart/form-data", //记得设置
          //     cookie: wx.getStorageSync("sessionid").split(";")[0]
          //   },
          //   success: function(res) {
          //     //当调用uploadFile成功之后，再次调用后台修改的操作，这样才真正做了修改头像
          //     if ((res.statusCode = 200)) {
          //       var data = res.data;
          //       var statusCode = res.statusCode;
          //       console.log("返回值1" + data);
          //       console.log("返回值2" + statusCode);
          //       //这里调用后台的修改操作， tempFilePaths[0],是上面uploadFile上传成功，然后赋值到修改这里。
          //       that.$wxhttp
          //         .post({
          //           url: "/customer/portrait"+'?avatar=' + tempFilePaths[0], //真正修改操作,填写你们修改的API,
          //           data: tempFilePaths[0]
          //         })
          //         .then(res => {
          //           console.log(`后台数据:`, res);
          //           if (res.msg == "操作成功") {
          //             that.userPhoto = tempFilePaths[0];
          //             wx.showToast({
          //               title: "成功",
          //               icon: "success",
          //               duration: 2000
          //             });
          //           } else {
          //             wx.showToast({
          //               title: res.msg,
          //               duration: 2000
          //             });
          //           }
          //         })
          //         .catch(err => {
          //           console.log(`err:`, err);
          //         });
          //     }
          //   }
          // });
        }
      });
    }
  }
};
</script>

<style scoped>
.userInfo {
  margin: 0 auto;
  color: white;
  font-size: 16px;
  text-align: center;
}
.avatar {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin: 15px auto;
  margin-bottom: 10px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
}
.user-name {
  color: #44644a;
  font-size: 16px;
  margin: 0 auto;
}
.user-phone {
  color: black;
  font-size: 14px;
  margin: 5px auto;
  margin-bottom: 12px;
}
.integral-balance-card {
  margin: 0 auto;
  width: 66%;
  background-color: #44644a;
  border-radius: 6pt;
  position: absolute;
  top: 165px;
  left: 17%;
  z-index: 10;
}
.line {
  display: inline-block;
  height: 30px;
  width: 1px;
  background-color: #a8a8a8;
}
.integral {
  display: inline-block;
  padding: 10px 20px;
}
.balance {
  display: inline-block;
  padding: 10px 20px;
}
.user-operation {
  padding-top: 36px;
  background: white;
  margin-top: 42px;
}
</style>