import Vue from 'vue'
Vue.config.productionTip = false
Vue.config.silent = true

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
