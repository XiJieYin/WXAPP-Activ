<template>
    <section class="order-wrap">
        <ul class="swiper-tab">
            <li :class="[swiperTabList,currentTab==1?'on':'']" data-current="1" @click="swichNav(1)">
                <span>关注的活动</span>
            </li>
            <li :class="[swiperTabList,currentTab==0?'on':'']" data-current="0" @click="swichNav(0)">
                <span>收藏的店铺</span>
            </li>   
        </ul>
        <div style="height:100%;">
            <span v-if="(show==0&&items.length==0)||(show==1&&items2.length==0)" class="no-data"></span>
            <ul v-if="show==0" class="release-lists">
                <li @click="toSeller(item)" class="release-list" v-for="(item, index) in items" :key="index">
                    <span class="release-content">
                        <img  mode="aspectFill" :src="item.image" alt="">
                        <span>{{item.merchant_name}}</span>
                        <!-- <btn :width="80" cname="big-btn" :text="text(item)"></btn> -->
                    </span>
                    <em></em>
                </li>
            </ul>
             <ul v-if="show==1" class="release-lists2">
                <li @click="actClick2(item)" class="release-list" v-for="(item, index) in items2" :key="index">
                    <span class="release-content">
                        <img :src="item.image" alt="">
                        <span>{{item.title}}</span>
                        <!-- <btn :width="80" cname="big-btn" :text="text(item)"></btn> -->
                    </span>
                    <em></em>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import panel from "../../components/panel";
import topNav from "../../components/nav";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import btn from "@/components/btn";
import user from "../../service/user.js";
export default {
    data() {
        return {
            duration: 1000,
            currentTab:1,
            autoplay: false,
            indicatorDots: false,
            userInfo: {},
            items:[],
            items2:[],
            show:0,
            name:'',
            status:'',
        };
    },
    computed:{
        swiperTabList(){
            let cls = 'swiper-tab-list ';
            return cls;
        },
        
        
    },
    components: {
        panel,
        topNav,
        btn
    },
    methods: {
        swichNav: function(index) {
            var that = this;
            this.status = index;
            this.show = index;
            if(index==0){
                this.getList();
            }else{
                this.getList2();
            }
            that.currentTab=index;
        },
        toSeller(item){
            let url = '../seller/main?itemId='+item.itemId;
            wx.navigateTo({  url:url })
        },
        text(item){
            let obj = {
                1:'审核中',
                2:'进行中',
                3:'下架',
                4:'已结束',
                5:'审核通过',
                6:'已成团',
            }
            return obj[item.status]
        },
        getList(){
            let that = this;
            util.request(api.careList,{
                num:1
            }).then(res => {
                console.log(res)
                that.items = res.data.careList;
            })
        },
        actClick2(item){
            let url = '../detail/main?itemId='+item.itemId;
            wx.navigateTo({  url:url })
        },
        text2(item){
            let obj = {
                1:'审核中',
                2:'进行中',
                3:'下架',
                4:'已结束',
                5:'审核通过',
                6:'已成团',
            }
            return obj[item.status]
        },
        getList2(){
            let that = this;
            util.request(api.careList,{
                num:0
            }).then(res => {
                console.log(res)
                that.items2 = res.data.careList;
                that.items2.map(item=>{
                    if(item.image.indexOf('[')>=0){
                        item.image = JSON.parse(item.image)[0]
                    }
                })
            })
        }
    },
    onLoad(){
        this.show = 1;
        this.getList2()
    },
    created() {
        //console.log(wx);

        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>

<style scoped lang="scss">
.release-lists2{
    background: #fff;
    margin-top: 10px;
    .release-list{
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        background: #fff;
        padding:12px 15px 0px 15px;
        position: relative;
        em{
            width: 100%;
            height: 1px;
            display: inline-block;
            background: #eee;
        }
        .release-title{
            display: inline-block;
            width: 100%;
            font-size: 13px;
            color: #333;
        }
        .release-content{
            margin-top: 10px;
            display: inline-block;
            position: relative;
            width: 100%;
            box-sizing: border-box;
            padding-top: 7px;
            padding-bottom: 7px;
            span{
                width: 210px;
                display: inline-block;
                vertical-align: top;
                font-size: 15px;
                margin-top: 7px;
            }
            img{
                width: 100%;
                height: 180px;
            }
            
        }
    }
}
.release-lists{
    background: #fff;
    margin-top: 10px;
}
.release-list{
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    padding:12px 15px 0px 15px;
    position: relative;
    em{
        width: 100%;
        height: 1px;
        display: inline-block;
        background: #eee;
    }
    .release-title{
        display: inline-block;
        width: 100%;
        font-size: 13px;
        color: #333;
    }
    .release-content{
        margin-top: 10px;
        display: inline-block;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        padding-top: 7px;
        padding-bottom: 7px;
        span{
            width: 210px;
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            margin-top: 7px;
        }
        img{
            width: 100%;
            height: 180px;
        }
        
    }
}
.no-data{
    background: url('../../../static/img/icon/no_data.png');
    width: 132.5px;
    height: 140.5px;
    background-size: 100%;
    position: relative;
    left: 50%;
    margin-top: 70px;
    margin-left: -66px;
    display:inline-block;
}
.swiper-tab{
	width: 100%;
	border-bottom: 1px solid #fefefe;
    text-align: center;
    background: #fff;
    height: 45px;
	line-height: 45px;
    display: inline-block;
    span{
        height: 42px;
	    line-height: 45px;
        display: inline-block;
    }
}
.swiper-tab-list{  
    font-size: 15px;
    display: inline-block;
	width: 50%;
	color: #333;
}
.on{
    span{
        border-bottom: 2px solid #f94c51;
        color: #f94c51;
    }
}
 
.swiper-box{ display: block; height: 100%; width: 100%; overflow: hidden; }
.swiper-box span{
	text-align: center;
}
.order-wrap{
    swiper{
        height: 550px;
    }
}
</style>
<style>
.big-btn{
    position: absolute;
    bottom: 7px;
    right: 14px;
}
page{
     background: #efeff4;
}

.help-list span {
    display: none;
}
.help-list ul li {
    font-size: 14px;
    color: #2e2e2e;
    font-weight: normal;
}
</style>

