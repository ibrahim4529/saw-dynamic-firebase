import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes  from 'virtual:generated-pages'
import {setupLayouts} from 'virtual:generated-layouts'
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
    history: createWebHistory(),
    routes,
  })
const app = createApp(App)
app.use(router)
app.mount('#app')
