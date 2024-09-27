import { userLoginStore } from '@/components/login/LoginStore'
import * as consty from '@/datasourse/Const'
import { useGet } from '@/fetch'
import router from '@/router'
import type { User } from '@/type/index'
export const serviceView = async () => {
  const resp = await useGet<{ user: User }>('service')
  userLoginStore().userS.value = resp.data.value?.data.user ?? {}
  const role = sessionStorage.getItem('role')
  const userS = userLoginStore().userS
  userS.value = resp.data.value?.data.user ?? {}
  console.log(resp.data.value?.data.user)
  console.log(role)
  let path = ''
  switch (role) {
    case consty.USER:
      path = '/service/user'
      break
    case consty.ADMIN:
      path = '/service/admin'
      break
    default:
      path = '/service/defult'
      break
  }
  console.log(path, role)
  router.push(path)
}
