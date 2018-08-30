<template>
    <div class="wealth" ref="wealth">
        <scroll>
            <div>
                <div class="wealth_title"></div>
                <ul class="user_info">
                    <li flex="cross:center" v-if="playerPointInfo">排名 : {{(playerPointInfo[0].rank>1000
                        ||!player.userCurrentPoint)?'未上榜':playerPointInfo[0].rank}}
                    </li>
                    <li flex="cross:center">未完成任务 : {{wealth.noFinish}}</li>
                    <li flex="cross:center">财富值 : {{player.userCurrentPoint}}</li>
                    <li flex="cross:center">
                        <span>结算倒计时<br/>
                            <span class="count_down" v-if="downTime">
                                {{downTime}}
                            </span>
                            <span class="count_down" v-else>
                                {{Math.floor(differenceS/60) + "分"}}{{(differenceS%60) >9 ? (differenceS%60) : '0' + (differenceS%60)}}秒
                            </span>
                        </span>
                    </li>
                </ul>
                <ul class="wealth_navs" ref="navs">
                    <router-link tag="li" :to="item.path" @click.native="goScroll(index)" v-for="(item,index) in navs"
                                 :key="index">{{item.name}}
                    </router-link>
                </ul>
                <transition name="fade" mode="out-in" appear>
                    <router-view  :init="init"/>
                </transition>
            </div>
        </scroll>
    </div>
</template>
<script>
import {mapMutations, mapState, mapActions} from 'vuex'

let createTime = new Date().getYear() - 106;
export default {
    name: 'wealth',
    metaInfo: {
        title: '金世豪娱乐城-品质，源自' + createTime + '年的一如既往!',
        meta: [
            {name: 'keyWords', content: '金世豪,金世豪娱乐城,金世豪娱乐,金世豪手游，金世豪网址'},
            {
                name: 'Description',
                content: '金世豪娱乐城(jin234.com)' + createTime + '年品质、顶级信誉，BBIN、AG、eBET、OPUS、PT、MG大平台护航，是一个提供真人娱乐、电子老虎机、体育投注、彩票、手机游戏为一体的综合博弈集团！'
            }
        ],
    },
    data() {
        return {
            navs: [
                {name: '任务', path: '/account/wealth'},
                {name: '兑换', path: '/account/wealth/change'},
                {name: '排行榜', path: '/account/wealth/ranking'}],
            sendChange: {
                amount: null
            },
            differenceS: 0,
            missonList: {},
            timer: null,
            downTime: false,
            taskList: [],
            ranking: null,
            notFinish: 0,
        }
    },
    methods: {
        ...mapActions([
            'setMissonList'
        ]),
        goScroll(index) {
            if (index == 2) {
                setTimeout(() => {
                    this.$refs.wealth.scrollTo(0, this.$refs.navs.offsetTop-this.rem);
                }, 300)

            } else {
                this.$refs.wealth.scrollTo(0, 0);
            }
        },
        getTime(s) {
            let days = Math.floor(s / 86400)
            let hours = Math.floor(s % 86400 / 3600)
            let minutes = Math.floor(s % 86400 % 3600 / 60)
            let seconds = Math.floor(s % 86400 % 3600 % 60)
            let time = '';
            if (days) {
                time = days + "天" + hours + "时";
                return time;
            } else if (!days && hours) {
                time = hours + "时" + minutes + "分";
                return time;
            } else if (!days && !hours && minutes) {
                console.log('开始倒计时')
                this.SetCountDown(s)
                return false;
            }
        },
        SetCountDown(differenceS) {
            if (this.differenceS) {
                return;
            }
            clearInterval(this.timer);
            this.differenceS = differenceS
            this.timer = setInterval(() => {
                --this.differenceS;
                if (!this.differenceS) {
                    clearInterval(timer);
                    this.init();
                }
                ;
            }, 1000)
        },
        init(newPoints) {
            // let date = new Date("Wed Apr 29 2018 23:22:13 GMT+0800 (China Standard Time)");
            let date = new Date();
            let dateWeek = 8 - new Date().getDay();
            let weekDown = Math.floor((new Date().setHours(dateWeek * 24, 0, 0, 0) - date.getTime()) / 1000);
            this.downTime = this.getTime(weekDown);
            this.setMissonList();
        }
    },
    mounted() {

        this.init();
    },
    created() {
    },
    computed: {
        ...mapState([
            'player', 'wealth','rem'
        ]),
        playerPointInfo:function(){
            return this.wealth.playerPointInfo;
        }
    }
}
</script>
