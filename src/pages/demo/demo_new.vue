<template>
    <div class="account">
        <crumbs :icon="icon" :title="title"></crumbs>
    </div>
</template>

<script>
import GetAddress from '@/components/get_address.vue'
import {mapActions,mapState} from 'vuex'
export default {
    name: 'account',
    data () {
        return {
            sendData:{
                merchantUseType:1,
                clientType:this.$client,
                amount:'',
                topupType:this.$route.query.type,
                topUpReturnCode:'',
                bonusCode:null,
                realName:'',
                alipayName:''
            },
            icon:this.$route.query.icon,
            title:this.$route.query.name,
            type:this.$route.query.type,
            maxAmount:0
        }
    },
    methods:{
        init(){
        },
        send(){
        },
    },
    mounted(){
        this.init();
    },
    components:{GetAddress},
    computed:{
        ...mapState(['platform','player'])
    }
}
</script>
