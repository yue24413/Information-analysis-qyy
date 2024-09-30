import { createNoticeBoard } from '@/components/Notice/index'

import { usePost } from '@/fetch'
import type { User } from '@/type'

const refreshPage = async () => {
  setTimeout(() => {
    location.reload()
  }, 2000)
}
const loginService = async (user: { account: string; password: string }) => {
  const resp = await usePost<{ user: User }>('login', user)
  const token = resp.response.value?.headers.get('token')
  token && sessionStorage.setItem('token', token)
  const role = resp.response.value?.headers.get('role')
  role && sessionStorage.setItem('role', role)
  const name = resp.response.value?.headers.get('name')
  if (token) {
    // 显示成功消息
    createNoticeBoard('登录成功!', '欢迎您！' + name)
  }
  refreshPage()
} // 刷新页面的方法

export { loginService, refreshPage }
