<template>
    <div v-if="couponData">
        <img class="banner" :src="couponData.mpic" alt="">
        <div class="list">
            <div class="item" v-for="(item,index) in couponData.data" :key="index">
                <img class="item-img" :src="item.pic" alt="">
                <img class="received" v-if="item.isdiscount == 1" src="static/images/conpous/lingqu.png" alt="">
                <button 
                    v-if="item.isdiscount == 0"
                    @click="bindGetCoupon(item.id,index)"
                    class="coupon-btn">Get Now</button>
                <button 
                    v-if="item.isdiscount == 1"
                    @click="bindUseCoupon(item.id)"
                    class="coupon-btn">Use Now</button>
            </div>
        </div>
        <div class="text-content">
            <div class="title">
                Coupon rule:
            </div>
            <div class="text" v-html="couponData.detail">
               
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            couponData: null
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            var that = this;
            that.$http.post(this.urls.discountlist)
            .then(function (response) {
                console.log(response);
                that.couponData = response.data.data
            });
        },
        // 领取优惠券
        bindGetCoupon(couponId,index) {
            let that = this;
            if (!that.getToken()) {
                that.setlocalStorage("goback",window.location.href);
                that.$router.push({name: 'Login'});
            } else {
                that.$http.post(that.urls.getCoupon,{id:couponId})
                .then(function (response) {
                    that.couponData.data[index].isdiscount = 1;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        // 优惠券列表页 
        bindUseCoupon(id) {
            this.$router.push({path: '/CouponsGoods',query:{id: id}})
            // this.$router.push({name: 'userCenter-coupons-id',params: {id: id}});
        }
    }
}
</script>
<style scoped>
.banner {
    width: 100%;
    height: auto;
}
.list {
    padding: 10px;
}
.item {
    position: relative;
    margin-bottom: 10px;
}
.item:last-child {
    margin-bottom: 0;
}
.item .item-img {
    width: 100%;
    display: block;
    height: auto;
}
.item .received {
    position: absolute;
    right: 19%;
    top: 14%;
    width: 20%;
    height: auto;
}
.coupon-btn {
    position: absolute;
    right: 2.5%;
    bottom: 18%;
    background-color: #F9421E;
    color: #fff;
    border: 0;
    outline: none;
    padding: 3px 6px;
    border-radius: 8px;
    font-size: 14px;
}
.text-content {
    padding: 10px;
}
.text-content .title {
    color: #555555;
    font-size: 14px;
    margin-bottom: 10px;
}
.text-content .text {
    color: #666;
    font-size: 14px;
    line-height: 20px;
}
</style>


