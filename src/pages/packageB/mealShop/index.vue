<template>
    <div>
        <div class="card">
            <card 
                v-for="(cardMsg, index) in mealList" 
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
            }],
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