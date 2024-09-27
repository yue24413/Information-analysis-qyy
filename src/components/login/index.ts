import { createAlertDialog } from '@/components/message/index'
import { usePost } from '@/fetch'
import type { User } from '@/type'

const refreshPage = async () => {
  setTimeout(() => {
    location.reload()
  }, 1000)
}
const loginService = async (user: { account: string; password: string }) => {
  const resp = await usePost<{ user: User }>('login', user)
  const token = resp.response.value?.headers.get('token')
  token && sessionStorage.setItem('token', token)
  const role = resp.response.value?.headers.get('role')
  role && sessionStorage.setItem('role', role)
  if (token) {
    // 显示成功消息
    createAlertDialog('登录成功')
  } else {
    createAlertDialog('登录失败')
  } // 刷新页面的方法
  refreshPage()
}

export { loginService, refreshPage }
