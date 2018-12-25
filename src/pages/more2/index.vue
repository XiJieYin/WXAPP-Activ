<template>
    <div>
        <section class="panelbody section" :class="panelClass">
            <ul class="col">
                <li v-for="(item,index) in joinList" :key="index">
                    <image :src="item.avatar" />
                    <span class="name">{{item.nickname}}</span>
                    <span>{{item.create_time}}</span>
                    <span class="btn-text">已报名</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import topSlider from "@/components/slider";
import proGress from "@/components/proGress";
import topNav from "@/components/nav";
import util from "../../utils/util.js";
import api from "../../utils/api.js";
import config from "../../utils/config.js";
import user from "../../service/user.js";
import btn from "@/components/btn";
import navBar from "@/components/nav-bar";
let padDate=function(va){
     va=va<10?'0'+va:va;
     return va
}
export default {
    data() {
        return {
            panelClass: "panel",
            joinList:[]
        };
    },

    components: {
        topSlider,
        proGress,
        btn,
        topNav,
        navBar
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
            debugger
            return year+'-'+month+'-'+day;
        },
    },
    onLoad(config) {
        
        let that = this;
        util.request(api.queryJoin,{
            itemId:config.id
        }).then(res => {
            that.joinList = res.data;
            that.joinList.map(item=>{
                item.create_time = that.formatDate(item.create_time)
            })
        });
    },
    onShow(){
        
    },
    created() {
    }
};
</script>
<style lang="scss">
@import "../../css/element.scss";

.panelbody.section {
    padding-bottom: 45px !important;
}
.hot {
    background: -webkit-linear-gradient(top, #f67f67, #f84b5b); /* 背景色渐变 */
    -webkit-background-clip: text; /* 规定背景的划分区域 */
    -webkit-text-fill-color: transparent;
    font-family: "微软雅黑";
    font-size: 12px;
    margin-top: 7px;
    margin-bottom: 13px;
    font-weight: bold;
}
.panel.panelbody {
    padding: 8px 10px;
    padding-bottom: 0;
    .line {
        padding: 0px 10px;
        height: 1px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        border-bottom: 1px solid #eeeeee;
        margin-top: 5px;
    }
    > h4 {
        color: #999;
        font-size: 12.5px;
    }
    ul.row {
        @include flex(row);
        justify-content: space-around;
        box-sizing: border-box;
        li {
            .price {
                position: absolute;
                bottom: 22px;
                background: -webkit-linear-gradient(
                    top,
                    #f67f67,
                    #f84b5b
                ); /* 背景色渐变 */
                -webkit-background-clip: text; /* 规定背景的划分区域 */
                -webkit-text-fill-color: transparent;
                font-size: 12px;
                font-weight: 700;
            }
            position: relative;
            width: 56px;
            image {
                border: 1px solid #ededed;
                height: 73px;
            }
            span {
                display: inline-block;
                color: #999;
                font-size: 10px;
                text-decoration: line-through;
                text-align: center;
                width: 100%;
            }
        }
    }
}
.panelbody {
    padding-top: 0;
    > h4 {
        border-bottom: none;
    }
    ul.col {
        @include flex();
        justify-content: space-around;
        box-sizing: border-box;
        image {
            width: 70px;
            height: 70px;
            display: inline-block;
            margin-right: 10px;
            vertical-align: top;
        }
        span{
            height: 70px;
            line-height: 70px;
            display: inline-block;
            vertical-align:middle;
            font-size: 14px !important;
            font-weight: normal !important;
            color: #999;
        }
        .btn-text{
            height: 40px;
            width: 70px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            background: #f67f67;
            border-radius: 10px;
            margin-left: 30px;
        }
        .name{
            color: #000;
            width: 70px;
            display: inline-block;
            margin-left: 10px;
            white-space: nowrap;
            font-size: 16px !important;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 10px;
        }
        li {
            display: inline-block;
            height: 94px;
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
                    font-weight: normal;
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
.list{
    span{
        display: inline-block;
        width: 100%;
        margin-bottom: 10px;
    }
}
.movies-list {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    width: 280px;
    vertical-align: middle;
    margin-left: 2px;
    color: #828181;
}
.panel {
    @include panel;
    margin-top: 10px;
    .more {
        float: right;
        color: #999999;
        font-size: 10px;
    }
}
.hot-news {
    padding: 8px;
    padding-right: 0;
    display: inline-block;
    color: #cfcfcf;
    font-size: 12px;
    width: 95%;
}
.news-text {
    font-family: "STHupo";
    background: -webkit-linear-gradient(top, #f67f67, #fa3346); /* 背景色渐变 */
    -webkit-background-clip: text; /* 规定背景的划分区域 */
    -webkit-text-fill-color: transparent;
    font-size: 12px;
    margin-right: 4px;
}
.search-bar {
    .select-text {
        margin-left: 15px;
        margin-right: 12px;
        font-size: 14px;
        display: inline-block;
        line-height: 30px;
        vertical-align: top;
        span {
            content: "";
            display: inline-block;
            width: 11px;
            height: 6px;
            background: url("../../../static/img/icon/chevron-downIcon.png");
        }
    }
    margin: 5px 0;
    display: inline-block;
    .search-input {
        display: inline-block;
        position: relative;
        .search-icon {
            position: absolute;
            z-index: 2;
            top: 8px;
            left: 10px;
        }
        input {
            width: 258px;
            height: 29px;
            background: #f7f7f7;
            border-radius: 50px;
            font-size: 12px;
            padding-left: 30px;
            z-index: 0;
        }
    }
}
page {
    background: #f5f5f5;
}
</style>
<style>
*{
    font-family: 'Microsoft YaHei';
    font-family: '微软雅黑'
}
</style>
