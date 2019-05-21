<template>  
  <div class="MyAccount">  
<!--   	<div class="title">
	    <div class="touxiang"> 
				<img src="static/images/common/home-cover.png" alt="">
				<span>xiaoxiedai</span>
 			</div>
	  	<router-link to="/" class="edit">Edit</router-link>
		</div>
		<div class="state">
			<router-link to="/" class="stateTitle">
				<div>Orders</div>
				<div>All <span class="iconfont icon-combinedshapefuben"></span></div>
			</router-link>
			<div class="status">
				<router-link to="/">
					<span class="iconfont icon-daifukuan"></span>
					<p>Unpaid</p>
				</router-link>
				<router-link to="/">
					<span class="iconfont icon-fahuo"></span>
					<p>Paid</p>
				</router-link>
				<router-link to="/">
					<span class="iconfont icon-daishouhuo"></span>
					<p>Shipped</p>
				</router-link>
			</div>
		</div>
		<div class="myItem">
			<router-link to="/AddressBook">
				<span class="iconfont icon-shouhuodizhi"></span>
				<p>Address Book</p>
			</router-link>
			<router-link :to="{name: 'WishList',params: {GoodsId:'123123'}}">
				<span class="iconfont icon-shoucang"></span>
				<p>Wishlist</p>
			</router-link>
			<router-link to="/CouponsList">
				<span class="iconfont icon-youhuiquan"></span>
				<p>thMart-Coupons</p>
			</router-link>
			<router-link to="/Contact">
				<span class="iconfont icon-shouhou"></span>
				<p>Customer Service</p>
			</router-link>
		</div> -->
		<div class="accountTop">
			<div v-if="userInfo.data">
				<div class="touxiangBox">
					<div class="touxiang"><router-link to='/Login'><img :src="userInfo.pic" alt=""></router-link></div>
					<p>
						<router-link to='/Login'>{{userInfo.data.login}} /</router-link>
						<router-link to='/SignUp'>{{userInfo.data.signup}}</router-link>
						<!-- <router-link to='/'>Rain</router-link> -->
					</p>
				</div>
			</div>
			<div v-if="userInfo.nickname">
				<div class="touxiangBox">
					<router-link to='/PersonalInfo'><div class="touxiang"><img :src="userInfo.pic" alt=""></div></router-link>
					<p>
						<router-link to='/PersonalInfo'>{{userInfo.nickname}}</router-link>
					</p>
				</div>
			</div>
		</div>
		<div class="accountCenter">
			<div class="order">
				<router-link to='/OrderList'>
					<div>My Orders</div>
					<div>All <i class="iconfont icon-combinedshapefuben"></i></div>
				</router-link>
			</div>
			<div class="status">
				<router-link :to="{path: '/OrderList', query: {status: 'Unpaid'}}">
					<span class="iconfont icon-daifukuan"></span>
					<span>Unpaid</span> 
				</router-link>
				<router-link :to="{path: '/OrderList', query: {status: 'Unshipped'}}">
					<span class="iconfont icon-fahuo"></span>
					<span>Unshipped</span> 
				</router-link>
				<router-link :to="{path: '/OrderList', query: {status: 'Progress'}}">
					<span class="iconfont icon-shouhuodizhi"></span>
					<span>In Progress</span> 
					<!-- <span class="number">5</span> -->
				</router-link>
				<router-link :to="{path: '/OrderList', query: {status: 'Shipped'}}">
					<span class="iconfont icon-daishouhuo"></span>
					<span>Shipped</span>	
				</router-link>
			</div>
		</div>
		<div class="accountBottom">
			<router-link to='/AddressBook'>
				<div><i class="iconfont icon-shouhuodizhi"></i>Address Book</div>
				<div><i class="iconfont icon-combinedshapefuben"></i></div>
			</router-link>
			<router-link to="/WishList">
				<div><i class="iconfont icon-shoucang"></i>Wishlist</div>
				<div><i class="iconfont icon-combinedshapefuben"></i></div>
			</router-link>
			<!-- <router-link to='/'>
				<div><i class="iconfont icon-fapiao"></i>Invoice Info</div>
				<div><i class="iconfont icon-combinedshapefuben"></i></div>
			</router-link> -->
			<router-link to='/CouponsList'>
				<div><i class="iconfont icon-youhuiquan"></i>thMart-Coupons</div>
				<div><i class="iconfont icon-combinedshapefuben"></i></div>
			</router-link>
			<!-- <router-link to='/myReviews'>
				<div><i class="iconfont icon-pingjia-copy1"></i>Reviews</div>
				<div><i class="iconfont icon-combinedshapefuben"></i></div>
			</router-link> -->
			<router-link to='/Contact'>
				<div><i class="iconfont icon-shouhou"></i>Customer Service</div>
				<div><i class="iconfont icon-combinedshapefuben"></i></div>
			</router-link>
			<router-link to='/PersonalInfo'>
				<div><i class="iconfont icon-shezhi"></i>Setting</div>
				<div><i class="iconfont icon-combinedshapefuben"></i></div>
			</router-link>
		</div>
		<BottomBar active="4" />
  </div>  
