/**
    * @file shttp.ts
    * @description Custom HTTP client using Axios with interceptors for request and response handling.
    * @version 1.0.0
    * @author Your Name
    * @date 2023-10-01
*/

import axios from 'axios';


const schttp = axios.create({  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000' });
schttp.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
schttp.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default schttp;