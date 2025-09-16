<template>
    <div class="shipping-coupon-card">
        <div class="coupon-header">
            <!-- 运输图标（SVG 示例） -->
            <svg class="coupon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                width="24" height="24">
                <path d="M19 7H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z" />
                <path d="M7 13h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
            </svg>
            <h2 class="coupon-title">3X Shipping Coupons</h2>
            <a href="#" class="enjoy-now">Enjoy now &gt;</a>
        </div>
        <p class="coupon-description">
            Stackable with other promotional coupons and discounts. Tips: Warehouse 1 purchases only.
        </p>
        <div class="coupon-content">
            <div class="coupon-discount">
                <span class="discount-amount">$4.00 OFF</span>
                <span class="order-condition">Orders $15.00+</span>
            </div>
            <div class="coupon-count">×3</div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 若需动态逻辑（如优惠券数据传入），可在此添加 Props 或 Composition API 逻辑
</script>

<style scoped>
.shipping-coupon-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    padding: 16px;
    font-family: system-ui, -apple-system, sans-serif;
}

.coupon-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}

.coupon-icon {
    color: #c06529;
    /* 卡车图标色调 */
}

.coupon-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
}

.enjoy-now {
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    transition: text-decoration 0.2s;
}

.enjoy-now:hover {
    text-decoration: underline;
}

.coupon-description {
    color: #ff5722;
    /* 橙色提示文字 */
    margin-bottom: 12px;
    font-size: 0.9rem;
    line-height: 1.4;
}

.coupon-content {
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #eafaf1 0%, #2e7d32 100%);
    /* 渐变背景 */
    border-radius: 8px;
    padding: 16px;
    color: #fff;
}

.coupon-discount {
    flex: 1;
}

.discount-amount {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1b5e20;
    /* 折扣金额色调 */
}

.order-condition {
    font-size: 1rem;
    color: #388e3c;
    /* 订单条件色调 */
    margin-left: 8px;
}

.coupon-count {
    font-size: 1.5rem;
    font-weight: 700;
}
</style>