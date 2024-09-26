import * as consty from '@/datasourse/Const'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/login/LoginVue.vue')
    },
    {
      path: '/service',
      component: () => import('@/views/service/ServiceDefult.vue'),
      children: [
        {
          name: 'login-g',
          path: 'login',
          component: () => import('@/views/example13/GuardLogin.vue')
        },
        {
          path: 'user',
          component: () => import('@/views/example13/GuardUser.vue'),
          meta: {
            role: consty.USER
          }
        },
        {
          path: 'admin',
          component: () => import('@/views/example13/GuardAdmin.vue'),
          meta: {
            role: consty.ADMIN
          }
        },
        {
          //未匹配路由 (nomatch).处理没有明确匹配到其他子路由的情况
          name: 'nomatch',
          path: ':pathMatch(.*)*', // 如果是全局匹配，应加上`/`，/:pathMatch(.*)*
          redirect: { name: 'login-g' }
        }
      ]
    }
  ]
})

export default router
