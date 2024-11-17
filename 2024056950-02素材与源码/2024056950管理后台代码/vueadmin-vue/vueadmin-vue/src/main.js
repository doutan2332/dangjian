import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

//设置拦截后，引入自定义axios
import axios from './axios'
import global from './globalFun'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// require("./mock")

Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
