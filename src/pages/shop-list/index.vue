<template>
    <section class="order-wrap">
        <div style="height:100%;" class=" release">
            <span v-if="items.length==0" class="no-data"></span>
            <ul class="release-lists">
                <li @click="actClick(item)" v-for="(item,index) in items" :key="index">
                    <image :src="item.image" />
                    <div>
                        <h4>
                            {{item.title}}
                            <!-- <span>2.58km</span> -->
                        </h4>
                        <p>{{item.sell_point?item.sell_point:''}}</p>
                        <proGress :width="51" :num="item.shopping_num?item.shopping_num:0" :percent="item.percent?item.percent:0.00"></proGress>
                        <div style="margin-top:10px;">
                            <span class="join"><img src="../../../static/img/icon/join.png" alt="">{{item.now?item.now:0}}人参与</span>
                            <span class="visit"><img src="../../../static/img/icon/eye.png" alt="">{{item.read_count?item.read_count:0}}人浏览</span>
                            <btn @handle-click="joinClick(item)" text="我要报名"></btn>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import panel from "../../components/panel";
import topNav from "../../components/nav";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import btn from "@/components/btn";
import user from "../../service/user.js";
export default {
    data() {
        return {
            duration: 1000,
            currentTab:0,
            autoplay: false,
            indicatorDots: false,
            userInfo: {},
            items:[],
            name:'',
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
    methods: {
        joinClick(item) {
            let url = "../join-act/main?itemId=" + item.itemId;
            wx.navigateTo({ url: url });
        },
        actClick(item){
            let url = '../detail/main?itemId='+item.itemId;
            wx.navigateTo({  url:url })
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
        getList(id){
            let that = this;
            util.request(api.actList,{
                item_cat_id:id
            }).then(res => {
                that.items = res.data;
                that.items.map(item=>{
                    if(item.image.indexOf('[')>=0){
                        item.image = JSON.parse(item.image)[0]
                    }
                })
            })
        }
    },
    onLoad(config){
        console.log(config)
        this.name = config.name;
        wx.setNavigationBarTitle({  
                title:this.name
            }) 
        this.getList(config.id)
    },
    created() {
        //console.log(wx);

        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>

<style lang="scss">
@import "../../css/element.scss";
.release {
    padding: 0px 5px;
    box-sizing: border-box;
    background: #fff;
    padding-top: 0;
    > h4 {
        border-bottom: none;
    }
    ul {
        @include flex();
        justify-content: space-around;
        box-sizing: border-box;
        image {
            width: 120px;
            height: 90px;
            display: inline-block;
            margin-right: 10px;
            vertical-align: top;
        }
        li {
            display: inline-block;
            height: 114px;
            border-bottom: 1px solid #f7f7f7;
            box-sizing: border-box;
            padding-top: 10px;
            > div {
                display: inline-block;
                width: 60%;
                h4 {
                    font-size: 14.3px;
                    position: relative;
                    span {
                        position: absolute;
                        font-size: 8.5px;
                        color: #999999;
                        right: 0;
                        top: 3px;
                        letter-spacing: 1px;
                    }
                }
                p {
                    color: #666666;
                    overflow: hidden;
                    width: 80%;
                    letter-spacing: 1px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 11.5px;
                    line-height: 23px;
                }
                .btn {
                    float: right;
                    border: none;
                    background: linear-gradient(to right, #fa3346, #f67f67);
                }
               .join {
                    color: #a2a0a0;
                    font-size: 10px;
                    
                    background-position: 0px 1px;
                    background-repeat: no-repeat;
                    margin-right: 5px;
                    position: relative;
                    top: 6px;
                    img{
                        background-repeat: no-repeat;
                        width:13px;
                        height: 12px;
                        vertical-align:bottom;
                        margin-right: 5px;
                    }
                }
                .visit {
                    color: #a2a0a0;
                    font-size: 10px;
                    background-position: 0px 1px;
                    background-repeat: no-repeat;
                    position: relative;
                    top: 6px;
                    img{
                        background-repeat: no-repeat;
                        width:13px;
                        vertical-align:bottom;
                        height: 12px;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
.nav + .nav-first.release {
margin-top:61px !important;
}

.release-lists{
    background: #fff;
}
.release-list{
    display: inline-block;
    height: 165px;
    
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
        font-size: 13px;
        color: #333;
    }
    .release-content{
        margin-top: 10px;
        display: inline-block;
        position: relative;
        width: 100%;
        background: #eeeeee;
        box-sizing: border-box;
        padding-right: 14px;
        padding-top: 7px;
        padding-bottom: 7px;

        span{
            width: 210px;
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            margin-left: 10px;
            margin-top: 7px;
        }
        img{
            width: 100px;
            height: 100px;
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
    text-align: center;
    background: #fff;
    height: 45px;
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
	width: 25%;
	color: #333;
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
     background: #efeff4;
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

