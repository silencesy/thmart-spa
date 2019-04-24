<template>
	<div class="LoginSystem">
		<div class="logo">
			<router-link to='/'>
				<img src="static/images/common/Mart.svg" alt="">
			</router-link>
		</div>
		<div>
			<slot name="info"></slot>
		</div>
		<router-link to='/Invest' class="invest">
			<img src="static/images/common/zhaoshang.jpg" alt="">
		</router-link>
	</div>
</template>
<script>
	export default {
		name: 'LoginSystem',
		data () {
			return {
				
			}
		}
	}
</script>
<style scoped>
	.logo {
		text-align: center;
	} 
	.logo img {
		width: 83px;
		height: 90px;
		margin: 40px 0;
	}
	.invest {
		width: 100%;
		display: block;
		margin-top: 60px;
	}
	.invest img {
		width: 100%;
	}
</style>