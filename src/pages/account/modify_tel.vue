<template>
    <div class="modify_tel">
        <crumbs :icon="step==1? 'icon_name':'icon_tel'" :title="step==1? '身份验证':'新手机号码'"></crumbs>
        <div class="form_box2" v-if="step==1">
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">旧手机号</div>
                <div class="text_box" flex="cross:center">
                    <input type="tel" v-if="platform.twoStepsForModifyPhoneNumber" v-model="player.phoneNumber" class="disable" maxlength="11" placeholder="请输入旧手机号">
                    <input type="tel" v-else v-model="oldPhoneNumber" maxlength="11" placeholder="请输入旧手机号">
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center" v-if="platform.twoStepsForModifyPhoneNumber">
                <div class="name">验证码</div>
                <div class="text_box" flex="cross:center box:last">
                    <input type="tel" v-model="sendData.smsCode" maxlength="4" placeholder="请输入短信验证码">
                    <div class="get_code" @click="getCodeOld" v-if="!reciprocal">获取验证码</div>
                    <span v-else class="get_code red">{{reciprocal}}s</span>
                </div>
            </div>
            <div class="item item_btn">
                <div class="btn" @click="send">开始验证</div>
            </div>
        </div>
        <div class="form_box2" v-else>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">新手机号</div>
                <div class="text_box" flex="cross:center">
                    <input type="tel" v-model="sendData.newPhoneNumber"  maxlength="11" placeholder="请输入新手机号码">
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">验证码</div>
                <div class="text_box" flex="cross:center box:last">
                    <input type="tel" v-model="sendData.smsCode" maxlength="4" placeholder="请输入短信验证码">
                    <div class="get_code" @click="getCodeNew" v-if="!reciprocal">获取验证码</div>
                    <span v-else class="get_code red">{{reciprocal}}s</span>
                </div>
            </div>
            <div class="item item_btn">
                <div class="btn" @click="sendNew">更换号码</div>
            </div>
        </div>
        <a class="service" :href="cfUrl" v-if="step==1" target="_bank">手机无法接受验证码？</a>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name: 'modify_tel',
    data () {
        return {
            step:1,
            reciprocal:0,
            timer:null,
            oldPhoneNumber:'',
            sendData:{
                smsCode:'',
                newPhoneNumber:''
            }
        }
    },
    methods:{
        ...mapActions([
            'setLogin',
        ]),
        getCodeOld(){
            if(this.reciprocal)return;
            this.$api.sendSMSCodeToPlayer({purpose:"oldPhoneNumber"}).then(res=>{
                this.reciprocalFun();
            })
        },
        getCodeNew(){
            let str=this.$tool.phoneNumber(this.sendData.newPhoneNumber);
            if(str){
                this.$tool.CONFIRM({text:str});
                return;
            }
            if(this.reciprocal)return;
            let temp={phoneNumber:this.sendData.newPhoneNumber,purpose:"newPhoneNumber"};
            if(!this.platform.twoStepsForModifyPhoneNumber)temp.oldPhoneNumber=this.oldPhoneNumber;
            this.$api.getSMSCode(temp).then(res=>{
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
        send(){
            if(this.platform.twoStepsForModifyPhoneNumber){
                this.$api.verifyPhoneNumberBySMSCode({smsCode:this.sendData.smsCode}).then(res=>{
                    if(res.data){
                        this.step=2;
                        this.sendData.smsCode='';
                        this.reciprocal=0;
                        clearInterval(this.timer);
                        this.$tool.ALERT({text:'身份验证通过，请输入新手机号码'});
                    }
                })
            }else{
                let str=this.$tool.phoneNumber(this.oldPhoneNumber);
                if(str){
                    this.$tool.CONFIRM({text:str});
                }else{
                    this.step=2
                }

            }
        },
        sendNew(){
            let temp=this.sendData.newPhoneNumber;
            if(this.platform.twoStepsForModifyPhoneNumber)delete this.sendData.newPhoneNumber;
            this.$api.updatePhoneNumberWithSMS(this.sendData).then(res=>{
                this.$tool.SET_STATE({name:"player",content:temp.substring(0,3)+"****"+temp.substring(7),sub:'phoneNumber'});
                this.$tool.setStore("player",this.player);
                this.$tool.CONFIRM({text:'新手机号码更换成功',okFun:()=>{
                    this.$router.go(-1);
                }});
            })
        }
    },
    mounted(){
        //图片验证码判断
        // this.$api.get().then(res=>{
        //     this.fullPhoneNumber=res.data.fullPhoneNumber;
        //     console.log(this.fullPhoneNumber)
        // })
    },
    computed:{
        ...mapState(['platform','cfUrl','player'])
    }
}
</script>
