<template>
    <section class="join-finish-wrap">
        <p  class="join-finish-text2">请在红色区域输入核销码</p>
        <div class="join-finish-code">
            <input maxlength="8" v-model="num" type="number">
        </div>
        <p  class="join-finish-text">注：以上串码为线下商家确保参团凭证，请勿告知他人</p>
        <span class="reg-btn">
            <btn :width="151" cname="big-btn" @handle-click="submit" text="完成"></btn>
        </span>
    </section>
</template>

<script>
import panel from "../../components/panel";
import topNav from "../../components/nav";
import btn from "@/components/btn";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
export default {
    data() {
        return {
            codeNum:'ANDJ1254DSJK',
            userInfo: {},
            optNum:0,
            num:'',
            orderId:'',
            id:'',
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
        submit(){
             util.request(api.check,{
                itemId:this.id,
                orderId:this.orderId,
                check:this.num
            }
            ).then(res => {
                debugger
                if(res.errno==0){
                     wx.showModal({
                        title: '成功',
                        content: '核销成功',
                        showCancel:false,
                        success(){
                            wx.redirectTo({  url:'../me/main?id=2' })
                        }
                    });
                }else{
                    wx.showModal({
                        title: '失败',
                        content: '核销失败',
                        showCancel:false,
                        success(){
                            //wx.redirectTo({  url:'../home/main' })
                        }
                    });
                }
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
    onLoad(config){
        this.id = config.id;
        this.orderId = config.orderId;
        console.log(config)
    },
    created() {
        //console.log(wx);

        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>
<style scoped lang="scss">
input{
    width: 100%;
    height: 100%;
    display: inline-block;
}
.join-finish-code{
    width: 287px;
    height: 92px;
    position: relative;
    left: 50%;
    margin-left: -143.5px;
    margin-top: 90px;
    background: #ffd4d4;
    color: #fa3b4a;
    font-size:24px;
    text-align: center;
    line-height: 92px;
    letter-spacing: 1px;
    border-radius: 2px;
}
.join-finish-text{
    font-size: 12px;
    color: #333;
    position: relative;
    width: 220px;
    left: 50%;
    margin-left: -110px;
    margin-top: 15px;
}
.join-finish-text2{
    font-size:24rpx;
    color:#333;
    position:absolute;
    width:440rpx;
    left:50%;
    margin-left:-67px;
    margin-top:0px;
    z-index:99999;
    top:62px;

}
.reg-btn{
    text-align: center;
    width: 100%;
    display: inline-block;
}
</style>

<style>
page{
     background: #fff;
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
    margin-top: 32.5px;
}
</style>

