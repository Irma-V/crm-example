import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";

const store = createStore({
  state: {
    error: null,
  },
  getters: {
    error(state) {
      return state.error;
    },
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clrError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      return await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      ).then((res) => {
        return res.json();
      });
    },
  },
  modules: {
    auth,
    info,
  },
});

export default store;
