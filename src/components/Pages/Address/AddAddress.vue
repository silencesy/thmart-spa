<template>
	<div class="AddAddress">
		<div class="container">
			<div class="info">
				<div class="baseInfo">
					<div>
						<label for="name"><i>*</i> Full Name :</label> 
						<input type="text" v-model='name' id="name">					
					</div>
					<div>
						<label for="number"><i>*</i> Phone :</label> 
						<input type="text" v-model='number' id="number">
					</div>
					<div>
						<label for="email"><i>*</i> Email :</label>
						<input type="text" v-model='email' id="email">
					</div>
					<!-- <div @click="showChooseAddr">
						<label for="add"><i>*</i> Address : </label> 
						<span> {{myAddressProvince}} {{myAddressCity}}</span>
					</div> -->
				</div>
				<div v-if="!isTickting" class="address">
					<textarea rows="5" v-model='myAddressProvince' placeholder="* Please write down your detailed address in Chinese."> </textarea>
					<textarea rows="5" v-model='address' placeholder="Please write down your detailed address in English(city name is required)"> </textarea>
				</div>
				<div v-if="!isTickting" class="addDefault">
					<input class="defaultCheckbox" v-model="defaultBtn" type="checkbox" id="item">
	       			<label for="item">Default</label>
				</div>
			</div>
			<div style="height: 30px;"></div>
			<div class="bottom" @click="submitAddr">Submit</div>
			<div style="height: 30px;"></div>
		</div>
		<mt-popup
			v-model="popupVisible"
			position="bottom">
			<div class="title"><span @click="bindCancel">Cancel</span><span @click="bindConfirm">Confirm</span></div>
			<mt-picker :slots="myAddressSlots" valueKey="1" @change="onMyAddressChange"></mt-picker>
		</mt-popup>
	</div>
</template>
<script>
	import { Toast,Picker } from 'mint-ui';
  	import myaddress from './address.json';
	export default {
		name: 'AddAdress',
		components: {
      		'mt-picker': Picker
    	},
		data () {
			return {
				name: '',
				number: '',
				email: '',
				address: '',
				defaultBtn: false,
				popupVisible: false,
		       	myAddressSlots: [
					{
						flex: 1,
						defaultIndex: 1,    
						values: Object.keys(myaddress),  //省份数组
						className: 'slot1',
						textAlign: 'center'
					}, {
						divider: true,
						content: '-',
						className: 'slot2'
					}, {
						flex: 1,
						values: [],
						className: 'slot3',
						textAlign: 'center'
					}
		        ],
		        myAddressProvince:'',
		        myAddressCity:'',
				addrId: '',
				isTickting: false  //是否是电子票 电子票不显示地址添加
			}
		},
		created() {
			this.isTicktingFun(); // 设置是否为电子票添加地址
		},
		mounted () {
			
			if (this.$route.query.id) {
				this.getOneInfo(this.$route.query.id);
				this.addrId = this.$route.query.id;
			}
			this.$nextTick(() => {
        		this.myAddressSlots[0].defaultIndex = 0    
      		});
		},
		methods: {
			// 设置是否为电子票添加地址
			isTicktingFun() {
				console.log(this.$route.query.tickting);
				if(this.$route.query.tickting == 'true' || this.$route.query.tickting) {
					this.isTickting = true;
				}
			},
			bindCancel() {
				this.popupVisible = false;
				// this.myAddressProvince = '';
				// this.myAddressCity = '';
			},
			bindConfirm() {
				this.popupVisible = false;
			},
			showChooseAddr() {
				this.popupVisible = true;
			},
			onMyAddressChange(picker, values) {
				// console.log(picker,values)
		       if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
		          picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
		          // picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
		          this.myAddressProvince = values[0];
		          this.myAddressCity = values[1];
		          // this.myAddresscounty = values[2];
		        }
      		},
      		submitAddr() {
				var that = this;
				if(that.isTickting) {
					that.myAddressProvince = 'N/A';  //如果是电子票添加地址默认值
				}
      			if (!that.name) {
      				Toast('Please enter your name!');
      				return false;
      			}
      			 else if (!that.number) {
      				Toast('Please enter your number!');
      				return false;
      			} else if (!(/^1[23456789]\d{9}$/.test(that.number))) {
	      			Toast('Please enter a 11-digit valid number!');
	      			return false;
      			} else if (!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(that.email))) {
      				Toast('Please enter a valid email address!');
      				return false;
      			} else if (!that.myAddressProvince && !that.isTickting) {
      				Toast('Please write down your detailed address in Chinese!');
      				return false;
      			}
				that.$http.post(that.urls.address,{
					fullName: that.name,
					phone: that.number,
					province: that.myAddressProvince,
					city: that.myAddressCity,
					isDefault: that.defaultBtn?1:0,
					email: that.email,
					regionDetail: that.address,
					id: that.addrId
				})
				.then(function (response) {
					if (response.data.code == 1) {
						that.$router.go(-1);
					}
				});
      		},
      		getOneInfo(id) {
      			var that = this;
      			that.$http.post(that.urls.oneAddress,{
					id: id
				})
				.then(function (response) {
					console.log(response)
					if (response.data.code == 1) {
						that.name = response.data.data.fullName;
						that.number = response.data.data.phone
						that.email = response.data.data.email
						that.myAddressProvince = response.data.data.province
						that.myAddressCity = response.data.data.city
						that.address = response.data.data.regionDetail
						that.defaultBtn = response.data.data.isDefault==1?true:false
					}
				});
      		}
		}
	}
