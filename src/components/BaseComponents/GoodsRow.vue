<template>
	<div class="GoodRow">
		<slot name="banner-img"></slot>
		<ul class="goods-container" :style="{backgroundColor:backgroundColor}">
			<li class="goods-item" v-for="(item,index) in goodsData" :key="index" :style="{width: width}">
				<router-link :to="{path: '/GoodsDetails', query: {id:item.id}}">
					<img v-if="item.saleType.type == 'sale'" class="sale-icon" src="static/images/common/sale.png" alt="">
					<img v-if="item.saleType.type == 'group'" class="sale-icon group" src="static/images/common/group.png" alt="">
					<img v-if="item.saleType.type == 'spell'" class="sale-icon group" src="static/images/common/duodeal.png" alt="">
					<div class="img-box">
						<img v-lazy="item.pic" alt="">
					</div>
					<div class="good-info">
						<div class="goods-name line2">
							{{item.title}}
						</div>
						<div class="goods-price">
							<div class="theme_color">
								￥{{item.price}}
							</div>
							<div>
								<del v-if="item.originalPrice">￥{{item.originalPrice}}</del>
							</div>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'GoodRow',
	props: {
		goodsData: {
			type: Array,
			default: function () {  
		      return []  
		    } 
		},
		Columns: {
			type: Number,
			default: 3
		},
		backgroundColor: {
			type: String,
			default: '#fff'
		}
	},
	data() {  
    return {  
     	width: 0
    }  
	},
	mounted() {
		this.width = (100-this.Columns*2.6) / this.Columns + "%";
		// console.log();
	}
}
</script>
<style scoped>
	.small-banner-img-box {
		background-color: #fff;
		text-align: center;
		padding: 20px 0 10px 0;
	}
	.small-banner-img-box .banner-img {
		width: 75%;
		margin: 0 auto;
	}
	.banner-img-box {
		background-color: #eee;
		padding-top: 10px;
	}
	.banner-img {
		width: 100%;
	    height: auto;
	    display: block;
	}
	img {
		width: 100%;
		height: auto;
		display: block;
	}
	.goods-container,.goods-item {
		list-style: none;
	}
	.goods-container {
		box-sizing: border-box;
		font-size: 0;
	    display: block;
	    width: 100%;
	    white-space: normal;
	    position: relative;
	    margin-top: 0;
	    margin-bottom: 0;
	    background-color: #fff;
	    padding: 10px;
	}

	.goods-item {
		position: relative;
		font-size: 17px;
	    display: inline-block;
	    text-align: center;
	    vertical-align: middle;
	    background: 0 0;
	    box-sizing: border-box;
	    border: 1px solid #dfdfdf;
	    border-radius: 4px;
	    margin: 1.3%;
		background-color: #fff;
	}
	.goods-name {
		margin-bottom: 5px;
		height: 38px;
	}
	.goods-price {
		display: flex;
	}
	.goods-price > div {
		flex: 1;
		text-align: center;
	}
	.goods-item .sale-icon {
		position: absolute;
		top: 5px;
		left: 5px;
		width: 32px;
		height: 16px;
	}
	.goods-item .sale-icon.group {
		width: 62px;
	}
	del {
		color: #aaa;
	}
	.good-info {
		box-sizing: border-box;
		padding: 5px;
	}
</style>