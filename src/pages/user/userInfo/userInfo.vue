<template>
  <div class="userInfo">
    <div class="userInfo-card">
      <div class="userInformation">
        <p style="font-size:14px;">真实姓名</p>
        <input type="text" class="userInfo-input" v-model.lazy="realName" />
      </div>
      <div class="userInformation">
        <p style="font-size:14px;">生日</p>
        <apicker @refreshTime="refreshTime" ref="apicker" :birth ="birth"></apicker>
        <!-- <input type="text" class="userInfo-input" v-model.lazy="birth" /> -->
      </div>
      <div class="userInformation">
        <p style="font-size:14px;">职业</p>
        <input type="text" class="userInfo-input" v-model.lazy="job" />
      </div>
      <div class="userInformation">
        <p style="font-size:14px;">目标</p>
        <input type="text" class="userInfo-input" v-model.lazy="target" />
      </div>
    </div>
    <button class="save-button" @click="saveInfo">保存</button>
  </div>
</template>

<script>
import apicker from "../../components/picker";
export default {
  components: { apicker },
  props: {
    birth: String //也可以给它一个默认值 （defaultAddress: {Type: Object,default:()=> 'default'}）
  },
  data() {
    return {
      realName: "魏桂佳",
      birth: '2000-00-00',
      job: "学生",
      target: "成为一名qger"
    };
  },
  onLoad: function(options) {
    this.realName = options.realName;
    this.birth = options.birth;
    this.job = options.job;
    this.target = options.target;
  },
  mounted: function() {
    wx.setNavigationBarTitle({
      title: "用户信息"
    });
    this.$refs.apicker.date = this.birth;
  },

  methods: {
    // refreshTime(date){
    //   this.birth = date;
    //   console.log(this.birth);
    // },
    saveInfo() {
      wx.showLoading({
        title: "加载中"
      });
      this.$wxhttp
        .post({
          url: "/customer/user/modifyUserInfo",
          data: {
            user: {
              realName: this.realName,
              birth: this.birth,
              job: this.job,
              target: this.target
            }
          }
        })
        .then(res => {
          console.log(res);
          wx.hideLoading();
          if (res.msg == "操作成功") {
            wx.showToast({
              title: "成功",
              icon: "success",
              duration: 2000
            });
          } else {
            wx.showToast({
              title: res.msg,
              duration: 2000
            });
          }
          console.log(`后台交互拿回数据:`, res);
        })
        .catch(err => {
          console.log(`自动请求api失败 err:`, err);
        });
    }
  }
};
</script>

<style scoped>
apicker {
  width: 100%;
  height: 44px;
}
.userInfo-card {
  width: 84%;
  margin: 20px 4%;
  border-radius: 6pt;
  background-color: white;
  padding: 10px 4%;
  text-align: center;
  box-shadow: 0 0 10px rgba(68, 100, 74, 0.08);
  text-align: left;
}
.userInformation {
  margin: 15px 0;
}
.userInfo-input {
  height: 20px;
  border: none;
  margin-top: 4px;
  border-bottom: 1px solid #a8a8a8;
  font-size: 15px;
  padding: 2px 12px;
}
.save-button {
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