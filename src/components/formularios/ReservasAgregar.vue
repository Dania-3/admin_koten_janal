<template> 
  <div class="container-fluid  ">
    <router-link to="/reservas">
    <button>
      <img src="/public/imagenes/LetsIconsBack.svg"  class="pl-40" alt="regresar">
    </button>
  </router-link>
    <div class="d-flex justify-content-center align-items-center">
    <form @submit.prevent="agregarReserva" class="form1 text-white">
      <h2 class="text-center text-white">Agregar reservación</h2>
      <div class="row m-5 d-flex justify-content-center">
        <div class="col-md-3">
          <label class="form-label">Nombre:</label>
          <input type="text" class="form-control input-lg" v-model="form.nombre" placeholder="Nombre" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Apellido:</label>
          <input type="text" class="form-control input-lg" v-model="form.apellido" placeholder="Apellido" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Teléfono:</label>
          <input type="tel" class="form-control input-lg" v-model="form.telefono" placeholder="(10 dígitos)" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Correo:</label>
          <input type="email" class="form-control input-lg" v-model="form.correo" placeholder="Email" />
        </div>
      </div>
      <div class="row m-5 d-flex justify-content-center">
        <div class="col-md-3">
          <label class="form-label">Fecha:</label>
          <input type="date" class="form-control input-lg" v-model="form.fecha" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Hora:</label>
          <select class="form-select input-lg hora" v-model="form.hora">
              <option v-for="hora in horas" :key="hora.hora" :value="hora.hora">
                {{ hora.hora }}
              </option>
            </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Mesa:</label>
          <select class="form-select input-lg mesa" v-model="form.mesa">
            <option v-for="mesa in mesas" :key="mesa.numero_mesa" :value="mesa.numero_mesa + ' - ' + mesa.seccion_mesa">
                {{ mesa.seccion_mesa }} - {{ mesa.numero_mesa }}
              </option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Comensales:</label>
          <input type="number" class="form-control comensales" v-model="form.comensales"/>
        </div>
      </div>
      <div class="row m-5 d-flex justify-content-center">
        <div class="col-md-12">
          <label class="form-label">Comentario:</label>
          <textarea class="comentario form-control input-lg" v-model="form.comentario" rows="3" placeholder="Comentarios (opcional)"></textarea>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-custom text-white p-4"><h4>AGREGAR</h4></button>
      </div>
    </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({
  nombre: "",
  apellido: "",
  telefono: "",
  correo: "",
  fecha: "",
  hora: "",
  mesa: "",
  comensales: "",
  comentario: ""
});

const mesas = ref([]);
const horas = ref([]);

// Función para cargar las mesas desde el backend
const obtenerMesas = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/mesasDisp", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("No se pudieron obtener las mesas");
    }
    const data = await response.json();
    mesas.value = data;
  } catch (error) {
    console.error("Error al obtener las mesas:", error);
    alert("No se pudieron obtener las mesas");
  }
};
onMounted(obtenerMesas);

const obtenerHoras = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/horariosDisp", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("No se pudieron obtener las horas");
    }
    const data = await response.json();
    horas.value = data;
  } catch (error) {
    console.error("Error al obtener las horas:", error);
    alert("No se pudieron obtener las horas");
  }
};
onMounted(obtenerHoras);

const agregarReserva = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/api/reservaciones", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        telefono: form.value.telefono,
        correo: form.value.correo,
        hora: form.value.hora,
        fecha: form.value.fecha,
        mesa: form.value.mesa,
        comensales: form.value.comensales,
        comentario: form.value.comentario,
      })
    });
    if(!response.ok) {
      throw new Error("Error al agregar la reservacion.");
    }
    
    const data = await response.json();
    alert("Reservacion agregado correctamente.");
    router.push("/reservas");
  }catch (error) {
    console.error("Error al agregar reservacion:", error);
    alert("No se pudo agregar la reservacion");
  }
};
</script>

<style scoped>
.form1 {
  width: 80%;

}
h4 {
  color: white;
}
/* body {
  background-color: #6a1b47;
  color: white;
} */
.container-fluid {
  min-height: 950px;
  background: #6a1b47;
  padding: 10px;
  margin-top: 80px;
  width: 90%;

}
.input-lg {
  font-size: 1.25rem;
  padding: 5px;
}
.mesa{
  width: 370px;
}
.comensales{
  width: 344px;
  height: 29px;
}
.comentario {
  height: 200px;
}
.btn-custom {
  background-color: #6a1b47;
  border: 2px solid white;
}
.btn-custom:hover {
  background-color: #6a1b47;
}
</style>
