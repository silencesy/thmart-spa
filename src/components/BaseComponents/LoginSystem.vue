<template>
	<div class="LoginSystem">
		<div class="logo">
			<router-link to='/' v-if="logo=='thmart'">
				<img src="static/images/common/thmart-logo.png" alt="">
			</router-link>
			<a  v-if="logo=='uf'" href="http://www.urban-family.com/"><img class="uf-logo" src="static/images/common/uflogo.png" alt=""></a>
		</div>
		<div>
			<slot name="info"></slot>
		</div>
		<router-link  v-if="logo=='thmart'" to='/Invest' class="invest">
			<img src="static/images/common/zhaoshang.jpg" alt="">
		</router-link>
	</div>
</template>
<script>
	export default {
		name: 'LoginSystem',
		data () {
			return {
				logo: null
			}
		},
		mounted () {
			this.setLogo();
		},
		methods: {
			setLogo() {
				let path = window.localStorage.getItem('goback') || '';
				if(path.indexOf('urban-family.com') != -1 || path.indexOf('urfamily') != -1) {
					this.logo = 'uf';
				} else {
					this.logo = 'thmart'
				}
			}
		}
	}
</script>
<style scoped>
	.logo {
		text-align: center;
	} 
	.logo img {
		height: 60px;
		margin: 40px 0;
	}
	/* .logo img.uf-logo {
		height: 40px;
		margin-left: 5px;
	} */
	.invest {
		width: 100%;
		display: block;
		margin-top: 60px;
	}
	.invest img {
		width: 100%;
	}
</style>