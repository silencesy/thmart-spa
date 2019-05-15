<template>
    <div>
        <button open-type="share" @click="onMenuShareAppMessage">onMenuShareAppMessage</button>
        <button open-type="share" @click="weixinSendAppMessage">weixinSendAppMessage</button>
        <BottomBar />
    </div>
</template>
<script>
import wx from 'weixin-js-sdk';
export default {
    data() {
        return {
            params: {}
        }
    },
    components: {
        BottomBar: r => { require.ensure([], () => r(require('../BaseComponents/BottomBar')), 'BottomBar') },
    },
    created() {
        this.getData();
        
    },
    methods: {
        getData() {
            let that = this;
            let url = window.location.href;
            that.$http.post('http://api1.mall.thatsmags.com/Api/Wx/wxShare',{
                url: url
            })
            .then(function (response) {
                console.log(response);
                that.params = response.data.data;
                that.wxInint(that.params.signPackage);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        wxInint(signPackage) {
            wx.config({
                debug: true,
                appId: signPackage.appId,
                timestamp: signPackage.timestamp,
                nonceStr: signPackage.nonceStr,
                signature: signPackage.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                ]
            });
        },
        onMenuShareAppMessage() {
            console.log(123);
            wx.onMenuShareAppMessage({
                title: '互联网之子',
                link: 'http://mob.thmart.com.cn',
                imgUrl: 'http://api.mall.thatsmags.com/Public/ckfinder/images/Coupon/Travel/suzhou/zhutu.jpg',
                desc: "Let's Eat, Play & Pray!",
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    console.log('用户点击分享到朋友圈');
                },
                success: function (res) {
                    console.log('已分享');
                },
                cancel: function (res) {
                    console.log('已取消');
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                }
            });
        },
    }
}
</script>
<style scoped>

</style>
