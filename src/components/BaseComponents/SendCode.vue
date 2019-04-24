<template>
	<div class="SendCode">
		<div class="contentInfo signInfo">
			<input type="text" v-model='number' placeholder="Enter phone number">
			<button class="code" @click="sendCode" :class="{backgroundColor: sendMsgDisabled}">
				<span v-if="!sendMsgDisabled">Send Code</span>
				<span v-if="sendMsgDisabled">{{time}}s</span>
			</button>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	export default {
		name: "SendCode",
		data() {
			return {
				number: '',
				sendMsgDisabled: false,
				time: 60
			}
		},
		methods: {
			sendCode() {
				var that = this;
				if (!that.sendMsgDisabled) {
					if(!that.number) {
						Toast('Please enter your number!');
						return false;
					} else if (!(/^1[345789]\d{9}$/.test(that.number))) {
						Toast('Please enter a 11-digit valid number!');
						return false;
					}
					that.sendMsgDisabled = true;
				    let interval = window.setInterval(function() {
						if ((that.time--) <= 0) {
							that.time = 60;
							that.sendMsgDisabled = false;
							window.clearInterval(interval);
						}
				    }, 1000);
				    // 获取验证码
				    that.$http.post(this.urls.getCode,{
				    	mobile: that.number
				    })
					.then(function (response) {
						console.log(response);
					});
				}
			}
		},
		watch: {
			number: function() {
				this.$emit("numberChange",this.number);
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
	.code {
		position: absolute;
		color: #fff;
		background: #f6442b;
		border-width: 0;
		top: 0;
		right: 10px;
		width: 120px;
		text-align: center;
		height: 30px;
		line-height: 30px;
		border-radius: 30px;
		outline: none;
	}
	.code span {
		color: #fff;
	}
	.backgroundColor {
		background-color: rgb(106, 106, 106,0.4);
	}
</style>