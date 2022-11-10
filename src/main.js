import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import '@/assets/main.scss'

import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import VuePdf from 'vue3-pdfjs'

createApp(App).use(store).use(router).use(Vue3Lottie).use(VuePdf).mount('#app')
