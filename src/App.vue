<template>
    <div id="app">
        <HeadNavs />
        <keep-alive include="cache-page">
            <router-view class="router" />
        </keep-alive>
        <Service v-if="cfService" />
        <Navigation />
        <transition name="fade" mode="out-in" appear>
            <Loading v-if="loading" />
        </transition>
        <Alert/>
        <Confirm/>
    </div>
</template>

<script>
import 'flex.css'
import HeadNavs from './components/head_navs'
import Navigation from '@/components/navigation.vue'
import Loading from '@/components/loading.vue'
import Alert from '@/components/alert.vue'
import Confirm from '@/components/confirm.vue'
import Service from '@/components/service.vue'
import {mapState,mapActions} from 'vuex'
export default {
    name: 'App',
    data () {
        return {
        };
    },
    components:{
        Navigation,Loading,Alert,Confirm,HeadNavs,Service
    },
    mounted(){
        //将router绑定到tool上面
        this.$tool.router=this.$router;
        this.$api.getConfig().then(res=>{
            this.$tool.SET_STATE({name:"platform",content:res.data});
            let url = this.$tool.findVal(res.data.live800).content;
            if(url){
                url=url.replace(/enterurl=(\S*)&p/g,'enterurl='+location.origin+'&p')
                this.$tool.SET_STATE({name:"cfUrl",content:url});
            }
            this.$tool.SET_STATE({name:"cdn",content:res.data.cdnOrFtpLink});
        })
        //服务器推送
        this.$api.notifyNewMail((err)=>{
            let noRead=0;
            this.$api.getMailList({_silence:true}).then(res=>{
                this.list=res.data || [];
                this.list.map((item,index)=>{
                    if(!item.hasBeenRead)noRead++;
                })
                this.$tool.SET_STATE({name:'noReadMail',content:noRead})
            })
        })
        //隐藏欢迎页
        let welcome = document.getElementById("welcome");
        welcome.style.display='none';
        // this.$api.getTemplateSetting().then(res=>{
        //     console.log(res)
        // })

        //路由加载效果
        let timer;
        this.$router.beforeEach((to, from, next) => {
            this.$tool.SET_STATE({name:"loading",content:true});
            timer=setTimeout(()=>{
                if(this.loading){
                    this.$tool.CONFIRM({text:"网络异常,请刷新页面",okFun:()=>{
                        window.reload();
                    }})
                }
            },20000)
            next()
        })
        this.$router.afterEach((to, from) => {
            clearTimeout(timer);
            this.$tool.SET_STATE({name:"loading",content:false})
        })
    },
    methods:{
    },
    computed:{
        ...mapState(['loading','cfService'])
    }
};
</script>
<style lang="scss">
    @import "vue-swipe/dist/vue-swipe.css";
    @import "assets/jsh/style.scss";
</style>

