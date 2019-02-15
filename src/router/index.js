import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './../components/HomePage.vue';
import Laboratorio from './../components/Laboratorio.vue'
import Distribuidor from './../components/Distribuidor.vue'
import Transportador from './../components/Transportador.vue'
import Vendedor from './../components/Vendedor.vue'
import Consultas from './../components/Consultas.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/home', 
        name: 'Home',
        component: HomePage },

        { path: '/Laboratorio', 
        name: 'Laboratorio',
        component: Laboratorio },

        {path: '/Distribuidor', 
        name: 'Distribuidor',
        component: Distribuidor },

        {path: '/Transportador', 
        name: 'Transportador',
        component: Transportador },

        {path: '/Vendedor', 
        name: 'Vendedor',
        component: Vendedor },

        {path: '/Consultas',
        name: 'Consultas',
        component: Consultas}
    ]
});