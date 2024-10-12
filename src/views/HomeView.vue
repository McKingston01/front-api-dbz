<template>
  <!-- Contenedor del título con imagen -->
  <div class="home-view__title-container-img">
    <img src="../../public/api/img/title.png" alt="Título HeroZ" class="home-view__title-img" />
  </div>

  <!-- Contenedor del título de HeroZ con animación -->
  <div class="home-view__title-container-text" @mouseenter="animateBackground">
    <h2 class="home-view__title-text">HeroZ</h2>
  </div>

  <!-- Sección de héroes -->
  <section class="home-view__hero-section">
    <CardCarrousel :isHero="true"/>
  </section>

  <!-- Contenedor del título de DevilZ con animación -->
  <div class="home-view__title-container-text" @mouseenter="animateBackground">
    <h2 class="home-view__title-text">DevilZ</h2>
  </div>

  <!-- Sección de villanos -->
  <section class="home-view__villain-section">
    <CardCarrousel :isHero="false" />
  </section>

  <!-- Vista del enrutador -->
  <router-view />

  <!-- Pie de página -->
  <footer class="home-view__footer">
    <div class="home-view__footer-container">
      <ul class="home-view__footer-nav">
        <li class="home-view__nav-item" v-for="(item, index) in navItems" :key="index">
          <div class="home-view__footer-item-container">
            <a :href="item.link" class="home-view__nav-link">
              <button class="home-view__footer-button" :style="{ backgroundImage: `url(${item.background})` }"></button>
              <p class="home-view__footer-text">{{ item.label }}</p>
            </a>
          </div>
        </li>
      </ul>
      <div class="home-view__footer-credits">
        <p class="home-view__credits-text">By McKingston</p>
      </div>
    </div>
  </footer>
</template>

<script>
import CardCarrousel from '@/components/CardCarrousel.vue';

export default {
  name: 'HomeView',
  components: {
    CardCarrousel,
  },
  data() {
    return {
      navItems: [
        { label: "Git Hub", link: "https://github.com/McKingston01", background: require('../../public/api/img/esfera-5.png') },
        { label: "Contacto", link: "mailto:mc.sa.kingston@gmail.com", background: require('../../public/api/img/esfera-6.png') },
        { label: "LinkedIn", link: "https://www.linkedin.com/in/mcsadevp", background: require('../../public/api/img/esfera-7.png') },
      ],
    };
  },
  methods: {
    // Método para animar el fondo del título
    animateBackground(event) {
      const element = event.target;
      element.classList.add('home-view__title-container-text--animate');
      setTimeout(() => {
        element.classList.remove('home-view__title-container-text--animate');
      }, 2000);
    },
  },
};
</script>

<style>
/* Los estilos se mantienen igual, solo se actualizan los nombres de las clases para seguir BEM */
.home-view__title-img {
  width: 80%;
  height: auto;
  padding: 100px;
  margin-top: 7rem;
}

.home-view__title-container-img {
  text-align: center;
}

@media (max-width: 1000px) {
  .home-view__title-img {
    padding: 20px;
  }
}

.home-view__title-container-text {
  background-image: url("../../public/api/img/poder.png");
  background-size: 0% 0%;
  background-repeat: no-repeat;
  background-position: left;
  text-align: center;
  transition: background-size 2s;
  margin-top: 7rem;
}

.home-view__title-container-text--animate {
  background-size: 115% 150%;
}

.home-view__title-text {
  font-size: 7rem;
  background: linear-gradient(to right, #d4b061, #9b0505);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.home-view__footer {
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: #060614;
  padding: 20px 0;
  text-align: center;
}

.home-view__footer-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  list-style-type: none;
  margin-top: 12px;
}
.home-view__nav-link{
  text-decoration: none;
}

.home-view__footer-item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.home-view__footer-button {
  border-radius: 100px;
  width: 3rem;
  height: 3rem;
  background-size: 133%;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  margin-bottom: -16px;
}

.home-view__footer-text {
  font-size: 2rem;
  margin-top: -10px;
  background: linear-gradient(to right, #d4b061, #9b0505);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
 
}

.home-view__credits-text {
  font-size: 1rem;
  color: #3d3d41;
}

@media (max-width:500px) {
  .home-view__footer-text {
    font-size: 1.5rem;
  }
}

@media (max-width:391px) {
  .home-view__footer-text {
    font-size: 1rem;
  }
}
</style>