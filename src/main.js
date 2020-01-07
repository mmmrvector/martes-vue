// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VueAuth from '@websanova/vue-auth'
import VueCookies from 'vue-cookies'
import VueAxios from 'vue-axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.use(router)
Vue.use(ElementUI)
Vue.use(mavonEditor)

/*
Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: { url: 'http://localhost:3000/auth/login', fetchUser: false },
  fetchData: { url: 'http://localhost:3000/auth/profile', method: 'GET', enabled: true }
})
*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = Vue.$cookies.get('token')
    console.log('token', token)
    if (token === 'null' || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})
