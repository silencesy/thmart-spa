<template>
	<div class="GoodsList GoodsList-container-class">
		<SearchTop />
    <div class="top-row">
      <div @click="showDestination">
        <span>{{activeDestination?indirectValue.value:"All"}}</span> <i class="iconfont icon-jiantou-copy-copy"></i>
      </div>
      <div>
        <Sort ref="Sort" @Sort="Sort"/>
      </div>
    </div>
		<ScrollView ref="ScrollView" :height="screenHeight-90" :pullup="pullup" :data="goodsList"  @pullingUp="loadData">
      <GoodsRow  :goodsData="goodsList" :Columns="2"/>
    </ScrollView>

    <mt-popup
      v-model="popupVisible"
      position="bottom" :closeOnClickModal="closeOnClickModal">
      <mt-picker :slots="slots"  :showToolbar="showToolbar" @change="onValuesChange">
        <slot>
          <div class="popup-title">
            <span @click="cancelDestination">Cancel</span>
            <span class="theme_color" @click="confirmDestination">Confirm</span>
          </div>
        </slot>
      </mt-picker>
    </mt-popup>

	</div>
</template>
<script>
  import wxMixin from '../../../utils/weixinShare.js';
	export default {
    name: 'GoodsList',
    mixins: [wxMixin],
		data() {
			return {
        closeOnClickModal: false,
        showToolbar: true,
        popupVisible: false,
        slots: [{
            values: [],
          }
        ],
        activeDestination: '',
        categoryList: [],
        indirectValue: {

        },


				goodsList: [],
				pullup: true,
				parameter: {
          catOneId: this.$route.query.id,
          catTwoId: '', 
					page: 0,
					pageSize: 20,
					sort: 'createTime_desc'
				}
			}
		},
		components: {
			SearchTop: r => { require.ensure([], () => r(require('../../BaseComponents/SearchTop')), 'SearchTop') },
			Sort: r => { require.ensure([], () => r(require('../../BaseComponents/Sort')), 'Sort') },
			GoodsRow: r => { require.ensure([], () => r(require('../../BaseComponents/GoodsRow')), 'GoodsRow') },
			ScrollView: r => { require.ensure([], () => r(require('../../BaseComponents/ScrollView')), 'ScrollView') },
		},
		mounted() {
			this.loadData();
		},
		methods: {

      onValuesChange(picker, values) {
        this.categoryList.forEach(element => {
        if(values == element.title) {
          this.indirectValue.value = element.title;
          this.indirectValue.id = element.id;
        } else if (values == 'All') {
          this.indirectValue.value = '';
          this.indirectValue.id = '';
        }
      });
      },
      cancelDestination() {
        this.popupVisible = false;
      },
      confirmDestination() {
        this.activeDestination = this.indirectValue.value;
        this.parameter.catTwoId = this.indirectValue.id;
        this.popupVisible = false;
        this.initPara();
        this.loadData();
      },

      showDestination() {
        this.popupVisible = true;
      },
      // 获取数据
      getGoodsData() {
        var that = this;
        // console.log({id: that.categoryActive,page: that.page,pageSize: that.pageSize,sort: that.sort});
        
        that.$http.post(this.urls.goodsList,{
          catOneId: that.categoryActive,
          catTwoId: that.categoryActiveChild, 
          page: ++that.page,
          pageSize: that.pageSize,
          sort: that.sort
        })
        .then(function (response) {
          console.log(response);
          that.goodsList = that.goodsList.concat(response.data.data.data);
          if (response.data.data.totalPage == 0 || that.page >= response.data.data.totalPage) {
            that.$refs.ScrollView.endup();
          }
          that.totalPage = response.data.data.totalPage;
        });
      },
			loadData() {
				var that = this;
				that.parameter.page++; 
				that.$http.post(this.urls.goodsList,that.parameter)
				.then(function (response) {
					if (response.data.data.totalPage == 0 || that.parameter.page >= response.data.data.totalPage) {
			          that.$refs.ScrollView.endup();
              }
          that.categoryList = response.data.data.typelist;
          that.setSlots(response.data.data.typelist);
					that.goodsList = that.goodsList.concat(response.data.data.data);
				});
      },
      setSlots(data) {
        let slots = [{
            values: ['All']
          }
        ];
        data.forEach(element => {
          slots[0].values.push(element.title);
        });
        this.slots = slots;
      },
			// 改变排序
		    Sort(data) {
		      this.parameter.sort = data;
		      this.initPara();
		      this.loadData();
		    },
		    initPara () {
		    	this.parameter.page = 0;
		    	this.goodsList = [];
		    	this.$refs.ScrollView.scrollTo(0,0,0,'easing');
      			this.$refs.ScrollView.startup();
		    }
		}
	}
</script>
<style scoped>
	.line {
		width: 100%;
		height: 1px;
		background-color: #dfdfdf;
	}
  .top-row {
    background-color: #fff;
    font-size: 12px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
  }
  .top-row > div {
    float: left;
  }
  .top-row > div:nth-child(1) {
    width: 36%;
    text-align: center;
    line-height: 40px;
    /* display:-webkit-box;
    overflow:hidden;
    white-space:normal!important;
    text-overflow:ellipsis;
    word-wrap:break-word;
    -webkit-line-clamp:1;
    -webkit-box-orient:vertical; */
  }
  .top-row > div:nth-child(1) span {
    max-width: 77%;
    min-width: 40%;
    display:-webkit-box;
    overflow:hidden;
    white-space:normal!important;
    text-overflow:ellipsis;
    word-wrap:break-word;
    -webkit-line-clamp:1;
    /*! autoprefixer: off */
    -webkit-box-orient:vertical;
    /* autoprefixer: on */
    float: left;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 1px solid #F9421E;
    margin-left: 15px;
  }
  .top-row > div:nth-child(1) i {
    float: left;
  }
  .top-row > div:nth-child(2) {
    width: 60%;
  }
  .mint-popup.mint-popup-bottom {
    width: 100%;
  }
  .popup-title {
    height: 40px;
    line-height: 40px;
    display: flex;
    padding: 0 30px;
    justify-content: space-between;
    border-bottom: 1px solid #dfdfdf;
  }
  .Destination {
    height: 50px;
    line-height: 50px;
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #dfdfdf;
    padding: 0 10px;
    overflow: auto;
  }
  .Destination span {
    padding: 0 10px;
    position: relative;
    font-size: 16px;
  }
  .Destination span.active {
    color: #F9421E;
  }
  .Destination span.active:after {
		position: absolute;
		top: auto;
	    bottom: 0px;
	    left: 0;
	    right: 0;
	    margin: auto;
	    content:"";
	    background-color: #F9421E;
	    font-weight:bold;
	    width: 35px;
	    height: 2px;
	}
</style>