<template>
  <div class="loading-spinner">
    <!-- Overlay del spinner -->
    <div v-if="showSpinner" class="loading-spinner__overlay">
      <img :src="loadingImage" :alt="loadingAltText" class="loading-spinner__img" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    // Indica si el spinner debe mostrarse
    isLoading: {
      type: Boolean,
      default: false,
    },
    // ID del personaje para cargar una imagen específica
    id: {
      type: [String, Number],
      default: null,
    },
  },
  computed: {
    // Determina si se debe mostrar el spinner
    showSpinner() {
      return this.isLoading;
    },
    // Obtiene la imagen de carga apropiada
    loadingImage() {
      return this.id ? this.getLoadingImageForId() : '/api/img/loading.png';
    },
    // Texto alternativo para la imagen de carga
    loadingAltText() {
      return `Cargando ${this.id ? 'personaje' : 'contenido'}...`;
    },
  },
  methods: {
    // Obtiene la imagen de carga específica para un personaje
    getLoadingImageForId() {
      const personaje = this.$store.getters.personajes.find(p => p.id === parseInt(this.id));
      return personaje ? `/api/${personaje.img}` : '/api/img/loading.png';
    },
  },
};
</script>

<style scoped>
.loading-spinner__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

@keyframes scaleRotate {
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.5) rotate(0deg);
  }
  50% {
    transform: scale(1) rotate(360deg);
  }
  75% {
    transform: scale(1.5) rotate(360deg);
  }
  100% {
    transform: scale(1) rotate(720deg);
  }
}

.loading-spinner__img {
  width: 100px;
  height: 100px;
  animation: scaleRotate 3s infinite;
}
</style>
