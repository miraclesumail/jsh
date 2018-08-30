<template>
    <div class="search_account">
        <crumbs icon="icon_jilv" title="账号记录"></crumbs>
        <TabNavs :list="navs" v-model="tabNav" v-if="!records.length" />
        <div class="form_box2" v-if="!records.length">
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">{{searchDate[tabNav].type}}</div>
                <div class="text_box" flex="cross:center">
                    <select name="bank" v-model="sendData.type">
                        <option :value="item.type" v-for="(item,index) in searchDate[tabNav].list" :key="index">
                            {{item.nickName}}
                        </option>
                    </select>
                    <i></i>
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">开始时间</div>
                <div class="text_box" flex="cross:center">
                    <input type="datetime-local" v-model="sendData.startTime" placeholder="请选择开始时间">
                    <i></i>
                </div>
            </div>
            <div class="item item_input" flex="box:first cross:center">
                <div class="name">结束时间</div>
                <div class="text_box" flex="cross:center">
                    <input type="datetime-local" v-model="sendData.endTime" placeholder="请选择结束时间">
                    <i></i>
                </div>
            </div>
            <div class="item item_btn">
                <div class="btn" @click="search">查询</div>
            </div>
        </div>
        <div class="table_box" v-else>
            <table>
                <thead>
                <th v-for="(item,index) in searchDate[tabNav].th" :key="index"  :style="{width:searchDate[tabNav].prop}">
                    {{item}}
                </th>
                </thead>
                <tr v-if="records && tabNav==0" :key="index"  v-for="(item,index) in records">
                    <td>{{item.proposalId}}</td>
                    <td>{{item.createTime.getDate().substr(5,11)}}</td>
                    <td>{{item.amount}}元</td>
                    <td>{{['手动充值','在线充值','个人支付宝','微信转账'][item.topUpType-1]}}</td>
                </tr>
                <tr v-if="records && tabNav==1" :key="index"  v-for="(item,index) in records">
                    <td @click="cancel(item)"
                        v-if="searchDate[tabNav].list[1].type.includes(item.status)">
                        <span class="cancel">取消</span>{{item.proposalId}}
                    </td>
                    <td v-else>{{item.proposalId}}</td>
                    <td>{{item.createTime.getDate().substr(5,11)}}</td>
                    <td>{{item.data.amount.toFixed(2)}}元</td>
                    <td>{{typeName[item.status]}}</td>
                </tr>
                <tr v-if="records && tabNav==2" :key="index"  v-for="(item,index) in records">
                    <td>{{item.eventName}}</td>
                    <td>{{item.rewardAmount.toFixed(2)}}元</td>
                    <td>{{item.createTime.getDate().substr(5,11)}}</td>
                    <td>{{typeName[item.status]}}</td>
                </tr>
                <tr v-if="records && tabNav==3" :key="index" v-for="(item,index) in records">
                    <td :style="{width:searchDate[tabNav].prop}">
                        <div class="line1">{{item.name}}</div>
                    </td>
                    <td :style="{width:searchDate[tabNav].prop}" @click="open(item)">
                        <div class="line1" style="width:1.2rem">{{item.orderNo}}</div>
                        <span class="open">!</span></td>
                    <td :style="{width:searchDate[tabNav].prop}">{{item.validAmount.toFixed(2)}}</td>
                    <td :style="{width:searchDate[tabNav].prop}">{{item.bonusAmount.toFixed(2)}}</td>
                    <td :style="{width:searchDate[tabNav].prop}">{{item.createTime.getDate().substr(5,11)}}</td>
                </tr>
            </table>
            <div class="show" v-if="records && tabNav==0">
                <span>合计存款：{{stats.totalAmount.toFixed(2)}}元</span>
            </div>
            <div class="show" v-if="records && tabNav==1">
                <span>合计提款：{{stats.totalAmount && stats.totalAmount.toFixed(2)}}元</span>
            </div>
            <div class="show" v-if="records && tabNav==2">
                <span>合计优惠：{{stats.totalAmount.toFixed(2)}}元</span>
            </div>
            <div class="show" v-if="records && tabNav==3">
                <span>共计投注：{{stats.totalValidAmount.toFixed(2)}}元</span>
                <span>盈利金额：{{stats.totalBonusAmount.toFixed(2)}}元</span><br/>
            </div>
            <div class="flip" v-if="stats.totalCount>10">
                <span>共{{stats.totalCount}}条记录，每页10条，当前{{(stats.startIndex/10)+1}}/{{Math.ceil(stats.totalCount/10)}}页</span>
                <div class="operation" flex="box:mean">
                    <span class="iconfont icon-pintuangouwuqianwanganniu2-copy" @click="--nowPage"></span>
                    <select v-model="nowPage" name="page">
                        <option :value="index"
                                :key="index"
                                v-for="(item,index) in new Array(Math.ceil(stats.totalCount/10))">{{index+1}}
                        </option>
                    </select>
                    <span class="iconfont icon-pintuangouwuqianwanganniu" @click="++nowPage"></span>
                </div>
            </div>
            <div class="btn" @click="records=[]">更多查询</div>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import TabNavs from '@/components/tab_navs.vue'
