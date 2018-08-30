<template>
    <div class="activity_details">
        <img v-if="isImg" :src="myHref" width="100%" alt=""/>
        <iframe v-else height="100%" src="https://jshftp.bbedom.life/images/promo/sjb-201806/" name="other" width="100%" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    name: 'activity_details',
    data () {
        return {
            isImg:true,
            myHref:this.$route.query.my_href
        }
    },
    mounted(){
        this.isImg= this.myHref.includes(".jpg") ||this.myHref.includes(".png");
        console.log(this.myHref)
    }
}
</script>
