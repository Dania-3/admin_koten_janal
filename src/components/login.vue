<template>
  <section class="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-black">
    <div class="row w-100 justify-content-center">
      <div class="col-4">
        <div id="toggle">
          <i class="indicator"></i>
        </div>
        <div id="app">
          <div class="wrapper d-flex justify-content-center align-items-center">
            <div class="form-wrapper sign-in">
              <form  @submit.prevent="iniciarSesion">
                  <div class="d-flex align-items-center justify-content-center">
                      <img src="/imagenes/Logo_Koten_Janal.png" class="logo" alt="" />
                  </div>
                  <h2 class="text-center mt-4">Iniciar sesión</h2>

                <div class="input-group">
                  <input type="text" v-model="usuario" placeholder=" " required /><!--el v-model sirve como id del elemento-->
                  <label :class="{ active: usuario }">Usuario</label>
                </div>
                <div class="input-group">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="contrasena"
                    placeholder=" "
                    required
                  />
                  <label for="">Contraseña</label>
                  <span class="toggle-password" @click="togglePassword">
                    <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                  </span>
                </div>

                <div class="remember">
                  <label>
                    <input type="checkbox" class="ms-3"/> Recordar
                    <a href="#" class="olvidar ms-4">¿Olvidaste tu contraseña?</a>
                  </label>
                </div>                  
                    <div class="iniciar mt-5">
                      <!--el to sirve como enlace para ver la otra pagina, "/" es para la pagina de admin-->
                        <button class="button">
                          INICIAR SESION
                        </button>
                    </div>     
                <div class="signUp-link terminos mt-5">
                  <p >
                    <a href="#">Aviso de privacidad</a> |
                    <a href="#">Términos y condiciones</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { useRouter } from "vue-router";
import { ref } from 'vue'

const router = useRouter();
const usuario = ref('')
const contrasena = ref('')
const showPassword = ref(false)
const errorMensaje = ref('');

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const iniciarSesion = async () => {
  if (!usuario.value || !contrasena.value) {
    errorMensaje.value = 'Por favor, completa todos los campos.';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario: usuario.value, contrasena: contrasena.value }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("nombre", data.nombre);
      localStorage.setItem("puesto", data.puesto);
      alert("Inicio de sesión exitoso");
      router.push("/admin");
    } else {
      errorMensaje.value = "Credenciales inválidas";
    }
  } catch (error) {
    console.error("Error en la autenticación:", error);
    errorMensaje.value = "Error en el servidor. Intenta nuevamente.";
  }
};
</script>

<style scoped>

@import '../style/login.css';

/*.wrapper:hover {
  animation: animate 1s linear infinite;
}*/
/*@keyframes animate {
  100% {
      filter: hue-rotate(360deg);
  }
}*/


/*.body{
  display: flex;
  justify-content:center;
  align-items:center;
  min-height:100vh;
  background: #000 !important ;
  transition:0.5s;
}*/

</style>