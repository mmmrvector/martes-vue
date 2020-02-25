import { API_HOST } from '../api/config';
import Vue from 'vue';

// 登录
export function login (username, password) {
  return Vue.axios.post(`${API_HOST}/auth/login`, { username, password });
}

// 获取用户信息
export function getProfile (token) {
  return Vue.axios.get(`${API_HOST}/auth/profile`,
    {
      headers: { Authorization: `Bearer ${token}` }
    });
}

// 注册
export function register (data, token) {
  return Vue.axios.post(`${API_HOST}/user`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` }
    });
}
