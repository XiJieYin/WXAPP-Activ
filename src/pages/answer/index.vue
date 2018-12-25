<template>
    <section class="answer-wrap">
        <div class="answer">
            <!-- <span class="answe-one">问：{{help.question}}</span> -->
            <rich-text class="rich-text" :nodes="help.answer" bindtap="tap"></rich-text>
        </div>                           
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
            help:''
        };
    },

    components: {
        panel,
        topNav
    },
    methods: {
        
    },

    onLoad(config) {
        let that = this;
         
        util.request(api.textById,{
            id:config.id
        }).then(res => {
            console.log(res);
            that.help = res.data;
            wx.setNavigationBarTitle({  
                title:that.help.question
            }) 
        });
        //console.log(wx);

        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    } 
};
</script>

<style scoped lang="scss">
.answer{
    width: 100%;
    span.answe-one{
        font-size: 16px;
        font-weight: bold;
    }
    span{
        display: block;
        margin-left: 10px;
        margin-top: 10px;
        font-size: 14px;
        line-height: 16px;
    }
}   
</style>
<style lang="scss">
.rich-text{
    p{
        width:100%;
        display: inline-block;
    }
    img{
        }
    .fr-fin{
        display: inline-block;
        width:100% !important;

    }
}
</style>



