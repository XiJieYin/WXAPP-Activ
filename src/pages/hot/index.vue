<template>
    <section class="help-wrap">
        <div class="nav-first">
            <panel cname="help-list" title="helpList" :list="helpList"></panel>
        </div>
        <dl class="help-btn">
            <dt @click="call">
                <span class="phone-icon"></span>
                电话咨询
            </dt>
            <dt>
                
                <button open-type="contact">
                    <contact-button 
                type="default-light" 
                size="20"
                session-from="weapp">
                <span class="message-icon"></span>
                    在线客服
               
                </contact-button>
                </button>
            </dt>
        </dl>                           
    </section>
</template>

<script>
import panel from '../../components/panel'
import topNav from '../../components/nav'
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import user from "../../service/user.js";
export default {
    data() {
        return {
            userInfo: {
            },
            helpList:[]
        };
    },

    components: {
        panel,
        topNav
    },
    methods: {
        call(){
             wx.makePhoneCall({
                phoneNumber: '0751-6951138',
            })
        }
    },

    onLoad() {
        let that = this
        util.request(api.text,{
            enabled:1
        }).then(res => {
            res.data.map((item,index)=>{
                item.text = item.question;
                res.data[index].url = '../answer/main?id='+res.data[index].id;
            })
            that.helpList =  res.data
        });
        //console.log(wx);

        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    } 
};
</script>

<style scoped lang="scss">
.help-wrap{
    padding-bottom: 59px;
}
.help-btn{
    button{
        background: transparent;
        border:none;
        display:inline-block;
        font-size:14px;
        vertical-align:middle;
        line-height:56px;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding-left:3px;

        &:after{
            border:none;
        }
    }
    height: 60px;
    width: 100%;
    position: fixed;
    box-sizing: border-box;
    background: #fff;
    border-top:1px solid #e5e5e5;
    bottom: 0px;
    dt{
        vertical-align:top;
        width: 50%;
        height: 100%;
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        line-height: 60px;
        font-size:14px;
        color:#2e2e2e;
        .phone-icon{
            background: url('../../../static/img/icon/phone-icon.png');
            width:14px;
            height: 14px;
            display: inline-block;
            background-size: 100%;
            position: relative;
            top: 2px
        }
        .message-icon{
            background: url('../../../static/img/icon/message-icon.png');
            width:14px;
            height: 14px;
            display: inline-block;
            background-size: 100%;
            position: relative;
            top: 2px
        }
    }
    dt+dt{
        border-left:1px solid #e5e5e5;
    }
}
</style>
<style>
.help-list span{
    display: none;
}
.help-list ul li{
    font-size: 14px;
    color: #2e2e2e;
    font-weight: normal;
}
</style>

