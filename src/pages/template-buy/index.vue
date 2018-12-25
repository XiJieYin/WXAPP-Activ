<template>
    <section class="temp-buy-wrap">
        <div class="temp-buy">
            <p>
                请选择活动时长
            </p>
            <dl>
                <dt v-if="cost==1||(cost==0&&item.cost>0)" v-for="(item,index) in list" :key="index" @click="imgClick(index)" :class="imgIndex==index?'img-checked':''">
                    <span class="temp-img-title">{{item.title}}</span>
                    <p>
                        <span>{{item.slogan}}</span>
                    </p>
                     <div>¥{{item.cost}}</div>
                </dt>
                <!-- <dt @click="imgClick(1)" :class="imgIndex=='1'?'img-checked':''">
                    <span class="temp-img-title">{{list[1].title}}</span>
                    <p>
                        {{list[1].duration_day}}次<span>{{list[1].slogan}}</span>
                    </p>
                     <div>¥{{list[1].cost}}</div>
                </dt> -->
            </dl>
        </div>
        <span class="btn-center">
            <span>*提交后，将在24小时内审核完毕。</span>
            <btn :width="296" @handle-click="submit" cname="big-btn" text="确认支付"></btn>
        </span>
        <span class="posi-tip">付款后若用户取消发布不予以退款</span>
    </section>
</template>

<script>
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
import topNav from "@/components/nav";
import btn from "@/components/btn";
import check from "@/components/check-box-normal";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import config from "../../utils/config.js";
import user from "../../service/user.js";
export default {
    data() {
        return {
            userInfo: {
                
            },
            imgIndex:1,
            list:[],
            itemId:'',
            choose_id:'',
            height:height,
            st:true,
            cost:0
        };
    },

    components: {
        btn,
        topNav,
        check
    },
    methods: {
        submit(){
            let that = this;
            if(!this.st){
                return;
            }else{
                this.st = false;
            }
            setTimeout(()=>{
                that.st = true
            },5000)
            console.log(1)
            let duration_id = that.imgIndex?that.list[1].durationId:that.list[0].durationId;
            let pic = that.list[that.imgIndex].cost
            util.request(api.duration,{
                duration_id:duration_id,
                itemId:that.itemId
            }).then(res => {
                let choose_id = res.data.choose_id;
        
                if(pic){
                    util.request(api.prepay2,{
                        choose_id:choose_id,
                    }).then(res => {
                        wx.requestPayment({
                            timeStamp: res.data['timeStamp'],
                            nonceStr: res.data['nonceStr'],
                            package: res.data['package'],
                            signType: 'MD5',
                            paySign: res.data['paySign'],
                            'success':function(successret){
                                console.log('支付成功');
                                util.request(api.query2,{
                                    chooseId:choose_id
                                }).then(res => {
                                    wx.showToast({
                                        title: '支付成功'
                                    });
                                    setTimeout(() => {
                                        wx.reLaunch({  url:'../me/main?id=1'})
                                    }, 500);
                                })
                            },
                            'fail':function(res){
                                
                            }
                        })
                    })
                }else{
                    wx.showToast({
                        title: '发布活动成功',
                        icon: 'success',
                    })
                    setTimeout(function(){
                        wx.reLaunch({  url:'../me/main?id=1'})
                    },500)
                }
                    
            })
        },
        imgClick(index){
            console.log(index)
            this.imgIndex = index;
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
    onLoad(config){
        let that = this;
        if(config.cost==2){
            this.cost = 1;
        }
        that.itemId = config.id;
        util.request(api.durationList).then(res => {
            that.list = res.data.durationList;
        })
    },
    created() {
        
        //console.log(wx);

        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>

<style scoped lang="scss">
.posi-tip{
    display: inline-block;
    font-size: 14px;
    width:100%;
    text-align:center;
}
.btn-center{
    display:inline-block;
    width:100%;
    text-align:center;
    span{
        margin-bottom: 5px;
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 12px;
    }
}
.temp-buy{
    padding: 20px 10px;
    dl{
        padding-left: 14px;
        
        dt{
            background: url('../../css/img/nav/uncheck-bg.png');
            background-repeat:no-repeat; 
            display: inline-block;
            width: 300px;
            height: 92px;
            background-size: 100%;
            margin-left: 12px;
            box-sizing: border-box;
            vertical-align: top;
            .temp-img-title{
                color: #ffffff;
                font-size: 10px;
                margin-top: 18px;
                display: inline-block;
                margin-left: 10px;

            }
            p{
                color: #fff;
                margin-top: 10px;
                font-size: 20px;
                text-align:center;
                span{
                    position: relative;
                    top:-3px;
                    display:inline-block;
                }
            }
            div{
                width: 119px;
                margin-top: 6px;
                color: #ffffff;
                font-size: 15px;
                text-align: center;
            }
        }
        dt.img-checked{
            background: url('../../css/img/nav/check-bg.png');
             background-repeat:no-repeat;
            background-size: 100%;
        }
    }
    p{
        color: #333333;
        font-size: 12px;
    }
}
</style>
<style>
.big-gray-btn{
    height: 45px;
    line-height: 45px;
    background: #ededed;
    color: #333;
    border-color: #ededed;
    margin: 0 auto;
}
.big-btn{
    width: 303px;
    box-sizing:border-box;
    padding: 0px 8px;
    height: 45px;
    line-height: 45px;
    border-radius:5px;
    background: linear-gradient( #f67f67, #fa3346);
    margin-bottom: 15px;
}
</style>

