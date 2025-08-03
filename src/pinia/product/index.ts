import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

// 当前选择的钱包地址
export const useProductStore = defineStore("product", {
  state: () => ({
    list: [] as Array<{ id: number; name: string; price: number }>
  }),
  getters: {
    productCount: (state) => state.list.length,
    getProductList: (state) => state.list
  },
  actions: {
    initProductList(products: Array<{ id: number; name: string; price: number }>) { 
      this.list = products;
    }
  }
});
