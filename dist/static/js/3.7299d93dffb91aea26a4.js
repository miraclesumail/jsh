webpackJsonp([3],{"2Cas":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("Dd8w"),s=n.n(a),i=n("NYxO"),o=((new Date).getYear(),{data:function(){return{}},methods:{openBox:function(t){this.$tool.CONFIRM({text:"积分大礼包，敬请期待！"})}},computed:s()({},Object(i.d)(["wealth"]))}),r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wealth_ranking"},[n("table",[t._m(0),t._v(" "),n("tbody",t._l(t.wealth.ranking,function(e,a){return n("tr",{key:a},[n("td",{staticClass:"place"},[t._v(t._s(a>2?a+1:""))]),t._v(" "),n("td",[t._v(t._s(e.account))]),t._v(" "),n("td",[t._v(t._s(e.totalPoint))]),t._v(" "),n("td",{on:{click:function(n){t.openBox(e)}}})])}))])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("名次")]),this._v(" "),e("th",[this._v("游戏账号")]),this._v(" "),e("th",[this._v("财富值")]),this._v(" "),e("th",[this._v("奖励")])])])}]},l=n("VU/8")(o,r,!1,null,null,null);e.default=l.exports},"87xb":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("Dd8w"),s=n.n(a),i=n("NYxO"),o=(new Date).getYear()-106,r={name:"wealth",metaInfo:{title:"金世豪娱乐城-品质，源自"+o+"年的一如既往!",meta:[{name:"keyWords",content:"金世豪,金世豪娱乐城,金世豪娱乐,金世豪手游，金世豪网址"},{name:"Description",content:"金世豪娱乐城(jin234.com)"+o+"年品质、顶级信誉，BBIN、AG、eBET、OPUS、PT、MG大平台护航，是一个提供真人娱乐、电子老虎机、体育投注、彩票、手机游戏为一体的综合博弈集团！"}]},data:function(){return{navs:[{name:"任务",path:"/account/wealth"},{name:"兑换",path:"/account/wealth/change"},{name:"排行榜",path:"/account/wealth/ranking"}],sendChange:{amount:null},differenceS:0,missonList:{},timer:null,downTime:!1,taskList:[],ranking:null,notFinish:0}},methods:s()({},Object(i.b)(["setMissonList"]),{goScroll:function(t){var e=this;2==t?setTimeout(function(){e.$refs.wealth.scrollTo(0,e.$refs.navs.offsetTop-e.rem)},300):this.$refs.wealth.scrollTo(0,0)},getTime:function(t){var e=Math.floor(t/86400),n=Math.floor(t%86400/3600),a=Math.floor(t%86400%3600/60);Math.floor(t%86400%3600%60);return e?e+"天"+n+"时":!e&&n?n+"时"+a+"分":e||n||!a?void 0:(console.log("开始倒计时"),this.SetCountDown(t),!1)},SetCountDown:function(t){var e=this;this.differenceS||(clearInterval(this.timer),this.differenceS=t,this.timer=setInterval(function(){--e.differenceS,e.differenceS||(clearInterval(timer),e.init())},1e3))},init:function(t){var e=new Date,n=8-(new Date).getDay(),a=Math.floor(((new Date).setHours(24*n,0,0,0)-e.getTime())/1e3);this.downTime=this.getTime(a),this.setMissonList()}}),mounted:function(){this.init()},created:function(){},computed:s()({},Object(i.d)(["player","wealth","rem"]),{playerPointInfo:function(){return this.wealth.playerPointInfo}})},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"wealth",staticClass:"wealth"},[n("scroll",[n("div",[n("div",{staticClass:"wealth_title"}),t._v(" "),n("ul",{staticClass:"user_info"},[t.playerPointInfo?n("li",{attrs:{flex:"cross:center"}},[t._v("排名 : "+t._s(t.playerPointInfo[0].rank>1e3||!t.player.userCurrentPoint?"未上榜":t.playerPointInfo[0].rank)+"\n                ")]):t._e(),t._v(" "),n("li",{attrs:{flex:"cross:center"}},[t._v("未完成任务 : "+t._s(t.wealth.noFinish))]),t._v(" "),n("li",{attrs:{flex:"cross:center"}},[t._v("财富值 : "+t._s(t.player.userCurrentPoint))]),t._v(" "),n("li",{attrs:{flex:"cross:center"}},[n("span",[t._v("结算倒计时"),n("br"),t._v(" "),t.downTime?n("span",{staticClass:"count_down"},[t._v("\n                            "+t._s(t.downTime)+"\n                        ")]):n("span",{staticClass:"count_down"},[t._v("\n                            "+t._s(Math.floor(t.differenceS/60)+"分")+t._s(t.differenceS%60>9?t.differenceS%60:"0"+t.differenceS%60)+"秒\n                        ")])])])]),t._v(" "),n("ul",{ref:"navs",staticClass:"wealth_navs"},t._l(t.navs,function(e,a){return n("router-link",{key:a,attrs:{tag:"li",to:e.path},nativeOn:{click:function(e){t.goScroll(a)}}},[t._v(t._s(e.name)+"\n                ")])})),t._v(" "),n("transition",{attrs:{name:"fade",mode:"out-in",appear:""}},[n("router-view",{attrs:{init:t.init}})],1)],1)])],1)},staticRenderFns:[]},c=n("VU/8")(r,l,!1,null,null,null);e.default=c.exports},l9VH:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("Dd8w"),s=n.n(a),i=n("NYxO"),o={name:"wealth_task",data:function(){return{active:0,navs:["任务","兑换","排行榜"],sendChange:{amount:null},page:1,maxPage:null,className:{loginPointList:"task1",rechargePointList:"task2",gamePointList:"task3"}}},methods:s()({},Object(i.b)(["setLogin","setMissonList"]),{gamePoint:function(t){var e=this,n=t.status;0==n&&"loginPointList"==t.taskType?this.$tool.CONFIRM({text:"您当前已累计登录"+t.currentGoal+"天，请在连续登录"+t.goal+"天后领取!"}):0==n&&"rechargePointList"==t.taskType?this.$tool.CONFIRM({text:"您当前存款任务未满足，请前往充值",okfun:function(){e.$router.push({path:"/recharge"})},nofun:function(){}}):0==n&&"gamePointList"==t.taskType&&this.$tool.CONFIRM({text:"您当前游戏任务未满足，请在完成游戏任务后领取!",okName:"开始游戏",okfun:function(){var n=e.providerTeam[t.providerId[0]];n.gameId&&e.$tool.playGameById(n.gameId),n.href&&e.$router.push({path:n.href})},nofun:function(){}}),1==t.status&&this.$api.applyRewardPoint({eventObjectId:t.id}).then(function(t){e.setMissonList(),e.$tool.SET_STATE({name:"player",content:t.data.newPoints,sub:"userCurrentPoint"}),e.$tool.setStore("player",e.player)})}}),components:{},mounted:function(){this.maxPage=Math.ceil(this.wealth.task.length/5)},watch:{wealth:function(){this.maxPage=Math.ceil(this.wealth.task.length/5)}},computed:s()({},Object(i.d)(["player","providerTeam","wealth"]))},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"wealth_task"},t._l(t.wealth.task,function(e,a){return n("li",{key:a,class:t.className[e.taskType],attrs:{flex:"cross:center"}},[n("div",{staticClass:"task_explain"},[n("div",[n("span",[t._v(t._s(e.title))]),n("p",[t._v(t._s(e.content))])])]),t._v(" "),n("div",{staticClass:"task_integral"},[t._v("财富值 : "+t._s(e.point))]),t._v(" "),n("div",{class:2==e.status?"not_finish":"wealth_btn",on:{click:function(n){t.gamePoint(e)}}},[t._v(t._s(["前往","领取",""][e.status]))])])}))},staticRenderFns:[]},l=n("VU/8")(o,r,!1,null,null,null);e.default=l.exports},rknY:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("Dd8w"),s=n.n(a),i=n("NYxO"),o=n("JR+O"),r=((new Date).getYear(),{data:function(){return{active:0,navs:["任务","兑换","排行榜"],sendChange:{point:null},rule:{},selfInfo:null}},methods:s()({},Object(i.b)(["setMissonList"]),{change:function(){var t=this;this.sendChange.point%10||!this.sendChange.point?this.$tool.ALERT({text:"财富值兑换真钱必须为10的倍数",type:"warn"}):this.sendChange.point>this.selfInfo.userCurrentPoint?this.$tool.ALERT({text:"兑换财富值不能大于"+this.selfInfo.userCurrentPoint,type:"warn"}):this.$api.applyPointToCredit(this.sendChange).then(function(e){t.setMissonList(),t.$tool.SET_STATE({name:"player",content:t.player.userCurrentPoint-t.sendChange.point,sub:"userCurrentPoint"}),t.$tool.setStore("player",t.player),t.$tool.ALERT({text:"财富值兑换申请成功"})})}}),components:{Speed:o.a},mounted:function(){var t=this;this.$api.getPointRule().then(function(e){t.rule=e.data.list[t.player.levelVal]}),this.$api.get().then(function(e){var n={preDailyAppliedPoint:e.data.preDailyAppliedPoint,preDailyExchangedPoint:e.data.preDailyExchangedPoint,userCurrentPoint:e.data.userCurrentPoint};t.selfInfo=n})},created:function(){},computed:s()({},Object(i.d)(["player"]))}),l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.selfInfo?n("div",{staticClass:"wealth_change"},[n("div",{staticClass:"change_limit",attrs:{flex:"cross:center main:center"}},[n("div",[n("speed",{attrs:{name:"今日积分 : ",val:t.selfInfo.preDailyAppliedPoint,max:t.rule.dailyGetMaxPoint||1e3,keep:"true"}}),t._v(" "),n("speed",{attrs:{name:"今日兑换 : ",val:t.selfInfo.preDailyExchangedPoint,max:t.rule.preDailyExchangeMaxPoint||1e3,keep:"true"}})],1)]),t._v(" "),n("div",{staticClass:"change_form",attrs:{flex:"cross:center main:center"}},[n("ul",[n("li",[n("div",{staticClass:"name"},[t._v("财富值")]),t._v(" "),n("div",{staticClass:"text"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.sendChange.point,expression:"sendChange.point"}],attrs:{type:"text",placeholder:"请输入兑换积分"},domProps:{value:t.sendChange.point},on:{input:function(e){e.target.composing||t.$set(t.sendChange,"point",e.target.value)}}})])]),t._v(" "),t._m(0),t._v(" "),n("li",[n("div",{staticClass:"name"},[t._v("兑换真钱")]),t._v(" "),n("div",{staticClass:"text"},[t._v(t._s(t.sendChange.point/10)+" 元")])]),t._v(" "),n("li",[n("div",{staticClass:"wealth_btn",on:{click:t.change}},[t._v("兑换")])])])])]):t._e()},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("div",{staticClass:"name"},[this._v("兑换比例")]),this._v(" "),e("div",{staticClass:"text"},[this._v("10 : 1")])])}]},c=n("VU/8")(r,l,!1,null,null,null);e.default=c.exports}});