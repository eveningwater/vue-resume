import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
/* eslint-disable no-new */
Vue.use(VueRouter);
const router = new VueRouter({
	mode:"history"
});


new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
