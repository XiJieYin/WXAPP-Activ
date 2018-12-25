<template>
    <div class="seller">
        <section class="nav-first" :class="panelClass">
            <!-- <topSlider activeColor="#f85354" indicatorColor="#fff" :movies="movies"></topSlider> -->
            <image mode="widthFix" :src="movies" />
            <span class="seller-title" style="padding:0;height:0;">
                <span class="sller-opt sller-opt2">
                    <span class="share">
                        <button open-type='share' class="detail-share">
                            分享
                        </button>
                    </span>
                </span>
            </span>
            <span class="seller-title">
                <p>{{merchant_name}}</p>
                <ul>
                    <li v-for="(item,index) in star" :key="index" class="star"></li>
                    <li v-for="(item,index) in unStar" :key="index" class="unstar"></li>
                </ul>
                <span class="sller-mark">{{starNum}}</span>
                <!-- <span class="sller-opt">
                    <span @click="changeLike" :class="likeClass">
                        收藏
                    </span>
                </span>
                <span class="sller-opt sller-opt3">
                    <span @click="goToHome" class="home">
                        首页
                    </span>
                </span> -->
            </span>
            <span class="seller-address">
                <p  style="color:#888;">{{site}}</p>
                <span @click="showMap(site)" class="address-icon"></span>
                <span @click="call" class="phone-btn"></span>
            </span>
        </section>
        <section class="panelbody section p-40" :class="panelClass">
            <p class="seller-introduction">{{intro}}</p>
            <h4 class="none-border">正在进行</h4>
            <ul class="col">
                <li v-if="item.status==2||item.status==5||item.status==6" @click="actClick(item)" v-for="(item,index) in hotList.data" :key="index">
                    <image :src="item.image" />
                    <div>
                        <h4 style="overflow:hidden;white-space: nowrap;text-overflow: ellipsis;">
                            {{item.title}}
                            <!-- <span>2.58km</span> -->
                        </h4>
                        <p>{{item.desc}}</p>
                        <span class="join"><img src="../../../static/img/icon/join.png" alt="">{{item.now?item.now:0}}人参与</span>
                        <span class="visit"><img src="../../../static/img/icon/eye.png" alt="">{{item.read_count?item.read_count:0}}人游览</span>
                        <div class="div-btn">
                            <proGress :width="51" :num="item.now" :percent="item.percent"></proGress>
                            <btn @click="joinClick(item)" text="我要报名"></btn>
                        </div>
                    </div>
                </li>
            </ul> 
        </section>
         <div class="nav-bar">
            <ul>
                <li @click="goToHome('../home/main')">
                <img src="../../../static/img/icon/home.png" />
                <p>首页</p>
                </li>
                <li @click="changeLike">
                    <span :class="likeIcon"></span>
                    <p>收藏</p>
                </li> 
            </ul>
        </div>
    </div>
</template>

