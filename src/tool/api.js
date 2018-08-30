import socketVue from '@/tool/socket-vue'
import config from '@/tool/config'
import tool from '@/tool'
import store from '@/store'

// 需本地暂存的数据调取方式
const findSession =(sendDate,data='')=>{
    let functionName = sendDate.functionName+data;
    let promise,sessionData= tool.getStore(functionName);
    if(sessionData){
        promise = new Promise((resolve, reject) => {resolve(sessionData)});
    }else{
        promise = WS.send(sendDate);
        promise.then(res=>{
            tool.setStore(functionName,res);
        });
    };
    return promise;
}


/****************************************创建ws对象************************************/
let WS= new socketVue(config,store);
let api = {};

/***************************************心机包***************************************/
//用于验证玩家webSocket链接是否有效。
api.authenticate = function(data){
    return WS.send({
        service:'player',
        functionName:'authenticate',
        data:data
    })
}

/***************************************服务器通知***************************************/
api.notifyNewMail = function(fun){
    return WS.from({
        service:'player',
        functionName:'notifyNewMail',
        fun:fun
    })
}

/***************************************玩家***************************************/
//从服务端获取验证码
api.sendSMSCodeToPlayer = function(data){
    return WS.send({
        service:'player',
        functionName:'sendSMSCodeToPlayer',
        data:data
    })
}
//获取玩家接收短信的事件类型
api.getSmsStatus = function(){
    return WS.send({
        service:'player',
        functionName:'getSmsStatus'
    })
}

//获取玩家接收短信的事件类型
api.setSmsStatus = function(data){
    return WS.send({
        service:'player',
        functionName:'setSmsStatus',
        data:data
    })
}

//修改玩家登录密码

api.updatePassword = function(data){
    return WS.send({
        service:'player',
        functionName:'updatePassword',
        data:data
    })
}

// 编辑玩家email

api.updatePlayerEmail = function(data){
    return WS.send({
        service:'player',
        functionName:'updatePlayerEmail',
        data:data
    })
}

//修改玩家电话
api.updatePhoneNumberWithSMS = function(data){
    return WS.send({
        service:'player',
        functionName:'updatePhoneNumberWithSMS',
        data:data
    })
}
// 通过验证码验证手机
api.verifyPhoneNumberBySMSCode = function(data){
    return WS.send({
        service:'player',
        functionName:'verifyPhoneNumberBySMSCode',
        data:data
    })
}

//从服务端获取验证码
api.captcha = function(){
    return WS.send({
        service:'player',
        functionName:'captcha'
    })
}

//获取手机验证码
api.getSMSCode = function(data){
    return WS.send({
        service:'player',
        functionName:'getSMSCode',
        data:data
    })
}
//玩家登录
api.login = function(data){
    return WS.send({
        service:'player',
        functionName:'login',
        data:data
    })
}
//退出登录
api.logout = function(data){
    return WS.send({
        service:'player',
        functionName:'logout',
        data:data
    })
}

//玩家开户
api.create = function(data){
    return WS.send({
        service:'player',
        functionName:'create',
        data:data
    })
}

//玩家账户注册用户名有效性验证
api.isValidUsername = function(data){
    return WS.send({
        service:'player',
        functionName:'isValidUsername',
        data:data
    })
}
//添加客户端访问记录
api.addClientSourceLog = function(data){
    return WS.send({
        service:'player',
        functionName:'addClientSourceLog',
        data:data
    })
}

// 玩家当前额度

api.getCreditDetail=function(data){
    return WS.send({
        service:'player',
        functionName:'getCreditDetail',
        data:data
    })
}
// 获取玩家最新额度信息
api.getCreditInfo=function(data){
    return WS.send({
        service:'player',
        functionName:'getCreditInfo',
        data:data
    })
}

// 登入后获取提款信息

api.getWithdrawalInfo=function(data){
    return WS.send({
        service:'player',
        functionName:'getWithdrawalInfo',
        data:data
    })
}

// 获取玩家站内信列表


api.getMailList=function(){
    return WS.send({
        service:'player',
        functionName:'getMailList',
    })
}


