<template>
    <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="../assets/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <!-- 11 -->
  <div>This is Home Page</div>
  <span>Count from Pinia:</span>
  <span>{{ list }}</span>
  <span class="pinia-state"><!-- pinia-state --></span>
  <button @click="increaseCount">{{ count }}</button>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
// 业务形式划分 vue3组合式Api 划分业务store
import { useCounterStore } from "../pinia/count";
import { useProductStore } from "../pinia/product";

const counterStore = useCounterStore();
const productStore = useProductStore();
const { count } = storeToRefs(counterStore);
const { increaseCount } = counterStore;
const { list } = storeToRefs(productStore);
</script>

<style scoped lang="less">  
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>