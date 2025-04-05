<style scoped>
 body {
            background-color: #3c102b;
            color: white;
        }
        .container {
            max-width: 700px;
            background: #4a1034;
            padding: 20px;
            border-radius: 10px;
            margin-top: 50px;
        }
        .btn-custom {
            background-color: transparent;
            border: 2px solid white;
            color: white;
            width: 100%;
        }
        .btn-custom:hover {
            background-color: white;
            color: #4a1034;
        }
</style>
<template>
    <div class="container">
        <h2 class="text-center">Modificar reservación</h2>
        <form>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">Nombre:</label>
                    <input type="text" class="form-control" placeholder="Nombre">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Apellido:</label>
                    <input type="text" class="form-control" placeholder="Apellido">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">Teléfono:</label>
                    <input type="text" class="form-control" placeholder="(10 dígitos)">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Correo:</label>
                    <input type="email" class="form-control" placeholder="Email">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">Fecha:</label>
                    <input type="date" class="form-control">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Hora:</label>
                    <select class="form-control">
                        <option>00:00</option>
                        <option>01:00</option>
                        <option>02:00</option>
                        <!-- Agregar más opciones según sea necesario -->
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-4">
                    <label class="form-label">Mesa:</label>
                    <select class="form-control">
                        <option>1-A</option>
                        <option>1-B</option>
                        <!-- Más opciones -->
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Comensales:</label>
                    <select class="form-control">
                        <option>1 comensal</option>
                        <option>2 comensales</option>
                        <!-- Más opciones -->
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Estatus:</label>
                    <select class="form-control">
                        <option>Pendiente</option>
                        <option>Confirmado</option>
                    </select>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Comentario:</label>
                <textarea class="form-control" rows="3" placeholder="Comentarios (opcional)"></textarea>
            </div>
            <button type="submit" class="btn btn-custom">ACTUALIZAR</button>
        </form>
    </div>
</template>