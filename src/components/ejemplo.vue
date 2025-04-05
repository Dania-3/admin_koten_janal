<template>
  <div>
    <button @click="toggleMenu" class="btn">Abrir Menú Admin</button>
    <div v-if="isMenuOpen" class="menu">
      <p>Menú de Administración</p>
      <ul>
        <li>Opción 1</li>
        <li>Opción 2</li>
        <li>Opción 3</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
.menu {
  margin-top: 10px;
  padding: 15px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  width: 200px;
}
</style>
