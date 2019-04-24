<template>
	<div class="goods" v-show="goodsData.id">
		<GoodsSwiper :swiperData="goodsData.figure"/>
		<div class="title-info">
			<p class="name">{{goodsData.title}}</p>
			<p class="price theme_color">￥{{goodsData.price}}</p>
			<p class="price" v-show="goodsData.coupon_price"><del>￥{{goodsData.max_price}}</del></p>
			<p>* This product ships to Mainland China only.(An extra shipping fee will be charged for HKSAR,MCSAR and other countries/regions)</p>
		</div>
		<div class="row-line" @click="showBuy('specifications')">
			Specifications <i class="icon-combinedshapefuben iconfont"></i>
		</div>
		<div class="row-line">
			Details
		</div>
		<div class="content-info" v-html="goodsData.detail"></div>
		<div class="bottom-banner">
			<div class="features">
				<div class="icon-box">
					<i class="iconfont icon-shanghu1"></i>
					<div>Home</div>
				</div>
				<div class="icon-box">
					<i class="iconfont icon-kefu"></i>
					<div>Chat</div>
				</div>
				<div class="icon-box">
					<i class="iconfont icon-shoucang1"></i>
					<div>Save</div>
				</div>
			</div>
			<div class="cart-buy">
				<div @click="showBuy('cart')">Add To Cart</div>
				<div @click="showBuy('buy')">Buy Now</div>
			</div>
		</div>
		<div class="layer-container">
			<div v-show="layerBox" class="layer-bg" @click="close"></div>
			<div class="buy-goods-info" :style="{bottom: bottom}">
				<div class="single-sku-info">
					<div class="sku-info-img">
						<img src="https://api.mall.thatsmags.com/Public/ckfinder/images/flower/IOU/主图1.jpg" alt="">
					</div>
					<div class="sku-info-text">
						<p class="price theme_color">￥169</p>
						<p><span>180ml</span><span>Green</span></p>
						<p>Stock:50</p>
						<i class="iconfont icon-guanbi" @click="close"></i>
					</div>
				</div>
				<ScrollView ref="ScrollView" height="290" :loadding="loadding" :open="open">
					<div class="choose-sku">
						<div class="classification" v-for="(value, key, index) in selectArr">
							<div class="title">{{key}}</div>
							<div class="Option-box clearfix">
								<span class="Option-item" v-for="(item,index) in value" :class="{active: item.selected,disabled: item.disabled}" @click="optionClick(item,key)">{{item.val}}</span>
								
							</div>
						</div>
					</div>
	        	</ScrollView>
	        	<div class="quantity">
	        		<span>quantity</span>
	        		<span>
	        			<Count @add="add" @less="less" :number="number" :yanse="yanse" />
	        		</span>
	        	</div>
	        	<div class="btn-box">
	        		<div v-show="showRowBtn=='specifications'" class="btn specifications">
	        			<div>Add To Cart</div>
	        			<div>Buy Now</div>
	        		</div>
	        		<div v-show="showRowBtn=='cart'" class="btn add-cart-btn">Done</div>
	        		<div v-show="showRowBtn=='buy'" class="btn">Done</div>
	        	</div>
			</div>
		</div>
		<BackToTop />
	</div>
