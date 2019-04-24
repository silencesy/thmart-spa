<template>
	<div class="Invest">
		<div class="investImg"><img src="static/images/common/zhaoshang.jpg" alt=""></div>
		<div class="container">
			<div style="text-align: center;margin-top: 20px;">
				<video frameboder="0" width="92%" height="195.85" style="object-fit:fill;" muted autoplay="autoplay" controls x5-video-player-type='h5'>
		            <source src="static/video/thmart.mp4" type="video/mp4">
		        </video>
			</div>
			<p class="cn"><router-link to="/Invest">中文</router-link></p>
			<p class="ruzhu">Advantages</p>
			<div class="advantage">
				<ul>
					<li class="iconfont icon-shebeidiannaoshouji"></li>
					<li>An easy and convenient way to sell your products - check your order and shipping anytime, anywhere on both desktop and mobile</li>
				</ul>
				<ul>
					<li>A brand new platform to expand your business</li>
					<li class="iconfont icon-pingtai"></li>
				</ul>
				<ul>
					<li class="iconfont icon-tiannei"></li>
					<li>One-week showcase opportunity on homepage for new products</li>
				</ul>
				<div class="mac"><img src="static/images/common/mac.png" alt=""></div>
				<ul>
					<li>One-week showcase opportunity for new products with a special offer</li>
					<li class="iconfont icon-cuxiao1"></li>
				</ul>
				<ul>
					<li class="iconfont icon-sale"></li>
					<li>Marketing promotion tailored for your products</li>
				</ul>
				<ul>
					<li>Promotion on our WeChat subscription account</li>
					<li class="iconfont icon-gongzhonghao"></li>
				</ul>
			</div>
			<div class="flow">
				<p class="title">How to sign up</p>
				<div class="flowBox">
					<ul>
						<p class="iconfont icon-shuziyi"></p>
						<p>If you are interested, please contact us at</p>
						<router-link to="/">thmart@urbanatomy.com</router-link>
					</ul>
					<ul>
						<p class="iconfont icon-2"></p>
						<p>We’ll get back to you within <i>three</i> working days of you submitting you materials</p>
					</ul>
					<ul>
						<p class="iconfont icon-shuzisan"></p>
						<p>We’ll then craft an individual vendor page for you</p>
					</ul>
					<ul>
						<p class="iconfont icon-shuzisi"></p>
						<p>Your products will then be available for sale</p>
					</ul>
				</div>
			</div>
			<div class="tabBox">
		  <mt-navbar v-model="selected">
			<mt-tab-item id="1">Selections of Goods</mt-tab-item>
			<mt-tab-item id="2">Personalized Store</mt-tab-item>
		  </mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
			  <mt-tab-container-item id="1">
				<div class="content">
							<div class="txt">
								<p>thMart is a lifestyle platform that provides a comprehensive range of services and information for China-based expats. Users can experience our varied online shopping service, covering everything from useful products to the best restaurants, attractions and activities. And all this, anytime and anywhere. </p>
								<p>You don’t need to worry about language problems either. We offer a translation service, including product descriptions and design. Commission works on a sliding scale according to the classification of the goods. And when goods are updated, vendors will enjoy the benefit of our promotions platforms, from WeChat to website, print to offline events.</p>
							</div>
							<table class="goodsTable">
								<tr class="titleT">
									<td>Categories</td>
								</tr>
								<tr>
									<td>Ticketing</td>
								</tr>
								<tr>
									<td>Flower</td>
								</tr>
								<tr>
									<td>Toys</td>
								</tr>
								<tr>
									<td>Electronics</td>
								</tr>
								<tr>
									<td>Homeware</td>
								</tr>
								<tr>
									<td>Baby products</td>
								</tr>
								<tr>
									<td>Liquor</td>
								</tr>
								<tr>
									<td>Cleaning</td>
								</tr>
								<tr>
									<td>Office products</td>
								</tr>
								<tr>
									<td>Apparel</td>
								</tr>
								<tr>
									<td>Personal care and beauty</td>
								</tr>
								<tr>
									<td>Pet product</td>
								</tr>
								<tr>
									<td>Automotive</td>
								</tr>
								<tr>
									<td>Watch</td>
								</tr>
								<tr>
									<td>Sports</td>
								</tr>
								<tr>
									<td>Coupons</td>
								</tr>
								<tr>
									<td>Food and Beverage</td>
								</tr>
								<tr>
									<td>Book</td>
								</tr>
								<tr>
									<td>Jewelery</td>
								</tr>
								<tr>
									<td>Musical instrument</td>
								</tr>
							</table>
							<div class="join">
								<div>JOIN US</div>
								<div>
									<p class="joinP">1.All goods must be displayed in English. Please <router-link to="CostEn" class="fanyi">click here</router-link> if you need a translation service</p>
									<p>2.thMart charges a transaction fee on each trade</p>
									<p>3.A deposit is required for some products</p>
								</div>
							</div>	          
				</div>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="2">  
				<div class="content">
							<div class="txt">
								<p>Want to broaden your retail market? thMart Personalized Store is the perfect opportunity. Each store has its own page, which ThMart helps design, while store owners hold the authority to upload and update their products. It should be noted that all Personalized Shops will be sold in package. In accordance with different package prices, we will provide a variety of promotions for shop owners. Please check Table 1 for reference.</p>
							</div>          
							<table class="tableShop">
								<tr class="trTitle">
									<td></td>
									<td>Basic Package</td>
									<td>Standard Package</td>
									<td class="haohua">Deluxe Package</td>
									<td>Premium Package</td>
								</tr>
								<tr>
									<td>Feature<br>Shop</td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
								</tr>
								<tr>
									<td>Offline<br>Selling*</td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
								</tr>
								<tr>
									<td>Banner<br>Promotion</td>
									<td></td>
									<td></td>
									<td class="iconfont icon-duihao2"><br><i>(1/month*<br>1time)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(1/month*<br>3time)</i></td>
								</tr>
								<tr>
									<td>Wechat<br>Promotion</td>
									<td class="iconfont icon-duihao2"><br><i>(*2<br>times)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*5<br>times)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*5<br>times)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*10<br>times)</i></td>
								</tr>
								<tr>
									<td>Multi Platform Promotion</td>
									<td></td>
									<td></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
								</tr>
								<tr>
									<td>Editor's<br>Pick</td>
									<td class="iconfont icon-duihao2"><br><i>(*1 articles)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*1 articles)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*2 articles)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*2 articles)</i></td>
								</tr>
								<tr>
									<td>Shop Decoration</td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
								</tr>
							</table>

							<p class="itip">* The products will be selected for sale by themes of events</p>
				</div>
			  </mt-tab-container-item>		      
			</mt-tab-container>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
	  name: 'Home',
	  data () {
		return {
		 selected: "1",
		}
	  },
	  mounted() {
		
	  }
	}
