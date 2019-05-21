<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <keep-alive>  
        <router-view class="Router" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName" mode="out-in">
      <router-view class="Router" v-if="!$route.meta.keepAlive"></router-view>
　　 </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {  
    return {  
      transitionName: 'slide-left',
      signPackage: null
    };  
  },
  mounted() {
    this.setWxUrl();
  },
  methods: {
    setWxUrl() {
      var href = window.location.href;
      window.sessionStorage.setItem('href',href);
    }
  },
  watch: {
  '$route' (to, from) {
      // console.log(this.$router.fallback);
      let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
      let tabPages = ["Home", "Categories", "Guide", "Cart","MyAccount"];
      if(tabPages.includes(to.name)) {
        this.transitionName = 'fade';
      } else {
        if(isBack) {
          this.transitionName = 'slide-right';
        } else {
          this.transitionName = 'slide-left';
        }
      }
      
      this.$router.fallback = false;
    }
  }

}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-size: 16px;
    color: #222;
    font-family: 'Arial','helvetica';
  }
  i {
    font-style: normal;
  }
  a {
    text-decoration: none;
    color: #222;
  }
  ul,li {
    list-style: none;
  }
  .iconfont {
    font-size: 16px;
  }
  .theme_color {
    color: #f24827 !important;
  }
  .line1 {
    display:-webkit-box;
    overflow:hidden;
    white-space:normal!important;
    text-overflow:ellipsis;
    word-wrap:break-word;
    -webkit-line-clamp:1;
    /*! autoprefixer: off */
    -webkit-box-orient:vertical;
    /* autoprefixer: on */
  }
  .line2 {
    display:-webkit-box;
    overflow:hidden;
    white-space:normal!important;
    text-overflow:ellipsis;
    word-wrap:break-word;
    -webkit-line-clamp:2;
    /*! autoprefixer: off */
    -webkit-box-orient:vertical;
    /* autoprefixer: on */
  }
  .line3 {
    display:-webkit-box;
    overflow:hidden;
    white-space:normal!important;
    text-overflow:ellipsis;
    word-wrap:break-word;
    -webkit-line-clamp:3;
    /*! autoprefixer: off */
    -webkit-box-orient:vertical;
    /* autoprefixer: on */
  }

  body {
    background-color: #eee;
  }
  #app {
    max-width: 750px;
    margin: 0 auto;
  }
  .swiper-pagination-bullet {
    width: 10px !important;
    height: 2px !important;
    display: inline-block !important;
    border-radius: 0 !important;
    transition: all 0.2s ease !important;
  }
  .swiper-pagination-bullet-active {
    background-color: #f24827 !important;
    width: 18px !important;
  }
  .clearfix:before,.clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
  .clearfix {
    zoom: 1;
  }
  .fade-enter {
      opacity: 0;
  }

  .fade-leave {
      opacity: 1;
  }

  .fade-enter-active {
      transition: opacity 0.1s;
  }

  .fade-leave-active {
      opacity: 0;
      transition: opacity 0s;
  }
  .Router {
    transition: all .4s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
  .more-icon {
    padding: 10px;
    background-color: #fff;
  }
  .mint-spinner-fading-circle {
    margin: 10px auto;
  }
  /*tab栏重置*/
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: none !important;
    color: #f24827 !important;
    margin-bottom: -1px !important;
    position: relative;
  }
   .mint-navbar .mint-tab-item.is-selected:after {
    content: ' ';
    width: 75px;
    height: 2px;
    background-color: #f24827;
    position: absolute;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

   }
  .mint-navbar .mint-tab-item .mint-tab-item-label {
    font-size: 16px !important;
  }
  /*搜索重置*/
  .mint-searchbar {
    background-color: #fff !important;
    padding: 8px 10px 0 10px !important;
  }
  .mint-searchbar-inner {
    background-color: #eee !important;
    border-radius: 40px !important;
    height: 22px !important;
  }
  .mint-searchbar-core {
    background-color: #eee !important;
    padding-left: 8px !important;
  }
  .mint-search {
    height: 38px !important;
  }
  .mint-searchbar-inner .mintui-search {
    color: #8E8E93 !important;
    font-size: 16px !important;
    margin-left: 10px !important;
  }
  .mint-searchbar-cancel {
    display: none !important;
  }
  #search-clear {
    margin-right: 15px;
  }
  .search-container {
    padding-right: 60px;
    height: 38px;
    position: relative;
  }
  .cancel-btn {
    height: 38px;
    line-height: 46px;
    width: 55px;
    background-color: #fff;
    position: absolute;
    right: 0;
    top: 0;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #007AFF;
    text-align: right;
    padding-right: 10px;
    color: #999;
  }
  /*重置多选框*/
  .defaultCheckbox {
    position: absolute;
    display: none;
  }
  .defaultCheckbox + label {
    position: relative;
    display: inline-block;
    padding-left: 30px;
    cursor: pointer;
    vertical-align: middle;
  }
  .defaultCheckbox + label:hover:before {
    animation-duration: 0.4s;
    animation-fill-mode: both;
    animation-name: hover-color;
  }
  .defaultCheckbox + label:before {
    position: absolute;
    top: 0px;
    left: 0px;
    display: inline-block;
    width: 19px;
    height: 19px;
    content: '';
    border: 1px solid #DFDFDF;
  }
  .defaultCheckbox + label:after {
    position: absolute;
    display: none;
    content: '';
  }
  .defaultCheckbox:checked + label:before {
    animation-name: none;
  }
  .defaultCheckbox:checked + label:after {
    display: block;
  }
  .defaultCheckbox + label:before {
    border-radius: 50%;
  }
  .defaultCheckbox + label:after {
    top: 0;
    left: 0;
    width: 21px;
    height: 21px;
    background: url('./assets/images/hook.png') no-repeat;
    border-radius: 50%;
    background-position: center center;
    background-size: 75% 70%;
  }
  .defaultCheckbox:checked + label:before {
    background-color: #f9421e;
  }
  .mint-toast-text {
    color: #fff;
  } 
  .nav > .nav-item .mint-button-text {
    display: inline-block;
    width: 100px;
    position: relative;
  }
  .nav-item.active .mint-button-text {
    color: #F9421E;
  }
  .nav-item.active .mint-button-text::after {
    background-color: #F9421E;
    width: 80px;
    height: 2px;
    content: " ";
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    position: absolute;
  }
  button{
    outline: none;
  }
  input {
    -webkit-appearance: none;
    appearance: none;
  }
  textarea {
    -webkit-appearance: none;
    appearance: none;
  }
  .inputBox {
    padding-bottom: 15px;
  }
  .inputBox input {
    width: 100%;
    color: #666;
    outline: none;
    border-style: none;
    border-bottom: 1px solid #dfdfdf;
    height: 50px;
    line-height: 50px;
  }
  .mint-msgbox-confirm {
    color: #f6442b;
  }
  .mint-msgbox  .mint-msgbox-content {
     border-bottom: none; 
  }
  .mint-msgbox-btns .mint-msgbox-cancel {
    border-right: 1px solid #ddd;
    z-index: 99;
    color: #f6442b;
  }
  .mint-msgbox-btns {
    padding-bottom: 20px;
    height: inherit;
    line-height: inherit;
  }
  .mint-msgbox-btn {
    line-height: inherit;
  }
  .mint-cell-title {
    display: none;
  }
  .mint-cell-allow-right , .mint-cell-mask , .mint-cell-left {
    display: none;
  }
  .mint-cell-value {
    width: 100%;
    justify-content: space-between;
    margin-right: 0;
  }
  .v-modal {
      z-index: 998 !important;
  }
</style>
