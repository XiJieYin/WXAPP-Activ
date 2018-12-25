<template>
    <swiper @change="bindchange"  :class="cname" :vertical="vertical" :indicator-active-color="activeColor" :indicator-color="indicatorColor" class="swiper" indicator-dots="false" autoplay="false" interval="5000" duration="1000">
        <block v-for="(item, index) in movies" :index="index" :key="index">
            <swiper-item>
                <image @load="imageLoad" mode="widthFix"  @click="go(item)" v-if="!textTrue" :src="url?item[url]:movies" class="slide-image" />
                <span v-else @click="go(item)" class="font"  mode="aspectFill" >{{item.text}}</span>
            </swiper-item>
        </block>
    </swiper>
</template>

<script>
export default {
    props: ["text",'movies','textTrue','cname','vertical','activeColor','indicatorColor','url','enabled','gos'],
    data(){
        return {
            imgheights:[],
            current:0
        }
    },
    onLoad(){
            this.imgheights = [];
            this.current = 0;
    },
    methods:{
        
        bindchange(e){
            this.current = e.target.current
        },
        imageLoad(e){
            //获取图片真实宽度
            console.log(11111)
            var imgwidth = e.target.width,
            imgheight = e.target.height,
            //宽高比
            ratio = imgwidth / imgheight;
            console.log(imgwidth, imgheight)
            //计算的高度值
            var viewHeight = wx.getSystemInfoSync().windowWidth *wx.getSystemInfoSync().pixelRatio / ratio;
            var imgheight = viewHeight
            var imgheights = this.imgheights
            //把每一张图片的高度记录到数组里
            imgheights.push(imgheight)
            this.imgheights = imgheights
        },
        go(item){
            if(this.gos=='no'){
                return;
            }
            if(this.enabled==2){
                let id = item.lingid
                let url = '../answer/main?id='+id;
                wx.navigateTo({  url:url })
                console.log(11111)
            }else if(this.enabled==3){
                let id = item.link_id
                let url = '../answer/main?id='+id;
                wx.navigateTo({  url:url })
            }else{
                console.log(11111)
                let id = item.link_id?item.link_id:item.lingid
                let url = '../detail/main?itemId='+id;
                wx.navigateTo({  url:url })
            }
        }
    }
};
</script>

<style>
.slide-image{
    width: 375px;
}
swiper {
    width: 375px;
    height: 190px;
}
.font{
    font-size:13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
image {
    width: 100%;
    height: 190px;
    background-size: 100%;
}
</style>
