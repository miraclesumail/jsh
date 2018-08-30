<template>
    <div class="modify_bank">
        <crumbs icon="icon_bank" title="提款银行卡"></crumbs>
        <div class="table_box" v-if="bankInfoShow">
            <table>
                <thead>
                <tr>
                    <th>类别</th>
                    <th>详情</th>
                </tr>
                </thead>
                <tr v-for="(item,index) in bankInfo" :key="index">
                    <td class="text_md">{{item.name}}</td>
                    <td class="text_md">{{item.content}}</td>
                </tr>
            </table>
            <div class="btn btn_change" @click="bankInfoShow=false">更新银行卡</div>
        </div>
        <div class="form_box2" v-else>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">收款人</div>
                <div class="text_box" flex="cross:center">
                    <input type="text" v-model.lazy="sendData.bankAccountName" :class="{disable:$tool.findVal(bankInfo,'收款人','name').content}" placeholder="请输入真实姓名">
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">收款银行</div>
                <div class="text_box" flex="cross:center">
                    <select name="bank" v-model="sendData.bankName">
                        <option :value="index" v-for="(item,index) in bankNames" :key="index">
                            {{item}}
                        </option>
                    </select>
                    <i></i>
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">账户类型</div>
                <div class="text_box" flex="cross:center">
                    <select v-model='sendData.bankAccountType'>
                        <option value="1">信用卡</option>
                        <option value="2">储蓄卡</option>
                    </select>
                    <i></i>
                </div>
            </div>
            <GetAddress v-model="address" />
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">银行账号</div>
                <div class="text_box" flex="cross:center">
                    <input type="tel" v-model.lazy="sendData.bankAccount" maxlength="21" v-pattern placeholder="请输入银行账号">
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">开户支行</div>
                <div class="text_box" flex="cross:center">
                    <input type="text" v-model.lazy="sendData.bankAddress" placeholder="请输入开户支行">
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center" v-if="platform.needSMSForModifyBankInfo">
                <div class="name">验证码</div>
                <div class="text_box" flex="cross:center box:last">
                    <input type="tel" v-model.lazy="sendData.smsCode" maxlength="4" placeholder="请输入短信验证码">
                    <div class="get_code" @click="getCode" v-if="!reciprocal">获取验证码</div>
                    <span v-else class="get_code red">{{reciprocal}}s</span>
                </div>
            </div>
            <div class="item item_btn">
                <div class="btn" @click="send">更新</div>
            </div>
        </div>
    </div>
</template>

<script>
import GetAddress from '@/components/get_address.vue'
import {mapState,mapActions} from 'vuex'
export default {
    name: 'modify_bank',
    data () {
        return {
            step:1,
            reciprocal:0,
            timer:null,
            bankInfoShow:true,
            bankInfo:[],
            address:{},
            sendData:{
                bankAccountName: '',
                bankAccount:'',
                bankName:'',
                bankAccountType: '',
                bankAccountProvince: '',
                bankAccountCity:'',
                bankAddress:'',
                smsCode: ''
            }
        }
    },
    components:{GetAddress},
    methods:{
        ...mapActions([
            'setLogin',
        ]),
        init(){
            this.bankInfoShow=!!this.player.realName;
            this.$api.get().then(res=>{
                let tmp=res.data;
                let list=[
                    {name:'收款人',content:tmp.realName},
                    {name:'银行卡号',content:tmp.bankAccount},
                    {name:'银行名称',content: this.bankNames[tmp.bankName]},
                    {name:'银行卡类别',content:tmp.bankAccountType == "2" ?"储蓄卡":"信用卡"},
                    {name:'开户省市',content:(tmp.bankAccountProvince || '') + (tmp.bankAccountCity || '')},
                    {name:'开户支行',content:tmp.bankAddress}];
                this.bankInfo=list;
                this.sendData.bankAccountName=tmp.bankAccountName;
                this.sendData.bankName=tmp.bankName || '1';
                this.sendData.bankAccountType=tmp.bankAccountType || '2';
                let obj={
                    provinceId:tmp.bankAccountProvinceId,
                    cityId:tmp.bankAccountCityId
                }
                this.address=obj;
            })
        },
        getCode(){
            if(this.reciprocal || this.validate(1))return;
            this.$api.sendSMSCodeToPlayer({purpose:'updateBankInfo'}).then(res=>{
                this.reciprocalFun();
            })
        },
        reciprocalFun(){
            this.reciprocal = 60;
            this.timer = setInterval(()=>{
                this.reciprocal--
                if(this.reciprocal ==0){
                    clearInterval(this.timer)
                }
            },1000)
        },
        //index:1 为获取验证码验证,此时不验证短信验证码
        validate(index){
            let str='';
            if(!this.player.realName){
                str=this.$tool.realName(this.sendData.bankAccountName);
            }
            if(!str){

                str=this.$tool.realBankNumber(this.sendData.bankAccount);
            }
            if(!str && !this.sendData.bankAddress){
                str='支行信息不能为空';
            }
            if(!str && index!=1 && this.platform.needSMSForModifyBankInfo){
                str=this.$tool.smsCode(this.sendData.smsCode);
            }
            if(str)this.$tool.CONFIRM({text:str});
            return !!str;
        },
        send(){
            if(this.validate())return;
            this.sendData.bankAccountProvince=this.address.provinceId;
            this.sendData.bankAccountCity=this.address.cityId;
            if(!this.platform.needSMSForModifyBankInfo)delete this.sendData.smsCode;
            this.$api.updatePaymentInfo(this.sendData).then(data => {
                this.init();
                this.bankInfoShow=true;
                if(!this.player.realName){
                    this.$tool.SET_STATE({name:"player",content:this.sendData.bankAccountName,sub:'realName'});
                    this.$tool.setStore("player",this.player);
                }
            });
        }
    },
    mounted(){
        this.init();
    },
    computed:{
        ...mapState(['platform','player','bankNames'])

    }
}
</script>
