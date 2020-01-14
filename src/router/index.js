import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import ArticleList from '../components/ArticleList'
import ArticleDetail from '../components/ArticleDetail'
import Account from '../components/Account'
import Register from '../components/Register'

Vue.use(Router)

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
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
