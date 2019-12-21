// jshint esversion:6

import Vue from 'vue';
import Vuex from 'vuex';


import auth from './modules/auth';
import project from './modules/project';
import showProject from './modules/showProject'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    project,
    showProject
  },
  strict: false


});