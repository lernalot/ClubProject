/**
 * This file is part of the club project.
 * @description 收敛所有的请求
 */

import shttp from '../httpRequest/shttp';
import queryComprehensiveInfoForSheinClub from '../mockJosn/queryComprehensiveInfoForSheinClub.json' 
import primeInfoForClient from '../mockJosn/primeInfoForClient.json'

export const getClubInfo = async (clubId: string) => {
  try {
    return queryComprehensiveInfoForSheinClub
    // java 层
    // const mid = req?.headers.mid
    const response = await shttp.post(`/clubs/${clubId}`, {
      data: mid
    });
    return response;
  } catch (error) {
    console.error("Error fetching club info:", error);
    throw error;
  }
}

// 其他的 SSR 请求函数可以在这里定义
// primeInfoForClient
export const getPrimeInfoForClient = async (clubId: string) => {
  try {
    return primeInfoForClient
    const response = await shttp.get(`/clubs/${clubId}/prime-info`);
    return response;
  } catch (error) {
    console.error("Error fetching prime info for client:", error);
    throw error;
  }
}