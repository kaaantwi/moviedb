import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    movies: [],
    singleMovie: [],
    totalResultsData: null,
    loading: false,
    errorMessage: null,
  },
  getters: {
    getMovies: (state) => state.movies,
    getSingleMovie: (state) => state.singleMovie,
    getTotalResults: (state) => {
      return state.totalResultsData;
    },
  },
  mutations: {
    SET_MOVIES(state, payload) {
      state.movies = payload;
    },
    SET_SINGLE_MOVIE(state, payload) {
      state.singleMovie = payload;
    },
    SET_RESULTS(state, newData) {
      state.totalResultsData = newData;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_ERROR_MESSAGE(state, payload) {
      state.errorMessage = payload;
    },
  },
  actions: {
    async getMovies({ commit }, { searchValue, pageNum }) {
      commit("SET_LOADING", true);
      try {
        let response = await axios.get(
          `http://www.omdbapi.com/?apikey=c15698c7&s=${searchValue}&page=${pageNum}`
        );
        commit("SET_MOVIES", response.data.Search);
        commit("SET_RESULTS", response.data.totalResults);
        commit("SET_ERROR_MESSAGE", response.data.Error);
        commit("SET_LOADING", false);
        return response;
      } catch (error) {
        commit("SET_LOADING", false);
        console.log(error);
      }
      commit("SET_LOADING", false);
    },

    async getSingleMovie({ commit }, imdbId) {
      commit("SET_LOADING", true);
      try {
        let response = await axios.get(
          `http://www.omdbapi.com/?apikey=c15698c7&i=${imdbId}`
        );
        commit("SET_SINGLE_MOVIE", response.data);
        commit("SET_LOADING", false);
        return response;
      } catch (error) {
        console.log(error);
        commit("SET_LOADING", false);
      }
      commit("SET_LOADING", false);
    },
  },
  modules: {},
});
