<template>
	<div class="customer-service">
		<div class="menu" v-if="!tellBoxShow">
			<ul flex="box:mean">
				<li
					@click="open(item)"
                    flex="cross:center dir:top"
                    v-count="'客服|'+item.name"
					v-for="(item,index) in menu"
                    :key="index">
					<span :class="'iconfont '+item.icon"></span>
					<p>{{item.content}}</p>
				</li>
			</ul>
		</div>
		<div class="content" v-if="tellBoxShow">
			<div class="tell-box" >
				<div class="color">
					<h2>请输入联系电话，客服人员会立即致电给您。<span class="iconfont icon-guanbi close" @click="service"></span></h2>
					<div class="form-tell">
						<div class="item">
							<div class="text">
								<input type="tel" v-model="sendData.phoneNumber" @focus="changeTop" maxlength="11" placeholder="请输入您的电话号码"/>
							</div>
						</div>
						<div class="item">
							<div class="text">
								<input type="tel" v-model="sendData.captcha" @keydown.enter="send"  @focus="changeTop"  placeholder="请输入验证码"/>
								<div class="imgcode" @click="sendData.random = Math.random() "  :style="{backgroundImage: `url(${imgB64})`}"></div>
							</div>
						</div>
						<div class="item noborder">
							<div class="btn"  @click="send" v-count="'客服|立即呼叫客服'">
								立即呼叫客服
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapMutations,mapState} from 'vuex'
// import {playerPhoneChat} from '@/api/index.js'
export default {
    name: 'customer-service',
    data () {
        return {
            tellBoxShow:false,
            random:null,
            captcha:null,
            phone:null,
            height:667,
            imgB64:'',
            sendData:{
                randomNumber:'',
                phoneNumber:'',
                captcha:'',
                lineId:"1"
            }
        }
    },
    computed: {
        ...mapState(['cfService','platform','cfUrl','player']),
        menu(){
            let list =[{id:4,name:"请求回电",content:'请求回电',icon:"icon_huidian"}];
            let qq=this.$tool.findVal(this.platform.qqList,0).content;
            let weixin=this.$tool.findVal(this.platform.wechatList,0).content;
            if(weixin){
                list.unshift({id:2,name:"微信客服",content:weixin,icon:"icon_weixin3",href:"weixin://"})
            }
            if(qq){
                list.unshift({id:3,name:"qq",content:qq,icon:"icon_qq1",href:"mqqwpa://im/chat?chat_type=crm&uin="+qq+"&version=1&src_type=web"})
            }
            if(this.cfUrl){
                list.unshift({id:1,name:"在线客服",content:'在线客服',icon:"icon_live800",href:this.cfUrl})
            }
            return list;
        }
    },
    mounted(){
        this.sendData.phoneNumber= this.player.phoneNumber;
    },
    methods:{
        service(){
            this.$tool.SET_STATE({name:'cfService',content:!this.cfService});
            this.tellBoxShow =false;
        },
        changeTop(){

        },
        getImgCode(){
            this.$api.getOMCaptcha().then(res=>{
                this.sendData.randomNumber=res.data.randomNumber;
                this.imgB64=res.data.b64ImgDataUrl;
            })
        },
        open(val){
            let id= val.id;
            if(id == 1){
                window.open(val.href,"在线客服")
            }else if(id ==3||id==2){
                location.href = val.href;
            }else if( id ==4){
                this.tellBoxShow =true;
                this.getImgCode();
            }
        },
        send(e){
            e.target.localName=='input' && e.target.blur();
            if(this.sendData.phoneNumber==this.player.phoneNumber){
                this.sendData.phoneNumber='';
            }else{
                let str=this.$tool.phoneNumber(this.sendData.phoneNumber);
                if(str){
                    this.$tool.ALERT({text:str,type:'warn'})
                }
            }
            this.$api.callBackToUser(this.sendData).then(res=>{
                this.$tool.ALERT({text:"正在呼叫，请稍后..."});
                this.service();
            }).catch(res=>{
                this.getImgCode();
            })
        }
    }
}
</script>
