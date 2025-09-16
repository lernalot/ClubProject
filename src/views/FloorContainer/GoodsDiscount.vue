<template>
    <div class="promotion-card" :style="{ width: weight == 4 ? '100%' : '50%' }">
        <!-- 顶部折扣标识 + 标题 -->
        <div class="header">
            <span class="discount-badge">%</span>
            <h3>Extra 5% OFF</h3>
        </div>

        <!-- 描述文字 -->
        <p class="description">
            Exclusively for you: Enjoy an extra 5% OFF on 100k+ items...
        </p>

        <!-- 商品列表 -->
        <div class="products">
            <div class="product-item">
                <img src="https://img.ltwebstatic.com/images3_pi/2021/12/16/16396381938b89d166c770d7a7313b219f6fb1da1e.jpg" alt="Nail Stamp Pen" class="product-img" />
                <div class="price-discount">-$0.09</div>
            </div>
            <div class="product-item">
                <img src="https://img.ltwebstatic.com/images3_pi/2021/12/16/16396381938b89d166c770d7a7313b219f6fb1da1e.jpg" alt="Chain Accessory" class="product-img" />
                <div class="price-discount">-$0.38</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 响应式控制宽度（true = 100%，false = 50%）
const isFullWidth = ref(false);

// 窗口resize时触发：屏幕＜768px则全屏
const handleResize = () => {
    isFullWidth.value = window.innerWidth < 768;
};

const props = defineProps({
    // 可根据需要传入商品数据等
    weight: {
        type: Number,
        default: 1,
    },
});

// 组件挂载时初始化 + 监听resize
onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
});

// 组件卸载时移除监听（避免内存泄漏）
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.promotion-card {
    background: linear-gradient(to bottom, #fff3e8, #ffe8d6);
    /* 浅橙渐变背景 */
    border-radius: 12px;
    padding: 16px;
    box-sizing: border-box;
    transition: width 0.3s ease;
    /* 宽度变化平滑过渡 */
    margin: 0 auto;
    /* 水平居中 */
}

.header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.discount-badge {
    background-color: #c87a40;
    /* 棕色徽章 */
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 8px;
    font-weight: bold;
}

.header h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.description {
    color: #e65c44;
    /* 橙红色文字 */
    margin-bottom: 16px;
    line-height: 1.4;
}

.products {
    display: flex;
    justify-content: space-between;
    gap: 12px;
}

.product-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-img {
    width: 100px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 4px;
}

.price-discount {
    background-color: #5d4037;
    /* 深棕色价格标签 */
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 14px;
}
</style>