import { API_HOST } from './config';
import Vue from 'vue';

export function getArticleList (p) {
  return Vue.axios.get(`${API_HOST}/article/all?p=${p}&ps=3`);
}
