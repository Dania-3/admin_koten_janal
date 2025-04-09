<style scoped>
@import "../style/menu.css";
@import "../style/menu_toggle.css";

</style>
 
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {modo} from "../plugin/modo_nocturno";

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const router = useRouter();
const irAReservas = () => {
  console.log("Navegando a /reservas");
  router.push("/reservas");
};

// Variable reactiva para alternar la imagen
const isImageOne = ref(true);
const toggleImage = () => {
  isImageOne.value = !isImageOne.value;
};

// Estado para controlar la expansión del menú
const isExpanded = ref(false);
// Función para alternar la clase 'expand'
const desplazar_menu = () => {
  isExpanded.value = !isExpanded.value;
};


// Llamada a la función modo al montar el componente
onMounted(() => {
  modo(); // Inicializa el comportamiento de modo nocturno
});

const nombre = ref('');
const puesto = ref('');

onMounted(() => {
  nombre.value = localStorage.getItem('nombre') || 'Usuario';
  puesto.value = localStorage.getItem('puesto') || 'Rol';
});

const CerrarSesion = () => {
  Swal.fire({
    html: `
      <h3 style="padding-bottom: 20px;">¿Quiere cerrar sesión?</h3>
      <div style="display: flex; justify-items: center; flex-direction: column;align-items: center;">
          <animated-icons
            src="https://animatedicons.co/get-icon?name=exit&style=minimalistic&token=6e09845f-509a-4b0a-a8b0-c47e168ad977"
            trigger="click"
            attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}'
            height="150"
            width="150"
          ></animated-icons>
      <p style= "color: #6B6767">Si deseas salir, haz clic en cerrar sesión. De lo contrario, selecciona cancelar para continuar trabajando.</p>
      </div>
    `,
    showCancelButton: true,
    didOpen: () => {
        // Cargar el script dinámicamente solo cuando se abre la alerta
        const script = document.createElement('script')
        script.src = 'https://animatedicons.co/scripts/embed-animated-icons.js'
        document.body.appendChild(script)
    },
    confirmButtonText: "cerrar sesion",
    cancelButtonText: "cancelar",
    customClass: {
      confirmButton: 'btn-confirm-green',
      cancelButton: 'btn-cancel'
    },
    buttonsStyling: false
  }).then((result) => {
    if (result.isConfirmed) {
      // Eliminar el token del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('nombre');
      localStorage.removeItem('puesto');

      // Notificación de éxito
      Swal.fire({
        title: "Se ha cerrado sesión",
        icon: "success"
      });

      // Redirigir al usuario a la página de login
      router.push("/");
    }
  });
};



</script>

<template>
    <aside :class="['sidebar-nav-wrapper', { expand: isExpanded }]" id="sidebar">
      <div class="navbar-logo px-3">
        <button id="toggle-btn" type="button" @click.prevent="desplazar_menu">
          <a href="#" id="toggle_menu" @click.prevent="toggleImage">
            <img :src="isImageOne
                ? '/imagenes/isologo_Koten.png'
                : '/imagenes/Logo_Koten_Janal.png'
              " id="logo_toggle" alt="logo_empresa" /><!-- <v-img src="@/assets/ic.png"></v-img>-->
          </a>
        </button>
      </div>
      <nav class="sidebar-nav">
        <ul class="mb-120">
          <li class="secciones_menu pl-15 mb-35 pt-10">
            <router-link to="/dashboard" class="d-flex align-items-center">
              <img src="/imagenes/dashboard.png" class="p-2" />
              <p class="m-0">Dashboard</p>
            </router-link>
          </li>
          <li class="pl-15 mb-35 pt-10">
            <router-link to="/reservas" class="d-flex align-items-center"><!--data-bs-toggle="collapse" data-bs-target="#ddmenu_1"-->
              <img src="/imagenes/reservas.png" class="p-2" />
              <p class="m-0">Reservas</p>
            </router-link>
          </li>
          <li class="pl-15 mb-35 pt-10">
            <!--los data-bs-target="#ddmenu_1" son como rutas donde se mostrara el contenido con el id #ddmenu_1-->
          <router-link to="/mesas"  class="d-flex align-items-center">
              <img src="/imagenes/mesas.png" class="p-2" />
              <p class="m-0">Mesas</p>
          </router-link>
          </li>
          <li class="pl-15 mb-35 pt-10">
            <router-link to="/empleados"  class="d-flex align-items-center">
              <img src="/imagenes/registros.svg" class="p-2" />
              <p class="m-0">Personal</p>
            </router-link>
          </li>
          <li class="pl-15 mb-35 pt-10">
            <router-link to="/horarios"  class="d-flex align-items-center">
              <img src="/imagenes/horarios.png" class="p-2" />
              <p class="m-0">Horarios</p>
            </router-link>
          </li>
        </ul>
        <ul>
          <li class="pb-3 pl-15 mb-35 pt-10">
            <a href="#0" aria-controls="ddmenu_1" aria-expanded="false" aria-label="Toggle navigation"
              class="d-flex align-items-center gap-2">
              <img src="/imagenes/usuarios.png" class="usuario p-2" />
              <div class="d-flex flex-column">
                <p class="m-0 pb-2">{{ nombre }}</p>
                <h6 class="m-0">{{ puesto }}</h6>
              </div>
            </a>
          </li>
          <li class="pl-15">
            <a @click="CerrarSesion" href="#0" aria-controls="ddmenu_1" aria-expanded="false" aria-label="Toggle navigation"
              class="d-flex align-items-center">
              <img src="/imagenes/salir.png" class="p-2" />
              <p class="m-0">Salir</p>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
</template>
<style>

.btn-confirm-green {
  margin-right: 10px;
  background-color: white;
  color: #26C347;
  border: 2px solid #26C347;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn-confirm-green:hover {
  background-color: #218838;
  color: white;
}

.btn-cancel {
  background-color: white;
  color: #F11818;
  border: 2px solid #F11818;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn-cancel:hover {
  background-color: #F11818;
  color: white;
}

</style>