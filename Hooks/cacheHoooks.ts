import jsBridge from "../JsBridge";

const cacheHooks = () => {
    const getCache = (key: string) => {
        // 如果端环境
        if (typeof window === 'undefined' || !window.localStorage) {
            jsBridge.callHandler('getCache', { key }, (data: any) => {
                if (data) {
                    try {
                        return JSON.parse(data);
                    } catch (error) {
                        console.error('Failed to parse cached data from app:', error);
                        return null;
                    }
                }   
            return null;
        })
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };

    const setCache = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const removeCache = (key: string) => {
        localStorage.removeItem(key);
    };

    return {
        getCache,
        setCache,
        removeCache
    };
}
    return {}
}