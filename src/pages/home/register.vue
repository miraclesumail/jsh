<template>
    <div class="register">
        <crumbs icon="icon_account" title="用户注册"></crumbs>
        <div class="form_box">
            <div class="item item_input" flex="box:last cross:center">
                <div class="text_box star">
                    <input type="text" v-model.trim="sendData.name" @focus="focusFun" @change="validate('name')" :placeholder="placeholderList.name" :maxlength="platform.accountMaxLength">
                </div>
                <div class="text_error">{{errorData.name}}</div>
            </div>
            <div class="item item_input" flex="box:last cross:center">
                <div class="text_box star">
                    <input type="password" v-model.trim="sendData.password" @change="validate('password')" :placeholder="placeholderList.password" :maxlength="platform.passwordMaxLength">
                </div>
                <div class="text_error">{{errorData.password}}</div>
            </div>
            <!-- <div class="item item_input" flex="box:last cross:center">
                <div class="text_box star">
                    <input type="password" v-model.trim="rePassword" @change="validate('rePassword')" placeholder="请输入重复密码" :maxlength="platform.passwordMaxLength">
                </div>
                <div class="text_error">{{errorData.rePassword}}</div>
            </div> -->
            <div class="item item_input" flex="box:last cross:center">
                <div class="text_box star">
                    <input type="tel" v-model.lazy="sendData.phoneNumber" v-pattern @change="validate('phoneNumber')" placeholder="请输入手机号" maxlength="11">
                </div>
                <div class="text_error">{{errorData.phoneNumber}}</div>
            </div>
            <div class="item item_input" flex="box:last cross:center">
                <div class="text_box">
                    <input type="text" v-model.trim="sendData.qq" @change="validate('phoneNumber')" placeholder="请输入QQ/微信账号" maxlength="30">
                </div>
                <div class="text_error"></div>
            </div>
            <div class="item item_input" flex="box:last cross:center" v-if="platform.needImageCodeForSendSMSCode">
                <div class="text_box star">
                    <input type="tel" v-model="sendData.captcha" placeholder="请输入图片验证码" maxlength="4">
                </div>
                <img :src="imgSMS" @click="getImgCode" alt="图片验证码">
            </div>
            <div class="item item_input" flex="box:last cross:center" v-if="platform.needSMSForRegister">
                <div class="text_box star">
                    <input type="tel" v-model="sendData.smsCode" @keydown.enter='send' placeholder="请输入短信验证码" maxlength="4">
                </div>
                <div style="color:red" v-if="reciprocal">{{reciprocal}}s</div>
                <div class="get_code btn btn_sm btn_green" v-else @click="getCode">获取验证码</div>
            </div>
            <div class="item item_btn">
                <div class="btn" @click="send">确认注册</div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name: 'register',
    data () {
        return {
            reciprocal:0,
            ok:false,
            imgSMS:'',
            sendData:{
                phoneNumber:'',
                password:'',
                qq:'',
                smsCode:'',
                captcha:'',
                name:'',
                partnerId:this.$tool.getStore('partnerId'),
                domain: location.origin,
                deviceId:'',
            },
            rePassword:'',
            errorData:{
                name:'',
                password:'',
                phoneNumber:'',
                captcha:'',
                smsCode:''
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
        getImgCode() {
            this.$api.captcha().then(data => {
                this.imgSMS = this.$tool.arrayBufferToBase64(data.data.data);
            })
        },
        focusFun(){
            let prefix = this.platform.accountPrefix;
            if(prefix&&this.sendData.name.charAt(0) != prefix){
                this.sendData.name= prefix+this.sendData.name;
            }
        },
        //index:1 为获取验证码验证,此时不验证短信验证码
        validate(index){
            let isok=false;
            if(index&& index !=1){
                this.testKey(index);
                if(index=='name'&& !this.errorData['name']){
                    this.$api.isValidUsername({name:this.sendData.name,_silence:true,_closeCONFIRM:true}).catch(err=>{
                        this.errorData['name']=err.errorMessage;
                    })
                }
            }else{
                for(let key in this.errorData){
                    if(key!="smsCode" || (key=="smsCode" && index!=1))this.testKey(key);
                    if(this.errorData[key]){
                        this.$tool.CONFIRM({text:this.errorData[key]});
                        isok=true;
                        break;
                    }
                }
            }

            return isok;
        },
        //单个验证
        testKey(key){
            this.errorData[key]=this.$tool[key](this.sendData[key]);
        },
        getCode(){
            if(this.validate(1))return;
            if(this.reciprocal)return;
            let data={phoneNumber:this.sendData.phoneNumber,purpose:"registration",name:this.sendData.name};
            if(this.platform.needImageCodeForSendSMSCode)data.captcha=this.sendData.captcha;
            this.$api.getSMSCode(data).then(res=>{
                this.reciprocalFun();
            })
        },
        send(){
            if(this.validate())return;
            this.$api.create(this.sendData).then(res=>{
                this.setLogin(res);
                this.$router.push("/");
                this.$tool.ALERT({text:"注册成功"});
            })
        }
    },
    mounted(){
        //图片验证码判断
        if(this.platform.needImageCodeForSendSMSCode){
            this.getImgCode();
        }else{
            delete this.errorData['captcha'];
            delete this.sendData['captcha'];
        }
        //短信验证码判断
        if(!this.platform.needSMSForRegister){
            delete this.errorData['smsCode'];
            delete this.sendData['smsCode'];
        };
    },
    computed:{
        ...mapState(['platform','prefix','player']),
        placeholderList:function(){
            let list={
                name:"请输入用户名",
                password: `请输入您的密码(${this.platform.passwordMinLength}-${this.platform.passwordMaxLength}位)`
            }
            if(this.platform.accountPrefix){
                list.name=`请输入用户名（小写${this.platform.accountPrefix}开头）`;
            }
            return list;
        }
    }
}
</script>
