webpackJsonp([14],{tii9:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"sign_in"},[i("div",{staticClass:"sign_box",attrs:{flex:"main:center cross:center"}},[i("div",{ref:"map",staticClass:"map_top"},[i("div",{staticClass:"map"}),t._v(" "),i("div",{staticClass:"map_content"},[i("div",{staticClass:"signinmapline"},[i("div",{staticClass:"bottom"},[i("div",{staticClass:"btn-sign",on:{click:t.signIn}}),t._v(" "),i("div",{staticClass:"sign_open",on:{click:t.open}}),t._v(" "),t._m(0)])]),t._v(" "),t._m(1),t._v(" "),t._l(t.list,function(s,e){return i("div",{key:e,class:s.mapDot},[i("div",{staticClass:"map_dot",class:s.isSignIn?"dot_active":"dot_noactive"},[i("span",{staticClass:"dot_circle"}),t._v(" "),i("transition",{attrs:{name:"dot"}},[i("span",{directives:[{name:"show",rawName:"v-show",value:s.isSignIn,expression:"item.isSignIn"}],staticClass:"dot_text_active"})]),t._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:!1===s.isSignIn,expression:"item.isSignIn===false"}],staticClass:"dot_text"},[t._v(t._s(s.bonus)+"元")]),t._v(" "),i("span",{class:s.isSignIn?"dot_day_active":"dot_day_noactive"})],1)])}),t._v(" "),t._l(t.list,function(s){return s.isSignIn?i("div",{key:s.mapDot,staticClass:"game_active",class:s.mapLine}):t._e()})],2)])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"sign_ship"},[s("div",{staticClass:"compass_bottom"},[s("div",{staticClass:"compass_top"})]),this._v(" "),s("div",{staticClass:"sign_title"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"first_dot"},[s("div",{staticClass:"dot_active map_dot"},[s("span",{staticClass:"dot_circle"}),this._v(" "),s("span",{staticClass:"dot_text_active"})])])}]},n=i("VU/8")({name:"sign-in",data:function(){return{currentStep:0,canStep:0,mapDot:["second_dot","third_dot","four_dot","fifth_dot","sixth_dot","seventh_dot","eighth_dot"],mapLine:["gameline_first","gameline_second","gameline_third","gameline_fourth","gameline_fifth","gameline_sixth","gameline_seventh"],list:[],isGet:!0,MockData:[{title:1}]}},methods:{open:function(){this.$tool.CONFIRM({title:"签到细则",text:'<div style="text-align: left;">1.会员每日以任何存款方式完成累计存款200元，投注额3000（不限大厅）即可领取签到奖励；<br/>2.会员需要连续登陆签到才可以领取相应的奖励，如签到天数中断，签到将会重新累计；<br/>3.礼金会在5分钟内审核添加，享受签到礼金会员提款需要达到（4倍）投注额方可提出；<br/>4.签到存款及投注额累积时间为每日00：00：00至23：59：59；<br/>5.每周一00：00：00开始计算新的七天签到，将无法领取上一周的礼金；<br/>7.金世豪娱乐城具有对星级会员俱乐部所有内容的修改权及解释权。</div>'})},signIn:function(){var t=this;return 0===this.canStep?(this.$tool.ALERT({type:"error",text:"签到条件不符合"}),!1):this.currentStep===this.canStep&&0!==this.canStep?(this.$tool.ALERT({type:"error",text:"当前已经签到了"}),!1):(this.$api.getSignBonus().then(function(s){s.data.forEach(function(s,i,e){t.currentStep++,t.list.filter(function(s,i,e){t.currentStep===s.step&&(s.isSignIn=!0)})})}),!1)}},mounted:function(){var t=this;this.$api.getSignInfo().then(function(s){var i=s.data.list||[];i.filter(function(s,i,e){s.isSignIn=2==s.status,s.mapDot=t.mapDot[i],s.mapLine=t.mapLine[i],s.step=i+1,2===s.status&&(t.currentStep=i+1),1===s.status&&(t.canStep=i+1)}),t.list=i})}},e,!1,null,null,null);s.default=n.exports}});