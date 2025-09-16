<template>
    <div>
        <Headers />
        <CardList :packages="productList" title="产品套餐" subtitle="选择适合您的套餐" :initialIndex="0" />
        <FloorContainer />
        <MainFooter />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import Headers from "./Headers/index.vue";
import CardList from "./CardList/index.vue";
import MainFooter from "./MainFooter/index.vue";
import FloorContainer from "./FloorContainer/index.vue";
// 业务形式划分 vue3组合式Api 划分业务store
import { useCounterStore } from "../pinia/count";
import { useProductStore } from "../pinia/product";

const counterStore = useCounterStore();
const productStore = useProductStore();
const { productList } = storeToRefs(productStore);
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