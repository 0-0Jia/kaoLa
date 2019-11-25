<template>
  <div class="container" @click="clickHandle">
    <div class="message">{{msg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello"
    };
  },

  methods: {
    clickHandle() {
      /**
       * 请求数据
       */
      // let data = {
      //   user: {
      //     code: "3333"
      //   }
      // };
      // let that = this;
      // // 此处发送请求
      // $.ajax({
      //   url:  + "/manager/login",
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   data: JSON.stringify(data),
      //   dataType: "json",
      //   success: function(data) {
      //     console.log(data, "历史作业数据");
      //     if (data.code == 1) {

      //     } else {
      //       Dialog({
      //         title: "提示",
      //         message: data.message,
      //         skin: "ios"
      //       });
      //     }
      //   },
      //   complete: function(res) {
      //     console.log(res);
      //   }
      // });
    }
  }
};
</script>

<style scoped>
.message {
  color: red;
  padding: 10px;
  text-align: center;
}
</style>