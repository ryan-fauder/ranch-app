<template>
  <div class="app">
    <NavBar @changeContent="setContent"/>
    <main id="main-container">
      <RouterView />
    </main>
  </div>
</template>

<script>
import NavBar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  methods: {
    setContent(newContent){
      console.log("CONTENT: ", newContent);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto auto;
  background: "black";
}
.app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-width: 100vw;
  min-height: 100vh;
}
#main-container{
  display: grid;
  align-items: center;
  justify-items: center;
  margin-top: 2rem;
}
</style>
