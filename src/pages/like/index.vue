<template>
    <section class="order-wrap">
        <div style="height:100%;">
            <span v-if="items.length==0" class="no-data"></span>
            <ul class="release-lists">
                <li @click="actClick(item)" class="release-list" v-for="(item, index) in items" :key="index">
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
            currentTab:0,
            autoplay: false,
            indicatorDots: false,
            userInfo: {},
            items:[],
            name:'',
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
        actClick(item){
            let url = '../detail/main?itemId='+item.itemId;
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
                num:0
            }).then(res => {
                console.log(res)
                that.items = res.data.careList;
                that.items.map(item=>{
                    if(item.image.indexOf('[')>=0){
                        item.image = JSON.parse(item.image)[0]
                    }
                })
            })
        }
    },
    onLoad(){
        this.getList()
    },
    created() {
        //console.log(wx);

        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>

<style scoped lang="scss">

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
	width: 25%;
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

