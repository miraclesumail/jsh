import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import config from '@/tool/config';
Vue.use(Vuex);
const state={
    loading:false,    //加载动画
    alert:[],
    confirm:[],
    platformId:config.platformId,     //平台ID
    noReadMail:0,   //未读站内信
    player:{
        playerId:'',        //玩家Id
        realName:'',        //玩家真实名字
        name:'',           //代理名字
        token:'',            //代理token
        bankAccount:'',      //银行卡号，用以判断是否绑定银行卡
        credits:null,
        email:'',           //邮箱
        phoneNumber:'',     //手机号
        levelVal:'',        //玩家等级值
        levelName:'',        //等级称号
        userCurrentPoint:0     //玩家当前积分
    },
    isAPK:2,           // 2--h5, 4--app
    wallet:{
        data:{}
    },                           //钱包
    wealth:{
        task:[],
        ranking:null,
        noFinish:0,
        playerPointInfo:null
    },     //财富值信息
    deposit:{           //有效的存款方式
        hand:[],
        online:[],
        wechat:{},
        alipay:{}
    },
    depositDiscount:[],      //存款优惠，用以展示在有存款的地方
    level:{},   //玩家等级
    prefix:'p',   //前缀
    reProvider:['53','54','47',"20",'70'],   //玩家额度重复计数供应商id，
    platform:{},  //平台信息
    cfUrl:'',   //客服地址
    cfService:false,   //客服服务
    history:'',    //path历史记录
    rem:12,      //1rem等于多少px
    cdn:'',      //图片cdn地址
    scrollY:0,    //返回滑动位置
    bankNames:{        //银行名称
        1:"中国工商银行",
        2:"中国农业银行",
        3:"中国银行",
        4:"中国建设银行",
        5:"交通银行",
        6:"中信银行",
        7:"中国光大银行",
        8:"华夏银行",
        9:"广发银行",
        10:"平安银行（原深圳发展银行）",
        11:"招商银行",
        12:"兴业银行",
        13:"上海浦东发展银行",
        161:"中国邮政储蓄银行",
        169:"中国民生银行"
    },
    providerTeam:{
        "41": {text:"电子<br/>游戏",href:'/gameLobby/MG?code=12&index=3&icon=icon-laohuji'},
        "57": {text:"电子<br/>游戏",href:'/gameLobby/ISB?code=9&index=0&icon=icon-laohuji'},
        "16": {text:"AG<br/>游戏",gameId:"C78F36F5-D74E-4C85-964F-CC10A1F57737"} ,
        "20": {text:"AG<br/>游戏",gameId:"F363CE54-4A07-41A9-ACCC-45B38A0DF3FB"} ,
        "55": {text:"BBIN<br/>游戏",gameId:"E99C7C9F-C4A3-4174-96A5-0D1FBE03A4BC"} ,
        "56": {text:"EBET<br/>真人",gameId:"0B60D369-F338-40E3-B5C6-0FE462E840D7"} ,
        "53": {text:"BBIN<br/>游戏",gameId:"812691F5-BB78-47A5-AA45-06589D55101B"},
        "54": {text:"BBIN<br/>游戏",gameId:"AFED875F-3AB0-41BF-8317-55261D04B5F5"},
        "45": {text:"电子<br/>游戏",href:'/gameLobby/DT?code=10&index=1&icon=icon-laohuji'},
        "62": {text:"OPUS<br/>真人",href:'/index/indexGamesShow/zr?title=真人视讯&icon=icon-shixunyingyong'},
        "63": {text:"体育<br/>游戏",gameId:"9419669A-1BFB-4000-86B3-F05BD628B2E6"},
        "47": {text:"BBIN<br/>游戏",gameId:"CEFB3B10-DCC4-4E76-9E41-66AFBF2B088C"},
        "18": {text:"电子<br/>游戏",href:'/gameLobby/PT?code=11&index=2&icon=icon-laohuji'},
        "70": {text:"AG<br/>游戏",href:'/gameLobby/PT?code=11&index=2&icon=icon-laohuji'},
    },
    gameGroup:{    //后台配置的游戏组
        code:null,
        list:[]
    }
};

export default new Vuex.Store({state,getters,actions,mutations,});

