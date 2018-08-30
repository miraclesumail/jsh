<template>
    <div class="withdrawal">
        <crumbs icon="icon_tikuan" title="申请提款"></crumbs>
        <div class="box">
            <ul class="info">
                <li>额度：{{wallet.totalCredit}}元</li>
                <li>免费次数：{{freeTimes || 0}} 次</li>
                <li>可提额度：<span class="red">{{limit.decimals()}}元</span></li>
                <li>提款费率：{{serviceCharge*100}}%</li>
            </ul>
            <div class="scbox" v-for="(item,index) in lockList" :key="index">
                <div class="name">{{item.name}}</div>
                <Schedule  :max="item.lockAmount" :current="item.currentLockAmount"/>
            </div>
        </div>
        <div class="form_box2">
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">游戏账号</div>
                <div class="text_box" flex="cross:center">
                    <input type="text" v-model="player.name" class="disable" placeholder="请输入存款金额">
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">提款金额</div>
                <div class="text_box" flex="cross:center">
                    <input type="tel" v-model="sendData.amount" maxlength="10" placeholder="请输入提款金额">
                </div>
            </div>
            <div class="item item_btn">
                <div class="btn" @click="send">提交申请</div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import Schedule from "@/components/schedule.vue"
export default {
    name: 'withdrawal',
    data() {
        return {
            sendData:{
                amount:''
            },
            freeTimes:'',
            serviceCharge:0,
            xima:0,
            withdrawals:0,
            lockList:[],
            setting:{
                min:100,
                max:200000,
                balanceMax:1000000
            }
        }
    },
    components:{Schedule},
    methods: {
        ...mapActions([
            'setWallet'
        ]),
        send(){
            let amount=Number(this.sendData.amount);
            let setting=this.setting,str='';
            if (amount < setting.min)str='最低提款金额为100元';
            if (!str && amount > setting.max)str='单笔提款最高20万';

            if (!str && (this.limit < amount || this.limit == 0))str="本次提款余额不足，请核实";
            if (!str && setting.balanceMax<amount)str= "当日最高提款为100万<br/>您当日已提款成功" + (1000000-setting.balanceMax) + '元，' + '还可以提款金额为' + setting.balanceMax + '元';
            if(str){
                this.$tool.CONFIRM({text:str})
            }else{
                this.$api.applyBonus({bonusId:1,amount:amount}).then(res => {
                    this.$tool.ALERT({text: "提款提交成功，请留意支付状态"});
                    this.init();
                    this.sendData.amount = '';
                })
            }
        },
        init(checked=0){
            this.setWallet();
            //检查是否有已经提交的提款申请
            this.$api.getBonusRequestList({startTime: new Date(new Date().setHours(0, 0, 0, 0))}).then(res => {
                let temp=res.data.records ||[];
                temp.map((item, index) => {
                    if (checked&&['Pending', 'AutoAudit'].includes(item.status)) {
                        this.$tool.CONFIRM({
                            text: "您已有一笔提款申请", okName: "前往查看", noName: "取消上一笔", okFun: () => {
                                this.$router.push({
                                    path: "/account/search",
                                    query: {type: '全部', nav: 1}
                                });
                            }, noFun: () => {
                                this.$api.cancelBonusRequest({proposalId: item.proposalId}).then(res => {
                                    this.$tool.ALERT({text: "取消成功"});
                                    this.init();
                                })
                            }
                        })
                    }
                    if (item.status == 'Success') {
                        this.balanceMax -= Number(item.data.amount);
                    }
                })
            })
            this.$api.getWithdrawalInfo().then(res => {
                this.freeTimes=res.data.freeTimes;
                this.serviceCharge=res.data.serviceCharge;
                this.xima=res.data.ximaWithdraw;
                let temp=res.data,list=[];
                if(temp.freeAmount){
                    list.push({name:'大厅锁定',lockAmount:temp.freeAmount,currentLockAmount:temp.currentFreeAmount})
                }
                list=list.concat(temp.lockList)
                this.lockList=list;
            })
        }
    },
    mounted(){
        if(this.player.bankAccount){
            this.init(1);
        }else{
            this.$tool.CONFIRM({
                text: "您的银行卡尚未绑定，请前往绑定", okName: "前往绑定", okFun: () => {
                    this.$router.push('/account/modifyBank');
                }
            })
        }

    },
    computed:{
        ...mapState(['player','wallet']),
        limit(){
            return this.xima + (this.lockList.length ? 0 : this.wallet.totalCredit);
        }
    },
}
</script>
