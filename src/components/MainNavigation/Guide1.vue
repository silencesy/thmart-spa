<template>  
  <div>  
    <div class="nav">  
      <mt-button class="nav-item" :class="{active: active == 'Latest'}" size="small" @click.native.prevent="active = 'Latest'">Latest</mt-button>  
      <mt-button class="nav-item" :class="{active: active == 'Hottest'}" size="small" @click.native.prevent="active = 'Hottest'">Hottest</mt-button>  
    </div>  
      
    <div class="page-tab-container">  
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>  
        <mt-tab-container-item class="item-container wrapper" id="Latest">
          <div :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="ScrollView" :height="height" color="#eee" :pullup="pullup" :data="articleListData1.data"  @pullingUp="getData">
              <BaseArticle :articleData='articleListData1' articleContentBg="#eee" :articleItemStyleObj="articleItemStyleObj"/>
            </ScrollView>
          </div>
          
        </mt-tab-container-item>  
        <mt-tab-container-item class="item-container" id="Hottest">
          <div :style="{width:'100%',height:height+'px'}">
            <ScrollView ref="ScrollView2" :open="open" :height="height" color="#eee" :pullup="pullup" :data="articleListData2.data"  @pullingUp="getData2">
              <BaseArticle :articleData='articleListData2' articleContentBg="#eee" :articleItemStyleObj="articleItemStyleObj"/>
            </ScrollView>
          </div>
        </mt-tab-container-item>   
      </mt-tab-container>   
    </div> 
    <BottomBar active="2" />
  </div>  
</template>    
  
<script>  
export default {  
  name: 'page-tab-container',  
  data() {  
    return {  
      active: 'Latest',
      height: 0,
      open: false,
      articleItemStyleObj: {
        'border': '1px solid #dfdfdf',
        'paddingLeft': '10px',
        'paddingRight': '10px',
      },
      articleListData1: {
        data:[]
      },
      articleListData2: {
        data:[]
      },
      pullup: true,
      param1: {
        page: 0,
        pageSize: 20,
        sort: 'createTime_desc',
        totalPage: -1
      },
      param2: {
        page: 0,
        pageSize: 20,
        sort: 'click_desc',
        totalPage: -1
      }
    };  
  },
  components: {
    BaseArticle: r => { require.ensure([], () => r(require('../BaseComponents/BaseArticle')), 'BaseArticle') },
    ScrollView: r => { require.ensure([], () => r(require('../BaseComponents/ScrollView')), 'ScrollView') },
    BottomBar: r => { require.ensure([], () => r(require('../BaseComponents/BottomBar')), 'BottomBar') }
  },
  mounted() {
    var that = this;
    that.$nextTick(() => {
      setTimeout(function(){
        that.height = document.documentElement.clientHeight-95;
      },20);
    });
    that.getData();
  },
  watch: {
    active: function(newVal,oldVal) {
      if (newVal == 'Hottest') {
        if (!this.open) {
          this.open = true;
          this.getData2();
        }
      }
    }
  },
  methods: {
    getData() {
      var that = this;
      that.param1.page++;
      that.$http.post(that.urls.articleList,that.param1)
      .then(function (response) {
        if (response.data.data.totalPage == 0 || that.param1.page >= response.data.data.totalPage) {
          that.$refs.ScrollView.endup();
        }
        that.articleListData1.data=that.articleListData1.data.concat(response.data.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getData2() {
      var that = this;
      that.param2.page++;
      that.$http.post(that.urls.articleList,that.param2)
      .then(function (response) {
        if (response.data.data.totalPage == 0 || that.param2.page >= response.data.data.totalPage) {
          that.$refs.ScrollView2.endup();
        }
        that.articleListData2.data=that.articleListData2.data.concat(response.data.data.data);
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
</style> 
