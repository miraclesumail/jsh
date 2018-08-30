<template>
    <div class="gametransfer">
        <div class="crumbs" flex="box:mean cross:center">
            <div class="credit" flex>
                自由额度：<span v-if="wallet.credit">{{wallet.credit}}</span>
                <div class="loading_sm" v-else></div>
            </div>
            <div class="credit" flex>
                锁定额度：<span v-if="wallet.lockedCredit">{{wallet.lockedCredit}}</span>
                <div class="loading_sm" v-else></div>
            </div>
        </div>
        <scroll :data="providerList">
            <ul class="platforms">
                <li v-for="(item,index) in providerList"
                    v-if="!reProvider.includes(item.providerId)"
                    :key="index"
                    :class="{warn:item.status!=1,active:index==active}">
                    <div class="name">{{getNickName(item)}}<span v-html="providerTeam[item.providerId].text"></span></div>
                    <div class="amount">
                <span v-if="wallet.credit">
                {{$tool.findVal(wallet.data.gameCreditList,item.providerId,'providerId').validCredit}}元
                </span>
                        <div class="loading_sm" v-else></div>
                    </div>
                    <div class="status" v-if="item.status!=1">维护</div>
                    <div class="btns">
                        <div
                            @click="transfer(item,1)"
                            v-if="wallet.credit && (item.status==1 && (wallet.credit>1 || wallet.lockedCreditId.includes(item.providerId)))"
                            class="ok">转入</div>
                        <div v-else>转入</div>
                        <div
                            @click="transfer(item,2)"
                            v-if="wallet.credit && $tool.findVal(wallet.data.gameCreditList,item.providerId,'providerId').validCredit>1"
                            class="ok">转出</div>
                        <div v-else>转出</div>
                    </div>
                </li>
            </ul>
        </scroll>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    name: 'gametransfer',
    data () {
        return {
            credit:0,
            type:1,
            active:-2
        }
    },
    computed: {
        ...mapState(['wallet','reProvider','providerTeam']),
        providerList(){
            let list =[];
            let temp=this.wallet.data && this.wallet.data.lockedCreditList;
            temp&&temp.map((item,index)=>{
                item.list.map((key,i)=>{
                    key.lobbyNickName=item.nickName
                    list.push(key)
                })
            })
            return list;
        }
    },
    methods:{
        ...mapActions(['setWallet']),
        getNickName(val){
            if(val.providerId=='55'){
                return "BBIN游戏";
            }
            if(val.providerId=="16"){
                return "AG&捕鱼王";
            }
            return val.nickName;
        },
        transfer(val,status){
            //status   (1)=>转入 (2)=>转出
            let transferFun = 'transferToProvider';
            if(status == 2)transferFun='transferFromProvider';
            this.$api[transferFun]({providerId:val.providerId}).then(res=>{
                this.$tool.ALERT({text:'本次额度转账成功，请核实'});
                this.setWallet();
            })
        }
    },
    mounted(){
        this.setWallet();
    }
}
</script>
