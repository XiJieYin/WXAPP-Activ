<template>
    <section class="detail-wrap">
        <movable-area :style="{height: '100%', width: width+'px'}">
            <movable-view :animation="false" @change="changeM" direction="all" :x="x" :y="y" style="height: 50px; width: 50px;">
                <div class="code-icon" @click="bgHandle">
            <span>
                生成<br>海报
            </span>
        </div>
        </movable-view>
        <div class="canvas-bg" @click="bg=false" v-show="bg">
            <div></div>
            <canvas canvas-id="shareCanvas"></canvas>
            <btn @handle-click="downPhoto"  cname="big-btns" text="下载图片"></btn>
        </div>
         
        
        <ul class="detail-swiper-tab nav-first">
            <li :class="[swiperTabList,currentTab==0?'on':'']" data-current="0" @click="swichNav(0)">
                <span>活动</span>
            </li>
            <li :class="[swiperTabList,currentTab==1?'on':'']" data-current="1" @click="swichNav(1)">
                <span>详情</span>
            </li>
        </ul>
        <div class="detail-content-box">
            <div class="detail-content">
                <!-- 这是之前的代码 <topSlider enabled="3" activeColor="#f85354" url="url" gos="no" indicatorColor="#fff" :movies="discountsImage"></topSlider> -->
                <image :src="topPic" mode="aspectFill"></image>  <!-- 这是现在的代码 -->
                
                <!--这是之前的代码，为了看上去不像商城 <span v-if="status==5" class="detail-goods-bg detail-goods-bg2">
                    <span class="detail-left">
                        <span class="goods-price-now">
                            ¥{{discounts_id?discounts_id:'免费'}}
                        </span>
                        <span class="target-detail">
                            <span class="detail-collectioned">
                                已销售：{{shopping_num?shopping_num:0}}件
                            </span>
                            <span class="goods-price-org">
                                ¥{{zero}}
                            </span>
                            <span v-if="genre==1" class="detail-target">
                                <img src="../../../static/img/icon/time.png" alt="">
                                限时抢购
                            </span>
                            <span v-if="genre==2" class="detail-target">
                                <img src="../../../static/img/icon/time.png" alt="">
                                拼团活动
                            </span>
                            <span v-if="genre==3" class="detail-target">
                                <img src="../../../static/img/icon/time.png" alt="">
                                免费活动
                            </span>
                        </span>
                    </span>
                    <span class="detail-right">
                        <span v-if="status==2">距结束仅剩</span>
                        <span  v-if="status==5">距开始还有</span>
                        <span class="act-close-time">
                            <li>{{day}}</li>
                            <span>:</span>
                            <li>{{hour}}</li>
                            <span>:</span>
                            <li>{{minutes}}</li>
                            <span>:</span>
                            <li>{{seconds}}</li>
                        </span>
                    </span>
                </span> 
                <span v-if="status==4" class="detail-goods-bg detail-goods-bg3">
                    <span class="detail-left">
                        <span class="goods-price-now">
                            ¥{{discounts_id?discounts_id:'免费'}}
                        </span>
                        <span class="target-detail">
                            <span class="detail-collectioned">
                                已销售：{{shopping_num?shopping_num:0}}件
                            </span>
                            <span class="goods-price-org">
                                ¥{{zero}}
                            </span>
                            <span v-if="genre==1" class="detail-target">
                                <img src="../../../static/img/icon/time.png" alt="">
                                限时抢购
                            </span>
                            <span v-if="genre==2" class="detail-target">
                                <img src="../../../static/img/icon/time.png" alt="">
                                拼团活动
                            </span>
                            <span v-if="genre==3" class="detail-target">
                                <img src="../../../static/img/icon/time.png" alt="">
                                免费活动
                            </span>
                        </span>
                    </span>
                    <span class="detail-right">
                        <span v-if="status==2">距结束仅剩</span>
                        <span  v-if="status==5">距开始还有</span>
                        
                        <span v-if="status==4" class="act-close-time">
                            <li>0</li>
                            <span>:</span>
                            <li>0</li>
                            <span>:</span>
                            <li>0</li>
                            <span>:</span>
                            <li>0</li>
                        </span>
                        <span v-else class="act-close-time">
                            <li>{{day}}</li>
                            <span>:</span>
                            <li>{{hour}}</li>
                            <span>:</span>
                            <li>{{minutes}}</li>
                            <span>:</span>
                            <li>{{seconds}}</li>
                        </span>
                    </span>
                </span>
                <span v-if="status==2" class="detail-goods-bg">
                    <span class="detail-left">
                        <span class="goods-price-now">
                            ¥{{discounts_id?discounts_id:'免费'}}
                        </span>
                        <span class="target-detail">
                            <span class="detail-collectioned">
                                已销售：{{shopping_num?shopping_num:0}}件
                            </span>
                            <span class="goods-price-org">
                                ¥{{zero}}
                            </span>
                            <span v-if="genre==1" class="detail-target">
                                <img src="../../../static/img/icon/time.png" alt="">
                                限时抢购
                            </span>
                            <span v-if="genre==2" class="detail-target">
                                <img src="../../../static/img/icon/time.png" alt="">
                                拼团活动
                            </span>
                            <span v-if="genre==3" class="detail-target">
                                <img src="../../../static/img/icon/time.png" alt="">
                                免费活动
                            </span>
                        </span>
                    </span>
                    <span class="detail-right">
                        <span v-if="status==2">距结束仅剩</span>
                        <span  v-if="status==5">距开始还有</span>
                        
                        <span v-if="over_time<today&&status!=5" class="act-close-time">
                            <li></li>
                            <span>:</span>
                            <li></li>
                            <span>:</span>
                            <li></li>
                            <span>:</span>
                            <li></li>
                        </span>
                        <span v-else class="act-close-time">
                            <li>{{day}}</li>
                            <span>:</span>
                            <li>{{hour}}</li>
                            <span>:</span>
                            <li>{{minutes}}</li>
                            <span>:</span>
                            <li>{{seconds}}</li>
                        </span>
                    </span>
                </span>-->
                <span class="detail-info detail-info2" style="padding:0;z-index:99;">
                    <button :hoverStopPropagation="true" @click="shareDetail" catchtap open-type='share' class="detail-share">
                            分享
                    </button>
                </span>
                <span class="detail-info detail-info2" style="padding:0;z-index:99;">
                    <span @click="showMap(site)" class="address-icon">
                        定位
                    </span>
                </span>
                <span class="detail-info detail-info-title" style="padding-top:0;">
                    
                    <p class="detail-info-title">{{title}}</p>
                    <span class="detail-bail">
                        ¥{{guarantee?guarantee:0}}
                        <i>活动保证金</i>
                        <!-- <span class="detail-integral">
                            可用积分
                            <span>1000</span>
                        </span> -->
                    </span>
                </span>


                
                <span class="detail-dec">
                    <div style="border-bottom:1px #ddd solid;padding:10px 0px;border-top:5px #eee solid;">
                        <img src="../../../static/img/icon/time1.png" style="background:black;width:20px;height:20px;margin-right:10px;" alt="">活动时间：{{start_time}}至{{overTime}}
                    </div>npm
                    <div style="border-bottom:1px #ddd solid;padding:10px 0px;">
                        <img src="../../../static/img/icon/time.png" style="background:black;width:20px;height:20px;margin-right:10px;" alt="">
                        活动地点：{{item_site}}
                    </div>
                    <div style="border-bottom:10px #eee solid;padding:10px 0px;">
                        <img src="../../../static/img/icon/time.png" style="background:black;width:20px;height:20px;margin-right:10px;" alt="">活动时间：{{start_time}}至{{overTime}}
                    </div>
                    <h4>
                        <img src="../../../static/img/icon/dec.png" alt="">总数量180/已预订数量130
                    </h4>
                    <span class="shop-link" @click="toSeller">
                        <img :src="shooImage" alt="">
                        <span style="display:inline-block;">{{merchant_name}}</span>
                        <span class="shop-link-text">查看</span>
                        <!-- （线下实体交易供货商） -->
                    </span>
                    <dl class="condition-list">
                        <dt class="">活动时间：{{start_time}}至{{overTime}}</dt>
                        <dt class="">活动地点：{{item_site}}</dt>
                        <dt class="">每单最少起订量：{{least}}件</dt>
                        <dt class="">库存数量：{{num}}件</dt>
                        <dt class="" v-if="genre==2">活动成功标志：参与活动不少于{{two}}人</dt>
                        <dt class="">送货方式：{{goods_desc}}</dt>
                        <dt class="good-desc" v-if="supplement">{{supplement}}</dt>
                        <dt v-if="two==1&&!three&&!five&&three!==0&&five!==0">价格递减方式：随团人数递增满足条件后价格递减，最</dt>
                        <dt  v-if="two==1&&!three&&!five&&three!==0&&five!==0">终成交价格根据参加活动的人数来决定，分为三档：</dt>
                    </dl>
                    <dl v-if="genre==2"  class="discount-list">
                        <dt :class="level>=1?'bg':''">
                            <span class="price-now">¥{{one?one:'免费'}}</span>
                            <span class="price-org">¥{{zero}}</span>
                            <span class="price-title">
                                <p>
                                    活动累计销售{{two}}件后可享受此优惠
                                </p>
                            </span>
                        </dt>
                        <dt :class="level>=2?'bg':''" v-if="three!=0">
                            <span class="price-now">¥{{three?three:'免费'}}</span>
                            <span class="price-org">¥{{zero}}</span>
                            <span class="price-title">
                                <p>
                                    活动累计销售{{four}}件后可享受此优惠
                                </p>
                            </span>
                        </dt>
                        <dt :class="level==3?'bg':''" v-if="five">
                            <span class="price-now">¥{{five?five:'免费'}}</span>
                            <span class="price-org">¥{{zero}}</span>
                            <span class="price-title">
                                <p>
                                    活动累计销售{{six}}件后可享受此优惠
                                </p>
                            </span>
                        </dt>
                    </dl>
                    <span class="enroll" v-if="joinList.length>0">
                        已报名({{joinList.length}})
                        <span @click="more">更多</span>
                    </span>
                    <ul class="enroll-list" v-if="joinList.length>0">
                        <li v-if="index<5" v-for="(item,index) in joinList" :key="index">
                            <img :src="item.avatar" alt="">
                            <span>{{item.nickname}}</span>
                        </li>
                    </ul>
                    <span v-if="detailShow" class="important-tip" @click="showDetail">
                        <img src="../../../static/img/icon/help.png" alt=""> 活动详情
                    </span>
                    <span class="center-text" v-if="!detailShow">
                        下拉显示详情
                    </span>
                    <span v-show="detailShow" style="text-align: justify;" class="item-desc" v-html="item_desc"></span>
                    <img v-show="detailShow" mode="widthFix" class="img-desc" v-for="(item,index) in item_img" :key="index" :src="item" alt="">
                    
                </span>
            </div>
            <!-- <span class="detail-btn">
                <span @click="goToHome" class="red">首页</span>
                <span @click="changeCare" :class="care">关注</span>
                <span @click="joinAct" class="red">我要报名</span>
            </span> -->
        </div>
        <div class="scroll-view-item tabs1" id="tabs1" style="dispaly:inline-block;width:100%;backgroud:#000;box-sizing:border-box;"></div>
        </movable-area>
        <div class="nav-bar">
            <ul>
                <li @click="goToHome('../home/main')">
                <img src="../../../static/img/icon/home.png" />
                <p>首页</p>
                </li>
                <li @click="changeCare">
                    <img v-if="!item_type" src="../../../static/img/icon/unlike.png" />
                    <img v-if="item_type" src="../../../static/img/icon/like.png" />
                    <p>关注</p>
                </li>
                <li class="red" v-if="percent<100&&over_time>today&&status!=5&&status!=4" @click="joinAct('../classify/main')">
                    我要报名
                </li>
                <li class="greed" v-if="status==5">
                    即将开始
                </li>
                <li class="red" v-if="percent==100&&over_time>today&&status!=5">
                    名额已满
                </li>
                <li class="gray" v-if="status==4">
                    活动过期
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import topSlider from "@/components/slider";
import panel from "../../components/panel";
import topNav from "../../components/nav";
import config from '../../utils/config';
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import btn from "@/components/btn";
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50;
let padDate=function(va){
     va=va<10?'0'+va:va;
     return va
}
export default {
    onReachBottom(){
       this.detailShow = true;
    },
    data() {
        return {
            topPic:'',/*顶部图片*/
            bg:false,
            showImg:false,
            detailShow:false,
            level:0,
            item_img:[],
            seconds:'',
            status:'',
            item_site:'',
            csetInterval:'',
            over_time:'',
            supplement:'',
            site:'',
            start_time:'', 
            overTime:'', 
            width:width,
            height:height,
            minutes:'',
            today:new Date().getTime(),
            hour:'',
            day:'',
            scroll:'',
            dddd:'',
            shooImage:'',
            discountsImage:'',
            duration: 1000,
            currentTab: 0,
            detailList:'',
            now:0,
            guarantee:0,
            autoplay: false,
            showOne: false,
            indicatorDots: false,
            userInfo: {},
            discounts_id: 80,
            zero: 0,
            one: 0,
            two: 0,
            genre: '',
            percent: 0,
            three: '',
            four: '',
            five: '',
            six: '',
            title:'',
            itemId:'',
            num:0,
            item_desc:'',
            item_type:0,
            shareImg:'',
            goods_desc:'',
            merchant_name:'',
            url:'',
            shopping_num:'',
            joinList:[],
            x:350,
            y:100,
            least:0,
            orderList: [
                {
                    name: "全部"
                },
                {
                    name: "待成团"
                },
                {
                    name: "已成团"
                },
                {
                    name: "活动失败"
                }
            ]
        };
    },
    onPageScroll (e){
        if(e.scrollTop>120){
            this.currentTab = 1
        }else{
            this.currentTab = 0;
        }
    },
    computed: {
        swiperTabList() {
            let cls = "swiper-tab-list ";
            return cls;
        },
        care() {
            let cls = "";
            if(this.item_type==1){
                cls = 'red';
            }
            return cls;
        },
        swiperClass() {
            let cls = "";
            if (this.currentTab == 0) {
                cls = "swiper-0";
            } else if (this.currentTab == 1) {
                cls = "swiper-1";
            } else {
                cls = "swiper-2";
            }
            return cls;
        }
    },
    components: {
        panel,
        topNav,
        btn,
        topSlider
    },
    onShareAppMessage: function () {
        util.request(api.share,{
            itemId:this.itemId
        }).then(res => {
        })
        return {
            title: '活动呗',
            desc: '',
            path: '/pages/detail/main?itemId='+this.itemId,
            //imageUrl:'../../../static/img/icon/add2.png'
        }
        
    },
    methods: {
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
        more(){
            wx.navigateTo({  url:'../more2/main?id='+this.itemId })
        },
        showMap(site){
            wx.showToast({ 
                title:'加载中', 
                icon:'loading', 
                mask:true 
            })
            wx.request({
                url: 'https://apis.map.qq.com/ws/geocoder/v1/?address='+site+'&key=TFBBZ-T6R63-XAW3Z-3GLFR-2BKNF-FAFBS',
                data: {},
                header: {
                    'Content-Type': 'application/json'
                },
                success: function (res) {
                    //that.markers.latitude = res.data.result.location.lat
                    // that.latitude = res.data.result.location.lng
                // that.markers.longitude = res.data.result.location.lng
                    // that.longitude = res.data.result.location.lng
                    let url = '../map/main?lat='+res.data.result.location.lat+'&lng='+res.data.result.location.lng+'&name='+site;
                    wx.hideLoading()
                    wx.navigateTo({  url:url })
                },
                fail: function () {
                    //page.setData({ currentCity: "获取定位失败" });
                },
            })
        },
        goToHome(){
            wx.redirectTo({  url:'../home/main' })
        },
        changeM(e){
            console.log(e)
            this.x = e.x
            this.y = e.y
        },
        showDetail(){
            this.detailShow = true;
        },
        downPhoto(){
            let that = this;
            wx.getSetting({
                success(res) {
                    // 如果没有则获取授权
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                        wx.saveImageToPhotosAlbum({
                            filePath: that.shareImg,
                            success() {
                            wx.showToast({
                                title: '保存成功'
                            })
                            },
                            fail() {
                            wx.showToast({
                                title: '保存失败',
                                icon: 'none'
                            })
                        }
                    })
                },
                fail() {
                // 如果用户拒绝过或没有授权，则再次打开授权窗口
                //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
                }
            })
            } else {
                // 有则直接保存
                wx.saveImageToPhotosAlbum({
                    filePath: that.shareImg,
                    success() {
                    wx.showToast({
                        title: '保存成功'
                    })
                    },
                    fail() {
                    wx.showToast({
                        title: '保存失败',
                        icon: 'none'
                    })
                }
            })
            }
                }
            })
        },
        shareDetail(){

        },
        bgHandle(){
            if(this.showOne){
                this.bg = true;
                return
            }
            this.showOne = true;
            wx.showLoading({
                mask:true,
                title: '海报生成中',
                icon: 'loading',
            })
            
            //使用wx.createContext获取绘图上下文context
             
            // context.draw()
            let that = this;
            wx.getImageInfo({
            src: this.discountsImage[0].url,
            success: function (res) {
                let pic  = res.path
                var context =  wx.createCanvasContext('shareCanvas')
                context.fillStyle = "#fff";
                context.fillRect(0, 0, 300, 420);
                util.request(api.QRcode).then(res => {
                    wx.getImageInfo({
                        src:  res.data.value,
                        success: function (res) {
                            context.drawImage(
                                pic, 20, 20,260,200
                            );
                            console.log('关注')
                            context.drawImage(
                                res.path, 110, 320,70,70
                            );
                            context.setLineWidth(0)
                            context.setStrokeStyle('#ccc')
                            context.setShadow(10, 10, 50, '#ccc')
                            context.fillRect(20, 220,260,80)
                            context.setTextAlign('center')
                            context.setFillStyle('#000')
                            //context.drawImage(res.path, 0, 0, 150, 100)
                            let t;
                            if(that.title.length>36){
                                t = that.title.substring(0,30);
                            }else{
                                t = that.title
                            }
                            that.drawText(t, 150, 230,240,context)
                            /* that.drawText('¥'+that.discounts_id, 150, 302,240,context,'#f34f45')
                            that.drawText('¥'+that.zero, 150, 330,240,context) */
                            that.drawText('长按扫码，更多惊喜！', 150, 385,240,context,'#ccc')
                            context.draw()
                            wx.hideLoading();
                            that.bg = true;
                            setTimeout(() => {
                            // 将生成的canvas图片，转为真实图片
                            wx.canvasToTempFilePath({
                                x: 0,
                                y: 0,
                                canvasId: 'shareCanvas',
                                success: function (res) {
                                console.log(111);
                                that.shareImg = res.tempFilePath;
                                },
                            })
                            },500)
                        }
                    })
                
                // wx.request({
                //     url: "https://api.weixin.qq.com/cgi-bin/token",
                //     method: "GET",
                //     data: {
                //         appid: "wx7ac77e39dc063061",
                //         grant_type: "client_credential",
                //         secret: "c758f24f8fc6fee050952fad3847f123"
                //     },
                //     header: {
                //         "Content-Type": "application/json",
                //         "X-Nideshop-Token": wx.getStorageSync("token")
                //     },
                //     success: function(res) {
                        
                //         console.log(11111)
                        
                //         // wx.request({
                //         //     url:
                //         //         "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" +
                //         //         res.data.access_token,
                //         //     method: "POST",
                            
                //         //     data: {
                //         //         path: "page/home/index",
                //         //         width:300,
                //         //         scene:"1234&123",
                //         //         is_hyaline:true,
                //         //     },
                //         //     responseType:'arraybuffer',
                //         //     header: {
                //         //         "content-type": "blob",
                //         //         "X-Nideshop-Token": wx.getStorageSync("token"),
                                
                //         //     },
                //         //     success: function(res) {
                //         //         console.log(11111111111);
                //         //         console.log(res);
                //         //         wx.downloadFile()
                //         //         that.ddd = 'data:image/png;base64,'+wx.arrayBufferToBase64(res.data);
                //         //         console.log(res)
                                

                //         //     },
                //         //     fail: function(err) {
                //         //         wx.hideLoading();
                                
                //         //     }
                //         // });
                //     },
                //     fail: function(err) {
                //         reject(err);
                //         wx.hideLoading();
                //         console.log("failed");
                //     }
                // });
                })
                
                
                }
            })
            
            //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
        },
        drawText(t,x,y,w,context,color){

            var chr = t.split("");
            var temp = "";              
            var row = [];

            context.font = "14px Arial";
            context.fillStyle = color?color:"black";
            context.textBaseline = "middle";

            for(var a = 0; a < chr.length; a++){
                if( context.measureText(temp).width < w ){
                    ;
                }
                else{
                    row.push(temp);
                    temp = "";
                }
                temp += chr[a];
            }

            row.push(temp);

            for(var b = 0; b < row.length; b++){
                context.fillText(row[b],x,y+(b+1)*20);
            }
        },
        changeCare(){
            this.item_type = this.item_type?0:1;
            util.request(api.careI,{
                itemId:this.itemId,
                item_type:this.item_type
            }).then(res => {
                wx.showToast({
                    title: res.errmsg
                })
                console.log('关注')
            })
        }, 
        joinAct(){
            let url = '../join-act/main?itemId='+this.itemId;
            wx.navigateTo({  url:url })
        },
        toSeller(){
            let url = '../seller/main?itemId='+this.itemId;
            wx.navigateTo({  url:url })
        },
        swichNav: function(index) {
            var that = this;
            if (this.currentTab === index) {
                return false;
            }
            that.currentTab = index;
            if(that.currentTab===0){
                wx.pageScrollTo({
                    scrollTop:0
                })
            }else{
                this.detailShow = true;
                wx.pageScrollTo({
                    scrollTop:665
                })
            }
        },
        /**
         * 滑动切换tab
         */
        bindChange(e) {
            var that = this;
            console.log(e);
            that.currentTab = e.target.current;
        },
        getTime(time){
            let t = time;
            t = Math.abs(t)
            this.day = parseInt(t / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
            this.hour = parseInt(t / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
            this.minutes = parseInt(t / 1000 / 60 % 60, 10);//计算剩余的分钟 
            this.seconds = parseInt(t / 1000 % 60, 10);//计算剩余的秒数 
            clearInterval(this.csetInterval);
            this.csetInterval = setInterval(()=>{
                if(this.seconds == 0){
                    this.seconds = 59;
                    if(this.minutes==0){
                        this.minutes = 59;
                        if(this.hour==0){
                            this.hour = 23;
                            this.day  = this.day-1
                        }else{
                            this.hour = this.hour-1;
                        }
                    }else{
                        this.minutes = this.minutes-1;
                    }
                }else{
                    this.seconds = this.seconds-1;
                }
            },1000)
            let that = this;
        },
        getDetail(id){
            let that = this;
            util.request(api.detail,{
                itemId:id
            }).then(res => {
                
                console.log('detail')
                console.log(res)
                
                
                that.over_time = res.data.item[0].over_time;
                
                that.genre = res.data.item[0].genre;
                that.goods_desc = res.data.item[0].goods_desc;
                that.percent = res.data.item[0].percent;
                that.supplement = res.data.item[0].supplement;
                that.detailList = res.data;
                that.item_type = res.data.item_type;
                that.now = res.data.item[0].now;
                that.shopping_num = res.data.item[0].shopping_num;
                that.least= res.data.discounts[0].least;
                that.guarantee = res.data.item[0].guarantee;
                that.title = res.data.item[0].title;
                    
                    console.log(444)
                if(res.data.item[0].image.indexOf('[')>=0){
                that.discountsImage = JSON.parse(res.data.item[0].image);
                    let t = [];
                    that.discountsImage.map(item=>{
                        let i = {};
                        i.url = item;
                        t.push(i);
                    })
                    that.discountsImage =t;
                    console.log(that.discountsImage)
                }else{
                    let i = {};
                    i.url = res.data.item[0].image;
                    that.discountsImage = [];
                    that.discountsImage.push(i);
                }
                
                /* 这是现在的代码  说是只想展示一张图片*/
                if(that.discountsImage[0] && that.discountsImage[0].url){
                    this.topPic = that.discountsImage[0].url;
                }
                /* 这是现在的代码 */
                
                that.shooImage = res.data.merchant[0].image;
                that.merchant_name = res.data.merchant[0].merchant_name;
                if(res.data.discounts[0].four==0){
                    that.discounts_id = res.data.discounts[0].one;
                }else if(res.data.discounts[0].four!=0&&res.data.item[0].shopping_num<res.data.discounts[0].four){
                    that.discounts_id = res.data.discounts[0].one;
                }else if(res.data.discounts[0].six==0&&res.data.item[0].shopping_num>=res.data.discounts[0].four){
                    that.discounts_id = res.data.discounts[0].three;
                }else  if(res.data.discounts[0].six!=0&&res.data.item[0].shopping_num<res.data.discounts[0].six&&res.data.item[0].shopping_num>=res.data.discounts[0].four){
                    that.discounts_id = res.data.discounts[0].three
                }else if(res.data.discounts[0].six!=0&&res.data.item[0].shopping_num>=res.data.discounts[0].six){
                    that.discounts_id = res.data.discounts[0].five
                }
                that.zero = res.data.discounts[0].zero;
                that.one = res.data.discounts[0].one;
                that.two = res.data.discounts[0].two;
                that.status = res.data.item[0].status;
                if(that.status==2){
                    let time1 = res.data.item[0].over_time;
                    let time2 = new Date().getTime();
                    let time = time1 - time2;
                    that.getTime(time);
                }else if(that.status==5){
                    let time1 = res.data.item[0].start_time;
                    let time2 = new Date().getTime();
                    let time = time2-time1;
                    that.getTime(time);
                }
                
                that.start_time= that.formatDate(res.data.item[0].start_time);
                that.overTime= that.formatDate(res.data.item[0].over_time);
                 if(that.start_time.substring(0, 4)==that.overTime.substring(0, 4)){
                    that.overTime = that.overTime.substring(5, 10)
                }
                that.item_site= res.data.item[0].item_site;
                that.three = res.data.discounts[0].three;
                that.four = res.data.discounts[0].four;
                that.five = res.data.discounts[0].five;
                that.six = res.data.discounts[0].six;
                that.item_desc = that.Trim(res.data.desc[0].item_desc);
                that.site = res.data.merchant[0].site;
                if(res.data.desc[0].item_img){
                    that.item_img = JSON.parse(res.data.desc[0].item_img)
                }
                console.log(7777)
                
                if(that.shopping_num>=that.six&&that.six!=0){
                    that.level = 3;
                }else if(that.shopping_num>=that.four&&that.four!=0){
                    that.level = 2;
                }else if(that.shopping_num>=that.two){
                    that.level = 1;
                }else{
                    that.level = 0;
                }
                that.num = res.data.item[0].num?res.data.item[0].num:0;
                console.log(res)
            });
        },
        Trim(str) {  //str表示要转换的字符串
            return str.replace(/\n|\r\n/g,"<br/>");
        },
        getJoin(id){
            let that = this;
            util.request(api.queryJoin,{
                itemId:id
            }).then(res => {
                that.joinList = res.data
            });
        },
    },
    onShow(){
        this.detailShow = false;
        },
    onLoad(config){
        console.log(config)
        this.itemId = config.itemId;
        this.shopping_num = '';
        this.detailShow = false;
        this.bg = false;
        this.showOne = false;
        this.getDetail(this.itemId);
        this.getJoin(this.itemId);
        this.x = 350;
        this.y = 100;
    },
    created() {
        // console.log(wx);
        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>

<style scoped lang="scss">
.detail-info2{
    height: 40px;
    width: 40px !important;
    float:right;
    background: transparent !important;
}
.enroll{
    font-size:14px;
    display: inline-block;
    width: 100%;
    line-height: 30px;
    border-bottom:1px solid #ccc;
    margin-top: 10px;
    position: relative;
    span{
        position: absolute;
        right: 5px;
        font-size:14px;
        color: #999; 
    }
}
.canvas-bg {
    div {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        z-index: 99999999999999;
    }
    canvas {
        width: 300px;
        height: 500px;
        position: absolute;
        left: 50%;
        top: 20px;
        margin-left: -150px;
        z-index: 999999999999999;
    }
}
.code-icon{
    width: 35px;
    height: 35px;
    display: inline-block;
    border-radius: 50%;
    background: #000;
    z-index:999999999;
    text-align: center;
    span{
        content: '';
        font-size: 9px;
        color: #fff;
        width: 29px;
        height: 29px;
        display: inline-block;
        margin-top: 3px;
        border-radius: 50%;
        border:1px dashed #fff;
        box-sizing:border-box;
        padding-top:3px;
        line-height:11px;
        letter-spacing:0.5px;

    }
}
.detail-content{
    padding-bottom:60px;
    background:#fff;
}
.enroll-list{
    li{
        margin-top:10px; 
        display: inline-block;
        width: 50px;
        height: 50px;
        img{
            border-radius: 50%;
            width: 50px;
            height: 50px;
        }
        span{
            width: 100%;
            display: inline-block;
            text-align: center;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #888;
        }
    }
    li+li{
        margin-left: 10px;
    }
}
.detail-btn {
    display: inline-block;
    width: 100%;
    height: 48px;
    position: fixed;
    bottom:0;
    line-height: 48px;
    span {
        width: 33.33%;
        height: 100%;
        display: inline-block;
        text-align: center;
        background: #e5e5e5;
        font-size: 18px;
        color: #666666;
        font-weight: bold;
    }
    span.red {
        background: linear-gradient(#fa3346, #f67f67);
        color: #fff;
        border-left:solid 1px #fa3346;
        box-sizing:border-box;
    }
}
li.red {
        background: linear-gradient(#fa3346, #f67f67);
        color: #fff;
        border-left:solid 1px #fa3346;
        box-sizing:border-box;
        line-height: 47px;
    }
li.greed {
        background: linear-gradient(#309838, #309838);
        color: #fff;
        border-left:solid 1px #309838;
        box-sizing:border-box;
        line-height: 47px;
    }
li.gray {
        background: linear-gradient(#888, #888);
        color: #fff;
        border-left:solid 1px #888;
        box-sizing:border-box;
        line-height: 47px;
    }
.detail-content-box{
    margin-top: 51px;
}
.important-tip {
    position: relative;
    font-size: 14px;
    color: #fa3a49;
    display: inline-block;
    width: 100%;
    margin-top: 11.5px;
    box-sizing: border-box;
    margin-bottom: 14px;
    &::before {
        content: "";
        position: absolute;
        width: 270px;
        height: 1px;
        display: inline-block;
        background: #ccc;
        right: 0px;
        top: 8px;
    }
    img {
        width: 13.5px;
        height: 13px;
        position: relative;
        top: 2px;
        margin-right: 4px;
    }
}
.item-desc{
    font-size:14px;
    line-height:20px;
    float: left;
    width:100%;
    color: #4f4f4f;
    letter-spacing: 1px;
    //display:inline-block;
    //padding-bottom:56px;
}
.img-desc{
    height: 240px;
}

.discount-list {
    margin-top: 9px;
    display: inline-block;
    width: 100%;
        text-align: center;
    dt.bg{
        background: url("../../../static/img/icon/discount-bg.png") no-repeat;
        background-size: 100%;
        .price-now {
            color: #fff;
        }
        .price-org {
            color: #c2c2c2;
        }
        .price-title {
            color: #ffbbbb;
        }
    }
    dt {
        width: 108px;
        height: 109px;
        display: inline-block;
        background: url("../../../static/img/icon/discount-bg2.png") no-repeat;
        background-size: 100%;
        text-align: center;
        vertical-align: top;
        .price-now {
            color: #666;
            font-size: 24px;
            display: inline-block;
            width: 100%;
            margin-top: 18px;
        }
        .price-org {
            color: #666;
            font-size: 11px;
            display: inline-block;
            width: 100%;
            float: left;
            margin-top: 4px;
        }
        .price-title {
            color: #666;
            font-size: 12px;
            display: inline-block;
            width: 100%;
            float: left;
            text-align: center;
            p {
                width: 73%;
                margin: 0 auto;
                margin-top: 5px;
                line-height: 15px;
            }
        }
    }
    dt + dt {
        margin-left: 10px;
    }
}
.good-desc{
    padding-left:60px;
}
.condition-list {
    margin-top: 6px;
    margin-left: 3px;
    dt {
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        font-size: 14px;
        float: left;
        margin: 5px 0px;
        color: #4f4f4f;
        letter-spacing: 1px;
    }
    dt.red {
        color: #fa3a49;
    }
}
.shop-link {
    display: inline-block;
    width: 100%;
    height: 61px;
    border-bottom: 1px solid #eeeeee;
    font-size: 12px;
    color: #333;
    position: relative;
    line-height:61px;
    .shop-link-text {
        position: absolute;
        background-size: 100%;
        right: 6px;
        top: 50%;
        font-size: 14px !important;
        color: #888;
        top: 0px;
        width: auto !important;
        color:#999999 !important;
    }
    img {
        position: relative;
        top: 10px;
        width: 42.5px;
        height: 42.5px;
        margin-right: 14.5px;
    }
    span {
        display: inline-block;
        font-size: 14px;
        vertical-align: top;
        width: 135px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #000;
        letter-spacing: 1px;
    }
}
.detail-dec {
    display: inline-block;
    width: 100%;
    background: #fff;
    margin-top: 10px;
    padding: 0 10px;
    box-sizing: border-box;
    h4 {
        display: inline-block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-size: 50%;
        border-bottom: 1px solid #eeeeee;
        font-size: 12px;
        color: #999999;
        img {
            width: 63.5px;
            height: 21.5px;
            top: 5px;
            position: relative;
            margin-left: 2px;
            margin-right: 5px;
        }
    }
}
.address-icon{
    width: 24px;
    height: 37px;
    position: absolute;
    top: 0px;
    background: url('../../../static/img/icon/address.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position:0px -2px;
    font-size:12px;
    line-height: 74px;
    color:#666;
    margin-top: 33px;
}
.detail-info-title{
    margin-top:-7px;
}
.detail-share {
    margin-top: 33px;
    position: absolute;
    color: #666;
    top: 0px;
    font-size: 12px;
    background: url("../../../static/img/icon/share.png") no-repeat;
    background-size: 100%;
    line-height: 74px;
    padding:0;
    &::after{
        border: none;
    }
}

.detail-info {
    background: #fff;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    padding: 11px 14px;
    position: relative;
    p {
        min-height: 32px;
        color: #000;
        font-size: 17px;
        display: inline-block;
        width: 100%;
        white-space: normal;
        padding-right: 78px;
        box-sizing: border-box;
        line-height: 22px;
        max-height:42px;
        overflow:hidden;
        letter-spacing: 1px

    }

    .detail-bail {
        color: #fa3a49;
        display: inline-block;
        width: 100%;
        font-size: 24px;
        margin-top: 12px;
        vertical-align: bottom;
        i {
            font-size: 11px;
            display: inline-block;
            vertical-align: bottom;
        }
    }
    .detail-integral {
        float: right;
        display: inline-block;
        vertical-align: bottom;
        font-size: 12px;
        color: #333;
        margin-top: 11px;
        span {
            color: #fa3a49;
            margin-left: 5px;
        }
    }
}
.act-close-time {
    position: absolute;
    color: #ca1921;
    left: 50%;
    margin-left: -43px;
    bottom: 0px;
    li {
        display: inline-block;
        background: #5b3510;
        color: #fff;
        border-radius: 3px;
        min-width: 18px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        padding: 0 1px;
        box-sizing: border-box;
        max-width: 25px;
    }
    span {
        display: inline-block;
        margin-left: 2px;
        font-size: 15px;
        color: #000;
        opacity: 0.8;
        margin-right: 1px;
        line-height: 20px;
    }
}
.target-detail {
    display: inline-block;
    width: 164px;
    vertical-align: top;
    margin-top:3px;
    position: absolute;
    right:127px;
}
.detail-left {
    display: inline-block;
    width: 70%;
}

.detail-right {
    display: inline-block;
    color: #ef1536;
    line-height: 30px;
    font-size: 12px;
    position: relative;
    box-sizing: border-box;
    padding-left: 40px;
    letter-spacing: 1px;
}
.goods-price-org {
    color: #fec7cd;
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
    margin-top: 9.5px;
    float: right;
    margin-right: 7.5px;
    text-decoration: line-through;
}
.goods-price-now {
    display: inline-block;
    color: #fff;
    margin-left: 12px;
    margin-top: 17.5px;
    font-size: 22px;
    max-width:90px;
    overflow:hidden;
    text-overflow: ellipsis;
}
.center-text{
    text-align: center;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    margin-top: 10px;
    color: #ef1536;
    height: 90px;
}
.detail-collectioned {
    display: inline-block;
    border-radius: 5px;
    width: 114px;
    height: 20px;
    background: #de1944;
    color: #fff;
    font-size: 13px;
    vertical-align: top;
    margin-top: 4px;
    text-align: right;
    line-height: 20px;
    padding-right: 7px;
    box-sizing: border-box;
    float: right;
}
.detail-target {
    display: inline-block;
    float: right;
    border-radius: 5px;
    height: 20px;
    padding: 0px 5px;
    line-height: 20px;
    text-align: center;
    background: #de1944;
    color: #fff;
    font-size: 13px;
    box-sizing: border-box;
    min-width: 98px;
    margin-top: 3px;
    img{
        width: 14px;
        height: 16px;
        vertical-align:top;
        padding-top:1px;
    }
}
.detail-goods-bg {
    background: #f61d4a;
    display: inline-block;
    width: 100%;
    height: 53.5px;
    position: relative;
    margin-bottom: -16px;
}
.detail-goods-bg.detail-goods-bg2 {
    background: #309838;
    display: inline-block;
    width: 100%;
    height: 53.5px;
    position: relative;
    margin-bottom: -16px;
    .detail-right {
        &::after {
            border-color: #309838 transparent #309838 #309838;
        }
    }
    .detail-target {
        background: #134617;
    }
    .detail-collectioned {
    background: #134617;
    }
}
.detail-goods-bg.detail-goods-bg3 {
    background: #888;
    display: inline-block;
    width: 100%;
    height: 53.5px;
    position: relative;
    margin-bottom: -16px;
    .detail-right {
        &::after {
            border-color: #888 transparent #888 #888;
        }
    }
    .detail-target {
        background: rgb(87, 87, 87);
    }
    .detail-collectioned {
    background: rgb(87, 87, 87);
    }
}
.detail-right {
    position: absolute;
    height: 53.5px;
    width: 124px;
    background: linear-gradient(#fff593, #f9e93d);
    overflow: hidden;
    right: 0px;
    &::after {
        content: "";
        width: 0;
        left: -26px;
        top: 0px;
        height: 0;
        border-width: 28px;
        border-right: 10px;
        position: absolute;
        border-style: solid;
        border-color: #f61d4a transparent #f61d4a #f61d4a;
    }
}
.no-data {
    background: url("../../../static/img/icon/no_data.png");
    width: 132.5px;
    height: 140.5px;
    background-size: 100%;
    position: relative;
    left: 50%;
    margin-top: 70px;
    margin-left: -66px;
    display: inline-block;
}
.detail-swiper-tab {
    top:0;
    padding: 0 60px;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid #fefefe;
    text-align: center;
    background: #fff;
    height: 50px;
    line-height: 35px;
    display: inline-block;
    border-top:solid #efeff4 10px;
    position: fixed;
    z-index: 99999;
    span {
        color: #999;
        height: 35px;
        line-height: 32.5px;
        display: inline-block;
    }
}
.swiper-tab-list {
    font-size: 14px;
    display: inline-block;
    width: 25%;
    color: #333;
}
.on {
    span {
        position: relative;
        color: #333;
        &::after {
            content: "";
            width: 5px;
            height: 5px;
            position: absolute;
            background: #f94c51;
            bottom: 3px;
            border-radius: 50%;
            left: 50%;
            margin-left: -2.5px;
        }
    }
}

.swiper-box {
    display: block;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.swiper-box span {
    text-align: center;
}
.detail-wrap {
    swiper {
        height: 692px;
        img {
            display: inline-block;
        }
    }
}
</style>
<style lang="scss">
swiper{
    height: 281.089px;
}
@import "../../css/element.scss";
.fixd-bg{
    div{
        background: #000;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
    }
    >span{
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #f67f67;
        bottom: 120px;
        z-index: 99999999;
        span{
            color: #fff;
            position: absolute;
            bottom: -20px;
            white-space: nowrap;
            left: 0;
            font-size: 12px;
        }
        img{
            width: 30px;
            height: 30px;
            margin-left: 10px;
            margin-top: 8px;
        }
    }
    .join-shop{
        left: 80px;
    }
    .send{
        right: 80px;
        img{
            margin-left: 11px;
            margin-top: 10px;
        }
    }
    .close{
        background: transparent;
        bottom: 20px;
        color: #fff;
        font-size: 40px;
        text-align: center;
        margin-left: -25px;
        left: 50%;
        font-weight:lighter
    }
}
.nav-bar{
    position: fixed;
    bottom:0;
    height: 47px;
    background: #f7f7fa;
    width: 100%;
    border-top: 0.5px solid #d3d3d3;
    ul{
        height: 100%;
        li.red{
            width:50%;
        }
        li.greed{
            width:50%;
        }
        li.gray{
            width:50%;
        }
        li{
            vertical-align: top;
            box-sizing: border-box;
            width: 25%;
            display: inline-block;
            height: 100%;
            text-align: center;
            img{
                width: 20.5px;
                height: 19px;
                margin-top: 4px;
            }
            p{
                font-size: 10px;
                color: #666666;
                margin-top: 6px;
            }
        }
        li.special-li{
            position: relative;
            span{
                width: 20.5px;
                height: 19px;
                margin-top: 4px;
                display: inline-block;
            }
            img{
                position: absolute;
                width: 46.2px;
                height: 47.4px;
                margin-top: -18px;
                left: 0;
                margin-left: 15px;
            }
        }
    }
}
.big-btns{
    width: 303px;
    box-sizing:border-box;
    padding: 0px 8px;
    height: 40px;
    line-height: 40px;
    border-radius:5px;
    background: linear-gradient( #f67f67, #fa3346);
    position: absolute;
    top: 460px;
    z-index: 9999999999999999999999999999;
    left: 50%;
    margin-left: -151.5px;
}
page {
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
movable-view{
    z-index: 999999999999;
}
</style>

