<script lang="ts" setup>
import { LibraryView } from '../service/index'
const getService = async () => {
  await LibraryView()
}
</script>
<template>
  <div class="getService">
    <button class="getService" @click="getService">service</button>
  </div>
</template>
<style scoped>
.getService {
  display: inline;
}
button {
  display: inline;
  border: 0px;
  padding: 0 1.1rem;
  color: #178237;
  cursor: pointer; /* 默认光标形状 */
  background-color: inherit;
}
button:hover {
  color: #2e2f48;
}
@media (min-width: 1024px) {
  button {
    display: inline;
    border: 0px;
    padding: 0 1.1rem;
    font-size: 1.1rem;
    color: #178237;
    cursor: pointer; /* 默认光标形状 */
    background-color: inherit;
  }
}
</style>
