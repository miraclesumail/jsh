<template>
    <div class="alipay">
        <crumbs :icon="icon" :title="title"></crumbs>
        <div class="form_box2">
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">游戏账号</div>
                <div class="text_box" flex="cross:center">
                    <input type="text" v-model="player.name" class="disable" placeholder="请输入存款金额">
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">实名/昵称</div>
                <div class="text_box" flex="cross:center">
                    <input type="tel" v-model="sendData.realName" maxlength="10" placeholder="支付宝转账需实名或昵称">
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">充值金额</div>
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
    name: 'alipay',
    data () {
        return {
            sendData:{
                merchantUseType:1,
                clientType:this.$client,
                amount:'',
                topupType:this.$route.query.type,
                topUpReturnCode:'',
                bonusCode:null,
                realName:'',
                alipayName:''
            },
            icon:this.$route.query.icon,
            title:this.$route.query.name,
            type:this.$route.query.type,
            maxAmount:0
        }
    },
    methods:{
        ...mapActions([
            'getRewards','getDeposit'
        ]),
        init(){
            this.$api.getAlipayTopupRequestList().then(res => {
                if (res.data) {
                    this.$tool.CONFIRM({
                        text: "您的上笔个人支付宝" + res.data.data.amount + "存款申请未完成<br/>订单号：" + res.data.proposalId + "<br/>请确认是否取消上笔订单创建新订单",
                        okName: "创建订单",
                        noName: "支付上笔",
                        okFun: () => {
                            this.$api.cancelAlipayTopup({proposalId: res.data.proposalId});
                        },
                        noFun: () => {
                            location.href = this.$tool.Alipay(1, res.data.data.qrcodeAddress);
                        }
                    })
                }
            })
            //初始数据
            this.setDepostion(this.deposit.alipay,1);
            //判断个人支付宝状态
            this.getDeposit(3);
            //获取可申请的优惠
            this.getRewards();
        },
        //根据获取的可支持方式设置支付数据,init判断是否是初始化，
        setDepostion(alipay,init=0){
            if(!alipay){
                !init&&this.$tool.CONFIRM({text:this.title+'暂时不可用，请选择其他存款方式',okFun:()=>{
                    this.$router.go(-1);
                }})
            }else{
                this.sendData.realName=alipay.lastNicknameOrAccount;
                this.maxAmount=alipay.maxDepositAmount || 2000;
            }
        },
        send(){
            let amount=this.sendData.amount;
            if(!this.sendData.realName){
                this.$tool.CONFIRM({text:"实名/昵称不能为空"});
                return;
            }
            if(amount< this.minAmount || amount > this.maxAmount){
                this.$tool.CONFIRM({text:this.title+"充值金额在("+this.minAmount+"-"+this.maxAmount+")范围内"});
                return;
            };
            if(this.sendData.topUpReturnCode==1){this.sendData.topUpReturnCode=''};
            this.sendData.alipayName=this.sendData.realName;
            this.$api.requestAlipayTopup(this.sendData).then(res=>{
                this.sendData.bonusCode=null;
                this.$tool.CONFIRM({text:"订单号："+res.data.proposalId+"<br/>支付金额："+this.sendData.amount,okName:"支付",okFun:()=>{
                    location.href = this.$tool.Alipay(1, res.data.result.qrcodeAddress);
                }});
            }).catch(err=>{
                this.getDeposit(3);
            })
        },
    },
    mounted(){
        this.init();
    },
    components:{GetAddress},
    computed:{
        ...mapState(['platform','player','depositDiscount','deposit']),
        minAmount(){
            return this.platform.minDepositAmount || 10;
        }
    },
    watch:{
        'deposit.alipay'(){
            this.setDepostion(this.deposit.alipay);
        }
    }
}
</script>
