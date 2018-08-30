<template>
    <div class="sign_in">
        <div class="sign_box" flex="main:center cross:center">
            <div class="map_top" ref="map">
                <div class="map"></div>
                <div class="map_content">
                    <div class="signinmapline">
                        <div class="bottom">
                            <div class="btn-sign" @click="signIn"></div>
                            <div class="sign_open" @click="open"></div>
                            <div class="sign_ship">
                                <div class="compass_bottom">
                                    <div class="compass_top">
                                    </div>
                                </div>
                                <div class="sign_title"></div>
                            </div>
                        </div>
                    </div>
                    <div class="first_dot">
                        <div class="dot_active map_dot">
                            <span class="dot_circle"></span>
                            <span class="dot_text_active"></span>
                        </div>
                    </div>
                    <div class="" v-for="(item,index) in list" :class="item.mapDot" :key="index">
                        <div class="map_dot" :class="item.isSignIn?'dot_active':'dot_noactive'">
                            <span class="dot_circle"></span>
                            <transition name="dot">
                                <span class="dot_text_active" v-show="item.isSignIn"></span>
                            </transition>
                            <span class="dot_text" v-show="item.isSignIn===false">{{item.bonus}}元</span>
                            <span class="" :class="item.isSignIn?'dot_day_active':'dot_day_noactive'"></span>
                        </div>
                    </div>
                    <div class="game_active" v-for="(item) in list" :class="item.mapLine" v-if="item.isSignIn"  :key="item.mapDot"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "sign-in",
    data() {
        return {
            currentStep: 0, //当前走了多少步
            canStep: 0, //可以走多少步
            mapDot: [
                "second_dot",
                "third_dot",
                "four_dot",
                "fifth_dot",
                "sixth_dot",
                "seventh_dot",
                "eighth_dot"
            ],
            mapLine: [
                "gameline_first",
                "gameline_second",
                "gameline_third",
                "gameline_fourth",
                "gameline_fifth",
                "gameline_sixth",
                "gameline_seventh"
            ],
            list: [],
            isGet: true,
            MockData: [
                {
                    title: 1
                },
                // {
                //     title: 1
                // }
            ]
        };
    },
    methods: {
        open() {
            this.$tool.CONFIRM({
                title: "签到细则",
                text:
                    '<div style="text-align: left;">1.会员每日以任何存款方式完成累计存款200元，投注额3000（不限大厅）即可领取签到奖励；<br/>2.会员需要连续登陆签到才可以领取相应的奖励，如签到天数中断，签到将会重新累计；<br/>3.礼金会在5分钟内审核添加，享受签到礼金会员提款需要达到（4倍）投注额方可提出；<br/>4.签到存款及投注额累积时间为每日00：00：00至23：59：59；<br/>5.每周一00：00：00开始计算新的七天签到，将无法领取上一周的礼金；<br/>7.金世豪娱乐城具有对星级会员俱乐部所有内容的修改权及解释权。</div>'
            });
        },
        signIn() {
            if (this.canStep === 0) {
                this.$tool.ALERT({
                    type: "error",
                    text: "签到条件不符合"
                });
                return false;
            }
            if (this.currentStep === this.canStep && this.canStep !== 0) {
                this.$tool.ALERT({
                    type: "error",
                    text: "当前已经签到了"
                });
                return false;
            }
            this.$api.getSignBonus().then(res => {
                res.data.forEach((val, index, arr) => {
                    this.currentStep ++;
                    this.list.filter((val, index, arr) => {
                        if (this.currentStep === val.step) {
                            val.isSignIn = true;
                        }
                    });
                })
            });
            return false;
        }
    },
    mounted() {
        this.$api.getSignInfo().then(res => {
            let list = res.data.list||[];
            list.filter((val, index, arr) => {
                val.isSignIn = val.status==2;
                val.mapDot = this.mapDot[index];
                val.mapLine = this.mapLine[index];
                val.step = index + 1;
                if (val.status === 2) {
                    this.currentStep = index + 1;
                }
                if (val.status === 1) {
                    this.canStep = index + 1;
                }
            });
            this.list=list;
        });
    }
};
</script>
