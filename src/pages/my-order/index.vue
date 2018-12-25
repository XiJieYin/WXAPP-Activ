<template>
    <section class="order-wrap">
        <div v-if="showModel" @click="bgClick" class="bg"></div>
        <ul class="swiper-tab">
            <li :class="[swiperTabList,currentTab==0?'on':'']" data-current="0" @click="swichNav(0)">
                <span>全部</span>
            </li>
            <li :class="[swiperTabList,currentTab==1?'on':'']" data-current="1" @click="swichNav(1)">
                <span>未付款</span>
            </li>
            <li :class="[swiperTabList,currentTab==2?'on':'']" data-current="2" @click="swichNav(2)">
                <span>已报名</span>
            </li>
            <li :class="[swiperTabList,currentTab==3?'on':'']" data-current="3" @click="swichNav(3)">
                <span>活动结束</span>
            </li>
        </ul>
        <div style="height:100%;">
            <span v-if="items.length==0" class="no-data"></span>
            <ul class="release-lists"> 
                <li v-if="currentTab==0?true:status==item.status" :class="showDetail===index?'seleted':''" @click="goToPay(item,index)" v-for="(item, index) in items" :key="index">
                    <image :src="item.picture" />
                    <div>
                        <h4>
                            {{item.title}}
                            <!-- <span>2.58km</span> -->
                        </h4>
                        <p>{{item.sellPoint?item.sellPoint:''}}</p>
                        <!-- <proGress :width="51" :num="item.shopping_num?item.shopping_num:0" :percent="item.percent?item.percent:0.00"></proGress> -->
                        <div style="position:relative">
                            <span class="pay-cash">参与活动保证金：¥ <span class="price">{{item.price}}</span></span>
                            <!-- <span class="join">{{item.now?item.now:0}}人参与</span>
                            <span class="visit">{{item.read_count?item.read_count:0}}人游览</span> -->
                            <div class="big-btn-div">
                                <btn @handle-click="pay(item)" :width="80" cname="big-btn" :text="text(item)"></btn>
                                <btn v-if="(item.status==2||item.status==3)&&!item.modified" @handle-click="check(item)" :width="80" cname="big-btn2" text="到店核销"></btn>
                                <btn v-if="item.status==1" @handle-click="cancelPay(item)" :width="80" cname="big-btn2" text="取消订单"></btn>
                                <btn v-if="item.modified==1" @handle-click="showModels(item)" :width="80" cname="big-btn2" text="评价"></btn>
                                <btn v-if="item.modified==2" :width="80" cname="big-btn2" text="已评价"></btn>
                            </div>
                        </div>
                    </div>
                    <section v-if="showDetail===index">
                            <h4>订单详情</h4>
                            <span>
                                订单号<span>{{orderId}}</span>
                            </span>
                            <span>
                                市场价格<span>{{zero}}</span> 
                            </span>
                            <span>
                                活动价格<span>{{payment}}</span> 
                            </span>
                            <span>
                                购买数量<span>{{num}}</span>
                            </span>
                            
                            <span>
                                参与活动保证金<span>{{price}}</span> 
                            </span>
                            <span>
                                配送方式<span>{{goods_desc}}</span> 
                            </span>
                            <span>
                                活动结束日期<span>{{closeTime}}</span> 
                            </span>
                            <span>
                                最晚到店核销日期<span>{{checkTime}}</span> 
                            </span>
                            <span>
                                支付状态<span>{{stus}}</span> 
                            </span>
                            <span v-if="item.status==1">
                                支付倒计时<span>{{minutes}}:{{seconds}}</span>  
                            </span>
                            <span  v-if="item.status==1">
                                *支付流程为下单后30分钟以内（超过30分钟将不能支付）。
                            </span>
                            <btn  @handle-click="goToDetail(item)" :width="80" cname="big-btn3" text="活动详情"></btn>
                        </section>
                </li>
            </ul>
            <div v-if="showModel" class="model-text">
                <div class="title">评价</div>
                <ul>
                    <li v-for="(item,inx) in startList" :key="inx" @click="starClick(item,inx)" :class="[item.val?'star':'unstar']"></li>
                </ul>
                <span @click="cancelModel" style="left:0">取消</span>
                <span  @click="okModel">确认</span>
            </div>
        </div>
    </section>
