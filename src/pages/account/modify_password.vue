<template>
    <div class="modify_tel">
        <crumbs icon="icon_password" title="修改账户密码"></crumbs>
        <div class="form_box2">
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">旧密码</div>
                <div class="text_box" flex="cross:center">
                    <input type="text" v-model="sendData.oldPassword" placeholder="请输入旧密码">
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">新密码</div>
                <div class="text_box" flex="cross:center box:last">
                    <input type="password" v-if="!eye" v-model="sendData.newPassword" placeholder="请输入旧密码">
                    <input type="text" v-else v-model="sendData.newPassword" placeholder="请输入旧密码">
                    <div class="eye" flex="main:center cross:center" @click="eye=!eye">
                        <div :class="eye?'icon_eye_open':'icon_eye_close'" ></div>
                    </div>
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center" v-if="platform.needSMSForModifyPassword">
                <div class="name">验证码</div>
                <div class="text_box" flex="cross:center box:last">
                    <input type="tel" v-model="sendData.smsCode" maxlength="4" placeholder="请输入短信验证码">
                    <div class="get_code" @click="getCode" v-if="!reciprocal">获取验证码</div>
                    <span v-else class="get_code red">{{reciprocal}}s</span>
                </div>
            </div>
            <div class="item item_btn">
                <div class="btn" @click="send">确认修改</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name: 'modify_tel',
    data () {
        return {
            reciprocal:0,
            timer:null,
            eye:false,
            sendData:{
                oldPassword:'',
                newPassword:'',
                smsCode:''
            }
        }
    },
    methods:{
        ...mapActions([
            'setLogin',
        ]),
        getCode(){
            if(this.reciprocal || this.validate(1))return;
            this.$api.sendSMSCodeToPlayer({purpose:'updatePassword'}).then(res=>{
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
            if(!this.sendData.oldPassword){
                str='请输入旧密码';
            }
            if(!str){
                str=this.$tool.password(this.sendData.newPassword);
            }
            if(!str && index!=1 && this.platform.needSMSForModifyPassword){
                str=this.$tool.smsCode(this.sendData.smsCode);
            }
            if(str)this.$tool.CONFIRM({text:'新'+str});
            return !!str;
        },
        send(){
            if(this.validate())return;
            if(!this.platform.needSMSForModifyPassword)delete this.sendData.smsCode;
            this.$api.updatePassword(this.sendData).then(data => {
                this.$tool.CONFIRM({text:'密码修改成功!',okFun:()=>{
                    this.$router.go(-1);
                }});
            });
        }
    },
    mounted(){
    },
    computed:{
        ...mapState(['platform','cfUrl','player'])
    }
}
</script>
