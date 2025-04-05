<script setup>
import {modo} from "../plugin/modo_nocturno";

import admin_menu from './menu_admin.vue';
import footer_admin from './footer.vue';
import admin_header from './header_admin.vue';
import Dashboard from "./dashboard.vue";

</script>
<style scoped>
@import "../style/menu_toggle.css";

</style>
<template>
  <div class="wrapper">
    <admin_menu />
    <main class="main">
      <admin_header />
      <Dashboard />
      <footer_admin />
    </main>
  </div>
</template>

<!--
<template>
  <div class="wrapper">
    <aside :class="['sidebar-nav-wrapper', { 'expand': isExpanded }]" id="sidebar">
    <div class="navbar-logo px-2">
      
      <a href="index.html" id="toggle_menu" @click.prevent="desplazar_menu">
        <img src="/imagenes/Logo_Koten_Janal.png" id="logo_toggle"></img>
      </a>

    </div>
    <nav class="sidebar-nav">
      <ul class="mb-75">
        <li class="secciones_menu">
          <a href="#0" data-bs-toggle="collapse" data-bs-target="#ddmenu_1" aria-controls="ddmenu_1"
            aria-expanded="false" aria-label="Toggle navigation" class="d-flex align-items-center">
            <img src="/imagenes/dashboard.png" class="p-2">
            <p class="m-0">Dashboard</p>
          </a>
        </li>
        <li>
          <a href="#0" data-bs-toggle="collapse" data-bs-target="#multi" aria-controls="ddmenu_1"
            aria-expanded="false" aria-label="Toggle navigation" class="d-flex align-items-center">
            <img src="/imagenes/reservas.png" class="p-2">
            <p class="m-0">Reservas</p>
          </a>
        </li>
        <li>
          
          <a href="#0" data-bs-toggle="collapse" data-bs-target="#ddmenu_1" aria-controls="ddmenu_1"
            aria-expanded="false" aria-label="Toggle navigation" class="d-flex align-items-center">
            <img src="/imagenes/mesas.png" class="p-2">
            <p class="m-0">Mesas</p>
          </a>
        </li>
        <li>
          <a href="#0" data-bs-toggle="collapse" data-bs-target="#ddmenu_1" aria-controls="ddmenu_1"
            aria-expanded="false" aria-label="Toggle navigation" class="d-flex align-items-center">
            <img src="/imagenes/registros.svg" class="p-2">
            <p class="m-0">Personal</p>
          </a>
        </li>
        <li>
          <a href="#0" data-bs-toggle="collapse" data-bs-target="#ddmenu_1" aria-controls="ddmenu_1"
            aria-expanded="false" aria-label="Toggle navigation" class="d-flex align-items-center">
            <img src="/imagenes/horarios.png" class="p-2">
            <p class="m-0">Horarios</p>
          </a>
        </li>
      </ul>
        
      <ul>
        <li class="pb-2">
          <a href="#0" data-bs-toggle="collapse" data-bs-target="#ddmenu_1" aria-controls="ddmenu_1"
            aria-expanded="false" aria-label="Toggle navigation" class="d-flex align-items-center gap-1">
            <img src="/imagenes/usuarios.png" class="usuario p-2">
            <div class="d-flex flex-column">
              <p class="m-0 pb-2">Angel Chi</p>
            <h6> Administrador</h6>
            </div>
          </a>
        </li>
        <li>
          <a href="#0" data-bs-toggle="collapse" data-bs-target="#ddmenu_1" aria-controls="ddmenu_1"
            aria-expanded="false" aria-label="Toggle navigation" class="d-flex align-items-center">
            <img src="/imagenes/salir.png" class="p-2">
            <p class="m-0">Salir</p>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</div>
  <main class="main-wrapper">
   <Header1 />
  </main>
</template>

-->

<!--
   <div id="preloader">
      <div class="spinner"></div>
  </div>
  -->
