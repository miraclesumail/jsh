<template>
    <div class="head_navs">
        <div flex="box:justify main:justify">
            <div class="left_box">
                <div class="back" v-if="back" @click="backFun" flex="main:center cross:center">
                    <span class="icon_arrow"></span>
                    <span  v-if="title">{{title}}</span>
                    <span v-else>返回</span>
                </div>
                <div class="msg_register height" v-else>
                    <router-link to="/account/msg" tag="div" flex="main:center cross:center" v-if="player.playerId" class="height">
                    <span class="icon_msg"></span>
                    <span>消息<div class="no_read" v-if="noReadMail">{{noReadMail}}</div></span>
                    </router-link>
                    <router-link tag="div" to="/home/register" flex="main:center cross:center" v-else class="height"><span class="icon_register"></span>注册</router-link>
                </div>
            </div>
            <div class="logo" v-if="!title">
                <img :src="logo" alt="logo">
            </div>
            <div class="right_box">
                <div class="login height" v-if="!player.playerId">
                    <router-link v-if="$route.name != 'login'" to="/home/login" tag="div" flex="main:center cross:center" class="height"><span class="icon_entry"></span>登录</router-link>
                    <router-link v-else tag="div" to="/home/register" flex="main:center cross:center" class="height"><span class="icon_register"></span>注册</router-link>
                </div>
                <router-link tag="div" to="/home/signIn" class="up_down sign" flex="main:center cross:center" v-else>
                    <div class="icon_sign"></div>签到
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    name: 'head_navs',
    data () {
        return {
            menuHeight:0
        }
    },
    // backPath 返回path
    // color
    props:{
        backPath:String,
        color:String,
    },
    methods:{
        backFun(){
            let path="",query={};
            switch(this.$route.name){
            case 'register':
                path='/';
                break;
            case 'login':
                path='/';
                break;
            case 'activity':
                path='/';
                break;
            case 'activityDetails':
                path='/home/activity';
                query={scrollTop:this.$route.query.scrollTop,active:this.$route.query.active}
                break;
            default:
            }
            path?this.$router.push({path:path,query:query}):this.$router.back();
        },
        // rightFun(){
        //     if(this.partner.partnerId){
        //         //this.$router.push({path:"/home/register"})
        //     }else{
        //         this.$router.push({path:"/home/login"})
        //     }
        // }
    },
    mounted(){
        // if(this.message &&!this.noReadMail){
        //     let noRead=0;
        //     this.$api.getMailList({_silence:true}).then(res=>{
        //         this.list=res.data || [];
        //         this.list.map((item,index)=>{
        //             if(!item.hasBeenRead)noRead++;
        //         })
        //         this.$tool.SET_STATE({name:'noReadMail',content:noRead})
        //     })
        // }
    },
    computed:{
        ...mapState(['platform','player','cfUrl','noReadMail','history']),
        logo:function(){
            return this.$tool.findVal(this.platform.platformLogoUrl,1).content;
        },
        // message:function(){
        //     return ['home','index','lowerBill','commission'].includes(this.$route.name) && this.partner.partnerId;
        // },
        // register:function(){
        //     return ['home','login','account','index'].includes(this.$route.name) && !this.partner.partnerId;
        // },
        // login:function(){
        //     return !['login'].includes(this.$route.name) && !this.partner.partnerId;
        // },
        back:function(){
            return this.$route.path.split("/").length >2;
        },
        title:function(){
            return this.$route.query._name;
        }

    }
}
</script>
