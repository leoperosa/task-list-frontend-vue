import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import TaskList from './views/TaskList.vue';
import TaskForm from './views/TaskForm.vue';
import TaskFormStatus from './views/TaskFormStatus.vue';


const isAuthenticated = () => !!localStorage.getItem('auth');

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/tasks',
    name: 'TaskList',
    component: TaskList,
    props: true,
    beforeEnter: (to, from, next) => {
      const auth = localStorage.getItem('auth');
      return auth ? next() : next('/');
    }
  },
  {
    path: '/task/:id',
    name: 'TaskForm',
    component: TaskForm,
    props: true,
    beforeEnter: (to, from, next) => isAuthenticated() ? next() : next('/'),
  },
  {
    path: '/task/:id/status',
    name: 'TaskFormStatus',
    props: true,
    component: TaskFormStatus,
    beforeEnter: (to, from, next) => isAuthenticated() ? next() : next('/'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;