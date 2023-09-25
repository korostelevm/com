import {createApp} from 'vue'
import * as VueRouter from 'vue-router'

import App from './App.vue'

import Home from './components/Home.vue'
const About = { template: '<div>About</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
//   history: VueRouter.createWebHashHistory(),
  routes, 
})

const app = createApp(App)
app.use(router)


app.mount('#app')
