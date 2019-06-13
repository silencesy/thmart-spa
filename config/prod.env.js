'use strict'
var buildtype = process.argv.slice(2)[0]
var configObj = {}
switch (buildtype) {
  case 'test': //测试
    configObj = {
      BASE_API: '"http://api.com/thmartApi/"'
    }
    break;
  case 'pro': //生产
    configObj = {
      NODE_ENV: '"production"',
      ENV_CONFIG: '"prod"',
      BASE_API: '"http://api.mall.thatsmags.com/thmartApi/"', // 10-17
    }
    break;
}
module.exports = configObj
// module.exports = {
//   NODE_ENV: '"production"'
// }
