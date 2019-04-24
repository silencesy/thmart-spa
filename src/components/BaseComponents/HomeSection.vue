<template>
	<div class="HomeSection">
	<!-- test -->
		<div class="banner-img-box">
			<img @click="goClassList" :src="sectionData.pic" alt="">
		</div>
		<div class="swipe-box">
			<swiper :options="swiperOption"  ref="baseSwiper">
				<swiper-slide class="goods-item" v-for="(item,index) in sectionData.data" :key="index">
					<!-- 商品区块 -->
					<router-link :to="{path: '/GoodsDetails', query: {id:item.id}}" v-if="!shop">
						<img v-if="item.saleType.type == 'sale'" class="sale-icon" src="static/images/common/sale.png" alt="">
						<img v-if="item.saleType.type == 'group'" class="sale-icon group" src="static/images/common/group.png" alt="">
						<div class="img-box">
							<img v-lazy="item.pic" alt="">
						</div>
						<div>
							<div class="line2 goods-name">{{item.title}}</div>
							<div class="price">
								<div class="theme_color">￥{{item.price}}</div>
								<div><del v-if="item.originalPrice" class="originalPrice">￥{{item.originalPrice}}</del></div>
							</div>
						</div>
					</router-link>
					<!-- 商户区块 -->
					<router-link :to="{path: '/ShopHome', query: {id:item.id}}" v-if="shop">
						<div class="img-box">
							<img v-lazy="item.pic" alt="">
						</div>
						<div>
							<div class="line1 goods-name shop-name">{{item.title}}</div>
						</div>
					</router-link>
				</swiper-slide>
				<div class="swiper-pagination"  slot="pagination"></div>
			</swiper>
		</div>
	</div>
</template>
<script>
import store from '../../vuex/store'
import { mapState } from 'vuex'

	export default {
		name: 'HomeSection',
		props: {
			sectionData: {
				type: Object,
				default: function () {  
			      return { message: 'hello' }  
			    }  
			},
			shop: {
				type: Boolean,
				default: false
			},
			bannerId: {
				type: [Number,String],
				default: 1
			},
			Categories: {
				type: Boolean,
				default: false
			},
			groupBuy: {
				type: Boolean,
				default: false
			}
		},
		data() {  
	    return {  
	       	swiperOption: {  
	       		slidesPerView: 3,
			      slidesPerColumn: 2,
			      spaceBetween: 10,
			      pagination: {
			        el: '.swiper-pagination',
			        clickable: true,
			      }
	        }  
	    };  
  	},
  	components: {
  		CountDown: r => { require.ensure([], () => r(require('@/components/BaseComponents/countDown')), 'countDown') }
  	},
  	store,
	computed: {
		trigger() {
		  return this.$store.state.trigger;
		},
		swiper() {  
	      return this.$refs.baseSwiper.swiper;  
	    } 
	},
	watch: {
		trigger() {
		  var that = this;
		  if (that.trigger=="Home") {
		    console.log(1);
		  }
		}
	},

  	methods: {
  		goClassList() {
  			if(this.shop) {
  				this.$router.push('ShopList');
  			} else if (this.Categories) {
  				this.$router.push({ path: 'Categories', query: { id: this.bannerId }})
  			} else if (this.bannerId == 17) {
  				this.$router.push({path: 'GoodsList',query: { id: this.bannerId }});
  			} else if (this.bannerId == 'exploreChina') {
					this.$router.push({path: '/Guide'});
				} else {
  				this.$router.push({path: 'groupBuying'});
  			}
  			
  		}
  	}
	}
</script>
<style scoped>
	.HomeSection {
		background-color: #fff;
	}
	.swiper-container {
		padding-bottom: 35px;
	}
	.goods-item {
		box-sizing: border-box;
		border: 1px solid #dfdfdf;
		border-radius: 4px;
		overflow: hidden;
	}
	.goods-name {
		margin: 4px 15px;
		height: 36px;
		line-height: 18px;
	}
	.goods-name.shop-name {
		height: 18px;
		margin-bottom: 5px;
	}
	.banner-img-box {
		background-color: #e8e8e8;
		padding-top: 10px;
	}
	.banner-img-box img {
		width: 100%;
		height: auto;
		display: block;
	}
	.swipe-box {
		padding: 10px 15px 0px 15px;
	}
	.swipe-box img {
		width: 100%;
	}
	.price {
		display: flex;
	}
	.price > div {
		flex: 1;
		text-align: center;
		padding-bottom: 8px;
	}
	.swipe-box .sale-icon {
		position: absolute;
		top: 6px;
    	left: 6px;
		width: 32px;
		height: 16px;
	}
	.swipe-box .sale-icon.group {
		width: 62px;
	}
	.originalPrice {
		color: #aaa;
	}
</style>