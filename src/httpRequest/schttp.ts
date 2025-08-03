/**
 * @description 利用axios封装客户端请求通用方法
 * @description 单独封装是因为服务端阶段和客户端阶段取数方式不同
 * @description 需要在客户端阶段使用axios进行请求
 * @description 该文件在服务端阶段不会被执行
 * @notice 该文件在服务端阶段不会被执行 端能力数据 localstorage app jsbridge 对应数据
 */

import axios from 'axios';


const schttp = axios.create({  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000' });
schttp.interceptors.request.use(
  (config) => {
    // node 层不能出现语法错误
    const token = localStorage.getItem('token');
    config.headers['Authorization'] = token ? `Bearer ${token}` : '';
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