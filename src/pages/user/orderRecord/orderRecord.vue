<template>
  <div class="orderRecord">
    <view class="weui-tab">
      <view class="weui-navbar">
        <block v-for="(tab, index) in tabs" :key="index">
          <view
            :id="index"
            :class="[weui-navbar__item, (activeIndex == index) ? 'weui-bar__item_on' : '']"
            @click="tabClick"
          >
            <view class="weui-navbar__title">{{item}}</view>
          </view>
        </block>
      </view>
      <view class="weui-tab__panel">
        <view class="weui-tab__content" :hidden="(activeIndex != 0)">
          <div class="order-card">
            <p>已支付</p>
            <p>交易对象：预约</p>
            <p>交易方式：微信支付</p>
            <p>交易金额：￥28.80</p>
            <p>有效日期：2019-11-16 至 2019-11-18</p>
            <button class="order-button">退款</button>
          </div>
        </view>
        <view class="weui-tab__content" :hidden="activeIndex != 1">选项二的内容</view>
        <view class="weui-tab__content" :hidden="activeIndex != 2">选项三的内容</view>
        <view class="weui-tab__content" :hidden="activeIndex != 3">选项四的内容</view>
      </view>
    </view>
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  data() {
    return {
      tabs: ["全部", "已支付", "正在申请退款", "已退款"],
      activeIndex: 1,
      sliderOffset: 0,
      sliderLeft: 0
    };
  },
  mounted: function() {
    wx.setNavigationBarTitle({
      title: "订单记录"
    });

    var that = this;
    var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
    wx.getSystemInfo({
      success: function(res) {
        that.sliderLeft =
          (res.windowWidth / that.tabs.length - sliderWidth) / 2;
        that.sliderOffset =
          res.windowWidth / that.tabs.length * that.activeIndex;
      }
    });
  },

  methods: {
    tabClick: function(e) {
      this.sliderOffset = e.currentTarget.offsetLeft;
      this.activeIndex = e.currentTarget.id;
    }
  }
};
</script>

<style scoped>
.weui-tab__content {
  padding-top: 60px;
  text-align: center;
}
.order-card {
  width: 100%;
  padding: 8px 10px;
  margin: 8px auto;
  background-color: white;
  text-align: left;
}
.order-button {
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
</style>