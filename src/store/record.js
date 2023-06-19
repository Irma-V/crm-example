import { auth, database } from "@/main";
import { onValue, push, ref, child, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default {
  state: {
    records: {},
  },
  getters: {
    records(state) {
      return state.records;
    },
  },
  mutations: {
    setRecords(state, records) {
      state.records = records;
    },
    clearRecords(state) {
      state.records = {};
    },
  },
  actions: {
    async createRecord(context, record) {
      try {
        const uid = await context.dispatch("getUid");
        const newRec = push(ref(database, `users/${uid}/records`));
        update(ref(database, `users/${uid}/records/${newRec.key}`), record);
        context.commit("setRecords", record);
      } catch (error) {
        context.commit("setError", error);
        throw error;
      }
    },

    async fetchRecords(context) {
        return new Promise((resolve, reject) => {
            try {
              onAuthStateChanged(auth, (user) => {
                if (user) {
                  const uid = user.uid;
                  const records = ref(database, `users/${uid}/records`);
                  onValue(records, (snapshot) => {
                    const data = snapshot.val() || {};
                    let fData = Object.keys(data).map((key) => ({
                      ...data[key],
                      id: key,
                    }));
                    context.commit("setCategories", fData);
                    return resolve(fData);
                  });
                } else {
                  return reject("Пользователь не найден");
                }
              });
            } catch (error) {
              context.commit("setError", error);
              return reject(error);
              throw error
            }
          });
    },
  },
};
