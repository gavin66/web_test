import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '@/components/List'
import Add from '@/components/Add'
import Home from '@/components/Home'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'list',
      path: '/list',
      component: List
    }, {
      name: 'add',
      path: '/add',
      component: Add
    }
  ]
})
