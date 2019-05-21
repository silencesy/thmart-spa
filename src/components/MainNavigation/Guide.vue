<template>
  <div>
    <div class="top-row">
      <div @click="showDestination">
        <span v-if="!activeDestination">Destination</span> <span v-else>{{activeDestination}}</span> <i class="iconfont icon-jiantou-copy-copy"></i>
      </div>
      <div>
        <Sort ref="Sort" @Sort="Sort" hideItem="sale"/>
      </div>
    </div>
    <ScrollView ref="ScrollView" :height="height" color="#fff" :pullup="pullup" :data="goodsList"  @pullingUp="getGoodsData">
      <GoodsRow  :goodsData="goodsList" :Columns="2"/>
    </ScrollView>
    <BottomBar active="2" />
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
import wxMixin from '../../utils/weixinShare.js';
export default {
  mixins: [wxMixin],
  data() {
    return {
      closeOnClickModal: false,
      showToolbar: true,
      popupVisible: false,
      pullup: true,
      height: 0,
      activeDestination: '',
      categoryList: [],
      goodsList: [],
      slots: [{
          values: [],
        }
      ],
      indirectValue: {

      }, //间接选中区域地址值 只有确认的时候才获取数据
      params: {
        catOneId: 160,
        catTwoId: 161,
        catThreeId: '',
        page: 0,
        pageSize: 20,
        sort: 'createTime_desc',
        totalPage: -1
      }
    }
  },
  components: {
    BottomBar: r => { require.ensure([], () => r(require('../BaseComponents/BottomBar')), 'BottomBar') },
    Sort: r => { require.ensure([], () => r(require('../BaseComponents/Sort')), 'Sort') },
    ScrollView: r => { require.ensure([], () => r(require('../BaseComponents/ScrollView')), 'ScrollView') },
    GoodsRow: r => { require.ensure([], () => r(require('../BaseComponents/GoodsRow')), 'GoodsRow') },
  },
  created() {
    let that = this;
    that.getCategory();
    that.getGoodsData();
    that.$nextTick(() => {
      setTimeout(function(){
        that.height = document.documentElement.clientHeight-55-40;
      },20);
    });
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
      this.params.catThreeId = this.indirectValue.id;
      this.popupVisible = false;
      this.initPara(this.params.sort);
      this.getGoodsData();
    },
    showDestination() {
      this.popupVisible = true;
    },
    checkArr(id) {
      if(id == 'all') {
        this.params.catThreeId = '';
      } else {
        this.params.catThreeId = id;
      }
      this.initPara(this.params.sort);
      this.getGoodsData();
    },
    Sort(data) {
      console.log(data);
      this.initPara(data);
      this.getGoodsData();
    },
    getCategory() {
      var that = this;
      that.$http.post(this.urls.exploreChina,{fname: 161})
      .then(function (response) {
        console.log(response)
        that.categoryList = response.data.data;
        that.setSlots(that.categoryList);
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
    // 获取数据
    getGoodsData() {
      var that = this;
      let params = that.params;
      params.page++;
      that.$http.post(this.urls.goodsList,params)
      .then(function (response) {
        console.log(response);
        that.goodsList = that.goodsList.concat(response.data.data.data);
        if (response.data.data.totalPage == 0 || that.params.page >= response.data.data.totalPage) {
          that.$refs.ScrollView.endup();
        }
        that.params.totalPage = response.data.data.totalPage;
      });
    },
    // 初始化参数
    initPara(index) {
      this.params.page = 0;
      this.params.sort = index;
      this.goodsList = [];
      this.params.totalPage = -1;
      this.$refs.ScrollView.scrollTo(0,0,0,'easing');
      this.$refs.ScrollView.startup();
    }
  }
}
</script>
<style scoped>
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
    width: 40%;
    text-align: center;
    line-height: 40px;
  }
  .top-row > div:nth-child(2) {
    width: 60%;
  }
  .mint-popup.mint-popup-bottom {
    width: 100%;
  }

</style>
