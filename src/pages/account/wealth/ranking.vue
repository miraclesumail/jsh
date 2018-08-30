<template>
    <div class="wealth_ranking">
        <table>
            <thead>
                <tr>
                    <th>名次</th>
                    <th>游戏账号</th>
                    <th>财富值</th>
                    <th>奖励</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in wealth.ranking" :key="index">
                    <td class="place">{{index>2?(index+1):''}}</td>
                    <td>{{item.account}}</td>
                    <td>{{item.totalPoint}}</td>
                    <td @click="openBox(item)"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import {mapMutations,mapState,mapActions} from 'vuex'
let createTime=new Date().getYear()-106;
export default {
    data () {
        return {
        }
    },
    methods:{
        openBox(val){
            this.$tool.CONFIRM({text:"积分大礼包，敬请期待！"})
        }
    },
    computed: {
        ...mapState([
            'wealth'
        ]),
    }
}
</script>
