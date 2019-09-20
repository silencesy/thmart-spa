// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

// axios封装（请求拦截 响应拦截 错误统一处理）
import http from "./utils/http"

// 自定义工具库
import utils from "./utils/utils"

import httptwo from "./utils/httpTwo"

// api地统一址入口
import urls from "./utils/interface"
Vue.use(urls);
Vue.use(http);
Vue.use(httptwo);
Vue.use(utils);

// 剪切板插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

//fastClick (消除移动端300毫秒延迟)
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

// 图片放大功能
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview);

// 监听浏览器后退
window.addEventListener("popstate", function(e) {
    router.fallback = true;
}, false);


// 轮播
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// mint-ui框架
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
        preLoad: 1.3,
        error: 'http://proj6.thatsmags.com/Public/ckfinder/images/lazyimg.png',
        loading: 'http://proj6.thatsmags.com/Public/ckfinder/images/lazyimg.png',
        attempt: 1
    })
    // 图片懒加载
Vue.use(Mint);

// rem
import 'lib-flexible/flexible.js'
Vue.config.productionTip = false

Vue.mixin({
    data() {
        return {
            screenWidth: document.documentElement.clientWidth || 0,
            screenHeight: document.documentElement.clientHeight,
        }
    },
    methods: {
        go(url) {
            this.$router.push(url)
        },
        back(url) {
            this.$router.back()
        },
        //返回首页
        toHome() {
            router.goBack("/")
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})