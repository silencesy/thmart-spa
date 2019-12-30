<template>  
  <div class="Cart">  
    <div class="cart-container" v-show="showGoods">
    	<div class="shop-item" v-for="(item,index) in dataList" :key="index">
    		<div class="title">
    			<div class="item-input" @click="shopAll(item.brandId,item.shopAll)">
					<img class="checkbox-img" v-show="item.shopAll" src="../../assets/images/check.png" alt="">
					<i class="not-select" v-show="!item.shopAll"></i>
		    	</div>
		    	<div class="go-shop" @click="goShop(item.brandId)">
		    		<div class="shop-name-box">
			    		<i class="iconfont icon-shanghu1"></i> <span class="shop-name">{{item.brandName}}</span>
			    	</div>
			    	<div class="right-arrow">
			    		<i class="iconfont icon-combinedshapefuben"></i>
			    	</div>
		    	</div>
    		</div> 
			<div class="goods-container">
    			<div class="goods-item" v-for="(goodsval,index) in item.data" :key="index">
    				<div class="item-input goods-input" @click="selectGoods(goodsval,item.brandId)">
						<img class="checkbox-img" v-show="goodsval.isSelect" src="../../assets/images/check.png" alt="">
						<i class="not-select" v-show="!goodsval.isSelect"></i>
			    	</div>
    				<div class="img-box">
    					<router-link :to="{path: 'GoodsDetails', query: {id:goodsval.goodsId}}">
    						<img :src="goodsval.pic" height="200" width="200" alt="">
    					</router-link>
    				</div>
    				<div class="info">
    					<router-link :to="{path: 'GoodsDetails', query: {id:goodsval.goodsId}}">
	    					<div class="name">{{goodsval.goodsName}}</div>
	    					<div class="flag">
	    						<span v-for="(val,key) in goodsval.prop" :key="key">{{val[0]}}</span>
	    					</div>
	    					<div class="reduction" v-show="goodsval.over">
	    						{{goodsval.reduce}} less per {{goodsval.over}} purchase
	    					</div>
	    				</router-link>
    					<div class="bottom-info">
    						<span class="theme_color">￥{{goodsval.price}}</span>
    						<Count @add="add(goodsval.number,goodsval.cartId)" @less="less(goodsval.number,goodsval.cartId)" :number="Number(goodsval.number)" :yanse="goodsval.number==1?true:false"/>
    						<i class="iconfont icon-shanchu" @click="deleteCart(goodsval.cartId,item.brandId)"></i>
    					</div>
    					
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
    <div class="bottom-row" v-show="showGoods">
    	<div class="check-all" @click="allSelectFun(allSelect)">
    		<div class="all-input" v-show="allSelect">
    			<img class="checkbox-img" src="../../assets/images/check.png" alt="">
    			<div>All</div>
    		</div>	
			<div class="all-input" v-show="!allSelect">
				<i class="not-select"></i>
				<div>All</div>
			</div>
			
    	</div>
    	<div class="right">
    		<div class="price">
    			<div class="no-couponPrice" v-show="!couponPrice">
    				<div class="clearfix">
    					<div class="price-title">Total:</div><div class="final-price theme_color">￥ {{total}}</div>
    				</div>
    			</div>
    			<div class="price-number" v-show="couponPrice">
    				<div class="clearfix">
    					<div class="price-title">Total:</div><div class="final-price theme_color">￥ {{total}}</div>
    				</div>
    				<div class="offer theme_color">Coupon ¥ {{couponPrice}}</div>
    			</div>
    		</div>
    		<div class="buy-btn" @click="buy">
    			<span>Checkout Now</span>
    		</div>
    	</div>
    </div>
    <!-- 空购物车 -->
    <div class="login unite" v-show="isEmpty">
    	<div class="title">Your cart is current</div>
    	<router-link to="/">
    		<div class="info">
    			<span>Start Shopping</span>
    		</div>
    	</router-link>
    </div>
    <!-- 没有登录 -->
    <div class="shopping unite" v-show="isLogin">
    	<div class="title">Please log in first!</div>
    	<div class="info">
    		<span @click="login">LOG IN / SIGN UP</span>
    	</div>
    </div>
		<BottomBar active="3" />
  </div>  
