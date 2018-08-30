<template>
    <div class="modify_tel">
        <crumbs icon="icon_email" title="修改邮箱"></crumbs>
        <div class="form_box2">
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">邮箱地址</div>
                <div class="text_box" flex="cross:center">
                    <input type="text" v-model="sendData.email" placeholder="请输入邮箱地址">
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
            sendData:{
                email:''
            }
        }
    },
    methods:{
        send(){
            let reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if(!reg.test(this.sendData.email)){
                this.$tool.CONFIRM({'text': '您输入的邮箱格式不正确'})
                return;
            }
            this.$api.updatePlayerEmail(this.sendData).then(data => {
                let temp=this.sendData.email;
                this.$tool.SET_STATE({name:"player",content:temp.substring(0,3)+"****"+temp.substring(7),sub:'email'});
                this.$tool.setStore("player",this.player);
                this.$tool.CONFIRM({text:'邮箱修改成功!',okFun:()=>{
                    this.$router.go(-1);
                }});
            });
        }
    },
    computed:{
        ...mapState(['platform','cfUrl','player'])
    }
}
</script>
