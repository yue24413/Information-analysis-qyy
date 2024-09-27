import { createAlertDialog } from '@/components/message'
import * as consty from '@/datasourse/Const'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const routes: RouteRecordRaw[] = [
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
    path: '/service',
    //component: () => import('@/views/service/ServiceDefult.vue'),
    children: [
      {
        path: 'defult',
        name: 'defult',
        component: () => import('@/views/service/ServiceDefult.vue'),
        meta: { role: consty.DEFUlT }
      },
      {
        path: 'user',
        component: () => import('@/views/service/ServiceUser.vue'),
        meta: {
          role: consty.USER
        }
      },
      {
        path: 'admin',
        component: () => import('@/views/service/ServiceAdmin.vue'),
        meta: {
          role: consty.ADMIN
        }
      },
      {
        //未匹配路由 (nomatch).处理没有明确匹配到其他子路由的情况
        name: 'nomatch',
        path: '/:pathMatch(.*)*', // 全局匹配 /:pathMatch(.*)*
        redirect: { name: 'home' }
      }
    ]
  }
]
const router = createRouter({
  // HTML5 Mode。createWebHistory()函数，生产环境下需要web容器完成转发
  // createWebHashHistory()函数仍使用#符号，无需配置
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from) => {
  if (to.meta.role == sessionStorage.getItem('role') || !to.meta.role) {
    return true
  } else {
    createAlertDialog('无权限')
    sessionStorage.setItem('redirectTo', to.fullPath) // 记录当前路由
    return { name: 'defult' }
  }
})
export default router
