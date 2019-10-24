<template>
	<div class="Paid" v-if="detailData">
		<p class="iconfont icon-duihao"></p>
		<p>Payment Success</p>
		<div class="paidBox">
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
					<span>Address:</span>
					<span>{{detailData.province}}{{detailData.city}}{{detailData.regionDetail}}</span>
				</div>
				<div class="payList price">
					<span>Final Price：</span>
					<span>¥ {{detailData.priceTotal}}</span>
				</div>
				<div class="payList" v-if="detailData.buyerRemark != 0">
					<span>Remark：</span>
					<span>{{detailData.buyerRemark}}</span>
				</div>		
			</div>
			<div class="btnList">
				<router-link :to="{path: 'OrderList',query: {status: 'Unshipped'}}" class="btn">Order List</router-link>
				<router-link to='/' class="btn">Home</router-link>
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
			}
		}
	}
</script>
<style scoped>
	.Paid > p {
		text-align: center;
	}
	.Paid > p:nth-of-type(1) {
		margin: 25px 0 10px 0;
		color: rgb(60, 171, 33);
		font-size: 35px;
	}
	.Paid > p:nth-of-type(2) {
		margin-bottom: 25px;
	}
	.paidBox {
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
	.info .payList.price span:nth-child(2) {
		color: #F9421E;
	}
	.btnList {
		margin: 20px 0;
		display: flex;
		justify-content: space-between;
	}
	.btn {
		width: 47%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border: 1px solid #dfdfdf;
		border-radius: 30px;
	}
</style>