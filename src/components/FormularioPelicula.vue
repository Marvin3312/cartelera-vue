<template>
  <div class="form-flotante">
    <div class="card p-4 bg-dark text-light shadow-lg">
      <h4 class="mb-3">{{ pelicula?.imdbID ? 'Editar Película' : 'Agregar Película' }}</h4>

      <form @submit.prevent="guardar">
        <!-- Title -->
        <div class="mb-3">
          <label for="title" class="form-label">Título</label>
          <input type="text" id="title" v-model="form.Title" class="form-control" required />
        </div>

        <!-- Year -->
        <div class="mb-3">
          <label for="year" class="form-label">Año de estreno</label>
          <input type="number" id="year" v-model="form.Year" class="form-control" required />
        </div>

        <!-- Type -->
        <div class="mb-3">
          <label for="type" class="form-label">Género / Tipo</label>
          <input type="text" id="type" v-model="form.Type" class="form-control" required />
        </div>

        <!-- Poster -->
        <div class="mb-3">
          <label for="poster" class="form-label">URL del Póster</label>
          <input type="url" id="poster" v-model="form.Poster" class="form-control" required />
        </div>

        <!-- Estado -->
        <div class="mb-3 form-check">
          <input type="checkbox" id="estado" v-model="form.Estado" class="form-check-input" />
          <label for="estado" class="form-check-label">Disponible / Activa</label>
        </div>

        <!-- Description -->
        <div class="mb-3">
          <label for="description" class="form-label">Descripción</label>
          <textarea id="description" v-model="form.description" class="form-control" rows="3" required></textarea>
        </div>

        <!-- Ubication -->
        <div class="mb-3">
          <label for="ubication" class="form-label">Ubicación (cine)</label>
          <input type="text" id="ubication" v-model="form.Ubication" class="form-control" required />
        </div>

        <!-- Botones -->
        <div class="d-flex gap-2 justify-content-end">
          <button type="submit" class="btn btn-success">
            {{ pelicula?.imdbID ? 'Actualizar' : 'Guardar' }}
          </button>
          <button type="button" class="btn btn-secondary" @click="$emit('cerrar')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { crearPelicula, actualizarPelicula } from '../services/api';

export default {
  name: 'FormularioPelicula',
  props: {
    pelicula: { type: Object, default: null }
  },
  data() {
    return {
      form: this.pelicula
        ? { ...this.pelicula }
        : {
            imdbID: `IMDB${Date.now()}`,
            Title: '',
            Year: '',
            Type: '',
            Poster: '',
            Estado: false,
            description: '',
            Ubication: ''
          }
    };
  },
  methods: {
    async guardar() {
      try {
        if (this.pelicula?.imdbID) {
          await actualizarPelicula(this.form);
        } else {
          await crearPelicula(this.form);
        }
        alert("✅ Película guardada con éxito");
        this.$emit('guardado');
        this.$emit('cerrar');
      } catch (error) {
        console.error("Error al guardar:", error);
        alert("❌ Error al guardar la película");
      }
    }
  }
};


</script>

<style scoped>
.form-flotante {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 700px;
  max-height: 90vh; /* altura máxima de la ventana */
  overflow-y: auto;  /* scroll vertical si se excede */
  z-index: 1050;
  padding: 0.5rem;
}

.form-flotante .card {
  height: auto;        /* altura automática según contenido */
  min-height: 400px;   /* altura mínima para que no se vea demasiado pequeño */
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
</style>
