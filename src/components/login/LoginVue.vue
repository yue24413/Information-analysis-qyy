<script lang="ts" setup>
import type { User } from '@/type'
import { Lock as LockIcon, User as UserIcon } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
const user = ref<User>({ level: 'h3kw', account: '', password: '' }) //level: 'h3kw',默认不与任何身份对应
function onSubmit() {
  console.log('submit!')
}
const dialogVisible = ref(false)
const ruleFormRef = ref<FormInstance>()

const validateacc = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the account'))
  } else {
    if (user.value.account !== '') {
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
    if (user.value.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('password')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== user.value.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof user>>({
  account: [{ validator: validateacc, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  password2: [{ validator: validatePass2, trigger: 'blur' }]
})
</script>
<template>
  <el-button plain @click="dialogVisible = true" id="login">登录</el-button>

  <el-dialog v-model="dialogVisible" width="400" draggable>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="user"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-user">
      <el-form-item prop="account">
        <el-input
          :prefix-icon="UserIcon"
          v-model="user.account"
          type="account"
          autocomplete="off"
          placeholder="请输入学号/工号:" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :prefix-icon="LockIcon"
          v-model="user.password"
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
        <el-button class="submitButton" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style>
#login {
  width: 80px;
  padding: 1.2rem 1rem;
  margin-right: 5rem;
}
.logo {
  display: block;
  margin: 0 auto;
  width: 70px;
  height: 70px;
  padding: 20px;
}

.el-link,
el-input {
  margin-right: 20px;
  margin-bottom: 20px;
}
.submitButton {
  width: 100%;
}
</style>
