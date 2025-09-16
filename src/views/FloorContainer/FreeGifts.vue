<template>
    <div class="free-gift-section">
        <!-- 顶部标题栏 -->
        <div class="top-bar">
            <span class="gift-icon">🎁</span>
            <h2 class="section-title">Free Gift</h2>
            <span class="new-badge">New</span>
            <a href="#" class="enjoy-now">Enjoy now &gt;</a>
        </div>

        <!-- 说明文字 -->
        <p class="description">1 free gift every 31 days. Order $29.00+ to claim!</p>

        <!-- 礼品列表 -->
        <div class="gifts-list">
            <div class="gift-item" v-for="(gift, idx) in gifts" :key="idx">
                <img :src="gift.image" :alt="gift.name" class="gift-image" />
                <span class="free-badge">Free</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 模拟礼品数据（实际可从接口/Props传入）
interface Gift {
    image: string;
    name: string;
}
const gifts = ref<Gift[]>([
    {
        image: 'https://img.ltwebstatic.com/images3_pi/2024/07/08/51/1720411230bdf68fbcf424629bda6bef84b102598c_thumbnail_405x552.jpg', // 示例占位图
        name: 'SHEIN Gift Box',
    },
    {
        image: 'https://img.ltwebstatic.com/images3_pi/2024/07/08/51/1720411230bdf68fbcf424629bda6bef84b102598c_thumbnail_405x552.jpg',
        name: 'Storage Organizer',
    },
    {
        image: 'https://img.ltwebstatic.com/images3_pi/2024/07/08/51/1720411230bdf68fbcf424629bda6bef84b102598c_thumbnail_405x552.jpg',
        name: 'Beauty Products',
    },
    {
        image: 'https://img.ltwebstatic.com/images3_pi/2024/07/08/51/1720411230bdf68fbcf424629bda6bef84b102598c_thumbnail_405x552.jpg',
        name: 'Floral Earrings',
    },
]);
</script>

<style scoped>
.free-gift-section {
    background: linear-gradient(90deg, #ffe4c4 0%, #fffaf0 100%);
    padding: 16px 24px;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.top-bar {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.gift-icon {
    font-size: 28px;
    margin-right: 6px;
}

.section-title {
    font-size: 22px;
    font-weight: 700;
    color: #333;
    margin-right: 6px;
}

.new-badge {
    background-color: #ff4d6d;
    color: #fff;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    margin-right: auto;
}

.enjoy-now {
    color: #8b4513;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
}

.enjoy-now:hover {
    color: #cd853f;
}

.description {
    color: #e65c00;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 16px;
}

.gifts-list {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    /* 横向溢出时滚动 */
    padding-bottom: 8px;
}

.gift-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 120px;
}

.gift-image {
    width: 120px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 6px;
}

.free-badge {
    background-color: #ff6b35;
    color: #fff;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
}
</style>