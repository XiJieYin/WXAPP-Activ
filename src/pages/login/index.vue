<template>
    <div>
        <topNav title="活动趴EP"></topNav>

        <button id="login-user" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">确定登陆</button>
    </div>
</template>

<script>
import topSlider from "@/components/slider";
import proGress from "@/components/proGress";
import topNav from "@/components/nav";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import user from "../../service/user.js";
import btn from "@/components/btn";
export default {
    data() {
        return {
            panelClass: "panel",
            userInfo: {},
            searchText: "",
            region: [],
            moviesText: [
                {
                    text: "无需注册公众号，30秒发起一场营销与采购活动！"
                },
                {
                    text: "无需注册公众号，"
                }
            ],
            movies: [],
            actList: [],
            login:'0',
        };
    },

    components: {
        topSlider,
        proGress,
        btn,
        topNav
    },

    methods: {
        bindRegionChange(e) {
            //console.log('picker发送选择改变，携带值为', e)
            this.region = e.target.value;
        },
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
    onLoad(config){
        if(config){
            this.login = config.login;
        }
    },
    created() {

    }
};
</script>
<style lang="scss">
@import "../../css/element.scss";
#login-user{
    width: 300px;
    height: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    line-height: 30px;
    box-sizing:border-box;
    padding: 0px 8px;
    height: 45px;
    line-height: 45px;
    border-radius:5px;
    background: linear-gradient( #f67f67, #fa3346);
    color: #fff;
    margin-top: 33px;
}
page {
    background: #f5f5f5;
}
</style>
