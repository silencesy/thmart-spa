<template>
	<div class="OrderList">
    <div class="nav"> 
    	<div class="navBox">
	      <mt-button class="nav-item" :class="{active: active == 'All'}" @click.native.prevent="active = 'All'">All</mt-button>  
	      <mt-button class="nav-item" :class="{active: active == 'Unpaid'}" @click.native.prevent="active = 'Unpaid'">Unpaid</mt-button>  
	      <mt-button class="nav-item" :class="{active: active == 'Unshipped'}" @click.native.prevent="active = 'Unshipped'">Unshipped</mt-button>  
	      <mt-button class="nav-item" :class="{active: active == 'Progress'}" @click.native.prevent="active = 'Progress'">In Progress</mt-button>  
	      <mt-button class="nav-item" :class="{active: active == 'Shipped'}" @click.native.prevent="active = 'Shipped'">Shipped</mt-button>
	    </div>  
    </div>        
    <div class="page-tab-container">  
      <mt-tab-container class="page-tabbar-tab-container"  v-model="active" swipeable>  
        <mt-tab-container-item id="All">
					<div class="container">
						<ShopGoodsItem>
							<i class="iconfont" slot="titleRight">Unpaid</i>
							<div slot="bottom" class="bottom">
								<p>
									<span>&nbsp;</span>
									<span><i>Total：</i>¥316</span>
								</p>
								<div class="">
									<span>Details</span>
									<span>Pay</span>
								</div>
							</div>
						</ShopGoodsItem>
						<ShopGoodsItem>
							<i class="iconfont" slot="titleRight">Close</i>
							<div slot="bottom" class="bottom">
								<p>
									<span>&nbsp;</span>
									<span><i>Total：</i>¥316</span>
								</p>
								<div class="">
									<span>Details</span>
									<span>Pay</span>
								</div>
							</div>
						</ShopGoodsItem>
					</div>         
        </mt-tab-container-item>  
        <mt-tab-container-item id="Unpaid">
        	<div class="container">
						<ShopGoodsItem>
							<i class="iconfont" slot="titleRight">Unpaid</i>
							<div slot="bottom" class="bottom">
								<p>
									<span>&nbsp;</span>
									<span><i>Total：</i>¥316</span>
								</p>
								<div class="">
									<span>Details</span>
									<span>Pay</span>
								</div>
							</div>
						</ShopGoodsItem>
					</div>
        </mt-tab-container-item>  
				<mt-tab-container-item id="Unshipped">
        	<div class="container">
						<ShopGoodsItem>
							<i class="iconfont" slot="titleRight">Unshipped</i>
							<div slot="bottom" class="bottom">
								<p>
									<span>&nbsp;</span>
									<span><i>Total：</i>¥316</span>
								</p>
								<div class="">
									<span>Details</span>
									<span>Pay</span>
								</div>
							</div>
						</ShopGoodsItem>
					</div>       
        </mt-tab-container-item> 
        <mt-tab-container-item id="Progress">
        	<div class="container">
						<ShopGoodsItem>
							<i class="iconfont" slot="titleRight">In Progress</i>
							<div slot="bottom" class="bottom">
								<p>
									<span>&nbsp;</span>
									<span><i>Total：</i>¥316</span>
								</p>
								<div class="">
									<span>Details</span>
									<span>Pay</span>
								</div>
							</div>
						</ShopGoodsItem>
					</div>        
        </mt-tab-container-item> 
        <mt-tab-container-item id="Shipped">
        	<div class="container">
						<ShopGoodsItem>
							<i class="iconfont" slot="titleRight">Shipped</i>
							<div slot="bottom" class="bottom">
								<p>
									<span>&nbsp;</span>
									<span><i>Total：</i>¥316</span>
								</p>
								<div class="">
									<span>Details</span>
									<span>Pay</span>
								</div>
							</div>
						</ShopGoodsItem>
          </div>
        </mt-tab-container-item> 
      </mt-tab-container>   
    </div>  
	</div>
</template>
<script>	
	export default {
		name: 'OrderList',
		data() {
			return {
				active: 'All',
			}
		},
		components: {
			ShopGoodsItem: r => { require.ensure([], () => r(require('../../BaseComponents/ShopGoodsItem')), 'ShopGoodsItem') }
		}
	}
</script>
<style scoped>
	.nav {
		background: #fff;
		width: 100%;
    overflow-x: scroll;
    margin-bottom: 10px;
	}
	.navBox {
		width: 412px;
    height: 43px;
    padding: 0 5px;
	}
	.mint-button::after {
		background-color: #fff;
	}
	.mint-button--default {
		background-color: #fff;
    box-shadow: none;
    float: left;
	}
	.title .iconfont {
		color: #F9421E;
	}
	.bottom {
		background: #fff;
		overflow: hidden;
	}	
	.bottom > p {
		height: 50px;
		line-height: 50px;
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.bottom > p span:nth-child(2) {
		color: #F9421E;
		font-size: 16px;
	}
	.bottom > p i {
		padding-left: 10px;
	}
	.bottom > div {
		float: right;
		margin-bottom: 15px;
	}
	.bottom > div span {
		display: inline-block;
		text-align: center;
		border: 1px solid #dfdfdf;
		border-radius: 30px;
		width: 80px;
		height: 30px;
		line-height: 30px;
		color: #666;
	}
	.bottom > div span:first-child {
		margin-right: 15px;
	}
	.bottom > div span:nth-child(2) {
		margin-right: 10px;
	}
</style>