</template>

<script>
import panel from "../../components/panel";
import topNav from "../../components/nav";
import proGress from "@/components/proGress";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import btn from "@/components/btn";
import user from "../../service/user.js";
let padDate=function(va){
     va=va<10?'0'+va:va;
     return va
}
export default {
    data() {
        return {
            status:'',
            duration: 1000,
            currentTab:0,
            autoplay: false,
            showModel: false,
            indicatorDots: false,
            userInfo: {},
            showDetail:'',
            orderDetail:'',
            inx: false,
            zero: '',
            num: '',
            payment: '',
            goods_desc: '',
            closeTime: '',
            stus: '',
            startList:[
                {
                    val:false,
                },
                {
                    val:false,
                },
                {
                    val:false,
                },
                {
                    val:false,
                },
                {
                    val:false,
                },
            ],
            minutes:'00',
            seconds:'00',
            price: '',
            orderId: '',
            checkTime: '',
            items:[],
            orderList: [
                {
                    name: "全部"
                },
                {
                    name: "待成团"
                },
                {
                    name: "已成团"
                },
                {
                    name: "活动结束"
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
        panel,
        topNav,
        btn,
        proGress
    },
    methods: {
        starClick(item,inx){
            this.startList.map((item,ix)=>{
                if(ix<=inx){
                    item.val = true;
                }else{
                    item.val = false;

                }
            })
        },
        okModel(){
            let t =0;
            let that = this;
            this.startList.map((item,ix)=>{
                if(item.val){
                    t++;
                }
            })
            util.request(api.grade,{
                orderId:this.starItem.orderId,
                merchantId:this.starItem.merchantId,
                itemId:this.starItem.itemId,
                grade:t,
            }).then(res => {
                that.showModel = false;
                 wx.showToast({
                    title: '评论成功'
                });
                 that.swichNav(that.currentTab)
            })

        },
        showModels(item){
            this.starItem = item;
            this.startList = [
                {
                    val:false,
                },
                {
                    val:false,
                },
                {
                    val:false,
                },
                {
                    val:false,
                },
                {
                    val:false,
                },
            ]
            this.showModel = true;

        },
        bgClick(){
            this.showModel = false;

        },
        cancelModel(){
            this.showModel = false;

        },
        goToDetail(item){
            debugger
            wx.navigateTo({  url:'../detail/main?itemId='+item.itemId })
        },
        formatDate:function (val) {
            var value=new Date(val);
            var year=value.getFullYear();
            var month=padDate(value.getMonth()+1);
            var day=padDate(value.getDate());
            var hour=padDate(value.getHours());
            var minutes=padDate(value.getMinutes());
            var seconds=padDate(value.getSeconds());
            debugger
            return year+'-'+month+'-'+day;
        },
        getTime(time){
            let t = time;
            if(t<0){
                this.minutes = '00';
                this.seconds = '00';
                this.btn = false;
                return;
            }
            this.minutes = parseInt(t / 1000 / 60 % 60, 10);//计算剩余的分钟 
            this.seconds = parseInt(t / 1000 % 60, 10);//计算剩余的秒数 
            this.m = setInterval(()=>{
                if(this.seconds == 0){
                    this.seconds = 59;
                    if(this.minutes==0){
                        this.minutes = '00';
                    }else{
                        this.minutes = this.minutes-1;
                    }
                }else{
                    this.seconds = this.seconds-1;
                }
                if(this.seconds==0&&this.minutes ==0){
                    this.minutes = '00';
                    this.seconds = '00';
                    this.btn = false;
                    clearInterval(this.m);
                }
            },1000)
            let that = this;
        },
        check(item){
            wx.navigateTo({  url:'../join-finish/main?id='+item.itemId+'&orderId='+item.orderId })
        },
        cancelPay(item){
            let that = this
            util.request(api.cancel,{
                orderId:item.orderId
            }).then(res => {
                wx.showToast({
                    title: '取消成功'
                });
                that.items = []
                that.getList(0,false)
            })
        },
        pay(item){
            let that = this;
            if(item.status!=1){
                return;
            }
            util.request(api.prepay,{
                orderId:item.orderId
            }).then(res => {
                if(res.errno==0){
                    wx.requestPayment({                
                        timeStamp: res.data['timeStamp'],
                        nonceStr: res.data['nonceStr'],
                        package: res.data['package'],
                        signType: 'MD5',
                        paySign: res.data['paySign'],
                        'success':function(successret){
                            util.request(api.query,{
                                orderId:that.orderId
                            }).then(res => {
                                wx.showToast({
                                    title: '支付成功'
                                });
                                setTimeout(() => {
                                    wx.redirectTo({  url:'../home/main'})
                                }, 500);
                            })
                        }
                    })
                }else if(res.errno==1){
                    wx.showToast({
                        title: res.errmsg
                    });
                }
            });
        },
        goToPay(item,index){
            debugger
            console.log(item);
            let that = this;
            if(this.showDetail !== index){
                this.showDetail = index;

            }else{
                this.showDetail = '';
            }
            //wx.navigateTo({  url:'../order/main?id='+ item.order_id})
            util.request(api.orderDetail,{
                orderId:item.orderId
            }
            ).then(res => {
                
                that.zero= res.data.zero;
                that.num= res.data.num;
                that.payment= res.data.payment;
                that.orderId= res.data.orderId;
                that.goods_desc= res.data.goods_desc;
                that.price= res.data.price;
                that.closeTime= that.formatDate(res.data.closeTime);
                if(res.data.checkTime){
                    that.checkTime= that.formatDate(res.data.checkTime);
                }
                if(res.data.status==1){
                    
                    that.getTime(1800000-(new Date().getTime()-res.data.paymentTime));
                }
                that.stus= that.text(res.data);
            });
        },
        text(item){
            let obj = {
                1:'未付款',
                2:'已付款',
                3:'活动结束',
                4:'付款中',
                5:'已取消',
                6:'已成团',
            }
            return obj[item.status]
        },
        swichNav: function(index) {
            var that = this;
            this.status = index;
            this.getList(index,false);
            if (this.currentTab === index) {
                return false;
            } else {
                that.currentTab=index;
            }
        },
        /**
         * 滑动切换tab
         */
        bindChange(e) {
            var that = this;
            console.log(e)
           that.currentTab= e.target.current;
        },
        getList(inx,sta){
            wx.showToast({ 
                title:'加载中', 
                icon:'loading', 
                mask:true 
            })
            let that = this;
            this.inx = inx
            util.request(api.orderList).then(res => {
                console.log(111)
                console.log(res)
                res.data.map(item=>{
                    if(item.picture.indexOf('[')>=0){
                        item.picture  = JSON.parse(item.picture)[0];
                    }
                })
                that.items = res.data;
                that.items.map(item=>{
                    i/* f(item.status==5){
                        item.status = 3;
                    } */
                })
                wx.stopPullDownRefresh();
                wx.hideLoading();
            })
        },
        getUserInfo() {
            // 调用登录接口
            wx.login({
                success: () => {
                    wx.getUserInfo({
                        success: res => {
                            this.userInfo = res.userInfo;
                            console.log(this.userInfo);
                        },
                        fail() {}
                    });
                }
            });
        }
    },
   /*  onReachBottom(){
        if(this.inx!==false){
            this.getList(this.inx,true);

        }
    },
     onPullDownRefresh(){
        this.swichNav(this.status);
        this.showDetail = '';
        this.items = [];
    }, */
    onLoad(){
        this.swichNav(0);
        this.showDetail = '';
        this.showModel = false;
        this.items = [];
        //this.getList(0)
    },
    onShow(){
    },
    created() {
        //console.log(wx);

        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>

<style scoped lang="scss">
.bg{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.6;
    z-index:99;
}
@import "../../css/element.scss";
.star{
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url('../../../static/img/icon/start.png');
    background-repeat: no-repeat;
    background-size: 100%;
    margin-right: 10px
}
.unstar{
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url('../../../static/img/icon/unstar.png');
    background-repeat: no-repeat;
    background-size: 100%;
    margin-right: 10px
}
.model-text{
    ul{
        margin: 0 auto;
        text-align:center;
        margin-top: 20px;
    }
    position: absolute;
    top: 100px;
    width: 300px;
    height: 150px;
    background: #fff;
    border-radius: 5px;
    left: 50%;
    margin-left: -150px;
    box-sizing: border-box;
    padding: 10px;
    z-index: 99999;
    .title{
        height: 20px;
        font-size: 14px;
    }
    .model-textarea{
        width: 100%;
        height: 80px;
        border: 1px solid #949391;
        font-size: 14px;
        border-radius:5px;
        line-height: 16px; 
    }
    span{
        position: absolute;
        bottom: 0px;
        width:150px !important;
        border-top: 1px solid #949391;
        height: 40px;
        line-height: 40px;
        padding: 0px!important;
        text-align: center !important;
    }
    span+span{
        right: 0px;
        border-left: 1px solid #949391;
    }
}
ul.release-lists {
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
    li.seleted{
        height:auto;
    }
    section{
        padding-top: 10px;
        margin-top: 10px;
        border-top: 0.5px solid #c1c1c1;
        display: inline-block;
        width: 100%;
        h4{
            font-size: 14px;
            margin-left: 4px;
            border-left: 1px solid red;
            padding-left: 4px;
            margin-bottom: 10px;
            
        }
        >span{
            line-height: 26px;
            display: inline-block;
            width: 100%;
            font-size: 14px;
            color: #999999;
            box-sizing: border-box;
            padding-left: 9px;
            >span{
                padding-left: 10px;
                color: #333;
                width:auto;
            }
        }
    }
    li {
        padding-left: 5px;
        padding-right: 5px;
        display: inline-block;
        height: 114px;
        border-bottom: 1px solid #f7f7f7;
        box-sizing: border-box;
        padding-top: 10px;
        > div {
            display: inline-block;
            width: 60%;
            h4 {
                font-size: 16px;
                position: relative;
                overflow: hidden;
                //white-space: nowrap;
                text-overflow: ellipsis;
                height: 32px;
            overflow: hidden;
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
                background: url("../../../static/img/icon/join.png");
                background-position: 0px 1px;
                background-repeat: no-repeat;
                padding-left: 15px;
                margin-right: 10px;
                position: relative;
                top: 6px;
            }
            .pay-cash{
                color: #333;
                font-size: 12px;
                margin-right: 10px;
                position: relative;
                span{
                    margin-left: 5px;
                    font-size: 15px;
                }
            }
            .visit {
                color: #a2a0a0;
                font-size: 10px;
                background: url("../../../static/img/icon/eye.png");
                background-position: 0px 1px;
                background-repeat: no-repeat;
                padding-left: 15px;
                position: relative;
                top: 6px;
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
    height: 165px;
    
    box-sizing: border-box;
    background: #fff;
    padding:12px 9px 16px 9px;
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
        background: #eeeeee;
        box-sizing: border-box;
        padding-right: 14px;
        padding-top: 7px;
        padding-bottom: 7px;

        span{
            width: 210px;
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            margin-left: 10px;
            margin-top: 7px;
        }
        img{
            width: 100px;
            height: 100px;
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
.big-btn-div{
    position: absolute;
    top:36px;
    left:0;
}
.btn+.btn{
    margin-left: 20px;
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
.big-btn2{
    border:1px solid #ccc;
    background: #fff;
    color:#666;
    font-weight: normal;
}
.big-btn{
    font-weight: normal;
}
.big-btn3{
    margin-left:8px;
    margin-bottom:10px;
    border:1px solid #ccc;
    background: #fff;
    color:#666;
    font-weight: normal!important;
}
</style>

