<template>  
  <div>  
    <div class="nav">  
      <mt-button class="nav-item" :class="{active: active == 'new'}" size="small" @click.native.prevent="active = 'new'">New</mt-button>  
      <mt-button class="nav-item" :class="{active: active == 'used'}" size="small" @click.native.prevent="active = 'used'">Used</mt-button>  
    </div>  
      
    <div class="page-tab-container">  
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>  
        <mt-tab-container-item class="item-container wrapper" id="new">
          <div :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="ScrollView" :height="height" color="#eee" :pullup="pullup" :data="newData.data"  @pullingUp="getData">
              <div class="coupons-container">
                <div class="coupon-img" v-for="item in newData.data" :key="item.couponId" @click="goCouponsGoodsList(item.couponId)">
                  <img :src="item.pic" alt="">
                </div>
              </div>
            </ScrollView>
          </div>
          
        </mt-tab-container-item>  
        <mt-tab-container-item class="item-container" id="used">
          <div :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="ScrollView2" :open="open" :height="height" color="#eee" :pullup="pullup" :data="usedData.data"  @pullingUp="getData2">
              <div class="coupons-container used-container">
                <div class="coupon-img" v-for="item in usedData.data" :key="item.couponId">
                  <img :src="item.pic" alt="">
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
export default {  
  name: 'page-tab-container',  
  data() {  
    return {  
      active: 'new',
      height: 0,
      open: false,
      newData: {
        data:[]
      },
      usedData: {
        data:[]
      },
      pullup: true,
      param1: {
        isUsed: 0,
        page: 0,
        pageSize: 20,
        totalPage: -1
      },
      param2: {
        isUsed: 1,
        page: 0,
        pageSize: 20,
        totalPage: -1
      }
    };  
  },
  components: {
    // BaseArticle: r => { require.ensure([], () => r(require('@/components/BaseComponents/BaseArticle')), 'BaseArticle') },
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
      if (newVal == 'used') {
        if (!this.open) {
          this.open = true;
          this.getData2();
        }
      }
    }
  },
  methods: {
    // 获取未使用券列表页
    getData() {
      var that = this;
      that.param1.page++;
      that.$http.post(that.urls.couponList,that.param1)
      .then(function (response) {
        console.log(response)
        if (response.data.data.totalPage == 0 || that.param1.page >= response.data.data.totalPage) {
          that.$refs.ScrollView.endup();
        }
        that.newData.data=that.newData.data.concat(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // 获取已使用券列表页
    getData2() {
      var that = this;
      that.param2.page++;
      that.$http.post(that.urls.couponList,that.param2)
      .then(function (response) {
        console.log(response)
        if (response.data.data.totalPage == 0 || that.param2.page >= response.data.data.totalPage) {
          that.$refs.ScrollView2.endup();
        }
        that.usedData.data=that.usedData.data.concat(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    goCouponsGoodsList(id) {
      this.$router.push({path: '/CouponsGoods',query:{id: id}})
    }
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
  .coupons-container {
    padding: 10px;
  }
  .shop-container {
    padding: 10px;
  }
  .coupon-img {
    margin-bottom: 10px;
  }
  .coupon-img img {
    display: block;
    width: 100%;
    height: auto;
  }
  .used-container .coupon-img {
    background-color: #dfdfdf;
  }
  .used-container img {
    opacity: 0.4;
  }
</style> 
