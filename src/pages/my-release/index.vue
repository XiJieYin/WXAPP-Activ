<template>
    <section class="order-wrap">
        <ul class="swiper-tab">
            <li v-if="info.state==1" :class="[swiperTabList,currentTab==0?'on':'']" data-current="0" @click="swichNav(0)">
                <span>全部</span>
            </li>
            <li v-if="info.state==1" :class="[swiperTabList,currentTab==1?'on':'']" data-current="1" @click="swichNav(1)">
                <span>待审核</span>
            </li>
            <li v-if="info.state==1" :class="[swiperTabList,currentTab==2?'on':'']" data-current="2" @click="swichNav(2)">
                <span>进行中</span>
            </li>
            <li v-if="info.state==1" :class="[swiperTabList,currentTab==4?'on':'']" data-current="3" @click="swichNav(4)">
                <span>已结束</span>
            </li>
            <li  :class="[swiperTabList,currentTab==5?'on':'']" data-current="4" @click="getConsumer()">
                <span>我的需求</span>
            </li>
        </ul>
        <div v-if="info.state==1&&currentTab!=5" style="height:100%;">
            <span v-if="items.length==0" class="no-data"></span>
            <ul class="release-lists">
                <li v-if="item.status!=7" class="release-list" v-for="(item, index) in items" :key="index">
                    <span class="bg-1" v-if="item.status==1">待审核</span>
                    <span class="bg-2" v-if="item.status==2">进行中</span>
                    <span class="bg-2" v-if="item.status==5">未开始</span>
                    <span class="bg-2" v-if="item.status==6">已满额</span>
                    <span class="bg-3" v-if="item.status==4" style="color:#fff">已结束</span>
                    <span class="release-title" style="font-size:16px;margin-bottom:15px;">
                        {{item.title}}
                    </span>
                    <span class="release-title" style="color:#999999;">
                        {{item.start_time}}至{{item.over_time}}
                    </span>
                    <span class="release-content">
                        <img mode="widthFix" :src="item.image" alt="">
                        <span class="release-info">
                            <span style="left:0%">
                                {{item.status==1?0:item.read_count}}<br>
                                游览量
                            </span>
                            <span style="left:25%">
                                {{item.status==1?0:item.share}}<br>
                                分享数
                            </span>
                            <span style="left:50%">
                                {{item.status==1?0:item.now}}<br>
                                报名数
                            </span>
                            <span style="right:0%">
                                {{item.status==1?0:item.shopping_num}}<br>
                                成功数
                            </span>
                            <a class="info-bg"></a>
                        </span>
                    </span>
                    <span class="prog-info">
                    {{item.status==1?0:item.shopping_num}}/{{item.num}}
                        <span class="prog-info-tiao">
                            <span><span :style="{width:item.percent+'%'}"></span></span>完成{{item.status==1?0:item.percent}}%  
                        </span>
                    </span>
                    <hr />
                    <span style="border-color:red;color:red;" @click.stop="itemDel(item)" class="btn-opt" v-if="item.status==1">删除</span>
                    <span style="border-color:red;color:red;" @click.stop="revise(item)" class="btn-opt" v-if="item.status==1">修改</span>
                    <span class="btn-opt" @click.stop="lookDetail(item)" v-if="item.status==1">预览</span>
                         <button v-if="item.status==2||item.status==6" :id="item.itemId" :hoverStopPropagation="true"  catchtap open-type='share' class="btn-opt" style="border-color:red;color:red;">
                            分享
                        </button>
                    <span class="btn-opt" @click.stop="Detail(item)" v-if="item.status==2||item.status==5||item.status==6">详情</span>
                    <span class="btn-opt" style="width:100%;color:#888" @click.stop="Detail(item)" v-if="item.status==4">详情</span>
                    <span class="btn-opt" @click.stop="goToJoin(item)" v-if="(item.status==2||item.status==6)&&item.now>0">名单</span>
                </li>
            </ul>
        </div>
        <ul v-if="currentTab==5" class="need-list">
            <span v-if="lists.length==0" class="no-data"></span>
            <li v-for="(item,index) in lists" :key="index">
                <img class="need-head" :src="item.avatar" alt="" />
                <span class="need-name">{{item.nick}}</span>
                <span  :class="item.show?'need-text show-text':'need-text'" style="text-align: justify;" v-html="item.summarizes"></span>
                <span class="need-show" v-if="item.summarize&&item.summarize.length>83" @click="showText(index)">{{item.show?'收起':'全文'}}</span>
                <span class="need-photo" v-if="item.src&&item.src.length>0">
                    <img @click="previewImg(item.src,ix)" v-for="(i,ix) in item.src" :key="ix" :src="i" alt="">
                </span>
                <span class="need-date">{{item.issueTime}}</span>
            </li>
        </ul>
    </section>
