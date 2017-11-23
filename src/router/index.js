import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '@/components/List'
import Add from '@/components/Add'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    }, {
      path: '/add',
      name: 'add',
      component: Add
    }
  ]
})
