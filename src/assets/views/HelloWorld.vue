<template>
    
    <div class="hello">
        <router-view/>
        
        <h2>Seleccione una compañía</h2>

        <select  v-model="org">
            <option >Laboratorio</option>
            <option >Distribuidor</option>
            <option >Transportador</option>
            <option >Vendedor</option>
            <option >Consultas</option>
        </select>
        
        
        <div><button v-on:click="navigate()">Ingresar</button></div>
        
        


    </div>

</template>

<script>
import router from "./../router/index.js";





export default {

  data() { return { 
      org:''}
  },
  name: "HelloWorld",
  methods: {
           navigate() { router.replace(this.org);}
           
         }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

div {
  margin: 20px;
}


select {
     background:#ffff;
     border: none;
     font-size: 14px;
     height: 30px;
     padding: 5px;
     width: 250px;
  }
</style>

