<template>
    <section class="join-act-wrap">
        <div class="nav-first attesta-bg">
            <ul class="attesta-lists">
                <li class="arrow">
                    <span class="picker">
                        <span>支付方式：</span><span style="font-weight: normal;">目前只支持到店支付</span>
                        </span>
                    <!-- <picker @change="onlinePickerChange" :value="onlineInx" :range="online">
                        
                    </picker> -->
                </li>
                <li class="arrow">
                    <span class="picker">
                        <span>配送方式：</span><span style="font-weight: normal;">目前只支持到店自提</span>
                        </span>
                    <!-- <picker @change="attrPickerChange" :value="attrInx" :range="attr">
                        
                    </picker> -->
                </li>
                <li class="arrow">
                    <span class="picker">
                        <span>活动关闭时间：</span><span style="font-weight: normal;">{{closeTime}}</span>
                        </span>
                    <!-- <picker @change="attrPickerChange" :value="attrInx" :range="attr">
                        
                    </picker> -->
                </li>
                <li class="arrow">
                    <span class="picker">
                        <span>支付状态：</span><span style="font-weight: normal;">未支付</span>
                        </span>
                    <!-- <picker @change="attrPickerChange" :value="attrInx" :range="attr">
                        
                    </picker> -->
                </li>
            </ul>
        </div>
        <dl class="join-act-list">
            <dt class="join-act-list-title">
                <img  width="21" height="21" :src="image" alt="" />
                <span>{{name}}</span>
            </dt>
            <dt class="join-act-list-content">
                <img :src="picture" alt="">
                <span>
                    <p style="color:#000000">{{title}}</p>
                    <p  style="color:#4c4c4c">{{sell_point}}</p>
                </span>
                <em class="red" style="color:#4c4c4c;text-align:right;">¥<b class="discounts">{{discounts_id}}</b>/<b class="zero">¥{{zero}}</b></em>
            </dt>
            <dt class="join-act-list-num">
                <span>购买数量</span>
                <span class="join-act-list-opt">
                    <span class="opt-reduce" @click="calculation(false)">-</span>
                    <input class="opt-num" type="number" v-model="optNum" />
                    <span class="opt-add" @click="calculation(true)">+</span>
                </span>
            </dt>
            <dt class="join-act-list-num">
                <span v-show="genre!=2">需到店支付金额</span>
                <span v-if="modified==2" v-show="genre!=2" class="join-act-list-amount mar6">
                    ¥{{(discounts_id-price*(optNum>0?optNum:1))*optNum>0?(discounts_id-price*(optNum>0?optNum:1))*optNum:0}}
                </span>
                <span  v-if="modified==1" v-show="genre!=2" class="join-act-list-amount mar6">
                    ¥{{discounts_id*optNum}}
                </span>
                <span v-if="genre==2" style="color:#309838">*下单后用户到店提货时，根据用户到店时活动当时的拼团情况进行活动金额的支付。</span>
            </dt>
        </dl>
        <dl class="join-act-list">
            <dt class="join-act-list-num2">
                <span class="margin-change">活动保证金</span>
                <span class="join-act-list-amount red">
                    ¥{{price*(optNum>0?optNum:1)}}
                </span>
                <span class="reg-btn">
                    <btn v-if="guarantee!=0" @handle-click="pay" cname="big-btn" text="微信支付"></btn>
                    <btn v-if="guarantee==0" @handle-click="pay" cname="big-btn" text="立即参与"></btn>
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
let padDate=function(va){
     va=va<10?'0'+va:va;
     return va
}
Date.prototype.format = function (format)   
{  
    /* 
     * eg:format="YYYY-MM-dd hh:mm:ss"; 
     */  
    var o =   
    {  
        "M+" : this.getMonth() + 1, // month  
        "d+" : this.getDate(), // day  
        "h+" : '00', // hour  
        "m+" : '00', // minute  
        "s+" : '00', // second  
        "q+" : Math.floor((this.getMonth() + 3)  / 3), // quarter  
        "S" : this.getMilliseconds() // millisecond  
    }  
    if (/(y+)/.test(format))   
    {  
        format = format.replace(RegExp.$1, (this.getFullYear() + "") .substr(4 - RegExp.$1.length));  
    }  
    for ( var k in o)   
    {  
        if (new RegExp("(" + k + ")").test(format))   
        {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  
    return format;  
}
Date.prototype.format2 = function (format)   
{  
    /* 
     * eg:format="YYYY-MM-dd hh:mm:ss"; 
     */  
    var o =   
    {  
        "M+" : this.getMonth() + 1, // month  
        "d+" : this.getDate(), // day  
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),    
        "q+" : Math.floor((this.getMonth() + 3)  / 3), // quarter  
        "S" : this.getMilliseconds() // millisecond  
    }  
    if (/(y+)/.test(format))   
    {  
        format = format.replace(RegExp.$1, (this.getFullYear() + "") .substr(4 - RegExp.$1.length));  
    }  
    for ( var k in o)   
    {  
        if (new RegExp("(" + k + ")").test(format))   
        {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  
    return format;  
}  
export default {
    data() {
        return {
            picture:'',
            st:true,
            title:'',
            discounts_id:'',
            closeTime:'',
            userInfo: {},
            optNum:1,
            name:'',
            genre:'',
            num:0,
            zero:'',
            price:'',
            modified:'',
            saveData:{
                
            },
            orderId:'',
            guarantee:'',
            sell_point:'',
            image:'',
            attrInx:0,
            shopping_num:0,
            onlineInx:0,
            itemId:'',
            online:[
                '到店支付',
                '在线支付',
            ],
            attr:[
                '到店自提',
                '送货上门',
            ]
        };
    },
    computed:{
        
    },
    components: {
        panel,
        topNav,
        btn
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
            return year+'-'+month+'-'+day+' 00:00:00';
        },
        formatDate2:function (val) {
            var value=new Date(val);
            var year=value.getFullYear();
            var month=padDate(value.getMonth()+1);
            var day=padDate(value.getDate());
            var hour=padDate(value.getHours());
            var minutes=padDate(value.getMinutes());
            var seconds=padDate(value.getSeconds());
            return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
        },
        getDetail(id){
            let that = this;
            util.request(api.detail,{
                itemId:id
            }).then(res => {
                
                that.shopping_num = res.data.item[0].shopping_num;
                that.num = res.data.item[0].num;
                that.genre = res.data.item[0].genre;
                console.log(res)
                
                that.name = res.data.merchant[0].merchant_name;
                that.image = res.data.merchant[0].image;
                that.title = res.data.item[0].title;
                that.sell_point = res.data.item[0].sell_point;
                that.zero = res.data.discounts[0].zero;
                if(res.data.item[0].now>res.data.discounts[0].two&&res.data.item[0].now<res.data.discounts[0].four){
                    that.discounts_id = res.data.discounts[0].one;
                }else if(res.data.item[0].now>res.data.discounts[0].four&&res.data.item[0].now<res.data.discounts[0].six&&res.data.discounts[0].six!=0&&res.data.discounts[0].four!=0){
                    that.discounts_id = res.data.discounts[0].three;
                }else if(res.data.item[0].now>res.data.discounts[0].six&&res.data.discounts[0].six!=0){
                    that.discounts_id = res.data.discounts[0].five;
                }else{
                    that.discounts_id = res.data.discounts[0].one
                }
                that.guarantee = res.data.item[0].guarantee?res.data.item[0].guarantee:0;
            });
        },
        attrPickerChange(e){
            this.attrInx=e.target.value
        },
        onlinePickerChange(e){
            this.onlineInx=e.target.value
        },
        calculation(state){
            if(state){
                if(this.saveData.residueNum===0){
                    this.optNum++
                }else if(this.saveData.residueNum>this.optNum){
                    this.optNum++
                }else{
                    wx.showToast({
                        title: '已到最大限购额度',
                        image: '../../static/img/icon/icon_error.png'
                    });
                }
            }else{
                if(this.optNum===1)return;
                this.optNum--
            }
        },
        getOrderId(id){
            let that = this;
            debugger
            util.request(api.orderAdd,{
                itemId:id
            }).then(res => {
                
                console.log(res)
                if(res.errno==1||res.code){
                    wx.showToast({ 
                        title:res.errmsg?res.errmsg:res.msg, 
                        icon:'loading', 
                        mask:true 
                    })
                    setTimeout(()=>{
                        wx.redirectTo({  url:'../home/main'})
                    },2000)
                } 
                that.modified =  res.data.modified;
                that.price =  res.data.price;
                that.orderId = res.data.orderId;
                that.saveData = res.data;
                debugger
                that.closeTime = this.formatDate(that.saveData.closeTime);
                that.picture = res.data.picture;
                if(that.picture.indexOf('[')>=0){
                    that.picture = JSON.parse(that.picture)[0]
                }
            });
        },
        save(){
            let that = this;
            if(!this.st){
                return;
            }else{
                this.st = false;
            }
            setTimeout(()=>{
                that.st = true
            },5000)
            this.saveData.paymentType = this.onlineInx===0?2:1;
            this.saveData.edition = '';
            this.saveData.payment = this.saveData.payment?this.saveData.payment:0;
            this.saveData.updateUser = '';
            var tD = new Date();
            this.saveData.closeTime = this.formatDate(this.saveData.closeTime)
            this.saveData.paymentTime = this.formatDate2(this.saveData.paymentTime);
            this.saveData.create_time = this.formatDate(tD);
            this.saveData.checkTime = this.formatDate(tD);
            debugger
            this.saveData.endTime = this.saveData.paymentTime
            this.saveData.update_time = '';
            this.saveData.payId = this.saveData.payId?this.saveData.payId:'';
            this.saveData.num = this.optNum;
            this.saveData.buyerNick = this.userInfo.nickName;
            this.saveData.itemSite = this.saveData.itemSite?this.saveData.itemSite:'';
            this.saveData.title = this.saveData.title?this.saveData.itemSite:'';
            this.saveData.now = this.saveData.now?this.saveData.itemSite:'';
            this.saveData.readCount = this.saveData.readCount?this.saveData.itemSite:'';
            console.log(this.saveData);
            this.saveData.share=this.saveData.share?this.saveData.share:''
            this.saveData.apply=this.saveData.apply?this.saveData.apply:''
            this.saveData.repertory=this.saveData.repertory?this.saveData.repertory:''
            this.saveData.shoppingNum=this.saveData.shoppingNum?this.saveData.shoppingNum:''
            this.saveData.payId=this.saveData.payId?this.saveData.payId:''
            this.saveData.updateUser=this.saveData.updateUser?this.saveData.updateUser:''
            this.saveData.percent=this.saveData.percent?this.saveData.percent:''
            util.request(api.addSave,this.saveData).then(res => {
                console.log(res);
                if(that.guarantee==0){
                    wx.showToast({
                        title: '参与成功'
                    });
                    setTimeout(() => {
                        wx.redirectTo({  url:'../home/main'})
                    }, 500);
                    return
                }
                util.request(api.prepay,{
                    orderId:that.orderId
                }).then(res => {
                    if(res.errno==0){
                        if(that.guarantee==0){
                            setTimeout(() => {
                                wx.redirectTo({  url:'../home/main'})
                            }, 500);
                        }else{
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
                        }
                    }else{
                        wx.showToast({
                            title: res.errmsg
                        });
                        setTimeout(() => {
                            wx.redirectTo({  url:'../home/main'})
                        }, 500);
                    }
                
            });
                //that.prepay();
            });
        },
        pay(){
            let that = this;
            if(this.num >= (this.shopping_num*1)+(this.optNum*1)){
                that.save();
                /* if(this.num == (this.shopping_num*1)+(this.optNum*1)){
                    util.request(api.itemOK,{
                        itemId:this.itemId
                    }).then(res => {
                    });
                } */
            }else{
                wx.showToast({
                    title: '库存不够',
                    image: '../../static/img/icon/icon_error.png'
                });
            }
            
        },
        prepay(){
            
        }
    },
    onLoad(config){
        let that = this;
        this.itemId = config.itemId;
        this.getOrderId(this.itemId);
        that.price = '';
        that.optNum = 1;
        this.getDetail(this.itemId);
        wx.getUserInfo({
            success: res => {
                console.log("用户信息");
                that.userInfo = res.userInfo;
                console.log(res)
                user.loginByWeixin(res).then(
                    function() {
                        if(that.login==1){
                            wx.navigateBack();
                        }else{
                            wx.switchTab({  url:'../home/main' })
                        }
                    },
                    function() {
                        console.log(4);
                    }
                );
            },
            fail() {
                console.log("用户信息失败");
            }
        });
    },
    onShow(){
         this.optNum
    },
    created() {
        //console.log(wx);

        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>
<style scoped lang="scss">
.picker{
    span{
        width: 110px;
    }
}
.arrow{
    position: relative;
    /* &:after{
        content: '';
        position: absolute;
        right: 20.5px;
        color: #dcdcdc;
        width: 20px;
        height: 31px;
        top:50%;
        margin-top:-8px;
        background: url('../../../static/img/icon/arrow.png');
        background-repeat:no-repeat;
        background-size:60%;  
    } */
}
.mar6{
    margin-top:6px;

}
.attesta-lists{
    padding-left: 24px;
    padding-right: 24px;
    li{
        height: 57px;
        width: 100%;
        border-bottom: 1px solid #dadada;
        span{
            height: 57px;
            line-height: 57px;
            display: inline-block;
            font-size: 12px;
            font-weight: bold;
            color: #333333;
        }
        input{
            font-size: 12px;
            font-weight: bold;
            display: inline-block;
            height: 57px;
            line-height: 57px;
            vertical-align: top;
            padding-left: 20px
        }
    }
    li:last-child{
        border-bottom: none;
    }
}
.attesta-bg{
    background: #fff;
    margin-bottom: 10px;
}
.reg-btn{
    display:inline-block;
    width:100%;
    text-align:center;
}
.margin-change{
    font-size: 18px !important;
    //margin-left: 20px;
}
.join-act-list{
    display: inline-block;
    width: 100%;
    min-height: 118px;
    background: #fff;
    box-sizing: border-box;
    padding-top:8.5px;
    padding-left: 24px; 
    padding-right: 24px;
    padding-bottom: 14.5px;
    .join-act-list-title{
        img{
            display: inline-block;
            width: 21px;
            height: 21px;
        }
        span{
            font-size: 13px;
            color: #333;
            //line-height: 21px;
            display:inline-block;
            vertical-align: middle;
            height: 21px;
            margin-left: 6px;
        }
    }
    .join-act-list-content{
        width: 100%;
        min-height: 104px;
        display: inline-block;
        background: #eeeeee;
        padding-top: 7px;
        padding-bottom: 7px;
        box-sizing: border-box;
        padding-left: 1px;
        position: relative;
        img{
            width: 120px;
            height: 90px;
            display: inline-block;
            border-radius: 4px;
        }
        span{
            display: inline-block;
            font-size: 12px;
            color: #333333;
            width: 190px;
            line-height: 15px;
            vertical-align: top;
            margin-top: 7.5px;
            margin-left: 10.5px;   
        }
        em{
            position: absolute;
            bottom: 0px;
            right: 10px;
        }
        p,em{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size:14px;
                margin-bottom: 5px;
                .discounts{
                    display: inline-block;
                    font-size: 16px;
                    margin-right: 4px;
                }
                .zero{
                    margin-left: 4px;
                    display: inline-block;
                    text-decoration: line-through;
                }
            }
    }
    .join-act-list-num{
        
        display: inline-block;
        height: 25px;
        width: 100%;
        margin-top: 12px;
        span{
            font-size: 12px;
            color: #333333;
            .red{
                font-size: 16px;
                color: #fa3a49;  
            }
        }
        .join-act-list-opt{
            float: right;
            span{
                 display: inline-block;
                 height: 25px;
                 line-height: 25px;
                 width: 25px;
                 background: #e5e5e5;
                 color: #999999;
                 text-align: center;
                 line-height: 25px;
                 border-radius: 3px;
            }
            .opt-num{
                display: inline-block;
                vertical-align:top;
                min-height: 0px;
                height: 25px;
                line-height: 25px;
                width: 30px;
                margin: 0 5px;
                background: #e5e5e5;
                text-align: center;
                border-radius: 3px;
                color: #333333;
                font-size: 12px;
            }
            span+span{
                margin-left: 2.5px;
            }
        }
        .join-act-list-amount{
            float: right;
            margin-right: 22px;
            
        }
        .red{
            font-size: 16px;
            color: #fa3a49;
            margin-right: 0px;
        }
    }  
    .join-act-list-num2{
        .margin-change{
            font-size: 16px !important;
            //margin-left: 20px;
        }
        display: inline-block;
        height: 25px;
        width: 100%;
        margin-top: 12px;
        span{
            font-size: 12px;
            color: #333333;
            .red{
                font-size: 16px;
                color: #fa3a49;  
            }
        }
        .join-act-list-opt{
            float: right;
            span{
                 display: inline-block;
                 height: 25px;
                 line-height: 25px;
                 width: 25px;
                 background: #e5e5e5;
                 color: #999999;
                 text-align: center;
                 line-height: 25px;
                 border-radius: 3px;
            }
            .opt-num{
                display: inline-block;
                vertical-align:top;
                min-height: 0px;
                height: 25px;
                line-height: 25px;
                width: 30px;
                margin: 0 5px;
                background: #e5e5e5;
                text-align: center;
                border-radius: 3px;
                color: #333333;
                font-size: 12px;
            }
            span+span{
                margin-left: 2.5px;
            }
        }
        .join-act-list-amount{
            float: right;
            margin-right: 22px;
            
        }
        .red{
            font-size: 16px;
            color: #fa3a49;
            margin-right: 0px;
        }
    }  
}
.join-act-list+.join-act-list{
    margin-top: 10px;
}

</style>

<style>
page{
     background: #efeff4;
}
.big-btn{
    width: 100%;
    box-sizing:border-box;
    padding: 0px 8px;
    height: 45px;
    line-height: 45px;
    border-radius:5px;
    background: linear-gradient( #f67f67, #fa3346);
    margin-bottom: 22.5px;
    margin-top: 15px;
}
</style>

