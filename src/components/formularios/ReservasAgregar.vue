<template> 
  <div class="container-fluid  ">
    <router-link to="/reservas">
    <button>
      <img src="/public/imagenes/LetsIconsBack.svg"  class="pl-40" alt="regresar">
    </button>
  </router-link>
    <div class="d-flex justify-content-center align-items-center">
    <form @submit.prevent="showAgregar" class="form1 text-white">
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
          <input type="time" class="form-control input-lg" v-model="form.hora" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Mesa:</label>
          <select class="form-select input-lg" v-model="form.mesa">
            <option>1-A</option>
            <option>1-B</option>
            <option>2-A</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Comensales:</label>
          <select class="form-select input-lg" v-model="form.comensales">
            <option>1 comensal</option>
            <option>2 comensales</option>
            <option>3 comensales</option>
          </select>
        </div>
      </div>
      <div class="row m-5 d-flex justify-content-center">
        <div class="col-md-12">
          <label class="form-label">Comentario:</label>
          <textarea class="comentario form-control input-lg" v-model="form.comentario" rows="3" placeholder="Comentarios (opcional)"></textarea>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-custom text-white p-4"><h4>agregar</h4></button>
      </div>
    </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const showAgregar =() =>{
  Swal.fire({
    title: '¡Buen trabajo!',
    text: 'Se ha agregado exitosamente',
    icon: 'success',
    confirmButtonText: 'continuar'
  });
}

const form = ref({
  nombre: "",
  apellido: "",
  telefono: "",
  correo: "",
  fecha: "",
  hora: "",
  mesa: "1-A",
  comensales: "1 comensal",
  comentario: "",
});


const submitForm = () => {
  console.log("Formulario enviado", form.value);
  alert("Reservación agregada con éxito");
};
</script>

<style scoped>
.form1 {
  width: 80%;
}
h4 {
  color: white;
}
body {
  background-color: #6a1b47;
  color: white;
}
.container-fluid {
  min-height: 1085px;
  background: #6a1b47;
  padding: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.input-lg {
  font-size: 1.25rem;
  padding: 10px;}
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
