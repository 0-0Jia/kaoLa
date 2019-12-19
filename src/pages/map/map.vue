<template>
  <div class="map">
    <map
      id="map"
      :showLocation="showLocation"
      :longitude="locationNow.lng"
      :latitude="locationNow.lat"
      scale="28"
      style="width: 100%; height: 100vh;"
      bindtap="goStore"
      :markers="markers"
    ></map>
    <button class="green" @click="moveToStore">门店位置</button>
    <img class="location" title="定位" src="../../../static/tabs/position.png" @click="userPosition" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapCtx: "",
      store: "",
      showLocation: true,
      markers: [
        {
          iconPath: "../../static/tabs/location.png",
          id: 0,
          latitude: 22.562811,
          longitude: 113.879066,
          width: 40,
          height: 40,
          title: "",
          label: {
            content: "",
            bgColor: "transparent",
            fontSize: "14px",
            textAlign: "left"
          },
          callout: {
            content: "",
            fontSize: "14px",
            textAlign: "center",
            borderRadius: 3, //边框圆角
            borderWidth: 1, //边框宽度
            bgColor: "#ffffff", //背景色
            padding: 5 //文本边缘留白
          }
        }
      ],
      uesrLocation: {},
      locationNow: {
        longitude: "",
        latitude: ""
      }
    };
  },
  onLoad: function(options) {
    this.store = JSON.parse(options.store);
    this.mapCtx = wx.createMapContext("map");
    this.locationNow = JSON.parse(options.store).location;
    this.markers[0].latitude = parseFloat(this.store.location.lat);
    this.markers[0].longitude = parseFloat(this.store.location.lng);
    this.markers[0].label.content = this.store.storeName;
    this.markers[0].callout.content = this.store.storeAddress;
  },
  mounted() {
    this.goStore();
    console.log(this.markers);
  },
  methods: {
    goStore(e) {
      let that = this;
      wx.getLocation({
        type: "gcj02",
        success(res) {
          console.log(res, "位置");
          that.uesrLocation = res;
        }
      });
    },
    userPosition() {
      this.locationNow.lat = parseFloat(this.uesrLocation.latitude);
      this.locationNow.lng = parseFloat(this.uesrLocation.longitude);
    },
    moveToStore() {
      this.locationNow.lat = parseFloat(this.store.location.lat);
      this.locationNow.lng = parseFloat(this.store.location.lng);
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}
.location {
  position: absolute;
  width: 25px;
  height: 25px;
  bottom: 3.5%;
  right: 3%;
  z-index: 100;
}
.green {
  position: absolute;
  right: 12%;
  bottom: 3%;
  text-align: center;
  width: 80px;
  height: 30px;
  color: #ffffff;
  background-color: #44644a;
  border-radius: 10px;
  font-size: 12px;
}
</style>