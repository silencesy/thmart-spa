<template>
	<div class="WishList">
		<div class="nav">
			<mt-button class="nav-item" size="small" @click.native.prevent="active = 'tab-container1'">Goods</mt-button>  
      	<mt-button class="nav-item" size="small" @click.native.prevent="active = 'tab-container2'">Shops</mt-button>
		</div>
		<div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
      
        <mt-tab-container-item id="tab-container1">
        	

        	<div class="wishGoods">
							<div class="goodsLeft">
								<img src="static/images/common/169.jpg" alt="">
							</div>
							<div class="goodsRight">
								<p>An Affectionate Encounter Bouquet / Flowers</p>
								<div class="rightContent">
									<div>
										<span>￥169</span>
										<del>￥199</del>
									</div>
									<div class="iconfont icon-shanchu"></div>
								</div>
							</div>
        	</div>
        </mt-tab-container-item>

        <mt-tab-container-item id="tab-container2">
        	<div class="wishShops">
							<div>
								<img src="static/images/common/169.jpg" alt="">
							</div>
							<div>An Affectionate Encounter</div>
							<div class="iconfont icon-shanchu"></div>
        	</div>

					<div class="wishShops">
							<div>
								<img src="static/images/common/169.jpg" alt="">
							</div>
							<div>An Affectionate Encounter</div>
							<div class="iconfont icon-shanchu"></div>
        	</div>

        </mt-tab-container-item>
  
      </mt-tab-container>
	  </div>		
	</div>
</template>

<script>
	export default {
	  name: 'WishList',
	  data() {
	    return {
	      active: 'tab-container1'
	    };
	  }
	};
</script>

<style scoped>
	.nav {
    display: flex;
    border-bottom: 1px solid #dfdfdf;
    margin-bottom: 10px;
  }
  .nav > .nav-item {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    border-radius: 0;
    border-width: 0;
    box-shadow: none;
  }
  .item-container {
    background-color: #fff;
  }
  .active-bttom {
    border-bottom: 1px solid #f6442b;
  }
	.mint-button--default {
		box-shadow: none;
		flex: 1;
		box-sizing: border-box;
		font-size: 16px;
	}	
	.mint-button::after {
		background: rgba(0,0,0,0);
		border-bottom: 2px solid #f6442b; 
	}	
	.wishGoods {
		display: flex;
		background: #fff;
		padding: 10px;
		margin-bottom: 10px;
	}
	.goodsLeft {
		flex: 0.5;
	}
	.goodsRight {
		flex: 1;
		position: relative;
	}
	.goodsLeft img {
		width: 115px;
		height: 115px;
	}
	.goodsRight > p {
		word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
	}
	.rightContent {
		width: 100%;
		position: absolute;
		bottom: 0;
		display: flex;
		justify-content: space-between;
	}
	.rightContent .icon-shanchu {
		float: right;
	}
	.rightContent > div {
		display: inline-block;
		color: #f6442b;
	}
	.rightContent > div span {
		color: #f6442b;
	}
	.rightContent del {
		font-size: 14px;
		color: #222;
	}
	.wishShops {
		display: flex;
		background: #fff;
		margin-bottom: 10px;
		height: 70px;
		line-height: 70px;
		padding: 10px;
	}
	.wishShops > div:first-child {
		flex: 0.5;
	}
	.wishShops > div:nth-child(2) {
		flex: 1.3;
		color: #666;
	}
	.wishShops > div:nth-child(3) {
		flex: 0.2;
		color: #f6442b;
	}
	.wishShops > div:first-child img {
		width: 110px;
		height: 70px;
	}


</style>