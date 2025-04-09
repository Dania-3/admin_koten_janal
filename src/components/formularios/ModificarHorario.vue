<template>
  <div class="container-fluid d-flex flex-column justify-content-center align-items-center custom-modal">
    <h3 class="text-white">Modificar horario</h3>
    
    <div class="row d-flex flex-column justify-content-center align-items-center w-100">
      <div class="formulario1 col-12 mb-3 text-center">
        <h4 for="hora" class="form-label text-white p-3 m-3">Hora</h4>
        <input type="time" id="hora" v-model="form1.hora" class="form-control w-50 p-4 mx-auto" />
      </div>
      <!-- <div class="formulario1 col-12 mb-3 text-center">
        <h4 for="hora" class="form-label text-white p-3 m-3">Estado</h4>
          <select id="opciones" class="form-select input-lg form-control w-50 p-4 mx-auto" v-model="form1.estado">
            <option>1-A</option>
            <option>1-B</option>
            <option>2-A</option>
          </select>
      </div> -->
      <div class="formulario1 col-12 mb-3 text-center">
        <h4 for="estado" class="form-label text-white p-3 m-3">Estado</h4>
          <select id="estado" class="form-select input-lg form-control w-50 p-4 mx-auto" v-model="form1.estado">
            <option value="Ocupado">Ocupado</option>
            <option value="Disponible">Disponible</option>
          </select>
      </div>

    
      <button class="custom-button w-25 p-3 m-4" @click="actualizarHorario"> <h5>MODIFICAR</h5> </button>
    </div>
  </div>
</template>

<script setup>
// import { ref } from "vue";

// const form1 = ref({
//     hora: "",
//     estado: ""
//   });
  
// const hora = ref("");
// const estado = ref("");

// const agregarHorario = () => {
//   alert(`Horario agregado: ${hora.value}`);
//   alert(`Estado: ${estado.value}`);

// };

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const form1 = ref({
  hora: "",
  estado: ""
});

const obtenerHorario = async () => {
  try {
    const token = localStorage.getItem("token");
    const id = route.params.id; // Obtenemos el ID de la URL

    console.log("ID que se enviará a la API:", id);

    const response = await fetch(`http://localhost:3000/api/horarios/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    console.log("Código de respuesta HTTP:", response.status);

    if (!response.ok) {
      throw new Error("Error al obtener horario. Código: ${response.status}");
    }

    const horario = await response.json();
    console.log("Horario recibido:", horario); //Verifica la respuesta del backend
    form1.value.hora = horario.hora;
    form1.value.estado = horario.estado;
  } catch (error) {
    console.error("Error al obtener horario:", error);
    alert("No se pudo cargar el horario");
  }
};

onMounted(() => {
  console.log("ID recibido:", route.params.id); // Verificar si se obtiene el ID
  obtenerHorario(); // Llamamos la función cuando se carga la vista
});

const actualizarHorario = async () => {
  try {
    const token = localStorage.getItem("token");
    const id = route.params.id;

    const response = await fetch(`http://localhost:3000/api/horarios/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        hora: form1.value.hora,
        estado: form1.value.estado
      })
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el horario");
    }

    alert("Horario actualizado correctamente");
    router.push("/horarios");
  } catch (error) {
    console.error("Error al actualizar horario:", error);
    alert("No se pudo actualizar el horario");
  }
};

</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  scale: 2; /* Ajusta el tamaño */
}
h5{
  color: white;
}
.formulario1 input{
  font-size: 40px;
}
.custom-modal {
  background-color: #3e0d26;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  min-height: 80vh;
  margin: auto;
  margin-top: 50px;
  display: flex;
  align-items: center;
}
.custom-button {
  border: 1px solid white;
  background: transparent;
  color: white;
  padding: 10px;
  width: 50%;
}

.custom-button:hover {
  color: #3e0d26;
  border: 3px solid white;
}
</style>
