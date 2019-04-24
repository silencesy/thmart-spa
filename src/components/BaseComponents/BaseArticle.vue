<template>
	<div class="BaseArticle">
		<div class="banner-img-box" v-show="articleDataInfo.pic">
			<img class="banner-img" @click="goList" :src="articleDataInfo.pic" alt="">
		</div>
		<div class="article-content" :style="{backgroundColor:articleContentBg}">
			<div class="article-item" v-for="(item,index) in articleDataInfo.data" :key="index" :style="articleItemStyleObj" @click="goDetails(item.id)">
				<div class="img-box">
					<img v-lazy="item.pic" alt="">
				</div>
				<div class="article-info">
					<p class="line2">{{item.title}}</p>
					<span class="date">{{item.createTime}}</span>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	export default {
	name: 'BaseArticle',
	props: {
		articleData: {
			type: [Object,Array],
			default: function () {  
		      return {}
		    }  
		},
		articleItemStyleObj: {
			type: Object,
			default: function () {  
		      return {
		      	'borderBottom': '1px solid #dfdfdf'
		      }
		    }  
		},
		articleContentBg: {
			type: String,
			default: '#fff'
		}
	},
	data() {  
	    return {  
	   	 
	    }
  	},
  	computed: {  
	    articleDataInfo() {
	    	var that = this;
	    	if (that.articleData instanceof Array) {
	    		var data = 'data';
	    		var obj = {};
	    		obj[data] = that.articleData;
	    		return obj;
	    	} else {
	    		return that.articleData;
	    	}
	    }
  	},
  	methods: {
  		goDetails(id) {
  			this.$router.push({ path: '/ArticleDetail', query: { id: id}})
  			// let routeUrl = this.$router.resolve({ path: '/ArticleDetail', query: { id: id}});
			// window.open(routeUrl.href, '_blank');
  		},
  		goList() {
  			this.$router.push('Guide');
  		}
  	}
	}
</script>
<style scoped>
	.BaseArticle {
		background-color: #fff;
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
	.article-item {
		display: flex;
	}
	.article-content {
		padding: 10px 15px;
		box-sizing: border-box;
	}
	.article-item {
		box-sizing: border-box;
		padding: 10px 0;
		border-radius: 4px;
		margin-bottom: 10px;
		background-color: #fff;
		box-sizing: border-box;

	}
	.article-item:last-child {
		margin-bottom: 0px;
	}
	.article-item .img-box {
		width: 115px;
		height: 76px;
		overflow: hidden;
	}
	.article-item .img-box img {
		width: 100%;
		float: left;
	}
	.article-item .article-info {
		flex: 2;
		padding-left: 15px;
		position: relative;

	}
	.article-item .article-info .date {
		position: absolute;
		left: 15px;
		bottom: 0;
		font-size: 14px;
		color: #999;
	}
	img {
		width: 100%;
	}
</style>