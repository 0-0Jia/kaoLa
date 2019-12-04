<template>
    <div>
        <div class="title">点击你要使用的套餐</div>
        <div class="card">
            <card 
                v-for="(cardMsg, index) in cardMsgList" 
                :key="index" 
                :cardMsg="cardMsg"
            >
            </card>
        </div>
    </div>
</template>

<script>
import card from "../../components/card"
export default {
    components: {
        card
    },
    data() {
        return {
            cardMsgList: [{
                title: "日卡",
                detail: "双人位",
                timeLimit: "无期限",
                type: "daily"
            },{
                title: "月卡",
                detail: "8:00-12:00全早",
                timeLimit: "剩余1天",
                type: "monthly"
            },{
                title: "体验卡",
                detail: null,
                timeLimit: "无期限",
                type: "try"
            }]
        }
    }
}
</script>

<style scoped>
.title{
    color: #A8A8A8;
    font-size: 10px;
    text-align: center;
    margin-top: 16px;
    margin-bottom: 12px;
}
.card{
    display: flex;
    margin-left: 16px;
    margin-right: 16px;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>