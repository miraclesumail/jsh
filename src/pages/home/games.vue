<template>
    <div class="game_show">
        <scroll>
            <div>
                <crumbs :title="$route.query.name"></crumbs>
                <ul class="games">
                    <li v-for='(item,index) in gameList' :key='index' flex="box:first">
                        <div class="name" flex="main:center cross:center dir:top">
                            <div class="imgbox">
                                <img :src="item.imgUrl" :alt="item.name">
                            </div>
                            <p>{{item.nickName}}</p>
                        </div>
                        <div class="text">
                            <p><span style="color:red">{{item.name}}</span>--{{item.text}}</p>
                            <div class="start" @click='goGame(item,index)'>进入游戏</div>
                        </div>
                    </li>
                </ul>
                <div class="heighten"></div>
            </div>
        </scroll>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
let createTime = new Date().getYear() - 106;
export default {
    name: 'game_show',
    data() {
        return {
            id: this.$route.params.id,
            description:{
                56:{nickName:"易博厅",name:"eBET真人",text:"全球首款专注于移动客户端的娱乐平台 性感美女主播荷官让您享受超震撼视觉体验"},
                16:{nickName:"环亚厅",name:"AG真人",text:"独创6张牌先发，多种创新玩法，竞咪美女主播伴您畅玩百家乐"},
                55:{nickName:"盈彩厅",name:"BBIN真人",text:"老牌平台 百家乐 温州牌九 二八杠等 体验快速多台同时投注"},
                62:{nickName:"欧普厅",name:"OPUS真人",text:"画面超炫的opus平台,超高清的视频效果, 配合美丽动人的娇媚荷官。玩家能安在家中亦能享受现场的逼真震撼力, 绝色荷官更为玩家提供视觉的刺激"},

                '_solt-ebet':{nickName:"EBET电子",name:"EBET电子",text:"提供100多种不同老虎机游戏项目，独立奖金池，免费旋转奖励，带来更多中奖乐趣"},
                '_solt-isb':{nickName:"ISB电子",name:"ISB电子",text:"的老虎机游戏涵盖各种各样的主题，提供的游戏奖金也是非常吸引,iSoftBet 免费旋转带您冲上云霄"},
                '_solt-pt':{nickName:"PT电子",name:"PT电子",text:"亿万彩池，等您来触发100款经典游戏 任您畅玩"},
                '_solt-mg':{nickName:"MG电子",name:"MG电子",text:"欧美强势电子平台，拥有多款富有主题色彩的老虎机和电子游戏，欢迎体验"},
                '_solt-bbin':{nickName:"BBIN电子",name:"BBIN电子",text:"经典老虎机 高品质游戏，带来更多中奖乐趣"},
                '_solt-dt':{nickName:"DT电子",name:"DT电子",text:"支持ios，android,PC全平台游戏，使玩家无论何时何处都可以享受游戏带来的乐趣"},

                63:{nickName:"OPUS体育",name:"OPUS体育",text:"提供24/7 全天候的下注环境，覆盖数千个体育赛事，高赔率，并提供实时赛事统计。 "},
                53:{nickName:"BBIN体育",name:"BBIN体育",text:"提供丰富多元的体育赛事投注,包含足球、棒球、篮球、橄榄球…等全世界主要的体育运动，盘口分析实时赛事。"},
                70:{nickName:"AG体育",name:"AG体育",text:"提供全球各大赛事，实时盘口中心，盘口多，赔率高，兑奖快。"},

            },
            gameList:[]
        };
    },
    props: [],
    components: {},
    methods: {
        ...mapActions([
            'getGameList'
        ]),
        goGame(gameData, index) {
            if (gameData.href) {
                this.$router.push({path: gameData.href})
            } else {
                all.tool.playGameById(gameData.gameId)
            }

        },
        appDown(data) {

        },
        downGame(data) {
            if (data.down) {
                window.open(data.down);
            } else {
                this.msgMore = false;
                this.$store.dispatch('msgbox');
            }
        }

    },
    created() {
        this.getGameList((gameGroup)=>{
            let games=this.$tool.findVal(gameGroup.list,this.$route.query.displayName,'displayName');
            if(this.$route.query.displayName=='_solt-provider'){
                this.$api.getGameGroupTreeInfo({code:games.code,containGames:false}).then(res=>{
                    let temp= res.data.gameGroups[0].children,list=[];
                    temp.map((item,index)=>{
                        let des=this.description[item.displayName] ||{};
                        let gameData={
                            imgUrl:item.gameGroupIconUrl,
                            name: item.name,
                            nickName:item.name,
                            text:des.text,
                            status:1,
                            provider:item.displayName,
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
                    this.gameList=list;
                })
            }else{
                this.$api.getGameGroupInfo({code:games.code,requestCount:100}).then(res=>{
                    let temp =res.data.games.gameList||[], list=[];
                    temp.map((item,index)=>{
                        let des=this.description[item.game.provider] ||{};
                        list.push({
                            imgUrl:item.game.images?item.game.images[this.platformId]:item.game.bigShow,
                            gameId:item.game.gameId,
                            name:item.game.name,
                            nickName:des.nickName,
                            text:des.text,
                            provider:item.game.provider
                        })
                    })
                    this.gameList=list;
                })
            }

        })
    },
    computed:{
        ...mapState(['wallet','platformId'])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
    .game_show {
        .games {
            li {
                overflow: auto;
                border-bottom: 1px solid #a1a1a1;
                background-size: auto 3px;
                padding-right: 14px;
                height: 2.5rem;
                .text{
                    padding: 0.3rem 0;
                    position: relative;
                    font-size: 0.24rem;
                    .start{
                        position: absolute;
                        width: 1.7rem;
                        height: 0.54rem;
                        position: absolute;
                        right: 0;
                        bottom: 8px;
                        text-align: center;
                        background: #00bff3;
                        color: #fff;

                        font-weight: 700;
                        line-height: 0.54rem;
                    }
                }
                .name{
                    width: 2rem;
                    .imgbox{
                        width: 1.65rem;
                        height: 1.65rem;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 0.2rem;
                        }

                    }
                    p{
                        font-weight: bold;
                        line-height:1;
                        margin-top: 0.1rem;
                    }
                }
            }
        }
    }
</style>
