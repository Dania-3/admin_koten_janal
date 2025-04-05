<script setup>
import admin_menu from "../menu_admin.vue";
import footer_admin from "../footer.vue";
import admin_header from "../header_admin.vue";

import { ref, computed } from "vue";

const form = ref({
    nombreCompleto: "",
    fechaNacimiento: "",
    telefono: "",
    correo: "",
    curp: "",
    rfc: "",
    direccion: "",
    puesto: " ",
    salario: "",
});
</script>

<template>
    <section class="main1 container-fluid">
        <div class="main_espacio1 row d-flex justify-content-center align-items-center text-center gap-5 m-5">
            <div class="col-12">
                <h2 class="text-white">Editar personal</h2>
            </div>
            <!-- Imagen-->
            <div class="col-4 imagen">
                <img src="/public/imagenes/Empleado.png" style="width: 400px; height: 400px" alt="Foto de perfil" />
            </div>
            <!-- Contenedor del formulario -->
            <div class="col-7 pt-40 pb-100 form_container">
                <div class="top-info">
                    <input type="text" class="datos_empleado pt-5" v-model="form.nombreCompleto" required />
                    <input type="text" class="datos_empleado pt-5" v-model="form.fechaNacimiento" required />
                </div>
                <hr />
                <div class="form-grid">
                    <div class="input-group d-flex gap-3">
                        <label>Teléfono</label>
                        <input type="tel"class="btn input_text" v-model="form.telefono" required />
                    </div>

                    <div class="input-group">
                        <label>Correo</label>
                        <input type="email"class="btn input_text" v-model="form.correo" required />
                    </div>

                    <div class="input-group">
                        <label>CURP</label>
                        <input type="text"class="btn input_text" v-model="form.curp" required />
                    </div>

                    <div class="input-group">
                        <label>RFC</label>
                        <input type="text"class="btn input_text" v-model="form.rfc" required />
                    </div>

                    <div class="btn input-group" style="grid-column: span 2">
                        <label>Dirección</label>
                        <textarea v-model="form.direccion"class="btn input_text" required></textarea>
                    </div>

                    <div class="btn input-group">
                        <label>Puesto</label>
                        <input type="text"class="btn input_text" v-model="form.puesto" required />
                    </div>

                    <div class="btn input-group">
                        <label>Salario</label>
                        <input type="text"class="btn input_text" v-model="form.salario" required />
                    </div>
                </div>

                <div class="button-container">
                    <button>ACTUALIZAR</button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@import "/src/style/EditarPersonal.css";

.input_text{
    background-color: rgb(213, 209, 209);
    border-radius: 10px;
    font-size: 2.5rem; /* Aumenta el tamaño del texto dentro del input */
    padding: 10px; /* Agrega más espacio dentro del input */

    /*border: 30px solid rgb(213, 209, 209);*/
}
label{
    font-size: 20px;
}

.main_espacio1 {
    display: flex;
    justify-content: center;
    align-items: center;
    /*min-height: 100vh;*/
    background: #44112e;
    padding-top: 90px;
    padding-bottom: 130px;

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

.button-container {
    text-align: center;
    margin-top: 20px;
}
</style>
