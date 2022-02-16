import Vue from 'vue'
import App from './App.vue'

// 导入路由模块
import router from './router'

// 导入 axios
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入 Loading 组件
import { Loading } from 'element-ui'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 全局过滤器
Vue.filter('dateFormat', (dateStr) => {
  const dt = new Date(dateStr)

  const y = padZero(dt.getFullYear())
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())

  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// 是一位数 前面补0
function padZero(n) {
  return n > 9 ? n : '0' + n
}

// 全局配置 axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios

let loadingInstance = null
// 声明请求拦截器
axios.interceptors.request.use((config) => {
  // 展示 Loading 效果
  loadingInstance = Loading.service({ fullscreen: true })
  return config
})

// 声明响应拦截器
axios.interceptors.response.use((response) => {
  // 关闭 Loading 效果
  loadingInstance.close()
  return response
})

new Vue({
  render: (h) => h(App),
  // 挂载路由
  router
}).$mount('#app')