</template>
<script>
	export default {
		name: 'goods',
		data() {
			return {
				// 商品信息
				goodsData: {},
				// 购买弹出框
				layerBox: false,
				// 基于定位实现动画
				// bottom: "-700px",
				bottom: "0",
				// 滑动区块的高度
				scrollViewHeight: 100,
				// 不需要加载
				loadding: false,
				// 开启区块
				open: false,
				// 购买数量
				number: 1,
				// 控制显示弹出框底部按钮
				showRowBtn: "specifications",
				// 更改加减组件的颜色
				yanse: true,
				// sku分类选项
				selectArr: {}
			}
		},
		components: {
			GoodsSwiper: r => { require.ensure([], () => r(require('@/components/BaseComponents/BaseSwiper')), 'GoodsSwiper') },
			BackToTop: r => { require.ensure([], () => r(require('@/components/BaseComponents/BackToTop')), 'BackToTop') },
			ScrollView: r => { require.ensure([], () => r(require('@/components/BaseComponents/ScrollView')), 'ScrollView') },
			Count: r => { require.ensure([], () => r(require('@/components/BaseComponents/Count')), 'Count') },
		},
		mounted() {
  		// console.log(this.$route.params.id);
  		this.getData();
  		// console.log(this.urls.productDetails)
  	},
  	methods: {
  		getData() {
  			let that = this;
  			that.$http.get(that.urls.productDetails,{
	          params: {id:4}
	        })
	        .then(function (response) {
	        	console.log(response);
				that.goodsData = response.data.data;
				console.log(that.goodsData.skuList);
				that.dataProcessing(that.goodsData.skuList);
	        })
	        .catch(function (error) {
	          console.log(error);
	        });
  		},
  		go() {
  			this.$router.go(-1);
  		},
  		showBuy(flag) {
  			this.layerBox = true;
  			this.bottom = 0;
  			// 开启类型滑块
  			if (!this.open) {
  				this.open = true;
  			}
  			this.showRowBtn =flag;
  		},
  		close() {
  			this.layerBox = false;
  			this.bottom = "-700px";
  		},
  		add() {
  			this.number++;
  			if (this.yanse) {
  				this.yanse = false;
  			}
  		},
  		less() {
  			if (this.number == 1) {
  				return false;
  			} else {
  				this.number--;
  				if (this.number == 1) {
  					this.yanse = true;
  				}
  			}
  			
  		},
  		// 把数据格式化
  		dataProcessing(data) {
  			// 类别名字
  			var className = [];
  			// 类别对象
  			var option = {};
  			// 循环获取类别名字放在数组
  			for (var i = 0; i < data.length; i++) {
  				for (var k in data[i].propName) {
  					className.push(k);
  				}
  			}
  			// 去重
  			className = className.distinct();
  			// 循环生成类别对象
  			for (var f = 0; f < data.length; f++) {
  				for (var j = 0; j < className.length; j++) {
		  			for (var g in data[f].propName) {
		  				if (!option[className[j]]) {
		  					option[className[j]] = [];
		  				}
		  				if(g == className[j]) {
		  					option[className[j]].push({val: data[f].propName[g][0],selected: false,disable: false});
		  				}
		  			}
	  			}
  			} 
  			// 去重选项(数组里面是对象)
  			for (var l = 0; l < className.length; l++) {
  				option[className[l]] = this.arrayUnique2(option[className[l]],'val');
  			}
  			// 添加选中和禁用属性
  			for (var p in option) {
  				if(option[p].length == 1) {
  					// 当选项只有一个的时候默认选中
  					option[p][0].selected = true;
  				}
   			}
  			this.selectArr = option;
  		},
  		optionClick(item,key) {
  			// console.log(this.selectArr);
  			// console.log(item.val)
  			// console.log(key)
  			// for (var selectArrkey in this.selectArr) {
  				// console.log(key)
  				// console.log(selectArrkey);
  				// if (key!==selectArrkey) {
  					// console.log(item);
  					var arrr = [];
  					for (var i = 0; i < this.goodsData.skuList.length; i++) {
  						// console.log(this.goodsData.skuList[i].propName[key]);
  						// console.log(item.val);
  						if (this.goodsData.skuList[i].propName[key][0] == item.val) {
  							// console.log(this.goodsData.skuList[i])
  							arrr.push(this.goodsData.skuList[i]);
  							// console.log(this.goodsData.skuList[i]);
  							// for (var j = 0; j < this.goodsData.skuList[i].length; j++) {
  							// 	console.log(this.goodsData.skuList[i][j]);
  							// }
  							// if (true) {}
  						}
  					}
  					this.getCheckedVal(arrr);
  				// }
  			// }
  			var list = [];
  			// // 选中控制样式
  			for (var k = 0; k < this.selectArr[key].length; k++) {
  				if (this.selectArr[key][k].val == item.val) {
					// 一个都没有选中就选中当前或者取消所有选择 然后选中当前
					for (var i = 0; i < this.selectArr[key].length; i++) {
		  				this.selectArr[key][i].selected = false;
		  			}
		  			this.selectArr[key][k].selected = true;
  				}
  			}
  			
  			

  			// for (var j = 0; j < this.goodsData.skuList.length; j++) {
  			// 	if (item.val == this.goodsData.skuList[j].propName[key][0]) {
  			// 		list.push(this.goodsData.skuList[j]);
  			// 	}
  			// }
  			
  		},
  		getCheckedVal(data) {
  			// console.log(data);
  			var goodsType = [];
  			for (var i = 0; i < data.length; i++) {
  				// // // console.log(data[i]);
  				for (var key in data[i].propName) {
  					// for (var i = 0; i < this.selectArr.length; i++) {
  				// 	// 	if (this.selectArr[i][key].val == data[i].propName[key][0]) {
  				// 	// 		this.selectArr[i][key].selected = true;
  				// 	// 	} else {
  				// 	// 		this.selectArr[i][key].selected = false;
  				// 	// 	}
  				// 	// }
  					// console.log(this.selectArr[key][0].val);
  					
  				}
  			}
  			
  		}
  	}
	}
