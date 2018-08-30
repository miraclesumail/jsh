<template>
    <div class="weixin">
        <crumbs :icon="icon" :title="title"></crumbs>
        <div class="form_box2" v-if="!weixin.weChatQRCode">
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">游戏账号</div>
                <div class="text_box" flex="cross:center">
                    <input type="text" v-model="player.name" class="disable" placeholder="请输入存款金额">
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
        <div v-else>
            <h3 class="text_center">应付金额 : {{weixin.amount}}元</h3>
            <img class="code" :src="weixin.weChatQRCode" alt="付款二维码">
            <p>二维码只对此次存款有效,若要再次存款请再次提交。</p>
            <div class="btn" @click="cancel">取消</div>
            <img src="../../assets/weixin_pay.png" width="100%" alt="教程">
        </div>
    </div>
</template>

<script>
import GetAddress from '@/components/get_address.vue'
import {mapActions,mapState} from 'vuex'
export default {
    name: 'weixin',
    data () {
        return {
            sendData:{
                clientType:this.$client,
                amount:'',
                notUseQR:true,
                topUpReturnCode:'',

                bonusCode:null
            },
            icon:this.$route.query.icon,
            title:this.$route.query.name,
            maxAmount:0,
            weixin:{
                amount:'',
                proposalId:'',
                weChatQRCode:''
            },
        }
    },
    methods:{
        ...mapActions([
            'getRewards','getDeposit'
        ]),
        init(){
            this.$api.getWechatTopupRequestList().then(res => {
                if (res.data) {
                    this.$tool.CONFIRM({
                        text: "您的上笔个人微信 :" + res.data.data.amount + "元<br/>未完成订单号：" + res.data.proposalId + "<br/>请确认是否取消上笔订单创建新订单",
                        okName: "创建订单",
                        noName: "支付上笔",
                        okFun: () => {
                            this.$api.cancelWechatTopup({proposalId: res.data.proposalId});
                        },
                        noFun: () => {
                            this.weixin.weChatQRCode = res.data.data.weChatQRCode;
                            this.weixin.proposalId = res.data.proposalId;
                            this.weixin.amount = res.data.data.amount;
                        }
                    })
                }
            })
            //初始数据
            this.setDepostion(this.deposit.wechat,1);
            //判断个人微信状态
            this.getDeposit(4);
            //获取可申请的优惠
            this.getRewards();
        },
        //根据获取的可支持方式设置支付数据,init判断是否是初始化，
        setDepostion(wechat,init=0){
            if(!wechat){
                !init&&this.$tool.CONFIRM({text:this.title+'暂时不可用，请选择其他存款方式',okFun:()=>{
                    this.$router.go(-1);
                }})
            }else{
                this.maxAmount=wechat.maxDepositAmount || 2000;
            }
        },
        send(){
            let amount=this.sendData.amount;
            if(amount< this.minAmount || amount > this.maxAmount){
                this.$tool.CONFIRM({text:this.title+"充值金额在("+this.minAmount+"-"+this.maxAmount+")范围内"});
                return;
            };
            if(this.sendData.topUpReturnCode==1){this.sendData.topUpReturnCode=''};
            this.$api.requestWechatTopup(this.sendData).then(res=>{
                this.sendData.bonusCode=null;
                this.weixin.weChatQRCode = res.data.result.weChatQRCode;
                this.weixin.proposalId = res.data.proposalId;
                this.weixin.amount = res.data.result.amount;
            }).catch(err=>{
                this.init();
            })
        },
        cancel(){
            this.$api.cancelWechatTopup({proposalId: this.weixin.proposalId}).then(res=>{
                this.weixin.weChatQRCode ='';
                this.init();
            })
        }
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
        'deposit.wechat'(){
            this.setDepostion(this.deposit.wechat);
        }
    }
}
</script>
