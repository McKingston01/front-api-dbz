<template>
  <!-- Contenedor principal del carrusel -->
  <div class="card-carrousel">
    <!-- Componente de carga -->
    <LoadingSpinner :isLoading="isLoading" />

    <!-- Carrusel de tarjetas utilizando Swiper -->
    <swiper 
      :slides-per-view="5" 
      :space-between="10" 
      :loop="true" 
      :autoplay="{ delay: 3000 }" 
      :breakpoints="breakpoints" 
      class="card-carrousel__swiper"
    >
      <!-- Iteración sobre los personajes filtrados -->
      <swiper-slide v-for="personaje in filteredCharacters" :key="personaje.id" class="card-carrousel__slide">
        <!-- Tarjeta individual de personaje -->
        <div class="card-carrousel__card">
          <h2 class="card-carrousel__title">{{ personaje.name }}</h2>
          <img :src="personaje.imgUrl" :alt="personaje.nombre" class="card-carrousel__image" loading="lazy" />
          <!-- Contenedor de botones -->
          <div class="card-carrousel__button-container">
            <button class="card-carrousel__button" @click="goToInfoPage(personaje.id)">
              <p class="card-carrousel__button-text">Saber Más</p>
            </button>
            <button class="card-carrousel__button" @click="goToTransformation(personaje.id)">
              <p class="card-carrousel__button-text">Versiones</p>
            </button>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { mapGetters, mapActions } from 'vuex';
import LoadingSpinner from './LoadingSpinner.vue';

export default defineComponent({
  name: 'CardCarrousel',
  components: {
    Swiper,
    SwiperSlide,
    LoadingSpinner
  },
  props: {
    isHero: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      // Configuración de puntos de quiebre para el carrusel
      breakpoints: {
        300: { slidesPerView: 1.2, spaceBetween: 10 },
        400: { slidesPerView: 1.5, spaceBetween: 10 },
        500: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 2.2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        950: { slidesPerView: 4, spaceBetween: 20 },
        1100: { slidesPerView: 4.5, spaceBetween: 20 },
        1180: { slidesPerView: 4.5, spaceBetween: 10 },
      },
    };
  },
  computed: {
    ...mapGetters(['loading', 'cacheLoaded', 'personajes']),
    // Filtrar personajes basados en la propiedad isHero
    filteredCharacters() {
      return this.personajes.filter(personaje => personaje.isHero === this.isHero && personaje.isBase);
    },
  },
  async mounted() {
    // Cargar datos si no están en caché
    if (!this.cacheLoaded) {
      await this.fetchData();
    }
  },
  methods: {
    ...mapActions(['fetchData']),
    // Navegar a la vista de transformación
    goToTransformation(id) {
      this.$router.push({ name: 'TransformationView', params: { id } });
    },
    // Navegar a la página de información
    goToInfoPage(id) {
      this.$router.push({ name: 'InfoPageView', params: { id } });
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap");

/* Contenedor principal del carrusel */
.card-carrousel {
  width: 100%;
  overflow: hidden;
  position: relative;
}

/* Tarjeta individual */
.card-carrousel__card {
  position: relative;
  width: 225px;
  height: 465px;
  margin: 15px;
  overflow: auto;
  border-radius: 15px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  background: #01080a;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

/* Título de la tarjeta */
.card-carrousel__title {
  position: absolute;
  top: 10px;
  font-size: 2rem;
  background: linear-gradient(to right, #d4b061, #9b0505);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  pointer-events: none;
  z-index: 1;
}

/* Contenedor de botones */
.card-carrousel__button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position: absolute;
  bottom: 15px;
  width: 80%;
}

/* Botón individual */
.card-carrousel__button {
  width: 100%;
  background-color: rgba(4, 48, 134, 0.781);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 8px rgba(15, 31, 63, 0.82);
  transition: transform 0.2s, box-shadow 0.2s;
}

/* Texto del botón */
.card-carrousel__button-text {
  font-size: 1.3rem;
  background: linear-gradient(to right, #d4b061, #9b0505);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* Efecto al presionar el botón */
.card-carrousel__button:active {
  transform: translateY(4px);
  box-shadow: 0 2px rgba(28, 68, 149, 0.67);
}

/* Efecto hover en la tarjeta */
.card-carrousel__card:hover {
  transform: scale(1.07);
}

/* Imagen base de la tarjeta */
.card-carrousel__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Imagen superpuesta (si se necesita) */
.card-carrousel__overlay-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Efecto hover para la imagen superpuesta */
.card-carrousel__card:hover .card-carrousel__overlay-image {
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