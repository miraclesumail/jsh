let Tool = {}
import store from '@/store'   //引入vuex
/*************************************函数扩展**************************************/

/**
 * 打印简写
 * log()
 */
window.log = function (val) {
    window.console.log(val)
}


/**
 * 删除数组中的其中一项
 * let arr = [1,2,3,55]
 * let item = 3
 * arr.remove(item)
 *@param {Array} 数组arr
 *@param {*} 数组中的某一项item
 */
Array.prototype.remove = function (val) {
    for (let i = 0; i < this.length;) {
        if (this[i] == val) {
            this.splice(i, 1);
        } else {
            i++;
        }
    }
};
/**
 * 小数转百分比
 * let n=0.1
 * arr.toPercent()
 * @param {Number} 数字n
 */
Number.prototype.toPercent = function (n = 0) {
    return (Math.round(this * 10000) / 100).toFixed(n) + '%';
}

/**
 * 保留多位数不四舍五入
 * let n=0.1
 * arr.toPercent()
 * @param {Number} 数字n
 */
Number.prototype.decimals = function (n = 2) {
    return (Math.floor(this * Math.pow(10,n)) / Math.pow(10,n)).toFixed(n);
}

/**
 * 时间对象格式转换
 * let time=new Date()
 * let format = "yyyy-MM-dd hh:mm:ss"
 * let str=time.format(format)
 * @param {Date} 时间对象time
 * @param {String} 时间转换格式format
 *
 */
Date.prototype.format = function (format) {
    let o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};
//格林斯 时间格式转换
String.prototype.getDate = function () {
    let date = new Date(this);
    return date.format("yyyy-MM-dd hh:mm:ss");
}


/******************************************功能函数*******************************************/

/**
 * GMT转普通格式
 Tool.getFormat(new Date(new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000)),
 *
 */
Tool.getFormat = function (nTime) {
    let format = "";
    format += nTime.getFullYear() + "-";
    format += (nTime.getMonth() + 1) < 10 ? "0" + (nTime.getMonth() + 1) : (nTime.getMonth() + 1);
    format += "-";
    format += nTime.getDate() < 10 ? "0" + (nTime.getDate()) : (nTime.getDate());
    format += "T";
    format += nTime.getHours() < 10 ? "0" + (nTime.getHours()) : (nTime.getHours());
    format += ":";
    format += nTime.getMinutes() < 10 ? "0" + (nTime.getMinutes()) : (nTime.getMinutes());
    format += ":00";
    return format;
}

/**
* 时间秒数格式化
* @param s 时间戳（单位：秒）
* @returns {*} 格式化后的时分秒
 *
 */
Tool.toTime = function(s) {
    let t;
    if(s > -1){
        let hour = Math.floor(s/3600);
        let min = Math.floor(s/60) % 60;
        let sec = s % 60;
        if(hour < 10) {
            t = '0'+ hour + ":";
        } else {
            t = hour + ":";
        }
        if(min < 10){t += "0";}
        t += min + ":";
        if(sec < 10){t += "0";}
        t += sec;
    }
    return t;
}
/**
 * 字符串数组转BASE64
 * let buffer='[137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 80, 0, 0, 0, 30, 8, 3, 0, 0, 0,…]'
 * let BASE64=Tool.arrayBufferToBase64(buffer)
 * @param {String} 时间转换格式buffer
 *
 */
Tool.arrayBufferToBase64 = function (buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/png;base64,' + window.btoa(binary);
};

/**
 * 数组对象寻值
 * let arr=[{name:'yhank01',rank:'1'},{name:'yhank02',rank:'2'}]
 * let obj=Tool.findVal(arr,'rank',2)
 * val默认为0   key默认为isImg  是平台设置寻值需要
 *
 */
Tool.findVal = function (arr, val = 0, key = 'isImg') {
    let map = {};
    for (let i in arr) {
        if (arr[i][key] == val) {
            map = arr[i];
            map._index = i;
            break;
        }
    }
    return map;
};
/**
 * 数组对象寻值
    this.$tool.changeKey(this.sendData, 'type', 'providerId', true);
 * val默认为0   key默认为isImg  是平台设置寻值需要
 *
 */
Tool.changeKey = function (obj, oldKey, newKey, isObj) {
    let tmp = Object.assign({}, obj);
    if (isObj) {
        tmp[newKey] = tmp[oldKey];
        return tmp;
    }
    for (let key in tmp) {
        tmp[key][newKey] = tmp[key][oldKey];
    }
    return tmp;
};


