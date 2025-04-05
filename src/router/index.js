import { createRouter, createWebHistory } from 'vue-router';

/*import HelloWorld from '@/components/HelloWorld.vue'; // Asegúrate de que esta ruta es correcta*/
import Reservas from '../components/reservas.vue';
import Mesas from '../components/mesas.vue';
import empleados from '../components/empleados.vue';
import Horarios from '../components/horarios.vue';
import Dashboard from '../components/dashboard.vue';
import Login from '../components/login.vue';
import Menu from '../components/menu.vue';

import EditarPersonal from '../components/formularios/EditarPersonal.vue';
import AgregarPersonal from '../components/formularios/AgregarPersonal.vue';
import ReservasAgregar from '../components/formularios/ReservasAgregar.vue';
import ReservasNuevo from '../components/formularios/ReservasNuevo.vue';
import EliminarPersonal from '../components/formularios/EliminarPersonal.vue';
import ModificarReserva from '../components/formularios/ModificarReserva.vue';
import ModificarHorario from '../components/formularios/ModificarHorario.vue';
import AgregarHorario from '../components/formularios/AgregarHorario.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name:'menu',
    component: Menu, 
  },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: Reservas
    },
    {
      path: '/mesas',
      name: 'mesas',
      component: Mesas
    },
    {
      path: '/empleados',
      name: 'personal',
      component: empleados
    },
    {
      path: '/horarios',
      name: 'horarios',
      component: Horarios
    },
    {
      path: '/editar_personal',
      name:'editar_personal',
      component:EditarPersonal
    },
    {
      path: '/agregar_personal',
      name:'agregar_personal',
      component:AgregarPersonal
    },
    {
      path: '/reservas_agregar',
      name:'ReservasAgregar',
      component: ReservasAgregar
    },
    {
      path:'/reservas_nuevo',
      name:'ReservasNuevo',
      component: ReservasNuevo
    },
    {
      path:'/eliminar_personal',
      name: 'EliminarPersonal',
      component:EliminarPersonal
    },
    {
      path:'/modificar_reserva',
      name: 'ModificarReserva',
      component:ModificarReserva
    },
    {
      path: '/modificar_horario/:id',
      name: 'ModificarHorario',
      component: ModificarHorario
    },
    {
      path:'/agregar_horario',
      name:'AgregarHorario',
      component:AgregarHorario
    }
    
  ];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

/*
const routes = [
  {
    path: '/',
    name:'dashboard',
    component: Dashboard
  },
  {
    path:'/admin',
    name: 'admin',
    component: Menu
  },
  {
    path:'/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reservas',
    name: 'reservas',
    component: Reservas
  },
  {
    path: '/Mesas',
    name: 'mesas',
    component: Mesas
  },
  {
    path: '/empleados',
    name: 'personal',
    component: Personal
  },
  {
    path: '/horarios',
    name: 'horarios',
    component: Horarios
  },
];

*/
