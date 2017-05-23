import './require.js'
import Vue from 'vue'
import App from './App.vue'

import './stylesheets/bulma.sass'

new Vue({
  el: '#app',
  render: h => h(App)
})