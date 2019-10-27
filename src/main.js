import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// styles
import 'normalize.css'
import './styles/index.scss'
// global directives
Vue.directive('focus', {
  inserted (el) {
    el.focus()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
