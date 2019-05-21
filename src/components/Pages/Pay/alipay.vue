<template>
	<div class="layer">
		<p>
			<img src="../../../assets/images/arrow.png" height="185" width="207" alt="">
		</p>
		<p>Please click the top right button to open the page in browser and process the payment</p>
	</div>
</template>
<script>
	export default {
		mounted() {
			this.pay();
			this.listenWechatPay();
		},
		methods: {
			pay() {
				// 不是微信执行
				if (!this.isWeiXin()) {
					window.location.href = 'http://' + this.formalTest() + 'Alipay/alipayapi?orderNumber=' + this.$route.query.orderNumber;
				}
			},
			// 监听支付宝支付成功
			listenWechatPay() {
				var that = this;
				that.weChatTimer = setInterval(that.listenWechatPayFun,3000);
			},
			listenWechatPayFun() {
				var that = this;
				that.$http.post(that.urls.AlipayOrderQuery,{
					out_trade_no: that.$route.query.orderNumber
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
	.layer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.45);
	}
	.layer p {
		padding: 30px 15px;
		color: #fff;
		font-size: 16px;
		overflow: hidden;
	}
	.layer img {
		width: 100px;
		height: auto;
		float: right;
	}
</style>