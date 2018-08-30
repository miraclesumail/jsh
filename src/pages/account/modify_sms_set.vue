<template>
    <div class="modify_sms_set">
        <crumbs icon="icon_sms" title="修改邮箱"></crumbs>
        <div class="form_box3">
            <div class="item item_radio" flex="main:justify cross:center" v-for="(item,index) in list" :key="index">
                <div class="name">{{item.smsName}}</div>
                <div class="switch" flex="cross:center" :class="{active:!item.status}" @click="change(item)">
                    <div class="dot"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name: 'modify_sms_set',
    data () {
        return {
            list:null,
        }
    },
    methods:{
        change(val){
            val.status=!!val.status? 0:1;
            let str ='';
            for (let i in this.list){
                if(this.list[i].smsId)str +=this.list[i].smsId + ':'  + this.list[i].status+',';
            }
            this.$api.setSmsStatus({status:str,_silence:true});
        }
    },
    mounted(){
        this.$api.getSmsStatus().then(res=>{
            this.list=res.data;
        })
    }
}
</script>
