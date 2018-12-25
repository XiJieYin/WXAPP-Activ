<template>
    <section class="consumer-release-wrap">
        <dl class="release-edit">
             <dt>
                <span>{{order.merchantName}}</span>
            </dt>
             <dt class="pictrue">
                <img :src="order.picture" alt="">
                <span style="width:77%;vertical-align:top;">
                    <span>{{itemsTitle}}</span>
                    <span style="color:#999">{{sell_point}}</span>
                </span>
            </dt>
            <dt>
                <span>购买数量</span>
                <span class="key">{{order.num}}</span>
            </dt>
            <dt>
                <span>市场价</span>
                <span class="key">{{order.zero}}</span>
            </dt>
            <dt>
                <span>活动价</span>
                <span class="key">{{discounts_id?discounts_id:0}}</span>
            </dt>
            <dt>
                <span>参与活动保证金</span>
                <span class="key">{{order.price}}</span>
            </dt>
            <dt>
                <span>配送方式</span>
                <span class="key">到店自提</span>
            </dt>
            <dt>
                <span>活动关闭时间</span>
                <span class="key">{{close_time}}</span>
            </dt>
            <dt>
                <span>支付状态</span>
                <span class="key">{{status}}</span>
            </dt>
            <dt>
                <span>支付倒计时</span>
                <span class="key">{{minutes}}:{{seconds}}</span>
            </dt>
            <dt>
                <p>
                    *支付流程为下单后30分钟以内（超过30分钟将不能支付）。
                </p>
            </dt>
        </dl>
        <dl class="join-act-list" v-if="order.status==1">
            <dt class="join-act-list-num">
                <span class="reg-btn">
                    <btn :width="333" @handle-click="pay" cname="big-btn" text="微信支付"></btn>
                </span>
            </dt>
        </dl>
        <dl class="join-act-list" v-if="order.status==2">
            <dt class="join-act-list-num">
                <span class="reg-btn">
                    <btn :width="333" @handle-click="check" cname="big-btn" text="到店核销"></btn>
                </span>
            </dt>
        </dl>
    </section>
</template>

