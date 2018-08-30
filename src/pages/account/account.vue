<template>
    <div class="account">
        <scroll>
            <div>
                <div class="header" flex="main:justify box:justify">
                    <router-link to="/home/vip" tag="div" class="user_vip" flex="main:center cross:center dir:top">
                        <div class="box">
                            <UserVip />
                        </div>
                        <p>{{player.name}}</p>
                    </router-link>
                    <div class="level" flex="main:center cross:center dir:top">
                        <div class="speed_box">
                            <Speed
                                v-for="(item,index) in level.show"
                                :name="item.name"
                                :val="item.now"
                                :key="index"
                                :max="item.max"
                                :keep="level.keep"></Speed>
                        </div>
                        <div class="status">{{level.status || '升级中'}}</div>
                    </div>
                    <router-link to="/account/navsMore" v-if="gotoShow" tag="div" flex="cross:center main:center" class="active">
                        <div class="icon_qr"></div>
                        <div class="icon_arror_right"></div>
                    </router-link>
                    <div v-else class="active"></div>
                </div>
                <div class="account_navs">
                    <router-view />
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
// import Speed from "@/components/speed"
import NavItem from "@/components/nav_item"
import UserVip from "@/components/user_vip.vue"
import Speed from "@/components/speed.vue"
import {mapActions,mapState} from 'vuex'
export default {
    name: 'account',
    data () {
        return {
        }
    },
    methods:{
        ...mapActions([
            'setLevel'
        ]),
    },
    mounted(){
        this.setLevel();
    },
    components:{NavItem,UserVip,Speed},
    computed:{
        ...mapState(['platform','player','level']),
        gotoShow() {
            return this.$route.path == "/account";
        }
    }
}
</script>
