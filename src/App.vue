<template>
    <!--login /-->
    <!--admin /-->
    <router-view />
</template>

<script>
import login from './components/login.vue';
import admin from './components/menu.vue';
/*import { useRouter } from "vue-router";*/

   export default{
     name: 'App',
   
     data(){
         return{
             number:0,
             msg:"te odio NEMix"
         }
     },

     /* para asignar el archivo como componente a usar*/
     components:{
        login/*-> uso como etiqueta */
     },
   
   }
</script>