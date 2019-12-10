<template>
    <div 
        class="card blueBg"
        :cardMsg="cardMsg"
        @click="goBuyMeal"
    >
        <img src="/static/images/cardBg.png" class="cardBg"/>
        <div class="msg">
            <div class="name">
                <div class="title">{{cardMsg.name}}</div>
                <div :class="[{'hidden': !cardMsg.mealDesc}, 'detail']">{{cardMsg.mealDesc}}</div>
            </div>
            <div class="timeLimit" v-if="!cardMsg.status">时效：{{cardMsg.mealDays}}天</div>
            <div class="timeLimit" v-else>剩余：{{cardMsg.rareDays}}天</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "card",
    props: {
        cardMsg: Object
    },
    mounted() {
        console.log(this.cardMsg);
    },
    methods: {
        goBuyMeal() {
            if(this.cardMsg.status == null) {
                this.$emit('goBuyMeal', this.cardMsg);
            }
        }
    }
}
</script>

<style scoped>
.card{
    width: 160px;
    height: 92px;
    position: relative;
    color: white;
    margin-bottom: 16px;
    border-radius: 6px;
}
.cardBg{
    width: 100%;
    height: 100%;
}
.msg{
    width: 65px;
    height: 66px;
    position: absolute;
    top: 12px;
    right: 16px;
}
.title{
    font-size: 16px;
    font-weight: bold;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.detail{
    font-size: 9px;
    margin-top: 3px;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.timeLimit{
    font-size: 12px;
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
}
.hidden{
    visibility: hidden;
}
.pickBg{
    background-image: linear-gradient(to left, #E4E4A5, #E4E4D2);
}
.yellowBg{
    background-image: linear-gradient(to left, #F8A3A3, #F8D0D0);
}
.blueBg{
    background-image: linear-gradient(to left, #50A5EF, #A3CBEF);
}
</style>