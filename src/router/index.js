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
    meta: { requiresAuth: true } // 👈 Ruta protegida 
  },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: Reservas,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path: '/mesas',
      name: 'mesas',
      component: Mesas,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path: '/empleados',
      name: 'personal',
      component: empleados,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path: '/horarios',
      name: 'horarios',
      component: Horarios,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path: '/editar_personal/:id',
      name:'editar_personal',
      component:EditarPersonal,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path: '/agregar_personal',
      name:'agregar_personal',
      component:AgregarPersonal,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path: '/reservas_agregar',
      name:'ReservasAgregar',
      component: ReservasAgregar,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path:'/reservas_nuevo',
      name:'ReservasNuevo',
      component: ReservasNuevo,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path:'/eliminar_personal',
      name: 'EliminarPersonal',
      component:EliminarPersonal,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path:'/modificar_reserva/:id',
      name: 'ModificarReserva',
      component:ModificarReserva,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path: '/modificar_horario/:id',
      name: 'ModificarHorario',
      component: ModificarHorario,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    },
    {
      path:'/agregar_horario',
      name:'AgregarHorario',
      component:AgregarHorario,
      meta: { requiresAuth: true } // 👈 Ruta protegida
    }
    
  ];


const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🔐 Guard global para proteger rutas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth) {
    if (!token) {
      return next('/');
    }

    // Validación rápida (opcional): podrías decodificar el token para verificar expiración
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;

      if (payload.exp && payload.exp < now) {
        localStorage.removeItem('token'); // Limpias token vencido
        return next('/');
      }

      next(); // Token válido
    } catch (error) {
      localStorage.removeItem('token');
      return next('/');
    }
  } else {
    next();
  }
});

export default router;