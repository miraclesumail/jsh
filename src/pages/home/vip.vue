<template>
    <div class="vip">
        <scroll :data="list">
            <div>
                <div class="vip_bg" v-if="!player.playerId"></div>
                <div class="header" v-else flex="main:justify box:first">
                    <div class="user_vip" flex="main:center cross:center dir:top">
                        <div class="box">
                            <UserVip />
                        </div>
                        <div class="status">{{level.status}}</div>
                    </div>
                    <div class="level def" flex="main:center dir:top">
                        <div v-for="(item,index) in level.show" :key="index">
                            <speed :key="index" :name="item.name" :val="item.now" :max="item.max"
                                    :keep="level.keep"></speed>
                            <p style="padding-bottom: 5px;">剩余时间：
                                <span v-if="getDomnTime(item.name)">{{getDomnTime(item.name)}}</span>
                                <span v-else style="color: red">{{Math.floor(differenceS/60) + "分"}}{{(differenceS%60) >9 ? (differenceS%60) : '0' + (differenceS%60)}}秒</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="text_item" v-for="(item,index) in list" :key="index" v-if="item.noPlayer">
                    <h2>{{item.name}}</h2>
                    <img width="100%" v-if="item.src" :src="item.src" alt="">
                    <ul class="text_list" v-if="item.textList.length>1">
                        <li v-if="text" v-for="(text,key) in item.textList" :key="key">
                            <span>{{key+1}}.</span>{{text}}
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
// import Speed from "@/components/speed"
import NavItem from "@/components/nav_item"
import UserVip from "@/components/user_vip.vue"
import Speed from "@/components/speed.vue"
import {mapActions,mapState} from 'vuex'
export default {
    name: 'vip',
    data () {
        return {
            dayDown: null,
            weekDown: null,
            monthDown: null,
            differenceS: 0,
            timer: null,
            list:null,
        }
    },
    methods:{
        ...mapActions([
            'setLevel'
        ]),
        getDomnTime(str) {
            if (str.includes("日")) {
                return this.dayDown;
            } else if (str.includes("周")) {
                return this.weekDown;
            } else if (str.includes("月")) {
                return this.monthDown;
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
        init() {
            this.setLevel();
            // 获取玩家等级信息；
            this.$api.getAllLevel().then(res=>{
                let list1=[],list2=[];
                let tmp=res.data[0].list||[];
                tmp.map((item,index)=>{
                    let obj={
                        name:item.displayTitle,
                        src:item.btnOrImageList.length&&item.btnOrImageList[0].btnSourceFrom,
                        textList:item.displayTextContent.split("；")
                    };
                    if(item.displayId==0){
                        obj.noPlayer=!this.player.playerId;
                        list1.push(obj)
                    }else{
                        obj.noPlayer=1;
                        list2.push(obj)
                    }

                })
                this.list=list1.concat(list2)
            })
            let date = new Date();
            let dateWeek = 8 - new Date().getDay();
            let dateMonth = new Date().getMonth();
            let dayDown = Math.floor((new Date().setHours(24, 0, 0, 0) - date.getTime()) / 1000);
            let weekDown = Math.floor((new Date().setHours(dateWeek * 24, 0, 0, 0) - date.getTime()) / 1000);
            let monthDown = Math.floor((new Date(new Date().setMonth(dateMonth + 1, 1)).setHours(0, 0, 0, 0) - date.getTime()) / 1000);
            this.dayDown = this.getTime(dayDown);
            this.weekDown = this.getTime(weekDown);
            this.monthDown = this.getTime(monthDown);
        }
    },
    mounted(){
        this.init();

    },
    components:{NavItem,UserVip,Speed},
    computed:{
        ...mapState(['platform','player','level']),
        gotoShow() {
            return this.$route.path == "/account";
        }
    }
}
</script>
