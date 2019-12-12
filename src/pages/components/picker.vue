<template>
  <!-- 每次点击触发事件refreshTime，携带参数为选择的时间 -->
  <div class="chooseToOrder">
    <picker mode="date" :value="date" :end="currentDate" @change="bindDateChange">
      <div class="picker">
        <div class="dateValue">
          <span>{{date}}</span>
        </div>
      </div>
    </picker>
  </div>
</template>

<script>
export default {
  name: "apicker",
  data() {
    return {
      currentDate: "", //当天时间也是截止时间
      tdate: "",
      date: "" //时间选择器的值
    };
  },
  methods: {
    //获得当天时间
    getCurrentDate() {
      const current = new Date();
      let day = (current.getDate() < 10 ? "0" : "") + current.getDate();
      let month =
        (current.getMonth() + 1 < 10 ? "0" : "") + (current.getMonth() + 1);
      let year = current.getFullYear();
      this.currentDate = year + "-" + month + "-" + day;
      this.date = this.currentDate;
      this.tdate = this.currentDate;
      console.log(this.date);
    },
    //更新时间
    bindDateChange(e) {
      this.date = e.mp.detail.value;
      this.tdate = this.date;
      console.log(this.date);
      this.$emit("refreshTime", this.date); //将当前选择的时间传递到父组件
    }
  },
  mounted() {
      this.getCurrentDate();
  }
};
</script>

<style scoped>
.chooseToOrder {
  background-color: white;
}
picker {
  width: 343px;
  height: 44px;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 15px;
  color: #2e2e2e;
}
.picker {
  width: 100%;
  height: 15px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}
.picker > div {
  display: inline-block;
}
/* .dateValue {
  position: absolute;
  right: 18.5px;
} */
/* .arrow {
  width: 7.13px;
  height: 12.97px;
  position: absolute;
  top: 0;
  bottom: 0;
  line-height: 12px;
  margin: auto;
  margin-left: 10.5px;
} */
</style>