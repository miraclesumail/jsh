<template>
    <div class="crumbs" flex="main:center cross:center">
        <div :class="icon"></div><span>{{title}}</span>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    name: 'crumbs',
    data () {
        return {
            menuHeight:0
        }
    },
    // title 标题
    // icon 图标
    props:{
        title:String,
        icon:String,
    }
}
</script>
