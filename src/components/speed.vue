<template>
	<div class="speed_item" flex="box:first">
		<span>{{name}}</span>
		<div>
            <div class="border">
                <div class="percentage" :class="keep? 'blue' : 'red'" :style="{width:percent}" ></div>
                <span>{{ Math.floor(val) + '/' + max}}</span>
            </div>
		</div>
	</div>
</template>
<script>
export default {
    name: 'speed',
    data () {
        return {
            percent:0
        };
    },
    props:['val','name','max','keep'],
    methods:{

    },
    mounted(){
        if(this.val > this.max){
            this.percent = '100%';
        }else{
            this.percent= (this.val/this.max).toPercent();
        }
    },
    watch:{
        val(){
            if(this.val > this.max){
                this.percent = '100%';
            }else{
                this.percent= (this.val/this.max).toPercent();
            }
        }
    }
};
</script>

<style  lang="scss" scoped="" type="text/css">
	.speed_item{
		width: 100%;
		margin-bottom: 0.1rem;
		>span{
			margin-right:5px;
			line-height:12px;
			font-size:12px;
            color: #ffffff;
		}
		>div{
			height: 15px;
			background: #fff;
			float: right;
			border-radius:3px;
			border: 1px solid #fff;
			position:relative;
			overflow: hidden;
            .border{
                border: 1px solid #090e0f;
                height: 100%;
            }
			.percentage{
				height: 100%;
				float:left;
			}
			span{
				float: left;
				font-size:10px;
				line-height:12px;
				padding: 0;
				margin: 0;
				color:#1a1a1a;
				position:absolute;
				left: 50%;
				-webkit-transform: translateX(-50%);
				-moz-transform: translateX(-50%);
				-ms-transform: translateX(-50%);
				-o-transform: translateX(-50%);
				transform: translateX(-50%);

			}
			.red{
				background: #e74147;
			}
			.blue{
				background: #00aeef;
			}
		}
	}
</style>
