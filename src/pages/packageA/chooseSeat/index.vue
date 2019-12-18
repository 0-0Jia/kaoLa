<template>
    <div class="all">
        <div 
            class="list" 
            @click="chooseSeat(index)" 
            v-for="(seat, index) in seatList"
            :key="index"
        >
            <div class="seat">{{seat.sitId}}号位</div>
            <div :class="[(index==seatIndex)?'choosed':'', 'circle']">
                <img v-if="index==seatIndex" src="/static/images/choosed.png">
            </div>
            <div class="bar"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            seatList: [],
            seatIndex: 0
        }
    },
    methods: {
        getSeatList() {
            const eventChannel = this.$mp.page.getOpenerEventChannel();
            eventChannel.on("acceptSeatList", data => {
                this.seatList = data.seatList;
            });
            eventChannel.emit("sendChooseSeat", {
                index: this.seatIndex
            });
        },
        chooseSeat(index) {
            this.seatIndex = index;
            this.getSeatList();
        }
    },
    mounted() {
        this.getSeatList();
    }
}
</script>

<style scoped>
.all{
    background-color: white;
    width: 100%;
    margin-top: 8px;
}
.list{
    width: 343px;
    display: flex;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
}
.seat{
    display: inline-block;
    font-size: 12px;
    color: #2E2E2E;
}
.circle{
    display: inline-block;
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    border: 0.6px solid black;
    box-sizing: border-box;
    margin-top: 13.5px;
}
.circle>img{
    width: 70%;
    height: 70%;
    position: absolute;
    right: 0;
    display: block;
    left: 0;
    bottom: 0;
    top: 0;
    margin: auto;
}
.bar{
    position: absolute;
    z-index: 2;
    bottom: 0;
    width: 100%;
    height: 0.5px;
    background-color: #A8A8A8;
}
.choosed{
    background-color: #44644A;
}
</style>