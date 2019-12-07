<template>
  <div class="container" @click="clickHandle">
    <div class="message">{{msg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Order"
    };
  },

  methods: {
    clickHandle() {
      console.log("order");
    }
  },
  
    mounted: function() {
    wx.login({
        success (res) {
            if (res.code){
              console.log(res.code)
                // 这里可以把code传给后台，后台用此获取openid及session_key
            }
        },
    })
  },
  
};
</script>

<style scoped>
.message {
  color: red;
  padding: 10px;
  text-align: center;
}
</style>