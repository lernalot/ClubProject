<template>
    <div class="club-support-card rounded-xl bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
        <!-- 顶部标题区域 -->
        <div class="flex items-center mb-4">
            <!-- 左侧图标 -->
            <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z">
                    </path>
                </svg>
            </div>
            <!-- 右侧文字 -->
            <div>
                <h3 class="text-lg font-semibold text-orange-800">{{ title }}</h3>
                <p class="text-orange-500 text-sm mt-1">{{ subTitle }}</p>
            </div>
        </div>

        <!-- 下方客服图标+文字区域 -->
        <div class="flex items-center">
            <img :src="iconSrc" alt="Premium Customer Service" class="w-20 h-20 object-contain mr-4" />
            <p class="text-orange-700 font-medium text-lg">{{ serviceText }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: 'CLUB Support',
    },
    subTitle: {
        type: String,
        default: 'Committed to Excellent Service',
    },
    serviceText: {
        type: String,
        default: 'Premium Customer Service',
    },
    iconSrc: {
        type: String,
        default: '', // 可传入自定义耳机图标路径
    },
});
</script>

<style scoped>
.club-support-card {
    border-radius: 12px;
    background-color: white;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}

/* 顶部图标容器 */
.club-support-card>div:first-child>div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffe4cc;
    /* 浅橙色背景 */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
}

/* 标题样式 */
h3 {
    font-size: 18px;
    font-weight: 600;
    color: #d97706;
}

/* 子标题样式 */
.club-support-card>div:first-child>div+div>p {
    font-size: 14px;
    color: #f97316;
    margin-top: 4px;
}

/* 耳机图片 */
img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-right: 16px;
}

/* 服务文字 */
.club-support-card>div:last-child>p {
    font-size: 16px;
    font-weight: 500;
    color: #b45309;
}
</style>