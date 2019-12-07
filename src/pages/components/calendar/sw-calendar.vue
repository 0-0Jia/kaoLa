<template>
  <view class="sign-wrap">
    <view class="date-wrap">
      <view class="cur-date">{{curDate}}</view>
      <view class="title-item-box item-box">
        <view
          class="item"
          v-for="(item, index) in ['日','一','二','三','四','五','六']"
          :key="index"
        >{{item}}</view>
      </view>
      <view class="date-item-box item-box">
        <view
          class="item date-item"
          :class="{disabled:item.disabled,active:item.isToday}"
          :style="itemStyle"
          @tap="tapThis(item)"
          v-for="(item, index) in dateArray"
          :key="index"
        >{{item.date}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      itemStyle: "",
      curDate: "", //当前日期
      dateArray: []
    };
  },
  methods: {
    getCurDate() {
      let d = new Date();
      let y = d.getFullYear();
      let m = d.getMonth();
      let week = new Date(y, m, 1).getDay(); //一号是周几
      m = m === 11 ? 12 : m + 1; //月份转换
      let max = new Date(y, m, 0).getDate(); //本月最大天
      let day = d.getDate();

      this.curDate = `${y}年${m}月${day}日`;
      // 1号之前留白,对应正确的周几
      for (let i = 0; i < week; i++) {
        let obj = {
          year: "",
          month: "",
          date: "",
          disabled: false,
          isToday: false
        };
        this.dateArray.push(obj);
      }
      for (let i = 0; i < max; i++) {
        let today = i + 1;
        let obj = {
          year: y,
          month: m,
          date: today,
          disabled: today < day,
          isToday: today == day
        };
        this.dateArray.push(obj);
      }
    },
    //点击日期
    tapThis(e) {
      if (!e.date) return;
      const data = {
        year: e.year,
        month: e.month,
        date: e.date,
        type: "today" //默认点击今天
      };
      //点击今天之前
      e.disabled && !e.isToday && (data.type = "pre");
      //点击今天之后
      !e.disabled && !e.isToday && (data.type = "next");
      this.$emit("tapDate", data);
    }
  },
  mounted() {
    // //设置天数高度
    // let nodes = uni
    //   .createSelectorQuery()
    //   .in(this)
    //   .select(".item");
    // nodes
    //   .fields(
    //     {
    //       size: true
    //     },
    //     data => {
    //       this.itemStyle = `height:${data.width}px;line-height:${
    //         data.width
    //       }px;margin: 10upx calc((100% - ${data.width * 7}px) / 14);`;
    //     }
    //   )
    //   .exec();

    //设置日期
    this.getCurDate();
  }
};
</script>

<style scoped>
.date-wrap {
  width: 96%;
  margin-left: 2%;
  padding: 2% 0;
  border-radius: 16upx;
  background: #fff;
  box-sizing: border-box;
  text-align: center;
}
.cur-date {
  font-size: 30upx;
}
.item-box {
  display: flex;
  color: #777;
  flex-wrap: wrap;
  font-size: 28upx;
  justify-content: flex-start;
}
.item {
  width: calc(100% / 10);
  margin: 10upx auto;
  border-radius: 100upx;
}
.disabled {
  background: #efefef;
  color: #999;
}
.active {
  background: linear-gradient(90deg, #fff, red);
  color: #fff;
}
</style>
