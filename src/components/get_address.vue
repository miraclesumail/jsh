<template>
    <div class="item item_input address" flex="box:first cross:center">
        <div class="name">存款地址</div>
        <div class="text_box" flex="cross:center box:mean">
            <div class="select_box">
                <select name="province" v-model="address.provinceId">
                    <option :value="item.id" v-for="(item,index) in provinceList" :key="index">{{item.name}}</option>
                </select>
                <i></i>
            </div>
            <div class="select_box">
                <select name="city"  v-model="address.cityId">
                    <option :value="item.id" v-for="(item,index) in cityList" :key="index">{{item.name}}</option>
                </select>
                <i></i>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    name: 'get_address',
    data () {
        return {
            provinceList:[],
            valueKey:[],
            cityList:[],
            address:{
                provinceId:'',
                cityId:''
            },
        }
    },
    // provinceId 省id
    // cityId 市id
    props:{value:Object},
    methods:{
        changeCity(){
            this.cityList=[];
            this.$api.getCityList({provinceId:this.address.provinceId}).then(res=>{
                this.cityList = res.data;
                if(!this.address.cityId){
                    this.address.cityId = this.value.cityId || res.data[0].id;
                }else{
                    this.address.cityId =res.data[0].id;
                }
            });
        }
    },
    mounted(){
        console.log(this.value)
        this.$api.getProvinceList().then(res=>{
            res.data.map((item,index)=>{
                res.data[index].id= item.id.toString();
            });
            this.provinceList= res.data;
            this.address.provinceId = this.value.provinceId || res.data[0].id;
        })
    },
    computed:{
        ...mapState(['platform']),
    },
    watch:{
        'address.provinceId':function(){
            this.changeCity();
        },
        'address.cityId':function(){
            this.$emit('input',this.address);
        }
    }
}
</script>
