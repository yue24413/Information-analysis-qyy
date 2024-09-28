<script lang="ts" setup>
import type { User } from '@/type'
import { Lock as LockIcon, User as UserIcon } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { reactive, ref, watchEffect } from 'vue'
import { loginService, refreshPage } from './index'
const userR = ref({ account: '', password: '' })
const buttonView = ref('')
const tokenR = ref(sessionStorage.getItem('token'))

watchEffect(() => {
  buttonView.value = !tokenR.value ? '登录' : '退出'
})

const loginStatus = () => {
  if (!tokenR.value) {
    dialogVisible.value = true
  } else {
    sessionStorage.clear()
    // buttonView.value = '登录'
    refreshPage()
  }
}

const dialogVisible = ref(false)
const ruleFormRef = ref<FormInstance>()

const validateacc = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the account'))
  } else {
    if (userR.value.account !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('account')
    }
    callback()
  }
}
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (userR.value.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('password')
    }
    callback()
  }
}
const onLogin = async () => {
  const user = {
    account: userR.value.account,
    password: userR.value.password
  }
  dialogVisible.value = false
  await loginService(user)
  userR.value.account = ''
  userR.value.password = ''
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('是否取消登录吗？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
// const validatePass2 = (rule: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('Please input the password again'))
//   } else if (value !== userR.value.password) {
//     callback(new Error("Two inputs don't match!"))
//   } else {
//     callback()
//   }
// }

const rules = reactive<FormRules<User>>({
  account: [{ validator: validateacc, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }]
  // password2: [{ validator: validatePass2, trigger: 'blur' }]
})
</script>
<template>
  <el-button plain @click="loginStatus" id="login">
    {{ buttonView }}
  </el-button>

  <el-dialog v-model="dialogVisible" width="400" draggable :before-close="handleClose">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="userR"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-user">
      <el-form-item prop="account">
        <el-input
          :prefix-icon="UserIcon"
          v-model="userR.account"
          type="account"
          autocomplete="off"
          placeholder="请输入学号/工号:" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :prefix-icon="LockIcon"
          v-model="userR.password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码：" />
      </el-form-item>

      <el-link :underline="false">创建账号</el-link>
      <el-link :underline="false">忘记密码</el-link>

      <!-- <el-form-item label="密码2" prop="password">
        <el-input
          v-model="user.password"
          type="password2"
          autocomplete="off"
          aria-placeholder="请再次输入密码：" />
      </el-form-item> -->
      <!-- <el-form-item label="部门">
        <el-select v-model="user.department" placeholder="please select your department">
          <el-option label="department one" value="shanghai" />
          <el-option label="department two" value="beijing" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button class="submitButton" @click="onLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.logo {
  display: block;
  width: 30%;
  height: 30%;
  margin: 6% auto;
}
.el-link,
el-input {
  margin-right: 20px;
  margin-bottom: 20px;
}
.submitButton {
  width: 100%;
}
@media (min-width: 1024px) {
  #login {
    width: 80px;
    padding: 1.2rem 1rem;
    margin-right: 5rem;
  }
}
@media (max-width: 1024px) {
  #login {
    display: block;
    width: 50%;
    margin: 3% auto 1%;
  }
}
</style>
