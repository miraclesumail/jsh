<template>
    <div class="activity" ref="activity">
        <scroll>
            <div>
                <TabNavs :list="navs" v-model="active" />
                <ul class="list">
                    <li class="item" v-for="(item,index) in promotions[active]" :key="index" @click="open(item)">
                        <p>{{item._name}}</p>
                        <div class="img_box">
                            <img :src="item.imgSrc" width="100%" alt="">
                            <span class="icon_yijieshu" v-if="active==3"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </scroll>
    </div>
</template>

<script>
import TabNavs from '@/components/tab_navs.vue'
import config from '@/tool/config.js'
import {mapActions,mapState} from 'vuex'
export default {
    name: 'activity',
    data () {
        return {
            active:0,
            navs: [
                {name: "注册优惠", icon: "icon_discount"},
                {name: "电子优惠", icon: "icon_laohuji"},
                {name: "长期优惠", icon: "icon_changqi"},
                {name: "已结束", icon: "icon_guoqi"},
            ]
        }
    },
    methods:{
        open(val){
            Object.assign(val,{scrollTop:this.$refs.activity.scrollTop,active:this.active});
            this.$router.push({path:'/home/activityDetails',query:val});
        }
    },
    mounted(){
        //位置恢复
        this.active= Number(this.$route.query.active)||0;
        this.$nextTick(()=>{
            this.$refs.activity.scrollTop =Number(this.$route.query.scrollTop) ||0;
        })
        //金世豪已过期活动展示
        if(config.platformId==8){
            this.promotions[3]=this.promotions[3].concat(this.jshFinished);
        }
    },
    components:{TabNavs},
    computed:{
        ...mapState(['cdn','scrollY','platform']),
        promotions:function(){
            let list = [[],[],[],[]],temp=this.platform.activityList || [],cdn=this.cdn;
            temp.map((item,index)=>{
                let code=item.code;
                if(code.includes("_activity")){
                    if(code.includes("_tab0")){
                        list[0].unshift({_name:item.title && item.title[0].name,imgSrc:item.bannerImg,my_href:`${cdn}${item.extString}`})
                    }
                    if(code.includes("_tab1")){
                        list[1].unshift({_name:item.title && item.title[0].name,imgSrc:item.bannerImg,my_href:`${cdn}${item.extString}`})
                    }
                    if(code.includes("_tab2")){
                        list[2].unshift({_name:item.title && item.title[0].name,imgSrc:item.bannerImg,my_href:`${cdn}${item.extString}`})
                    }
                    if(code.includes("_tab3")){
                        list[3].unshift({_name:item.title && item.title[0].name,imgSrc:item.bannerImg,my_href:`${cdn}${item.extString}`})
                    }
                }
            })

            return list;
        },
        jshFinished:function(){
            let cdn=this.cdn;
            return [
                {_name:'DT电子日首存88%',imgSrc:require("@/assets/jsh/activity/title30.jpg"),my_href:require("@/assets/jsh/activity/activity30.jpg")},
                {_name:'777不断，奖金不停',imgSrc:require("@/assets/jsh/activity/title28.jpg"),my_href:require("@/assets/jsh/activity/activity28.jpg")},
                {_name:'千倍百倍奖上加奖',imgSrc:require("@/assets/jsh/activity/title29.jpg"),my_href:require("@/assets/jsh/activity/activity29.jpg")},
                {_name:'电子首存100%',imgSrc:require("@/assets/jsh/activity/title8.jpg"),my_href:require("@/assets/jsh/activity/activity8.jpg")},
                {_name:'存款优惠',imgSrc:require("@/assets/jsh/activity/promo3.jpg"),my_href:require("@/assets/jsh/activity/activity30.jpg")},
                {_name:'月月送话费',imgSrc:require("@/assets/jsh/activity/promo5.jpg"),my_href:require("@/assets/jsh/activity/activity30.jpg")},
                {_name:'Opus真人平台大放送',imgSrc:require("@/assets/jsh/activity/title33.jpg"),my_href:require("@/assets/jsh/activity/activity33.jpg")},
                {_name:'ebet真人回馈',imgSrc:require("@/assets/jsh/activity/title32.jpg"),my_href:require("@/assets/jsh/activity/activity32.jpg")},
                {_name:'转账优惠',imgSrc:require("@/assets/jsh/activity/title31.jpg"),my_href:require("@/assets/jsh/activity/activity31.jpg")},
                {_name:'浓情端午',imgSrc:require("@/assets/jsh/activity/title27.jpg"),my_href:require("@/assets/jsh/activity/activity27.jpg")},
                {_name:'DT电子投注即送50%洗码',imgSrc:require("@/assets/jsh/activity/title24.jpg"),my_href:require("@/assets/jsh/activity/activity24.jpg")},
                {_name:'eBET百家乐百练赛',imgSrc:require("@/assets/jsh/activity/title25.jpg"),my_href:require("@/assets/jsh/activity/activity25.jpg")},
                {_name:'庆eBET网页版改版',imgSrc:require("@/assets/jsh/activity/title23.jpg"),my_href:require("@/assets/jsh/activity/activity23.jpg")},
                {_name:'eBET投注大放送',imgSrc:require("@/assets/jsh/activity/title13.jpg"),my_href:require("@/assets/jsh/activity/activity13.jpg")},
                {_name:'新年红包',imgSrc:require("@/assets/jsh/activity/title11.jpg"),my_href:require("@/assets/jsh/activity/activity11.jpg")},
                {_name:'AG元宵节红包',imgSrc:require("@/assets/jsh/activity/title12.jpg"),my_href:require("@/assets/jsh/activity/activity12.jpg")},
                {_name:'PT电子天天签到',imgSrc:require("@/assets/jsh/activity/title1.jpg"),my_href:require("@/assets/jsh/activity/activity7.jpg")},
                {_name:'欧普厅免费筹码天天送',imgSrc:require("@/assets/jsh/activity/title3.jpg"),my_href:require("@/assets/jsh/activity/activity3.jpg")},
                {_name:'新春特享',imgSrc:require("@/assets/jsh/activity/title6.jpg"),my_href:require("@/assets/jsh/activity/activity11.jpg")},
                {_name:'金世豪赌王争霸，百万奖金等您来拿',imgSrc:require("@/assets/jsh/activity/title4.jpg"),my_href:require("@/assets/jsh/activity/activity11.jpg")},
                {_name:'集字大抽奖 私人定制亚洲游',imgSrc:require("@/assets/jsh/activity/title5.jpg"),my_href:require("@/assets/jsh/activity/activity11.jpg")}
            ]
        }
    }
}
</script>
