<template>
	<div class="schedule">
		<div class="progressbox">
			<div class="progressbar">
				<div class="garden start"></div>
				<div class="garden end"></div>
				<div
					class="current"
					:style="{left:(current/max).toPercent()}"
					>{{current.toFixed(2) || "0"}}</div>
				<div
					:style="{width:(current/max).toPercent()}"
					class="progress">
					</div>
			</div>
			<div class="range">
				<div class="fl">0</div>
				<div class="fr">{{Number(max).toFixed(2)}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: 'schedule',
    data () {
        return {
        };
    },
    props:['current','max'],
    methods:{

    },
    created(){
        console.log(this.max)
    }
};
</script>

<style  lang="scss" scoped="" type="text/css">
	.schedule{
		margin: 0.10*2rem 0.22*2rem 0.15*2rem;
		background: #fff;
		border-radius:0.04*2rem;
		height: 0.58*2rem;
		position: relative;
		overflow: auto;
		.progressbarbox{
			background: #e4e4e4;
			overflow: auto;
			padding-top:0.07*2rem;
			position: relative;
			.progressbox{
				margin: 0.10*2rem 0.22*2rem 0.15*2rem;
				background: #fff;
				border-radius:0.04*2rem;
				height: 0.58*2rem;
				position: relative;
				overflow: auto;
			}
		}

		.progressbar{
			margin: 0.22*2rem 0.38*2rem 0.10*2rem;
			height:0.06*2rem;
			background: #00a0fe;
			position: relative;
			.garden{
				width: 0.16*2rem;
				height: 0.16*2rem;
				border-radius: 0.10*2rem;
				position: absolute;
			}
			.start{
				top:-0.05*2rem;
				left: -0.16*2rem;
				background: #70d9ab;
			}
			.end{
				top:-0.05*2rem;
				right: -0.16*2rem;
				background: #00a0fe;
			}
			.current{
				position: absolute;
				left:0%;
				top: -0.20*2rem;
				color: 013564;
				line-height: 1;
				font-size: 0.12*2rem;
				color: #1a1a1a;
				transform: translateX(-50%);

			}
			.current:after{
				display: block;
				content: "";
				width: 0;
				border-right:0.07*2rem solid transparent;
				border-top:0.07*2rem solid #70d9ab;
				border-left:0.07*2rem solid transparent;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
			}
		}
		.range{
			height: 0.16*2rem;
			position: absolute;
			bottom: 0.12*2rem;
			left: 0.35rem;
			right: 0.22*2rem;
			padding: 0 0.16rem;
			width: auto;
			.fr{
                transform: translateX(50%);
                float: right;
			}
			.fl{
                float: left;
			}
		}
		.progress{
			height:0.06*2rem;
			position: absolute;
			left: 0;
			top: 0;
			width: 50%;
			background:#70d9ab;
		}

	}
</style>
