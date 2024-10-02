<script lang="ts" setup>
import router from '@/router'
import { ADMIN, USER } from '@/services/Const'
import { CommonService } from '@/services/index'
import { useUserStore } from '@/store/UserStore'
import { Setting, SwitchButton } from '@element-plus/icons-vue'
import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'
const userS = useUserStore().userS
const role = CommonService.getRole()

let nemuComponent: Component
console.log('nemuComponent')
if (role == USER) {
  nemuComponent = defineAsyncComponent(() => import('@/views/main/header/user/IndexView.vue'))
} else if (role == ADMIN) {
  nemuComponent = defineAsyncComponent(() => import('@/views/main/header/admin/IndexView.vue'))
}
const logoutF = () => {
  sessionStorage.clear()
  router.push('/login')
}
</script>
<template>
  <el-row class="my-row" style="padding: 3px" align="middle">
    <el-col :span="4">
      <el-button
        type="danger"
        :icon="Setting"
        @click="$router.push('/settings')"
        style="margin: 10px">
        {{ userS?.name }}
      </el-button>
    </el-col>

    <!-- 基于权限加载上功能栏 -->
    <el-col :span="18">
      <component :is="nemuComponent" />
    </el-col>
    <el-col :span="2">
      <el-icon id="logout" :size="32" color="red" @click="logoutF">
        <SwitchButton />
      </el-icon>
    </el-col>
  </el-row>
</template>
<style scoped>
#logout :hover {
  cursor: pointer;
}
</style>
