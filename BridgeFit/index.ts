/**
 * 跨端适配工具类
 * 支持判断浏览器/APP WebView环境、处理不同端跳转、检测登录状态
 */
// npm 包维护
// app端自己去鉴权 端上 bridge去拿 交互流程 流程图
// web端自己去鉴权 tokenCheck ajax 后端解jwt code响应码 
// npm 包 

import schttp from "../src/httpRequest/shttp";

// 10个前端团队 npm包维护发布
declare global {
    interface Window {
        jsBridge: any; // 假设JSBridge对象挂载在window上
    }
}
class BridgeFit {
    // 缓存环境判断结果
    private isAppEnv: boolean | null = null;
    // 缓存登录状态
    private loginStatusCache: { [key: string]: boolean } = {};
    // APP环境标识（可根据实际情况修改）
    private appUserAgents = ['MyAppAndroid', 'MyAppiOS', 'CustomAppWebview', 'AppleWebKit'];

    /**
     * 判断当前是否为APP WebView环境
     * @returns boolean 是否为APP环境
     */
    isAppWebview(): boolean {
        if (this.isAppEnv !== null) {
            return this.isAppEnv;
        }

        if (typeof window === 'undefined' || !window.navigator) {
            this.isAppEnv = false;
            return false;
        }

        const userAgent = window.navigator.userAgent.toLowerCase();
        this.isAppEnv = this.appUserAgents.some(agent =>
            // o(n) 非常友好
            userAgent.includes(agent.toLowerCase())
        );

        return this.isAppEnv;
    }

    /**
     * 判断当前是否为浏览器环境
     * @returns boolean 是否为浏览器环境
     */
    isBrowser(): boolean {
        return !this.isAppWebview();
    }

    /**
     * 统一跳转方法，根据环境自动选择跳转方式
     * @param url 目标地址
     * @param options 跳转选项
     * @returns Promise<boolean> 跳转是否成功
     */
    async navigate(url: string, options: {
        isNewWindow?: boolean;
        type?: 'normal' | 'native'
    } = {}): Promise<boolean> {
        const { isNewWindow = false, type = 'normal' } = options;

        try {
            if (this.isAppWebview()) {
                // APP环境下使用JSBridge跳转
                return await this.appNavigate(url, type);
            } else {
                // 浏览器环境下使用window跳转
                this.browserNavigate(url, isNewWindow);
                return true;
            }
        } catch (error) {
            console.error('跳转失败:', error);
            // 跳转失败时降级处理
            // this.browserNavigate(url, isNewWindow);
            return false;
        }
    }

    /**
     * 检查登录状态
     * @param type 检查类型：'local'表示本地检查，'remote'表示远程检查
     * @returns Promise<boolean> 是否已登录
     */
    async checkLoginStatus(type: 'local' | 'remote' = 'local'): Promise<boolean> {
        const cacheKey = `login_${type}_${this.isAppWebview() ? 'app' : 'browser'}`;

        // 检查缓存
        if (this.loginStatusCache[cacheKey] !== undefined) {
            return this.loginStatusCache[cacheKey];
        }

        let isLoggedIn = false;

        if (this.isAppWebview()) {
            // APP环境下通过JSBridge检查登录状态
            isLoggedIn = await this.checkAppLoginStatus(type);
        } else {
            // 浏览器环境下通过Cookie或LocalStorage检查
            isLoggedIn = this.checkBrowserLoginStatus(type);
        }

        // 缓存结果（5分钟过期）
        this.loginStatusCache[cacheKey] = isLoggedIn;
        setTimeout(() => {
            delete this.loginStatusCache[cacheKey];
        }, 5 * 60 * 1000);

        return isLoggedIn;
    }

    /**
     * 强制刷新登录状态（清除缓存）
     */
    refreshLoginStatus(): void {
        this.loginStatusCache = {};
    }

