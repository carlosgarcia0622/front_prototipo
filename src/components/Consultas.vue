<template>
    
    <div class="Consultas">
      <h1>Consultas</h1>
      <router-view/>
      <div v-if="selectTable">
        
        <input type="text" v-model="input" placeholder="Ingrese el Id" >
        <button style="margin:10px" v-on:click="consultarHistorial()">Consultar</button>
        
        <table  id="medicines" style="width:40%; margin: 20px auto">
          <thead>
            <tr>
              <th>Id Medicina</th>
              <th>Medicina</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(response) in responsesJson2"  >
              <td>{{response.value.id}}</td>
              <td>{{response.value.name}}</td>
              <td>{{response.value.description}}</td>
            </tr>
          </tbody>


        </table>
        
        
        <table  style="width:100%" id="medicines">
          <thead>
            <tr>
              <th>Estado</th>
              <th>Propietario</th>
              <th>Fecha</th>
              <th>Id Transacción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(response) in responsesJson" >
              <td>{{response.value.state}}</td>
              <td>{{response.value.owner}}</td>
              <td>{{response.timestamp}}</td>
              <td>{{response.tx_id}}</td>
            </tr> 
          </tbody>
          

        </table>
        
        <button v-on:click="changeTable()">Ver todos</button>

        
      </div>
      <div v-else>
      <table  style="width:100%" id="medicines">
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
        <button v-on:click="Search()">Medicinas</button>
        <button v-on:click="changeTable()">Historial</button>
      </div>
    <div>

      
      </div>
    </div>
</template>


<script>
import axios from "axios";
//import {Search2} from "./script.js";

export default {
  
  name: "Consultas",
        data () {
            return {

                selectTable: false,               
                input: "", 
                              
                responses:'',
                responsesJson: [],
                responsesJson2: [],
                responseEnviar: '',
                responseEnviarJson: [],
                checkedMedicines:[],
                checkedMedicinesString:'',
                allSelected:false
                }
            
        },
        
        methods: {
           Search() { 
                    axios({ method: "GET", "url": "http://104.196.149.243:8085/medicinas"}).then(result => {
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
        consultarHistorial(){ 
          if(this.input === ''){
            alert('Ingrese el Id del medicamento')
          }else{
            axios({method:"GET","url":"http://104.196.149.243:8085/consultarHistorial?id="+this.input}).then(result=>{
            this.responsesJson = result.data;
                       
            if(result.data.length !== 0){
              this.responsesJson2 = []; 
              this.responsesJson2.push(this.responsesJson[0]) ;
            }else{
              console.log('Hola')
            }


            }, error =>{
              console.error(error);
            })
          }

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
        changeTable(){
          this.responses = '';
          this.responsesJson = [];
          if(this.selectTable === false){
            this.selectTable=true;
          }else{
            this.selectTable=false;
          }
        }


           
         }
    }


</script>



<style scoped>
@import url("../styles/style.css"); 
</style> 