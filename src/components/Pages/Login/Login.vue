<template>
	<div class="Login">
		<LoginSystem>		
			<div slot="info">
			<mt-navbar v-model="selected">
		        <mt-tab-item id="1">Login via password</mt-tab-item>
		        <mt-tab-item id="2">Login via SMS</mt-tab-item>
		    </mt-navbar>
	      	<mt-tab-container v-model="selected">
		      <mt-tab-container-item id="1">
			      <div class="content">
							<div class="contentInfo"><input type="text" v-model="passwordNumber" placeholder="Enter phone number or Username"></div>
							<div class="contentInfo"><input type="password" v-model="passwordPassword" placeholder="Enter password"></div>
							<div class="tips">
								<router-link to='/ForgotPassword'>Forgot password?</router-link>
								<router-link to='/SignUp'>Don't have an account?</router-link>
							</div>
							<div class="contentInfo"><button class="btn" @click="passwordLogin">LOG IN</button></div>
						</div>
						<div class="wechat" v-if="isWeiXin">
							<span class="line"></span>
							<span class="txt">Wechat Login</span>
							<span class="line"></span>
							<a :href="[url]"><i class="iconfont icon-weixin1"></i></a>
						</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
		        	<div class="content">
						<SendCode @numberChange="numberChange"/>
						<div class="contentInfo"><input type="password" v-model='code' placeholder="Enter verification code"></div>
						<div class="tips">
							<router-link to='/ForgotPassword'>Forgot password?</router-link>
							<router-link to='/SignUp'>Don't have an account?</router-link>
						</div>
						<div class="contentInfo"><button class="btn" @click="smsLogin">LOG IN</button></div>
					</div>
					<div class="wechat" v-if="isWeiXin">
						<span class="line"></span>
						<span class="txt">Wechat Login</span>
						<span class="line"></span>
						<a :href="[url]"><i class="iconfont icon-weixin1"></i></a>
					</div>
		      	</mt-tab-container-item>
		    </mt-tab-container>
			</div>
		</LoginSystem>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';

	export default {
		name: 'Login',
		data () {
			return {
				selected: "1",
				passwordNumber: '',
				passwordPassword: '',
				smsNumber: '',
				code: '',
				url: '',
				isWeiXin: false,
			}
		},
		components: {
			LoginSystem: r => { require.ensure([], () => r(require('../../BaseComponents/LoginSystem')), 'LoginSystem') },
			SendCode: r => { require.ensure([], () => r(require('../../BaseComponents/SendCode')), 'SendCode') }
		},
		watch: {
	    selected: function () {
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
		    }
	  	},
	  	mounted() {
			console.log(this.isWeiXinBrowser());
			this.isWeiXin = this.isWeiXinBrowser();
			this.setGobackUrl();
	  		this.setLoginGobackUrl();
	  	},
		methods: {
			isWeiXinBrowser() {
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					return true;
				} else {
					return false;
				}
			},
			// 设置回跳地址
			/**
			 *  如果有第三方的网站回跳就设置第三方跳转到localstorage
			 * 如果没有  就读之前原本的后跳地址 如果原来的回跳地址是自己本域名的地址就不做更改 否则就设置为本域名地址的首页
			 */
			setGobackUrl() {
				var url = this.$route.fullPath.substr(11,this.$route.fullPath.length);
				var finallyUrl = unescape(url);
				if(finallyUrl.indexOf('urban-family.com') != -1 || finallyUrl.indexOf('urfamily') != -1) {
					window.localStorage.setItem('goback',finallyUrl);
				} else {
					var oldPath = window.localStorage.getItem('goback') || '';
					var hostName = window.location.hostname;
					var origin = window.location.origin;
					if( oldPath.indexOf(hostName)==-1 ) {
						window.localStorage.setItem('goback',origin);
					}
				}
			},
			alreadyRegistered() {
				var token = localStorage.getItem("token") || null;
				if(token) {
					Toast('Already registered!');
					this.$router.push('/');
				}
			},
			setLoginGobackUrl() {
				if (localStorage.getItem("goback")) {
					var goback = localStorage.getItem("goback");
				} else {
					var goback = window.location.origin;
				}
				goback = goback+ '|' + window.location.origin + '/BindMobile';
				console.log(goback);
				this.url = 'http://page.thatsmags.com/WebAccess/get-weixin-code.html?appid=wx06e97f4ed4ac07e3&scope=snsapi_userinfo&state=' + goback + '&redirect_uri=http%3A%2F%2Fapi.mall.thatsmags.com%2FthmartApi%2FUser%2FWx%2Flogin'
			},
			passwordLogin() {
				var that = this;
				if(!that.passwordNumber) {
					Toast('Please enter a 11-digit valid phone number or username!');
					return false;
				} else if(!that.passwordPassword) {
					Toast('Please enter your password!');
					return false;
				}
				// // 表单提交
				that.$http.post(this.urls.userWelogin,{
			    	mobile: that.passwordNumber,
			    	password: that.passwordPassword
			    })
				.then(function (response) {
					console.log(response.data.code);			
					if(response.data.code == 1) {
						that.loginCallBack(response);
					} else if (response.data.code == 125) {
						window.sessionStorage.setItem("mobile",that.passwordNumber);
						window.sessionStorage.setItem("password",that.passwordPassword);
						that.$router.push({
							path: '/thatsBindMobile'
						})
					}
					
				});
			},
			smsLogin() {
				var that = this;
				if(!that.smsNumber) {
					Toast('Please enter your number!');
					return false;
				} else if (!(/^1[345789]\d{9}$/.test(that.smsNumber))) {
					Toast('Please enter a 11-digit valid number!');
					return false;
				} else if(!that.code) {
					Toast('Please enter the verification code!');
					return false;
				}
				// // 表单提交
				that.$http.post(this.urls.userWelogin,{
			    	mobile: that.smsNumber,
			    	code: that.code
			    })
				.then(function (response) {
					that.loginCallBack(response);
				});
			},
			numberChange(data) {
				this.smsNumber = data;
			}
		}
	}
