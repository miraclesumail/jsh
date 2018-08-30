<template>
	<div class="open">

	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'open',
    data () {
        return {
        };
    },
    props:[],
    methods:{
    },
    mounted(){
        if(this.$route.query.free=='true'){
            //试玩
            this.$api.getTestLoginURLWithOutUser({"gameId":this.$route.query.gameId,"clientType":2,"clientDomainName":location.origin}).then(res=>{
                location.href=res.data.gameURL;
            })
        }else{
            //获取游戏地址
            if(this.player.playerId){
                this.$api.getLoginURL({"gameId":this.$route.query.gameId,"clientType":2,"clientDomainName":location.origin}).then(res=>{
                    location.href=res.data.gameURL;
                })
            }else{
                this.$router.push({path:"/home/login",query:this.$route.query})
            }
        }
    },
    computed:{
        ...mapState(['player']),
    },
}
</script>

