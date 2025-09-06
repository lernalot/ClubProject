import { reportPoint } from "../src/fetchs/csrFetch"

// 封装上报支付相关埋点
export const trackJoin = async (params: any) => {
    reportPoint({
        event: 'join_club_attempt',
        clubId: params.clubId,
        productId: params.productId,
        price: params.price,
        currency: params.currency,
        extraInfo: params.extraInfo,
        reason: params.reason || 'user_initiated',
    })
}