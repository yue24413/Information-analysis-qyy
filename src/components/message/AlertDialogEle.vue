<template>
  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <span>{{ props.msg }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const appendR = ref(true)
const props = defineProps<{ msg: string; close?: () => {} }>()
// const close = () => {
//   // 执行传入的关闭模态框时需执行的操作
//   props.close && props.close()
//   // 从body移除
//   render(null, document.body)
// }
const dialogFormVisible = ref(true)
</script>
