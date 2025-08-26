<template>
  <div class="container my-4">
    <!-- Fila con buscador y botón agregar -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <BuscarPeliculas @filtrar="filtrarPeliculas" />
      <div class="btn-animado" @click="abrirFormulario()">
        <a href="#">Agregar Película</a>
      </div>
    </div>

    <!-- Carrusel ahora es un componente separado -->
    <CarruselDestacado :peliculas="peliculasDestacadas" />

    <!-- Grid de películas -->
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" id="Seccion-peliculas">
      <div 
        v-for="pelicula in peliculas" 
        :key="pelicula.imdbID" 
        class="col"
      >
        <div class="card h-100 text-light" style="background-color: #2C2C2C;">
          <img :src="pelicula.Poster" class="card-img-top" style="height: 250px; object-fit: cover;" alt="poster">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title" style="color: #E0E0E0;">{{ pelicula.Title }}</h5>
            <p class="card-subtitle mb-2" style="color: #B0B0B0;">Género: {{ pelicula.Type }}</p>
            <p class="fw-bold" :class="pelicula.Estado ? 'text-success' : 'text-danger'">
              {{ pelicula.Estado ? 'Disponible' : 'No disponible' }}
            </p>
            <p class="card-text text-secondary">{{ pelicula.description }}</p>
            <div class="mt-auto d-flex gap-2">
              <div class="btn-animado" @click="abrirFormulario(pelicula)">
                <a href="#">Editar</a>
              </div>
              <div class="btn-animado" @click="borrarPelicula(pelicula.imdbID)">
                <a href="#">Eliminar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Formulario -->
    <div v-if="mostrarFormulario" class="form-flotante">
      <FormularioPelicula 
        :pelicula="peliculaSeleccionada"
        @cerrar="cerrarFormulario"
        @guardado="refrescarPeliculas"
      />
    </div>
  </div>
</template>

<script>
import BuscarPeliculas from './BuscarPeliculas.vue';
import FormularioPelicula from './FormularioPelicula.vue';
import CarruselDestacado from './CarruselDestacado.vue';
import { getPeliculas, eliminarPelicula } from '../services/api';

export default {
  name: 'ListadoPeliculas',
  components: { BuscarPeliculas, FormularioPelicula, CarruselDestacado },
  data() {
    return {
      peliculas: [],
      peliculasDestacadas: [],
      mostrarFormulario: false,
      peliculaSeleccionada: null
    };
  },
  methods: {
    async cargarPeliculas() {
      this.peliculas = await getPeliculas();
      this.peliculasDestacadas = this.peliculas.filter(p => p.Estado).slice(0, 5);
    },
    async filtrarPeliculas(filtros) {
      this.peliculas = await getPeliculas(filtros.title, filtros.ubication);
      this.peliculasDestacadas = this.peliculas.filter(p => p.Estado).slice(0, 5);
    },
    async borrarPelicula(imdbID) {
      await eliminarPelicula(imdbID);
      this.cargarPeliculas();
    },
    abrirFormulario(pelicula = null) {
      this.peliculaSeleccionada = pelicula;
      this.mostrarFormulario = true;
    },
    cerrarFormulario() {
      this.mostrarFormulario = false;
      this.peliculaSeleccionada = null;
    },
    refrescarPeliculas() {
      this.cargarPeliculas();
      this.cerrarFormulario();
    }
  },
  mounted() {
    this.cargarPeliculas();
  }
};
</script>
