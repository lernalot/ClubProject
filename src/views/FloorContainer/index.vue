<template>
    <div class="floor-container">
        <!-- Your content goes here -->
        <div v-for="(line, index) in floorData" :key="index" class="floor-line">
                <!-- Render item content here -->
                <component :is="getComponent(line.floor_type_id)" :weight="line.weight" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useClientInfoStore } from '../../pinia/clientInfo';
import { pageFloorHooks } from '../../../Hooks';
import Credit from './Credit.vue';
import Shipping from './Shipping.vue';
import GoodsDiscount from './GoodsDiscount.vue';
import freeGifts from './freeGifts.vue';
const clientStore = useClientInfoStore(); // initThemeSkinInfo store
const { clientInfo } = clientStore;
const floorData = ref([]);
const { adaptiveSpliceToLine } = pageFloorHooks();
const floorConfigDetailList = clientInfo.themeSkinInfo.floor_config.floor_config_detail_list || [];
const weightList = floorConfigDetailList?.map((item) => item.weight) || [];
const floorList = adaptiveSpliceToLine(weightList);
floorConfigDetailList.forEach((item, index) => {
    item.weight = floorList[index];
});
floorData.value = floorConfigDetailList;
console.log('floorData', floorData, weightList, floorConfigDetailList);
const getComponent = (type: string) => {
    switch (type) {
        case 'CREDIT_REWARD':
            return Credit;
        case 'FREE_SHIPPING_TIMES':
            return Shipping;
        case 'EXCLUSIVE_DISCOUNTS':
            return GoodsDiscount;
        case 'FREE_GIFTS':
            return freeGifts;
        default:
            return null;
    }
};
</script>

<script lang="ts">
export default {
    name: 'FloorContainer',
};
</script>

<style scoped>
.floor-container {
    /* Your styles go here */
    padding-bottom: 50vh;
}
</style>