// 登入后获取提款信
api.readMail=function(data){
    return WS.send({
        service:'player',
        functionName:'readMail',
        data:data
    })
}
// 登入后获取提款信息

api.deleteMail=function(data){
    return WS.send({
        service:'player',
        functionName:'deleteMail',
        data:data
    })
}
// .删除所有邮件

api.deleteAllMail=function(data){
    return WS.send({
        service:'player',
        functionName:'deleteAllMail',
        data:data
    })
}

api.getPlayerMonthStatus=function(data){
    return WS.send({
        service:'player',
        functionName:'getPlayerMonthStatus',
        data:data
    })
}
// 获取玩家本月状态

api.getPlayerWeekStatus=function(data){
    return WS.send({
        service:'player',
        functionName:'getPlayerWeekStatus',
        data:data
    })
}


/***************************************玩家等级服务***************************************/

//获取全部玩家等级

api.getAllLevel=function(data){
    return findSession({
        service:'playerLevel',
        functionName:'getAllLevel',
        data:data
    })
}
//获取全部玩家等级

api.getLevelReward=function(data){
    return WS.send({
        service:'playerLevel',
        functionName:'getLevelReward',
        data:data
    })
}
//获取全部玩家等级

api.getLevel=function(data){
    return WS.send({
        service:'playerLevel',
        functionName:'getLevel',
        data:data
    })
}
/***************************************充值/提款***************************************/

//获取有效在线充值方式
api.getOnlineTopupType=function(data){
    return WS.send({
        service:'payment',
        functionName:'getOnlineTopupType',
        data:data
    })
}
//微信充值状态
api.getPlayerWechatPayStatus=function(data){
    return WS.send({
        service:'payment',
        functionName:'getPlayerWechatPayStatus',
        data:data
    })
}
//支付宝充值状态
api.getPlayerAliPayStatus=function(data){
    return WS.send({
        service:'payment',
        functionName:'getPlayerAliPayStatus',
        data:data
    })
}


//获取有效在线充值方式
api.createOnlineTopupProposal=function(data){
    return WS.send({
        service:'payment',
        functionName:'createOnlineTopupProposal',
        data:data
    })
}
//申请支付宝转账充值
api.requestAlipayTopup=function(data){
    return WS.send({
        service:'payment',
        functionName:'requestAlipayTopup',
        data:data
    })
}



//申请微信转账充值
api.requestWechatTopup=function(data){
    return WS.send({
        service:'payment',
        functionName:'requestWechatTopup',
        data:data
    })
}
//获取支付宝存款申请单列表
api.getAlipayTopupRequestList=function(data){
    return WS.send({
        service:'payment',
        functionName:'getAlipayTopupRequestList',
        data:data
    })
}
//获取微信存款申请单列表

api.getWechatTopupRequestList=function(data){
    return WS.send({
        service:'payment',
        functionName:'getWechatTopupRequestList',
        data:data
    })
}
//取消支付宝转账充值

api.cancelAlipayTopup=function(data){
    return WS.send({
        service:'payment',
        functionName:'cancelAlipayTopup',
        data:data
    })
}
//取消微信转账充值
api.cancelWechatTopup=function(data){
    return WS.send({
        service:'payment',
        functionName:'cancelWechatTopup',
        data:data
    })
}

//获取玩家申请的手工存款申请单.
api.getManualTopupRequestList=function(data){
    return WS.send({
        service:'payment',
        functionName:'getManualTopupRequestList',
        data:data
    })
}


//获取pms可用银行卡类型
api.requestBankTypeByUserName=function(data){
    return WS.send({
        service:'payment',
        functionName:'requestBankTypeByUserName',
        data:data
    })
}

//申请手工存款充值

api.requestManualTopup=function(data){
    return WS.send({
        service:'payment',
        functionName:'requestManualTopup',
        data:data
    })
}
//取消手工存款申请单


api.cancelManualTopupRequest=function(data){
    return WS.send({
        service:'payment',
        functionName:'cancelManualTopupRequest',
        data:data
    })
}




///兑换奖品申请
api.applyBonus=function(data){
    return WS.send({
        service:'payment',
        functionName:'applyBonus',
        data:data
    })
}

///玩家可以取消已提交的兑奖申请。(前提是提案状态为未处理)

