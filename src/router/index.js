import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TransformationView from '../views/TransformationView.vue';
import InfoPageView from '@/views/InfoPageView.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/transformation/:id',
    name: 'TransformationView',
    component: TransformationView,
  },
  {
    path: '/info/:id',
    name: 'InfoPageView',
    component: InfoPageView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `Dragon Ball Z - ${to.name}`;
  next();
});

export default router;
