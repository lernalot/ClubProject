import { defineStore } from "pinia";

// 当前选择的钱包地址
export const useClientInfoStore = defineStore("clientInfo", {
    state: () => ({
        clientInfo: {} as Record<string, any>,
        savingMap: {} as Record<string, any>,
    }),
    getters: {
    },
    actions: {
        initClientInfo(client_info: Array<{ id: number; name: string; price: number }>) {
            const clientInfo = client_info
            this.clientInfo = clientInfo;
            this.savingMap = clientInfo.productCanSaving
        }
    }
});