api.cancelBonusRequest=function(data){
    return WS.send({
        service:'payment',
        functionName:'cancelBonusRequest',
        data:data
    })
}

// 登入后获取提款信息

api.getTopupList=function(data){
    return WS.send({
        service:'payment',
        functionName:'getTopupList',
        data:data
    })
}

// 登入后获取提款信息

api.getBonusRequestList=function(data){
    return WS.send({
        service:'payment',
        functionName:'getBonusRequestList',
        data:data
    })
}


/***************************************游戏***************************************/
api.getGameGroupInfo=function(data){
    return findSession({
        service:'game',
        functionName:'getGameGroupInfo',
        data:data
    },data.code)
}
api.searchGame=function(data){
    return WS.send({
        service:'game',
        functionName:'searchGame',
        data:data
    })
}

api.getLoginURL=function(data){
    return WS.send({
        service:'game',
        functionName:'getLoginURL',
        data:data
    })
}

//不需要玩家登陆 试玩
api.getTestLoginURLWithOutUser=function(data){
    return WS.send({
        service:'game',
        functionName:'getTestLoginURLWithOutUser',
        data:data
    })
}

//获取玩家所在平台的所有游戏提供商列表。

api.getProviderList=function(){
    return WS.send({
        service:'game',
        functionName:'getProviderList'
    })
}

//获取玩家所在平台的所有游戏提供商列表。

api.transferToProvider=function(data){
    return WS.send({
        service:'game',
        functionName:'transferToProvider',
        data:data
    })
}

//获取玩家所在平台的所有游戏提供商列表。
api.transferFromProvider=function(data){
    return WS.send({
        service:'game',
        functionName:'transferFromProvider',
        data:data
    })
}

//修改玩家游戏账号的密码
api.modifyGamePassword = function(data){
    return WS.send({
        service:'game',
        functionName:'modifyGamePassword',
        data:data
    })
}
//收藏游戏
api.addFavoriteGame = function(data){
    return WS.send({
        service:'game',
        functionName:'addFavoriteGame',
        data:data
    })
}

//获取收藏游戏
api.getFavoriteGames = function(data){
    return WS.send({
        service:'game',
        functionName:'getFavoriteGames',
        data:data
    })
}
//删除收藏游戏

api.removeFavoriteGame = function(data){
    return WS.send({
        service:'game',
        functionName:'removeFavoriteGame',
        data:data
    })
}
/***************************************活动、积分***************************************/
//获取奖励活动列表
api.getRewardList = function(data){
    return findSession({
        service:'reward',
        functionName:'getRewardList'
    })
}
//获取奖励活动列表
api.applyRewardEvent = function(data){
    return WS.send({
        service:'reward',
        functionName:'applyRewardEvent',
        data:data
    })
}
//获取玩家消费返点额度
api.getConsumeRebateAmount = function(data){
    return WS.send({
        service:'reward',
        functionName:'getConsumeRebateAmount',
        data:data
    })
}
//玩家向系统提前申请未结算的洗码。
api.requestConsumeRebate = function(data){
    return WS.send({
        service:'reward',
        functionName:'requestConsumeRebate',
        data:data
    })
}


//获取奖励活动列表
api.getPlayerRewardList = function(data){
    return WS.send({
        service:'reward',
        functionName:'getPlayerRewardList',
        data:data
    })
}
//申请优惠代码
api.applyPromoCode = function(data){
    return WS.send({
        service:'reward',
        functionName:'applyPromoCode',
        data:data
    })
}


//一键领取所有可获得的签到奖励。若没有，则返回报错。
api.getSignBonus = function(data){
    return WS.send({
        service:'reward',
        functionName:'getSignBonus',
        data:data
    })
}
//当有签到奖励时，显示每一阶的领取状态
api.getSignInfo = function(data){
    return WS.send({
        service:'reward',
        functionName:'getSignInfo',
        data:data
    })
}

//获取优惠代码
api.getPromoCode = function(data){
    return WS.send({
        service:'reward',
        functionName:'getPromoCode',
        data:data
    })
}

//获取奖励活动列表
api.getMissonList = function(data){
    return WS.send({
        service:'rewardPoints',
        functionName:'getMissonList',
        data:data
    })
}

