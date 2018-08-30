<template>
    <div class="lobby">
        <div flex="cross:center box:last" class="searchbox">
            <div class="input-warp" flex="cross:center box:last">
                <input
                    type="text"
                    v-model='send.name'
                    ref="search"
                    @focus="focus=true"
                    @keydown.enter="getGames(true)"
                    placeholder="查找游戏"/>
                <div class="search" flex="main:center cross:center" @click="getGames(true)">
                    <i class="icon_magnifier"></i>
                </div>
            </div>
            <div class="collection" flex="main:center cross:center" @click="rightBtn" v-count="'大厅|'+searchName">
                <span class="icon_star" v-show="searchName === '收藏'"></span>{{searchName}}
            </div>
        </div>
        <scroll :data='games'>
            <div>
                <TabNavs :list="navs" v-model="active" />
                <GameList :games='games'/>
            </div>
        </scroll>
    </div>
</template>

<script>
import TabNavs from '@/components/tab_navs.vue'
import GameList from '@/pages/lobby/game_list.vue'
import {mapActions,mapState} from 'vuex'
export default {
    name: 'cache-page',
    data () {
        return {
            send:{
                name:'',
            },
            navs:[
                {name: "真人", icon: "icon_live",displayName:'_video'},
                {name: "电子", icon: "icon_laohuji",displayName:'_solt-provider'},
                {name: "棋牌", icon: "icon_qipai",displayName:'_poker'},
                {name: "捕鱼", icon: "icon_fish",displayName:'_fish'},
                {name: "彩票", icon: "icon_lottery",displayName:'_lottery'},
                {name: "体育", icon: "icon_sport",displayName:'_sports'}
            ],
            soltProviderCode:'',
            active:0,
            games:[],
            code:[]
        }
    },
    methods:{
        ...mapActions([
            'getGameList'
        ]),
        rightBtn(e) {
            if (this.send.name) {
                this.searchGame(true);
            } else {
                this.$router.push({path: "/lobby/collection", query: {index: 5, icon: "icon-shoucang"}})
            }
        },
        getGames(isSearch=false){
            // code 根据code获取游戏,如果不存在获取收藏的游戏
            this.games=[];
            let apiName='getGameGroupInfo';
            let sendData={code:this.code,requestCount:1000};
            if(isSearch){
                apiName='searchGame';
                sendData.groupCode=this.gameGroup.code;
                sendData.name=this.send.name;
            }else{
                delete sendData.groupCode
            }
            let temp= this.$tool.findVal(this.navs,'_solt-provider','displayName');
            //电子特殊处理
            if(this.soltProviderCode && this.soltProviderCode==this.code){
                this.$api.getGameGroupTreeInfo({code:this.code,containGames:false}).then(res=>{
                    let temp= res.data.gameGroups[0].children,list=[];
                    temp.map((item,index)=>{
                        let gameData={
                            imgUrl:item.gameGroupIconUrl,
                            name:item.name,
                            status:1,
                            code:item.code};
                        //ebet电子特殊处理
                        if(item.displayName=='_solt-ebet'){
                            gameData.gameId='7CDE4FC7-4837-4F33-A114-2FA93070A029';
                            gameData.provider=72;
                        }
                        //bbin电子特殊处理
                        if(item.displayName=='_solt-bbin'){
                            gameData.gameId='CEFB3B10-DCC4-4E76-9E41-66AFBF2B088C';
                            gameData.provider=47;
                        }
                        list.push(gameData)
                    })
                    this.games=list;
                })
            }else{
                this.$api[apiName](sendData).then(res=>{
                    let temp= res.data,list=[];
                    if(!isSearch){
                        temp= res.data.games.gameList
                    }
                    temp.map((item,index)=>{
                        let game=item;
                        if(!isSearch){
                            game=item.game
                        }
                        list.push({
                            imgUrl:game.bigShow,
                            name:game.name,
                            gameId:game.gameId,
                            provider:Number(game.provider),
                            status:game.status})
                    })
                    this.games=list;
                })
            }

        },
    },
    components:{TabNavs,GameList},
    mounted(){
        this.getGameList((gameGroup)=>{
            let list =this.navs;
            if(this.gameGroup.code){
                list.map((item,index)=>{
                    let temp= this.$tool.findVal(this.gameGroup.list,item.displayName,'displayName');
                    if(temp.code){
                        item.name=temp.name;
                        item.code=temp.code;
                        if(index==1)this.soltProviderCode=temp.code;
                    }else{
                        setTimeout(() => {
                            list.remove(item)
                        },20);
                    }
                });
                this.code=this.gameGroup.list[0].code;
            }
            this.navs=list;
        });
    },

    computed:{
        ...mapState(['platform','cdn','gameGroup']),
        searchName(){
            return this.send.name ? '搜索' : '收藏'
        }
    },
    watch:{
        code(){
            this.getGames();
        },
        active(){
            this.code=this.navs[this.active].code;
        }
    }
}
</script>
