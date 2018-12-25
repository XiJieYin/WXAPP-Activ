<template>
    <section class="consumer-release-wrap">
        <div class="text-dec nav-first">
            <p class="fon13">简要描述下您的需求</p>
            <textarea  placeholder-style="color:#888;" v-model="summarize" :placeholder="title" name="textarea" />
        </div>
        <div class="mar9">
            <panel cname="consumer-release-list" @panel-click="showPicker" :list="releaseList"></panel>
            <mpvue-picker mode="multiLinkageSelector" ref="mpvuePicker" :pickerValueArray="multiArray" :pickerValueDefault='pickerValueDefault' @onConfirm="onConfirm"></mpvue-picker>
        </div>
        <dl class="release-edit">
            <dt class="release-name">
                <span class="fon13">联系人</span>
                <input style="width:90px" placeholder-style="color:#888;" v-model="nickname" placeholder="您的名字" />
                <span class="release-radio">
                    <span class="fon13" @click="checkRadio(1)" :class="radioInx===1?'check-radio':''">先生</span>
                    <span class="fon13" @click="checkRadio(2)" :class="radioInx===2?'check-radio':''">女生</span>
                </span>
            </dt>
            <dt style="position:relative">
                <span class="fon13">手机号</span>
                <input class="width95" placeholder-style="color:#888;" type="number" v-model="phone" placeholder="需电话确认" />
                <span v-if="showSend" @click="sendCode" class="sendCode">发送验证码</span>
                <span v-if="!showSend" class="sendCode">{{time}}秒</span>
                <input class="check-phone" placeholder-style="color:#888;" type="number" v-model="mobile_code" placeholder="请输入验证码" />
            </dt>
            <dt>
                <span class="fon13">联系地址</span>
                <input placeholder-style="color:#888;" class="site-margin" v-model="site" placeholder="请输入您的联系地址" />
            </dt>
            <dt>
                <span class="fon13">门牌号</span>
                <input placeholder-style="color:#888;" v-model="site2"  placeholder="详细地址，例：1号楼一单元101室" />
            </dt>
            <dt style="height:auto">
                <span class="fon13">图片（最多可添加2张图片）</span>
                <div class="add-photo-wrap">
                    <ul>
                        <span class="imglist">
                            <li v-for="(item,index) in phtotList" :key="index" >
                                <img  class="img-choose" :src="item" alt="">
                                <span class="close-icon" @click="delPhoto(index)">X</span>
                            </li>
                            <li @click="chooseshopPhoto(e)" v-if="phtotList.length<2" class="add-photo"></li>
                        </span>
                    </ul>
                </div>
            </dt>
            <dt>
                <btn cname="big-btn" @handle-click="save" text="发布需求"></btn>
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
import config from "../../utils/config.js";
import user from "../../service/user.js";
import mpvuePicker from 'mpvue-picker';
export default {
    data() {
        return {
            showSend:true,
            radioInx:0,
            array:[],
            phtotList:[],
            trade:'',
            time:60,
            subdivide:'',
            mobile_code:'',
            multiArray:[],
            pickerValueDefault: [],
            title:
                "请简短描述下您的需求，我们将根据您的需求，尽快联系相应的产品或服务供应商组织活动，并短信通知您",
            userInfo: {},
            releaseList: [
                {
                    text: "选择分类"
                }
            ]
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
        delPhoto(index){
            let lists = this.phtotList
            lists.splice(index,1);
            this.phtotList = [];
            this.phtotList = lists;
        },
        submitImg(img){
            wx.showLoading({
                mask:true,
                title: '图片上传中',
                icon: 'loading',
            })
            let that = this;
            if(this.chooseImgInx||this.chooseImgInx===0){
                let lists = that.phtotList;
                console.log(res);
                wx.uploadFile({
                    url: config.host+api.upload,
                    filePath: img,
                    name: 'file',
                    header: {
                        "Content-Type":"multipart/form-data"
                    },
                    success: function (res) {
                        var data = JSON.parse(res.data)　　//坑2：与wx.request不同，wx.uploadFile返回的是[字符串]，需要自己转为JSON格式
                        console.log('上传成功')
                        lists.splice(this.chooseImgInx,1,data.data);
                        that.phtotList = [];
                        that.phtotList = lists;
                        console.log('刷新成功')
                        wx.hideLoading();
                    }
                })
            }else{
                wx.uploadFile({
                    url: config.host+api.upload,
                    filePath: img,
                    name: 'file',
                    header: {
                        "Content-Type":"multipart/form-data"
                    },
                    success: function (res) {
                        var data = JSON.parse(res.data)　　//坑2：与wx.request不同，wx.uploadFile返回的是[字符串]，需要自己转为JSON格式
                        console.log('上传成功')
                        that.phtotList.push(data.data);
                        console.log('刷新成功');
                        wx.hideLoading();
                    }
                })
            }
        },
        chooseshopPhoto(e,index){
            let that = this;
            this.chooseImgInx = index;
            wx.chooseImage({
                count: 2, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    res.tempFilePaths.map(item=>{
                        that.submitImg(item)
                    })
                    console.log(res)
                }
            })
        },
        sendCode(){
            let that = this;
            if(!this.phone){
                wx.showModal({
                    title: '错误',
                    content: '手机号码不能为空',
                    showCancel:false
                });
                return;
            }
            if(!this.bindCheckMobile(this.phone)){
                return
            }
            that.showSend = false;
            util.request(api.smscode,{
                phone:this.phone
            },'POST').then(res => {
                if(res.errno===0||res.errno===1){
                    that.showSend = false;
                    let inTime = setInterval(function(){
                        that.time--;
                        if(that.time===0){
                            clearInterval(inTime);
                            that.showSend = true;
                            this.time = 60
                            return;
                        }
                    },1000)
                    console.log(res)
                }else{
                    that.showSend = true;
                    wx.showToast({
                        title: '发送验证码失败',
                        image: '../../static/img/icon/icon_error.png'
                    });
                }
                
            })

        },
        checkRadio(inx){
            this.radioInx = inx;
        },
        onConfirm(e) {
            console.log(e);
            console.log(this.multiArray);
            this.releaseList[0].text = e.label;
            this.pickerValueDefault = e.value;
            this.trade = this.multiArray[e.value[0]].value;
            this.subdivide = this.multiArray[e.value[0]].children[e.value[1]].value;
            
        },
        showPicker() {
            this.$refs.mpvuePicker.show();
        },
        getChildren(id){
            let that = this
            let data = [];
            let pID = id
            that.array.map(item=>{
                if(item.parent_id==pID){
                    let obj = {};
                    obj.label = item.name;
                    obj.value = item.item_cat_id;
                    data.push(obj);
                }
            })
            return data
        },
        getClassify(){
            let that = this
            util.request(api.classify).then(res => {
                console.log(333);
                console.log(res);
                that.array = res.data.catList;
                res.data.catList.map(item=>{
                    if(item.is_parent==1){
                        let obj = {};
                        obj.label = item.name;
                        obj.value = item.item_cat_id;
                        obj.children = that.getChildren(item.item_cat_id);
                        that.multiArray.push(obj);
                    }
                })
                console.log( that.multiArray);
            });
        },
        bindCheckMobile(mobile) {
            if (!mobile) {
                wx.hideLoading()
                wx.showModal({
                    title: '错误',
                    content: '请输入手机号码',
                    showCancel:false
                });
                return false
            }
            if (!mobile.match(/^1[3-9][0-9]\d{8}$/)) {
                wx.hideLoading()
                wx.showModal({
                    title: '错误',
                    content: '手机号格式不正确，仅支持国内手机号码',
                    showCancel:false
                });
                return false
            }
            return true
        },
        save(){
            
                        
                if(!this.nickname){
                    console.log(this.summarize)
                    console.log(this.nickname)
                    console.log(this.trade)
                    console.log(this.subdivide)
                    wx.hideLoading()
                    wx.showModal({
                        title: '',
                        content: '名称不能为空',
                        showCancel:false
                    });
                    return
                }
                if(!this.summarize){
                    console.log(this.summarize)
                    console.log(this.nickname)
                    console.log(this.trade)
                    console.log(this.subdivide)
                    wx.hideLoading()
                    wx.showModal({
                        title: '',
                        content: '描述不能为空',
                        showCancel:false
                    });
                    return
                }
                if(!this.radioInx){
                    console.log(this.summarize)
                    console.log(this.nickname)
                    console.log(this.trade)
                    console.log(this.subdivide)
                    wx.hideLoading()
                    wx.showModal({
                        title: '',
                        content: '请选择性别',
                        showCancel:false
                    });
                    return
                }
                if(!this.trade||!this.subdivide){
                    console.log(this.summarize)
                    console.log(this.nickname)
                    console.log(this.trade)
                    console.log(this.subdivide)
                    wx.hideLoading()
                    wx.showModal({
                        title: '',
                        content: '请选择分类',
                        showCancel:false
                    });
                    return
                }
                let img= '';
            wx.showLoading({
                mask:true,
                title: '提交中',
                icon: 'loading',
            })
            let that = this;
            if(!this.bindCheckMobile(this.phone)){
                wx.hideLoading()
                return
            }
            console.log(33);
            util.request(api.bindMobile,{
                phone:this.phone,
                mobile_code:this.mobile_code
                },'POST').then(res => {
                    console.log(111);
                    console.log(res);
                    if (res.errno == 0) {
                util.request(api.needSave,{
                    phone:this.phone,
                    summarize:this.summarize,
                    nickname:this.nickname,
                    trade:this.trade,
                    subdivide:this.subdivide,
                    gender:this.radioInx,
                    site:this.site + ' '+this.site2,
                    img:this.phtotList,
                }).then(res => {
                    wx.hideLoading()
                    console.log(2)
                    if(res.errno===0){
                        wx.showToast({
                            title: '提交成功',
                            icon: 'success',
                        })
                        setTimeout(function(){
                            let url = '../me/main?id=3';
                            wx.redirectTo({  url:url })
                        },500)
                    }
                });
                } else {
                    wx.hideLoading()
                    wx.showModal({
                        title: '提示',
                        content: '验证码错误',
                        showCancel: false
                    })
                }
            })
        },
        init(){
            this.getClassify();
            this.phone = '';
            this.summarize = '';
            this.nickname = '';
            this.site = '';
            this.site2 = '';
            this.pickerValueDefault = [0,0];
        }
    },
    onLoad(){
        this.init();
        this.time = 60
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
.imglist{
    li{
        display: inline-block;
        vertical-align:top;
        position: relative;
        
    }
    img{
        display: inline-block;
        width: 88px !important;
        height: 88px!important;
        vertical-align:top !important;
        margin-top: 0px !important;
        margin-bottom: 5px;
    }
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
.add-photo-wrap{
    margin-bottom: 14px;
    .img-choose{
        margin-left:0 !important;
        margin-right:5px !important;
    }
}
.add-photo{
    border: 1px dashed #d9d9d9;
    width: 86px;
    position: relative;
    height: 86px;
    &::after{
        content: '';
        background: #d9d9d9;
        left: 50%;
        top:50%;
        margin-top:-29.5px; 
        position: absolute;
        width:1px;
        height:59px ;
    }
    &::before{
        content: '';
        background: #d9d9d9;
        position: absolute;
        left: 50%;
        top:50%;
        margin-left:-29.5px; 
        height:1px;
        width:59px ;
    }
}
.release-edit dt:last-child {
    border-bottom-color: transparent;
}
.site-margin{
    margin-left: 8px !important;
}
.sendCode{
    font-size:11px;
    color: #999;
    float: right;
    right:1px;
    z-index: 99;
    padding: 0;
    width:60px;
    position: absolute;
    text-align: center;
    right:100px;
}
.release-edit {
    margin-top: 9px;
    background: #fefefe;
    padding: 0 25px;
    margin-bottom: 10px;
    >dt.release-name{
        input{
            width: 120px;
        }
        .release-radio{
            display: inline-block;
            height: 30px;
            margin-top:13px;
            float:right;
            span{
                line-height: 30px;
                float:left;
                padding-left: 40px;
                background: url('../../../static/img/icon/unradio.png') no-repeat;
                background-size:45%;
                margin-left: 16px;
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
            font-size: 14px;
            vertical-align: middle;
            color: #000;
            margin-left: 20px;
            width: 230px;
        }
        .sendCode {
            font-size: 11px;
            float: right;
            background: #f6b37f;
            color: #fff;
            height:30px;
            line-height:30px;
            padding: 0px 5px;
            border-radius: 10px;
            top: 10px;
            font-weight: normal;
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
.check-phone{
    width:84px!important;
    margin-left:46px!important;
    float:right;
    margin-top:13px!important;

}
.width95{
    width:95px !important;
}
.mar9{
    margin-top:9px;
}
.text-dec {
    display: inline-block;
    width: 100%;
    min-height: 92px;
    background: #fefefe;
    box-sizing: border-box;
    padding: 10px 25px;
    p {
        font-size: 14px;
        color: #333;
    }
}
.fon13{
    font-size: 13px !important; 
    font-weight: bold;
}
textarea {
    font-size: 14px;
    margin-top: 15px;
    width: 100%;
    height: 75px;
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

