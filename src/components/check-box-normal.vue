<template lang="html">
    <span @click="handleClick" :class="checkboxClass">
        <span></span>
    </span>
</template>

<script>
export default {
    props:{
        cname:{
            type:String,
            default:'',
        },
        value:{
            type:Boolean,
            default:false,
        },
    }, 
    computed:{
        checkboxClass(){
            let cls = 'check-box ';
            if(this.check) cls = cls + ' checked'
            console.log(cls)
            return cls;
        }
    },
    data(){
        return{
            check:this.value
        }
    },
    methods: {
        handleClick(){
            this.check = !this.check;
            console.log(this.check);
            this.$emit('handle-change')
        }
    }
};
</script>

<style lang="scss">
@import "../css/element.scss";
.check-box{
    width: 13px;
    height: 13px;
    margin-right: 5px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
    position: relative;
}
.checked{
    span{
        content: "";
        display: table;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 1px;
        left: 4px;
        border: 2px solid red;
        border-top: 0;
        border-left: 0;
        -webkit-transform: rotate(45deg) scale(1);
        transform: rotate(45deg) scale(1);
        transition: all .2s ease-in-out;
    }
}
</style>
