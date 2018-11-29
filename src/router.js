import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Detail from './views/Detail'
import Create from './views/Create'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    }
  ]
})
