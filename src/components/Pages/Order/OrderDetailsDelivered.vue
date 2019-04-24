<template>
	<div class="OrderDetailsUnpaid" v-if="OrderDetailsData">
		<OrderDetails :OrderDetailsData= 'OrderDetailsData' :styleObj="styleObj" :showLogistics="showLogistics" :showReviews="showReviews">
			<div class="date" slot="date">
				<div>
					<p>Order No. :<span>{{OrderDetailsData.orderNumber}}</span></p>
					<p>Ordered :<span>{{OrderDetailsData.orderTime}}</span></p>
					<p v-if="OrderDetailsData.sendTime != 0">Delivered :<span>{{OrderDetailsData.sendTime}}</span></p>
				</div>
				<div v-clipboard:copy="OrderDetailsData.orderNumber" v-clipboard:success="onCopy"
      v-clipboard:error="onError">Copy</div>
			</div>
		</OrderDetails>

	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	export default {
		name: 'OrderDetailsUnpaid',
		data() {
			return {
				OrderDetailsData: null,
				styleObj: {
					'margin-bottom': '10px'
				},
				showLogistics: true,
				showReviews: true
			}
		},
		components: {
			OrderDetails: r => { require.ensure([], () => r(require('../../BaseComponents/OrderDetails')), 'OrderDetails') }
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				var that = this;
		        that.$http.post(that.urls.OrderDetail,{orderNumber: that.$route.query.orderNumber})
		        .then(function (response) {
		          console.log(response.data.data);
		          that.OrderDetailsData = response.data.data;
		        })
		        .catch(function (error) {
		          console.log(error);
		        });
			},
			onCopy: function (e) {
		    	Toast('Successful!');
		    },
		    onError: function (e) {
		      
		    }
		}
	}
</script>
<style scoped>
	
</style>


