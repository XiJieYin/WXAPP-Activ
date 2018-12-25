<template>
    <section class="register-wrap">
        <div v-if="showModel" @click="bgClick" class="bg"></div>
        <div v-if="showModel" class="model-text">
            <textarea placeholder-style="color:#888;" v-model="intro" class="model-textarea" placeholder="公司或店铺简介"></textarea>
            <span @click="cancelModel" style="left:0">取消</span>
            <span  @click="okModel">确认</span>
        </div>
        <dl  class="register-text">
            <p style="font-size:14px;">营业执照上传<span>（如无营业执照的商家上传手执身份证正反面）</span></p>
            <dt>
                支持jpg，png，gif，bmp，psd，tiff等图片格式
            </dt>
            <div class="choose-photo">
                <span v-for="(item,index) in tempFilePaths" :key="index">
                    <img @click="choosePhoto(index)" :src="item" alt="">
                    <a class="close-icon" @click="delPhoto(index)">X</a>
                </span>
            </div>
            <span @click="choosePhoto" v-if="tempFilePaths.length<2">
                <img src="../../../static/img/icon/photo.png" alt="">
            </span>
            
        </dl>
        <dl  class="register-text ">
            <p  style="font-size:14px;">店铺照上传<span>（只能上传一张店铺照）</span></p>
            <dt>
                支持jpg，png，gif，bmp，psd，tiff等图片格式
            </dt>
            <span @click="chooseshopPhoto" v-if="shopPaths.length<1">
                <img src="../../../static/img/icon/photo.png" alt="">
            </span>
            <div class="choose-photo">
                <span v-for="(item,index) in shopPaths" :key="index">
                    <img @click="chooseshopPhoto" :src="item" alt="">
                    <a class="close-icon" @click="delPhoto2(index)">X</a>
                </span>
            </div>
        </dl>
        <dl class="info-edit">
            <dt>
                <!-- <img src="../../../static/img/icon/user.png" alt=""> -->
                <span>名&nbsp;&nbsp;&nbsp;称</span>
                <input placeholder-style="color:#888;" v-model="merchant_name" :placeholder="merchant_name_p" />
            </dt>
            <dt>
                <!-- <img src="../../../static/img/icon/user.png" alt=""> -->
                <span>地&nbsp;&nbsp;&nbsp;址</span>
                <input placeholder-style="color:#888;" v-model="site" :placeholder="site_p" />
            </dt>
            <dt>
                <!-- <img src="../../../static/img/icon/user.png" alt=""> -->
                <span>简&nbsp;&nbsp;&nbsp;介</span>
                <input @focus="inputFocus" placeholder-style="color:#888;" v-model="intro" :placeholder="intro_p" />
                
            </dt>
            <dt>
                <!-- <img src="../../../static/img/icon/user.png" alt=""> -->
                <span>品&nbsp;&nbsp;&nbsp;牌</span>
                <input placeholder-style="color:#888;" style="width:56%;" v-model="brand" :placeholder="brand_p" />
            </dt>
            <!-- <dt>
                <span>上一年营业额</span>
                <input v-model="turnover" placeholder="您的上一年营业额" />
            </dt> -->
            <!-- <dt>
                <span>保价周期</span>
                <input v-model="promise" placeholder="您的保价周期" />
            </dt> -->
            <!-- <dt>
                <img src="../../../static/img/icon/user.png" alt="">
                <span>佣金采集意愿</span>
                <input v-model="opinion" placeholder="您的佣金采集意愿" />
            </dt> -->
            <dt>
                <span>联系人</span>
                <input placeholder-style="color:#888;" v-model="name" :placeholder="name_p" />
            </dt>
            <dt style="">
                <span>手机号</span>
                <input class="width95" placeholder-style="color:#888;" v-model="phone" type="number" :placeholder="phone_p" />
                <span v-if="showSend" @click="sendCode" class="sendCode">发送验证码</span>
                <span v-if="!showSend" class="sendCode">{{time}}秒</span>
                <input class="check-phone" placeholder="请输入验证码" placeholder-style="color:#888;" v-model="mobile_code" />
            </dt>
        </dl>
        <span class="reg-btn">
            <span @click="gotoHelp" style="color:#888;">*提交后，将在24小时内审核完毕！</span>
            <span @click="gotoHelp" style="color:#309838;font-size:12px;">如需帮助，请点击此处</span>
            <btn @handle-click="nextClick"  cname="big-btn" text="注&nbsp;册"></btn>
        </span>
    </section>
