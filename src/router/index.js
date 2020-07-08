import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)



const register = () => import('components/user/register.vue');
const login = () => import('components/user/login.vue');
const about = () => import('../views/about.vue');
const knowledge = () => import('../views/knowledge.vue')
const fit = () => import('../components/fit/fit.vue')
const rumor = () => import('../views/rumor.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
 
  {
    path: '/register',
    name: 'Register',
    meta: { title: '用户注册' },
    component: register
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '用户登录' },
    component: login
  },
  {
    path:'/knowledge',
    name: 'knowledge',
    component: knowledge

  },
  {
    path: '/fit',
    name: 'fit',
    component: fit
  },
  {
    path: '/rumor',
    name: 'rumor',
    component: rumor
  }
  
];


const router = new VueRouter({
  routes,
  // mode: 'history'
});


export default router;
