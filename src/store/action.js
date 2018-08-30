
import $api from '../tool/api'
import $tool from '../tool'
import { Store } from '../../node_modules/vuex';

export default {
    //用户登录
    setLogin(store,resData){

        let player=$tool.getStore('player')||{};
        for(let key in store.state.player){
            console.log(key)
            if(key=='levelVal'){
                player[key]=resData.data.playerLevel.value;
            }else if(key=='levelName'){
                player[key]=resData.data.playerLevel.name;
            }else if(key!='token'){
                player[key]=resData.data[key];
            }
        }

        if(resData.token)player.token=resData.token;
        $tool.setStore("player",player);
        store.commit('SET_STATE',{name:'player',content:player});
        store.dispatch('getDeposit');
        store.dispatch('setUnreadMail');
    },
    	//设置未读站内信
    setUnreadMail(store,fun){
        $api.getMailList({_silence:true,_closeCONFIRM:true}).then(res=>{
            let noRead = 0;
            res.data && res.data.map((item,index)=>{
                if(!item.hasBeenRead)noRead++;
            })
            store.commit('SET_STATE',{name:'noReadMail',content:noRead});
        })
    },
    //用户登出
    setLogout(store,fun){
        let player=$tool.getStore('player');
        for(let key in player){
            player[key]='';
        }
        store.commit('SET_STATE',{name:'player',content:player});
        $tool.setStore("player",player);
        $tool.router.push("/")
        if(typeof fun == 'function')fun();
    },
    //设置钱包
    setWallet(store,fun){
        $api.getCreditDetail({_silence:true}).then(res=>{
            let wallet={
                credit:res.data.credit,
                gameCredit:0,
                lockedCredit:0,
                totalCredit:0,
                data:res.data,
                lockedCreditId:[]
            };
            //将游戏里的额度,不统计小数位
            res.data.gameCreditList.map((item,index)=>{
                if(!store.state.reProvider.includes(item.providerId) && item.validCredit != 'unknown'){
                    wallet.gameCredit += Math.floor(item.validCredit);
                }
                if(item.status==1&& item.validCredit =='unknown'){
                    console.log(item.nickName+'额度收录异常：unknown')
                }
            });

            res.data.lockedCreditList.map((item,index)=>{
                wallet.lockedCredit += Number(item.lockCredit);
                if(item.lockCredit>1){
                    item.list.map((val,index)=>{
                        wallet.lockedCreditId.push(val.providerId)
                    })
                }
            });

            wallet.totalCredit=Number(wallet.credit + wallet.lockedCredit + wallet.gameCredit).decimals();
            wallet.gameCredit =Number(wallet.gameCredit).decimals()
            wallet.credit =Number(wallet.credit).decimals()
            wallet.lockedCredit =Number(wallet.lockedCredit).decimals()
            store.commit('SET_STATE',{name:"wallet",content:wallet});
            // store.dispatch('setLevel');
            if(typeof fun == 'function')fun(res);
        })
    },
    //设置财富值信息
    setMissonList(store,fun){
        $api.authenticate({_silence:true,token:store.state.player.token,_closeCONFIRM:true}).then(res=>{
            $api.getMissonList({_silence:true}).then(res=>{
                let task = [];
                let noFinish=0;
                let taskName = ['loginPointList','rechargePointList','gamePointList'];
                taskName.map((val,key)=>{
                    res.data[val].map((item,index)=>{
                        if(item.gradeName==store.state.player.levelName){
                            item.taskType=val;
                            task.push(item);
                            if(item.status<2){
                                noFinish++;
                            }
                        }
                    })
                });
                store.commit('SET_STATE',{name:'wealth',content:res.data.pointRanking,sub:'ranking'});
                store.commit('SET_STATE',{name:'wealth',content:task,sub:'task'});
                store.commit('SET_STATE',{name:'wealth',content:noFinish,sub:'noFinish'});
                store.commit('SET_STATE',{name:'wealth',content:res.data.playerPointInfo,sub:'playerPointInfo'});
                if(typeof fun == 'function')fun();
            })
        }).catch(err=>{
            $tool.router.push("/home/login")
        })
    },
    //用户等级信息
    setLevel(store,fun){
        let userLevel =store.state.player.levelVal;
        let level = {};
        level.value =userLevel;
        let index = 0;
        $api.getAllLevel({_silence:true}).then(res=>{
            fun&&fun(res);
            if(userLevel <2){
                level.upBetMax =  res.data[userLevel+1].levelUpConfig[1].consumptionLimit;
                level.upDepositMax = res.data[userLevel+1].levelUpConfig[0].topupLimit;
            }
            if(userLevel >0){
                level.downBetMax = res.data[userLevel].levelDownConfig[0].consumptionMinimum
                level.downDepositMax = res.data[userLevel].levelDownConfig[0].topupMinimum
            }
            $api.getPlayerMonthStatus({_silence:true}).then(res2=>{
                if(userLevel==0 || res2.data.topUpAmount >= level.downDepositMax ||res2.data.consumptionAmount >= level.downBetMax){
                    level.keep = true;
                }
                if(userLevel==0||(userLevel==1 && level.keep)){
                    level.status="升级中"
                }else if(userLevel==2 && level.keep){
                    level.status="已保级"
                }else if((userLevel==2 && !level.keep) || (userLevel==1 && !level.keep) ){
                    level.status="保级中"
                }
                level.depositMonthVal=res2.data.topUpAmount;
                level.betMonthVal=res2.data.consumptionAmount;
                setState()
            })
        })
        $api.getTopupList({_silence:true,startTime:new Date(new Date().setHours(0, 0, 0, 0))}).then(res=>{
            level.depositDayVal = res.data.stats.totalAmount;
            setState()
        })
        $api.getPlayerWeekStatus({_silence:true}).then(res=>{
            level.betWeekVal = res.data.consumptionAmount;
            setState()
        })
        function setState(){
            ++index;
            if(index >2){
                if(level.keep && level.value <2){
                    level.show = [
                        {
                            name:"日存款",
                            now:level.depositDayVal,
                            max:level.upDepositMax
                        },
                        {
                            name:"周投注",
                            now:level.betWeekVal,
                            max:level.upBetMax
                        }
                    ]
                }else{
                    level.show = [
                        {
                            name:"月存款",
                            now:level.depositMonthVal,
                            max:level.downDepositMax
                        },
                        {
                            name:"月投注",
                            now:level.betMonthVal,
                            max:level.downBetMax
                        }
                    ]
                }
                store.commit('SET_STATE',{name:'level',content:level})
            }
        }
    },
    //获取存款优惠信息
    getRewards(store,fun){
        $api.getRewardList().then(res=>{
            let rewardList = res.data || [];
            let temp=[]
            rewardList.map((item,index)=>{
                // 优惠的code包含_self为可在存款时申请的优惠，需后台设置配合
                if(item.code.includes("_self")){
                    temp.push({name:item.name,code:item.code})
                }
            })
            store.commit('SET_STATE',{name:'depositDiscount',content:temp});
        })
    },
    //获取pms可用银行卡类型type为存款类型，默认全部 1==>手工 2==>商户 3==>个人支付宝 4==>个人微信
    getDeposit(store,type){
        let apiName=['requestBankTypeByUserName','getOnlineTopupType','getPlayerAliPayStatus','getPlayerWechatPayStatus']
        let depositKey=['hand','online','alipay','wechat']
        if(type){
            setDeposit($api[apiName[type-1]],type);
        }else{
            apiName.map((item,index)=>{
                setDeposit($api[item],index+1)
            })
        }
        function setDeposit(api,index){
            let sendData={clientType:store.state.isAPK};
            if(index==2)sendData.merchantUse=1;
            sendData._silence=true;
            api(sendData).then(res=>{
                let temp=res.data;
                if(index==1){
                    temp =res.data.data || [];
                    temp.sort(function(a,b){return a.depositMethod>b.depositMethod;});
                }
                if(index==2){
                    temp.sort(function(a,b){return a.type>b.type;});
                }
                if(index==3 ||index==4){
                    if(temp && temp.valid){
                        temp = res.data;
                    }else{
                        temp=false;
                    }
                }
                store.commit('SET_STATE',{name:'deposit',content:temp,sub:depositKey[index-1]});
            })
        }
    },
    //获取游戏列表 displayName(_mobile==>移动端)
    getGameList(store,fun){
        let gameGroup= $tool.getStore('gameGroup') || {};
        if(!gameGroup.code){
            $api.getGameGroupTreeInfo({containGames:false}).then(res=>{
                let temp=res.data.gameGroups||[];
                let _mobile = $tool.findVal(temp,'_mobile','displayName');
                gameGroup.code=_mobile.code;
                $api.getGameGroupTreeInfo({code:_mobile.code,containGames:false}).then(res=>{
                    let list=res.data.gameGroups[0].children,tempList=[];
                    list.map((item,index)=>{
                        tempList.push({name:item.name,displayName:item.displayName,code:item.code})
                    })
                    gameGroup.list=tempList
                    store.commit('SET_STATE',{name:'gameGroup',content:gameGroup});
                    fun &&fun(gameGroup);
                })
            })
        }else{
            store.commit('SET_STATE',{name:'gameGroup',content:gameGroup});
            fun &&fun(gameGroup)
        }
    },
};
