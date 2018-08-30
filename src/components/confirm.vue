<template>
    <div class="confirm" @touchmove.prevent='1' v-if='confirm.length'>
        <div class="mask"></div>
        <div class="content_warp" flex="main:center cross:center">
            <div class="content">
                <div class="effect" :class="{enter:show,leave:!show}">
                    <h2 class="title" flex="box:last cross:center">
                        <span>{{confirm[0].title || '温馨提示'}}</span>
                        <div class="cha"  flex="main:center cross:center">
                            <div class="icon_cha" @click="execute"></div>
                        </div>
                    </h2>
                    <div class="text" flex="main:center cross:center"><div v-html="confirm[0].text|| '请确认'"></div></div>
                    <div class="btns" flex='main:center cross:center box:mean'>
                        <div class="btn" v-if='confirm[0].noName' @click='execute(confirm[0].noFun)'>{{confirm[0].noName ||'取消'}}</div>
                        <div class="btn btn_ok" @click='execute(confirm[0].okFun)'>{{confirm[0].okName ||'确定'}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

/*
*   confirm确认框
*{
    example
        let title = '温馨提示'
        let text = '这是一个确认框'
        let okFun = ()=>{
            console.log("确认后执行")
        }
        let okName="执行"
        let noFun=()=>{
            console.log("取消关闭")
        }
        let noName="执行"
        let important=true
        this.$tool.CONFIRM({title:title,text:text,okFun:okFun,okName:okName,noFun:noFun,noName:noName,important:important});
}
*@param {String} 字符串title (默认==>'温馨提示')
*@param {String} 字符串text  (默认==>'请确认')
*@param {String} 字符串okName  (默认==>'确认')
*@param {String} 字符串noName  (默认==>'取消')
*@param {Boolean} 布尔值important  (默认==>false,当为true的时候表示很重要，如果之前有弹窗会清除之前的并替换)
*@param {Function}  点击okName 执行的函数okFun(默认==>null)
*@param {Function}  点击noName 执行的函数noFun(默认==>null)
*
*hank 2018.4.18
*
*/
import {mapState} from 'vuex'
export default {
    name: 'confirm',
    data () {
        return {
            show:true
        }
    },
    methods:{
        execute(fun=null){
            this.show=false;
            setTimeout(()=>{
                this.confirm.remove(this.confirm[0])
                this.$tool.SET_STATE({name:'confirm',content:this.confirm});
                fun&&fun();
            },300);
        }
    },
    computed:{
        ...mapState(['confirm'])
    },
    watch:{
        confirm(){
            if(this.confirm)this.show=true;
        }
    }

}
</script>
