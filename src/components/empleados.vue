<script setup>
import { ref, computed } from "vue";
import admin_menu from './menu_admin.vue';
import footer_admin from './footer.vue';
import admin_header from './header_admin.vue';
import {useRouter} from 'vue-router';

// Lista de empleados
const filter = ref("all");
const search = ref("");
const searchQuery = ref('');

var employees= ref([
        { id: 1, name: 'Sofía Ramírez', position: 'Supervisor', status: 'Activo', salary: 18000, image: '/public/imagenes/Empleado.png' },
        { id: 2, name: 'Lucas Fernández', position: 'Almacenista', status: 'Inactivo', salary: 15000, image: '/public/imagenes/Empleado.png' },
        { id: 3, name: 'Camila Torres', position: 'Mesero', status: 'Inactivo', salary: 10000, image: '/public/imagenes/Empleado.png' },
        { id: 4, name: 'Juan Pérez', position: 'Cajero', status: 'Activo', salary: 8000, image: '/public/imagenes/Empleado.png' },
        { id: 4, name: 'Juan Pérez', position: 'Cajero', status: 'Activo', salary: 8000, image: '/public/imagenes/Empleado.png' },
]);

const confirmarAccion = () => {
  const respuesta = window.confirm("¿Deseas eliminar?");
  
  if (respuesta) {
    alert("Se ha borrado exitosamente.");
  }
};
    /*const filteredEmployees = computed(()=>{
        return employees.value.filter(employee=>{
            if(filter.value=== "all"){
                return true;
            }
            if(FileReader.value=== "Mesero") return employee.position.toLowerCase() === search.value; //toLowerCase() para cadenas de texto convirtiendolo a minusculas
            return true;
        })
    });
    */
    
   const filteredEmployees = computed(() => {
  return employees.value.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  
});

</script>


<template>
    <admin_menu />
<div class="main">
    <admin_header />
        <div class="container-fluid  pl-50 pr-50 main_espacio">
            <div class="row">
                <div class="col-11 gap-5 d-flex justify-content-center align-items-center">
                <form class="buscador  text-start bg-white d-flex align-items-center w-75">
                    <input type="text"  v-model="searchQuery"  placeholder="Buscar Empleado" id="barra_buscar" />
                    <button id="buscar"> <!--id="buscar"-->
                    <img src="/public/imagenes/buscador.png" alt="buscador" />
                    </button>
                </form>
            </div>
                <div class="col-1 d-flex justify-content-start align-items-center">
                <router-link to="/agregar_personal">
                <div class="btn-verde" id="nuevo">
                    <img src="/public/imagenes/nuevo.png" id="img_nuevo" />
                </div>
                </router-link>
                </div>
                
                <div class="col-12" id="user-list">
                <div class="employee-container">
                    <div class="employee-item" v-for="employee in filteredEmployees" :key="employee.id">
                    <img :src="employee.image" alt="Imagen del empleado"/>
                    <span class="employee-name">{{ employee.name }}</span>
                    <span class="employee-position">Puesto:{{ employee.position }}</span>
                    <span class="employee-status" :class="{ active: employee.status == 'Activo' }">Estatus: {{ employee.status}}</span>
                    <span class="employee-salary">Saliario: ${{ employee.salary }}MNX</span>
                    <div class="employee-actions">
                    <router-link to="/editar_personal">
                        <button class="edit-btn">
                            <img src="/public/imagenes/editar.png" id="img_editar"/>
                            <!--i class="fas fa-pencil-alt">Editar</i-->
                        </button>
                    </router-link>
                    <button @click="confirmarAccion" class="delete-btn">
                        <img src="/public/imagenes/eliminar.png" id="img_eliminar"/>
                    </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
<footer_admin />
</div>
</template>

<style scoped>
    @import '../style/empleados.css';
    
#barra_buscar {
  background-color: white;
  font-size: 24px;
  width: 95%;
}

.buscador {
  border: 2px solid #000000;
  border-radius: 8px;
  width: 280px;
  padding: 5px;

}
/*lo que le da espacio para el container */
    .main{
        margin-left: 110px;
        
    }
/* Contenido principal */
.content {
    margin-left: 100px;
    padding: 25px;
    flex: 1;
    transition: margin-left 0.3s;
    overflow-y: hidden;
    margin-top:50px;

}

.employee-container {
    margin-top: 10px ;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
/* Personal */
.employee-item {
    display: flex;
    align-items: center;
    padding: 15px;
    font-size: 20px;
    background-color: rgb(239, 236, 236);
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    gap: 160px;
    box-shadow: 0 3px 5px #00000080;

    /*width: calc(100% - 30px);*/
}
.employee-img {
    width: 102px;
    height: 102px;
    object-fit: cover;
    border-radius: 8px;
}

.employee-info {
    flex: 1;
}
.employee-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}
.employee-title {
    font-size: 26px;
    font-weight: bold;
    color: #333;
    margin: 0;
}
.employee-price {
    font-size: 20px;
    font-weight: bold;
    color: black;
}
.employee-description {
    font-family: "Maname";
    font-size: 18px;
    color: #666;
}
.employee-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.employee-actions button {
    margin: 4px;
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
}
.edit-btn {
    background-color: #23a200;
    font-family: 'Merriweather';
    color: white;
}
.edit-btn:hover {
    background-color: #1E8449;
}
.delete-btn {
    background-color: #D64040;
    font-family: 'Merriweather';
    color: white;
}
.delete-btn:hover {
    background-color: #972020; 
}
#user-list {
    width: 100%;
    /*margin-top: 0%;*/
    height: 828px;
    overflow-y: auto;
    scrollbar-width: none;
}

.employee-name,
.employee-position,
.employee-status,
.employee-salary {
    width: 167px;
    text-align: center;
}
</style>