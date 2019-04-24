<template>
  <div class="backTop">
    <i class="iconfont icon-fanhuidingbu" @click="backTop()" v-show="backTopShow"></i>
  </div>
</template>

<script>
  export default {
    name: 'backTop',
    data() {
      return {
        backTopShow:false
      }
    },
    components: {},
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      backTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      handleScroll(){
        if (document.documentElement.scrollTop + document.body.scrollTop > 250) {
          this.backTopShow=true;
        }
        else {
          this.backTopShow=false;
        }
      }
    }
  }
</script>

<style scoped>
  .iconfont.icon-fanhuidingbu {
    position: fixed;
    right: 10px;
    bottom: 70px;
    font-size: 30px;
    z-index: 100;
    cursor: pointer;
    opacity: 0.8;
    outline: none;
  }
</style>