</script>
<style scoped>
	.contentInfo {
		width: 90%;
		margin: 0 auto;
		text-align: center;
	}
	.contentInfo input {
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin-bottom: 20px;
		padding: 0 5px;
		box-sizing: border-box;
		background-color: #eee;
    outline: 0;
    border: none;
    border-bottom: 1px solid #dfdfdf;
	}
	.tips {
		width: 90%;
		margin: 0 auto;
		display: flex; 
		justify-content: space-between;
	}
	.tips a {
		font-size: 14px;
	}
	.tips a:first-child {
		font-size: 14px;
		padding-left: 7px;
	}
	.mint-navbar .mint-tab-item.is-selected:after {
		width: 146px;
	}
	.contentInfo .btn {
		width: 160px;
    background-color: #f6442b;
    color: #fff;
    border-width: 0;
    height: 36px;
    line-height: 36px;
    margin-top: 25px;
    border-radius: 30px;
	}
	.code {
		position: absolute;
		color: #fff;
		background: #f6442b;
		border-width: 0;
		top: 0;
		right: 10px;
		width: 130px;
		text-align: center;
		height: 30px;
		line-height: 30px;
		border-radius: 30px;
	}
	.wechat {
   	text-align: center;
   	margin-top: 40px;
	}
 	.wechat .line {
   	display: inline-block;
   	width: 50px;
   	border-top: 1px solid #666;
	}
	.wechat .txt {
  	vertical-align: middle;
  	padding: 0 20px;
  	display: inline-block;
    margin-top: 5px;
	}
	.wechat i {
		display: block;
		color: #34c159;
    font-size: 50px;
    margin: 20px 0 0 0;
	}
	.mint-navbar {
		background: rgba(0,0,0,0);
		margin: 0 10px 20px 10px;
	}
	.mint-navbar .mint-tab-item.is-selected {
	  color: #fff;
	  border-bottom: none;
	}
</style>