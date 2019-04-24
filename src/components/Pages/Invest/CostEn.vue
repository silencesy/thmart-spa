<template>
	<div class="CostEn">
		<div class="investImg"><img src="static/images/common/zhaoshang.jpg" alt=""></div>
		<div class="container">
			<div class="zifei">
				<h2 class="ruzhu">Service Price List</h2>
				<table class="zifeiTab">
					<tr class="zifeiTitle">
						<td colspan="2">Product photography</td>
					</tr>
					<tr class="costDetail">
						<td class="shuoming">Instruction</td>
						<td class="white"><span class="noAnli">800*800px pictures over a white background (Three items per transaction.)</span></td>
					</tr>
					<tr class="costDetail">
						<td>Price</td>
						<td class="grey">50</td>
					</tr>
					<tr class="costDetail">
						<td>10% discount (3-5 commodities)</td>
						<td class="white">45</td>
					</tr>
					<tr class="costDetail">
						<td>30% discount (5-10 commodities)</td>
						<td class="grey">35</td>
					</tr>
					<tr class="costDetail">
						<td>50% discount (10-20 commodities)</td>
						<td class="white">25</td>
					</tr>
				</table>

				<table class="zifeiTab">
					<tr class="zifeiTitle">
						<td colspan="2">Simple product description & translation</td>
					</tr>
					<tr class="costDetail">
						<td class="shuoming">Instruction</td>
						<td class="white whiteY"><span>50 words and simple typesetting</span><router-link to="/CaseFirstEn">Example</router-link></td>
					</tr>
					<tr class="costDetail">
						<td>Price</td>
						<td class="grey">200</td>
					</tr>
					<tr class="costDetail">
						<td>10% discount (3-5 commodities)</td>
						<td class="white">180</td>
					</tr>
					<tr class="costDetail">
						<td>30% discount (5-10 commodities)</td>
						<td class="grey">140</td>
					</tr>
					<tr class="costDetail">
						<td>50% discount (10-20 commodities)</td>
						<td class="white">100</td>
					</tr>
				</table>

				<table class="zifeiTab">
					<tr class="zifeiTitle">
						<td colspan="2">Detailed page design</td>
					</tr>
					<tr class="costDetail">
						<td class="shuoming">Instruction</td>
						<td class="white"><span>Design and modify content-rich detail pages with English translation included</span><router-link to="/CaseSecondEn">Example</router-link></td>
					</tr>
					<tr class="costDetail">
						<td>Price</td>
						<td class="grey">350</td>
					</tr>
					<tr class="costDetail">
						<td>10% discount (3-5 commodities)</td>
						<td class="white">315</td>
					</tr>
					<tr class="costDetail">
						<td>30% discount (5-10 commodities)</td>
						<td class="grey">280</td>
					</tr>
					<tr class="costDetail">
						<td>50% discount (10-20 commodities)</td>
						<td class="white">245</td>
					</tr>
				</table>

				<table class="zifeiTab">
					<tr class="zifeiTitle">
						<td colspan="2">Professional translation</td>
					</tr>
					<tr class="costDetail">
						<td class="shuoming">Instruction</td>
						<td class="white whiteY"><span>Product introduction of up to 200 words</span><router-link to="/CaseSeconden">Example</router-link></td>
					</tr>
					<tr class="costDetail">
						<td>Price</td>
						<td class="grey">200</td>
					</tr>
					<tr class="costDetail">
						<td>10% discount (3-5 commodities)</td>
						<td class="white">180</td>
					</tr>
					<tr class="costDetail">
						<td>30% discount (5-10 commodities)</td>
						<td class="grey">140</td>
					</tr>
					<tr class="costDetail">
						<td>50% discount (10-20 commodities)</td>
						<td class="white">100</td>
					</tr>
				</table>

				<table class="zifeiTab">
					<tr class="zifeiTitle">
						<td colspan="2">Professional translation & Detailed page design</td>
					</tr>
					<tr class="costDetail">
						<td class="shuoming">Instruction</td>
						<td class="white"><span>Product introduction of up 200 words and detail page design</span><router-link to="/CaseSecondEn">Example</router-link></td>
					</tr>
					<tr class="costDetail">
						<td>Price</td>
						<td class="grey">500</td>
					</tr>
					<tr class="costDetail">
						<td>10% discount (3-5 commodities)</td>
						<td class="white">450</td>
					</tr>
					<tr class="costDetail">
						<td>30% discount (5-10 commodities)</td>
						<td class="grey">350</td>
					</tr>
					<tr class="costDetail">
						<td>50% discount (10-20 commodities)</td>
						<td class="white">250</td>
					</tr>
				</table>

				<table class="zifeiTab">
					<tr class="zifeiTitle">
						<td colspan="2">Professional translation & detailed Page design</td>
					</tr>
					<tr class="costDetail">
						<td class="shuoming">Instruction</td>
						<td class="white"><span>Product introduction of up to 200 words and detail page design</span><router-link to="/CaseThirdEn">Example</router-link></td>
					</tr>
					<tr class="costDetail">
						<td>Price</td>
						<td class="grey">600</td>
					</tr>
					<tr class="costDetail">
						<td>10% discount (3-5 commodities)</td>
						<td class="white">540</td>
					</tr>
					<tr class="costDetail">
						<td>30% discount (5-10 commodities)</td>
						<td class="grey">420</td>
					</tr>
					<tr class="costDetail">
						<td>50% discount (10-20 commodities)</td>
						<td class="white">300</td>
					</tr>
				</table>

				<div class="zifeiTip">
					<p>1.We provide invoices (fapiao) for a 3% service charge</p>
					<p>2.One kind of product with different colors can be counted as one commodity</p>
					<p>3.A sliding discount is offered on new commodities according to the quantity</p>
					<p>4.All images and copy become the intellectual property of the vendor upon payment to thMart</p>
				</div>
				<div class="costBack">
					<router-link to="/InvestEn">Back</router-link>
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
	}
	.costDetail td span {
		display: inline-block;
    width: 154px;
    text-align: left;
    font-size: 12px;
	}
	.costDetail td .noAnli {
		width: 181px;
    padding: 0 15px;
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