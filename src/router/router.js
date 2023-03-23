import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/store"

const requireAuth = isAuth => (from, to, next) => {
    const isAccess = store.getters["isAuth"];

    if ((isAccess && isAuth) || (!isAccess && !isAuth)) {
        next(from.fullPath);
    } else {
        next("/");
    }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../components/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      beforeEnter: requireAuth(true),
      component: () => import('../components/main/Main.vue')
    }
  ]
});

export default router;
