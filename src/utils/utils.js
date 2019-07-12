Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.distinct = function() {
    var arr = this,
        result = [],
        i,
        j,
        len = arr.length;
    for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
                j = ++i;
            }
        }
        result.push(arr[i]);
    }
    return result;
}

exports.install = function(Vue, options) {
    Vue.prototype.findElem = function(arrayToSearch, attr, val) {
            for (var i = 0; i < arrayToSearch.length; i++) {
                if (arrayToSearch[i][attr] == val) {
                    return true;
                }
            }
            return false;
        },

        Vue.prototype.arrayUnique2 = function(arr, name) {
            var hash = {};
            return arr.reduce(function(item, next) {
                hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
                return item;
            }, []);
        },
        // 设置token
        Vue.prototype.setToken = function(token) {
            localStorage.setItem('token', token);
        },
        // 删除token
        Vue.prototype.removeToken = function() {
            localStorage.removeItem('token');
        },
        // 获取token
        Vue.prototype.getToken = function() {
            var token = localStorage.getItem('token') || null;
            return token;
        }
        // 获取token
    Vue.prototype.loginCallBack = function(response) {
            if (response.data.data.token) {
                // this.setToken(response.data.data.token);
                var path = localStorage.getItem("goback");
                var token = localStorage.getItem("token");
                if (path) {
                    if (path.indexOf('urban-family.com') != -1 || path.indexOf('urfamily') != -1) {
                        if (path.indexOf('?') != -1) {
                            window.location.href = path + '&token=' + token;
                        } else {
                            window.location.href = path + '?token=' + token;
                        }
                        localStorage.removeItem("goback");
                    } else {
                        window.location.replace(localStorage.getItem("goback"));
                        localStorage.removeItem("goback");
                    }
                    
                } else {
                    this.$router.replace('/');
                }
            }
        },
        // 设置token
        Vue.prototype.setlocalStorage = function(key, value) {
            localStorage.setItem(key, value);
        }
        // 判断正服务器或者测试服务器
    Vue.prototype.formalTest = function(arr, name) {
        var url = window.location.href;
        var apiAddr;
        // console.log(url.indexOf('http://mob.thmart.com.cn/'));
        if (url.indexOf('http://mob.thmart.com.cn/') == -1) {
            apiAddr = 'proj6.thatsmags.com/thmartApi/';
        } else {
            apiAddr = 'api.mall.thatsmags.com/thmartApi/';
        }
        return apiAddr;
    }

    // 是否为微信浏览器
    Vue.prototype.isWeiXin = function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
};