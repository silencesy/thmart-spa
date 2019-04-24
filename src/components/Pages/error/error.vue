<template>  
  <div class="notFound">  
    <div class="box">
      <img src="/static/images/common/404_img.png" alt="">
      <p class="sorry">Sorry!</p>
      <p>The site you are visiting does not exist.</p>
      <div>
          <!-- <button>Previous page</button> -->
          <button @click="bindGoHome">Homepage</button>
      </div>
    </div>
  </div>  
</template>    
  
<script>  
  export default {
    name: 'error',
    data () {
      return {

      }
    },
    methods: {
      bindGoHome() {
        this.$router.push('/');
      }
    }
  } 
</script>  

<style scoped>  
  .notFound {
    background: url(/static/images/common/bgSnow.jpg);
    display: flex;
  }
  .notFound .box {
    width: 85%;
    margin: 0 auto;
    align-self: center;
    text-align: center;
  }
  .sorry {
    font-size: 18px;
    margin: 10px 0;
  }
  .notFound .box > div {
    margin-top: 15px;
    overflow: hidden;
  }
  .notFound .box > div button {
    width: 45%;
    background: #fc4103;
    color: #fff;
    outline: none;
    border: none;
    height: 40px;
    border-radius: 10px;
  }
  /* .notFound .box > div button:first-child {
    float: left;
  }
  .notFound .box > div button:nth-child(2) {
    float: right; 
  } */
</style> 
