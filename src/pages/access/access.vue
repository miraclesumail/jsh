<template>
    <div class="access">
        <div class="item">
            <h4>手工存款</h4>
            <ul  class="navs2">
                <router-link tag="li" :to="{path:'/access/hand',query:item}" v-for="(item,index) in hand"
                    :key="index"
                    v-if="player.playerId ? validHand.includes(item.type):1"
                    flex="main:center cross:center dir:top"
                    v-count="'在线支付|'+item.name">
                    <div :class="item.icon"></div>
                    <p>{{item.name}}</p>
                </router-link>
            </ul>
        </div>
        <div class="item">
            <h4>在线支付</h4>
            <ul  class="navs2">
                <router-link tag="li" :to="{path:'/access/online',query:item}" v-for="(item,index) in online"
                    :key="index" v-if="player.playerId ? validOnline.includes(item.type):index<9"
                    flex="main:center cross:center dir:top"
                    v-count="'在线支付|'+item.name"
                    @click="tagNav2(item)">
                    <div :class="item.icon"></div>
                    <p>{{item.name}}</p>
                </router-link>
                <router-link tag="li" to="/access/alipay?icon=icon_alipay&name=个人支付宝" flex="main:center cross:center dir:top" v-if="alipay" v-count="'在线支付|个人支付宝'">
                    <div class="icon_alipay"></div>
                    <p>个人支付宝</p>
                </router-link>
                <router-link tag="li" to="/access/weixin?icon=icon_weixin&name=个人微信" flex="main:center cross:center dir:top" v-if="wechat" v-count="'在线支付|微信转账'">
                    <div class="icon_weixin"></div>
                    <p>个人微信</p>
                </router-link>
            </ul>
        </div>
        <div class="item">
            <h4>申请提款</h4>
            <ul  class="navs2">
                <router-link tag="li" to="/access/withdrawal" flex="main:center cross:center dir:top">
                    <div class="icon_tikuan"></div>
                    <p>申请提款</p>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    name: 'access',
    data () {
        return {
            hand:[
                {type:1,name:'网银转账',icon:'icon_wangyin'},
                {type:2,name:'ATM存款',icon:'icon_atm'},
                {type:3,name:'柜台存款',icon:'icon_guitai'},
                {type:4,name:'支付宝转银行',icon:'icon_alipay'},
                {type:5,name:'微信转银行',icon:'icon_weixin'},
                {type:6,name:'云闪付',icon:'icon_shanfu'}
            ],
            online:[
                {type: 1, nickName: 'Netpay', name: '网银充值', icon: 'icon_wangyin2'},
                {type: 2, nickName: 'WechatQR', name: '微信扫一扫', icon: 'icon_weixin2'},
                {type: 4, nickName: 'WechatApp', name: '微信APP支付', icon: 'icon_weixin'},
                {type: 3, nickName: 'AlipayQR', name: '支付宝扫码', icon: 'icon_alipay2'},
                {type: 5, nickName: 'AlipayApp', name: '支付宝个人', icon: 'icon_alipay'},
                {type: 6, nickName: 'FastPay', name: '网银快捷', icon: 'icon_kuaijie'},
                {type: 7, nickName: 'QqPayQR', name: 'QQ扫码', icon: 'icon_qq'},
                {type: 8, nickName: 'UnPayQR', name: '银联扫码', icon: 'icon_yinlian'},
                {type: 9, nickName: 'JdPayQR', name: '京东钱包', icon: 'icon_jd'},
                {type: 10, nickName: 'WXWAP', name: '微信APP', icon: 'icon_weixin2'},
                {type: 11, nickName: 'ALIWAP', name: '支付宝支付', icon: 'icon_alipay'},
                {type: 12, nickName: 'QQwap', name: 'QQ快捷', icon: 'icon_qq'},
                {type: 13, nickName: 'PCard', name: '点卡支付', icon: 'icon_dianka'},
                {type: 14, nickName: 'JdWAP', name: '京东APP', icon: 'icon_jd'},
            ],
            active:0,
            navs: [
                {name: "全部", icon: "icon_total", color: "#e36b60"},
                {name: "电子", icon: "icon_laohuji", color: "#70d9ab"},
                {name: "真人", icon: "icon_live", color: "#00bff3"},
                {name: "捕鱼", icon: "icon_fish", color: "#fdcf72"},
                {name: "彩票", icon: "icon_lottery", color: "#e36b60"},
                {name: "体育", icon: "icon_sport", color: "#00bff3"}
            ]
        }
    },
    methods:{
        ...mapActions(['getDeposit'])
    },
    mounted(){
        this.player.playerId && this.getDeposit();
    },
    computed:{
        ...mapState(['platform','player','deposit']),
        validHand(){
            let list=[];
            this.deposit.hand.map((item,index)=>{
                if(!item.data.length){
                    list.remove(item)
                }else{
                    list.push(Number(item.depositMethod))
                }
            })
            return list;
        },
        validOnline(){
            let list=[];
            this.deposit.online.map((item,index)=>{
                if(item.status ==1) list.push(Number(item.type));
            })
            return list;
        },
        alipay(){
            return this.player.playerId &&this.deposit.alipay;
        },
        wechat(){
            return this.player.playerId &&this.deposit.wechat;
        }
    }
}
</script>
