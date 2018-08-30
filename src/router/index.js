import Vue from 'vue'
import Router from 'vue-router'
const Home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const Register = r => require.ensure([], () => r(require('@/pages/home/register')), 'home')
const Login = r => require.ensure([], () => r(require('@/pages/home/login')), 'home')
const Vip = r => require.ensure([], () => r(require('@/pages/home/vip')), 'vip')
const Activity = r => require.ensure([], () => r(require('@/pages/home/activity')), 'activity')
const ActivityDetails = r => require.ensure([], () => r(require('@/pages/home/activity_details')), 'activity')
const Ylb = r => require.ensure([], () => r(require('@/pages/home/ylb')), 'ylb')
const SignIn = r => require.ensure([], () => r(require('@/pages/home/sign_in')), 'sign_in')
const Open = r => require.ensure([], () => r(require('@/pages/home/open')), 'home')
const Games = r => require.ensure([], () => r(require('@/pages/home/games')), 'games')


const Lobby = r => require.ensure([], () => r(require('@/pages/lobby/lobby')), 'home')
const LobbyType = r => require.ensure([], () => r(require('@/pages/lobby/lobby_type')), 'lobby_type')
const Collection = r => require.ensure([], () => r(require('@/pages/lobby/collection')), 'collection')


const Access = r => require.ensure([], () => r(require('@/pages/access/access')), 'home')
const Hand = r => require.ensure([], () => r(require('@/pages/access/hand')), 'access')
const Online = r => require.ensure([], () => r(require('@/pages/access/online')), 'access')
const Alipay = r => require.ensure([], () => r(require('@/pages/access/alipay')), 'access')
const Weixin = r => require.ensure([], () => r(require('@/pages/access/weixin')), 'access')
const Withdrawal = r => require.ensure([], () => r(require('@/pages/access/withdrawal')), 'withdrawal')

const Account = r => require.ensure([], () => r(require('@/pages/account/account')), 'home')
const Navs = r => require.ensure([], () => r(require('@/pages/account/Navs')), 'home')
const NavsMore = r => require.ensure([], () => r(require('@/pages/account/navs_more')), 'navs_more')
const ModifyTel = r => require.ensure([], () => r(require('@/pages/account/modify_tel')), 'modify_tel')
const ModifyBank = r => require.ensure([], () => r(require('@/pages/account/modify_bank')), 'modify_bank')
const ModifyPassword = r => require.ensure([], () => r(require('@/pages/account/modify_password')), 'modify_password')
const ModifyGamePassword = r => require.ensure([], () => r(require('@/pages/account/modify_game_password')), 'modify_game_password')
const ModifyEmail = r => require.ensure([], () => r(require('@/pages/account/modify_email')), 'modify_email')
const ModifySmsSet = r => require.ensure([], () => r(require('@/pages/account/modify_sms_set')), 'modify_sms_set')
const Search = r => require.ensure([], () => r(require('@/pages/account/search')), 'search')
const GameTransfer = r => require.ensure([], () => r(require('@/pages/account/game_transfer')), 'game_transfer')
const Wealth = r => require.ensure([], () => r(require('@/pages/account/wealth/wealth')), 'wealth')
const Change = r => require.ensure([], () => r(require('@/pages/account/wealth/change')), 'wealth')
const Ranking = r => require.ensure([], () => r(require('@/pages/account/wealth/ranking')), 'wealth')
const Task = r => require.ensure([], () => r(require('@/pages/account/wealth/task')), 'wealth')
const Discount = r => require.ensure([], () => r(require('@/pages/account/discount')), 'discount')
const DiscountDetail = r => require.ensure([], () => r(require('@/pages/account/discount_detail')), 'discount')
const Msg = r => require.ensure([], () => r(require('@/pages/account/msg')), 'msg')



Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/home/games',
            name: 'games',
            component: Games
        },
        {
            path: '/home/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home/register',
            name: 'register',
            component: Register
        },
        {
            path: '/home/activity',
            name: 'activity',
            component: Activity
        },
        {
            path: '/home/activityDetails',
            name: 'activityDetails',
            component: ActivityDetails
        },
        {
            path: '/home/vip',
            name: 'vip',
            component: Vip
        },
        {
            path: '/home/ylb',
            name: 'ylb',
            component: Ylb
        },
        {
            path: '/home/signIn',
            name: 'signIn',
            component: SignIn
        },
        {
            path: '/home/open',
            name: 'open',
            component: Open
        },
        {
            path: '/lobby',
            name: 'lobby',
            component: Lobby
        },
        {
            path: '/lobby/lobbyType',
            name: 'lobbyType',
            component: LobbyType
        },
        {
            path: '/lobby/collection',
            name: 'collection',
            component: Collection
        },
        {
            path: '/access',
            name: 'access',
            component: Access
        },
        {
            path: '/access/hand',
            name: 'hand',
            component: Hand
        },
        {
            path: '/access/online',
            name: 'online',
            component: Online
        },
        {
            path: '/access/alipay',
            name: 'alipay',
            component: Alipay
        },
        {
            path: '/access/weixin',
            name: 'weixin',
            component: Weixin
        },
        {
            path: '/access/withdrawal',
            name: 'withdrawal',
            component: Withdrawal
        },
        {
            path: '/account/gameTransfer',
            name: 'gameTransfer',
            component: GameTransfer
        },
        {
            path: '/account/modifyTel',
            name: 'modifyTel',
            component: ModifyTel
        },
        {
            path: '/account/modifyBank',
            name: 'modifyBank',
            component: ModifyBank
        },
        {
            path: '/account/modifyPassword',
            name: 'modifyPassword',
            component: ModifyPassword
        },
        {
            path: '/account/modifyGamePassword',
            name: 'modifyGamePassword',
            component: ModifyGamePassword
        },
        {
            path: '/account/modifyEmail',
            name: 'modifyEmail',
            component: ModifyEmail
        },
        {
            path: '/account/modifySmsSet',
            name: 'modifySmsSet',
            component: ModifySmsSet
        },
        {
            path: '/account/search',
            name: 'search',
            component: Search
        },
        {
            path: '/account/discount',
            name: 'discount',
            component: Discount
        },
        {
            path: '/account/discountDetail',
            name: 'discountDetail',
            component: DiscountDetail
        },
        {
            path: '/account/msg',
            name: 'msg',
            component: Msg
        },
        {
            path: '/account',
            component: Account,
            children:[
                {
                    path: "",
                    name:'account',
                    component: Navs
                },
                {
                    path: "navsMore",
                    name:'navsMore',
                    component: NavsMore
                },
            ]
        },
        {
            path: '/account/wealth',
            component:Wealth,
            children:[
                {
                    path: "",
                    name:'task',
                    component: Task
                },
                {
                    path: "change",
                    name:'change',
                    component: Change
                },
                {
                    path: "ranking",
                    name:'ranking',
                    component: Ranking
                },
            ]
        }
    ]
})
