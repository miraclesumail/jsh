<template>
    <div class="hand">
        <crumbs :icon="icon" :title="title"></crumbs>
        <div class="form_box2" v-if="!proposalData.amount">
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">存款金额</div>
                <div class="text_box" flex="cross:center">
                    <input type="tel" v-model="sendData.amount" placeholder="请输入存款金额">
                    <div class="tip">*单笔金额{{minAmount}}-{{maxAmount}}元</div>
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center" v-if="type==3">
                <div class="name">存款方式</div>
                <div class="text_box" flex="cross:center">
                    <select name="transferType" v-model="transferType">
                        <option value="1">现金存款</option>
                        <option value="2">柜台转账</option>
                    </select>
                    <i></i>
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center" v-if="type==3&&transferType==2">
                <div class="name">转账编码</div>
                <div class="text_box" flex="cross:center">
                    <input type="tel" v-model="player.playerId" disabled placeholder="请输入存款人姓名">
                    <div class="tip">*请将转账编码告知银行柜员，并让他填写备注</div>
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center" v-if="type==1 ||(type==3 && transferType==1)">
                <div class="name">存款姓名</div>
                <div class="text_box" flex="cross:center">
                    <input type="text" v-model.trim="sendData.realName" placeholder="请输入存款人姓名">
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center" v-if="banks.length">
                <div class="name">存款银行</div>
                <div class="text_box" flex="cross:center">
                    <select name="bank" v-model="sendData.bankTypeId">
                        <option :value="item.bankTypeId" v-if="item.status==1" v-for="(item,index) in banks" :key="index">{{item.name}}</option>
                    </select>
                    <i></i>
                </div>
            </div>
            <GetAddress v-if="2==type" v-model="address" />
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
            <div class="table_text border_btm" v-if="title !='云闪付'">
                <h4>收款信息</h4>
                <ul class="text">
                    <li>银行名称 : <span>{{proposalData.bankTypeName}}</span></li>
                    <li>开户姓名 : <span>{{proposalData.cardOwner}}</span></li>
                    <li flex="main:justify">
                        <div>银行账号 : <span>{{proposalData.bankCardNo}}</span> </div>
                        <button class="btn btn_sm"
                            v-clipboard:copy='proposalData.bankCardNo'
                            v-clipboard:success="handleSuccess">复制</button>
                    </li>
                    <li>开户支行 : <span>{{proposalData.openingPoint}}</span></li>
                </ul>
            </div>
            <div class="shanfu border_btm" flex="cross:center dir:top" v-else>
                <img :src="proposalData.codeAddress" alt="" width="80%">
                <p class="center red">请使用银联云闪付app扫码二维码付款</p>
            </div>
            <div class="table_text">
                <h4>申请存款状态</h4>
                <ul class="text">
                    <li>申请金额 : <span class="red">{{proposalData.amount}}元</span></li>
                    <li>有效计时 : <span class="red">{{countDown}}</span></li>
                    <li>申请单号 : <span>{{proposalData.proposalId}}</span></li>
                    <li>有效时间 : <span>{{proposalData.validTime}}</span></li>
                </ul>
            </div>
            <div class="btn btn_red" @click="cancel">取消存款</div>
            <p class="red text_sm text_center">*温馨提示：存款完成后，请不要点击取消存款！谢谢配合！</p>
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
                depositMethod:this.$route.query.type,
                bonusCode:null,
                amount:null,
                bPMSGroup:true,
                realName:null,
                bankTypeId:null,
                realName:null,
                topUpReturnCode:'',
                bonusCode:null,
            },
            handNames:[
                {type:1,name:'网银转账',icon:'icon_wangyin'},
                {type:2,name:'ATM存款',icon:'icon_atm'},
                {type:3,name:'柜台存款',icon:'icon_guitai'},
                {type:4,name:'支付宝转银行',icon:'icon_alipay'},
                {type:5,name:'微信转银行',icon:'icon_weixin'},
                {type:6,name:'云闪付',icon:'icon_shanfu'}
            ],
            maxAmount:499999,
            type:this.$route.query.type,
            banks:[],
            transferType:1,
            address:{
                provinceId:'',
                cityId:''
            },
            depositType:'',
            proposalData:{
                amount:'',
                cardOwner:'',
                bankTypeName:'',
                depositMethod:'',
                bankCardNo:'',
                proposalId:'',
                openingPoint:'',
                codeAddress:'',
                validTime:''
            },
            differenceS:0,
            title:'',
            icon:null
        }
    },
    methods:{
        ...mapActions([
            'getRewards','getDeposit'
        ]),
        init(){
            //获取手工存款申请单列表
            this.$api.getManualTopupRequestList().then(res=>{
                if(res.data){
                    let temp=res.data.data;
                    for(let key in this.proposalData){
                        if(key=='bankTypeName'){
                            this.proposalData[key]=this.bankNames[temp.bankTypeId]
                        }else if(key=='depositMethod'){
                            this.proposalData[key]=this.$tool.findVal(this.handNames,temp.depositMethod,'type')['name'];
                            this.title=this.proposalData[key];
                            this.icon=this.$tool.findVal(this.handNames,temp.depositMethod,'type')['icon'];
                        }else if(key=='openingPoint'){
                            this.proposalData[key]=(temp.resultData.provinceName ||'')+(temp.resultData.cityName ||'')+(temp.resultData.openingPoint ||'')
                        }else if(key=='codeAddress'){
                            if(temp.depositMethod==6){
                                this.proposalData[key]=temp.resultData[key]
                            }
                        }else if(key=='validTime'){
                            this.proposalData[key]=temp[key].getDate();
                        }else{
                            this.proposalData[key]=temp[key]
                        }
                    }
                    this.SetCountDown(temp.validTime)
                }else{
                    this.title=this.$route.query.name;
                    this.icon=this.$route.query.icon;
                }
            });
            //获取pms可用银行卡类型
            this.setDepostion(this.deposit.hand,1);
            this.getDeposit(1);
            //获取可申请的优惠
            this.getRewards();
        },
        //根据获取的可支持方式设置支付数据,init判断是否是初始化，
        setDepostion(list,init=0){
            let depositMethod= this.sendData.depositMethod;
            let depositType=this.$tool.findVal(list,this.sendData.depositMethod,'depositMethod');
            if(!depositType.maxDepositAmount){
                !init&&this.$tool.CONFIRM({text:this.title+'暂时不可用，请选择其他存款方式',okFun:()=>{
                    this.$router.go(-1);
                }})
            }else{
                if(depositMethod<4){
                    this.banks= depositType.data;
                    this.sendData.bankTypeId=this.banks[0].bankTypeId;
                    this.sendData.realName=depositType.lastOnlineBankingName ||depositType.lastDepositorName ||'';
                    if(depositMethod==2){
                        this.address.provinceId=depositType.lastDepositProviceId;
                        this.address.cityId=depositType.lastDepositCityId;
                    }
                }
                this.depositType=depositType;
            }
        },
        SetCountDown(valid){
            let validTime=new Date(valid).getTime() -(new Date().getTime());
            this.differenceS = (validTime/1000).toFixed(0);
            let timer = setInterval(()=>{
                --this.differenceS;
                if(!this.differenceS){
                    clearInterval(timer);
                    for(let key in this.proposalData){
                        this.proposalData[key]=''
                    };
                    this.init();
                };
            },1000)
        },
        send(){
            let type=this.type,wranStr='';
            //需判断真实姓名
            if(type==1||(type==3&&this.transferType==1)){
                wranStr = this.$tool.realName(this.sendData.realName);
            }
            //需判断金额在可存款范围内
            if(!wranStr && (this.sendData.amount<this.minAmount || this.sendData.amount>this.maxAmount)){
                wranStr= this.$route.query.name+'金额在('+this.minAmount+'-'+this.maxAmount+')范围内';
            }
            if(wranStr){
                this.$tool.CONFIRM({text:wranStr});
            }else{
                if(type==3&&this.transferType==2)this.sendData.remark=this.player.playerId;
                if(type==2)Object.assign(this.sendData,this.address);
                if(this.sendData.topUpReturnCode==1){this.sendData.topUpReturnCode=''};
                this.$api.requestManualTopup(this.sendData).then(res=>{
                    this.sendData.bonusCode=null;
                    this.init();
                    if(type>3 && type<7){
                        let text= "订单号："+res.data.proposalId+"<br/>支付金额："+res.data.result.changeAmount+"<br/>您本次需要存入金额为<span style='color:red;font-size:0.4rem'>"+res.data.result.changeAmount+
                            "</span>,否则存款无法到账";
                        this.$tool.CONFIRM({text:text});
                    }
                }).catch(err=>{
                    this.getDeposit(1);
                })
            }
        },
        //复制成功
        handleSuccess(){
            this.$tool.ALERT({text:"卡号复制成功"});
        },
        //取消存款
        cancel(){
            this.$tool.CONFIRM({text:"确定要取消订单",okFun:()=>{
                this.$api.cancelManualTopupRequest({proposalId:this.proposalData.proposalId}).then(res=>{
                    for(let key in this.proposalData){
                        this.proposalData[key]=''
                    }
                    this.init();
                });
            },noName:"取消"})
        },
    },
    mounted(){
        this.init();
    },
    components:{GetAddress},
    computed:{
        ...mapState(['platform','player','bankNames','depositDiscount','deposit']),
        minAmount(){
            return this.platform.minDepositAmount || 10;
        },
        countDown:function(){
            return this.$tool.toTime(this.differenceS);
        }
    },
    watch:{
        'deposit.hand'(){
            this.setDepostion(this.deposit.hand);
        }
    }
}
</script>
