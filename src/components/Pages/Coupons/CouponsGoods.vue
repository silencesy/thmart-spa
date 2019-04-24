<template>
	<div class="GoodsList">
		<ScrollView ref="ScrollView" :height="screenHeight" :pullup="pullup" :data="goodsList"  @pullingUp="loadData">
          <GoodsRow  :goodsData="goodsList" :Columns="2"/>
        </ScrollView>
	</div>
</template>
<script>
	export default {
		name: 'GoodsList',
		data() {
			return {
				goodsList: [],
				pullup: true,
				parameter: {
					couponId: this.$route.query.id,
					page: 0,
					pageSize: 20,
				}
			}
		},
		components: {
			ScrollView: r => { require.ensure([], () => r(require('../../BaseComponents/ScrollView')), 'ScrollView') },
			GoodsRow: r => { require.ensure([], () => r(require('../../BaseComponents/GoodsRow')), 'GoodsRow') }
		},
		mounted() {
			this.loadData();
		},
		methods: {
			loadData() {
				var that = this;
				that.parameter.page++; 
				that.$http.post(this.urls.couponItemList,that.parameter)
				.then(function (response) {
					console.log(response);
					if (response.data.data.totalPage == 0 || that.parameter.page >= response.data.data.totalPage) {
			          that.$refs.ScrollView.endup();
			        }
					that.goodsList = that.goodsList.concat(response.data.data.data);
				});
			}
		}
	}
</script>
<style scoped>
	.line {
		width: 100%;
		height: 1px;
		background-color: #dfdfdf;
	}
</style>