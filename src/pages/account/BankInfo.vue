<template>
    <scroll>
        <div class="bank_info">
            <crumbs backPath='/account' title="银行资料"></crumbs>
            <div class="form_box" style="margin-top:40px" v-if="modify">
                <div class="item" flex="box:first">
                    <div class="img_box" flex="cross:center main:center">
                        <img src="../../assets/icons/icon_man.png">
                    </div>
                <span v-if="partnerInfo.realName">{{partnerInfo.realName}}</span>
                <input v-else type="text" placeholder="请输入银行卡姓名"  v-model.trim="sendData.bankAccountName">
                </div>
                <div class="item" flex="box:first">
                    <div class="img_box" flex="cross:center main:center">
                        <img src="../../assets/icons/icon_account.png">
                    </div>
                    <input type="tel" v-model.trim="sendData.bankAccount" placeholder="请输入银行账号" maxlength="21">
                </div>
                <div class="item"  flex="cross:center box:first">
                    <div style="padding-left: 0.2rem">银行名称 :</div>
                    <div class="select_warp">
                        <select name="type" v-model="sendData.bankName">
                            <option :value="key" v-for="(item,key) in bankTypeIds" :key="key">{{item}}</option>
                        </select>
                    </div>
                </div>
                <div class="item" flex="cross:center box:first">
                    <div style="padding-left: 0.2rem">账户性质 :</div>
                    <div class="select_warp">
                        <select name="type" v-model="sendData.bankAccountType">
                            <option value="1">信用卡</option>
                            <option value="2">借记卡</option>
                        </select>
                    </div>
                </div>
                <div class="item"  flex="cross:center box:first">
                    <div style="padding-left: 0.2rem">开户省份 :</div>
                    <div class="select_warp">
                        <select name="type" v-model="sendData.bankAccountProvince"  @change="changeCity">
                            <option :value="item.id" v-for="(item,index) in provinceList" :key="index">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="item"  flex="cross:center box:first">
                    <div style="padding-left: 0.2rem">开户城市 :</div>
                    <div class="select_warp">
                        <select name="type" v-model="sendData.bankAccountCity">
                            <option :value="item.id" v-for="(item,index) in cityList" :key="index">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="item" flex="box:first">
                    <div class="img_box" flex="cross:center main:center">
                        <img src="../../assets/icons/icon_location.png">
                    </div>
                    <input type="text" v-model.trim="sendData.bankAddress" placeholder="请输入开户支行">
                </div>
                <div class="item" flex="box:justify cross:center">
                    <div class="img_box" flex="cross:center main:center">
                        <img src="../../assets/icons/icon_sms.png">
                    </div>
                    <input type="tel" v-model="sendData.smsCode"  placeholder="输入验证码" maxlength="4">
                    <div style="color:red" v-if="reciprocal">{{reciprocal}}s</div>
                    <div class="get_code btn btn_yellow" v-else @click="getCode">获取验证码</div>
                </div>
            </div>
            <div class="form_box" style="margin-top:40px" v-else>
                <div class="item" flex="box:first">
                    <div class="img_box" flex="cross:center main:center">
                        <img src="../../assets/icons/icon_man.png">
                    </div>
                    <span>{{partnerInfo.realName}}</span>
                </div>
                <div class="item" flex="box:first">
                    <div class="img_box" flex="cross:center main:center">
                        <img src="../../assets/icons/icon_account.png">
                    </div>
                    <span>{{partnerInfo.bankAccount}}</span>
                </div>
                <div class="item"  flex="cross:center box:first">
                    <div style="padding-left: 0.2rem">银行名称 : </div>
                    <span style="padding-left: 0.16rem">{{bankTypeIds[partnerInfo.bankName]}}</span>
                </div>
                <div class="item" flex="cross:center box:first">
                    <div style="padding-left: 0.2rem">账户性质 :</div>
                    <span style="padding-left: 0.16rem">{{partnerInfo.bankAccountType=='1'?'信用卡':'借记卡'}}</span>
                </div>
                <div class="item"  flex="cross:center box:first">
                    <div style="padding-left: 0.2rem">开户城市 :</div>
                    <span style="padding-left: 0.16rem">{{city}}</span>
                </div>
                <div class="item" flex="box:first">
                    <div class="img_box" flex="cross:center main:center">
                        <img src="../../assets/icons/icon_location.png">
                    </div>
                    <span>{{partnerInfo.bankAddress}}</span>
                </div>
            </div>
            <div class="btn" style="margin-top: 0.9rem" @click="send">{{modify?'提交':'修改'}}</div>
        </div>
    </scroll>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name: 'bank_info',
    data () {
        return {
            reciprocal:0,
            change:false,
            provinceList:[],
            cityList:[],
            modify:false,
            sendData:{
                bankName:'1',
                bankAccount:'',
                bankAccountName:'',
                bankAccountType:'2',
                bankAccountProvince:'',
                bankAccountCity:'',
                bankAddress:'',
                smsCode:''
            },
            partnerInfo:{
                name:'',
                fullPhoneNumber:'',
                realName:'',
                bankAccount:'',
                bankName:'',
                bankAccountType:'',
                bankAccountProvince:'',
                bankAccountCity:'',
                bankAccountCityId:'',
                bankAccountProvinceId:'',
                bankAddress:''
            },   //玩家信息H
            errorData:{
                name:null,
                password:null,
                phoneNumber:null,
                smsCode:null,
            },
            bankTypeIds: {
                1: '中国工商银行',
                2: '中国农业银行',
                3: '中国银行',
                4: '中国建设银行',
                5: '交通银行',
                6: '中信银行',
                7: '中国光大银行',
                8: '华夏银行',
                9: '广发银行',
                10: '平安银行',
                11: '招商银行',
                12: '兴业银行',
                13: '上海浦东发展银行',
                161: '中国邮政储蓄银行',
                169: '中国民生银行'
            }
        }
    },
    methods:{
        ...mapActions([
            'setLogin',
        ]),
        reciprocalFun(){
            this.reciprocal = 60;
            let countDown = setInterval(()=>{
                this.reciprocal--
                if(this.reciprocal ==0){
                    clearInterval(countDown)
                }
            },1000)
        },
        isValid(num){
            // 验证信息
            if(!this.partnerInfo['realName'] && this.$tool.realName(this.sendData.bankAccountName))return;
            if(this.$tool.realBankNumber(this.sendData.bankAccount))return;
            if(!this.sendData.bankAddress){
                this.$tool.ALERT({text:"开户分行不能为空",type:'warn'});
                return;
            }
            if(num==1 && this.$tool.smsCode(this.sendData.smsCode))return;
            return true;
        },
        getCode(){
            if(!this.isValid())return;
            if(this.reciprocal)return;
            this.$api.getSMSCode({phoneNumber:this.partnerInfo.fullPhoneNumber,purpose:"Partner_updateBankInfoFirst"}).then(res=>{
                this.reciprocalFun();
            })
        },
        send(){
            if(this.modify){
                if(!this.isValid(1))return;
                this.$api.fillBankInformation(this.sendData).then(res=>{
                    this.$tool.CONFIRM({text:"绑定成功"});
                    this.modify=false;
                    this.$router.push({query:{modify:false}});
                    this.getInfo();
                })
            }else{
                this.modify=true;
                this.$router.push({query:{modify:true}})
            }

        },
        changeCity(){
            this.$api.getCityList({provinceId:this.sendData.bankAccountProvince}).then(res=>{
                this.cityList =res.data;
                this.sendData.bankAccountCity = this.cityList[0].id;
            })
        },
        getInfo(){
            this.$api.get().then(res=>{
                let temp= res.data;
                for(let key in this.partnerInfo){
                    if(key=="bankAccountName"){
                        this.playerInfo[key]=temp.realName;
                    }else{
                        this.partnerInfo[key]=temp[key];
                    }
                }
                if(!this.partnerInfo.bankAccount)this.modify=true;
            })
        }
    },
    mounted(){
        this.modify=!!this.$route.query.modify;
        this.getInfo();
        this.$api.getProvinceList().then(res=>{
            this.provinceList =res.data;
            this.sendData.bankAccountProvince = this.provinceList[0].id;
            this.changeCity();
        })
    },
    computed:{
        ...mapState(['platform','prefix','partner']),
        city:function(){
            return (this.partnerInfo.bankAccountProvince || '')+ (this.partnerInfo.bankAccountCity || '')
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
