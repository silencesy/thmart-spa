<template>
	<div class="OrderConfirmation" v-if="orderConfirmData">
		<div class="address-info-tip" @click="goAddressList('addressList')" v-if="!addrList.length==0">
			<div class="info">
				<div>
					<p><span>{{addrList[0].fullName}}</span><span>{{addrList[0].phone}}</span></p>
					<p>{{addrList[0].email}}</p>
					<p>{{addrList[0].province}} {{addrList[0].city}} {{addrList[0].regionDetail}} </p>
				</div>
				<div class="iconfont icon-combinedshapefuben"></div>
			</div>
			<img src="static/images/common/letter.jpg" alt="">
		</div>
		<div class="address-info-tip" @click="goAddressList('addAdress')" v-if="addrList.length==0">
			<div class="info">
				<div class="info">
					<div>
						<p>Add Shipping Address</p>
					</div>
				</div>
				<div class="iconfont icon-combinedshapefuben"></div>
			</div>
			<img src="static/images/common/letter.jpg" alt="">
		</div>	
		<div class="container">
			<div v-for="(item,index) in orderConfirmData.overReduceArray">
				<FullReductionSection :shopData="item" :key="index">
					<!-- <i class="iconfont icon-combinedshapefuben" slot="titleRight"></i> -->
					<div slot="bottom" class="bottom">
						<p>
							<span>Quantity Discount</span>
							<span class="discount">- ¥ {{item.reduce}}</span>
						</p>
						<p>
							<span>&nbsp;</span>
							<span><i>Total：</i>¥{{item.total}}</span>
						</p>
					</div>
				</FullReductionSection>
			</div>
			<div v-for="(item,index) in orderConfirmData.brandArray">
				<ShopGoodsItem :shopData="item" :key="index">
					<!-- <i class="iconfont icon-combinedshapefuben" slot="titleRight"></i> -->
					<div slot="bottom" class="bottom">
						<p>
							<span>&nbsp;</span>
							<span><i>Total：</i>¥{{item.total}}</span>
						</p>
					</div>
				</ShopGoodsItem>
			</div>
			
				<!-- <i class="iconfont icon-combinedshapefuben" slot="titleRight"></i> -->
				<!-- <div slot="bottom" class="bottom">
					<p>
						<span>Shipping fee</span>
						<span class="fee">¥ 10</span>
					</p>
					<p>
						<span>thMart-Coupons</span>
						<span>- ¥ 10<i class="iconfont icon-combinedshapefuben"></i></span>
					</p>
					<p>
						<span>Quantity Discount</span>
						<span class="discount">- ¥ 10</span>
					</p>
					<p>
						<span>Remark</span>
						<input type="text" value="" name="">
					</p>
					<p>
						<span>&nbsp;</span>
						<span><i>Total：</i>¥316</span>
					</p>
				</div> -->
			<div class="bottom-box">
				<div class="bottom">
					<p v-show="orderConfirmData.feeTotal">
						<span>Shipping fee</span>
						<span class="fee">¥ {{orderConfirmData.feeTotal}}</span>
					</p>
					<p v-show="orderConfirmData.couponReduce!=0" @click="showCoupons">
						<span>thMart-Coupons</span>
						<span v-if=finallyFullReduction.couponId>- ¥ {{finallyFullReduction.reduce}}<i class="iconfont icon-combinedshapefuben"></i></span>
						<span v-if=!finallyFullReduction.couponId>You have{{orderConfirmData.userCouponList.length}}discount coupons<i class="iconfont icon-combinedshapefuben"></i></span>
					</p>
				</div>
				<div class="remark">
					<textarea class="remark-text" placeholder="Remark" v-model="remark"></textarea>
				</div>
			</div>
			
			<div style="height: 60px;"></div>
		</div>
		<!-- 底部总价 -->
		<div class="fix">
			<div>Final Price：<span>¥ {{finalPrice}}</span></div>
			<div @click="placeOrder"><a>Place Your Order</a></div>
		</div>
		<!-- 选择满减组件 -->
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  	<div class="thmart-coupons-list">
		  		<div class="coupons-content">
		  			<div class="title">thMart-Coupons</div>
		  			<div class="list">
		  				<div class="list-item" v-for="item in orderConfirmData.userCouponList" @click="changeChooseCoupons(item.couponId)">
		  					<div class="Coupons-name">{{item.name}}</div>
		  					<div class="Coupons-input" v-if="!item.checked">
		  						<i></i>
		  					</div>
		  					<div class="Coupons-input" v-if="item.checked">
		  						<img src="@/assets/images/check.png" alt="">
		  					</div>
		  					<div class="Coupons-price">reduce: {{item.reduce}}</div>
		  				</div>
		  			</div>
		  		</div>
		  		<div class="coupons-bottom" @click="confirm">
		  			Done
		  		</div>
		  	</div>
		</mt-popup>
	</div>
