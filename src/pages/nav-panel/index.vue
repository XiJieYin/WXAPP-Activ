<template>
    <div>
        <div class="nav-data-panel" :style="{background:'url('+bground+')'}">
            <span class="close-icon2" @click="goTo"></span>
            <span class="nav-data-box">
                <span class="nav-data-head">
                    <span style="margin-right:10px;float:right;">{{title}}
                        <span style="width:100%;display:inline-block">{{slogan}}</span>
                    </span>
                </span>
                <ul class="nav-data-content">
                    <li>
                        <span class="num">{{userNum}}</span>
                        <span class="title">{{val.userNum}}个用户已使用</span>
                    </li>
                    <li>
                        <span class="num">{{merchantNum}}</span>
                        <span class="title">已入驻{{val.merchantNum}}个商家</span>
                    </li>
                    <li>
                        <span class="num">{{itemNum}}</span>
                        <span class="title">已有{{val.itemNum}}活动量</span>
                    </li>
                    <li>
                        <span class="num">{{joinItemNum}}</span>
                        <span class="title">成交订单{{val.joinItemNum}}笔</span>
                    </li>
                </ul>
            </span>
            
        </div>
    </div>
</template>

<script>
import topNav from "@/components/nav";
import Vue from "vue";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import user from "../../service/user.js";
import btn from "@/components/btn";
export default {
    data() {
        return {
            val:'',
            bground:'',
            show:false,
            userNum:0,
            itemNum:0,
            joinItemNum:0,
            ss:3,
            merchantNum:0,
            sa:true,
            slogan:'',
            title:'',
            go:''
        };
    },

    components: {
        btn,
        topNav
    },

    methods: {
        goTo(){
            let url = '../home/main';
            this.sa = false;
            clearInterval(this.go)
            wx.redirectTo({  url:url })
        },
        NumFormat(value){
            if(!value) return '0';
            var intPart = Number(value).toFixed(0); //获取整数部分
            var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断

            var floatPart = ".00"; //预定义小数部分
            var value2Array = value.split(".");

            //=2表示数据有小数位
            if(value2Array.length == 2) {
                floatPart = value2Array[1].toString(); //拿到小数部分

                if(floatPart.length == 1) { //补0,实际上用不着
                    return intPartFormat + "." + floatPart + '0';
                } else {
                    return intPartFormat + "." + floatPart;
                }

            } else {
                return intPartFormat;
            }
        },
        calculate(res){
            let that = this;
            let p1 = new Promise(function(resolve){
                let userNumIndex = 0;
                let userNumTime = setInterval(function(){
                    that.userNum= that.NumFormat(userNumIndex+'')
                    if(userNumIndex==res.data.userNum){
                        clearInterval(userNumTime);
                        resolve()
                        return;
                    }else{
                        userNumIndex++
                    }
                },1) 
            })
            let p2 = new Promise(function(resolve){
                let itemNumIndex = 0;
                let itemNumTime = setInterval(function(){
                    that.itemNum= that.NumFormat(itemNumIndex+'')
                    if(itemNumIndex==res.data.itemNum){
                        clearInterval(itemNumTime);
                        resolve()
                        return;
                    }else{
                        itemNumIndex++
                    }
                },1) 
            })
            let p3 = new Promise(function(resolve){
                let merchantNumIndex = 0;
                let merchantNumTime = setInterval(function(){
                    that.merchantNum= that.NumFormat(merchantNumIndex+'')
                    if(merchantNumIndex==res.data.merchantNum){
                        clearInterval(merchantNumTime);
                        resolve()
                        return;
                    }else{
                        merchantNumIndex++
                    }
                },1) 
            })
            let p4 = new Promise(function(resolve){
                let joinItemNumIndex = 0;
                let joinItemNumTime = setInterval(function(){
                    that.joinItemNum= that.NumFormat(joinItemNumIndex+'')
                    if(joinItemNumIndex==res.data.joinItemNum){
                        clearInterval(joinItemNumTime);
                        resolve()
                        return;
                    }else{
                        joinItemNumIndex++
                    }
                },1) 
            })
            Promise.all([p1, p2,p3,p4]).then((result) => {
                that.show = true;
                if(!that.sa){
                    return;
                }
                that.go = setInterval(function(){
                    let t = that.ss;
                    t = t-1
                    that.ss =  t;
                    if(that.ss==0){
                        clearInterval(that.go);
                        let url = '../home/main';
                        wx.redirectTo({  url:url })
                    }
                },1000)              //['成功了', 'success']
                //clearTimeout(that.go)
            }).catch((error) => {
            console.log(error)
            })         
        }
    },
    onLoad(){
        let that = this;
        this.s = 3;
        util.request(api.dataValue).then(res => {
            console.log(res)
            if(res.data.status==2){
                let url = '../home/main';
                wx.redirectTo({  url:url })
                return;
            }
            that.bground = res.data.url
            that.val = res.data;
            that.slogan = res.data.slogan;
            that.title = res.data.title;
            that.calculate(res)
             
        });
    },
    created() {
        
        //that.getUserLocation();
    }
};
</script>
<style lang="scss">

.nav-data-panel{
    .close-icon{
        position: fixed;
        right: 20px;
        top: 10px;
        color: #666;
        font-size: 18px;
    }
}
.close-icon2{
    width: 40px;
    height: 40px;
    background: url('../../../static/img/icon/close-2.png');
    background-size:100%;
    display: inline-block; 
    position: fixed;
    right: 20px;
    top: 10px;
}
@import "../../css/element.scss";
.nav-data-panel{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0px;
    left:0;
    background: #efefef;
    .nav-data-box{
        width: 338px;
        height: 331px;
        position: absolute;
        background: #fff;
        top: 20%;
        left:50%;
        margin-left: -169px;
        overflow: hidden;
        border-radius: 10px;
        .nav-data-content{
            li{
                display: inline-block;
                width: 100%;
                height:68px ;
                border-bottom:1px solid #eee;
                padding-left: 18px;
                padding-right: 18px;
                box-sizing: border-box;
                .num{
                    float: left;
                    color: #ff274c;
                    font-size: 26px;
                    line-height: 68px;
                }
                .title{
                    float: right;
                    line-height: 68px;
                    font-size:13px;
                    color: #666
                }
            }
        }
        .nav-data-head{
            display: inline-block;
            text-align: right;
            color: #fff;
            width: 100%;
            font-size: 14px;
            line-height: 20px;
            padding-top: 10px;
            box-sizing: border-box;
            letter-spacing: 1px;
            height: 58.5px;
            background: -webkit-linear-gradient(top, #f67f67, #fa3346);
        }
    }
}

page {
    background: #f5f5f5;
}
</style>
