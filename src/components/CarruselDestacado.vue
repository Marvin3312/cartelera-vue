<template>
  <div v-if="peliculas.length" id="carouselDestacado" class="carousel slide mb-4" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        v-for="(pelicula, index) in peliculas"
        :key="index"
        type="button"
        data-bs-target="#carouselDestacado"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
        aria-current="true"
        :aria-label="'Slide ' + (index + 1)">
      </button>
    </div>

    <div class="carousel-inner">
      <div 
        v-for="(pelicula, index) in peliculas" 
        :key="pelicula.imdbID" 
        :class="['carousel-item', { active: index === 0 }]">
        <img :src="pelicula.Poster" class="d-block w-100 rounded" style="height: 400px; object-fit: cover;" :alt="pelicula.Title">
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2 text-start">
          <h5>{{ pelicula.Title }}</h5>
        </div>
      </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselDestacado" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselDestacado" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Siguiente</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CarruselDestacado',
  props: {
    peliculas: {
      type: Array,
      required: true
    }
  }
};
</script>
