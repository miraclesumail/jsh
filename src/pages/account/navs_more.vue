<template>
    <div class="navs_more">
        <div class="nav_box">
            <NavItem icon="icon_name" name="真实姓名" :content="player.realName||'未绑定'" />
            <NavItem icon="icon_idcard" name="我的ID号" :content="player.playerId" />
            <NavItem icon="icon_email" name="我的邮箱" path="/account/modifyEmail" :content="player.email||'添加'" />
        </div>
        <div class="nav_box">
            <NavItem icon="icon_sms" name="短信设置" path="/account/modifySmsSet" content="设置" />
            <NavItem icon="icon_xiaoxi" name="我的消息" path="/account/msg" :content="noReadMail+'未读'" />
            <NavItem icon="icon_service" @click.native="open" name="我的客服" content="在线"/>
            <NavItem icon="icon_tuichu" @click.native="exit" name="退出登录" content="注销" />
        </div>
    </div>
</template>

<script>
import NavItem from "@/components/nav_item"
import {mapState,mapActions} from 'vuex'
export default {
    name: 'navs_more',
    data () {
        return {
        }
    },
    methods:{
        ...mapActions([
            'setLogout',
        ]),
        open(){
            window.open(this.cfUrl)
        },
        exit(){
            this.$api.logout().then(res=>{
                this.setLogout();
            })
        }
    },
    components:{NavItem},
    computed:{
        ...mapState(['platform','player','noReadMail','cfUrl']),
        passwordText(){
            return `${this.platform.passwordMinLength}-${this.platform.passwordMaxLength}位数字+字母组合`
        }
    }
}
</script>
