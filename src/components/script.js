import axios from "axios";

var input = "";               
var responses = '';
var responsesJson = [];
var responseEnviar = '';
var responseEnviarJson = [];
var checkedMedicines = [];
var checkedMedicinesString = '';
var allSelected = false;
 
export function Search2() { 
        axios({ method: "GET", "url": "http://104.196.149.243:8085/medicinas"}).then(result => {
        responses = result.data;
        console.log(responses);
        if(responses !== '[]'){
            responses = responses.substring(1,responses.length-1)
            //console.log(responses);
            responsesJson = JSON.parse(responses) 
            //console.log(responsesJson);
            //console.log (typeof(responsesJson)); 
            //console.log(Array.from(responsesJson));  
            return (responses);
                               
        }else{
            responsesJson = {}
        }

        return (responses);

    }, error => {
        console.error(error);
    });
}




