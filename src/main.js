import {createApp} from 'vue'
import * as VueRouter from 'vue-router'
import './index.css'


import App from './App.vue'
import Posts from './components/Posts.vue'
import Post from './components/Post.vue'

import Home from './components/Home.vue'
// import './assets/tailwind.css'
const About = { template: '<div>About</div>' }

const routes = [
  { path: '/', component: Posts },
  { path: '/posts/:id', component: Post, props: true, name: 'Post' },
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

