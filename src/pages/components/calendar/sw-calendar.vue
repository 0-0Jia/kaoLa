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
          :class="{disabled:item.disabled,active:item.isToday,punched:item.isOk}"
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
      punchedList: [], //签到日期
      dateArray: []
    };
  },
  onShow() {
    this.showCalendar();
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
      this.curDate = `${y}年${m}月`;
      // 1号之前留白,对应正确的周几
      for (let i = 0; i < week; i++) {
        let obj = {
          year: "",
          month: "",
          date: "",
          disabled: false,
          isToday: false,
          isOk: false
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
          isToday: today == day,
          isOk: false
        };
        // 已签到ok
        for (let j = 0; j < this.punchedList.length; j++) {
          if (today == parseInt(this.punchedList[j])) {
            obj.isOk = true;
          }
        }
        this.dateArray.push(obj);
      }
      console.log(this.dateArray);
    },
    //点击日期
    tapThis(e) {
      // if (!e.date) return;
      // const data = {
      //   year: e.year,
      //   month: e.month,
      //   date: e.date,
      //   type: "today" //默认点击今天
      // };
      // //点击今天之前
      // e.disabled && !e.isToday && (data.type = "pre");
      // //点击今天之后
      // !e.disabled && !e.isToday && (data.type = "next");
      // this.$emit("tapDate", data);
    },
    getData() {
      this.$wxhttp
        .get({
          url: "/customer/signedon"
        })
        .then(res => {
          console.log(`后台交互拿回数据:`, res);
          for (let j = 0; j < res.data.signedonList.length; j++) {
            let punchedDate = res.data.signedonList[j].dateTime
              .split("-")[2]
              .replace(/\b(0+)/gi, "");
            this.punchedList.push(punchedDate);
          }
          console.log(this.punchedList);
        })
        .catch(err => {
          console.log(`自动请求api失败 err:`, err);
        });
    },
    showCalendar() {
      //查询签到
      this.punchedList = [];
      this.dateArray = [];
      this.getData();
      setTimeout(() => {
        //设置日期
        this.getCurDate();
      }, 500);
    }
  },
  mounted() {
    this.showCalendar();
  }
};
</script>

<style scoped>
.date-wrap {
  width: 90%;
  padding: 3% 4%;
  margin: 0 auto;
  border-radius: 16upx;
  background: #fff;
  box-sizing: border-box;
  text-align: center;
  font-style: Source Han Sans CN;
  font-size: 14px;
}
.cur-date {
  margin-left: 5%;
  font-size: 15upx;
  text-align: left;
  margin-bottom: 1%;
}
.title-item-box {
  padding: 1% 0;
  border-bottom: 1px solid #a8a8a8;
}
.item-box {
  display: flex;
  color: #777;
  flex-wrap: wrap;
  font-size: 28upx;
  justify-content: flex-start;
}
.item {
  width: calc(100% / 7);
  padding: 2px 0;
  border-radius: 100upx;
  color: #a8a8a8;
}
.disabled {
  background: #efefef;
  color: #999;
}
.active {
  padding: 2px 0;
  color: #44644a;
  background: white;
}
.punched {
  background: linear-gradient(90deg, #fff, #44644a, #fff);
  color: white;
}
</style>
