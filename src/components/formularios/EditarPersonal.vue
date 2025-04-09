<script setup>
import admin_menu from "../menu_admin.vue";
import footer_admin from "../footer.vue";
import admin_header from "../header_admin.vue";

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const form = ref({
    puesto: "",
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    curp: "",
    rfc: "",
    salario: "",
    estado: ""
});

const obtenerEmpleado = async () => {
    try {
        const token = localStorage.getItem("token");
        const id = route.params.id; // Obtenemos el ID de la URL

        console.log("ID que se enviará a la API:", id);

        const response = await fetch(`http://localhost:3000/api/empleados/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log("Codigo de respuesta HTTP:", response.status);

        if(!response.ok) {
            throw new Error("Error al obtener empleado. Codigo: ${response.status}");
        }

        const empleado = await response.json();
        console.log("Empleado recibido,", empleado);
        form.value.puesto = empleado.fk_tipo;
        form.value.nombre = empleado.nombre;
        form.value.correo = empleado.correo;
        form.value.telefono = empleado.telefono;
        form.value.direccion = empleado.direccion;
        form.value.fechaNacimiento = empleado.fecha_nacimiento;
        form.value.curp = empleado.curp;
        form.value.rfc = empleado.rfc;
        form.value.salario = empleado.salario;
        form.value.estado = empleado.estado;
    } catch (error) {
        console.error("Error al obtener empleado", error);
        alert("No se pudo cargar el empleado");
    }
};

onMounted(() => {
    console.log("ID recibido:", route.params.id);
    obtenerEmpleado();
});

const actualizarEmpleado = async () => {
    try {
    const token = localStorage.getItem("token");
    const id = route.params.id;

    const response = await fetch(`http://localhost:3000/api/empleados/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fk_tipo: form.value.puesto,
        correo: form.value.correo,
        telefono: form.value.telefono,
        direccion: form.value.direccion,
        curp: form.value.curp,
        rfc: form.value.rfc,
        salario: form.value.salario,
        estado: form.value.estado
      })
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el empleado");
    }

    alert("Empleado actualizado correctamente");
    router.push("/empleados");
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    alert("No se pudo actualizar el empleado");
  }
}
</script>

<template>
    <section class="main1 container-fluid">
      <div
        class="main_espacio1 row d-flex justify-content-center align-items-center text-center gap-5 m-5"
      >
      <div class="col-4 justify-content-start d-flex">
        <router-link to="/empleados">
          <button>
            <img
              src="/public/imagenes/LetsIconsBack.svg"
              class="pl-40"
              alt="regresar"
            />
          </button>
        </router-link>
      </div>
        <div class="col-7 justify-content-start d-flex">
          <h1 class="text-white">Editar personal</h1>
        </div>
        <!-- Imagen-->
        <div class="col-4 imagen">
          <img
            src="/public/imagenes/Empleado.png"
            style="width: 400px; height: 400px"
            alt="Foto de perfil"
          />
        </div>
        <!-- Contenedor del formulario -->
        <div class="col-7 pt-40 pb-100 form_container">
          <div class="top-info">
            <input type="text"
              class="datos_empleado pt-2 pb-2" v-model="form.nombre" required disabled placeholder="Nombre completo"/>
            <input
              type="text" class="datos_empleado pt-2 pb-2" :value="new Date(form.fechaNacimiento).toLocaleDateString('en-CA')" readonly disabled placeholder="Fecha de nacimiento"/>
          </div>
          <hr />
          <div class="form-grid">
            <div class="input-group d-flex gap-3">
              <label class="telefono">Teléfono</label>
              <input type="tel" class="btn input_text" v-model="form.telefono" required/>
            </div>
  
            <div class="input-group">
              <label>Correo</label>
              <input type="email" class="btn input_text" v-model="form.correo" required/>
            </div>
  
            <div class="input-group">
              <label>CURP</label>
              <input type="text" class="btn input_text" v-model="form.curp" required/>
            </div>
  
            <div class="input-group">
              <label>RFC</label>
              <input type="text" class="btn input_text" v-model="form.rfc" required/>
            </div>
  
            <div class="btn input-group">
              <label>Dirección</label>
              <textarea v-model="form.direccion" class="btn input_text" required></textarea>
            </div>
  
            <div class="btn input-group">
              <label>Puesto</label>
              <input type="text" class="btn input_text" v-model="form.puesto" required/>
            </div>
  
            <div class="btn input-group">
              <label>Salario</label>
              <input type="text" class="btn input_text" v-model="form.salario" required/>
            </div>
            <div class="btn input-group">
              <label>Estado</label>
              <input type="text" class="btn input_text" v-model="form.estado" required/>
            </div>
          </div>
  
          <div class="button-container"  @click="actualizarEmpleado">
            <button class="boton-form"><span>ACTUALIZAR</span></button>
          </div>
        </div>
      </div>
    </section>
  </template>

<style scoped>
@import "/src/style/EditarPersonal.css";

.input_text {
  background-color: rgb(213, 209, 209);
  border-radius: 10px;
  font-size: 2.5rem; /* Aumenta el tamaño del texto dentro del input */
  padding: 10px; /* Agrega más espacio dentro del input */

  /*border: 30px solid rgb(213, 209, 209);*/
}
label {
  font-size: 20px;
}
/*******para la flecha**********/
.pl-40{
 width: 90%;
 margen:none;
}
.main_espacio1 {
  display: flex;
  justify-content: center;
  align-items: center;
  /*min-height: 100vh;*/
  background: #44112e;
  padding-top: 70px;
  padding-bottom: 100px;
}

.main1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /*min-height: 100vh;*/
  text-align: center;
  min-height: 100vh;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/*.imagen img {
    display: block;
    margin: 0 auto;
}*/

/* Contenedor del formulario */
.form_container {
  background: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.top-info {
  font-family: "Karla", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  gap: 40px;
}

.top-info input {
  border: 4px solid #44112e;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 10px;
}

.input-group {
  display: flex;
  align-items: center;
  padding: 5px;
}

.input-group input {
  /* height: 23px;*/
  background-color: rgb(213, 209, 209);
  border-radius: 10px;
  border: 4px solid #9b4d4d;
}

.input-group label {
  font-weight: bold;
  margin-bottom: 5px;
  align-items: center;
  width: 120px;
  text-align: right;
  margin-right: 10px;
}

.input-group input,
.input-group textarea {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 20px;
  flex: 1;
}

.input-group textarea {
  resize: none;
  height: 50px;
}

.boton-form {
  margin-top: 40px;
}
.telefono{
  margin-left: -18px;
}
</style>