</template>

<script>
import topNav from "@/components/nav";
import btn from "@/components/btn";
import checkBox from "@/components/checkbox";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import user from "../../service/user.js";
import config from "../../utils/config.js";
export default {
    data() {
        return {
            showSend:true,
            showModel:false,
            tempFilePaths:[],
            shopPaths:[],
            mobile_code:'',
            site:'',
            image:'',
            intro:'',
            brand:'',
            run_time:'',
            //opinion:'',
            license:'',
            name:'',
            userInfo: {},
            phone: '',
            time:60,
            merchant_name_p:'您的公司或店名',
            site_p:'公司或店铺地址',
            intro_p:'公司或店铺简介',
            brand_p:'自由品牌或代理品牌',
            name_p:'您的名字',
            phone_p:'需电话确认',
        };
    },

    components: {
        btn,
        topNav,
        checkBox
    },
    methods: {
        gotoHelp(){
            
            util.request(api.call).then(res => {
                
                let url = '../answer/main?id='+res.data.value;
                wx.navigateTo({ url: url });
            })
        },
        okModel(){
            this.showModel = false;
            this.merchant_name_p='您的公司或店名';
            this.site_p='公司或店铺地址';
            this.intro_p='公司或店铺简介';
            this.brand_p='自由品牌或代理品牌';
            this.name_p='您的名字';
            this.phone_p='需电话确认';

        },
        bgClick(){
            this.showModel = false;
            this.merchant_name_p='您的公司或店名';
            this.site_p='公司或店铺地址';
            this.intro_p='公司或店铺简介';
            this.brand_p='自由品牌或代理品牌';
            this.name_p='您的名字';
            this.phone_p='需电话确认';

        },
        cancelModel(){
            this.intro = '';
            this.showModel = false;
            this.merchant_name_p='您的公司或店名';
            this.site_p='公司或店铺地址';
            this.intro_p='公司或店铺简介';
            this.brand_p='自由品牌或代理品牌';
            this.name_p='您的名字';
            this.phone_p='需电话确认';

        },
        inputFocus(){
            this.showModel = true;
            this.merchant_name_p='';
            this.site_p='';
            this.intro_p='';
            this.brand_p='';
            this.name_p='';
            this.phone_p='';
        },
        delPhoto(index){
            let lists = this.tempFilePaths
            lists.splice(index,1);
            this.tempFilePaths = [];
            this.tempFilePaths = lists;
        },
        delPhoto2(index){
            let lists = this.shopPaths
            lists.splice(index,1);
            this.shopPaths = [];
            this.shopPaths = lists;
        },
        bindCheckMobile(mobile) {
            if (!mobile) {
                wx.showModal({
                    title: '错误',
                    content: '请输入手机号码',
                    showCancel:false
                });
                return false
            }
            if (!mobile.match(/^1[3-9][0-9]\d{8}$/)) {
                wx.showModal({
                    title: '错误',
                    content: '手机号格式不正确，仅支持国内手机号码',
                    showCancel:false
                });
                return false
            }
            return true
        },
        nextClick(){
            let that = this;
            util.request(api.bindMobile,{
                phone:this.phone,
                mobile_code:this.mobile_code
            },'POST').then(res => {
                console.log(111);
                console.log(res);
                if (res.errno == 0) {
                    util.request(api.saveM,{
                        phone:that.phone,
                        merchant_name:that.merchant_name,
                        site:that.site,
                        image:that.shopPaths[0],
                        intro:that.intro,
                        brand:that.brand,
                        run_time:new Date(),
                        //opinion:this.opinion,
                        license:JSON.stringify(that.tempFilePaths),
                        name:that.name,
                    },'POST').then(res => {
                        console.log(res)
                        if(res.errno===1||res.errno===0){
                            wx.showModal({
                                title: '提交成功',
                                content: '信息已成功提交审核',
                                showCancel:false,
                                success(res) {
                                    wx.reLaunch({ url: '../home/main'});
                                }
                            });
                           // wx.navigateTo({  url:'../home/main' })
                        }
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '验证码错误',
                        showCancel: false
                    })
                }
            })
            //wx.navigateTo({  url:'../act/main' })
        },
        choosePhoto(index){
            let that = this;
            let inx = index;
            wx.chooseImage({
                count: 2, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                     wx.showLoading({
                        mask:true,
                        title: '图片上传中',
                        icon: 'loading',
                    })
                    if(inx===0||inx===1){
                        debugger
                        res.tempFilePaths.map(item=>{
                            wx.uploadFile({
                                url: config.host+api.upload,
                                filePath: item,
                                name: 'file',
                                header: {
                                    "Content-Type":"multipart/form-data"
                                },
                                success: function (res) {
                                    var data = JSON.parse(res.data)　　//坑2：与wx.request不同，wx.uploadFile返回的是[字符串]，需要自己转为JSON格式
                                    console.log('上传成功')
                                    let arry = JSON.parse(JSON.stringify(that.tempFilePaths));
                                    arry[inx] = data.data;
                                    that.tempFilePaths = arry;
                                    console.log('刷新成功')
                                    wx.hideLoading();
                                }
                            })
                        })
                    }else{
                        debugger
                        res.tempFilePaths.map(item=>{
                            wx.uploadFile({
                                url: config.host+api.upload,
                                filePath: item,
                                name: 'file',
                                header: {
                                    "Content-Type":"multipart/form-data"
                                },
                                success: function (res) {
                                   let data = JSON.parse(res.data)　　//坑2：与wx.request不同，wx.uploadFile返回的是[字符串]，需要自己转为JSON格式
                                    console.log('上传成功')
                                    that.tempFilePaths = that.tempFilePaths.concat(data.data)
                                    console.log('刷新成功')
                                    wx.hideLoading();
                                }
                            })
                        })
                       
                        console.log(res)
                    }
                }
            })
        },
        chooseshopPhoto(){
            let that = this;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    wx.showLoading({
                        mask:true,
                        title: '图片上传中',
                        icon: 'loading',
                    })
                    wx.uploadFile({
                        url: config.host+api.upload,
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        header: {
                            "Content-Type":"multipart/form-data"
                        },
                        success: function (res) {
                            let data = JSON.parse(res.data)　　//坑2：与wx.request不同，wx.uploadFile返回的是[字符串]，需要自己转为JSON格式
                            console.log('上传成功')
                            let arry = [];
                            arry[0] = data.data;
                            that.shopPaths = [];
                            that.shopPaths = arry
                            console.log('刷新成功')
                            wx.hideLoading();
                        }
                    })
                    
                    console.log(res)
                }
            })
        },
        sendCode(){
            let that = this;
            if(!this.bindCheckMobile(this.phone)){
                return
            }
            util.request(api.smscode,{
                phone:this.phone
            },'POST').then(res => {
                if(res.errno===0||res.errno===1){
                    that.showSend = false;
                }
                let inTime = setInterval(function(){
                    that.time--;
                    if(that.time===0){
                        clearInterval(inTime);
                        that.showSend = true;
                        that.time = 60
                        return;
                    }
                },1000)
                console.log(res)
            })

        },
        clear(){
            this.phone= ''
            this.merchant_name= ''
            this.site= ''
            this.shopPaths= []
            this.intro= ''
            this.brand= ''
           // this.opinion= ''
            this.tempFilePaths= []
            this.name= ''
            this.mobile_code= '';
            this.showModel = false;
        }
    },
    onLoad(){
        this.clear()
        this.time = 60
    },
    created() {
        
        //console.log(wx);

        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>

<style scoped lang="scss">
.choose-photo{
    display: inline-block;
}
.register-wrap{
    position: relative;
}
.close-icon{
    border-radius:100%;
    position:absolute;
    width:15px;
    height:15px;
    background:red;
    line-height:14px;
    color:#fff !important;
    text-align:center;
    font-size:9px!important;
    right:0px;
    top:-6px;
}
.width95{
    width:95px !important;
}
.model-text{
    position: fixed;
    top: 50%;
    margin-top: -150px;
    width: 300px;
    height: 150px;
    background: #fff;
    border-radius: 5px;
    left: 50%;
    margin-left: -150px;
    box-sizing: border-box;
    padding: 10px;
    z-index: 99999;
    .model-textarea{
        width: 100%;
        height: 80px;
        border: 1px solid #949391;
        font-size: 15px;
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
.check-phone{
    width:84px!important;
    margin-left:46px!important;
    float:right;
    margin-top:10px!important;

}
.bg{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.6;
    z-index:99;
}
.choose-photo span{
    margin-top: 5px;
    margin-right: 5px;
    display: inline-block;
    width: 124px;
    height: 117px;
    position: relative;
    img{
        display: inline-block;
        width: 124px;
        height: 117px;
    }
}
.reg-btn{
    display:inline-block;
    width:100%;
    text-align:center;
    margin-bottom: 10px;
    margin-top: 15px;
    span{
        margin-top: 0px;
        display: inline-block;
        width: 100%;
        margin-bottom: 0px;
        text-align: center;
        font-size: 12px;
    }
    span+span{
        margin-bottom: 10px;
    }
}
.register-text{
    background: #fcfbf9;
    padding: 16.5px 11px;
    p{
        font-size:12px;
        color: #000000; 
        span{
            font-size:12px;
            color: #595958; 
        }
    }
    dt{
        color: #949391;
        margin-top: 13.5px;
        display:inline-block;
        font-size: 10px;
        letter-spacing: 1px;
        font-weight: bold;
    }
    >span{
        display: inline-block;
        width: 124.5px;
        height: 117.5px;
        border: 1px dashed #d2d2d2;
        background: #fff;
        margin-top: 7.5px;
        img{
            width: 94px;
            height: 109px;
            margin-left: 15px;
            margin-top: 3.5px;
        }
    }
    border-bottom: 10px solid #f5f5f5;
}
.info-edit{
    padding: 0 11px;
    >dt{
        height: 44px;
        line-height: 44px;
        border-bottom: 1px solid #e5e5e5;
        span{
            font-size: 14px;
            color: #333333;
            width: 61px;
            text-align: left;
            display:inline-block;
            padding-left: 12px;
            box-sizing: border-box;

        }
        img{
            width: 14.5px;
            height: 16.5px;
            vertical-align:middle;
            margin-left: 12px;
            margin-right: 9px;
        }
        input{
            display: inline-block;
            font-size: 14px;
            vertical-align: middle;
            color: #000;
            margin-left: 20px;
            width:260px;
            //width: 50%;
        }
        .sendCode{
            font-size:11px;
            float: right;
            padding-right: 26px;
            padding: 0;
            width:60px;
            text-align: center;
            background: #f6b37f;
            color: #fff;
            height:30px;
            line-height:30px;
            padding: 0px 5px;
            border-radius: 10px;
            margin-top: 7px;
            font-weight: normal;
            position: absolute;
        }
    }
}
</style>
<style>
page{
     background: #fff;
}
.big-btn{
    width: 303px;
    box-sizing:border-box;
    padding: 0px 8px;
    height: 45px;
    line-height: 45px;
    border-radius:5px;
    background: linear-gradient( #f67f67, #fa3346);
    margin-top: 5px;
}
</style>

