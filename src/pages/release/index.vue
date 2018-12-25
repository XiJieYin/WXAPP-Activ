<template>
    <div class="release-wrap">
        <div class="release-panel nav-first">
            <h3>选择需求</h3>
            <span>
                <checkBox @handle-change="change" :value="choose" :id="0" :list="boxList"></checkBox>
            </span>
        </div>
        <div class="release-panel">
            <h3>须知</h3>
            <span>
                <ul>
                    <li>尊敬的用户，活动趴EP信息平台，致力于提供一个公平公正、 性价比高的集采平台，本着诚信、互利、公开的原则，降低供应 商营销成本和消费者的采购成本，线上集采，线下实体交易，建 立商家消费者之间互动氛围。
                    </li>
                    <li>我们承诺：为了您的隐私以及我们的服务品质，对您填写的所 有资料将严格保密。如有任何疑问，可随时进入个人中心联系在 线客服。
                    </li>
                    <li>您可以将本集采平台转发给您的朋友，让他们一起参与集采， 一起享受便捷、优质、高效的生活。
                    </li>
                </ul>
                <btn cname="big-btn" @handle-click="nextClick" text="下一步"></btn>
            </span>
        </div>
    </div>
</template>

<script>
import navBar from "@/components/nav-bar";
import topNav from "@/components/nav";
import btn from "@/components/btn";
import checkBox from "@/components/checkbox";
import config from '../../utils/config';
import util from "../../utils/util.js";
import api from "../../utils/api.js";
export default {
    data() {
        return {
            navList:[
                {
                    text:'首页',
                    img:'../../static/img/icon/home.png',
                    url:'../home/main'
                },
                {
                    text:'分类',
                    img:'../../static/img/icon/category.png',
                    url:'../classify/main'
                },
                {
                    text:'发布',
                    img:'../../static/img/icon/selected-release.png',
                    url:'../release/main'
                },
                {
                    text:'发现',
                    img:'../../static/img/icon/release.png',
                    url:'../release/main'
                },
                {
                    text:'个人中心',
                    img:'../../static/img/icon/me.png',
                    url:'../me/main'
                },
            ],
            userInfo: {
                name: "调皮的小猪",
                info: "12345678910",
                state:0
            },
            choose:0,
            boxList: [
                {
                    text: "我是消费者（发布需求）"
                },
                {
                    text: "我是供应商（发布活动）"
                }
            ]
        };
    },

    components: {
        btn,
        topNav,
        checkBox,
        navBar
    },

    methods: {
        change(index){
            this.choose = index;
        },
        nextClick(){
            if(this.choose==1){
                if(this.userInfo.state==0||!this.userInfo.state){
                    wx.navigateTo({  url:'../register/main' })
                }else{
                    wx.navigateTo({  url:'../act/main' })
                }
            }else{
                wx.navigateTo({  url:'../consumer-release/main' })
            }
            //wx.navigateTo({  url:'../register/main' })
            //wx.hideTabBar()
            // wx.navigateTo({
            //     url:'../logs/index.vue'
            // })
        },
    },
    onLoad() {
        let that = this;
        util.request(api.info).then(res => {
            console.log(res)
            that.userInfo.state = res.data.state;
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
.release-wrap {
    background: #fff;
}
.release-panel {
    padding: 0px 11px;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    height: 100%;
    h3 {
        font-size: 15px;
        color: #333333;
        padding-top: 10px;
        margin-bottom: 10px;
        letter-spacing: 1px;
    }
    ul{
        line-height: 18px;
        list-style-type: disc;
        li{
            color: #999999;
            font-size: 12px;
            background: url('../../../static/img/icon/red.png');
            background-repeat: no-repeat;
            text-indent:12px;
            background-position:3px 6px;
        }
    }
}
.release-panel.nav-first {
    border-top: 1px solid #cbcbcb;
}
.release-panel+.release-panel{
    margin-top: 10px;
    h3{
        border-top:1px solid #f2f2f2;
    }
}
</style>
<style>
.big-btn{
    width: 100%;
    box-sizing:border-box;
    padding: 0px 8px;
    height: 45px;
    line-height: 45px;
    border-radius:5px;
    background: linear-gradient( #f67f67, #fa3346);
    margin-top: 18px;
}
</style>

