import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from '@/api'
import '@/styles/index.less'
// 使用自己的插件
import plugin from '@/plugin'
Vue.use(plugin)
Vue.prototype.$http = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({

  router,
  render: h => h(App)
}).$mount('#app')
