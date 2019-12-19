<template>
  <div class="store">
    <store
      v-for="message in storeList"
      :message="message"
      :key="message.storeId"
      @goDetail="clickToOrder"
      @goStore="storeMap"
    ></store>
  </div>
</template>

<script>
import store from "./store";
export default {
  components: {
    store
  },
  data() {
    return {
      storeList: []
    };
  },
  methods: {
    //跳转到座位预定页面
    clickToOrder(msg) {
      wx.showLoading({
        title: "加载中"
      });
      mpvue.navigateTo({
        url: "/pages/packageA/order/main",
        //监听跳转到的页面的事件，执行拿到座位信息的函数
        success: function(res) {
          wx.hideLoading();
          console.log("success");
          res.eventChannel.emit("acceptStore", { data: msg });
        }
      });
    },
    // 去门店跳转至地图
    storeMap(msg) {
      console.log(msg);
      wx.showLoading({
        title: "加载中"
      });
      wx.navigateTo({
        url: "/pages/map/main?store=" + JSON.stringify(msg),
        success() {
          wx.hideLoading();
        }
      });
    },
    //获取门店信息列表
    getStoreList() {
      wx.showLoading({
        title: "加载中"
      });
      this.$wxhttp
        .get({
          url: "/customer/store"
        })
        .then(res => {
          console.log(res, "门店信息");
          wx.hideLoading();
          if (res.code != 0) {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 2000
            });
          } else if (res.code == 0) {
            this.storeList = res.data.storeList;
          }
        })
        .catch(err => {
          console.log("error! ", err);
          wx.hideLoading();
          wx.showToast({
            title: "加载失败",
            icon: "none",
            duration: 2000
          });
        });
    }
  },
  created() {
    wx.setNavigationBarTitle({
      title: "选择门店"
    });
  },
  onShow() {
    this.getStoreList();
  }
};
</script>

<style scoped>
.store {
  padding-bottom: 20px;
}
</style>