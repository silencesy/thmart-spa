<template>
	<div class="HomeSearch">
		<div class="search-container">
			<mt-search v-model="value" cancel-text="" placeholder=""></mt-search>
			<router-link to="/"><div class="cancel-btn">Cancel</div></router-link>
		</div>
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">Products</mt-tab-item>
		  <mt-tab-item id="2">Shops</mt-tab-item>
		  <mt-tab-item id="3">Articles</mt-tab-item>
		  <mt-tab-item id="4">Ticketing</mt-tab-item>
		  <mt-tab-item id="5">Coupons</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
        <Sort />
        <ScrollView :height="height-124" :pullup="pullup"  @pullingUp="loadData">
          <GoodsRow :goodsData="goodsData" :Columns="2" backgroundColor="#eee"/>
        </ScrollView>
		    
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
        <ScrollView :height="height-84" :open="openScrollView.Shops.open" :pullup="pullup"  @pullingUp="loadData">
          <shopRow />
        </ScrollView>
		    
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
        <ScrollView :height="height-84" :open="openScrollView.Articles.open" :pullup="pullup"  @pullingUp="loadData">
          <BaseArticle :articleData="articleData" articleContentBg="#eee" :articleItemStyleObj="articleItemStyleObj"/>
          <BaseArticle :articleData="articleData" articleContentBg="#eee" :articleItemStyleObj="articleItemStyleObj"/>
          
        </ScrollView>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="4">
        <Sort />
        <ScrollView :height="height-124" :open="openScrollView.Ticketing.open" :pullup="pullup"  @pullingUp="loadData">
          <GoodsRow :goodsData="goodsData" :Columns="2" backgroundColor="#eee"/>
        </ScrollView>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="5">
        <Sort @Sort="CouponsSort"/>
        <ScrollView :height="height-124" :open="openScrollView.Coupons.open" :pullup="pullup" :noDada="openScrollView.Coupons.noDada"  @pullingUp="CouponsloadData">
          <GoodsRow :goodsData="goodsData2" :Columns="2" backgroundColor="#eee"/>
        </ScrollView>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
	var googs = [
      {
        "id": "222",
        "set_id": "222",
        "goods_name": "BRITA Marella 3.5L(blue)+Maxtra Filter Cartridge (6 packs)",
        "coverpic": "http://api.mall.thatsmags.com/Public/ckfinder/images/BRITA/BRD.jpg",
        "goods_price": "598",
        "goods_sale_price": "428",
        "sale_count": "2",
        "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/BRITA/BRD.jpg"
      },
      {
        "id": "228",
        "set_id": "228",
        "goods_name": "Clorox Disinfectant Wipes 35 Wet Wipes",
        "coverpic": "http://api.mall.thatsmags.com/Public/ckfinder/images/Cleaning/Clorox/Disinfectant Wipes1.jpg",
        "goods_price": "59",
        "goods_sale_price": "39",
        "sale_count": "0",
        "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/Cleaning/Clorox/Disinfectant Wipes1.jpg"
      },
      {
        "id": "175",
        "set_id": "175",
        "goods_name": "UMBRA DRINKING BUDDY WINE",
        "coverpic": "http://api.mall.thatsmags.com/Public/ckfinder/images/home/UMBRA/buddywine/16.jpg",
        "goods_price": "66",
        "goods_sale_price": "60",
        "sale_count": "6",
        "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/home/UMBRA/buddywine/16.jpg"
      },
      {
        "id": "156",
        "set_id": "156",
        "goods_name": "Summer Barbecue Sizzler Coupon",
        "coverpic": "http://api.mall.thatsmags.com/Public/ckfinder/images/food/Charlie/BBQ/sbs112.jpg",
        "goods_price": "799",
        "goods_sale_price": "748",
        "sale_count": "0",
        "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/food/Charlie/BBQ/sbs112.jpg"
      },
      {
        "id": "250",
        "set_id": "250",
        "goods_name": "【thDispatcher】Heineken Beer 500ml, Pack of 18",
        "coverpic": "http://api.mall.thatsmags.com/Public/ckfinder/images/food/JD/Heinekenbeer500ml.jpg",
        "goods_price": "169",
        "goods_sale_price": "159",
        "sale_count": "0",
        "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/food/JD/Heinekenbeer500ml.jpg"
      },
      {
        "id": "206",
        "set_id": "206",
        "goods_name": "Hot Love Bouquet / Flowers",
        "coverpic": "http://api.mall.thatsmags.com/Public/ckfinder/images/flower/hot/惹火爱情.jpg",
        "goods_price": "298",
        "goods_sale_price": "188",
        "sale_count": "0",
        "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/flower/hot/惹火爱情.jpg"
      },
      {
        "id": "200",
        "set_id": "200",
        "goods_name": "Love for Life Bouquet / Flowers",
        "coverpic": "http://api.mall.thatsmags.com/Public/ckfinder/images/flower/loveofife/主图1.jpg",
        "goods_price": "258",
        "goods_sale_price": "158",
        "sale_count": "0",
        "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/flower/loveofife/主图1.jpg"
      },
      {
        "id": "226",
        "set_id": "226",
        "goods_name": "Magic Array Vase",
        "coverpic": "http://api.mall.thatsmags.com/Public/ckfinder/images/flower/Vase/mofazhen.jpg",
        "goods_price": "59",
        "goods_sale_price": "55",
        "sale_count": "0",
        "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/flower/Vase/mofazhen.jpg"
      }
    ]
    
	let articleData = {
      "list": [
        {
          "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/Article/614103700.png",
          "set_id": "16",
          "article_name": "Keep Your Kitchen Nice and Tidy with These Innovative Items",
          "create_time": "2018-06-11",
          "description": null,
          "coverpic": "http://api.mall.thatsmags.com"
        },
        {
          "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/toys/NERF/A4492/A449295111.jpg",
          "set_id": "9",
          "article_name": "Your Kids Will Love These Fun NERF Toys",
          "create_time": "2018-05-25",
          "description": null,
          "coverpic": "http://api.mall.thatsmags.com"
        },
        {
          "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/Article/cook.jpg",
          "set_id": "13",
          "article_name": "Cooking Made Easy With This Premium Kitchenware",
          "create_time": "2018-06-05",
          "description": null,
          "coverpic": "http://api.mall.thatsmags.com"
        },
        {
          "set_img": "http://api.mall.thatsmags.com/Public/ckfinder/images/Article/1.jpg",
          "set_id": "17",
          "article_name": "Baby-Proof Your Home with These Safe Cleaning Products",
          "create_time": "2018-06-11",
          "description": null,
          "coverpic": "http://api.mall.thatsmags.com"
        }
      ]
    }
	export default {
		name: 'HomeSearch',
		data() {
			return {
				selected: '1',
				value: '',
				goodsData: googs,
        goodsData2: [],
				articleData: articleData,
				articleItemStyleObj: {
	        'border': '1px solid #dfdfdf',
	        'padding': '10px'
	      },
        pullup: true,
        height: 0,
        openScrollView: {
          Shops: {
            open: false,
            page: 0,
            pageSize: 10
          },
          Articles: {
            open: false,
            page: 0,
            pageSize: 10
          },
          Ticketing: {
            open: false,
            page: 0,
            pageSize: 10
          },
          Coupons: {
            open: false,
            page: 0,
            pageSize: 10,
            noDada: true
          }
        }
			}
		},
    mounted() {
      var that = this;
      that.$nextTick(() => {
        setTimeout(function(){
          that.height = document.documentElement.clientHeight;
        },20);
      });
    },
		components: {
      GoodsRow: r => { require.ensure([], () => r(require('../../BaseComponents/GoodsRow')), 'GoodsRow') },
      ScrollView: r => { require.ensure([], () => r(require('../../BaseComponents/ScrollView')), 'ScrollView') },
      BaseArticle: r => { require.ensure([], () => r(require('../../BaseComponents/BaseArticle')), 'BaseArticle') },
      Sort: r => { require.ensure([], () => r(require('../../BaseComponents/Sort')), 'Sort') },
			ShopRow: r => { require.ensure([], () => r(require('../../BaseComponents/ShopRow')), 'ShopRow') }
		},
    methods: {
      loadData() {
        console.log(0);
      },
      CouponsloadData() {
        var that = this;
        that.openScrollView.Coupons.page++;
        
        if (that.openScrollView.Coupons.page>2) {
          that.openScrollView.Coupons.noDada = false
        } else {
          setTimeout(function(){
            that.goodsData2 = that.goodsData2.concat(googs);
          },2000);
        }
      },
      CouponsSort(data) {
        var that = this;
        that.openScrollView.Coupons.noDada = true;
        this.openScrollView.Coupons.page = 0;
        that.goodsData2 = [];
        setTimeout(function(){
          that.goodsData2 = that.goodsData2.concat(googs);
        },2000);
      }
    },
    watch: {
      selected: function(newVal,oldVal) {
        var that = this;
        console.log(newVal);
        if (newVal==2) {
          that.openScrollView.Shops.open = true;
        } else if (newVal==3) {
          that.openScrollView.Articles.open = true;
        } else if (newVal==4) {
          that.openScrollView.Ticketing = true;
        } else if (newVal==5) {
          that.openScrollView.Coupons.open = true;
          setTimeout(function(){
            that.goodsData2 = that.goodsData2.concat(googs);
          },2000);
        }
      }
    }
	}
</script>
<style scoped>
	.mint-tab-container-item {
    margin-top: 1px;
  }
</style>