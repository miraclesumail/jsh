<template>
    <div class="modify_tel">
        <crumbs :icon="$route.query.icon" :title="$route.query.name"></crumbs>
        <div class="form_box2">
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">新密码</div>
                <div class="text_box" flex="cross:center box:last">
                    <input type="password" v-if="!eye" v-model="sendData.newPassword" placeholder="请输入新密码">
                    <input type="text" v-else v-model="sendData.newPassword" placeholder="请输入新密码">
                    <div class="eye" flex="main:center cross:center" @click="eye=!eye">
                        <div :class="eye?'icon_eye_open':'icon_eye_close'" ></div>
                    </div>
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
                newPassword:'',
                providerId:this.$route.query.providerId
            }
        }
    },
    methods:{
        send(){
            let str=this.$tool.password(this.sendData.newPassword);
            if(str){
                this.$tool.CONFIRM({text:'新'+str});
                return;
            }
            this.$api.modifyGamePassword(this.sendData).then(data => {
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
