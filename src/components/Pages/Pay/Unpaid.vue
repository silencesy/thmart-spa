<template>
	<div class="Unpaid" v-if="detailData">
		<div class="payBox">
			<div class="info">
				<div class="payList">
					<span>Status :</span>
					<span>Unpaid</span>
				</div>
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
				<div class="btn-group">
					<span @click="pay">Continue To Pay</span>
					<span @click="gohome">Home</span>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	export default {
		name: '',
		data () {
			return {
				detailData: null
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			getData() {
				var that = this;
				that.$http.post(that.urls.payOrderDetail,{
					orderNumber: that.$route.query.orderNumber
				}).then(function(response) {
					that.detailData = response.data.data
				})
			},
			pay() {
				this.$router.push({path: '/Pay',query: {orderNumber: this.$route.query.orderNumber}});
			},
			gohome() {
				this.$router.push('/');
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
	.info .payList:first-child span:nth-child(2) {
		color: #F9421E;
	}
	.info .payList:last-child span:nth-child(2) {
		color: #F9421E;
	}
	.btn-group {
		padding: 30px 0;
		display: flex;
		justify-content: space-around;
	}
	.btn-group span {
		padding: 6px 30px;
		background-color: #F9421E;
		color: #fff;
		border-radius: 30px;
	}
</style>