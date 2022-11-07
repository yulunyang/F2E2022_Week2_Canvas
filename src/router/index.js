import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HeaderSection from '@/components/modules/headerSection.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: () => import('../views/HomeView.vue'),
      nav: HeaderSection
    }
    // component: () => import('../views/HomeView.vue')
  },
  {
    path: '/records',
    name: 'records',
    component: () => import('../views/Records.vue')
  }
  // {
  //   path: '/',
  //   name: 'VueCanvasDrawing',
  //   component: () => import('../views/VueCanvasDrawing.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
