<template>
    <div class="msg">
        <crumbs icon="icon_email" title="消息"></crumbs>
        <div class="nomail" v-if="!noticeList.length">无信息!</div>
        <div class="table_box" v-else>
            <table>
                <thead>
                    <tr>
                        <th>删除</th>
                        <th>主题</th>
                        <th>时间</th>
                    </tr>
                </thead>
                <tr v-for="(item,index) in noticeList" :key="index">
                    <td class='delete' @click="clearn(item)">
                        <span class="icon_cha"></span>
                    </td>
                    <td class="title text_md" @click="goDoticeDetails(item)">
                        <div flex="box:first cross:center">
                            <div :class="item.hasBeenRead?'icon_email_no':'icon_email'"></div>
                            <span class="text nowrap">{{item.title}}</span>
                        </div>
                    </td>
                    <td class="datatime text_md">{{(item.createTime).getDate().substring(0,10)}}</td>
                </tr>
            </table>
            <div class="btn" @click="clearn">清空</div>
        </div>

    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    name: 'notice',
    data () {
        return {
            noticeList:[]
        };
    },
    props:[],
    components:{},
    methods:{
        ...mapActions([
            'setUnreadMail'
        ]),
        clearn(item){
            let emailId=item._id;
            if(emailId){
                this.$api.deleteMail({mailObjId:emailId}).then(res=>{
                    this.noticeList.remove(item);
                })
            }else{
                let len  = this.noticeList.length;
                for(let i=0;i<len;i++){
                    let currentIndex =this.noticeList[i];
                    this.$api.deleteMail({mailObjId:this.noticeList[i]._id}).then(res=>{
                        this.noticeList.remove(currentIndex);
                        if(!this.noticeList.length){

                        }
                    })
                }
            }
        },
        goDoticeDetails(val){
            this.$tool.CONFIRM({text:`<h3>${val.title}</h3>${val.content}`})
            if(!val.hasBeenRead){
                this.$api.readMail({mailObjId:val._id}).then(res=>{
                    val.hasBeenRead=true;
                });
            };
        }
    },
    mounted(){
        this.$api.getMailList().then(res=>{
            this.noticeList = res.data || [];
            this.noticeList.sort(function(a,b){return true});
        })
    },
    computed: {
        ...mapState([
            'user','unreadMail'
        ])
    }
}
</script>
