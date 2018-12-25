<template>
    <div :class="cname" class="nav">
        <span v-if="back" class="back-icon" @click="handleBack"><span></span></span>
        {{title}}
    </div>
</template>

<script>
export default {
    props: ["title","cname","back"],
    methods:{
        handleBack(){
            if(getCurrentPages().length==1){
                 wx.redirectTo({  url:'../home/main' })
            }else{
                wx.navigateBack()
            }
            console.log(getCurrentPages())
            //;
        }
    }
};
</script>

<style lang="scss">
.back-icon{
    top: 26px;
    left: 5px;
    position: absolute;
    width:30px;
    height:30px;
    span{
        background: url('../../static/img/icon/back.png') no-repeat;
        width: 14.5px;
        height: 17px;
        background-size:100%;
        display:inline-block;
    }
}
    .nav{
        position: fixed;
        top:0px;
        width: 100%;
        height: 50px;
        background: #fff;
        z-index: 9;
        padding-top:20px;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: #333;
    }
    .nav + .nav-first{
       margin-top:70px;
    }
    .red-nav{
        background: linear-gradient( to right, #fa3346,#f67f67);
        color: #fff;
    }
    .red-nav.nav + .nav-first{
       margin-top:70px;

    }
</style>
