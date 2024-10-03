import { createAlertDialog } from '@/components/message/index'
import { CommonService } from '@/services'
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
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/main/defult/HomeView.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/main/defult/AboutView.vue')
      },
      {
        name: 'nomatch',
        path: '/:pathMatch(.*)*',
        redirect: { name: 'home' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from) => {
  const roles = to.meta.roles

  // 如果路由没有定义权限，则直接放行
  if (!roles) return true

  // 获取当前用户的角色
  const userRole = CommonService.getRole()

  // 检查用户角色是否在路由定义的角色数组中
  if (Array.isArray(roles) && roles.includes(userRole)) {
    return true
  } else {
    createAlertDialog('无权限')
    return { name: 'home' }
  }
})

export default router
