import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


/* 引入ElemenUI */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import echarts from 'echarts'
// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });
router.beforeEach((to,from,next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});


import Axios from 'axios';
Axios.defaults.baseURL = 'http://39.100.244.147:5000';
import request from './network/request.js';
Vue.prototype.$ajax = request;
  

import Moment from 'moment';
Vue.prototype.$moment = Moment;
Vue.filter('dateFormat', (dateString) => {
  return Moment(dateString).format('YYYY-MM-DD hh:mm:ss');
});

Vue.config.productionTip = false;
// 事件总线
Vue.prototype.$bus = new Vue();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
