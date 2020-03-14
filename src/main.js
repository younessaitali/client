// jshint esversion:6


import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/main.css';
import vuetify from './plugins/vuetify';
import vuescroll from 'vuescroll';
import VueDragscroll from 'vue-dragscroll'

import TokenService from './services/storage.service';
import ApiService from './services/api.service';






// import Echo from 'laravel-echo'




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
  faPlus,
  faFeatherAlt,
  faAlignRight,
  faSave,
  faUser,
  faTags,
  faCheckSquare,
  faEdit,
  faTrashAlt,
  faHome

} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';

Vue.use(VueDragscroll)


//* \\\\\\\\font awesome\\\\\\\\\\\\ 
library.add(faEdit, faHome, faTrashAlt, faAlignRight, faCalendarDay, faColumns, faIdCardAlt, faCogs, faBell, faRoute, faTasks, faFile, faSlidersH, faEllipsisH, faPlus, faFeatherAlt, faSave, faUser, faTags, faCheckSquare);

Vue.component('font-awesome-icon', FontAwesomeIcon);


//* Vue Scroll.
//* You can set global config here.
Vue.use(vuescroll, {
  ops: {
    // The global config
  },
  name: 'vuescroll' // customize component name, default -> vueScroll
});

//* jwt Setup
//* Set the base URL of the API

ApiService.init(process.env.VUE_APP_ROOT_API);


// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader();
}


//* custom directive for closable  

// This variable will hold the reference to
// document's click handler
let handleOutsideClick;

Vue.directive("closable", {
  bind(el, binding, vnode) {
    // Here's the click/touchstart handler
    // (it is registered below)
    handleOutsideClick = e => {
      e.stopPropagation();
      // Get the handler method name and the exclude array
      // from the object used in v-closable
      const {
        handler,
        exclude
      } = binding.value;

      // This variable indicates if the clicked element is excluded
      let clickedOnExcludedEl = false;
      exclude.forEach(refName => {
        // We only run this code if we haven't detected
        // any excluded element yet
        if (!clickedOnExcludedEl) {
          // Get the element using the reference name
          const excludedEl = vnode.context.$refs[refName];
          // See if this excluded element
          // is the same element the user just clicked on
          clickedOnExcludedEl = excludedEl.contains(e.target);
        }
      });

      // We check to see if the clicked element is not
      // the dialog element and not excluded
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        // If the clicked element is outside the dialog
        // and not the button, then call the outside-click handler
        // from the same component this directive is used in
        vnode.context[handler]();
      }
    };
    // Register click/touchstart event listeners on the whole page
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
  },

  unbind() {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("touchstart", handleOutsideClick);
  }
});


//laravel eco config 

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: '77c6e23840f549a91042',
//   cluster: 'eu',
//   encrypted: false
// });





Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');