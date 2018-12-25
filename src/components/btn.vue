<template lang="html">
    <div v-html="text" :style="btnStyle" @click.stop="handleClick" :class="[btnClass,cname]" >
    </div>
</template>

<script>
export default {
    props:{
        cname:{
            type:String,
            default:'',
        },
        text:{
            type:[String,Number],
            default:'',
        },
        width:{
            type:[String,Number],
            default:'',
        }
    }, 
    computed:{
        btnStyle(){
            let style = ''
            style = this.width?'width:'+this.width+'px':'';
            return style;
        }
    },
    data(){
        return{
            btnClass:'btn',
        }
    },
    methods: {
        handleClick(){
            this.$emit('handle-click')
        }
    }
};
</script>

<style lang="scss">
@import "../css/element.scss";
.btn{
    @include btn;
}
</style>