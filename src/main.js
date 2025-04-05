import { createApp } from 'vue'
/*import './style.css'*/
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'bootstrap/dist/css/lineicons.css';
/*import 'bootstrap/dist/css/materialdesignicons.min.css';*/
import 'bootstrap/dist/css/fullcalendar.css';
import 'bootstrap/dist/css/main.css';
/*import "./index.css"*/
import './style/index_parametros.css';
/*import {modo} from './plugin/modo_nocturno'*/

const app= createApp(App);
app.use(router);
app.mount('#app');
/*modo();*/
console.log("Router cargado:", router);
