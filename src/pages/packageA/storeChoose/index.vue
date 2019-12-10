<template>
  <div>
    <store 
      v-for="message in storeList" 
      :message="message" 
      :key="message.storeId"
      @goDetail="clickToPlaceOrder"
    >
    </store>
  </div>
</template>

<script>
import store from "./store"
export default {
  components: {
    store
  },
  data() {
    return {
      storeList: []
    }
  },
  methods: {
    //跳转到座位预定页面
    clickToPlaceOrder(msg) {
      mpvue.navigateTo({
        url: "/pages/packageA/placeOrder/main",
        //监听跳转到的页面的事件，执行拿到座位信息的函数
        success: function(res) {
          console.log('success');
          res.eventChannel.emit('acceptStore', { data: msg });
        }
      })
    },
    //获取门店信息列表
    getStoreList() {
      this.$wxhttp.get({
        url: "/customer/store"
      })
      .then(res => {
        console.log(res);
        this.storeList = res.data.storeList;
      })
      .catch(err => {
        console.log("error! ", err);
      })
    }
  },
  created() {
    this.getStoreList();
    wx.setNavigationBarTitle({
      title: "选择门店"
    });
  }
}
</script>

<style scoped>

</style>