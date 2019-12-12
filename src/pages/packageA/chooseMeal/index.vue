<template>
    <div>
        <div class="title">点击你要使用的套餐</div>
        <div class="card" v-if="userMealList.length > 0">
            <card 
                v-for="(cardMsg, index) in userMealList" 
                :key="index" 
                :cardMsg="cardMsg"
                chooseCard
                @chooseCard="chooseMeal"
            >
            </card>
        </div>
        <div class="else" v-else>无可用套餐</div>
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
        // this.getUserMeal();  
        wx.setNavigationBarTitle({
            title: "选择套餐"
        });
    },
    onShow() {
        this.getUserMeal();
    },
    methods: {
        getUserMeal() {
            wx.showLoading({
                title: '加载中',
            })
            this.$wxhttp.get({
                url: '/customer/user/meal'
            })
            .then(res => {
                console.log(res);
                wx.hideLoading();
                if(res.code!=0){
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 2000
                    })
                } else if(res.code==0) {
                    this.userMealList = res.data.mealList;
                    console.log(this.userMealList);
                }
            })
            .catch(err => {
                console.log(err);
                wx.hideLoading();
                wx.showToast({
                    title: "加载失败",
                    icon: 'none',
                    duration: 2000
                })
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
.else{
    color: #44644A;
    opacity: 0.5;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    position: relative;
    top: 200px;
}
</style>