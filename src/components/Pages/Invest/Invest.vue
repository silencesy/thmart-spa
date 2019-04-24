<template>
	<div class="Invest">
		<div class="investImg"><img src="static/images/common/zhaoshang.jpg" alt=""></div>
		<div class="container">
			<div style="text-align: center;margin-top: 20px;">
				<video frameboder="0" width="92%" height="195.85" style="object-fit:fill;" muted autoplay="autoplay" controls x5-video-player-type='h5'>
		            <source src="static/video/thmart.mp4" type="video/mp4">
		        </video>
			</div>
			<p class="cn"><router-link to="/InvestEn">English</router-link></p>
			<p class="ruzhu">入驻优势</p>
			<div class="advantage">
				<ul>
					<li class="iconfont icon-shebeidiannaoshouji"></li>
					<li>一个简单方便的销售模式，打开电脑或者手机随时随地查看订单发货</li>
				</ul>
				<ul>
					<li>一个全新的不断发展的平台来拓宽你的生意</li>
					<li class="iconfont icon-pingtai"></li>
				</ul>
				<ul>
					<li class="iconfont icon-tiannei"></li>
					<li>新品首页资源位一周</li>
				</ul>
				<div class="mac"><img src="static/images/common/mac.png" alt=""></div>
				<ul>
					<li>新品促销资源位一周</li>
					<li class="iconfont icon-cuxiao1"></li>
				</ul>
				<ul>
					<li class="iconfont icon-sale"></li>
					<li>针对你的产品制定的营销促销</li>
				</ul>
				<ul>
					<li>微信公众号资源推广</li>
					<li class="iconfont icon-gongzhonghao"></li>
				</ul>
			</div>
			<div class="flow">
				<p class="title">入驻流程</p>
				<div class="flowBox">
					<ul>
						<p class="iconfont icon-shuziyi"></p>
						<p>如您有意向，请联系我们</p>
						<router-link to="/">thmart@urbanatomy.com</router-link>
					</ul>
					<ul>
						<p class="iconfont icon-2"></p>
						<p>当您提交资料后，请耐心<br>等待 <i>3</i> 个工作日左右</p>
					</ul>
					<ul>
						<p class="iconfont icon-shuzisan"></p>
						<p>商品详情页制作</p>
					</ul>
					<ul>
						<p class="iconfont icon-shuzisi"></p>
						<p>产品上架销售</p>
					</ul>
				</div>
			</div>
			<div class="tabBox">
	      <mt-navbar v-model="selected">
	        <mt-tab-item id="1">精选商品</mt-tab-item>
	        <mt-tab-item id="2">个性化商店</mt-tab-item>
	      </mt-navbar>
		    <!-- tab-container -->
		    <mt-tab-container v-model="selected">
		      <mt-tab-container-item id="1">
		        <div class="content">
							<div class="txt">
								<p>thMart商城是一个面向所有在华外籍人士的全新生活平台。在这里，用户不仅可以体验我们便捷多样的英文线上购物服务，也可随时随地获得城中最新的吃喝玩乐咨询。</p>
								<p>thMart商城致力于为在华外籍人士提供各类精选自世界各地的优质商品以及一流的生活类服务。</p>
								<p>我们需要您优质的商品。让我们携手开拓这一广大的高端市场！</p>
								<p>无需担心语言问题，我们提供有偿的商品上架翻译，详情制作等服务。我们亦会根据不同的商品分类收取一定的佣金（最终成交金额的固定扣点）。</p>
								<p>新品上架，您将获得微信推广，首页Banner，促销位等优势资源。</p>
							</div>
							<table class="goodsTable">
								<tr class="titleT">
									<td>商品分类</td>
								</tr>
								<tr>
									<td>售票</td>
								</tr>
								<tr>
									<td>鲜花</td>
								</tr>
								<tr>
									<td>玩具</td>
								</tr>
								<tr>
									<td>家电</td>
								</tr>
								<tr>
									<td>居家日用</td>
								</tr>
								<tr>
									<td>母婴</td>
								</tr>
								<tr>
									<td>酒水</td>
								</tr>
								<tr>
									<td>家庭清洁/纸品</td>
								</tr>
								<tr>
									<td>办公用品</td>
								</tr>
								<tr>
									<td>服饰，流行百货</td>
								</tr>
								<tr>
									<td>美妆个护</td>
								</tr>
								<tr>
									<td>宠物用品</td>
								</tr>
								<tr>
									<td>汽车用品</td>
								</tr>
								<tr>
									<td>钟表</td>
								</tr>
								<tr>
									<td>运动</td>
								</tr>
								<tr>
									<td>优惠券</td>
								</tr>
								<tr>
									<td>食品饮料</td>
								</tr>
								<tr>
									<td>图书</td>
								</tr>
								<tr>
									<td>珠宝首饰</td>
								</tr>
								<tr>
									<td>乐器</td>
								</tr>
							</table>
							<div class="join">
								<div>JOIN US</div>
								<div>
									<p class="joinP">1.所有商品必须以英文形式展现，如需要翻译制作，请<router-link to="/Cost" class="fanyi">点击此处</router-link> </p>
									<p>2.平台会在最终销售额中抽取佣金；</p>
									<p>3.部分分类需要交纳保证金。</p>
								</div>
							</div>	          
		        </div>
		      </mt-tab-container-item>
		      <mt-tab-container-item id="2">  
		        <div class="content">
							<div class="txt">
								<p>想拓宽店铺的销路?对于商家来说，个性化商店是您的不二之选!根据我们提供的操作手册，商家可以对自己的店铺进行装饰和美化。</p>
								<p>所有商铺将以套餐形式进行售卖。根据套餐价位的不同，我们将为商家提供不同形式的推广宣传。详情请参考如下图表。</p>
							</div>          
							<table class="tableShop">
								<tr class="trTitle">
									<td></td>
									<td>基础套餐</td>
									<td>标准套餐</td>
									<td class="haohua">豪华套餐</td>
									<td>至尊套餐</td>
								</tr>
								<tr>
									<td>特色<br>商铺</td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
								</tr>
								<tr>
									<td>线下<br>摊位</td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
								</tr>
								<tr>
									<td>广告栏<br>推广</td>
									<td></td>
									<td></td>
									<td class="iconfont icon-duihao2"><br><i>(1/月*1次)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(1/月*3次)</i></td>
								</tr>
								<tr>
									<td>微信<br>推广</td>
									<td class="iconfont icon-duihao2"><br><i>(*2次)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*5次)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*5次)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*10次)</i></td>
								</tr>
								<tr>
									<td>多平台<br>推广</td>
									<td></td>
									<td></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
								</tr>
								<tr>
									<td>编辑<br>精选</td>
									<td class="iconfont icon-duihao2"><br><i>(*1篇)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*1篇)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*2篇)</i></td>
									<td class="iconfont icon-duihao2"><br><i>(*2篇)</i></td>
								</tr>
								<tr>
									<td>商铺<br>装饰</td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
									<td class="iconfont icon-duihao2"></td>
								</tr>
							</table>

							<p class="itip">* 将按照活动主题挑选相关产品进行售卖</p>
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
		height: 100px;
	}
	.join > div:first-child {
		flex: 0.4;
		line-height: 100px;
		background: #f9421e;
		border: 1px solid #f9421e;
		border-radius: 8px;
		font-size: 30px;
		color: #fff;
		text-align: center;
		font-size: 20px;
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
	.joinP {
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
		font-size: 16px;
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
	}
</style>