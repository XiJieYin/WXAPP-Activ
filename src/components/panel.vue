<template lang="html">
    <div :class="[pannelClass,cname]" >
        <span v-if="title">
        {{title}}
        </span>
        <ul>
            <li @click="rowClick(item)" v-for="(item,index) in list" :key="index">
                <image v-if="item.src" :src="item.src" />
                <official-account v-if="item.text=='关注公众号'" class="account"></official-account>
                <!-- <official-account v-if="item.account" class="account"></official-account> -->
                {{item.text}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        cname:{
            type:String,
            default:'',
        },
        title:{
            type:[String,Number],
            default:'',
        },
        list:{
            type:Array,
            default(){
                return []
            }
        }
    }, 
    data(){
        return{
            pannelClass:'panel-list',
        }
    },
    methods:{
        rowClick(row){
            if(row.url){
                wx.navigateTo({  url:row.url })
            }
            this.$emit('panel-click')
            console.log(row)
        }
    }
};
</script>

<style lang="scss">
@import "../css/element.scss";
.account{
    position: absolute;
    width:100%;
    right:0px;
    height:93px;
    top: 0;
    z-index: 999999;
    opacity: 0;
}
.panel-list{
    background: #fff;
    >span{
        color: #838180;
        font-size: 16px;
        padding-left:20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
        display:inline-block;
        width: 100%;
        box-sizing: border-box;
        font-weight:bold; 
        padding-top:10px;
    }
    ul{
        @include list(row);
        li{
            position: relative;
            border-bottom: 1px solid #e5e5e5;
            width: 100%;
            padding-left:25px;
            height: 58px;
            line-height: 58px;
            color: #433f3d;
            font-size: 18px;
            font-weight: bold;
            image{
                width: 26px;
                height: 25px;
                vertical-align:middle;
                margin-right:14px;
                margin-top:-3px;
            }
            &:after{
                content: '';
                position: absolute;
                right: 20.5px;
                color: #dcdcdc;
                width: 20px;
                height: 31px;
                top:50%;
                margin-top:-8px;
                background: url('../../static/img/icon/arrow.png');
                background-repeat:no-repeat;
                background-size:60%;  
            }
        }
    }
}
.panel-list+.panel-list{
    margin-top: 10px
}
</style>