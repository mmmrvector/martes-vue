import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/pages/HelloWorld';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Article from '@/pages/article/Article';
import ArticleList from '@/pages/article/ArticleList';
import ArticleDetail from '@/pages/article/ArticleDetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/articles',
      name: 'article',
      component: Article,
      redirect: '/articleList',
      children: [
        {
          path: '/articleList',
          name: 'articleList',
          component: ArticleList
        },
        {
          path: '/articleDetail',
          name: 'articleDetail',
          component: ArticleDetail
        }
      ]
    }
  ]
});
