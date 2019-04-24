<template>
	<div class="GoodsList">
		<SearchTop />
		<Sort ref="Sort" @Sort="Sort"/>
		<div class="line"></div>
		<ScrollView ref="ScrollView" :height="screenHeight-90" :pullup="pullup" :data="goodsList"  @pullingUp="loadData">
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
					page: 0,
					pageSize: 10,
					sort: 'createTime_desc'
				}
			}
		},
		components: {
			SearchTop: r => { require.ensure([], () => r(require('../../BaseComponents/SearchTop')), 'SearchTop') },
			Sort: r => { require.ensure([], () => r(require('../../BaseComponents/Sort')), 'Sort') },
			GoodsRow: r => { require.ensure([], () => r(require('../../BaseComponents/GoodsRow')), 'GoodsRow') },
			ScrollView: r => { require.ensure([], () => r(require('../../BaseComponents/ScrollView')), 'ScrollView') },
		},
		mounted() {
			this.loadData();
		},
		methods: {
			loadData() {
				var that = this;
				that.parameter.page++; 
				that.$http.post(this.urls.groupBuying,that.parameter)
				.then(function (response) {
					if (response.data.data.totalPage == 0 || that.parameter.page >= response.data.data.totalPage) {
			          that.$refs.ScrollView.endup();
			        }
					that.goodsList = that.goodsList.concat(response.data.data.data);
				});
			},
			// 改变排序
		    Sort(data) {
		      this.parameter.sort = data;
		      this.initPara();
		      this.loadData();
		    },
		    initPara () {
		    	this.parameter.page = 0;
		    	this.goodsList = [];
		    	this.$refs.ScrollView.scrollTo(0,0,0,'easing');
      			this.$refs.ScrollView.startup();
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