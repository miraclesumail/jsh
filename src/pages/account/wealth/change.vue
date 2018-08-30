<template>
    <div class="wealth_change" v-if="selfInfo">
        <div class="change_limit" flex="cross:center main:center">
            <div>
                <speed name="今日积分 : " :val="selfInfo.preDailyAppliedPoint" :max="rule.dailyGetMaxPoint||1000"  keep="true"></speed>
                <speed name="今日兑换 : " :val="selfInfo.preDailyExchangedPoint" :max="rule.preDailyExchangeMaxPoint||1000" keep="true"></speed>
            </div>
        </div>
        <div class="change_form" flex="cross:center main:center">
            <ul>
                <li>
                    <div class="name">财富值</div>
                    <div class="text"><input type="text" v-model="sendChange.point" placeholder="请输入兑换积分"></div>
                </li>
                <li>
                    <div class="name">兑换比例</div>
                    <div class="text">10 : 1</div>
                </li>
                <li>
                    <div class="name">兑换真钱</div>
                    <div class="text">{{sendChange.point/10}} 元</div>
                </li>
                <li>
                    <div class="wealth_btn" @click="change">兑换</div>
                </li>
            </ul>
        </div>
    </div>

</template>
<script>
import {mapMutations,mapState,mapActions} from 'vuex'
import Speed from "@/components/speed"
let createTime=new Date().getYear()-106;
export default {
    data () {
        return {
            active:0,
            navs:['任务','兑换','排行榜'],
            sendChange:{
                point:null
            },
            rule:{},
            selfInfo:null
        }
    },
    methods:{
        ...mapActions([
            'setMissonList'
        ]),
        change(){
            if(this.sendChange.point%10 || !this.sendChange.point){
                this.$tool.ALERT({text:"财富值兑换真钱必须为10的倍数",type:'warn'})
            }else if(this.sendChange.point>this.selfInfo.userCurrentPoint){
                this.$tool.ALERT({text:"兑换财富值不能大于"+this.selfInfo.userCurrentPoint,type:'warn'})
            }else{
                this.$api.applyPointToCredit(this.sendChange).then(res=>{
                    this.setMissonList();
                    this.$tool.SET_STATE({name:"player",content:this.player.userCurrentPoint-this.sendChange.point,sub:'userCurrentPoint'});
                    this.$tool.setStore("player",this.player);
                    this.$tool.ALERT({text:"财富值兑换申请成功"});
                })
            }
        }
    },
    components:{Speed},
    mounted(){
        this.$api.getPointRule().then(res=>{
            this.rule = res.data.list[this.player.levelVal];
        })
        this.$api.get().then(res=>{
            let temp={
                preDailyAppliedPoint:res.data.preDailyAppliedPoint,
                preDailyExchangedPoint:res.data.preDailyExchangedPoint,
                userCurrentPoint:res.data.userCurrentPoint
            };
            this.selfInfo=temp;
        })
    },
    created(){
    },
    computed: {
        ...mapState([
            'player'
        ]),
    }
}
</script>
