import Vue from 'vue'
import App from './App.vue'

// 引入element-ui
import ElementUI from 'element-ui';
//引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css';
//引入axios
import axios from "axios";
//引入router
import VueRouter from "vue-router";
//引入路由器
import router from "./router";


Vue.config.productionTip = false

//应用element-ui
Vue.use(ElementUI);
//应用axios
Vue.prototype.$axios = axios;
//应用router
Vue.use(VueRouter);


new Vue({
  el:'#app',
  axios,
  render: h => h(App),
  router:router,
})
