<template>
    <div>
            <movable-area :style="{height: '100%', width: width+'px'}">
        <section :class="panelClass">
                <movable-view class="help" :animation="false" @change="changeM" direction="all" :x="x" :y="y" style="height: 30px; width: 30px;opacity:0.8;z-index:99999999999999999">
                        <span @click.stop="goto"></span>
                </movable-view>
            
            <span class="search-bar">
                <picker class="select-text" mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
                    {{region[1]}}
                    <span></span>
                </picker>
                <!-- <span class="search-input">
                    <icon @click="handleSearch" class="search-icon" type="search" size="14" />
                    <input v-model="searchText" class="search-input" placeholder="请输入关键词" />
                </span> -->
            </span>
            <topSlider enabled="1" activeColor="#f85354" url="image_url" indicatorColor="#fff" :movies="movies"></topSlider>
            <span class="hot-news">
                <span class="news-text">新闻头条</span>
                <topSlider enabled="2"  activeColor="transparent" indicatorColor="transparent" cname="movies-list" :movies="moviesText" vertical="true" textTrue='true'></topSlider>
            </span>
        </section>
        <!-- <section class="panelbody section" :class="panelClass">
            <h4>限时抢购
                <span class="more">更多 ></span>
            </h4>
            <p class="hot">20点场</p>
            <ul class="row">
                <li v-for="(item,index) in hotList" :key="index">
                    <image :src="item.url" />
                    <span class="price">{{item.price}}</span>
                    <span>{{item.originalPrice}}</span>
                </li>
            </ul>
            <span class="line"></span>
        </section> -->
        <section class="panelbody section" :class="panelClass">
            <h4>活动列表
                <span @click="showMore" class="more">全部活动 ></span>
            </h4>
            <ul class="col">
                <li v-if="index<showList&&item.over_time>today" @click="actClick(item)" v-for="(item,index) in actList.data" :key="index">
                    <image :src="item.image" />
                    <div>
                        <h4 style="overflow:hidden;white-space: nowrap;text-overflow: ellipsis;">
                            {{item.title}}
                            <!-- <span>2.58km</span> -->
                        </h4>
                        <p>{{item.sell_point?item.sell_point:''}}</p>
                        <span class="join"><img src="../../../static/img/icon/join.png" alt="">{{item.now?item.now:0}}人参与</span>
                        <span class="visit"><img src="../../../static/img/icon/eye.png" alt="">{{item.read_count?item.read_count:0}}人浏览</span>
                        <span class="visit"><img src="../../../static/img/icon/location.png" alt="">320m</span>
                        <div  class="div-btn" >
                            <proGress :width="51" :num="item.shopping_num?item.shopping_num:0" :percent="item.percent?item.percent:0.00"></proGress>        
                            <btn v-if="item.percent<100&&item.over_time>today" @handle-click="joinClick(item)" text="我要报名"></btn>
                            <btn v-if="item.percent==100&&item.over_time>today"  text="名额已满"></btn>
                            <btn v-if="item.over_time<today" text="活动过期"></btn>
                        </div>
                    </div>
                </li>
            </ul>
           
        </section>
        </movable-area>
        <nav-bar act="home" :list="list"></nav-bar>
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
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
export default {
    onPullDownRefresh(){
        this.getActList()
    },
    onShareAppMessage: function () {
        return {
            title: '活动呗',
            desc: '',
            path: '/pages/home/main',
            //imageUrl:'../../../static/img/icon/add2.png'
        }
        
    },
    data() {
        return {
            today:new Date().getTime(),
            panelClass: "panel",
            userInfo: {},
            searchText: "",
            width: width,
            x:300,
            y:100,
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

    components: {
        topSlider,
        proGress,
        btn,
        topNav,
        navBar
    },
    onReachBottom(){
       this.showList = 1000;
    },
    methods: {
        goto(){
            
            let url = "../help/main";
            wx.navigateTo({ url: url });
        },
        changeM(e){
            console.log(e)
            this.x = e.x
            this.y = e.y
        },
        showMore() {
            let url = "../more/main";
            wx.navigateTo({ url: url });
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
                    ad_position_id: 1
                })
                .then(res => {
                    that.movies = res.data.adList;
                });
        },
        getNews() {
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
        getActList() {
            wx.showToast({ 
                title:'加载中', 
                icon:'loading', 
                mask:true 
            })
            //获取活动列表
            let that = this;
            util.request(api.actList).then(res => {
                that.actList = res;
                that.actList.data.map(item=>{
                    if(item.image.indexOf('[')>=0){
                        item.image = JSON.parse(item.image)[0]
                    }
                })
                wx.hideLoading()
                wx.stopPullDownRefresh()
            });
        },
    },
    onReady(){
        
    },
    onLoad() {
        this.gethomeSowingMap();
        let that = this;
        
        
        this.getActList();
        //that.getUserInfo()
        this.getNews();
        //that.getUserLocation();
        this.showList = "6";
        this.more = "6";
    },
    onShow(){
        this.getActList();
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
.nav-first2{
    margin-top: 72px !important;
}
.panelbody.section {
    padding-bottom: 65px !important;
}
.div-btn{
    margin-top:10px;
    height:25px;
    .progress{
        margin-top:12px;
    }
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
.help{
    border-radius: 50%;
    background: url('../../../static/img/icon/help3.png');
    //background-position:-2px 0px;
    background-size:100%;
    span{
        width: 100%;
        height: 100%;
        display: inline-block;
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
            width: 120px;
            height: 90px;
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
                    width: 80%;
                    letter-spacing: 1px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 11.5px;
                    line-height: 23px;
                    height: 23px;
                }
                .btn {
                    float: right;
                    border: none;
                    background: linear-gradient(to right, #fa3346, #f67f67);
                    font-weight: normal;
                }
                .join {
                    color: #a2a0a0;
                    font-size: 10px;
                    
                    background-position: 0px 1px;
                    background-repeat: no-repeat;
                    margin-right: 5px;
                    position: relative;
                    top: -3px;
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
    height: 32px;
    line-height: 32px;
    display: inline-block;
    width: 280px;
    vertical-align: middle;
    margin-left: 2px;
    color: #828181;
}
.panel {
    @include panel;
    .more {
        float: right;
        color: #999999;
        font-size: 12px;
    }
}
.hot-news {
    padding: 10px;
    padding-right: 0;
    display: inline-block;
    color: #cfcfcf;
    font-size: 12px;
    width: 95%;
}
.news-text {
    width:35px;
    display:inline-block;
    line-height:16px;
    font-family: "STHupo";
    background: -webkit-linear-gradient(top, #f67f67, #fa3346); /* 背景色渐变 */
    -webkit-background-clip: text; /* 规定背景的划分区域 */
    -webkit-text-fill-color: transparent;
    font-size: 14px;
    margin-right: 4px;
    border-right:1px solid #cfcfcf;
    vertical-align:middle;
}
.search-bar {
    .select-text {
        margin-left: 10px;
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
    background: #fff;
}
</style>
<style>
*{
    font-family: 'Microsoft YaHei';
    font-family: '微软雅黑'
}
</style>
