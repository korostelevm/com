<template>
    <div>
      <div class="header">
        <img alt="Vue logo" src="./assets/logo.png">
          <h1>Hello App!</h1>
          <p>
            <!-- use the router-link component for navigation. -->
            <!-- specify the link by passing the `to` prop. -->
            <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
            <router-link to="/">Go to Home</router-link>
            <!-- <router-link to="/posts"></router-link> -->
            <!-- <router-link to="/about">Go to About</router-link> -->
          </p>    
      </div>
    
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    console.log('App mounted!')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.header{
  text-align: center;
}
</style>
