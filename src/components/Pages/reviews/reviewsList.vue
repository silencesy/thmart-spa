<template>  
  <div>  
    <div class="nav">  
      <mt-button class="nav-item" :class="{active: active == 'all'}" size="small" @click.native.prevent="active = 'all'">All</mt-button>  
      <mt-button class="nav-item" :class="{active: active == 'image'}" size="small" @click.native.prevent="active = 'image'">With image</mt-button>  
    </div>  
      
    <div class="page-tab-container">  
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>  
        <mt-tab-container-item class="item-container wrapper" id="all">
          <div :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="ScrollView" :height="height" color="#eee" :pullup="pullup" :data="allData.data"  @pullingUp="getData">
              <div class="reviews-container">
                <div class="list">
                    <div class="item" v-for="(item,index) in allData.data" :key="index">
                        <div class="top">
                            <img class="avatar" v-lazy="item.data.headimgUrl" preview="1" alt="">
                            <div class="info">
                                <div class="name">{{item.data.username}}</div>
                                <div class="text">
                                  {{item.data.comment}}
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <div v-for="(item,index) in item.data.picList" :key="index" class="img" :style="{backgroundImage:'url(' + item + ')'}"></div>
                        </div>
                        <div class="reply" v-if="item.data.reply">
                          <div class="shop-reply theme_color">Reply:</div>
                          <div class="shop-reply-text">{{item.data.reply}}</div>
                        </div>
                    </div>
                </div>
              </div>
            </ScrollView>
          </div>
          
        </mt-tab-container-item>  
        <mt-tab-container-item class="item-container" id="image">
          <div :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="ScrollView2" :open="open" :height="height" color="#eee" :pullup="pullup" :data="imageData.data"  @pullingUp="getData2">
              <div class="reviews-container">
                <div class="list">
                    <div class="item" v-for="(item,index) in imageData.data" :key="index">
                        <div class="top">
                            <img class="avatar" v-lazy="item.data.headimgUrl" preview="1" alt="">
                            <div class="info">
                                <div class="name">{{item.data.username}}</div>
                                <div class="text">
                                  {{item.data.comment}}
                                </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <div v-for="(item,index) in item.data.picList" :key="index" class="img" :style="{backgroundImage:'url(' + item + ')'}"></div>
                        </div>
                        <div class="reply" v-if="item.data.reply">
                          <div class="shop-reply theme_color">Reply:</div>
                          <div class="shop-reply-text">{{item.data.reply}}</div>
                        </div>
                    </div>
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
      active: 'all',
      height: 0,
      open: false,
      allData: {
        data:[]
      },
      imageData: {
        data:[]
      },
      pullup: true,
      param1: {
        page: 0,
        pageSize: 10,
        id: this.$route.query.id,
        hasPic: 0,
        totalPage: -1
      },
      param2: {
        page: 0,
        pageSize: 10,
        id: this.$route.query.id,
        hasPic: 1,
        totalPage: -1
      },
      styleObject: {
        backgroundImage: 'http://api.mall.thatsmags.com/storage/headimg/nx_1552534806312934.jpg'
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
      if (newVal == 'image') {
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
      that.$http.post(that.urls.goodsReviewsList,that.param1)
      .then(function (response) {
        // that.param1.totalPage = response.data.data.totalPage;
        if (response.data.data.totalPage == 0 || that.param1.page >= response.data.data.totalPage) {
          that.$refs.ScrollView.endup();
        }
        that.allData.data=that.allData.data.concat(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // 获取商户列表
    getData2() {
      var that = this;
      that.param2.page++;
      that.$http.post(that.urls.goodsReviewsList,that.param2)
      .then(function (response) {
        // that.param2.totalPage = response.data.data.totalPage;
        if (response.data.data.totalPage == 0 || that.param2.page >= response.data.data.totalPage) {
          that.$refs.ScrollView2.endup();
        }
        that.imageData.data=that.imageData.data.concat(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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

  .reviews-container {
      padding: 10px;
  }
  .reviews-container .item {
      padding: 10px;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #dfdfdf;
      margin-bottom: 10px;
  }
  .reviews-container .item .top {
      display: flex;
  }
  .reviews-container .item:last-child {
      margin-bottom: 0;
  }
  .reviews-container .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
  }
  .reviews-container .item .info {
    padding-left: 10px;
  }
  .reviews-container .item .info .name {
      font-size: 16px;
      color: #222;
      margin-bottom: 4px;
  }
  .reviews-container .item .info .text {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
  }
  .reviews-container .bottom {
    display: flex;
    flex-wrap: wrap;
  }
  .reviews-container .bottom .img {
      background-size: cover;
      background-repeat: no-repeat;
      width: 58px;
      height: 58px;
      border-radius: 4px;
      margin-right: 10px;
      margin-bottom: 10px;
  }
  .reviews-container .bottom .img:last-child {
    margin-right: 0;
  }
  .reviews-container .reply {
    display: flex;
    justify-content: flex-start;
  }
  .reviews-container .reply .shop-reply {
    width: 110px;
    color: #222222;
  }
  .reviews-container .reply .shop-reply-text {
    color: #666666;
    width: 100%;
  }
</style> 
