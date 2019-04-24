<template>
	<div class="ArticleDetail" v-if="articleData.title">
		<div class="article">
			<div class="content">
				<p class="title">{{articleData.title}}</p>
				<p class="date word">{{articleData.createTime}}</p>
				<!-- <img src="static/images/common/article.png" alt="">
				<p class="word"></p> -->
				<div class="content-html" v-html="articleData.article_content">
					
				</div>
			</div>
			<div class="goods" v-if="articleData.itemList.length > 0">
				<router-link v-for="item in articleData.itemList" :key="item.id" :to="{path: '/GoodsDetails', query: {id: item.id}}">
					<div><img :src="item.pic" alt=""></div>
					<div>
						<p class="line2">{{item.title}}</p>
						<p>
							<span class="price">¥ {{item.price}}</span>
							<span class="buy">Buy</span>
						</p>
					</div>
				</router-link>
			</div>
		</div>
		<p class="morePick"><span>More Editor's Pick</span></p>
		<div class="articlePick">
			<BaseArticle :articleData='articleListData' articleContentBg="#eee" :articleItemStyleObj="articleItemStyleObj">
				
			</BaseArticle>
		</div>
		<BackToTop />
	</div>
</template>
<script>
	export default {
		name: 'ArticleDetail',
		data () {
			return {
				articleData: {},
				articleListData: {
			        data:[]
			    },
			    articleItemStyleObj: {
			        'border': '1px solid #dfdfdf',
			        'paddingLeft': '10px',
			        'paddingRight': '10px',
			    },
				param1: {
			        page: 1,
			        pageSize: 8,
			        sort: 'createTime_desc'
			    }
			}
		},
		components: {
			BaseArticle: r => { require.ensure([], () => r(require('../../BaseComponents/BaseArticle')), 'BaseArticle') },
			BackToTop: r => { require.ensure([], () => r(require('../../BaseComponents/BackToTop')), 'BackToTop') }
		},
		mounted () {
			this.getData();
			// this.getDataMore();
		},
		watch:{
			"$route":"getData"    //后面是methods中的一个方法
		},
		methods: {
			getData() {
				var that = this;
				that.$http.post(that.urls.articleDetail,{
					id: that.$route.query.id
				})
				.then(function (response) {
					that.articleData = response.data.data;
					that.articleListData.data = response.data.data.recommend;
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			// getDataMore() {
		 //      var that = this;
		 //      that.param1.page++;
		 //      that.$http.post(that.urls.articleList,that.param1)
		 //      .then(function (response) {
		 //        if (response.data.data.totalPage == 0 || that.param1.page >= response.data.data.totalPage) {
		 //          that.$refs.ScrollView.endup();
		 //        }
		 //        that.articleListData.data=that.articleListData.data.concat(response.data.data.data);
		 //      })
		 //      .catch(function (error) {
		 //        console.log(error);
		 //      });
		 //    },
		}
	}
</script>
<style scoped>
	.article {
		background: #fff;
		padding: 10px;
		box-sizing: border-box;
		/*margin-bottom: 20px;*/
	}
	.content {
		line-height: 24px;
	}
	.title {
		font-size: 18px;
		font-weight: 600;
	}
	.date {
		margin-top: 7px;
	}
	.word {
		color: #999;
		font-size: 14px;
	}
	.content img {
		width: 100%;
		display: block;
		margin: 10px 0;
	}
	.goods {
		background: #eee;
		padding: 10px;
		box-sizing: border-box;
		margin-top: 10px;
	}
	.goods > a {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;

	}
	.goods > a > div:nth-child(1) {
		width: 80px;
		height: 80px;
	}
	.goods > a img {
		width: 80px;
		height: 80px;
	}
	.goods > a > div:nth-child(2) {
		line-height: 24px;
		flex: 1;
		padding-left: 10px;
	}
	.goods > a > div:nth-child(2) p:first-child {
		min-height: 53px;
	}
	.goods > a > div:nth-child(2) p:nth-child(2) {
		display: flex;
		justify-content: space-between;
	}
	.price {
		color: #F9421E;
		font-size: 20px;
	}
	.buy {
		width: 80px;
		height: 28px;
		background: #F9421E;
		color: #fff;
		text-align: center;
		line-height: 28px;
		border-radius: 20px;
	}
	.morePick {
		margin-left: 10px;
		margin-bottom: 20px;
		margin-top: 20px;
	}
	.morePick span {
		padding-bottom: 2px;
		color: #F9421E;
		border-bottom: 2px solid #F9421E;
	}
	.content-html >>> img {
		width: 100% !important;
		height: auto !important;
	}

</style>