<template>
  <nav>
    <!-- <img src="@/assets/blob.svg" alt="" srcset=""> -->
    <router-link to="/" class="myButton">Home</router-link>
    <router-link to="/ToDo" class="myButton">ToDo</router-link>
  </nav>
  <router-view />
  <!-- <Footer/> -->
</template>
<script>
import Footer from "@/shared/Footer.vue";
export default {
  components: {
    Footer,
  },
};
</script>
<style>
body {
  background: rgb(124, 124, 234);
  display: flex;
  justify-content: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #b8e986;
}

img {
  object-fit: cover;

  width: 300px;
}
</style>
