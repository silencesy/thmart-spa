import axios from 'axios'
import promise from 'es6-promise';
import { Toast, Indicator } from 'mint-ui'
import qs from 'qs'
import router from '../router/index'
promise.polyfill();
const Axios = axios.create({
    timeout: 10000,
    baseURL: process.env.BASE_API2,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "X-Requested-With": "XMLHttpRequest"
    }
});
//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
    config => {
        if (
            config.method === "post"
        ) {
            // 序列化
            config.data = qs.stringify(config.data);
            // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
        }

        // 若是有做鉴权token , 就给头部带上token
        // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
        if (localStorage.getItem('hxtoken')) {
            config.headers.Authorization = localStorage.getItem('hxtoken');

        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        if (res.headers.authorization) {
            window.localStorage.setItem('hxtoken', res.headers.authorization);
        }
        // 对响应的状态吗做统一处理
        if (res.data.data.token) {
            window.localStorage.setItem('hxtoken', res.data.data.token);
        }
        return Promise.resolve(res);
    },
    error => {
        if (error.response.headers.authorization) {
            window.localStorage.setItem('hxtoken', error.response.headers.authorization);
        }
        if (error.response.data.message) {
            Toast(error.response.data.message);
        }
        return Promise.reject(error);
    }
);


// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function (Vue, Option) {
        Object.defineProperty(Vue.prototype, "$http2", { value: Axios });
    }
};