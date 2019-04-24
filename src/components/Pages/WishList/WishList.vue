<template>  
  <div>  
    <div class="nav">  
      <mt-button class="nav-item" :class="{active: active == 'product'}" size="small" @click.native.prevent="active = 'product'">Products</mt-button>  
      <mt-button class="nav-item" :class="{active: active == 'shop'}" size="small" @click.native.prevent="active = 'shop'">Shops</mt-button>  
    </div>  
      
    <div class="page-tab-container">  
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>  
        <mt-tab-container-item class="item-container wrapper" id="product">
          <div :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="ScrollView" :height="height" color="#eee" :pullup="pullup" :data="goodsListData.data"  @pullingUp="getData">
              <div class="goods-container">
                <div class="wishGoods" v-for="(item,index) in goodsListData.data" :key="item.id">
                  <div class="goodsLeft" @click="goGoodsDetails(item.id)">
                    <img :src="item.pic" alt="">
                  </div>
                  <div class="goodsRight">
                    <p @click="goGoodsDetails(item.id)">{{item.title}}</p>
                    <div class="rightContent">
                      <div @click="goGoodsDetails(item.id)">
                        <span>￥{{item.price}}</span>
                      </div>
                      <div @click="cancelCollectionGoods(item.id,index)" class="iconfont icon-shoucang1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollView>
          </div>
          
        </mt-tab-container-item>  
        <mt-tab-container-item class="item-container" id="shop">
          <div :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="ScrollView2" :open="open" :height="height" color="#eee" :pullup="pullup" :data="shopListData.data"  @pullingUp="getData2">
              <div class="shop-container">
                <div class="wishShops" v-for="(item,index) in shopListData.data" :key="item.contentId">
                    <div @click="goShopDetails(item.contentId)">
                      <img :src="item.pic" alt="">
                    </div>
                    <div  @click="goShopDetails(item.contentId)">{{item.name}}</div>
                    <div @click="cancelCollectionShop(item.contentId,index)" class="iconfont icon-shoucang1"></div>
                </div>
              </div>
            </ScrollView>
          </div>
        </mt-tab-container-item>   
      </mt-tab-container>   
    </div>  
  </div>  
</template>    
  
<script>  
import { MessageBox } from 'mint-ui';
export default {  
  name: 'page-tab-container',  
  data() {  
    return {  
      active: 'product',
      height: 0,
      open: false,
      goodsListData: {
        data:[]
      },
      shopListData: {
        data:[]
      },
      pullup: true,
      param1: {
        type: 1,
        page: 0,
        pageSize: 20,
        totalPage: -1
      },
      param2: {
        type: 2,
        page: 0,
        pageSize: 20,
        totalPage: -1
      }
    };  
  },
  components: {
    BaseArticle: r => { require.ensure([], () => r(require('@/components/BaseComponents/BaseArticle')), 'BaseArticle') },
    ScrollView: r => { require.ensure([], () => r(require('@/components/BaseComponents/ScrollView')), 'ScrollView') }
  },
  mounted() {
    var that = this;
    that.$nextTick(() => {
      setTimeout(function(){
        that.height = document.documentElement.clientHeight-41;
      },20);
    });
    that.getData();
  },
  watch: {
    active: function(newVal,oldVal) {
      if (newVal == 'shop') {
        if (!this.open) {
          this.open = true;
          this.getData2();
        }
      }
    }
  },
  methods: {
    // 获取商品列表
    getData() {
      var that = this;
      that.param1.page++;
      that.$http.post(that.urls.collectList,that.param1)
      .then(function (response) {
        if (response.data.data.totalPage == 0 || that.param1.page >= response.data.data.totalPage) {
          that.$refs.ScrollView.endup();
        }
        that.goodsListData.data=that.goodsListData.data.concat(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // 获取商户列表
    getData2() {
      var that = this;
      that.param2.page++;
      that.$http.post(that.urls.collectList,that.param2)
      .then(function (response) {
        if (response.data.data.totalPage == 0 || that.param2.page >= response.data.data.totalPage) {
          that.$refs.ScrollView2.endup();
        }
        that.shopListData.data=that.shopListData.data.concat(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // 跳转商品详情页
    goGoodsDetails(id) {
      this.$router.push({path: "/GoodsDetails", query:{ id: id }})
    },
    // 跳转商户详情页
    goShopDetails(id) {
      this.$router.push({path: "/ShopHome", query:{ id: id }})
    },
    // 取消收藏商品
    cancelCollectionGoods(id,index) {
      var that = this;

      MessageBox.confirm('', { 
        message: 'Are you sure to remove this product?', 
        title: '', 
        confirmButtonText: 'Done', 
        cancelButtonText: 'Cancel' 
      }).then(action => { 
        that.$http.post(that.urls.collect,{
          type: 1,
          contentId: id,
          isCollect: 0
        })
        .then(function (response) {
            that.goodsListData.data.splice(index, 1);
            if (that.goodsListData.data.length == 0) {
              that.getData();
            }
        });
      }).catch(err => {});
      

    },
    // 取消收藏商户
    cancelCollectionShop(id,index) {
      var that = this;
      MessageBox.confirm('', { 
        message: 'Are you sure to remove this shop?', 
        title: '', 
        confirmButtonText: 'Done', 
        cancelButtonText: 'Cancel' 
      }).then(action => { 
        that.$http.post(that.urls.collect,{
          type: 2,
          contentId: id,
          isCollect: 0
        })
        .then(function (response) {
          that.shopListData.data.splice(index, 1);
          if (that.shopListData.data.length == 0) {
            that.getData2();
          }
        });
      }).catch(err => {});
    },
  }
};  
</script>  

<style scoped>  
  .nav {
    display: flex;
    border-bottom: 1px solid #dfdfdf;
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
  .mint-button::after {
    background-color: transparent;
  }
  .goods-container {
    padding: 10px;
  }
  .shop-container {
    padding: 10px;
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
    border-radius: 4px;
    float: left;
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
  .rightContent .icon-shoucang1 {
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
    line-height: 115px;
    padding: 10px;
  }
  .wishShops > div:first-child {
    flex: 0.5;
  }
  .wishShops > div:nth-child(2) {
    flex: 1.3;
    color: #666;
    padding-left: 10px;
  }
  .wishShops > div:nth-child(3) {
    flex: 0.2;
    color: #f6442b;
  }
  .wishShops > div:first-child img {
    width: 115px;
    height: 115px;
    border-radius: 4px;
    float: left;
  }
</style> 
