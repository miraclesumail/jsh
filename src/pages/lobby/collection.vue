<template>
    <div class="lobby_type">
        <crumbs title="我的收藏"></crumbs>
        <GameList :games='list' collection="1" />
    </div>
</template>
<script>
import GameList from '@/pages/lobby/game_list.vue'
import {mapActions,mapState} from 'vuex'
export default {
    name: 'lobby_type',
    data () {
        return {
            list:[]
        }
    },
    components:{GameList},
    methods:{
    },
    mounted(){
        this.$api.getFavoriteGames().then(res=>{
            console.log(res.data)
            let temp=res.data,list=[];
            temp.map((item,index)=>{
                list.push({
                    imgUrl:item.bigShow,
                    name:item.name,
                    gameId:item.gameId,
                    provider:Number(item.provider),
                    status:item.status})
            })
            this.list=list;
        })
    }
}
</script>
