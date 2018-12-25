<template>
    <section @click="bodyClick" class="act-wrap">
        <dl class="act-edit act-edit2">
            <dt class="spel">
                <span>活动名称</span>
                <input placeholder-style="color:#888;" v-model="dataList.title" placeholder="请输入活动名称，如海尔空调优惠活动" />
            </dt>
            <dt class="spel">
                <span >行业分类</span>
                <span  @click="showPicker" class="all">{{valueClassfy}}</span>
                <mpvue-picker @onCancel="onCancel" mode="multiLinkageSelector" ref="mpvuePicker" :pickerValueArray="multiArray" :pickerValueDefault='pickerValueDefault' @onConfirm="onConfirm"></mpvue-picker>
            </dt>
            <dt class="spel">
                <span>市场售价</span>
                <input placeholder-style="color:#888;" v-model="dataList.zero" type="number" placeholder="请输入市场售价" />
            </dt>
            <dt class="spel">
                <span>最低起购数</span>
                <input placeholder-style="color:#888;" v-model="dataList.least" type="number" placeholder="默认为1，指单次参加活动的最低起购数量" />
            </dt>
            <dt class="spel">
                <span>库存数量</span>
                <input placeholder-style="color:#888;" v-model="dataList.num" type="number" placeholder=请输入参加活动的商品数量或名额 />
            </dt>
            <dt class="spel">
                <span>限购数</span>
                <input placeholder-style="color:#888;" v-model="dataList.most" type="number" placeholder="默认不限购，指对单个用户限购数量" />
            </dt>
            <dt class="spel">
                <span>活动亮点</span>
                <input placeholder-style="color:#888;" v-model="dataList.sell_point" type="text" placeholder="“全年保价”“送超值礼包”“爆款直降”“买一送一”等。" />
            </dt>
            <dt class="spel">
                <span>到店核销码</span>
                <input placeholder-style="color:#888;" v-model="dataList.check" maxlength="8" type="number" placeholder=设置身份识别的8位数字作为密码 />
            </dt>
            <dt style="width:50%;display:inline-block">
                <div class="index_section">
                <picker mode="date"
                :value="start_time"
                :start="pickerStart" end="2217-09-01" @change="endDateChange($event)">
                    <div class="index_picker">
                    <span class="">活动开始日期</span>
                    <div class="text-date">{{ start_time }}</div>
                    </div>
                </picker>
                </div>
            </dt>
             <dt style="width:50%;display:inline-block">
                <div class="index_section">
                <picker mode="date"
                :value="check_time"
                :start="pickerStart" end="2217-09-01" @change="endCheckTime($event)">
                    <div class="index_picker">
                    <span class="">最晚到店日期</span>
                    <div class="text-date">{{ check_time }}</div>
                    </div>
                </picker>
                </div>
            </dt>
            <!-- <dt>
                <picker mode="date"
                :value="endDate"
                :start="pickerStart" end="2217-09-01" @change="endDateChange($event)">
                    <div class="index_picker">
                    <span class="">结束时间</span>
                    <div class="text-date">{{ endDate }}</div>
                    </div>
                </picker>
            </dt> -->
            
        </dl>
        <dl class="act-edit">
            <dt style="height:auto">
                <span><span class="font13">商品图片</span>（最多可添加5张图片）</span>
                <div class="add-photo-wrap">
                    <ul>
                        <span class="imglist">
                            <li v-for="(item,index) in phtotList" :key="index" >
                                <img @click="chooseshopPhoto(e,index)" :src="item" alt="">
                                <span class="close-icon" @click="delPhoto(index)">X</span>
                            </li>
                            <li style="display:inline-block;" @click="chooseshopPhoto(e)" v-if="phtotList.length<5" class="add-photo"></li>
                        </span>
                    </ul>
                </div>
            </dt>
            <dt style="line-height:14px;margin-top:10px;">
                <span><span class="font13">商品或活动描述</span>（显示在详情页详情中）</span>
                <span class="textarea-input">
                <textarea placeholder-style="color:#888;" v-if="!showModal" class="textarea-input" v-model="dataList.item_desc" :placeholder="desc_p" name="textarea"/>

                </span>
                <div style="margin-bottom:10px;">
                    <ul>
                        <span style="display:inline-block;width:100%;margin-bottom:10px;"><span class="font13">活动详情</span>（最多可添加5张图片）</span>
                        <span>
                            <li style="display:inline-block;vertical-align:top;position:relative" v-for="(item,index) in phtotLists" :key="index" >
                                <img style="display:inline-block;vertical-align:top;" @click="chooseshopPhoto2(e,index)" :src="item" alt="">
                                <span class="close-icon" @click="delPhoto2(index)">X</span>
                            </li>
                            <li style="display:inline-block;" @click="chooseshopPhoto2(e)" v-if="phtotLists.length<5" class="add-photo textarea-photo"></li>
                        </span>
                    </ul>
                </div>
            </dt>
        </dl>
        <dl class="act-edit">
            <dt class="edit-title">
                <span style="width:auto" class="act-edit-title font13">优惠设置</span>
                <span @click="editClick(1)" :class="editCheck==1?'edit-checked edit-check':'edit-check'"><span></span></span><span @click="editClick(1)" class="font14">限时抢购</span><span @click="editClick(2)" :class="editCheck==2?'edit-checked edit-check':'edit-check'"><span></span></span><span @click="editClick(2)" class="font14">拼团活动</span><span @click="editClick(3)" :class="editCheck==3?'edit-checked edit-check':'edit-check'"><span></span></span><span @click="editClick(3)" class="font14">免费活动</span>
            </dt>
            <div v-if="editCheck==1" class="posi-rela" style="margin-bottom:10px;">
                <dt class="small spel">
                    <span>优惠价格</span>
                    <input placeholder-style="color:#888;" v-model="favP" type="number" placeholder="请输入优惠后的价格" />
                </dt>
            </div>
            <dt v-if="editCheck==1" style="text-align:center;height:auto">
                <p  style="color:#888">
                    <img width="13" height="13"  src="../../../static/img/icon/help.png" /><span>注：</span>限时抢购，用户在线报名参加活动后，在活动有限期间，随时可到活动发起方的指定活动地点，享受活动优惠，参加活动
                </p>
            </dt>
            <dt v-if="editCheck==3" style="text-align:center;height:auto">
                <p  style="color:#888">
                    <img width="13" height="13"  src="../../../static/img/icon/help.png" />免费活动，活动那个发起方不会收取任何费用，用户通过在线报名均可参与（指条件符合活动发起方要求者）
                </p>
            </dt>
            <div v-if="editCheck==2" class="posi-rela" v-for="(item,index) in proList" :key="index">
                <span v-if="index==0" class="tip-title">一级团</span>
                <span v-if="index==1" class="tip-title">二级团</span>
                <span v-if="index==2" class="tip-title">三级团</span>
                <dt class="normal2">
                    <span>销售件数</span>
                    <input placeholder-style="color:#888;" v-model="item.joinNun" type="number" placeholder="请输入活动成功的标志" />
                </dt>
                <dt class="small2">
                    <span>优惠价格</span>
                    <input placeholder-style="color:#888;" v-model="item.joinAct" type="number" placeholder="请输入满足目标人数后的优惠价格" />
                </dt>
                <dt v-if="proList.length>1" style="text-align:center;height:auto;margin-top:10px;">
                    <div @click="clickDelPro(index)" class="add-btn-project add-btn-project2">
                        减少优惠项目
                    </div>
                </dt>
            </div>
            <dt v-if="editCheck==2" style="text-align:center;height:auto">
                <a @click="showTip=true;desc_p = ''" id="show" style="display:inline-block;text-decoration-line:underline;color:#458165;width:100%;text-align:center;font-size:14px;">查看填写例子</a>
                <div v-if="proList.length<3" @click="clickJoinPro" class="add-btn-project">
                    增加优惠项目
                </div>
                <p style="color:#888">
                    <img width="13" height="13"  src="../../../static/img/icon/help.png" /><span>拼团活动原则：</span>最高三档拼团，用户可以设置三级阶梯价格，团人数递增，价格递减
                </p>
            </dt>
        </dl>
        <dl class="act-edit">
            <dt>
                <span class="act-edit-title" ><span class="font13">地址选择</span><span @click="siteClick(1)" :class="siteCheck==1?'edit-checked edit-check':'edit-check'"><span></span></span><span  @click="siteClick(1)" class="font14">签约注册时地址</span></span>
                <div style="line-height:15px;">
                    <span style="margin-left:0" @click="siteClick(2)" :class="siteCheck==2?'edit-checked edit-check':'edit-check'"><span></span></span><span @click="siteClick(2)" class="font14">其他地址</span>
                    <span v-if="siteCheck!=2" class="heigth26 font14" style="margin-left:10px;">{{dataList.item_site}}</span>
                    <input  class="font14" placeholder-style="color:#888;" v-if="siteCheck==2" v-model="dataList.item_site" type="text" placeholder="请填写地址信息" />
                </div>
            </dt>
            <dt style="line-height:14px;">
                <span style="margin-top:15px;margin-bottom:14px;" class="act-edit-title"><span class="font13">关于发货</span>（可多选）</span> 
                <span class="font13">发货方式</span>
                <span></span><span  @click="change1(1)" :class="checkbox1?'edit-checked edit-check':'edit-check'"><span></span></span><span @click="change1(1)" class="font14">自提/到店消费</span><span  @click="change2(1)" :class="checkbox2?'edit-checked edit-check':'edit-check'"><span></span></span><span @click="change2(1)" class="font14">送货上门</span>
                <textarea placeholder-style="color:#888;" maxlength="500" class="textarea-input" v-model="dataList.supplement" placeholder="发货方式补充说明，如有则填写，比如5公里内免运费，超距的运费计算方式等，也可以线下协商确定，非必填" name="textarea"/>
                <span style="margin-left:0px;" @click="agreeClick(1)" :class="agreeCheck==1?'edit-checked edit-check':'edit-check'"><span></span></span><span @click="agreeClick(1)">我已阅读并遵守<a @click.stop="goToHelp" style="display:inline-block;text-decoration-line:underline;color:#458165">《活动呗发布须知和规则》</a></span>
                <span class="reg-btn">
                    <btn @handle-click="submit" cname="big-btn" text="提   交"></btn>
                </span>
            </dt>
        </dl>
        <img v-if="showTip" id="img" class="tip" mode="widthFix" src="../../../static/img/icon/1.jpg" alt="">
    </section>
