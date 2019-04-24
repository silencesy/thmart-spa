<template>
	<div class="RePassword">
		<LoginSystem>		
			<div slot="info">
				<div class="content">
					<div class="contentInfo signInfo"><input type="password" v-model='password' placeholder="Enter password"></div>
					<div class="contentInfo"><input type="password" v-model='repassword' placeholder="Please re-enter your password"></div>
					<div class="contentInfo"><button class="btn" @click="Btn">Submit</button></div>
				</div>
			</div>
		</LoginSystem>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	export default {
		name: 'RePassword',
		data () {
			return {
				password: "",
				repassword: ""
			}
		},
		components: {
			LoginSystem: r => { require.ensure([], () => r(require('../../BaseComponents/LoginSystem')), 'LoginSystem') }
		},
		mounted () {
			
		},
		methods: {
			Btn() {
				var that = this;
				var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				if(!that.password) {
					Toast('Please enter your password!');
					return false;
				} else if (!reg.test(that.password)) {
					Toast('Please enter your password with 6-16 digits (must contain numbers and letters)!');
					return false;
				} else if(!that.repassword || that.repassword!=that.password) {
					Toast('The two passwords you entered do not match!');
					return false;
				}
				// 表单提交
				that.$http.post(this.urls.resetPassword,{
					password: that.password,
			    	rePassword: that.repassword,
			    	id: that.$route.query.id
			    })
				.then(function (response) {
					that.loginCallBack(response);
				});
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

	.contentInfo {
		position: relative;
	}
</style>