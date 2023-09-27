import {createApp} from 'vue'
import * as VueRouter from 'vue-router'
import './index.css'


import App from './App.vue'
import Posts from './components/Posts.vue'
import Post from './components/Post.vue'

import Home from './components/Home.vue'
const About = { template: '<div>About</div>' }

const routes = [
  { path: '/', component: Posts, 
    meta: {
      title: "My Website",
      description: "This is the description of my website."
    }
   },
  { path: '/posts/:id', component: Post, props: true, name: 'Post',
    meta: { title: 'Cyclic - Deploy New App' }
   },
]
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
//   history: VueRouter.createWebHashHistory(),
  routes, 
})



const app = createApp(App)
app.use(router)
// app.use(useMeta)


app.mount('#app')

