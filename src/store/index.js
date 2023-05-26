import { createStore } from "vuex";
import auth from "./auth";

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
        state.error = null
    },
  },

  modules: {
    auth,
  },
});

export default store;