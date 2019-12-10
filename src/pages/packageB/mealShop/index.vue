<template>
    <div>
        <div class="card">
            <card 
                v-for="(cardMsg, index) in mealList" 
                :key="index" 
                :cardMsg="cardMsg"
                @handleClick="goBuyMeal"
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
            mealList: []
        };
    },
    methods: {
        getMealList() {
            this.$wxhttp.get({
                url: '/customer/meal'
            })
            .then(res => {
                console.log(res);
                this.mealList = res.data.mealList;
                console.log(this.mealList);
            })
            .catch(err => {
                console.log(err);
            })
        },
        goBuyMeal(mealMsg) {
            mpvue.navigateTo({
                url: '/pages/packageB/buyMeal/main',
                success(res) {
                    res.eventChannel.emit('acceptMealMsg', {mealMsg: mealMsg});
                }
            })
        }
    },
    mounted() {
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
</style>