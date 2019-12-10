<template>
    <div>
        <div class="title">点击你要使用的套餐</div>
        <div class="card">
            <card 
                v-for="(cardMsg, index) in userMealList" 
                :key="index" 
                :cardMsg="cardMsg"
                chooseCard
                @chooseCard="chooseMeal"
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
            }],
            preservationList: [],
            userMealList: []
        }
    },
    mounted() {
        this.getUserMeal();  
        wx.setNavigationBarTitle({
            title: "选择套餐"
        });
    },
    methods: {
        getUserMeal() {
            this.$wxhttp.get({
                url: '/customer/user/meal'
            })
            .then(res => {
                console.log(res);
                this.userMealList = res.data.mealList;
                console.log(this.userMealList);
            })
            .catch(err => {
                console.log(err);
            })
        },
        chooseMeal(meal) {
            const eventChannel = this.$mp.page.getOpenerEventChannel();
            eventChannel.emit('acceptChoosedMeal', {
                meal
            })
            mpvue.navigateBack({
                delta: 1
            })
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