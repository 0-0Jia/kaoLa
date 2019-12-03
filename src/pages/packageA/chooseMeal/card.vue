<template>
    <div 
        :class="[
            (cardMsg.type=='daily')?'yellowBg':'',
            (cardMsg.type=='monthly')?'pickBg':'',
            (cardMsg.type=='try')?'blueBg':'',
            'card']"
        :cardMsg="cardMsg"
    >
        <img src="/static/images/cardBg.png" class="cardBg"/>
        <div class="msg">
            <div class="name">
                <div class="title">{{cardMsg.title}}</div>
                <div class="detail" v-if="cardMsg.detail">{{cardMsg.detail}}</div>
            </div>
            <div class="timeLimit">{{cardMsg.timeLimit}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "card",
    props: {
        cardMsg: Object
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
    position: absolute;
    top: 16px;
    right: 16px;
}
.title{
    font-size: 16px;
    font-weight: bold;
    text-align: right;
}
.detail{
    font-size: 9px;
    margin-top: 6px;
    text-align: right;
}
.timeLimit{
    font-size: 12px;
    text-align: right;
    margin-top: 21px;
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