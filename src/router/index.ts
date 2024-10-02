import * as consty from '@/services/Const'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/LoginVue.vue')
  },

  {
    path: '/',
    component: () => import('@/views/main/IndexView.vue'),
    meta: {
      roles: [consty.USER, consty.ADMIN]
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/main/admin/IndexView.vue'),
        meta: {
          roles: [consty.ADMIN]
        }
      },
      {
        path: 'user',
        component: () => import('@/views/main/user/IndexView.vue'),
        meta: {
          roles: [consty.USER]
        }
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/main/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/main/AboutView.vue')
  },
  {
    path: '/library',
    //component: () => import('@/views/service/ServiceDefult.vue'),
    children: [
      {
        path: 'defult',
        name: 'defult',
        component: () => import('@/views/main/defult/LibraryDefult.vue'),
        meta: {}
      },
      {
        path: 'user',
        component: () => import('@/views/main/user/LibraryUser.vue'),
        meta: {
          role: consty.USER
        }
      },
      {
        path: 'admin',
        component: () => import('@/views/main/admin/LibraryAdmin.vue'),
        meta: {
          role: consty.ADMIN
        }
      },
      {
        //未匹配路由 (nomatch).处理没有明确匹配到其他子路由的情况
        name: 'nomatch',
        path: ':pathMatch(.*)*', // 全局匹配 /:pathMatch(.*)*
        redirect: { name: 'home' }
      }
    ]
  }
]
const router = createRouter({
  // HTML5 Mode。createWebHistory()函数，生产环境下需要web容器完成转发
  // createWebHashHistory()函数仍使用#符号，无需配置
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: routes
})
// router.beforeEach((to, from) => {
//   if (to.meta.role == sessionStorage.getItem('role') || !to.meta.role) {
//     return true
//   } else {
//     createAlertDialog('无权限')
//     return { name: 'defult' }
//   }
// })
export default router
