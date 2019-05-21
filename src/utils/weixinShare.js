import wx from 'weixin-js-sdk';
export default {
    data() {
        return {
            signPackage: null
        }
    },
  mounted() {
    this.getWx();
  },
  methods: {
    getWx() {
        let that = this;
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
            var url = window.sessionStorage.getItem('href');
        } else {
            var url = window.location.href;
        }
        that.$http.post(that.urls.share, {
            url: url
          })
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
          debug: false, // 是否开启调试模式
          appId: that.signPackage.appId,
          timestamp: that.signPackage.timestamp,
          nonceStr: that.signPackage.nonceStr,
          signature: that.signPackage.signature,
          jsApiList: ['onMenuShareTimeline', //分享到朋友圈
            'onMenuShareAppMessage', //分享给朋友
            'onMenuShareQQ' //分享到QQ
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
          var url = window.location.href;
          var options = {
            title: 'thMart', // 分享标题
            link: encodeURI(url), // 分享链接，记得使用绝对路径
            imgUrl: encodeURI('http://api.mall.thatsmags.com/Public/ckfinder/images/logo.png'), // 分享图标，记得使用绝对路径
            desc: 'That’s making your life easier!', // 分享描述
            success: function () {
              console.info('分享成功！');
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              console.info('取消分享！');
              // 用户取消分享后执行的回调函数
            }
          }
          wx.onMenuShareTimeline(options); // 分享到朋友圈
          wx.onMenuShareAppMessage(options); // 分享给朋友
          wx.onMenuShareQQ(options); // 分享到QQ
        });
      },

  }
}