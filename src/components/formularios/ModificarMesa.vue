<template>
  <dialog ref="modal" class="modal">
      <h2>ventana modal</h2>
      <p>{{ mensaje }}</p>
      <button @click="cerrar">Cerrar</button>
  </dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    mensaje: String,
    mostrar: Boolean
  })
  
  const emit = defineEmits(['cerrar'])
  
  const modal = ref(null)
  
  const cerrar = () => {
    modal.value.close()
    emit('cerrar')
  }
  
  watch(() => props.mostrar, (nuevoValor) => {
    if (nuevoValor) {
      modal.value.showModal()
    } else {
      modal.value.close()
    }
  })
  </script>
  
  <style scoped>
  .modal{
    background-color: bisque;
  }
  /*.modal::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }*/
  </style>
  