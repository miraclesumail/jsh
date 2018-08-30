<template>
    <div class="item_nav" flex="main:justify" @click="$tool.goto(path)">
        <div flex="cross:center">
            <div :class="icon"></div>
            <span>{{name}}</span>
        </div>
        <div flex="cross:center">
            <span :class="textClass?textClass:'gray'">{{content}}</span>
            <div class="icon_arror_right" v-if="path"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'nav_item',
    data () {
        return {
            text:"awfafafw"
        }
    },
    props:['icon','name','content','textClass','path'],
    methods:{},
}
</script>
