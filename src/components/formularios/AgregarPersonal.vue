<template>
    <div class="main_espacio container-fluid d-flex justify-content-center align-items-center vh-100">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-10 h-75">
          <div class="form_color text-white card shadow-lg p-4 rounded">
      <router-link to="/empleados">
        <button>
          <img
            src="/public/imagenes/LetsIconsBack.svg"
            class="pl-40"
            style="width: 90%;"
            alt="regresar"
          />
        </button>
      </router-link>
            <h2 class="text-center mb-5 text-white p-3">Agregar personal</h2>
            <form @submit.prevent="agregarPersonal" class="rounded">
              <div class="row d-flex gap-4 justify-content-center">
                <div class="col-md-5 mb-3">
                  <label class="form-label">Nombre</label>
                  <input type="text" class="form-control p-3 " v-model="form.nombre" required>
                </div>
  
                <div class="col-md-5 mb-3">
                  <label class="form-label">Apellido</label>
                  <input type="text" class="form-control p-3" v-model="form.apellido" required>
                </div>
  
                <div class="col-md-5 mb-3">
                  <label class="form-label">Correo Electrónico</label>
                  <input type="email" class="form-control p-3" v-model="form.correo" required>
                </div>
  
                <div class="col-md-5 mb-3">
                  <label class="form-label">Teléfono</label>
                  <input type="tel" class="form-control p-3" v-model="form.telefono" required>
                </div>
  
                <div class="col-md-5 mb-3">
                  <label class="form-label">Dirección</label>
                  <input type="text" class="form-control p-3" v-model="form.direccion" required>
                </div>
  
                <div class="col-md-5 mb-3">
                  <label class="form-label">Fecha de Nacimiento</label>
                  <input type="date" class="form-control p-3" v-model="form.fechaNacimiento" required>
                </div>
  
                <div class="col-md-5 mb-3">
                  <label class="form-label">CURP</label>
                  <input type="text" class="form-control p-3" v-model="form.curp" required>
                </div>
  
                <div class="col-md-5 mb-3">
                  <label class="form-label">RFC</label>
                  <input type="text" class="form-control p-3" v-model="form.rfc" required>
                </div>
  
                <div class="col-md-5 mb-3">
                  <label class="form-label">Puesto</label>
                  <select class="form-select p-3" v-model="form.puesto" required>
                    <option value="Mesero">Mesero</option>
                    <option value="Cocinero">Cocinero</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
  
                <div class="col-md-5 mb-3">
                  <label class="form-label">Salario</label>
                  <input type="number" class="form-control p-3" v-model="form.salario" required>
                </div>
  
                <div class="col-md-4">
                  <button type="submit" class="form_color border-white btn w-100 p-3 m-1"><h3>AGREGAR</h3></button>
                </div>
              </div>
            </form>
            <p v-if="mensaje" class="text-success text-center mt-3">{{ mensaje }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const mensaje = ref("");
  
  const form = ref({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    curp: "",
    rfc: "",
    puesto: "Mesero",
    salario: ""
  });
  
  const agregarPersonal = () => {
    mensaje.value = "¡Personal agregado exitosamente!";
    limpiarFormulario();
  };
  
  const limpiarFormulario = () => {
    form.value = {
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      direccion: "",
      fechaNacimiento: "",
      curp: "",
      rfc: "",
      puesto: "",
      salario: ""
    };
  };
  </script>
  
  <style scoped>

.form_color{
    background-color: #44112e;
}
h3{
    color:white;

}
.form-label{
    font-size: 24px;
    font-family: "Karla", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}
.text-success{
    padding-top: 20px ;
    font-size: 32px;
    font-weight: 600;
}
/* Mejora el input cuando está enfocado */
  .form-control p-3:focus, .form-select:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  /* Tamaño del botón */
  .btn {
    font-size: 18px;
    font-weight: bold;
  }
  /* estilos del botón */

  .btn:hover {
  color: white;
}

.btn:active {
  transform: scale(0.99);
  box-shadow: 0 6px 6px #00000080;
  border-bottom: 2px solid #000000;

}
  </style>
  