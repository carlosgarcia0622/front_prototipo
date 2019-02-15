<template>
  <div class="form">

    <h1>Laboratorio</h1>
      <router-view/>







    <form v-if="registrar === true">

 

       
          <div class="form-group">
            <label for="id">Id producto  </label> 
            <input type="text" class="form-control" id="id" v-model="form.id" required >
          </div>

        <div class="form-group">
          <label for="name">Producto  </label> 
          <input type="text" class="form-control" id="name" v-model="form.name" required>
        </div>

        <div class="form-group">
          <label for="descripcion">Descripcion </label> 
          <input type="text" class="form-control" id="descripcion" v-model="form.descripcion" required>
        </div>

      <div class="form-group">
        <button type="button" class="btn btn-primary" v-on:click="create()">
          <span >Crear</span>
        </button>
        <button type="button" class="btn btn-primary" v-on:click="choseForm()">
          <span >Consultar</span>
      </button>
      </div>
    </form>

    <div  v-else>

      <table style="width:100%" id="medicines">
        <thead>
          <tr>
            <th><input type="checkbox"  id="all" v-model="allSelected" v-on:click="selectAll()" ><label for="all">Select All</label> </th>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Propietario</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(response) in responsesJson">
            <td><input type="checkbox"  v-bind:id="response.Record.id" v-model="checkedMedicines" v-bind:value="response.Record.id" v-on:click="select()"> </td>
            <td>{{response.Record.id}}</td>
            <td>{{response.Record.name}}</td>
            <td>{{response.Record.description}} </td>
            <td>{{response.Record.owner}}</td>
            <td>{{response.Record.state}}</td>
          </tr>
                 
        
          
        </tbody>
      </table>
     <!-- <span >checkedMedicines: {{checkedMedicines}}  </span>
      <span>{{checkedMedicinesString}}</span>-->
      <div>
        <button v-on:click="Search()">Buscar</button>
        <button v-on:click="send()">Enviar</button>
            

      <button type="button" class="btn btn-primary" v-on:click="choseForm()">
          <span >Crear</span>
      </button>
      </div>

      </div>


  </div>


</template>

<script>
import axios from "axios";

export default {
  
  name: "Laboratorio",
    data() {
    return {
      input: "",               
      responses:'',
      responsesJson:[],
      responseEnviar: '',
      responseEnviarJson: [],
      checkedMedicines:[],
      checkedMedicinesString:'',
      allSelected:false,
      registrar:true,
      form: {
        id: '',
        name: '',
        descripcion: ''
      }
    }
  },
  methods: {
    create() {axios({ method: "GET", "url": "http://104.196.149.243:8085/crearMedicina?id="+this.form.id+"&nombre="+this.form.name+"&descripcion="+this.form.descripcion}).then(result => {
                    this.responses = ''
                    this.responses = result.data;
                    this.responses = this.responses.substring(1,this.responses.length-1)
                    this.responsesJson = JSON.parse(this.responses)
                    if(this.responsesJson.id == this.form.id){
                      confirm("Medicina creada");
                       // this.form.id='';
                        //this.form.name='';
                        //this.form.descripcion='';
                        location.reload();
                    }else{
                      confirm("Se presentaron problemas al crear la medicina");
                    }


                    


                }, error => {
                    console.error(error);
                });
        },

    choseForm(){

      if (this.registrar===true){
          this.registrar=false
      }else{
         this.registrar=true
      }

  },

           Search() { 
                    axios({ method: "GET", "url": "http://104.196.149.243:8085/buscarPorOrg?org=Laboratorio"}).then(result => {
                    this.responses = result.data;
                    if(this.responses !== '[]'){
                      this.responses = this.responses.substring(1,this.responses.length-1)
                      this.responsesJson = JSON.parse(this.responses)                       
                    }else{
                      this.responsesJson = {}
                    }

                }, error => {
                    console.error(error);
                });
        },

        selectAll() {
            this.checkedMedicines = [];
             if (!this.allSelected) {
               // for (respon in this.responses) {
                 //    console.log('chao');
                     //this.checkedMedicines.push(this.responses[respon].price);
                //}
                for (let index = 0; index < this.responsesJson.length; index++) {
                    
                    this.checkedMedicines.push(this.responsesJson[index].Record.id);
                  
                    
                    
                }
                
                 

             }
        },
        select() {
            this.allSelected = false;
            
        },

        async send(){
          this.checkedMedicinesString = '';
          for(let index=0; index< this.checkedMedicines.length;index++  ){
              this.checkedMedicinesString = this.checkedMedicinesString.concat(this.checkedMedicines[index]+',');
            }
          this.checkedMedicinesString = this.checkedMedicinesString.substring(0,this.checkedMedicinesString.length-1)

          if(this.checkedMedicines.length == 1){
              await axios({ method: "GET", "url": "http://104.196.149.243:8085/distribuirMedicina?id="+this.checkedMedicines[0]}).then(result=>{
              
              this.responseEnviar = result.data;
              this.responseEnviar = this.responseEnviar.substring(1,this.responseEnviar.length-1)
              this.responseEnviarJson = JSON.parse(this.responseEnviar)
            });
          }else{
             await axios({ method: "GET", "url": "http://104.196.149.243:8085/distribuirLista?list="+this.checkedMedicinesString}).then(result=>{
             
              this.responseEnviar = result.data;
              this.responseEnviar = this.responseEnviar.substring(1,this.responseEnviar.length-1)
              
            });
          }

          this.checkedMedicines=[];
          this.Search();

        },
           
         
    

      
      
    },


    




};



</script>

<style scoped>
@import url("../styles/style.css"); 
</style> 

<!--<style lang="css" scoped>
pre {
    white-space: pre-line;
}

form {
    background: #efefef;
    padding: 2rem 2rem 1rem;
}

.form{
  align-content: center;

 
 

}

</style>-->



