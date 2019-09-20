'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  // BASE_API: '"http://api.com/thmartApi/"',
  BASE_API: '"http://api.mall.thatsmags.com/thmartApi/"',
  BASE_API2: '"http://192.168.0.201:8090/api/v1/"'
})
