<script lang="ts" setup>
import { ADMIN, USER } from '@/services/Const'
import { CommonService } from '@/services/index'
import { useUserStore } from '@/store/UserStore'
import LoginVue from '@/views/login/LoginVue.vue'
import type { Component } from 'vue'
import { defineAsyncComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const userS = useUserStore().userS
const role = CommonService.getRole()

let nemuComponent: Component
console.log('nemuComponent')
if (role == USER) {
  nemuComponent = defineAsyncComponent(() => import('@/views/main/header/user/IndexView.vue'))
} else if (role == ADMIN) {
  nemuComponent = defineAsyncComponent(() => import('@/views/main/header/admin/IndexView.vue'))
}
const menus = [
  {
    name: 'home',
    path: '/home'
  },
  {
    name: 'about',
    path: '/about'
  }
]
const route = useRoute()
const activeIndexR = ref('')
watch(route, () => {
  const p = menus.find((mn) => route.path.includes(mn.path))
  activeIndexR.value = p?.path ?? ''
})
</script>
<template>
  <el-row class="my-row" style="padding: 3px" align="middle">
    <el-col :span="2">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
    </el-col>
    <el-col :span="4">
      <el-menu :default-active="activeIndexR" mode="horizontal" router>
        <template v-for="(menu, index) in menus" :key="index">
          <el-menu-item :index="menu.path">{{ menu.name }}</el-menu-item>
        </template>
      </el-menu>
    </el-col>
    <!-- 基于权限加载上功能栏 -->
    <el-col :span="16">
      <component :is="nemuComponent" />
    </el-col>
    <el-col :span="2">
      <LoginVue />
    </el-col>
  </el-row>
</template>
<style scoped>
#logout :hover {
  cursor: pointer;
}
.logo {
  display: block;
  margin: 0 auto;
  width: 50%;
  height: 50%;
}
.router {
  background-color: #ee6f6f;
}
</style>
