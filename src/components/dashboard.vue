<style scoped>
@import "../style/dashboard.css";
/*@import "../style/menu_toggle.css";*/
</style>

<script setup>
import {modo} from "../plugin/modo_nocturno";

import admin_menu from './menu_admin.vue';
import footer_admin from './footer.vue'
import admin_header from './header_admin.vue'

</script>

<template>
  <admin_menu />
  <div class="main">
  <admin_header />
  <section class="container-fluid">
    <div class="row main_espacio" id="seccion_dashboard">
      <div id="seccion_titulo">
      <div class="col-12 align-items-center d-flex justify-content-center">
        <h1 class="mb-5">Bienvenidos al dashboard </h1>
      </div>
      <div class="col-12 align-items-center d-flex justify-content-center">
        <h4 class="mb-2">(usuario)</h4>
      </div>
    </div>
      <div
        class="d-flex gap-4 text-center d-flex align-items-center justify-content-center"
      >
        <div
          class="col-4 d-flex flex-column p-3 justify-content-center align-items-center"
        >
          <div class="d-flex flex-row align-items-start text-black p-3 mb-2">
            <div class="d-flex flex-column">
              <h5 class="pr-50">Diario</h5>
              <h4 id="diario1">$68,434</h4>
            </div>
            <span class="text-success ms-2">↑ 10%</span>
          </div>

          <div class="d-flex flex-row align-items-start text-black p-3 mb-2">
            <div class="d-flex flex-column">
              <h5 class="pr-50">Mensual</h5>
              <h4 id="mensual1">$2,053,020</h4>
            </div>
            <span class="text-success ms-2">↑ 10%</span>
          </div>

          <div class="d-flex flex-row align-items-start text-black p-3 mb-2">
            <div class="d-flex flex-column">
              <h5 class="pr-50">Anual</h5>
              <h4 id="anual1">$24,636,240</h4>
            </div>
            <span class="text-success ms-2">↑ 10%</span>
          </div>
        </div>

        <div
          class="col-4 d-flex flex-column p-3 justify-content-center align-items-center"
        >
          <div class="d-flex flex-row align-items-start text-black p-3 mb-2">
            <div class="d-flex flex-column">
              <h5 class="pr-50">Diario</h5>
              <h4 id="diario2">$68,434</h4>
            </div>
            <span class="text-success ms-2">↑ 10%</span>
          </div>

          <div class="d-flex flex-row align-items-start text-black p-3 mb-2">
            <div class="d-flex flex-column">
              <h5 class="pr-50">Mensual</h5>
              <h4 id="mensual">$2,053,020</h4>
            </div>
            <span class="text-success ms-2">↑ 10%</span>
          </div>

          <div class="d-flex flex-row align-items-start text-black p-3 mb-2">
            <div class="d-flex flex-column">
              <h5 class="pr-50">Anual</h5>
              <h4 id0="anual">$24,636,240</h4>
            </div>
            <span class="text-success ms-2">↑ 10%</span>
          </div>
        </div>
        <div
          class="col-4 d-flex flex-column p-3 justify-content-center align-items-center"
        >
          <div class="d-flex flex-row align-items-start text-black p-3 mb-2">
            <div class="d-flex flex-column">
              <h5 class="pr-50">Diario</h5>
              <h4 id="diario">$68,434</h4>
            </div>
            <span class="text-success ms-2">↑ 10%</span>
          </div>

          <div class="d-flex flex-row align-items-start text-black p-3 mb-2">
            <div class="d-flex flex-column">
              <h5 class="pr-50">Mensual</h5>
              <h4 id="mensual">$2,053,020</h4>
            </div>
            <span class="text-success ms-2">↑ 10%</span>
          </div>

          <div class="d-flex flex-row align-items-start text-black p-3 mb-2">
            <div class="d-flex flex-column">
              <h5 class="pr-50">Anual</h5>
              <h4 id="anual">$24,636,240</h4>
            </div>
            <span class="text-success ms-2">↑ 10%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer_admin />
</div>
</template>
