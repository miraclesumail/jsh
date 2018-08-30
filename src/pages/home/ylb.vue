<template>
    <div class="yulebao">
        <scroll :data="showCode[tabNav]">
            <div style="position:relative">
                <crumbs icon="icon_lijin" title="娱乐宝"></crumbs>
                <span class="ylb_more" @click="more">?</span>
                <TabNavs :list="navs" v-model="tabNav" />
                <div class="table_box" v-if="showCode && tabNav==3" >
                    <table>
                        <thead>
                        <tr>
                            <th>账号</th>
                            <th>金额</th>
                            <th>时间</th>
                        </tr>
                        </thead>
                            <tr v-for="(item,index) in showCode[3]" :key="index">
                                <td class="text_md">{{item.accountNo}}</td>
                                <td class="text_md">{{item.bonus}}元</td>
                                <td class="text_md">{{item.time.getDate().substr(5,11)}}</td>
                            </tr>
                    </table>
                </div>
                <ul class="cars" v-if="showCode && tabNav<3">
                    <li class="item" v-for="(item,index) in showCode[tabNav]" :key="index">
                        <div class="name">{{item.tag}}</div>
                        <div class="text">
                            <h3>{{item.title}}<span></span> <span
                                style="color: #000;font-size: 14px">{{ item.bonusLimit ? '最高优惠'+item.bonusLimit+'元':'优惠金额'}}</span>
                            </h3>
                            <div><span> 所需流水 :</span><span
                                class="content">{{item.validBet}}{{item.bonusLimit?'倍':''}}</span></div>
                            <div><span> 指定游戏 :</span><span class="content">{{item.games.length ? item.games.join().replace(/电子/g,'') :'所有游戏'}}</span>
                            </div>
                            <div><span> 领取条件 :</span><span class="content" v-html="item.condition"></span></div>
                            <div><span> 使用期限 :</span><span class="content">{{item.expireTime.getDate()}}</span></div>
                        </div>
                        <div class="statu">
                            领取码<br/>
                            <span>{{item.bonusCode}}</span>
                            <div @click="apply(item)" class="apply red" v-if="!tabNav">申请</div>
                            <div class="apply gray" v-else>申请</div>
                        </div>
                    </li>
                    <li class="item def" v-if="!showCode[tabNav].length"></li>
                </ul>
            </div>
        </scroll>
        <div class="mask" @touchmove.prevent="11" flex="main:center cross:center" v-if="openShow">
            <div class="box">
                <div class="name">
                    娱乐宝详情
                    <div flex="cross:center main:center" class="close">
                        <span @click="more(false)" class="icon_cha"></span>
                    </div>

                </div>
                <div class="content">
                    <span>什么是娱乐宝？</span><br/>
                    金世豪会不定期派发娱乐宝优惠给会员，会员可立即获得专属优惠。
                    <br/><br/><span>如何查询娱乐宝？</span><br/>
                    会员可登陆游戏账号后，查看站内信或者是查看绑定联系电话中的短信内容查看相应的领取码。
                    <br/><br/><span>如何兑换娱乐宝？</span><br/>
                    方式1.会员在充值时，页面将会提示会员是否有可领取的娱乐宝，输入收到的领取码，完成充值后，即可领取；<br/>
                    方式2.会员可在网页版-账户管理-点击<span>【娱乐宝】</span>按钮申请；在手机版首页点击<span>【娱乐宝】</span>按钮申请。
                    <br/><br/><span>娱乐宝的有效期是多久？</span><br/>
                    每一个娱乐宝都有使用权限，到期日都不同，会员可在申请时留意查看，请把握提交时间。
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import TabNavs from '@/components/tab_navs.vue'
import {mapMutations, mapActions, mapState} from 'vuex'
export default {
    data() {
        return {
            promoCode: [
                {name: '未使用', icon: "icon-weishiyong", color: '#70d9ab', key: ""},
                {name: '已使用', icon: "icon-yishiyong", color: '#fbb136', key: ""},
                {name: '已过期', icon: "icon-jieshushijian", color: '#e47066', key: ""},
                {name: '最新榜', icon: "icon-lijinquan", color: '#e47066', key: ""},
            ],
            tabNav: 0,
            openShow: false,
            showCode: [[],[],[]],
            navs: [
                {name: "未使用", icon: "icon_weishiyong"},
                {name: "已使用", icon: "icon_yishiyong"},
                {name: "已过期", icon: "icon_guoqi"},
                {name: "最新榜", icon: "icon_bangdan"},
            ]
        }
    },
    methods: {
        ...mapMutations([
            'SET_STATE', 'ALERT', 'CONFIRM'
        ]),
        ...mapActions([
            'setWallet',
        ]),
        more(val) {
            this.openShow = !!val;
        },
        apply(val) {
            let bonusCode = val.bonusCode.toString();
            let sendData = {
                promoCode: bonusCode,
                _closeCONFIRM: true
            }
            this.$api.applyPromoCode(sendData).then(res => {
                this.$tool.ALERT({text: "恭喜您，领取成功！"})
                this.setWallet();
                this.init();
            }).catch(err => {
                this.$tool.CONFIRM({
                    text: err.errorMessage, okName: '去存款', okfun: () => {
                        this.$router.push({path: '/recharge', query: {bonusCode: bonusCode}})
                    }, noName: "取消", nofun: () => {
                    }
                })
            })
        },
        sort(arr){
            let map = [];
            arr && arr.map((item, index) => {
                map.unshift(item)
            })
            return map;
        },
        init() {
            this.$api.getPromoCode().then(res => {
                this.showCode = [this.sort(res.data.noUseList), this.sort(res.data.usedList), this.sort(res.data.expiredList), res.data.bonusList];
            })
        }
    },
    components: {TabNavs},
    mounted() {
        this.tabNav = this.$route.query.tabNav || 0;
        this.init();
    }

}
</script>

