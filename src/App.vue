<template class="bg">
  <div id="app" >
    <img alt="Vue logo" src="./assets/logo.png" />
    
    <!--<HelloWorld msg="Welcome to Your Vue.js App" />-->
    <HomePage msg="Welcome to Your Vue.js App"/>

  </div>
  
</template>

    <style lang="css" scoped>
      div {background:linear-gradient(to bottom, #ffffff 15%, #66ccff 220%);};
      </style>

<script>
import HomePage from "./components/HomePage.vue";


export default {
  name: "app",
  components: {
    HomePage,
  }
};




</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.bg { 
  /* The image used */
  background-image: url("./assets/Background.png");

  /* Full height */
  height: 100%; 

  /* Center and scale the image nicely */
  /*background-position: center;*/
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