</template>

<script>
import topNav from "@/components/nav";
import btn from "@/components/btn";
import check from "@/components/check-box-normal";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import config from "../../utils/config.js";
import user from "../../service/user.js";
import mpvuePicker from 'mpvue-picker';
import panel from "../../components/panel";
let padDate=function(va){
     va=va<10?'0'+va:va;
     return va
}
export default {
data() {
        return {
            showCropper:false,
            showTip:false,
            chooseImgInx:'',
            editCheck:1,
            pickerStart:'',
            desc_p:'请输入商品的描述，或者活动的具体内容，也可对活动那个规则进行补充说明。',
            siteCheck:1,
            agreeCheck:0,
            showModal:false,
            favP:'',
            releaseList: [
                {
                    text: "选择分类"
                }
            ],
            multiArray:[],
            pickerValueDefault: [],
            array: [],
            userInfo: {
                
            },
            proList:[
                {
                    joinAct:'',
                    joinNun:'',
                }
            ],
            dataList:{
                item_site:'',
                zero:'',
                title:'',
                num:'',
                start_time:'',
                check_time:'',
                least:'',
                check:'',
                sell_point:'',
            },
            startDate:'',
            start_time:'',
            check_time:'',
            checkbox1:false,
            checkbox2:false,
            endDate:'',
            phtotList:[

            ],
            phtotLists:[

            ],
            address:'',
            title: '至少5个字\n请多\t说些感受吧' ,
            addCheck:true,
            shopPaths:[],
            trade:'',
            subdivide:'',
            site:'',
            site2:'',
            valueClassfy:''
        };
    },
    computed: {},
    components: {
        panel,
        topNav,
        btn,
        check,
        mpvuePicker
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
        goToHelp(){
             util.request(api.notice).then(res => {
                 let url = '../answer/main?id='+res.data.value;
                 wx.navigateTo({  url:url })
            });
        },
        getCropperImage () {
            wecropper.getCropperImage()
                .then((src) => {
                wx.previewImage({
                    current: '', // 当前显示图片的http链接
                    urls: [src] // 需要预览的图片http链接列表
                })
            }).catch(e => {
                console.error('获取图片失败')
            })
        },
        changeSite(val){
            this.addCheck = !this.addCheck;
            if(this.addCheck){
                this.dataList.item_site = this.site
                
            }else{
                this.dataList.item_site = ''

            }
        },
        onConfirm(e) {
            this.valueClassfy = ''
            console.log(e);
            console.log(this.multiArray);
            this.releaseList[0].text = e.label;
            this.pickerValueDefault = e.value;
            this.trade = this.multiArray[e.value[0]].value;
            this.subdivide = this.multiArray[e.value[0]].children[e.value[1]].value;
            this.valueClassfy = this.multiArray[e.value[0]].label+'-'+this.multiArray[e.value[0]].children[e.value[1]].label;
            this.showModal = false;
        },
        onCancel(){
            this.showModal = false;
        },
        showPicker() {
            this.$refs.mpvuePicker.show();
            this.showModal = true;
        },
        bodyClick(e){
            if(e.target.id !='show' &&e.target.id!='img'){
                this.showTip = false;
                this.desc_p = '请输入商品的描述，或者活动的具体内容，也可对活动那个规则进行补充说明。'
            }
        },
        submit(){
            let that = this;
            if(this.agreeCheck!=1){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'请阅读并勾选活动须知'
                })
                return
            }
            wx.showLoading({
                mask:true,
                title: '提交中',
                icon: 'loading',
            })
            this.dataList.goods_desc = '';
            if(this.checkbox1){
                this.dataList.goods_desc = this.dataList.goods_desc+'自提/到店消费';
            }
            if(this.checkbox2){
                this.dataList.goods_desc = this.dataList.goods_desc+' 送货上门';
            }
            if(!this.dataList.goods_desc){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'请选择发货方式'
                })
                wx.hideLoading()
                return;
            }
            if(this.editCheck==2&&this.proList.length>0){
                
                let om = true;
                this.proList.map((item,index)=>{
                    if(!item.joinAct){
                        wx.showModal({
                            showCancel:false,
                            title:'提示',
                            content:'优惠价格不能空'
                        })
                        wx.hideLoading()
                        om = false
                    }
                    if(!item.joinNun){
                        wx.showModal({
                            showCancel:false,
                            title:'提示',
                            content:'优惠人数不能为空'
                        })
                        wx.hideLoading()
                        om = false
                    }
                    debugger
                    if(item.joinNun*1>this.dataList.num){
                        wx.showModal({
                            showCancel:false,
                            title:'提示',
                            content:'优惠最终人数不得大于库存数量'
                        })
                        om = false
                        wx.hideLoading()
                    }
                    if(index==0){
                        this.dataList.one = item.joinAct;
                        this.dataList.two = item.joinNun;
                    }else if(index==1){
                        this.dataList.three = item.joinAct;
                        this.dataList.four = item.joinNun;
                    }else{
                        this.dataList.five = item.joinAct;
                        this.dataList.six = item.joinNun;
                    }
                })
                if(!om){
                    wx.hideLoading()
                    return;
                }

            }
            if(!this.dataList.zero){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'市场价不能为空'
                })
                wx.hideLoading()
                return;
            }
            if(!this.dataList.check){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'到店核销码不能为空'
                })
                wx.hideLoading()
                return;
            }
            if(this.dataList.check.length!=8){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'到店核销码必须为8位数字'
                })
                wx.hideLoading()
                return;
            }
            if(!this.dataList.least){
                this.dataList.least  = 1;
            }
            if(!this.dataList.sell_point){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'活动卖点不能为空'
                })
                wx.hideLoading()
                return;
            }
           /*  if(!this.dataList.one&&this.editCheck==2){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'至少要有一个优惠设置'
                })
                wx.hideLoading()
                return;
            } */
            if(this.dataList.two==''&&this.editCheck==2){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'至少要有一个优惠设置'
                })
                wx.hideLoading()
                return;
            }
            this.dataList.item_cat_id = this.subdivide
            if(!this.dataList.item_cat_id){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'请选择行业分类'
                })
                wx.hideLoading()
                return;
            }
            if(!this.dataList.title){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'活动标题不能为空'
                })
                wx.hideLoading()
                return;
            }
            
            if(!this.dataList.num){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'库存不能为空'
                })
                wx.hideLoading()
                return;
            }
            let img = '';
            if(this.phtotList.length==0){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'至少上传一张活动照片'
                })
                wx.hideLoading()
                return;
            }else{
                img = JSON.stringify(this.phtotList);
            }
            let item_img = '';
            if(this.phtotLists.length==0){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'至少上传一张活动照片'
                })
                wx.hideLoading()
                return;
            }else{
                item_img = JSON.stringify(this.phtotLists);
            }
            if(!this.dataList.most){
                this.dataList.most = 0;
            }
            this.dataList.image = img
            this.dataList.item_img = item_img
            if(!this.start_time){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'活动开始时间不能为空'
                })
                wx.hideLoading()
                return;
            }else{
                this.dataList.start_time = this.start_time+' 00:00:00'
            }
            if(!this.check_time){
                wx.showModal({
                    showCancel:false,
                    title:'提示',
                    content:'最晚核销时间不能为空'
                })
                wx.hideLoading()
                return;
            }else{
                this.dataList.check_time = this.check_time+' 00:00:00'
            }
            this.dataList.genre = this.editCheck;
            if(this.dataList.genre!=2){
                this.dataList.two = 0;
                if(this.dataList.genre==1){
                  this.dataList.one =  this.favP;
                }
                if(this.dataList.genre==3){
                    this.dataList.one =0;
                }
                
            }
            util.request(api.create,
                this.dataList
            ).then(res => {
                debugger
                let t = 1;
                if(that.editCheck==3){
                    t = 2
                }
                wx.hideLoading();
                wx.navigateTo({  url:'../template-buy/main?id='+res.data.item_id+'&cost='+t })
                console.log(res);
            })
        },
        clickJoinPro(){
            this.proList.push({
                joinAct:'',
                joinNun:'',
            })
        },
        clickDelPro(index){
            let t = this.proList;
            t.splice(index, 1);
            this.proList = t;
            console.log(this.proList)
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
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    const src = res.tempFilePaths[0]
                    that.showCropper = true;
                    wx.navigateTo({  url:'../photo/main?src='+src })
                    console.log(res)
                }
            })
        },
        editClick(index){
            this.editCheck = index;
        },
        siteClick(index){
            this.siteCheck = index;
            if(index===1){
                this.site = this.site2
            }
        },
        agreeClick(){
            this.agreeCheck = !this.agreeCheck
        },
        delPhoto(index){
            let lists = this.phtotList
            lists.splice(index,1);
            this.phtotList = [];
            this.phtotList = lists;
        },
        delPhoto2(index){
            let lists = this.phtotLists
            lists.splice(index,1);
            this.phtotLists = [];
            this.phtotLists = lists;
        },
        chooseshopPhoto2(e,index){
            let that = this;
            wx.chooseImage({
                count: 5, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    wx.showLoading({
                        mask:true,
                        title: '图片上传中',
                        icon: 'loading',
                    })
                    if(index||index===0){
                        res.tempFilePaths.map(item=>{
                            let lists = that.phtotLists;
                            console.log(res)
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
                                    lists.splice(index,1,data.data);
                                    that.phtotLists = [];
                                    that.phtotLists = lists;
                                    console.log('刷新成功')
                                    wx.hideLoading();
                                }
                            })
                        })
                       
                    }else{
                         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
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
                                    that.phtotLists.push(data.data);
                                    console.log('刷新成功');
                                    wx.hideLoading();
                                }
                            })
                        })
                    }
                     
                }
            })
        },
        startDateChange(e){
            this.startDate = e.target.value;
        },
        change1(index){
            this.checkbox1 = !this.checkbox1
        },
        change2(index){
            this.checkbox2 = !this.checkbox2
        },
        endDateChange(e){
            this.start_time = '';
            this.start_time = e.target.value;
        },
        endCheckTime(e){
            this.check_time = '';
            this.check_time = e.target.value;
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
        getUserInfo() {
            // 调用登录接口

            wx.login({
                success: () => {
                    wx.getUserInfo({
                        success: res => {
                            this.userInfo = res.userInfo;
                            console.log(this.userInfo);
                        },
                        fail() {}
                    });
                }
            });
        },
        init(){
            this.getClassify();
            this.pickerValueDefault = [0,0];
        }
    },
    onLoad(config){
        let d = new Date().getTime()+86400000;
        this.pickerStart = this.formatDate(d);
        console.log('load')
            let that = this;
            this.editCheck =1;
            this.agreeCheck =0;
            this.favP ='';
            this.dataList = {
                item_site:'',
                zero:'',
                title:'',
                num:'',
                start_time:'',
                check_time:'',
                least:1,
                check:'',
                sell_point:'',
                most:'',
            }
            this.phtotList = [];
            this.start_time = '';
            this.check_time = '';
            this.proList = [
                {
                    joinAct:'',
                    joinNun:'',
                }
            ]
            this.checkbox1 = false;
            this.checkbox2 = false;
            this.init();
            this.phtotLists = [];
            util.request(api.site).then(res => {
                that.site = res.data.site[0].site;
                that.site2 = res.data.site[0].site;
                that.dataList.item_site = that.site
            });
    },
    onShow(config){
        let that = this;
        wx.getStorage({
            key:'img',
            success(res){
                if(res&&res.data){
                    that.submitImg(res.data)
                    wx.setStorage({
                        key:'img',
                        data:''
                    })
                }
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
<style>
.consumer-release-list span {
    display: none;
}
.consumer-release-list ul li {
    font-size: 14px;
    color: #2e2e2e;
    font-weight: normal;
}
textarea{
    border: 1px solid #d9d9d9;
    width: 325px;
    font-size: 14px;
    height: 88.5px;
    border-radius: 2px;
    color:#333;
    font-weight: normal;
    margin-top: 9px;
    padding: 9px 12px;
    box-sizing: border-box;
    margin-bottom: 10px;
}
span.textarea-input{
   height: 114px;
   display: inline-block;
   width: 100%;
}
textarea.textarea-input{
    height: 88.5px;
    margin-top:13.5px;
    margin-bottom:13.5px;
    z-index: 0;
}
page{
    background: #efeff4;
}
.font13{
    font-size: 13px !important;
    font-weight: bold !important;
}
.big-btn{
    width: 303px;
    box-sizing:border-box;
    padding: 0px 8px;
    height: 45px;
    line-height: 45px;
    border-radius:5px;
    background: linear-gradient( #f67f67, #fa3346);
    margin-bottom: 22.5px;
}
</style>
<style scoped lang="scss">
.tip-title{
    position: absolute;
    left: 0;
    top:24px;
    font-size: 12px;
    font-weight: normal;
}
.tip{
    width: 300px;
    position: fixed;
    top: 20px;
    left: 50%;
    margin-left: -150px;
    z-index: 9999999999;
    border: 1px solid #ccc
}
.heigth26{
    height: 26.2px;
    line-height: 26.2px;
    display: inline-block;
    vertical-align:middle;
}
.edit-checked span{
    content:"";
    display:table;
    width:8rpx;
    height:16rpx;
    position:absolute;
    top:2rpx;
    left:8rpx;
    border:4rpx solid red;
    border-top:0;
    border-left:0;
    -webkit-transform:rotate(45deg) scale(1);
    transform:rotate(45deg) scale(1);
    transition:all .2s ease-in-out;
}
.edit-check{
    width:13px;
    height:13px;
    margin-right:3px;
    border:1px solid #d9d9d9;
    border-radius:3px;
    display:inline-block;
    vertical-align:middle;
    margin-left:10px;
    position:relative;

}
.act-edit.act-edit2{
    dt{
        .all{
            display: inline-block;
            width: 200px !important;
            height: 50px;
            vertical-align:middle;
            font-weight: normal !important;
            margin-left:10px;
        }
    }
}
.act-edit dt:last-child{
    border-bottom-color:transparent;
}
.add-photo-wrap{
    margin-bottom: 14px;
}
.reg-btn{
    display:inline-block;
    width:100%;
    text-align:center;
    margin-top:14px;
}
.add-photo.textarea-photo{
    width:50px;
    height: 50px;
    &::after{
        content: '';
        background: #d9d9d9;
        left: 50%;
        top:50%;
        margin-top:-15px; 
        position: absolute;
        width:1px;
        height:30px ;
    }
    &::before{
        content: '';
        background: #d9d9d9;
        position: absolute;
        left: 50%;
        top:50%;
        margin-left:-15px; 
        height:1px;
        width:30px ;
    }
}
.posi-rela{
    position: relative;
}
.act-edit-dowm{
    position: absolute;
    right: 10px;
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
.imglist{
    li{
        display: inline-block;
        vertical-align:top;
        position: relative;
        
    }
    img{
        display: inline-block;
        width: 52px !important;
        height: 52px!important;
        vertical-align:top !important;
        margin-top: 0px !important;
        margin-bottom: 5px;
    }
}
.add-photo{
    border: 1px dashed #d9d9d9;
    width: 50px;
    position: relative;
    height: 50px;
    &::after{
        content: '';
        background: #d9d9d9;
        left: 50%;
        top:50%;
        margin-top:-15px; 
        position: absolute;
        width:1px;
        height:30px ;
    }
    &::before{
        content: '';
        background: #d9d9d9;
        position: absolute;
        left: 50%;
        top:50%;
        margin-left:-15px; 
        height:1px;
        width:30px ;
    }
}
.act-edit2.act-edit{
    dt{
        span{
            font-size: 12px;
            color: #333333;
            font-weight: normal;
            display: inline-block;
            width:80px;
        }
    }
}
.spel{
    span{
        width: 65px !important;
        font-weight: bold !important;
        font-size: 13px !important;
    }
}
.font14{
    font-size: 14px !important;
}
.act-edit{
    background: #fff;
    padding: 0 25px;
    margin-bottom:10px; 
    
    dt{
        min-height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #e5e5e5;
        .add-btn-project.add-btn-project2{
            border:1px dashed #f34f45;
            color: #f34f45;
        }
        .add-btn-project{
            border:1px dashed #f29b76;
            height: 30px;
            display: inline-block;
            line-height: 30px;
            width: 100px;
            color: #fff;
            background: #f29b76;
            font-size: 14px;
            text-align: center;
            font-weight: normal;
            border-radius: 8px;
        }
        span.act-edit-title{
            color: #333;
            font-weight: normal;
            width:100%;
            display: inline-block;
            .check-box{
                margin-top:-1px;
            }
        }
        span{
            font-size: 12px;
            color: #333333;
            font-weight: normal;
            display: inline-block; 
        }
        .text-date{
            display: inline-block;
            font-size: 12px;
            vertical-align: middle;
            color: #333;
            margin-left: 10px;
        }
        img{
            width: 50px;
            height: 50px;
            display: inline-block;
            vertical-align:middle;
            margin-bottom: 5px;
            margin-right: 6.5px;
        }
        p{
            margin-bottom: 12px;
            margin-top: 10px;
            color: #333;
            span{
                color: #616060;
                font-weight: normal;
            }
            position: relative;
            text-align:left;
            font-size: 12px;
            line-height: 20px;
            margin-left: 28px;
            img{
                position: absolute;
                left: -18px;
                top: 0px;
                margin-left:0;
                margin-right: 0;
                width:13px;
                height:13px;
                margin-top:4px;
            }
        }
        input{
            display: inline-block;
            font-size: 14px;
            width: 245px;
            vertical-align: middle;
            color: #000;
            margin-left: 10px;
        }
        .sendCode{
            font-size:11px;
            color: #999;
            float: right;
            padding-right: 26px;
        }
    }
    dt.edit-title{
        line-height: 45px ;
        min-height: 45px;
    }
    dt.small{
        line-height: 30px ;
        min-height: 30px;
        border-bottom:none;
        position: relative;
        &:after{
            content: '';
            width: 265px;
            height: 1px;
            background: #dadada;
            position: absolute;
            right: 7.5px;
            bottom: 0px;
        }
    }
    dt.normal{
        line-height: 34px ;
        min-height: 34px;
    }
    dt.small2{
        line-height: 30px ;
        min-height: 30px;
        border-bottom:none;
        position: relative;
        padding-left: 68px;
        input{
            width:190px;

        }
        &:after{
            content: '';
            width: 100%;
            height: 1px;
            background: #dadada;
            position: absolute;
            right: 0px;
            bottom: 0px;
        }
    }
    dt.normal2{
        line-height: 34px ;
        min-height: 34px;
        border-bottom:none;
        position: relative;
        padding-left: 68px;
        input{
            width:190px;

        }
        &:after{
            content: '';
            width: 198px;
            height: 1px; 
            background: #dadada;
            position: absolute;
            right: 7.5px;
            bottom: 0px;
        }
    }
}
.check-box{
    width: 13px;
    height: 13px;
}
</style>
<style>
.cropper-wrapper{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #e5e5e5;
}

.cropper-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
}

.cropper-buttons .upload, .cropper-buttons .getCropperImage{
    width: 50%;
    text-align: center;
}

.cropper{
    position: absolute;
    top: 0;
    left: 0;
}

.cropper-buttons{
    background-color: rgba(0, 0, 0, 0.95);
    color: #04b00f;
}
</style>
