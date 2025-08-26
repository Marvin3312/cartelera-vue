<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div class="input-group">
      <input
        v-model="titulo"
        type="text"
        class="form-control h-100 me-2 rounded"
        placeholder="Buscar por título"
      />
      <input
        v-model="ubicacion"
        type="text"
        class="form-control h-100 me-2 rounded"
        placeholder="Buscar por ubicación"
      />

      <!-- Botón con lupa animada -->
      <button class="svg-button" @click="buscar" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle class="svg-path" cx="11" cy="11" r="7" stroke="white" stroke-width="2"/>
          <line class="svg-path" x1="16.5" y1="16.5" x2="21" y2="21" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuscarPeliculas",
  data() {
    return {
      titulo: "",
      ubicacion: "",
    };
  },
  methods: {
    buscar() {
      this.$emit("filtrar", { title: this.titulo, ubication: this.ubicacion });
    },
  },
};
</script>
