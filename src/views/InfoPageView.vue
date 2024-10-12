<template>
  <section class="info-page">
    <div class="info-page__image-container">
      <!-- Cambiar a evento click -->
      <img 
        :src="currentImage" 
        :alt="currentName" 
        class="info-page__character-image"
        @click="toggleZIndex" 
        :style="{ zIndex: imageZIndex }" 
      />
      <div class="info-page__content">
        <h3 class="info-page__title">{{ currentName }}</h3>
        <p class="info-page__description">{{ currentDescription }}</p>
        <h3 class="info-page__title">Poder</h3>
        <p class="info-page__stat">{{ currentPower }}</p>
        <h3 class="info-page__title">Ataque</h3>
        <p class="info-page__stat">{{ currentAttack }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'InfoPageView',
  data() {
    return {
      imageZIndex: 0, // Z-index inicial
    };
  },
  computed: {
    ...mapGetters(['personajes', 'cacheLoaded']),
    currentCharacter() {
      const id = parseInt(this.$route.params.id);
      return this.findCharacterById(id);
    },
    currentImage() {
      return this.currentCharacter?.infoCharacter.imgPageUrl || '';
    },
    currentName() {
      return this.currentCharacter?.name || '';
    },
    currentDescription() {
      return this.currentCharacter?.infoCharacter.description || '';
    },
    currentPower() {
      return this.currentCharacter?.infoCharacter.power || '';
    },
    currentAttack() {
      return this.currentCharacter?.infoCharacter.attack || '';
    }
  },
  methods: {
    ...mapActions(['fetchData', 'setLoading']),
    findCharacterById(id) {
      if (!this.personajes) return null;
      return this.personajes.find(personaje => personaje.id === id) || null;
    },
    async loadCharacterData() {
      if (!this.cacheLoaded) {
        this.setLoading(true);
        try {
          await this.fetchData();
        } catch (error) {
          console.error('Error al cargar datos del personaje:', error);
        } finally {
          setTimeout(() => this.setLoading(false), 1000);
        }
      } else {
        this.setLoading(false);
      }
    },
    // Método para alternar el z-index
    toggleZIndex() {
      this.imageZIndex = this.imageZIndex === 100 ? 0 : 100;
    }
  },
  created() {
    this.loadCharacterData();
  }
};
</script>

<style scoped>
.info-page {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #1c4595, #060614);
  font-family: "Luckiest Guy", cursive;
  font-weight: 400;
  font-style: normal;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}

.info-page__image-container {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 85%;
  overflow: hidden;
  text-align: right;
}

.info-page__character-image {
  width: auto;
  height: 100%;
  object-fit: contain;
  right: 7rem;
  /* Asegúrate de que el z-index funcione correctamente */
  position: relative;
}

.info-page__content {
  position: absolute;
  bottom: 2rem;
  left: 1rem;
  right: 1.5rem;
  color: white;
  text-align: left;
  padding: 1rem;
  max-width: 90%;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
}

.info-page__title {
  font-size: clamp(1.5rem, 5vw, 3rem);
  margin-bottom: 1rem;
  background: linear-gradient(to right, #ffe02d, #cc2d2d);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.info-page__description,
.info-page__stat {
  width: 100%;
  font-size: clamp(0.875rem, 3vw, 1.25rem);
  background: linear-gradient(to right, #ffe02d, #cc2d2d);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.info-page__content {
  padding: 1rem;
  font-size: clamp(0.75rem, 4vw, 1rem);
  width: 50%;
}

@media (max-width: 768px) {
  .info-page__character-image {
    right: 0;
  }
}

@media (max-width: 768px) {
  .info-page__content {
    width: 100%;
  }
}
</style>
