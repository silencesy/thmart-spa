<template>
	<div class="Cost">
		<div class="investImg"><img src="static/images/common/zhaoshang.jpg" alt=""></div>
			<div class="container">
				<div class="zifei">
					<h2 class="ruzhu">资费</h2>
					<table class="zifeiTab">
						<tr class="zifeiTitle">
							<td colspan="2">产品拍摄</td>
						</tr>
						<tr class="costDetail">
							<td class="shuoming">说明</td>
							<td class="white"><span class="noAnli">拍摄800*800白底的产品图，<br>超过3个规格算另一个商品</span></td>
						</tr>
						<tr class="costDetail">
							<td>费用(元)</td>
							<td class="grey">50</td>
						</tr>
						<tr class="costDetail">
							<td>九折(3-5个商品)</td>
							<td class="white">45</td>
						</tr>
						<tr class="costDetail">
							<td>七折(5-10个商品)</td>
							<td class="grey">35</td>
						</tr>
						<tr class="costDetail">
							<td>五折(10-30个商品)</td>
							<td class="white">25</td>
						</tr>
					</table>

					<table class="zifeiTab">
						<tr class="zifeiTitle">
							<td colspan="2">简单制作+简单翻译</td>
						</tr>
						<tr class="costDetail">
							<td class="shuoming">说明</td>
							<td class="white whiteY"><span>50字内翻译+简单排版</span><router-link to="/CaseFirst">案例</router-link></td>
						</tr>
						<tr class="costDetail">
							<td>费用(元)</td>
							<td class="grey">200</td>
						</tr>
						<tr class="costDetail">
							<td>九折(3-5个商品)</td>
							<td class="white">180</td>
						</tr>
						<tr class="costDetail">
							<td>七折(5-10个商品)</td>
							<td class="grey">140</td>
						</tr>
						<tr class="costDetail">
							<td>五折(10-30个商品)</td>
							<td class="white">100</td>
						</tr>
					</table>

					<table class="zifeiTab">
						<tr class="zifeiTitle">
							<td colspan="2">详情制作</td>
						</tr>
						<tr class="costDetail">
							<td class="shuoming">说明</td>
							<td class="white"><span>设计，修改丰富内容的详情页，具有英语翻译</span><router-link to="/CaseSecond">案例</router-link></td>
						</tr>
						<tr class="costDetail">
							<td>费用(元)</td>
							<td class="grey">350</td>
						</tr>
						<tr class="costDetail">
							<td>九折(3-5个商品)</td>
							<td class="white">315</td>
						</tr>
						<tr class="costDetail">
							<td>七折(5-10个商品)</td>
							<td class="grey">280</td>
						</tr>
						<tr class="costDetail">
							<td>五折(10-30个商品)</td>
							<td class="white">245</td>
						</tr>
					</table>

					<table class="zifeiTab">
						<tr class="zifeiTitle">
							<td colspan="2">资深翻译</td>
						</tr>
						<tr class="costDetail">
							<td class="shuoming">说明</td>
							<td class="white whiteY"><span>翻译200字内的产品介绍</span><router-link to="/CaseSecond">案例</router-link></td>
						</tr>
						<tr class="costDetail">
							<td>费用(元)</td>
							<td class="grey">200</td>
						</tr>
						<tr class="costDetail">
							<td>九折(3-5个商品)</td>
							<td class="white">180</td>
						</tr>
						<tr class="costDetail">
							<td>七折(5-10个商品)</td>
							<td class="grey">140</td>
						</tr>
						<tr class="costDetail">
							<td>五折(10-30个商品)</td>
							<td class="white">100</td>
						</tr>
					</table>

					<table class="zifeiTab">
						<tr class="zifeiTitle">
							<td colspan="2">资深翻译+设计详情页</td>
						</tr>
						<tr class="costDetail">
							<td class="shuoming">说明</td>
							<td class="white"><span>翻译200字内的产品介绍+详情页制作</span><router-link to="/CaseSecond">案例</router-link></td>
						</tr>
						<tr class="costDetail">
							<td>费用(元)</td>
							<td class="grey">500</td>
						</tr>
						<tr class="costDetail">
							<td>九折(3-5个商品)</td>
							<td class="white">450</td>
						</tr>
						<tr class="costDetail">
							<td>七折(5-10个商品)</td>
							<td class="grey">350</td>
						</tr>
						<tr class="costDetail">
							<td>五折(10-30个商品)</td>
							<td class="white">250</td>
						</tr>
					</table>

					<table class="zifeiTab">
						<tr class="zifeiTitle">
							<td colspan="2">资深翻译+高级设计详情页</td>
						</tr>
						<tr class="costDetail">
							<td class="shuoming">说明</td>
							<td class="white"><span>翻译200字内的产品介绍+长篇详情页制作</span><router-link to="/CaseThird">案例</router-link></td>
						</tr>
						<tr class="costDetail">
							<td>费用(元)</td>
							<td class="grey">600</td>
						</tr>
						<tr class="costDetail">
							<td>九折(3-5个商品)</td>
							<td class="white">540</td>
						</tr>
						<tr class="costDetail">
							<td>七折(5-10个商品)</td>
							<td class="grey">420</td>
						</tr>
						<tr class="costDetail">
							<td>五折(10-30个商品)</td>
							<td class="white">300</td>
						</tr>
					</table>

					<div class="zifeiTip">
						<p>1.提供3%服务费发票；</p>
						<p>2.一款商品不同颜色详情页可算算一个商品收费；</p>
						<p>3.新商品根据数量可以有对应折扣；</p>
						<p>4.费用一次性收取，制作详情原稿可给客户。</p>
					</div>
					<div class="costBack">
						<router-link to="/Invest">返回合作招商页</router-link>
					</div>
				</div>
			</div>

	</div>
