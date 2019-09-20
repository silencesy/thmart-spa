import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function() {
    this.isBack = true;
    window.history.go(-1);
}
Vue.use(Router)

var router = new Router({
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            console.log(to.meta);
            setTimeout(() => {
                if (savedPosition) {
                    resolve(savedPosition);
                } else {
                    resolve({
                        x: 0,
                        y: 0
                    })
                }
            }, 100);
        })
    },
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/MainNavigation/Home')), 'Home')
            }
        },
        {
            path: '/Categories',
            name: 'Categories',
            meta: {
                keepAlive: true,
                isUseCache: false
            },
            // component: Categories
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/MainNavigation/Categories')), 'Categories')
            }
        },
        {
            path: '/Guide',
            name: 'Guide',
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/MainNavigation/Guide')), 'Guide')
            }
        },
        {
            path: '/Cart',
            name: 'Cart',
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/MainNavigation/Cart')), 'Cart')
            }
        },
        {
            path: '/MyAccount',
            name: 'MyAccount',
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/MainNavigation/MyAccount')), 'MyAccount')
            }
        },
        {
            path: "/HomeSearch",
            name: "HomeSearch",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Search/HomeSearch')), 'HomeSearch')
            }
        },
        {
            path: "/GoodsDetails",
            name: "GoodsDetails",
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/GoodsDetails/GoodsDetails')), 'GoodsDetails')
            }
        },
        {
            path: "/CouponsList",
            name: "CouponsList",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Coupons/CouponsList')), 'CouponsList')
            }
        },
        {
          path: "/getCoupon",
          name: "getCoupon",
          meta: {
            keepAlive: false,
            MustLogin: false
          },
          component(resolve) {
            require.ensure([], () => resolve(require('@/components/Pages/Coupons/getCoupon')), 'getCoupon')
          }
        },
        {
            path: "/WishList",
            name: "WishList",
            meta: {
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/WishList/WishList')), 'WishList')
            }
        },
        {
            path: "/AddressBook",
            name: "AddressBook",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Address/AddressBook')), 'AddressBook')
            }
        },
        {
            path: "/Contact",
            name: "Contact",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Contact/Contact')), 'Contact')
            }
        },
        {
            path: "/CouponsGoods",
            name: "CouponsGoods",
            meta: {
                keepAlive: false,
                MustLogin: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Coupons/CouponsGoods')), 'CouponsGoods')
            }
        },
        {
            path: "/Login",
            name: "Login",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Login/Login')), 'Login')
            }
        },
        {
            path: "/OrderConfirmation",
            name: "OrderConfirmation",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Order/OrderConfirmation')), 'OrderConfirmation')
            }
        },
        {
            path: "/Pay",
            name: "Pay",
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Pay/Pay')), 'Pay')
            }
        },
        {
            path: "/Unpaid",
            name: "Unpaid",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Pay/Unpaid')), 'Unpaid')
            }
        },
        {
            path: "/Paid",
            name: "Paid",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Pay/Paid')), 'Paid')
            }
        },
        {
            path: "/ArticleDetail",
            name: "ArticleDetail",
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Article/ArticleDetail')), 'ArticleDetail')
            }
        },
        {
            path: "/AddAddress",
            name: "AddAddress",
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Address/AddAddress')), 'AddAddress')
            }
        },
        {
            path: "/SignUp",
            name: "SignUp",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Login/SignUp')), 'SignUp')
            }
        },
        {
            path: "/RePassword",
            name: "RePassword",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Login/RePassword')), 'RePassword')
            }
        },
        {
            path: "/ForgotPassword",
            name: "ForgotPassword",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Login/ForgotPassword')), 'ForgotPassword')
            }
        },
        {
            path: "/BindMobile",
            name: "BindMobile",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Login/BindMobile')), 'BindMobile')
            }
        },
        {
          path: "/thatsBindMobile",
          name: "thatsBindMobile",
          meta: {
            keepAlive: true
          },
          component(resolve) {
            require.ensure([], () => resolve(require('@/components/Pages/Login/thatsBindMobile')), 'thatsBindMobile')
          }
        },
        {
            path: "/GoodsList",
            name: "GoodsList",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/GoodsList/GoodsList')), 'GoodsList')
            }
        },
        {
          path: "/CategoriesGoodsList",
          name: "CategoriesGoodsList",
          meta: {
            keepAlive: false
          },
          component(resolve) {
            require.ensure([], () => resolve(require('@/components/Pages/GoodsList/CategoriesGoodsList')), 'CategoriesGoodsList')
          }
        },
        {
            path: "/groupBuying",
            name: "groupBuying",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/groupBuying/groupBuying')), 'groupBuying')
            }
        },
        {
            path: "/ShopHome",
            name: "ShopHome",
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Shop/ShopHome')), 'ShopHome')
            }
        },
        {
            path: "/Invest",
            name: "Invest",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Invest/Invest')), 'Invest')
            }
        },
        {
            path: "/InvestEn",
            name: "InvestEn",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Invest/InvestEn')), 'InvestEn')
            }
        },
        {
            path: "/Cost",
            name: "Cost",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Invest/Cost')), 'Cost')
            }
        },
        {
            path: "/CostEn",
            name: "CostEn",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Invest/CostEn')), 'CostEn')
            }
        },
        {
            path: "/CaseFirst",
            name: "CaseFirst",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Invest/CaseFirst')), 'CaseFirst')
            }
        },
        {
            path: "/CaseSecond",
            name: "CaseSecond",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Invest/CaseSecond')), 'CaseSecond')
            }
        },
        {
            path: "/CaseThird",
            name: "CaseThird",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Invest/CaseThird')), 'CaseThird')
            }
        },
        {
            path: "/CaseFirstEn",
            name: "CaseFirstEn",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Invest/CaseFirstEn')), 'CaseFirstEn')
            }
        },
        {
            path: "/CaseSecondEn",
            name: "CaseSecondEn",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Invest/CaseSecondEn')), 'CaseSecondEn')
            }
        },
        {
            path: "/CaseThirdEn",
            name: "CaseThirdEn",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Invest/CaseThirdEn')), 'CaseThirdEn')
            }
        },
        {
            path: "/AddressTest",
            name: "AddressTest",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Address/AddressTest')), 'AddressTest')
            }
        },
        {
            path: "/ShopGoodsList",
            name: "ShopGoodsList",
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Shop/ShopGoodsList')), 'ShopGoodsList')
            }
        },
        {
            path: "/ShopSearch",
            name: "ShopSearch",
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Shop/ShopSearch')), 'ShopSearch')
            }
        },
        {
            path: "/ShopList",
            name: "ShopList",
            meta: {
                keepAlive: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Shop/ShopList')), 'ShopList')
            }
        },
        {
            path: "/PersonalInfo",
            name: "PersonalInfo",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/PersonalInfo/PersonalInfo')), 'PersonalInfo')
            }
        },
        {
            path: "/OrderDetailsPaid",
            name: "OrderDetailsPaid",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Order/OrderDetailsPaid')), 'OrderDetailsPaid')
            }
        },
        {
            path: "/OrderDetailsUnpaid",
            name: "OrderDetailsUnpaid",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Order/OrderDetailsUnpaid')), 'OrderDetailsUnpaid')
            }
        },
        {
            path: "/OrderDetailsInProress",
            name: "OrderDetailsInProress",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Order/OrderDetailsInProress')), 'OrderDetailsInProress')
            }
        },
        {
            path: "/OrderDetailsDelivered",
            name: "OrderDetailsDelivered",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Order/OrderDetailsDelivered')), 'OrderDetailsDelivered')
            }
        },
        {
            path: "/OrderList",
            name: "OrderList",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Order/OrderList')), 'OrderList')
            }
        },
        {
            path: "/alipay",
            name: "alipay",
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Pay/alipay')), 'alipay')
            }
        },
        {
            path: "/logistics",
            name: "logistics",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/Logistics/Logistics')), 'logistics')
            }
        },
        {
            path: "/error",
            name: "error",
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/error/error')), 'error')
            }
        },
        {
            path: "/reviewsList",
            name: "reviewsList",
            meta: {
                keepAlive: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/reviews/reviewsList')), 'reviewsList')
            }
        },
        {
            path: "/myReviews",
            name: "myReviews",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/reviews/myReviews')), 'myReviews')
            }
        },
        {
            path: "/addReviews",
            name: "addReviews",
            meta: {
                keepAlive: false,
                MustLogin: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/reviews/addReviews')), 'addReviews')
            }
        },
        {
            path: "/test",
            name: "test",
            meta: {
                keepAlive: false,
                MustLogin: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/test')), 'test')
            }
        },
        {
            path: "/shareShow",
            name: "shareShow",
            meta: {
                keepAlive: false,
                MustLogin: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/SharePurchase/ShareShow')), 'ShareShow')
            }
        },
        {
            path: "/hx",
            name: "hx",
            meta: {
                keepAlive: false,
                MustLogin: false
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/components/Pages/reviewConsumption/hx')), 'hx')
            }
        }
    ]
})
// 如果去的页面必须登录
router.beforeEach((to, from, next) => {
    if(to.query.token) {
        localStorage.setItem("token", to.query.token);
    }
    if (to.meta.MustLogin) {
        var token = localStorage.getItem("token") || null;
        if (token) {
            next();
        } else {
            localStorage.setItem('goback', window.location.href);
            next('/Login');
        }
    } else {
        next();
    }
})
export default router;