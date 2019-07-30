<template>
	<div class="ShopRow">
		<ul class="shop-container">
			<li class="shop-item" v-for="(item,index) in shopData" :key="index" @click="goShop(item)">
				<div class="img-box">
					<img v-lazy="item.pic" alt="">
				</div>
				<div class="name line1">
					{{item.title}}
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: "ShopRow",
		props: {
			shopData: {
			type: Array,
				default: function () {  
			      return []  
			    } 
			}
		},
		data() {
			return {

			}
		},
		methods: {
			goShop(item) {
				this.$router.push({path: '/ShopHome',query: {id: item.id}})
			}
		}
	}
</script>
<style scoped>
	.shop-container,.shop-item {
		list-style: none;
	}
	.shop-container {
		padding: 15px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.shop-container .shop-item {
		width: 48.5%;
		box-sizing: border-box;
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 10px;
		border: 1px solid #dfdfdf;
		overflow: hidden !important;
		background: #fff;
	}
	.shop-container .shop-item img {
		width: 100%;
		height: auto;
		display: block;
	}
	.shop-item .name {
		text-align: center;
		padding: 0 6px;
    	margin-bottom: 10px;
	}
</style>