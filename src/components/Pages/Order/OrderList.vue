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
          <div class="container" :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="allScrollView" color="#eee" :open="allOpen" :pullup="pullup" :height="height" :data="allData"  @pullingUp="allGetData">
              <div class="content">
                <ShopGoodsItem v-for="(item,index) in allData" :key="item.orderNumber" iconfontName="icon-dingdanhao">
                  <span class="order-number" slot="orderNumber">{{item.orderNumber}}</span>
                  <i v-if="item.status == 0 || item.status == 5" class="iconfont" slot="titleRight">Unpaid</i>
                  <i v-else-if="item.status == 1" class="iconfont" slot="titleRight">Unshipped</i>
                  <i v-else-if="item.status == 2" class="iconfont" slot="titleRight">In Progress</i>
                  <i v-else-if="item.status == 3" class="iconfont" slot="titleRight">Shipped</i>
                  <i v-else-if="item.status == 4" class="iconfont" slot="titleRight">Close</i>
                  <i v-else-if="item.status == 6" class="iconfont share-text" slot="titleRight">Share with Your Friend,<br> {{item.number_left}} Vacancy Left</i>
                  <i v-else-if="item.status == 7" class="iconfont" slot="titleRight">Completed</i>
                  <div class="img-box" slot="content">
                    <img class="goods-img" v-for="(val,index) in item.skuList" :key="index" :src="val.pic" alt="">
                  </div>
                  <div slot="bottom" class="bottom">
                    <p>
                      <span>&nbsp;</span>
                      <span><i>Total：</i>¥{{item.priceTotal}}</span>
                    </p>
                    <!-- 未支付 -->
                    <div v-if="item.status == 0 || item.status == 5">
                      <span @click="unpaidDetails(item.orderNumber)">Details</span>
                      <span @click="pay(item.orderNumber)">Pay</span>
                    </div>
                    <!-- 已支付 -->
                     <div v-else-if="item.status == 1">
                      <span @click="UnshippedDetails(item.orderNumber)">Details</span>
                    </div>
                    <!-- 已支付拼单 -->
                    <div v-else-if="item.status == 6">
                      <span @click="UnshippedDetails(item.orderNumber)">Details</span>
                      <span class="share-btn" @click="goSpellShare(item.orderNumber)">Invite Your Friends</span>
                    </div>
                    <!-- 已支付拼单完成 -->
                    <div v-else-if="item.status == 7">
                      <span @click="UnshippedDetails(item.orderNumber)">Details</span>
                    </div>
                    <!-- 运输中 -->
                     <div v-else-if="item.status == 2">
                      <span @click="inProgressDetails(item.orderNumber)">Details</span>
                    </div>
                    <!-- 已到货 -->
                     <div v-else-if="item.status == 3">
                      <span @click="shippedDetails(item.orderNumber)">Details</span>
                      <span @click="deleteOrder(item.orderNumber,index,'All')">Delete</span>
                      <!-- <span>Review</span> -->
                    </div>
                    <!-- 已关闭 -->
                     <div v-else-if="item.status == 4">
                      <span @click="deleteOrder(item.orderNumber,index,'All')">Delete</span>
                    </div>
                  </div>
                </ShopGoodsItem>
              </div>
            </ScrollView>
          </div>         
        </mt-tab-container-item>
        <!-- 未支付 -->
        <mt-tab-container-item id="Unpaid">
          <div class="container" :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="UnpaidScrollView" color="#eee" :open="UnpaidOpen" :pullup="pullup" :height="height" :data="UnpaidData"  @pullingUp="UnpaidGetData">
              <div class="content">
                <ShopGoodsItem v-for="item in UnpaidData" :key="item.orderNumber" iconfontName="icon-dingdanhao">
                  <span class="order-number" slot="orderNumber">{{item.orderNumber}}</span>
                  <i class="iconfont" slot="titleRight">Unpaid</i>
                  <div class="img-box" slot="content">
                    <img class="goods-img" v-for="(val,index) in item.skuList" :key="index" :src="val.pic" alt="">
                  </div>
                  <div slot="bottom" class="bottom">
                    <p>
                      <span>&nbsp;</span>
                      <span><i>Total：</i>¥{{item.priceTotal}}</span>
                    </p>
                    <div>
                      <span @click="unpaidDetails(item.orderNumber)">Details</span>
                      <span @click="pay(item.orderNumber)">Pay</span>
                    </div>
                  </div>
                </ShopGoodsItem>
              </div>
            </ScrollView>
          </div>  
        </mt-tab-container-item>  
        <!-- 已支付 -->
        <mt-tab-container-item id="Unshipped">
          <div class="container" :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="UnshippedScrollView" color="#eee" :open="UnshippedOpen" :pullup="pullup" :height="height" :data="UnshippedData"  @pullingUp="UnshippedGetData">
              <div class="content">
                <ShopGoodsItem v-for="item in UnshippedData" :key="item.orderNumber" iconfontName="icon-dingdanhao">
                  <span class="order-number" slot="orderNumber">{{item.orderNumber}}</span>
                  <i v-if="item.status == 1" class="iconfont" slot="titleRight">Unshipped</i>
                  <i v-if="item.status == 6" class="iconfont share-text" slot="titleRight">Share with Your Friend,<br> {{item.number_left}} Vacancy Left</i>
                  <i v-else-if="item.status == 7" class="iconfont" slot="titleRight">Completed</i>
                  <div class="img-box" slot="content">
                    <img class="goods-img" v-for="(val,index) in item.skuList" :key="index" :src="val.pic" alt="">
                  </div>
                  <div slot="bottom" class="bottom">
                    <p>
                      <span>&nbsp;</span>
                      <span><i>Total：</i>¥{{item.priceTotal}}</span>
                    </p>
                    <div>
                      <span @click="UnshippedDetails(item.orderNumber)">Details</span>
                      <span v-if="item.status == 6" class="share-btn" @click="goSpellShare(item.orderNumber)">Invite Your Friends</span>
                    </div>
                    
                  </div>
                </ShopGoodsItem>
              </div>
            </ScrollView>
          </div>      
        </mt-tab-container-item> 
        <!-- 运输 -->
        <mt-tab-container-item id="Progress">
          <div class="container" :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="ProgressScrollView" color="#eee" :open="ProgressOpen" :pullup="pullup" :height="height" :data="ProgressData"  @pullingUp="ProgressGetData">
              <div class="content">
                <ShopGoodsItem v-for="item in ProgressData" :key="item.orderNumber" iconfontName="icon-dingdanhao">
                  <span class="order-number" slot="orderNumber">{{item.orderNumber}}</span>
                  <i class="iconfont" slot="titleRight">In Progress</i>
                  <div class="img-box" slot="content">
                    <img class="goods-img" v-for="(val,index) in item.skuList" :key="index" :src="val.pic" alt="">
                  </div>
                  <div slot="bottom" class="bottom">
                    <p>
                      <span>&nbsp;</span>
                      <span><i>Total：</i>¥{{item.priceTotal}}</span>
                    </p>
                    <div>
                      <span @click="inProgressDetails(item.orderNumber)">Details</span>
                    </div>
                  </div>
                </ShopGoodsItem>
              </div>
            </ScrollView>
          </div>    
        </mt-tab-container-item> 
        <!-- 到货 -->
        <mt-tab-container-item id="Shipped">
          <div class="container" :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="ShippedScrollView" color="#eee" :open="ShippedOpen" :pullup="pullup" :height="height" :data="ShippedData"  @pullingUp="ShippedGetData">
              <div class="content">
                <ShopGoodsItem v-for="(item,index) in ShippedData" :key="item.orderNumber" iconfontName="icon-dingdanhao">
                  <span class="order-number" slot="orderNumber">{{item.orderNumber}}</span>
                  <i class="iconfont" slot="titleRight">Shipped</i>
                  <div class="img-box" slot="content">
                    <img class="goods-img" v-for="(val,index) in item.skuList" :key="index" :src="val.pic" alt="">
                  </div>
                  <div slot="bottom" class="bottom">
                    <p>
                      <span>&nbsp;</span>
                      <span><i>Total：</i>¥{{item.priceTotal}}</span>
                    </p>
                    <div>
                      <span @click="shippedDetails(item.orderNumber)">Details</span>
                      <span  @click="deleteOrder(item.orderNumber,index,'shipped')">Delete</span>
                    </div>
                  </div>
                </ShopGoodsItem>
              </div>
            </ScrollView>
          </div>  
        </mt-tab-container-item> 
      </mt-tab-container>   
    </div>
    <i @click="goHome" class="iconfont icon-shanghu1 go-home"></i>
  </div>
