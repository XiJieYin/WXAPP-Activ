<template>
    <div :style="{width:width+'px',height:height+'px'}">
        <map  v-if="show" :latitude="latitude" :markers="markers" :longitude="longitude" id="myMap" show-location="true" scale="16" />
        <div class="site">
            {{site}}
        </div>
    </div>
</template>

<script>
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight;
import topNav from "@/components/nav";
export default {
data() {
        return {
            width:width,
            height:height,
            show:false,
            mapCtx:'',
            site:'',
            latitude:'',
            longitude:'',
            markers:[{
                id: 1,
                latitude:'',
                longitude:'',
                width:50,
                height:50,
                name:'深圳市龙华区远景大厦',
                iconPath: '../../static/img/icon/location.png'
            }],
        };
    },
    computed: {},
    components: {
        topNav,
    },
    methods: {
    },
    onLoad(config){
        let that = this;
        //this.mapCtx = wx.createMapContext('myMap')
        console.log(config)
        let t = {
                id: 1,
                latitude:config.lat,
                longitude:config.lng,
                width:50,
                height:50,
                name:config.name,
                iconPath: '../../static/img/icon/location.png'
            }
        that.markers.push(t)
        that.site = config.name
        // that.markers.longitude = config.lng;
        // that.markers.name = config.name;
        // that.markers.iconPath = '../../static/img/icon/location.png';
        that.latitude = config.lat;
        that.longitude = config.lng;
        that.show = true;
        //this.show = true;
    },
    created() {
        //console.log(wx);
        // 调用应用实例的方法获取全局数据
        //this.getUserInfo()
    }
};
</script>
<style>
</style>
<style scoped lang="scss">
div{
    display: inline-block;
    width: 100%;
    height: 100%;
}
map{
    width: 100%;
    height: 100%;
}
.site{
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 80px;
    line-height: 80px;
    box-sizing: border-box;
    background: #fff;
    padding-left: 20px;
}
</style>