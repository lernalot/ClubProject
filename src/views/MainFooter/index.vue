<template>
    <div class="prime2__sticky-footer">
    <a class="btn" @click="joinClub">
        <span>
            {{ price }}
        </span>
        <span>
            {{ localPrice }}
        </span>
    </a>
</div>
</template>

<script setup lang="ts">
import { useProductStore } from '../../pinia/product';
import { useClientInfoStore } from '../../pinia/clientInfo';
import { computed } from 'vue';
import joinClubHooks from '../../../Hooks/joinClubHooks';

const productStore = useProductStore();
const clientStore = useClientInfoStore();

const price = computed(() => {
    const product = productStore.activeProduct;
    if (!product || !product.product_price_info) return '0';
    return product.product_price_info.arrival_price_with_symbol;
});

const localPrice = computed(() => {
    const product = productStore.activeProduct;
    if (!product || !product.product_price_info) return '0';
    return product.product_price_info.price_local_with_symbol;
});

const joinClub = async () => {
    // 24年 vue ref footer.ref.joinClub
    const { joinClub } = joinClubHooks();
    await joinClub();
    // 框架设计理念 react vue3 函数式组件 hooks理念
};

</script>

<style scoped lang="less">
.prime2__sticky-footer {
    bottom: 0;
    position: fixed;
    width: 100%;
    z-index: 9;
    background: linear-gradient(180deg, rgba(45, 38, 35, 0) 5.86%, #2d2623 46.26%, #2d2623);
}
.btn {
    border: .533333vw solid #ffe2d3;
    border-radius: 1.3333rem;
    box-shadow: inset 0 -1.466667vw 3.52vw 0 rgba(231, 49, 99, .9), 0 1.173333vw 1.76vw 0 rgba(117, 58, 23, .32);
    margin-top: .5867rem;
    width: 700px;
    height: 96px;
    display: flex;
    background: linear-gradient(98deg, #ff5656 1.43%, #c73bff);
    border-radius: 48px;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    margin: 0 auto;
}
</style>