</template>  
  
<script> 
import Count from '@/components/BaseComponents/Count'
import { Toast,MessageBox } from 'mint-ui';
import wxMixin from '../../utils/weixinShare.js';
export default {
	name: 'Cart',
	mixins: [wxMixin],
  data() {  
    return {  
       isLogin: false,
       isEmpty: false,
       showGoods: false,
       dataList: [],
       couponPrice: '',
	   total: '',
	   ispay: 1,
       allSelect: false,
       goodsCunt: 0,
       goodsSelectCount: 0
    }
  },
  created() {
  	// 页面加载判断用户是否登录
  	this.isLoginFun();
  	// 如果登录加载数据
  	if (!this.isLogin) this.getCartList();
  },
  components: {
		Count,
		BottomBar: r => { require.ensure([], () => r(require('../BaseComponents/BottomBar')), 'BottomBar') }
  },
  methods: {
  	// 跳转商户详情页
  	goShop(id) {
  		this.$router.push({ name: 'ShopHome', query: { id: id }})
  	},
  	// 跳转登录
  	login() {
  		// 设置回跳地址
  		this.setlocalStorage("goback",window.location.href);
  		this.$router.push({name: 'Login'});
  	},
  	// 获取购物车数据
  	getCartList() {
  		var that = this;
  		that.$http.post(this.urls.getCartList)
		.then(function (response) {
			console.log(response); 
			if (response.data.data.data.length==0) {
				that.isEmpty = true;
				that.showGoods = false;
			} else {
				// console.log(response.data);
				that.dataList = response.data.data.data;
				that.total = response.data.data.total;
				that.ispay = response.data.data.ispay;
				that.couponPrice = response.data.data.reduceTotal;
				that.showGoods = true;
				that.initData();
			}
			
		});
  	},
  	// 判断是否登录
  	isLoginFun() {
  		// getToken 统一工具函数里面定义的
  		this.getToken()?this.isLogin=false:this.isLogin=true;
  	},
  	// 加数量（count组件）
  	add(number,cartId) {
  		number++;
		var that = this;
		that.$http.post(this.urls.CartEditNumber,{cartId: cartId,number: number})
		.then(function (response) {
			if (response.data.message == "success") {
				// that.getCartList();
				if (response.data.code == 1) {
					// 赋值总价
					that.total = response.data.data.total;
					// 赋值满减
					that.couponPrice = response.data.data.reduceTotal;
					that.setGoodsNumber(number,cartId);
				}
			}
		});
	},
	// 设置购物车数量
	setGoodsNumber(number,cartId) {
		for (var i = 0; i < this.dataList.length; i++) {
			for(var key in this.dataList[i]) {
				if (key == 'data' || typeof(this.dataList[key]) == "object" && 
      Object.prototype.toString.call(this.dataList[key]).toLowerCase() == "[object object]" && !this.dataList[key].length) {
					for (var j = 0; j < this.dataList[i]['data'].length; j++) {
						if (this.dataList[i]['data'][j].cartId == cartId) {
							this.dataList[i]['data'][j].number = number;
						} 
					}
				}
				
			}
		}
	},
	// 减数量（count组件）
	less(number,cartId) {
		number--;
		if (number == 0) {
			return false;
		}
		var that = this;
		that.$http.post(this.urls.CartEditNumber,{cartId: cartId,number: number})
		.then(function (response) {
			if (response.data.message == "success") {
				if (response.data.code == 1) {
						// 赋值总价
					that.total = response.data.data.total;
					// 赋值满减
					that.couponPrice = response.data.data.reduceTotal;
					that.setGoodsNumber(number,cartId);
				}
			}
		});
	},
	// 删除购物车
	deleteCart(id,brandId) {
		var that = this;
		MessageBox.confirm('', { 
          message: 'Are you sure to delete?', 
          title: '', 
          confirmButtonText: 'Done', 
          cancelButtonText: 'Cancel' 
        }).then(action => { 
          	that.$http.post(this.urls.Cartdelete,{cartId: id})
			.then(function (response) {
				if (response.data.message == "success") {
					console.log(response);
					// 赋值总价
					that.total = response.data.data.total;
					that.ispay = response.data.data.ispay;
					// 赋值满减
					that.couponPrice = response.data.data.reduceTotal;
					for (var i = 0; i < that.dataList.length; i++) {
						for(var key in that.dataList[i]) {
							if (key == 'data' || typeof(that.dataList[key]) == "object" && 
			      Object.prototype.toString.call(that.dataList[key]).toLowerCase() == "[object object]" && !that.dataList[key].length) {
								for (var j = 0; j < that.dataList[i]['data'].length; j++) {
									if (that.dataList[i]['data'][j].cartId == id) {
										// 删除商品
										that.dataList[i]['data'].splice(j, 1);
										// 如果每个商户下的所以商品删除完，那么该商户也删除掉
										if (that.dataList[i]['data'].length == 0) {
											that.dataList.splice(i, 1);
											// 跳出循环（因为我们删除了要循环的数据，如果不跳出循环就会报错）
											break;
										}
									}
								}
							}
							
						}
					}
					// 判断商户是否选中
					that.getSingleShopSelectedNumber(brandId);
					// 如果都删除完了就显示空购物车
					that.showIsEmpty();
					// 控制所有选中按钮的状态
					that.controlAllSelect();
				}
			});
        }).catch(err => {});
	},
	// 选中单件商品
	selectGoods(goods,brandId) {
		var that = this;
		that.$http.post(this.urls.CartChangeSelectAndTotalPrice,{
			isSelect: goods.isSelect?0:1,
			cartIdArray: [goods.cartId]
		}).then(function (response) {
			if (response.data.message == "success") {
				if (response.data.code == 1) {
						// 赋值总价
					that.total = response.data.data.total;
					that.ispay = response.data.data.ispay;
					// 赋值满减
					that.couponPrice = response.data.data.reduceTotal;
					// 设置单个商品选中状态
					that.setSelectGoods(goods.skuId,goods.isSelect);
					// 设置商户选中状态
					that.getSingleShopSelectedNumber(brandId);
					// 控制所有选中按钮的状态
					that.controlAllSelect();
				}
			}
		});
	},
	// 设置选中单个商品
	setSelectGoods(skuId,status) {
		for (var i = 0; i < this.dataList.length; i++) {
			for(var key in this.dataList[i]) {
				if (key == 'data' || typeof(this.dataList[key]) == "object" && 
      Object.prototype.toString.call(this.dataList[key]).toLowerCase() == "[object object]" && !this.dataList[key].length) {
					for (var j = 0; j < this.dataList[i]['data'].length; j++) {
						if(this.dataList[i]['data'][j].skuId == skuId) {
							this.dataList[i]['data'][j].isSelect = !status;
						}
					}
				}
				
			}
		}
		
	},
	// 选中一个商户关联商户下面的所有商户选中或者不选中
	shopAll(brandId,status) {
		var that = this;
		// console.log(brandId,status);
		var cartIdArray = [];
		for (var i = 0; i < that.dataList.length; i++) {
			for(var key in that.dataList[i]) {
				if (that.dataList[i].brandId == brandId) {
					if (key == 'data' || typeof(that.dataList[key]) == "object" && 
	      Object.prototype.toString.call(that.dataList[key]).toLowerCase() == "[object object]" && !that.dataList[key].length) {
						for (var j = 0; j < that.dataList[i]['data'].length; j++) {
							cartIdArray.push(that.dataList[i]['data'][j].cartId);
						}
					}
				}
			}
		}
		console.log(cartIdArray);
		that.$http.post(that.urls.CartChangeSelectAndTotalPrice,{
			isSelect: status?0:1,
			cartIdArray: cartIdArray
		}).then(function (response) {
			if (response.data.message == "success") {
				if (response.data.code == 1) {
						// 赋值总价
					that.total = response.data.data.total;
					that.ispay = response.data.data.ispay;
					// 赋值满减
					that.couponPrice = response.data.data.reduceTotal;
					// 批量设置选中
					that.multipleSelect(brandId,status,cartIdArray);
					// 控制所有选中按钮的状态
					that.controlAllSelect();
				}
			}
			
		});
	},
	// 批量设置选中
	multipleSelect(brandId,status,cartIdArray) {
		var that = this;
		for (var i = 0; i < that.dataList.length; i++) {
			for(var key in that.dataList[i]) {
				if (that.dataList[i].brandId == brandId) {
					that.dataList[i].shopAll = !status;
					if (key == 'data' || typeof(that.dataList[key]) == "object" && 
	      Object.prototype.toString.call(that.dataList[key]).toLowerCase() == "[object object]" && !that.dataList[key].length) {
						for (var j = 0; j < that.dataList[i]['data'].length; j++) {
							that.dataList[i]['data'][j].isSelect = !status;
							cartIdArray.push(that.dataList[i]['data'][j].cartId);
						}
					}
				}
			}
		}
	},
	// 所有全选和反选
	allSelectFun(allSelect) {
		var that = this;
  		if (!allSelect) {
			that.$http.post(this.urls.CartChangeSelectAndTotalPrice,{
				allSelect: 1
			}).then(function (response) {

				if (response.data.message == "success") {
					if (response.data.code == 1) {
							// 赋值总价
						that.total = response.data.data.total;
						that.ispay = response.data.data.ispay;
						// 赋值满减
						that.couponPrice = response.data.data.reduceTotal;
						that.setAllSelect(!allSelect);
						that.allSelect = !allSelect;
					}
				}
				
			});
  		} else {
  			that.$http.post(this.urls.CartChangeSelectAndTotalPrice,{
				allSelect: 0
			}).then(function (response) {
				if (response.data.message == "success") {
					if (response.data.code == 1) {
							// 赋值总价
						that.total = response.data.data.total;
						that.ispay = response.data.data.ispay;
						// 赋值满减
						that.couponPrice = response.data.data.reduceTotal;
						that.setAllSelect(!allSelect);
						that.allSelect = !allSelect;
					}
				}
			});
  		}
	},
	// 设置所有选中的状态
	setAllSelect(allSelect) {
		for (var i = 0; i < this.dataList.length; i++) {
			for(var key in this.dataList[i]) {
				this.dataList[i].shopAll = allSelect;
				if (key == 'data' || typeof(this.dataList[key]) == "object" && 
      Object.prototype.toString.call(this.dataList[key]).toLowerCase() == "[object object]" && !this.dataList[key].length) {
					for (var j = 0; j < this.dataList[i]['data'].length; j++) {
						this.dataList[i]['data'][j].isSelect = allSelect;
					}
				}
				
			}
		}
	},
	// 控制所有选中按钮的状态
	controlAllSelect() {
		var shopSelectLength=0;
		for (var i = 0; i < this.dataList.length; i++) {
			if (this.dataList[i].shopAll == true) {
				shopSelectLength++;
			}
		}
		if (shopSelectLength == this.dataList.length) {
			this.allSelect = true;
		} else {
			this.allSelect = false;
		}
	},
	// 数据格式化initData  (因为后台返回真假为1/0 初始化为true/false )
	initData() {
		for (var i = 0; i < this.dataList.length; i++) {
			for(var key in this.dataList[i]) {
				if (key == 'data' || typeof(this.dataList[key]) == "object" && 
      Object.prototype.toString.call(this.dataList[key]).toLowerCase() == "[object object]" && !this.dataList[key].length) {
					for (var j = 0; j < this.dataList[i]['data'].length; j++) {
						// console.log(this.dataList[i]['data'][j].isSelect);
						if (this.dataList[i]['data'][j].isSelect == 0) {
							this.dataList[i]['data'][j].isSelect = false;
						} else {
							this.dataList[i]['data'][j].isSelect = true;
						}
					}
				}
				
			}
		}
		this.controlAllSelect();
	},
	// 获取单个商户选中的商品的个数
	getSingleShopSelectedNumber(brandId) {
		// 单个商户下总商品个数
		var shopGoodsNumber = 0;
		// 单个商户下选中的个数
		var selectedNumber = 0;
		for (var i = 0; i < this.dataList.length; i++) {
			for(var key in this.dataList[i]) {
				if (this.dataList[i]['brandId'] == brandId && key == 'data' || typeof(this.dataList[key]) == "object" && 
      Object.prototype.toString.call(this.dataList[key]).toLowerCase() == "[object object]" && !this.dataList[key].length) {
					for (var j = 0; j < this.dataList[i]['data'].length; j++) {
						shopGoodsNumber++;
						if (this.dataList[i]['data'][j].isSelect == "true" || this.dataList[i]['data'][j].isSelect == 1) {
							selectedNumber++;
						}
					}
				}
			}
		}
		// 如果该商户的商品总数等于该商户的选中的商品的个数 ，那么该商户选中
		if (shopGoodsNumber == selectedNumber) {
			for (var i = 0; i < this.dataList.length; i++) {
				for(var key in this.dataList[i]) {
					if (this.dataList[i]['brandId'] == brandId && key == 'data' || typeof(this.dataList[key]) == "object" && 
	      Object.prototype.toString.call(this.dataList[key]).toLowerCase() == "[object object]" && !this.dataList[key].length) {
						this.dataList[i].shopAll = true;
					}
				}
			}
		} else {
			for (var i = 0; i < this.dataList.length; i++) {
				for(var key in this.dataList[i]) {
					if (this.dataList[i]['brandId'] == brandId && key == 'data' || typeof(this.dataList[key]) == "object" && 
	      Object.prototype.toString.call(this.dataList[key]).toLowerCase() == "[object object]" && !this.dataList[key].length) {
						this.dataList[i].shopAll = false;
					}
				}
			}
		}
	},
	// 显示空的购物车
	showIsEmpty() {
		if (this.dataList.length == 0) {
			this.isEmpty = true;
			this.showGoods = false;
		}
	},
	// 购买btn
	buy() {
		// 提示用户勾选商品
		if (this.total == 0) {
			Toast('Please select at least one goods before the payment.');
		} else if (this.ispay == 0) {
			Toast('To purchase eTickets, please submit your order separately.');
		} else {
			this.$router.push('OrderConfirmation');
		}
	}
  }
};  
</script>  
  
