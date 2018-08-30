<template>
    <div class="home">
        <scroll>
            <div>
                <div class="banner">
                    <swipe class="my-swipe" >
                        <swipe-item
                            v-for="(item,index) in activityList"
                            :key="index">
                            <div class="sider_box" @click=$tool.goto(item.extString) :style="{height:'100%',background:item.color}">
                                <img v-lazy="item.bannerImg" width="100%" height="100%" alt="">
                            </div>
                        </swipe-item>
                    </swipe>
                </div>
                <div class="navs"  flex="box:mean">
                    <div v-for="(item,index) in navs" :key="index" :class="item.icon" @click="tagNav(item)">
                        {{item.name}}
                    </div>
                </div>
                <div class="notice" flex="box:first">
                    <div class="icon_notice"></div>
                    <div class="text_banner">
                        <swipe class="my-swipe" :showIndicators="false">
                            <swipe-item
                                v-for="(item,index) in notice"
                                @click.native="goDoticeDetails(item)"
                                :key="index">
                                <p class="title">{{item.title}}</p>
                                <p class="text nowrap">{{item.content}}</p>
                            </swipe-item>
                        </swipe>
                    </div>
                </div>
                <ul  class="navs2">
                    <li v-for="(item,index) in navs2" :key="index" flex="main:center cross:center dir:top" @click="tagNav2(item)">
                        <div :class="item.bgClass" flex="main:center cross:center" class="dot">
                            <div :class="item.icon"></div>
                            <div class="red_dot" v-if="item.redDot"></div>
                        </div>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
                <div class="hot" :style="{'padding-bottom':downShow?'1.2rem':'0.2rem'}">
                    <p>热门推荐</p>
                    <ul>
                        <li v-for="(item,index) in platform.activityList"
                            :key="index"
                            @click="hot(item)"
                            v-if="item.code.includes('_hot')">
                            <img :src="item.bannerImg" alt="热门活动">
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
        <div>
            <div class="download"  flex="cross:center main:justify box:justify"  v-if="downShow">
                <span class="icon_cha" @click="downShow=false"></span>
                <div class="icon_logo" flex-box="0" ></div>
                <div class="text">金世豪APP<br/><span style="font-size: 12px">安全、便捷、送红包</span></div>
                <div class="btn_down" @click="download"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vue-swipe'
import {mapActions,mapState} from 'vuex'
export default {
    name: 'cache-page',
    data () {
        return {
            navs:[
                {name:'真人',icon:'video',displayName:'_video'},
                {name:'电子',icon:'slot',displayName:'_solt-provider'},
                {name:'棋牌',icon:'poker',displayName:'_poker'},
                {name:'捕鱼',icon:'fish',gameId:'F363CE54-4A07-41A9-ACCC-45B38A0DF3FB',displayName:'_fish'},
                {name:'体育',icon:'sports',displayName:'_sports'},
                {name:'彩票',icon:'lottery',displayName:'_lottery'}
            ],
            navs2:[
                {name:'最新优惠',path:"/home/activity",icon:'icon_discount',bgClass:'bg_yellow',redDot:true},
                {name:'娱乐宝',path:"/home/ylb",icon:'icon_lijin',bgClass:'bg_red'},
                {name:'VIP俱乐部',path:"/home/vip",gameId:'F363CE54-4A07-41A9-ACCC-45B38A0DF3FB',icon:'icon_vip',bgClass:'bg_blue'},
                {name:'客户端下载',icon:'icon_nav2',icon:'icon_down',bgClass:'bg_green'},
                {name:'自助优惠申请',path:"/account/discount",icon:'icon_apply',bgClass:'bg_green'},
                {name:'合作加盟',icon:'icon_partner',bgClass:'bg_blue'},
            ],
            notice:[],
            downShow:!window.native
        }
    },
    components:{
        Swipe,SwipeItem
    },
    methods:{
        //启动公告轮播
        move(){
            let timer=setInterval(()=>{
                this.active++;
                if(this.active==3)this.active=0;
            },2000)
        },
        //展开公告
        goDoticeDetails(val){
            this.$tool.CONFIRM({text:`<h3>${val.title}</h3>${val.content}`})
        },
        //nav点击
        tagNav(item){
            if(item.gameId){
                this.$tool.playGame(item.gameId)
            }else{
                if(['_video','_solt-provider','_sports'].includes(item.displayName)){
                    this.$router.push({path:'/home/games',query:{displayName:item.displayName,name:item.name}})
                }else{
                    this.$router.push({path:'/lobby/lobbyType',query:{displayName:item.displayName,name:item.name}})
                }

            }
        },
        //nav2点击
        tagNav2(val){
            if(val.path){
                this.$router.push(val.path)
            }else{
                this.$tool.ALERT({text:'敬请期待'})
            }
        },
        //热门活动
        hot(val){
            //玩游戏
            if(val.title){
                this.$tool.playGame(val.title[0].name)
            }
            //跳转
            if(val.extString){
                this.$tool.goto(val.extString)
            }
        },
        // 下载
        download(){
            let url="http://td99.neweb.me/newnewb8a/m/newnewjsh.apk";
            if(this.$versions.ios){
                url="https://td99-ios.neweb.me/IOS/jsh_ios/jsh_official/download.html"
            }
            window.open(url)
        },
    },
    mounted(){
        //获取平台公告
        this.$api.getPlatformAnnouncements({reach:'players'}).then(res=>{
            this.notice=res.data;
        })
        console.log()
    },
    computed:{
        ...mapState(['platform','cdn']),
        activityList(){
            let list=[],temp=this.platform.activityList||[];
            temp.map((item,index)=>{
                let code=item.code;
                if(code.includes('_swiper') && code.includes('_home')){
                    list.push(item)
                }
            })
            return list;
        }
    }
}
</script>
