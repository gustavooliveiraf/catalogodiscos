import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VueNotifications from 'vue-notification'
import BootstrapVue from 'bootstrap-vue'

import { routes } from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

Vue.use(VueNotifications);
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.http.options.root = 'http://localhost:8000';

const router = new VueRouter({ 
  routes, 
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
