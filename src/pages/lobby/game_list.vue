<template>
    <div class="game_list">
        <div class="item" v-for="(item,index) in games" v-if="item.status==1" :key="index" @click="open(item)">
            <div class="img_box">
                <img :src="item.imgUrl" :alt="item.name">
            </div>
            <p class="nowrap">{{item.name}}</p>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    name: 'game_list',
    data () {
        return {
            soltProvider:[41,57,45,18],
            soltProviderFree:[45,18],


        }
    },
    props:{
        games:{type:Array},
        collection:{type:String,default:''}
    },
    methods:{
        ...mapActions([
            'getGameList'
        ]),
        get(name){
            if(this.Namelist.list.includes(name)){
                let index = this.Namelist.list.findIndex(function(value, index, arr) {
                    return value == name;
                });
                return this.Namelist.cList[index];
            }else{
                return name;
            }
        },
        getImgSrc(val){
            let temp = val.game || val;
            if(temp.images){
                return  temp.images[8];
            }else{
                return  temp.bigShow;
            }
        },
        open(item){
            console.log(item)
            if(item.gameId){
                let str= `<img style="width:2.4rem;height:2.4rem" src="${item.imgUrl}">`
                if(this.player.playerId){
                    //登录
                    let temp ={text:str,okName:"开始游戏",okFun:
                        ()=>{
                            this.$tool.playGame(item.gameId)
                        }}
                    if(this.soltProvider.includes(item.provider)){
                        temp.noName=this.collection? '取消收藏':'收藏游戏';
                        temp.noFun=()=>{
                            this.$api[this.collection?'removeFavoriteGame':'addFavoriteGame']({gameId:item.gameId}).then(res=>{
                                this.$tool.ALERT({text:this.collection?'取消收藏成功':'游戏收藏成功'});
                                if(this.collection)item.status=0;
                            })
                        }
                    }
                    this.$tool.CONFIRM(temp)
                }else{
                    //未登录
                    let temp ={text:str,okName:"开始游戏",okFun:
                        ()=>{
                            this.$tool.playGame(item.gameId)
                        }}
                    if(this.soltProviderFree.includes(item.provider)){
                        temp.noName='免费试玩';
                        temp.noFun=()=>{
                            this.$tool.playGame(item.gameId,true)
                        }
                    }
                    this.$tool.CONFIRM(temp)
                }
            }else{
                if(item.code)this.$router.push({path:"lobby/lobbyType",query:{code:item.code,name:item.name}});
            }
        }
    },
    computed:{
        ...mapState(['platform','player']),
    },
}
</script>
