<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'

const user = reactive({
  department: '',
  account: '',
  password: '',
  checkAccount: ''
})

function onSubmit() {
  console.log('submit!')
}
const dialogVisible = ref(false)

const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (user.checkAccount !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkAccount')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== user.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof user>>({
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkAccount: [{ validator: validatePass2, trigger: 'blur' }]
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="100" height="100" />

    <div class="wrapper">
      <HelloWorld />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>

    <el-button plain @click="dialogVisible = true" id="login">Login</el-button>

    <el-dialog v-model="dialogVisible" title="Login" width="500" draggable>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="user"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-user">
        <el-form-item label="学号/工号" prop="checkAccount">
          <el-input v-model="user.account" type="account" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item label="部门">
          <el-select v-model="user.department" placeholder="please select your department">
            <el-option label="department one" value="shanghai" />
            <el-option label="department two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </header>

  <RouterView id="router" />
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  max-width: calc(100vw - 17px);
}
#app {
  /**横向弹性 */
  background-color: #ffee99;
  display: flex;
  margin: 10px auto;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}
.wrapper {
  flex: 1;
}
#login {
  padding: 1.2rem 1rem;
  margin-right: 5rem;
}
#login > span {
  width: 120px;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
.router {
  background-color: #ee6f6f;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.el-radio-group {
  margin-right: 12px;
}
</style>
