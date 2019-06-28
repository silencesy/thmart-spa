<template>  
  <div class="Categories">
    <SearchTop />
    <div class="container">
      <div class="left" :style="{width:'100%',height:height+'px'}">
        <ScrollView :height="height" :loadding="loadding" :isshowgoback="isshowgoback" color="#eee">
          <ul class="category-container">
            <!-- <li class="category-item line1" :class="item.id==categoryActive?'active':''" v-for="(item,index) in categoryList" @click="checkCategroy(item.id)">{{item.title}}</li> -->
            <li v-if="categoryList.length>0">
              <div class="oneMenu line1">
                <span class="line1" :class="{active: categoryActive==0 && categoryActiveChild==''}" @click="binAll">All</span>
              </div>
            </li>
            <li v-for="(item,index) in categoryList" :key="index">
              <div class="oneMenu line1" @click="showToggle(item,index)">
                <span class="line1" :class="{active: item.id == categoryActive && categoryActiveChild == ''}">{{item.title}}</span>
                <i class="iconfont icon-jiantou-copy-copy" :class="item.isSubShow ? 'iconUp' : ''"></i>
              </div>
              <ul v-show="item.isSubShow">
                <li v-for="(subItem,index) in item.son" :key="index" @click="checkCategroy(item.id,subItem.id)">
                  <div class="oneMenuChild line1" :class="{active: subItem.isSubShow}">{{subItem.title}}</div>
                </li>
              </ul>
            </li>

          </ul>
        </ScrollView>
      </div>
      <div class="right" :style="{width:'100%',height:height-40+'px'}">
        <div class="sort-container">
          <Sort ref="Sort" @Sort="Sort"/>
        </div>
        <ScrollView ref="ScrollView" :height="height-40" :pullup="pullup" :data="goodsList"  @pullingUp="loadData">
          <GoodsRow  :goodsData="goodsList" :Columns="2"/>
        </ScrollView>
      </div>
    </div>
    <BottomBar active='1'/>
  </div>  
</template>  
  
