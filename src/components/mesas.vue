<script setup>
// estructura para funciones
import { onMounted, ref } from "vue";
import admin_menu from './menu_admin.vue';
import footer_admin from './footer.vue';
import admin_header from './header_admin.vue';

/*import BtnModal from './formularios/ModificarMesa.vue'; /*para el modal */

const mostrarModal = ref(false)
const mostrarModal2 = ref(false)

const numero = ref('');
const mesa = ref('');
const capacidad = ref('');
const estado = ref('');
const mesaSeleccionada = ref(null);

const cargarMesa = (mesaId) => {
  const mesaEditar = datos.value.find(mesa => mesa.pk_id_mesa === mesaId);
  
  if (mesaEditar) {
    // Guarda los datos de la mesa en las variables del formulario
    mesaSeleccionada.value = mesaEditar; // Puedes usar esto para cualquier lógica adicional si lo necesitas
    numero.value = mesaEditar.numero_mesa;
    mesa.value = mesaEditar.seccion_mesa;
    capacidad.value = mesaEditar.capacidad;
    estado.value = mesaEditar.estado;

    // Muestra el modal
    mostrarModal.value = true;
  }
};


const confirmarEditar = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/mesas/${mesaSeleccionada.value.pk_id_mesa}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        numero_mesa: numero.value,
        seccion_mesa: mesa.value,
        capacidad: capacidad.value,
        estado: estado.value
      })
    });

    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al modificar la mesa');
    }

    const data = await response.json();
    alert(data.message);  // Mensaje de éxito
    mostrarModal.value = false;  // Cierra el modal
    fetchMesas();  // Recarga la lista de mesas
  } catch (error) {
    console.error("Error al modificar la mesa:", error);
    alert(error.message || "No se pudo modificar la mesa");
  }
};



const confirmarAccion= async () => {
  try {
      const token = localStorage.getItem("token"); // Obtén el token del localStorage
      const response = await fetch("http://localhost:3000/api/mesas", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          numero_mesa: numero.value,
          seccion_mesa: mesa.value,
          capacidad: capacidad.value,
        })
      });

      if (!response.ok) {
        throw new Error("Error al agregar la mesa");
      }

      const data = await response.json();
      alert("Mesa agregada correctamente");
      //router.push("/me");
      mostrarModal2.value= false;
      fetchMesas();
    } catch (error) {
      console.error("Error al agregar la mesa:", error);
      alert("No se pudo agregar la mesa");
    }
    
};

const EliminarElemento = async (id) => {
  const respuesta = window.confirm("¿Deseas eliminar esta mesa?");
  
  if (respuesta) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/mesas/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la mesa");
      }

      alert("Mesa eliminado correctamente.");
      fetchMesas(); // Recargar la lista de horarios
    } catch (error) {
      console.error("Error al eliminar Mesa:", error);
      alert("No se pudo eliminar la mesa.");
    }
  }
};

const texto = ref('Hola desde el modaaal');
const filter =ref("all");
const searchQuery = ref('');
const datos = ref([]);
const errorMensaje =('');

const fetchMesas = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/mesas", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las mesas");
    }

    const data = await response.json();
    // datos.value = data;
    datos.value = data.filter(mesa => mesa.estado !== "Eliminado");
  } catch (error) {
    console.error("Error al obtener las mesas:", error);
    errorMensaje.value = "No se pudieron cargar las mesas.";
  }
}
onMounted(fetchMesas);

</script>

<template>
  <admin_menu />
