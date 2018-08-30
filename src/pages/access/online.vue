<template>
    <div class="online">
        <crumbs :icon="icon" :title="title"></crumbs>
        <div class="form_box2">
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">游戏账号</div>
                <div class="text_box" flex="cross:center">
                    <input type="text" v-model="player.name" class="disable" placeholder="请输入存款金额">
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">存款金额</div>
                <div class="text_box" flex="cross:center">
                    <input type="tel" v-model="sendData.amount" maxlength="10" placeholder="请输入充值金额">
                    <div class="tip">*{{title}}实时到账，单笔金额{{minAmount}}-{{maxAmount}}元</div>
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">优惠类型</div>
                <div class="text_box" flex="cross:center">
                    <select name="bank" v-model="sendData.topUpReturnCode">
                        <option value="">请选择</option>
                        <option v-for="(item,index) in depositDiscount" :key="index" :value="item.code">{{item.name}}</option>
                        <option value="1">娱乐宝</option>
                    </select>
                    <i></i>
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center" v-if="sendData.topUpReturnCode==1">
                <div class="name">娱乐宝</div>
                <div class="text_box" flex="cross:center">
                    <input type="tel" v-model="sendData.bonusCode" placeholder="请输入领取码">
                </div>
            </div>
            <div class="item item_btn">
                <div class="btn" @click="send">提交申请</div>
            </div>
        </div>
    </div>
</template>

<script>
import GetAddress from '@/components/get_address.vue'
import {mapActions,mapState} from 'vuex'
export default {
    name: 'hand',
    data () {
        return {
            sendData:{
                merchantUseType:1,
                clientType:this.$client,
                amount:'',
                topupType:this.$route.query.type,
                topUpReturnCode:'',
                bonusCode:null,
            },
            icon:this.$route.query.icon,
            title:this.$route.query.name,
            type:this.$route.query.type,
            minAmount:0,
            maxAmount:0
        }
    },
    methods:{
        ...mapActions([
            'getRewards','getDeposit'
        ]),
        init(){
            this.setDepostion(this.deposit.online,1)
            //在线充值
            this.getDeposit(2);
            //获取可申请的优惠
            this.getRewards();
        },
        //根据获取的可支持方式设置支付数据,init判断是否是初始化，
        setDepostion(list,init=0){
            let typeData=this.$tool.findVal(list,this.type,'type');
            if(typeData.status !=1){
                !init&&this.$tool.CONFIRM({text:this.title+'暂时不可用，请选择其他存款方式',okFun:()=>{
                    this.$router.go(-1);
                }})
            }else{
                this.maxAmount=typeData.maxDepositAmount || 5000;
                this.minAmount=this.platform.minDepositAmount> typeData.minDepositAmount ?this.platform.minDepositAmount:typeData.minDepositAmount;
            }
        },
        send(){
            let amount=this.sendData.amount;
            if(amount< this.minAmount || amount > this.maxAmount){
                this.$tool.CONFIRM({text:this.title+"充值金额在("+this.minAmount+"-"+this.maxAmount+")范围内"});
                return;
            };
            if(this.sendData.topUpReturnCode==1){this.sendData.topUpReturnCode=''};
            this.$api.createOnlineTopupProposal(this.sendData).then(res=>{
                this.sendData.bonusCode=null;
                this.$tool.CONFIRM({text:"订单号："+res.data.proposalId+"<br/>支付金额："+res.data.amount,okName:"支付",okFun:()=>{
                    window.open(res.data.topupDetail.paymentURL)
                },noName:"取消"});
            }).catch(err=>{
                this.getDeposit(2);
            })
        },
    },
    mounted(){
        this.init();
    },
    components:{GetAddress},
    computed:{
        ...mapState(['platform','player','depositDiscount','deposit'])
    },
    watch:{
        'deposit.online'(){
            this.setDepostion(this.deposit.online);
        }
    }
}
</script>
