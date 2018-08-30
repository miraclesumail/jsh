import {SET_STATE,MSG,ALERT,CONFIRM,REGISTER,LOGOUT} from './mutation-types.js';
import  {Tool} from "@/tool/index.js";
/* eslint-disable */
export default {
    [SET_STATE](state,{name,content,sub}){
        sub?state[name][sub] = content : state[name] = content;
    },
	[ALERT](state,data){
        data.show=true;
        state.alert.push(data);
        setTimeout(()=>{
            state.alert.remove(data)
        },2000)
	},
	[CONFIRM](state,data){
        if(data.important){
            state.confirm.shift(data);
        }else{
            state.confirm.push(data);
        }
	},
	[REGISTER](state,data=true){
		state.mask=data;
        state.registerShow=data;
        Tool.cc({device:"PC玩家",pageName:"顶部",buttonName:"我要开户"});
	},
	//用户登录，设置登录信息
	[LOGOUT](state,data){
		state.user= data;
		state.resetArray.map((item,index)=>{
			if(item == 'wallet'){
				state[item]={}
			}else{
				state[item]=null
			}
		})
	},
}
