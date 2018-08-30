<template>
    <div class="navigation">
        <div class="navs"  flex="box:mean">
            <div v-for="(item,index) in navs" :key="index" flex="box:mean">
                <router-link
                    :to='item.path'
                    :key='index'
                    tag="div"
                    v-if="item.path"
                    @click.native="$tool.SET_STATE({name:'cfService',content:false})"
                    flex="main:center dir:top cross:center"
                    :class="{'router-link-active':index==0 &&$route.path=='/'}">
                    <span :class="item.icon"></span>
                    <p>{{item.name}}</p>
                </router-link>
                <div v-else
                    flex="main:center dir:top cross:center"
                    :class="{'router-link-active':cfService}"
                    @click="$tool.SET_STATE({name:'cfService',content:!cfService})">
                    <span :class="item.icon"></span>
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'navigation',
    data () {
        return {
            pathName:'/',
            navs:[
                {name:'首页',path:'/home',icon:'icon_home'},
                {name:'大厅',path:'/lobby',icon:'icon_lobby'},
                {name:'存取',path:'/access',icon:'icon_access'},
                {name:'客服',icon:'icon_nav2',icon:'icon_service'},
                {name:'账户',path:'/account',icon:'icon_account'},
            ]
        }
    },
    computed: {
        ...mapState(['cfService'])
    }
}
</script>