export default {
    name: 'search_account',
    data () {
        return {
            tabNav:0,
            navs: [
                {name: "存款记录", icon: "icon_cun"},
                {name: "提款记录", icon: "icon_qu"},
                {name: "优惠记录", icon: "icon_youhui"},
                {name: "投注记录", icon: "icon_jilv3"}
            ],
            sendData: {
                startTime: this.$tool.getFormat(new Date(
                    new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000
                )),
                endTime: this.$tool.getFormat(new Date(
                    new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1000
                )),
                type: null,
                startIndex: 0,
                requestCount: 10,
            },
            records:[],
            typeName: {
                Pending: '待审核',
                Processing: '已审核',
                AutoAudit: '待审核',
                Approved: '已处理',
                Success: '已处理',
                Rejected: '已取消',
                Fail: '已取消',
                Cancel: '已取消',
                PrePending: '已取消',
                CsPending: '待审核',
                Undetermined: '已审核',
                Recover: "已审核"
            },
            searchDate: [{
                name: "存款记录",
                type: '存款类型',
                icon: 'icon-shiliangzhinengduixiang201',
                color: "#fdcf72",
                th: ['订单号', '时间', '金额', '方式'],
                activeType: null,
                prop: '25%',
                stats: null,
                list: [{
                    type: null,
                    nickName: '全部'
                }, {
                    type: 1,
                    nickName: '手动充值'
                },
                {
                    type: 2,
                    nickName: '在线充值'
                },
                {
                    type: 3,
                    nickName: '个人支付宝'
                },
                {
                    type: 4,
                    nickName: '微信转账'
                }],
                records: null
            },
            {
                name: "提款记录",
                type: '提款状态',
                icon: 'icon-xianjindai',
                color: "#86dfb8",
                th: ['订单号', '时间', '金额', '状态'],
                activeType: null,
                prop: '20%',
                stats: null,
                list: [{
                    type: null,
                    nickName: '全部'
                },
                {
                    type: ['Pending', 'AutoAudit', 'CsPending'],
                    nickName: '待审核'
                },
                {
                    type: ['Processing', 'Undetermined', 'Recover'],
                    nickName: '已审核'
                },
                {
                    type: ['Approved', 'Success'],
                    nickName: '已处理'
                },
                {
                    type: ['Rejected', 'Fail', 'Cancel', 'PrePending'],
                    nickName: '已取消'
                }],
                records: null
            },
            {
                name: "优惠记录",
                type: '优惠类型',
                icon: 'icon-youhuijilu',
                color: "#00bff3",
                th: ['类型', '金额', '时间', '状态'],
                activeType: 1,
                prop: '25%',
                stats: null,
                list: [{
                    type: 1,
                    nickName: '全部'
                },],
                records: null
            },
            {
                name: "投注记录",
                type: '投注大厅',
                th: ['游戏', '局号', '投注额', '派彩金额', '时间'],
                activeType: null,
                prop: '20%',
                stats: null,
                list: [],
                records: null
            }]
        }
    },
    computed: {
        ...mapState(['wallet','reProvider','providerTeam']),
    },
    components:{TabNavs},
    methods:{
        ...mapActions(['setWallet']),
        search(startIndex) {
            if (new Date(this.sendData.endTime).getTime() - new Date(this.sendData.startTime).getTime() < 0) {
                this.$tool.ALERT({text: "请选择正确的查询时间周期", type: "warn"})
                return;
            }
            if (new Date().setHours(0, 0, 0, 0) - 14 * 24 * 60 * 60 * 1000 - new Date(this.sendData.startTime).getTime() > 0) {
                this.$tool.ALERT({text: "记录搜索仅支持14天内的查询", type: "warn"})
                return;
            }
            let sendAPI = 'getTopupList',
                sendData = this.sendData;
            if (this.tabNav == 0) {
                sendAPI = 'getTopupList';
                sendData = this.$tool.changeKey(this.sendData, 'type', 'topUpType', true);
            }

            if (this.tabNav == 1) {
                sendAPI = 'getBonusRequestList';
                if (this.sendData.type) {
                    this.searchDate[this.tabNav].activeType = this.sendData.type;
                    this.sendData.type.map((item, index) => {
                        this.sendData.status = item;
                        sendAPI(this.sendData).then(res => {
                            this.records = [...this.records, ...res.data.records];
                            this.searchDate[this.tabNav].records = this.records;
                        })
                    })
                    return;
                } else {
                    this.sendData.status = null;
                }
            }
            if (this.tabNav == 2) {
                sendAPI = 'getPlayerRewardList';
                sendData = this.sendData;
            }

            if (this.tabNav == 3) {
                sendAPI = 'search';
                sendData = this.$tool.changeKey(this.sendData, 'type', 'providerId', true);
            }

            //翻页控制
            if (startIndex > 0) {
                sendData.startIndex = startIndex;
            } else {
                sendData.startIndex = 0;
            }

            this.$api[sendAPI](sendData).then(res => {
                this.searchDate[this.tabNav].activeType = this.sendData.type;
                if (!res.data.records.length) {
                    this.$tool.ALERT({text: "无记录"});
                }
                this.searchDate[this.tabNav].records = res.data.records;
                this.records = res.data.records;
                this.stats = res.data.stats;
            })
        },
        open(val) {
            this.$tool.CONFIRM({
                title: '详情', text: "<div style='text-align: left;'>游戏名字：" + val.name +
                "<br/>游戏局号：" + val.orderNo +
                "<br/>投注金额：" + val.validAmount.toFixed(2) +
                "元<br/>派彩金额：" + val.bonusAmount.toFixed(2) +
                "元<br/>投注时间：" + val.createTime.getDate().substr(5) + "</div>"
            })
        },
        getProviderList(){
            let list = this.wallet.data.gameCreditList;
            let tmp = this.$tool.changeKey(list, 'providerId', 'type');
            this.searchDate[3].list = [{
                type: null,
                nickName: "全部"
            }];
            for (let key in tmp) {
                this.searchDate[3].list.push(tmp[key]);
            }
        },
        cancel(val) {
            this.$api.cancelBonusRequest({proposalId: val.proposalId}).then(res => {
                this.search();
                this.$tool.ALERT({text: "取消成功"})
            })
        },
    },
    mounted(){
        if(this.wallet.data.gameCreditList){
            this.getProviderList();
        }else{
            this.setWallet(this.getProviderList)
        }
        if(this.$route.query.type){
            this.tabNav=Number(this.$route.query.nav);
            this.search();
        }
    },
    watch:{
        tabNav() {
            this.sendData.type = this.searchDate[this.tabNav].activeType;
            this.nowPage = 0;
            if (this.searchDate[this.tabNav].records) {
                this.records = this.searchDate[this.tabNav].records;
            } else {
                this.records = []
            }
        }
    }
}
</script>
