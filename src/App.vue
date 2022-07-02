<template>
  <nav>
    <router-link to="/" class="myButton">Home</router-link>
    <router-link to="/ToDo" class="myButton">ToDo</router-link>
  </nav>
  <router-view />
</template>

<style>
body {
  background: url("@/assets/bg.svg");
 
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
  background-color: white;
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
