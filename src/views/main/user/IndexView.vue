<script setup lang="ts">
import type { Component } from 'vue'
import { computed, defineAsyncComponent, ref } from 'vue'

const components: { name: string; component: Component }[] = [
  {
    name: '个人管理',
    component: defineAsyncComponent(() => import('./MyselfView.vue'))
  }
]
const currentComponentR = ref()
const currentComponentC = computed(
  () => components.find((com) => com.name == currentComponentR.value)?.component
)
const typeC = computed(() => (name: string) => (name == currentComponentR.value ? 'danger' : ''))
</script>
<template>
  <el-row class="my-row">
    <el-col class="my-col">
      <el-tag
        v-for="(com, index) of components"
        :type="typeC(com.name)"
        :key="index"
        @click="currentComponentR = com.name"
        style="cursor: pointer; margin-right: 10px">
        {{ com.name }}
      </el-tag>
    </el-col>
  </el-row>
  <template v-if="currentComponentR">
    <component :is="currentComponentC" />
  </template>
</template>