</template>
<script>
	import { MessageBox,Popup } from 'mint-ui';
	export default {
		name: 'OrderConfirmation',
		data() {
			return {
				addrList: [],
				orderConfirmData: null,
				popupVisible: false,
				finalPrice: 0,
				remark: ''
			}
		},
		components: {
			ShopGoodsItem: r => { require.ensure([], () => r(require('../../BaseComponents/ShopGoodsItem')), 'ShopGoodsItem') },
			FullReductionSection: r => { require.ensure([], () => r(require('../../BaseComponents/FullReductionSection')), 'FullReductionSection') }
		},
		mounted() {
			// 获取地址
			this.getAddr();
			// 获取详情
			this.getOrderConfirmData();
		},
		computed: {
			finallyFullReduction: function() {
				var fullReduction = {};
				for (var i = 0; i < this.orderConfirmData.userCouponList.length; i++) {
					if (this.orderConfirmData.userCouponList[i].checked == true) {
						fullReduction['reduce'] = this.orderConfirmData.userCouponList[i].reduce;
						fullReduction['couponId'] = this.orderConfirmData.userCouponList[i].couponId;
					}
				}
				this.chooseCouponsGetPice(fullReduction);
				return fullReduction;
			}
		},
		methods: {
			// 获取地址
			getAddr() {
				if (this.$store.state.oneAddress) {
					this.getSingleAddr();
				} else {
					this.getDeaflutAddr();
				}
			},
			// 去地址列表页
			goAddressList(flag) {
				if(flag == 'addAdress') {
					if(this.orderConfirmData.isaddress == 2) {
						this.$router.push({
							name: "AddAddress",query: {
								tickting: true
							}
						});
					} else {
						this.$router.push("AddAddress");
					}
				} else if (flag == 'addressList') {
					if(this.orderConfirmData.isaddress == 2) {
						this.$router.push({
							name: "AddressBook",query: {
								flag: 'OrderConfirmation',
								tickting: true
							}
						});
					} else {
						this.$router.push({
							name: "AddressBook",query: {
								flag: 'OrderConfirmation'
							}
						});
					}
					// this.$router.push({
					// 	name: "AddAddress",query: {
					// 		flag: 'OrderConfirmation'
					// 	}
					// });
				}
			},
			// 如果没有选则就获取地址列表页的地址（第一条地址就是默认地址）
			getDeaflutAddr() {
				var that = this;
				that.$http.post(this.urls.addressList,{
					page: 1,
					pageSize: 1000
				})
				.then(function (response) {
					console.log(response)
					if (response.data.data.data.length==0) {
						that.layer();
					} else {
						that.addrList.push(response.data.data.data[0])
					}
				});
			},
			// 获取单条地址
			getSingleAddr() {
				var that = this;
				that.$http.post(this.urls.oneAddress,{
					id: this.$store.state.oneAddress
				})
				.then(function (response) {
					// that.$store.commit('changeOneAddress',null)
					that.addrList.push(response.data.data)
				});
			},
			// 获取订单详情
			getOrderConfirmData() {
				var that = this;
				that.$http.post(this.urls.OrderPrepareOrder,{
					skuId: this.$route.query.skuId || '',
					number: this.$route.query.number || '',
					isSpell: this.$route.query.isSpell || '',
				})
				.then(function (response) {
					// console.log(response)
					// 给满减添加选择属性
					for (var i = 0; i < response.data.data.userCouponList.length; i++) {
						if (i == 0) {
							response.data.data.userCouponList[i]['checked'] = true;
						} else {
							response.data.data.userCouponList[i]['checked'] = false;
						}
						console.log();
					}
					that.orderConfirmData = response.data.data;
				});
			},
			// 下单
			placeOrder() {
				var that = this;
				// 如果没有地址不能下单
				if (that.addrList.length==0) {
					that.layer();
					return false;
				}
				
				that.$http.post(that.urls.placeOrder,{
					couponId: that.finallyFullReduction.couponId?that.finallyFullReduction.couponId:0,
					addressId: that.addrList[0].id,
					skuId: that.$route.query.skuId || '',
					number: that.$route.query.number || '',
					buyerRemark: that.remark,
					isSpell: this.$route.query.isSpell || '',
					spellId: this.$route.query.spellId || '',
				})
				.then(function (response) {
					// http://page.thatsmags.com/WebAccess/get-weixin-code.html?appid=wx06e97f4ed4ac07e3&scope=snsapi_base&state=STATE&redirect_uri=http%3A%2F%2F'+ csOrzs2 +'%2FApi%2FCommon%2Findex%3Forderid='+ orderid
					console.log(response)
					if (response.data.code==1) {
						// 回调后端控制器地址
						var apiAddr = that.formalTest();
						var orderNumber = response.data.data.orderNumber;
						var callbackAddress = window.location.origin + '/pay';
						console.log(window.location)
						console.log(apiAddr);
						console.log(orderNumber);
						if (that.isWeiXin()) {
							window.location.href = 'http://page.thatsmags.com/WebAccess/get-weixin-code.html?appid=wx06e97f4ed4ac07e3&scope=snsapi_base&state=STATE&redirect_uri=http%3A%2F%2F'+ apiAddr +'Wx%2FopenidPayPage%3ForderNumber='+ orderNumber + '%26callbackAddress=' + callbackAddress;
						} else {
							window.location.href = window.location.origin + '/Pay?orderNumber=' + orderNumber;
						}
						
						// var aaa = 'http://page.thatsmags.com/WebAccess/get-weixin-code.html?appid=wx06e97f4ed4ac07e3&scope=snsapi_base&state=STATE&redirect_uri=http%3A%2F%2F'+ apiAddr +'Wx%2FopenidPayPage%3ForderNumber='+ orderNumber + '%26callbackAddress=' + callbackAddress;
						// console.log(aaa);
					}
				});
			},
			// 没有地址弹出框
			layer() {
				var that = this;
				MessageBox({
				  title: '',
				  message: 'Add New Shipping Address',
				  confirmButtonText: "Add Address",
				  cancelButtonText: 'Cancel',
				  showCancelButton: true
				}).then(action=>{
					if (action == 'confirm') {
						if(that.orderConfirmData.isaddress == 2) {
							that.$router.push({
								name: "AddAddress",query: {
									tickting: true
								}
							});
						} else {
							that.$router.push("AddAddress");
						}
						
					}		
				})
			},
			showCoupons() {
				// alert(0);
				this.popupVisible = true;
			},
			confirm() {
				this.popupVisible = false;
			},
			// 修改选择满减券
			changeChooseCoupons(id) {
				// console.log(id);
				for (var i = 0; i < this.orderConfirmData.userCouponList.length; i++) {
					// console.log(this.orderConfirmData.userCouponList[i]);
					// 如果选择的选中的选项就把选中的取消
					if (this.orderConfirmData.userCouponList[i].couponId == id && this.orderConfirmData.userCouponList[i].checked == true) {
						this.orderConfirmData.userCouponList[i].checked = false;
					} else {
						// 把其他全部取消选择  把当前选中
						this.orderConfirmData.userCouponList[i].checked = false;
						if (this.orderConfirmData.userCouponList[i].couponId == id) {
							this.orderConfirmData.userCouponList[i].checked = true;
						}
					}
				}
			},
			// 计算属性中改变满减回调获取价格
			chooseCouponsGetPice(fullReduction) {
				var that = this;
				that.$http.post(this.urls.OrderPrepareOrder,{
					skuId: this.$route.query.skuId || '',
					number: this.$route.query.number || '',
					isSpell: this.$route.query.isSpell || '',
					couponId: fullReduction.couponId?fullReduction.couponId:0
				})
				.then(function (response) {
					console.log(response)
					that.finalPrice = response.data.data.total;
				});
			}
			
		}

	}
