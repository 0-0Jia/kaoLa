<template>
  <div class="map">
    <map
      id="map"
      longitude="113.398730"
      latitude="23.034930"
      scale="28"
      style="width: 100%; height: 100vh;"
      bindtap="goStore"
      :markers="markers"
    ></map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Map",
      markers: [
        {
          iconPath: "../../static/tabs/location.png",
          id: 0,
          latitude: 23.03493,
          longitude: 113.39873,
          width: 35,
          height: 35,
          title: "广东工业大学大学城校区工学一号馆",
          label: {
            content: "QG工作室",
            bgColor: "transparent",
            fontSize: "16px",
            textAlign: "left"
          },
          callout: {
            content: "广东工业大学大学城校区工学一号馆312",
            bgColor: "transparent",
            fontSize: "16px",
            textAlign: "center",
            padding: "3px 6px",
            borderRadius: "5px"
          }
        }
      ]
    };
  },
  mounted() {
    this.goStore();
  },
  methods: {
    goStore(e) {
      console.log("1asc1352dcz");
      //使用微信内置地图查看位置接口
      wx.openLocation({
        latitude: "23.04149", // 纬度，浮点数，范围为90 ~ -90
        longitude: "113.405216", // 经度，浮点数，范围为180 ~ -180。
        name: "门店位置", // 位置名
        address: "广东工业大学大学城校区工学一号馆", // 地址详情说明
        scale: 28 // 地图缩放级别,整形值,范围从1~28。默认为最大
      });
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}
</style>