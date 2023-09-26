<template>
  <div>
    <h1>Posts</h1>
      <div v-if="posts.length">
      <div  v-for="post in posts" :key="post.title">
        <router-link :to="{name: 'Post', params: {id: post.metadata.slug}}">
          <h3>{{post.metadata.title}}</h3>
        </router-link>
        
        <!-- <post :post="post"></post> -->

        <!-- <h3>{{post.title}}</h3>
        <p>{{post.body}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  props: {
    msg: String
  },
  data(){
    return{
      posts: []
    }
  },
  mounted() {   
    this.getPosts()
    },
  methods:{
    async getPosts(){
      let res = await axios.get('/api/posts')
      this.posts = res.data
      console.log(this.posts)

    }
    
  }
}
</script>

