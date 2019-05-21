<template>
    <div class="container" v-if="shareData">
        <div class="head-goods-info">
            <div class="goods-container">
                <img :src="shareData.goods_info.pic" alt="">
                <div class="info">
                    <div class="title line2">{{shareData.goods_info.title}}</div>
                    <div class="price">
                        <i class="theme_color">￥{{shareData.goods_info.price}}</i>
                        <del>￥{{shareData.goods_info.originalPrice}}</del>
                    </div>
                </div>
            </div>
        </div>
        <div class="share-info">
            <div class="count-down" v-if="flag != 'startSpell'">
                <count-down :currentTime="Number(shareData.currentTime)" :startTime="Number(shareData.currentTime)" :endTime="Number(shareData.endTime)" :tipText="''" :tipTextEnd="''" :endText="'Closed'" :dayTxt="' Days '" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''" :isSpell="'yes'"></count-down>
            </div>
            <div class="avatar-list">
                <img v-for="(item,index) in shareData.headimgurl_array" :key="index" :src="item" alt="">
                <i v-for="(item,index) in shareData.number_left" :key="index" class="empty">?</i>
            </div>
            <div v-if="flag != 'shareSpell'">
                <div v-if="shareData.number_left<=0" class="info">Completed​​</div>
                <div v-else class="info">{{shareData.number_left}} Spot Left</div>
            </div>
            <div v-else>
                <div class="info">Share with Your Friend,  {{shareData.number_left}} Spot Left</div>
            </div>
            
            <div v-if="flag == 'shareSpell'" class="btn" @click="shareFriend">Invite Your Friends</div>
            <div v-if="flag == 'startSpell'" class="btn" @click="buyNow('start')">Start Duo Deals</div>
            <div v-if="flag == 'joinSpell'" class="btn" @click="buyNow('join')">Join Duo Deals</div>
            <div class="other-share" v-if="flag == 'startSpell' && shareData.spellInfo.spellList!=0">
                <div class="info2">Or Join Group Buy</div>
                <div class="share-list">
                    <div class="item" v-for="(item,index) in shareData.spellInfo.spellList" :key="index">
                        <div>
                            <img :src="item.headimg_url" alt="">
                            <div class="line1">{{item.nickname}}</div>
                        </div>
                        <div>
                            <div>Only {{item.number_left}} Vacancy Left</div>
                            <div>
                                <count-down :currentTime="Number(item.currentTime)" :startTime="Number(item.currentTime)" :endTime="Number(item.endTime)" :tipText="''" :tipTextEnd="''" :endText="'Closed'" :dayTxt="' Days '" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down>
                            </div>
                        </div>
                        <div>
                            <span @click="buyNow('join',item.id)">Go Duo Deals</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="line-row"></div>
        <div class="layer" v-show="layerShow" @click="shareFriend">
            <div class="share-img">
                <i class="iconfont icon-share1"></i>
            </div>
            <div class="share-text">
                Click the menu bar in the top right corner to invite people to your group.
            </div>
        </div>
        <GoodsRow :goodsData="goodsData"></GoodsRow>
        <mt-popup
			v-model="chooseSkuVisible"
			position="bottom">
            <div class="singleGoods-info" v-if="layerData">
                <div class="title" v-if="!singleSkuInfo">
                    <div class="img-box">
                        <img :src="layerData.pic" alt="">
                    </div>
                    <div class="sku-info-text">
                        <div class="theme_color">
                            <p class="price theme_color" v-if="layerData.minPrice != layerData.maxPrice">￥{{layerData.minPrice}} - ￥{{layerData.singleBuyPriceMax}}</p>
							<p class="price theme_color" v-if="layerData.minPrice == layerData.maxPrice">￥{{layerData.minPrice}}</p>
                        </div>
                        <p class="prop">Please select goods</p>
                        <p>Stock: {{layerData.sumStock}}</p>
                    </div>
                    <i @click="closeLayer" class="iconfont icon-guanbi"></i>
                </div>
                <div class="title" v-else>
                    <div class="img-box">
                        <img :src="singleSkuInfo.pic" alt="">
                    </div>
                    <div class="sku-info-text">
                        <div class="theme_color">
                            <p class="price theme_color">￥{{singleSkuInfo.spellPrice}}</p>
                        </div>
                        <p class="prop"><span v-for='(item,index) in singleSkuInfo.propName' :key="index">{{item[0]}}</span></p>
                        <p>Stock: {{singleSkuInfo.stock}}</p>
                    </div>
                    <i @click="closeLayer" class="iconfont icon-guanbi"></i>
                </div>
                <ScrollView ref="ScrollView" height="290" :loadding="loadding" :open="chooseSkuVisible">
                    <div class="choose-sku">
                        <div class="classification" v-for="(item, key) in list.result" :key="key">
                            <div class="title">{{key}}</div>
                            <div class="Option-box clearfix">
                                <span class="Option-item" v-for="(value,index) in item" :key="index" v-bind:class="{active: value.active, disabled: !value.active && value.disabled}"  @click="handleActive(key, value)">{{ value.name }}</span>
                                
                            </div>

                        </div>
                    </div>
	        	</ScrollView>
                <div class="quantity">
                    <span>Quantity</span>
	        		<span>
	        			<Count @add="add" @less="less" :number="number" :yanse="yanse" />
	        		</span>
                </div>
                <div class="done-btn" @click="buy">
                    Done
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import GoodsRow from "../../BaseComponents/GoodsRow";
import wx from 'weixin-js-sdk';
import { Toast,MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            shareData: null, //分享内容
            goodsData: [], // 下面商品数据
            flag: null, // 页面功能  shareSpell 分享  joinSpell 加入 startSpell 发起拼单
            layerShow: false,
            expired: false,
            chooseSkuVisible: false,
            loadding: false, // 不需要加载
            // 购买数量
            number: 1,
            yanse: true, // 更改加减组件的颜色
            layerData: null,
            data: [],
            skuId: "",
            skuName: "skuId",
            // 属性名称信息
            keys: [],
            // 数据集合{list.result list.items}
            list: {},
            // 分隔符
            spliter: '\u2299',
            result: {},
            message: "",
            highKeys: {},
            singleSkuInfo: null,
            spellId: null


        }
    },
    created() {
        // this.checkSpell();
        // console.log(this.getToken());
        // 没有登录
        if(this.getToken()) {
            this.checkSpell();
        } else {
            this.getData();
        }
        this.getHotGoods();
    },
    components: {
        GoodsRow,
        Toast,
        CountDown: r => { require.ensure([], () => r(require('@/components/BaseComponents/countDown')), 'countDown') },
        ScrollView: r => { require.ensure([], () => r(require('@/components/BaseComponents/ScrollView')), 'ScrollView') },
        Count: r => { require.ensure([], () => r(require('@/components/BaseComponents/Count')), 'Count') },
    },
    methods: {
        // 分享sdk
        getWx() {
            let that = this;
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isiOS) {
                var url = window.sessionStorage.getItem('href');
            } else {
                var url = window.location.href;
            }
            that.$http.post(that.urls.share,{url:url})
            .then(function (response) {
                that.signPackage = response.data.data.signPackage;
                // console.log(response);
                that.share();
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        share() {
            var that = this;
            wx.config({
                debug:false,// 是否开启调试模式
                appId: that.signPackage.appId,
                timestamp: that.signPackage.timestamp,
                nonceStr: that.signPackage.nonceStr,
                signature: that.signPackage.signature,
                jsApiList:['onMenuShareTimeline',//分享到朋友圈
                        'onMenuShareAppMessage',//分享给朋友
                        'onMenuShareQQ'//分享到QQ
                    ]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function(){
                var url = window.location.href;
                console.log(url);
                var options ={
                    title: that.shareData.goods_info.title,// 分享标题
                    link: encodeURI(url),// 分享链接，记得使用绝对路径
                    imgUrl: encodeURI(that.shareData.goods_info.pic),// 分享图标，记得使用绝对路径
                    desc:'',// 分享描述
                    success:function(){
                    console.info('分享成功！');
                    // 用户确认分享后执行的回调函数
                    },
                    cancel:function(){
                    console.info('取消分享！');
                    // 用户取消分享后执行的回调函数
                    }
                }
                wx.onMenuShareTimeline(options);// 分享到朋友圈
                wx.onMenuShareAppMessage(options);// 分享给朋友
                wx.onMenuShareQQ(options);// 分享到QQ
            });
        },

        buy() {
            var that = this;
            if (that.mustChooseAll()) {
                that.$router.push({name:'OrderConfirmation',query: {skuId: that.singleSkuInfo.id,number: that.number,isSpell: 1,spellId: that.spellId}});
            } else {
                Toast("Please select goods");
            }
            
        },
        // 必须选完全才能加入购物车或者购买
        mustChooseAll() {
            var chooseNumer = 0;
            for (var key in this.list.result) {
                for(var key2 in this.list.result[key]) {
                    for(var key3 in this.list.result[key][key2]) {
                        if (key3 == 'active' && this.list.result[key][key2][key3]) {
                            chooseNumer++;
                        }
                    }
                }
            }
            return this.keys.length == chooseNumer? true: false;
        },
        add() {
            // 如果超过库存就不往上加并且提示用户
            if (this.singleSkuInfo && this.number>this.singleSkuInfo.stock-1 ) {
                Toast("The quantity of goods selected exceeds the stock");
                return false;
            }
            this.number++;
            if (this.yanse) {
                this.yanse = false;
            }
            
        },
        less() {
            if (this.number == 1) {
                return false;
            } else {
                this.number--;
                if (this.number == 1) {
                    this.yanse = true;
                }
            }
            
        },
        closeLayer() {
            this.chooseSkuVisible = false;
        },
        // 分享好友
        shareFriend() {
            if(this.isWeiXin()) {
                this.layerShow = !this.layerShow;
            } else {
                Toast('Please open this page in your browser share with friends!');
            }
        },
        getData() {
            var that = this;
            console.log(that.$route.query.id);
            that.$http.post(that.urls.shareDetails,{
                orderNumber: that.$route.query.id
            })
            .then(function (response) {
                // console.log(response);
                that.shareData = response.data.data;
                // that.checkIfSharing();
                if(that.shareData.number_left<=0) {
                    that.flag = 'startSpell';
                } else {
                    if(that.flag!='shareSpell') {
                        that.flag = 'joinSpell';
                    }
                }
                that.getGoodsData();
                that.getWx();
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getGoodsData() {
            let that = this;
            that.$http.post(that.urls.productDetails,{id:that.shareData.goods_info.id})
            .then(function (response) {
                console.log(123);
                that.layerData = response.data.data;
                that.skuInitData(response.data.data.skuList);
                that.getTextareaData();
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        // 初始化sku列表
	  		skuInitData (skuData) {
	  			for (var i = 0; i < skuData.length; i++) {
	  				var skuItem = {};
	  				skuItem['skuId'] = skuData[i].id;
	  				for(var key in skuData[i].propName) {
	  					skuItem[key] = skuData[i].propName[key][0];
	  				}
	  				this.data.push(skuItem);
	  			}
	  		},
	  		/**
             * 初始化数据
             * @return 
             */
            powerset(arr) {
                let ps = [[]];
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0, len = ps.length; j < len; j++) {
                        ps.push(ps[j].concat(arr[i]));
                    }
                }

                return ps;
            },

            /**
             * 初始化数据
             * @return 
             */
            initData() {
                this.result = {};
                this.keys = this.getAllKeys();
                for (let i = 0; i < this.keys.length; i ++) {
                    this.highKeys[this.keys[i]] = false;
                }

                this.list = this.combineAttr(this.data, this.keys);
                this.initSeleted(this.skuId);
                this.buildResult(this.list.items)
                this.updateStatus(this.getSelectedItem());
                this.showResult();
            },

            /**
             * 获取输入表单中的数据进行初始化
             * @return
             */
            getTextareaData() {
                	// 默认选中则打开注释
                    // 定义一个flag
                    // let isHas = false;
                    // let skuId = '';
                    // for (let i = 0; i < this.data.length; i ++) {
                    //     if (skuId == this.data[i][this.skuName]) {
                    //         isHas = true;
                    //         break
                    //     }
                    // }

                    // this.skuId = isHas ? skuId : this.data[0][this.skuName];
                    this.initData();
            },

            /**
             * 正常属性点击
             */
            handleNormalClick(key, value) {
                for (let i in this.list.result[key]) {
                    if (i != value.name) {
                        this.list.result[key][i].active = false;
                    } else {
                        this.list.result[key][i].active = true;
                    }
                }
            },

            /**
             * 无效属性点击
             */
            handleDisableClick(key, value) {
                this.list.result[key][value.name]["disabled"] = false;
                // 清空高亮行的已选属性状态（因为更新的时候默认会跳过已选状态）
                for (let i in this.list.result) {
                    if (i != key) {
                        for (let x in this.list.result[i]) {
                            this.list.result[i][x].active = false;
                        }
                    }
                }

                this.updateStatus(this.getSelectedItem());
            },

            /**
             * 高亮行
             */
            highAttributes: function() {
                for (let key in this.list.result) {
                    this.highKeys[key] = true;
                    for (let attr in this.list.result[key]) {
                        if (this.list.result[key][attr].active === true) {
                            this.highKeys[key] = false;
                            break;
                        }
                    }
                }
            },

            /**
             * 点击事件处理
             * @param  key   点击的行
             * @param  value 点击的按钮的数据
             */
            handleActive: function(key, value) {
                if (value.active == true) {
                    return false;
                }

                this.handleNormalClick(key, value);
                if (value.disabled === true) {
                    this.handleDisableClick(key, value);
                }

                this.updateStatus(this.getSelectedItem());
                this.highAttributes();
                this.showResult();
            },

            /**
             * 计算属性
             * @param  {[type]} data [description]
             * @param  {[type]} keys [description]
             * @return {[type]}      [description]
             */
            combineAttr(data, keys) {
                let allKeys = []
                let result = {}

                for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    let values = []

                    for (let j = 0; j < keys.length; j++) {
                        let key = keys[j]
                        if (!result[key]) {
                            result[key] = {};
                        }

                        if (!result[key][item[key]]) {
                            result[key][item[key]] = {"name": item[key], "active": false, "disabled": true};
                        }

                        values.push(item[key]);
                    }

                    allKeys.push({
                        path: values.join(this.spliter),
                        sku: item['skuId']
                    });
                }

                return {
                    result: result,
                    items: allKeys
                }
            },

            /**
             * 获取所有属性
             * @return {[type]} [description]
             */
            getAllKeys() {
                let arrKeys = [];
                for (let attribute in this.data[0]) {
                    if (!this.data[0].hasOwnProperty(attribute)) {
                        continue;
                    } 

                    if (attribute !== this.skuName) {
                        arrKeys.push(attribute);
                    }
                }

                return arrKeys;
            },

            getAttruites(arr) {
                let result = []
                for (let i = 0; i < arr.length; i++) { 
                    result.push(arr[i].path) 
                }

                return result
            },

            /**
             * 生成所有子集是否可选、库存状态 map
             */
            buildResult(items) {
                let allKeys = this.getAttruites(items)

                for (let i = 0; i < allKeys.length; i++) {
                    let curr = allKeys[i];
                    let sku = items[i].sku;
                    let values = curr.split(this.spliter);
                    let allSets = this.powerset(values);

                    // 每个组合的子集
                    for (let j = 0; j < allSets.length; j++) {
                        let set = allSets[j]
                        let key = set.join(this.spliter)

                        if (this.result[key]) {
                            this.result[key].skus.push(sku)
                        } else {
                            this.result[key] = {
                                skus: [sku]
                            }
                        }
                    }
                }
            },

            /**
             * 获取选中的信息
             * @return Array 
             */
            getSelectedItem() {
                let result = [];
                for (let attr in this.list.result) {
                    let attributeName = '';
                    for (let attribute in this.list.result[attr]) {
                        if (this.list.result[attr][attribute].active === true) {
                            attributeName = attribute;
                        }
                    }

                    result.push(attributeName);
                }

                return result
            },

            /**
             * 更新所有属性状态
             */
            updateStatus(selected) {
                for (let i = 0; i < this.keys.length; i++) {
                    let key = this.keys[i],
                        data = this.list.result[key],
                        hasActive = !!selected[i],
                        copy = selected.slice();

                    for (let j in data) {
                        let item = data[j]["name"];
                        if (selected[i] == item) {
                            continue
                        }

                        copy[i] = item
                        let curr = this.trimSpliter(copy.join(this.spliter), this.spliter);
                        this.list.result[key][j]["disabled"]  = this.result[curr] ? false : true;
                    }
                }
            },

            trimSpliter(str, spliter) {
                // ⊙abc⊙ => abc
                // ⊙a⊙⊙b⊙c⊙ => a⊙b⊙c
                let reLeft    = new RegExp('^' + spliter + '+', 'g');
                let reRight   = new RegExp(spliter + '+$', 'g');
                let reSpliter = new RegExp(spliter + '+', 'g');
                return str.replace(reLeft, '')
                    .replace(reRight, '')
                    .replace(reSpliter, spliter)
            },

            /**
             * 初始化选中
             * @param  mixed|Int|String skuId 需要选中的skuId
             * @return {[type]}       [description]
             */
            initSeleted(skuId) {
                for (let i in this.data) {
                    if (this.data[i][this.skuName] == skuId) {
                        for (let x in this.data[i]) {
                            if (x !== this.skuName) {
                                this.list.result[x][this.data[i][x]].active = true;
                            }
                        }
                        break;
                    }
                }
            },

            /**
             * 显示选中的信息
             * @return 
             */
            showResult() {
                let result = this.getSelectedItem()
                let s = []
                for (let i = 0; i < result.length; i++) {
                    let item = result[i];
                    if (!!item) {
                        s.push(item)
                    }
                }

                if (s.length == this.keys.length) {
                    let curr = this.result[s.join(this.spliter)]
                    if (curr) {
                        s = s.concat(curr.skus)
                        this.skuId = curr.skus[0];
                    }

                    this.message = s.join('-');
                }
            },
        checkSpell() {
            var that = this;
            that.$http.post(that.urls.checkOrderSpell,{
                orderNumber: that.$route.query.id
            })
            .then(function (response) {
                console.log(response);
                var data = response.data.data;
                console.log(data);
                if(data==1) {
                    MessageBox({
                        title: '',
                        message: 'This Group Buy is over!',
                        confirmButtonText: 'Go Home'
                    }).then(()=>{
                        that.$router.push('/');
                    });
                } else if(data==2) {
                    that.flag = 'shareSpell';
                } else if(data==3) {
                    that.flag = 'joinSpell';
                }
                that.getData();
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getHotGoods() {
            var that = this;
            var pagePara = {
                pageSize: 30,
                page: 1,
            }
            that.$http.post(that.urls.hotProducts,pagePara)
            .then(function (response) {
                that.goodsData = response.data.data.data;
            }).catch(function (error) {
            console.log(error);
            });
        },
        buyNow(flag,id) {
            this.isLogin();
            if(flag == 'start') {
                console.log('start');
                this.$router.push({path: '/GoodsDetails', query: {id:this.shareData.goods_info.id}});
            } else {
                if(id){
                    this.spellId = id;
                } else {
                    this.spellId = this.shareData.id;
                }
                this.chooseSkuVisible = true;
            }
        },
        // 如果没有登录则跳转登录并且设置回跳地址
        isLogin() {
            let that = this;
            // 如果没有登录则跳转登录并且设置回跳地址
            if (!that.getToken()) {
                that.setlocalStorage("goback",window.location.href);
                that.$router.push({name: 'Login'});
            }
            return false;
        },
        // 获取单个sku信息
        getSkuId(id) {
            let that = this;
            that.$http.post(that.urls.Skudetail,{
                id:id
            })
            .then(function (response) {
                console.log(response);
                that.singleSkuInfo = response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
    watch: {
        skuId: function(newVal,oldVal) {
            this.number = 1;
            this.getSkuId(newVal);
        }
    }
}
</script>
<style scoped>
.container {
    /* padding: 15px; */
    background-color: #fff;
}
.goods-container {
    padding-left: 120px;
    position: relative;
    padding-bottom: 15px;
    border-bottom: 1px solid #DFDFDF;
}
.head-goods-info {
    padding: 15px 15px 0 15px;
}
.goods-container img {
    width: 110px;
    height: 110px;
    position: absolute;
    left: 0;
    top: 0;
}
.goods-container .info {
    width: 100%;
}
.goods-container .info .price {
    margin-top: 50px;
}
.goods-container .info .price i {
    margin-right: 10px;
    font-size: 18px;
}
.goods-container .info .price del {
    font-size: 14px;
    color: #979797;
}
.avatar-list {
    padding: 0px 0 15px 0;
    text-align: center;
    display: flex;
    justify-content: center;
}
.avatar-list img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    background: #eee;
}
.avatar-list img:first-child::after {
    content: 'Initiator';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 50px;
    height: 15px;
    line-height: 15px;
    font-size: 12px;
    background-color: #FFA200;
    color: #fff;
    border-radius: 20px;
}
.avatar-list .empty {
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    border: 1px dashed #999999;
}
.avatar-list img,.avatar-list .empty {
    margin-right: 10px;
}
.avatar-list .empty:last-child {
    margin-right: 0;
}
.share-info {
    padding: 0 15px;
}
.share-info .info {
    color: #222;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.share-info .info .container {
    position: relative;
    display: inline-block;
}
.share-info .info2 {
    color: #222;
    text-align: center;
    margin-top: 15px;
}
.share-info .btn {
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: #F9421E;
    border-radius: 30px;
    color: #fff;
    margin-top: 10px;
}
.line-row {
    width: 100%;
    height: 1px;
    background-color: #dfdfdf;
    margin-top: 15px;
}
.other-share {
    background-color: #FFFAF1;
    padding: 15px 0;
}
.share-list {
    margin-top: 5px;
}
.share-list .item {
    display: flex;
    margin-bottom: 15px;
}
.share-list .item:last-child {
    margin-bottom: 0;
}
.share-list .item > div {
    flex: 1;
}
.share-list .item > div:nth-child(2) {
    flex: 1;
}
.share-list .item > div:nth-child(3) {
    flex: 1;
}
.share-list .item > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
}
.share-list .item > div:first-child img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
}
.share-list .item > div:nth-child(1) > div {
    width: 70px;
}
.share-list .item > div:nth-child(2) > div:nth-child(1) {
    color: #222222;
    font-size: 12px;
}
.share-list .item > div:nth-child(2) > div:nth-child(2) {
    color: #666666;
    font-size: 12px;
    height: 25px;
    text-align: center;
    position: relative;
}
.share-list .item > div:nth-child(2) > div:nth-child(2) .container {
    left: 0;
    margin: auto;
}
.share-list .item > div:nth-child(2) > div:nth-child(2) .container p {
    background-color: #fff;
    color: #666666;
}
.share-list .item > div:nth-child(3) {
    align-items: center;
    display: flex;
    justify-content: center;
}
.share-list .item > div:nth-child(3) span {
    display: inline-block;
    background-color: #F9421E;
    color: #fff;
    border-radius: 30px;
    width: 80%;
    text-align: center;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
}
.layer {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
}
.share-img {
    text-align: right;
    margin-top: 10%;
}
.share-img .iconfont.icon-share1 {
    font-size: 150px;
    color: #fff;
    margin-right: 30px;
}
.share-text {
    color: #fff;
    text-align: center;
}
.mint-popup.mint-popup-bottom {
    height: 480px;
    width: 100%;
    background-color: #fff;
}
.singleGoods-info {
    padding: 0 15px;
}
.singleGoods-info .title .img-box {
    width: 100px;
    position: relative;
}
.singleGoods-info .title .img-box img {
    width: 100%;
    position: absolute;
    z-index: 3;
    left: 0;
    top: -20px;
    border-radius: 8px;
    box-shadow: 1px 0 10px rgba(0,0,0,.2);
}
.singleGoods-info .title .sku-info-text {
    padding-left: 110px;
    color: "#666";
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid #dfdfdf;
    padding-bottom: 12px;
    padding-top: 10px;
}
.singleGoods-info .title .sku-info-text p {
    color: #666;
}
.singleGoods-info .title .sku-info-text p.prop {
    padding: 5px 0;
}
.singleGoods-info .title .sku-info-text p span {
    color: #666;
    margin-right: 5px;
}
.iconfont.icon-guanbi {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #999;
    font-size: 24px;
}
.quantity {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #dfdfdf;
    padding: 8px 0;
}
.done-btn {
    display: inline-block;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: #f9421e;
    color: #fff;
    border-radius: 18px;
}
.choose-sku {
    padding: 5px 10px;
}
.classification {
    padding: 5px 0;
    border-bottom: 1px solid #DFDFDF;
}
.classification span {
    font-size: 14px;
    display: inline-block;
    margin-bottom: 10px;
}
.Option-box {
    padding: 5px 0;
}
.Option-item {
    display: inline-block;
    padding: 5px 8px;
    border-radius: 4px;
    background-color: #DFDFDF;
    /* float: left; */
    margin-right: 10px;
}
.Option-item.active {
    background-color: #F9421E;
    color: #fff;
}
.disabled {
    color:#aaa;
}
.active {
    color: red;
}
.choose-arr {
    margin-right: 2px;
}
.chooseattr,.stock, .chooseattr span {
    color: #666;
}
.mint-popup.mint-popup-bottom {
    z-index: 999 !important;
}
.count-down {
    position: relative;
    height: 30px;
    padding-top: 15px;
    text-align: center;
}
.count-down .container {
    position: relative;
    display: inline-block;
}
</style>
