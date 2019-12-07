<template>
  <div class="punch">
    <div class="punch-bg">
      <img class="punch-img" src="../../../../static/images/punchBg.png" />
    </div>
    <calendar @tapDate="tapDate"></calendar>
    <button class="punch-button" @click="punchRequest">立即签到</button>
    <p class="introduction">打卡一天可获得1积分</p>
  </div>
</template>

<script>
// import $ from "jquery";
import calendar from "../../components/calendar/sw-calendar.vue";

export default {
  components: { calendar },
  data() {
    return {
      year: 2019,
      month: 11,
      date: 18,
      type: "today" //today-今天 pre-今天之前 next-今天之后
    };
  },
  mounted: function() {
    wx.setNavigationBarTitle({
      title: "打卡签到"
    });
  },

  methods: {
    punchRequest() {
      
    },
    tapDate(data) {
      //根据data.type进行判断用户点击的是哪一天,进行下一步业务操作
      console.log(data);
    }
  }
};
</script>

<style scoped>
.punch-bg {
  width: 90%;
  margin: 20px auto;
  background-color: white;
  height: 55px;
  overflow: hidden;
}
.punch-img {
  width: 100%;
  height: 60px;
}
.punch-button {
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
.introduction {
  font-size: 14px;
  color: #a8a8a8;
  margin: 10px auto;
  text-align: center;
}
</style>