<template>
    <div>
        <mpvue-cropper 
        ref="cropper"
        :option="cropperOpt"
        @ready="cropperReady"
        @beforeDraw="cropperBeforeDraw"
        @beforeImageLoad="cropperBeforeImageLoad"
        @beforeLoad="cropperLoad"
        ></mpvue-cropper>
        <div class="cropper-buttons">
            <div
                class="getCropperImage"
                @tap="getCropperImage">
                确定
            </div>
            <div
                class="upload"
                @tap="cancel">
                取消
            </div>
        </div>
    </div>
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
import MpvueCropper from 'mpvue-cropper'
let wecropper

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
export default {
    mounted (config) {
        console.log(config)
    wecropper = this.$refs.cropper;
    wecropper.pushOrigin(this.src);
  },
data() {
        return {
            showCropper:false,
            src:'',
            cropperOpt: {
                id: 'cropper',
                width,
                height,
                scale: 2.5,
                zoom: 8,
                cut: {
                    x: (width - 300) / 2,
                    y: (height - 300) / 2,
                    width: 280,
                    height: 210
                }
            },
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
                itemSite:'',
                zero:'',
                title:'',
                num:'',
                startTime:'',
                least:'',
                check:'',
            },
            startDate:'',
            checkbox1:false,
            checkbox2:false,
            startDate:'',
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
            valueClassfy:''
        };
    },
    computed: {},
    components: {
        panel,
        topNav,
        btn,
        check,
        MpvueCropper
    },
    methods: {
        cropperReady (...args) {
            console.log('cropper ready!')
        },
        cropperBeforeImageLoad (...args) {
            console.log('before image load')
        },
        cropperLoad (...args) {
            console.log('image loaded')
        },
        cropperBeforeDraw (...args) {
        // Todo: 绘制水印等等
        },
        cancel(){
            wx.navigateBack()
        },
        uploadTap () {
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: (res) => {
                const src = res.tempFilePaths[0]
                //  获取裁剪图片资源后，给data添加src属性及其值
                
                    wecropper.pushOrigin(src)
                }
            })
        },
        getCropperImage () {
            wecropper.getCropperImage()
            .then((src) => {
                wx.setStorage({
                    key:'img',
                    data:src
                })
                wx.navigateBack()
            })
            .catch(e => {
            console.error('获取图片失败')
            })
        },
    },
    onLoad(config){
        this.src = config.src
        
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
    font-size: 12px;
    height: 88.5px;
    border-radius: 2px;
    color:#333;
    margin-top: 9px;
    padding: 9px 12px;
    box-sizing: border-box;
    margin-bottom: 10px;
}
textarea.textarea-input{
    height: 88.5px;
    margin-top:13.5px;
    margin-bottom:13.5px;
}
page{
     background: #efeff4;
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
