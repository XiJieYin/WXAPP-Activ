<template lang="html">
    <div class="nav-bar">
        <ul>
            <li @click="goTo('../home/main')">
               <img :src="act=='home'?'../../static/img/icon/selected-home.png':'../../static/img/icon/home.png'" />
               <p :style="act=='home'?'color:#f85555':''">首页</p>
            </li>
            <li @click="goTo('../classify/main')">
               <img :src="act=='classify'?'../../static/img/icon/selected-category.png':'../../static/img/icon/category.png'" />
               <p :style="act=='classify'?'color:#f85555':''">分类</p>
            </li>
            <li class="special-li" @click="showBG">
                <span></span>
               <img src="../../static/img/icon/logo.png" />
               <p>发布</p>
            </li>
            <li @click="goTo('../need-list/main')">
               <img :src="act=='release'?'../../static/img/icon/selected-release1.png':'../../static/img/icon/release1.png'" />
               <p :style="act=='release'?'color:#f85555':''">发现</p>
            </li>
            <li @click="goTo('../me/main')" >
               <img :src="act=='me'?'../../static/img/icon/selected-me.png':'../../static/img/icon/me.png'" />
               <p :style="act=='me'?'color:#f85555':''">个人中心</p>
            </li>
        </ul>
        <div v-if="show" class="fixd-bg">
            <div></div>
            <span @click="goTo('../consumer-release/main',1)" class="join-shop">
                <img src="../../static/img/icon/join-shop.png" />
                <span>发布需求</span>
            </span>
            <span @click="goTo('../release/main',2)" class="send">
                <img src="../../static/img/icon/send.png" />
                <span>发起活动</span>
            </span>
            <span @click="hideBG" class="close">x</span>
        </div>
    </div>
</template>

<script>
import config from '../utils/config';
import util from "../utils/util.js";
import api from "../utils/api.js";
export default {
    props:{
        cname:{
            type:String,
            default:'',
        },
        act:{
            type:String,
            default:'',
        },
        text:{
            type:[String,Number],
            default:'',
        },
        width:{
            type:[String,Number],
            default:'',
        },
        list:{
            type:[Array],
            default:'',
        },
        
        
    }, 
    computed:{
    },
    data(){
        return{
            show:false,
            ot:0,
            btnClass:'btn',
            userInfo: {
                state:0
            },
        }
    },
    onLoad(){
        
        
    },
    methods: {
        showBG(){
            this.show = true;
        },
        hideBG(){
            this.show = false;
        },
        goTo(url,inx){
            let that = this;
            this.show = false;
            util.request(api.verify).then(res => {
                console.log(res)
                that.userInfo = res.data;
                wx.showToast({ 
                    title:'加载中', 
                    icon:'loading', 
                    mask:true 
                })
                
                if(inx==2){
                    if(that.userInfo.state==1){
                        wx.hideLoading()
                        wx.showToast({ 
                            title:'商家信息正在审核中，请耐心等待审核结果。', 
                            icon:'loading', 
                            mask:true 
                        })
                        setTimeout(()=>{
                            wx.redirectTo({  url:'../home/main' })
                        },500)
                    }else if(this.userInfo.state==0){
                        wx.navigateTo({  url:'../register/main' })
                    }else{
                        wx.navigateTo({  url:'../act/main' })
                    }
                }else if(url&&inx===1){
                    wx.navigateTo({  url:url })
                }else{
                    wx.redirectTo({  url:url })
                }
                
            })
            
        },
        open(){

        }
    }
};
</script>

<style lang="scss">
@import "../css/element.scss";
.fixd-bg{
    div{
        background: #000;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
    }
    >span{
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #f67f67;
        bottom: 120px;
        z-index: 99999999;
        span{
            color: #fff;
            position: absolute;
            bottom: -20px;
            white-space: nowrap;
            left: 0;
            font-size: 12px;
        }
        img{
            width: 30px;
            height: 30px;
            margin-left: 10px;
            margin-top: 8px;
        }
    }
    .join-shop{
        left: 80px;
    }
    .send{
        right: 80px;
        img{
            margin-left: 11px;
            margin-top: 10px;
        }
    }
    .close{
        background: transparent;
        bottom: 20px;
        color: #fff;
        font-size: 40px;
        text-align: center;
        margin-left: -25px;
        left: 50%;
        font-weight:lighter
    }
}
.nav-bar{
    position: fixed;
    bottom:0;
    height: 47px;
    background: #f7f7fa;
    width: 100%;
    border-top: 0.5px solid #d3d3d3;
    ul{
        height: 100%;
        li{
            vertical-align: top;
            box-sizing: border-box;
            width: 20%;
            display: inline-block;
            height: 100%;
            text-align: center;
            img{
                width: 20.5px;
                height: 19px;
                margin-top: 4px;
            }
            p{
                font-size: 10px;
                color: #666666;
                margin-top: 6px;
            }
        }
        li.special-li{
            position: relative;
            span{
                width: 20.5px;
                height: 19px;
                margin-top: 4px;
                display: inline-block;
            }
            img{
                position: absolute;
                width: 46.2px;
                height: 47.4px;
                margin-top: -18px;
                left: 0;
                margin-left: 15px;
            }
        }
    }
}
</style>