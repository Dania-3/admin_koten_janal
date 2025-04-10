<template>
  <div class="container-fluid ">
    <router-link to="/reservas">
    <button>
      <img src="/public/imagenes/LetsIconsBack.svg"  class="pl-40" alt="regresar">
    </button>
  </router-link>
  <div class="d-flex justify-content-center align-items-center">
    <form @submit.prevent="actualizarReserva" class="form1 text-white">
      <h2 class="text-center text-white">Modificar reservación</h2>
      <div class="row mt-5 d-flex gap-4 justify-content-center">
        <div class="col-5 d-flex flex-column justify-content-center align-items-center ">
          <div class="row d-flex gap-3  justify-content-center">
            <div class="col-md-3  info">
          <label class="form-label">Nombre:</label>
          <input
            type="text"
            class="form-control"
            v-model="form.nombre"
            placeholder="Nombre" disabled
          />
        </div>
        <div class="col-md-3 apellido">
          <label class="form-label">Apellido:</label>
          <input
            type="text"
            class="form-control"
            v-model="form.apellido"
            placeholder="Apellido" disabled
          />
        </div>
        <div class="col-md-3 apellido">
          <label class="form-label">Teléfono:</label>
          <input
            type="tel"
            class="form-control"
            v-model="form.telefono"
            placeholder="(10 dígitos)" disabled
          />
        </div>
      </div>
      <div class="row m-5 d-flex gap-5 justify-content-center informacion">
        <div class="col-3">
          <label class="form-label">Correo:</label>
          <input 
            type="email"
            class="form-control"
            v-model="form.correo"
            placeholder="Email" disabled
          />
        </div>
        <div class="col-3">
          <label class="form-label">Fecha:</label>
          <input type="date" class="form-control" :value="new Date(form.fecha).toLocaleDateString('en-CA')" />
          <!-- <input type="date" class="form-control" v-model="form.fecha" /> -->
        </div>
        <div class="col-3 hora">
          <label class="form-label">Hora:</label>
          <select class="form-select input-lg hora" v-model="form.hora">
            <option :value="form.hora"> {{ form.hora }}</option>
              <option v-for="hora in horas" :key="hora.hora" :value="hora.hora">
                {{ hora.hora }}
              </option>
            </select>
        </div>
          </div>
          <div class="row d-flex gap-4 m-0 justify-content-center informaciones">
            <div class="col-md-3">
          <label class="form-label">Mesa:</label>
          <select class="form-select input-lg mesa" v-model="form.mesa">
            <option :value="form.mesa"> {{ form.mesa }} (Capacidad: {{ form.mesa.capacidad }})</option>
            <option v-for="mesa in mesas" :key="mesa.numero_mesa" :value="mesa.seccion_mesa + ' - ' + mesa.numero_mesa">
                {{ mesa.seccion_mesa }} - {{ mesa.numero_mesa }} (Capacidad: {{ mesa.capacidad }})
              </option>
          </select>
        </div>
        <div class="col-md-3 comensal">
          <label class="form-label">Comensales:</label>
          <input type="number" class="form-control comensales" v-model="form.comensales"/>
        </div>
        <div class="col-md-3 estatus">
          <label class="form-label">Estatus:</label>
          <!-- <input type="text" class="form-control" v-model="form.estatus"/> -->
          <select class="form-control" v-model="form.estatus">
            <option :value="form.estatus" selected>{{ form.estatus }}</option>
            <option value="Activo">Activo</option>
            <option value="Cancelada">Cancelada</option>
          </select>

          <!-- <select class="form-select input-lg" v-model="form.mesa">
            <option>Libre</option>
            <option>Reservado</option>
            <option>Ocupado</option>
            <option>Eliminado</option>
          </select> -->
        </div>
          </div>
        </div>
        <!-- <div class="col-6">
          <label class="form-label">Comentario:</label>
          <textarea
            class="comentario form-control"
            v-model="form.comentario"
            rows="3"
            placeholder="Comentarios (opcional)" disabled
          ></textarea>
        </div> -->
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-custom text-white m-5 p-4"><h4>ACTUALIZAR</h4></button>
      </div>
    </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

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

const form = ref({
  nombre: "",
  apellido: "",
  telefono: "",
  correo: "",
  fecha: "",
  hora: "",
  mesa: "",
  comensales: "",
  // comentario: "",
  estatus: ""
});

const obtenerReserva = async () => {
  try {
    const token = localStorage.getItem("token");
    const id = route.params.id; // Obtenemos el ID de la URL

    console.log("ID que se enviará a la API:", id);

    const response = await fetch(`http://localhost:3000/api/reservaciones/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    console.log("Codigo de respuesta HTTP:", response.status);

    if(!response.ok) {
      throw new Error("Error al obtener reservacion. Codigo: ${response.status}");
    }

    const reserva = await response.json();
    console.log("reservacion recibida,", reserva);
    form.value.nombre = reserva.nombre;
    form.value.apellido = reserva.apellido;
    form.value.telefono = reserva.telefono;
    form.value.correo = reserva.correo;
    form.value.fecha = reserva.fecha;
    form.value.hora = reserva.hora;
    form.value.mesa = reserva.mesa;
    form.value.comensales = reserva.comensales;
    // form.value.comentario = reserva.comentario;
    form.value.estatus = reserva.estatus;
  } catch (error) {
    console.error("Error al obtener la reservacion", error);
    alert("No se pudo cargar la reservacion");
  }
};

// onMounted(() => {
//     console.log("ID recibido:", route.params.id);
//     obtenerReserva();
// });
onMounted(async () => {
  console.log("ID recibido:", route.params.id);
  await obtenerMesas(); // Espera a tener las mesas
  await obtenerReserva(); // Ahora sí busca la mesa en base a los datos de la reserva
});

const actualizarReserva = async () => {
    try {
    const token = localStorage.getItem("token");
    const id = route.params.id;

    const [nombre, apellido] = form.value.nombre.split(" ");
    const fechaFormateada = new Date(form.value.fecha).toISOString().split('T')[0];

    const response = await fetch(`http://localhost:3000/api/reservaciones/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombre,
        apellido: apellido,
        telefono: form.value.telefono,
        correo: form.value.correo,
        fecha: fechaFormateada,
        hora: form.value.hora,
        mesa: form.value.mesa,
        comensales: form.value.comensales,
        estatus: form.value.estatus,
        comentario: form.value.comentario
      })
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la reservacion");
    }

    alert("Reservacion actualizado correctamente");
    router.push("/reservas");
  } catch (error) {
    console.error("Error al actualizar reservacion:", error);
    alert("No se pudo actualizar la reservacion");
  }
}
</script>

<style scoped>
.hora{
  width:232px;
}

.comensal{
  width:220px;

}
.estatus{
  width:225px;
margin-left:33px;
}
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
.apellido{
  width: 226px;
  margin-left: 30px;

}
.info{
  width: 226px;
  margin-left: 0px;

}
.informaciones{
  width: 988px;


}
.informacion{
  width: 890px;
  margin-left: -60px;
}
.container-fluid {
  min-height: 950px;
  background: #6a1b47;
  padding: 10px;
  margin-top: 80px;
  width: 90%;
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
  background-color:#8e76838a;
}
</style>