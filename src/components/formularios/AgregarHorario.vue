<template>
  <div class="container-fluid d-flex flex-column justify-content-center align-items-center custom-modal">
    <h3 class="text-white">Agregar horario</h3>

    <div class="row d-flex flex-column justify-content-center align-items-center w-100">
      <!-- CORRECCIÓN: Cambié <form1> por <form> -->
      <form @submit.prevent="agregarHorario">
        <div class="formulario1 col-12 mb-3 text-center">
          <h4 for="hora" class="form-label text-white p-3 m-3">Hora</h4>
          <input type="time" id="hora" v-model="form1.hora" class="form-control w-50 p-4 mx-auto" />
        </div>

        <button type="submit" class="custom-button w-25 p-3 m-4">
          <h5>AGREGAR</h5>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter(); // Para redirigir después de agregar el horario

const form1 = ref({
  hora: "",
});

const agregarHorario = async () => {
  try {
    const token = localStorage.getItem("token"); // Obtén el token del localStorage
    const response = await fetch("http://localhost:3000/api/horarios", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        hora: form1.value.hora,
      })
    });

    if (!response.ok) {
      throw new Error("Error al agregar el horario");
    }

    const data = await response.json();
    alert("Horario agregado correctamente");
    router.push("/horarios");
  } catch (error) {
    console.error("Error al agregar horario:", error);
    alert("No se pudo agregar el horario");
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
