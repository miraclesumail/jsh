<template>
	<div class="discount">
		<scroll>
            <div>
                <div class="list" v-for="(item,index) in proms" :key="index">
                    <div class="title" flex="main:center cross:center" :class="item.className">
                        <img :src="item.src">
                    </div>
                    <div class="box" flex>
                        <router-link :to="{path:'/account/discountDetail',query:{code:item.code}}" tag="div" :key="index"  class="item" v-for="(item,index) in item.list" flex="cross:center main:center">
                            <img :src="item.src">
                        </router-link>
                    </div>
                </div>
            </div>
        </scroll>
	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data () {
        return {
            path:'',
            promotionNameList:["自助结算洗码",],
            RewardList:[],
            active:this.$route.query.tab||0,
            proms:[
                {name:"限时优惠",className:'bonus_title1',list:[]},
                {name:"电子类优惠",className:'bonus_title2',list:[]},
                {name:"更多优惠",className:'bonus_title3',list:[]}
            ]
        };
    },
    props:['name'],
    methods:{
        tab(index){
            this.$router.push({query:{tab:index}});
            this.active=index;
        },
        goTo(val){
            if(val.path){
                this.$router.push({path:val.path,query:{code:val.code,type:val.type}});
            }else{
                this.$tool.ALERT({text:"即将开始"})
            }
        }
    },
    mounted(){
        this.$api.getRewardList().then(res=>{
            this.rewardList = res.data || [];
            this.rewardList.map((item,index)=>{
                let code =item.code;
                if(code.includes("_bonus")){
                    let src='';
                    // 洗码优惠结构不同，需特殊处理
                    if(item.type.name=="PlayerConsumptionReturn"){
                        src=item.param.imageUrl[0];
                    }else{
                        src=item.condition.imageUrl[0];
                    }
                    if(code.includes("_tab0")){
                        this.proms[0].list.push({code:item.code,src:src,index:src[src.length-1]})
                    }else if(code.includes("_tab1")){
                        this.proms[1].list.push({code:item.code,src:src,index:src[src.length-1]})
                    }else if(code.includes("_tab2")){
                        this.proms[2].list.push({code:item.code,src:src,index:src[src.length-1]})
                    }
                }
            })
            this.proms.map((item,index)=>{
                item.list.sort(function(a,b){return a.index>b.index;});
            })
        })
    }
};
</script>

