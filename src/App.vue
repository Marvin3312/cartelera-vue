<template>
<body class=hero-gradient-animation>
  <div id="app" class="hero-gradient-animation">
  

    <!-- Contenido de la app -->
    <div class="position-relative" style="z-index: 1; padding: 2rem;">
      <ListadoPeliculas @editar="editarPelicula"/>
      <FormularioPelicula
        v-if="peliculaSeleccionada"
        :peliculaEdit="peliculaSeleccionada"
        @guardado="recargar"
      />
    </div>

        <div v-if="mostrarMensaje" class="alert-flotante">
          {{ mensaje }}
        </div>

  </div>
  </body>
</template>

<script>
import ListadoPeliculas from './components/ListadoPeliculas.vue';
import FormularioPelicula from './components/FormularioPelicula.vue';
import './assets/estilos.css';
import './assets/formulario.css';

export default {
  name: 'App',
  components: { ListadoPeliculas, FormularioPelicula },
  data() { return { peliculaSeleccionada: null }; },
  methods: {
    editarPelicula(pelicula) { this.peliculaSeleccionada = pelicula; },
    recargar() { this.peliculaSeleccionada = null; location.reload(); }
  }
}
</script>


