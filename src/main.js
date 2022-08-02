import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'
import './assets/scss/global.scss'
import './index.css'
import BaseCard from './components/Base/BaseCard.vue'
import BaseBtn from './components/Base/BaseBtn.vue'
import '@fortawesome/fontawesome-free/js/all'

// perfectscrollbar plugins 
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import VueApexCharts from "vue3-apexcharts";
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'


// globally call 

// app.component('BaseBtn', BaseBtn)


createApp(App)
    .component('BaseCard', BaseCard)
    .component('BaseBtn', BaseBtn)
    .use(PerfectScrollbar)
    .use(VueApexCharts)
    .use(moshaToast)
    .use(store)
    .use(router)
    .mount('#app')