</script>
<style scoped>
	.goods {
		width: 100%;
		background-color: #E8E8E8;
	}
	.title-info {
		margin-top: 10px;
		background-color: #fff;
	}
	.name {
		font-weight: 900;
		font-size: 18px;
	}
	.price del {
		font-size: 12px;
	}
	.title-info {
		padding: 15px;
	}
	.row-line {
		margin-top: 10px;
		height: 44px;
		line-height: 44px;
		background-color: #fff;
		padding: 0 10px;
	}
	.mint-cell:last-child {
		background-image: none;
	}
	.content-info {
		border-top: 1px solid #dfdfdf;
		padding: 10px;
		background-color: #fff;
		margin-bottom: 50px;
	}
	.content-info >>> img {
		display: block;
		width: 100% !important;
		height: auto !important;
	}
	.bottom-banner {
		height: 50px;
		max-width: 750px;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		top: auto;
		right: 0;
		margin: auto;
		display: flex;
		box-shadow: 0 0 2px #dedede;
		z-index: 1;
		cursor: pointer;
	}
	.bottom-banner > div {
		height: 50px;
		line-height: 50px;
	}
	.bottom-banner .features {
		display: flex;
		flex: 1;
	}
	.bottom-banner .features .icon-box {
		height: 50px;
		text-align: center;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.icon-box i {
		color: #919191;
		height: 25px;
		line-height: 32px;
		font-size: 22px;
	}
	.icon-box div {
		height: 25px;
		line-height: 25px;
		text-align: center;
		font-size: 12px;
	}
	.bottom-banner .cart-buy {
		display: flex;
		flex: 1;
	}
	.bottom-banner .cart-buy > div {
		text-align: center;
		color: #fff;
		font-size: 16px;
	}
	.bottom-banner .cart-buy > div:nth-child(1) {
		background-color: #f6b12b;
		flex: 1.3;
	}
	.bottom-banner .cart-buy > div:nth-child(2) {
		background-color: #f6442b;
		flex: 1;
	}
	.layer-bg {
		width: 750px;
		height: 100%;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background-color: rgba(0,0,0,0.45);
		z-index: 100;
	}
	.buy-goods-info {
		position: fixed;
		height: 480px;
		max-width: 750px;
		background-color: #fff;
		left: 0;
		bottom: '-700px';
		top: auto;
		right: 0;
		margin: auto;
		z-index: 200;
		transition: all 0.3s ease; 
	}
	.single-sku-info {
		padding: 0 10px;
		box-sizing: border-box;
	}
	.single-sku-info .sku-info-img {
		position: relative;
		width: 100px;
	}
	.single-sku-info .sku-info-img img {
		width: 100%;
		position: absolute;
		left: 0;
		top: -20px;
		border-radius: 8px;
		box-shadow: 1px 0px 10px rgba(0,0,0,0.2);
	} 
	.single-sku-info .sku-info-text {
		padding-left: 110px;
		color: '#666';
		position: relative;
		box-sizing: border-box;
		border-bottom: 1px solid #DFDFDF;
		padding-bottom: 12px
	}
	.single-sku-info .sku-info-text p {
		padding: 2px 0;
	}
	.iconfont.icon-guanbi {
		position: absolute;
		right: 0;
		top: 10px;
		color: #999;
		font-size: 24px;
	}
	.choose-sku {
		padding: 5px 10px;
	}
	.classification {
		padding: 5px 0;
		border-bottom: 1px solid #DFDFDF;
	}
	.classification span {
		font-size: 14px;
	}
	.Option-box {
		padding: 5px 0;
	}
	.Option-item {
		display: inline-block;
		padding: 5px 8px;
		border-radius: 4px;
		background-color: #DFDFDF;
		float: left;
		margin-right: 10px;
	}
	.Option-item.active {
		background-color: #F9421E;
		color: #fff;
	}
	.quantity {
		display: flex;
		padding: 10px;
	}
	.quantity > span {
		flex: 1;
	}
	.btn-box {
		padding: 0 10px;
	}
	.btn-box .btn {
		display: inline-block;
		width: 100%;
		height: 36px;
		line-height: 36px;
		text-align: center;
		background-color: #F9421E;
		color: #fff;
		border-radius: 18px;
	}
	.btn.add-cart-btn {
		background-color: #f6b12b;
	}
	.btn-box .specifications {
		display: flex;
	}
	.specifications > div {
		flex: 1;
		color: #fff;
		height: 36px;
		line-height: 36px;
	}
	.specifications > div:nth-child(1) {
		background-color: #f6b12b;
		border-top-left-radius: 18px;
		border-bottom-left-radius: 18px;
	}
	.specifications > div:nth-child(2) {
		background-color: #F9421E;
		border-top-right-radius: 18px;
		border-bottom-right-radius: 18px;
	}
	.icon-combinedshapefuben.iconfont {
		float: right;
		color: #dfdfdf;
	}
</style>