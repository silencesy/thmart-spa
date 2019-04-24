<template>
	<div class="ShopGoodsItem">
		<div class="title">
			<a>
				<i class="iconfont" :class="iconfontName"></i>
				<span>{{shopData.brandName}}</span>
				<slot name="orderNumber"></slot>
			</a>
			<div>
				<slot name="titleRight"></slot>
			</div>
		</div>
		<div class="content">
			<slot name="content"></slot>
			<div v-for="(item,index) in shopData.data" :key="index">
				<div class="goods">
					<div>
						<img v-lazy="item.pic" alt="">
					</div>
					<div class="goodsRight">
						<p class="line2">{{item.goodsName}}</p>
						<p>
							<span v-for="(item2,index) in item.prop" :key="index">{{item2[0]}}</span>
						</p>
						<p>
							<span>¥{{item.price}}</span>
							<i>x{{item.number}}</i>
						</p>
					</div>
				</div>
				<div v-if="showLogistics" class="logistics-box" >
					<span class="logistics" @click="logistics(item.company,item.logistics)">Tracking your order</span><span v-if="showReviews" class="logistics review-btn" @click="bindAddRevies(item.id,item.hasComment)">Review</span>
				</div>
			</div>
		</div>
		<slot name="bottom"></slot>
	</div>
</template>
<script>
	/**
	 * iconfontName 头部左边的iconfont
	 * shopData 数据
	 * showLogistics 是否显示物流
	 */
	export default {
		name: 'ShopGoodsItem',
		props: {
			shopData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			iconfontName: {
				type: String,
				default: 'icon-shanghu1'
			},
			showLogistics: {
				type: Boolean,
				default: false
			},
			showReviews: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			}
		},
		methods: {
			logistics(company,logistics) {
				this.$router.push({
					path: '/logistics',
					query: {
						logistics: logistics,
						company: company
					}
				})
			},
			bindAddRevies(id,hasComment) {
				if(hasComment == 1) {
					this.$toast("You already submitted the comment!");
				} else {
					this.$router.push({
						path: '/addReviews',
						query: {
							id: id
						}
					})
				}
			}
		}
	}
</script>
<style scoped>
	.ShopGoodsItem {
		margin: 0 10px 10px 10px;
		border: 1px solid #dfdfdf;
		border-radius: 4px;
		overflow: hidden;
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
	.logistics-box {
		height: 30px;
		line-height: 30px;
		padding-bottom: 10px;
	}
	.logistics {
		float: right;
		border: 1px solid #dfdfdf;
    	border-radius: 30px;
    	color: #666;
    	font-size: 14px;
    	padding: 0 10px;
	}
	.review-btn {
		margin-right: 10px;
	}
</style>