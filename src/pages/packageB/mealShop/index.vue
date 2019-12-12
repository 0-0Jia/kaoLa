<template>
    <div>
        <div class="card" v-if="mealList.length>0">
            <card 
                v-for="(cardMsg, index) in mealList" 
                :key="index" 
                :cardMsg="cardMsg"
                @handleClick="goBuyMeal"
            >
            </card>
        </div>
        <div class="else" v-else>暂无可购买套餐</div>
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
            mealList: []
        };
    },
    methods: {
        getMealList() {
            wx.showLoading({
                title: '加载中',
            })
            this.$wxhttp.get({
                url: '/customer/meal'
            })
            .then(res => {
                console.log(res);
                wx.hideLoading();
                if(res.code!=0) {
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 2000
                    })
                } else if(res.code==0){
                    this.mealList = res.data.mealList;
                    console.log(this.mealList);
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
        goBuyMeal(mealMsg) {
            wx.showLoading({
                title: '加载中'
            })
            mpvue.navigateTo({
                url: '/pages/packageB/buyMeal/main',
                success(res) {
                    wx.hideLoading();
                    res.eventChannel.emit('acceptMealMsg', {mealMsg: mealMsg});
                }
            })
        }
    },
    mounted() {
        // this.getMealList();
        wx.setNavigationBarTitle({
            title: "套餐商城"
        });
    },
    onShow() {
        this.getMealList();
    }
}
</script>

<style scoped>
.card{
    display: flex;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 16px;
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