<script>
import panel from "../../components/panel";
import topNav from "../../components/nav";
import btn from "@/components/btn";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import user from "../../service/user.js";
import mpvuePicker from 'mpvue-picker';
export default {
    data() {
        return {
            orderId:'',
            minutes:'',
            seconds:'',
            order:'',
            status:'',
            close_time:'',
            itemId:'',
            itemsTitle:'',
            sell_point:'',
            items:'',
            discounts_id:'',
            m:'',
            btn:true
        };
    },
    computed: {},
    components: {
        panel,
        topNav,
        btn,
        mpvuePicker
    },
    methods: {
        check(){
            wx.navigateTo({  url:'../join-finish/main?id='+this.itemId+'&orderId='+this.orderId })
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
        pay(id){
            let that = this;
            util.request(api.prepay,{
                orderId:this.orderId
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
        getOrderDetail(){
            let that = this;
            util.request(api.orderDetail,{
                orderId:this.orderId
            }
            ).then(res => {
                that.order= res.data;
                that.itemId= res.data.itemId;
                if(that.order.picture.indexOf('[')>=0){
                    that.order.picture = JSON.parse(that.order.picture)[0]
                }
                    console.log(1111111)
                    that.close_time = that.dateFtt("yyyy-MM-dd",new Date(that.order.closeTime));
                    console.log(that.close_time)
                if(that.order.status==1){
                    that.status = '未付款'
                }else if(that.order.status==2){
                    that.status = '已付款'
                }else if(that.order.status==3){
                    that.status = '活动结束'
                }
                that.getTime(1800000-(new Date().getTime()-res.data.paymentTime))
                that.getitemDetail();
            });
        },
        getitemDetail(){
            let that = this;
            util.request(api.detail,{
                itemId:this.itemId
            }
            ).then(res => {
                that.items = res.data;
                that.itemsTitle = res.data.item[0].title;
                that.sell_point = res.data.item[0].sellPoint;
                if(res.data.item[0].now>res.data.discounts[0].two&&res.data.item[0].now<res.data.discounts[0].four){
                    that.discounts_id = res.data.discounts[0].one;
                }else if(res.data.item[0].now>res.data.discounts[0].four&&res.data.item[0].now<res.data.discounts[0].six){
                    that.discounts_id = res.data.discounts[0].three;
                }else if(res.data.item[0].now>res.data.discounts[0].six){
                    that.discounts_id = res.data.discounts[0].five;
                }else{
                    that.discounts_id = res.data.discounts[0].zero
                }
                console.log(22)
            });
        },
        
        init(){
            this.getOrderDetail();
        },
        dateFtt(fmt,date)   
        { //author: meizz   
        var o = {   
            "M+" : date.getMonth()+1,                 //月份   
            "d+" : date.getDate(),                    //日   
            "h+" : date.getHours(),                   //小时   
            "m+" : date.getMinutes(),                 //分   
            "s+" : date.getSeconds(),                 //秒   
            "q+" : Math.floor((date.getMonth()+3)/3), //季度   
            "S"  : date.getMilliseconds()             //毫秒   
        };   
        if(/(y+)/.test(fmt))   
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
        for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
        return fmt;   
        } 
    },
    onLoad(config){
        console.log('load')
        console.log(config)
        this.orderId = config.id;
        clearInterval(this.m);
        this.init();
    },
    onShow(config){
        console.log('show')
        console.log(config)
    },
    created() {
        //console.log(wx);
        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>
<style>
.big-btn {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 8px;
    height: 45px;
    line-height: 45px;
    border-radius: 5px;
    background: linear-gradient(#f67f67, #fa3346);
    margin-bottom: 17.5px;
}
</style>
<style scoped lang="scss">
.pictrue{
    padding: 10px 0px;
    >span{
        display:inline-block;
        line-height: 24px;
        span{
            display: block;
        }
    }
    img{
        width: 55px !important;
        height: 55px !important;
    }
}
.join-act-list{
    text-align:center;
}
.key{
    margin-left: 10px;
    color: #999 !important;
}
.release-edit dt:last-child {
    border-bottom-color: transparent;
}
.release-edit {
    background: #fefefe;
    padding: 0 25px;
    margin-bottom: 10px;
    >dt.release-name{
        height: 88.5px;
        .release-radio{
            display: inline-block;
            width: 100%;
            height: 30px;
            span{
                line-height: 30px;
                float:left;
                padding-left: 40px;
                background: url('../../../static/img/icon/unradio.png') no-repeat;
                background-size:45%;
                margin-left: 45px;
            }
            span.check-radio{
                background: url('../../../static/img/icon/radio.png') no-repeat;
                background-size:45%;
            }
        }
    }
    > dt {
        min-height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #e5e5e5;
        .add-btn-project {
            border: 1px dashed #d9d9d9;
            height: 35px;
            display: inline-block;
            line-height: 35px;
            width: 303.5px;
            color: #999999;
            font-size: 12px;
            text-align: center;
            font-weight: normal;
            margin-top: 8px;
            border-radius: 8px;
            img {
                margin-right: 0px;
                margin-top: -4px;
            }
        }
        span.act-edit-title {
            color: #333;
            font-weight: bold;
            width: 100%;
            display: inline-block;
            .check-box {
                margin-top: -1px;
            }
        }
        span {
            font-size: 12px;
            color: #333333;
            font-weight: bold;
        }
        .text-date {
            display: inline-block;
            font-size: 12px;
            vertical-align: middle;
            color: #333;
            margin-left: 20px;
        }
        img {
            width: 14.5px;
            height: 16.5px;
            vertical-align: middle;
            margin-left: 12px;
            margin-right: 6.5px;
        }
        p {
            width: 91%;
            margin: 0 auto;
            margin-bottom: 12px;
            margin-top: 15px;
            color: #928f8f;
            span {
                color: #616060;
                font-weight: normal;
            }
            position: relative;
            text-align: left;
            font-size: 12px;
            line-height: 15px;
            img {
                position: absolute;
                left: -18px;
                top: 4px;
                margin-left: 0;
                margin-right: 0;
                width: 13px;
                height: 13px;
            }
        }
        input::-webkit-input-placeholder {
            font-weight: bold;
        }
        input:-ms-input-placeholder {
            // IE10+
            font-weight: bold;
        }
        input:-moz-placeholder {
            // Firefox4-18
            font-weight: bold;
        }
        input::-moz-placeholder {
            // Firefox19+
            font-weight: bold;
        }
        input {
            display: inline-block;
            font-size: 12px;
            vertical-align: middle;
            color: #999;
            margin-left: 20px;
            width: 230px;
        }
        .sendCode {
            font-size: 11px;
            color: #999;
            float: right;
            padding-right: 26px;
        }
    }
    > dt.edit-title {
        line-height: 45px;
        min-height: 45px;
    }
    > dt.small {
        line-height: 30px;
        min-height: 30px;
        border-bottom: none;
        position: relative;
        &:after {
            content: "";
            width: 265px;
            height: 1px;
            background: #dadada;
            position: absolute;
            right: 7.5px;
            bottom: 0px;
        }
    }
    > dt.normal {
        line-height: 34px;
        min-height: 34px;
    }
}
.text-dec {
    display: inline-block;
    width: 100%;
    min-height: 184px;
    margin-top: 9px;
    background: #fefefe;
    box-sizing: border-box;
    padding: 10px 15px;
    p {
        font-size: 12px;
        color: #333;
    }
}
textarea {
    font-size: 12px;
    margin-top: 15px;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
}
</style>

<style>
page {
    background: #efeff4;
}

.consumer-release-list span {
    display: none;
}
.consumer-release-list ul li {
    font-size: 14px;
    color: #2e2e2e;
    font-weight: normal;
}
</style>

