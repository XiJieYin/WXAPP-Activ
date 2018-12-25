<template>
    <div :style="progressStyle" :class="[panelClass,cname]">
        <span class="progress-text">已抢{{num}}件</span>
        <span :style="percentStyle" class="percent"></span>
        <span :style="percentTextStyle" class="progress-percent">{{percent}}%</span>
    </div>
</template>
<script>
const name = 'progress'
export default {
    props: ['cname','percent','num','width'],
    computed:{
        percentStyle(){
            return 'width:'+this.percent+'%';
        },
        progressStyle(){
            return 'width:'+this.width+'%';
        },
        percentTextStyle(){
            if(this.percent>80){
                return '-webkit-text-fill-color:#fff;'
            }
        }
    },
    data(){
        return{
            panelClass:'progress'
        }
    }
};
</script>

<style lang="scss">
.progress{
    width: 100%;
    height: 12px;
    background: linear-gradient( rgba(246,127,103,0.2),rgba(250,51,70,0.2));
    display: inline-block;
    border-radius: 50px;
    overflow: hidden;
    position: relative;
    .progress-percent{
        color:#fff;
        font-size: 11px;
        position: absolute;
        background: -webkit-linear-gradient(top, #f67f67 , #f84b5b);     /* 背景色渐变 */
        -webkit-background-clip: text;         /* 规定背景的划分区域 */
        -webkit-text-fill-color: transparent;
        right: 6px;
        top: 1px;
    }
    .progress-text{
        color:#fff;
        font-size: 10px;
        position: absolute;
        top: 1px;
        left: 3px;
    }
    .percent{
        background: linear-gradient( rgba(246,127,103,0.7),rgba(250,51,70,0.7));
        border-radius: 45px;
        vertical-align:top;
        height: 100%;
        display: inline-block;
    }
}
</style>
