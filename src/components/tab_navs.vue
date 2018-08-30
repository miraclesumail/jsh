<template>
    <ul class="tab_navs" flex="box:mean">
        <li class="item" flex="main:center cross:center dir:top"
            @click="$emit('input',index)"
            :class="{active:index==value}"
            v-for="(item,index) in list"
            :key="index">
            <div class="box" flex="main:center cross:center">
                <div :class="item.icon"></div>
            </div>
            <span>{{item.name}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'tab_navs',
    // list tab项列表
    // value 选中项
    // active:0,
    // navs: [
    //     {name: "全部", icon: "icon_total"},
    //     {name: "电子", icon: "icon_laohuji"},
    //     {name: "真人", icon: "icon_live", color},
    //     {name: "捕鱼", icon: "icon_fish", color},
    //     {name: "彩票", icon: "icon_lottery", color},
    //     {name: "体育", icon: "icon_sport", color}
    // ]
    props:{list:Array,value:Number}
}
</script>
