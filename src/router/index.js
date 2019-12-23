// 路由配置

import VueRouter from 'vue-router'
import Vue from 'vue'

import login from '@/views/login'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 登录
    { path: '/login', component: login }
  ]
})

export default router
