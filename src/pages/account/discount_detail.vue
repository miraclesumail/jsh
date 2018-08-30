<template>
	<div class="discount_detail">
		<scroll>
            <div>
                <div class="bonus_title">
                    <div class="name">{{bonus.name}}</div>
                </div>
                <div class="apply">
                    <div class="more">
                        <div v-for="(item,index) in show" :key="index">{{item.name}}：<span :style="{color:item.color}">{{item.content}}</span></div>
                    </div>
                    <div class="btn_yellow" @click="send"></div>
                </div>
                <div class="text_warn">
                    <div class="imgbox" v-if="tableImg">
                        <img :src="tableImg">
                    </div>
                    <div class="list" v-for="(item,index) in list" :key="index">
                        <div>{{item.title}} :</div>
                        <p v-for="(text,key) in item.content" :key="key">
                            <span>{{key+1}}.</span>{{text}}
                        </p>
                    </div>
                </div>
            </div>
        </scroll>
	</div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex';
export default {
    name: 'discount_detail',
    data () {
        return {
            bonus:{},
            list:[],
            rule:[],
            type:'',
            show:[],
            tableImg:'',
            sendData:{
                code:this.$route.query.code,
                eventCode:this.$route.query.code,
                data:null,
                _closeCONFIRM:true
            }
        }
    },
    props:[],
    components:{},
    methods:{
        ...mapActions(['setWallet']),
        ...mapMutations([
            "CONFIRM"
        ]),
        getRemark(remark){
            let str = remark.split("=")[1];
            str=str.replace(/deposit/,'存款');
            str=str.replace(/gift/,'优惠')+'倍';
            return str;
        },
        send(){
            let code =this.sendData.code;
            if(code.includes("_client")&& !all.versions.isAndroidApp && !all.versions.isIosApp){
                this.$tool.CONFIRM({text:"此优惠需在手机移动端申请，请下载app后申请",okName:'前往下载',okFun:()=>{
                    this.$router.push("/index/downLoad")
                },nofun:()=>{}})
                return;
            }
            //存送金组
            let API='applyRewardEvent';
            //洗码
            if(this.type=='PlayerConsumptionReturn'){
                API='requestConsumeRebate';
            }else if(this.type=='service'){
                //联系客服申请
                this.$tool.CONFIRM({text:"此优惠需在满足条件后联系客服申请",okName:'联系客服',okFun:()=>{
                    window.open(this.cfUrl)
                }})
                return;
            }
            //如果规则显示奖励金额为0则拒绝请求，对于有等级限制的
            if(this.rule&&this.rule[0] && this.rule[0].rewardAmount==0){
                this.$tool.CONFIRM({text:"您的等级条件不满足"});
                return;
            }
            this.$api[API](this.sendData).then(res=>{
                this.$tool.CONFIRM({text:"优惠添加成功，祝您游戏愉快"});
                this.init();
            }).catch(err=>{
                let text= err.errorMessage;
                if(text=="无法找到此存款记录，详情请联系客服" || text=="未达到周期内存款笔数条件" || text=='玩家的周期内的累积存款金额不足'){
                    this.$tool.CONFIRM({text:"您的存款条件不满足此优惠，请前往存款",okFun:()=>{
                        this.$router.push("/access")
                    }})
                }else if(text=="您已经达到了该奖励周期内的申请上限"){
                    this.$tool.CONFIRM({text:"您已领取过此优惠，请选择其他优惠"})
                }else if(text=="玩家的周期内的累积输值金额不足"){
                    this.$tool.CONFIRM({text:"您的输值金额不满足申请条件"})
                }else if(text=="Error finding reward event" && this.type=='PlayerConsumptionReturn'){
                    this.$tool.CONFIRM({text:"优惠条件不满足，此优惠需vip会员及以上才能申请"})
                }else{
                    this.$tool.CONFIRM({text:text})
                }
            })
        },
        init(){
            this.$api.getRewardList().then(res=>{
                this.bonus=this.$tool.findVal(res.data,this.$route.query.code,'code');
                let list = this.bonus.list;
                let type = this.bonus.type.name;
                let param=this.bonus.param.rewardParam || [];
                let rule = this.bonus.param.rewardParam && this.bonus.param.rewardParam[0].value;
                if(param.length>1){
                    rule=param[this.level] && param[this.level].value
                }else if(param.length==1){
                    rule=param[0].value;
                }

                if(type=='PlayerConsumptionReturn'){
                    rule=this.bonus.param;
                    this.tableImg=rule.imageUrl[1];
                }
                if(this.bonus.condition){
                    this.tableImg=this.bonus.condition.imageUrl[1];
                }
                list.map((item,index)=>{
                    if(item.displayId==0){
                    }else{
                        let text=item.displayTextContent.split("；");
                        text.remove(text[text.length-1]);
                        this.list.push({title:item.displayTitle,content:text});
                    }

                })
                this.rule=rule;
                if(this.sendData.code.includes("_service")){
                    type="service"
                }
                this.type=type;
                //存送金组
                if(type=="PlayerTopUpReturnGroup"){
                    this.$api.getTopupList({bDirty:false,bSinceLastConsumption:true,requestCount:1}).then(res=>{
                        let temp=res.data.records[0];
                        let bonus=0,bet=0,amount= 0;
                        if(temp){
                            amount= temp.amount;
                            this.sendData.data={topUpRecordId:temp._id}
                            let activeRule=rule[0];
                            rule.map((item,index)=>{
                                if(item.minTopUpAmount<=amount && activeRule.minTopUpAmount<item.minTopUpAmount){
                                    activeRule=item
                                }
                            })
                            if(activeRule.rewardAmount){
                                bonus=activeRule.rewardAmount;
                                bet=activeRule.spendingTimesOnReward * activeRule.rewardAmount;
                            }else if(activeRule.rewardPercentage){
                                if(activeRule.maxRewardInSingleTopUp && activeRule.maxRewardInSingleTopUp <=amount*activeRule.rewardPercentage){
                                    bonus=activeRule.maxRewardInSingleTopUp;
                                }else{
                                    bonus=amount*activeRule.rewardPercentage;
                                }
                                bet=activeRule.spendingTimes * (bonus+amount);
                            }
                        }
                        let code=this.$route.query.code;
                        this.show=[
                            {name:code.includes("irstDeposit")?'首次充值':'最新充值',content:'¥ '+amount},
                            {name:'优惠金额',content:'¥ '+bonus,color:'red'},
                            {name:'流水要求',content:'¥ '+bet}
                        ]
                    })
                }else if(type=='PlayerLoseReturnRewardGroup'){
                    // 输值返利
                    this.show=[
                        {name:'会员等级',content:this.levelVal},
                    ]
                }else if(type=='PlayerConsumptionReturn'){
                    this.$api.getConsumeRebateAmount({eventCode:this.sendData.code}).then(res=>{
                        this.show=[
                            {name:'会员等级',content:this.levelVal},
                            {name:"开始时间",content:res.data.settleTime.startTime.getDate().substr(5,11)},
                            {name:"结束时间",content:res.data.settleTime.endTime.getDate().substr(5,11)},
                            {name:"有效投注",content:res.data.totalConsumptionAmount.toFixed(2)},
                            {name:"洗码金额",content:res.data.totalAmount.toFixed(2),color:'red'},
                        ]
                    })
                }else if(type="service"){
                    this.show=[{name:'会员等级',content:this.levelVal}]
                }
            })
        }
    },
    created(){
        this.active = this['list'+this.id];
    },
    mounted(){
        this.init();
    },
    computed:{
        ...mapState(['player','cfUrl']),
        levelVal:function(){
            return this.player.levelName;
        },
        level:function(){
            return this.player.levelVal;
        }
    }
};
</script>
