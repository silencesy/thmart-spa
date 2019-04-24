<template>
  <div id="home">
    <mt-tab-container v-model="show">
      <mt-tab-container-item id="Home">
          
          <!-- <keep-alive >  
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive> -->
          <router-view></router-view>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected" fixed> 
      <mt-tab-item id="Home">
        <img slot="icon" :src="selected=='Home'?'static/images/common/home-cover.png':'static/images/common/home.png'">
        Home
      </mt-tab-item>
      <mt-tab-item id="Categories">  
        <img slot="icon" :src="selected=='Categories'?'static/images/common/category-cover.png':'static/images/common/Category.png'">
        Categories
      </mt-tab-item>
      <mt-tab-item id="Guide">  
        <img slot="icon" :src="selected=='Guide'?'static/images/common/gudie-cover.png':'static/images/common/gudie.png'">  
        Guide  
      </mt-tab-item>
      <mt-tab-item id="Cart"> 
        <img slot="icon" :src="selected=='Cart'?'static/images/common/cart-cover.png':'static/images/common/cart.png'">  
        Cart
      </mt-tab-item>
      <mt-tab-item id="MyAccount">  
        <img slot="icon" :src="selected=='MyAccount'?'static/images/common/me-cover.png':'static/images/common/me.png'">  
        My Account
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import Home from '../MainNavigation/Home'
export default {
  name: 'home',
  data() {  
    return {  
      selected: 'Home',
      show: "Home"
      // keepAlive: true
    };  
  },
  watch: {
    // 当选中值改变触发路由
    selected: function (nowVal, oldVal) {
      // 如果新的值为'home'则重改为‘/’与路由中的首页对应
      if (nowVal == 'Home') {
        nowVal = '/'
      }
      console.log(this.$route.query.id);
      // 当路由改变的时候触发selected改变 selected改变又会触发路由改变 （注意 当首页跳分类页时会改变路由，路由改变又会触发selected改变，selected改变又会触发路由改变。为了解决这个问题我们在localStorage设置一个classFlag来防止路由跳转两次，当进入分类之前设置为true，进去之后设置为false,这样不会影响其他页面的跳转）
      if (!this.$route.query.id || nowVal!='Categories') {
        this.$router.push(nowVal);
      } 
    },
    '$route' (to, from) {
      // 设置页面缓存 初始值是缓存
      // this.keepAlive = to.meta.keepAlive;
      if (this.selected!=to.name) {
        // 当路由改变的时候触发底部选中的改变，从而实现底部高亮
        this.selected = to.name;
      }
    }
  },
  mounted() {
    // 设置选中的标题
    var that = this;
    that.selected = that.$route.name;
  }
}
</script>

<style scoped>
  body {
    padding-bottom: 65px;
  }
  .mint-tabbar {
    background-image: none;
    background-color: #fff;
    -webkit-box-shadow: 0 0 2px #dedede;
    box-shadow: 0 0 2px #dedede;
  }
  .mint-tabbar > .mint-tab-item.is-selected {
    color: #f24827;
    background-color: #fff;
  }
  .mint-tabbar.is-fixed {
    right: 0;
    bottom: 0;
    left: 0;
    top: auto;
    max-width: 750px;
    margin: auto;
    position: fixed;
    z-index: 1;
  }
</style>
