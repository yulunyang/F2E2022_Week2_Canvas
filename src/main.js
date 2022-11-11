import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import '@/assets/main.scss'
import moment from 'moment'
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
// import VuePdf from 'vue3-pdfjs'


const app = createApp(App)

app.config.globalProperties.$moment = moment
createApp(App).use(store).use(router).use(Vue3Lottie).mount('#app')
