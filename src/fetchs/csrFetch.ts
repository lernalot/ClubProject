import schttp from "../httpRequest/shttp";

export const getcashierInfo = async (params: { clubId: string; productId: string; price: number; }) => {
  try {
    // const response = await schttp.post('/club/getcashierInfo', {
    //   data: params
    // });
    // return response;
    return {
      logoImg: '//img.ltwebstatic.com/images3_ccc/2024/09/04/5c/172543563389f100eadf79ca06f157c547a492bce3.png',
      productName: 'CLUB FREE TRIAL',
      productDesc: 'CLUB FREE TRIAL AND BENEFITS CREDIT CASH BACK',
    }
  } catch (error) {
    console.error("Error fetching cashier info:", error);
    return {
      logoImg: '//img.ltwebstatic.com/images3_ccc/2024/09/04/5c/172543563389f100eadf79ca06f157c547a492bce3.png',
      productName: 'CLUB FREE TRIAL',
      productDesc: 'CLUB FREE TRIAL AND BENEFITS',
    }
    throw error;
  }
}

// 埋点上报
export const reportPoint = async (params: { event: string; clubId: string; productId?: string; price?: number; currency?: string; extraInfo?: Record<string, any>; }) => {
  try {
    const response = await schttp.post('/kafuka/club/reportPoint', {
      data: params
    });
    return response;
  } catch (error) {
    console.error("Error reporting point:", error);
    throw error;
  }
}

// 检查用户是否有权限加入俱乐部
export const checkUserEligibility = async (clubId: string): Promise<{ eligible: boolean; reason?: string }> => {
  try {
    // const response = await schttp.get('/club/checkEligibility', {
    //   params: { clubId }
    // });
    // return response;
    return { eligible: true };
  } catch (error) {
    console.error("Error checking user eligibility:", error);
    return { eligible: false, reason: 'Network error' };
  }
}