<template>
	<div class="Sort" :style="{backgroundColor:backgroundColor}">
		<div :class="{active:index == 'createTime_desc'}" @click="tab('createTime_desc')">Latest</div>
		<div v-if="!(hideItem == 'sale')" :class="{active:index == 'sellNumber_desc'}" @click="tab('sellNumber_desc')">Sale</div>
		<div :class="{active:index == 'price_desc'}" @click="tab('price_desc')">Price <span class="arrow-box"><i class="iconfont icon-xiangshangjiantou-copy-copy-copy-copy" :class="{active:index == 'price_desc' && lift == 'price_asc'}"></i><i class="iconfont icon-xiangshangjiantou-copy-copy-copy" :class="{active:index == 'price_desc' && lift == 'price_desc'}"></i></span></div>
	</div>
</template>
<script>
	/**
	 * index当前索引 用于选中当前项 
	 * lift升降序 向上和向下箭头高亮
	 * frist 当选择了price之后再切换latest和sale栏  然后再切回price的时候保持之前的price升降序
	 */
	export default {
		name: "Sort",
		props: {
			backgroundColor: {
				type: String,
				default: '#fff'
			},
			hideItem: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				index: 'createTime_desc',
				lift: 'price_desc',
				frist: false
			}
		},
		methods: {
			tab(index) {
				var that = this;
				if (that.index!=index) {
					that.index = index;
					if (index == 'createTime_desc'||index == 'sellNumber_desc') {
						that.$emit('Sort',index);
					}
				}
				setTimeout(function(){
					if(that.frist) {
						that.frist = false;
						that.$emit('Sort',that.lift);
					} else if (that.index == 'price_desc' && index == 'price_desc'){
						if (that.lift == 'price_desc') {
							that.lift = 'price_asc';
							that.$emit('Sort',that.lift);
						} else {
							that.lift = 'price_desc';
							that.$emit('Sort',that.lift);
						}
					}
				},20);
			},
			init() {
				this.index = 'createTime_desc';
				this.lift ='price_desc';
				this.frist = false;
			}
		},
		watch: {
			index: function(newVal,oldVal) {
				var that = this;
				if (newVal=='price_desc') {
					that.frist = true;
				} else {
					that.frist = false;
				}
			}
		}
	}
</script>
<style scoped>
	.Sort {
		display: flex;
		height: 40px;
		background-color: #fff;
	}
	.Sort > div {
		flex: 1;
		text-align: center;
		height: 40px;
		line-height: 40px;
		position: relative;
	}
	.Sort > div.active {
		color: #F9421E;
	}
	/* .Sort > div.active:after {
		position: absolute;
		top: auto;
	    bottom: 0px;
	    left: 0;
	    right: 0;
	    margin: auto;
	    content:"";
	    background-color: #F9421E;
	    font-weight:bold;
	    width: 35px;
	    height: 2px;
	} */
	.arrow-box {
		display: inline-block;
		height: 10px;
		position: relative;
	}
	.arrow-box .iconfont {
		position: absolute;
		color: #999;
	}
	.arrow-box .icon-xiangshangjiantou-copy-copy-copy-copy {
		top: -18px;
		left: 0;
	}
	.arrow-box .icon-xiangshangjiantou-copy-copy-copy {
		left: 0;
		bottom: -18px;
	}
	.iconfont.active {
		color: #F9421E;
	}
</style>