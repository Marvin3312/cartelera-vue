import { createApp } from 'vue'
import App from './App.vue'
import './assets/estilos.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Importar AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.mount('#app')

// Inicializar AOS
AOS.init({
  duration: 1000, // duración animación
  once: true     // animar solo la primera vez
})
