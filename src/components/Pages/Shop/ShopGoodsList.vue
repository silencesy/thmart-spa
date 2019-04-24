<template>
	<div class="ShopGoodsList">
		<div class="title">
			<div :class="{active: item.active}" v-for="(item,index) in titleArr" @click="titleChange(item)">{{item.name}}</div>
		</div>
		<Sort ref="Sort" @Sort="Sort" backgroundColor="#eee"/>
		<div class="line"></div>
		<ScrollView ref="ScrollView" :height="screenHeight-82" color="#eee" :pullup="pullup" :data="goodsList"  @pullingUp="loadData">
          <GoodsRow  :goodsData="goodsList" backgroundColor="#eee" :Columns="2" />
        </ScrollView>
	</div>
</template>
<script>
	export default {
		name: "ShopGoodsList",
		data() {
			return {
				pullup: true,
				goodsList: [],
				titleArr: [{
					name: 'Home',
					active: false,
					flag: 'home'
				},
				{
					name: 'All',
					active: false,
					flag: 'all'
				},
				{
					name: 'New Arrivals',
					active: false,
					flag: 'new'
				}],
				parameter: {
					id: 0,
					page: 0,
					pageSize: 20,
					sort: 'createTime_desc',
					brandId: this.$route.query.id
				}
			}
		},
		mounted(){
			var active = this.$route.query.flag;
			console.log(active)
			for (var i = 0; i < this.titleArr.length; i++) {
				if (this.titleArr[i].flag == active) {
					console.log(123);
					this.titleArr[i].active = true;
				}
			}
			this.loadData();
		},
		components: {
			GoodsRow: r => { require.ensure([], () => r(require('../../BaseComponents/GoodsRow')), 'GoodsRow') },
		    ScrollView: r => { require.ensure([], () => r(require('../../BaseComponents/ScrollView')), 'ScrollView') },
		    Sort: r => { require.ensure([], () => r(require('../../BaseComponents/Sort')), 'Sort') }
		},
		methods: {
			titleChange(item) {
			// 如果点击为home则返回商户首页 其他则改变商品排序
				if(item.flag == "home"){
					this.$router.go(-1);
				} else {
					// 取消所有高亮
					for (var i = 0; i < this.titleArr.length; i++) {
						this.titleArr[i].active = false;
					}
					// 当前选项高亮
					for (var i = 0; i < this.titleArr.length; i++) {
						if (this.titleArr[i].flag == item.flag) {
							this.titleArr[i].active = true;
						}
					}
					this.initParameter();
					this.$refs.Sort.init();
					this.parameter.sort = "createTime_desc";
					this.loadData();
				}
			},
			// 改变排序
		    Sort(data) {
		      this.initParameter();
		      this.parameter.sort = data;
		      this.loadData();
		    },
		    loadData() {
		    	var that = this;
		    	that.parameter.page++;
				that.$http.post(this.urls.goodsList,that.parameter)
				.then(function (response) {
					console.log(response)
					if (response.data.data.totalPage == 0 || that.parameter.page >= response.data.data.totalPage) {
			          that.$refs.ScrollView.endup();
			        }
					that.goodsList = that.goodsList.concat(response.data.data.data);
				});
		    },
		    initParameter() {
		    	this.parameter.page = 0;
		    	this.goodsList = [];
		    	this.$refs.ScrollView.scrollTo(0,0,0,'easing');
		    	this.$refs.ScrollView.startup();
		    }
		}
	}
</script>
<style scoped>
	.title {
		display: flex;
		height: 41px;
		background-color: #fff;
		align-items: center;
		align-content: center;
	}
	.title > div {
		flex: 1;
		text-align: center;
		position: relative;
	}
	.title > div:after {
		content: " ";
		width: 1px;
		height: 21px;
		position: absolute;
		top: 0;
		right: 0;
		background-color: #dfdfdf;
	}
	.title > div:last-child:after {
		background-color: transparent;
	} 
	.line {
		width: 100%;
		height: 1px;
		background-color: #dfdfdf;
	}
	div.active {
		color: #F9421E;
	}
</style>