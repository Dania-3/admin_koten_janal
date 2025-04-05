<!-- <script setup>
// estructura para funciones
import { ref } from "vue";
import admin_menu from './menu_admin.vue';
import footer_admin from './footer.vue';
import admin_header from './header_admin.vue';


const filter =ref("all");
const searchQuery = ref('');
var datos = ref([
{id:1, hora: '10:00', estado: 'libre', edicion: '/public/imagenes/editar.png'},
{id:1, hora: '10:00', estado: 'libre', edicion: '/public/imagenes/editar.png'},
{id:1, hora: '10:00', estado: 'libre', edicion: '/public/imagenes/editar.png'},
{id:1, hora: '10:00', estado: 'libre', edicion: '/public/imagenes/editar.png'},
]);
const confirmarAccion = () => {
  const respuesta = window.confirm("¿Deseas eliminar?");
  
  if (respuesta) {
    alert("Se ha borrado exitosamente.");
  }
};
/*const datostabla = computed(()=>{
  return datos.value.filter(dato=>{
            if(filter.value=== "all"){
                return true;
            }
            if(FileReader.value=== "mesa") return dato.mesa.toLowerCase() === buscar.value;
            return true;
            if(FileReader.value=== "hora") return dato.hora.toLowerCase() === buscar.value;
            return true;
        })
});
*/

</script> -->

<script setup>
import { ref, onMounted } from "vue";
import admin_menu from './menu_admin.vue';
import footer_admin from './footer.vue';
import admin_header from './header_admin.vue';

const filter = ref("all");
const searchQuery = ref('');
const datos = ref([]);
const errorMensaje = ref('');

const fetchHorarios = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/horarios", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los horarios");
    }

    const data = await response.json();
    // datos.value = data;
    datos.value = data.filter(horario => horario.estado !== "Eliminado");
  } catch (error) {
    console.error("Error al obtener horarios:", error);
    errorMensaje.value = "No se pudieron cargar los horarios.";
  }
};

onMounted(fetchHorarios);

const confirmarAccion = async (id) => {
  const respuesta = window.confirm("¿Deseas eliminar este horario?");
  
  if (respuesta) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/horarios/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el horario");
      }

      alert("Horario eliminado correctamente.");
      fetchHorarios(); // Recargar la lista de horarios
    } catch (error) {
      console.error("Error al eliminar horario:", error);
      alert("No se pudo eliminar el horario.");
    }
  }
};
</script>

<template>
  <admin_menu />
<div class="main">
    <admin_header />
    <section class="pagina container-fluid main_espacio pl-50 pr-50">
      <div class="row secciones-tablas d-flex justify-content-center">
        <div class="col-6 gap-5 d-flex justify-content-start align-items-center">
          <form class="buscador text-start bg-white d-flex gap-4 align-items-center">
            <input type="text" v-model="searchQuery" placeholder="Buscar" id="barra_buscar" class="w-75" />
            <button id="buscar">
              <img src="/public/imagenes/buscador.png" alt="buscador" />
            </button>
          </form>
          <select class="filtros btn" required>
            <option id="filtrar" value="1">Filtrar</option>
          </select>
        </div>
        <div class="col-6 d-flex justify-content-end align-items-center">
          <router-link to="/agregar_horario">
          <button class="btn-verde" id="nuevo">
            <img src="/public/imagenes/nuevo.png" id="img_nuevo" />
          </button>
          </router-link>
        </div>
     
        <section class="col-6 pt-5">
           <!-- Tabla con barra de desplazamiento -->
           <div class="table-container">
              <table class="rwd-table" id="tabla">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>hora</th>
                    <th>Estado</th>
                    <th>Edición</th>
                  </tr>
                </thead>
                <!-- <tbody>
                  <tr v-for="dato in datos":key="dato.id">
                    <td data-th="Cliente">{{ dato.id }}</td>
                    <td data-th="Correo">{{dato.hora}}</td>
                    <td data-th="Número">{{ dato.estado }}</td>                
                    <td data-th="Edición"><router-link to="/modificar_horario"><button class="btn-verde" id="editar"><img :src="dato.edicion" id="img_editar"/></button> </router-link><button @click="confirmarAccion" class="delete-btn">
                            <img src="/public/imagenes/eliminar.png" id="img_eliminar"/>
                        </button></td>
                  </tr>
                </tbody> -->
                <tbody>
                  <tr v-for="dato in datos" :key="dato.pk_id_horario">
                    <td data-th="Cliente">{{ dato.pk_id_horario }}</td>
                    <td data-th="Correo">{{ dato.hora }}</td>
                    <td data-th="Número">{{ dato.estado }}</td>                
                    <td data-th="Edición">
                      <router-link :to="`/modificar_horario/${dato.pk_id_horario}`">
                        <button class="btn-verde">
                          <img src="/public/imagenes/editar.png" />
                        </button>
                      </router-link>
                      <button @click="confirmarAccion(dato.pk_id_horario)" class="delete-btn">
                        <img src="/public/imagenes/eliminar.png" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </section>
        <!-- <div class="col-12 text-center p-5 d-flex justify-content-center align-items-center">
          <div class="d-flex flex-row gap-4 text-center">
            <div class="circulos-flecha">
              &lt;
            </div>
            <div class="circulos text-center p-3">
              1
            </div>
            <div class="circulos text-center p-3">
              2
            </div>
            <div class="circulos text-center p-3">
              3
            </div>
            <div class="circulos text-center p-3">
              4
            </div>
            <div class="circulos-flecha">
              &gt;
            </div>
          </div>
        </div> -->
      </div>
    </section>
    
    <footer_admin />
</div>

</template>

<style scoped>

.table-container {
  max-height: 800px;  /* Ajusta la altura según lo que necesites */
  overflow-y: auto;   /* Agrega la barra de desplazamiento vertical */
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.rwd-table {
  width: 100%;
  border-collapse: collapse;
}

.rwd-table th,
.rwd-table td {
  padding: 10px;
  text-align: left;
}

.rwd-table thead {
  background-color: #f1f1f1;
}

.rwd-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.rwd-table tbody tr:hover {
  background-color: #e1e1e1;
}

/* Codigo Gael */
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

.pagina {
  /*background-color: #23a200;*/
  height: 800px;

}

select,
select option {
  font-size: 30px;
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

#barra_buscar {
  background-color: white;
  font-size: 24px;
}

.buscador {
  border: 2px solid #000000;
  border-radius: 8px;
  width: 280px;
  padding: 5px;

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