<script>
import topSlider from "@/components/slider";
import proGress from "@/components/proGress";
import topNav from "@/components/nav";
import btn from "@/components/btn";
import config from '../../utils/config';
import util from "../../utils/util.js";
import api from "../../utils/api.js";
export default {
    data() {
        return {
            panelClass: "panel",
            userInfo: {},
            sellerInfo:{
                title:'百特陶瓷韶关专卖店简介',
                mark:'4.6',
                like:false,
                address:'广东省韶关市浈江区金汇大道88号金金汇建材家居广场条铺12栋一楼',
                introduction:'百特陶瓷韶关专卖店成立于2016年，注册资金100万元人民币，公司主要经营百特陶瓷品牌旗下产品，包括地砖、防滑砖、墙砖、仿生态砖等。'
            },
            star:[],
            like:0,
            phone:'',
            unStar:[],
            movies: '',
            starNum: '',
            showList: "6",
            merchant_name:'',
            site:'',
            intro:'',
            merchantId:'',
            hotList: {
                data:''
            }
        };
    },
    computed:{
        likeIcon(){
            let cls = '';
            if(this.like){
                cls = 'like-icon'
            }else{
                cls = 'unlike-icon'
            }
            return cls;
        },
        likeClass(){
            let cls = '';
            if(this.like){
                cls = 'like'
            }else{
                cls  = 'unlike'
            }
            return cls
        }
    },
    components: {
        topSlider,
        proGress,
        btn,
        topNav
    },
    onLoad(config){
        this.init(config);
        this.showList = 6
    },
    onShareAppMessage: function () {
        return {
            title: '活动呗',
            desc: '',
            path: 'pages/seller/main?itemId='+this.itemId
        }
    },
    onReachBottom(){
       this.showList = 1000;
    },
    methods: {
        goToHome(){
            wx.redirectTo({  url:'../home/main' })
        },
        showMap(site){
            wx.showToast({ 
                title:'加载中', 
                icon:'loading', 
                mask:true 
            })
            wx.request({
                url: 'https://api.map.baidu.com/geocoder/v2/?address='+site+'&output=json&ak=CPz7EMTWvGNIPcxygaOtQ7AGRWXuVOPA&name='+site,
                data: {},
                header: {
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    //that.markers.latitude = res.data.result.location.lat
                    // that.latitude = res.data.result.location.lng
                // that.markers.longitude = res.data.result.location.lng
                    // that.longitude = res.data.result.location.lng
                    let url = '../map/main?lat='+res.data.result.location.lat+'&lng='+res.data.result.location.lng+'&name='+site;
                    wx.hideLoading()
                    wx.navigateTo({  url:url })
                },
                fail: function () {
                    //page.setData({ currentCity: "获取定位失败" });
                },
            })
        },
        call(){
            wx.makePhoneCall({
                phoneNumber:this.phone
            })
        },
        init(config){

            this.itemId = config.itemId;
            this.getDetail(config.itemId);
        },
        changeLike(){
            this.like = !this.like;
            util.request(api.careM,{
                merchantId:this.merchantId,
                merchant_type:this.like?1:0,
            }).then(res => {
                wx.showToast({
                    title: res.errmsg
                })
                console.log(res)
            })
            
        },
        actClick(item){
           let url = '../detail/main?itemId='+item.itemId;
           wx.navigateTo({  url:url })
        },
        bindRegionChange(e) {
            //console.log('picker发送选择改变，携带值为', e)
            this.region = e.target.value;
        },
        joinClick(item) {
          let url = '../join-act/main?itemId='+item.itemId;
           wx.navigateTo({  url:url })
        },
        handleSearch() {
            console.log(this.searchText);
        },
        getDetail(id){
            let that = this;
            util.request(api.detail,{
                itemId:id
            }).then(res => {
                that.phone =  res.data.merchant[0].phone
                that.movies  = res.data.merchant[0].image;
                that.merchantId  = res.data.merchant[0].merchantId;
                
                util.request(api.mean,{
                    merchantId:that.merchantId
                }).then(res => {
                    that.starNum = res.data
                    that.getStar(res.data);
                })
                that.getList();
                that.getMerchant(that.merchantId);
                that.intro  = res.data.merchant[0].intro?res.data.merchant[0].intro:'简介';
                that.merchant_name  = res.data.merchant[0].merchant_name?res.data.merchant[0].merchant_name:'简介';
                that.site  = res.data.merchant[0].site?res.data.merchant[0].site:'地址';
            })
        },
        getList(id){
            let that = this;
            util.request(api.actList,{
                merchant_id:that.merchantId
            }).then(res => {
                that.hotList = res
                that.hotList.data.map(item=>{
                    if(item.image.indexOf('[')>=0){
                        item.image = JSON.parse(item.image)[0]
                    }
                })
            })
        },
        getMerchant(id){
            let that = this;
            util.request(api.merchant,{
                merchantId:id
            }).then(res => {
                console.log(333)
                console.log(res)
                that.like = res.data.merchant_type;
            })
        },
        clickHandle(msg, ev) {
            console.log("clickHandle:", msg, ev);
        },
        getStar(data){
            this.star = Math.floor(data*1);
            this.unStar = Math.ceil(5 - this.star);
            let t =[];
            let y =[];
            for(var i =0;i<this.unStar;i++){
                t.push({});
            }
            this.unStar = t
            for(var i =0;i<this.star;i++){
                y.push({});
            }
            this.star = y

        }
    },
    created() {
        //console.log(wx);
        
        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>
<style lang="scss">
@import "../../css/element.scss";
.div-btn{
    margin-top:10px;
    height:25px;
    .progress{
        margin-top:12px;
    }
}
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
    z-index: 999999999999999999;
    ul{
        height: 100%;
        li{
            vertical-align: top;
            box-sizing: border-box;
            width: 50%;
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
.none-border{
    border: none !important;
}
.seller-introduction{
    color: #4c4c4c;
    font-size:14px;
    display: inline-block;
    width: 100%;
    padding: 13px 0px;
    padding-bottom: 0px;
    box-sizing: border-box;
    line-height: 15px;
    &::after{
        border-bottom: 1px solid #eeeeee;
        content: '';
        width: 100%;
        height: 1px;
        display: inline-block;
    }
}
.like-icon{
    background: url('../../../static/img/icon/like.png') no-repeat;
    width: 20px;
    background-size:100%;
    height: 19px;
    display: inline-block;
    margin-top:4px;
}
.unlike-icon{
    background: url('../../../static/img/icon/unlike.png') no-repeat;
    width: 20px;
    display:inline-block;
    background-size:100%; 
    height: 19px;
    margin-top:4px;
}
.seller-address{
    color: #666666;
    font-size:12px;
    padding-left:10px; 
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    position: relative;
    p{
        font-size:14px;
        width: 58%;
        line-height: 16px;
    }
    margin-bottom: 10px;
    .address-icon{
        width: 18.5px;
        height: 30px;
        position: absolute;
        right: 60px;
        top: -15px;
        background: url('../../../static/img/icon/address.png');
        background-size: 100%;
        background-repeat: no-repeat;
        background-position:0px 10px;
    }
    .phone-btn{
        width: 18.5px;
        height: 30px;
        position: absolute;
        right: 20px;
        top:-15px;
        background: url('../../../static/img/icon/line-phone.png');
        background-size: 100%;
        background-repeat: no-repeat;
        z-index: 999999;
        background-position:0px 12px;
    }
}
.sller-opt.sller-opt2{
    z-index:99;
    right:18px;
    top:25px;
    span{
        margin: 0px;
        width:50px;

    }
}
.sller-opt.sller-opt3{
    z-index:99;
    right:92.5px;
    top:8px;
}
.sller-opt{
    position: absolute;
    right: 50px;
    top:8px;
    span{
        display: inline-block;
        font-size: 12px;
        margin: 0px 13px;
        color: #666666;
        padding-top:30px;
    }
    .unlike{
        background: url('../../../static/img/icon/unlike.png');
        height: 21.5px;
        background-size:100%;
        background-repeat: no-repeat;  
    }
    .like{
        background: url('../../../static/img/icon/like.png');
        height: 21.5px;
        background-size:100%;
        background-repeat: no-repeat;  
    }
    .share{
        background: #fff;
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
    }
}
.home{
    background: url("../../../static/img/icon/home2.png") no-repeat;
    height: 21.5px;
    background-size:100%;
    background-repeat: no-repeat;   
}
.detail-share {
    position: absolute;
    right: -2px;
    color: #666;
    top: 0;
    font-size: 12px;
    background: url("../../../static/img/icon/share.png") no-repeat;
    background-size: 100%;
    line-height: 74px;
    padding:0;
    &::after{
    border: none;
    }
}
.seller-title{
    padding:10px 10px;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    width: 100%;
    &::after{
        border-bottom: 1px solid #eeeeee;
        content: '';
        width: 100%;
        height: 1px;
        display: inline-block;
    }
    p{
        margin-bottom: 8px;
        letter-spacing: 1px;
        font-size: 15px;
        color: #333;
    }
    ul{
        display: inline-block;
        margin-right: 4px;
    }
    .sller-mark{
        color: #f94e53;
        font-size: 11px;
        height: 14px;
        vertical-align: middle;
        display: inline-block
    }
}
.star{
    width: 13px;
    height: 13.5px;
    display: inline-block;
    background: url('../../../static/img/icon/start.png');
    background-repeat: no-repeat;
    background-size: 100%;
}
.unstar{
    width: 13px;
    height: 13.5px;
    display: inline-block;
    background: url('../../../static/img/icon/unstar.png');
    background-repeat: no-repeat;
    background-size: 100%;
}
.panel.panelbody{
    padding: 8px 10px;
    padding-bottom:0;
    .line{
        padding: 0px 10px;
        height: 1px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        border-bottom:1px solid #eeeeee;
        margin-top: 5px;
    }
    >h4{
        color: #333333;
        font-size: 11.5px;
    }
    ul.row{
        @include flex(row);
        justify-content: space-around;
        box-sizing: border-box;
        li{
            .price{
                position: absolute;
                bottom:22px;
                background: -webkit-linear-gradient(top, #f67f67 , #f84b5b);     /* 背景色渐变 */
                -webkit-background-clip: text;         /* 规定背景的划分区域 */
                -webkit-text-fill-color: transparent; 
                font-size: 12px;
                font-weight: 700
            }
            position: relative;
            width: 56px;
            image{
                border: 1px solid #ededed;
                height: 73px;
            }
            span{
                display: inline-block;
                color:#999;
                font-size: 10px;
                text-decoration: line-through;
                text-align: center;
                width: 100%;
            }
        }
    }
}
.p-40{
    padding-bottom: 50px!important;
}
.panelbody{
    padding-top: 0;
    margin-top: 10px;
     >h4{
        border-bottom:none;
        font-weight: bold;
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
.movies-list{
    height:20px;
    line-height: 20px;
    display:inline-block;
    width:280px;
    vertical-align:middle;
    margin-left: 2px;
    color: #828181
}
.panel {
  @include panel;
  margin-top: 10px;
  .more{
    float: right;
    color: #999999;
    font-size: 10px
  }
}
.search-bar {
    .select-text{
        margin-left: 15px;
        margin-right: 12px;
        font-size:14px;
        display: inline-block;
        line-height: 30px;
        vertical-align:top;
        span{
            content: '';
            display: inline-block;
            width: 11px;
            height: 6px;
            background: url('../../../static/img/icon/chevron-downIcon.png');
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
        }
    }
}
page{
     background: #f5f5f5;
}
</style>
