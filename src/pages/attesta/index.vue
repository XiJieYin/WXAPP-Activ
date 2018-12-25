<template>
    <div class="attesta-wrap">
        <div class="attesta-bg">
            <ul class="attesta-lists">
                <li>
                    <span>真实姓名:</span>
                    <input />
                </li>
                <li>
                    <span>身份证号:</span>
                    <input />
                </li>
                <li>
                    <span>结算卡号:</span>
                    <input />
                </li>
                <li class="arrow">
                    <picker @change="bindPickerChange" :value="bank" :range="bankArray">
                        <span class="picker">
                        结算银行：{{bankArray[bank]}}
                        </span>
                    </picker>
                </li>
                <li class="arrow">
                    <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
                    <span class="picker">
                        所属省：{{region[0]}}
                    </span>
                    </picker>
                </li>
                <li class="arrow">
                    <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
                    <span class="picker">
                        所属省：{{region[1]}}
                    </span>
                </picker>
                </li>
            </ul>
        </div>
        <div class="attesta-bg attesta-photo">
            <p>身份证照片：</p>
            <span class="choose-photo" @click="choosePhoto(1)">
                <span class="attesta-add">+</span>
                <span class="attesta-text">身份证正面照片</span>
                <span class="attesta-text text-small">（文字清晰，四角齐全）</span>
                <img :src="urlAdd1" />
            </span>
            <span class="choose-photo" @click="choosePhoto(2)">
                <span class="attesta-add">+</span>
                <span class="attesta-text">身份证背面照片</span>
                <span class="attesta-text text-small">（文字清晰，四角齐全）</span>
                <img :src="urlAdd2" />
            </span>
        </div>
        <div class="attesta-bg attesta-photo">
            <p>银行卡照片：</p>
            <span class="choose-photo" @click="choosePhoto(3)">
                <span class="attesta-add">+</span>
                <span class="attesta-text">银行卡正面照片</span>
                <span class="attesta-text text-small">（文字清晰，四角齐全）</span>
                <img :src="urlAdd3" />
            </span>
            <span class="choose-photo" @click="choosePhoto(4)">
                <span class="attesta-add">+</span>
                <span class="attesta-text">手持身份证正面照片</span>
                <span class="attesta-text text-small">（文字清晰，四角齐全）</span>
                <img :src="urlAdd4" />
            </span>
        </div>
        <span class="center">
            <btn :width="303" cname="big-btn" text="提交"></btn>
        </span>
    </div>
</template>

<script>
import topNav from "@/components/nav";
import btn from "@/components/btn";
export default {
    data() {
        return {
            userInfo: {
                name:'',
                info:''
            },
            tempFilePaths:[],
            bank:'',
            urlAdd1:'',
            urlAdd2:'',
            urlAdd3:'',
            urlAdd4:'',
            region:[],
            bankArray:[
                '招商银行',
                '建设银行',
                '中国银行',
                '农业银行',
            ]
        };
    },

    components: {
        topNav,
        btn
    },
    computed:{

    },
    methods: {
        choosePhoto(inx){
            let that = this;
            let id = inx;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    that['urlAdd'+id] = res.tempFilePaths[0];
                    console.log('222');
                    console.log(that['urlAdd'+id]);
                }
            })
        },
        bindRegionChange(e) {
            //console.log('picker发送选择改变，携带值为', e)
            this.region = e.target.value;
        },
        bindPickerChange(e){
            this.bank=e.target.value
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
    position: relative;
    img{
        height: 102px;
        position: absolute;
        top: 0px;
        left: 0;
    }
}
.arrow{
    position: relative;
    &:after{
        content: '';
        position: absolute;
        right: 20.5px;
        color: #dcdcdc;
        width: 20px;
        height: 31px;
        top:50%;
        margin-top:-8px;
        background: url('../../../static/img/icon/arrow.png');
        background-repeat:no-repeat;
        background-size:60%;  
    }
}
.center{
    width: 100%;
    text-align: center;
    display: inline-block;
    margin-top: 21.5px;
    margin-bottom: 33px;

}
.attesta-photo{
    padding: 23.5px 25px;
    p{
        font-size: 15px;
        color:#333333;
        font-weight: bold;
        margin-bottom: 18px;
    }
    >span{
        width: 157px;
        height: 102px;
        display: inline-block;
        border: 1px dashed #c6c6c6;
        border-radius: 2px;
        vertical-align: top;
    }
    >span+span{
        margin-left: 7px;
    }
}
.attesta-text{
    font-size: 17px;
    color: #b7b7b6;
    width: 100%;
    text-align: center;
    display: inline-block;
}
.attesta-add{
    font-size: 44px;
    color: #b7b7b6;
    display: inline-block;
    width: 100%;
    margin-top: 2px;
    text-align: center;
    margin-bottom: 5px
}
.text-small{
    font-size: 12px;
}
.attesta-bg{
    background: #fff;
}
.attesta-bg + .attesta-bg{
    margin-top: 8.5px;
}
.attesta-lists{
    padding-left: 24px;
    li{
        height: 57px;
        width: 100%;
        border-bottom: 1px solid #dadada;
        span{
            height: 57px;
            line-height: 57px;
            display: inline-block;
            font-size: 12px;
            font-weight: bold;
            color: #333333;
        }
        input{
            font-size: 12px;
            font-weight: bold;
            display: inline-block;
            height: 57px;
            line-height: 57px;
            vertical-align: top;
            padding-left: 20px
        }
    }
    li:last-child{
        border-bottom: none;
    }
}
</style>
<style>
page{
    background: #eeeeee;
}
.big-btn{
    height: 45px;
    line-height: 45px;
}
</style>
