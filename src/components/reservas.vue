<script setup>
// estructura para funciones
import { ref } from "vue";
import admin_menu from './menu_admin.vue';
import footer_admin from './footer.vue';
import admin_header from './header_admin.vue';
import { computed } from "vue";

const filtro =ref("all");
const searchQuery = ref('');
var datos = ref([
{id:1, nombre: 'like',correo: 'like@jedi.com', numero: 123456, fecha: '2025-03-29', hora: '14:00', mesa: 'mesa 5', comensales: 4, estatus: 'cancelado', edicion: '/public/imagenes/editar.png', edicion1:'/public/imagenes/eliminar.png'},
{id:2, nombre: 'chavos',correo: 'chavos@jedi.com', numero: 123456, fecha: '2025-03-29', hora: '14:00', mesa: 'mesa 5', comensales: 4, estatus: 'cancelado', edicion: '/public/imagenes/editar.png', edicion1:'/public/imagenes/eliminar.png'},
{id:3, nombre: 'dania',correo: 'dania@jedi.com', numero: 123456, fecha: '2025-03-29', hora: '14:00', mesa: 'mesa 5', comensales: 4, estatus: 'cancelado', edicion: '/public/imagenes/editar.png', edicion1:'/public/imagenes/eliminar.png'},
{id:4, nombre: 'domi',correo: 'domi@jedi.com', numero: 123456, fecha: '2025-03-29', hora: '14:00', mesa: 'mesa 5', comensales: 4, estatus: 'cancelado', edicion: '/public/imagenes/editar.png', edicion1:'/public/imagenes/eliminar.png'},
]);

const confirmarAccion = () => {
  const respuesta = window.confirm("¿Deseas eliminar?");
  
  if (respuesta) {
    alert("Se ha borrado exitosamente.");
  }
};
const filteredReserve = computed(() => {
  return datos.value.filter(dato =>
    dato.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  
});
/*const datostabla = computed(()=>{
  return datos.value.filter(dato=>{
            if(filtro.value=== "all"){
                return true;
            }
            if(FileReader.value=== "mesa") return dato.mesa.toLowerCase() === buscar.value;
            return true;
        })
});
*/

</script>

<template>
  <admin_menu />
<div class="main">
    <admin_header />
    <section class="pagina container-fluid main_espacio pl-50 pr-50">
      <div class="row secciones-tablas">
        <div class="col-11 gap-5 d-flex justify-content-center align-items-center">
                <form class="buscador text-start bg-white d-flex align-items-center w-75">
                    <input type="text"  v-model="searchQuery"  placeholder="Buscar reserva" id="barra_buscar" />
                    <button id="buscar"> <!--id="buscar"-->
                    <img src="/public/imagenes/buscador.png" alt="buscador" />
                    </button>
                </form>
            </div>
        <div class="col-1 d-flex justify-content-end align-items-center">
          <router-link to="/reservas_agregar">
          <button class="btn-verde" id="nuevo">
            <img src="/public/imagenes/nuevo.png" id="img_nuevo" />
          </button>
          </router-link>
        </div>
     
        <section class="col-12 pt-5 overflow-auto" style="height: 700px; overflow-y: scroll;">
          <table class="rwd-table" id="tabla">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Correo</th>
                <th>Número</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Mesa</th>
                <th>Comensales</th>
                <th>Estatus</th>
                <th>Edición</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dato in filteredReserve":key="dato.id">
                <td data-th="Cliente">{{ dato.nombre }}</td>
                <td data-th="Correo">{{dato.correo}}</td>
                <td data-th="Número">{{ dato.numero }}</td>
                <td data-th="Fecha">{{dato.fecha}}</td>
                <td data-th="Hora">{{ dato.hora }}</td>
                <td data-th="Mesa">{{ dato.mesa }}</td>
                <td data-th="Comensales">{{ dato.comensales }}</td>
                <td data-th="Estatus">{{ dato.estatus }}</td>
                <td data-th="Edición"><router-link to="/modificar_reserva"><button class="btn-verde" id="editar"><img :src="dato.edicion" id="img_editar"/></button> </router-link to="/eliminar_reservas"><button class="delete-btn" @click="confirmarAccion" id="editar"><img :src="dato.edicion1" id="img_eliminar"/></button> </td>
              </tr>
            </tbody>
          </table>
        </section>
        
      </div>
    </section>
    <footer_admin />
</div>

</template>

<style scoped>


.pagina {
  /*background-color: #23a200;*/
  height: 800px;

}

select,
select option {
  font-size: 30px;
}
.delete-btn {
    background-color: #D64040;
    font-family: 'Merriweather';
    color: white;
    padding: 17px;
    border-radius: 10px;
}
.delete-btn:hover {
    background-color: #972020; 
}

/*******buscador************/
#barra_buscar {
  background-color: white;
  font-size: 24px;
  width: 95%;
}