</script>
<style scoped>
	.address-info-tip {
		background-color: #fff;
		margin-bottom: 10px;
		padding: 0;
	}
	.address {
		display: block;
		background: #fff;
		margin: 10px;
		border-radius: 4px;
		font-size: 0;
	}
	.info {
		padding: 10px;
		box-sizing: border-box;
		line-height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.address img {
		width: 100%;
	}
	.info p:nth-child(2) {
		color: #999;
		font-size: 14px;
	}
	.info p:nth-child(3) {
		color: #999;
		font-size: 14px;
	}
	.info p:nth-child(1) span:nth-child(1) {
		padding-right: 20px;
	}
	.bottom {
		background: #fff;
	}	
	.bottom > p {
		height: 50px;
		line-height: 50px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #dfdfdf;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.bottom > p:last-child {
		border-bottom: none;
	}
	.bottom > p span:nth-child(2) {
		color: #F9421E;
		font-size: 14px;
	}
	.bottom > p i {
		padding-left: 10px;
	}
	.bottom > p:nth-child(4) span {
		width: 25%;
	}
	.bottom input {
		border: none;
		outline: none;
		color: #999;
		width: 75%;
	}
	.bottom > p:last-child span:nth-child(2) {
		font-size: 16px;
	}
	.fix {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		height: 45px;
		padding: 0 10px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.fix div span {
		color: #F9421E;
	}
	.fix div:nth-child(2) a {
		display: block;
		background: #F9421E;
		color: #fff;
		border-radius: 18px;
		text-align: center;
		width: 150px;
		height: 36px;
		line-height: 36px;
	}
	.container {
		/*margin-bottom: 55px;*/
	}
	.fee {
		padding-right: 27px;
	}
	.discount {
		padding-right: 27px;
	}
	.bottom-box {
		padding: 0 10px;
	}
	.mint-popup-bottom {
		width: 100%;
	}
	.thmart-coupons-list {
		width: 100%;
		background-color: #000;
		opacity: 0.5;
		box-sizing: border-box;
		padding: 0 10px 10px 10px;
	}
	.thmart-coupons-list .coupons-content {
		background-color: #fff;
		margin-bottom: 10px;
		box-sizing: border-box;
		padding: 0 10px;
		border-radius: 8px;
	}
	.thmart-coupons-list .coupons-content .title {
		text-align: center;
		padding: 10px 0;
		border-bottom: 1px solid #dfdfdf;
		color: #222;
	}
	.list .list-item {
		border-bottom: 1px solid #dfdfdf;
		overflow: hidden;
	}
	.list .list-item > div {
		padding: 10px 0;
	}
	.list .list-item > div:nth-child(1) {
		float: left;
	}
	.list .list-item > div:nth-child(2) {
		float: right;
		text-align: left;
	}
	.list .list-item > div:nth-child(3) {
		float: right;
		margin-right: 5px;
		width: 100px;
	}
	.list .list-item:last-child {
		border-bottom: none;
		border-width: 0px;
	}
	.thmart-coupons-list .coupons-bottom {
		background-color: #fff;
		text-align: center;
		color: #222;
		padding: 10px 0;
		border-radius: 8px;
	}
	.Coupons-input i {
		display: inline-block;
		width: 18px;
		height: 18px;
		border: 1px solid #dfdfdf;
		border-radius: 50%;
	}
	.Coupons-input img {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	.remark-text {
		width: 100%;
		border: 1px solid #dfdfdf;
		border-radius: 4px;
		margin-top: 10px;
		height: 80px;
		box-sizing: border-box;
		padding: 10px;
		resize:none;
		outline: none;
	}
</style>