    /**
     * APP环境下的跳转实现
     * @param url 目标地址
     * @param type 跳转类型
     */
    private async appNavigate(url: string, type: 'normal' | 'native'): Promise<boolean> {
        if (typeof window === 'undefined' || !window.jsBridge) {
            throw new Error('JSBridge not found in APP environment');
        }

        return new Promise((resolve, reject) => {
            try {
                if (type === 'native') {
                    // 跳转到APP原生页面
                    window.jsBridge.callHandler('navigateToNative', {
                        page: url,
                        animation: 'slide'
                    }, (response: { success: boolean }) => {
                        if (response.success) {
                            resolve(true);
                        } else {
                            reject(new Error('APP native navigation failed'));
                        }
                    });
                } else {
                    // 跳转到APP内H5页面
                    window.jsBridge.callHandler('navigateToWeb', {
                        url,
                        isNewWindow: false
                    }, (response: { success: boolean }) => {
                        if (response.success) {
                            resolve(true);
                        } else {
                            reject(new Error('APP web navigation failed'));
                        }
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * 浏览器环境下的跳转实现
     * @param url 目标地址
     * @param isNewWindow 是否在新窗口打开
     */
    private browserNavigate(url: string, isNewWindow: boolean): void {
        if (typeof window === 'undefined') {
            return;
        }

        if (isNewWindow) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    }

    /**
     * APP环境下检查登录状态
     * @param type 检查类型
     */
    private async checkAppLoginStatus(type: 'local' | 'remote'): Promise<boolean> {
        if (typeof window === 'undefined' || !window.jsBridge) {
            return false;
        }

        return new Promise(resolve => {
            if (type === 'local') {
                // 本地检查（快速）jwt 时效性 token 10d after 10d 需要重新登录
                window.jsBridge.callHandler('getLocalLoginStatus', {}, (status: boolean) => {
                    resolve(status);
                });
            } else {
                // 远程检查（更准确，会与服务器校验）
                window.jsBridge.callHandler('checkRemoteLogin', {}, (response: { isLoggedIn: boolean }) => {
                    resolve(response.isLoggedIn);
                });
            }
        });
    }

    /**
     * 浏览器环境下检查登录状态
     * @param type 检查类型
     */
    private async checkBrowserLoginStatus(type: 'local' | 'remote'): boolean {
        if (typeof window === 'undefined') {
            return false;
        }

        if (type === 'local') {
            // 检查本地存储的登录状态
            try {
                const userInfo = localStorage.getItem('userInfo');
                return !!userInfo;
            } catch (error) {
                console.error('Failed to check local login status:', error);
                return false;
            }
        } else {
            // 这里简化处理，实际项目中应该调用接口检查
            console.warn('Remote login check in browser should be implemented with API call');
            // ajax
            return await schttp.get('/api/auth/status')
                .then(response => {
                    return response.data?.isLoggedIn || false;
                })
                .catch(error => {
                    console.error('Failed to check remote login status:', error);
                    return false;
                });
            // 由于是异步，这里返回false，实际应改为异步函数
            return false;
        }
    }

    /**
     * 登录操作，根据环境选择合适的登录方式
     * @returns Promise<boolean> 登录是否成功
     */
    async login(): Promise<boolean> {
        if (this.isAppWebview()) {
            return this.appLogin();
        } else {
            return this.browserLogin();
        }
    }

    /**
     * APP环境下的登录实现
     */
    private async appLogin(): Promise<boolean> {
        if (typeof window === 'undefined' || !window.jsBridge) {
            return false;
        }

        return new Promise(resolve => {
            window.jsBridge.callHandler('openLoginPage', {}, (response: { success: boolean }) => {
                if (response.success) {
                    this.refreshLoginStatus();
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    /**
     * 浏览器环境下的登录实现
     */
    private browserLogin(): Promise<boolean> {
        return new Promise(resolve => {
            // 浏览器环境下跳转到登录页面
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = `/login?redirect=${currentUrl}`;
            // 由于页面会跳转，这里无法直接返回成功状态，实际应在登录后通过回调处理
            resolve(false);
        });
    }
}

// 导出单例实例
export const bridgeFit = new BridgeFit();
