<template>
    <div data-v-47b557f1="" class="main-card__container">
        <div>
            Expect to save: <span class="main-card__expect-save">{{ save }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({});
// @ts-ignore ?? why
import { useClientInfoStore } from "@/pinia/clientInfo";
import { computed } from "vue";
import { useProductStore } from "../../pinia/product";
const clientStore = useClientInfoStore();
const productStore = useProductStore();
const save = computed(() => {
    const saveObject = clientStore.savingMap[productStore.activeProduct.product_code];
    return saveObject ? saveObject.total_amount.amount_with_symbol : '0';
});

</script>

<style scoped lang="less">
.main-card__container {
    background: linear-gradient(279deg, #ffead2 12.71%, #fefbf3 32.38%, #ffead2 52.47%, #fffcf3 73.38%, #ffead2 91.42%);
    flex-shrink: 0;
    height: 224px;
    position: relative;
    border-radius: .4267rem;
    margin: 0 auto;
    align-items: center;
    padding: .0933rem;
    display: flex;
    justify-content: center;
    font-size: 20px;
}

.main-card__expect-save {
    align-items: center;
    color: #873c00;
    display: flex;
    font-size: 80px;
    font-weight: 700;
    gap: .0533rem;
    justify-content: center;
    line-height: normal;
}
</style>
