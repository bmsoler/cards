import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from './store'

import VueSocketio from 'vue-socket.io';
 
Vue.use(Vuetify, { theme: {
  //primary: '#607d8b',
  primary: '#307C9A',
  // secondary: '#424242',
  // accent: '#82B1FF',
  // error: '#FF5252',
  // info: '#2196F3',
  // success: '#4CAF50',
  // warning: '#FFC107'
}}) 

Vue.use(VueSocketio, '//localhost:3500');

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
