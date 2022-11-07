import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'canvas_drawing',
    component: () => import('../views/VueCanvasDrawing.vue')
  },
  // {
  //   path: '/canvas_pdf',
  //   name: 'canvas_pdf',
  //   component: () => import('../views/pdfPage.vue')
  // },
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
