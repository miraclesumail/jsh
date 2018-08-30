// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {store} from './tool/api'
import router from './router'
import tool from './tool'
import api from './tool/api'
import polyfill from './tool/polyfill'
import ES6Promise from 'es6-promise'
import VueLazyload from 'vue-lazyload'
import VueClipboard from 'vue-clipboard2'

/***********全局组件************/
import Crumbs from './components/crumbs'

// import LinkNav from './components/LinkNav'
import Scroll from './components/scroll'
/************移动端************/
import vueTouch from './tool/vue-touch'

/* eslint-disable*/
Vue.config.productionTip = false;

/**********************************兼容Promise*********************************/
polyfill();
ES6Promise.polyfill();


/**********************************为移动端设置*********************************/
/*     绑定点击效果       */
document.body.addEventListener('touchstart', function () {});

/*  设置REM(100PX=>1REM) */
;(function () {
	var docEl = document.documentElement;
	var resize = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var setRem = function () {
		var screenWidth = docEl.clientWidth || window.screen.width || 360;
		var screenHeight = docEl.clientHeight || window.screen.Height || 360;
		var remWidth = screenWidth<screenHeight ? screenWidth :screenHeight;
		store.commit("SET_STATE",{name:'window',content:{
			height:docEl.clientHeight || window.screen.height || 360,
			width:docEl.clientWidth || window.screen.width || 360
		}});
		docEl.style.fontSize = (100 * screenWidth / 750) + 'px';
        store.commit('SET_STATE', { name: 'rem', content: 100 * screenWidth / 750});
	};
	window.addEventListener('resize', setRem, false);
	document.addEventListener('DOMContentLoaded', setRem, false);
	setRem();
})();

/**********************************路由守卫*********************************/
//刷新页面
let player=tool.getStore('player');
player && store.commit('SET_STATE', { name: 'player', content: player});
//刷新恢复
if(player && player.playerId){
    api.authenticate({token:player.token,_closeCONFIRM:true,_silence:true}).then(res=>{
        if(!location.href.includes("home/open")){
            store.dispatch('getDeposit');
            store.dispatch('setUnreadMail');
        }
    }).catch(err => {
        store.dispatch('setLogout');
        tool.router.push("/home/login");
        store.commit('SET_STATE', { name: 'history', content: location.pathname});
    })
}

//不需要登录拦截的路由
const routerPath = ['index','home','lobby','access','register','login','vip','activity','activityDetails','lobbyType','open','games'];

let body = document.getElementsByTagName('body')[0];
router.beforeEach((to, from, next) => {
    // 滚动
    window.scrollTo(0, 0);
    // 背景色控制
    if(['home','index','account','navsMore','gameTransfer','modifySmsSet'].includes(to.name)){
        body.style.background='#f1f1f1';
    }else{
        body.style.background='none';
    }
    if (routerPath.includes(to.name)) {
        next();
    } else {
        player = tool.getStore('player');
        if (player && player.playerId) {
            next();
        } else {
            store.commit('SET_STATE', { name: 'history', content:{path:to.path,query:to.query}});
            body.style.background='none';
            next('/home/login')
        }
    }

})
/**********************************vue全局插件*********************************/
// 图片懒加载 https://github.com/hilongjw/vue-lazyload
import loading from '@/assets/default.jpg'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading:loading,
    attempt: 1
})
// 复制插件 https://www.npmjs.com/package/vue2-clipboards
Vue.use(VueClipboard);
/**********************************APP应用判断*********************************/
let versions= tool.versions();
let isAPP=location.href.includes("isAPP") ||tool.getStore("isAPP");
if(isAPP || versions.isAndroidApp ||versions.isIosApp){
    tool.setStore("isAPP",isAPP)
    window.isAPP=4;
}
/**********************************全局组件*********************************/
Vue.component('crumbs', Crumbs)
// Vue.component('link-nav', LinkNav)
Vue.component('scroll', Scroll)

/**********************************vue指令*********************************/

/**
 * 获取焦点
 */
Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
})


/**
 * 限制输入为数字
 */
Vue.directive('pattern', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el,val) {
        el.oninput = function(e) {
            let obj;
            obj = e.currentTarget;
            obj.value=obj.value.replace(/[^0-9]/g,"");
        }
    }
});

/**
 * 限制输入为数字
 */
Vue.directive('space', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el,val) {
        el.oninput = function(e) {
            let obj;
            obj = e.currentTarget;
            obj.value=obj.value.replace(/^ +| +$/g,'');
        }
    }
});


/**
 * 埋点
 */

Vue.directive('count', {
    update: function (el, val) {
        let nameArr = val.value.split('|');
        let sendData={
            _silence: true,
            _closeCONFIRM: true,
            device:window.isAPP?'APP玩家':'H5玩家',
            pageName: nameArr[0],
            buttonName: nameArr[1],
            registerClickApp: true
        };
        el.onclick = function (el, val) {
            api.clickCount(sendData)
        }
    }
})
/**********************************功能函数绑定*********************************/
Vue.prototype.$tool = tool
Vue.prototype.$api = api
Vue.prototype.$versions =versions;
Vue.prototype.$client =window.isAPP || 2;
store.commit('SET_STATE', { name: 'isAPP', content:{path:window.isAPP || 2}});
/**********************************VUE创建*********************************/

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
