<template>
  <div class="category-container">
    <div class="search">
      <SearchTop />
    </div>
    <div class="category-list">
      <div class="item" v-for="item in categoryList" @click="bindGoDetails(item.id)" :key="item.id">
        <img :src="item.pic" alt="">
        <div class="line2">{{item.title}}</div>
      </div>
      <div class="item" v-for="item in (4-categoryList.length%4)" :key="item.id">
      </div>
    </div>
    <GoodsRow :goodsData="hotData">
      <div class="small-banner-img-box" slot="banner-img">
        <img class="banner-img" src="static/images/common/more-goods.png"  alt="">
      </div>
    </GoodsRow>
    <BottomBar active='1'/>
  </div>
</template>
<script>
import wxMixin from '../../utils/weixinShare.js';
export default {
  mixins: [wxMixin],
  data() {
    return {
      hotData: [],
      categoryList: []
    }
  },
  created() {
    this.getMoreData();
    this.getCategory();
  },
  components: {
    GoodsRow: r => { require.ensure([], () => r(require('../BaseComponents/GoodsRow')), 'GoodsRow') },
    SearchTop: r => { require.ensure([], () => r(require('../BaseComponents/SearchTop')), 'SearchTop') },
    BottomBar: r => { require.ensure([], () => r(require('../BaseComponents/BottomBar')), 'BottomBar') }
  },
  methods: {
    // 获取类别
    getCategory() {
      var that = this;
      that.$http.post(this.urls.categoryList,{fname: '0'})
      .then(function (response) {
        that.categoryList = response.data.data;
      });
    },
    // 获取下面热销商品
    getMoreData() { 
      var that = this;
      var params = {
        pageSize: 15,
        page: 1,
      }
      that.$http.post(that.urls.hotProducts,params)
      .then(function (response) {
        console.log(response);
        that.hotData = response.data.data.data
      })
    },
    //去详情
    bindGoDetails(id) {
      console.log(id);
      this.$router.push({
        path: '/CategoriesGoodsList',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
<style scoped>
.search {
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: auto;
  margin: auto;
  box-shadow: 0px 0px 5px #eee;
  z-index: 1000;
}
.category-container {
  padding-top: 50px;
  padding-bottom: 65px;
  background-color: #fff;
}
.category-list {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  justify-content: space-between;
}
.category-list .item {
  width: 21%;
  text-align: center;
  margin-top: 10px;
}
.category-list .item img {
  width: 75%;
}
.category-list .item > div {
  text-align: center;
  color: #222;
  margin: 5px 0;
  font-size: 14px;
}
</style>
