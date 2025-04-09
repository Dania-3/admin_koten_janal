<script setup>
import { ref, onMounted } from "vue";
import admin_menu from './menu_admin.vue';
import footer_admin from './footer.vue';
import admin_header from './header_admin.vue';

const mostrarModal = ref(false)
const mostrarModal2 = ref(false)

const hora = ref('');
const estado = ref('');
const horaSeleccionada = ref(null);

const cargarHora = (horaId) => {
  const horaEditar = datos.value.find(hora => hora.pk_id_horario === horaId);
  
  if (horaEditar) {
    // Guarda los datos de la mesa en las variables del formulario
    horaSeleccionada.value = horaEditar; // Puedes usar esto para cualquier lógica adicional si lo necesitas
    hora.value = horaEditar.hora;
    estado.value = horaEditar.estado;

    // Muestra el modal
    mostrarModal2.value = true;
  }
};


const confirmarEditar = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/api/horarios/${horaSeleccionada.value.pk_id_horario}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        hora: hora.value,
        estado: estado.value
      })
    });

    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al modificar el horario');
    }

    const data = await response.json();
    alert(data.message);  // Mensaje de éxito
    mostrarModal2.value = false;  // Cierra el modal
    fetchHorario();  // Recarga la lista de mesas
  } catch (error) {
    console.error("Error al modificar el horario:", error);
    alert(error.message || "No se pudo modificar el horario");
  }
};



const confirmarAccion= async () => {
  try {
      const token = localStorage.getItem("token"); // Obtén el token del localStorage
      const response = await fetch("http://localhost:3000/api/horarios", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          hora: hora.value,
        })
      });

      if (!response.ok) {
        throw new Error("Error al agregar la mesa");
      }

      const data = await response.json();
      alert("Horario agregado correctamente");
      //router.push("/me");
      mostrarModal.value= false;
      fetchHorario();
    } catch (error) {
      console.error("Error al agregar el horario:", error);
      alert("No se pudo agregar el horario");
    }
    
};

const EliminarElemento = async (id) => {
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
      fetchHorario(); // Recargar la lista de horarios
    } catch (error) {
      console.error("Error al eliminar horario:", error);
      alert("No se pudo eliminar el horario.");
    }
  }
};

const texto = ref('Hola desde el modaaal');
const filter =ref("all");
const searchQuery = ref('');
const datos = ref([]);
const errorMensaje =('');

const fetchHorario = async () => {
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
    datos.value = data.filter(hora => hora.estado !== "Eliminado");
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    errorMensaje.value = "No se pudieron cargar los horarios.";
  }
}
onMounted(fetchHorario);
</script>


<template>
  <admin_menu />
<div class="main">
    <admin_header />
    <section class="pagina container-fluid main_espacio pl-50 pr-50">
      <div class="row secciones-tablas d-flex justify-content-center">
        
        <div class="col-11 gap-5 d-flex justify-content-center align-items-center">
                <form class="buscador  text-start bg-white d-flex align-items-center w-75">
                    <input type="text"  v-model="searchQuery"  placeholder="Buscar horario" id="barra_buscar" />
                    <button id="buscar"> <!--id="buscar"-->
                    <img src="/public/imagenes/buscador.png" alt="buscador" />
                    </button>
                </form>
            </div>

        <div class="col-1 d-flex justify-content-end align-items-center">
          <button  @click="mostrarModal = true" class="btn-verde" id="nuevo">
            <img src="/public/imagenes/nuevo.png" id="img_nuevo" />
          </button>
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
                <tbody>
                  <tr v-for="dato in datos" :key="dato.pk_id_horario">
                    <td data-th="Cliente">{{ dato.pk_id_horario }}</td>
                    <td data-th="Correo">{{ dato.hora }}</td>
                    <td data-th="Número">{{ dato.estado }}</td>                
                    <td data-th="Edición">
                        <button @click="cargarHora(dato.pk_id_horario)"  class="btn-verde">
                          <img src="/public/imagenes/editar.png" class="img_editar"/>
                        </button>
                      <button @click="EliminarElemento(dato.pk_id_horario)" class="delete-btn">
                        <img src="/public/imagenes/eliminar.png" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </section>


        <div v-if="mostrarModal" class="modal-backdrop">
  <div class="modal-content container fluid">
  
    <div class="row d-flex justify-content-center">
      <div class="col-12 justify-content-start d-flex p-0">
      <button @click="mostrarModal = false" style="width: 20%;">
        <img src="/public/imagenes/LetsIconsBack.svg" style=" width: 50px;" alt="regresar">
      </button>
      <div class="text-white justify-content-start d-flex">
          <h3>Agregar Horario</h3>
      </div>
    </div>
    <div class="col-12 mt-4 justify-content-center d-flex flex-column">
      <label class="form-label">Fecha</label>
      <input type="time" class="form-control" v-model="hora" />
    </div>
    
    <div class="button-container mt-4">
          <button @click="confirmarAccion" class="boton-form"><span>agregar</span></button>
        </div>
    </div>
  </div>
</div>

<div v-if="mostrarModal2" class="modal-backdrop">
  <div class="modal-content container fluid">
  
    <div class="row d-flex justify-content-center">
      <div class="col-12 justify-content-start d-flex p-0">
      <button @click="mostrarModal2 = false" style="width: 20%;">
        <img src="/public/imagenes/LetsIconsBack.svg" style=" width: 50px;" alt="regresar">
      </button>
      <div class="text-white justify-content-start d-flex">
          <h3>Modificar Horario</h3>
      </div>
    </div>
    <div class="col-12 mt-4 justify-content-center d-flex flex-column">
      <label class="form-label">Hora</label>
      <input type="time" class="form-control" v-model="hora" />
    </div>
    <div class="col-12 mt-4 justify-content-center d-flex flex-column">
      <label class="form-label">Estado</label>
      <input type="text" class="form-control" v-model="estado" />
    </div>
    
    <div class="button-container mt-4">
          <button @click="confirmarEditar" class="boton-form"><span>MODIFICAR</span></button>
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
/********************,MODAL**************************** */
h3{
  color: white;
}
.form-control{
  text-align: center;
  padding-left: 4px;
  padding-right:4px;
}
.form-label{
    color: white !important;
    font-size: 24px;
    font-family: "Karla", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}
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


/********otros estilos**************/
.table-container {
  max-height: 800px;  /* Ajusta la altura según lo que necesites */
  overflow-y: auto;   /* Agrega la barra de desplazamiento vertical */
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

/*********buscador*************************/
.buscador {
  border: 2px solid #000000;
  border-radius: 8px;
  width: 280px;
  padding: 5px;

}
    
#barra_buscar {
  background-color: white;
  font-size: 24px;
  width: 95%;
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
.img_editar{
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
