// jshint esversion:6


import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/main.css';
import vuetify from './plugins/vuetify';
import vuescroll from 'vuescroll';
import TokenService from './services/storage.service';
import ApiService from './services/api.service';



import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarDay,
  faColumns,
  faIdCardAlt,
  faCogs,
  faBell,
  faRoute,
  faTasks,
  faFile,
  faSlidersH,
  faEllipsisH,
  faPlus

} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';

library.add(faCalendarDay, faColumns, faIdCardAlt, faCogs, faBell, faRoute, faTasks, faFile, faSlidersH, faEllipsisH, faPlus);

Vue.component('font-awesome-icon', FontAwesomeIcon);


// You can set global config here.
Vue.use(vuescroll, {
  ops: {
    // The global config
  },
  name: 'vuescroll' // customize component name, default -> vueScroll
});


// Set the base URL of the API
console.log(ApiService);

ApiService.init(process.env.VUE_APP_ROOT_API);

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader();
}


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');