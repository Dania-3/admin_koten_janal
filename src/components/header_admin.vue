<template>
     <header class="navbar d-flex justify-content-end">
    <!-- Switch Button -->
    <div class="form-check form-switch d-flex align-items-center pr-75 m-2">
      <input
        class="form-check-input mi-switch"
        type="checkbox"
        id="toggleSwitch"
      /> 
    </div>
  </header>
</template>

<style scoped>
header{
    background-color: #6A1B47;
    height: 80px;
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    /*width: 100%;*/
    z-index: 10; 
    padding: 15px;
}
.mi-switch {
    transform: scale(2.5); /* Aumenta el tamaño */
  }

.d-flex.gap-4.text-center.d-flex.align-items-center{
    padding: 80px;
}

.col-4{
    background-color: #F7F7F7;
    /*height: 300px;*/
    border: 2px solid #BDBDBD;
    border-radius: 5px;
}
.text-black.p-3.mb-2{
    border: 2px solid #BDBDBD;
    border-radius: 5px;
}

#seccion_dashboard{
    height: 200vh;
    width: 180vh; 
    margin: 0px;
}
.mb-5{
    margin-top: 120px;
}

</style>