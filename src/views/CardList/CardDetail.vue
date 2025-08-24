<template>
    <div class="product-card" fsp-element>
        <!-- 1200ms -->
        <!-- csr create app -->
        <div class="product-name">{{ product.product_name_language }}</div>
        <div class="product-price">
            <span class="price">{{ product.product_price_info.arrival_price_with_symbol }}</span>
            <span class="unit">{{ product.product_price_info.price_local_with_symbol }}</span>
        </div>
        <div>
            {{ timeText }}
        </div>
        <span v-if="activityData?.isActive">
            special price!
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useProductStore } from '../../pinia/product';
import { ProductPrice } from '../../dataFactory/productActivity';

const activityData = ref(null);
const timeText = ref('');
interface props {
    product: Record<string, any>
}
const clientOnly = ref(false);
clientOnly.value = typeof window !== 'undefined';

const productStore = useProductStore();
const activeProduct = computed(() => productStore.activeProduct);

const props = withDefaults(defineProps<props>(), {
    product: () => {
        return {} as Record<string, any>
    }
})

watch(() => activeProduct.value, (newVal) => {
    // if (!clientOnly.value) return 回顾
    activityData.value = new ProductPrice(props.product?.product_price_info);
    activityData.value.startCountdown((res) => {
        timeText.value = res.days + '天' + res.hours + '时' + res.minutes + '分' + res.seconds + '秒';
    });
    // timeText.value = activityData.value.getFormattedEndTime();
}, { immediate: true, deep: true });
</script>

<style lang="less" scoped>
.product-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 24px;
    height: 100%;
    align-items: center;
    color: #ffba97;
    display: flex;
    flex-direction: column;
    font-size: 24px;
    font-weight: 400;
    justify-content: center;
}

.product-name {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #333;
}

.product-price {
    margin-bottom: 20px;
}

.product-price .price {
    font-size: 28px;
    font-weight: 700;
    color: #2c3e50;
}

.product-price .unit {
    color: #666;
    margin-left: 4px;
}
</style>