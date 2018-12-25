<template>
    <section class="need-wrap">
        <div class="nav-first mar">
            <!-- <swiper activeColor="transparent" indicatorColor="transparent" class="swiper" indicator-dots="false" autoplay="false" interval="5000" duration="1000">
                <block v-for="(item, index) in multiArray" :index="index" :key="index">
                    <swiper-item>
                        <span>{{item.label}}</span>
                    </swiper-item>
                </block>
            </swiper> -->
            <scroll-view scroll-x="true"  class="tab-h" >
                <view :class="['tab-item',liIndex=='all'?'active':'']"  data-current="0" @click="swichNav('all')">全部</view>
                <view :class="['tab-item',liIndex==index?'active':'']" v-for="(item,index) in multiArray" :key="index"  :data-current="index+1" @click="swichNav(index)">
                    <picker range-key="label" class="select-text" @cancel="cancelChange" mode="selector" @change="bindRegionChange" :range="item.children">
                        {{item.name}}
                        <span></span>
                    </picker>
                </view>
            </scroll-view>
            <!-- <panel cname="consumer-release-list" @panel-click="showPicker" :list="releaseList"></panel>
            <mpvue-picker mode="multiLinkageSelector" ref="mpvuePicker" :pickerValueArray="multiArray" :pickerValueDefault='pickerValueDefault' @onConfirm="onConfirm"></mpvue-picker> -->
        </div>
        <ul class="need-list ">
            <span v-if="lists.length==0" class="no-data">没有数据</span>
            <li v-for="(item,index) in lists" :key="index">
                <img class="need-head" :src="item.avatar" alt="" />
                <span class="need-name">{{item.nick}}</span>
                <span style="text-align: justify;" :class="item.show?'need-text show-text':'need-text'" v-html="item.summarizes"></span>
                <span class="need-show" v-if="item.summarize&&item.summarize.length>83" @click="showText(index)">{{item.show?'收起':'全文'}}</span>
                <span class="need-photo" v-if="item.src&&item.src.length>0">
                    <img @click="previewImg(item.src,ix)" v-for="(i,ix) in item.src" :key="ix" :src="i" alt="">
                </span>
                <span class="need-date">{{item.issueTime}}</span>
            </li>
        </ul>
         <nav-bar act="release"></nav-bar>
    </section>
</template>