</template>
<script>
	export default {
	  name: 'Cost',
	  data() {
	    return {
	      
	    };
	  }
	};
</script>
<style scoped>
	.investImg img {
		width: 100%;
	}
	.container .ruzhu {
    padding: 20px 0;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
	}
	table {
    border-spacing: 0;
    border-collapse: collapse;
	}
	.zifei {
		padding: 0 15px;
		box-sizing: border-box;
	}
	.zifeiTab {
		width: 100%;
		margin-bottom: 15px;
	}
	.zifeiTab td {
		text-align: center;
		border: 1px solid #fff;
	}
	.zifeiTitle td {
		width: 100%;
		height: 35px;
		background: #f9421e;
		color: #fff;
		font-size: 14px;
	}
	.costDetail td {
		font-size: 12px;
		height: 35px;
		padding-top: 2px; 
	}
	.costDetail td:first-child {
		background: #a0a0a0;
		color: #fff;
	}
	.costDetail td.shuoming {
		height: 52px;
	}
	.costDetail .white {
		background: #fff;
		font-size: 14px;
	}
	.costDetail .grey {
		background: #e0e0e0;
		font-size: 14px;
	}
	.costDetail td a {
		color: #f9421e;
	    text-decoration: underline;
	    padding: 10px 12px 0px 0;
	    float: right;
	}
	.costDetail .whiteY a {
		padding: 0 12px 0px 0;
	}
	.costDetail td span {
		display: inline-block;
    width: 154px;
    text-align: left;
    font-size: 12px;
	}
	.costDetail td .noAnli {
		width: 181px;
    padding: 10px;
    box-sizing: border-box;
	}

	.zifeiTip {
		margin-top: 15px;
		margin-bottom: 25px;
	}
	.zifeiTip p {
		color: #666;
		line-height: 24px;
		font-size: 14px;
	}
	.costBack {
		text-align: center;
	}
	.costBack a {
		width: 160px;
		height: 36px;
		line-height: 36px;
		color: #fff;
		display: inline-block;
		background: #f9421e;
		border-radius: 8px;
		font-weight: 500;
		margin-bottom: 20px;
	}
</style>