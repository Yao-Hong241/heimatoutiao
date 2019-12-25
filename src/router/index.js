// 路由配置

import VueRouter from 'vue-router'
import Vue from 'vue'

import login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import notfound from '@/views/NotFound'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 登录
    { path: '/login', component: login },
    { path: '/',
      component: home,
      children: [
        { path: '/', component: welcome }
      ]
    },
    { path: '*', component: notfound }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
