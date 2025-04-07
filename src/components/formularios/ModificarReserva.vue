<template>
  <div class="container-fluid ">
    <router-link to="/reservas">
    <button>
      <img src="/public/imagenes/LetsIconsBack.svg"  class="pl-40" alt="regresar">
    </button>
  </router-link>
  <div class="d-flex justify-content-center align-items-center">
    <form @submit.prevent="submitForm" class="form1 text-white">
      <h2 class="text-center text-white">Modificar reservación</h2>
      <div class="row mt-5 d-flex gap-4 justify-content-center">
        <div class="col-5 d-flex flex-column justify-content-center align-items-center">
          <div class="row d-flex gap-3  justify-content-center">
            <div class="col-md-3">
          <label class="form-label">Nombre:</label>
          <input
            type="text"
            class="form-control"
            v-model="form.nombre"
            placeholder="Nombre"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label">Apellido:</label>
          <input
            type="text"
            class="form-control"
            v-model="form.apellido"
            placeholder="Apellido"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label">Teléfono:</label>
          <input
            type="tel"
            class="form-control"
            v-model="form.telefono"
            placeholder="(10 dígitos)"
          />
        </div>
      </div>
      <div class="row m-5 d-flex gap-5 justify-content-center">
        <div class="col-3">
          <label class="form-label">Correo:</label>
          <input
            type="email"
            class="form-control"
            v-model="form.correo"
            placeholder="Email"
          />
        </div>
        <div class="col-3">
          <label class="form-label">Fecha:</label>
          <input type="date" class="form-control" v-model="form.fecha" />
        </div>
        <div class="col-3">
          <label class="form-label">Hora:</label>
          <input type="time" class="form-control" v-model="form.hora" />
        </div>
          </div>
          <div class="row d-flex gap-4 m-0 justify-content-center">
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
        <div class="col-md-3">
          <label class="form-label">Estatus:</label>
          <select class="form-select input-lg" v-model="form.mesa">
            <option>Libre</option>
            <option>Reservado</option>
            <option>Ocupado</option>
            <option>Eliminado</option>
          </select>
        </div>
          </div>
        </div>
        <div class="col-6">
          <label class="form-label">Comentario:</label>
          <textarea
            class="comentario form-control"
            v-model="form.comentario"
            rows="3"
            placeholder="Comentarios (opcional)"
          ></textarea>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-custom text-white m-5 p-4"><h4>AGREGAR</h4></button>
      </div>
    </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const form = ref({
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        fecha: "",
        hora: "",
        mesa: "",/*1-A */
        comensales: "",/*1 comensal */
        comentario: "",
});

const submitForm = () => {
      console.log("Formulario enviado", form.value);
      alert("Reservación agregada con éxito");
};
</script>

<style scoped>

.pl-40{
  width: 85%;
}
/*.form-label input{
  width: 100px;
}*/
.form1 {
  width: 90%;
  margin-top: 100px;
}
h4{
    color: white;
}
body {
  background-color: #6A1B47;
  color: white;
}
.input-lg {
  font-size: 1.3rem;
  padding-left: 42px;
  padding-right: 42px;

}
.container-fluid {
  /*max-width: 1914px;*/
  min-height: 1095px;
  background: #6A1B47;
  padding: 20px;
  /*border-radius: 10px;*/
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.comentario{
    height: 300px;
}
.btn-custom {
  background-color: #6A1B47;
  border: none;
  border: 2px solid white;
}
.btn-custom:hover {
  background-color:#6A1B47;
}
</style>
