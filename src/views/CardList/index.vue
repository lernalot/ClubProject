<template>
    <div class="product-product-swiper">
        <!-- Swiper容器 -->
        <div class="swiper-container" ref="swiperContainer">
            <div class="swiper-wrapper">
                <!-- 产品包项 -->
                <div class="swiper-slide" v-for="(product, index) in productPackages" :key="product.id"
                    :class="{ 'active': currentIndex === index }">
                    <card-detail :product="product" :activityData="activityData" :timeText="timeText" @click="slideActive(index)" />
                </div>
                <!-- {{ isWindow }}111 -->
            </div>
        </div>

        <!-- 切换按钮 -->
        <button class="swiper-nav prev" @click="handlePrev" :disabled="currentIndex === 0">
            <i class="icon-arrow-left"></i>
        </button>
        <button class="swiper-nav next" @click="handleNext" :disabled="currentIndex === productPackages.length - 1">
            <i class="icon-arrow-right"></i>
        </button>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, computed } from 'vue';
import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 组件
import CardDetail from './CardDetail.vue';
import { useProductStore } from '../../pinia/product';
import { ProductPrice } from '../../dataFactory/productActivity';

const isWindow = typeof window !== 'undefined';
// 产品包数据类型定义
interface ProductPackage {
    id: string;
    name: string;
    price: string;
    unit: string;
    features: string[];
    buttonText: string;
}

// 组件属性定义
interface Props {
    title: string;
    subtitle?: string;
    packages: ProductPackage[];
    initialIndex?: number;
}

// 组件事件定义
interface Emits {
    (e: 'select', product: ProductPackage): void;
    (e: 'change', index: number): void;
}

const productStore = useProductStore();

// 接收属性
const props = withDefaults(defineProps<Props>(), {
    title: '产品套餐',
    subtitle: '',
    packages: () => [],
    initialIndex: 0
});

// 定义事件
const emit = defineEmits<Emits>();

// 状态管理
const swiperContainer = ref<HTMLElement | null>(null);
const swiperInstance = ref<Swiper | null>(null);
const currentIndex = ref(props.initialIndex);
const activityData = ref<ProductPrice | null>(null);
const timeText = ref('');
// 处理上一个
const handlePrev = () => {
    if (swiperInstance.value) {
        swiperInstance.value.slidePrev();
    }
};

// 处理下一个
const handleNext = () => {
    if (swiperInstance.value) {
        swiperInstance.value.slideNext();
    }
};

const slideActive = (newIndex) => {
    if (swiperInstance.value) {
        console.log('slideActive', newIndex);
        currentIndex.value = newIndex;
        swiperInstance.value.slideTo(newIndex);
        slideActiveData(newIndex)
    }
};

const slideActiveData = (newIndex) => {
    if (swiperInstance.value) {
        const activeProduct = productPackages.value[newIndex]
        currentIndex.value = newIndex;
        swiperInstance.value.slideTo(newIndex);
        // activityData.value = new ProductPrice(activeProduct?.product_price_info);
        // activityData.value.startCountdown((res) => {
        //     timeText.value = res.days + '天' + res.hours + '时' + res.minutes + '分' + res.seconds + '秒';
        // });
        productStore.setActiveProduct(activeProduct);
        // console.log('slideActiveData', activityData.value.getFormattedEndTime());
        emit('change', newIndex);
    }
};

// 处理指示器点击
const handleIndicatorClick = (index: number) => {
    if (swiperInstance.value) {
        swiperInstance.value.slideTo(index);
    }
};

// 处理产品包选择
const handlePackageSelect = (pkg: ProductPackage) => {
    emit('select', pkg);
};

// 初始化Swiper
onMounted(() => {
    if (swiperContainer.value && props.packages.length > 0) {
        // 配置Swiper
        swiperInstance.value = new Swiper(swiperContainer.value, {
            modules: [Navigation, Pagination],
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: true,
            initialSlide: props.initialIndex,
            freeMode: true,
            navigation: {
                enabled: false // 我们使用自定义导航按钮
            },
            pagination: {
                enabled: false // 我们使用自定义指示器
            },
            on: {
                // 监听滑动事件，更新当前索引
                slideChange: () => {
                    if (swiperInstance.value) {
                        const newIndex = swiperInstance.value.activeIndex;
                        currentIndex.value = newIndex;
                        slideActiveData(newIndex)
                        emit('change', newIndex);
                    }
                }
            }
        });
    }
    slideActiveData(props.initialIndex)
});

// 监听packages变化，重新初始化
watch(
    () => props.packages,
    (newPackages) => {
        if (newPackages.length > 0 && swiperInstance.value) {
            swiperInstance.value.destroy();
            if (swiperContainer.value) {
                swiperInstance.value = new Swiper(swiperContainer.value, {
                    modules: [Navigation, Pagination],
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    centeredSlides: true,
                    initialSlide: props.initialIndex,
                    navigation: {
                        enabled: false
                    },
                    freeMode: true,
                    pagination: {
                        enabled: false
                    },
                    on: {
                        slideChange: () => {
                            if (swiperInstance.value) {
                                const newIndex = swiperInstance.value.activeIndex;
                                currentIndex.value = newIndex;
                                slideActiveData(newIndex)
                                emit('change', newIndex);
                            }
                        }
                    }
                });
            }
        }
    },
    { deep: true }
);

const productPackages = ref<ProductPackage[]>(props.packages);

// 组件卸载时销毁Swiper实例
onUnmounted(() => {
    if (swiperInstance.value) {
        swiperInstance.value.destroy();
    }
});
</script>

<style scoped>
.product-product-swiper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    /* padding: 20px; */
}

.swiper-title {
    text-align: center;
    margin-bottom: 30px;
}

.swiper-title h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
}

.swiper-title p {
    color: #666;
    font-size: 16px;
}

.swiper-container {
    overflow: hidden;
    padding: 20px 0;
}

.swiper-wrapper {
    display: flex;
}

.swiper-slide {
    flex-shrink: 0;
    width: 80%;
    max-width: 350px;
    opacity: 0.8;
    transition: all 0.3s ease;
}

.swiper-slide.active {
    opacity: 1;
    /* transform: scale(1.05); */
    color: #ffba97;
    font-size: 14px;
}

.product-features {
    margin-bottom: 24px;
}

.product-features ul {
    list-style: none;
    padding: 0;
}

.product-features li {
    margin-bottom: 12px;
    color: #666;
    font-size: 14px;
    display: flex;
    align-items: center;
}

.product-features li:before {
    content: "✓";
    color: #42b983;
    margin-right: 8px;
}
.swiper-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.swiper-nav.prev {
    left: 10px;
}

.swiper-nav.next {
    right: 10px;
}

.swiper-nav:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.swiper-pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
}

.swiper-pagination span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
    transition: background 0.3s ease;
}

.swiper-pagination span.active {
    background: #42b983;
    width: 24px;
    border-radius: 4px;
}

.icon-arrow-left,
.icon-arrow-right {
    display: inline-block;
    width: 16px;
    height: 16px;
}

.icon-arrow-left:before {
    content: "<";
    font-weight: bold;
}

.icon-arrow-right:before {
    content: ">";
    font-weight: bold;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .swiper-slide {
        width: 90%;
    }
}
</style>