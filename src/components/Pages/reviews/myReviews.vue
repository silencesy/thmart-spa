<template>
    <div>
        <ScrollView class="scroll-container" ref="ScrollView" :height="height" color="#eee" :pullup="pullup" :data="data.data"  @pullingUp="getData">
            <ShopGoodsItem class="item" v-for="(item,index) in 10" :key="index" :shopData="data">
                <div slot="bottom" class="info-content">
                    <div>
                        Review:
                    </div>
                    <div>
                        评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
                    </div>
                </div>
            </ShopGoodsItem>
        </ScrollView>
    </div>
</template>
<script>
export default {
    name: 'myReviews',
    data() {
        return {
            data: 
                {
                    "brandName": "ThMart",
                    "total": 35,
                    "data": [
                        {
                            "skuId": "3026",
                            "skuPropName": {
                                "Type": [
                                    "C",
                                    167,
                                    "1"
                                ]
                            },
                            "goodsId": "1023",
                            "title": "Irish Festival Headband\u3010thDispatcher\u3011",
                            "type": "1",
                            "brandId": "16",
                            "brandName": "ThMart",
                            "pic": "http:\/\/api.mall.thatsmags.com\/Public\/ckfinder\/images\/home\/StPatricksDay%20\/Headband\/zhutu3.jpg",
                            "price": 35,
                            "number": "1",
                            "logistics": "0",
                            "company": "0",
                            "prop": {
                                "Type": [
                                    "C",
                                    167,
                                    "1"
                                ]
                            },
                            "goodsName": "Irish Festival Headband\u3010thDispatcher\u3011"
                        }
                    ]
                },
                pullup: true
         
        }
    },
    components: {
        ShopGoodsItem: r => { require.ensure([], () => r(require('../../BaseComponents/ShopGoodsItem')), 'ShopGoodsItem') },
        ScrollView: r => { require.ensure([], () => r(require('@/components/BaseComponents/ScrollView')), 'ScrollView') }
    },
    created() {
        var that = this;
        that.height = document.documentElement.clientHeight
    },
    methods: {
        getData() {
            console.log(123);
        }
    }
}
</script>
<style scoped>
    .scroll-container {
        padding-top: 10px;
    }
    .info-content {
        padding: 10px;
        background-color: #fff;
        font-size: 14px;
        color: #666;
    }
</style>


