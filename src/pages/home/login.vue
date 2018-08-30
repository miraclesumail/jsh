<template>
    <div class="login">
        <crumbs icon="icon_account" title="用户登录"></crumbs>
        <div class="form_box">
            <div class="item item_input" flex="box:last cross:center">
                <div class="text_box">
                    <input type="text" v-model.trim="sendData.name" @focus="focusFun" @change="validate('name')" placeholder="请输入用户名" :maxlength="platform.accountMaxLength">
                </div>
                <div class="text_error">{{errorData.name}}</div>
            </div>
            <div class="item item_input" flex="box:last cross:center">
                <div class="text_box">
                    <input type="text" v-if="eye" @keydown.enter='enter' v-model.trim="sendData.password" @change="validate('password')" placeholder="请输入密码" :maxlength="platform.passwordMaxLength">
                    <input type="password" v-else @keydown.enter='enter' v-model.trim="sendData.password" @change="validate('password')" placeholder="请输入密码" :maxlength="platform.passwordMaxLength">
                </div>
                <div class="eye" flex="main:center cross:center" @click="eye=!eye"><div :class="eye?'icon_eye_open':'icon_eye_close'" ></div></div>
            </div>
            <div class="item item_input" flex="box:last cross:center" v-if="platform.needImageCodeForLogin || loginTimes>2">
                <div class="text_box">
                    <input type="tel" @keydown.enter='send' v-model="sendData.captcha" placeholder="请输入图片验证码" maxlength="4">
                </div>
                <img :src="imgSMS" @click="getImgCode" alt="图片验证码">
            </div>
            <div class="item item_btn">
                <div class="btn" @click="send">登录</div>
            </div>
        </div>
        <a class="service" :href="cfUrl" target="_bank">登录遇到问题？</a>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name: 'login',
    data () {
        return {
            reciprocal:0,
            ok:false,
            imgSMS:'',
            loginTimes:0,
            eye:false,
            sendData:{
                phoneNumber:'',
                password:'',
                captcha:'',
                name:this.$tool.getLStore('player') || '',
                clientDomain: location.origin,
                deviceId:'',
            },
            rePassword:'',
            errorData:{
                name:'',
                password:'',
                captcha:''
            }
        }
    },
    methods:{
        ...mapActions([
            'setLogin','getDeposit'
        ]),
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
            }else{
                for(let key in this.errorData){
                    if(key!="captcha"||this.platform.needImageCodeForLogin || this.loginTimes>2)this.testKey(key);
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
        send(){
            if(this.validate())return;
            this.$api.login(this.sendData).then(res=>{
                this.setLogin(res);
                this.$tool.setLStore('player',this.sendData.name);
                if(this.$route.query.gameId){
                    this.$router.push({path:'/home/open',query:this.$route.query});
                }else{
                    this.$router.push(this.history || '/');
                    this.$tool.ALERT({text:"登录成功"});
                }
            }).catch(err=>{
                this.loginTimes++;
                if(this.loginTimes>2 ||this.platform.needImageCodeForLogin)this.getImgCode();
            })
        },
        enter(){
            !(this.platform.needImageCodeForLogin || this.loginTimes>2)&&this.send();
        }
    },
    mounted(){
        //图片验证码判断
        if(this.platform.needImageCodeForLogin){
            this.getImgCode();
        }else{
            delete this.errorData['captcha'];
            delete this.sendData['captcha'];
        }
    },
    computed:{
        ...mapState(['platform','cfUrl','history'])
    },
    beforeCreate() {
        if (this.$store.state.player.playerId) {
            this.$router.go(-1);
        }
    }
}
</script>
