<template>
    <div class="msg-row">
        <div class="row">
            <span>{{name}}</span>
            <div class="rowValue">
                <span>{{value}}</span>   
            </div>
        </div>
        <div class="bar"></div>
    </div>
</template>

<script>
export default {
    name: "msgRow",
    props: {
        name: String,
        value: String
    }
}
</script>

<style scoped>
.msg-row{
    width: 343px;
    height: 44.5px;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 12px;
    color: #2E2E2E;
    background-color: white;
}
.row{
    width: 100%;
    height: 12px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto; 
}
.row>div{
    display: inline-block;
}
.rowValue{
    position: absolute;
    right: 0;
}
.bar{
    position: absolute;
    z-index: 2;
    bottom: 0;
    width: 100%;
    height: 0.5px;
    background-color: #A8A8A8;
}
</style>