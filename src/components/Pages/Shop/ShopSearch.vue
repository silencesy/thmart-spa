<template>
	<div class="ShopSearch">
		<div class="search-container">
	      <form @submit.prevent.blur="searchSubmit" onsubmit="return false;" action="##">
	        <mt-search v-model="searchParam.search" cancel-text="" placeholder="Search" ></mt-search>
	      </form>
	      <div class="cancel-btn" @click="goBackPage">Cancel</div>
	    </div>
	    <Sort ref="Sort" @Sort="Sort"/>
	    <ScrollView ref="ScrollView" :height="screenHeight-78" color="#eee" :pullup="pullup" :data="goodsList" :loadding="loadding"  @pullingUp="loadData">
          <GoodsRow  :goodsData="goodsList" :Columns="2" backgroundColor="#eee"/>
        </ScrollView>
	</div>
</template>
<script>
	export default {
		name: 'ShopSearch',
		data() {
			return {
				searchParam: {
					id: 0,
					page: 0,
					pageSize: 20,
					sort: "createTime_desc",
					search: '',
					brandId: this.$route.query.id
				},
				goodsList: [],
				pullup: true,
				loadding: false
			}
		},
		components: {
			Sort: r => { require.ensure([], () => r(require('../../BaseComponents/Sort')), 'Sort') },
			GoodsRow: r => { require.ensure([], () => r(require('../../BaseComponents/GoodsRow')), 'GoodsRow') },
			ScrollView: r => { require.ensure([], () => r(require('../../BaseComponents/ScrollView')), 'ScrollView') }
		},
		methods: {
			searchSubmit () {
				var that = this;
				if (that.searchParam.search) {
					that.initParameter();
					that.loadData();
				}
			},
			goBackPage() {
				this.$router.go(-1);
			},
			// 改变排序
		    Sort(data) {
		    	this.searchParam.sort = data;
		    	if (this.searchParam.search) {
		    		this.initParameter();
				    this.loadData();
				}
		      
		    },
		    loadData() {
		    	var that = this;
		    	that.searchParam.page++;
				that.$http.post(this.urls.goodsList,that.searchParam)
				.then(function (response) {
					if (response.data.data.totalPage == 0 || that.searchParam.page >= response.data.data.totalPage) {
			          	that.$refs.ScrollView.endup();
			        }
					that.goodsList = that.goodsList.concat(response.data.data.data);
				});
		    },
		    initParameter() {
		    	this.searchParam.page = 0;
		    	this.goodsList = [];
		    	this.$refs.ScrollView.scrollTo(0,0,0,'easing');
		    	this.$refs.ScrollView.startup();
		    }
		}
	}
</script>
<style scoped>
	
</style>