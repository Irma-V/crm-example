import { auth, database } from "@/main";
import { onValue, ref } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default {
  state: {
    info: {},
  },
  getters: {
    info(state) {
      return state.info;
    },
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo(context) {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            const info = ref(database, `users/${uid}/info`);
            onValue(info, (snapshot) => {
              const data = snapshot.val();
            //   console.log(data);
              context.commit("setInfo", data);
            });
          }
        });
      } catch (error) {
        throw error;
      }
    },
  },
};