/**
 * 跳转
 * 根据传入至判断是路由跳转还是新开窗口
 *
 */
Tool.goto = function (href='') {
    if (href.includes("http")) {
        window.open(href)
    } else {
        this.router.push(href)
    }
}

/*
*
*	支付宝调用
*	type 1=>扫一扫和二维码集成，点击一个按钮，立即就跳出支付页面 需要传入二维码地址 qrUrl
*
*/

Tool.Alipay = function (type, qrUrl) {
    if (type == 1) {
        let url = qrUrl.replace(/(^\s+)|(\s+$)/g, "");
        url = url + "?_s=web-other";
        url = encodeURIComponent(url);
        return "alipayqr://platformapi/startapp?saId=10000007&qrcode=" + url;
    }
}
/******************************************验证函数*******************************************/

/**
 * 用户名
 * 验证规则：
 *
 */

Tool.name = function (value, opt = {}) {
    let prefix = store.state.platform.accountPrefix;
    let max = store.state.platform.accountMaxLength;
    let min = store.state.platform.accountMinLength;
    if (!value) return `用户名不能为空`;
    if (prefix && value.charAt(0) != prefix)return `用户名以小写${prefix}开头`;
    if (!(/^[a-z0-9]+$/).test(value))return '用户名由小写字母和数字组成';
    if (value.length < min || value.length >max) return `请输入${min}~${max}位用户名`;
}

/**
 * 真实名字
 */

Tool.realName = function (val) {
    val = val.replace(/·/, '');
    if (!val.match(/^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF |·]+$/g))return "输入信息必须为中文，请重新输入";
}
/**
 * 密码
 */
Tool.password = function (val) {
    let max = store.state.platform.passwordMaxLength;
    let min = store.state.platform.passwordMinLength;
    if (!val)return '密码不能为空';
    if (val.match(/\s+/g))return '密码不能包含空格';
    if (val.length < min || val.length > max)return `密码为${min}-${max}位数字或字母`;
}


/**
 * 手机号
 */
Tool.phoneNumber = function (value, opt = {}) {
    if (!(/^1[3456789]\d{9}$/.test(value)))return "请输入正确的手机号码";
}

/**
 *  短信验证码
 *
 */
Tool.smsCode = function (val) {
    if (!val)return "短信验证码不能为空";
    if (val.length != 4)return "请输入4位短信验证码";
}
/**
 *  图片验证码
 *
 */
Tool.captcha = function (val) {
    if (!val)return "图片验证码不能为空！";
    if (val.length != 4)return "请输入4位图片验证码";
}

/**
 *  银行卡
 *
 */
Tool.realBankNumber = function (val) {
    let strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if (strBin.indexOf(val.substring(0, 2)) == -1 || val.includes("*"))return '银行卡号不符合规范';
    if (val.length < 16 || val.length > 21)return '银行卡号长度必须在16到21之间';
}

/**
 *  玩游戏通过游戏ID启动
 *
 */
Tool.playGame = function (gameId,free=false) {
    if (!gameId) {
        Tool.ALERT({text: "敬请期待", type: "warn"});
        return;
    }
    window.open(location.origin+"#/home/open?gameId="+gameId +"&free="+free);
    return;
}


/**
 *  获取浏览器、手机等信息
 */
Tool.versions = function () {
    let u = navigator.userAgent, app = navigator.appVersion;
    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq",//是否QQ,
        isIosApp:/^.+(Mobile\/\w+)\s?$/.test(u),
        isAndroidApp: window.native ? true : false
    };

}
/*************************************手机数据库操作**************************************/


/*************************************MUTATIONS常用函数**************************************/
Tool.SET_STATE = function (opt) {
    store.commit('SET_STATE', opt);
}
Tool.ALERT = function (opt) {
    store.commit('ALERT', opt);
}
Tool.CONFIRM = function (opt) {
    store.commit('CONFIRM', opt);
}

/****************************************Storage************************************/
Tool.setStore = function (key, val) {
    sessionStorage.setItem(key, JSON.stringify(val))
};
Tool.getStore = function (key) {
    return JSON.parse(sessionStorage.getItem(key));
};

Tool.setLStore = function (key, val) {
    localStorage.setItem(key, JSON.stringify(val))
};
Tool.getLStore = function (key) {
    return JSON.parse(localStorage.getItem(key));
};


export default Tool
export {Tool}
