import { auth, database } from "@/main";
import { onValue, push, ref, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default {
  state: {
    categories: {},
  },
  getters: {
    categories(state) {
      return state.categories;
    },
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    clearCategories(state) {
      state.categories = {};
    },
  },
  actions: {
    async createCategory(context, { title, limit }) {
      try {
        const uid = await context.dispatch("getUid");
        const category = push(ref(database, `users/${uid}/categories`));
        update(ref(database, `users/${uid}/categories/${category.key}`), {
          title,
          limit,
        });
        return { title, limit, id: category.key };
      } catch (error) {
        context.commit("setError", error);
        throw error;
      }
    },

    async updateCategory(context,{ title, limit, id}) {
      try {
        const uid = await context.dispatch("getUid");
        const category = push(ref(database, `users/${uid}/categories`)).key;
        update(ref(database, `users/${uid}/categories/${category.key}`), {
          title,
          limit,
        });
      } catch (error) {
        context.commit("setError", error);
        throw error;
      }
    },

    async fetchCategories(context) {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            const categories = ref(database, `users/${uid}/categories`);
            onValue(categories, (snapshot) => {
              const data = snapshot.val() || {};
              let fData = Object.keys(data).map((key) => ({
                ...data[key],
                id: key,
              }));
              context.commit("setCategories", fData);
            });
          }
        });
        // const uid = await context.dispatch("getUid");
        // const dbWay = ref(database, `users/${uid}/categories`);
        // onValue(dbWay, (snapshot) => {
        //   const data = snapshot.val() || {};
        //   // console.log(data);

        //   /* // let categories = [];
        //   // Object.keys(data).forEach((key) => {
        //   //   categories.push({
        //   //     title: data[key].title,
        //   //     limit: data[key].limit,
        //   //     id: key,
        //   //   });
        //   // });
        //   // console.log(categories);
        //   // return categories; */
        //   //   console.log(Object.keys(data).map((key) => ({ ...data[key], id: key })));
        //   return Object.keys(data).map((key) => ({ ...data[key], id: key }));
        // });
      } catch (error) {
        context.commit("setError", error);
        throw error;
      }
    },
  },
};