<script>
import panel from "../../components/panel";
import topNav from "../../components/nav";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import btn from "@/components/btn";
import user from "../../service/user.js";
import navBar from "@/components/nav-bar";
import mpvuePicker from 'mpvue-picker';
let padDate=function(va){
     va=va<10?'0'+va:va;
     return va
}
export default {
    onPullDownRefresh(){
        wx.showToast({ 
            title:'加载中', 
            icon:'loading', 
            mask:true 
        })
        this.liIndex = 'all'
        console.log(333)
        let that = this;
        util.request(api.list).then(res => {
            let that = this;
            res.data.map(item=>{
                item.issueTime = that.showTime(item.issueTime);
                item.show = false;
            })
            //that.getDate()
            that.lists = res.data;
            that.lists.map(item=>{
                item.src = [];
                item.src = JSON.parse(item.img)
                item.summarizes = that.Trim(item.summarize);
            })
            wx.hideLoading()
        })
        this.getClassify();
        this.pickerValueDefault = [0,0];
    },
    data() {
        return {
            lists:[],
            show:false,
            ix:'all',
            liIndex:'',
            multiArray:[],
            trade:'',
            subdivide:'',
            lastIndex:'all',
            pickerValueDefault:[],
            releaseList: [
                {
                    text: "选择分类查询"
                }
            ]
        };
    },
    filters:{
        
    },
    computed:{
        
    },
    components: {
        panel,
        topNav,
        btn,
        navBar,
        mpvuePicker
    },
    methods: {
        Trim(str) {  //str表示要转换的字符串
            return str.replace(/\n|\r\n/g,"<br/>");
        },
        swichNav(index){
            let t = this.liIndex;
            this.lastIndex = t;
            this.liIndex = index;
            let that = this;
            if(index=='all'){
                wx.showToast({ 
                    title:'加载中', 
                    icon:'loading', 
                    mask:true 
                })
                util.request(api.list).then(res => {
                res.data.map(item=>{
                    item.issueTime = that.showTime(item.issueTime);
                    item.show = false;
                })
                //that.getDate()
                that.lists = res.data;
                that.lists.map(item=>{
                    item.src = [];
                    item.src = JSON.parse(item.img)
                    item.summarizes = that.Trim(item.summarize);
                })
                wx.hideLoading()
                })
            }
        },
        showTime(time){
            let m = ''
            let now = new Date().getTime();
            let t = now - time;
            if(t<60000){
                m = '刚刚'
            }else if(t>60000&&t<3600000){
                m = parseInt(t/60000)+'分钟之前'
            }else if(t>3600000&&t<86400000){
                m = parseInt(t/3600000)+'小时前'
            }else if(t>86400000&&t<604800000){
                m = parseInt(t/86400000)+'天前'
            }else{
               m = this.formatDate(time);
            }
            return m;
        },
        cancelChange(){
            this.liIndex = this.lastIndex
        },
         bindRegionChange(e) {
            wx.showToast({ 
                title:'加载中', 
                icon:'loading', 
                mask:true 
            })
             console.log(e)
             let that = this;
            //console.log('picker发送选择改变，携带值为', e)
            that.multiArray[that.liIndex].name = that.multiArray[that.liIndex].children[e.target.value].label;
            if(that.multiArray[that.liIndex].children[e.target.value].trade){
                util.request(api.list,{
                    trade:that.multiArray[that.liIndex].children[e.target.value].value
                }).then(res => {
                    let that = this;
                    res.data.map(item=>{
                        item.issueTime = that.showTime(item.issueTime);
                        item.show = false;
                    })
                    //that.getDate()
                    that.lists = res.data;
                    that.lists.map(item=>{
                        item.src = [];
                        item.src = JSON.parse(item.img);
                    item.summarizes = that.Trim(item.summarize);
                    })
                    wx.hideLoading()
                })
            }else{
                util.request(api.list+'?subdivide='+that.multiArray[that.liIndex].children[e.target.value].value).then(res => {
                    let that = this;
                    res.data.map(item=>{
                        item.issueTime = that.showTime(item.issueTime);
                        item.show = false;
                    })
                    //that.getDate()
                    that.lists = res.data;
                    that.lists.map(item=>{
                        item.src = [];
                        item.src = JSON.parse(item.img)
                        item.summarizes = that.Trim(item.summarize);
                    })
                })
                wx.hideLoading()
            }
        },
        getChildren(id,fv){
            let that = this
            let data = [];
            let pID = id;
            data.push({
                label:fv.label,
                value:fv.value,
                trade:true
            })
            that.array.map(item=>{
                if(item.parent_id==pID){
                    let obj = {};
                    obj.label = item.name;
                    obj.t = item.name;
                    obj.value = item.item_cat_id;
                    data.push(obj);
                }
            })
            return data
        },
        getClassify(){
            let that = this;
            util.request(api.classify).then(res => {
                console.log(333);
                console.log(res);
                that.array = res.data.catList;
                that.multiArray = [];
                res.data.catList.map(item=>{
                    if(item.is_parent==1){
                        let obj = {};
                        obj.label = item.name;
                        obj.value = item.item_cat_id;
                        obj.name = item.name;
                        let fv = {};
                        fv.value  = item.item_cat_id;
                        fv.label  = item.name;
                        obj.children = that.getChildren(item.item_cat_id,fv);
                        that.multiArray.push(obj);
                    }
                })
                console.log( that.multiArray);
            });
        },
        showText(index){
            this.lists[index].show = this.lists[index].show?false:true;
        },
        onConfirm(e) {
            console.log(e);
            console.log(this.multiArray);
            this.releaseList[0].text = e.label;
            this.pickerValueDefault = e.value;
            this.trade = this.multiArray[e.value[0]].value;
            this.subdivide = this.multiArray[e.value[0]].children[e.value[1]].value;
            
        },
        previewImg(i,ix){
            wx.previewImage({
            current: i[ix],     //当前图片地址
            urls: i,               //所有要预览的图片的地址集合 数组形式
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
            })
        },
        formatDate:function (val) {
            var value=new Date(val);
            var year=value.getFullYear();
            var month=padDate(value.getMonth()+1);
            var day=padDate(value.getDate());
            var hour=padDate(value.getHours());
            var minutes=padDate(value.getMinutes());
            var seconds=padDate(value.getSeconds());
            return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
        },
        showPicker() {
            this.$refs.mpvuePicker.show();
        },
    },
    onShow(config){
         wx.stopPullDownRefresh() 
        wx.showToast({ 
            title:'加载中', 
            icon:'loading', 
            mask:true 
        })
        this.liIndex = 'all'
        console.log(333)
        let that = this;
        util.request(api.list).then(res => {
            let that = this;
            res.data.map(item=>{
                item.issueTime = that.showTime(item.issueTime);
                item.show = false;
            })
            //that.getDate()
            that.lists = res.data;
            that.lists.map(item=>{
                item.src = [];
                item.src = JSON.parse(item.img)
                    item.summarizes = that.Trim(item.summarize);
            })
            wx.hideLoading()
        })
        this.getClassify();
        this.pickerValueDefault = [0,0];
    },
    mounted() {
        let that = this;
        
    },
    created() {

        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>

<style scoped lang="scss">
.need-photo{
    display:inline-block;
    width:100%;
    img{
    margin-top: 5px;
        width:70px;
        height: 70px;
        margin-right: 10px;
        display: inline-block;
    }
}
.no-data{
    background: url('../../../static/img/icon/no_data.png');
    width: 132.5px;
    height: 140.5px;
    background-size: 100%;
    position: relative;
    left: 50%;
    margin-top: 70px;
    margin-left: -66px;
    display:inline-block;
    text-align:center;
    line-height:315px;
    font-size:14px;

}
.tab-h{
    height: 80rpx;width: 100%; box-sizing: border-box;overflow: hidden;line-height: 80rpx;background: #F7F7F7; font-size: 16px; white-space: nowrap;top: 0; left: 0; z-index: 99;}
.tab-item{margin:0 36rpx;display: inline-block;}
.tab-item.active{color: #fa3346;position: relative;}
.tab-item.active:after{ content: "";display: block;height: 8rpx;width: 100%;background: #fa3346;position: absolute; bottom: 0;left: 0rpx;border-radius: 16rpx;}
.item-ans{ width: 100%;display: flex; flex-grow: row no-wrap;justify-content: space-between; padding: 30rpx;box-sizing: border-box; height: 180rpx;align-items: center;border-bottom: 1px solid #F2F2F2;}
.avatar{width: 100rpx;height: 100rpx;position: relative;padding-right: 30rpx;}
.avatar .img{width: 100%;height: 100%;}
.avatar .doyen{width: 40rpx;height: 40rpx;position: absolute;bottom: -2px;right: 20rpx;}
.expertInfo{font-size: 12px;flex-grow: 2;color: #B0B0B0;line-height: 1.5em;}
.expertInfo .name{font-size: 16px;color:#000;margin-bottom: 6px;}
.askBtn{ width: 120rpx;height: 60rpx;line-height: 60rpx;text-align: center;font-size: 14px; border-radius: 60rpx;border: 1px solid #fa3346; color:#fa3346;}
.tab-content{margin-top: 80rpx;}
.scoll-h{height: 100%;}
.need-list{
    background: #fff;
    padding-bottom:67px; 
    li{
        padding-left:71px;
        position: relative;
        min-height: 100px;
        border-bottom: 1px solid #ccc;
    }
    .need-head{
        position: absolute;
        left: 20px;
        top: 12px;
        width: 40px;
        height: 40px;
        background: red;
    }
    .show-text{
        height: auto!important;
        max-height: none !important;
    }
    .need-name{
        margin-top: 14px;
        color: #777f92;
        display: inline-block;
        width: 100%;
        font-size: 14px;
    }
    .need-date{
        color: #999;
        display: inline-block;
        width: 100%;
        font-size: 12px;
        margin-bottom: 10px;
        margin-top: 5px;
    }
    .need-text{
        margin-top: 8px;
        color: #333;
        display: inline-block;
        width: 285px;
        font-size: 14px;
        max-height: 99px;
        line-height: 20px;
        overflow: hidden;
    }
    .need-show{
        display: inline-block;
        font-size:12px;
        color:  #388bff;
        width: 100%;
    }
}
</style>
<style>

page{
     background: #fff;
}
.consumer-release-list span {
    display: none;
}
.consumer-release-list ul li {
    font-size: 14px;
    color: #2e2e2e;
    font-weight: normal;
}
.nav + .nav-first.mar{
    margin-top: 62px;
}
</style>

