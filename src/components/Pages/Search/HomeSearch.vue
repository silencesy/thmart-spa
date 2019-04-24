<template>
  <div class="HomeSearch">
    <div class="search-container">
      <form @submit.prevent.blur="searchSubmit" onsubmit="return false;" action="##">
        <mt-search v-model="searchParam.search" cancel-text="" placeholder="Search" ></mt-search>
      </form>
      <div class="cancel-btn" @click="goBackPage">Cancel</div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">Products</mt-tab-item>
      <mt-tab-item id="2">Shops</mt-tab-item>
      <mt-tab-item id="3">Editor’s Pick</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="showContainer">
      <mt-tab-container-item id="1">
        <div class="sort-row">
          <Sort v-if="selected == 1 && showSort" backgroundColor="#eee" ref="Sort" @Sort="Sort"/>
        </div>
        <ScrollView ref='textcontent' :height="height" :data="goodsData" :pullup="pullup" color="#eee"  @pullingUp="loadData" :loadding="loadding" :open="open">
          <div v-if="selected == 1">
            <GoodsRow :goodsData="goodsData" :Columns="2" backgroundColor="#eee" />
          </div>
          <ShopRow v-if="selected == 2" :shopData="goodsData"></ShopRow>
          <BaseArticle v-if="selected == 3" :articleData="goodsData" articleContentBg="#eee" :articleItemStyleObj="articleItemStyleObj"></BaseArticle>
        </ScrollView>
        
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  export default {
    name: 'HomeSearch',
    data() {
      return {
        selected: '1',
        showContainer: '1',
        autofocus: true,
        loadding: false,
        showSort: false,
        value: '',
        height: 0,
        pullup: true,
        goodsData: [],
        open: false,
        apiUrl: '',
        searchParam: {
          id: 0,
          page: 0,
          pageSize: 20,
          sort: "price_desc",
          search: ''
        },
        articleItemStyleObj: {
          'border': '1px solid #dfdfdf',
          'paddingLeft': '10px'
        },
      }
    },
    mounted() {
      var that = this;
      // 如果地址栏有搜索关键词 则直接搜索
      that.searchParam.search = that.$route.query.keywords;
      // // 请求地址栏关键词搜索
      
      // 设置请求地址
      that.apiUrl = that.urls.goodsList;
      that.$nextTick(() => {
        setTimeout(function(){
          that.height = document.documentElement.clientHeight - 119;
        },20);
      });
      // 当从商户列表页进入搜索 默认商户搜索
      if (that.$route.query.shop) {
        that.selected = '2';
        setTimeout(function(){
          that.height = document.documentElement.clientHeight - 79;
        },40);
      }
      if (that.searchParam.search!=undefined && that.searchParam.search!='') {
        setTimeout(function(){
          that.searchSubmit();
        },300);
      }
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
        if (this.searchParam.search) {
          this.getData();
        }
      },
      // 返回上一页
      goBackPage() {
        this.$router.go(-1);
      },
      // 改变排序
      Sort(data) {
        this.searchParam.sort = data;
        if (this.searchParam.search) {
          this.searchSubmit();
        }
      },
      searchSubmit() {
        this.initParam();
        this.getData();
      },
      initParam() {
        var that = this;
        that.searchParam.page=0;
        // 开始加载
        that.$refs.textcontent.startup();
        // 数据清空
        that.goodsData=[];
      },
      getData() {
        var that = this;
        if (that.selected == 1) {
          that.showSort = true;
        } else {
          that.showSort = false;
        }
        that.searchParam.page++;
        // 请求数据
        that.$http.post(that.apiUrl,that.searchParam)
        .then(function (response) {
          if (response.data.data == null || response.data.data.totalPage == 0 || that.searchParam.page >= response.data.data.totalPage || response.data.data.data.length==0) {
              that.$refs.textcontent.endup();
              if (response.data.data) {
                that.goodsData = that.goodsData.concat(response.data.data.data);
              }
          } else {
            that.goodsData = that.goodsData.concat(response.data.data.data);
          }
        });
      }
    },
    watch: {
      selected: function(newVal,oldVal) {
        var that = this;
        // that.$refs.textcontent.refresh();
        if (newVal == 2) {
          that.apiUrl = that.urls.hotGoods;
          that.goodsData=[];
          that.searchParam.id = 5;
          that.searchParam.sort = 'order_asc';
          if (that.searchParam.search) {
            that.searchSubmit();
          } 
        } else if (newVal == 1) {
          that.apiUrl = that.urls.goodsList;
          that.searchParam.id = 0;
          that.searchParam.sort = 'price_asc';
          if (that.searchParam.search) {
            that.searchSubmit();
          } 
        } else if (newVal == 3) {
          that.apiUrl = that.urls.articleList;
          that.searchParam.sort = 'createTime_desc';
          if (that.searchParam.search) {
            that.searchSubmit();
          }
        }
        if(newVal!=1) {
          that.height = document.documentElement.clientHeight - 79;
        } else {
          that.height = document.documentElement.clientHeight - 119;
        }
        
      }
    }
  }
</script>
<style scoped>
  .mint-navbar .mint-tab-item.is-selected:after {
    width: 60px;
  }
  .mint-tab-container-item {
    margin-top: 1px;
  }
  .mint-navbar .mint-tab-item {
    padding: 12px 0;
  }
  .sort-row {
    border-bottom: 1px solid #dfdfdf;
  }
</style>