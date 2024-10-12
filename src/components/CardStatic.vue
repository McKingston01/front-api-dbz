<template>
  <div class="card-static">
    <!-- Componente de carga con spinner -->
    <LoadingSpinner 
      :isLoading="showSpinner" 
      class="card-static__spinner"
    />

    <!-- Contenido principal del componente -->
    <div v-if="!showSpinner" class="card-static__content">
      <!-- Título del personaje -->
      <div class="card-static__title-container">
        
        <h2 class="card-static__title-text">{{ personaje.name }}</h2>
      </div>
      
      <!-- Contenedor de tarjetas de versiones -->
      <div class="card-static__cards-container">
        <!-- Iteración sobre las versiones del personaje -->
        <div 
          v-for="(version, index) in filteredVersions" 
          :key="index" 
          class="card-static__card"
        >
          <h2 class="card-static__card-title">{{ version.name }}</h2>
          <!-- Imagen base de la versión -->
          <img 
            :src="version.imgUrl" 
            :alt="version.name" 
            class="card-static__base-image" 
            @load="handleImageLoad"
          />
          <!-- Imágenes superpuestas para efectos visuales -->
          <img 
            v-if="version.ss" 
            src="../../public/api/img/ki4.png" 
            alt="Rayos" 
            class="card-static__overlay-image"
          />
          <img 
            v-if="version.ss" 
            src="../../public/api/img/ki.png" 
            alt="ki" 
            class="card-static__overlay-image"
          />
          <img 
            v-if="version.ss2" 
            src="../../public/api/img/ki6.png" 
            alt="Rayos" 
            class="card-static__overlay-image"
          />
          <img 
            v-if="version.ss2" 
            src="../../public/api/img/ki7.png" 
            alt="ki" 
            class="card-static__overlay-image"
          />
          <img 
            v-if="version.ss2" 
            src="../../public/api/img/ki9.png" 
            alt="ki" 
            class="card-static__overlay-image"
          />
          <!-- Botón para más información -->
          <div class="card-static__button-container">
            <button 
              class="card-static__button" 
              @click="goToInfoPage(version.id)"
            >
              <p class="card-static__button-text">Saber Más</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  name: 'CardStatic',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      showSpinner: false,
    };
  },
  computed: {
    ...mapGetters(['personajes']),
    personaje() {
      const id = parseInt(this.$route.params.id);
      return this.personajes.find(p => p.id === id) || {};
    },
    filteredVersions() {
      return this.personajes.filter(version => version.versionOf === this.personaje.name.toLowerCase());
    },
  },
  async created() {
    await this.initializeComponent();
  },
  methods: {
    ...mapActions(['fetchData']),
    async initializeComponent() {
      this.showSpinner = true;
      this.$store.dispatch('setLoading', true);

      try {
        await this.fetchData();
      } catch (error) {
        console.error('Error fetching character data:', error);
      } finally {
        this.hideSpinnerAfterDelay();
      }
    },
    hideSpinnerAfterDelay() {
      setTimeout(() => {
        this.$store.dispatch('setLoading', false);
        this.showSpinner = false;
      }, 1500);
    },
    handleImageLoad() {
      if (this.showSpinner) {
        this.$store.dispatch('setLoading', false);
        this.showSpinner = false;
      }
    },
    goToInfoPage(versionId) {
      this.$router.push({ name: 'InfoPageView', params: { id: versionId } });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap");

/* Contenedor del título */
.card-static__title-container {
  text-align: center;
  margin: 5px 0;
  margin-top: 6rem;
}

/* Texto del título */
.card-static__title-text {
  font-size: 7rem;
  background: linear-gradient(to right, #d4b061, #9b0505);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* Contenedor de las tarjetas */
.card-static__cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

/* Tarjeta individual */
.card-static__card {
  position: relative;
  width: 225px;
  height: 465px;
  margin: 15px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  background: #01080a;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

/* Título de la tarjeta */
.card-static__card-title {
  position: absolute;
  top: 10px;
  font-size: 1.7rem;
  background: linear-gradient(to right, #d4b061, #9b0505);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  pointer-events: none;
  z-index: 1;
}

/* Contenedor del botón */
.card-static__button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position: absolute;
  bottom: 15px;
  width: 90%;
}

/* Estilo del botón */
.card-static__button {
  width: 100%;
  background-color: rgba(28, 68, 149, 0.38);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 8px rgba(15, 31, 63, 0.82);
  transition: transform 0.2s, box-shadow 0.2s;
}

/* Texto del botón */
.card-static__button-text {
  font-size: 1.4rem;
  background: linear-gradient(to right, #d4b061, #9b0505);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* Efecto al presionar el botón */
.card-static__button:active {
  transform: translateY(4px);
  box-shadow: 0 2px rgba(28, 68, 149, 0.67);
}

/* Efecto hover en la tarjeta */
.card-static__card:hover {
  transform: scale(1.07);
}

/* Imagen base de la tarjeta */
.card-static__base-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Imágenes superpuestas */
.card-static__overlay-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Efecto hover en las imágenes superpuestas */
.card-static__card:hover .card-static__overlay-image {
  opacity: 1;
  animation: fadeInOut 6ms infinite;
}

/* Animación de fade in/out */
@keyframes fadeInOut {
  0%, 50% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
}
</style>