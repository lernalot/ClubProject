import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore, setActivePinia } from "pinia";

// 当前选择的钱包地址
export const useProductStore = defineStore("product", {
  state: () => ({
    productList: [] as Array<{ id: number; name: string; price: number }>,
    activeProduct: ref({}) as Ref<Record<string, any>>,
  }),
  getters: {
    productCount: (state) => state.productList.length,
    // getProductList: (state) => state.productList
  },
  actions: {
    initProductList(primeInfo: Array<{ id: number; name: string; price: number }>) {
      const productList = primeInfo?.info?.product_info_list
      this.productList = productList;
      this.setActiveProduct(productList[0]);
    },
    setActiveProduct(product: Record<string, any>) {
      this.activeProduct = product;
    }
  }
});
