<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div class = "header" id = "headers"></div>
    <router-view />
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import Footer from './components/common/Footer'
export default {
  name: 'App',
  components: {Footer}
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
  .footer {
    position: absolute;
    bottom: 10px;
    text-align: center;
  }
</style>
