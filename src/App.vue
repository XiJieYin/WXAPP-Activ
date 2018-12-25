<script>
import qcloud from "wafer2-client-sdk";
import config from "./utils/config";
import user from "./service/user";
import './css/reset.scss'
export default {
    created() {
        let that = this;
        // wx.navigateTo({
        //                         url: "../home/main"
        //                     });
        // wx.getUserInfo({
        //     success: res => {
        //         console.log("用户信息");
        //         that.userInfo = res.userInfo;
        //         console.log(res)
        //     },
        //     fail() {
        //         console.log("用户信息失败");
        //     }
        // });
        // if(!user.checkLogin()){
        //     wx.showModal({
        //             title: "警告",
        //             content: "尚未进行授权，请点击确定跳转到授权页面进行授权。",
        //             success: function(res) {
        //                 if (res.confirm) {
        //                     console.log("用户点击确定");
        //                     wx.navigateTo({
        //                         url: "../login/main?login=1"
        //                     });
        //                 }
        //             }
        //         });
        // }else{
        //     console.log('授权成功')
        // }
        // wx.checkSession({
        //     success: function () {
        //         console.log('成')
        //         //resolve(true);
        //     },
        //     fail: function () {
        //         console.log('失')
        //         //reject(false);
        //         wx.showModal({
        //             title: "警告",
        //             content: "尚未进行授权，请点击确定跳转到授权页面进行授权。",
        //             success: function(res) {
        //                 if (res.confirm) {
        //                     console.log("用户点击确定");
        //                     wx.navigateTo({
        //                         url: "../login/main?login=1"
        //                     });
        //                 }
        //             }
        //         });
        //     }
        // })
        user.getUserLocation();
        // qcloud.setLoginUrl(config.loginURL);
        // qcloud.login({
        //   success(userInfo){
        //     console.log(userInfo)
        //   },
        //   fail(err){
        //     console.log(err)
        //   }
        // })
        // 调用API从本地缓存中获取数据
        // const logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)

        // console.log('app created and cache logs by setStorageSync')
    },
    methods: {}
};
</script>

<style>
/* this rule will be remove */
* {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
    box-sizing: border-box;
}
</style>
