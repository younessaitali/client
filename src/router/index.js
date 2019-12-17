import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/signup.vue';
import Login from '../views/login.vue';
import Project from '../views/Projects.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/signup',
    name: 'signup',
    component: Signup
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/project',
    name: 'project',
    component: Project
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router