<template>
	<div class="AddressBook">
		<div class="fix">
			<div v-for="(item,index) in dataList" :key="index" class="addressPer">
				<div class="addList" @click="chooseAddr(item.id)">
					<p>{{item.fullName}}</p>
					<p>{{item.phone}}</p>
					<p>{{item.email}}</p>
					<p>{{item.province}} {{item.city}} {{item.regionDetail}}</p>
				</div>		
		    	<div class="addBottom">
					<div class="addDefault">
						<input class="defaultRadio" type="radio" :id="index" name="defaultaddr" :value="item.id" v-model="picked" @change="setDefault(item.id)">
		       			<label :for="index">Default</label>
					</div>
					<div class="addChange">
						<span @click="changeAddr(item.id)"><i class="iconfont icon-bianji">Edit</i></span>
						<span @click="setDelete(item.id,index)"><i class="iconfont icon-shanchu">Delete</i></span>
					</div>
				</div>
			</div>
			<div style="height: 50px;"></div>
		</div>
		<!-- <div class="bottom" v-if="dataList.length>0" :class="{dispalyblock: dataList.length>0}">
			<router-link to='/AddAddress'>Add New Shipping Address</router-link>
		</div> -->
		<div class="bottom" :class="{top0: dataList.length==0}" v-show="showHide">
			<!-- <router-link to='/AddAddress'>Add New Shipping Address</router-link> -->
			<a @click="addAddress">Add New Shipping Address</a>
		</div>
	</div>
</template>
<script>
	Array.prototype.remove = function(val) { 
		var index = this.indexOf(val); 
		if (index > -1) { 
		this.splice(index, 1); 
		} 
	};
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'AddressBook',
		data () {
			return {
				picked: '',
				page: 0,
				pageSize: 20,
				dataList: [],
				showHide: false
			}
		},
		mounted () {
			this.getList();
		},
		methods:{
			addAddress() {
				console.log(this.$route.query.tickting);
				if(this.$route.query.tickting) {
					this.$router.push({
						name: "AddAddress",query: {
							tickting: true
						}
					});
				} else {
					this.$router.push("AddAddress");
				}
			},
			setDefault(id) {
				var that = this;
				that.$http.post(that.urls.changeDefault,{
					id: id
				})
				.then(function (response) {
					console.log(response);
				});
			},
			setDelete(id,index) {
				console.log(id);
				var that = this;
				MessageBox.confirm('', { 
		          message: 'Are you sure to delete this address?', 
		          title: '', 
		          confirmButtonText: 'Done', 
		          cancelButtonText: 'Cancel' 
		        }).then(action => { 
		          	that.$http.post(that.urls.addressDelete,{
						id: id
					})
					.then(function (response) {
						console.log(response);
						if (response.data.message == 'success') {
							that.dataList.splice(index,1);

						}
					});
		        }).catch(err => {});
				
			},
			getList() {
				var that = this;
				that.$http.post(that.urls.addressList,{
					pageSize: that.pageSize,
					page: that.page
				})
				.then(function (response) {
					console.log(response);
					if (response.data.code == 1) {
						for (var i = 0; i < response.data.data.data.length; i++) {
							if (response.data.data.data[i].isDefault==1) {
								that.picked = response.data.data.data[i].id;
							}
						}
						that.dataList = that.dataList.concat(response.data.data.data);
						that.showHide = true;
					}

				});
			},
			changeAddr(id) {
				this.$router.push({path: '/AddAddress',query: {id: id,flag: 'OrderConfirmation'}})
			},
			chooseAddr(id) {
				if (this.$route.query.flag=='OrderConfirmation') {
					// 设置地址
					this.$store.commit('changeOneAddress',id)
					this.$router.go(-1);
				}
			}
	  	}

	}
</script>
<style scoped>
	.addressPer {
		background: #fff;
		margin: 10px;
		border-radius: 4px;
		padding: 15px;
		box-sizing: border-box;
	}
	.addressPer .addList p {
		line-height: 25px;
	}
	.addressPer .addList {
		margin-bottom: 10px;
	}
	.addBottom {
		overflow: hidden;
	}
	.addBottom .addDefault {
		float: left;
		height: 22px;
	}
	.addBottom .addChange {
		float: right;
	}
	.addChange span:nth-child(2) {
		margin-left: 20px;
	}
	.addChange .iconfont:before {
		padding-right: 5px;
		color: #999;
	}

	.defaultRadio {
	  position: absolute;
	  display: none;
	}
  .defaultRadio + label {
    position: relative;
    display: block;
    padding-left: 30px;
    cursor: pointer;
    vertical-align: middle;
  }
  .defaultRadio + label:hover:before {
    animation-duration: 0.4s;
    animation-fill-mode: both;
    animation-name: hover-color;
  }
  .defaultRadio + label:before {
    position: absolute;
    top: 0px;
    left: 0px;
    display: inline-block;
    width: 19px;
    height: 19px;
    content: '';
    border: 1px solid #c0c0c0;
  }
  .defaultRadio + label:after {
    position: absolute;
   	display: none;
    content: '';
  }
  .defaultRadio:checked + label:before {
    animation-name: none;
  }
  .defaultRadio:checked + label:after {
    display: block;
  }
  .defaultRadio + label:before {
    border-radius: 50%;
  }
  .defaultRadio + label:after {
    top: 7px;
    left: 7px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #f9421e;
  }
  .defaultRadio:checked + label:before {
    border: 1px solid #f9421e;
  }
  .bottom {
  	position: fixed;
  	top: auto;
  	bottom: 10px;
  	left: 0;
  	right: 0;
  	height: 40px;
  	line-height: 40px;
  	text-align: center;
  	background: #f9421e;
    border-radius: 23px;
    max-width: 730px;
    width: 95%;
    margin: auto;
    /*display: none;*/
  }
  .bottom a {
    color: #fff;
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .dispalyblock {
  	display: block;
  }
  .top0 {
  	top: 0;
  }
</style>