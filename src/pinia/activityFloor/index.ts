import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

// 当前选择的钱包地址
export const useCounterStore = defineStore("counter", () => {
  const count: Ref<number> = ref(0);
  const increaseCount = () => {
    count.value = count.value + 1;
  };

  // 简单模拟服务端数据拉取逻辑
  if (import.meta.env.SSR) {
    count.value = 3;
  }

  return { count, increaseCount };
});
