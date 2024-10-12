<template>
  <div id="app">
    <LoadingSpinner :isLoading="isLoading" />
    <nav>
      <NavMenu />
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NavMenu from './components/NavMenu.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';

export default {
  name: 'App',
  components: {
    NavMenu,
    LoadingSpinner,
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  methods: {
    ...mapActions(['fetchData']),
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
/* Reset */
* {
  box-sizing: border-box;
  position: relative;
  min-width: 0;
}

h1,
h2,
h3,
h4 {
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}

/* Global Styles */
#app {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: linear-gradient(to bottom, #131347, #0f0f36, #0f0f36);
  font-family: "Luckiest Guy", cursive;
  font-weight: 400;
  font-style: normal;
  width: 100%;
}
</style>
