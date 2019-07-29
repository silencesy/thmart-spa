<template>
	<div class="PersonalInfo" v-if="userInfo">
		<div class="container">
			<div>
				<div>Profile Picture</div>
				<div class="touxiangRight">
					<div class="touxiangBox"><img :src="userInfo.pic" alt=""></div>
					<i class="iconfont icon-combinedshapefuben"></i>
				</div>
				<input @change="change" type="file" name="file" accept="image/*" class="imgForm">
			</div>
			<div @click="changeUsername">
				<div>Username</div>
				<div>{{userInfo.nickname}}<i class="iconfont icon-combinedshapefuben"></i></div>
			</div>
			<div @click="unbind">
				<div>Change Password</div>
				<div><i class="iconfont icon-combinedshapefuben"></i></div>
			</div>
		</div>
		<div class="signOut"><button @click="signOut" class="btn">Sign out</button></div>
	</div>
</template>
<script>
	import {MessageBox,Toast,Indicator} from 'mint-ui';
	export default {
		name: 'PersonalInfo',
		data () {
			return {
				pass: '123123',
				userInfo: null
			}
		},
		components: {
		},
		mounted () {
			this.getUserInfo();
		},
		methods: {
			changeUsername() {
				var that = this;
				const htmls = `
					<div class="box">
					<div class="isunbind">Change your username</div>
					<div class="inputBox"> 
					<input id="username" type="text" placeholder="username">
					</div>
					</div>
					`;
				MessageBox.confirm('', {
					message: htmls,
					title: '',
					showConfirmButton:true,
					showCancelButton:true,
					cancelButtonClass:'cancelButton',
					confirmButtonClass:'confirmButton',
					confirmButtonText:'Done',
					cancelButtonText:'Cancel'
				}).then(action => {
					if (action == 'confirm') {
						var username = document.getElementById("username").value;
						if(!username) {
							Toast('Please enter your username!');
							return false;
						}
						// 表单提交
						that.$http.post(this.urls.changeNickName,{
							nickname: username,
					    })
						.then(function (response) {
							Toast('success!');
							that.userInfo.nickname = username;
							document.getElementById("username").value = '';
						});

					}
				}).catch(err => {
					if (err == 'cancel') {
						document.getElementById("username").value = '';
					}
				});
			},
			unbind: function () {
				var that = this;
				const htmls = `
					<div class="box">
					<div class="isunbind">Change the password</div>
					<div class="inputBox"> 
					<input id="currentPassword" type="password" placeholder="Current password">
					<input id="newPassword" type="password" placeholder="New password">
					<input id="repeatPassword" type="password" placeholder="Please re-enter your password">
					</div>
					</div>
					`;
				MessageBox.confirm('', {
					message: htmls,
					title: '',
					showConfirmButton:true,
					showCancelButton:true,
					cancelButtonClass:'cancelButton',
					confirmButtonClass:'confirmButton',
					confirmButtonText:'Done',
					cancelButtonText:'Cancel'
				}).then(action => {
					if (action == 'confirm') {
						var currentPassword = document.getElementById("currentPassword").value;
						var newPassword = document.getElementById("newPassword").value;
						var repeatPassword = document.getElementById("repeatPassword").value;
						var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
						if(!currentPassword) {
							Toast('Please enter your password!');
							return false;
						} else if (!reg.test(currentPassword)) {
							Toast('Please enter your password with 6-16 digits (must contain numbers and letters)!');
							return false;
						} else if (!reg.test(newPassword)) {
							Toast('Please enter your password with 6-16 digits (must contain numbers and letters)!');
							return false;
						} else if(!repeatPassword || repeatPassword!=newPassword) {
							Toast('The two passwords you entered do not match!');
							return false;
						}
						// 表单提交
						that.$http.post(this.urls.changePassword,{
							password: newPassword,
					    	oldPassword: currentPassword,
					    })
						.then(function (response) {
							Toast('success!');
							// 清空表单数据
							document.getElementById("currentPassword").value = '';
							document.getElementById("newPassword").value = '';
							document.getElementById("repeatPassword").value = '';
						});

					}
				}).catch(err => {
					if (err == 'cancel') {
						document.getElementById("currentPassword").value = '';
						document.getElementById("newPassword").value = '';
						document.getElementById("repeatPassword").value = '';		
					}
				});
			},
			change(e) {
		        let that = this
		        var files = e.target.files[0]
		        if (!e || !window.FileReader) return  // 看支持不支持FileReader
		        let reader = new FileReader()
		        reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
		        reader.onloadend = function () {
		          	var _self = this;
		          	// 不压缩
		    //       	that.$http.post(that.urls.changeHead,{
						// 	headimg: _self.result
						// })
						// .then(function (response) {
						// 	that.userInfo.pic = _self.result;
						// });
					// 压缩
		          	let w = 300;
                	let h = 300;
                	let compressPic = function(base64) {
						console.log(base64)
						that.$http.post(that.urls.changeHead,{
							headimg: base64
						})
						.then(function (response) {
							that.userInfo.pic = base64;
						});
					};
		          	that.canvasDataUrl(_self.result,w,h,compressPic);
		        }
			},
			getUserInfo() {
				var that = this;
				that.$http.post(that.urls.userDetail)
				.then(function (response) {
					that.userInfo = response.data.data;
				});
			},
			// 压缩图片
			canvasDataUrl(data, w, h, callback) {
				let newImg = new Image();
					newImg.src = data;
				let imgWidth, imgHeight;
				newImg.onload = () => {
					let img = document.createElement('img');
					img.src = newImg.src;
					imgWidth = img.width;
					imgHeight = img.height;
					let canvas = document.createElement('canvas');
					let ctx = canvas.getContext('2d');
				if (imgWidth > imgHeight) {
					imgWidth = w * imgWidth / imgHeight;
					imgHeight = h;
				} else {
					imgHeight = h * imgHeight / imgWidth;
					imgWidth = w;
				};
				canvas.width = imgWidth;
				canvas.height = imgHeight;
				ctx.clearRect(0, 0, w, h);
				// 处理png格式图片背景变黑的问题
				ctx.fillStyle = '#fff';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
				let rate = 0.7;
				let base64 = canvas.toDataURL('image/jpeg', rate);
					callback(base64);
				};
			},
			signOut() {
				localStorage.removeItem("token");
				localStorage.removeItem("goback");
				this.$router.push('/')
			}

		}
	}
</script>
<style scoped>
	.container {
		background: #fff;
		margin: 10px;
		border: 1px solid #dfdfdf;
		border-radius: 8px;
	}
	.touxiangRight {
		line-height: 40px;
	}
	.touxiangBox {
		display: inline-block;
		width: 40px;
		height: 40px;
		border-radius: 20px;
		background: #dfdfdf;
	}
	.container > div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
		border-bottom: 1px solid #dfdfdf;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.container > div:last-child {
		border-bottom: none;
	}
	.container > div:first-child img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.container > div:first-child {
		position: relative;
	}
	.container > div:first-child input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		opacity: 0;
		z-index: 100;
	}
	.container > div:nth-child(2) div:nth-child(2) {
		color: #999;
	}
	.container > div i {
		padding-left: 10px;
	}

	.signOut {
		width: 100%;
		text-align: center;
	}
	.signOut .btn {
		width: 160px;
	    background-color: #f6442b;
	    color: #fff;
	    border-width: 0;
	    height: 36px;
	    line-height: 36px;
	    margin-top: 25px;
	    border-radius: 30px;
	}
	.iconfont.icon-combinedshapefuben {
		color: #aaa;
	}

</style>