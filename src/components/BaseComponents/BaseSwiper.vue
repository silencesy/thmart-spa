<template>
	<div class="BaseSwiper">
		<swiper :options="swiperOption" ref="baseSwiper">
			<swiper-slide v-for="(item,index) in swiperData" :key="index">
				<div v-if="item.url">
					<!-- <router-link :to='item.url'> -->
					<a :href="[item.url]">
						<img v-lazy="item.pic" preview="1" alt="">
					</a>
						
					<!-- </router-link> -->
				</div>
				<div v-if="!item.url">
					<img v-lazy="item" preview="1" alt="">
				</div>
				
			</swiper-slide>  
			<div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
	</div>
</template>
<script>
	export default {
		name: 'BaseSwiper',
		props: {
			swiperData: {
				type: Array,
				default: function () {  
			      return []
			    }  
			}
		},
		data() {  
	    	return {  
	       		swiperOption: {  
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					}
	        	}  
		    };  
	  	},
	  	computed: {  
		    swiper() {  
		      return this.$refs.baseSwiper.swiper;  
		    }  
	  	}
	}
</script>
<style scoped>
.BaseSwiper {
	min-height: 250px;
}
.BaseSwiper img {
	width: 100%;
	display: block;
}

</style>