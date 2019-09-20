<template>
  <div class="review-consumption">
    <div v-if="orderData">
      <div class="goods-info-box" v-for="(item,index) in orderData.items" :key="index">
        <div class="goods-info">
          <div class="goods-img">
            <img v-lazy="item.pic" alt="">
          </div>
          <div class="goods-text">
            <div>{{item.name}}</div>
            <div class="sku-attr">
              <span v-for="(item,index) in item.sku" :key="index">{{item[0]}}</span>
            </div>
            <div class="price-number">
              <div class="theme_color">¥{{item.price}}</div>
              <div>x{{item.amount}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-box">
        <div class="info">
          <div class="item">
            <div class="left">订单号 :</div>
            <div class="right">{{orderData.order}}</div>
          </div>
          <div class="item">
            <div class="left">下单时间 :</div>
            <div class="right">{{orderData.orderTime}}</div>
          </div>
          <div class="item">
            <div class="left">姓名 :</div>
            <div class="right">{{orderData.users.nickname}}</div>
          </div>
          <div class="item">
            <div class="left">电话 :</div>
            <div class="right">{{orderData.users.mobile}}</div>
          </div>
          <div class="item">
            <div class="left">状态 :</div>
            <div class="right status">{{orderData.ticketstatus.name}}</div>
          </div>
          <div v-if="orderData.ticketstatus.status == 1" class="item">
            <div class="left"></div>
            <div class="right tip">{{orderData.ticketstatus.time}}</div>
          </div>
          <div v-if="orderData.ticketstatus.status == 0 && loginstatus" class="btn-box">
            <span class="logout" @click="logout">注销登录</span>
            <span @click="bindHxDone">核销</span>
          </div>
          <div v-if="orderData.ticketstatus.status == 1 && loginstatus" class="btn-box">
            <span class="logout" @click="logout">注销登录</span>
          </div>
          <div class="btn-box" v-if="!loginstatus">
            <span @click="showLoginLayer">登录</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loginLayer" class="layer">
      <div class="layer-content">
        <div class="title">
          thMart核销后台登录
        </div>
        <div class="input-box">
          <input v-model="name" @blur="goTop" placeholder="用户名" type="text">
        </div>
        <div class="input-box">
          <input v-model="password" @blur="goTop" placeholder="密码" type="password">
        </div>
        <div class="login-btns">
          <span @click="loginLayerClose">取消</span>
          <span class="line">|</span>
          <span class="theme_color" @click="backLogin">登录</span>
        </div>
      </div>
    </div>
    <div class="layer" v-if="hxLayer">
      <div class="layer-content done">
        <div class="done-text">确定核销这个订单？</div>
        <div class="login-btns">
          <span @click="hxCancel">取消</span>
          <span class="line">|</span>
          <span @click="hxAxios" class="theme_color">确定</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'reviewConsumption',
		data() {
			return {
        name: '',
        password: '',
        loginstatus: false,
        loginLayer: true,
        hxLayer: false,
        orderData: null,
        code: this.$route.query.id
			}
		},
    created() {
      this.isLogin();
    },
		mounted() {
			this.getData();
		},
		methods: {
      getData() {
        var that = this;
        that.$http2.get('checkcode',{
          params: {
            code: that.code
          }
				}).then(function(response) {
          console.log(response);
          that.orderData = response.data.data;
				})
      },
      backLogin() {
        var that = this;
        that.$http2.post('login',{
          password: that.password,
          name: that.name
				}).then(function(response) {
          that.isLogin();
				})
      },
      isLogin() {
        this.loginstatus = window.localStorage.getItem('hxtoken')?true:false;
        this.loginLayer = window.localStorage.getItem('hxtoken')?false:true;
      },
      logout() {
        window.localStorage.removeItem('hxtoken')
        this.loginstatus = false;
      },
      showLoginLayer() {
        this.loginLayer = true;
        this.goTop();
      },
      goTop() {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      },
      bindHxDone() {
        this.hxLayer = true;
      },
      hxCancel() {
        this.hxLayer = false;
      },
      loginLayerClose() {
        this.loginLayer = false;
      },
      hxAxios() {
        var that = this;
        that.$http2.post('checkcode',{
            code: that.code
				}).then(function(response) {
          console.log(response);
          that.orderData.ticketstatus = response.data.data;
          that.hxLayer = false;
				}).catch(function (error) { // 请求失败处理
          if(error.response.data.code == 422) {
            that.hxLayer = false;
            that.loginLayer = true;
          } 
        });
      }
		}
  }
</script>
<style scoped>
.goods-info-box {
  padding: 0 10px;
}

.goods-info {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  display: flex;
}
.goods-info .goods-img {
  width: 150px;
  margin-right: 10px;
}
.goods-info .goods-img img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.goods-text {
  width: 100%;
}
.sku-attr {
  padding: 8px 0;
}
.sku-attr span {
  color: #999999;
}
.price-number {
  display: flex;
}
.price-number div {
  flex: 1;
}
.price-number div:nth-child(1) {
  text-align: left;
}
.price-number div:nth-child(2) {
  text-align: right;
}
.review-consumption {
  padding-top: 15px;
}
.info-box {
  padding: 10px;
}
.info {
  padding: 10px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
}
.line {
  color: #dfdfdf;
}
.item {
  display: flex;
  line-height: 26px;
}
.item .left {
  width: 100px;
}
.btn-box {
  padding: 10px;
  text-align: right;
}
.btn-box span {
  color: #fff;
  background-color: #F9421E;
  font-size: 16px;
  padding: 3px 30px;
  border-radius: 30px;
  border-width: 0;
  display: inline-block;
}
.status {
  color: #F9421E;
}
.tip {
  font-size: 14px;
  color: #666666;
}
.layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 100;
  box-sizing: border-box;
  padding: 10px;
}
.layer-content {
  width: 100%;
  height: 200px;
  background-color: #fff;
  margin-top: 40%;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 15px;
}
.layer-content.done {
  height: 130px;
  margin-top: 60%;
}
.layer-content .title {
  text-align: center;
  border-bottom: 1px solid #dfdfdf;
  padding: 15px 0;
  color: #222222;
}
.input-box input {
  width: 100%;
  height: 40px;
  outline: none;
  border-width: 0;
  border-bottom: 1px solid #dfdfdf;
  color: #999;
  font-size: 14px;
  border-radius: 0;
  -webkit-appearance: none;
}
.login-btns {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.login-btns span {
  padding: 20px 30px;
}
.done-text {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #dfdfdf;
}
.btn-box .logout {
  background-color: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 30px;
  color: #666666;
  margin-right: 10px;
}
</style>