//手动申请积分活动奖励

api.applyRewardPoint = function(data){
    return WS.send({
        service:'rewardPoints',
        functionName:'applyRewardPoint',
        data:data
    })
}
//手动申请积分活动奖励
api.getRewardPointsRanking = function(data){
    return WS.send({
        service:'rewardPoints',
        functionName:'getRewardPointsRanking',
        data:data
    })
}
//积分兑换真钱
api.applyPointToCredit = function(data){
    return WS.send({
        service:'rewardPoints',
        functionName:'applyPointToCredit',
        data:data
    })
}
//积分规则

api.getPointRule = function(data){
    return findSession({
        service:'rewardPoints',
        functionName:'getPointRule',
        data:data
    })
}


/***************************************玩家消费记录服务***************************************/

//  根据条件查询消费记录信息
api.search = function(data){
    return WS.send({
        service:'consumption',
        functionName:'search',
        data:data
    })
}

/***************************************平台***************************************/

//  请对应FPMS 功能（前端功能模版配置）
api.getTemplateSetting = function(data){
    return findSession({
        service:'platform',
        functionName:'getTemplateSetting',
        data:data
    })
}

// 获取平台公告
api.getPlatformAnnouncements = function(data){
    return findSession({
        service:'platform',
        functionName:'getPlatformAnnouncements',
        data:data
    })
}
// 获取平台信息
api.getConfig = function(data){
    return findSession({
        service:'platform',
        functionName:'getConfig'
    })
}
// 搜索平台投注记录
api.searchConsumptionRecord = function(data){
    return WS.send({
        service:'platform',
        functionName:'searchConsumptionRecord',
        data:data
    })
}

// 埋点
api.clickCount = function(data){
    return WS.send({
        service:'platform',
        functionName:'clickCount',
        data:data
    })
}

// 獲取玩家基本信息
api.get = function(data){
    return WS.send({
        service:'player',
        functionName:'get',
        data:data
    })
}
//获取玩家等级
api.getLevel = function(data){
    return WS.send({
        service:'playerLevel',
        functionName:'getLevel',
        data:data
    })
}

//修改玩家的支付信息
api.updatePaymentInfo = function(data){
    return WS.send({
        service:'player',
        functionName:'updatePaymentInfo',
        data:data
    })
}

//登录后获取 手机验证码 更改支付信息
api.sendSMSCodeToPlayer = function (data) {
    return WS.send({
        service:'player',
        functionName:'sendSMSCodeToPlayer',
        data:data
    })
}


//获取省份列表
api.getProvinceList = function(){
    return WS.send({
        service:'payment',
        functionName:'getProvinceList'
    })
}

//获取市列表
api.getCityList = function(data){
    return WS.send({
        service: 'payment',
        functionName: 'getCityList',
        data
    })
}
//获取区县列表

api.getDistrictList = function(data){
    return WS.send({
        service:'payment',
        functionName:'getDistrictList',
        data
    },data.provinceId + data.cityId)
}

//获取银行卡类型列表
api.getBankTypeList = function(){
    return WS.send({
        service:'payment',
        functionName:'getBankTypeList',
    })
}

/***************************************游戏***************************************/
//获取银行卡类型列表
api.getGameGroupTreeInfo = function(data){
    return findSession({
        service:'game',
        functionName:'getGameGroupTreeInfo',
        data:data
    },data.code)
}

/***************************************其他***************************************/

//单一电话导入现有任务-电销服务
api.insertPhoneToTask = function(data){
    return WS.send({
        service:'dxmission',
        functionName:'insertPhoneToTask',
        data:data
    })
}
//单一电话导入现有任务-电销服务
api.submitDXCode = function(data){
    return WS.send({
        service:'dxmission',
        functionName:'submitDXCode',
        data:data
    })
}
//请求回电域名配置
api.callBackToUser = function(data){
    return WS.send({
        service:'player',
        functionName:'callBackToUser',
        data:data
    })
}
//请求回电域名配置
api.getOMCaptcha = function(){
    return WS.send({
        service:'player',
        functionName:'getOMCaptcha'
    })
}
export default api
export {store}
