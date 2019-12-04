<template>
    <div class="back">
        <div class="dialog">
            <img src="/static/images/close.png" class="close" @click="closing()"/>
            <div class="word">
                <p class="title">{{dialog.title}}</p>
                <p class="detail">{{dialog.detail}}</p>
            </div>
            <button>{{dialog.button}}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "aDialog",
    props: {
        dialog: Object
    },
    methods: {
        closing() {
            console.log("点击了子组件");
            this.$emit("close");
        }
    }
}
</script>

<style scoped>
.back{
    position: fixed;
    z-index: 3;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.64);
}
.dialog{
    width: 240px;
    height: 174px;
    background-color: white;
    border-radius: 6px;
    position: relative;
    right: 0;
    left: 0;
    margin: auto;
    margin-top: 187px;
}
.close{
    width: 12.18px;
    height: 12.18px;
    display: block;
    position: absolute;
    top: 8.07px;
    left: 6.57px;
}
.word{
    position: relative;
    top: 29.5px;
}
p{
    text-align: center;
    color: #2E2E2E;
}
.title{
    font-size: 15px;
}
.detail{
    margin-top: 16px;
    font-size: 30px;
    font-weight: bold;
}
button{
    font-size: 12px;
    color: white;
    background-color: #44644A;
    width: 144px;
    height: 32px;
    border-radius: 24px;
    right: 0;
    left: 0;
    position: absolute;
    margin: auto;
    bottom: 24.5px;
}
</style>