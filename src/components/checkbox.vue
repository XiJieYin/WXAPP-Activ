<template lang="html">
    <div :class="[btnClass,cname]" >
        <span :class="pickID===index?'check-box-item':''" @click="handleClick(index)" v-for="(item,index) in list" :key="index">
            {{item.text}}
        </span>
    </div>
</template>

<script>
export default {
    props:{
        cname:{
            type:String,
            default:'',
        },
        list:{
            type:Array,
            default:'',
        },
        id:{
            type:String,
            default:'',
        },
        value:{
            type:Number,
            default:'',
        },
    }, 
    data(){
        return{
            btnClass:'checkbox',
            pickID:this.id,
        }
    },
    methods:{
        handleClick(index){
            this.pickID = '';
            this.pickID = index;
            this.$emit('handle-change',this.pickID)
        }
    }
};
</script>

<style lang="scss">
@import '../css/element.scss';
.checkbox{
    @include flex(row);
    justify-content: space-between;
    span{
        font-size: 13px;
        color: #131313;
        background: #efeff4;
        padding: 13px 8px;
        border-radius: 5px;
        text-align: center;
        letter-spacing: 1px;
    }
    .check-box-item{
        color: #fff;
        background: linear-gradient( #f67f67, #fa3346);
    }
}
</style>