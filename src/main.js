// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from './router'
import axios from 'axios'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue'

Vue.prototype.$http = axios
Validator.localize('zhCN', zhCN)
Vue.use(VeeValidate, {locale: 'zhCN'})
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: VueRouter,
  template: '<App/>',
  components: {App}
})
