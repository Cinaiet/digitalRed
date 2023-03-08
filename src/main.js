import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import './style/normal.less'
import VueClipboard from 'vue-clipboard2'
// 插件
import '@/plugins/vant'
import { sync } from 'vuex-router-sync'
import store from '@/store'
import router from '@/router'
import ajax from '@/request/ajax'
Vue.use(VueClipboard)
sync(store, router)
Vue.config.productionTip = false
Vue.config.productionTip = false
Vue.prototype.$get = ajax.getJson
Vue.prototype.$post = ajax.postJson
Vue.config.debug = true
let vueObj = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
window.vue = vueObj

export { vueObj, store }