<style scoped>
	.iconfont.icon-shanghu1 {
		color: #999;
		margin-right: 5px;
	}
	.iconfont.icon-combinedshapefuben {
		color: #ccc;
	}
	.cart-container {
		padding: 10px 10px 110px 10px;
	}
	.shop-item {
		/*padding: 10px;*/
		border: 1px solid #dfdfdf;
		margin-bottom: 10px;
		background-color: #fff;
		border-radius: 4px;
	}
	.shop-item .title {
		height: 40px;
	}
	.go-shop {
		width: 100%;
		height: 40px;
	}
	.placeholder-ele {
		color: transparent;
	}
	.item-input {
		padding: 9px;
		float: left;
	}

	.item-input .defaultCheckbox + label {
		color: #666;
		width: 10px;
		height: 40px;
		line-height: 40px;
	}
	.item-input .defaultCheckbox + label:before {
		top: 10px;
		left: 10px;
	}
	.item-input .defaultCheckbox + label:after {
		top: 10px;
		left: 10px;
	}
	.shop-name-box {
		line-height: 40px;
		float: left;
	}
	.shop-name {
		color: #666;
	}

	.right-arrow {
		float: right;
		height: 40px;
		line-height: 40px;
		margin-right: 10px;
	}


	.goods-container {
		background-color: #F9F9F9;
		padding: 5px 0;
	}

	.goods-item {
		display: flex;
		padding: 5px 0;
	}
	.goods-item .img-box {
		flex: 1.2;
	}
	.goods-item .img-box img {
		width: 100%;
		height: auto;
	}
	.goods-item .info {
		flex: 3;
		box-sizing: border-box;
		padding: 0 10px;
	}

	.goods-item .info .name {
		font-size: 16px;
	}
	.goods-item .info .flag span {
		color: #999;
		font-size: 14px;
		margin-right: 5px;
	}

	.full-reduction {
		font-size: 14px;
		height: 40px;
		line-height: 40px;
		padding-left: 40px;
	}


	.bottom-row {
		max-width: 750px;
		height: 55px;
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		top: auto;
		bottom: 55px;
		margin: auto;
	    -webkit-box-shadow: 0 0 2px #dedede;
    	box-shadow: 0 0 2px #dedede;
	}
	.check-all {
		width: 80px;
		padding-left: 19px;
		float: left;
		height: 55px;
	}
	.bottom-row .defaultCheckbox + label {
		color: #666;
		height: 55px;
		line-height: 55px;
	}
	.bottom-row .defaultCheckbox + label:before {
		top: 15px;
	}
	.bottom-row .defaultCheckbox + label:after {
		top: 15px;
	}

	.right {
		height: 55px;
		display: flex;
	}
	.right > .price {
		flex: 1.2;
	}
	.right > .buy-btn {
		flex: 1;
	}
	.price {
		padding-top: 5px; 
	}
	.price-title {
		float: left;
	}
	.price-number > div {
		text-align: right;
	}
	.no-couponPrice {
		line-height: 45px;
	}
	.no-couponPrice .final-price {
		float: right;
	}
	.final-price {
		font-weight: 900;
		font-size: 14px
	}
	.offer {
		font-size: 12px;		
	}
	.buy-btn {
		padding: 8px 10px;
		text-align: center;
	}
	.buy-btn span {
		display: inline-block;
		width: 100%;
		height: 35px;
		line-height: 35px;
		background-color: #F9421E;
		color: #fff;
		border-radius: 16px;
		font-size: 14px;
	}
	.unite {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		max-width: 750px;
		text-align: center;
		margin: auto;
		height: 80px;

	}
	.unite .title {
		color: #999;
		font-size: 14px;
		margin-bottom: 10px;
	}
	.unite .info span {
		background-color: #F9421E;
		color: #fff;
		font-size: 16px;
		display: inline-block;
		padding: 6px 15px;
		border-radius: 30px;
	}
	.reduction {
	 	color: #999;
    	font-size: 14px;
	}
	.bottom-info {
		display: flex;
		margin-top: 8px;
		justify-content: space-between;
	}
	.bottom-info > span {
		line-height: 32px;
		padding-right: 8px;
	}
	.iconfont.icon-shanchu {
		color: #aaa;
		align-self: center;
		padding: 5px 10px;
	}
	.iconfont.icon-xuanzhong {
		color: #F9421E;
		font-size: 22px;
	}
	.not-select {
		display: inline-block;
		width: 20px;
		height: 20px;
		border: 1px solid #dfdfdf;
		border-radius: 50%;
	}
	.goods-input {
		position: relative;
		width: 22px;
	}
	.all-input {
		display: flex;
		padding-top: 15px;
	}
	.all-input > div {
		margin-left: 8px;
		padding-top: 2px;
	}
	.goods-input .not-select, .goods-input .checkbox-img{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	.checkbox-img {
		width: 22px;
		height: 22px;
	}
</style>  