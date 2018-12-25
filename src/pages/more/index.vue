<template>
    <div>
        <section class="panelbody section" :class="panelClass">
            <ul class="swiper-tab">
                <li :class="[swiperTabList,currentTab==0?'on':'']" data-current="0" @click="swichNav(0)">
                    <span>正在进行</span>
                </li>
                <li :class="[swiperTabList,currentTab==2?'on':'']" data-current="0" @click="swichNav(2)">
                    <span>即将开始</span>
                </li>
                <li :class="[swiperTabList,currentTab==1?'on':'']" data-current="1" @click="swichNav(1)">
                    <span>往期活动</span>
                </li>
            </ul>
            <ul class="col">
                <li @click="actClick(item)" v-for="(item,index) in actList.data" :key="index">
                    <image :src="item.image" />
                    <div>
                        <h4 style="overflow:hidden;white-space: nowrap;text-overflow: ellipsis;">
                            {{item.title}}
                            <!-- <span>2.58km</span> -->
                        </h4>
                        <p v-if="item.status!=4" style="overflow:hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.sell_point?item.sell_point:''}}</p>
                        <p v-if="item.status==4" style="overflow:hidden;white-space: nowrap;text-overflow: ellipsis;">活动时间：{{item.startTime}}至{{item.endTime}}</p>
                        <span v-if="item.status==5" class="visit" style="margin-right:3px;color:#309838">{{item.careNum}}人已经关注</span><span style="color:#309838" v-if="item.status==5" class="visit">|</span><span v-if="item.status==5" style="margin-left:3px;color:#309838" class="join">{{item.startTime}}活动开抢</span>
                        <span v-if="item.status==2" class="join"><img src="../../../static/img/icon/join.png" alt="">{{item.now?item.now:0}}人参与</span>
                        <span v-if="item.status==2" class="visit"><img src="../../../static/img/icon/eye.png" alt="">{{item.read_count?item.read_count:0}}人游览</span>
                        <div class="div-btn">
                            <proGress v-if="item.status==2" :width="51" :num="item.shopping_num?item.shopping_num:0" :percent="item.percent?item.percent:0.00"></proGress>
                            <btn v-if="item.status==2" @handle-click="joinClick(item)" text="我要报名"></btn>
                            <btn cname="greeen" @handle-click="actClick(item)" v-if="item.status==5" text="即将开始"></btn>
                            <btn cname="gray" v-if="item.status==4" text="活动过期"></btn>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import topSlider from "@/components/slider";
