import axios from 'axios'
import promise from 'es6-promise';
import { Toast, Indicator } from 'mint-ui'
import qs from 'qs'
import router from '../router/index'
promise.polyfill();
// 正服or测服
let isFormal = true;
// let isFormal = false;
let test = 'http://api.com/thmartApi/';
let formal = 'http://api.mall.thatsmags.com/thmartApi/';
const Axios = axios.create({
    timeout: 10000,
    baseURL: isFormal == true ? formal : test,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});
let showLoading;
//当请求异常，网络异常,返回异常时候进行提示
// function showError() {
//   Toast({
//     message: 'err',
//     iconClass: 'icon icon-success'
//   });
// };
//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
    config => {
        // 在发送请求之前做某件事
        showLoading = setTimeout(function() {
            // Indicator.open();
        }, 2000);

        if (
            config.method === "post"
        ) {
            // 序列化
            config.data = qs.stringify(config.data);
            // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
        }

        // 若是有做鉴权token , 就给头部带上token
        // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
        if (localStorage.getItem('token')) {
            config.headers.TOKEN = localStorage.getItem('token');
        }
        return config;
    },
    error => {
        // error 的回调信息,看贵公司的定义
        clearTimeout(showLoading);
        Indicator.close();
        return Promise.reject(error);
    }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        // 对响应的状态吗做统一处理
        if (res.status === 200) {
            // Indicator.close();
            // 未传token
            if (res.data.code == 100 || res.data.code == 101 || res.data.code == 102 || res.data.code == 103) {
                window.localStorage.removeItem("token");
                router.push({
                    path: "/Login"
                });
            }
            // 手机号已被注册
            if (res.data.code == 104) {
                Toast('This phone number has been registered!');
            }
            // 验证码发送次数过多，稍后再试
            if (res.data.code == 105) {
                Toast('Frequent operation, please try again later!');
            }
            // 验证码错误
            if (res.data.code == 106) {
                Toast('Verification code error!');
            }
            // 两次密码错误
            if (res.data.code == 107) {
                Toast('The two passwords you entered do not match!');
            }
            // 手机号未注册
            if (res.data.code == 109) {
                Toast('This phone number has not been registered yet!');
            }
            // 手机号登录密码错误
            if (res.data.code == 110) {
                Toast('The password is incorrect!');
            }
            // 手机号登录密码错误
            if (res.data.code == 113) {
                Toast('微信号已经注册');
            }
            // 手机号登录密码错误
            if (res.data.code == 114) {
                Toast('The quantity of goods selected exceeds the stock！');
            }
            // 手机号登录密码错误
            if (res.data.code == 117) {
                Toast('原始密码错误！');
            }
            // 该手机还已经绑定微信
            if (res.data.code == 120) {
                Toast('该手机还已经绑定微信！');
            }
            // 用户不能拼自己发起的单
            if (res.data.code == 123) {
              Toast('You cannot join group buys issued by yourself.');
            }
            // 用户48小时内不能对同一个商品发起两次拼单
            if (res.data.code == 124) {
              Toast('You cannot initiate two group buys for the same item within 48 hours.');
            }
            if (res.data.code == 0) {
                router.push({
                    path: "/error"
                });
            }
            // 如果返回token就设置token
            if (res.data.data && res.data.data.token) {
                localStorage.setItem('token', res.data.data.token);
            }
            if (res.data.code === 1) {
                clearTimeout(showLoading);
                Indicator.close();
                return Promise.resolve(res);

            } else {
                clearTimeout(showLoading);
                Indicator.close();
                return Promise.reject(res);
            }

        } else {
            // return res;
            // Indicator.close();
            clearTimeout(showLoading);
            Indicator.close();
            Toast({
                message: 'err',
                iconClass: 'icon icon-success'
            });
            return Promise.reject(res);
        }
    },
    error => {
        router.push({
            path: "/error"
        });
        // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
        // 直接丢localStorage或者sessionStorage
        // if (!window.localStorage.getItem("loginUserBaseInfo")) {
        //   // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
        //   router.push({
        //     path: "/login"
        //   });
        // } else {
        //   // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
        //   // 乖乖的返回去登录页重新登录
        //   let lifeTime =
        //     JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
        //     1000;
        //   let nowTime = new Date().getTime(); // 当前时间的时间戳
        //   console.log(nowTime, lifeTime);
        //   console.log(nowTime > lifeTime);
        //   if (nowTime > lifeTime) {
        //     Message({
        //       showClose: true,
        //       message: "登录状态信息过期,请重新登录",
        //       type: "error"
        //     });
        //     router.push({
        //       path: "/login"
        //     });
        //   } else {
        //     // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
        //     if (error.response.status === 403) {
        //       router.push({
        //         path: "/error/403"
        //       });
        //     }
        //     if (error.response.status === 500) {
        //       router.push({
        //         path: "/error/500"
        //       });
        //     }
        //     if (error.response.status === 502) {
        //       router.push({
        //         path: "/error/502"
        //       });
        //     }
        //     if (error.response.status === 404) {
        //       router.push({
        //         path: "/error/404"
        //       });
        //     }
        //   }
        // }
        // // 返回 response 里的错误信息
        // let errorInfo =  error.data.error ? error.data.error.message : error.data;
        // Indicator.close();
        clearTimeout(showLoading);
        Indicator.close();
        return Promise.reject(error);
    }
);


// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function(Vue, Option) {
        Object.defineProperty(Vue.prototype, "$http", { value: Axios });
    }
};