<div class="main">
    <admin_header />
    <section class="pagina container-fluid main_espacio pl-50 pr-50">
      <div class="row secciones-tablas d-flex justify-content-center">
        <div class="col-11 gap-5 d-flex justify-content-center align-items-center">
                <form class="buscador text-start bg-white d-flex align-items-center w-75">
                    <input type="text"  v-model="searchQuery"  placeholder="Buscar mesa" id="barra_buscar" />
                    <button id="buscar"> <!--id="buscar"-->
                    <img src="/public/imagenes/buscador.png" alt="buscador" />
                    </button>
                </form>
            </div>
        <div class="col-1 d-flex justify-content-end align-items-center">
          <button @click="mostrarModal2 = true" class="btn-verde">
            <img src="/public/imagenes/nuevo.png" id="img_nuevo" />
          </button>
        </div>

        <section class="col-6 pt-5 overflow-auto" style="height: 700px; overflow-x: scroll;">
          <table class="rwd-table" id="tabla">
            <thead>
              <tr>
                <th>Id    </th>
                <th>Sección</th>
                <th>Número</th>
                <th>Capacidad</th>
                <th>Estado</th>
                <th>Edición</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dato in datos":key="dato.pk_id_mesa">
                <td data-th="Cliente">{{ dato.pk_id_mesa }}</td>
                <td data-th="Correo">{{dato.seccion_mesa}}</td>
                <td data-th="Correo">{{dato.numero_mesa}}</td>
                <td data-th="Correo">{{dato.capacidad}}</td>
                <td data-th="Número">{{ dato.estado }}</td>                
                <td data-th="Edición">
                <button class="btn-verde editar" @click="cargarMesa(dato.pk_id_mesa)" ><img src="/public/imagenes/editar.png" class="img_editar"/></button> 
                <button class="delete-btn" @click="EliminarElemento(dato.pk_id_mesa)"> <!--@click="confirmarAccion(dato.pk_id_horario)" --> <!--<router-link :to="`/modificar_mesa/${dato.id}`"></router-link>-->
                    <img src="/public/imagenes/eliminar.png" />
                </button>
                  </td>
              </tr>
            </tbody>
          </table>
        </section>
        
    <!-- Modal controlado solo por Vue -->

    <!-- Modal para editar mesa -->
<div v-if="mostrarModal" class="form_nuevo modal-backdrop">
  <div class="modal-content container fluid">
  
    <div class="row d-flex justify-content-center">
      <div class="col-12 justify-content-start d-flex p-0 gap-3">
      <button @click="mostrarModal = false" style="width: 20%;">
        <img src="/public/imagenes/LetsIconsBack.svg" style=" width: 50px;" alt="regresar">
      </button>
      <div class="text-white">
          <h3>Modificar mesa</h3>
      </div>
    </div>
    <div class="col-12 mt-4">
      <label class="form-label">Número</label>
      <input type="number" class="form-control" v-model="numero" required>
    </div>
    <div class="col-12 mt-4">
          <label class="form-label">Sección</label>
          <input type="text" class="form-control" v-model="mesa" required>
        </div>
    <div class="col-12 mt-4">
      <label class="form-label">Capacidad</label>
      <input type="number" class="form-control" v-model="capacidad" required>
    </div>
    <div class="col-12 mt-4">
      <label class="form-label">Estado</label>
      <input type="text" class="form-control" v-model="estado" required>
    </div>
    <div class="button-container mt-4">
          <button @click="confirmarEditar" class="boton-form"><span>MODIFICAR</span></button>
        </div>
    </div>
  </div>
</div>

<!-- Modal para agregar mesa -->
<div v-if="mostrarModal2" class="modal-backdrop">
  <div class="modal-content container fluid">
  
  <div class="row d-flex justify-content-center">
    <div class="col-12 justify-content-start d-flex p-0 gap-3">
    <button @click="mostrarModal2 = false" style="width: 20%;">
      <img src="/public/imagenes/LetsIconsBack.svg" style=" width: 50px;" alt="regresar">
    </button>
    <div class="text-white">
        <h3>Agregar mesa</h3>
    </div>
  </div>
  <div class="col-12 mt-4">
    <label class="form-label">Número</label>
    <input type="number" class="form-control" v-model="numero" required>
  </div>
  <div class="col-12 mt-4">
        <label class="form-label">Sección</label>
        <input type="text" class="form-control" v-model="mesa" required>
      </div>
  <div class="col-12 mt-4">
    <label class="form-label">Capacidad</label>
    <input type="number" class="form-control" v-model="capacidad" required>
  </div>
  <div class="button-container mt-4">
        <button @click="confirmarAccion" class="boton-form"><span>AGREGAR</span></button>
      </div>
  </div>
</div>
</div>

      </div>
    </section>
    <footer_admin />
</div>

</template>


<style scoped>

h3{
  color: white !important;

}
.form-control{
  text-align: center;
  padding-left: 5px;
  padding-right:5px;
}
.form-select{
  text-align: center;
  padding-left: 5px;
  padding-right:5px;
}
.form-label{
    color: white !important;
    font-size: 24px;
    font-family: "Karla", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}
/********buscador**********/
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
.rwd-table {

  min-width: 900px;
  border-collapse: collapse;
}
.pagina {
  /*background-color: #23a200;*/
  height: 800px;

}
/* Codigo Gael */
.delete-btn {
    background-color: #D64040;
    font-family: 'Merriweather';
    color: white;
    padding: 17px;
    border-radius: 10px;
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
/**********buscador***************/
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
.img_editar{
  margin-left: 15px;
}
/********************,MODAL**************************** */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #6A1B47;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  text-align: center;
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
