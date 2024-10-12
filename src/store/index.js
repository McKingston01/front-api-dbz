import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  // Estado global de la aplicación
  state: {
    loading: false,        // Indica si se está cargando datos
    cacheLoaded: false,    // Indica si los datos están en caché
    personajes: [],        // Lista de personajes
  },

  // Mutaciones para modificar el estado
  mutations: {
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_CACHE_LOADED(state, isLoaded) {
      state.cacheLoaded = isLoaded;
    },
    SET_PERSONAJES(state, personajes) {
      state.personajes = personajes;
    },
  },

  // Acciones para manejar lógica asíncrona y commits
  actions: {
    async fetchData({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.get('http://localhost:8080/api/character');
        commit('SET_PERSONAJES', response.data);
        commit('SET_CACHE_LOADED', true);
      } catch (error) {
        console.error('Error al obtener personajes:', error);
        // Aquí se podría agregar una lógica para manejar el error, como mostrar una notificación
      } finally {
        // Mantiene el spinner visible por 2 segundos para mejorar UX
        setTimeout(() => commit('SET_LOADING', false), 3000);
      }
    },
    setLoading({ commit }, isLoading) {
      commit('SET_LOADING', isLoading);
    },
    setCacheLoaded({ commit }, isLoaded) {
      commit('SET_CACHE_LOADED', isLoaded);
    },
  },

  // Getters para acceder al estado de forma computada
  getters: {
    isLoading: state => state.loading,
    cacheLoaded: state => state.cacheLoaded,
    personajes: state => state.personajes,
  },
});