</template>

<script>
import panel from "../../components/panel";
import topNav from "../../components/nav";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import btn from "@/components/btn";
import user from "../../service/user.js";
let padDate=function(va){
     va=va<10?'0'+va:va;
     return va
}
export default {
    data() {
        return {
            duration: 1000,
            currentTab:0,
            autoplay: false,
            indicatorDots: false,
            over_time: '',
            start_time: '',
            userInfo: {},
            info:{
                state:''
            },
            items:'',
            lists:'',
        };
    },
    computed:{
        swiperTabList(){
            let cls = 'swiper-tab-list ';
            return cls;
        },
        
        
    },
    components: {
        panel,
        topNav,
        btn
    },
    onShareAppMessage: function (res) {
        util.request(api.share,{
            itemId:res.target.id
        }).then(res => {
        })
        return {
            title: '活动呗',
            desc: '',
            path: '/pages/detail/main?itemId='+res.target.id,
            //imageUrl:'../../../static/img/icon/add2.png'
        }
        
    },
    methods: {
        
        classwidth(num){
            let width = 'width:'+num+'%'
            return width
        },
        goToJoin(item){
            wx.navigateTo({  url:'../more2/main?id='+ item.itemId})
        },
        lookDetail(item){
            wx.navigateTo({  url:'../look-detail/main?itemId='+ item.itemId})
        },
        Detail(item){
            wx.navigateTo({  url:'../detail/main?itemId='+ item.itemId})
        },
        itemDel(item){
            let that = this;
            util.request(api.itemDel,{itemId:item.itemId}).then(res => {
                that.getList(that.currentTab);
            })
        },
        revise(item){
            wx.navigateTo({  url:'../revise/main?id='+ item.itemId})
        },
        showText(index){
            this.lists[index].show = this.lists[index].show?false:true;
        },
        text(item){
            let obj = {
                1:'审核中',
                2:'进行中',
                3:'下架',
                4:'已结束',
                5:'审核通过',
                6:'已成团',
            }
            return obj[item.status]
        },
        btnWidth(item){
            let obj = {
                1:62,
                2:62,
                3:62,
                4:80,
                5:80,
                6:80,
            }
            return obj[item.status]
        },
        swichNav: function(index) {
            var that = this;
            console.log(3)
            this.setGetList(index);
            if (this.currentTab === index) {
                return;
            } else {
                that.currentTab=index;
            }
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
        /**
         * 滑动切换tab
         */
        bindChange(e) {
            var that = this;
            console.log(e)
           that.currentTab= e.target.current;
        },
        
        getInfo(){
            let that = this;
            return new Promise(function (resolve, reject) {
                util.request(api.info).then(res => {
                    that.info = res.data;
                    that.info.state = that.info.state?that.info.state:0;
                    resolve()
                    console.log(res)
                })
            });
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
        shareDetail(){
            debugger
        },
        getList(inx){
             
            let that = this;
            util.request(api.myItem,{
                status:inx?inx:''
            }).then(res => {
                console.log(111)
                console.log(res)
                that.items = res.data.item;
                that.items.map(item =>{
                    item.start_time = that.formatDate(item.start_time);
                    item.over_time = that.formatDate(item.over_time);
                    if(item.start_time.substring(0, 4)==item.over_time.substring(0, 4)){
                        item.over_time = item.over_time.substring(5, 10)
                    }
                })
                that.items.map(item=>{
                    if(item.image.indexOf('[')>=0){
                        item.image = JSON.parse(item.image)[0]
                    }
                })
            })
        },
        Trim(str) {  //str表示要转换的字符串
            return str.replace(/\n|\r\n/g,"<br/>");
        },
        getConsumer(){
            let that = this;
            that.currentTab = 5;
            util.request(api.needList).then(res => {
                console.log(3333)
                console.log(res)
                
                res.data.map(item=>{
                    item.issueTime = that.showTime(item.issueTime);
                    item.show = false;
                })
                that.lists = res.data;
                that.lists.map(item=>{
                    item.src = [];
                    item.src = JSON.parse(item.img);
                    item.summarizes = that.Trim(item.summarize);
                })
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
            return year+'-'+month+'-'+day;
        },
        goTO(item){
            wx.redirectTo({  url:'../detail/main?itemId='+ item.itemId})
        },
        setGetList(index){
            let that = this;
            if(that.info.state===1){
                that.getList(index)
            }else{
                that.getConsumer()
                
            }
        }
    },
    onLoad(config){
        let that = this;
        this.getInfo().then(function(){
            console.log(that.info)
            //that.swichNav(0);
            that.setGetList(0);
            if(config.id==1){
                that.getConsumer()
            }
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
.prog-info{
    width: 100%;
    display: inline-block;
    font-size: 14px;
    color: #999;
    margin-top: 20px;
    margin-bottom: 10px;
    .prog-info-tiao{
        float: right;
        >span{
            width: 100px;
            height: 10px;
            border: 1px solid red;
            display: inline-block;
            border-radius: 10px 10px 10px 10px;
            margin-right: 15px;
            >span{
                background: red;
                height: 100%;
                display: inline-block;
                vertical-align:top;
            }
        }
    }
}
.release-info{
    display: inline-block;
    position: absolute;
    height: 40px;
    bottom: 0px;
    left: 0;
    width: 100% !important;
    margin: 0px !important;
    .info-bg{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        background: #000;
        opacity: 0.5;
    }
    >span{
        width: 25% !important;
        display: inline-block;
        text-align: center;
        position: absolute;
        bottom: 5px;
        color:#fff;
        margin: 0 !important;
        z-index: 999;
        line-height:16px;
    }
}
hr{
    width: 99%;
    margin: 0 auto;
    background-color:#eee;

}
.btn-opt{
    margin-top: 10px;
    height: 30px;
    font-size: 16px;
    display: inline-block;
    width: 30%;
    text-align: center;
    line-height: 30px;
    margin-right: 5px;
    border:1px solid #8b8b8b;
    border-radius: 3px;
    vertical-align:top;
    background: #fff;
}
button.btn-opt{
    height: 32px;
    line-height: 32px;
}
.share-button{
    border: none;
    background: transparent;
}
.need-photo{
    display:inline-block;
    width:100%;
    img{
    margin-top: 5px;
        width:50px;
        height: 50px;
        margin-right: 10px;
        display: inline-block;
    }
}
.need-list{
    background: #fff;
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
.bg-1{
    background: url('../../../static/img/icon/1.png');
    width: 28px !important;
    height: 53px;
    background-size:100%; 
    position: absolute;
    top:-6px;
    right:9px;
    font-size:13px;
    color:#fff;
    background-repeat:no-repeat;
    text-align:right;
    padding-right:5px;
    box-sizing:border-box;
    padding-top:3px;
}
.bg-2{
    background: url('../../../static/img/icon/2.png');
    width: 28px !important;
    height: 53px;
    background-size:100%; 
    position: absolute;
    top:-6px;
    right:9px;
    font-size:13px;
    color:#fff;
    background-repeat:no-repeat;
    text-align:right;
    padding-right:5px;
    box-sizing:border-box;
    padding-top:3px;
}
.bg-3{
    background: url('../../../static/img/icon/3.png');
    width: 28px !important;
    height: 53px;
    background-size:100%; 
    position: absolute;
    top:-6px;
    right:9px;
    font-size:13px;
    color:#fff;
    background-repeat:no-repeat;
    text-align:right;
    padding-right:5px;
    box-sizing:border-box;
    padding-top:3px;
}
.release-lists{
    margin-top: 10px;
}
.release-list + .release-list{
    border-top:10px solid #efefef
}
.release-list{
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    padding:12px 9px 16px 9px;
    position: relative;
    em{
        width: 100%;
        height: 1px;
        display: inline-block;
        background: #eee;
    }
    .release-title{
        display: inline-block;
        width: 100%;
        font-size: 15px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .release-content{
        margin-top: 5px;
        display: inline-block;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        span{
            width: 210px;
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            margin-left: 10px;
            margin-top: 7px;
        }
        img{
            width: 100%;
        }
        
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
}
.swiper-tab{
	width: 100%;
	border-bottom: 1px solid #fefefe;
    background: #fff;
    height: 45px;
    box-sizing: border-box;
	line-height: 45px;
    display: inline-block;
    span{
        height: 42px;
	    line-height: 45px;
        display: inline-block;
    }
}
.swiper-tab-list{  
    font-size: 15px;
    display: inline-block;
	width: 20%;
    color: #333;
    text-align: center;
}
.on{
    span{
        border-bottom: 2px solid #f94c51;
        color: #f94c51;
    }
}
 
.swiper-box{ display: block; height: 100%; width: 100%; overflow: hidden; }
.swiper-box span{
	text-align: center;
}
.order-wrap{
    swiper{
        height: 550px;
    }
}
</style>
<style>
.big-btn{
    position: absolute;
    bottom: 7px;
    right: 14px;
}
page{
     background: #fff;
}

.help-list span {
    display: none;
}
.help-list ul li {
    font-size: 14px;
    color: #2e2e2e;
    font-weight: normal;
}
</style>

