import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToDo from '../views/ToDo.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/todo',
    name: 'Tareas',
    component: ToDo,
    meta: {
      title: 'Cosas que hacer'
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from,  next)=>{
  document.title = `${to.meta.title}`;
  next();
})

export default router
