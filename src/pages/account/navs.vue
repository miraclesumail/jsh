<template>
    <div class="account_navs">
        <div class="nav_box">
            <NavItem icon="icon_wealth" name="财富值" path="/account/wealth" textClass='red' :content="`您有${wealth.noFinish}个任务未完成`" />
        </div>
        <div class="nav_box">
            <NavItem icon="icon_edu" name="账号额度" path="/account/gameTransfer" :content="wallet.totalCredit||'****'" />
            <NavItem icon="icon_jilv" name="账号记录" path="/account/search" content="存款、提款、优惠、投注" />
            <NavItem icon="icon_tel" name="更新电话" path="/account/modifyTel" :content="player.phoneNumber" />
            <NavItem icon="icon_bank" name="提款银行卡" path="/account/modifyBank" content="必须绑定真实姓名一致" />
        </div>
        <div class="nav_box">
            <NavItem icon="icon_edu" name="自助优惠" path="/account/discount" content="5-10分钟内添加" />
            <NavItem icon="icon_password" name="修改账户密码" path="/account/modifyPassword" :content="passwordText" />
            <NavItem icon="icon_pt" name="修改PT密码" path="/account/modifyGamePassword?icon=icon_pt&name=修改PT密码&providerId=18" content="首次登录需要设置登录密码" />
            <NavItem icon="icon_dt" name="修改DT密码" path="/account/modifyGamePassword?icon=icon_dt&name=修改DT密码&providerId=45" content="首次登录需要设置登录密码" />
        </div>
    </div>
</template>

<script>
import NavItem from "@/components/nav_item"
import {mapActions,mapState} from 'vuex'
export default {
    name: 'account',
    data () {
        return {
        }
    },
    methods:{
        ...mapActions([
            'setWallet','setMissonList'
        ]),
    },
    mounted(){
        this.setWallet();
        this.setMissonList();
    },
    components:{NavItem},
    computed:{
        ...mapState(['platform','player','wallet','wealth']),
        passwordText(){
            return `${this.platform.passwordMinLength}-${this.platform.passwordMaxLength}位数字+字母组合`
        }
    }
}
</script>
