<template>
    <section class="classify-wrap">
        <topSlider enabled="3" cname="nav-first classify-nav" activeColor="#f85354" url="image_url" indicatorColor="#fff" :movies="movies"></topSlider>
        <ul :class="hotClass" class=" classify-children">
            <li @click="classifyClick(item)" v-if="item.is_parent!=1&&item.parent_id==parentId&&item.status===1&&classifyIndex!=0" v-for="(item,index) in list" :key="index">
                <img :src="item.img_url" alt="" />
                {{item.name}}
            </li>
            <li @click="classifyClick(item)" v-if="classifyIndex===0" v-for="(item,index) in list" :key="index">
                <img :src="item.img_url" alt="" />
                {{item.name}}
            </li>
        </ul>
        <dl class="classify-list">
            <dt @click="changeItem('推荐',0)" :class="classifyIndex===0?'classify-select':''">
                <span>
                    为你推荐
                </span>
            </dt>
            <dt @click="changeItem(item,index+1)" v-if="item.is_parent==1&&item.status===1" :class="classifyIndex===index+1?'classify-select':''" v-for="(item,index) in classifyList" :key="index">
                <span>
                    {{item.name}}
                </span>
            </dt>
        </dl>
        <navBar act="classify" :list="navList"></navBar>
    </section>
</template>

<script>
import navBar from "@/components/nav-bar";
import topSlider from "@/components/slider";
import panel from "../../components/panel";
import topNav from "../../components/nav";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import user from "../../service/user.js";
import btn from "@/components/btn";
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
                    img:'../../static/img/icon/selected-category.png'
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
                    img:'../../static/img/icon/me.png',
                    url:'../me/main'
                },
            ],
            userInfo: {},
            classifyIndex:0,
            parentId:0,
            childrenList:[],
            classifyList:[],
            topTips:1,
            list:[],
            movies:[],
            hotLists:[
                {
                    name:'石材'
                },
                {
                    name:'石材'
                },
                {
                    name:'石材'
                },
                {
                    name:'石材'
                },
                {
                    name:'石材'
                },
            ]
        };
    },
    computed:{
        hotClass(){
            let cls = '';
            if(this.classifyIndex ==0){
                cls = 'hot-list'
            }
            return cls;
        }
    },
    components: {
        panel,
        topNav,
        btn,
        topSlider,
        navBar
    },
    methods: {
        classifyClick(item){
            console.log(item.item_cat_id)
            let url = '../shop-list/main?id='+item.item_cat_id+'&name='+item.name
            wx.navigateTo({  url:url })
        },
        changeItem(item,index){
            this.classifyIndex = index;
            this.parentId = item.item_cat_id;
            if(index!==0){
                this.list =  this.classifyList;
                console.log(this.list)
                this.topTips = 0;
            }else{
                this.list =  this.hotLists;
                console.log(this.list)
                this.topTips = 1;
            }
        },
        getClassify(){
            let that = this
            util.request(api.classify).then(res => {
                console.log('class');
                //console.log(res);
                that.classifyList = res.data.catList;
                that.changeItem(res.data.catList[0],0);
            });
        },
        getRecommendCatList(){
            let that = this
            return util.request(api.recommendCatList).then(res => {
                console.log('class');
                console.log(res);
                that.hotLists = res.data;
                //that.changeItem(res.data.catList[0],0);
            });
        }
    },
    onLoad(){
        wx.showLoading({
            mask:true,
            title: '加载中',
            icon: 'loading',
        })
        this.childrenList=[];
        this.classifyList=[];
        let that = this;
        this.getRecommendCatList().then(function(){
            that.getClassify()
        })
        util.request(api.homeSowingMap,{
            ad_position_id:2
        }).then(res => {
            console.log(11111)
            console.log(res)
            that.movies = res.data.adList;
            wx.hideLoading()
        });
    },
    onShow() {
        

    }
};
</script>
<style scoped lang="scss">

.classify-children{
    margin-left: 80.5px;
    width: 270px;
    display: inline-block;
    background: #fff;
    border-radius: 20px;
    position: relative;
    margin-left:94px;
    padding-top:8px;
    padding-bottom:20px;
    li{
        width:33.33%;
        height: 69px;
        display: inline-block;
        font-size: 13px;
        line-height: 28px;
        margin-top: 10px;
        text-align: center;
        color: #666666;
        img{
            width:70px;
            height: 55px;
            display:block;
            margin:0 auto;
        }
    }
}
.classify-list{
    position: absolute;
    min-height: 100%;
    width: 90px;
    background:#fefefe;
    box-sizing: border-box;
    top:0px;
    border-right:solid 1px #eee;
    dt{
        width: 100%;
        display: inline-block;
        height: 28px;
        font-size: 13px;
        line-height: 28px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        color: #333333;
    }
}
</style>

<style lang="scss">
.nav-border{
    border-bottom:1px solid #eee;
}
.classify-nav{
    float:right;
    width:268px;
    margin-right:10px;
    border-radius:3px;
    height:140.371px;
}
.classify-wrap{
    /* position: relative; */
    .hot-list{
        width: 270px;
        display: inline-block;
        background: #fff;
        border-radius: 20px;
        position: relative;
        margin-left:94px;
        padding-top:8px;
        padding-bottom:20px;
        li{
            width:33.33%;
            height: 69px;
            img{
                width:70px;
                height: 55px;
                display:block;
                margin:0 auto;
            }
        }
        
    }
}

page{
     background: #fff;
}

.consumer-release-list span{
    display: none;
}
.consumer-release-list ul li{
    font-size: 14px;
    color: #2e2e2e;
    font-weight: normal;
}
.classify-select{
    border-left:3px solid #f67f67;
}
.classify-select span{
    position: relative;
    font-size:16px;
    color:#fa3346
}
</style>

