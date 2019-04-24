<template>
	<div class="ShopList">
		<SearchTop :searchShop="searchShop"/>
		<ScrollView ref="ScrollView" :height="screenHeight-50" :pullup="pullup" :data="ShopListData"  @pullingUp="loadData" color="#eee">
          <ShopRow :shopData="ShopListData" />
        </ScrollView>
		
	</div>
</template>
<script>
	export default {
		name: "ShopList",
		data() {
			return {
				ShopListData: [],
				pullup: true,
				parameter: {
					page: 0,
					pageSize: 20
				},
				searchShop: true
			}
		},
		mounted() {
			this.loadData();
		},
		components:{
			ShopRow: r => { require.ensure([], () => r(require('../../BaseComponents/ShopRow')), 'ShopRow') },
			SearchTop: r => { require.ensure([], () => r(require('../../BaseComponents/SearchTop')), 'SearchTop') },
			ScrollView: r => { require.ensure([], () => r(require('../../BaseComponents/ScrollView')), 'ScrollView') }
		},
		methods: {
			loadData() {
				var that = this;
				that.parameter.page++;
				that.$http.post(that.urls.brandList,that.parameter)
				.then(function (response) {
					if (response.data.data.totalPage == 0 || that.parameter.page >= response.data.data.totalPage) {
			          that.$refs.ScrollView.endup();
			        }
					that.ShopListData = that.ShopListData.concat(response.data.data.data);
				});
			}
		}
	}
</script>
<style scoped>
	
</style>