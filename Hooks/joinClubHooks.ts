/**
 * @description This file contains hooks related to joining clubs.
 * @description hooks 判断端类型 根据不同类型 端jsBridge 或者 是浏览器端跳转
 * It includes functions to handle club joining logic, such as checking eligibility,
 * processing join requests, and managing club memberships.
 */


import { getcashierInfo, checkUserEligibility } from '../src/fetchs/csrFetch';
import { useProductStore } from '../src/pinia/product/index';
import { pageEnum } from './hooksEnum';
import jsBridge from '../JsBridge';
import { trackJoin } from '../SaInfo';
import { bridgeFit } from '../BridgeFit';

const useJoinClub = () => {
  // Function to check if a user is eligible to join a club
  const checkEligibility = () => {
    // Logic to check eligibility based on user and club data
    // 响应提示
    return true; // Placeholder for actual eligibility logic
  };

  // Function to process a join request
  const processJoinRequest = () => {
    if (checkEligibility()) {
      // Logic to add user to the club
      return true;
    } else {
      return false;
    }
  };

  // 封装收银台入参
  const prepareCheckoutParams = async (): Promise<Record<string, any>> => {
    const productStore = useProductStore();
    const activeProduct = productStore.activeProduct;
    const extraInfo = await getcashierInfo({
      clubId: pageEnum.HOME,
      productId: activeProduct?.product_code || '',
      price: activeProduct?.price || 0,
    });
    if (!activeProduct) {
      console.error('No active product found for checkout');
      return {};
    }

    return {
      clubId: pageEnum.HOME,
      productId: activeProduct.product_code,
      price: activeProduct.price,
      currency: activeProduct.currency,
      extraInfo
    };
  };

  const joinClub = async () => {
    const isEligible = await checkUserEligibility(pageEnum.HOME);
    if (!isEligible.eligible) {
      console.error('User is not eligible to join the club:', isEligible.reason);
      trackJoin({
        clubId: pageEnum.HOME,
        reason: isEligible.reason || 'ineligible'
      });
      return;
    }
    const params = await prepareCheckoutParams();
    // 判断环境
    jsBridge.callHandler('openCashier', params, (response) => {
      console.log('Checkout response:', response);
      cashierCallback(response);
      // Handle the response from the checkout process
    })
    // if (bridgeFit.isAppWebview()) {
    //   console.log('当前在APP环境');
    //   jsBridge.callHandler('openCashier', params, (response) => {
    //     console.log('Checkout response:', response);
    //     cashierCallback(response);
    //     // Handle the response from the checkout process
    //   })
    // } else {
    //   console.log('当前在浏览器环境');
    //   bridgeFit.navigate(`/pat?code=${params?.productId}`, { isNewWindow: true })
    //     .then(success => {
    //       if (success) console.log('跳转成功');
    //     });
    // }

  }

  const cashierCallback = (data: Record<string, any>) => {
    const { status } = data;
    switch (status) {
      case 'openSucc':
        console.log('Cashier opened successfully');
        break;
      case 'failure':
        console.error('Cashier operation failed');
        break;
      case 'paySucc':
        console.log('Payment successful, user has joined the club');
        trackJoin({
          clubId: pageEnum.HOME,
          reason: 0,
          eventName: 'join_club_success'
        });
        break;
      default:
        console.warn('Unknown cashier status:', status);
    }
  }
  return {
    checkEligibility,
    processJoinRequest,
    joinClub,
  };
}

export default useJoinClub;