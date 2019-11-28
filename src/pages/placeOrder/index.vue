<template>
    <div class="placeOrder">
        <div class="nav">
            <div class="gridArea">
                <span class="greenFont">格间区</span>
                <div class="greenBar"></div>
            </div>
            <div class="openArea greenFont">
                <span class="greenFont">开放区</span>
            </div>
        </div>
        <div class="seat"><!--grid-->
            <seat></seat>
        </div>
    </div>
</template>

<script>
import seat from "./seat"
export default {
    components: {
        seat
    }
}
</script>

<style scoped>
.nav{
    height: 48px;
    width: 100%;
    margin-top: 8px;
    margin-bottom: 16px;
    padding-left: 18px;
}
.nav>div{
    display: inline-block;
    color: #2E2E2E;
    font-size: 16px;
    height: 100%;
    line-height: 48px;
    position: relative;
}
.greenBar{
    position: absolute;
    width: 31.5px;
    height: 4px;
    right: 0;
    left: 0;
    margin: auto;
    bottom: 0;
    background-color: #44644A;
}
.greenFont{
    color: #44644A;
}
.gridArea{
    margin-right: 36px;
}
.seat{
    margin: auto 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>