<template>
	<div class="CaseFirst">
    <div class="anli bottomMargin">
     	<img src="static/images/common/3.jpg" alt="">
    </div>

    <div class="fixBottom">
        <router-link to="/Cost">返回资费页</router-link>
    </div>
	</div>
</template>
<script>
	export default {
	  name: 'CaseFirst',
	  data () {
	    return {

	    }
	  },
	  mounted() {
	    
	  }
	}
</script>
<style scoped>
	.fixBottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #f9421e;
		text-align: center;
	}
	.fixBottom a {
		color: #fff;
		font-weight: 600;
	}
	.bottomMargin {
		padding-bottom: 35px;
	}
	.anli {
		width: 100%;
	}
	.anli img {
		width: 100%;
	}
</style>