import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import axios from 'axios';
axios.defaults.withCredentials = true;

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const vue = createApp(App);
vue.use(router);
vue.use(store);
vue.provide('$store', store);
vue.provide('$axios', axios);
vue.mount('#app');

