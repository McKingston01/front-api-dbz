<template>
  <div class="nav-menu">
    <nav id="navbar" class="nav-menu__navbar navbar navbar-expand-md navbar-dark fixed-top">
      <div class="container">
        <!-- Favicon con animación de rotación -->
        <img
          class="nav-menu__favicon"
          :class="{ 'nav-menu__favicon--rotating': isRotating }"
          src="../../public/api/img/icon-nav.png"
          alt="favicon"
          @mouseenter="rotateIcon"
          @click="goBack"
        />
        <!-- Botón de hamburguesa para dispositivos móviles -->
        <button
          class="navbar-toggler"
          type="button"
          @click="toggleMenu"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Menú de navegación -->
        <div :class="['collapse', 'navbar-collapse', { 'show': isMenuOpen }]" id="navbarNav" ref="navbarNav">
          <ul class="navbar-nav ms-auto nav-menu__list">
            <li
              v-for="(item, index) in navItems"
              :key="index"
              class="nav-item nav-menu__item"
            >
              <div class="nav-menu__item-container">
                <router-link class="nav-link active" :to="item.link" @click="closeMenu">
                  <button
                    class="nav-menu__button"
                    :style="{ backgroundImage: `url(${item.background})` }"
                  ></button>
                  <p class="nav-menu__label">{{ item.label }}</p>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  data() {
    return {
      isRotating: false,
      isMenuOpen: false,
      navItems: [
        { label: "Inicio", link: "/", background: require('../../public/api/img/esfera-1.png') },
        { label: "Fusiones", link: "/", background: require('../../public/api/img/esfera-2.png') },
        { label: "Bonus", link: "/", background: require('../../public/api/img/esfera-3.png') },
        { label: "Buscar", link: "/", background: require('../../public/api/img/esfera-4.png') },
      ],
    };
  },
  methods: {
    rotateIcon() {
      this.isRotating = true;
      setTimeout(() => {
        this.isRotating = false;
      }, 4000);
    },
    goBack() {
      this.$router.go(-1);
    },
    handleScroll() {
      const navbar = document.getElementById("navbar");
      navbar.classList.toggle("nav-menu__navbar--hidden", window.scrollY !== 0);
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
      // Add any additional logic for redirection if needed
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap");

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.nav-menu__favicon {
  height: 7rem;
  margin-bottom: 25px;
  transition-duration: 1s;
  cursor: pointer;
}

.nav-menu__favicon--rotating {
  animation: rotate 4s ease-in-out;
  scale: 1.2;
}

.nav-menu__navbar {
  transition: top 0.5s;
}

.nav-menu__navbar--hidden {
  top: -130px;
}

.nav-menu__list {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.nav-menu__item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.nav-menu__button {
  border-radius: 100px;
  width: 3rem;
  height: 3rem;
  background-size: 135%;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  margin-bottom: -16px;
}

.nav-menu__label {
  font-size: 1.5rem;
  margin-top: -10px;
  background: linear-gradient(to right, #d4b061, #9b0505);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 1001px) {
  .nav-menu__favicon { height: 6.5rem; }
}

@media (max-width: 777px) {
  .nav-menu__item-container {
    align-items: flex-end;
    text-align: end;
  }
}

@media (max-width: 650px) {
  .nav-menu__favicon { height: 6rem; }
}

@media (max-width: 500px) {
  .nav-menu__favicon { height: 5rem; }
}
</style>