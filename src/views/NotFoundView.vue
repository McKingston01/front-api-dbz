<template>
  <div class="not-found-view">
    <img src="/api/img/not-found.png" alt="404 Error" class="not-found-view__image">
    <h1 class="not-found-view__title">Ruta no encontrada</h1>
    <button @click="volverAtras" class="not-found-view__button">Volver</button>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  methods: {
    volverAtras() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.not-found-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.not-found-view__image {
  width: 40dvh;
  margin-bottom: 2rem;
}

.not-found-view__title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.not-found-view__button {
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  background: linear-gradient(to right, #d4b061, #9b0505);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  border: 2px solid;
  border-image: linear-gradient(to right, #d4b061, #9b0505) 1;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.not-found-view__button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(212, 176, 97, 0.5);
}
</style>