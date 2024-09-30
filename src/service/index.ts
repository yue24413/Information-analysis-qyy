import { useGet } from '@/fetch'
import router from '@/router'
import * as consty from '@/service/Const'
import type { User } from '@/type/index'
import { userLoginStore } from '@/views/login/LoginStore'
const LibraryView = async () => {
  const resp = await useGet<{ user: User }>('library')
  userLoginStore().userS.value = resp.data.value?.data.user ?? {}
  const role = sessionStorage.getItem('role')
  const userS = userLoginStore().userS
  userS.value = resp.data.value?.data.user ?? {}
  console.log(resp.data.value?.data.user)
  console.log(role)
  let path = ''
  switch (role) {
    case consty.USER:
      path = '/library/user'
      break
    case consty.ADMIN:
      path = '/library/admin'
      break
    default:
      path = '/library/defult'
      break
  }
  console.log(path)
  router.push(path)
}
export { LibraryView }
