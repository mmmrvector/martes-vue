import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import ArticleList from '../components/ArticleList'
import ArticleDetail from '../components/ArticleDetail'
import Account from '../components/Account'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld,
      meta: {
        /*
         * Vue-auth
         * auth 有一个default属性authRedirect: { path: 'login' }
         */
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticleList
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ArticleDetail
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    }
  ]
})
