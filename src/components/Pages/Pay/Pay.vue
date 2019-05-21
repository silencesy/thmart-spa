<template>
	<div class="Pay" v-if="detailData">
		<div class="payBox">
			<div class="info">
				<div class="payList">
					<span>Order No. :</span>
					<span>{{detailData.orderNumber}}</span>
				</div>
				<div class="payList">
					<span>Ordered:</span>
					<span>{{detailData.orderTime}}</span>
				</div>
				<div class="payList">
					<span>Receiver:</span>
					<span>{{detailData.fullName}} &nbsp;{{detailData.phone}}</span>
				</div>
				<div class="payList">
					<span>Email:</span>
					<span>{{detailData.email}}</span>
				</div>
				<div class="payList">
					<span>Address:</span>
					<span>{{detailData.province}}{{detailData.city}}{{detailData.regionDetail}}</span>
				</div>
				<div class="payList">
					<span>Final Price：</span>
					<span>¥ {{detailData.priceTotal}}</span>
				</div>		
			</div>
			<div class="alipayBtn" @click="alipay"><img src="static/images/common/alipay.svg" alt=""></div>
			<div class="wechatBtn" @click="wechatPay" v-if="isWeiXinShow"><img src="static/images/common/wechat.svg" alt=""></div>
		</div>
	</div>
</template>
<script>
	export default {
		name: '',
		data () {
			return {
				detailData: null,
				// 微信是否显示
				isWeiXinShow: true,
				weChatTimer: null
			}
		},
		mounted () {
			if (window.history && window.history.pushState) {
				history.pushState(null, null, document.URL);
				window.addEventListener('popstate', this.goBack, false);
			}
			this.getData();
			// 不是微信浏览器则隐藏微信支付
			this.isShowWechatPay();
			// 监听微信支付成功
			this.listenWechatPay();
		},
		destroyed(){
			window.removeEventListener('popstate', this.goBack, false);
			// 页面离开清除定时器  （定时器获取支付状态）
			clearInterval(this.weChatTimer);

		},
		methods: {
			// 监听浏览器后退事件
			goBack() {
				this.$router.push({path: '/Unpaid',query: {orderNumber: this.$route.query.orderNumber}})
			},
			getData() {
				var that = this;
				that.$http.post(that.urls.payOrderDetail,{
					orderNumber: that.$route.query.orderNumber
				}).then(function(response) {
					that.detailData = response.data.data
				})
			},
			isShowWechatPay() {
				if (!this.isWeiXin()) {
					this.isWeiXinShow = false;
				}
			},
			// 支付宝支付
			alipay() {
				if (!this.isWeiXin()) {
					window.location.href = 'http://' + this.formalTest() + 'Alipay/alipayapi?orderNumber=' + this.$route.query.orderNumber;
				} else {
					// this.$router.push({path: '/alipay', query: {orderNumber: this.$route.query.orderNumber}})
					window.location.href = window.location.origin + '/alipay?orderNumber=' + this.$route.query.orderNumber;
				}
			},
			// 微信支付
			wechatPay() {
				this.callpay();
			},
			jsApiCall() {
				var jsApiParameters = {};
				jsApiParameters['appId'] = this.$route.query.appId;
				jsApiParameters['nonceStr'] = this.$route.query.nonceStr;
				jsApiParameters['package'] = this.$route.query.package.replace('id','id=');
				jsApiParameters['signType'] = this.$route.query.signType;
				jsApiParameters['timeStamp'] = this.$route.query.timeStamp;
				jsApiParameters['paySign'] = this.$route.query.paySign;
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest',
					jsApiParameters,
					function(res){
						// alert(res.err_code+res.err_desc+res.err_msg);
						WeixinJSBridge.log(res.err_msg);
					}
				)
			},
			callpay() {
				var that = this;
				if (typeof WeixinJSBridge == "undefined"){
				    if( document.addEventListener ){
				        document.addEventListener('WeixinJSBridgeReady', that.jsApiCall, false);
				    }else if (document.attachEvent){
				        document.attachEvent('WeixinJSBridgeReady', that.jsApiCall); 
				        document.attachEvent('onWeixinJSBridgeReady', that.jsApiCall);
				    }
				}else{
				    that.jsApiCall();
				}
			},
			// 监听微信支付成功
			listenWechatPay() {
				var that = this;
				that.weChatTimer = setInterval(that.listenWechatPayFun,3000);
			},
			listenWechatPayFun() {
				var that = this;
				that.$http.post(that.urls.WxOrderQuery,{
					trade_no: that.$route.query.orderNumber
				}).then(function(response) {
					// that.detailData = response.data.data
					if (response.data.code == 1 && response.data.data == 'paid' ) {
						clearInterval(that.weChatTimer);
						that.$router.push({path: '/Paid', query: {orderNumber: that.$route.query.orderNumber}})
					} else if (response.data.code == 1 && response.data.data == 'spell') {
						clearInterval(that.weChatTimer);
						that.$router.push({path: '/shareShow', query: {id: that.$route.query.orderNumber}})
					}
				}).catch(function() {

				});
			}
		}
	}
</script>
<style scoped>
	.payBox {
		background: #fff;
		margin: 10px;
		border-radius: 4px;
		padding: 10px;
		box-sizing: border-box;
	}
	.payList {
		line-height: 30px;
		overflow: hidden;
	}
	.payList span {
		float: left;
	}
	.payList span:first-child {
		width: 34%;
		color: #999;
	}
	.payList span:nth-child(2) {
		width: 66%;
	}
	.info .payList:last-child span:nth-child(2) {
		color: #F9421E;
	}
	.alipayBtn {
		width: 75%;
		height: 36px;
		line-height: 49px;
		text-align: center;
		background: #00A8F2;
		border-radius: 30px;
		margin: 20px auto;
	}
	.wechatBtn {
		width: 75%;
		height: 36px;
		line-height: 48px;
		text-align: center;
		background: #00B700;
		border-radius: 30px;
		margin: 10px auto;
	}
	/*引导遮罩层*/
	.guide-box {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 200;
		background-color: rgba(0,0,0,0.45);
	}
</style>