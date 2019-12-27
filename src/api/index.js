// 提供一个配置好的axios，导出给main.js使用
import axios from 'axios'
import store from '@/store'
import router from '@/router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios.defaults.headers.Authorization = `Bearer${store.getUser().token}`

// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer${store.getUser().token}`
  return config
}, err => {
  Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(res => res,
  err => {
    if (err.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  })

export default axios
