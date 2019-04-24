<template>
	<div class="ShopGoodsItem">
		<div v-for="(item,index) in shopData.data">
			<div class="title">
				<a>
					<i class="iconfont icon-shanghu1"></i>
					<span>{{item.brandName}}</span>
				</a>
				<div>
					<slot name="titleRight"></slot>
				</div>
			</div>
			<div class="content">
				<div class="goods" v-for="(item2,index) in item.data">
					<div>
						<img v-lazy="item2.pic" alt="">
					</div>
					<div class="goodsRight">
						<p class="line2">{{item2.goodsName}}</p>
						<p>
							<span v-for="(item3,index) in item2.prop">{{item3[0]}}</span>
						</p>
						<p>
							<span>¥{{item2.price}}</span>
							<i>x{{item2.number}}</i>
						</p>
					</div>
				</div>
			</div>
		</div>
		<slot name="bottom"></slot>
	</div>
</template>
<script>
	export default {
		name: 'ShopGoodsItem',
		props: {
			shopData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {

			}
		}
	}
</script>
<style scoped>
	.ShopGoodsItem {
		margin: 0 10px 10px 10px;
		border: 1px solid #dfdfdf;
		border-radius: 4px;
	}
	.title {
		display: flex;
		background: #fff;
		padding: 10px;
	}
	.title > div , .title > a {
		flex: 1;
	}
	.title > a i {
		color: #999;
    font-size: 18px;
    padding-right: 7px;
	}
	.title > a span {
		color: #666;
	}
	.title > div {
		text-align: right;
	}
	.iconfont.icon-combinedshapefuben {
		color: #999;
	}
	.content {
		background: #F9F9F9;
		padding: 10px 10px 0 10px;
		box-sizing: border-box;
	}
	.goods {
		display: flex;
		padding-bottom: 15px;
	}
	.goods > div:first-child {
		width: 100px;
		height: 100px;
		overflow: hidden;
	}
	.goods > div:nth-child(2) {
		flex: 1;
	}
	.goods > div:first-child img {
		width: 100%;
		height: auto;
	}
	.goodsRight p {
		line-height: 25px;
		padding-left: 15px;
	}
	.goodsRight p:nth-child(1) {
		min-height: 50px;
	}
	.goodsRight p:nth-child(2) span {
		color: #999;
		font-size: 14px;
		margin-right: 5px;
	}
	.goodsRight p:nth-child(3) i , .goodsRight p:nth-child(3) span {
		font-size: 14px;
	}
	.goodsRight p:nth-child(3) span {
		color: #F9421E;
	}
	.goodsRight p:nth-child(3) {
		display: flex;
		justify-content: space-between;
	}
	.goodsRight p i {
		font-size: 14px;
	}


</style>