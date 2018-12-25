<template>
    <div>
        <div class="user-nav" :style="style">
            <span class="user-info">
                <button id="login-user" style="padding:0;background:#333;" open-type="getUserInfo" class="user-photo" @getuserinfo="bindGetUserInfo"><image class="user-photo" :src="userInfo.avatarUrl"  /></button>
                
                <span>
                    <p class="user-name">{{userInfo.nickName}}</p>
                    <!-- <p class="user-id">{{userInfo.info}}</p> -->
                </span>
            </span>
            <!-- <span class="user-points">
                <p>0</p>
                <span>积分</span>
            </span> -->
            <!-- <span class="user-history">
                <p>0</p>
                <span>我的收藏</span>
            </span> -->
            <!-- <div class="user-nav-end"></div> -->
        </div>
        <!-- <panel title="创建" :list="createList"></panel> -->
        <panel cname="me-info-list" :list="infoList"></panel>
        <!-- <panel title="设置" :list="setList"></panel> -->
        <nav-bar act="me" :list="navList"></nav-bar>
    </div>
</template>

<script>
import navBar from "@/components/nav-bar";
import panel from "@/components/panel";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import user from "../../service/user.js";
import topNav from "@/components/nav";
export default {
    computed:{
        style(){
            let style='';
            style = 'background-image:url('+this.img_url+')';
            return style;
        }
    },
    data() {
        return {
            img_url:'',
            navList:[
                {
                    text:'首页',
                    img:'../../static/img/icon/home.png',
                    url:'../home/main'
                },
                {
                    text:'分类',
                    img:'../../static/img/icon/category.png'
                },
                {
                    text:'发布',
                    img:'../../static/img/icon/release.png',
                    url:'../release/main'
                },
                {
                    text:'发现',
                    img:'../../static/img/icon/release.png',
                    url:'../release/main'
                },
                {
                    text:'个人中心',
                    img:'../../static/img/icon/selected-me.png',
                    url:'../me/main'
                },
            ],
            userInfo: {
                nickName: "点击头像登陆",
                info: "12345678910",
                avatarUrl:"http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png"
            },
            login: false,
            createList: [
                
            ],
            infoList: [
                {
                    text: "我的发布",
                    src: "../../static/img/icon/my-release.png",
                    url:"../my-release/main"
                },
                {
                    text: "我的订单",
                    src: "../../static/img/icon/my-order.png",
                    url:"../my-order/main"
                },
                {
                    text: "关注公众号",
                    src: "../../static/img/icon/add3.png",
                    account:true
                },
         /*         
                {
                    text: "活动关注",
                    src: "../../static/img/icon/unlike.png",
                    url:"../like/main"
                }, */
                {
                    text: "我的收藏",
                    src: "../../static/img/icon/icon_collect.png",
                    url:"../collection-list/main"
                },
                {
                    text: "热文中心",
                    src: "../../static/img/icon/hot.png",
                    url: "../hot/main"
                },
                {
                    text: "帮助中心",
                    src: "../../static/img/icon/help-center.png",
                    url: "../help/main"
                },
                
                // {
                //     text: "实名认证",
                //     src: "../../static/img/icon/authentication.png",
                //     url:"../attesta/main"
                // },
                // {
                //     text: "二维码名片",
                //     src: "../../static/img/icon/qr-code.png"
                // },
               
            ],
            // setList: [
            //     {
            //         text: "修改登陆账号",
            //         src: "../../static/img/icon/modify.png"
            //     },
            //     {
            //         text: "密码设置",
            //         src: "../../static/img/icon/lcok-setting.png"
            //     },
            //     {
            //         text: "联系客服",
            //         src: "../../static/img/icon/service.png"
            //     }
            // ]
        };
    },

    components: {
        panel,
        topNav,
        navBar
    },
    onLoad(config){
        let that = this;
        if(config&&config.id==1){
            wx.navigateTo({  url:"../my-release/main" });
        }else if(config&&config.id==2){
            wx.navigateTo({  url:"../my-order/main" });
        }else if(config&&config.id==3){
            wx.navigateTo({  url:"../my-release/main?id=1" });
        }
        
        util.request(api.screen).then(res => {
            that.img_url = res.data.value
        })
    },
    methods: {
        bindGetUserInfo(e) {
            let that = this;
            if (e.mp.detail.rawData) {
                //用户按了允许授权按钮
                console.log("用户按了允许授权按钮");
                that.getUserInfo();
            } else {
                //用户按了拒绝按钮
                console.log("用户按了拒绝按钮");
                wx.showModal({
                    title: "警告通知",
                    content:"您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。",
                    success: function(res) {
                        if (res.confirm) {
                            wx.openSetting({
                                success: res => {
                                    if (res.authSetting["scope.userInfo"]) {
                                        ////如果用户重新同意了授权登录
                                        that.getUserInfo()
                                    }
                                }
                            });
                        }
                    }
                });
            }
        },
        getUserInfo(e) {
            wx.showToast({ 
                title:'登陆中', 
                icon:'loading', 
                mask:true 
            })
            let that = this;
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
    },
    created() {
        let that = this;
        //console.log(wx);

        // 调用应用实例的方法获取全局数据
        this.getUserInfo()
    }
};
</script>

<style scoped lang="scss">

.user-nav {
    display:flex;
    flex-direction:column;
    padding:24px 0;
    align-items:center;
    background:#333;
    width:100%;
    border-radius:5px;
    overflow:hidden;
    background-size:100%;
    background-repeat:no-repeat; 
    font-size:18px;

}
.user-info {
    display: inline-block;
    margin:0 auto;
}
.user-points,
.user-history {
    color: #fff;
    position: absolute;
    text-align: center;
    bottom: 44px;
    font-family: "黑体";
    > p {
        font-size: 17px;
        letter-spacing: 0.5px;
        font-weight: bold;
    }
    > span {
        font-size: 12px;
        text-align: center;
        letter-spacing: 1px;
    }
}
.user-points {
    left: 73px;
}
.user-history {
    right: 65px;
}
.user-info > span {
    display: block;
    margin-top: 18px;
}
.user-photo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.user-name,
.user-id {
    color: #fff;
    font-size: 16px;
    margin-bottom: 11px;
    text-align: center;
}
.user-nav-end {
    height: 37px;
    width: 100%;
    display: flex;
    background: url("../../css/img/nav/me-nav.png");
    background-size: 100%;
    position: absolute;
    bottom: 0;
}
</style>
<style lang="scss">
.me-info-list{
    margin-top:10px;
    ul{
        li{
            display: inline-block;
            width:33.33%;
            height:93px;
            padding:0px;
            text-align:center;
            padding-top:20px;
            border-right:1px solid #eee;
            box-sizing:border-box;
            font-size:12px;
            font-weight:normal;
            color:#333;
            line-height:40px;
            image{
                display: block;
                margin:0 auto;
            }
            &::after{
                display: none;
            }
            &:nth-child(3){
                 border-right:none;
            }
        }
    }
}
page{
    background:#f4f4f4;
}

</style>
