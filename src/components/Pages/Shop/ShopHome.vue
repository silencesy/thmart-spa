<template> 
	<div class="ShopHome" v-if="shopData.pic">
		<div class="header">
			<div>
				<img :src="shopData.pic" alt="">
				<span>{{shopData.name}}</span>
			</div>
			<div>
				<span class="iconfont" :class="{ 'icon-shoucang': shopData.isCollect == 0, 'icon-shoucang1': shopData.isCollect == 1 }" @click="save"></span>
				<router-link :to="{path: '/ShopSearch', query: {id:shopData.id}}" class="iconfont icon-sousuo"> </router-link>
			</div>
		</div>
		<div class="nav">
			<router-link to="/">Home</router-link>
			<router-link :to="{path: '/ShopGoodsList', query: {id:shopData.id,flag: 'all'}}">All</router-link>
			<router-link :to="{path: '/ShopGoodsList', query: {id:shopData.id,flag: 'new'}}">New Arrivals</router-link>
		</div>
		<!-- 轮播开始 -->
		<HomeSwiper :swiperData="shopData.figure">

		</HomeSwiper>
		<!-- 轮播结束 -->
		<div class="content">
			<div v-for="(item,index) in shopData.content" :key="index">
				<a :href="[item.url]">
					<img :src="item.pic" alt="">
				</a>
			</div>
		</div>
		<BackToTop />
		<div class="bottom">
			<router-link to="/"><i class="iconfont icon-shanghu1"></i>thMart-Home</router-link>
			<a href="https://mp.weixin.qq.com/mp/profile_extaction=home&__biz=MzUxMTgyOTQ2Mg==#wechat_redirect"><i class="iconfont icon-kefu"></i>Chat</a>
		</div>
	</div>
</template>
<script>
import wx from 'weixin-js-sdk';
	export default {
		name: '',
		data () {
			return {
				shopData: {}
			}
		},
		components: {
			HomeSwiper: r => { require.ensure([], () => r(require('../../BaseComponents/HomeSwiper')), 'HomeSwiper') },
			BackToTop: r => { require.ensure([], () => r(require('../../BaseComponents/BackToTop')), 'BackToTop') }
		},
		mounted () {
			console.log(this.$route.query.id)
			this.getData();
		},
		methods: {
			// 分享sdk
        getWx() {
            let that = this;
             var u = navigator.userAgent;
        	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if (isiOS) {
				var url = window.sessionStorage.getItem('href');
			} else {
				var url = window.location.href;
			}
            that.$http.post(that.urls.share,{url:url})
            .then(function (response) {
                that.signPackage = response.data.data.signPackage;
                // console.log(response);
                that.share();
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        share() {
					var that = this;
					wx.config({
							debug:false,// 是否开启调试模式
							appId: that.signPackage.appId,
							timestamp: that.signPackage.timestamp,
							nonceStr: that.signPackage.nonceStr,
							signature: that.signPackage.signature,
							jsApiList:['onMenuShareTimeline',//分享到朋友圈
											'onMenuShareAppMessage',//分享给朋友
											'onMenuShareQQ'//分享到QQ
									]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
					wx.ready(function(){
							var url = window.location.href;
							console.log(url);
							var options ={
									title: that.shopData.name,// 分享标题
									link: encodeURI(url),// 分享链接，记得使用绝对路径
									imgUrl: encodeURI(that.shopData.pic),// 分享图标，记得使用绝对路径
									desc:'That’s making your life easier!',// 分享描述
									success:function(){
									console.info('分享成功！');
									// 用户确认分享后执行的回调函数
									},
									cancel:function(){
									console.info('取消分享！');
									// 用户取消分享后执行的回调函数
									}
							}
							wx.onMenuShareTimeline(options);// 分享到朋友圈
							wx.onMenuShareAppMessage(options);// 分享给朋友
							wx.onMenuShareQQ(options);// 分享到QQ
					});
			},
			getData() {
				var that = this;
				that.$http.post(this.urls.shopDetail,{id: that.$route.query.id})
				.then(function (response) {
					// that.categoryList = response.data.data;
					console.log(response)
					that.shopData = response.data.data;
					that.getWx();
				});
			},
			// 是否登录如果没有登录就跳转登录页面
			isLogin() {
	  			let that = this;
	  			// 如果没有登录则跳转登录并且设置回跳地址
	  			if (!that.getToken()) {
	  				that.setlocalStorage("goback",window.location.href);
  					that.$router.push({name: 'Login'});
	  			}
	  			return false;
	  		},
			 // 收藏商品
            save() {
            	let that = this;
            	let params = {
            		type: 2,
            		contentId: that.$route.query.id,
            		isCollect: that.shopData.isCollect==1?0:1
            	}
	  			// 如果没有登录则跳转登录并且设置回跳地址
	  			that.isLogin();
	  			that.$http.post(that.urls.collect,params)
		        .then(function (response) {
		        	that.shopData.isCollect = that.shopData.isCollect==1?0:1;
		        })
		        .catch(function (error) {
		          console.log(error);
		        });

            }
		}
	}
</script>
<style scoped>
	.ShopHome {
		padding-bottom: 41px;
	}
	.header {
		width: 100%;
		height: 80px;
		line-height: 80px;
		display: flex;
		justify-content: space-between;
		align-content: center;
		background: #F9421E;
		padding: 9px 10px;
    	box-sizing: border-box;
	}
	.header div span {
		color: #fff;
	}
	.header div a {
		color: #fff;
		padding-left: 30px;
	}
	.header img {
		width: 40px;
		height: 40px;
		vertical-align: middle;
		padding-right: 20px;
	}
	.nav {
		width: 100%;
		background: #fff;
		overflow: hidden;
	}
	.nav a {
		width: 33.3%;
		height: 40px;
		line-height: 40px;
		display: inline-block;
		float: left;
		text-align: center;
	}
 	.nav a:after {
	    content: '|';
	    float: right;
	    color: #dfdfdf;
	}
	.nav a:last-child:after {
    	content: ' ';
	}
	.content {
		padding-bottom: 40px;
	}
	.content img {
		display: block;
		width: 100%;
	}
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		line-height: 40px;
		overflow: hidden;
		background: #fff;
		box-sizing: border-box;
	}
	.bottom a {
		display: inline-block;
		float: left;
		width: 50%;
		text-align: center;
	}
	.bottom i { 
		padding-right: 10px;
	}
	.bottom a:first-child:after {
	    content: '|';
	    float: right;
	    color: #dfdfdf;
	}
	.bottom .icon-kefu {
		font-size: 20px;
	}
	.iconfont.icon-icon-shoucang1 {
		color: #fff;
	}
</style>