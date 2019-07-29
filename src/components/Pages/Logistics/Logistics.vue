<template>
	<div>
		<div class="container" v-if="logisticsData">
			<div class="title">
				<div>
					logistics: {{$route.query.logistics}}
				</div>
				<div>
					company: {{logisticsData.com}} ({{logisticsData.company}})
				</div>
			</div>
			<div class="content">
				<div class="item" v-for="(item,index) in logisticsData.list" :key="index">
					<div class="pointer" v-if="index == 0">
						<img class="first" src="static/images/common/pointer.png" alt="">
					</div>
					<div class="pointer" v-if="index != 0">
						<i class="iconfont icon-dot"></i>
					</div>
					<div class="info">
						<p>{{item.remark}}</p>
						<p>{{item.datetime}}</p>
					</div>
				</div>
			</div>
		</div>
		<div v-if="nologisticsData" class="nologisticsData">
			<p>Your parcel is still in preparation,</p>
			<p>please be patient!</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				logisticsData: null,
				nologisticsData: false
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
	  			let that = this;
	  			that.$http.post(that.urls.logistics,{
	  				logistics: that.$route.query.logistics,
	  				company: that.$route.query.company
	  			})
		        .then(function (response) {
		        	that.logisticsData = response.data.data
		        })
		        .catch(function (error) {
		          	that.nologisticsData = true;
		        });
	  		}
		}
	}
</script>
<style scoped>
	.container {
		padding: 0 10px;
	}
	.title {
		padding: 10px 0;
		margin-top: 10px;
		border: 1px solid #dfdfdf;
    	border-radius: 4px;
    	padding: 10px;
	    background: #fff;
	    box-sizing: border-box;
	}
	.title div:nth-child(1) {
		padding-bottom: 2px;
	}
	.content {
		padding: 10px;
		background-color: #fff;
		margin-top: 10px;
		margin-bottom: 10px;
		border: 1px solid #dfdfdf;
		border-radius: 4px;
	}
	.content .item {
		display: flex;
	}
	.content .item .info {
		padding-left: 8px;
		border-bottom: 1px solid #dfdfdf;
		padding-bottom: 10px;
		margin-bottom: 10px;
		width: 100%;
	}
	.content .item:last-child .info {
		border-bottom: 1px solid transparent;
		margin-bottom: 0;
	}
	.content .item .info p {
		line-height: 28px;
		font-size: 15px;
		color: #444;
	}
	.content .item .info p:nth-child(2) {
		text-align: right;
		color: #aaa;
	}
	.iconfont.icon-dot {
		color: #dfdfdf;
	}
	.first {
		width: 16px;
		height: 16px;
		margin-top: 5px;
	}
	.nologisticsData {
		margin-top: 45%;
	}
	.nologisticsData p {
		text-align: center;
		color: #777;
	}
</style>