import proGress from "@/components/proGress";
import topNav from "@/components/nav";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import config from "../../utils/config.js";
import user from "../../service/user.js";
import btn from "@/components/btn";
import navBar from "@/components/nav-bar";
let padDate=function(va){
     va=va<10?'0'+va:va;
     return va
}
export default {
    data() {
        return {
            panelClass: "panel",
            userInfo: {},
            searchText: "",
            currentTab: 0,
            region: [
                '广东',
                '韶关'
            ],
            ddd: "",
            moviesText: [
                {
                    text: "无需注册公众号，30秒发起一场营销与采购活动！"
                },
                {
                    text: "无需注册公众号，"
                }
            ],
            showList: "6",
            more: "6",
            movies: [
            ],
            actList: [],
            list: [
                {
                    text: "首页",
                    img: "../../static/img/icon/selected-home.png"
                },
                {
                    text: "分类",
                    img: "../../static/img/icon/category.png",
                    url: "../classify/main"
                },
                {
                    text: "发布",
                    img: "../../static/img/icon/release2.png",
                    url: "../release/main"
                },
                {
                    text: "发现",
                    img: "../../static/img/icon/release.png",
                    url: "../release/main"
                },
                {
                    text: "个人中心",
                    img: "../../static/img/icon/me.png",
                    url: "../me/main"
                }
            ]
        };
    },
    computed:{
        swiperTabList(){
            let cls = 'swiper-tab-list ';
            return cls;
        }
    },
    components: {
        topSlider,
        proGress,
        btn,
        topNav,
        navBar
    },

    methods: {
        formatDate:function (val) {
            var value=new Date(val);
            var year=value.getFullYear();
            var month=padDate(value.getMonth()+1);
            var day=padDate(value.getDate());
            var hour=padDate(value.getHours());
            var minutes=padDate(value.getMinutes());
            var seconds=padDate(value.getSeconds());
            return year+'-'+month+'-'+day;
        },
         swichNav: function(index) {
            var that = this;
            this.status = index;
            if(index==1){
                this.getActList(4);
            }else if(index==2){
                this.getActList(5);
            }else{
                this.getActList();
            }
            that.currentTab=index;
        },
        showMore() {
            this.showList = 100;
            this.more = 10000000;
        },
        actClick(item) {
            let url = "../detail/main?itemId=" + item.itemId;
            wx.navigateTo({ url: url });
        },
        bindRegionChange(e) {
            //console.log('picker发送选择改变，携带值为', e)
            this.region = e.target.value;
        },
        joinClick(item) {
            let url = "../join-act/main?itemId=" + item.itemId;
            wx.navigateTo({ url: url });
        },
        handleSearch() {
            console.log(this.searchText);
        },
        gethomeSowingMap() {
            //获取轮播图
            let that = this;
            util
                .request(api.homeSowingMap, {
                    adPositionId: 1
                })
                .then(res => {
                    that.movies = res.data.adList;
                });
        },
        getNews() {
            //获取轮播图
            let that = this;
            that.moviesText = [];
            util.request(api.news).then(res => {
                for (var i = 0; i < res.data.length; i++) {
                    let obj = {};
                    obj = res.data[i];
                    obj.text = res.data[i].content;
                    that.moviesText.push(obj); //属性
                    //arr.push(object[i]); //值
                }
            });
        },
        getActList(index) {
            //获取活动列表
            let that = this;
            util.request(api.actList,{
                status:index?index:''
            }).then(res => {
                that.actList = res;
                that.actList.data.map(item=>{
                    if(item.image.indexOf('[')>=0){
                        item.image = JSON.parse(item.image)[0]
                    }
                    item.startTime = that.formatDate(item.start_time);
                    item.endTime = that.formatDate(item.over_time);
                    if(item.startTime.substring(0, 4)==item.endTime.substring(0, 4)){
                        item.endTime = item.endTime.substring(5, 10)
                    }
                    
                })
            });
        },
    },
    onLoad() {
        this.gethomeSowingMap();
        let that = this;
        this.currentTab = 0;
        
        this.getActList();
        //that.getUserInfo()
        this.getNews();
        //that.getUserLocation();
        this.showList = "6";
        this.more = "6";
    },
    onShow(){
       // this.getActList();
    },
    created() {
        let that = this;
        let location = wx.getStorageSync("userLocation");
        if(location){
            this.region[0] = location.province;
            this.region[1] = location.city;
        }
        this.getActList();
        //this.getActList();
        //that.getUserInfo()
        this.getNews();
        this.gethomeSowingMap();
        //that.getUserLocation();
    }
};
</script>
<style lang="scss">
@import "../../css/element.scss";
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
	width: 33%;
	color: #000;
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
.panelbody.section {
    padding-bottom: 45px !important;
}
.hot {
    background: -webkit-linear-gradient(top, #f67f67, #f84b5b); /* 背景色渐变 */
    -webkit-background-clip: text; /* 规定背景的划分区域 */
    -webkit-text-fill-color: transparent;
    font-family: "微软雅黑";
    font-size: 12px;
    margin-top: 7px;
    margin-bottom: 13px;
    font-weight: bold;
}
.panel.panelbody {
    padding: 8px 10px;
    padding-bottom: 0;
    .line {
        padding: 0px 10px;
        height: 1px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        border-bottom: 1px solid #eeeeee;
        margin-top: 5px;
    }
    > h4 {
        color: #999;
        font-size: 12.5px;
    }
    ul.row {
        @include flex(row);
        justify-content: space-around;
        box-sizing: border-box;
        li {
            .price {
                position: absolute;
                bottom: 22px;
                background: -webkit-linear-gradient(
                    top,
                    #f67f67,
                    #f84b5b
                ); /* 背景色渐变 */
                -webkit-background-clip: text; /* 规定背景的划分区域 */
                -webkit-text-fill-color: transparent;
                font-size: 12px;
                font-weight: 700;
            }
            position: relative;
            width: 56px;
            image {
                border: 1px solid #ededed;
                height: 73px;
            }
            span {
                display: inline-block;
                color: #999;
                font-size: 10px;
                text-decoration: line-through;
                text-align: center;
                width: 100%;
            }
        }
    }
}
.div-btn{
    margin-top:13px;
    height:25px;
    .progress{
        margin-top:12px;
    }
}
.panelbody {
    padding-top: 0;
    > h4 {
        border-bottom: none;
    }
    ul.col {
        @include flex();
        justify-content: space-around;
        box-sizing: border-box;
        image {
            width: 130px;
            height: 95px;
            display: inline-block;
            margin-right: 10px;
            vertical-align: top;
        }
        li {
            display: inline-block;
            height: 114px;
            border-bottom: 1px solid #f7f7f7;
            box-sizing: border-box;
            padding-top: 10px;
            > div {
                display: inline-block;
                width: 60%;
                h4 {
                    font-size: 14.3px;
                    position: relative;
                    height: 16px;
                    span {
                        position: absolute;
                        font-size: 8.5px;
                        color: #999999;
                        right: 0;
                        top: 3px;
                        letter-spacing: 1px;
                    }
                }
                p {
                    color: #666666;
                    overflow: hidden;
                    width: 90%;
                    height: 23px;
                    letter-spacing: 1px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 11.5px;
                    line-height: 23px;
                }
                .btn {
                    float: right;
                    border: none;
                    background: linear-gradient(to right, #fa3346, #f67f67);
                    font-weight: normal;
                }
                .join {
                    color:#a2a0a0;
                    font-size:10px;
                    background-position:0 1px;
                    background-repeat:no-repeat;
                    margin-right:5px;
                    position:relative;
                    top:-3px;
                    img{
                        background-repeat: no-repeat;
                        width:13px;
                        height: 12px;
                        vertical-align:bottom;
                        margin-right: 5px;
                    }
                }
                .visit {
                    color: #a2a0a0;
                    font-size: 10px;
                    background-position: 0px 1px;
                    background-repeat: no-repeat;
                    position: relative;
                    top: -3px;
                    img{
                        background-repeat: no-repeat;
                        width:13px;
                        vertical-align:bottom;
                        height: 12px;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
.movies-list {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    width: 280px;
    vertical-align: middle;
    margin-left: 2px;
    color: #828181;
}
.panel {
    @include panel;
    margin-top: 10px;
    .more {
        float: right;
        color: #999999;
        font-size: 10px;
    }
}
.hot-news {
    padding: 8px;
    padding-right: 0;
    display: inline-block;
    color: #cfcfcf;
    font-size: 12px;
    width: 95%;
}

.news-text {
    font-family: "STHupo";
    background: -webkit-linear-gradient(top, #f67f67, #fa3346); /* 背景色渐变 */
    -webkit-background-clip: text; /* 规定背景的划分区域 */
    -webkit-text-fill-color: transparent;
    font-size: 12px;
    margin-right: 4px;
}
.search-bar {
    .select-text {
        margin-left: 15px;
        margin-right: 12px;
        font-size: 14px;
        display: inline-block;
        line-height: 30px;
        vertical-align: top;
        span {
            content: "";
            display: inline-block;
            width: 11px;
            height: 6px;
            background: url("../../../static/img/icon/chevron-downIcon.png");
        }
    }
    margin: 5px 0;
    display: inline-block;
    .search-input {
        display: inline-block;
        position: relative;
        .search-icon {
            position: absolute;
            z-index: 2;
            top: 8px;
            left: 10px;
        }
        input {
            width: 258px;
            height: 29px;
            background: #f7f7f7;
            border-radius: 50px;
            font-size: 12px;
            padding-left: 30px;
            z-index: 0;
        }
    }
}
page {
    background: #f5f5f5;
}
</style>
<style>
.greeen{
    background:linear-gradient(to right, #309838, #309838) !important;
    color: #fff;
}
.gray{
    background:linear-gradient(to right, #888, #888) !important;
    color: #fff;
}
*{
    font-family: 'Microsoft YaHei';
    font-family: '微软雅黑'
}
</style>