</template>  
  
<script>
	import wxMixin from '../../utils/weixinShare.js';
	export default {  
		name: 'MyAccount',
		mixins: [wxMixin], 
	  data() {  
	    return {  
	       userInfo: {
	       	
	       }
	    };  
	  },
	  created() {
	  	this.getUserInfo();
		},
		components: {
			BottomBar: r => { require.ensure([], () => r(require('../BaseComponents/BottomBar')), 'BottomBar') }
		},
	  methods: {
	  	getUserInfo() {
			var that = this;
			that.$http.post(that.urls.userDetail)
			.then(function (response) {
				that.userInfo = response.data.data;
			});
		}
	  }
	};  
</script>  
  
<style scoped>
	body {
		background: #E8E8E8;
	}
	.MyAccount {
		padding: 10px;
		box-sizing: border-box;
	}
	.accountTop {
		height: 110px;
		background: linear-gradient(#F9421E,#F98F1E);
		border-radius: 4px;
	}
	.touxiangBox {
		padding-top: 15px;
	}
	.touxiang {
		width: 60px;
		height: 60px;
		background-color: #fff;
		border-radius: 30px;
		margin: 0 auto;
	}
	.touxiang img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.accountTop p {
		text-align: center;
		padding-top: 5px;
	}
	.accountTop p a {
		color: #fff;
	}
	.accountCenter {
		background: #fff;
		margin: 10px 0;
		border: 1px solid #DFDFDF;
		border-radius: 4px;
		margin-bottom: 10px;
	}
	.order a {
		display: flex;
		justify-content: space-between;
		height: 40px;
		line-height: 40px;
		padding: 0 15px;
		border-bottom: 1px solid #DFDFDF;
	}
	.order a div:nth-child(2) {
		color: #999;
	}
	.status {
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
	}
	.status a {
		padding: 10px 0;
		position: relative;
	}
	.status a .number {
		position: absolute;
    top: 8px;
    right: 2px;
    background: #F9421E;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    color: #fff;
    font-size: 12px;
	}
	.status a span {
		display: block;
		text-align: center;
	}
	.status a span:nth-child(1) {
		color: #F9421E;
		font-size: 30px;
		padding-bottom: 5px;
	}
	.status a span:nth-child(2) {
		font-size: 14px;
	}
	.accountBottom {
		background: #fff;
		border: 1px solid #dfdfdf;
		border-radius: 4px;
		margin-bottom: 55px;
	}
	.accountBottom a {
		display: flex;
		justify-content: space-between;
		height: 60px;
		line-height: 60px;
		padding: 0 15px;
		border-bottom: 1px solid #DFDFDF;
	}
	.accountBottom a:last-child {
		border-bottom: none;
	}
	.accountBottom a div:nth-child(1) i {
		padding-right: 10px;
	    font-size: 24px;
	    vertical-align: middle;
	    color: #999;
	}
	.iconfont.icon-combinedshapefuben {
		color: #aaa;
	}


/*	.title {
		background: #fff;
		margin-bottom: 15px;
		display: flex;
		padding: 15px;
		box-sizing: border-box;
		align-items: center;
	}
	.edit {
		display: block;
	}
	.touxiang {
		flex: 1;
	}
	.touxiang img {
		width: 50px;
		height: 50px;
		padding-right: 5px;
		vertical-align: middle;
		border-radius: 50%;
	}
	.state {
		background: #fff;
		margin-bottom: 15px;
	}
	.stateTitle {
		display: block;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #dfdfdf;
		padding: 0 15px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	.status {
		display: flex;
		text-align: center;
	}
	.status > a {
		flex: 1;
		padding: 15px 0;
		color: #f6442b;
		display: block;
	}
	.status .iconfont {
		font-size: 30px;
	}
	.status p {
		margin: 0;
		padding-top: 5px;
	}
	.myItem {
		background: #fff;
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 15px 15px 0 15px;
		justify-content: space-between;
		text-align: center;
		flex-wrap: wrap;
	}
	.myItem > a {
		width: 48%;
		margin-bottom: 15px;
		background: #f2f2f2;
		display: block;
		padding: 15px 0;
	}
	.myItem p {
		margin: 0;
		padding-top: 15px;
	}
	.myItem .iconfont {
		font-size: 30px;
		color: #999;
	}
*/
</style>  