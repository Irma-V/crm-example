import { auth, database } from "@/main";
import { onValue, push, ref, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default {
  actions: {
    async createCategory(context, { title, limit }) {
      try {
        const uid = await context.dispatch("getUid");
        const category = push(ref(database, `users/${uid}/categories`));
        update(ref(database, `users/${uid}/categories/${category.key}`), {
          title,
          limit,
        });
        return {
          title,
          limit,
          id: category.key,
        };
      } catch (error) {
        context.commit("setError", error);
        throw error;
      }
    },

    async fetchCategories(context) {
      const categories = [];
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            onValue(ref(database, `users/${uid}/categories`), (snapshot) => {
              const data = snapshot.val();
              console.log(data);

              Object.keys(data).forEach((key) => {
                categories.push({
                  title: data[key].title,
                  limit: data[key].limit,
                  id: key,
                });
              });
              console.log(categories);
              return categories;
            });
          }
        });
      } catch (error) {
        context.commit("setError", error);
        throw error;
      }
    },
  },
};
