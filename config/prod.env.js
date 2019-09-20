'use strict'
var buildtype = process.argv.slice(2)[0]
var configObj = {}
switch (buildtype) {
  case 'test': //测试
    configObj = {
      BASE_API: '"http://api.com/thmartApi/"',
      BASE_API2: '"http://192.168.0.201:8090/api/v1/"'
    }
    break;
  case 'pro': //生产
    configObj = {
      NODE_ENV: '"production"',
      ENV_CONFIG: '"prod"',
      BASE_API: '"http://api.mall.thatsmags.com/thmartApi/"', // 10-17
      BASE_API2: '"http://api.thmart.com.cn/api/v1/"'
    }
    break;
}
module.exports = configObj
// module.exports = {
//   NODE_ENV: '"production"'
// }
