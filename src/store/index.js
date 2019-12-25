// jshint esversion:6

import Vue from 'vue';
import Vuex from 'vuex';


import auth from './modules/auth';
import project from './modules/project';
import showProject from './modules/showProject'
import board from './modules/board'
import task from './modules/task'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    project,
    showProject,
    board,
    task
  },
  strict: false


});