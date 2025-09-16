<template>
    <div class="credit-reward-card">
        <!-- 头部：Logo + 标题 + New 标签 + 跳转链接 -->
        <div class="header" v-expose="123">
            <span class="logo">$♡</span>
            <h3 class="title">3%~10% Credit Reward</h3>
            <span class="new-badge">New</span>
            <a href="#" class="enjoy-link">Enjoy now &gt;</a>
        </div>

        <!-- 说明文字 -->
        <p class="description">1 credit = $1. Max $25 credit per order! Claim credit after payment.</p>

        <!-- 奖励条目列表 -->
        <div v-for="(reward, idx) in rewards" :key="idx" class="reward-item">
            <div class="reward-info">
                <span class="back-amount">{{ reward.backText }}</span>
                <span class="back-detail">{{ reward.detail }}</span>
            </div>
            <span class="order-condition">{{ reward.orderCondition }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义「奖励条目」的类型接口
interface RewardItem {
    backText: string; // 返现金额文案（如 $16.50+ Back）
    detail: string;   // 返现细节（如 (10% Back)Max $25.00）
    orderCondition: string; // 订单条件（如 Orders $165.00+）
}

// 模拟奖励数据（可从接口动态获取）productStore data
const rewards = ref<RewardItem[]>([
    {
        backText: '$16.50+ Back',
        detail: '(10% Back)Max $25.00',
        orderCondition: 'Orders $165.00+'
    },
    {
        backText: '$3.90+ Back',
        detail: '(6% Back)',
        orderCondition: 'Orders $65.00+'
    },
    {
        backText: 'Credit Reward',
        detail: '(3% Back)',
        orderCondition: 'Any Order'
    }
]);
</script>

<style scoped>
.credit-reward-card {
    background-color: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
}

.header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.logo {
    background-color: #d97706;
    /* 橙色Logo背景 */
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 8px;
    font-weight: bold;
}

.title {
    font-size: 18px;
    font-weight: bold;
    margin-right: 8px;
}

.new-badge {
    background-color: #c026d3;
    /* 紫色「New」标签 */
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    margin-right: auto;
    /* 推到右侧 */
}

.enjoy-link {
    color: #d97706;
    /* 橙色链接 */
    text-decoration: none;
    font-weight: 500;
}

.description {
    color: #e53935;
    /* 红色说明文字 */
    margin-bottom: 16px;
}

.reward-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.reward-info {
    background-color: #fed7c8;
    /* 浅橙色背景 */
    padding: 12px;
    border-radius: 8px;
    margin-right: 12px;
    flex: 1;
    max-width: 240px;
}

.back-amount {
    color: #e53935;
    /* 红色返现金额 */
    font-weight: bold;
}

.back-detail {
    color: #8d6e63;
    /* 棕色返现细节 */
}

.order-condition {
    color: #757575;
    /* 灰色订单条件 */
}
</style>