</script>
<style scoped>
	.container {
		margin: 10px;
	}
	.info {
		background: #fff;
		/*margin-bottom: 56px;*/
	}
	.info input {
		border: none;
		outline: none;
		color: #999;
	}
	.baseInfo > div {
		padding: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid #dfdfdf;
		overflow: hidden;
	}
	.baseInfo i {
		color: #F9421E;
	}
	.baseInfo label {
		color: #666;
		line-height: 40px;
		float: left;
	}
	.baseInfo input {
		height: 40px;
		float: left;
	}
	.baseInfo div:first-child label {
		width: 36%;
	}
	.baseInfo div:first-child input {
		width: 64%;
	}
	.baseInfo div:nth-child(2) label {
		width: 26%;
	}
	.baseInfo div:nth-child(2) input {
		width: 74%;
	}
	.baseInfo div:nth-child(3) label {
		width: 27%;
	}
	.baseInfo div:nth-child(3) input {
		width: 73%;
	}
	.baseInfo span {
		display: inline-block;
		line-height: 40px;
		color: #999;
		padding-left: 10px;
	}
	.address {
		margin: 0 10px;
	}
	.address textarea:first-child {
		margin-top: 20px;
	}
	textarea {
		border: 1px solid #dfdfdf;
		width: 100%;
		border-radius: 4px;
		padding: 10px;
		box-sizing: border-box;
		margin-bottom: 15px;
		font: inherit;
		color: #999;
		line-height: 24px;
		outline: none;
		resize: none;
	}
	.addDefault {
		margin-left: 10px;
		padding-bottom: 20px;
	}
	.bottom {
	    height: 36px;
	    line-height: 36px;
	    background: #F9421E;
	    margin: 0 auto;
	    color: #fff;
	    max-width: 730px;
	    width: 95%;
	    text-align: center;
	    border-radius: 23px;
	}
	.mint-popup-bottom {
		width: 100%;
	}
	.mint-popup .title {
		padding: 10px 0px;
		border-bottom: 1px solid #dfdfdf;
		overflow: hidden;
		display: flex;
	}
	.mint-popup .title span:nth-child(1) {
		flex: 1;
		color: #999;
		text-align: center;
	}
	.mint-popup .title span:nth-child(2) {
		flex: 1;
		color: #F9421E;
		text-align: center;
	}
</style>