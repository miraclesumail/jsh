<template>
    <ul class="wealth_task">
        <li :class="className[item.taskType]" v-for="(item,index) in wealth.task"  flex="cross:center" :key='index'>
            <div class="task_explain"><div><span>{{item.title}}</span><p>{{item.content}}</p></div></div>
            <div class="task_integral">财富值 : {{item.point}}</div>
            <div :class="item.status==2 ? 'not_finish':'wealth_btn'" @click='gamePoint(item)'>{{['前往','领取',''][item.status]}}</div>
        </li>
    </ul>
</template>
<script>
import {mapMutations,mapState,mapActions} from 'vuex'
export default {
    name: 'wealth_task',
    data () {
        return {
            active:0,
            navs:['任务','兑换','排行榜'],
            sendChange:{
                amount:null
            },
            page:1,
            maxPage:null,
            className:{
                loginPointList:'task1',
                rechargePointList:'task2',
                gamePointList:'task3',
            }
        }
    },
    methods:{
        ...mapActions([
            'setLogin','setMissonList'
        ]),
        gamePoint(val){
            let status = val.status;
            if(status==0 &&val.taskType=='loginPointList'){
                this.$tool.CONFIRM({text:'您当前已累计登录'+val.currentGoal+'天，请在连续登录'+val.goal+'天后领取!'})
            }else if(status==0 && val.taskType=='rechargePointList'){
                this.$tool.CONFIRM({text:'您当前存款任务未满足，请前往充值',okfun:()=>{
                    this.$router.push({path:'/recharge'})
                },nofun:()=>{}})
            }else if(status==0 && val.taskType=='gamePointList'){
                this.$tool.CONFIRM({text:'您当前游戏任务未满足，请在完成游戏任务后领取!',okName:'开始游戏',okfun:()=>{
                    let game= this.providerTeam[val.providerId[0]];
                    game.gameId && this.$tool.playGameById(game.gameId);
                    game.href && this.$router.push({path:game.href});
                },nofun:()=>{}})
            }
            if(val.status==1){
                this.$api.applyRewardPoint({eventObjectId:val.id}).then(res=>{
                    this.setMissonList();
                    this.$tool.SET_STATE({name:"player",content:res.data.newPoints,sub:'userCurrentPoint'});
                    this.$tool.setStore("player",this.player);
                })
            }
        }
    },
    components:{},
    mounted(){
        this.maxPage =Math.ceil(this.wealth.task.length/5);
    },
    watch:{
        wealth(){
            this.maxPage =Math.ceil(this.wealth.task.length/5);
        }
    },
    computed: {
        ...mapState([
            'player','providerTeam','wealth'
        ]),
    }
}
</script>
