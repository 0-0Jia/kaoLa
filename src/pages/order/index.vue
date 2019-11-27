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