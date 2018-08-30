<template>
    <div class="lobby_type">
        <crumbs :title="$route.query.name"></crumbs>
        <ul class="navs" flex="box:mean">
            <li v-for="(item,index) in navs" @click="active=index" :class="{active:index==active}" :key="index">{{item.name}}</li>
        </ul>
        <GameList :games='games'/>
    </div>
</template>
<script>
import GameList from '@/pages/lobby/game_list.vue'
import {mapActions,mapState} from 'vuex'
export default {
    name: 'lobby_type',
    data () {
        return {
            code:1,
            navs:[],
            active:0,
            list:[]
        }
    },
    components:{GameList},
    methods:{
        ...mapActions([
            'getGameList'
        ]),
        getGames(code){
            this.$api.getGameGroupTreeInfo({code:code,containGames:true}).then(res=>{
                let temp= res.data.gameGroups[0],list=[];

                if(temp.children.length){
                    temp.children.map((item,index)=>{
                        let game= item.games.gameList,listSub=[];
                        game.map((key,val)=>{
                            let game= key.game;
                            listSub.push({
                                imgUrl: game.bigShow,
                                name:game.name,
                                gameId:game.gameId,
                                provider:Number(game.provider),
                                status:game.status})
                        })
                        list.push({name:item.name,list:listSub})
                    })
                    this.navs=list;

                }else{
                    temp.games.gameList.map((item,index)=>{
                        let game= item.game;
                        list.push({
                            imgUrl: game.bigShow,
                            name:game.name,
                            gameId:game.gameId,
                            provider:Number(game.provider),
                            status:game.status})
                    })
                    this.list=list;
                }

            })
        }
    },
    mounted(){
        let code= this.$route.query.code;
        let displayName=this.$route.query.displayName;
        if(displayName){
            this.getGameList((gameGroup)=>{
                let games=this.$tool.findVal(gameGroup.list,displayName,'displayName');
                if(games.code)this.getGames(games.code)
            })
        }
        if(code){
            this.getGames(code)
        }
    },
    computed:{
        ...mapState(['platform','']),
        games(){
            let game = [];
            if(this.navs.length){
                game=this.navs[this.active].list
            }else{
                game=this.list;
            };
            return game
        }
    },
}
</script>
