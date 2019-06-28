<template>
	<div class="LoginSystem">
		<div class="logo">
			<router-link to='/'>
				<img src="static/images/common/thmart-logo.png" alt="">
			</router-link>
			<a href="http://www.urban-family.com/"><img class="uf-logo" src="static/images/common/uflogo.png" alt=""></a>
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
		height: 40px;
		margin: 40px 0;
	}
	.logo img.uf-logo {
		height: 40px;
		margin-left: 5px;
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