<template>
	<div class="search">

      <router-link v-if="!searchShop" to="/HomeSearch">
        <span class="search-placeholder">Search</span>
        <div class="search-input"></div>
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link v-if="searchShop" :to="{path:'/HomeSearch',query:{shop:1}}">
        <span class="search-placeholder">Search</span>
        <div class="search-input"></div>
        <i class="iconfont icon-sousuo"></i>
      </router-link>
    </div>
</template>
<script>
	export default {
		name: 'search',
    props: {
      searchShop: {
        type: Boolean,
        deafult: false
      }
    }
	}
</script>
<style scoped>
	.search {
    height: 50px;
    max-width: 750px;
    background-color: #fff;
    z-index: 10;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
  }
  .search-placeholder {
    color: #999;
    position: absolute;
    left: 24px;
    top: 16px;
  }
  .search .search-input {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    border-width: 0;
    border-radius: 16px;
    background-color: #eee;
    padding-left: 20px;
    color: #999;
    outline: none;
  }
  .search .iconfont.icon-sousuo {
    color: #999;
    position: absolute;
    right: 24px;
    top: 16px;
  }
</style>