<template>
  <div class="Transportador">
      
      <h1>Transportador</h1>
      <router-view/>
      
      <!--<router-link to="/">Voy a home</router-link>-->
      <h3></h3>      
      
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
      
      </div>
    
    


  </div>
  

</template>

<script>
import axios from "axios";

export default {
  
  name: "Transportador",
        data () {
            return {
               
                input: "",               
                responses:'',
                responsesJson:[],
                responseEnviar: '',
                responseEnviarJson: [],
                checkedMedicines:[],
                checkedMedicinesString:'',
                allSelected:false
                }
            
        },
        
        methods: {
           Search() { 
                    axios({ method: "GET", "url": "http://104.196.149.243:8085/buscarPorOrg?org=Transportador"}).then(result => {
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
              await axios({ method: "GET", "url": "http://104.196.149.243:8085/entregarMedicina?id="+this.checkedMedicines[0]}).then(result=>{
              
              this.responseEnviar = result.data;
              this.responseEnviar = this.responseEnviar.substring(1,this.responseEnviar.length-1)
              this.responseEnviarJson = JSON.parse(this.responseEnviar)
            });
          }else{
             await axios({ method: "GET", "url": "http://104.196.149.243:8085/entregarLista?list="+this.checkedMedicinesString}).then(result=>{
             
              this.responseEnviar = result.data;
              this.responseEnviar = this.responseEnviar.substring(1,this.responseEnviar.length-1)
              
            });
          }
          this.checkedMedicines=[];
          this.Search();

        }
           
         }
    }


</script>



<style scoped>
@import url("../styles/style.css"); 
</style> 
