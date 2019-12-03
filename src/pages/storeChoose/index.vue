<template>
  <div>
    <store 
      v-for="(message, index) in messageList" 
      :message="message" 
      :key="index"
      @goDetail="clickToPlaceOrder()"
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
      messageList: [{
        name: "考拉自习室",
        address: "深圳市宝安区创业二路华联城市全景1栋G座1821-1822",
        workTime: "8：00-23：00",
        restSeat: 18,
        totalSeat: 18
      }, {
        name: "考拉自习室",
        address: "深圳市宝安区创业二路华联城市全景1栋G座1821-1822",
        workTime: "8：00-23：00",
        restSeat: 18,
        totalSeat: 18
      }, {
        name: "考拉自习室",
        address: "深圳市宝安区创业二路华联城市全景1栋G座1821-1822",
        workTime: "8：00-23：00",
        restSeat: 18,
        totalSeat: 18
      }, {
        name: "考拉自习室",
        address: "深圳市宝安区创业二路华联城市全景1栋G座1821-1822",
        workTime: "8：00-23：00",
        restSeat: 18,
        totalSeat: 18
      }]
    }
  },
  methods: {
    clickToPlaceOrder() {
      wx.navigateTo({
        url: "/pages/placeOrder/main"
      })
    }
  }
}
</script>

<style scoped>

</style>