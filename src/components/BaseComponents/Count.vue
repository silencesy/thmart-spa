<template>
	<div class="Count">
		<div class="add" @click="less"><i class="iconfont icon-icon" :class="{ color: yanse }"></i></div>
		<div class="number">{{number}}</div>
		<div class="less" @click="add"><i class="iconfont icon-jia"></i></div>
	</div>
</template>
<script>
	export default {
		name: "Count",
		props: {
			number: {
				type: Number,
				dafualt: 1
	        },
	        yanse: {
	            type: [Boolean,String],
	            default: true
	        }
		},
		methods: {
			add() {
				this.$emit('add');
			},
			less() {
				this.$emit('less');
			}
		}
	}
</script>
<style scoped>
	.Count {
		display: flex;
		justify-content: flex-end;
	}
	.Count > div {
		background-color: #dfdfdf;
		font-size: 14px;
	}
	.Count .add {
		width: 26px;
		height: 26px;
		line-height: 26px;
		text-align: center;
	}
	.Count .number {
		height: 26px;
		line-height: 26px;
		width: 40px;
		text-align: center;
		margin: 0 5px;
	}
	.Count .less {
		width: 26px;
		height: 26px;
		line-height: 26px;
		text-align: center;
	}
	.color {
		color: #999;
	}
</style>