</script>
<style scoped>
	.investImg img {
		width: 100%;
	}
	.ruzhu {
		padding: 20px 0;
		font-size: 24px;
		font-weight: 500;
		text-align: center;
	}

	.cn {
		text-align: center;
		margin-top: 20px;
	}
	.cn a {
		display: inline-block;
		border: 1px solid #222;
		border-radius: 8px;
		width: 95px;
		height: 30px;
		line-height: 30px;
		color: #222;
	}

	.advantage {
		padding: 0 20px;
		box-sizing: border-box;
		margin-bottom: 20px;
	 }
	.advantage ul {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		align-self: center;
		box-sizing: border-box;
	}
	.advantage ul li {
		font-size: 14px;
		line-height: 25px;
	}
	.advantage ul li.iconfont {
		font-size: 27px;
		color: #fff;
		width: 44px;
		height: 44px;
		background: #f9421e;
		line-height: 44px;
		border-radius: 50%;
		text-align: center;
	 }
	.advantage ul:nth-of-type(odd) li:nth-child(2) {
		flex: 1;
		padding-right: 47px;
		padding-left: 14px;
	}
	.advantage ul:nth-of-type(even) li:first-child {
		flex: 1;
		padding-left: 58px;
		padding-right: 10px;
	}

	.mac {
		width: 100%;
		text-align: center;
	}
	.mac img {
		width: 60%;
	}
	.flow {
		background: #fff;	
		margin-bottom: 15px;
	}
	.flow .title {
		text-align: center;
		padding: 20px 0;
		font-size: 24px;
		font-weight: 500;
	}
	.flowBox {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		padding: 10px;
		box-sizing: border-box;
		justify-content: space-between;
	}
	.flowBox ul {
		width: 49%;
		border: 1px solid #dfdfdf;
		margin-bottom: 20px;
		text-align: center;
		padding: 15px;
		box-sizing: border-box;
		padding: 15px 6px;
	}
	.flowBox ul p {
		font-size: 12px;
	}
	.flowBox ul a {
		font-size: 12px;
		color: #02ACCB;
		word-break: break-all;
	}
	.flowBox ul p:first-child {
		display: block;
		font-size: 40px;
		margin-bottom: 15px;
		color: #f9421e;
	}
	.flowBox ul:nth-child(3) {
		padding-bottom: 41px;
	}
	.flowBox ul:nth-child(4) {
		padding-bottom: 41px;
	}
	.tabBox {
		padding: 10px;
		box-sizing: border-box;
	}
	.tabBox .mint-navbar .mint-tab-item {
		padding: 11px 0;
	}
	.tabBox .mint-navbar .mint-tab-item.is-selected {
		color: #fff !important;
		background-color: #f24827;
	}
	.txt {
		margin: 20px 0;
		text-align: center;
	}
	.txt p {
		line-height: 24px;
		color: #666;
		font-size: 14px;
	}
	table {
		border-spacing: 0;
		border-collapse: collapse;
	}
	.goodsTable {
		width: 100%;
		text-align: center;
		margin-bottom: 20px;
	}
	.goodsTable .titleT {
		background: #969696 !important;
	}
	.goodsTable .titleT td {
		height: 32px;
		color: #fff;
	}
	.goodsTable tr:nth-child(odd) {
		background: #fff;
	}
	.goodsTable tr:nth-child(even) {
		background: #dcdcdc;
	}
	.goodsTable td {
		padding: 5px 0;
	}
	
	.join {
		background: #fff;
		margin-bottom: 20px;
		border-radius: 8px;
		display: flex;
	}
	.join > div {
		height: 160px;
	}
	.join > div:first-child {
		flex: 0.4;
		line-height: 160px;
		background: #f9421e;
		border: 1px solid #f9421e;
		border-radius: 8px;
		font-size: 30px;
		color: #fff;
		text-align: center;
		font-size: 20px;
		margin-right: 10px;
	}
	.join > div:nth-child(2) {
		flex: 1;
		font-size: 14px;
		box-sizing: border-box;
		padding: 5px 5px 0 12px;
	}
	.join > div:nth-child(2) p {
		font-size: 14px;
		line-height: 22px;
	}
	.join .fanyi {
		color: #Eb4606;
		text-decoration: underline;
	}
	.join > div {
		text-indent: -13px;
		padding-left: 11px;
	}
	.tableShop td  {
		text-align: center;
		border: 1px solid #ededed;
		font-size: 14px;
		padding: 5px 2px;
	}
	.tableShop .trTitle td{
		height: 40px;
		background: #f9421e;
		color: #fff;
		border: none;
	}
	.icon-duihao2 {
		color: #f9421e;
		font-size: 24px;
	}
	.icon-duihao2 i {
		font-size: 14px;
		color: #666;
		display: inline-block;
	  vertical-align: middle;
	}
	.tableShop {
		width: 100%;
	}
	.tableShop tr:nth-child(odd) {
		background: #dcdcdc;
		border: 1px solid #ededed;
	}
	.tableShop tr:nth-child(even) {
		background: #fff;
		border: 1px solid #ededed;
	}
	.buzhou i {
		font-weight: 600;
	}
	.itip {
		margin-top: 15px;
		margin-bottom: 25px;
		font-size: 14px;
		color: #666;
	}
</style>