<script>
import wxMixin from '../../utils/weixinShare.js';
export default {  
  name: 'Categories',  
  mixins: [wxMixin],
  data() {  
    return {  
      height: 0,
      page: 0,
      pageSize: 20,
      pullup: true,
      loadding: false,
      isshowgoback: false,
      categoryList: [],
      categoryActive: this.$route.query.id || 0,
      categoryActiveChild: this.$route.query.childid || '',
      goodsList: [],
      totalPage: 0,
      sort: 'createTime_desc',
    };
  },
  components: {
    GoodsRow: r => { require.ensure([], () => r(require('../BaseComponents/GoodsRow')), 'GoodsRow') },
    ScrollView: r => { require.ensure([], () => r(require('../BaseComponents/ScrollView')), 'ScrollView') },
    SearchTop: r => { require.ensure([], () => r(require('../BaseComponents/SearchTop')), 'SearchTop') },
    Sort: r => { require.ensure([], () => r(require('../BaseComponents/Sort')), 'Sort') },
    BottomBar: r => { require.ensure([], () => r(require('../BaseComponents/BottomBar')), 'BottomBar') },
  },
  mounted() {
    var that = this;
    that.$nextTick(() => {
      setTimeout(function(){
        that.height = document.documentElement.clientHeight-55-50;
      },20);
    });
    that.getCategory();
    that.getGoodsData();
  },
  activated() {
    var that = this;
    if(that.$route.meta.isUseCache) {
     
      that.initPara();
      that.$refs.Sort.init();
      that.getCategory();
      that.setStatus();
      that.getGoodsData();
    }
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    from.meta.isUseCache = false;
    next();
  },
  methods: {
    setStatus() {
      this.categoryActive = this.$route.query.id || 0;
      this.categoryActiveChild = this.$route.query.childid || '';
    },
    // 点击展开折叠菜单
    showToggle:function(item,ind) {
      this.categoryActive = item.id;
      this.categoryActiveChild = '';
      this.$refs.Sort.init();
      this.initPara();
      this.getGoodsData();
      this.categoryList.forEach(i => {
        if (i.isSubShow !== this.categoryList[ind].isSubShow) {
          i.isSubShow = false;
          // i.isUp = false;
        }
      });
      item.isSubShow = !item.isSubShow;
      // item.isUp = !item.isUp;
      // console.log(item.name)
    },
    binAll() {
      this.categoryList.forEach(i => {
        i.isSubShow = false;
        i.son.forEach(ii=>{
          ii.isSubShow = false;
        });
        
      });
      this.categoryActive = 0;
      this.categoryActiveChild = '';
      this.$refs.Sort.init();
      this.initPara();
      this.getGoodsData();
    },

    // 上拉加载
    loadData() {
      this.getGoodsData();
    },
    // 获取类别
    getCategory() {
      var that = this;
      that.$http.post(this.urls.categoryList,{fname: '0'})
      .then(function (response) {
        console.log(response);
        that.categoryList = response.data.data;
        that.getActiveCategory();
        // that.getGoodsData();
      });
    },
    //获取当前类别
    getActiveCategory() {
      var that = this;
      if (that.$route.query.id) {
        that.categoryList.forEach(i => {
          if (i.id != that.$route.query.id) {
            i.isSubShow = false;
          } else {
            if(that.$route.query.childid) {
              i.son.forEach(ii=>{
                if(ii.id==that.$route.query.childid) {
                  ii.isSubShow = true;
                } else {
                  ii.isSubShow = false;
                }
              });
            }
            i.isSubShow = true;
          }
        });
      }
    },
    // 切换分类
    checkCategroy(parentId,id) {
      if (this.categoryActiveChild!=id) {
        this.categoryActive = parentId;
        this.categoryActiveChild = id;
        this.categoryList.forEach(i => {
          i.son.forEach(ii=>{
            if (ii.id !== id) {
              ii.isSubShow = false;
              // i.isUp = false;
            } else {
              ii.isSubShow = true;
            }
          })
        });
        // 触发Sort组件初始化
        this.$refs.Sort.init();
        this.initPara();
        this.getGoodsData();
      }
    },
    // 获取数据
    getGoodsData() {
      var that = this;
      // console.log({id: that.categoryActive,page: that.page,pageSize: that.pageSize,sort: that.sort});
      
      that.$http.post(this.urls.goodsList,{
        catOneId: that.categoryActive,
        catTwoId: that.categoryActiveChild, 
        page: ++that.page,
        pageSize: that.pageSize,
        sort: that.sort
      })
      .then(function (response) {
        console.log(response);
        that.goodsList = that.goodsList.concat(response.data.data.data);
        if (response.data.data.totalPage == 0 || that.page >= response.data.data.totalPage) {
          that.$refs.ScrollView.endup();
        }
        that.totalPage = response.data.data.totalPage;
      });
    },
    // 改变排序
    Sort(data) {
      this.sort = data;
      this.initPara();
      this.getGoodsData();
    },
    // 初始化参数
    initPara() {
      this.page = 0;
      this.goodsList = [];
      this.totalPage = 0;
      this.$refs.ScrollView.scrollTo(0,0,0,'easing');
      this.$refs.ScrollView.startup();
    }
  },
  watch: {
    // selected: function (oldVal,newVal) {
    //   console.log(oldVal,newVal);
    // }
  }
};  
</script>  
  
<style scoped>
  
  .container {
    display: flex;
  }
  .left {
    flex: 1;
    box-sizing: border-box;
    border-top: 1px solid #dfdfdf;
    /*background-color: red;*/
  }
  .category-item {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    position: relative;
  }
  .category-container .active.category-item:before {
    position: absolute;
    top: 14px;
    left: 1px;
    content:"";
    background-color: #F9421E;
    font-weight:bold;
    width: 2px;
    height: 12px;
  }
  .category-container .active.category-item {
    color: #F9421E;
    background-color: #fff;
  }
  .right {
    flex: 2;
    box-sizing: border-box;
    /*background-color: blue;*/
  }
  .sort-container {
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
  }
  .mint-navbar .mint-tab-item {
    padding: 14px 0;
  }

  .oneMenu {
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    position: relative;
  }
  .oneMenu span {
    padding-left: 8px;
    display: block;
    width: 75%;
  }
  .oneMenu .iconfont {
    color: #999;
    font-size: 14px;
    position: absolute;
    right: 5px;
    top: 0px;
  }
  .oneMenuChild {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    padding-left: 15px;
  } 
  .iconUp:before {
    display: inline-block;
    transform: rotate(180deg);
    -ms-transform: rotate(180deg); /* Internet Explorer 9*/
    -moz-transform: rotate(180deg); /* Firefox */
    -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
    -o-transform: rotate(180deg); /* Opera */
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
  }
  .active {
    color: #F9421E;
  }
  
</style>  