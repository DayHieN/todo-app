<template>
  <img alt="heihachi?" src="@/assets/memoria.jpg" />
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/ToDo">ToDo</router-link> |
  </nav>
  <router-view />
</template>

<style>
body {
  background: #e8e8e8;
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
  color: #42b983;
}

img {
  object-fit: cover;

  width: 300px;
}
</style>