</template>
<script>  
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'OrderList',
    data() {
      return {
        active: 'All',
        height: 0,
        // 所有
        allParam: {
          page: 0,
          pageSize: 20,
          status: '',
          totalPage: -1
        },
        allData: [],
        allOpen: false,
        // 未支付
        UnpaidParam: {
          page: 0,
          pageSize: 20,
          status: [0,5],
          totalPage: -1
        },
        UnpaidData: [],
        UnpaidOpen: false,
        // 已支付
        UnshippedParam: {
          page: 0,
          pageSize: 20,
          status: [1,6,7],
          totalPage: -1
        },
        UnshippedData: [],
        UnshippedOpen: false,
        // 运输中
        ProgressParam: {
          page: 0,
          pageSize: 20,
          status: [2],
          totalPage: -1
        },
        ProgressData: [],
        ProgressOpen: false,
        // 到货
        ShippedParam: {
          page: 0,
          pageSize: 20,
          status: [3],
          totalPage: -1
        },
        ShippedData: [],
        ShippedOpen: false,
        pullup: true
      }
    },
    components: {
      ShopGoodsItem: r => { require.ensure([], () => r(require('../../BaseComponents/ShopGoodsItem')), 'ShopGoodsItem') },
      ScrollView: r => { require.ensure([], () => r(require('@/components/BaseComponents/ScrollView')), 'ScrollView') }
    },
    created() {
      var that = this;
      that.$nextTick(() => {
        setTimeout(function(){
          that.height = document.documentElement.clientHeight-43;
        },20);
      });
      this.getStatus();
      this.loadGetData();
      
    },
    methods: {
      // 去分享
      goSpellShare(orderNumber) {
        this.$router.push({
          name: 'shareShow',
          query: {
            id: orderNumber
          }
        });
      },
      goHome() {
	  			this.$router.push('/');
	  	},
      getStatus() {
        let status = this.$route.query.status || null;
        if (status) {
          this.active = status;
        }
      },
      // 所有
      allGetData() {
        var that = this;
        that.allParam.page++;
        that.$http.post(that.urls.OrderList,that.allParam)
        .then(function (response) {
          console.log(response.data.data);
          if (response.data.data.totalPage == 0 || that.allParam.page >= response.data.data.totalPage) {
            that.$refs.allScrollView.endup();
          }
          that.allData = that.allData.concat(response.data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      // 未支付
      UnpaidGetData() {
        var that = this;
        that.UnpaidParam.page++;
        that.$http.post(that.urls.OrderList,that.UnpaidParam)
        .then(function (response) {
          console.log(response.data.data);
          if (response.data.data.totalPage == 0 || that.UnpaidParam.page >= response.data.data.totalPage) {
            that.$refs.UnpaidScrollView.endup();
          }
          that.UnpaidData = that.UnpaidData.concat(response.data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      // 已支付
      UnshippedGetData() {
        var that = this;
        that.UnshippedParam.page++;
        that.$http.post(that.urls.OrderList,that.UnshippedParam)
        .then(function (response) {
          console.log(response.data.data);
          if (response.data.data.totalPage == 0 || that.UnshippedParam.page >= response.data.data.totalPage) {
            that.$refs.UnshippedScrollView.endup();
          }
          that.UnshippedData = that.UnshippedData.concat(response.data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
       // 运输中
      ProgressGetData() {
        var that = this;
        that.ProgressParam.page++;
        that.$http.post(that.urls.OrderList,that.ProgressParam)
        .then(function (response) {
          console.log(response.data.data);
          if (response.data.data.totalPage == 0 || that.ProgressParam.page >= response.data.data.totalPage) {
            that.$refs.ProgressScrollView.endup();
          }
          that.ProgressData = that.ProgressData.concat(response.data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
       // 到货
      ShippedGetData() {
        var that = this;
        that.ShippedParam.page++;
        that.$http.post(that.urls.OrderList,that.ShippedParam)
        .then(function (response) {
          console.log(response.data.data);
          if (response.data.data.totalPage == 0 || that.ShippedParam.page >= response.data.data.totalPage) {
            that.$refs.ShippedScrollView.endup();
          }
          that.ShippedData = that.ShippedData.concat(response.data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      // 页面加载执行获取数据(当状态为all才加载数据，其他分类在active发生变化会触发其他状态加载数据)
      loadGetData() {
        if (this.active == 'All') {
          this.loaddingStatus(this.active);
        }
      },
      loaddingStatus(status) {
        
        if (status == 'All') {                // 所有
          // 开启上拉加载
          this.allOpen = true;
          // 获取数据
          this.allGetData();
        } else if (status == 'Unpaid') {       //未支付
          this.UnpaidOpen = true;
          // 获取数据
          this.UnpaidGetData();
        } else if (status == 'Unshipped') {     // 支付
          this.UnshippedOpen = true;
          // 获取数据
          this.UnshippedGetData();
        } else if (status == 'Progress') {      //运输
          this.ProgressOpen = true;
          // 获取数据
          this.ProgressGetData();
        } else if (status == 'Shipped') {       //到货
          this.ShippedOpen = true;
          // 获取数据
          this.ShippedGetData();
        }
      },

      // 支付按钮
      pay(orderNumber) {
        var that = this;
        var apiAddr = that.formalTest();
        var callbackAddress = window.location.origin + '/pay';
        if (that.isWeiXin()) {
          window.location.href = 'http://page.thatsmags.com/WebAccess/get-weixin-code.html?appid=wx06e97f4ed4ac07e3&scope=snsapi_base&state=STATE&redirect_uri=http%3A%2F%2F'+ apiAddr +'Wx%2FopenidPayPage%3ForderNumber='+ orderNumber + '%26callbackAddress=' + callbackAddress;
        } else {
          window.location.href = window.location.origin + '/Pay?orderNumber=' + orderNumber;
        }
      },
      // 未支付详情按钮
      unpaidDetails(orderNumber) {
        this.$router.push({path: '/OrderDetailsUnpaid',query: {orderNumber: orderNumber}})
      },
      // 未支付详情按钮
      UnshippedDetails(orderNumber) {
        this.$router.push({path: '/OrderDetailsPaid',query: {orderNumber: orderNumber}})
      },
      // 运输中详情按钮
      inProgressDetails(orderNumber) {
        this.$router.push({path: '/OrderDetailsInProress',query: {orderNumber: orderNumber}})
      },
      // 到货详情页按钮
      shippedDetails(orderNumber) {
        this.$router.push({path: '/OrderDetailsDelivered',query: {orderNumber: orderNumber}})
      },
      // 删除订单
      deleteOrder(orderNumber,index,status) {
        console.log(orderNumber,index,status);
        var that = this;
        MessageBox.confirm('', { 
          message: 'Are you sure to delete the order?', 
          title: '', 
          confirmButtonText: 'Done', 
          cancelButtonText: 'Cancel' 
        }).then(action => { 
          that.$http.post(that.urls.OrderDelete,{
          orderNumber: orderNumber
        }).then(function (response) {
            if (status == 'All') {
              that.allData.splice(index,1);
            if (that.allData.length==0) {
              that.allGetData();
            }
          } else if (status == 'shipped') {
            that.ShippedData.splice(index,1);
              if (that.ShippedData.length==0) {
                that.ShippedGetData();
              }
            }
          })
          .catch(function (error) {
              console.log(error);
          });
        }).catch(err => {});
      }
    },
    watch: {
      active: function(newVal,oldVal) {
        this.loaddingStatus(newVal);
      }
    }
  }
</script>
<style scoped>
  .nav {
    background: #fff;
    width: 100%;
    overflow-x: scroll;
    border-bottom: 1px solid #dfdfdf;
  }
  .navBox {
    width: 422px;
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
  .title .iconfont.share-text {
    font-size: 14px;
    line-height: 12px;
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
  .bottom > div span:nth-child(2).share-btn {
    width: 170px;
    background-color: #F9421E;
    color: #fff;
  }
  .img-box {
    overflow: hidden;
    padding-bottom: 10px;
  }
  .goods-img {
    width: 18%;
    height: auto;
    margin-right: 2%;
  }
  .goods-img:nth-child(5n) {
    margin-right: 0;
  }
  .order-number {
    color: #999;
    font-size: 15px;
  }
  .content {
    padding-top: 10px;
  }
  .mint-button {
    border-radius: 0;
  }
  .go-home {
    position: fixed;
    font-size: 18px;
    width: 18px;
    height: 18px;
    padding: 5px;
    right: 17px;
    bottom: 120px;
    z-index: 2;
    background: rgba(0,0,0,0.45);
    color: #fff;
    border-radius: 50%;
  }
</style>