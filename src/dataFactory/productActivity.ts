/**
 * 产品价格信息接口定义
 */
interface ProductPriceInfo {
    price_local: number;
    price_local_with_symbol: string;
    special_price: number | null;
    special_price_with_symbol: string | null;
    subscription_price: number | null;
    subscription_price_with_symbol: string | null;
    price_discount_rate: number;
    promotion_type: number;
    average_daily_price: number;
    average_daily_price_with_symbol: string;
    price_version: string;
    start_time: string;
    end_time: string;
    countdown: number;
    reduce_price: number;
    reduce_price_with_symbol: string;
    arrival_price: number;
    arrival_price_with_symbol: string;
    total_discount_price: number;
    total_discount_price_with_symbol: string;
    product_dues_coupon_rights: any | null;
    wallet_price: number | null;
    wallet_price_with_symbol: string | null;
  }
  
  /**
   * 倒计时格式化结果接口
   */
  interface CountdownResult {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }
  
  /**
   * 产品价格处理类
   * 单一性 耦合度低  复用性高
   * 封装产品价格信息，提供活动判断、倒计时和时间格式化功能
   * 活动数据 class function
   */
  export class ProductPrice {
    // 价格原始数据
    private priceInfo: ProductPriceInfo;
    
    // 倒计时定时器ID
    private countdownTimer: number | null = null;
    
    // 倒计时更新回调函数
    private countdownCallback: ((result: CountdownResult) => void) | null = null;
  
    /**
     * 构造函数
     * @param priceInfo 产品价格信息
     */
    constructor(priceInfo: ProductPriceInfo) {
      this.priceInfo = priceInfo;
    }
  
    /**
     * 判断是否为活动包
     * 当折扣率大于0时视为活动包
     */
    get isActive(): boolean {
      return this.priceInfo.price_discount_rate > 0;
    }
  
    /**
     * 获取原始价格信息
     */
    get info(): ProductPriceInfo {
      return { ...this.priceInfo }; // 返回副本，防止外部修改
    }
  
    /**
     * 格式化时间戳为指定格式
     * @param timestamp 时间戳字符串，格式如"2025-01-03 00:00:00"
     * @param format 格式化字符串，如"YYYY-MM-DD HH:mm:ss"
     * @returns 格式化后的时间字符串
     */
    formatTimestamp(timestamp: string, format: string = "YYYY-MM-DD HH:mm:ss"): string {
      const date = new Date(timestamp);
      
      if (isNaN(date.getTime())) {
        throw new Error("Invalid timestamp format");
      }
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      
      return format
        .replace('YYYY', year.toString())
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
    }
  
    /**
     * 计算结束时间的倒计时
     * @returns 倒计时结果对象
     */
    calculateCountdown(): CountdownResult {
      const endTime = new Date(this.priceInfo.end_time).getTime();
      const now = new Date().getTime();
      const diff = endTime - now;
      
      if (diff <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        };
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return {
        days,
        hours,
        minutes,
        seconds,
        isExpired: false
      };
    }
  
    /**
     * 启动倒计时
     * @param callback 每秒更新的回调函数
     */
    startCountdown(callback: (result: CountdownResult) => void): void {
      this.countdownCallback = callback;
      
      // 立即执行一次
      this.updateCountdown();
      
      // 启动定时器，每秒更新一次
      this.countdownTimer = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    }
  
    /**
     * 停止倒计时
     */
    stopCountdown(): void {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
        this.countdownCallback = null;
      }
    }
  
    /**
     * 更新倒计时并触发回调
     */
    private updateCountdown(): void {
      const result = this.calculateCountdown();
      
      if (this.countdownCallback) {
        this.countdownCallback(result);
      }
      
      // 如果已过期，自动停止倒计时
      if (result.isExpired) {
        this.stopCountdown();
      }
    }
  
    /**
     * 获取活动开始时间（格式化后）
     * @param format 时间格式
     */
    getFormattedStartTime(format?: string): string {
      return this.formatTimestamp(this.priceInfo.start_time, format);
    }
  
    /**
     * 获取活动结束时间（格式化后）
     * @param format 时间格式
     */
    getFormattedEndTime(format?: string): string {
      return this.formatTimestamp(this.priceInfo.end_time, format);
    }
  
    /**
     * 获取折扣百分比
     * @returns 百分比字符串，如"70%"
     */
    getDiscountPercentage(): string {
      return `${Math.round(this.priceInfo.price_discount_rate * 100)}%`;
    }
  
    /**
     * 组件销毁时清理资源
     */
    destroy(): void {
      this.stopCountdown();
    }
  }
      