const themeSkinInfoStore = defineStore('themeSkinInfo', {
    state: () => ({
        themeSkinInfo: {} as Record<string, any>,
    }),
    getters: {
    },
    actions: {
        initThemeSkinInfo(theme_skin_info: Record<string, any>) {
            this.themeSkinInfo = theme_skin_info;
        }
    }
});

export { themeSkinInfoStore };