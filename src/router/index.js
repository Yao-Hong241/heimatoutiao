// 路由配置

import VueRouter from 'vue-router'
import Vue from 'vue'

import login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import notfound from '@/views/NotFound'
import store from '@/store'
import article from '@/views/article'
import image from '@/views/image'
import publish from '@/views/publish'
import comment from '@/views/comment'
import fans from '@/views/fans'
import setting from '@/views/setting'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 登录
    { path: '/login', component: login },
    { path: '/',
      component: home,
      children: [
        { path: '/', component: welcome },
        { path: '/article', component: article },
        { path: '/image', component: image },
        { path: '/publish', component: publish },
        { path: '/comment', component: comment },
        { path: '/fans', component: fans },
        { path: '/setting', component: setting }
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
