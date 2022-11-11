import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import HeaderSection from '@/components/modules/headerSection.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    // components: {
    //   default: () => import('../views/HomeView.vue'),
    //   nav: HeaderSection
    // }
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/records',
    name: 'records',
    component: () => import('../views/Records.vue')
  },
  {
    path: '/pdfViewer/:id',
    name: 'PdfListHistory',
    component: () => import('../views/PdfListHistory.vue')
  },

  // test
  {
    path: '/test',
    name: 'VueCanvasDrawing',
    component: () => import('../views/TestCanvasDrawing.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach ((to, from) => {
//   console.log(to, from)
// })
export default router
