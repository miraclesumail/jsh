 <template>
	<div class='alert-box'>
        <transition v-for='(item,index) in alert' :key='index' name="fade" mode="out-in" appear>
            <div class="msgalert" v-if="item.show" flex='box:justify'>
                <span class="icon" :class="item.type?icons[item.type]:'tick'"></span>
                <div style="color: #000">{{item.text}}</div>
                <span class="icon cha close" @click='item.show=false'></span>
            </div>
        </transition>
	</div>
</template>

<script>
/*
*   alert提示窗
*{
    example
        let a = '城管灌灌灌灌灌'
        let b = 'warn'
        this.$tool.ALERT({text:a,type:b});
}
*@param {String} a 字符串a
*@param {String} b 字符串b  ('success','warn','error','notice') 四选一
*
*hank 2018.4.17
*
*/
import {mapState} from 'vuex'
export default {
    name: 'msgalert',
    data () {
        return {
            icon:'tick',
            icons:{
                success:'tick',
                warn:'warn',
                error:'error',
                notice:'notice'
            }
        };
    },
    computed:{
        ...mapState(['alert'])
    },
};
</script>