.buscador {
  border: 2px solid #000000;
  border-radius: 8px;
  width: 280px;
  padding: 5px;

}

.filtros.btn {
  display: flex;
  background-color: black;
  color: white;
  width: 180px;
  border-radius: 8px;
  padding: 3px;

  appearance: none;
  /* Oculta la flecha predeterminada */
  -webkit-appearance: none;
  -moz-appearance: none;

  background-position: right 10px center;
  /* Ajusta la posición */
  background-repeat: no-repeat;
  background-image: url(/public/imagenes/flecha.png);
  background-size: 30px;
}


:root {
  --botones: #23a200;
}

#img_nuevo {
  margin-left: 1px;
}
#img_editar{
  margin-left: 15px;
}

/*********************botones y circulos******************/

.btn-verde:hover {
  background-color: #238707;
}

.circulos:hover {
  background-color: #cbb4af;
}

.circulos-flecha:hover {
  background-color: #000000;
  color: white;
}

.circulos-flecha:active {
  transform: scale(0.99);
  box-shadow: 0 3px 5px #00000080;

}

.circulos:active {
  transform: scale(0.99);
  box-shadow: 0 3px 5px #00000080;
  font-weight: 600;
}
</style>

<!--
/*********************TABLAS******************/
table{
  border-radius: 80px;
}

.rwd-table {
  
  margin: 2em 0;
  min-width: 500px;
  border-collapse: collapse;
}
.rwd-table th {
  display: none;
  background-color: #dcd4d4; /*cambiar el color*/
  border-bottom: 3px solid #000000;
}
.rwd-table td {
  display: block;
}
.rwd-table td:first-child {
  padding-top: 0.5em;
}
.rwd-table td:last-child {
  padding-bottom: 0.5em;
}
.rwd-table td:before {
  content: attr(data-th) ": ";
  font-weight: bold;
  width: 6.5em;
  display: inline-block;
}
@media (min-width: 480px) {
  .rwd-table td:before {
    display: none;
  }
}
.rwd-table th,
.rwd-table td {
  text-align: left;
}
@media (min-width: 480px) {
  .rwd-table th,
  .rwd-table td {
    display: table-cell;
    padding: 0.25em 0.5em;
  }
  .rwd-table th:first-child,
  .rwd-table td:first-child {
    padding-left: 0;
  }
  .rwd-table th:last-child,
  .rwd-table td:last-child {
    padding-right: 0;
  }
}

/*body {
    padding: 0 2em;
    font-family: Montserrat, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    color: #444;
    background: #eee;
  }
  
  h1 {
    font-weight: normal;
    letter-spacing: -1px;
    color: #34495e;
  }
  */
.rwd-table {
  background: #efefef;
  color: #100a0a;
  border-radius: 0.4em;
  /*border-bottom: 1px solid #000000;*/
  /*overflow: hidden;*/
}
.rwd-table tr {
  border-color: #05233f;
  border-bottom: 2px solid #000000;
}
.rwd-table th,
.rwd-table td {
  margin: 0.5em 1em;
}
@media (min-width: 480px) {
  .rwd-table th,
  .rwd-table td {
    padding: 1em !important;
  }
}
.rwd-table th,
.rwd-table td:before {
  color: #480028;
}


<template>
    <div>
      <button @click="toggleMenu" class="btn">Abrir Menú Admin</button>
      <div v-if="isMenuOpen" class="menu">
        <p>Menú de Administración</p>
        <ul>
          <li>Opción 1</li>
          <li>Opción 2</li>
          <li>Opción 3</li>
        </ul>
      </div>
    </div>
</template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isMenuOpen = ref(false);
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  </script>
  
  <style scoped>
  .btn {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  .menu {
    margin-top: 10px;
    padding: 15px;
    background: #f8f9fa;
    border: 1px solid #ddd;
    width: 200px;
  }
  </style>
  
-->
