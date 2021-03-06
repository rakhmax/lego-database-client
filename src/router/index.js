import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/pages/Login.vue';
import AuthHelper from '@/helpers/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    components: { login: Login },
    meta: { title: 'BrickCollector' },
  },
  {
    path: '/minifigures',
    name: 'Minifigures',
    component: () => import('../pages/Minifigures.vue'),
    meta: {
      requiresAuth: true,
      title: 'minifigures',
      withExtensionBar: true,
    },
  },
  {
    path: '/minifigures/:itemId',
    name: 'Minifigure',
    component: () => import('../pages/MinifigureItem.vue'),
    meta: {
      requiresAuth: true,
      title: 'minifigure',
      // withExtensionBar: true,
    },
  },
  {
    path: '/sets',
    name: 'Sets',
    component: () => import('../pages/Sets.vue'),
    meta: {
      requiresAuth: true,
      title: 'sets',
      withExtensionBar: true,
    },
  },
  {
    path: '/sets/:itemId',
    name: 'Set',
    component: () => import('../pages/SetItem.vue'),
    meta: {
      requiresAuth: true,
      title: 'set',
      // withExtensionBar: true,
    },
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('../pages/Wishlist.vue'),
    meta: {
      requiresAuth: true,
      title: 'wishlist',
    },
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('../pages/Statistics.vue'),
    meta: {
      requiresAuth: true,
      title: 'statistics',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const auth = new AuthHelper();

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthentificated()) next({ name: 'Login' });
  else if (to.name === 'Login' && auth.isAuthentificated()) next({ name: from.name || 'Statistics' });
  else {
    document.title = Vue.prototype.$t(to.meta.title) || 'BrickCollector';
    next();
  }
});

export default router;
